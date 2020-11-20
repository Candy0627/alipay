const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
module.exports = {
  text: function (pivotText, percentage) {
    return pivotText || percentage + '%';
  }
};