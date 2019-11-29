const EventEmitter = require('events').EventEmitter;

class Geektime extends EventEmitter {
    constructor() {
        super();
        setInterval(() => {
            // 发送事件
            this.emit('newlesson', {
                jiage: Math.ceil(Math.random() * 100)
            })
        }, 3000)
    }
}

const geektime = new Geektime;
// 监听事件
geektime.addListener('newlesson', (res) => {
    console.log('ok', res);
})




