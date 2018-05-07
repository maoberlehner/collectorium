# collectorium

[![Patreon](https://img.shields.io/badge/patreon-donate-blue.svg)](https://www.patreon.com/maoberlehner)
[![Donate](https://img.shields.io/badge/Donate-PayPal-blue.svg)](https://paypal.me/maoberlehner)
[![Build Status](https://travis-ci.org/maoberlehner/collectorium.svg?branch=master)](https://travis-ci.org/maoberlehner/collectorium)
[![GitHub stars](https://img.shields.io/github/stars/maoberlehner/collectorium.svg?style=social&label=Star)](https://github.com/maoberlehner/collectorium)

pure CSS tabs (https://collectorium.oberlehner.net).

## Usage

### As an npm module

To use collectorium in your Sass project, it is recommended to use the [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-magic-importer) node-sass importer so it is possible to easily load collectorium directly from your `node_modules` directory.
Make sure you checkout the [usage section](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-magic-importer#usage) on how to use the [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-magic-importer).

Install collectorium:

```bash
npm install collectorium --save
```

Also install [node-sass-magic-importer](https://github.com/maoberlehner/node-sass-magic-importer/tree/master/packages/node-sass-magic-importer)

```bash
npm install node-sass-magic-importer --save-dev
```

Now you can import collectorium into your Sass file:

```scss
@import '~collectorium';

// Without node-sass-magic-importer installed
@import 'node_modules/collectorium/scss/index.scss';
```

There are variables to control certain aspects of the tabs:

```scss
$collectorium-tab-link-background: #efefef;
$collectorium-contents-background: #efefef;
```

If you want to use the JavaScript enhancements, load the collectorium module into your JavaScript file:

```js
// Load the module.
const collectorium = require('collectorium');
// Initialize collectorium tabs.
collectorium('.collectorium', {
  // This are the default options.
  disableHistory: true,
  classNames: {
    link: `collectorium__tab-link`,
    content: `collectorium__content`,
    active: 'is-active'
  }
});
```

### Standalone (without npm)

Download https://github.com/maoberlehner/collectorium/archive/2.0.0.zip. Add the files to your HTML file like in the following example:

```html
<!-- Put this inside the <head> section of your HTML. -->
<link rel="stylesheet" href="collectorium.min.css">

<!-- Put this before the closing </body> tag (optionally!). -->
<script src="collectorium.min.js"></script>
<script>
  collectorium('.collectorium');
</script>
```

## About

### Author

Markus Oberlehner  
Website: https://markus.oberlehner.net  
Twitter: https://twitter.com/MaOberlehner  
PayPal.me: https://paypal.me/maoberlehner  
Patreon: https://www.patreon.com/maoberlehner

### License

MIT
