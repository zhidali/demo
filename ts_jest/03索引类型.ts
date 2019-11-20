// keyof
interface Obj {
	a: Number;
	b: Number;
	c: Number;
}
// 此时key 只能赋值为 'a', 'b', 'c'
let key: keyof Obj;
key = 'a';
let obj = {
	a: 1,
	b: 2,
	c: 3
};
function getVal<o, k extends keyof o>(obj: o, keys: k[]): o[k][] {
	return keys.map((k) => obj[k]);
}
getVal(obj, [ 'b', 'c' ]);
type Ob = any[];
let Ob: keyof Ob;
