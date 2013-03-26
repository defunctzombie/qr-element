# qr-element

qrcode dom element

```js
var qr = require('qr-element');

// default canvas rendering
var qrcode = qr('foo', {
    width: 128,
    height: 128
});

qrcode // =>
```

[interactive readme](http://tryme.jit.su/shtylman/qr-element)  
[interactive example](http://tryme.jit.su/shtylman/qr-element/example)

package your app with [browserify](http://browserify.org/)

## script tag users

```html
<script src="https://raw.github.com/shtylman/qr-element/master/dist/qr.js"></script>
<script>
var qrcode = qr('foo', {
    width: 128,
    height: 128
});

document.body.appendChild(qrcode);
</script>
```

`qr` is exposed to the global namespace or it can work with other module loading system.

## options

## render
> default 'canvas'

Optionally specify 'table' if you want rendering to be done via an html table versus canvas. 'table' fallback will be used automatically if canvas is not available in the browser.

### width
Width in pixels of the element

### height
Height in pixels of the element

### background
> default #fff

Background color hex

### foreground
> default #000

Foreground color hex

### typeNumber
### correctLevel

## install

```
npm install qr-element
```

Use with [browserify](http://browserify.org)

