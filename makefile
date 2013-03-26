all:

dist: dist/qr.js

dist/qr.js: index.js
	browserify --standalone qr index.js > dist/qr.js

