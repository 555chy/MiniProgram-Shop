Page({
  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    phone: '',
    address: '地区信息',
    detail: '',
    location: {},
    cacheLocation: [],
  },

  toMap: function () {
    wx.chooseLocation({
      success: (res) => {
        let location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        let address = res.name
        this.setData({
          location,
          address
        })
      },
    })
  },
  getName: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  getPhone: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },
  getAddress: function (e) {
    this.setData({
      detail: e.detail.value
    })
  },

  save: function () {
    let {
      name,
      phone,
      address,
      detail,
      location,
      cacheLocation
    } = this.data

    if (name != '' && phone != '' && address != '地区信息' && detail != '') {
      let obj = {
        name,
        phone,
        address,
        detail,
        location
      }

      cacheLocation.push(obj)
    
      wx.setStorage({
        data: cacheLocation,
        key: 'address',
        success: function(e){
          wx.showToast({
            title: '保存成功',
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      })

    }else{
      wx.showToast({
        title: '请输入完整数据',
        icon: 'none',
        duration: 3000
      })
    }
   
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'address',
      success: function(res){
        that.setData({
          cacheLocation: res.data
        })
      },
    })
   
  },

  get: function(e){
    
    wx.getStorage({
      key: 'address',
      success: function(res){
        console.log(res)
      },
      fail: function(err){
        console.log('err'+err)
      }
    })
  }
 
})