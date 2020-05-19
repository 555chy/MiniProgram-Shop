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
    location: {},
    detail: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let that = this
    wx.getStorage({
      key: 'defaultIndex',
      success: function(e){
        let index = e.data
        wx.getStorage({
          key: 'address',
          success: function(res){
            let info = res.data[index]
            console.log(info)
            that.setData({
              name: info.name,
              phone: info.phone,
              address: info.address,
              detail: info.detail,
              location: info.location
            })
          }
        })
      }
    })
  },
  onShow: function(options){
    let that = this
    wx.getStorage({
      key: 'defaultIndex',
      success: function(e){
        let index = e.data
        wx.getStorage({
          key: 'address',
          success: function(res){
            let info = res.data[index]
            console.log(info)
            that.setData({
              name: info.name,
              phone: info.phone,
              address: info.address,
              location: info.location
            })
          }
        })
      }
    })
  },

  /**
   * 进入收货地址管理
   */
  addressManager: function(e){
    wx.navigateTo({
      url: '../address/address',
    })
  },
/**
 * 选择图片
 */
getPhoto: function(e){
  wx.chooseImage({
    count: 1,
    sizeType: ['compressed'],
    sourceType: ['camera'],
    success (res) {
      // tempFilePath可以作为img标签的src属性显示图片
      const tempFilePaths = res.tempFilePaths
      that.setData({
        hasPhoto: true,
        imageUrl: tempFilePaths
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

  let {name,phone,address,remark,wasteInfo,detail,location} = this.data
  let time = this.data.yuyueTime
  let obj = Bmob.User.current().objectId
  let loca = [location.latitude,location.longitude]

  const query = Bmob.Query('Recycle_Order');
  const pointer = Bmob.Pointer('_User')
  const objectId = pointer.set(obj)

  query.set("name",name)
  query.set("phone",phone)
  query.set("address",address + detail)
  query.set("time",time)
  query.set("remark",remark)
  query.set('wasteInfo','废品信息')
  query.set("user",objectId)
  query.set('location',loca)
  query.set('state','open')

  query.save().then(res => {
    console.log(res)
    setTimeout(function () {
      wx.hideLoading()
      wx.redirectTo({
        url: '../myorder/myorder',
      })
    }, 2000)
 
  }).catch(err => {
    console.log(err)
  })
}

})