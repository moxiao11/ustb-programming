## 第八周-编程题-1.WERTYU

1. **构建映射关系**
   由于手向右偏移一位，按下的字符实际是它左边的键。我们将键盘上所有可能按出的字符按顺序放入数组 `wrong`，再把它们左边对应的正确字符按相同顺序放入数组 `right`，这样 `wrong[i]` 就对应着正确的 `right[i]`。

2. **遍历输入字符串并查找映射**
   对输入的每个字符：

   * 若是空格，直接输出空格；
   * 否则在 `wrong` 数组中查找该字符位置 `i`，若找到则输出 `right[i]`，实现从“按错键”到“正确键”的转换。

3. **处理未找到的特殊字符**
   如果某字符不在 `wrong` 数组中（例如键盘最左边的键），说明它没有对应的左移字符，此时保持原样输出即可。


```C++ 
#include <iostream>
#include <string>
using namespace std;

int main() {
    // 所有可能按出的字符（错位后的）
    string wrong = "1234567890-=WERTYUIOP[]\\SDFGHJKL;'XCVBNM,./";
    // 对应正确的字符（每个字符都向左移动一位）
    string right = "`1234567890-QWERTYUIOP[]ASDFGHJKL;ZXCVBNM,.";

    string s;
    getline(cin, s);

    for (char c : s) {
        if (c == ' ') {      // 空格直接输出
            cout << ' ';
            continue;
        }

        bool found = false;

        // 在 wrong 数组中查找字符
        for (int i = 0; i < wrong.size(); i++) {
            if (c == wrong[i]) {
                cout << right[i];  // 输出对应正确字符
                found = true;
                break;
            }
        }

        // 如果没有找到（最左边的键），保持原样
        if (!found) cout << c;
    }

    return 0;
}

```

## 第八周-编程题-3.多项式求值


使用霍纳（Horner）算法(专业名词可以不用记)计算多项式的值
传统方式需要计算 x²、x³…，比较麻烦。
霍纳法将多项式变形为逐步迭代的形式：

result = a[0]

result = result * x + a[1] = a[0] * x + a[1] ;

result = result * x + a[2]= a[0] * x² + a[0] * x + a[1] ;


```C++
#include <iostream>
using namespace std;

int main() {
    int n;
    cin >> n;

    int  a[10010]; 
    for (int i = 0; i < n; i++) {
        cin >> a[i];
    }

    int  x;
    cin >> x;

    int result = a[0];
    for (int i = 1; i < n; i++) {
        result = result * x + a[i];
    }

    cout << result << endl;

    return 0;
}

```

## 第八周-编程题-9.八进制转十进制

先来个容易理解的

$456_8 = 4 \times 8^2 + 5 \times 8^1 + 6 \times 8^0$
 也就是从右向左扫描数字，然后每个位置的数字乘 8的i次方, 或者也采用上面的霍纳算法，每次*8就可以实现这样一直升幂的操作


这里采用读入字符串的方式，来做，记住了字符转数字需要减去'0'
```C++
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;  // 输入八进制数作为字符串

    long long result = 0;

    for (int i = 0; i < s.size(); i++) {
        int digit = s[i] - '0';  // 转换为数字
        result = result * 8 + digit;
    }

    cout << result << endl;
    return 0;
}

```


## 第八周-编程题-10.6174

一旦涉及到周期问题，将之前出现过的数存起来，然后每次暴力枚举就可以(这种题其实就是简单的模拟题，按照他需要的操作来就行)

1. 把数字按位拆到数组中。

2. 用 排序 得到：

  * 降序排列得到 a 
  * 升序排列得到 b

3.计算：𝑎-𝑏得到新的数字

4.重复操作，并记录每一步，直到发现某个数字重复出现（即进入循环），则输出序列并结束。

```C++
#include <iostream>
using namespace std;

// 手动冒泡排序（升序）
void sortAsc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
        }
    }
}

// 手动冒泡排序（降序）
void sortDesc(int arr[], int n) {
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] < arr[j + 1]) {
                int t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
        }
    }
}

// 检查数字是否出现过
bool appeared(long long history[], int cnt, long long x) {
    for (int i = 0; i < cnt; i++) {
        if (history[i] == x) return true;
    }
    return false;
}

int main() {
    long long n;
    cin >> n;

    if (n == 0) return 0; // 输入0则无输出

    long long history[1010];
    int cnt = 0;

    long long cur = n;

    // 输出开头的数字
    cout << cur;
    history[cnt++] = cur;

    while (true) {

        // 1. 取出数字，存到 digits[]
        int digits[20], dcnt = 0;
        long long temp = cur;
        while (temp > 0) {
            digits[dcnt++] = temp % 10;
            temp /= 10;
        }

        // 2. 排序得到 a 和 b
        int big[20], small[20];
        for (int i = 0; i < dcnt; i++) {
            big[i] = digits[i];
            small[i] = digits[i];
        }

        sortDesc(big, dcnt);
        sortAsc(small, dcnt);

        // 3. 整理成整数 a, b
        long long a = 0, b = 0;
        for (int i = 0; i < dcnt; i++) {
            a = a * 10 + big[i];
            b = b * 10 + small[i];
        }

        // 4. 新数字
        long long next = a - b;

        // 输出
        cout << " " << next;

        // 检查是否循环
        if (appeared(history, cnt, next)) {
            break;
        }

        // 加入历史
        history[cnt++] = next;
        cur = next;
    }

    return 0;
}

```