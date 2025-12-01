# Week 5 

## 可能面临的问题

- 学
  * mooc 是绝对不看, 课绝对是不听的，学一定是在b站上的。
  * 书首先编的就很奇葩。
  * 文件是绝对不看的。
- 练
  * 大概率是用AI写的,自己写代码水平是非常慢的,抄舍友的作业。
- 考
  * TAB键，代码补全。


## Missing Lecture 
- 命令行:
  * `cd`,`ls`,`g++`,`make`,`echo`
    * ls : 列举所有的文件
    * cd : 进入某个目录
    * g++ : 生成a.exe 
    * make : 生成文件名.exe
    * 运行文件：./文件名.exe
- 工具使用
  * 记笔记 : markdown, latex(vscode , overleaf)
    * markdown: 比较简单,pdf
    * latex : 实验文件,pdf
  * 浏览器 : 谷歌浏览器
  * 插件: 沉浸式翻译 
    * LinkedList: 链表 ,抽象的ai：连接起来的列表;
  * 翻墙 
    * chatgpt 
    * youtube 
    * stackoverflow, CSDN 
    * 维基百科

- IDE
  * 助教使用的历程:dev-c++ -> VS -> Vscode -> CLion
  * dev的不适合大型开发，只适合简单的试题的编写
  * VS比较重量级，但缺少命令行的使用
  * Vscode配置非常艰难，编译 
  * Clion的某些敲代码方式做的很差
  


### 再看hello,world! 
```c++
#include <iostream>
using namespace std;
int main()
{
    cout << "Hello, world ! " << endl ; 
    return 0 ;
}
```

- 头文件 : 常用的头文件 <iomanip>
- 标准命名空间 : std 类比chrono   
- main()
- return 0 : 使用echo 
### 使用一些新用法

## 1. 球的体积
计算球的体积公式定义为 $V = \frac{4}{3}\pi R^3$。就这个公式计算球的体积。其中$\pi = 3.14159$

**输入格式**

输入包含一个浮点数，为球的半径R。

**输出格式**

输出格式为*V = x* , x为球的体积，保留四位小数。

**数据范围**

$0 < R < 2000.00$

**输入样例**

3

**输出样例**

V=113.0972


```c++
#include <iostream>
#include <iomanip>
#include <format> // c++ 20 
using namespace std;
// define pi (3.14159)
constexpr double pi = 3.14159 ;
int main() {
    int R ;
    cin >> R ;
    double V = 4*pi*R*R*R/3.0 ; 
    cout << fixed << setprecision(4)<< V << endl ;
    // printf("%.4f", V) ;
    // cout << format("{:.5f}" ,V) << endl ; 
    return 0 ;
}

```
- 单保留总位数是`setprecision(n)`，如123.34556经过setprecision(4)变成123.3.
- 保留小数需要加入关键字fixed.
- constexpr替换const定义变量.
- define的时候最好的方式是加上括号.(与计算机的立即数有关)
- 代码格式上请不要将结果暴露在输出语句中，而是封装.


# Week 8

* 思维导图
  * 体会封装的思想
  
  ![标准C++](../assets/img/image.png)


* Uniform Initialization统一初始化 // 赋值语句
```c++
int a {3} ; 
string str{"sdaa"} ;
```
* auto关键字 //赋值语句

```c++ ;
auto b = 4323;
auto str = "sgdkjdkl" ;
```
  * 尾置推导类型
  ```c++
  auto add(int a ,int b) -> int {
    return a + b ;
  }
  ```
* make_pair(value,value)   // 返回两个
```c++
auto c = make_pair(3 ,4);
cout << c.first <<  " " << c.second << endl;
auto add(int a ,int b){
  return make_pair(a + b , a - b) ;
}
```
* 结构化绑定 // C++ 17 函数返回值
```c++
auto [b , c] = add(3,4); 
cout << b << " " << c << endl ; 
```
* INT 上限 -2147483648 ~ 2147483647

