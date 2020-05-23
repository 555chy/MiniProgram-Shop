const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    order: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = Bmob.User.current()
    // let isAdmin = user.admin
    // let objectId = user.objectId
  
    let query = Bmob.Query("Recycle_Order");

    query.equalTo('state', '==', 'open')
    query.find().then(res => {
      console.log(res)
      this.setData({
        order: res
      })
    });
  },
  goDetail: function(e){
    
  }

  
})