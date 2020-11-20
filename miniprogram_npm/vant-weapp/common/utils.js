const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
export function isDef(value) {
  return value !== undefined && value !== null;
}
export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}
export function isNumber(value) {
  return /^\d+$/.test(value);
}
export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
export function nextTick(fn) {
  setTimeout(() => {
    fn();
  }, 1000 / 30);
}
let systemInfo = null;
export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = wx2my.getSystemInfoSync();
  }

  return systemInfo;
}