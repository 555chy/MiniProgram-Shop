const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = Bmob.User.current()
    let isAdmin = user.admin
    let objectId = user.objectId

    let relative = isAdmin ? 'admin' : 'user'

    let query = Bmob.Query("Recycle_Order");
    let pointer = Bmob.Pointer('_User')
    let poiID = pointer.set(objectId)
    query.equalTo(relative, '==', poiID)
    query.find().then(res => {
      console.log(res)
      this.setData({
        order: res
      })
    });
  },

  
})