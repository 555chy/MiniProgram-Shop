var upng = require('../../utils/upng.js');
const app = getApp()
const Bmob = app.globalData.Bmob

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgWidth: 0,
    imgHeight: 0,
    hasPhoto: false,
    name: "收件人姓名",
    phone: "手机号码",
    address: "收货地址",
    imageUrl: "https://img-blog.csdnimg.cn/20200524144828716.png",
    totalPrice: 0,
    wasteInfo: "",
    yuyueTime: "选择预约上门的时间",
    detailTime: '选择具体的时间',
    remark: "可描述商品状态、特殊要求等",
    timeList: [
      ['今天', '明天'],
      ['上午 9:30-10:30', '上午 10:30-11:30', '下午 2:00-4:00', '下午 4:00-6:00', '晚上 6:00-8:00']
    ],
    location: {},
    detail: '',
    tabs: [],
    currentTab: 0,
    currentType: 0,
    currentSize: 0,
    showModalStatus: false,
    price: 20,
    goods: [],
    file: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    let that = this
    const query = Bmob.Query("Waste");
    query.find().then(res => {
        console.log(res)
        that.setData({
          tabs: res
        })
    });

 
    wx.getStorage({
      key: 'defaultIndex',
      success: function (e) {
        let index = e.data
        wx.getStorage({
          key: 'address',
          success: function (res) {
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
      },
      fail: function (e) {
        let index = 0
        wx.getStorage({
          key: 'address',
          success: function (res) {
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
  onShow: function (options) {
    let that = this
    wx.getStorage({
      key: 'defaultIndex',
      success: function (e) {
        let index = e.data
        wx.getStorage({
          key: 'address',
          success: function (res) {
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
      },
      fail: function (e) {
        let index = 0
        wx.getStorage({
          key: 'address',
          success: function (res) {
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

  /**
   * 进入收货地址管理
   */
  addressManager: function (e) {
    wx.navigateTo({
      url: '../address/address',
    })
  },
  /**
   * 选择图片
   */
  getPhoto: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sourceType: ['camera'],
      sizeType: ['compressed'],
      success: res => {
        console.log(res)
        let path = res.tempFilePaths[0]
        let time = parseInt(new Date().getTime());
        let filename = time + '.jpg'
        let file = Bmob.File(filename, path);

        file.save().then(res => {
          console.log(res)
          that.setData({
            imageUrl: path,
            file: res[0]
          })
        })

       
        // wx.compressImage({
        //   src: path,
        //   quality: 20,
        //   success: (res => {
           
            // wx.getFileSystemManager().readFile({
            //   filePath: res.tempFilePath, //选择图片返回的相对路径
            //   encoding: 'base64', //编码格式
            //   success: res => { //成功的回调
            //     let image = 'data:image/jpeg;base64,' + res.data
            //     that.setData({
            //       imagebase64: image,
            //       imageUrl: image
            //     })
            //   }
            // })
        //   })
        // })
      }
    })
    
   
  },
  //选择预约日期
  selectTime: function (e) {
    let time = e.detail.value
    let i1 = time[0]
    let i2 = time[1]
    
    let day = this.getCurrentTime(i1)
    let date = this.data.timeList
    let str = day + " " + date[1][i2]
    console.log(str)
    this.setData({
      yuyueTime: str
    })

  },
  //获取留言备注
  getRemark: function (e) {
    this.setData({
      remark: e.detail.value
    })

  },

  //立即预约
  commit: function (e) {
    let {
      name,
      phone,
      address,
      remark,
      wasteInfo,
      detail,
      location
    } = this.data
    let time = this.data.yuyueTime
    let image = this.data.imageUrl
    let file = this.data.file
   
    let currentUser = Bmob.User.current()
    var isLogin = currentUser != null
    console.log('haslogin' + isLogin)
    let loca = [location.latitude, location.longitude]

    if (name == '收件人姓名') {
      wx.showToast({
        title: '请设置上门地址',
        icon: 'none'
      })
      return
    }

    if (wasteInfo == '') {
      wx.showToast({
        title: '请添加回收物品',
        icon: 'none'
      })
      return
    }

    if (time == '选择预约上门的时间') {
      wx.showToast({
        title: '请选择上门时间',
        icon: 'none'
      })
      return
    }
    wx.showLoading({
      title: '提交中'
    })
    const query = Bmob.Query('Recycle_Order');
    const pointer = Bmob.Pointer('_User')

    if (isLogin) {
      let obj = currentUser.objectId
      const objectId = pointer.set(obj)
      query.set("user", objectId)
    }

    query.set("name", name)
    query.set("phone", phone)
    query.set("address", address + detail)
    query.set("time", time)
    query.set("remark", remark)
    query.set('wasteInfo', wasteInfo)
    query.set('location', loca)
    query.set('state', 'open')


    if(image != 'https://img-blog.csdnimg.cn/20200524144828716.png'){
      query.set('preview',file)
    }
  
    query.save().then(res => {
      console.log(res)
      setTimeout(function () {
        wx.hideLoading()
        wx.redirectTo({
          url: '../tip/tip',
        })
      }, 2000)

    }).catch(err => {
      wx.hideLoading()
      console.log('bmob error')
      console.log(err)
      wx.showToast({
        title: '预约失败',
        icon: 'none'
      })
    })
  },
  //显示对话框
  showModal: function () {
    const duration = 500;
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: duration,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), duration)
  },
  //隐藏对话框
  hideModal: function () {
    const duration = 500;
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: duration,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(500).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), duration)
  },
  togglePopup: function () {
    console.log(this.data.showModalStatus)
    if (this.data.showModalStatus) {
      this.hideModal();
    } else {
      this.showModal();
    }
  },
  changeTab: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      currentType: 0,
      currentSize: 0
    });
  },
  selectType: function (e) {
    this.setData({
      currentType: e.currentTarget.dataset.index,
      currentSize: 0
    });
  },
  selectSize: function (e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      currentSize: index,
    });
  },
  add: function () {
    //返回用户选中的值
    const type = this.data.tabs[this.data.currentTab].types[this.data.currentType];
    const item = {
      "type": type.name,
      "size": type.sizes[this.data.currentSize].name,
      "price": type.sizes[this.data.currentSize].price
    };
    this.data.goods.push(item);

    let data = this.data.goods
    var total = 0
    var waste = ""

    for (var i = 0; i < data.length; i++) {
      let price = data[i].price
      let str = price.split('-')
      let numStr = str[0]
      let num = parseInt(numStr)

      let name = data[i].type + data[i].size
      waste += name
      total += num
    }
    this.setData({
      goods: this.data.goods,
      totalPrice: total,
      wasteInfo: waste
    })
    wx.showToast({
      title: '添加成功',
      icon: 'none',
      duration: 1800
    })
    console.log(this.data.goods)

  },
  sub: function (e) {
    const index = e.currentTarget.dataset.index;
    this.data.goods.splice(index, 1);

    let data = this.data.goods
    var total = 0
    var waste = ""

    for (var i = 0; i < data.length; i++) {
      let price = data[i].price
      let str = price.split('-')
      let numStr = str[0]
      let num = parseInt(numStr)

      let name = data[i].type + data[i].size
      waste += name
      total += num
    }
    this.setData({
      goods: this.data.goods,
      totalPrice: total,
      wasteInfo: waste
    })
  },
  getCurrentTime: function(mDay){
    var time = parseInt(new Date().getTime());
    let date = new Date(time)
    var year=date.getFullYear();
    var mon = date.getMonth()+1;
    var day = date.getDate() + mDay;
    return year+'-' + mon + "-" + day
  }
})