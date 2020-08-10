const app = getApp()
const Bmob = app.globalData.Bmob
const colors = ["rgba(186,62,227,1)","rgba(212,206,251,1)","rgba(212,206,251,1)","rgba(212,206,251,1)",
"rgba(212,206,251,1)","rgba(212,206,251,1)","rgba(212,206,251,1)","rgba(212,206,251,1)",
"rgba(212,206,251,1)","rgba(212,206,251,1)","rgba(212,206,251,1)","rgba(212,206,251,1)"]

Page({
  /**
   * 页面的初始数据
   */
  data: {
    gifts: [],
    probabilities: [],
    types:[],
    imgs: [
      "../../icon/lottery_item.png","../../icon/lottery_item.png","../../icon/lottery_item.png",
      "../../icon/lottery_item.png","../../icon/lottery_item.png","../../icon/lottery_item.png",
      "../../icon/lottery_item.png","../../icon/lottery_item.png","../../icon/lottery_item.png",
      "../../icon/lottery_item.png","../../icon/lottery_item.png","../../icon/lottery_item.png"
    ],
    colors: colors,
    state: "luckybtn",
    mygifts: [],
    integral: 0,
    objectId: "",
    address: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let user = Bmob.User.current()
    let objectId = user.objectId
    var that = this
    
    const query2 = Bmob.Query('_User');
    query2.get(objectId).then(res => {
      that.setData({
        integral: res.integral,
        objectId
      })
    })

    const query = Bmob.Query("Data");
    query.equalTo("id", '==', 3)
    query.find().then(res => {
        let arr = res[0].value
        var probabilities = []
        var gifts = []
        var types = []
        for(var i = 0; i < arr.length; i++){
          let probability = arr[i].probability
          let gift = arr[i].gift
          let type = arr[i].type
          probabilities.push(probability)
          gifts.push(gift)
          types.push(type)
        }

        that.setData({
          gifts,
          probabilities,
          types
        })
    })

    const query3 = Bmob.Query("Recycle_Goods");
    let pointer = Bmob.Pointer('_User')
    let poiID = pointer.set(objectId)
    query3.equalTo('user', '==', poiID)
    query3.find().then(res=>{
      var gift = []
      for(let i = 0; i < res.length; i++){
        let good = res[i].good
        gift.push(good)
      }
      that.setData({
        mygifts: gift
      })
      
    }).catch(err=>{
      
    })

    wx.getStorage({
      key: 'defaultIndex',
      success: function(res) {
        let index = res.data
        wx.getStorage({
          key: 'address',
          success: function(res){
            that.setData({
              address: res.data[index]
            })
          }
        })
      },
      fail:(err)=>{
        let index = 0
        wx.getStorage({
          key: 'address',
          success: function(res){
            that.setData({
              address: res.data[index]
            })
          }
        })
      }
    })
  },
  rand:function() {
    var total = 0;
    let probabilities = this.data.probabilities 
    for(var p of probabilities) {
      total += p;
    }
    const value = Math.floor(Math.random() * total);
    var n = 0;
    for(var i=0; i<probabilities.length; i++) {
      n += probabilities[i];
      if(value < n) return i;
    }
  },
  setLucky: function(index) {
    for(var i = 0; i<12; i++) {
      if(i == index) {
        this.data.colors[i] = "rgba(186,62,227,1)";
      } else {
        this.data.colors[i] = "rgba(212,206,251,1)";
      }
    }
    this.setData({
      colors: this.data.colors
    })
  },
  luckyRun: function() {
    var that = this
    let objectId = this.data.objectId
    let integral = this.data.integral
    if(integral < 20){
      wx.showToast({
        title: '您的积分不足,下单可获得积分',
        icon: 'none',
        duration: 3000
      })
      return
    }
    wx.showLoading({
      title: '请稍等',
    })

    const query = Bmob.Query('_User');
    query.set('id', objectId) 
    query.set('integral',integral - 20)
    query.save().then(res => {
      //start
      wx.hideLoading()
      that.setData({
        state: "luckybtn-disable",
        integral: integral - 20
      })
      const result = that.rand();
      const total = 8000;
      var t = 0;
      var index = 0;
      const id = setInterval(function(){
        that.setLucky(index);
        if(t > total && index == result) {
          //finish
          clearInterval(id);
          let gift = that.data.gifts
          let types = that.data.types
          let entity = types[result] == 0
          let isWin = types[result] != 2
          let title = isWin ? "恭喜" : "很遗憾"
          var content = isWin ? "恭喜你获得: " + gift[result] : "感谢您的参与"
          if(isWin && entity){
            content = content + " 工作人员会在三天内把奖品送货上门,请到我的-我的奖品查看"
          }
          if(isWin){
            wx.showLoading({
              title: '请稍等'
            })
            let address = that.data.address
            let mygifts = that.data.mygifts
            let types = that.data.types
            let received = types[result] != 0
            mygifts.push(gift[result])
            const query = Bmob.Query('Recycle_Goods');
            const pointer = Bmob.Pointer('_User')
            const obj = pointer.set(objectId)
            query.set("user", obj)
            query.set('name', address.name)
            query.set('good', gift[result])
            query.set('phone', address.phone)
            query.set('received', received)
            query.set('type', types[result])
            query.set('address', address.address)
            query.set('detail', address.detail)
            query.set('location', [address.location.latitude, address.location.longitude])
            query.save().then(res=>{
              //奖品不是实物
              if(types[result] == 1){
                let integral = that.data.integral
                let objectId = that.data.objectId
                let giftStr = gift[result]
                let getIntegral = parseInt(giftStr.substring(0, giftStr.length - 2))
                let total = integral + getIntegral
                const query = Bmob.Query('_User');
                query.set('id', objectId) 
                query.set('integral',total)
                query.save().then(res=>{
                  wx.hideLoading()
                  wx.showModal({
                    title,
                    content,
                    showCancel: false,
                    complete:()=>{
                      that.setData({
                        state: "luckybtn",
                        colors,
                        mygifts,
                        integral:total
                      });
                    }
                  })
                }).catch(err=>{
                  wx.hideLoading()
                  wx.showModal({
                    title: '提示',
                    content: '积分更新出错请联系客服',
                    showCancel: false,
                    complete:()=>{
                      that.setData({
                        state: "luckybtn",
                        colors,
                        mygifts,
                      });
                    }
                  })
                })
              }else{
                wx.hideLoading()
                wx.showModal({
                  title,
                  content,
                  showCancel: false,
                  complete:()=>{
                    that.setData({
                      state: "luckybtn",
                      colors,
                      mygifts
                      
                    });
                  }
                })
              }
            }).catch(err=>{
              that.setData({
                state: "luckybtn",
                colors
              });
            })
            
          }else{
            wx.showModal({
              title,
              content,
              showCancel: false,
              complete: ()=>{
                that.setData({
                  state: "luckybtn",
                  colors
                });
              }
            })
          }
        } else {
          index = (index+1)%12;
          t+=200;
        }
      }, 120);
    }).catch(err => {
      wx.showToast({
        title: '出错了,请联系管理员',
        icon: 'none'
      })
    })
  }
})