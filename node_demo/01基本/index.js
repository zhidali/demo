// 当前文件名
// console.log(__filename);
// 当前文件夹
// console.log(__dirname);
// 进程对象
// console.log(process);

const lib = require('./common/lib');
console.log(process.argv);


// let playerAction = process.argv[process.argv.length - 1];
// console.log(playerAction);


let count = 0;
// 开始用户输入
process.stdin.on('data', e => {
    const playerAction = e.toString().trim();
    let res = lib(playerAction);
    count = count + res;
    console.log(count);
    if(count === 3){
        console.log('nb');
        // 杀死进程
        process.exit();
    }else if(count === -3){
        console.log('cai b');
        process.exit();
    }
})