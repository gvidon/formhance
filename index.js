const minify = require('@node-minify/core');
const gcc = require('@node-minify/google-closure-compiler');

// Using Google Closure Compiler
minify({
  compressor: gcc,
  input: 'src/js/formhance.js',
  output: 'dist/js/formhance.min.js',
  callback: function(err, min) {}
});