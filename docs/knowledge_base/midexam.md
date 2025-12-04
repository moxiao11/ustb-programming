## 如何去计算一个数二进制里面有几个1


解法一:

这个解法应该是考场上能想到的一个解法，就是与1取与，然后一直右移

```C++
#include <iostream>
using namespace std;
int count (int x) {
    int cnt = 0 ;
    while (x > 0) {
        if (x & 1) cnt ++ ;
        else x >>= 1 ;
    }
    return cnt ; 
}
int main() {
    int n ; cin >> n ;
    int res= 0 ;
    for (int i = 0 ; i< n ; i++ ) {
        int a ; cin >>a  ;
        res += count(a) ; 
    }
    cout << res << " " << (res % 2) << endl; 
    return 0 ;
}
```
解法二：

lowbit()函数的配合运用

如何快速的找到一个数二进制的最低位1，比如111000010，我要找到最低位的1，就可以通过 x &(~x + 1)来实现

证明如下：

1. 设 `x` 的最低位 1 位于第 `k` 位，则可写为 `...1 00...0`（低 `k` 位为 0）。
2. 对其取反得到 `~x`，此时第 `k` 位变为 0，低 `k` 位全部为 1；将 `~x` 加 1，由于低位连续的 `k` 个 1 加 1 时全部变为 0 并产生进位，使得第 `k` 位变为 1，因此 `~x + 1` 的第 `k` 位为 1，且其更低位均为 0。
3. 此时对 `x` 与 `~x + 1` 做按位与，只有第 `k` 位在两个数中均为 1，其余位至少有一方为 0，因此结果为 `2^k`，即最低位的 1 对应的数值。

不如直接看例子，看证明太麻烦了:

example: 10001010000 经过lowbit函数返回的是00000010000,也就是能快速找到最低位的1在哪个地方,那么减去这个lowbit产生的数，就知道有几个1了
```C++ 
#include <iostream>
using namespace std;
// 每次找到最低位的1在哪里
int lowbit(int x) {
    return x & (~x + 1);
}

int getOne(int x) {
    int res = 0;
    while (x > 0) {
        //减去这个lowbit数 ， 然后再去找下一个1的位置
        x = x - lowbit(x) ;
        res ++;
    }
    return res ;
}
int main() {
    int n ; cin >> n ;
    int ans = 0 ;
    for (int i = 0 ;i < n ; i++ ) {
        int a ; cin >> a ;
        ans += getOne(a) ;
    }
    cout << ans << endl;
    if (ans % 2 == 0) cout << 0 << endl;
    else cout << 1 << endl;
    return 0 ;
}
```

解法三:(容器)

C++是一个非常便利的语言，一个十进制数可以直接用一个二进制容器存起来

内置了count函数来统计
```C++
#include <iostream>
#include <bitset>
using namespace std;
int main() {
    int n ; cin >> n ;
    int res = 0 ;
    for (int i = 0 ; i < n ;i ++ ) {
        int a ; cin >> a ;
        bitset<32> b (a) ;
        res += b.count() ;
    }
    cout << res << endl;
    if (res % 2 ==0 ) cout << 0 << endl;
    else cout << 1  << endl;
    return 0 ;
}
```

解法四：直接用函数

请记住如果你的代码写的很复杂，那么C++一定有能够帮你能够直接实现的操作

这个__builtin_popcount()可以直接统计一个数二进制有多少个1，算法比赛也经常用到,但是编译器内部需要是GCC或者CLang，也就是vs的同学不能用
```C++
#include <iostream>
using namespace std;
int main() {
    int n ; cin >> n ;
    int ans = 0 ;
    for (int i = 0 ; i< n ; i++ ) {
        int a ; cin >>a  ;
        ans += __builtin_popcount(a) ;
    }
    cout << ans << " " << (ans % 2) << endl;

    return 0 ;
}
```
同时还有一个__builtin_parity(a) 函数，统计这个里面的1是奇数个还是偶数个，奇数个返回1，偶数个返回0。

