let scpop = {
    scpopShowing: false,
    pops: []
};

//Load CSS
window.addEventListener('load', function(){
    let CSSURL = (<HTMLScriptElement>document.querySelector('script[src$="scpop.js"')).src.replace(".js",".css");
    let cssscript = document.createElement('link');
    cssscript.rel = 'stylesheet';
    cssscript.href = CSSURL;
    document.head.appendChild(cssscript);
});

function scpopLoad(selector){
    scpop.pops.push({currentSlide: 0});
    let pop = scpop.pops.length-1;

    let slides = [];
    document.querySelectorAll(selector + ' a').forEach(function(elm){
        let indx = slides.length;
        let tmpElm = <HTMLLinkElement>elm;
        if(/\.(jpg|jpeg|png|webp|gif|svg)$/.test(tmpElm.href.toLowerCase())){
            let tmpCaption = '';
            if(elm.getAttribute('title')!=null && elm.getAttribute('title')!=''){
                tmpCaption = `<div class="scpop__item_caption">` + elm.getAttribute('title') + `</div>`;
            }
            slides.push(`<div class="scpop__item" id="scpop_` + pop + `_` + indx + `"><img alt="" data-src="` + tmpElm.href + `" />` + tmpCaption + `</div>`);
            tmpElm.href = 'javascript:scpopShow(' + pop + ',' + indx + ');';
            tmpElm.removeAttribute('target');
        }
        if(tmpElm.classList.contains('scpopiframe')){
            //add iframe popup
            let tmpCaption = '';
            if(elm.getAttribute('title')!=null && elm.getAttribute('title')!=''){
                tmpCaption = `<div class="scpop__item_caption">` + elm.getAttribute('title') + `</div>`;
            }
            
            let src = tmpElm.href;
            //check if YouTube URL convert to embed URL
            let srcMatchs = src.match(/watch\?v\=(.*)$/i);
            if(srcMatchs){
                src = 'https://www.youtube.com/embed/' + srcMatchs[1] + '?autoplay=1';
            }
            slides.push(`<div class="scpop__item" id="scpop_` + pop + `_` + indx + `"><iframe frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-src="` + src + `"></iframe>` + tmpCaption + `</div>`);
            tmpElm.href = 'javascript:scpopShow(' + pop + ',' + indx + ');';
            tmpElm.removeAttribute('target');
        }
    });

    let tmpDiv = (<HTMLDivElement>document.createElement('div'));
    tmpDiv.className = 'scpop scpop' + pop;
    tmpDiv.innerHTML = `<div class="scpop__toolbar">
                            <a class="scpop__toolbar_close" href="javascript:scpopClose(` + pop + `);">&#215;</a>
                            <a class="scpop__toolbar_prev" href="javascript:scpopPrev(` + pop + `);">&#171;</a>
                            <a class="scpop__toolbar_next" href="javascript:scpopNext(` + pop + `);">&#187;</a>
                        </div>
                        <div class="scpop__inner">` + slides.join("") + `</div>`;
    document.body.appendChild(tmpDiv);

    //add observers            
    let observer = new IntersectionObserver(function(entries, observer){
        entries.forEach(slide => {                    
            if(slide.isIntersecting && scpop.scpopShowing){
                //load image if has not yet loaded
                if(slide.target.querySelector('img') && slide.target.querySelector('img').getAttribute('data-src')!=null){
                    slide.target.querySelector('img').setAttribute('src', slide.target.querySelector('img').getAttribute('data-src'));
                    slide.target.querySelector('img').removeAttribute('data-src');                            
                }
                //load iframe if has not yet loaded
                if(slide.target.querySelector('iframe') && slide.target.querySelector('iframe').getAttribute('data-src')!=null){
                    slide.target.querySelector('iframe').setAttribute('src', slide.target.querySelector('iframe').getAttribute('data-src'));
                    slide.target.querySelector('iframe').removeAttribute('data-src');                            
                }
                scpop.pops[pop].currentSlide = parseInt(slide.target.id.replace('scpop_' + pop + '_',''));                        
            }
        });
        
    }, {
        root: document.querySelector('.scpop' + pop + ' .scpop__inner'),
        rootMargin: '0px',
        threshold: 0.6
    });
    document.querySelectorAll('.scpop' + pop + ' .scpop__item').forEach(function(elm){
        observer.observe(elm);
    });      
}
function scpopSlideTo(pop, slide){
    scpop.pops[pop].currentSlide = slide;
    document.querySelector('.scpop' + pop + ' .scpop__inner').scrollLeft = (<HTMLDivElement>document.querySelectorAll('.scpop' + pop + ' .scpop__item')[slide]).offsetLeft;
}
function scpopShow(pop, slide){
    //disable smooth sliding for first slide to show
    (<HTMLDivElement>document.querySelector('.scpop' + pop + ' .scpop__inner')).style.scrollBehavior = 'unset';

    if(slide==0){
        //load firs image into view 
        let initSlide = (<HTMLDivElement>document.querySelectorAll('.scpop' + pop + ' .scpop__item')[0].querySelector('img'));
        if(initSlide && initSlide.getAttribute('data-src')!=null){
            initSlide.setAttribute('src', initSlide.getAttribute('data-src'));
            initSlide.removeAttribute('data-src');                            
        }

        //load firs iframe into view 
        let initSlide2 = (<HTMLDivElement>document.querySelectorAll('.scpop' + pop + ' .scpop__item')[0].querySelector('iframe'));
        if(initSlide2 && initSlide2.getAttribute('data-src')!=null){
            initSlide2.setAttribute('src', initSlide2.getAttribute('data-src'));
            initSlide2.removeAttribute('data-src');                            
        }
    }
    scpop.scpopShowing = true;
    scpopSlideTo(pop, slide);
    document.body.classList.add('scpopshow');
    document.querySelector('.scpop' + pop).classList.add('show');
    window.setTimeout(function(){
        (<HTMLDivElement>document.querySelector('.scpop' + pop + ' .scpop__inner')).style.scrollBehavior = 'smooth';
    }, 300);
}
function scpopClose(pop){
    scpop.scpopShowing = false;
    (<HTMLDivElement>document.querySelector('.scpop' + pop)).style.opacity = '0';
    window.setTimeout(function(){
        (<HTMLDivElement>document.querySelector('.scpop' + pop)).removeAttribute('style');
        document.body.classList.remove('scpopshow');
        document.querySelector('.scpop' + pop).classList.remove('show');

        //housekeeping - remove all iframe sources in case this is a YouTube video playing
        document.querySelectorAll('.scpop .scpop__item iframe').forEach(iframe => {
            if(iframe.getAttribute('src')!=null){
                iframe.setAttribute('data-src', iframe.getAttribute('src'));
                iframe.removeAttribute('src');
            }
        });
    }, 300);
}
function scpopPrev(pop){
    let slides = document.querySelectorAll('.scpop' + pop + ' .scpop__item').length;
    let tmpSlide = scpop.pops[pop].currentSlide;
    tmpSlide--;
    if(tmpSlide<0){
        tmpSlide = slides-1;
    }
    scpopSlideTo(pop, tmpSlide);
}
function scpopNext(pop){
    let slides = document.querySelectorAll('.scpop' + pop + ' .scpop__item').length;
    let tmpSlide = scpop.pops[pop].currentSlide;
    tmpSlide++;
    if(tmpSlide>(slides-1)){
        tmpSlide = 0;
    }
    scpopSlideTo(pop, tmpSlide);
}