// pages/random/random.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    gifts: ["谢谢参与", "19积分", "蓝月亮洗衣液", "集品围裙", "集品雨伞", "维达抽纸120抽4包", "金龙鱼花生调和油5L", "集品口袋小风扇", "29积分", "三只松鼠坚果大礼包", "7积分", "谢谢参与"],
    imgs: [
      "../../icon/lottery_item.png","../../icon/lottery_item.png","../../icon/lottery_item.png",
      "../../icon/lottery_item.png","../../icon/lottery_item.png","../../icon/lottery_item.png",
      "../../icon/lottery_item.png","../../icon/lottery_item.png","../../icon/lottery_item.png",
      "../../icon/lottery_item.png","../../icon/lottery_item.png","../../icon/lottery_item.png"
    ],
    colors: [
      "yellow","yellow","yellow","yellow",
      "yellow","yellow","yellow","yellow",
      "yellow","yellow","yellow","yellow",
    ],
    probabilities: [
      10, 10, 10, 10,
      10, 10, 10, 10,
      10, 10, 10, 100,
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  rand:function() {
    var total = 0;
    for(p of probabilities) {
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
    for(var i =0; i<12; i++) {
      if(i == index) {
        this.data.colors[i] = "orange";
      } else {
        this.data.colors[i] = "blue";
      }
    }
    this.setData({
      colors: this.data.colors
    })
  },
  luckyRun: function() {
    console.log("luckyRun")
    const r = rand();
    const total = 5000;
    var t = 0;
    var index = 0;
    const id = setInterval(function(){
      setLucky(index);
      if(t > total && index == r) {
        clearInterval(id);
      } else {
        index = (index+1)%12;
        t+=200;
      }
    }, 200);
  }
})