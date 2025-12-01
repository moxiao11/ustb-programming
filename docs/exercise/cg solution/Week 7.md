## 第七周-编程题-4.将十进制转换二进制

有时候直接存一个很长的二进制数会溢出，可以采用字符串的方式进行存储

```C++
#include <iostream>
#include <string>
using namespace std;

int main() {
    int n;
    cin >> n;  // 输入正整数
    string binary = "";

    // 循环除以2取余，得到二进制位
    while (n > 0) {
        binary = char(n % 2 + '0') + binary;  // 余数转字符，放在前面
        n /= 2;  // 除以2
    }

    cout << binary << endl;  // 输出二进制字符串
    return 0;
}

```

## 第七周-编程题-9.验证歌德巴赫猜想


很容易发现这样一个事实：如果 𝑥 是 a的约数，那么a/x也是a的约数

所以枚举素数的时候，需要在[1,√𝑎]这个区间里枚举。

```C++
#include <iostream>
using namespace std;

// 判断是否为素数
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i*i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    int n;
    cin >> n;  // 输入偶数

    // 枚举其中一个素数 a
    for (int a = 2; a <= n/2; a++) {
        int b = n - a;  // 另一个素数 b
        if (isPrime(a) && isPrime(b)) {
            cout << b << " + " << a << " =" << n << endl;
        }
    }
    return 0;
}

```