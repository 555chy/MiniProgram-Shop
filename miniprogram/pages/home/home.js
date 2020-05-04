// pages/home/home.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: "获取定位中",
    swiperList:[{
      id:1,
      url:"//i3.meishichina.com/attachment/magic/2018/05/07/2018050715256619061988197577.jpg"
    },{
      id:2,
      url:"//i3.meishichina.com/attachment/magic/2020/04/13/2020041315867448189338197577.jpg"
    },{
      id:3,
      url:"//i3.meishichina.com/attachment/magic/2020/04/23/2020042315876364213708197577.jpg"
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