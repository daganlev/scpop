# scpop
JavaScript library for popup images and iframes

## Installation
Download the **scpop** folder (https://github.com/daganlev/scpop/tree/main/scpop) with the minified JS and CSS files onto a local folder on your project and link to the JS in your HTML.

Include the **scpop.js** file in a deffered script tag next to your closing `</body>` tag.

And on the window load event call the `scpopLoad();` function with the selector you need to identify the main root element - this will loop through all elements within this contaniner looking for `<a>` tags with an `href` of an image or use the `class="scpopiframe"` to identify an iframe that needs to be included.

### Init code

```
<script src="scpop.js" defer></script>
<script>
    window.addEventListener('load', function(){
        scpopLoad('.content');
        scpopLoad('.content2');
    });
</script>
```

### HTML example
```
<div class="content">
    <a href="https://www.youtube.com/watch?v=zUi5xKQXG6I" class="scpopiframe" target="_blank">You Tube video</a>
    <a href="https://www.solid-code.co.uk" class="scpopiframe" target="_blank">Website Example</a>
    <a href="image1.png" title="image 1" target="_blank">TEST IMAGE 1</a>
    <a href="image2.png" target="_blank"><img width="600" height="400" src="image2thumbnail.png"/></a>
</div>
```