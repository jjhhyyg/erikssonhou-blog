---
date: 2025-11-05
title: 3. 字符串、向量和数组
description: 本章将分别介绍数组以及标准库类型 string 和 vector
---

## 3.1 命名空间的 using 声明

通过`using`关键字可以更方便地使用某一命名空间中的成员，`using`声明格式：

```cpp
using namespace::name;
```

使用方法：

```cpp
#include <iostream>

using std::cin;

int main() {
    int i;
    cin >> i;
    std::cout << i;
    return 0;
}
```

- 按照规定，每个`using`声明引入命名空间中的一个成员
- 头文件不应包含`using`声明：因为头文件的内容会拷贝到引用它的文件中去，如果头文件里有某个`using`声明，可能产生名字冲突

## 3.2 标准库类型 string

- 标准库类型 `string` 表示可变长的字符序列，使用 `string` 类型必须首先包含 `string` 头文件：

```cpp
#include <string>
using std::string;
```

### 3.2.1 初始化

`string` 对象的初始化方式有如下几种：

```cpp
#include <string>
using std::string;

string s1;              // 默认初始化，s1是一个空串
string s2(s1);          // s2 是 s1 的副本（copy）
string s2 = s1;         // 与上一句等价
string s3("value");     // s3 是字面值"value"的副本
string s3 = "value";    // 与上一句等价
string s4(n, 'c');      // 把 s4 初始化为由连续 n 个字符 c 组成的串
```

#### 直接初始化和拷贝初始化

直接初始化：不使用等号的初始化（当初始化的值用到多个时，一般都是直接初始化）
拷贝初始化：用等号来初始化（初始值只有一个时，可以用拷贝初始化和直接初始化）

以上面的代码为例：

```cpp
string s2(s1);          // 直接初始化
string s2 = s1;         // 拷贝初始化
string s3("value");     // 直接初始化
string s3 = "value";    // 拷贝初始化
string s4(n, 'c');      // 直接初始化
```

### 3.2.2 string 对象上的操作

表 3.2 string的操作

| 操作 | 描述 |
| :--- | :--- |
| `os<<s` | 将 `s` 写到输出流 `os` 当中，返回 `os` |
| `is>>s` | 从 `is` 中读取字符串赋给 `s`，字符串以**空白**分隔，返回 `is` |
| `getline(is, s)` | 从 `is` 中读取一行赋给 `s`，返回 `is` |
| `s.empty()` | `s` 为空返回 `true`，否则返回 `false` |
| `s.size()` | 返回 `s` 中字符的个数 |
| `s[n]` | 返回 `s` 中第 `n` 个字符的引用，位置 `n` 从 0 计起 |
| `s1+s2` | 返回 `s1` 和 `s2` 连接后的结果 |
| `s1=s2` | 用 `s2` 的副本代替 `s1` 中原来的字符 |
| `s1==s2` | 如果 `s1` 和 `s2` 中所含的字符完全一样，则它们相等；`string` 对象的相等性判断对字母的**大小写敏感** |
| `s1!=s2` | (与 `s1==s2` 逻辑相反，同样对**大小写敏感**) |
| `<`, `<=`, `>`, `>=` | 利用字符在字典中的顺序进行比较，且对字母的**大小写敏感** |

#### 读写 string 对象

- 在执行读取操作时，string 对象会自动**忽略开头的空白（即空格符、换行符、制表符等）**，并从第一个真正的字符开始读起，**直到遇到下一处空白为止**；
- 由于`cin`读取和写入`string`对象会导致对象中无法保存空白，因此可以通过`getline(cin, s)`的方式来输入字符串，`getline`函数从给定的输入流中读取内容，**直到遇到换行符为止（注意换行符也被读进来了）**，然后把所读内容存入到`string`对象中去（注意不存换行符，在getline函数中被丢弃）。

#### empty 和 size 操作

`empty`函数不介绍了，就是用来判断字符串是否非空的，稍微介绍一下`size`操作。

`size()`函数返回一个`string::size_type`类型的值。

> string 类及其他大多数标准库类型都定义了几种配套类型，这些配套类型体现了**标准库类型与机器无关**的特性，`string::size_type`实际上是一个**无符号整型**。

⚠️ 在用`size()`函数来比较的时候要注意，如果用它和一个负数比较，基本上结果是`true`，因为负数会先转化为一个比较大的无符号值。

⚠️ `length()`函数和`size()`函数作用一样，本质上来说，`length()`函数的返回值就调用了`size()`。

#### string 比较

1. 长度不同，且较短对象的每个字符都与较长对象的对应位置字符相同，则较短对象小于较长对象；
2. 如果两个对象在某些对应的位置上不一致，则比较结果是对象中**第一对相异字符**比较的结果。

示例：

```cpp
string str = "Hello";
string phrase = "Hello World!";
string slang = "Hiya";
```

它们的结果是：$\text{slang} \gt \text{phrase} \gt \text{str}$。

#### 字面值和 string 对象相加

因为历史原因，也为了与 C 兼容，C++ 中的字符串字面值与`string`是不同的类型。因此，在用`+`运算符进行字符串拼接时有如下规则：

- 必须确保每个`+`运算符的两侧的运算对象至少有一个是`string`

下面这个例子能很好说明这一特性：

```cpp
string s4 = s1 + ", ";              // 正确
string s5 = "hello" + ", ";         // 错误
string s6 = s1 + ", " + "world";    // 正确，等价于 string s6 = (s1 + ", ") + "world"
string s7 = "hello" + ", " + s2;    // 错误，等价于 string s7 = ("hello" + ", ") + s2
```

#### 练习

##### 3.2

![练习 3.2](/images/20251107014501.png)

读入一整行：

```cpp
int main(int argc, const char * argv[]) {
    string s;
    getline(cin, s);
    cout << s << endl;
    return EXIT_SUCCESS;
}
```

读入一个词：

```cpp
int main(int argc, const char * argv[]) {
    string s;
    cin >> s;
    cout << s << endl;
    return EXIT_SUCCESS;
}
```

##### 3.3

![练习 3.3](/images/20251107014521.png)

- 输入运算符：自动**忽略开头的空白（即空格符、换行符、制表符等）**，并从第一个真正的字符开始读起，**直到遇到下一处空白为止**；
- `getline`函数：从给定的输入流中读取内容，**直到遇到换行符为止（注意换行符也被读进来了）**，然后把所读内容存入到`string`对象中去，如果首个字符就是换行符，将得到一个空字符串。

##### 3.4

![练习 3.4](/images/20251107014539.png)

程序1:

```cpp
int main(int argc, const char * argv[]) {
    string s1, s2;
    getline(cin, s1);
    getline(cin, s2);
    if(s1 != s2) {
        cout << (s1 > s2 ? s1 : s2) << endl;
    }
    return EXIT_SUCCESS;
}
```

程序2:

```cpp
int main(int argc, const char * argv[]) {
    string s1, s2;
    getline(cin, s1);
    getline(cin, s2);
    if(s1.size() != s2.size()) {
        cout << (s1.size() > s2.size() ? s1 : s2) << endl;
    }
    return EXIT_SUCCESS;
}
```

##### 3.5

![练习 3.5](/images/20251107014557.png)

程序1:

```cpp
int main(int argc, const char * argv[]) {
    string s, ls;
    while(getline(cin, s)) {
        ls += s;
    }
    cout << ls << endl;
    return EXIT_SUCCESS;
}
```

程序2:

```cpp
int main(int argc, const char * argv[]) {
    string s, ls;
    while(getline(cin, s)) {
        ls += s + " ";
    }
    cout << ls << endl;
    return EXIT_SUCCESS;
}
```

### 3.2.3 处理 string 对象中的字符

在`cctype`头文件中定义了一组标准库函数来获取**某个字符的特性**：

| 函数 | 描述 |
| :--- | :--- |
| `isalnum(c)` | 当 `c` 是字母或数字时为真 |
| `isalpha(c)` | 当 `c` 是字母时为真 |
| `iscntrl(c)` | 当 `c` 是控制字符时为真 |
| `isdigit(c)` | 当 `c` 是数字时为真 |
| `isgraph(c)` | 当 `c` 不是空格但可打印时为真 |
| `islower(c)` | 当 `c` 是小写字母时为真 |
| `isprint(c)` | 当 `c` 是可打印字符时为真 (即 `c` 是空格或 `c` 具有可视形式) |
| `ispunct(c)` | 当 `c` 是标点符号时为真 (即 `c` 不是控制字符、数字、字母、可打印空白中的一种) |
| `isspace(c)` | 当 `c` 是空白时为真 (即 `c` 是空格、横向制表符、纵向制表符、回车符、换行符、进纸符中的一种) |
| `isupper(c)` | 当 `c` 是大写字母时为真 |
| `isxdigit(c)`| 当 `c` 是十六进制数字时为真 |
| `tolower(c)` | 如果 `c` 是大写字母，输出对应的小写字母；否则原样输出 `c` |
| `toupper(c)` | 如果 `c` 是小写字母，输出对应的大写字母；否则原样输出 `c` |

#### 遍历所有字符

1. 如果仅仅是遍历字符而不需要修改字符的话，可以使用`range for`语句：

    ```cpp
    for (declaration: expression)
        statement
    ```

2. 如果要修改字符，必须把循环变量定义为**引用类型**，当使用引用作为循环控制变量时，这个变量实际上被依次绑定到了序列的每个元素上：

    ```cpp
    string s("Hello World!!!");
    for (auto &c: s) 
        c = toupper(c);
    cout << s << endl;
    ```

#### 只处理一部分字符

两种方式：

1. 下标
   a. 下标类型：由于`size`函数的返回值是`string::size_type`，其本质上是**无符号整型**，因此定义下标时最好定义为同类型：

    ```cpp
    // 依次处理 s 中的字符直至我们处理完全部字符或者遇到一个空白
    for (decltype(s.size()) index = 0; index != s.size() && !isspace(s[index]); ++index)
        s[index] = toupper(s[index]); // 将当前字符改成大写形式
    ```

    b. 使用下标执行**随机访问**：如下例，将0～15的十进制数转换为十六进制形式：

    ```cpp
    const string hexdigits = "0123456789ABCDEF";
    string result;
    string::size_type n;
    while(cin >> n) {
        if (n < hexdigits.size()) {
            result += hexdigits[n];
        }
    }
    cout << result << endl;
    ```

2. 迭代器（在3.4节和第九章中有介绍）

#### 练习

#### 3.6

![练习 3.6](/images/20251107144227.png)

```cpp
int main(int argc, const char * argv[]) {
    string s = "Hello, World!";
    for (char &c : s) c = 'X';
    cout << s << endl;
    return EXIT_SUCCESS;
}
```

#### 3.7

![练习 3.7](/images/20251107144243.png)

估计：会提示变量`c`为不能修改的对象。❌

```cpp
int main(int argc, const char * argv[]) {
    string s = "Hello, World!";
    for (char c : s) c = 'X';
    cout << s << endl;
    return EXIT_SUCCESS;
}
```

结果：输出为`Hello, World!`，实际是变量`c`为`s`中对应字符的**副本**，修改`c`的值不会改变原字符串。

更进一步，将`c`类型改为`auto`，一样不会修改`s`的值；将`c`类型改为`auto &`，达到预期结果。

#### 3.8

![练习 3.8](/images/20251107144258.png)

while:

```cpp
int main(int argc, const char * argv[]) {
    string s = "Hello, World!";
    decltype(s.size()) n = 0;
    while (n < s.size()) {
        s[n] = 'X';
        n++;
    }
    cout << s << endl;
    return EXIT_SUCCESS;
}
```

传统 for:

```cpp
int main(int argc, const char * argv[]) {
    string s = "Hello, World!";
    for (decltype(s.size()) n = 0; n < s.size(); n++) s[n] = 'X';
    cout << s << endl;
    return EXIT_SUCCESS;
}
```

如果准备处理范围内的每一个元素，则一般使用`range for`更好。本例中，无需在意字符的处理顺序，使用`range for`更简洁直观。

#### 3.9

![练习 3.9](/images/20251107144317.png)

不合法，`s`为空字符串，`s[0]`表示取该字符串中的第一个字符，超出了`s.size()`。

⚠️ 但在有些编译器环境中，上述语句并不会引发编译错误。

#### 3.10

![练习 3.10](/images/20251107144332.png)

```cpp
int main(int argc, const char * argv[]) {
    string s, result;
    getline(cin, s);
    for (char &c : s)
        if (!ispunct(c)) result += c;
    cout << result << endl;
    return EXIT_SUCCESS;
}
```

测试用例：

```plaintext
Hello, World! I'm really into it.
```

输出结果：

```plaintext
Hello World Im really into it
```

#### 3.11

![练习 3.11](/images/20251107144351.png)

合法的，由于`s`的类型是`const string`，`c`的类型应该是**char类型的常量引用**，不能通过`c`来修改`s`中的对应字符。

## 3.3 标准库类型 vector

- vector 也被称为**容器**，表示对象的集合，其中所有对象的类型都相同
- C++既有**类模版**，也有**函数模版**，其中vector是一个类模版
- 模版本身不是类或函数，可以将其看作为编译器生成类或函数编写的一份说明，编译器根据模版创建类或函数的过程称为**实例化（instantiation）**。当使用模版时，需要指出编译器应把类或函数实例化为**何种类型**：

    ```cpp
    vector<int> ivec;
    vector<Sales_item> Sales_vec;
    vector<vector<string>> files;
    ```

- vector 能容纳绝大多数类型的**对象**作为其元素，因引用不是对象，所以不存在包含引用的vector
- 早期版本的`vector`的模板中，如果还是`vector`，则需要这样写：`vector<vector<string> >`而非`vector<vector<string>>`，必须在**外层`vector`对象的右尖括号和其元素类型之间添加一个空格**。

### 3.3.1 定义和初始化 vector 对象

| 语法 | 说明 |
| :--- | :--- |
| `vector<T> v1` | v1 是一个空 vector，它潜在的元素是 T 类型的，执行**默认初始化** |
| `vector<T> v2(v1)` | v2 中包含有 v1 所有元素的副本 |
| `vector<T> v2 = v1` | 等价于 v2(v1)，v2 中包含有 v1 所有元素的副本 |
| `vector<T> v3(n, val)` | v3 包含了 n 个重复的元素，每个元素的值都是 val |
| `vector<T> v4(n)` | v4 包含了 n 个重复地执行了**值初始化**的对象 |
| `vector<T> v5{a,b,c...}` | v5 包含了初始值个数的元素，每个元素被赋予相应的初始值 |
| `vector<T> v5={a,b,c...}` | 等价于 v5{a,b,c...} |

上述方法可以分为如下几类：

1. 默认初始化：`vector<T> v1`，创建一个保存`T`类型元素的空 vector
2. 拷贝初始化：`vector<T> v2(v1)` 或 `vector<T> v2 = v1`
3. 列表初始化：如`vector<T> v5{a,b,c...}`和`vector<T> v5={a,b,c...}`，是C++11新标准提供的方法，通过用花括号括起来的0个或多个初始元素值赋给 vector 对象
4. 创建指定数量的元素：`vector<T> v3(n, val)`，该vector中包含了n个值为val的T类型对象
5. 值初始化：`vector<int> ivec(10)` 或 `vector<string> svec(10)`，分别表示：1. 10个元素，每个都初始化为0；2. 10个元素，每个都是空string对象

#### 列表初始值还是元素数量？

初始化过程会尽可能地把**花括号**内的值当成是**元素初始值的列表**来处理，**只有在无法执行列表初始化时才会考虑其他初始化方式**。

```cpp
vector<int> v1(10);         // v1 有 10 个元素，每个元素值为 0
vector<int> v2{10};         // v2 有 1 个元素，该元素值为 10

vector<int> v3(10, 1);      // v3 有 10 个元素，每个元素值为 1
vector<int> v4{10, 1};      // v4 有 2 个元素，值分别为 10 和 1

vector<string> v5{"hi"};    // v5 有 1 个元素，该元素值为 "hi"
vector<string> v6("hi");    // 错误，不能使用字符串字面值构建 vector 对象

vector<string> v7{10};      // v7 有 10 个元素，每个元素都是空字符串
vector<string> v8{10, "hi"};// v8 有 10 个元素，每个元素值为 "hi"
```

总的来说就是：要想列表初始化 vector 对象，花括号里的值必须**元素类型相同**。确认无法执行列表初始化后，编译器会尝试用**默认值**初始化 vector 对象。

#### 练习

##### 3.12

![练习 3.12](/images/20251110135030.png)

- (a) 正确，定义了一个`vector<int>`类型元素的空集合
- (b) 错误，`ivec`元素类型是`int`，而`svec`元素类型是`string`
- (c) 正确，这行语句创建了一个`svec`对象，包含了10个"null"字符串对象

##### 3.13

![练习 3.13](/images/20251110135049.png)

- (a) 0 个
- (b) 10 个，值都为0
- (c) 10 个，值都为42
- (d) 1个，值为10
- (e) 2个，值为10和42
- (f) 10个，值都是空字符串
- (g) 10个，值都为"hi"

### 3.3.2 向 vector 对象中添加元素

通过`push_back`成员函数来向一个`vector`对象尾部添加元素：

```cpp
vector<int> v2;
for (int i = 0; i != 100; ++i) {
    v2.push_back(i);
}
```

> vector 对象能**高效增长**，最有效的办法是先定义一个**空的**vector对象，再在运行时向其中添加具体值。
>
> 如果循环体内部包含有**向 vector 对象添加元素**的语句，则不能使用**range for**，具体原因在5.4.3小节有详细解释。（range for 体内不应改变其所遍历序列的大小）

#### 练习

##### 3.14

![练习 3.14](/images/20251110143229.png)

```cpp
int main(int argc, const char * argv[]) {
    int i;
    vector<int> nums;
    while(cin >> i) {
        nums.push_back(i);
    }
    for(auto num: nums) cout << num << endl;
    return EXIT_SUCCESS;
}
```

##### 3.15

![练习 3.15](/images/20251110143240.png)

![getline函数定义](/images/20251110143630.png)

由上图可知，`getline()`函数返回值也是`istream`，和`cin >> i`返回左侧的`istream`对象相同，因此代码可以这样写：

```cpp
int main(int argc, const char * argv[]) {
    string s;
    vector<string> nums;
    while(getline(cin, s)) {
        nums.push_back(s);
    }
    for(auto num: nums) cout << num << endl;
    return EXIT_SUCCESS;
}
```

### 3.3.3 其他 vector 操作

| 操作 | 说明 |
| :--- | :--- |
| `v.empty()` | 如果 v 不含有任何元素，返回真；否则返回假 |
| `v.size()` | 返回 v 中元素的个数 |
| `v.push_back(t)` | 向 v 的尾端添加一个值为 t 的元素 |
| `v[n]` | 返回 v 中第 n 个位置上元素的引用 |
| `v1 = v2` | 用 v2 中元素的拷贝替换 v1 中的元素 |
| `v1 = {a,b,c...}` | 用列表中元素的拷贝替换 v1 中的元素 |
| `v1 == v2` | v1 和 v2 相等当且仅当它们的元素数量相同且对应位置的元素值都相同 |
| `v1 != v2`, `<`, `<=`, `>`, `>=` | 顾名思义，以字典顺序进行比较 |

- `v.size()`返回对象的类型是：`vector<T>::size_type`：

    ```cpp
    vector<int>::size_type sz; // 正确
    vector::size_type sz;      // 错误
    ```

- `vector`对象的下标运算符可用于**访问已存在的元素**，而不能用于添加元素！
- 确保下标合法的一种有效手段就是尽可能使用范围 for 语句

#### 练习

##### 3.16

![练习 3.16](/images/20251110144310.png)

```cpp
int main(int argc, const char * argv[]) {
    vector<int> v1;
    vector<int> v2(10);
    vector<int> v3(10, 42);
    vector<int> v4{10};
    vector<int> v5{10, 42};
    vector<string> v6{10};
    vector<string> v7{10, "hi"};
    
    cout << "v1 " << "size: " << v1.size() << endl;
    for (auto i: v1) cout << i << endl;
    cout << "v2 " << "size: " << v2.size() << endl;
    for (auto i: v2) cout << i << endl;
    cout << "v3 " << "size: " << v3.size() << endl;
    for (auto i: v3) cout << i << endl;
    cout << "v4 " << "size: " << v4.size() << endl;
    for (auto i: v4) cout << i << endl;
    cout << "v5 " << "size: " << v5.size() << endl;
    for (auto i: v5) cout << i << endl;
    cout << "v6 " << "size: " << v6.size() << endl;
    for (auto i: v6) cout << i << endl;
    cout << "v7 " << "size: " << v7.size() << endl;
    for (auto i: v7) cout << i << endl;
    
    return EXIT_SUCCESS;
}
```

输出结果：

```plaintext
v1 size: 0
v2 size: 10
0
0
0
0
0
0
0
0
0
0
v3 size: 10
42
42
42
42
42
42
42
42
42
42
v4 size: 1
10
v5 size: 2
10
42
v6 size: 10










v7 size: 10
hi
hi
hi
hi
hi
hi
hi
hi
hi
hi
```

##### 3.17

![练习 3.17](/images/20251110144324.png)

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main(int argc, const char * argv[]) {
    string word;
    vector<string> words;
    
    while(cin >> word) {
        words.push_back(word);
    }
    
    for(auto &w: words) {
        for(auto &c: w) c = toupper(c);
        cout << w << endl;
    }
    
    return EXIT_SUCCESS;
}
```

##### 3.18

![练习 3.18](/images/20251110144337.png)

不合法，vector的下标操作只能访问元素，不能新增元素，应该改为：

```cpp
vector<int> ivec;
ivec.push_back(42);
```

##### 3.19

![练习 3.19](/images/20251110144351.png)

```cpp
#include <iostream>
#include <string>
#include <vector>
using namespace std;

int main(int argc, const char * argv[]) {
    vector<int> v1(10, 42);
    
    vector<int> v2(10);
    for(int &i: v2) i = 42;
    
    vector<int> v3;
    while(v3.size() < 10) v3.push_back(42);
    
    return EXIT_SUCCESS;
}
```

v1最简洁直观，v3比较灵活。

##### 3.20

![练习 3.20](/images/20251110144406.png)

程序1:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main(int argc, const char * argv[]) {
    int num;
    vector<int> nums;
    
    while(cin >> num) nums.push_back(num);
    
    for(decltype(nums.size()) i = 0; i < nums.size() - 1; i += 2) cout << nums[i] + nums[i+1] << endl;
    // 奇数单独处理
    if(nums.size() % 2 != 0) cout << nums[nums.size() - 1] << endl;
    
    return EXIT_SUCCESS;
}
```

程序2:

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main(int argc, const char * argv[]) {
    int num;
    vector<int> nums;
    
    while(cin >> num) nums.push_back(num);
    
    for(decltype(nums.size()) i = 0; i < nums.size() / 2; i++) {
        decltype(nums.size()) l = i, r = nums.size() - l - 1;
        cout << nums[l] + nums[r] << " ";
        if((i + 1) % 5 == 0) cout << endl; // 每行输出5个数字
    }
    // 奇数单独处理
    if(nums.size() % 2 != 0) cout << nums[nums.size() / 2] << endl;
    
    return EXIT_SUCCESS;
}
```

## 3.4 迭代器介绍
