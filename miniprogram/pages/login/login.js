const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  /**
   * 页面的初始数据
   */
  data: {
    username: "",
    password: "",
    disable: true
  },

  getUsername: function (e) {
    this.setData({
      username: e.detail.value
    }, () => {
      let username = this.data.username
      let password = this.data.password
      var disable = true
      if (username.length > 1 && password.length > 5) {
        disable = false
      }
      this.setData({
        disable
      })
    })
  },

  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    }, () => {
      let username = this.data.username
      let password = this.data.password
      var disable = true
      if (username.length > 1 && password.length > 5) {
        disable = false
      }
      this.setData({
        disable
      })
    })

  },

  /**
   * 进入注册界面
   */
  getUserInfo: function (e) {
    let rawData = e.detail.rawData
    if (rawData != null) {
      wx.navigateTo({
        url: '../register/register',
        success: function (res) {
          res.eventChannel.emit('userInfo', rawData)
        }

      })
    } else {
      wx.showToast({
        title: '请允许授权后进行注册',
        icon: 'none'
      })
    }

  },
  /**
   * 登录
   */
  login: function (e) {
    wx.showLoading({
      title: '加载中',
    })

    let username = this.data.username
    let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (reg.test(username)) {
      const query = Bmob.Query("_User");
      query.equalTo("mobilePhoneNumber", "==", username);
      query.find().then(res => {
        if (res == null || res.length == 0) {
            wx.hideLoading()
            wx.showToast({
              title: '用户名或密码错误',
              icon: 'none'
            })
        } else {
          let name = res[0].username
          Bmob.User.login(name, this.data.password).then(res => {
            wx.hideLoading()
            wx.reLaunch({
              url: '../home/home',
            })
          }).catch(err => {
            console.log(err)
            wx.hideLoading()
            let code = err.code
            var message = ""
            if (code === 101) {
              message = "用户名或密码错误"
            } else {
              message = err.error
            }
            wx.showToast({
              title: message,
              icon: 'none'
            })
          })
        }
      });

    } else {
      Bmob.User.login(username, this.data.password).then(res => {
        console.log(res)
        setTimeout(function () {
          wx.hideLoading()
          wx.reLaunch({
            url: '../home/home',
          })
        }, 2000)

      }).catch(err => {
        console.log(err)
        wx.hideLoading()
        let code = err.code
        var message = ""
        if (code === 101) {
          message = "用户名或密码错误"
        } else {
          message = err.error
        }
        wx.showToast({
          title: message,
          icon: 'none'
        })

      })
    }

  },
  forgetPwd: function (e) {
    wx.navigateTo({
      url: '../forget/forget',
    })
  }


})