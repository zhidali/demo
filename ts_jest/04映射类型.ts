// in 关键字

type Obk = 'a' | 'b'
type L = {
    [p in Obk]: any
}


type Diff<T, U> = T extends U ? never : T

type T3 = Diff<'a' | 'b' | 'c', 'a'|'c'>