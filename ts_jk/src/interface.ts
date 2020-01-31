
//  const getUserInfo = (user: {name: string, age: number}): string => {
//     return `name: ${user.name} age: ${user.age}`;
//  };

//  getUserInfo({})
// 先定义一个接口
interface IUser {
    name: string;
    age: number;
 }

//  const getUserInfo = (user: IUser): string => {
//     return `name: ${user.name}, age: ${user.age}`;
// };

type IUserInfoFunc = (user: IUser) => string;

interface IUser {
	name: string;
	age: number;
}

const getUserInfo: IUserInfoFunc = (user) => {
	return `name: ${user.name}, age: ${user.age}`;
};

type TFn = (...arg:any[]) => string;

function getSingle(fn: TFn):Function;

function getSingle( fn ){ 
	let result; 
	return function(){ 
		return result || ( result = fn .apply(this, arguments ) ); 
	}
};

interface Iquery {
	readonly id: number;
	list: {
		orderId: number;
		text: string;
    }[];
    state?: boolean
}


//  定于这个函数接收两个必选参数都是 number 类型，以及一个可选的字符串参数 desc，这个函数不返回任何值
// interface Func {
//     (x: number, y: number, desc?: string): void
// }
// 注意:不过上面的接口中只有一个函数，TypeScript 会给我们一个建议，可以使用 type 来定义一个函数的类型：
type Func = (x: number, y: number, desc?: string) => void;

const sum: Func = function(x, y, desc = '') {
	// const sum: Func = function (x: number, y: number, desc: string): void {
	// ts类型系统默认推论可以不必书写上述类型定义
	console.log(desc, x + y);
};
sum(32, 22);

// implements  实现
interface Entity {
	title: string;
	log(): void;
}

class Post implements Entity {
	title: string;
	constructor(title: string) {
		this.title = title;
	}
	log(): void {
		console.log(this.title);
	}
}


// 接口的继承
interface Shape {
    color: string;
}
interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}
let Ab:Square = {
    sideLength: 1,
    color: 'red',
    penWidth: 2
}
// 接口可以同名还可以合并   type则不行
interface Ab {
    a: string;
}
interface Ab {
    b: number;
}
let abc:Ab = {
    a: 'string',
    b: 111
}





