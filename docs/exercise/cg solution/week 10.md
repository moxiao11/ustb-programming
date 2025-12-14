## 第十周-编程题-8.统计字符的出现次数

1. * 采用char和getline的搭配 , 使用cin.getline(变量名字，长度)
* 采用string和getline的搭配，用getline(cin , 变量名字)

**ps:** gets函数基本上已经由于安全问题已经被现代C开发弃用了，所以这里就不过多进行讲解了。

by the way: C11的时候移除了gets(),C++14的时候移除了gets() ; 


2. 对于映射操作，其实已经见过很多次了，需要将字符减去'A'，来映射到0到25的数字来进行统计。

所以给出一般结论: 
* 数字字符转数字减去'0' ,转回来要加上
* 字母字符转数字减去'A',转回来要加上



```C++
#include <iostream>
#include <cstring>
#include <cctype>
using namespace std;

int main() {
    char s[100];
    int count[26] = {0};  // 存储26个英文字母的计数
    
    // 输入一行字符串
    cin.getline(s, 100);
    // 或者采用 string s ; getline(cin ,s ) ;
    // 统计每个英文字母出现的次数（不区分大小写）
    for (int i = 0; s[i] != '\0'; i++) {
        // 如果是大写字母
        if (s[i] >= 'A' && s[i] <= 'Z') {
            count[s[i] - 'A']++;
        }
        // 如果是小写字母
        else if (s[i] >= 'a' && s[i] <= 'z') {
            count[s[i] - 'a']++;
        }
    }
    
    // 按每行10个数据的格式输出
    int outputCount = 0;
    for (int i = 0; i < 26; i++) {
        // 输出格式：字母:次数
        cout << char('A' + i) << ":" << count[i];
        
        // 每输出一个数据后，判断是否需要换行
        outputCount++;
        if (outputCount < 26) {
            if (outputCount % 10 == 0) {
                cout << "," << endl;  // 每10个换行
            } else {
                cout << ",";  // 同一行内用逗号分隔
            }
        } else {
            cout << ",";  // 最后一个也输出逗号
        }
    }
    
    return 0;
}
```

## 第十周-编程题-12.周期串

本题介绍两种方法，一种是暴力枚举，一种是运用C++的substr求字符串子串


首先，枚举可能的周期，对于一个周期串,有了周期就好说了，

可以通过看看之后的周期和前一个周期是否相同。

也可以以第一个周期为样本，让之后的周期与第一个周期作对比。

1. 暴力枚举

* 首先枚举可能的周期，周期介于1到字符串长度之间，同时周期一定是字符串的因数

* 然后比较前一个周期和后一个周期的元素是否相同，也就是s[i]和s[i + 周期k]，直到枚举到倒数第二个周期
```C++
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.length();
    
    // 遍历所有可能的周期长度
    for (int k = 1; k <= n; k++) {
        // 周期k必须能被n整除
        if (n % k != 0) continue;
        
        bool isPeriod = true;
        // 检查是否满足周期条件
        for (int i = 0; i < n - k; i++) {
            if (s[i] != s[i + k]) {
                isPeriod = false;
                break;
            }
        }
        
        // 如果找到最小周期，输出并结束
        if (isPeriod) {
            cout << k << endl;
            return 0;
        }
    }
    
    // 如果没找到（实际上不会发生，因为n本身一定是周期）
    cout << n << endl;
    return 0;
}
```

2. 子串法，用string的函数substr取出来第一个周期的模板，然后通过取出来每个周期长为k(周期长)长度的子串，然后对比第一个周期的
   
```C++
#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    int n = s.length();
    
    // 遍历可能的周期
    for (int k = 1; k <= n; k++) {
        // 周期必须能整除长度
        if (n % k != 0) continue;
        
        // 取前k个字符作为模式
        string pattern = s.substr(0, k);
        bool valid = true;
        
        // 检查是否整个字符串都由这个模式重复构成
        for (int i = 0; i < n; i += k) {
            if (s.substr(i, k) != pattern) {
                valid = false;
                break;
            }
        }
        
        if (valid) {
            cout << k << endl;
            return 0;
        }
    }
    
    cout << n << endl;
    return 0;
}
```