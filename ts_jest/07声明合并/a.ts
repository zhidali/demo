interface A {
	a: number;
}
interface A {
	b: string;
}
interface B {
	b: number;
}

let ob: A = {
	a: 2,
	b: '2'
};
// 命名空间一定要放在 函数 类的后面
function Lib() {}
namespace Lib {
	export const state = 1;
}
console.log(Lib.state);

class C {}
namespace C {
	export let a = 1;
}
console.log(C.a);

// 类却没有这个要求
enum Color {
	Red,
	Yellow
}

namespace Color {
	export function min() {
	}
}
