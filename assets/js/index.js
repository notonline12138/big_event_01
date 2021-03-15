
//入口函数
$(function () {
    // 获取用户信息
    getUserinfo();

    //退出功能

    let layer = layui.layer;
    $('#logout').on('click', function () {
        //弹窗
        layer.confirm('是否确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something

            //清除token属性
            localStorage.removeItem('token');
            //跳转页面
            location.href = '/login.html';
            //关闭窗口
            layer.close(index);
        });

    })



})


// 获取用户信息封装成函数  在入口函数外面
//因为后面其他页面需要使用
function getUserinfo() {
    $.ajax({
        url: '/my/userinfo',
        type: 'get',
        data: {},
        // headers: {
        //     Authorization: localStorage.getItem('token') || '',
        // },
        dataType: 'json',
        success: (res) => {
            if (res.status !== 0) {
                return layer.msg(res.message, { icon: 5 });
            } else {
                renderAvatar(res.data);
            }
        }
    })

}


//头像
function renderAvatar(user) {
    let name = user.nickname || user.username;

    $('#welcome').html('欢迎' + name);

    if (user.user_pic !== null) {
        // 有头像
        $('.layui-nav-img').show().prop('src', user.user_pic);
        $('.text-avater').hide();
    } else {
        //文字头像
        $('.layui-nav-img').hide();
        $('.text-avater').show().html(name[0].toUpperCase());
    }

}