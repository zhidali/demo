var Shap;
(function (Shap) {
    function b(type) {
        console.log(type);
    }
    Shap.b = b;
    Shap.a = 1;
})(Shap || (Shap = {}));
// import a = Shape.a;
// console.log(Shape);
// Shap.b(a)
