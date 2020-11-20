const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
import { VantComponent } from '../common/component';
VantComponent({
  props: {
    title: String,
    border: {
      type: Boolean,
      value: true
    }
  }
});