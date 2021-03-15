$(function () {

    let form = layui.form;

    form.verify({


        // 自定义验证
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间!"
            }
        }
    })





    let layer = layui.layer;
    // 用户渲染
    initUserInfo();
    //封装函数
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            // type: 'get',
            method: 'get',
            // dataType: 'json',
            success: (res) => {
                // console.log(res)
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }

                form.val('formUserInfo', res.data);
            }
        })

    }

    //重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    //修改昵称和邮箱

    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            // dataType: 'json',
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                //成功
                layer.msg('恭喜您,用户信息修改成功', { icon: 6 });
                window.parent.getUserinfo();
            }
        })

    })













})