const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
export const basic = Behavior({
  methods: {
    $emit(...args) {
      this.triggerEvent(...args);
    },

    getRect(selector, all) {
      return new Promise(resolve => {
        wx2my.createSelectorQuery().in(this)[all ? 'selectAll' : 'select'](selector).boundingClientRect(rect => {
          if (all && Array.isArray(rect) && rect.length) {
            resolve(rect);
          }

          if (!all && rect) {
            resolve(rect);
          }
        }).exec();
      });
    }

  }
});