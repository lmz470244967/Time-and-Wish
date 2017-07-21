Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [{}],
    date: "",
    total: 0,
    box: [],
    res: [0, 1, 2, 3, 4, 5, 6, 7],
    change: true,
    sav: [{}],
    wish: [],
    animation: "",
    tree: "../../images/animation_bottom.png",
    size: 100
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var array = [{ tar: 0, num: 0 }]
    var logs = {}
    var date = new Date()
    try {
      var res = wx.getStorageSync("storage")
    } catch (e) { console.log("getStorageSync error") }
    if (res == "") { res = [0] }
    var total = 0
    var temp = date.getFullYear() + "-" + this.addZero(date.getMonth() + 1) + "-" + this.addZero(date.getDate())
    for (let i in res) {
      total = total + res[i]
    }
    for (let i = 1; i <= 365; i++) {
      logs = {
        tar: 0,
        num: i / 10
      }
      array.push(logs)
    }

    for (let i in res) {
      array[res[i]].tar = 1
    }

    try {
      var res1 = wx.getStorageInfoSync()
    } catch (e) { console.log("error getting") }
    var keys = res1.keys
    var key, box, temp1, tree, size
    var sav = [{}]
    var wish = []
    for (let key in keys) {
      box = keys[key]
      var test = box.substring(0, 4)
      if (test == "memo") {
        try {
          temp1 = wx.getStorageSync(box)
        } catch (e) {
          console.log(e)
        }
        sav.push(temp1)
        if (temp1.mod < total) {
          wish.push(temp1.content)
        }
      }
    }
    tree = tree = "../../images/animation_bottom.png"
    console.log("total:" + total)
    if (total > 667) {
      size = 200
      tree = "../../images/animation_1.png"
      //console.log("first")
      if (total > 6679) {
        size = 300
        tree = "../../images/animation_2.png"
        //console.log("second")
        if (total > 13359) {
          size = 400
          tree = "../../images/animation_3.png"
          console.log("third")
          if (total > 33397) {
            size = 450
            tree = "../../images/animation_4.png"
            //console.log("fourth")
          }
        }
      }
    }

    //console.log(tree)
    this.setData({
      array: array,
      date: temp,
      res: res,
      total: total / 10,
      sav: sav,
      wish: wish,
      tree: tree,
      size: size
    })
  },

  onReady: function (e) {
    this.animation = wx.createAnimation({
      transformOrigin: "50% 100% 0",
      duration: 400,
    })
  },


  actionitem: function (e) {
    var num, date, total, tar, flag, tree, size
    var res = this.data.res
    console.log(res)
    total = this.data.total
    num = e.currentTarget.dataset.text.num
    tar = e.currentTarget.dataset.text.tar
    date = this.data.date;
    tree = "../../images/animation_bottom.png"
    if (tar != 1) {
      flag = num * 10
      res.push(flag)
      total = total + num
      wx.setStorage({
        key: 'storage',
        data: res,
      })
      var animation = this.animation
      animation.scale(1.05, 1.05).step().scale(1, 1).step()
      if (total > 66) {
        size = 200
        tree = "../../images/animation_1.png"
        if (total > 667) {
          size = 300
          tree = "../../images/animation_2.png"
          if (total > 1335) {
            size = 400
            tree = "../../images/animation_3.png"
            if (total > 3339) {
              size = 450
              tree = "../../images/animation_4.png"
            }
          }
        }
      }
      var param = {}
      var String = "array[" + flag + "].tar"
      param[String] = 1
      this.setData(param)
      //console.log(this.data.array)
      this.setData({
        total: total,
        tree: tree,
        animation: animation,
        size: size
      })
    }
  },

  addZero: function (num) {
    return num < 10 ? '0' + num : num
  },
})