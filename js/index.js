$(function () {
    // 区域滚动 初始化
    mui('.mui-scroll-wrapper').scroll({
        indicators:false
    });
    // 轮播图 初始化
    mui('.mui-slider').slider({
        interval:2000
    });

    getGoodsList(function(data){
   		$('.ct_product').html(template('productTpl',data));   	
    })
   
});

/**
 * 请求首页商品列表数据
 * @param  {Function} callback 
 */
function getGoodsList(callback){
	 // $.ajax({
  //   	url:'http://xxx.xxx.com/xxx',
  //   	data:'',
  //   	dataType: 'json',
  //   	success: function(data){
  //   		callback && callback(data)
  //   	},
  //   	err: function(){

  //   	}
  //   })
  var data = {
  	data:[
            {id:2,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00},
            {id:3,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00},
            {id:4,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00},
            {id:5,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00},
            {id:1,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00},
            {id:6,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00},
            {id:7,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00},
            {id:8,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00},
            {id:9,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00},
            {id:10,pic:[{picAddr:'http://img1.360buyimg.com/n6/jfs/t1/7659/8/6496/241516/5be15ef2E022f97a7/b3ee11afbf8ad057.jpg'}],proName:'阿迪达斯ADIDAS 2018秋季 男子 跑步系列 GALAXY 4 M 跑步鞋 B44622',price:568.00,oldPrice:888.00}
    ]
  }
  callback && callback(data)
}