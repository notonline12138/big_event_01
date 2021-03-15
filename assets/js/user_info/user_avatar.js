$(function () {

    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //选择图片
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
    })

    let layer = layui.layer;
    //选择图片后,修改裁剪区域
    $('#file').on('change', function (e) {
        //如果事件是冒泡事件  e.target
        var file = e.target.files[0];
        //非空校验
        if (file === undefined) {
            return layer.msg('请选择用户头像', { icon: 5 });
        }
        //根据文件产生一个内存模拟地址
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })




    $('#btnensure').on('click', function () {

        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        console.log(dataURL);

        //获取ajax

        $.ajax({
            url: '/my/update/avatar',
            type: 'post',
            data: {
                avatar: dataURL
            },
            success: (res) => {
                //判断
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                //正确
                layer.msg('恭喜您,上传头像成功', { icon: 6 });
                window.parent.getUserinfo();
            }
        })

    })



    








})



