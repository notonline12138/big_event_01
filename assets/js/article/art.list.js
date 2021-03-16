$(function () {

    //为模板引擎添加函数   时间过滤器

    // template.defaults.imports.dateFormt = function (dtstr) {
    template.defaults.imports.dateFormt = function (dtstr) {
        var dt = new Date(dtstr);


        //获取年
        var y = dt.getFullYear();
        //获取月
        var m = padZero(dt.getMonth() + 1);
        //获取日期
        var d = padZero(dt.getDate());

        // 获取小时
        var hh = padZero(dt.getHours());
        //获取分钟
        var mm = padZero(dt.getMinutes());
        //获取秒
        var ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + '     ' + hh + '-' + mm + ':' + ss

    }
    //个位数补零
    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }
    //定义提交参数
    let p = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    let layer = layui.layer;
    initTable();
    // 初始化渲染文章列表
    function initTable() {
        $.ajax({
            url: '/my/article/list',
            type: 'get',
            data: p,
            dataType: 'json',
            success: (res) => {
                // console.log(res)
                if (res.status != 0) {
                    return layer.msg('获取文章列表失败!', { icon: 5 });
                }
                let htmlStr = template('tpl-table', { data: res.data });
                $('tbody').html(htmlStr);
                //初始化渲染以后加载分页
                renderPage(res.total)
            }
        })

    }

    //渲染文章分类
    let form = layui.form;
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



    //筛选
    $('#form-search').on('submit', function (e) {
        //阻止默认事件
        e.preventDefault();
        let cate_id = $('[name="cate_id"]').val();
        let state = $('[name="state"]').val();

        p.cate_id = cate_id;
        p.state = state;
        initTable();
    })

    //分页
    var laypage = layui.laypage;
    function renderPage(total) {

        //执行一个laypage实例
        laypage.render({
            elem: 'pageBox',//注意，这里的 test1 是 ID，不用加 # 号
            count: total, //数据总数，从服务端得到
            limit: p.pagesize,//每页显示的条数
            curr: p.pagenum,//初始化页面
            layout: ['prev', 'limit', 'page', 'next', 'refresh'],
            limits: [2, 3, 5, 7, 10],

            //页面切换触发这个函数
            jump: function (obj, first) {
                // do something
                if (!first) {
                    //把页码值赋给q中的pagenum
                    p.pagenum = obj.curr;
                    //渲染页面
                    p.pagesize = obj.limit;
                    initTable();
                }

            }

        })
    }

    //删除

    $('tbody').on('click', '.btn-delete', function () {

        let Id = $('.btn-delete').attr('data-id');
        //弹出询问框
        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //ajax
            $.ajax({
                url: '/my/article/delete/' + Id,
                method: 'get',
                // data: {},
                // dataType: 'json',
                success: (res) => {
                    if (res.status != 0) {
                        return layer.msg(res.message, { icon: 5 })
                    }
                    layer.msg('恭喜删除成功', { icon: 6 });
                    //页面汇总删除按钮等于1  并且页码要大一1
                    if ($('.btn-delete').length === 1 && p.pagenum > 1) {
                        p.pagenum--;
                    }
                    //重新渲染页面
                    initTable();
                }
            })

            layer.close(index);
        });


    })

})

