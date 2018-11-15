$(function () {
    var id = LeTao.getParamsByUrl().productId;
    getProductData(id, function (data) {
        // 清除加载状态
        $('.loading').remove();
        // 渲染商品详情页
        $('.mui-scroll').html(template('detail', data));
        // 初始化轮播图
        mui('.mui-slider').slider({
            interval: 2000
        });
        // 初始化区域滚动
        mui('.mui-scroll-wrapper').scroll({
            indicators: false
        });
        // 点击尺码选择，添加now样式
        $('.btn_size').on('tap', function () {
            $(this).addClass('now').siblings().removeClass('now');
        });
        // 数量的选择
        $('.p_number span').on('tap', function () {
            var $input = $(this).siblings('input');
            var currNum = $input.val();
            // 获取自定义属性max ==> 库存数量  ===> 不能超出
            var maxNum = parseInt($input.attr('data-max'));
            if ($(this).hasClass('jian')) {
                if(currNum == 0){
                    return false;
                }
                currNum--;
            } else {
                if(currNum >= maxNum){
                    mui.toast('库存不足');
                    return false;
                }
                currNum++;
            }
            $input.val(currNum);
        });
        // 点击添加购物车处理事件
        $('.btn_addCart').on('tap',function () {
            // 数据校验 ===> 尺码选择，件数
            var $changeBtn = $('.btn_size.now');
            if(!$changeBtn.length){
                mui.toast('请您选择尺码');
                return false;
            }
            var num = $('.p_number input').val();
            if( num <= 0){
                mui.toast('请您选择数量');
                return false;
            }
            // 校验登录的请求 ===> 提交数据
            // LeTao.loginAjax({
            //     url:'/cart/addCart',
            //     type:'post',
            //     data:{
            //         productId:id,
            //         num:num,
            //         size:$changeBtn.html()
            //     },
            //     dataType:'json',
            //     success:function (data) {
            //         if(data.success == true){
            //             mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
            //                 if (e.index == 0) {
            //                     location.href = LeTao.CART_URL;
            //                 } else {
            //                     //TODO
            //                 }
            //             })
            //         }
            //     }
            // });
            if(id%2 == 0) {
                location.href = LeTao.LOGIN_URL + '?returnUrl=' + location.href;
            }else {
                mui.confirm('添加成功，去购物车看看？', '温馨提示', ['是', '否'], function(e) {
                    if (e.index == 0) {
                        location.href = LeTao.CART_URL;
                    } else {
                        //TODO
                    }
                })
            }
        });
    })
});
var getProductData = function (productId, callback) {
    // $.ajax({
    //     url: '/product/queryProductDetail',
    //     type: 'get',
    //     data: {
    //         id: productId
    //     },
    //     dataType: 'json',
    //     success: function (data) {
    //         setTimeout(function () {
    //             callback && callback(data);
    //         }, 1000);
    //     }
    // });
    if(productId%2 == 0) {
        var data = {
            pic:[{picAddr:'http://img12.360buyimg.com/n1/jfs/t21841/245/2191975211/200162/40e2f9a7/5b4c32b9N911f59ec.jpg'},{picAddr:'http://img12.360buyimg.com/n1/jfs/t16792/301/1215300024/198851/4fd04588/5ac06e11N6ab89459.jpg'},{picAddr:'http://img12.360buyimg.com/n1/jfs/t19699/37/1243887710/385893/4f0705db/5ac06e11Nc5cd08aa.jpg'},{picAddr:'http://img12.360buyimg.com/n1/jfs/t18703/198/1202467154/150753/f67b8a5c/5ac06e12N64adf3c0.jpg'}],
            proName:'耐克NIKE 男子 气垫 跑步鞋 ZOOM WINFLO 5 缓震 运动鞋 AA7406-001',
            price:499,
            oldPrice:699,
            size:'38-45',
            num:6
        }       
    }else {
        var data = {
            pic:[{picAddr:'http://img10.360buyimg.com/n1/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'},{picAddr:'http://img10.360buyimg.com/n1/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'},{picAddr:'http://img10.360buyimg.com/n1/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'},{picAddr:'http://img10.360buyimg.com/n1/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],
            proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',
            price:568,
            oldPrice:888,
            size:'35-45',
            num:106
        }       
    }
    callback && callback(data)
};