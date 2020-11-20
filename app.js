const wx2my = require('./wx2my');
const Behavior = require('./Behavior');
import { HTTP } from './utils/http.js'; // 实例化一个对象,使用一个类下的实例方法

let http = new HTTP();
const tips = {
  2000: "请求成功",
  4000: "参数错误",
  4001: "常规错误",
  4003: "认证错误",
  4004: "请求地址错误",
  5000: "服务器错误"
};
App({
  globalData: {
    userInfo: null,
    isShow: true
  },

  onLaunch(options) {
    // 很关键的一个步骤：要每次获取token新值的时候清空之前的缓存中的旧的token值，app刚执行首次的时候，首先先置空缓存中token的值
    wx2my.setStorageSync({
      key:'token',
      data:''
    });
    // my.showLoading({
    //   content: "加载中...",
    //   delay: 1000,
    // });
  }

});