$(function () {
    // 初始化区域滚动
    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
    // 初始化下拉刷新
    mui.init({
        pullRefresh: {
            container: "#refreshContainer",
            down: {
                // 配置初始化时就下拉刷新一次
                auto:true,
                callback:function () {
                    var that = this;
                    setTimeout(function () {
                        getCartData(function (data) {
                            // 渲染页面
                            $('.mui-table-view').html(template('cart',data));
                            // 数据渲染完毕停止加载状态
                            that.endPulldownToRefresh();
                            // 注册刷新事件 防止多次绑定  先解绑再次绑定
                            $('.fa-refresh').off('click').on('tap',function () {
                                that.pulldownLoading();
                            });
                        });
                    },1000);
                }
            }
        }
    });

    // 侧滑弹出编辑对话框（尺码，数量）
    $('.mui-table-view').on('tap','.mui-icon-compose',function () {
        var id = $(this).parent().attr('data-id');

        // 根据商品id 获取该商品对象
        //var item = LeTao.getObjectFromId(window.cartData.data,id);
        
        var item = {
            id:1,
            pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],
            proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',
            price:568,
            oldPrice:888,
            num:3,
            size:40,
            productSize:'35-48',
            productNum:6
        }
        var html = template('edit',item);
        // confirm 在使用字符串作为内容的时候 '普通\n文字' \n 加上<br> \t 默认空格
        mui.confirm(html.replace(/\n/g,''), '商品编辑', ['确认', '取消'], function(e) {
            if (e.index == 0) {
                // 发送请求，修改数据
                var size = $('.btn_size.now').html();
                var num = $('.p_number input').val();
                LeTao.loginAjax({
                    type:'post',
                    url:'/cart/updateCart',
                    data:{
                        id:id,
                        size:size,
                        num:num
                    },
                    dataType:'json',
                    success:function (data) {
                        if(data.success == true){
                            // 直接修改缓存的数据  window.cartData.data，并重新渲染
                            item.num = num;
                            item.size = size;
                            $('.mui-table-view').html(template('cart',window.cartData));
                            /*整个列表重新渲染*/
                            //setAmount();
                        }
                    }
                });
                //return false;
            } else {
                //TODO
            }
        })
    });

    // 修改选中尺码样式
    $('body').on('tap','.btn_size',function () {
        $(this).addClass('now').siblings().removeClass('now');
    });

    // 修改数量
    $('body').on('tap','.p_number span',function () {
        var $input = $(this).siblings('input');
        var currNum = $input.val();
        var maxNum = parseInt($input.attr('data-max'));
        if ($(this).hasClass('jian')) {
            if(currNum <= 1){
                mui.toast('至少一件商品');
                return false;
            }
            currNum--;
        } else {
            // 不超库存
            if(currNum >= maxNum){
                mui.toast('库存不足');
                return false;
            }
            currNum++;
        }
        $input.val(currNum);
    });

    // 点击删除商品事件处理函数
    $('.mui-table-view').on('tap','.mui-icon-trash',function () {
        var $this = $(this);
        var id = $this.parent().attr('data-id');
        mui.confirm('您确认是否删除该商品？', '商品删除', ['确认', '取消'], function(e) {
            if (e.index == 0) {
                LeTao.loginAjax({
                    type:'get',
                    url:'/cart/deleteCart',
                    data:{
                        id:id
                    },
                    dataType:'json',
                    success:function (data) {
                        if(data.success == true){
                            /*删除*/
                            $this.parent().parent().remove();
                            setAmount();
                        }
                    }
                })
            } else {
                //TODO
            }
        })
    });
    /*5.点击复选框  计算总金额 */
    $('.mui-table-view').on('change','[type=checkbox]',function () {
        /* 总金额 = 每个商品数量*单价 的总和  */
        setAmount();
    });
});
/**/
var setAmount = function () {
    /*所有选中的复选框*/
    var $checkedBox = $('[type=checkbox]:checked');
    /*获取选中商品的ID*/
    /*$.each(i,item)    $dom.each(i,item)  arr.forEach(item,i) */
    var amountSum = 0;
    $checkedBox.each(function (i,item) {
        var id = $(this).attr('data-id');
        var item = LeTao.getObjectFromId(window.cartData.data,id);
        var num = item.num;
        var price = item.price;
        var amount = num * price;
        amountSum += amount;
    });
    $('#cartAmount').html(amountSum);
}
var getCartData = function (callback) {
    // LeTao.loginAjax({
    //     type:'get',
    //     url:'/cart/queryCartPaging',
    //     data:{
    //         page:1,
    //         /*不产生分页  需要修改接口*/
    //         pageSize:100
    //     },
    //     dataType:'json',
    //     success:function (data) {
    //         /*缓存的数据*/
    //         window.cartData = data;
    //         callback && callback(data);
    //     }
    // });
    var data = {
        data:[
            {id:1,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568,oldPrice:888,num:3,size:40,productSize:'35-48',productNum:6},
            {id:1,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568,oldPrice:888,num:3,size:40,productSize:'35-48',productNum:6},
            {id:1,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568,oldPrice:888,num:3,size:40,productSize:'35-48',productNum:6}
        ]
    }
    //缓存，编辑时需要数据
    window.cartData = data;
    callback && callback(data)
}