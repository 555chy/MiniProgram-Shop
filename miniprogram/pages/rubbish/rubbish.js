
Page({
  data: {
    curNav: 0,
    title: [],
    content: [],
    order: 0
  },

  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('rubbish', data => {
      console.log(data.rubbish.rubbishs)
      this.setData({
        title: data.rubbish.rubbishs,
        curNav: 0,
        content: data.rubbish.rubbishs[0].array
      });
      console.log(this.data)
    })
  },

  switchRightTab: function(e) {
    this.setData({
      curNav: e.target.dataset.index,
      content: this.data.title[this.data.curNav].array
    })
  }
})