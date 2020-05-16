const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    order:[],
    
  },
 
  onLoad: function (options) {
    let user = Bmob.User.current()
    let isAdmin = user.admin
    let objectId = user.objectId

    console.log('是否是管理员 '+isAdmin)
    let query = Bmob.Query("Recycle_Order");
    if(isAdmin){
      //如果是管理员则查询所有订单，并且订单状态是open
      query.equalTo('state', '==', 'open')
      query.find().then(res => {
        console.log(res)

        this.setData({
          order: res
        })
      });
    }else{
      //不是管理员查询当前登录用户的所有订单
      let pointer = Bmob.Pointer('_User')
      let poiID = pointer.set(objectId)
      query.equalTo('user', '==', poiID)
      query.find().then(res => {
        console.log(res)
        this.setData({
          order: res
        })
      });
    }
  },
  //打开详情界面
  goDetail: function(e){
    let index = e.currentTarget.dataset.index
    console.log(index)
    wx.navigateTo({
      url: '../detail/detail',
    })
  }
})