const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    order: [],
    hasData: true,
    isLogin: true,
    isShow: false,
    isAdmin: false
  },

  onLoad: function (options) {
    var that = this
    let user = Bmob.User.current()
    let isLogin = user != null
    console.log('登录 ' + isLogin)
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      isLogin: isLogin
    })
    
    if (isLogin) {
      let isAdmin = user.admin
      let objectId = user.objectId
      let query = Bmob.Query("Recycle_Order");
      let pointer = Bmob.Pointer('_User')
      let poiID = pointer.set(objectId)
      console.log("obj " + objectId)
      console.log('是否是管理员 ' + isAdmin)
      if (isAdmin) {
        //如果是管理员则查询当前接单的
        query.equalTo('admin', '==', poiID)
      } else {
        //不是管理员查询当前登录用户的所有订单
        query.equalTo('user', '==', poiID)
      }
      query.find().then(res => {
        console.log(res)
        let length = res.length
        let hasData = length !== 0
        console.log('有数据 ' + hasData)
        this.setData({
          order: res,
          hasData,
          isAdmin,
          isShow: true
        },()=>{
          wx.hideLoading()
        })
      
      }).catch(err => {
        console.log(err)
      });
    } else {
      wx.getStorage({
        key: 'address',
        success: function (res) {
          let arr = res.data
          console.log(arr)
          const query = Bmob.Query('Recycle_Order');
          let queryArr= []
          for(var i = 0; i < arr.length; i++){
            let phone = arr[i].phone
            const mQuery = query.equalTo("phone", "==", phone);
            queryArr.push(mQuery)
          }
          if(arr.length == 2){
            query.or(queryArr[0],queryArr[1])
          }
          if(arr.length == 3){
            query.or(queryArr[0],queryArr[1],queryArr[2])
          }

          if(arr.length == 4){
            query.or(queryArr[0],queryArr[1],queryArr[2],queryArr[3])
          }

          if(arr.length == 5){
            query.or(queryArr[0],queryArr[1],queryArr[2],queryArr[3],queryArr[4])
          }
          query.find().then(res => {
            console.log(res)
            that.setData({
              hasData: true,
              isShow: true,
              // isLogin: true,
              order: res
            }, () => {
              wx.hideLoading()
            })

          }).catch(err => {
            wx.hideLoading()
            wx.showToast({
              title: '查询出错请重试',
              icon: 'none'
            })
          })

        },
        fail: function (err) {
          console.log(err)
          wx.hideLoading()
          that.setData({
            hasData: false,
            isShow: true,
            // isLogin: true
          })
        }
      })
      console.log('还未登录')
    }
  },

  onPullDownRefresh: function (options) {
    var that = this
    let user = Bmob.User.current()
    let isLogin = user != null
    this.setData({
      isLogin: isLogin
    })
    if (isLogin) {
      let isAdmin = user.admin
      let objectId = user.objectId
      let query = Bmob.Query("Recycle_Order");
      let pointer = Bmob.Pointer('_User')
      if (isAdmin) {
        //如果是管理员则查询当前接单的
        let poiID = pointer.set(objectId)
        query.equalTo('admin', '==', poiID)
      } else {
        //不是管理员查询当前登录用户的所有订单
        let poiID = pointer.set(objectId)
        query.equalTo('user', '==', poiID)
      }
      query.find().then(res => {
        setTimeout(() => {
          wx.stopPullDownRefresh()
          let length = res.length
          let hasData = length !== 0
          that.setData({
            order: res,
            hasData,
            isAdmin,
            isShow: true
          })
        }, 2000)
      }).catch(err => {
        console.log(err)
      });
    } else {
      wx.getStorage({
        key: 'address',
        success: function (res) {
          let arr = res.data
          console.log(arr)
          const query = Bmob.Query('Recycle_Order');
          let queryArr= []
          for(var i = 0; i < arr.length; i++){
            let phone = arr[i].phone
            const mQuery = query.equalTo("phone", "==", phone);
            queryArr.push(mQuery)
          }
          if(arr.length == 2){
            query.or(queryArr[0],queryArr[1])
          }
          if(arr.length == 3){
            query.or(queryArr[0],queryArr[1],queryArr[2])
          }

          if(arr.length == 4){
            query.or(queryArr[0],queryArr[1],queryArr[2],queryArr[3])
          }

          if(arr.length == 5){
            query.or(queryArr[0],queryArr[1],queryArr[2],queryArr[3],queryArr[4])
          }
          query.find().then(res => {
            console.log(res)
            that.setData({
              hasData: true,
              isShow: true,
              // isLogin: true,
              order: res
            }, () => {
              wx.stopPullDownRefresh()
              wx.hideLoading()
            })

          }).catch(err => {
            wx.hideLoading()
            wx.stopPullDownRefresh()
            wx.showToast({
              title: '查询出错请重试',
              icon: 'none'
            })
          })

        },
        fail: function (err) {
          console.log(err)
          wx.hideLoading()
          that.setData({
            hasData: false,
            isShow: true,
            // isLogin: true
          })
        }
      })
      console.log('还未登录')
    }
  },

  //打开详情界面
  goDetail: function (e) {
    let index = e.currentTarget.dataset.index
    let order = this.data.order[index]

    wx.navigateTo({
      url: '../detail/detail',
      success: function (e) {
        e.eventChannel.emit('order', {
          order
        })
      }
    })
  },

  goLogin: function (e) {
    var that = this
    let phone = this.data.phone

  },
  goOrder: function (e) {
    wx.navigateTo({
      url: '../reserve/reserve',
    })
  },
  goOrderShop: function (e) {
    wx.navigateTo({
      url: '../myorder/myorder',
    })
  }

})