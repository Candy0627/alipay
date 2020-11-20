const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
import { VantComponent } from '../common/component';
VantComponent({
  classes: ['header-class', 'footer-class'],
  props: {
    desc: String,
    title: String,
    status: String,
    useFooterSlot: Boolean
  }
});