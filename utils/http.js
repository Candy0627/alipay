const wx2my = require('../wx2my');
const Behavior = require('../Behavior');
// 测试服地址 https://devapi.morefun.zone
// 正式服地址 https://morebean.gamemorefun.com
// 将api接口的调用封装一个类，使用es6 class直接定义一个类，
// 定义一个类HTTP, request() 方法相当于函数，方法位于类中的时候，通常叫做方法不叫函数。
// es6中为一个类添加方法，不要function关键字。
// 在es6中,一个js文件就是一个模块，变量必须输出才能被使用
//大括号内的变量名，必须跟export对外接口的变量名一致
const tips = {
    1: "抱歉，出现了一个错误",
    2000: "请求成功",
    4000: "参数错误",
    4001: "常规错误",
    4003: "认证错误",
    4004: "请求地址错误",
    5000: "服务器错误"
};
import { config,getVersion } from "../config.js";
export class HTTP {
    request = async (params) =>  {
        // request (params){
        console.log('res221',params);
        //url, data, method
        if (!params.method) {
            params.method = 'GET';
            if(params.data) {
                console.log(typeof params.data);
                // params.data = JSON.stringify(params.data);
            }
        }

        let header = {
            'context-type': 'application/json',
            'token': config.token
        };

        if (config.token) {
            header['Authorization'] = 'Bearer ' + config.token;
        }

        // getVersion();

        console.log('config.api_base_url',config.api_base_url);

        await my.request({
            url: config.api_base_url + params.url,
            method: params.method,
            data: params.data,
            header: header,
            success: res => {
                console.log('223',res)
                // 状态是依据http的状态码进行判断，服务器返回4开头的状态码依然会在success中进行判断
                //es6 提供的两个字符串新的函数 startsWith endsWith
                //res.statusCode 中有可能有服务器返回的2**、4**、5**开头的状态码
                let code = res.statusCode.toString();

                if (code.startsWith('2')) {
                    
                    params.success(res.data);
                } else {
                    let error_code = res.data.error_code;
                    this._show_error(error_code)
                }
            },
            fail: err => {}
        });
    }

    _show_error(error_code){
        if(!error_code) {
            error_code = 1
        }
        wx.showToast({
            title: tips[error_code],
            icon: 'none',
            duration: 2000
        })
    }
}

// export default { HTTP };