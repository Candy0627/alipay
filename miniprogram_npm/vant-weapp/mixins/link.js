const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
export const link = Behavior({
  properties: {
    url: String,
    linkType: {
      type: String,
      value: 'navigateTo'
    }
  },
  methods: {
    jumpLink(urlKey = 'url') {
      const url = this.data[urlKey];

      if (url) {
        wx[this.data.linkType]({
          url
        });
      }
    }

  }
});