$(function () {


    let form = layui.form;
    form.verify({
        //密码验证
        pass: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],

        //新密码和旧密码不可以重复
        samePwd: function (value) {
            //value 是新输入的密码    旧密码需要获取一下
            if (value == $('[name="oldPwd"]').val()) {
                return '原密码和新密码不能相同'
            }

        },


        //两次新密码输入必须相同
        rePwd: function (value) {
            //value是第二次输入的新密码   第一次输入的新密码需要获取一下
            if (value !== $('[name="newPwd"]').val()) {
                return '两次输入的密码不一致!'
            }

        }


    });


    //表单提交  修改密码
    $('#password_form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/updatepwd',
            type: 'post',
            data: $(this).serialize(),
            dataType: 'json',
            success: (res) => {
                // console.log(res)
                //失败提示
                if (res.status !== 0) {
                    return layui.layer.msg(res.message, { icon: 5 });
                }

                //成功提示
                layui.layer.msg('修改密码成功', { icon: 6 });

                //清空form表单
                $('#password_form')[0].reset();

            }
        })

    })














})