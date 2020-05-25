var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    modalHidden:true,
    showModalStatus: true,
    isAdmin: false,
    latitude: 26.084461,
    longitude: 119.254060,
    markers: [],
    polyline: [],
    order: {},
    orderState: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var query = wx.createSelectorQuery();
    query.select('.content').boundingClientRect()
    query.exec((res) => {
      this.setData({
        contentHeight: res[0].height
      });
    })

    let user = Bmob.User.current()
    let isAdmin = user.admin
    this.setData({
      isAdmin
    })

    var that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('order', function (data) {
      console.log(data)
      let order = data.order
      order.imgUrl = "../../icon/car.png";
      let location = order.location
      let latitude = location[0]
      let longitude = location[1]
      console.log(latitude + "|" + longitude)
      that.setData({
        order: order,
        latitude: latitude,
        longitude: longitude,
        markers: [{
          id: 0,
          latitude: 26.084461,
          longitude: 119.254060,
          iconPath: '../../icon/start.png'
        }, {
          id: 1,
          latitude: latitude,
          longitude: longitude,
          iconPath: '../../icon/end.png'
        }]
      })
    })
    var qqmapsdk = new QQMapWX({
      key: "SQUBZ-56BKJ-W2SF6-KMGS7-PDR65-V5BFF"
    })

    qqmapsdk.direction({
      mode: 'walking',
      from: {
        latitude: 26.084461,
        longitude: 119.254060
      },
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
        that.setData({
          polyline: [{
            points: pl,
            color: '#5AAEE3',
            width: 4
          }]
        })

      }),
      fail: (err => {
        console.log(err)
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
            that.order.state = 'received'
            that.setData({
              order
            })
          }).catch(err => {
            console.log(err)
            wx.hideLoading()
            wx.showToast({
              title: '接单失败',
            })
          })
        }
      }
    })
  },
  //完成订单
  showWindows: function (e) {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
   //事件处理函数
   bindViewTap: function() {
    this.setData({
      modalHidden:!this.data.modalHidden
    })
    
  },
  //确定按钮点击事件
  modalBindaconfirm:function(){
    this.setData({
      modalHidden:!this.data.modalHidden,
    })
  },
  //取消按钮点击事件
  modalBindcancel:function(){
    this.setData({
      modalHidden:!this.data.modalHidden,
    })
  },
})