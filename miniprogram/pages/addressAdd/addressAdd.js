const app = getApp()
const Bmob = app.globalData.Bmob

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
    editAddress: [],
    isEdit: false,
    index: 0,
    city: []
  },

  toMap: function () {
    var that = this
    wx.chooseLocation({
      success: (res) => {
        let location = {
          latitude: res.latitude,
          longitude: res.longitude
        }
        let address = res.address
        let city = that.data.city
        var result = false
        for (var i = 0; i < city.length; i++) {
          let str = city[i]
          if (address.startsWith(str)) {
            result = true
            break
          }
        }
        if (!result) {
          wx.showToast({
            title: '暂不支持该城市',
            icon: 'none'
          })
        } else {
          this.setData({
            location,
            address
          })
        }


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
      cacheLocation,
      isEdit,
      index
    } = this.data

    if (phone.length != 11) {
      wx.showToast({
        title: '请输入11位手机号',
        icon: 'none'
      })
      return
    }

    if (name != '' && phone != '' && address != '地区信息' && detail != '') {
      let obj = {
        name,
        phone,
        address,
        detail,
        location
      }

      if (isEdit) {
        cacheLocation[index] = obj
      } else {
        cacheLocation.push(obj)
      }

      wx.setStorage({
        data: cacheLocation,
        key: 'address',
        success: function (e) {
          wx.showToast({
            title: '保存成功',
          })
          wx.navigateBack({
            delta: 1,
          })
        }
      })

    } else {
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
      success: function (res) {
        that.setData({
          cacheLocation: res.data
        })
      },
    })

    const query = Bmob.Query("Data");
    query.equalTo("id", '==', 5)
    query.find().then(res => {
      let city = res[0].value
      console.log(city)
      that.setData({
        city
      })
    }).catch(err => {
      that.setData({
        city: ["福建省南平市建阳区"]
      })
    })

    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('editaddress', function (data) {
      console.log(data)
      that.setData({
        editAddress: data.address,
        address: data.address.address,
        name: data.address.name,
        phone: data.address.phone,
        detail: data.address.detail,
        location: data.address.location,
        isEdit: true,
        index: data.index
      })
    })

  },

  get: function (e) {
    wx.getStorage({
      key: 'address',
      success: function (res) {
        console.log(res)
      },
      fail: function (err) {
        console.log('err' + err)
      }
    })
  }

})