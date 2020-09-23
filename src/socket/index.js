import { getToken } from '@/utils/cookie'

export function appWebSocket() {
  const ws = {
    connect: null,
    live: false, // socket状态
    isError: false,
    timeout: 60, // 每${timeout}秒一次心跳
    reloadTimeout: 60, // error后每${reloadTimeout}秒发起重连
    reload: 5, // 连接失败以后的重启次数
    reloadTime: 5,
    timeoutObj: null,
    subscribe: {
      open: [],
      message: [],
      close: [],
      error: []
    },
    addHandle(type, handle) {
      this.subscribe[type].push(handle)
      return this
    },
    triggerHandle(type, e = {}) {
      this.subscribe[type].map(handle => {
        handle(e)
      })
    },
    removeHandle(type, handle) {
      const index = this.subscribe[type].findIndex(item => item === handle)
      this.subscribe[type].splice(index, 1)
    },
    getToken() {
      return getToken()
    },
    getSocketUrl() {
      return `${process.env.VUE_APP_SOCKET_URL}/${this.getToken()}`
    },
    // 建立socket
    create() {
      if (!this.live) {
        const socket = this.getSocketUrl()
        this.connect = new WebSocket(socket)
        this.live = true
        this.handles()

        // 触发心跳
        this.heartCheck()
      }
    },
    handles() {
      const that = this
      this.connect.onopen = function(event) {
        if (that.isError) {
          that.restartSuccess()
        }
        that.triggerHandle('open', event)
      }
      this.connect.onmessage = function(event) {
        if (event.data !== 'pong') {
          that.triggerHandle('message', event)
        } else {
          if (that.isError) {
            that.restartSuccess()
          }
          that.heartCheck()
        }
      }
      this.connect.onclose = function(event) {
        that.triggerHandle('close', event)
        // nginx周期性断开逻辑
        that.live = false
        clearTimeout(that.timeoutObj)
        that.create()
      }
      this.connect.onerror = function(event) {
        that.isError = true
        that.triggerHandle('error', event)
        // error重连
        clearTimeout(that.timeoutObj)
        that.timeoutObj = setTimeout(() => {
          that.live = false
          that.restart()
        }, that.reloadTimeout * 1000)
      }
    },
    heartCheck() {
      clearTimeout(this.timeoutObj)
      this.timeoutObj = setTimeout(() => {
        this.ping()
      }, this.timeout * 1000)
    },
    ping() {
      this.connect.send('ping')
      console.log('ping...')
    },
    restartSuccess() {
      this.isError = false
      this.reload = this.reloadTime
      console.log('重连成功')
    },
    restart() {
      if (this.reload) {
        console.log(`尝试最后${this.reload}次重连`)
        this.create()
        this.reload--
      } else {
        console.log(`重连${this.reloadTime}次数失败，无法重连`)
      }
    },
    init() {
      this.create()
    }
  }

  window.addEventListener('beforeunload', function() {
    ws.connect.close()
  })

  if (typeof WebSocket !== 'undefined') {
    return ws
  } else {
    return
  }
}
