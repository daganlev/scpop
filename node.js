const fs = require('fs');
const glob = require('glob');
const ts = require('typescript');
const UglifyJS = require('uglify-js');
const sass = require('sass');
const postcss = require('postcss');
const cssnano = require('cssnano');

let scriptsRunning = false;
let stylesRunning = false;

//init
updateStyles();
updateScripts();

fs.watch('./ts',{},function(evt, file){
    if(!scriptsRunning)
        updateScripts();
});

fs.watch('./scss',{},function(evt, file){
    if(!stylesRunning)
        updateStyles();
});

function updateScripts(){
    scriptsRunning = true;
    license = fs.readFileSync('./license.txt','utf8');
    
    //remove JS file
    fs.rmSync('./scpop/scpop.js', { force: true });

    glob("./ts/*.ts", null, function (er, files) {
        files.forEach(file => {
            let startTime = performance.now();

            let jsfilename = file.replace("./ts/","./scpop/").replace(".ts",".js");

            data = fs.readFileSync(file,'utf8');
            
            let tmpRes = ts.transpile(data, {
                "target": "es2016",
                "module": "commonjs"
            }, file);

            let tmpFile = UglifyJS.minify(tmpRes,  { 
                compress: true,
                mangle: true
            });
            
            fs.writeFileSync(jsfilename, license + "\n" + tmpFile.code);

            let diff = ((performance.now() - startTime)/1000).toFixed(3);
            let size = (fs.statSync(jsfilename).size / 1024).toFixed(2);
            console.log(jsfilename + ' \x1b[32mupdated\x1b[0m ' + size + ' KB :: ' + diff + 'sec');
            
        });
        scriptsRunning = false;
    });
}

function updateStyles(){
    stylesRunning = true;
    license = fs.readFileSync('./license.txt','utf8');
    
    //remove CSS file
    fs.rmSync('./scpop/scpop.css', { force: true });

    glob("./scss/*.scss", null, function (er, files) {
        files.forEach(file => {
            //skip scss files with underscore at the start of their name (i.e. _global.scss)
            if(!/scss\/\_/.test(file)){
                let startTime = performance.now();
                try {
                    let res = sass.compile(file, {
                        style: 'compressed'
                    });

                    postcss([cssnano]).process(res.css,  {
                        from: null, 
                        to: null
                    }).then(result => {
                        let cssfilename = file.replace("./scss/","./scpop/").replace(".scss",".css");
                        fs.writeFileSync(cssfilename, license + "\n" + result.css);
                        let diff = ((performance.now() - startTime)/1000).toFixed(3);
                        let size = (fs.statSync(cssfilename).size / 1024).toFixed(2);
                        console.log(cssfilename + " \x1b[32mupdated\x1b[0m " + size + ' KB :: ' + diff + 'sec');
                    
                    });
                } catch (error) {
                    console.error(file + " \x1b[31merror\x1b[0m");
                }
                
            }           
        });
        stylesRunning = false;
    });
}