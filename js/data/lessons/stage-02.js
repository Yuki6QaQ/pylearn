window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l04', stage: '02', title: '变量与赋值', desc: '给数据起个名字',
        content: `
<h2>为什么需要变量</h2>
<p>假设你要计算一个长方形的面积。不用变量：</p>
~~~
print(5 * 3)
~~~
<p>问题来了：如果长和宽要改，你得改两处数字。更糟的是，过几天回头看，5 和 3 分别代表什么？长还是宽？<b>代码失去了意义</b>。</p>
<p>用变量之后：</p>
~~~
length = 5
width = 3
print(length * width)
~~~
<p>一看就懂：长 5、宽 3。改动也只需要改一处。<b>变量的第一个价值：让代码自我说明。</b></p>

<h2>变量的本质</h2>
<p>Python 里执行 <code>age = 25</code> 时，实际发生了三件事：</p>
<ol>
  <li>内存里创建整数对象 <code>25</code></li>
  <li>创建一个名字 <code>age</code></li>
  <li>让 <code>age</code> 指向 <code>25</code></li>
</ol>
<p>变量不是「装东西的盒子」，而是「贴东西的标签」。用 <code>id()</code> 可以看到变量指向的内存地址：</p>
~~~
x = 100
y = 100
print(id(x))
print(id(y))
print(x is y)     # True
~~~
<p>小的整数、短字符串会被 Python 缓存，所以 x 和 y 可能指向同一块内存。这一点到讲可变对象（列表）时非常关键。</p>

<h2>赋值不是数学上的相等</h2>
<p>数学里 <code>x = x + 1</code> 是荒谬的。但在 Python 里它完全合法：</p>
~~~
x = 1
x = x + 1     # 取出 x 的值 1，加 1 得 2，再赋回给 x
print(x)      # 2
~~~
<p>规则是：<b>先算右边，再赋给左边</b>。理解这一点，后面所有赋值语句都不再神秘。</p>

<h2>动态类型</h2>
<p>C / Java 这些语言，变量声明时要写类型，之后不能变。Python 不要求：</p>
~~~
x = 10
print(type(x))    # <class 'int'>
x = "hello"
print(type(x))    # <class 'str'>
x = [1, 2, 3]
print(type(x))    # <class 'list'>
~~~
<p>这不是「x 变了类型」，而是「x 这个标签换了指向」。原来的整数对象还在，只是没人引用它了，Python 会自动回收。</p>

<h3>动态类型的好处与代价</h3>
<ul>
  <li><b>好处</b>：写起来快，灵活</li>
  <li><b>代价</b>：大项目里容易出现类型错误。所以 Python 3.5 之后有了类型提示（typing），后面章节会讲到</li>
</ul>

<h2>命名规则（必须遵守，否则报错）</h2>
<ul>
  <li>只能由字母、数字、下划线组成</li>
  <li>不能以数字开头：<code>1name</code> 错，<code>name1</code> 对</li>
  <li>不能使用 Python 关键字</li>
  <li>区分大小写：<code>name</code> 和 <code>Name</code> 是两个变量</li>
</ul>

<p>查看所有关键字：</p>
~~~
import keyword
print(keyword.kwlist)
~~~
<p>会看到 <code>if</code>、<code>for</code>、<code>class</code>、<code>def</code>、<code>True</code>、<code>None</code> 等等。</p>

<h3>命名惯例（不是强制，但强烈建议）</h3>
<ul>
  <li>普通变量：全小写 + 下划线，<code>user_name</code>、<code>total_price</code></li>
  <li>常量：全大写，<code>PI = 3.14159</code>、<code>MAX_RETRY = 3</code></li>
  <li>类名：大驼峰，<code>StudentInfo</code>（后面学类时用）</li>
  <li>私有变量：单下划线开头，<code>_temp</code></li>
</ul>
<p>避免用 <code>list</code>、<code>str</code>、<code>sum</code>、<code>max</code> 这些内置名字当变量，会覆盖内置功能。</p>

<h2>多种赋值形式</h2>

<h3>1. 单变量</h3>
~~~
score = 95
~~~

<h3>2. 链式赋值</h3>
~~~
a = b = c = 0
print(a, b, c)    # 0 0 0
~~~

<h3>3. 解包赋值</h3>
~~~
x, y = 3, 5
print(x, y)       # 3 5
~~~

<h3>4. 交换（Python 特色）</h3>
~~~
a, b = 1, 2
a, b = b, a
print(a, b)       # 2 1
~~~
<p>其他语言要写 <code>temp = a; a = b; b = temp</code>。Python 一行搞定。</p>

<h3>5. 用 * 收集剩余</h3>
~~~
first, *rest = [1, 2, 3, 4, 5]
print(first)      # 1
print(rest)       # [2, 3, 4, 5]

*init, last = [1, 2, 3, 4, 5]
print(init)       # [1, 2, 3, 4]
print(last)       # 5
~~~

<h2>新手最容易踩的 5 个坑</h2>

<h3>坑 1：使用未赋值的变量</h3>
~~~
print(age)    # NameError: name 'age' is not defined
~~~
<p>Python 不会给变量默认值。<b>先赋值，再使用</b>。</p>

<h3>坑 2：把 == 写成 =</h3>
~~~
if x = 5:     # SyntaxError
    ...
~~~
<p><code>=</code> 是赋值，<code>==</code> 是判断相等。</p>

<h3>坑 3：大小写混淆</h3>
~~~
Name = "Alice"
print(name)    # NameError
~~~

<h3>坑 4：变量名用中文或拼音</h3>
<p>Python 3 允许中文变量名，但强烈不推荐。用有意义的英文：</p>
~~~
# 不好
用户姓名 = "Alice"
yhxm = "Alice"

# 好
user_name = "Alice"
~~~

<h3>坑 5：以为变量是"盒子"</h3>
~~~
a = [1, 2, 3]
b = a
b.append(4)
print(a)    # [1, 2, 3, 4]  a 也变了！
~~~
<p>因为 <code>b = a</code> 让 b 指向同一个列表，不是复制。要复制得用 <code>b = a.copy()</code> 或 <code>b = a[:]</code>。这是第 4 章讲列表时的重点。</p>

<h2>动手练习</h2>

<h3>练习 1（基础）</h3>
<p>定义三个变量分别保存姓名、出生年份、身高，用 f-string 输出一句话：</p>
~~~
姓名：张三，出生年份：2000，身高：1.75 米
~~~

<h3>练习 2（进阶）</h3>
<p>半径为 5 的圆，用变量 <code>r</code> 和常量 <code>PI = 3.14159</code>，计算并输出面积和周长，保留两位小数。</p>

<h3>练习 3（挑战）</h3>
<p>从用户输入拿两个数字，交换后输出，<b>不能用第三个变量</b>。</p>
~~~
a = input("第一个数：")
b = input("第二个数：")
# 你的代码
print(a, b)
~~~

<h3>练习 4（拓展）</h3>
<p>用 <code>id()</code> 验证：<code>a = 1000; b = 1000; a is b</code> 是 True 还是 False？和 <code>a = 100; b = 100</code> 有什么不同？解释原因。</p>
`
    },
    {
        id: 'l05', stage: '02', title: '基本数据类型', desc: 'int / float / str / bool',
        content: `
<h2>四类基础类型</h2>
<p>Python 中最常用的四种内置类型：</p>
~~~
count = 42              # int 整数
price = 19.9            # float 浮点数
name = "Python"         # str 字符串
flag = True             # bool 布尔值
~~~

<h3>查看类型</h3>
~~~
print(type(42))         # <class 'int'>
print(type(3.14))       # <class 'float'>
print(type("hi"))       # <class 'str'>
print(type(True))       # <class 'bool'>
~~~

<h2>整数 int</h2>
<p>任意大小的整数，Python 自动处理大数，不会像 C 那样溢出：</p>
~~~
big = 2 ** 100
print(big)     # 1267650600228229401496703205376
print(type(big))   # 仍然是 int
~~~

<h3>进制表示</h3>
~~~
print(0b1010)    # 二进制 10
print(0o17)      # 八进制 15
print(0x1F)      # 十六进制 31
print(1_000_000) # 下划线分隔，可读性更好
~~~

<h2>浮点数 float</h2>
<p>带小数点的数，本质是 IEEE 754 双精度。</p>

<h3>精度问题（必知）</h3>
~~~
print(0.1 + 0.2)         # 0.30000000000000004
print(0.1 + 0.2 == 0.3)  # False
~~~
<p>这不是 Python 的 bug，所有用 IEEE 754 的语言（C、Java、JS）都是这样。原因是 0.1 和 0.2 在二进制里是无限循环小数，只能近似存储。</p>

<h3>解决方案</h3>
~~~
# 方案 1：用 round 四舍五入
print(round(0.1 + 0.2, 2))    # 0.3

# 方案 2：需要精确计算时用 decimal
from decimal import Decimal
print(Decimal("0.1") + Decimal("0.2"))   # 0.3

# 方案 3：整数化（按分计算而非按元）
print((10 + 20) / 100)   # 0.3
~~~

<h3>科学计数法</h3>
~~~
print(1.5e3)     # 1500.0
print(2e-3)      # 0.002
~~~

<h2>字符串 str</h2>
<p>用引号包裹的字符序列，三种引号都行：</p>
~~~
s1 = 'hello'
s2 = "world"
s3 = """可以
跨行"""     # 三引号可以换行
~~~

<h3>单双引号的选择</h3>
~~~
print('他说："你好"')    # 字符串里有双引号，外面用单引号
print("It's a book")     # 字符串里有单引号，外面用双引号
~~~

<h3>字符串不可变</h3>
~~~
s = "hello"
# s[0] = "H"    # TypeError
s = "H" + s[1:]  # 只能创建新字符串
~~~

<h2>布尔值 bool</h2>
<p>只有两个值：<code>True</code>、<code>False</code>。首字母必须大写。</p>

<h3>布尔值本质是整数</h3>
~~~
print(True + True)      # 2
print(False * 5)        # 0
print(int(True))        # 1
print(sum([True, True, False]))   # 2
~~~
<p>后面讲列表统计时，这个特性很有用：<code>sum(x > 0 for x in nums)</code> 就是数正数个数。</p>

<h3>布尔运算的短路</h3>
~~~
# and：左边为假，右边不计算
# or：左边为真，右边不计算
result = True or expensive_call()   # expensive_call 不会执行
~~~

<h2>类型转换</h2>
~~~
print(int("123"))       # 123
print(int("abc"))       # ValueError！

print(float("3.14"))    # 3.14
print(float("1e3"))     # 1000.0

print(str(100))         # "100"
print(str(3.14))        # "3.14"
print(str(True))        # "True"

print(int(3.9))         # 3  直接截断，不四舍五入
print(int(-3.9))        # -3
print(round(3.9))       # 4  想四舍五入用 round

print(bool(0))          # False
print(bool(""))         # False
print(bool([]))         # False
print(bool("0"))        # True 注意！非空字符串都是 True
print(bool(-1))         # True
~~~

<h3>常见的转换失败</h3>
~~~
int("12.5")     # ValueError：不能直接转，要先 float
int(float("12.5"))   # 12
~~~

<h2>None 类型</h2>
<p><code>None</code> 表示「什么都没有」，是 NoneType 的唯一实例：</p>
~~~
x = None
print(x)              # None
print(type(x))        # <class 'NoneType'>
print(x is None)      # True
~~~
<p>函数没有 return 时默认返回 <code>None</code>。</p>

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>让用户输入两个数字（用 input），计算它们的和、差、积、商。注意 input 返回字符串，需要转换。</p>

<h3>练习 2</h3>
<p>用 <code>Decimal</code> 验证 <code>0.1 + 0.2</code> 的精度问题，比较 Decimal 和 float 的结果差异。</p>

<h3>练习 3</h3>
<p>输入一个三位数，把它拆成百位、十位、个位分别输出。</p>
~~~
num = int(input("输入一个三位数："))
# 你的代码
~~~

<h3>练习 4</h3>
<p>判断下列表达式的值，先猜再运行验证：</p>
~~~
bool("False")
int(True) + int(False)
float("3") + 2
"3" + "4"
"3" * 3
~~~
`
    },
    {
        id: 'l06', stage: '02', title: '运算符', desc: '算术、比较、逻辑与优先级',
        content: `
<h2>算术运算符</h2>
~~~
print(7 + 3)     # 10
print(7 - 3)     # 4
print(7 * 3)     # 21
print(7 / 3)     # 2.3333333333333335
print(7 // 3)    # 2
print(7 % 3)     # 1
print(7 ** 3)    # 343
~~~

<h3>除法的区别</h3>
~~~
print(6 / 3)      # 2.0   真除法，结果永远 float
print(6 // 3)     # 2     整除，结果是 int
print(-7 // 2)    # -4    向下取整，不是 -3
print(-7 % 3)     # 2     Python 的取余跟随整除
~~~
<p><b>整除是向下取整</b>，和 C 语言的向零截断不同。这一点处理负数时要小心。</p>

<h3>取余的用途</h3>
~~~
# 判断奇偶
print(7 % 2)      # 1  奇数
print(8 % 2)      # 0  偶数

# 循环周期
for i in range(10):
    print(i % 3)   # 0,1,2,0,1,2,...

# 提取末位
print(123 % 10)   # 3
~~~

<h3>幂运算</h3>
~~~
print(2 ** 10)     # 1024
print(2 ** 0.5)    # 1.4142135623730951
print(27 ** (1/3)) # 3.0 立方根
~~~

<h2>比较运算符</h2>
<p>结果永远是布尔值：</p>
~~~
print(3 > 2)     # True
print(3 < 2)     # False
print(3 == 2)    # False
print(3 != 2)    # True
print(3 >= 3)    # True
print(3 <= 2)    # False
~~~

<h3>链式比较（Python 特色）</h3>
~~~
x = 5
print(1 < x < 10)    # True，等价于 1 < x and x < 10
print(1 < x > 3)     # True
~~~

<h3>== 与 is 的区别</h3>
~~~
a = [1, 2, 3]
b = [1, 2, 3]
print(a == b)    # True   值相等
print(a is b)    # False  不是同一个对象

c = a
print(a is c)    # True   指向同一对象
~~~
<p><b>比较值用 ==，判断是否同一对象用 is</b>。判断 None 时用 <code>x is None</code>，不要用 <code>x == None</code>。</p>

<h2>逻辑运算符</h2>
~~~
print(True and False)     # False
print(True or False)      # True
print(not True)           # False
~~~

<h3>短路特性</h3>
~~~
def check():
    print("被调用了")
    return True

print(False and check())   # 只输出 False，check 不执行
print(True or check())     # 只输出 True，check 不执行
~~~

<h3>逻辑运算返回的是操作数</h3>
~~~
# 不是返回 True/False，而是返回决定结果的那个操作数
print(0 or "abc")     # "abc"
print("abc" and "xyz")   # "xyz"
print(None or [])      # []

# 利用这个特性写默认值
name = user_input or "匿名"
~~~

<h3>德摩根定律</h3>
~~~
not (A and B)  == (not A) or (not B)
not (A or B)   == (not A) and (not B)
~~~

<h2>位运算符（进阶）</h2>
~~~
a = 5      # 0b0101
b = 3      # 0b0011

print(a & b)   # 1   0b0001
print(a | b)   # 7   0b0111
print(a ^ b)   # 6   0b0110
print(~a)      # -6
print(a << 1)  # 10  左移一位 = 乘 2
print(a >> 1)  # 2   右移一位 = 除 2
~~~

<h2>优先级</h2>
<p>从高到低：</p>
<ol>
  <li><code>**</code> 幂</li>
  <li><code>+x</code>、<code>-x</code>、<code>~x</code> 一元</li>
  <li><code>*</code>、<code>/</code>、<code>//</code>、<code>%</code></li>
  <li><code>+</code>、<code>-</code></li>
  <li><code>&lt;&lt;</code>、<code>&gt;&gt;</code></li>
  <li><code>&amp;</code></li>
  <li><code>^</code></li>
  <li><code>|</code></li>
  <li>比较运算符</li>
  <li><code>not</code></li>
  <li><code>and</code></li>
  <li><code>or</code></li>
</ol>
<p>不确定就加括号，可读性也更好。</p>

<h2>复合赋值</h2>
~~~
x = 10
x += 5     # 15
x -= 3     # 12
x *= 2     # 24
x //= 5    # 4
x **= 2    # 16
x %= 7     # 2
print(x)
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>输入一个三位数，分别输出百位、十位、个位数字（用 // 和 %）。</p>

<h3>练习 2</h3>
<p>输入秒数（如 3725），转成「时:分:秒」格式。</p>

<h3>练习 3</h3>
<p>输入一个整数，判断它是否是 3 和 5 的公倍数。</p>

<h3>练习 4</h3>
<p>不用 if，用三元表达式和逻辑运算符，输出 <code>a</code> 和 <code>b</code> 中较大的那个。</p>
`
    },
    {
        id: 'l07', stage: '02', title: '字符串操作', desc: '索引、切片与格式化',
        content: `
<h2>字符串是有序序列</h2>
<p>字符串可以被索引和切片，规则和列表一样。</p>
~~~
s = "Python"
print(s[0])      # P   第一个字符，索引从 0 开始
print(s[1])      # y
print(s[-1])     # n   最后一个
print(s[-2])     # o
print(len(s))    # 6
~~~

<h3>索引越界会报错</h3>
~~~
print(s[10])     # IndexError
~~~

<h2>切片</h2>
<p>语法 <code>[start:end:step]</code>，<b>含头不含尾</b>。</p>
~~~
s = "Python"
print(s[1:4])     # yth
print(s[:3])      # Pyt
print(s[3:])      # hon
print(s[:])       # Python
print(s[::2])     # Pto   每隔一个取一个
print(s[::-1])    # nohtyP  反转
print(s[-3:])     # hon
print(s[:-3])     # Pyt
~~~

<h3>切片不会报越界</h3>
~~~
print(s[100:200])   # 空字符串 ''，不报错
~~~
<p>切片返回的是新字符串，原字符串不变。</p>

<h2>字符串不可变</h2>
~~~
s = "hello"
# s[0] = "H"    # TypeError: 'str' object does not support item assignment

# 想改只能创建新字符串
s = "H" + s[1:]
print(s)          # Hello
~~~

<h2>常用方法</h2>

<h3>大小写</h3>
~~~
s = "Hello World"
print(s.lower())         # hello world
print(s.upper())         # HELLO WORLD
print(s.title())         # Hello World
print(s.capitalize())    # Hello world
print(s.swapcase())      # hELLO wORLD
~~~

<h3>去除空白</h3>
~~~
s = "  hello  "
print(s.strip())         # "hello"
print(s.lstrip())        # "hello  "
print(s.rstrip())        # "  hello"
~~~
<p><code>strip</code> 也接受参数去掉指定字符：<code>"xxhelloxx".strip("x")</code> → <code>"hello"</code>。</p>

<h3>查找与判断</h3>
~~~
s = "hello world"
print(s.find("world"))      # 6   找不到返回 -1
print(s.index("world"))     # 6   找不到报 ValueError
print(s.count("l"))         # 3
print("world" in s)         # True
print(s.startswith("hello"))  # True
print(s.endswith("world"))    # True
~~~

<h3>替换与切分</h3>
~~~
s = "a,b,c,d"
print(s.split(","))          # ['a', 'b', 'c', 'd']
print(s.replace(",", "-"))   # a-b-c-d

parts = ["a", "b", "c"]
print("-".join(parts))       # a-b-c
print("".join(parts))        # abc
~~~

<h3>类型判断</h3>
~~~
print("abc".isalpha())        # True
print("123".isdigit())        # True
print("abc123".isalnum())     # True
print("  ".isspace())         # True
print("Hello".istitle())      # True
print("hello".islower())      # True
print("HELLO".isupper())      # True
~~~

<h3>对齐与填充</h3>
~~~
print("hi".ljust(10, "-"))     # hi--------
print("hi".rjust(10, "-"))     # --------hi
print("hi".center(10, "-"))    # ----hi----
print("42".zfill(5))           # 00042
~~~

<h2>f-string 格式化（重点）</h2>
<p>Python 3.6+ 推荐用 f-string，性能好、可读性高：</p>
~~~
name = "Alice"
age = 25
print(f"我叫 {name}，今年 {age} 岁")
~~~

<h3>表达式</h3>
~~~
a, b = 3, 5
print(f"{a} + {b} = {a + b}")
print(f"{'偶数' if a % 2 == 0 else '奇数'}")
~~~

<h3>数字格式化</h3>
~~~
pi = 3.14159265
print(f"{pi:.2f}")       # 3.14     保留 2 位小数
print(f"{pi:.4f}")       # 3.1416
print(f"{1234567:,}")    # 1,234,567  千分位
print(f"{0.856:.1%}")    # 85.6%   百分比
print(f"{42:05d}")       # 00042   补零
print(f"{42:+d}")        # +42     显示正负号
print(f"{255:x}")        # ff      十六进制
print(f"{255:b}")        # 11111111 二进制
~~~

<h3>对齐</h3>
~~~
print(f"|{'name':<10}|")   # 左对齐
print(f"|{'name':>10}|")   # 右对齐
print(f"|{'name':^10}|")   # 居中
print(f"|{'name':*^10}|")  # 用 * 填充
~~~

<h2>转义字符</h2>
~~~
print("第一行\\n第二行")    # \\n 换行
print("制表\\t符号")         # \\t 制表
print("反斜杠\\\\")          # \\\\ 反斜杠
print("引号\\"里面\\"")      # 引号转义
~~~

<h3>原始字符串</h3>
~~~
print(r"C:\\Users\\name")    # 不转义，原样输出
print(r"正则\\d+")            # 正则里常用
~~~

<h2>多行字符串</h2>
~~~
text = """第一行
第二行
第三行"""
print(text)
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>输入一句英文，输出它的长度、全部大写形式、是否包含字母 "a"。</p>

<h3>练习 2</h3>
<p>输入一个英文名（如 "alice"），输出首字母大写形式（"Alice"）。</p>

<h3>练习 3</h3>
<p>输入手机号 13812345678，把中间四位用 * 替换，输出 <code>138****5678</code>。</p>

<h3>练习 4</h3>
<p>输入一个数字，用 f-string 输出：右对齐宽度 10、保留 3 位小数、带千分位的格式。</p>

<h3>练习 5</h3>
<p>判断一个字符串是否回文（正着读和倒着读一样），如 "level"。</p>
`
    }

);