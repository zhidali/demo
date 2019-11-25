namespace Name {
	export const name = 'zdl';
}
import na = Name.name;
console.log(na);

let fun = (x) => x + 1;

window.onkeydown = function(e) {
	// console.log(e.);
};

let foo = {};
// interface Foo {
//     a: number
// }
// foo.a = 1
let ty = typeof foo;

// 接口的兼容性
interface X {
	a: any;
	b: any;
}
interface Y {
	a: any;
	b: any;
	c: any;
}
let x: X = {
	a: 'a',
	b: 'b'
};
let y: Y = {
	a: 1,
	b: 2,
	c: 3
};
x = y;
// y = x;

// 函数兼容
type Handler = (a: number, b: number) => void;
function hof(handler: Handler) {
	return handler;
}
let handler1 = (a: number) => {};
let handler2 = (a: number, b: number, c: number) => {};
// Error: Argument of type '(a: number, b: number, c: number) => void' is not assignable to parameter of type 'Handler'.
let handler3 = (a: string) => {};

enum Fruit {
	Apple,
	Banana
}
enum Color {
	Red,
	Yellow
}

let fruit: Fruit.Apple = 3;
let no: number = Fruit.Apple;

// let color: Color.Red = Fruit.Apple
// TODO
class AAa {
	constructor(p: number, q: number) {}
	id: number = 1;
}
class BBb {
	static s = 1;
	constructor(p: number) {}
	id: number = 2;
}
let aa = new AAa(1, 2);
let bb = new BBb(1);
aa = bb
// bb = aa


let log = <T>(x:T):T=>{
    return x
}
let log3 = <T, U>(x:T, y:U):T => {
    return x
}
log3 = log
// log = log3


enum Type {
    Java,
    Js
}
class Java {
    helloJava() {
        console.log('hello java');
    }
    java:any
}
 
class JavaScript {
    helloJs() {
        console.log('hello js');
    }
    Js:any
}
// 这种返回叫做类型谓词
function isJava(lang: Java | JavaScript): lang is Java{
    return (lang as Java).helloJava !== undefined
}
function tp(type: Type) {
        let lang = type === Type.Java ? new Java() : new JavaScript();
        
        // 类型断言
    //     if((lang as Java).helloJava){
    //         (lang as Java).helloJava()
    //     } else {
    //        (lang as JavaScript).helloJs()
    //     }
        
        // instanceof
    //     if(lang instanceof Java){
    //         lang.helloJava()
    //     } else {
    //         lang.helloJs()
    //     }
     
        // in
    //     if('java' in lang){
    //        lang.helloJava()
    //     } else {
    //        lang.helloJs()
    //     }
    //     return lang
            if(isJava(lang)){
                lang.helloJava()
            } else {
                lang.helloJs()
            }
    }

    tp(Type.Java)