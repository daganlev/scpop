/* 
SCPOP version 1.0.1
2022 - Dagan Lev - https://github.com/daganlev/scpop
Licensed under the MIT license.
*/
let scpop={scpopShowing:!1,pops:[]};function scpopLoad(e){scpop.pops.push({currentSlide:0});let p=scpop.pops.length-1,s=[],t=(document.querySelectorAll(e+" a").forEach(function(o){var c=s.length;let r=o;if(/\.(jpg|jpeg|png|webp|gif|svg)$/.test(r.href.toLowerCase())){let e="";null!=o.getAttribute("title")&&""!=o.getAttribute("title")&&(e='<div class="scpop__item_caption">'+o.getAttribute("title")+"</div>"),s.push('<div class="scpop__item" id="scpop_'+p+"_"+c+'"><img alt="" data-src="'+r.href+'" />'+e+"</div>"),r.href="javascript:scpopShow("+p+","+c+");",r.removeAttribute("target")}if(r.classList.contains("scpopiframe")){let e="",t=(null!=o.getAttribute("title")&&""!=o.getAttribute("title")&&(e='<div class="scpop__item_caption">'+o.getAttribute("title")+"</div>"),r.href);o=t.match(/watch\?v\=(.*)$/i);o&&(t="https://www.youtube.com/embed/"+o[1]+"?autoplay=1"),s.push('<div class="scpop__item" id="scpop_'+p+"_"+c+'"><iframe frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-src="'+t+'"></iframe>'+e+"</div>"),r.href="javascript:scpopShow("+p+","+c+");",r.removeAttribute("target")}}),document.createElement("div"));t.className="scpop scpop"+p;e='<div class="scpop__toolbar">',e=(e=(e=(e+='<a class="scpop__toolbar_close" href="javascript:scpopClose('+p+');">&#215;</a>')+'<a class="scpop__toolbar_prev" href="javascript:scpopPrev('+p+');">&#171;</a>')+'<a class="scpop__toolbar_next" href="javascript:scpopNext('+p+');">&#187;</a></div>')+'<div class="scpop__inner">'+s.join("")+"</div>";t.innerHTML=e,document.body.appendChild(t);let o=new IntersectionObserver(function(e,t){e.forEach(e=>{e.isIntersecting&&scpop.scpopShowing&&(e.target.querySelector("img")&&null!=e.target.querySelector("img").getAttribute("data-src")&&(e.target.querySelector("img").setAttribute("src",e.target.querySelector("img").getAttribute("data-src")),e.target.querySelector("img").removeAttribute("data-src")),e.target.querySelector("iframe")&&null!=e.target.querySelector("iframe").getAttribute("data-src")&&(e.target.querySelector("iframe").setAttribute("src",e.target.querySelector("iframe").getAttribute("data-src")),e.target.querySelector("iframe").removeAttribute("data-src")),scpop.pops[p].currentSlide=parseInt(e.target.id.replace("scpop_"+p+"_","")),scpopcheckPrevNextButtons(p))})},{root:document.querySelector(".scpop"+p+" .scpop__inner"),rootMargin:"0px",threshold:.6});document.querySelectorAll(".scpop"+p+" .scpop__item").forEach(function(e){o.observe(e)})}function scpopSlideTo(e,t){scpop.pops[e].currentSlide=t,document.querySelector(".scpop"+e+" .scpop__inner").scrollLeft=document.querySelectorAll(".scpop"+e+" .scpop__item")[t].offsetLeft}function scpopShow(o,e){if(document.querySelector(".scpop"+o+" .scpop__inner").style.scrollBehavior="unset",0==e){let e=document.querySelectorAll(".scpop"+o+" .scpop__item")[0].querySelector("img"),t=(e&&null!=e.getAttribute("data-src")&&(e.setAttribute("src",e.getAttribute("data-src")),e.removeAttribute("data-src")),document.querySelectorAll(".scpop"+o+" .scpop__item")[0].querySelector("iframe"));t&&null!=t.getAttribute("data-src")&&(t.setAttribute("src",t.getAttribute("data-src")),t.removeAttribute("data-src")),scpopcheckPrevNextButtons(o)}scpop.scpopShowing=!0,scpopSlideTo(o,e),document.body.classList.add("scpopshow"),document.querySelector(".scpop"+o).classList.add("show"),window.setTimeout(function(){document.querySelector(".scpop"+o+" .scpop__inner").style.scrollBehavior="smooth"},300)}function scpopClose(e){scpop.scpopShowing=!1,document.querySelector(".scpop"+e).style.opacity="0",window.setTimeout(function(){document.querySelector(".scpop"+e).removeAttribute("style"),document.body.classList.remove("scpopshow"),document.querySelector(".scpop"+e).classList.remove("show"),document.querySelectorAll(".scpop .scpop__item iframe").forEach(e=>{null!=e.getAttribute("src")&&(e.setAttribute("data-src",e.getAttribute("src")),e.removeAttribute("src"))})},300)}function scpopPrev(e){var t=document.querySelectorAll(".scpop"+e+" .scpop__item").length;let o=scpop.pops[e].currentSlide;scpopSlideTo(e,o=--o<0?t-1:o)}function scpopNext(e){var t=document.querySelectorAll(".scpop"+e+" .scpop__item").length;let o=scpop.pops[e].currentSlide;scpopSlideTo(e,o=++o>t-1?0:o)}function scpopcheckPrevNextButtons(e){var t=document.querySelectorAll(".scpop"+e+" .scpop__item").length,o=scpop.pops[e].currentSlide;let c=document.querySelector(".scpop"+e+" .scpop__toolbar_prev"),r=document.querySelector(".scpop"+e+" .scpop__toolbar_next");c.style.display="none",r.style.display="none",0<o&&(c.style.display="block"),o<t-1&&(r.style.display="block")}window.addEventListener("load",function(){var e=document.querySelector('script[src$="scpop.js"').src.replace(".js",".css");let t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)});