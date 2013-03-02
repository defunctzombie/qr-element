var qr = require('qr-element');

// default canvas rendering
var qrcode = qr('foo', {
    width: 128,
    height: 128
});

qrcode // =>


// table rendering
var qrcode = qr('foo', {
    render: 'table',
    width: 128,
    height: 128,
    foreground: '#ff4411'
});

qrcode // =>
