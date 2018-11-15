$(function () {
    
    // 页面加载，调用请求一级分类数据的方法，并使用模板引擎渲染到页面上  ===> 模版的使用步骤：1.json数据  2.定义模版  3.调用模版  4.返回html
    getFirstCategoryData(function (data) {
        $('.cate_left ul').html(template('firstTemplate',data));

        // 获取渲染数据上的自定义id属性，根据一级分类的id去请求二级分类数据，默认第一次渲染第一个分类的二级分类
        var categoryId = $('.cate_left ul li:first-child').find('a').attr('data-id');

        // 调用渲染二级分类的方法
        render(categoryId);
    });

    // 利用事件委托的方式，为a标签绑定事件 ===>点击一级分类加载对应的二级分类
    $('.cate_left').on('tap','a',function (e) {
        // 当前选中的分类二级分类已经渲染，不用再去渲染
        if($(this).parent().hasClass('now')) return false;
        
        // 为点击的分类添加选中样式
        $('.cate_left li').removeClass('now');
        $(this).parent().addClass('now');
        
        // 根据当前分类的id，获取其二级分类数据，并渲染
        render( $(this).attr('data-id'));
    });
});

/**
 * 封装获取一级分类数据的方法
 * @param  {Function} callback 
 */
function getFirstCategoryData(callback) {
    // 发送ajax请求，调用给定的接口即可
    // $.ajax({
    //     url:'http://xxx.xxx.com/xxx/xxx',
    //     type:'get',
    //     data:'',
    //     dataType:'json',
    //     success:function (data) {
    //         callback && callback(data)
    //     }
    // });

    //定义假数据，请求成功返回的数据
    var data = {
        "rows":[
            {"id":1,"categoryName":"运动馆"},
            {"id":2,"categoryName":"女士馆"},
            {"id":3,"categoryName":"男士馆"},
            {"id":4,"categoryName":"户外馆"},
            {"id":5,"categoryName":"帆布馆"},
        ],
        "total":5
    }
    callback && callback(data)
};


/**
 * 封装获取二级分类数据的方法
 * @param  {Object}   params   根据一级分类的id获取数据
 * @param  {Function} callback 
 */
function getSecondCategoryData(params,callback) {
    // $.ajax({
    //     url:'/category/querySecondCategory',
    //     type:'get',
    //     data:params,
    //     dataType:'json',
    //     success:function (data) {
    //         callback && callback(data);
    //     }
    // });
    if(params.id % 2 == 1){
        var data = {
            rows:[
                {id:1,brandName:'adidas',brandLogo:'http://img10.360buyimg.com/babel/s200x100_jfs/t26026/254/52736029/4943/e4acd503/5b63cb74N42453165.jpg',categoryId:1},
                {id:2,brandName:'Nike',brandLogo:'http://img11.360buyimg.com/babel/s200x100_jfs/t24901/364/59571096/3461/349d9175/5b63cb7aN4b0ae785.jpg',categoryId:1},
                {id:3,brandName:'乔丹',brandLogo:'http://img11.360buyimg.com/babel/s200x100_jfs/t24238/27/1582913821/2831/2355c089/5b63d3b9N0b6c8949.jpg',categoryId:1},
                {id:4,brandName:'puma',brandLogo:'http://img13.360buyimg.com/babel/s200x100_jfs/t23809/145/1579759052/6409/fcf0d2b0/5b63cb81N4460e0d0.jpg',categoryId:1},
                {id:5,brandName:'361°',brandLogo:'http://img10.360buyimg.com/babel/s200x100_jfs/t20407/178/1174163730/9215/48d765ae/5b63d3b4N42c21aab.jpg',categoryId:1},
                {id:6,brandName:'peak',brandLogo:'http://img30.360buyimg.com/babel/s200x100_jfs/t22660/42/1594842444/5211/f37fe43a/5b63d3aeN11057629.jpg',categoryId:1},
            ]
        }    
    }else {
        var data = {
            rows:[
                {id:1,brandName:'百丽',brandLogo:'http://img.alicdn.com/bao/uploaded/TB1VcnvmgDD8KJjy0FdXXcjvXXa',categoryId:1},
                {id:2,brandName:'达芙妮',brandLogo:'http://img.alicdn.com/bao/uploaded/TB1hTcrk63z9KJjy0FmXXXiwXXa',categoryId:2},
                {id:3,brandName:'红蜻蜓',brandLogo:'http://img.alicdn.com/bao/uploaded/TB1j.HiIXXXXXahXXXXSutbFXXX.jpg',categoryId:2},
                {id:4,brandName:'卓诗尼',brandLogo:'http://img.alicdn.com/bao/uploaded/TB1DYgIu8nTBKNjSZPfXXbf1XXa',categoryId:2},
                {id:5,brandName:'戈美其',brandLogo:'http://img.alicdn.com/bao/uploaded/TB1OpeEl2iSBuNkSnhJXXbDcpXa',categoryId:2},
                {id:6,brandName:'天美意',brandLogo:'http://img.alicdn.com/bao/uploaded/TB17X5PIXXXXXauXFXXSutbFXXX.jpg',categoryId:2},
                {id:6,brandName:'大东',brandLogo:'http://img.alicdn.com/bao/uploaded/TB1v2GXvOMnBKNjSZFoXXbOSFXa',categoryId:2},
                {id:6,brandName:'鞋柜',brandLogo:'http://img.alicdn.com/bao/uploaded/TB1V51Nj6uhSKJjSspjXXci8VXa',categoryId:2},
                {id:6,brandName:'奥康',brandLogo:'http://img.alicdn.com/bao/uploaded/TB1.UA4g9rqK1RjSZK9XXXyypXa',categoryId:2},
            ]
        }    
    }
    callback && callback(data)
};

/**
 * 渲染二级分类数据
 * @param  {string} categoryId 
 */
function render(categoryId) {
    getSecondCategoryData({
        id:categoryId
    },function (data) {
        $('.cate_right ul').html(template('secondTemplate',data));
    });
}