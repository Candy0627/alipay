const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
var bem = require('./bem.wxs').bem;

var memoize = require('./memoize.wxs').memoize;

function isSrc(url) {
  return url.indexOf('http') === 0 || url.indexOf('data:image') === 0 || url.indexOf('//') === 0;
}

module.exports = {
  bem: memoize(bem),
  isSrc: isSrc,
  memoize: memoize
};