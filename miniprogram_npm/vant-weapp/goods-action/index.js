const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
import { VantComponent } from '../common/component';
import { safeArea } from '../mixins/safe-area';
VantComponent({
  mixins: [safeArea()]
});