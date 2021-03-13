let address = 'http://api-breakingnews-web.itheima.net';

$.ajaxPrefilter(function (option) {

    console.log(option);

    option.url = address + option.url;

})