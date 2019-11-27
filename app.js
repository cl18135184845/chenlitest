

//app.js
App({
  setServiceData:function () {
    console.log(wx.getStorageSync('userinfo').request_id)
   // openid自动登陆接口 ：https://wxapp.shede.com.cn/Api/xcx_openid_Login
   
  if(wx.getStorageSync('userinfo').request_id == "" || wx.getStorageSync('userinfo').request_id == null || wx.getStorageSync('userinfo').request_id == undefined){
  wx.reLaunch({
    url: '/pages/login/login',  
  })
  } else if (wx.getStorageSync('userinfo').response_params.sessionid == "" || wx.getStorageSync('userinfo').response_params.sessionid == null || wx.getStorageSync('userinfo').response_params.sessionid  == undefined){
    wx.reLaunch({
      url: '/pages/login/login',
    })
  } else if (wx.getStorageSync('userinfo').response_params.usernumber == "" || wx.getStorageSync('userinfo').response_params.usernumber == null || wx.getStorageSync('userinfo').response_params.usernumber == undefined){
    wx.reLaunch({
      url: '/pages/login/login',
    })
}
},
  onLaunch: function () {
    this.setServiceData();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {

              console.log(res)
              // 可以将 res 发送给后台解码出 unionId 
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})