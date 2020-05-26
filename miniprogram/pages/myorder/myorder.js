const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    order: [],
    hasData: false,
    isShow: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = Bmob.User.current()
    // let isAdmin = user.admin
    // let objectId = user.objectId
    
    wx.showLoading({
      title: '加载中',
    })
  
    let query = Bmob.Query("Recycle_Order");
    query.equalTo('state', '==', 'open')
    query.find().then(res => {
      console.log(res)
      wx.hideLoading()
      let hasData = res.length != 0
      this.setData({
        order: res,
        hasData,
        isShow: true
      })
    }).catch(err =>{
      wx.hideLoading()
      wx.showToast({
        title: err.errMsg,
        icon: 'none'
      })
    });
  },

  onPullDownRefresh: function(options){
    let query = Bmob.Query("Recycle_Order");
    query.equalTo('state', '==', 'open')
    query.find().then(res => {
      console.log(res)
      let hasData = res.length != 0
      this.setData({
        order: res,
        hasData
      })
      wx.stopPullDownRefresh()
    }).catch(err =>{
      wx.showToast({
        title: err.errMsg,
        icon: 'none'
      })
    });
  },

  goDetail: function(e){
    let index = e.currentTarget.dataset.index
    let order = this.data.order[index]
    wx.navigateTo({
      url: '../detail/detail',
      success: function(e){
        e.eventChannel.emit('order',{order})
      }
    })
  }



  
})