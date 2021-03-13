$(function () {
    // 点击注册
    $('#link-reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    })
    //点击登录
    $('#link-login').on('click', function () {
        $('.reg-box').hide();
        $('.login-box').show();
    })

    //自定义验证规则

    // layui中需要通过layui对象引入form对象
    let form = layui.form;

    form.verify({
        //密码验证
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        //确认密码
        repwd: function (value, item) {
            var pwd = $('.reg-box input[name="password"]').val();
            // console.log(value, item);

            if (value !== pwd) {
                return '两次密码输入不一致!';
            }
        }
    })

    //注册功能
    let layer = layui.layer;
    $('#form-reg').on('submit', function (e) {

        //阻止默认事件
        e.preventDefault();

        $.ajax({
            url: '/api/reguser',
            type: 'post',
            data: {
                username: $('.reg-box input[name="username"]').val(),
                password: $('.reg-box input[name="password"]').val()
            },
            dataType: 'json',
            success: (res) => {
                //判断返回状态
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                } else {
                    layer.msg(res.message, { icon: 6 });
                    $('#link-login').click();
                    $('#form-reg')[0].reset();
                }
            }
        })

    })


    //登录功能
    $('#form-login').on('submit', function (e) {

        //阻止默认事件
        e.preventDefault();

        $.ajax({
            url: '/api/login',
            type: 'post',
            // data: {
            //     username: $('.login-box input[name="username"]').val(),
            //     password: $('.login-box input[name="password"]').val()
            // },
            data: $(this).serialize(),
            dataType: 'json',
            success: (res) => {
                //判断返回状态
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                } else {
                    layer.msg(res.message, { icon: 6 });

                    // $('#form-login')[0].reset();

                    localStorage.setItem('token', res.token);

                    // location.href = '/index.html';
                }
            }
        })

    })


})