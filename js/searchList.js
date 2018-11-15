$(function(){
    mui('.mui-scroll-wrapper').scroll({
        scrollY: true, //是否竖向滚动
        scrollX: false, //是否横向滚动
        startX: 0, //初始化时滚动至x
        startY: 0, //初始化时滚动至y
        indicators: false, //是否显示滚动条
        deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
        bounce: true//是否启用回弹
    });

    // 判断地址栏携带的key值，并显示在搜索框中
    if(location.search){
        var strs = location.search.substr(1).split("&")
        for(var i = 0; i < strs.length; i ++) {
            var arr = strs[i].split("=")
            if(arr[0] == 'key'){
                //对得到的数据进行url解码 ===> decodeURI
                window.proName = decodeURI(arr[1])
                $('.search_input').val(window.proName)
                break;
            }
        }
    }

    // 上拉加载 + 下拉刷新 初始化
    mui.init({
        pullRefresh: {
            container: '.mui-scroll-wrapper',
            down: {
                auto:true,
                callback: function(){
                    var that = this;
                    window.pageNum = 1;
                    // 请求搜索数据
                    getProductList($.extend({},window.params),function(data){
                        // 渲染到模板
                        $('#product_box').html(template('productTpl',{model:data}));
                        // 调用mui方法，结束刷新状态
                        that.endPulldownToRefresh();
                        that.refresh(true);
                    });
                }
            },
            up: {
                contentrefresh: '正在加载...',
                contentnomore:'没有更多数据了',
                callback: function(){
                    var that = this;
                    window.pageNum ++;
                    // 请求更多数据
                    getProductList($.extend({},window.params),function(data){
                        if(!data.data.length || data.data.length < 10){
                            that.endPullupToRefresh(true);
                            return false;
                        }
                        // 将渲染好的html追加
                        $('#product_box').append(template('productTpl',{model:data}));
                        that.endPullupToRefresh();
                    });
                }
            }
        }
    });

    $('body').on('tap','.cz_orderBar a', function (e) {
        var $this = $(e.currentTarget);

        if($this.hasClass('now')){
            // 如果有now的样式，则表明需要排序
            var $span = $this.find('span');
            if($span.hasClass('fa-angle-down')){
                $span.removeClass('fa-angle-down').addClass('fa-angle-up');
            }else{
                $span.addClass('fa-angle-down').removeClass('fa-angle-up');
            }
        }else{
            // 如果没有now的样式，则之前的箭头需要重置
            $('.cz_orderBar a').removeClass('now').find('span').attr('class','fa fa-angle-down');
        }
        // 添加排序条件
        $this.addClass('now');
        var key = $this.attr('data-type');
        var value = $this.find('span').hasClass('fa-angle-down')?1:2;
        window.params = {};
        window.params[key] = value;
        // 手动调用下拉刷新功能
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
    })
    // 点击搜索按钮事件处理
    .on('tap','.search_btn',function(){      
        var key = $.trim($('.search_input').val());
        if(!key){
            mui.toast('请输入关键字');
            return false;
        }
        window.proName = key;
        mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
        return false;
    });
});

var getProductList = function(params,callback){
    // $.ajax({
    //     type:'get',
    //     url:'/product/queryProduct?_='+Date.now(),
    //     data:{
    //         page:window.pageNum||1,
    //         size:10,
    //         proName:window.proName||'',

    //         brandId :params.brandId ||'',
    //         price :params.price ||'',
    //         num :params.num ||'',
    //         sale :params.sale ||'',
    //         time :params.time || ''
    //     },
    //     dataType:'json',
    //     success:function(data){
    //         callback && callback(data);
    //     },
    //     error:function(){
    //         mui('.mui-scroll-wrapper').pullRefresh().endPulldownToRefresh();
    //     }
    // });
    var data = {
                data:[
                    {id:1,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:2,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:3,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:4,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:1,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:5,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:6,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:7,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:8,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:9,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699},
                    {id:10,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/6011/19/6922/282700/5be15c3dE0a987179/36a891a5cc130479.jpg'}],proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋',price:499,oldPrice:699}
                ]
            }
    callback && callback(data)
}