const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    order:[],
    hasData: true,
    isLogin: true,
    isShow: false,
    isAdmin: false
  },
 
  onLoad: function (options) {
    let user = Bmob.User.current()
    let isLogin = user != null
    console.log('登录 '+isLogin)
    wx.showLoading({
      title: '加载中',
    })
    this.setData({isLogin: isLogin})
    if(isLogin){
      let isAdmin = user.admin 
      let objectId = user.objectId
      let query = Bmob.Query("Recycle_Order");
      let pointer = Bmob.Pointer('_User')
      console.log('是否是管理员 '+isAdmin)
      if(isAdmin){
        //如果是管理员则查询当前接单的
        let poiID = pointer.set(objectId)
        query.equalTo('admin', '==', poiID)
      }else{
        //不是管理员查询当前登录用户的所有订单
        let poiID = pointer.set(objectId)
        query.equalTo('user', '==', poiID)
      }
      query.find().then(res => {
        let length = res.length
        let hasData = length !== 0
        console.log('有数据 '+hasData)
        this.setData({
          order: res,
          hasData,
          isAdmin,
          isShow: true
        })
        wx.hideLoading()
      }).catch(err =>{
        console.log(err)
      });
    }else{
      this.setData({
        hasData: false,
        isShow: true,
        isLogin: false
      })
      wx.hideLoading()
      console.log('还未登录')
    }
  },

  onPullDownRefresh: function(options){
    var that = this
    let user = Bmob.User.current()
    let isLogin = user != null
    this.setData({isLogin: isLogin})
    if(isLogin){
      let isAdmin = user.admin 
      let objectId = user.objectId
      let query = Bmob.Query("Recycle_Order");
      let pointer = Bmob.Pointer('_User')
      if(isAdmin){
        //如果是管理员则查询当前接单的
        let poiID = pointer.set(objectId)
        query.equalTo('admin', '==', poiID)
      }else{
        //不是管理员查询当前登录用户的所有订单
        let poiID = pointer.set(objectId)
        query.equalTo('user', '==', poiID)
      }
      query.find().then(res => {
        setTimeout(()=>{
          wx.stopPullDownRefresh()
          let length = res.length
          let hasData = length !== 0
          that.setData({
            order: res,
            hasData,
            isAdmin,
            isShow: true
          })
        },2000)
      }).catch(err =>{
        console.log(err)
      });
    }else{
      this.setData({
        hasData: false,
        isShow: true,
        isLogin: false
      })
      wx.hideLoading()
      console.log('还未登录')
    }
  },
  
  //打开详情界面
  goDetail: function(e){
    let index = e.currentTarget.dataset.index
    let order = this.data.order[index]

    wx.navigateTo({
      url: '../detail/detail',
      success: function(e){
        e.eventChannel.emit('order',{order})
      }
    })
  },

  goLogin: function(e){
    wx.navigateTo({
      url: '../login/login',
    })
  },
  goOrder: function(e){
    wx.navigateTo({
      url: '../recovery/recovery',
    })
  },
  goOrderShop: function(e){
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  }
})