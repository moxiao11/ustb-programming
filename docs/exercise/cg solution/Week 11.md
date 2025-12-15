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



## 第十一周-编程题-4.荷兰国旗问题
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


## 第十一周-编程题-10.蛇形填数

蛇形填数一个比较重要的点就是，定义dx和dy来进行方向的转移，这是探索一个二维空间的时候比较有用的方法，

```C++
#include <iostream>
#include <iomanip>
#include <vector>
using namespace std;
const int N = 1010 ;
int matrix[N][N] ;
int main() {
    int n;
    cin >> n;
    
    
    // 定义四个方向：右、下、左、上
    int dx[4] = {0, 1, 0, -1};  // 行方向
    int dy[4] = {1, 0, -1, 0};  // 列方向
    
    int x = 0, y = n - 1;  // 起始位置：第一行最后一列
    int direction = 0;     // 起始方向：右
    
    for (int i = 1; i <= n * n; i++) {
        matrix[x][y] = i;
        
        // 计算下一个位置
        int nextX = x + dx[direction];
        int nextY = y + dy[direction];
        
        // 如果下一个位置超出边界或者已经被填充，则改变方向
        if (nextX < 0 || nextX >= n || nextY < 0 || nextY >= n || matrix[nextX][nextY] != 0) {
            direction = (direction + 1) % 4;  // 改变方向（循环）
            nextX = x + dx[direction];
            nextY = y + dy[direction];
        }
        
        x = nextX;
        y = nextY;
    }
    
    // 输出结果
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            cout << setw(4) << matrix[i][j];
        }
        cout << endl;
    }
    
    return 0;
}
```