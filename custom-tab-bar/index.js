const wx2my = require('../wx2my');
const Behavior = require('../Behavior');
Component({
  properties: {
    current: {
      type: Number,
      value: 0
    }
  },
  data: {
    selected: 0,
    bgColor: "#fff",
    selectedBgColor: "#ffa019",
    color: "#ffa019",
    selectedColor: "#fff",
    list: [{
      "pagePath": "/pages/index/index",
      "iconPath": "static/images/home_g.png",
      "selectedIconPath": "static/images/home_o.png",
      "text": "首页"
    }, {
      "pagePath": "/pages/customer/customer",
      "iconPath": "static/images/cust_g.png",
      "selectedIconPath": "static/images/cust_o.png",
      "text": "联系客服"
    }, {
      "pagePath": "/pages/orders/orders",
      "iconPath": "static/images/order_g.png",
      "selectedIconPath": "static/images/order_o.png",
      "text": "我的订单"
    }]
  },
  lifetimes: {
    attached() {
      // “组件”生命周期attached()，而不是小程序生命周期,全局变量通过第三方变量赋值，
      // attached 节点树完成，可以用setData渲染节点，但无法操作节点
      this.setData({
        isShow: getApp().globalData.isShow
      });
    }

  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx2my.switchTab({
        url,

        success(res) {// console.log('success', res);
        },

        fail(error) {// console.log('fail', error);
        }

      });
      this.setData({
        selected: data.index
      });
    }

  }
});