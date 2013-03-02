var qr = require('qr.js');
var xtend = require('xtend');
var ErrorCorrectLevel = qr.ErrorCorrectLevel;

var haveCanvas = (function isCanvasSupported(){
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
});

module.exports = function(text, opt) {

    opt = xtend({
        render: 'canvas',
        width: 256,
        height: 256,
        background: '#fff',
        foreground: '#000',
        typeNumber: -1,
        correctLevel: ErrorCorrectLevel.H
    }, opt);

    var qrcode = qr(text, {
        typeNumber: opt.typeNumber,
        errorCorrectLevel: opt.correctLevel
    });

    // fallback to table if user wanted canvas but it wasn't supported
    if (opt.render === 'canvas' && !haveCanvas) {
        opt.render = 'table';
    }

    return (opt.render === 'canvas') ? mk_canvas(qrcode, opt) :
        mk_table(qrcode, opt);
};

function mk_canvas(qrcode, opt) {

    var width = opt.width;
    var height = opt.height;

    var canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    var ctx = canvas.getContext('2d');

    var cells = qrcode.modules;

    var tileW = canvas.width  / cells.length;
    var tileH = canvas.height / cells.length;

    for (var r = 0; r < cells.length ; ++r) {
        var row = cells[r];
        for (var c = 0; c < row.length ; ++c) {
            ctx.fillStyle = row[c] ? opt.foreground : opt.background;
            var w = (Math.ceil((c+1)*tileW) - Math.floor(c*tileW));
            var h = (Math.ceil((r+1)*tileH) - Math.floor(r*tileH));
            ctx.fillRect(Math.round(c*tileW), Math.round(r*tileH), w, h);
        }
    }

    return canvas;
}

function mk_table(qrcode, opt) {

    var table = document.createElement('table');

    var width = opt.width;
    var height = opt.height;

    table.style.width = width + 'px';
    table.style.height = width + 'px';
    table.style.border = '0px';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = opt.background;

    var cells = qrcode.modules;
    var tileW = width / cells.length;
    var tileH = height / cells.length;

    var perc = 100 / cells.length + '%';

    for(var r = 0; r < cells.length; ++r ) {
        var row = cells[r];

        var row_el = document.createElement('tr');
        row_el.height = perc;
        table.appendChild(row_el);

        for(var c = 0; c < row.length; ++c ) {
            var col_el = document.createElement('td');
            col_el.width = perc;
            col_el.style.backgroundColor = row[c] ? opt.foreground :
                opt.background;

            row_el.appendChild(col_el);
        }
    }

    return table;
}
