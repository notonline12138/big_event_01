let address = 'http://api-breakingnews-web.itheima.net';

$.ajaxPrefilter(function (option) {

    // console.log(option);

    option.url = address + option.url;


    // 身份验证
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }

        //登录拦截
        option.complete = function (res) {
            // console.log(res);
            // console.log(res.responseJSON);

            let obj = res.responseJSON;
            if (obj.status == 1 && obj.message === '身份认证失败！') {
                //清空本地token
                localStorage.removeItem('token');

                //跳转到登录页面

                location.href = '/login.html'

            }

        }
    }



})