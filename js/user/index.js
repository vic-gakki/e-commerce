$(function(){
    getUserIndexData(function(data){
        var mobile = data.mobile||'暂无';
        $('.mui-media-body').html(data.username+'<p class="mui-ellipsis">绑定手机:'+data.mobile+'</p>');
    });

    $('body').on('tap','.btn_outLogin',function(){
        // getLoginOutData(function(data){
        //     if(data.success){
        //         location.href = LeTao.LOGIN_URL;
        //     }
        // });
        location.href = LeTao.LOGIN_URL;
    });
});

/**
 * 请求用户信息
 * @param  {Function} callback [description]
 */
var getUserIndexData = function(callback){
    // LeTao.ajax({
    //     type:'get',
    //     url:'/user/queryUserMessage',
    //     data:'',
    //     dataType:'json',
    //     success:function(data){
    //         callback && callback(data);
    //     }
    // });
    var data = {
        mobile:'18382268064',
        username:'xxv'
    }
    callback && callback(data)
};

/**
 * 登出操作，跳转页面
 * @param  {Function} callback [description]
 */
var getLoginOutData = function(callback){
    LeTao.ajax({
        type:'get',
        url:'/user/logout',
        data:'',
        dataType:'json',
        beforeSend:function(){
            $('.btn_login').html('正在退出...');
        },
        success:function(data){
            callback && callback(data);
        }
    });
};