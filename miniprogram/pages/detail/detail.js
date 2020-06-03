var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    modalHidden: true,
    showModalStatus: true,
    isAdmin: false,
    latitude: 0,
    longitude: 0,
    markers: [],
    polyline: [],
    order: {},
    orderState: '',
    money: 0,
    price: 0,
    isRecharge: false,
    imgUrl: "../../icon/car.png"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = Bmob.User.current()
    let isAdmin = user.admin
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
      console.log(location)
      let latitude = location[0]
      let longitude = location[1]
      let imageUrl = order.image == '' ? '../../icon/car.png' : order.image
      that.setData({
        imgUrl: imageUrl,
        order: order,
        latitude: latitude,
        longitude: longitude,
      }, () => {
        let order = that.data.order
        let user = order.user
        if(user != null){
          let userObjectId = user.objectId
          const query = Bmob.Query('_User')
          query.get(userObjectId).then(res => {
            console.log(res)
            that.setData({
              money: res.money
            })
          }).catch(err => {
  
          })
        }

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
  //显示对话框
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

  //点击接单
  receiveOrder: function (e) {
    var that = this
    wx.showModal({
      title: '提示',
      content: '是否要接单?',
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '接单中',
          })
          let user = Bmob.User.current()
          let order = that.data.order
          let orderId = order.objectId
          let objectId = user.objectId
          const query = Bmob.Query('Recycle_Order');
          const pointer = Bmob.Pointer('_User')
          const obj = pointer.set(objectId)
          query.set("admin", obj)
          query.set('id', orderId)
          query.set('state', 'received')
          query.save().then(res => {
            wx.hideLoading()
            wx.showToast({
              title: '接单成功',
            })
            that.data.order.state = 'received'
            that.setData({
              order
            })
          }).catch(err => {
            console.log(err)
            wx.hideLoading()
            wx.showToast({
              title: '接单失败',
              icon: 'none'
            })
          })
        }
      }
    })
  },
  //完成订单
  showWindows: function (e) {
    this.setData({
      modalHidden: false
    })
  },
  //确定按钮点击事件
  modalBindaconfirm: function () {
    let order = this.data.order
    let balance = this.data.money
    let orderId = order.objectId
    let price = parseInt(this.data.price)
    let user = order.user
    let hasUser = user != null

    if (price == '') {
      wx.showToast({
        title: '请输入成交价格',
        icon: 'none'
      })
      return
    }

    const query = Bmob.Query('Recycle_Order');
    query.set('id', orderId)
    query.set('price', price)
    query.set('state', 'fixed')
    query.save().then(res => {

      if (hasUser) {
        if(!this.data.isRecharge){
          wx.reLaunch({
            url: '../tip/tip',
          })
          return
        }
        let userObjectId = user.objectId
        let money = balance + price
        const query2 = Bmob.Query('_User')
        query2.set('id', userObjectId)
        query2.set('money', money)
        query2.save().then(res => {
          wx.reLaunch({
            url: '../tip/tip',
          })
        }).catch(err => {
          console.log(err)
          wx.showToast({
            title: '用户数据更新失败，请联系管理员',
            icon: 'none',
            duration: 3000
          })
        })
      }else{
        wx.reLaunch({
          url: '../tip/tip',
        })
      }
    }).catch(err => {
      wx.showToast({
        title: err.errMsg,
        icon: 'none'
      })
    })

    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },
  //取消按钮点击事件
  modalBindcancel: function () {
    this.setData({
      modalHidden: !this.data.modalHidden,
    })
  },
  getPrice: function (e) {
    let price = e.detail.value
    this.setData({
      price
    })
  },
  recharge: function(e){
    let value = e.detail.value
    let length = value.length
    let isRecharge = length == 1
    this.setData({
      isRecharge
    })
  }
})