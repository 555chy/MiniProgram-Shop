// pages/home/home.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');


Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: "获取定位中...",
    swiperList:[{
      id: 0,
      url: "https://img-blog.csdnimg.cn/20200506135707911.png"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getLocation({
      fail: (res) => {},
      success: (result) => {
        var that = this
        var qqmapsdk = new QQMapWX({
          key: "SQUBZ-56BKJ-W2SF6-KMGS7-PDR65-V5BFF"
        })

        qqmapsdk.reverseGeocoder({
          location:{
            latitude:result.latitude,
            longitude:result.longitude
          },
          success:function(res){
            console.log(res)
            that.setData({
              address: res.result.address
            })
          }
        })
        
      },
      type: 'gcj02',
    })

  },

  goThrough: function(e){
    wx.navigateTo({
      url: '../through/through',
    })
  }

 
  
})