const wx2my = require('../../../wx2my');
const Behavior = require('../../../Behavior');
import { VantComponent } from '../common/component';
VantComponent({
  relation: {
    type: 'ancestor',
    name: 'badge-group',

    linked(target) {
      this.parent = target;
    }

  },
  props: {
    info: null,
    title: String
  },
  methods: {
    onClick() {
      const {
        parent
      } = this;

      if (!parent) {
        return;
      }

      const index = parent.badges.indexOf(this);
      parent.setActive(index).then(() => {
        this.$emit('click', index);
        parent.$emit('change', index);
      });
    },

    setActive(active) {
      return this.set({
        active
      });
    }

  }
});