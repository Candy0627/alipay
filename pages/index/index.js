const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
// import '../http.js'
import { HTTP } from '../../utils/http.js';
import { config, getVersion, getAuthKey } from '/config.js';
let http = new HTTP();
const app = getApp();
Page({
    data: {
        token: "",
        show: true,
        toView: "",
        motto: 'Mcion_Store',
        indicatorDots: true,
        autoplay: true,
        interval: 3000,
        duration: 300,
        beforeColor: "white",
        //指示点颜色
        afterColor: "#ffa019",
        //当前选中的指示点颜色coral(也是橘色)
        userInfo: {},
        toUrl: '',
        isShowUrl: false,
        page: 1,
        pages: 0,
        loadingMore: false,
        loadingMoreComplete: false,
        noData: false,
        bannerList: [],
        goodsList: []
    },
    bindViewTap: function () {
        wx2my.navigateTo({
            url: '../logs/logs'
        });
    },
    onLoad: function () {

        my.showLoading({
            content: '加载中...',
            delay: 1000
        });

        // getVersion.then((res) => {
        //     console.log("版本号promise", res);
        //     return getAuthKey.then((res) => {
        //         console.log('真机返回的promise了吗', res);
        //     })
        // })

        getAuthKey();

        this.getBannerList();
        this.getGoodsList(1,true); 

    },
    onReady: function () { },

    onShow() {

        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 0
            });
        }
    },
    wxLogin: function () { },
    onPullDownRefresh: function () {
        this.getGoodsList(1, true); //模拟加载  1秒
        setTimeout(function () {
            wx2my.stopPullDownRefresh(); //停止下拉刷新
        }, 500);
    },
    onReachBottom() {
        // 页面上拉触底时执行
        if (this.data.page < this.data.pages) {
            this.setData({
                loadingMore: true,
                loadingMoreComplete: false
            });
            this.data.page++;
            console.log("此时的页数是多少了", this.data.page);
            setTimeout(() => {
                this.getGoodsList(this.data.page);
            }, 300);
        } else {
            this.setData({
                loadingMore: false,
                loadingMoreComplete: true
            });
        }
    },
    getBannerList: function () {

        // my.hideLoading({
        //     page: this,
        // });
        console.log('banner22',http);
        http.request({
            url: '/alipay/banner/list',
            success: (res) => {
                if (res.status == 2000) {
                    console.log("此时的banner数据", res);
                    this.setData({
                        bannerList: res.data
                    });
                } else {
                    my.showToast({
                        type: 'none',
                        content: res.message,
                        duration: 3000,
                    });
                    // console.log(res.status);
                }
                my.hideLoading({
                    page: this
                });
            }
        });
    },
    /**
     * 获取首页商品列表
     * */
    getGoodsList: function (pageNo, override) {
        my.hideLoading({
            page: this,
        });

        http.request({
            url: '/alipay/goods/list?page=' + pageNo + '&page_size=' + 6,
            success: res => {
                if (res.status == 2000) {
                    let data = res.data;
                    wx2my.hideToast();

                    if (override == true) {
                        wx2my.stopPullDownRefresh();
                    }

                    const goodsList = data.data_list;

                    if (goodsList.length == 0) {
                        this.setData({
                            noData: true,
                            loadingMoreComplete: false
                        });
                    }

                    this.data.pages = Math.ceil(data.total / 6);
                    this.setData({
                        page: pageNo,
                        pages: this.data.pages,
                        goodsList: override ? goodsList : this.data.goodsList.concat(goodsList),
                        LoadingMore: true
                    });
                } else {
                    my.showToast({
                        type: 'none',
                        content: res.message,
                        duration: 3000,
                    });
                }
            }
        });
    },
    handleClickBuy: function (e) {

        my.showLoading({
            content: '加载中...',
            delay: 1000
        });

        http.request({
            url: '/alipay/create/order',
            data: {
                id: e.currentTarget.dataset.id
            },
            method: 'post',
            success: (res) => {
                console.log("创建订单接口", res);
                if (res.status == 2000) {
                    let data = res.data;
                    const order_id = data.order_id;
                    const trade_no = data.trade_no;
                    my.tradePay({
                        tradeNO: trade_no,
                        success: (res) => {
                            console.log("支付成功！", res);
                            this.payComplete(order_id, 1);
                        },
                        fail: (res) => {
                            console.log("支付失败！", res);
                            my.showToast({
                                type: 'none',
                                content: "支付失败！",
                                duration: 2000
                            })
                            this.payComplete(order_id, 0);
                        }
                    })
                } else {
                    my.showToast({
                        type: 'none',
                        content: res.message,
                        duration: 2000,
                    });
                }
            },
            fail: (res) => {
            },
            complete: (res) => {
                my.hideLoading();
            }
        })
    },
    payComplete: function (orderId, pay_status) {

        my.showLoading({
            content: '加载中...',
            delay: 1000
        });

        http.request({
            url: '/alipay/order/search?transaction_id=' + orderId + '&pay_status=' + pay_status,
            methods: 'get',
            success: res => {
                if (res.status == 2000) {
                    my.hideLoading();
                    app.globalData.isShow = false;
                    let data = res.data;
                    const cdk = data.cdk;
                    const goods_name = data.goods_name;
                    const pay_status = data.pay_status;
                    console.log("查询订单数据", data);
                    if (pay_status == 'SUCCESS') {
                        my.navigateTo({
                            url: '/pages/paySuccess/paySuccess?goods_name=' + goods_name + '&cdk=' + cdk
                        })
                    } else {
                        my.showToast({
                            type: 'none',
                            content: res.message,
                            duration: 2000
                        })
                        // my.navigateTo({
                        // 	url: '/pages/index/index'
                        // })
                    }
                }
            }
        })

    },
    toPaySuccess: function () {
        app.globalData.isShow = false;
        wx2my.navigateTo({
            url: '../paySuccess/paySuccess'
        });
    },
    tap: function () {
        this.setData({
            toView: "top"
        });
    },
    goToUrl: function (e) {
        console.log("banner点击跳转链接", e);
        const url = e.currentTarget.dataset.url;

        if (url) {
            wx2my.navigateTo({
                url: '../out/out?url=' + url,
                success: res => { },
                fail: err => { }
            });
        }
    }
});