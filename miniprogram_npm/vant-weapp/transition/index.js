const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
import { VantComponent } from '../common/component';
import { transition } from '../mixins/transition';
VantComponent({
  classes: ['enter-class', 'enter-active-class', 'enter-to-class', 'leave-class', 'leave-active-class', 'leave-to-class'],
  mixins: [transition(true)]
});