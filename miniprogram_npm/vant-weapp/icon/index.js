const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    info: null,
    name: String,
    size: String,
    color: String,
    customStyle: String,
    classPrefix: {
      type: String,
      value: 'van-icon'
    }
  },
  methods: {
    onClick() {
      this.$emit('click');
    }

  }
});