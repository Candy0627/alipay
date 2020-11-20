const wx2my = require('./wx2my');
const Behavior = require('./Behavior');
let token = wx2my.getStorageSync('token');

const config = {
    api_base_url: '',
    token: token
};
const version = {
    release1: "v1.1.0",
    trial1: "v1.1.0"
};

// my.alert({
//     title: 'v1',
// });



let getVersion = async function() {
    await wx2my.request({
        url: 'https://devapi.morefun.zone' + '/alipay/version?version=' + version.trial1,
        success: res => {
            let data = res.data;
            if (data.status == 2000) {
                my.alert({
                    title: data.data.version_api_host,
                });
                config.api_base_url = data.data.version_api_host;
            } else {
                my.showToast({
                    type: 'none',
                    content: data.message,
                    duration: 3000,
                });
            }
        },
        fail: err => {}
    });
}


let getAuthKey =  async function() {
    // my.alert({
    //     title: '执行了吗',
    // });
    let token = my.getStorageSync({key:'token'});
    let _token = token.data;

    if (_token) {
        console.log('token 1', _token)
        return
    }
    await my.getAuthCode({
        scopes: 'auth_base', 
        success: (res) => {
            let code = res.authCode;
            my.alert({
                title: '33执行了吗'+code,
            });
            wx2my.request({
                url: config.api_base_url + '/alipay/login',
                data: {
                    authCode: code
                },
                method: 'post',
                success: res => {
                    my.alert({
                        title: '44执行了吗'+ res.data.data.token,
                    });
                    let data = res.data;
                    if (data.status == 2000) {
                        // resolve(data.data.token);
                        my.setStorageSync({
                            key:'token',
                            data:{
                                'token':data.data.token
                            }
                        });
                        config.token = "";
                        config.token = data.data.token;
                    } else {
                        // reject(data.message);
                        console.log(data.message);
                        my.showToast({
                            type: 'none',
                            content: data.message,
                            duration: 3000,
                        });
                    }
                },
                fail: err => {}
            });
        }
    })
}

export {config,getVersion,getAuthKey};