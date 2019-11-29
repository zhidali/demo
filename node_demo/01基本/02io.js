
const glob = require('glob');

let result = [];

// result = glob.sync(__dirname + '/**/*')

console.time('glob')
glob(__dirname + '/**/*', function(err, res){
    result = res;
    console.log('文件');
})
console.timeEnd('glob');