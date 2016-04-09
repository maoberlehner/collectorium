# collectorium
pure CSS tabs (https://collectorium.oberlehner.net).

## Usage
### As an npm module
collectorium can be used as an [eyeglass](https://github.com/sass-eyeglass/eyeglass)
module. To do so, install the collectorium module into your project:
```
npm install collectorium --save
```

Now you can import collectorium into your scss file:
```scss
@import 'collectorium';
```

There are variables to control certain aspects of the tabs:
```scss
$collectorium-namespace: 'collectorium';
$collectorium-tab-link-background: #efefef;
$collectorium-contents-background: #efefef;
```

If you want to use the JavaScript enhancements, load the collectorium module
into your JavaScript file:
```js
// Load the module.
var collectorium = require('collectorium');
// Initialize collectorium tabs.
var myTabs = new collectorium('.js-tabs', {
  disableHistory: false,
  classNames: {
    link: 'js-tab-link',
    active: 'is-active'
  }
});
```

### Standalone (without npm)
Download https://collectorium.oberlehner.net/downloads/collectorium-1.0.0.zip.
Add the files to your HTML file like in the following example:
```html
<!-- Put this inside the <head> section of your HTML. -->
<link rel="stylesheet" href="collectorium.min.css">

<!-- Put this before the closing </body> tag (optionally!). -->
<script src="collectorium.min.js"></script>
<script>
  var myTabs = new collectorium('.js-tabs', {
    disableHistory: false,
    classNames: {
      link: 'js-tab-link',
      active: 'is-active'
    }
  });
</script>
```

## About
### Author
Markus Oberlehner  
Twitter: https://twitter.com/MaOberlehner

### License
GPL v2 (http://www.gnu.org/licenses/gpl-2.0.html)
