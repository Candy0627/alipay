const wx2my = require('../../wx2my');
const Behavior = require('../../Behavior');
import { HTTP } from '../../utils/http.js';
let http = new HTTP();

var util = require('../../utils/util');

const app = getApp();

Page({
    data: {
        page: 1,
        pages: 0,
        loading: false,
        loadingMore: false,
        loadingMoreComplete: false,
        noData: false,
        orderList: []
    },

    onLoad(options) {
        wx2my.showToast({
            title: '加载中...',
            icon: 'loading',
            duration: 10000
        });
        app.globalData.isShow = true;
        this.fetchArticleList(1, true);
    },

    onShow() {
        if (typeof this.getTabBar === 'function' && this.getTabBar()) {
            this.getTabBar().setData({
                selected: 2
            });
        }
    },

    onPullDownRefresh() {
        // 触发下拉刷新时执行,请求第一页数据
        this.fetchArticleList(1, true);
    },

    onReachBottom() {
        if (this.data.page < this.data.pages) {
            this.setData({
                loadingMore: true,
                loadingMoreComplete: false
            });
            this.data.page++;
            setTimeout(() => {
                this.fetchArticleList(this.data.page);
            }, 300);
        } else {
            this.setData({
                loadingMore: false,
                loadingMoreComplete: true
            });
        }
    },

    fetchArticleList(pageNo, override) {
        let token = wx2my.getStorageSync('token');
        if(token) {
            http.request({
                url: '/alipay/order/list?page=' + pageNo + "&page_size=" + 6,
                success: res => {
                    console.log("订单列表接口", res);

                    if (res.status == 2000) {
                        wx2my.hideToast();

                        if (override == true) {
                            this.setData({
                                loadingMoreComplete: false
                            });
                            wx2my.stopPullDownRefresh();
                        }

                        let data = res.data;
                        const orderList = data.order_list;

                        if (orderList.length == 0) {
                            this.setData({
                                noData: true,
                                loadingMoreComplete: false
                            });
                        }

                        this.data.pages = Math.ceil(data.total / 6);
                        
                        console.log("此时除之后的总共几页取整", this.data.pages);

                        this.setData({
                            page: pageNo,
                            pages: this.data.pages,
                            orderList: override ? orderList : this.data.orderList.concat(orderList),
                            LoadingMore: true
                        });

                        this.data.orderList.forEach(item => {
                            if (item.exchange_time) {
                                item.exchange_time = util.formatTime(item.exchange_time, 'YY-MM-DD');
                            }
                        });

                        this.setData({
                            orderList: this.data.orderList
                        });

                    } else {
                        console.log(res.status);
                    }
                }
            });
        } else {
            my.showToast({
                type: 'none',
                content: 'token不存在，您还未登录小程序！',
                duration: 3000,
            });
        }
    },

    handleCopy(e) {
        let redeem_code = e.currentTarget.dataset.id;
        wx2my.setClipboardData({
            data: redeem_code,
            success: res => {
                wx2my.getClipboardData({
                    success: res => {
                        console.log(res.data);
                    }
                });
            }
        });
    }

});