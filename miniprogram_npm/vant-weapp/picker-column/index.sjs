const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
function isObj(x) {
  var type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

module.exports = function (option, valueKey) {
  return isObj(option) && option[valueKey] != null ? option[valueKey] : option;
};