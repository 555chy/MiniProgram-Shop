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
    imageUrl: "../../icon/category.png",
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
    tabs: [{
        name: "大宗商品",
        types: [{
            "name": "纸类",
            'sizes': [{
                'name': '5-10kg',
                'price': '4-8'
              },
              {
                'name': '10-15kg',
                'price': '8-12'
              },
              {
                'name': '15-20kg',
                'price': '12-16'
              },
              {
                'name': '20kg以上',
                'price': '16-'
              }
            ]
          },
          {
            "name": "金属",
            'sizes': [{
                'name': '5-10kg',
                'price': '6-12'
              },
              {
                'name': '10-15kg',
                'price': '12-18'
              },
              {
                'name': '15-20kg',
                'price': '18-24'
              },
              {
                'name': '20kg以上',
                'price': '24-'
              }
            ]
          },
          {
            "name": "塑料",
            'sizes': [{
                'name': '5-10kg',
                'price': '3.5-7'
              },
              {
                'name': '10-15kg',
                'price': '7-10.5'
              },
              {
                'name': '15-20kg',
                'price': '10.5-14'
              },
              {
                'name': '20kg以上',
                'price': '14-'
              }
            ]
          },
          {
            "name": "车类",
            'sizes': [{
                'name': '自行车',
                'price': '5-'
              },
              {
                'name': '电动车',
                'price': '50-'
              }
            ]
          }
        ]
      },
      {
        name: "家用电器",
        types: [{
            "name": "电视",
            "sizes": [{
                'name': '14-21寸',
                'price': '5-15'
              },
              {
                'name': '22-34寸',
                'price': '15-20'
              },
              {
                'name': '34寸以上',
                'price': '20-30'
              }
            ],
          },
          {
            "name": "冰箱",
            'sizes': [{
                'name': '<120L<60CM',
                'price': '10-20'
              },
              {
                'name': '<120L>60CM',
                'price': '20-30'
              },
              {
                'name': '>120L',
                'price': '30-40'
              },
              {
                'name': '冰柜展示柜',
                'price': '20-40'
              }
            ]
          },
          {
            "name": "空调",
            'sizes': [{
                'name': '窗机',
                'price': '50-100'
              },
              {
                'name': '挂/柜机<1.5P',
                'price': '80-150'
              },
              {
                'name': '挂/柜机<2P',
                'price': '100-200'
              }
            ]
          },
          {
            "name": "洗衣机",
            'sizes': [{
                'name': '波轮<4L',
                'price': '10-30'
              },
              {
                'name': '波轮>4L',
                'price': '20-40'
              },
              {
                'name': '滚筒',
                'price': '15-40'
              },
              {
                'name': '脱水机',
                'price': '5-20'
              }
            ]
          },
          {
            "name": "其他家电",
            'sizes': [{
                'name': '热水器',
                'price': '5-30'
              },
              {
                'name': '微波炉',
                'price': '5-20'
              },
              {
                'name': '其它小家电',
                'price': '2-20'
              }
            ]
          }
        ]
      },
      {
        name: "3C数码",
        types: [{
            "name": "台式电脑",
            'sizes': [{
                'name': '液晶屏<14寸',
                'price': '3'
              },
              {
                'name': '液晶屏>14寸',
                'price': '5-15'
              },
              {
                'name': '台式机',
                'price': '10-25'
              }
            ]
          },
          {
            "name": "智能手机",
            'sizes': [{
              'name': '不可开机',
              'price': '5-15'
            }]
          },
          {
            "name": "笔记本平板",
            'sizes': [{
                'name': '其它笔记本',
                'price': '10-30'
              },
              {
                'name': '苹果笔记本',
                'price': '30'
              },
              {
                'name': '其它平板',
                'price': '5'
              },
              {
                'name': '苹果平板',
                'price': '10'
              }
            ]
          },
          {
            "name": "功能机",
            'sizes': [{
              'name': '带电池',
              'price': '2-5'
            }]
          },
        ]
      },
    ],
    currentTab: 0,
    currentType: 0,
    currentSize: 0,
    showModalStatus: false,
    price: 20,
    goods: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
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
      count: 1, // 默认9
      sizeType: ['compressed'], // 指定只能为压缩图，首先进行一次默认压缩
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (photo) {
        //-----返回选定照片的本地文件路径列表，获取照片信息-----------
        wx.getImageInfo({
          src: photo.tempFilePaths[0],
          success: function (res) {
            //---------利用canvas压缩图片--------------
            var ratio = 2;
            var canvasWidth = res.width //图片原始长宽
            var canvasHeight = res.height
            while (canvasWidth > 400 || canvasHeight > 400) { // 保证宽高在400以内
              canvasWidth = Math.trunc(res.width / ratio)
              canvasHeight = Math.trunc(res.height / ratio)
              ratio++;
            }
            that.setData({
              cWidth: canvasWidth,
              cHeight: canvasHeight
            })
            //----------绘制图形并取出图片路径--------------
            var ctx = wx.createCanvasContext('canvas', that)
            console.log(res.path)
            that.setData({
              imageUrl: res.path
            });
            ctx.drawImage(res.path, 0, 0, canvasWidth, canvasHeight)
            ctx.draw(false, function () {
              wx.canvasGetImageData({
                canvasId: 'canvas',
                x: 0,
                y: 0,
                width: that.data.imgWidth,
                height: that.data.imgHeight,
                success(res) {
                  console.log("xxxx");
                  let pngData = upng.encode([res.data.buffer], res.width, res.height)
                  let base64 = wx.arrayBufferToBase64(pngData)
                  // ...
                  console.log(base64)
                  that.setData({
                    imageUrl: base64
                  });
                },
                fail: function (res) {
                  console.log(res.errMsg)
                },
              });
            }, that)
          },
          fail: function (res) {
            console.log(res.errMsg)
          }
        });
      }
    })
  },
  //选择预约日期
  selectTime: function (e) {
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


  }
})