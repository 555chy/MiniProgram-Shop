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
    // let user = Bmob.User.current()
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

      for(var i = 0; i < res.length; i++){
        let time = res[i].time
        let current = this.getCurrentTime()
        res[i].color = time.search(current) != -1
      }

      this.setData({
        order: res,
        hasData,
        isShow: true
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
    let query = Bmob.Query("Recycle_Order");
    query.equalTo('state', '==', 'open')
    query.find().then(res => {
      console.log(res)
      setTimeout(function () {
        let hasData = res.length != 0

        for(var i = 0; i < res.length; i++){
          let time = res[i].time
          let current = that.getCurrentTime()
          res[i].color = time.search(current) != -1
        }

        that.setData({
          order: res,
          hasData
        })
        wx.stopPullDownRefresh()
      }, 2000)
      
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
  },
  refreshOrder: function(e){
    wx.startPullDownRefresh()
  },

  getCurrentTime: function(){
    var time = parseInt(new Date().getTime());
    let date = new Date(time)
    var year=date.getFullYear();
    var mon = date.getMonth()+1;
    var day = date.getDate();
    return year+'-' + mon + "-" + day
  }
  



  
})