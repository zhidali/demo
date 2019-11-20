// 基本类型
// number
// string
// undefind
// null
// symbol
// void
// any
// never

// 枚举：一组有名字的常量集合  反向映射
// 如有字符串存在必须在后面  字符串枚举不可反向映射
// 不建议字符串 和 数字在一块
// 枚举是只读类型
enum Role {
	a,
	b,
	c = 'aa'
}
console.log(Role[1]);

interface arr {
	[x: number]: string;
	[z: string]: any;
}

let list: arr;
list = [ '1' ];
list['1'];

interface Lib{
    (x:number):string
}

let lib:Lib
lib = function(x){
    return x + ''
}


