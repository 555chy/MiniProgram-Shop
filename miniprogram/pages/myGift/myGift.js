const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    order: [],
    hasData: false,
    isShow: false,
    isAdmin: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    let user = Bmob.User.current()
    let isAdmin = user == null ? false: user.admin
    let objectId = user.objectId
    let query = Bmob.Query("Recycle_Goods")
  
    if(isAdmin){
      query.equalTo('received', '==', false)
    }else{
      let pointer = Bmob.Pointer('_User')
      let poiID = pointer.set(objectId)
      query.equalTo('user', '==', poiID)
      query.equalTo('type', '!=' , 1)
    }

    query.find().then(res => {
      console.log(res)
      wx.hideLoading()
      let hasData = res.length != 0
      this.setData({
        order: res,
        hasData,
        isShow: true,
        isAdmin
      })
    }).catch(err =>{
      wx.hideLoading()
      console.log(err)
      wx.showToast({
        title: err.error,
        icon: 'none'
      })
    });
  },

  onPullDownRefresh: function(options){
    var that = this
    let user = Bmob.User.current()
    let isAdmin = user == null ? false: user.admin
    let objectId = user.objectId
    let query = Bmob.Query("Recycle_Goods")
  
    if(isAdmin){
      query.equalTo('received', '==', false)
    }else{
      let pointer = Bmob.Pointer('_User')
      let poiID = pointer.set(objectId)
      query.equalTo('user', '==', poiID)
      query.equalTo('type', '!=' , 1)
    }
    query.find().then(res => {
      wx.stopPullDownRefresh()
      let hasData = res.length != 0
      that.setData({
        order: res,
        hasData,
        isShow: true
      })
    }).catch(err =>{
      wx.stopPullDownRefresh()
      console.log(err)
      wx.showToast({
        title: err.error,
        icon: 'none'
      })
    });
  },

  goDetail: function(e){
    let index = e.currentTarget.dataset.index
    let order = this.data.order[index]
    wx.navigateTo({
      url: '../goodDetail/goodDetail',
      success: function(e){
        e.eventChannel.emit('order',{order})
      }
    })
  },
  refreshOrder: function(e){
    wx.startPullDownRefresh()
  },

})