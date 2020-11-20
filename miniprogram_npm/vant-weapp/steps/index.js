const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
import { VantComponent } from '../common/component';
import { GREEN } from '../common/color';
VantComponent({
  props: {
    icon: String,
    steps: Array,
    active: Number,
    direction: {
      type: String,
      value: 'horizontal'
    },
    activeColor: {
      type: String,
      value: GREEN
    }
  }
});