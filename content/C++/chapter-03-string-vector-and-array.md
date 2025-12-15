---
date: 2025-11-05
updatedDate: 2025-12-11
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

- 所有标准库容器都可以使用迭代器，但是其中只有少数几种才同时支持下标运算符
- 严格来说，`string`对象不属于容器类型，但支持很多与容器类型类似的操作
- 类似于指针、引用类型，迭代器也提供了对对象的**简介访问**
- 迭代器有有效和无效之分，和指针差不多：有效的迭代器或指向某个元素，或指向容器中为元素的下一位置，其他情况都属于无效

### 3.4.1 使用迭代器

- 有迭代器的类型同时拥有返回迭代器的成员：`begin()`和`end()`，其中`begin`成员负责返回指向第一个元素（或第一个字符）的迭代器，`end`成员负责返回指向容器（或`string`对象）尾元素的下一位置的迭代器。
- 特殊情况下，如果容器为空，则`begin`和`end`返回同一个迭代器。
- 一般来说，我们不在意迭代器准确的类型到底是什么，都用`auto`关键字来定义。

#### 迭代器运算符

| 运算符 | 说明 |
| :--- | :--- |
| `*iter` | 返回迭代器 `iter` 所指元素的引用 |
| `iter->mem` | 解引用 `iter` 并获取该元素的名为 `mem` 的成员，等价于 `(*iter).mem` |
| `++iter` | 令 `iter` 指示容器中的下一个元素 |
| `--iter` | 令 `iter` 指示容器中的上一个元素 |
| `iter1 == iter2`<br>`iter1 != iter2` | 判断两个迭代器是否相等（不相等），如果两个迭代器指示的是同一个元素或者它们是同一个容器的尾后迭代器，则相等；反之，不相等 |

⚠️ 执行解引用的迭代器**必须合法**且**确实指示着某个元素**，试图解引用一个非法迭代器或者尾后迭代器都是未被定义的行为。

```cpp
string s("some string");
// 将首字母改为大写
if (s.begin() != s.end()) {
    auto it = s.begin();
    *it = toupper(*it);
}
```

#### 迭代器类型

拥有迭代器的标准库类型使用`iterator`和`const_iterator`来表示迭代器的类型：

```cpp
vector<int>::iterator it;
string::iterator it2;

vector<int>::const_iterator it3;
string::const_iterator it4;
```

`begin()`和`end()`返回的具体类型由**对象是否是常量**决定。

```cpp
vector<int> v;
const vector<int> cv;
auto it1 = v.begin();   // 返回类型为vector<int>::iterator
auto it2 = cv.begin();  // 返回类型为vector<int>::const_iterator
```

为便于专门得到`const_interator`类型的返回值，C++11新标准引入了两个新函数，分别是`cbegin`和`cend`:

```cpp
auto it3 = v.cbegin();
```

#### 结合解引用和成员访问操作

解引用迭代器可获得**迭代器所指向的对象**，如果该迭代器恰好是类，就可以进一步访问它的成员：

```cpp
(*it).empty();  // 解引用it，然后调用结果对象的empty成员
*it.empty();    // 错误：试图访问it的名为empty的成员，但it是一个迭代器，无empty成员
```

为简化上述表达式，C++定义了**箭头运算符**（->)，该运算符将**解引用**和**成员访问**两个操作结合在一起：

```cpp
(*it).empty();
```

等价于：

```cpp
it->empty();
```

#### 某些对vector对象的操作会使迭代器失效

虽然vector对象可以动态增长，但也会有一些 side effects：

- 不能在范围 for 循环（range for）中向vector对象添加元素
- 任何一种可能改变vector对象容量的操作，如push_back，都会使该vector对象的迭代器失效

#### 练习

##### 练习 3.21

请使用迭代器重做 3.3.3 节的第一个练习。

```cpp
#include <iostream>
#include <vector>
using namespace std;

int main(int argc, const char * argv[]) {
    vector<int> v1;
    vector<int> v2(10);
    vector<int> v3(10, 42);
    vector<int> v4{10};
    vector<int> v5{10, 42};
    vector<string> v6{10};
    vector<string> v7{10, "hi"};
    
    cout << "v1 " << "size: " << v1.size() << endl;
    for(auto it = v1.begin(); it != v1.end(); it++) cout << *it << endl;
    
    cout << "v2 " << "size: " << v2.size() << endl;
    for(auto it = v2.begin(); it != v2.end(); it++) cout << *it << endl;
    
    cout << "v3 " << "size: " << v3.size() << endl;
    for(auto it = v3.begin(); it != v3.end(); it++) cout << *it << endl;
    
    cout << "v4 " << "size: " << v4.size() << endl;
    for(auto it = v4.begin(); it != v4.end(); it++) cout << *it << endl;
    
    cout << "v5 " << "size: " << v5.size() << endl;
    for(auto it = v5.begin(); it != v5.end(); it++) cout << *it << endl;
    
    cout << "v6 " << "size: " << v6.size() << endl;
    for(auto it = v6.begin(); it != v6.end(); it++) cout << *it << endl;
    
    cout << "v7 " << "size: " << v7.size() << endl;
    for(auto it = v7.begin(); it != v7.end(); it++) cout << *it << endl;
    
    return EXIT_SUCCESS;
}
```

##### 练习 3.22

修改之前那个输出text第一段的程序，首先把text的第一段全都改成大写形式，然后再输出它。

```cpp
int main(int argc, const char * argv[]) {
    vector<string> text {"Hello, world!", "", "Don't forget who you are."};
    for (auto it = text.begin(); it != text.end() && !it->empty(); it++) 
        for (auto cit = it->begin(); cit != it->end(); cit++) 
            *cit = toupper(*cit);
    for (auto it = text.cbegin(); it != text.cend(); it++) cout << *it << endl;
    return EXIT_SUCCESS;
}
```

##### 练习 3.23

编写一段程序，创建一个含有 10 个整数的 vector 对象，然后使用迭代器将所有元素的值都变成原来的两倍。输出 vector 对象的内容，检验程序是否正确。

```cpp
int main(int argc, const char * argv[]) {
    vector<int> nums {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    for(auto it = nums.begin(); it != nums.end(); it++) *it *= 2;
    for(auto n : nums) cout << n << " ";
    cout << endl;
    return EXIT_SUCCESS;
}
```

### 3.4.2 迭代器运算

vector和string迭代器支持的运算：

| 运算符 | 说明 |
|--------|------|
| `iter + n` | 迭代器加上一个整数值仍得一个迭代器,迭代器指示的新位置与原来相比向前移动了若干个元素。结果迭代器或者指示容器内的一个元素,或者指示容器尾元素的下一位置 |
| `iter - n` | 迭代器减去一个整数值仍得一个迭代器,迭代器指示的新位置与原来相比向后移动了若干个元素。结果迭代器或者指示容器内的一个元素,或者指示容器尾元素的下一位置 |
| `iter1 += n` | 迭代器加法的复合赋值语句,将iter1加n的结果赋给iter1 |
| `iter1 -= n` | 迭代器减法的复合赋值语句,将iter1减n的结果赋给iter1 |
| `iter1 - iter2` | 两个迭代器相减的结果是它们之间的距离,也就是说,将运算符右侧的迭代器向前移动差值个元素后将得到左侧的迭代器。参与运算的两个迭代器必须指向的是同一个容器中的元素或者尾元素的下一位置 |
| `>`, `>=`, `<`, `<=` | 迭代器的关系运算符,如果某迭代器指向的容器位置在另一个迭代器所指位置之前,则说前者小于后者。参与运算的两个迭代器必须指向的是同一个容器中的元素或者尾元素的下一位置 |

#### 迭代器的算术运算

如果两个迭代器指向的是同一个容器中的元素或者尾元素的下一位置，两者相减所得结果是两个迭代器的距离，其类型是名为**defference_type**的**带符号整型数**。`string`和`vector`都定义了`difference_type`。

## 3.5 数组

### 3.5.1 定义和初始化内置数组

数组是一种**复合类型**，数组中元素的个数在**编译**时应该是可知的，也就是说，数组大小必须是一个**常量表达式**。

```cpp
unsigned int cnt = 42;          // 不是常量表达式
constexpr unsigned sz = 42;     // 常量表达式
int arr[10];                    // 含有10个整数的数组
int *parr[sz];                  // 含有42个整型指针的数组
string bad[cnt];                // 错误：cnt不是常量表达式
string strs[get_size()];        // 当 get_size 是 constexpr 时正确；否则错误
```

- 默认情况下，数组的元素被**默认初始化**。
- 和内置类型的变量一样，如果在**函数内部**定义了某种内置类型的数组，那默认初始化会令数组含有未定义的值。
- 定义数组时，**必须指定数组的类型**，不能用auto关键字来从列表初始化推断数组类型。
- 和vector一样，数组的元素应为**对象**，因此不存在引用的数组。

#### 显式初始化数组元素

可以对数组进行**列表初始化**：

1. 如果声明时没有指定大小，编译器会根据初始值的数量计算并推测出来；
2. 如果指明了大小，那初始值的总数量不应该超出指定的大小：如果维度比提供的初始值数量大，则用提供的初始值初始化靠前元素，剩下元素默认初始化。

```cpp
const unsigned int sz = 3;
int ia1[sz] = {0, 1, 2};        // 含有 3 个元素的数组，元素值分别是0，1，2
int a2[] = {0, 1, 2};           // 同上
int a3[5] = {0, 1, 2};          // 函数体外，等价于a3[] = {0, 1, 2, 0, 0}；
                                // 函数体内，等价于a3[] = {0, 1, 2, x, x}，x为未知值
string a4[3] = {"hi", "bye"};   // 等价于a4[] = {"hi", "bye", ""}
int a5[2] = {0, 1, 2};          // 错误：初始值过多
```

#### 字符数组的特殊性

```cpp
const char a4[6] = "Daniel";
```

上述语句是错误的，当用字符串字面量初始化字符数组时，**数组实际大小应+1**，因为字符串字面量末尾有一个`'\0'`结束符。

#### 不允许拷贝和赋值

- 不能将数组的内容作为其他数组的**初始值**：`int a2[] = a`
- 不能用数组为其他数组赋值：`a2 = a`

#### 理解复杂的数组声明

方法：不像指针、引用等**从右往左**读的方式，数组的复杂声明最好采用**由内向外，先右后左**的方式：

```cpp
int arr[10];
int *ptrs[10];              // 一个含有10个整型指针的数组
int &refs[10] = /* ? */;    // 错误，不存在引用的数组
int (*Parray)[10] = &arr;   // Parray是一个指针，然后指向一个含有10个整数的数组
int (&arrRef)[10] = arr;    // arrRef是一个引用，指向一个含有10个整数的数组
int *(&arry)[10] = ptrs;    // arry是一个引用，int*决定了该引用指向的是一个含有10个整型指针的数组
```

#### 练习

##### 练习 3.27

![练习3.27](/images/20251209004031.png)

- (a) 非法，buf_size不是一个常量表达式
- (b) 合法，`4 * 7 - 14`是一个常量表达式
- (c) 非法，函数返回的`int`不是编译期间能确定的，`txt_size`函数不是常量表达式
- (d) 非法，`st`变量的大小应该为12，因为后面的字符串还包含一个空白符

##### 练习 3.28

![练习 3.28](/images/20251209004058.png)

- `sa`: 默认初始化，全为空字符串
- `ia`: 默认初始化，全为0
- `sa2`: 默认初始化，全为空字符串
- `ia2`: 默认初始化，由于在函数体内，都是未知奇异值

##### 练习 3.29

![练习 3.29](/images/20251209004112.png)

1. 数组大小固定不变，虽然某些场景下运行时性能较好，但较vector相比损失了灵活性；
2. 数组大小在定义时已经确定，如果要更改数组长度，要手动创建一个新数组后一个个复制过去；
3. 数组大小不能直接像vector那样直接用size()函数获取，如果是字符数组，可以用strlen()函数获取；如果是其他数组，需要用`sizeof(array)/sizeof(array[0])`的方式来计算数组的维度。

### 3.5.2 访问数组元素

使用数组下标时，通常将其定义为`size_t`类型，这是一种**机器相关**的**无符号类型**，它被设计得**足够大**以便表示内存中任意对象的大小，该类型在`cstddef`头文件中定义的。

- 数组访问元素：仅能通过下标访问。
- 数组也能用range for进行遍历，能减轻人为控制遍历过程的负担。

#### 练习

##### 练习 3.30

![练习 3.30](/images/20251209143249.png)

ix应该从`0`开始，到9结束，for循环应该写为：

```cpp
for (size_t ix = 0; ix < array_size; ++ix) 
    ia[ix] = ix;
```

##### 练习 3.31

编写一段程序，定义一个含有 10 个 int 的数组，令每个元素的值就是其下标值。

```cpp
int main(int argc, const char * argv[]) {
    int nums[10];
    for(int i = 0; i < sizeof(nums)/sizeof(nums[0]); i++) nums[i] = i;
    for(int num : nums) cout << num << " ";
    cout << endl;
    return EXIT_SUCCESS;
}
```

##### 练习 3.32

将上一题刚刚创建的数组拷贝给另外一个数组。利用 vector 重写程序，实现类似的功能。

数组拷贝：

```cpp
int main(int argc, const char * argv[]) {
    int nums1[10];
    for(int i = 0; i < sizeof(nums1)/sizeof(nums1[0]); i++) nums1[i] = i;
    
    int nums2[10];
    for(int i = 0; i < sizeof(nums2)/sizeof(nums2[0]); i++) nums2[i] = nums1[i];

    for(int num : nums2) cout << num << " ";
    cout << endl;
    return EXIT_SUCCESS;
}
```

vector重写：

```cpp
int main(int argc, const char * argv[]) {
    vector<int> v1, v2;
    decltype(v1.size()) sz = 10;
    for(decltype(v1.size()) i = 0; i < sz; i++) v1.push_back((int)i);
    v2 = v1; // 直接拷贝
    for(int num : v2) cout << num << " ";
    cout << endl;
    return EXIT_SUCCESS;
}
```

##### 练习 3.33

对于 104 页的程序来说，如果不初始化 scores 将发生什么？

104页的程序：

```cpp
unsigned scores[11] = {};
unsigned grade;
while (cin >> grade) {
    if (grade <= 100)
        ++socres[grade/10];
}
```

程序中对scores进行了列表初始化，所有值都被初始化为0。如果不初始化，那scores被默认初始化且在函数体内部，会存在未定义的值。

### 3.5.3 指针和数组

- 使用数组时，编译器一般会把它转换为**指针**。
- 对数组元素使用取地址符就能得到指向该元素的指针。
- 在很多用到数组名字的地方，编译器都会自动地将其替换为一个指向数组首元素的指针：`string *p2 = nums; // 等价于 p2 = &nums[0]`
- 在一些情况下数组的操作实际上是指针的操作：
  - 当使用数组作为一个`auto`变量的初始值时，推断得到的类型是**指针**而非数组：

    ```cpp
    int ia[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    auto ia2(ia);   // ia2 是一个整型指针，指向 ia 的第一个元素
    ia2 = 42;       // 错误：ia2 是一个指针，不能用 int 值给指针赋值
    ```

  - 当使用`decltype`时上述转换不会发生，`decltype`返回的类型是由 10 个整数构成的数组：

    ```cpp
    decltype(ia) ia3 = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
    ia3 = p;    // 错误：不能用整型指针给数组赋值
    ia3[4] = i; // 正确：把 i 的值赋给 ia3 的一个元素
    ```

#### 指针也是迭代器

指向数组元素的指针拥有更多功能，`vector`和`string`的迭代器支持的运算，数组的指针全都支持：

允许使用**递增运算符**将指向数组元素的指针向前移动到下一个位置上:

```cpp
int arr[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
int *p = arr;   // p 指向 arr 的第一个元素
++p;            // p 指向 arr[1]
```

上述代码可获取数组的**首元素指针**，下面是**尾后指针**的获取方式：

```cpp
int *e = &arr[10]; // 指向 arr 尾元素的下个位置的指针
```

#### 标准库函数 begin 和 end

为了让指针使用更简单、更安全，C++新标准在`iterator`头文件中引入了两个名为`begin`和`end`的函数：

```cpp
int ia[] = {0, 1, 2, 3, 4, 5, 6, 7, 8, 9};
int *beg = begin(ia);
int *last = end(ia);
```

#### 指针运算

指向数组元素的指针可以执行如下运算：

| 运算符 | 说明 |
|--------|------|
| `*ptr` | 返回指针ptr所指元素的引用 |
| `ptr->mem` | 解引用ptr并获取该元素的名为mem的成员,等价于`(*ptr).mem` |
| `++ptr` | 令ptr指向数组中的下一个元素 |
| `--ptr` | 令ptr指向数组中的上一个元素 |
| `ptr1 == ptr2` | 判断两个指针是否相等(不相等),如果两个指针指向的是同一个元素或者它们都指向数组尾后位置,则相等;反之,不相等 |
| `ptr1 != ptr2` | 判断两个指针是否不相等 |
| `ptr + n` | 指针加上一个整数值仍得一个指针,指针指示的新位置与原来相比向前移动了若干个元素。结果指针或者指向数组内的一个元素,或者指向数组尾元素的下一位置 |
| `ptr - n` | 指针减去一个整数值仍得一个指针,指针指示的新位置与原来相比向后移动了若干个元素。结果指针或者指向数组内的一个元素,或者指向数组尾元素的下一位置 |
| `ptr1 += n` | 指针加法的复合赋值语句,将ptr1加n的结果赋给ptr1 |
| `ptr1 -= n` | 指针减法的复合赋值语句,将ptr1减n的结果赋给ptr1 |
| `ptr1 - ptr2` | 两个指针相减的结果是它们之间的距离,也就是说,将运算符右侧的指针向前移动差值个元素后将得到左侧的指针。参与运算的两个指针必须指向的是同一个数组中的元素或者尾元素的下一位置 |
| `>`, `>=`, `<`, `<=` | 指针的关系运算符,如果某指针指向的数组位置在另一个指针所指位置之前,则说前者小于后者。参与运算的两个指针必须指向的是同一个数组中的元素或者尾元素的下一位置 |

两个指针相减的结果的类型是一种名为**ptrdiff_t**的标准库类型，和`size_t`一样，`ptrdiff_t`也是一种定义在`cstddef`头文件中的**机器相关**的类型。因为差值可能为负值，所以`ptrdiff_t`是一种带符号类型。

#### 下标和指针

只要指针指向的是数组中的元素（或数组中尾元素的下一位置），都可以执行下标运算：

```cpp
int *p = &ia[2];    // p 指向索引为2的元素
int j = p[1];       // p[1] 等价于 *(p+1)，等价于ia[3]
int k = p[-2];      // p[-2] 等价于 *(p-2)，等价于ia[0]
```

虽然标准库类型`string`和`vector`也能执行下标运算，但数组与他们相比还是有所不同。标准库类型限定使用的下标必须是**无符号类型**，而内置的下标运算无此要求。回顾：

- [vector下标类型](#333-其他-vector-操作)
- [迭代器相减的结果的类型](#迭代器的算术运算)

#### 练习

##### 练习 3.34

假定 p1 和 p2 指向同一个数组中的元素，则下面程序的功能是什么？什么情况下该程序是非法的？

```cpp
p1 += p2 - p1;
```

功能：通过`p2-p1`获取两个指针之间的距离，然后让`p1`加上这个距离，以实现**让`p1`和`p2`指向同一元素**的目的。

已知`p1`和`p2`指向同一个数组中的元素，则说明两者类型相同，不会出现非法情况。即使两者指向的元素不属于同一数组，只要两者类型相同，该语句同样合法。

如果两者类型不同，则编译时出错。

##### 练习 3.35

编写一段程序，利用指针将数组中的元素置为0。

```cpp
#include <iostream>
#include <iterator>
using namespace std;

int main(int argc, const char * argv[]) {
    int a[] = {1, 2, 3, 4, 5};
    int *beg = begin(a), *last = end(a);
    for(int *p = beg; p != last; p++) *p = 0;
    for(int *p = beg; p != last; p++) cout << *p << " ";
    cout << endl;
    return EXIT_SUCCESS;
}
```

##### 练习 3.36

编写一段程序，比较两个数组是否相等。再写一段程序，比较两个 vector 对象是否相等。

比较两个数组是否相等：

三种方法：

1. 使用`std::equal`，该方法适用于原生数组和容器。

```cpp
#include <algorithm>

bool areArraysEqual(const int* arr1, int sz1, const int* arr2, int sz2) {
    if (sz1 != sz2) return false;
    // std::equal 比较指定范围内的元素
    return std::equal(arr1, arr1 + sz1, arr2);
}
```

2. 使用`memcmp`（C风格，高性能）直接比较内存。

```cpp
#include <cstring>
bool areArraysEqualRaw(const int* arr1, int sz1, const int* arr2, int sz2) {
    if (sz1 != sz2) return false;
    // 比较内存块，注意长度要乘以 sizeof(int)
    return std::memcmp(arr1, arr2, sz1 * sizeof(int)) == 0;
}
```

3. 手动循环。

```cpp
bool areArraysEqualRaw(const int* arr1, int sz1, const int* arr2, int sz2) {
    if (sz1 != sz2) return false;
    for (int i = 0; i < sz1; i++) {
        if (arr1[i] != arr2[i]) return false;
    }
    return true;
}
```

注意，这三种方法中，每个函数都需要传入两个数组的大小，因为数组对象没有如`string`, `vector`之类的容器一样有`size()`成员直接获取长度，而且作为参数传入函数时，实际传入的是该数组的**头指针**，因此也无法通过`sizeof(arr)/sizeof(arr[0])`这样的方式来获取数组长度。

比较两个vector对象是否相等：

```cpp
bool areVectorsEqual(const vector v1, const vector v2) {
    return v1 == v2;
}
```

### 3.5.4 C风格字符串

C风格字符串本质就是**字符数组**，但字符串末尾是**空字符**。

在C++中，用cstring定义了C风格字符串的一些操作：

| 操作 | 描述 |
| --- | --- |
| strlen(p) | 返回`p`的长度，空字符不在长度计算范围内 |
| strcmp(p1, p2) | 比较`p1`和`p2`两个字符串的相等性。如果p1==p2,返回0；如果p1>p2,返回一个正值；如果p1<p2, 返回一个负值 |
| strcat(p1, p2) | 将`p2`附加到`p1`之后，返回`p1` |
| strcpy(p1, p2) | 将`p2`拷贝给`p1`，返回`p1` |

#### 比较字符串

在C++中，`string`对象比较直接用`>`, `<`等运算符即可，但如果字符数组用这些运算符对比，实际上是**两个指针对比**，没有意义。

#### 练习

##### 练习 3.37

![练习 3.37](/images/20251213103140.png)

这段程序存在**严重的缺陷**，会导致**未定义行为(undefined behavior)**。

**程序含义分析**

1. **字符数组定义**：`const char ca[] = {'h', 'e', 'l', 'l', 'o'};` 创建了一个包含5个字符的数组
2. **指针初始化**：`const char *p = ca;` 使指针p指向数组首元素
3. **循环遍历**：`while(*p)` 检查当前字符是否为空字符`\0`（值为0）
4. **打印并移动**：输出当前字符后，指针p递增指向下一个字符

**关键问题**

**该数组缺少null终止符 `\0`！**

在C/C++中，字符串必须以`\0`结尾。当前数组只有5个字符：

```cpp
ca[0]='h', ca[1]='e', ca[2]='l', ca[3]='l', ca[4]='o'
```

循环条件`while(*p)`期望遇到`\0`时停止，但数组中没有，因此：

- 指针会越过数组边界，访问未知内存区域
- 这是典型的**缓冲区溢出(buffer overflow)**

**可能的输出结果**

输出结果**不确定**，取决于数组后面内存的内容：

- **情况1**（运气好）：如果紧邻的内存恰好是0，可能输出：

    ```plaintext
    h
    e
    l
    l
    o
    ```

- **情况2**（常见）：继续输出内存中的垃圾数据，直到遇到0或程序崩溃

- **情况3**：直接导致段错误(segmentation fault)

**正确写法**

```cpp
const char ca[] = {'h', 'e', 'l', 'l', 'o', '\0'};  // 手动添加终止符
// 或
const char ca[] = "hello";  // 字符串字面量自动添加 \0
```

##### 练习 3.38

在本节中我们提到，将两个指针相加不但是非法的，而且也没什么意义。请问为什么两个指针相加没什么意义？

指针本质上是**内存地址**。指针运算的语义基于以下场景：

- 指针 ± 整数：在数组中移动位置，表示"偏移n个元素"
- 指针 - 指针：计算两个元素之间的距离

但是两个地址相加：

```cpp
int arr[10];
int *p1 = &arr[3];  // 地址假设为 0x1000
int *p2 = &arr[5];  // 地址假设为 0x1008
// p1 + p2 = 0x2008 ???
```

这个结果0x2008既不在数组内，也不表示任何有效的相对关系，完全失去了指针运算的原本含义（在内存布局中导航）。
简单说：地址是绝对位置，"位置+位置"没有几何意义；只有"位置+偏移量"和"位置-位置"才有意义。

##### 练习 3.39

编写一段程序，比较两个string对象。再编写一段程序，比较两个C风格字符串的内容。

```cpp
#include <iostream>
#include <string>
#include <cstring>
using namespace std;

int main(int argc, const char * argv[]) {
    string s1, s2;
    s1 = "Hello";
    s2 = "Hello!";
    cout << (s1 < s2) << endl;
    const char *cs1 = "Hello";
    const char *cs2 = "Hello!";
    cout << strcmp(cs1, cs2) << endl;
    return EXIT_SUCCESS;
}
```

- 对`string`对象来说，比较结果为真返回true（1），为假返回false（0）；
- 对C风格字符串来说，使用strcmp进行比较，如果cs1<cs2，返回负值，如果相等，返回0，否则返回正值。

##### 练习 3.40

编写一段程序，定义两个字符数组并用字符串字面值初始化它们；接着再定义一个字符数组存放前两个数组连接后的结果。使用strcpy和strcat把前两个数组的内容拷贝到第三个数组中。
