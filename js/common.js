//声明一个全局对象，用于存储全局方法和属性
if(!LeTao) var LeTao = {}

// 网址常量
LeTao.LOGIN_URL = '/user/login.html';
LeTao.CART_URL = '/user/cart.html';
LeTao.USER_URL = '/user/index.html';
LeTao.SEARCHLIST_URL = '/searchList.html';

/**
 * 获取地址栏的信息，将search部分内容转换为对象形式
 * @return {Object}
 */
LeTao.getParamsByUrl = function () {
    var params = {}
    var search = location.search
    if (search) {
        search = search.substr(1)
        var arr = search.split('&')
        arr.forEach(function (item, i) {
            var itemArr = item.split('=')
            params[itemArr[0]] = itemArr[1]
        })
    }
    return params
}

/**
 * 反序列化
 * @param  {String} serializeStr 
 * @return {Object}              
 */
LeTao.serialize2object = function (serializeStr) {
    var obj = {}
    if(serializeStr){
        var arr = serializeStr.split('&')
        arr.forEach(function (item,i) {
            var itemArr = item.split('=')
            obj[itemArr[0]] = itemArr[1]
        })
    }
    return obj
}

/**
 * 包装需要验证是否登录的ajax请求
 * @param  {Object} params 
 */
LeTao.loginAjax = function (params) {
    /*params====> {} */
    $.ajax({
        type: params.type || 'get',
        url: params.url || '#',
        data: params.data || '',
        dataType: params.dataType || 'json',
        success:function (data) {
            /*未登录的处理 {error: 400, message: "未登录！"}
            所有的需要登录的接口 没有登录返回这个数据*/
            if(data.error == 400){
                /*跳到登录页  把当前地址传递给登录页面  当登录成功按照这个地址跳回来*/
                location.href = LeTao.LOGIN_URL + '?returnUrl=' + location.href;
                return false;
            }else{
                params.success && params.success(data);
            }
        },
        error:function () {
            mui.toast('服务器繁忙');
        }
    });
};

/**
 * 根据id，返回在数组中的索引值
 * @param  {Array} arr 
 * @param  {String} id  
 * @return {}     index
 */
LeTao.getIndexFromId = function(arr,id){
    var index = null
    for(var i = 0 ; i < arr.length ; i++){
        var item = arr[i]
        if(item && item.id == id){
            index = i
            break
        }
    }
    return index
};

/**
 * 根据id，返回对象
 * @param  {Array}  arr 
 * @param  {String} id  
 * @return {Object}     
 */
LeTao.getObjectFromId = function(arr,id){
    var object = null
    for(var i = 0 ; i < arr.length ; i++){
        var item = arr[i]
        if(item && item.id == id){
            object = item
            break
        }
    }
    return object
};