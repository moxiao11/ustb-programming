## 第九周-编程题-1.求最小公倍数
解法1 : 
C++17的解法
```C++ 
#include <iostream>
#include <numeric>
using namespace std;
int main() {
    int n ; cin >> n ;
    int res = 1 ;
    for (int i = 0 ; i < n ; i++ ) {
        int a ; cin >> a ;
        res = lcm(a , res)  ;
    }
    cout << res << endl;
    return 0 ;
}
```
同理还有gcd函数，都在头文件numeric里面

解法2:
最简单的解法：
首先需要知道两个最基本的数论知识:
* x * y = gcd(x,y) * lcm(x,y) ; 
* gcd(x , y) = gcd(y , x%y); 
  

 

分支一 : c++14中也有gcd函数，只不过叫做__gcd(a,b)

> 在部分编译器中，C++14 中可以用 std::__gcd(a,b) 函数来求最大公约数，但是其仅作为 std::rotate 的私有辅助函数。使用该函数可能会导致预期之外的问题，故一般情况下不推荐使用。

分支二: 自己写辗转相除(递归)
```C++
void gcd(int a ,int b)
{
    if(b == 0) return a ;
    else return gcd(b , a%b) ;
}
void lcm(int x ,int y)
{
    return x * y / gcd(x,y) ;
}
```
   

解法3:暴力枚举

```C++
void lcm(int a ,int b)
{
    int start = max(a, b); 
    for(int i = start ; i ; i ++ )
    {
        if(i % a == 0 && i % b == 0) return i ;
    }
}
```

查找一个最大值max_element();

找到某个元素的指针find(a ,a + n,target) ;  

## 第九周-编程题-6 判断集合是否相等
解法一 : set

C++内置了集合，实现自动去重和排序,以及比较 

定义一个set
```C++
#include <iostream>
#include <set>
#include <vector>
using namespace std;

int main() {
    int n, m;
    
    // 读取集合A
    cin >> n;
    set<int> setA;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        setA.insert(x);
    }
    
    // 读取集合B
    cin >> m;
    set<int> setB;
    for (int i = 0; i < m; i++) {
        int x;
        cin >> x;
        setB.insert(x);
    }
    
    // 比较两个集合是否相等
    if (setA == setB) {
        cout << "yes" << endl;
    } else {
        cout << "no" << endl;
    }
    
    return 0;
}
```

解法二： 在读入的时候就已经开始判断是否需要去重，只需要循环一次前面的数即可，然后在依次遍历第一个数组的数字，在第二个数组中找找这个数字有没有出现过。
```C++
#include <iostream>
using namespace std;

const int N = 1010;

int main() {
    int n, m;
    int a[N], b[N];
    int size_a = 0, size_b = 0; // 实际去重后的元素个数
    
    // 读取集合A并进行去重
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        
        // 检查x是否已经在数组a中
        bool exists = false;
        for (int j = 0; j < size_a; j++) {
            if (a[j] == x) {
                exists = true;
                break;
            }
        }
        
        // 如果不存在，就添加到数组
        if (!exists) {
            a[size_a] = x;
            size_a++;
        }
    }
    
    // 读取集合B并进行去重
    cin >> m;
    for (int i = 0; i < m; i++) {
        int x;
        cin >> x;
        
        // 检查x是否已经在数组b中
        bool exists = false;
        for (int j = 0; j < size_b; j++) {
            if (b[j] == x) {
                exists = true;
                break;
            }
        }
        
        // 如果不存在，就添加到数组
        if (!exists) {
            b[size_b] = x;
            size_b++;
        }
    }
    
    // 现在比较两个去重后的集合是否相等
    // 首先检查大小是否相同
    if (size_a != size_b) {
        cout << "no" << endl;
        return 0;
    }
    
    // 检查A中的每个元素是否都在B中
    for (int i = 0; i < size_a; i++) {
        bool found = false;
        for (int j = 0; j < size_b; j++) {
            if (a[i] == b[j]) {
                found = true;
                break;
            }
        }
        if (!found) {
            cout << "no" << endl;
            return 0;
        }
    }
    
    // 检查B中的每个元素是否都在A中（由于大小相同，这个检查可以省略）
    // 但是为了完整性，我们还是检查一下
    for (int i = 0; i < size_b; i++) {
        bool found = false;
        for (int j = 0; j < size_a; j++) {
            if (b[i] == a[j]) {
                found = true;
                break;
            }
        }
        if (!found) {
            cout << "no" << endl;
            return 0;
        }
    }
    
    cout << "yes" << endl;
    return 0;
}
```

## 第九周-编程题-9.数字组合

1. 通过暴力枚举，我们已经知道123456789组成的最小三位数是123，所以最小的数一定遍历是从123开始
然后通过最大的是329，因为329 *3 = 987，这里是通过地位等价的方法推出来的

2. 然后可以将第一个数字设为i，那么第二个数，第三个数我们就已知了，可以将每个数字单独处理，看看所有出现过的数字
是不是九种数字，可以通过开一个bool数字的方式来进行实现

```C++
#include <iostream>
#include <cstring>
using namespace std;

// 检查数字是否由1-9组成且不重复
bool check(int a, int b, int c) {
    bool used[10] = {false}; // 标记数字是否已使用
    used[0] = true; // 数字0不能出现
    
    // 检查abc
    int num = a;
    while (num > 0) {
        int digit = num % 10;
        if (used[digit]) return false;
        used[digit] = true;
        num /= 10;
    }
    
    // 检查def
    num = b;
    while (num > 0) {
        int digit = num % 10;
        if (used[digit]) return false;
        used[digit] = true;
        num /= 10;
    }
    
    // 检查ghi
    num = c;
    while (num > 0) {
        int digit = num % 10;
        if (used[digit]) return false;
        used[digit] = true;
        num /= 10;
    }
    
    // 检查是否1-9都用过了
    for (int i = 1; i <= 9; i++) {
        if (!used[i]) return false;
    }
    
    return true;
}

int main() {
    // abc的范围：123到329（因为329×3=987）
    for (int abc = 123; abc <= 329; abc++) {
        int def = abc * 2;
        int ghi = abc * 3;
        
        // 保证def和ghi也是三位数
        if (def >= 100 && def <= 999 && ghi >= 100 && ghi <= 999) {
            if (check(abc, def, ghi)) {
                cout << abc << " " << def << " " << ghi << endl;
            }
        }
    }
    
    return 0;
}
```

## 第九周-编程题-11.猴子选大王

1. 这是一个经典的约瑟夫问题，我们用一个大小为 m 的 vector<bool> 来表示每只猴子是否还在圈内，true 表示未出圈，false 表示已经淘汰。
2. 程序从编号 0 的猴子开始循环报数，每遇到仍在圈内的猴子就让计数器加 1，当计数器等于 n 时，就将该猴子标记为出圈，并把计数器清零。指针 current 每一步都会向后移动，并通过取模实现环形结构。
3. 整个过程不断重复，直到只剩下一只猴子。最后遍历数组，找到仍然为 true 的那一只猴子，它的编号（从 1 开始）就是最终的大王。

```C++
#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m, n;
    
    // 输入猴子个数和出圈基数
    cin >> m;
    cin >> n;
    
    // 创建猴子数组，true表示在圈内，false表示已出圈
    // sure ， 开bool数组也可以，因为上面那个题开过bool数组
    // 我们这里用vector试一下
    vector<bool> monkeys(m, true);
    
    int current = 0;  // 当前猴子索引（从0开始）
    int count = 0;    // 计数器
    int remaining = m; // 剩余猴子数量
    
    // 模拟淘汰过程
    while (remaining > 1) {
        // 如果当前猴子还在圈内
        if (monkeys[current]) {
            count++;
            // 数到n的猴子出圈
            if (count == n) {
                monkeys[current] = false; // 猴子出圈
                remaining--;              // 剩余猴子减1
                count = 0;               // 重置计数器
            }
        }
        // 移动到下一个猴子（循环）
        current = (current + 1) % m;
    }
    // 找出最后剩下的猴子（大王）
    for (int i = 0; i < m; i++) {
        if (monkeys[i]) {
            cout << "\n猴子大王的编号为: " << i + 1 << endl;
            break;
        }
    }
    return 0;
}
```
