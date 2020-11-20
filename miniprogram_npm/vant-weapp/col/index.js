const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    name: 'row',
    type: 'ancestor'
  },
  props: {
    span: Number,
    offset: Number
  },
  data: {
    style: ''
  },
  methods: {
    setGutter(gutter) {
      const padding = `${gutter / 2}px`;
      const style = gutter ? `padding-left: ${padding}; padding-right: ${padding};` : '';

      if (style !== this.data.style) {
        this.set({
          style
        });
      }
    }

  }
});