var scpop={scpopShowing:!1,pops:[]};function scpopLoad(e){scpop.pops.push({currentSlide:0});var t=scpop.pops.length-1,r=[];document.querySelectorAll(e+" a").forEach((function(e){var o=r.length,c=e;if(/\.(jpg|jpeg|png|webp|gif|svg)$/.test(c.href.toLowerCase())){var s="";null!=e.getAttribute("title")&&(s='<div class="scpop__item_caption">'+e.getAttribute("title")+"</div>"),r.push('<div class="scpop__item" id="scpop_'+t+"_"+o+'"><img alt="" data-src="'+c.href+'" />'+s+"</div>"),c.href="javascript:scpopShow("+t+","+o+");",c.removeAttribute("target")}if(c.classList.contains("scpopiframe")){s="";null!=e.getAttribute("title")&&(s='<div class="scpop__item_caption">'+e.getAttribute("title")+"</div>");var p=c.href,i=p.match(/watch\?v\=(.*)$/i);i&&(p="https://www.youtube.com/embed/"+i[1]+"?autoplay=1"),r.push('<div class="scpop__item" id="scpop_'+t+"_"+o+'"><iframe frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-src="'+p+'"></iframe>'+s+"</div>"),c.href="javascript:scpopShow("+t+","+o+");",c.removeAttribute("target")}}));var o=document.createElement("div");o.className="scpop scpop"+t,o.innerHTML='<div class="scpop__toolbar">\n                            <a class="scpop__toolbar_close" href="javascript:scpopClose('+t+');">╳</a>\n                            <a class="scpop__toolbar_prev" href="javascript:scpopPrev('+t+');">🡠</a>\n                            <a class="scpop__toolbar_next" href="javascript:scpopNext('+t+');">🡢</a>\n                        </div>\n                        <div class="scpop__inner">'+r.join("")+"</div>",document.body.appendChild(o);var c=new IntersectionObserver((function(e,r){e.forEach((function(e){e.isIntersecting&&scpop.scpopShowing&&(e.target.querySelector("img")&&null!=e.target.querySelector("img").getAttribute("data-src")&&(e.target.querySelector("img").setAttribute("src",e.target.querySelector("img").getAttribute("data-src")),e.target.querySelector("img").removeAttribute("data-src")),e.target.querySelector("iframe")&&null!=e.target.querySelector("iframe").getAttribute("data-src")&&(e.target.querySelector("iframe").setAttribute("src",e.target.querySelector("iframe").getAttribute("data-src")),e.target.querySelector("iframe").removeAttribute("data-src")),scpop.pops[t].currentSlide=parseInt(e.target.id.replace("scpop_"+t+"_","")))}))}),{root:document.querySelector(".scpop"+t+" .scpop__inner"),rootMargin:"0px",threshold:.6});document.querySelectorAll(".scpop"+t+" .scpop__item").forEach((function(e){c.observe(e)}))}function scpopSlideTo(e,t){scpop.pops[e].currentSlide=t,document.querySelector(".scpop"+e+" .scpop__inner").scrollLeft=document.querySelectorAll(".scpop"+e+" .scpop__item")[t].offsetLeft}function scpopShow(e,t){if(document.querySelector(".scpop"+e+" .scpop__inner").style.scrollBehavior="unset",0==t){var r=document.querySelectorAll(".scpop"+e+" .scpop__item")[0].querySelector("img");r&&null!=r.getAttribute("data-src")&&(r.setAttribute("src",r.getAttribute("data-src")),r.removeAttribute("data-src"));var o=document.querySelectorAll(".scpop"+e+" .scpop__item")[0].querySelector("iframe");o&&null!=o.getAttribute("data-src")&&(o.setAttribute("src",o.getAttribute("data-src")),o.removeAttribute("data-src"))}scpop.scpopShowing=!0,scpopSlideTo(e,t),document.body.classList.add("scpopshow"),document.querySelector(".scpop"+e).classList.add("show"),window.setTimeout((function(){document.querySelector(".scpop"+e+" .scpop__inner").style.scrollBehavior="smooth"}),300)}function scpopClose(e){scpop.scpopShowing=!1,document.querySelector(".scpop"+e).style.opacity="0",window.setTimeout((function(){document.querySelector(".scpop"+e).removeAttribute("style"),document.body.classList.remove("scpopshow"),document.querySelector(".scpop"+e).classList.remove("show"),document.querySelectorAll(".scpop .scpop__item iframe").forEach((function(e){null!=e.getAttribute("src")&&(e.setAttribute("data-src",e.getAttribute("src")),e.removeAttribute("src"))}))}),300)}function scpopPrev(e){var t=document.querySelectorAll(".scpop"+e+" .scpop__item").length,r=scpop.pops[e].currentSlide;--r<0&&(r=t-1),scpopSlideTo(e,r)}function scpopNext(e){var t=document.querySelectorAll(".scpop"+e+" .scpop__item").length,r=scpop.pops[e].currentSlide;++r>t-1&&(r=0),scpopSlideTo(e,r)}window.addEventListener("load",(function(){var e=document.querySelector('script[src$="scpop.js"').src.replace(".js",".css"),t=document.createElement("link");t.rel="stylesheet",t.href=e,document.head.appendChild(t)}));