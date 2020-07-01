
Page({
  data: {
    rubbishs: [],
    order: 0
  },

  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('rubbish', data => {
      console.log(data.rubbish)
      this.setData({
        rubbishs: data.rubbish.rubbishs,
        order: data.rubbish.order
      })
    })
  }

})