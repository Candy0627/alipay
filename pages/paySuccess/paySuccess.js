const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// pages/paySuccess/paySuccess.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goods_name: '',
    cdk: ''
  },

  /**
   * switchTab 跳转到tabBar 页面
   */
  toCustomer: function () {
    wx2my.reLaunch({
      url: '../customer/customer'
    });
    app.globalData.isShow = true;
  },
  toOrders: function () {
    wx2my.reLaunch({
      url: '../orders/orders'
    });
    app.globalData.isShow = true;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 截取地址栏参数 + setData 赋值
    console.log("跳转到支付成功的页面", options, options.cdk);
    this.setData({
      cdk: options.cdk,
      goods_name: options.goods_name
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  
  onPullDownRefresh: function () {
        setTimeout(function () {
            wx2my.stopPullDownRefresh();
        })
    }
});