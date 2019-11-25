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



type A1 = 'd' | 'e'
type AA<T> = {
	a: string,
	b: number,
	c: boolean
}[T extends A1 ? 'a' : 'b']

let a1:AA<'d'>


// function log1<T>(x: T): T
// function log1(val){
// 	return val
// }
// function log2<T, U>(x: T,y: U): U 
// function log2(x, y){
// 	return y
// }
let log1 = <T>(x:T):T=>{
	return x
}

let log2 = <T, U>(x:T, y:U):T => {
	return x
}

let st:string = '222';
console.log(st);

