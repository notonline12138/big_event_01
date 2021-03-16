$(function () {
    //渲染文章分类列表
    initArtCateList();


    //封装函数   通过ajax  获取数据渲染
    function initArtCateList() {
        $.ajax({
            url: '/my/article/cates',
            type: 'get',
            // data: {},
            // dataType: 'json',
            success: (res) => {
                // console.log(res)
                let htmlstr = template('tpl-art-cate', { data: res.data });
                $('tbody').html(htmlstr);
            }
        })

    }

    //添加文章分类 弹出框
    let layer = layui.layer;
    let indexAdd = null;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '在线调试',
            area: ['500px', '250px'],
            content: $('#dialog-add').html(),
        });
    })

    //添加文章分类 渲染
    $('body').on('submit', '#form-add', function (e) {
        //阻止默认事件 防止表单自动提交
        e.preventDefault();
        $.ajax({
            url: '/my/article/addcates',
            type: 'post',
            data: $(this).serialize(),
            dataType: 'json',
            success: (res) => {
                // 判断新增是否成功
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                //清空表单
                $('#form-add')[0].reset();
                //重新渲染页面
                initArtCateList();
                //关闭弹出框
                layer.close(indexAdd);
                //弹出正确提示
                layer.msg('恭喜添加成功', { icon: 6 });


            }
        })

    })

    //修改文章分类  
    let indexedit = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexedit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html(),
        });


        let Id = $(this).attr('data-id');
        let form = layui.form;
        $.ajax({
            url: '/my/article/cates/' + Id,
            type: 'get',
            success: (res) => {
                //判断
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                form.val('form-edit', res.data);
            }
        })

    })
    //修改文章分类 渲染
    $('body').on('submit', '#form-edit', function (e) {
        //阻止默认事件 防止表单自动提交
        e.preventDefault();

        $.ajax({
            url: '/my/article/updatecate',
            type: 'post',
            data: $(this).serialize(),
            // dataType: 'json',
            success: (res) => {
                // 判断新增是否成功
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                //清空表单
                $('#form-edit')[0].reset();
                //重新渲染页面
                initArtCateList();
                //关闭弹出框
                layer.close(indexedit);
                //弹出正确提示
                layer.msg('恭喜文章类别更新成功', { icon: 6 });

            }
        })

    })

    //删除
    $('tbody').on('click', '.btn-delete', function () {

        //先获取id,进入函数this指向就变了
        let Id = $(this).attr('data-id');
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                url: '/my/article/deletecate/' + Id,
                type: 'get',
                dataType: 'json',
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message, { icon: 5 })
                    }
                    //删除成功  渲染页面
                    initArtCateList();
                    layer.msg('恭喜删除成功!', { icon: 6 });
                }
            })

            //关闭提示框
            layer.close(index);
        });


    })






})