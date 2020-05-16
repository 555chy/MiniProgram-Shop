const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  /**
   * 页面的初始数据
   */
  data: {
    hasPhoto: false,
    name: "收件人姓名",
    phone: "手机号码",
    address: "收货地址",
    imageUrl: "../../icon/category.png",
    goods:[],
    totalPrice: 0,
    yuyueTime: "选择预约上门的时间",
    detailTime: '选择具体的时间',
    remark: "可描述商品状态、特殊要求等",
    timeList: [['今天', '明天'], ['上午 9:30-10:30', '上午 10:30-11:30','下午 2:00-4:00','下午 4:00-6:00','晚上 6:00-8:00']],
    wasteInfo: ""
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let that = this
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('commit', function(data) {
      console.log(data)
      let goodsArr = data.goods
      var price = 0
      var waste = ""

      for (let i = 0; i < goodsArr.length; i++) {
        const pri = goodsArr[i].price;
        const number = goodsArr[i].num
        const name = goodsArr[i].name
        const type = goodsArr[i].type === 1 ? '个' : '斤'
        
        if(number > 0){
          price += pri * 100 * number / 100
          var temp = ""
          temp = name + number + type
          waste += temp
        }
  
      }
      that.setData({
        goods: goodsArr,
        totalPrice: price,
        wasteInfo: waste
      })
    })
  },
  /**
   * 进入收货地址管理
   */
  addressManager: function(e){
    let that = this
    wx.chooseAddress({
      success (res) {
        console.log(res)
        let add = res.provinceName + res.cityName + res.countyName + res.detailInfo
        that.setData({
          name: res.userName,
          phone: res.telNumber,
          address: add
        })
      }
    })
  },
/**
 * 选择图片
 */
getPhoto: function(e){
  var that = this
  wx.showActionSheet({
    itemList: ['拍照','相册'],
    success(res){
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: [res.tapIndex === 1 ? 'album' : 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          that.setData({
            hasPhoto: true,
            imageUrl: tempFilePaths
          })
        }
      })
    }
  })
},
//选择预约日期
selectTime: function(e){
  let time = e.detail.value
  let i1 = time[0]
  let i2 = time[1]

  let date = this.data.timeList
  let str = date[0][i1] + " " + date[1][i2]
  this.setData({
    yuyueTime: str
  })
  
},
//获取留言备注
getRemark: function(e){
  this.setData({
    remark: e.detail.value
  })

},

//立即预约
commit: function(e){
  wx.showLoading({
    title:'提交中'
  })
  let name = this.data.name
  let phone = this.data.phone
  let address = this.data.address
  let time = this.data.yuyueTime
  let remark = this.data.remark
  let wasteInfo = this.data.wasteInfo
  let obj = Bmob.User.current().objectId

  const query = Bmob.Query('Recycle_Order');
  const pointer = Bmob.Pointer('_User')
  const objectId = pointer.set(obj)

  query.set("name",name)
  query.set("phone",phone)
  query.set("address",address)
  query.set("time",time)
  query.set("remark",remark)
  query.set('wasteInfo',wasteInfo)
  query.set("user",objectId)

  query.save().then(res => {
    console.log(res)
    setTimeout(function () {
      wx.hideLoading()
      wx.showToast({
        title: '预约成功',
      })
    }, 2000)
 
  }).catch(err => {
    console.log(err)
  })
}

})