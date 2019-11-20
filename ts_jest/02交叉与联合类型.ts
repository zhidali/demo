// 交叉类型 
// 例子pet 里面需要实现 Dog Cat下面的所有属性
interface Dog{
    run():void
}
interface Cat{
    jump():void
}

let pet:Dog & Cat = {
    run(){},
    jump(){}
}
// 联合类型
// 保护块
interface One{
    king: 'one',
    o: number
}
interface Two{
    king: 'two',
    t: number
}
interface Three{
    king: 'three',
    r: number
}
type Area = One | Two | Three
function area(area:Area){
    switch(area.king){
        case 'one':
            return area.o
        case 'two':
            return area.t
        case 'three':
            return area.r
        default:
            return (( e:never )=>{throw new Error(e)})(area)
    }
}
area({
    king: 'one',
    o: 1
})
