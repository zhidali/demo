var ob = {
    a: 2,
    b: '2'
};
// 命名空间一定要放在 函数 类的后面
function Lib() { }
(function (Lib) {
    Lib.state = 1;
})(Lib || (Lib = {}));
console.log(Lib.state);
var C = /** @class */ (function () {
    function C() {
    }
    return C;
}());
(function (C) {
    C.a = 1;
})(C || (C = {}));
console.log(C.a);
// 类却没有这个要求
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Yellow"] = 1] = "Yellow";
})(Color || (Color = {}));
(function (Color) {
    function min() {
    }
    Color.min = min;
})(Color || (Color = {}));
