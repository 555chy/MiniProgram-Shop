const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  data: {
    currentTab: 0,
    tabs: ["待回收","回收中","已回收"],
    open:[],
    received:[],
    fixed:[],
    arr:[],
    temp:[]
  },

  onLoad: function (options) {
   
  },
  onPullDownRefresh: function(options){
    this.query()
  },
  onShow: function(options){
    this.query()
  },
  goDetail: function (e) {
    let index = e.currentTarget.dataset.index
    let tab = this.data.currentTab
    var order = []
    if(tab == 0){
      order = this.data.open[index]
    }else if(tab == 1){
      order = this.data.received[index]
    }else{
      order = this.data.fixed[index]
    }
    
    wx.navigateTo({
      url: '../detail/detail',
      success: function (e) {
        e.eventChannel.emit('order', {
          order
        })
      }
    })
  },

  query: function(){
    var that = this
    let user = Bmob.User.current()
    let isLogin = user != null
    console.log('登录 ' + isLogin)
   
    if (isLogin) {
      let isAdmin = user.admin
      let objectId = user.objectId
      let query = Bmob.Query("Recycle_Order");
      let pointer = Bmob.Pointer('_User')
      let poiID = pointer.set(objectId)
      console.log("obj " + objectId)
      console.log('是否是管理员 ' + isAdmin)
      console.log('poiID ' + poiID)
      if (!isAdmin) {
          //不是管理员查询当前登录用户的所有订单
          query.equalTo('user', '==', poiID)
      }
      query.limit(80)
      query.order("-createdAt")
      query.find().then(res => {
        let length = res.length
        console.log(res)
        let hasData = length !== 0
        console.log('有数据 ' + hasData)
        var open = []
        var received = []
        var fixed = []
        var arr = []
        for(var i = 0; i < length; i++){
          let order = res[i]
          if(order.state == "open"){
            open.push(order)
          }
          if(isAdmin){
            if(order.state == "received" && order.admin.objectId == poiID.objectId){
              received.push(order)
            }
          }else{
            if(order.state == "received"){
              received.push(order)
            }
          }
          if(isAdmin){
            if(order.state == "fixed" && order.admin.objectId == poiID.objectId){
               fixed.push(order)
            }
          }else{
            if(order.state == "fixed"){
              fixed.push(order)
            }
          }
          
        }

        for(var i = 0; i < open.length; i++){
          let time = open[i].time
          let current = that.getCurrentTime()
          open[i].color =  time.search(current) == -1
        }

        for(var i = 0; i < received.length; i++){
          let time = received[i].time
          let current = that.getCurrentTime()
          received[i].color =  time.search(current) == -1
        }

        arr.push(open,received,fixed)

        console.log(arr)
        var temp = arr[0]

        this.setData({
          order: res,
          open,
          received,
          fixed,
          arr,
          temp,
          currentTab: 0
        })
      
      }).catch(err => {
        console.log(err)
      });
    } else {
      wx.getStorage({
        key: 'address',
        success: function (res) {
          let arr = res.data
          const query = Bmob.Query('Recycle_Order');
          let queryArr= []
          for(var i = 0; i < arr.length; i++){
            let phone = arr[i].phone
            console.log(phone)
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
            let length = res.length
            let hasData = length !== 0
            console.log('有数据 ' + hasData)
            var open = []
            var received = []
            var fixed = []
            var arr = []
            for(var i = 0; i < length; i++){
              let order = res[i]
              if(order.state == "open"){
                open.push(order)
              }
              if(order.state == "received"){
                received.push(order)
              }
              if(order.state == "fixed"){
                fixed.push(order)
              }
            }
            arr.push(open,received,fixed)
            let temp = arr[0]
            that.setData({
              open,
              received,
              fixed,
              arr,
              temp
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
        }
      })
      console.log('还未登录')
    }
  },


  changeTab: function(e) {
    let index = e.currentTarget.dataset.index
    console.log(index)
    let arr = this.data.arr
    let temp = arr[index]
    console.log(temp)
    this.setData({
      currentTab: index,
      temp
      
    });
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