$(function(){
    $('body').on('tap','.btn_login',function(){
        var params = {
            username: $.trim($('[name="username"]').val()),
            password: $.trim($('[name="password"]').val())
        };
        if(!params.username || !params.password){
            mui.toast('请输入用户名或密码');
            return false;
        }

        // 检测用户是否在需要验证登录操作的页面跳转来过来的，如果是，跳转回去，不是则跳转个人中心
        // getLoginData(params,function(data){
        //     if(data.success){
        //         var returnUrl = LeTao.USER_URL;
        //         if(location.search){
        //             returnUrl = location.search.replace('?returnUrl=','');
        //         }
        //         location.href = returnUrl;
        //     }else if(data.error){
        //         mui.toast(data.message);
        //     }
        //     $('.btn_login').html('登录');
        // });
         
        location.href = LeTao.USER_URL;
    });
});

/**
 * 验证登录函数
 * @param  {Object}   data     
 * @param  {Function} callback 
 */
var getLoginData = function(data,callback){
    LeTao.ajax({
        type:'post',
        url:'/user/login',
        data:data,
        dataType:'json',
        beforeSend:function(){
            $('.btn_login').html('正在登录...');
        },
        success:function(data){
            callback && callback(data);
        }
    });
}