---
date: 2025-10-26
title: 1. 开始
description: 本章介绍了 C++ 的大部分基础内容：类型、变量、表达式、语句及函数。同时简要介绍了如何编译及运行程序。
---

## 1.1 编写一个简单的 C++ 程序

示例程序如下：

```cpp
int main(){
    return 0;
}
```

在 UNIX 系统中，编译命令是 `g++`:

```bash
g++ -o prog1 prog1.cpp
```

这样会生成一个名为`prog1`的可执行文件，在控制台执行`./prog1`，程序没有输出。

在 UNIX 和 Windows 系统中，执行完一个程序后，都可以通过 `echo` 命令获取其返回值。在 Unix 系统中，通过如下命令获得状态：

```bash
$ echo $?
```

### 练习

#### 1.1 查阅你使用的编译器的文档，确定它所用的文件命名约定。编译并运行示例程序

我是在`MacOS`系统上（基于UNIX）编译的，因此使用的编译器是GNU编译器。查询[官方文档](https://gcc.gnu.org/onlinedocs/gcc-15.2.0/gcc/Invoking-G_002b_002b.html)得知：

1. 传统 C++ 源文件使用 `.C`, `.cc`, `.cpp`, `.CPP`, `.c++`, `.cp`, `.cxx` 其中的一种；
2. C++ 头文件常用 `.hh`, `.hpp`, `.H`, `.tcc`(用于共享模版代码)；
3. 预处理的 C++ 文件用 `.ii`；
4. `C++20` 模块接口单元有时使用 `.ixx`, `.cppm`, `.cxxm`, `.cmm`。

无论是使用 `gcc` 还是 `g++` 命令，GCC 都用同样的方式通过这些名称来识别和编译这些文件为 C++ 程序。

然而，如果使用 `gcc` 命令的话不会添加 C++ 库。`g++` 命令才会自动识别调用 GCC 并自动指定链接到 C++ 库。`g++` 将 `.c`, `.h` 和 `.i` 文件视为 C++ 源文件而不是 C 源文件（除非使用了`-x`参数）。
在预编译一个 C 头文件（`.h`）以供 C++ 编译时，`g++`也是有用的。

在许多系统中，`g++` 下载名称为 `c++`。

编译 C++ 程序时，可以指定许多与编译其他语言程序相同的命令行选项；或者指定对 C 及相关语言有意义的命令行选项；或者指定仅对 C++ 程序有意义的选项。有关 C 相关语言选项的说明，请参阅[控制 C 语言的选项](https://gcc.gnu.org/onlinedocs/gcc-15.2.0/gcc/C-Dialect-Options.html)。
有关仅对 C++ 程序有意义的选项的说明，请参阅[控制 C++ 语言的选项](https://gcc.gnu.org/onlinedocs/gcc-15.2.0/gcc/C_002b_002b-Dialect-Options.html)。

---

#### 1.2 改写程序，让它返回-1。返回值-1通常被当作程序错误的标识。重新编译并运行你的程序，观察你的系统如何处理main返回的错误标识

程序1：

```cpp
int main() {
    return 0;
}
```

程序2：

```cpp
int main() {
    return -1;
}
```

用`g++ -o prog1 prog1.cpp`指令编译出`prog1`可执行文件并执行后，使用 `echo $?` 获取程序返回值，发现：

- 程序1：返回值为 0
- 程序2：返回值为 **255**

##### -1的返回值为255的原因解释

在类Unix系统（Linux、macOS等）中，进程的退出状态码被存储在一个 **8位无符号整数**中，取值范围是 0-255。
当你的 main 函数返回 -1 时：

- -1 在**补码**表示中，32位整数的二进制形式是 `0xFFFFFFFF`
- 系统只取最低的8位：`0xFF`
- 0xFF 作为无符号8位整数解释就是 `255`

---

##### 进程的退出状态码

按照惯例，进程返回`0`表示进程执行成功；返回非`0`表示进程执行失败。在 C++ 中有两个宏：`EXIT_SUCCESS`(0) 和 `EXIT_FAILURE`(1) 表示进程执行成功或者失败（需引入`cstdlib`库）。你可以用不同的值表示不同的失败原因，但没有一个统一的定义标准。

## 1.2 初识输入输出

C++ 为定义任何输入输出（IO）语句，而是包含了一个全面的**标准库**来提供 IO 机制。

**iostream** 库包含两个基础类型： **istream** 和 **ostream**，分别表示输入流和输出流。
一个流就是一个**字符序列**，是从 IO 设备读出或写入 **IO** 设备的。stream（流）表达的是，随着时间的推移，字符是顺序生成或消耗的。

### 标准输入输出对象

标准库定义了 4 个 IO 对象：

| 对象 | 类型 | 介绍 |
| --- | --- | --- |
| cin | istream | 标准输入 |
| cout | ostream | 标准输出 |
| cerr | ostream | 标准错误，用于输出警告和错误消息 |
| clog | ostream | 用于输出程序运行时的一般性消息 |

### 一个使用 IO 库的程序

该程序用于提示用户输入两个数，然后输出它们的和。

```cpp
#include <iostream>

int main() {
    std::cout << "Enter two numbers:" << std::endl;
    int v1 = 0, v2 = 0;
    std::cin >> v1 >> v2;
    std::cout << "The sum of " << v1 << " and " << v2 << " is " << v1 + v2 << std::endl;
    return EXIT_SUCCESS;
}
```

- `#include` 指令和头文件的名字必须写在一行中
- 通常情况下，`#include` 指令必须出现在所有函数之外
- 一般将一个程序的所有 `#include` 指令都放在源文件的**开始位置**

### 向流写入数据

在上述示例程序中，第一行代码执行了一个**表达式（expression）**，在 C++ 中，一个表达式产生一个计算结果，它由一个或多个运算对象（通常是）和一个运算符组成。这条语句中的表达式使用了**输出运算符（<<）**在标准输出上打印消息。

`<<`运算符接受两个运算对象：

1. 左侧的运算对象必须是一个 `ostream` 对象
2. 右侧的运算对象是要打印的值

`std::cout << "Enter two numbers:" << std::endl;`  
可以等价为  
`(std::cout << "Enter two numbers:") << std::endl;`

`std::endl`是一个被称为 **操作符（manipulator）** 的特殊值，其作用是结束当前行（换行），并将与设备关联的 **缓冲区（buffer）** 中的内容刷到设备中。

**缓冲刷新**操作可以保证到目前为止程序所产生的所有输出都在真正写入输出流中，而不是仅停留在内存中等待写入流。

### 使用标准库中的名字

使用`cout`, `cin`时，前缀`std::`指出名字`cout`和`cin`是定义在名为`std`的**命名空间**（namespace）中的。

命名空间可以帮助我们避免不经意的名字定义冲突，以及使用库中相同名字导致的冲突。

**标准库定义的所有名字都在命名空间 std 中。**

### 从流读取数据

语句 `std::cin >> v1 >> v2;`读入输入数据到指定变量中，**输入运算符（>>）** 与输出运算符相似，它接受一个 `istream` 作为其左侧运算对象，接受一个对象作为其右侧运算对象，从给定的 `istream` 读入数据，并存入给定对象中。**同时返回左侧对象**，因此：

`std::cin >> v1 >> v2;`

等价于

`(std::cin >> v1) >> v2;`

该操作表示，从`std::cin`读入两个值，并将第一个值存入`v1`，第二个值存入`v2`。

### 练习

#### 1.3 在标准输出上打印 Hello, World

```cpp
#include <iostream>

int main() {
    std::cout << "Hello, World." << std::endl;
    return EXIT_SUCCESS;
}
```

#### 1.4 使用乘法运算符，打印两个数的积

```cpp
#include <iostream>

int main() {
    std::cout << "Enter two numbers:" << std::endl;
    int v1 = 0, v2 = 0;
    std::cin >> v1 >> v2;
    std::cout << "The conduct of " << v1 << " and " << v2 << " is " << v1 * v2 << std::endl;
    return EXIT_SUCCESS;
}
```

#### 1.5 将每个运算对象的打印操作放在一条独立的语句中

```cpp
#include <iostream>

int main() {
    std::cout << "Enter two numbers:" << std::endl;
    int v1 = 0, v2 = 0;
    std::cin >> v1 >> v2;
    std::cout << "The conduct of ";
    std::cout << v1;
    std::cout << " and ";
    std::cout << v2;
    std::cout << " is ";
    std::cout << v1 * v2;
    std::cout << std::endl;
    return EXIT_SUCCESS;
}
```

#### 1.6 解释下面程序片段是否合法

```cpp
std::cout << "The sum of " << v1;
          << " and " << v2;
          << " is " << v1 + v2 << std::endl;
```

如果合法，输出什么？如果不合法，为什么？怎么修正？

不合法，如果用`g++`编译，会出现错误：

```bash
$ g++ -o prog2 1.2\ 初识输入输出.cpp
1.2 初识输入输出.cpp:8:11: error: expected expression
    8 |           << " and " << v2;
      |           ^
1.2 初识输入输出.cpp:9:11: error: expected expression
    9 |           << " is " << v1 + v2 << std::endl;
      |           ^
2 errors generated.
```

因为`;`就表示一个语句的结束，第二、三句代码导致`<<`输出运算符左侧没有对象。

应该修正为：

```cpp
std::cout << "The sum of " << v1;
std::cout << " and " << v2;
std::cout << " is " << v1 + v2 << std::endl;
```

## 1.3 注释简介

### C++ 中的注释种类

- 单行注释：以**双斜线（//）开始**，以**换行符**结束
- 多行注释：以`/*`开始，以`*/`结束

多行注释时，注释内每一行都以一个星号开头，从而指出整个范围都是多行注释：

```cpp
/*
 * 简单主函数：
 * 读取两个数，求它们的和
 */
int main() {

}
```

⚠️ 注释界定符不能嵌套：

```cpp
/*
 * 注释对/* */不能嵌套
 */
```

### 练习

#### 1.7 编译一个包含不正确的嵌套注释程序，观察编译器返回的错误信息

程序：

```cpp
#include <iostream>

/*
 * 注释对/* */不能嵌套
 */
int main() {
    std::cout << "Enter two numbers:" << std::endl;
    int v1 = 0, v2 = 0;
    std::cin >> v1 >> v2;
    std::cout << "The sum of " << v1;
    std::cout << " and " << v2;
    std::cout << " is " << v1 + v2 << std::endl;
    return EXIT_SUCCESS;
}
```

编译结果：

```bash
$ g++ -o prog3 1.3\ 嵌套注释.cpp   
1.3 嵌套注释.cpp:4:13: warning: '/*' within block comment [-Wcomment]
    4 |  * 注释对/* */不能嵌套
      |          ^
1.3 嵌套注释.cpp:4:18: error: unknown type name '不能嵌套'
    4 |  * 注释对/* */不能嵌套
      |               ^
1.3 嵌套注释.cpp:5:3: error: expected unqualified-id
    5 |  */
      |   ^
1 warning and 2 errors generated.
```

后面两个错误都是由第一个警告带来的。

#### 1.8 指出下列哪些输出语句是合法的

```cpp
std::cout << "/*";
std::cout << "*/";
std::cout << /* "*/" */;
std::cout << /* "*/" /* "/*" */;
```

预测编译这些语句会产生什么样的结果，实际编译这些语句来验证你的答案（每次将上述一条语句作为其主体），改正每个编译错误。

第1、2句是正确的，第 3 句相当于用`/*`和`*/`把`"`包围起来，剩下未注释区域`" */`，编译结果：

```bash
$ g++ -o prog4 1.4\ 注释测试.cpp
1.4 注释测试.cpp:4:24: warning: missing terminating '"' character [-Winvalid-pp-token]
    4 |     std::cout << /* "*/" */;
      |                        ^
1.4 注释测试.cpp:4:24: error: expected expression
1 warning and 1 error generated.
```

第 4 句用到了两个界定符对，第一个包围了`"`，第二个包围了` "/*" `，最后括号内剩下的值为`" /* "`，因此编译通过，输出`" /* "`。

## 1.4 控制流

### while 语句

略

### for 语句

略

### 读取数量不定的输入数据

- 当预先不知道用户会输入多少个数时，可以将`std::cin`作为条件传入`while`循环中；
- `std::cin`是一个`istream`对象，当`istream`对象作为条件时，其效果是检查**检测流的状态**；
- 当遇到*文件结束符（end-of-file）* 或遇到一个无效输入时（如读入的值与右侧对象类型不符），`istream`对象的状态会变为无效。处于无效状态的`istream`对象会使条件变为假。

#### 从键盘输入文件结束符

- Windows: Ctrl+Z，然后按 Enter 或 Return 键
- UNIX: Ctrl+D

### 练习

#### 1.16 编写程序，从 cin 读取一组数，输出其和

代码：

```cpp
#include <iostream>

int main() {
    int sum = 0, value = 0;
    while(std::cin >> value) {
        sum += value;
    }
    std::cout << "The sum of numbers is " << sum << std::endl;
    return EXIT_SUCCESS;
}
```

执行结果及进程退出码：

```bash
$ ./prog 
1   
3
5
6
8
The sum of numbers is 23
$ echo $?
0
```

## 1.5 类简介

- 对于标准库的头文件，用尖括号`<>`来包围头文件名，对于不属于标准库的头文件，则用双引号`""`包围。

### 文件重定向

对于指令

```bash
$ ./addItems <infile >outfile
```

可执行文件为`addItems`，上述命令会从一个名为infile的文件读取销售记录，并将输出结果写到名为outfile的文件中，这可以方便程序的测试。

### 练习

#### 1.20 结合 Sales_item.h 编写一个程序，读取一组书籍销售记录，将每条记录打印到标准输出上

该[链接](https://www.informit.com/store/c-plus-plus-primer-9780321714114)下的`Downloads`部分可以下载各个编译器对应的程序源代码，下载后在第一章的源代码中找到`Sales_item.h`并拷贝到自己的工作区，编辑代码如下：

代码：

```cpp
#include <iostream>
#include "Sales_item.h"

int main() {
    Sales_item item;
    while(std::cin >> item) {
        std::cout << item << std::endl;
    }
    return EXIT_SUCCESS;
}
```

结果：

```bash
$ ./prog <sales_items
0-201-78345-X 3 60 20
0-201-78345-X 3 75 25
```

#### 1.21 编写程序，读取两个 ISBN 相同的 Sales_item 对象，输出它们的和

代码：

```cpp
#include <iostream>
#include "Sales_item.h"

int main() {
    Sales_item item1, item2;
    std::cin >> item1 >> item2;
    std::cout << item1 + item2 << std::endl;
    return EXIT_SUCCESS;
}
```

结果：

```bash
$ ./prog <sales_items
0-201-78345-X 6 135 22.5
```

#### 1.22 编写程序，读取多个具有相同 ISBN 的销售记录，输出所有记录的和

代码：

```cpp
#include <iostream>
#include "Sales_item.h"

int main() {
    Sales_item sum, item;
    while(std::cin >> item) {
        sum += item;
    }
    std::cout << sum << std::endl;
    return EXIT_SUCCESS;
}
```

结果：

```bash
$ ./prog <sales_items
 6 135 22.5
```

#### 1.22 & 1.23 编写程序，读取多条销售记录，并统计每个 ISBN 有几条销售记录。输入多条销售记录来测试程序

```cpp
#include <iostream>
#include "Sales_item.h"

/*
 * 前提条件：同一本书的销售记录聚在一起，连续排列
 */
int main()
{
    Sales_item total; // 保存和的变量

    // 读入第一条销售记录，并保证有数据可以处理
    if (std::cin >> total)
    {
        Sales_item trans; // 保存下一条交易记录的变量
        // 读入并处理剩余交易记录
        while (std::cin >> trans)
        {

            if (total.isbn() == trans.isbn())
                total += trans;
            else
            {
                // 打印前一本书的结果
                std::cout << total << std::endl;
                total = trans; // total 现在表示下一本书的销售额
            }
        }
        std::cout << total << std::endl; // 打印最后一本书的结果
    }
    else
    {
        std::cerr << "没有有效输入！" << std::endl;
        return EXIT_FAILURE;
    }

    return EXIT_SUCCESS;
}
```
