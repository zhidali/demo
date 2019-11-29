// 本地存储数据
export default {
    // 设置数据存储 （暂时使用实例化中的数据）
    setStorage(storageKey, data) {
        const storage = {
            createTime: new Date().getTime(), // 创建时间
            oData: data
        };
        const storageStr = JSON.stringify(storage);
        localStorage.setItem(storageKey, storageStr);
    },
    // 简单设置本地存储
    setStorSimple(storageKey, data) {
        const storageStr = JSON.stringify(data);
        localStorage.setItem(storageKey, storageStr);
    },
    // 获取的数据
    getStorage(storageKey) {
        if (!localStorage.getItem(storageKey)) return false;
        const storageStr = localStorage.getItem(storageKey);
        return JSON.parse(storageStr);
    },
    // 是否已经过期
    isFresh(storageKey, outtime) {
        const createTime = this.getStorage(storageKey).createTime;
        const outtimes = outtime || 86400000; // 默认过期时间24*60*60*1000; 1天时间
        const newTime = new Date().getTime();
        return newTime - createTime < outtimes;
    },
    setCookie(key, val) {
        let cdata = key + '=' + val;
        let d = new Date();
        d.setHours(d.getHours() + 1);
        cdata += '; expires=' + d.toGMTString();
        document.cookie = cdata;
    },
    getCookie(key) {
        let arr = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
        let reg = new RegExp('(^| )' + key + '=([^;]*)(;|$)');
        if (arr === document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }
    },
    delCookie(key) {
        let exp = new Date();
        exp.setTime(exp.getTime() - 1);
        let cval = Cookie.getCookie(key);
        if (cval != null) {
            document.cookie = key + '=' + cval + ';expires=' + exp.toGMTString();
        }
    }
};
