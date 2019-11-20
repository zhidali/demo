// public  公共
// private  私有
// protected 受保护

// 接口继承接口
interface A {
	name: string;
}
interface B {
	age: number;
}
interface C extends A, B {
	sex?: '男' | '女';
}

let obj: C = {
	name: '1',
	age: 2,
	sex: '男'
};

// 泛型

// function dog<T>(name: T): T {
// 	return name;
// }

// type TA = <T>(value: T) => T;
// let dog: TA = (name) => {
// 	return name;
// };
let c = (value = 1) => value + 1

interface TB<T>{
	(value:T):T
}

let d = [1,'2']
interface TC<T extends A>{
	(value:T):T
}
let dog:TC<C> = function(obj){
	return obj
}
dog({
	name: 'a',
	age: 2
})
/** 约束私有成员报错
class Paren implements A{
	private name: string 
	constructor(){

	}
	eat(){

	}
}
*/
