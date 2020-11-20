const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// const { HTTP } = require("../../utils/http")
import { HTTP } from '../../utils/http.js';
let http = new HTTP();
const app = getApp();
Page({
    data: {
        customerList: []
    },

    onLoad() {
        wx2my.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 10000
        });
        app.globalData.isShow = true;
        this.getCustomerList();
    },

    onReady() {
        app.globalData.isShow = true;
    },

    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 1
            });
        }
    },
    onPullDownRefresh: function () {
        setTimeout(function () {
            wx2my.stopPullDownRefresh();
        })
    },

    getCustomerList() {
        let token = wx2my.getStorageSync('token');

        if (token) {
            http.request({
                url: '/alipay/info/list',
                success: res => {
                    console.log("联系客服信息", res);
                    if (res.status == 2000) {
                        let data = res.data;
                        wx2my.hideToast();
                        this.setData({
                            customerList: data
                        });
                    } else {
                        console.log(res.status);
                        my.showToast({
                            type: 'none',
                            content: res.message,
                            duration: 2000,
                        });
                    }
                }
            });
        } else {
            my.showToast({
                type: 'none',
                content: 'token不存在，您还未登录小程序！',
                duration: 2000,
            });
        }
    }

});