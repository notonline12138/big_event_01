$(function () {
    //1.初始化页面
    let form = layui.form;
    let layer = layui.layer;

    initCate();
    //封装函数
    function initCate() {
        $.ajax({
            url: '/my/article/cates',
            method: 'get',
            // data: {},
            // dataType: 'json',
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 })
                }

                let htmlStr = template('tpl-cate', { data: res.data });

                $('[name="cate_id"]').html(htmlStr);
                //需要从新渲染
                form.render();
            }
        })
    }

    //2 初始化富文本编辑器
    initEditor();




    // 3.1. 初始化图片裁剪器
    var $image = $('#image')

    // 3.2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3.3. 初始化裁剪区域
    $image.cropper(options)



    //4选择图片
    $('#btnChoose').on('click', function () {
        $('#coverFile').click();
    })


    //5 设置图片
    $('#coverFile').on('change', function (e) {
        var file = e.target.files[0];


        if (file === undefined) {
            return layer.msg('您可以选择一张图片当作文章标题', { icon: 6 })
        }
        var newImgURL = URL.createObjectURL(file);


        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域



    })



    //6 设置状态
    let state = '';
    $('#btnSave1').on('click', function () {
        state = '已发布';
    })
    $('#btnSave2').on('click', function () {
        state = '草稿';
    })

    //7 添加文章

    $('#form-pub').on('submit', function (e) {
        //阻止默认事件
        e.preventDefault();

        //创建fd对象
        var fd = new FormData(this);
        //存入状态
        fd.append('state', state);
        // 存入图片
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                publishArticle(fd);
            });
    })



    //封装 ,添加文章的方法
    function publishArticle(fd) {
        $.ajax({
            url: '/my/article/add',
            method: 'post',
            data: fd,
            contentType: false,
            processData: false,
            success: (res) => {
                // console.log(res)
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg('恭喜您,发布文章成功!', { icon: 6 });
                //跳转  这个会导致页面删除最后一个元素时不能跳转到上一页
                // location.href = '/article/art_list.html';
                //用定时器让页面出现发布成功在跳转
                setTimeout(function () {
                    window.parent.document.querySelector('#art_list').click();
                }, 1500)
            }
        })
    }

})