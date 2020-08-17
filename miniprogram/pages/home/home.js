// pages/home/home.js
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const app = getApp()
const Bmob = app.globalData.Bmob
const innerAudioContext = wx.createInnerAudioContext();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    address: "获取定位中...",
    currentmoney: 0,
    objectId: '',
    count: 0,
    swiperList: [],
    time: 0
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
        swiperList: res[0].value
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

            that.setData({
              address: res.result.address
            })
          }
        })

      },
      type: 'gcj02',
    })

    let user = Bmob.User.current()
    if (user != null) {
      let objectId = user.objectId
      this.setData({
        objectId
      })

      if (user.admin) {
        let BmobSocketIo = new Bmob.Socket("4d7bba7512733061b4ca6c9f9b0a50d9")
        BmobSocketIo.onInitListen = function () {
          console.log("监听注册成功")
          BmobSocketIo.updateTable("Recycle_Order");
        };
  
        //监听服务器返回的更新表的数据
        BmobSocketIo.onUpdateTable = function (tablename, data) {
          if (tablename == "Recycle_Order") {
            if (data.state == "open") {
              console.log("listen", data)
              let currentTime = Math.round(new Date().getTime() / 1000)
              let time = that.data.time
              if (currentTime - time > 10) {
                that.setData({
                  time: currentTime
                })
                // play voice
                innerAudioContext.autoplay = true; //音频自动播放设置
                innerAudioContext.src = 'http://www.jipin.cloud/2020/08/08/60f8da794043b66c8042a307763e939b.mp3'; //链接到音频的地址
                innerAudioContext.play()
              }
            }
          }
        };
  
      }
    }

    

  },

  goThrough: function (e) {
    wx.getStorage({
      key: 'address',
      success: function(res){
        if(res.data.length > 0){
          wx.navigateTo({
            url: '../draw/draw',
          })
        }else{
          wx.showModal({
            title:'提示',
            content: '填写地址，工作人员好给您送奖品哦！',
            confirmText: '填写地址',
            success: (res)=>{
              if(res.confirm){
                wx.navigateTo({
                  url: '../addressAdd/addressAdd',
                })
              }
            }
          })
        }
      },
      fail: (err)=>{
        wx.showModal({
          title:'提示',
          content: '填写地址，工作人员好给您送奖品哦！',
          confirmText: '填写地址',
          success: (res)=>{
            if(res.confirm){
              wx.navigateTo({
                url: '../addressAdd/addressAdd',
              })
            }
          }
        })
      }
    })
  },

  goRecognize: function (e) {
    wx.navigateTo({
      url: '../recognize/recognize',
    })
  },
  goCityService: function (e) {
    wx.navigateTo({
      url: '../city/city',
    })
  },

  goReserve: function(e){
    wx.navigateTo({
      url: '../reserve/reserve',
    })
  },

  daySign: function (e) {
    let user = Bmob.User.current()
    if (user != null) {
      wx.navigateTo({
        url: '../sign/sign',
      })
    } else {
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
      let integral = res.integral
      const query2 = Bmob.Query('Recycle_Order');
      query2.equalTo('user', '==', objectId)
      query2.count().then(res => {
        that.setData({
          count: res,
          currentmoney: integral
        })
      });
   
    })

  },
  onUnload: function (option) {
    innerAudioContext.destroy()
  },
  onShareAppMessage: function(options){
  
  },
 

})