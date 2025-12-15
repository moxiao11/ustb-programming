## 第十一周-编程题-3.桶排序

* 数字是n,就把它丢进 第n号桶

* 桶里不存具体顺序,只记有几个

* 最后：0 号桶开始,依次把桶里的数倒出来

```C++
#include <iostream>
using namespace std;

int main() {
    int bucket[100] = {0};  // 0~99 号桶
    int x;

    // 读入 10 个数
    for (int i = 0; i < 10; i++) {
        cin >> x;
        bucket[x]++;       // 放入对应桶
    }

    // 按桶号顺序输出
    for (int i = 0; i < 100; i++) {
        while (bucket[i]--) {
            cout << i << " ";
        }
    }

    return 0;
}
```



## 第十一周-编程题-3.桶排序

有关strtok分割的做法可以看看
* strtok(str, delim);   // 第一次
* strtok(NULL, delim);  // 之后

但是由于其安全性，在工业上很多时候已经用strtok_s,strtok_r来代替使用，或者直接用string

```C++
#include <iostream>
#include <cstring>
using namespace std;

int main() {
    char s[1000];
    cin.getline(s, 1000);

    int red = 0, white = 0, blue = 0;

    char* token = strtok(s, " ");
    while (token != nullptr) {
        if (strcmp(token, "Red") == 0) red++;
        else if (strcmp(token, "White") == 0) white++;
        else if (strcmp(token, "Blue") == 0) blue++;

        token = strtok(nullptr, " ");
    }

    for (int i = 0; i < red; i++) cout << "Red ";
    for (int i = 0; i < white; i++) cout << "White ";
    for (int i = 0; i < blue; i++) cout << "Blue ";

    return 0;
}
```

解法二：while(cin >> str)

用这样的方式可以理解成，不断地从cin缓冲区中向str流出字符串,而且cin会自动跳过空格

```C++
#include <iostream>
#include <string>
using namespace std;

int main() {
    string str;
    int red = 0, white = 0, blue = 0;

    while (cin >> str) {
        if (str == "Red") red++;
        else if (str == "White") white++;
        else if (str == "Blue") blue++;
    }

    for (int i = 0; i < red; i++) cout << "Red ";
    for (int i = 0; i < white; i++) cout << "White ";
    for (int i = 0; i < blue; i++) cout << "Blue ";

    return 0;
}
```

解法三:流的方式(课堂提了一嘴，但是可以学习一下)

看起来更麻烦了，但是能够帮我们理解流的本质，

顺便说一下cin >> str 的方式其实就是流的一种优化写法。有兴趣可以自己学习一下

```C++
#include <iostream>
#include <sstream>
#include <string>
using namespace std;

int main() {
    string line;
    getline(cin, line);   // 读整行

    string word;
    stringstream ss(line);

    int red = 0, white = 0, blue = 0;

    while (ss >> word) {   // 自动按空格分词
        if (word == "Red") red++;
        else if (word == "White") white++;
        else if (word == "Blue") blue++;
    }

    for (int i = 0; i < red; i++) cout << "Red ";
    for (int i = 0; i < white; i++) cout << "White ";
    for (int i = 0; i < blue; i++) cout << "Blue ";

    return 0;
}
```