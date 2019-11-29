const CommonFun = {
    /**
     * 获取当前元素的其他兄弟元素
     * @params [Object] elem 选择的当前元素
     */
    siblingElems (elem) {
        let nodes = []
        let _elem = elem
        while ((elem = elem.previousSibling)) {
            if (elem.nodeType == 1) {
                nodes.push(elem)
            }
        }
        let elems = _elem
        while ((elems = elems.nextSibling)) {
            if (elems.nodeType == 1) {
                nodes.push(elems)
            }
        }
        return nodes
    },
    // 深拷贝
    deepClone (obj) {
        let newObj;
        if (typeof obj === "object" && obj !== null) {
            newObj = obj.constructor === Array ? [] : {};
            for (let k in obj) {
                newObj[k] = typeof obj[k] === "object" ? this.deepClone(obj[k]) : obj[k];
            }
        } else {
            newObj = obj;
        }
        return newObj;
    },
    /**
     * 校验手机号
     *
     * @param {string} phoneNum 手机号码
     * @return {Boolean} 返回是否是正规手机号
     */
    verifyTelNum (phoneNum) {
        let result = false;
        // 手机号校验正则
        let phoneReg = /^1[3|4|5|6|7|8|9][0-9]\d{8}$/;
        if (phoneNum && phoneReg.test(phoneNum)) {
            result = true;
        } else {
            result = false;
        }
        return result;
    },
    /**
     * 校验邮箱
     *
     * @param {string} email 手机号码
     * @return {Boolean} 返回是否是正规手机号
     */
    verifyEmail (email) {
        let result = false;
        // 邮箱校验正则
        // let emailReg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
        let emailReg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (email && emailReg.test(email)) {
            result = true;
        } else {
            result = false;
        }
        return result;
    },
    /**
     * file 转 blob， 单文件简单上传需要传blob
     * @param {File Object} file 文件File对象
     * @return {Promise}
     */
    transformFileToBlob(file) {
        const readerIns = new FileReader();
        return new Promise((resolve, reject) => {
            // 读取完成后进行转换
            readerIns.onloadend = function () {
                const buffer = readerIns.result;
                // 返回blob对象
                resolve(new Blob([buffer]));
            };
            readerIns.onerror = function (evt) {
                reject(evt);
            };
            // 读取flie文件
            readerIns.readAsArrayBuffer(file);
        });
    }
};
export default CommonFun;