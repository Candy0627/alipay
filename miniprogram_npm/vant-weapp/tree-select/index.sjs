const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
/* eslint-disable */
var array = require('../wxs/array.wxs');

function isActive(activeList, itemId) {
  if (array.isArray(activeList)) {
    return activeList.indexOf(itemId) > -1;
  }

  return activeList === itemId;
}

module.exports.isActive = isActive;