// pages/home/home.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const app = getApp()
const Bmob = app.globalData.Bmob


Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: "获取定位中...",
    currentmoney: 0.00,
    objectId: '',
    count:0,
    swiperList: [],
    wasteInfo: "加载中请稍后..."
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    const query = Bmob.Query("Data");
    query.order("id")
    query.find().then(res => {
        that.setData({
          swiperList: res[0].value,
          wasteInfo: res[1].value.toString()
        })
    });


    wx.getLocation({
      fail: (res) => {},
      success: (result) => {
        var that = this
        var qqmapsdk = new QQMapWX({
          key: "SQUBZ-56BKJ-W2SF6-KMGS7-PDR65-V5BFF"
        })

        qqmapsdk.reverseGeocoder({
          location: {
            latitude: result.latitude,
            longitude: result.longitude
          },
          success: function (res) {
            console.log(res)
            that.setData({
              address: res.result.address
            })
          }
        })

      },
      type: 'gcj02',
    })

    let user = Bmob.User.current()

    if(user != null){
      let objectId = user.objectId
      this.setData({
        objectId
      })
    }
  
  },

  goThrough: function (e) {
    wx.navigateTo({
      url: '../through/through',
    })
  },

  goRecognize: function(e){
    wx.navigateTo({
      url: '../recognize/recognize',
    })
  },
  goCityService: function(e){
    wx.navigateTo({
      url: '../city/city',
    })
  },

  daySign: function(e){
    let user = Bmob.User.current()
    if(user != null){
      wx.navigateTo({
        url: '../sign/sign',
      })
    }else{
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    }
  },

  onShow: function (options) {
    var that = this
    let objectId = this.data.objectId
    const query = Bmob.Query('_User');
    query.get(objectId).then(res => {
      console.log(res)
      that.setData({
        currentmoney: res.money
      })
    }).catch(err => {
      console.log(err)
    })

    const query2 = Bmob.Query('Recycle_Order');
    query2.equalTo('user','==',objectId)
    query2.count().then(res => {
      console.log(res)
      that.setData({count: res})
    });

  }



})