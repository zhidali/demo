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

function isJava(lang: Java | JavaScript): lang is Java{
    return (lang as Java).helloJava !== undefined
}

function tp(type: Type) {
    let lang = type === Type.Java ? new Java() : new JavaScript();

    // 类型断言
    // if((lang as Java).helloJava){
    //     (lang as Java).helloJava()
    // } else {
    //     (lang as JavaScript).helloJs()
    // }

    // instanceof
    // if(lang instanceof Java){
    //     lang.helloJava()
    // } else {
    //     lang.helloJs()
    // }

    // in
    // if('java' in lang){
    //     lang.helloJava()
    // } else {
    //     lang.helloJs()
    // }
    
    if(isJava(lang)){
        lang.helloJava()
    } else {
        lang.helloJs()
    }
    return lang
}

// let obj = tp(Type.Js);



interface X{
    a:any,
    b:any
}
interface Y{
    a:any,
    b:any,
    c:any
}
let x: X;
let y: Y;

type hand = (a:number,n:number) => number
