// pages/home/home.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const db = wx.cloud.database()

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
    //从数据库读取banner数据
    // db.collection('Home_Data').doc('982133855eafd2ac000a28c41b6f058d').get().then(res => {
    //   this.setData({
    //     swiperList:res.data.banner
    //   })
    // })

    

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
      type: 'wgs84',
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})