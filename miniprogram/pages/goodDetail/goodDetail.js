var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    showModalStatus: true,
    isAdmin: false,
    latitude: 0,
    longitude: 0,
    markers: [],
    polyline: [],
    order: {},
    imgUrl: "../../icon/car.png",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = Bmob.User.current()
    let isAdmin = user == null ? false: user.admin
    this.setData({
      isAdmin,
    }, () => {
      var query = wx.createSelectorQuery();
      query.select('.content').boundingClientRect()
      query.exec((res) => {
        this.setData({
          contentHeight: res[0].height
        });
      })
    })
    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('order', function (data) {
      let order = data.order
      let location = order.location
      console.log("qqqq",data)
      let latitude = location[0]
      let longitude = location[1]
      let imageUrl = order.preview == null ? '../../icon/car.png' : order.preview.url

      that.setData({
        imgUrl: imageUrl,
        order: order,
        latitude: latitude,
        longitude: longitude,
      }, () => {
       
        var qqmapsdk = new QQMapWX({
          key: "SQUBZ-56BKJ-W2SF6-KMGS7-PDR65-V5BFF"
        })
    
        qqmapsdk.direction({
          mode: 'walking',
          to: {
            latitude: that.data.latitude,
            longitude: that.data.longitude
          },
          success: (res => {
            var coors = res.result.routes[0].polyline
            var pl = []
            for (var i = 2; i < coors.length; i++) {
              coors[i] = coors[i - 2] + coors[i] / 1000000
            }
            for (var i = 0; i < coors.length; i += 2) {
              pl.push({
                latitude: coors[i],
                longitude: coors[i + 1]
              })
            }
            let start = pl[0]
            let end = pl[pl.length - 1]
            that.setData({
              polyline: [{
                points: pl,
                color: '#5AAEE3',
                width: 4
              }],
              markers: [{
                id: 0,
                latitude: start.latitude,
                longitude: start.longitude,
                iconPath: '../../icon/start.png'
              }, {
                id: 1,
                latitude: end.latitude,
                longitude: end.longitude,
                iconPath: '../../icon/end.png'
              }]
              
            })
    
          }),
          fail: (err => {
            console.log(err)
          })
        })
      })
    })
  
  },
  
  showModal: function () {
    const duration = 200;
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: duration,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(0).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), duration)
  },
  //隐藏对话框
  hideModal: function () {
    const duration = 200;
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: duration,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(this.data.contentHeight).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(this.data.contentHeight).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      });
    }.bind(this), duration)
  },
  togglePopup: function () {
    if (this.data.showModalStatus) {
      this.hideModal();
    } else {
      this.showModal();
    }
  },

  callPhone: function(){
    let isAdmin = this.data.isAdmin
    var that = this
    if(isAdmin){
      wx.showModal({
        title: '提示',
        content: '是否拨打电话',
        success (res) {
          if (res.confirm) {
            wx.makePhoneCall({
              phoneNumber: that.data.order.phone,
            })
          }
        }
      })
    
    }
  },
  preview: function(e){
    wx.previewImage({
      urls: [this.data.order.preview.url],
    })
  },

  finishOrder: function(e){
    var that = this
    wx.showModal({
      title: '提示',
      content: '确定送货完成吗',
      success (res) {
        if (res.confirm) {
          let objectId = that.data.order.objectId
          const query = Bmob.Query('Recycle_Goods');
          query.set('id', objectId) //需要修改的objectId
          query.set('received', true)
          query.save().then(res => {
            wx.reLaunch({
              url: '../recovery/recovery',
            })
          }).catch(err => {
            wx.showToast({
              title: '用户数据更新失败，请联系管理员',
              icon: 'none',
              duration: 3000
            })
          })
        
        } 
      }
    })
  }
})