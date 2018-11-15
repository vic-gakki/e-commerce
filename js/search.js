$(function(){
    // 页面的初始状态  ===> 渲染历史列表信息
    $('.search_input').val('');
    $('.cz_history').html(template('searchTpl',{model: getSearchData()}));

    
    $('body')
    // 事件委托方式绑定事件：点击搜索按钮，携带搜索框中的key值跳转页面
    .on('tap','.search_btn',function(){
        var key = $.trim($('.search_input').val());
        if(!key){
            mui.toast('请输入关键字');
            return false;
        }
        addSearchData(key);
        // 设置跳转
        window.location.href = LeTao.SEARCHLIST_URL+'?'+'key='+key;
        return false;
    })
    // 绑定点击清空历史记录按钮事件，将localStorage中相关信息清除，重新渲染历史记录列表
    .on('tap','.icon_clear ',function(){
        localStorage.clear();
        $('.cz_history').html(template('searchTpl',{model: getSearchData()}));
    })
    // 绑定点击列表项的删除按钮事件，根据点击对象的自定义key属性，从localStorage中删除指定项并重新渲染
    .on('tap','.icon_delete',function(){
        removeSearchData($(this).parent().find('[data-key]').attr('data-key'));
        $('.cz_history').html(template('searchTpl',{model: getSearchData()}));
    })
    // 绑定点击历史搜索记录实现页面跳转事件
    .on('tap','[data-key]',function(){
        window.location.href = LeTao.SEARCHLIST_URL+'?'+'key='+$(this).attr('data-key');
    })

});

/**
 * 从localStorage中获取存储的搜索历史记录信息
 * @return {Array}
 */
function getSearchData (){
    return JSON.parse(localStorage.getItem('leTaoSearchHistory') || '[]');
};


/**
 * 添加当前搜索记录至localStorage，如果存在，先删除再添加(提升位置)，否则直接添加
 * @param {String} key 
 */
function addSearchData (key){
    var list = getSearchData();
    $.each(list,function(i,item){
        if(item == key){
            list.splice(i,1);
        }
    });
    list.push(key);
    //最多记录10条
    if(list.length > 10){
        list.splice(0,list.length-10);
    }
    localStorage.setItem('leTaoSearchHistory',JSON.stringify(list));
};

/**
 * 删除指定历史记录项
 * @param  {String} key
 */
var removeSearchData = function(key){
    var list = getSearchData();
    $.each(list,function(i,item){
        if(item == key){
            list.splice(i,1);
        }
    });
    localStorage.setItem('leTaoSearchHistory',JSON.stringify(list));
};