window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l17', stage: '05', title: '定义与调用函数', desc: 'def、参数与返回值',
        content: `
<h2>为什么需要函数</h2>
<p>假设你要在三个地方计算圆的面积。不用函数，你会写三遍相同的公式：</p>
~~~
r1 = 5
print(3.14159 * r1 ** 2)

r2 = 8
print(3.14159 * r2 ** 2)

r3 = 12
print(3.14159 * r3 ** 2)
~~~
<p>问题很明显：重复代码、改公式要改三处、容易漏改。用函数之后：</p>
~~~
def circle_area(r):
    return 3.14159 * r ** 2

print(circle_area(5))
print(circle_area(8))
print(circle_area(12))
~~~
<p>函数带来三个好处：<b>复用</b>（写一次用多次）、<b>可读</b>（名字说明意图）、<b>易维护</b>（改一处全生效）。</p>

<h2>定义与调用</h2>
~~~
def greet(name):
    print(f"你好，{name}！")

greet("Alice")   # 你好，Alice！
greet("Bob")     # 你好，Bob！
~~~

<h3>语法结构</h3>
<ul>
  <li><code>def</code> 关键字开头</li>
  <li>函数名后用括号包住参数</li>
  <li>结尾必须有冒号 <code>:</code></li>
  <li>函数体缩进 4 个空格</li>
</ul>

<h3>函数必须先定义再调用</h3>
~~~
greet("Alice")    # NameError: name 'greet' is not defined

def greet(name):
    print(f"你好，{name}！")
~~~
<p>Python 从上往下执行，调用时函数必须已经定义过。</p>

<h2>参数</h2>

<h3>无参数</h3>
~~~
def say_hello():
    print("Hello!")

say_hello()
~~~

<h3>一个参数</h3>
~~~
def square(x):
    return x * x

print(square(5))    # 25
~~~

<h3>多个参数</h3>
~~~
def add(a, b):
    return a + b

print(add(3, 5))    # 8
~~~

<h3>参数名只是占位符</h3>
~~~
def greet(name):
    print(f"你好，{name}")

greet("Alice")     # name = "Alice"
greet("Bob")       # name = "Bob"
~~~

<h2>返回值 return</h2>
~~~
def add(a, b):
    return a + b

result = add(3, 5)
print(result)      # 8
~~~

<h3>没有 return 时返回 None</h3>
~~~
def nothing():
    pass

print(nothing())   # None
~~~

<h3>函数遇到 return 立即结束</h3>
~~~
def check(n):
    if n < 0:
        return "负数"
    if n == 0:
        return "零"
    return "正数"

print(check(-5))   # 负数
print(check(0))    # 零
print(check(5))    # 正数
~~~
<p>第一个 return 执行后，函数立刻返回，后面的代码不再执行。</p>

<h3>返回多个值</h3>
~~~
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4, 1, 5])
print(lo, hi)      # 1 5

# 也可以直接接收成元组
result = min_max([3, 1, 4])
print(result)      # (1, 4)
~~~
<p>本质是返回一个元组，调用方可以解包。</p>

<h2>文档字符串</h2>
<p>函数开头用三引号写一段说明，这是 Python 的标准做法：</p>
~~~
def add(a, b):
    """返回两个数的和。

    参数:
        a: 第一个数
        b: 第二个数

    返回:
        两数之和
    """
    return a + b

print(add.__doc__)
help(add)     # 会显示这段文档
~~~

<h2>函数也是对象</h2>
~~~
def hello():
    print("hi")

f = hello         # 把函数赋值给另一个名字
f()               # hi

def run(func):    # 函数可以作为参数传入
    func()

run(hello)        # hi

# 函数可以放进列表
funcs = [hello, hello, hello]
for fn in funcs:
    fn()
~~~

<h2>作用域</h2>
<p>函数内部定义的变量是<b>局部变量</b>，只在函数内可见：</p>
~~~
x = 10          # 全局变量

def f():
    x = 20      # 局部变量，和全局的同名但不冲突
    print(x)

f()             # 20
print(x)        # 10
~~~

<h3>函数内读取全局变量是允许的</h3>
~~~
count = 0

def show():
    print(count)   # OK，读取全局

show()   # 0
~~~

<h3>修改全局变量要用 global（不推荐）</h3>
~~~
count = 0

def increment():
    global count
    count += 1

increment()
print(count)   # 1
~~~
<p>用 global 会让代码难维护。更好的做法是把值作为参数传进去、把结果返回出来：</p>
~~~
def increment(n):
    return n + 1

count = 0
count = increment(count)
print(count)   # 1
~~~

<h2>命名建议</h2>
<ul>
  <li>函数名用小写 + 下划线：<code>calculate_area</code>、<code>get_user_name</code></li>
  <li>动词开头，说明「做什么」：<code>parse_json</code> 比 <code>json_stuff</code> 好</li>
  <li>一个函数只做一件事，名字能概括它</li>
</ul>

<h2>动手练习</h2>

<h3>练习 1（基础）</h3>
<p>写函数 <code>is_prime(n)</code> 判断素数，返回布尔值。</p>

<h3>练习 2（基础）</h3>
<p>写函数 <code>factorial(n)</code> 计算阶乘（用循环，不用递归）。</p>

<h3>练习 3（进阶）</h3>
<p>写函数 <code>count_vowels(s)</code> 统计字符串中元音字母（a/e/i/o/u）的个数，不区分大小写。</p>

<h3>练习 4（进阶）</h3>
<p>写函数 <code>reverse_string(s)</code> 返回反转后的字符串。不要用 <code>s[::-1]</code>，用循环实现。</p>

<h3>练习 5（挑战）</h3>
<p>写函数 <code>fib(n)</code> 返回斐波那契数列的前 n 项（返回列表）。</p>
`
    },
    {
        id: 'l18', stage: '05', title: '参数进阶', desc: '默认值、关键字、可变参数',
        content: `
<h2>默认参数</h2>
<p>给参数一个默认值，调用时可以不传：</p>
~~~
def power(base, exp=2):
    return base ** exp

print(power(3))        # 9    使用默认 exp=2
print(power(2, 5))     # 32
print(power(2, exp=5)) # 32
~~~

<h3>默认参数必须放在最后</h3>
~~~
# 错误：没有默认值的参数不能放在有默认值的参数后面
# def f(a=1, b): ...

# 正确
def f(a, b=1):
    return a + b
~~~

<h2>关键字参数</h2>
<p>调用时用「参数名=值」的形式，可以不按顺序：</p>
~~~
def register(name, age, city):
    print(f"{name} {age} 岁，来自 {city}")

register("Alice", 25, "Beijing")
register(city="Beijing", name="Alice", age=25)   # 顺序随意
register("Bob", city="Shanghai", age=30)         # 混合
~~~
<p>好处：调用处一眼能看出每个值是什么。</p>

<h2>可变位置参数 *args</h2>
<p>接收任意多个位置参数，打包成元组：</p>
~~~
def total(*nums):
    print(type(nums))     # <class 'tuple'>
    return sum(nums)

print(total(1, 2, 3))       # 6
print(total(1, 2, 3, 4, 5)) # 15
print(total())              # 0
~~~

<h3>解包调用</h3>
~~~
nums = [1, 2, 3, 4]
print(total(*nums))   # 10，等价于 total(1, 2, 3, 4)
~~~

<h2>可变关键字参数 **kwargs</h2>
<p>接收任意多个关键字参数，打包成字典：</p>
~~~
def show(**info):
    print(type(info))     # <class 'dict'>
    for k, v in info.items():
        print(f"{k}: {v}")

show(name="Alice", age=25, city="Beijing")
~~~

<h3>解包调用</h3>
~~~
config = {"name": "Alice", "age": 25}
show(**config)
~~~

<h2>参数顺序规则</h2>
~~~
def f(a, b=2, *args, c, **kwargs):
    print(a, b, args, c, kwargs)

f(1, 3, 5, 7, c=9, x=10)
# 1 3 (5, 7) 9 {'x': 10}
~~~
<p>顺序是：位置参数 → 默认参数 → <code>*args</code> → 关键字-only 参数 → <code>**kwargs</code>。</p>

<h3>强制关键字参数</h3>
<p><code>*</code> 后面的参数必须用关键字传：</p>
~~~
def f(a, *, b):
    print(a, b)

f(1, b=2)      # OK
# f(1, 2)      # TypeError！
~~~
<p>这样写可以避免调用方搞错参数顺序。</p>

<h2>参数传递：值 vs 引用</h2>
~~~
def change_num(n):
    n = 100

x = 10
change_num(x)
print(x)      # 10，整数不可变，函数里改不影响外面

def change_list(lst):
    lst.append(100)

nums = [1, 2, 3]
change_list(nums)
print(nums)   # [1, 2, 3, 100]，列表可变，会改到外面
~~~

<h3>要小心的情况</h3>
~~~
def bad_add(lst):
    lst = lst + [1]     # 创建新列表，不影响外面
    return lst

def good_add(lst):
    lst.append(1)       # 修改原列表，会影响外面
~~~
<p>用 <code>+</code> 拼接会创建新对象，用 <code>append</code> 改的是原对象。要改外部数据，用方法；不想改，就复制一份：</p>
~~~
def safe_add(lst):
    lst = lst.copy()
    lst.append(1)
    return lst
~~~

<h2>可变默认值的坑（重点）</h2>
<p>默认值只在函数定义时创建一次，之后所有调用共享同一个对象：</p>
~~~
def add_item(item, lst=[]):
    lst.append(item)
    return lst

print(add_item(1))    # [1]
print(add_item(2))    # [1, 2]  ← 不是预期的 [2]！
print(add_item(3))    # [1, 2, 3]
~~~
<p><b>正确做法：用 None 做默认值，在函数内部再创建。</b></p>
~~~
def add_item(item, lst=None):
    if lst is None:
        lst = []
    lst.append(item)
    return lst

print(add_item(1))    # [1]
print(add_item(2))    # [2]
~~~

<h2>综合示例</h2>
~~~
def create_user(name, age=18, *hobbies, city="未知", **extra):
    print(f"姓名：{name}")
    print(f"年龄：{age}")
    print(f"城市：{city}")
    if hobbies:
        print(f"爱好：{', '.join(hobbies)}")
    if extra:
        print(f"其他：{extra}")

create_user("Alice")
create_user("Bob", 25, "读书", "编程", city="Beijing", email="a@b.com")
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>写函数 <code>describe(name, *hobbies, city="未知")</code>，输出姓名、城市和所有爱好。</p>

<h3>练习 2</h3>
<p>写函数 <code>make_dict(**kwargs)</code>，把关键字参数转成字典返回。</p>

<h3>练习 3</h3>
<p>写函数 <code>average(*nums)</code>，接收任意多个数字，返回平均值（空参数时返回 0）。</p>

<h3>练习 4</h3>
<p>解释下面代码为什么输出 <code>[1, 2]</code>，然后改成正确写法：</p>
~~~
def append_one(lst=[]):
    lst.append(1)
    return lst

print(append_one())
print(append_one())
~~~

<h3>练习 5</h3>
<p>写函数 <code>print_info(name, age, *args, sep=" | ", **kwargs)</code>，把所有信息用 sep 分隔输出。</p>
`
    },
    {
        id: 'l19', stage: '05', title: 'lambda 与高阶函数', desc: '匿名函数与函数式工具',
        content: `
<h2>lambda 是什么</h2>
<p>一种简写的匿名函数，只适合用一个表达式就搞定的场景：</p>
~~~
add = lambda a, b: a + b
print(add(3, 5))     # 8

# 等价于
def add(a, b):
    return a + b
~~~

<h3>语法</h3>
~~~
lambda 参数1, 参数2, ...: 表达式
~~~

<p><b>lambda 只能有一个表达式</b>，不能有语句（不能 print、不能赋值、不能写 for）：</p>
~~~
# 错误示例
# f = lambda x: print(x)     # 可以有副作用但意义不大
# f = lambda x: y = x + 1    # 语法错误
~~~

<h2>最常见场景：sorted 的 key</h2>
~~~
students = [
    {"name": "Alice", "score": 88},
    {"name": "Bob", "score": 95},
    {"name": "Charlie", "score": 72}
]

# 按分数排序
by_score = sorted(students, key=lambda s: s["score"], reverse=True)
for s in by_score:
    print(s["name"], s["score"])
~~~

<h3>按名字长度排序</h3>
~~~
words = ["banana", "apple", "cherry", "date"]
words.sort(key=lambda w: len(w))
print(words)    # ['date', 'apple', 'banana', 'cherry']
~~~

<h3>多级排序</h3>
~~~
data = [("Bob", 90), ("Alice", 90), ("Charlie", 85)]
# 分数降序，同分按名字升序
data.sort(key=lambda x: (-x[1], x[0]))
print(data)   # [('Alice', 90), ('Bob', 90), ('Charlie', 85)]
~~~
<p>用负数表示降序是个常用技巧。</p>

<h2>map：对每个元素做转换</h2>
~~~
nums = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, nums))
print(doubled)      # [2, 4, 6, 8]

# 转字符串
strs = list(map(str, [1, 2, 3]))
print(strs)         # ['1', '2', '3']
~~~

<h3>map 可以处理多个序列</h3>
~~~
a = [1, 2, 3]
b = [10, 20, 30]
sums = list(map(lambda x, y: x + y, a, b))
print(sums)   # [11, 22, 33]
~~~

<h2>filter：筛选</h2>
~~~
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
print(evens)        # [2, 4, 6]

# None 作为函数：过滤掉假值
mixed = [0, 1, "", "a", None, [], [1]]
truthy = list(filter(None, mixed))
print(truthy)       # [1, 'a', [1]]
~~~

<h2>reduce：累积</h2>
~~~
from functools import reduce

nums = [1, 2, 3, 4]
total = reduce(lambda a, b: a + b, nums)
print(total)        # 10

# 求最大值
max_val = reduce(lambda a, b: a if a > b else b, nums)
print(max_val)      # 4
~~~

<h2>对比推导式</h2>
<p>多数场景下，推导式比 map / filter 更好读：</p>
~~~
nums = [1, 2, 3, 4]

# 推导式更清晰
print([x * 2 for x in nums])
print([x for x in nums if x % 2 == 0])

# map / filter 写法
print(list(map(lambda x: x * 2, nums)))
print(list(filter(lambda x: x % 2 == 0, nums)))
~~~
<p>lambda 最实用的场景是 <code>sorted</code> / <code>max</code> / <code>min</code> 的 key 参数。</p>

<h2>max / min 的 key 用法</h2>
~~~
students = [
    {"name": "Alice", "score": 88},
    {"name": "Bob", "score": 95}
]

best = max(students, key=lambda s: s["score"])
print(best["name"])   # Bob

# 找最长的单词
words = ["hi", "hello", "hey"]
longest = max(words, key=len)
print(longest)        # hello
~~~

<h2>sorted 的多重应用</h2>
~~~
# 按绝对值排序
nums = [-3, 1, -2, 4]
print(sorted(nums, key=abs))    # [1, -2, -3, 4]

# 字符串按最后一个字母
words = ["banana", "apple", "cherry"]
print(sorted(words, key=lambda w: w[-1]))
# ['banana', 'apple', 'cherry']

# 字典按值排序
d = {"a": 3, "b": 1, "c": 2}
print(sorted(d.items(), key=lambda x: x[1]))
# [('b', 1), ('c', 2), ('a', 3)]
~~~

<h2>返回函数的函数（进阶）</h2>
~~~
def multiplier(n):
    return lambda x: x * n

double = multiplier(2)
triple = multiplier(3)
print(double(5))     # 10
print(triple(5))     # 15
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>给定单词列表，按长度排序输出，长度相同的按字母顺序。</p>

<h3>练习 2</h3>
<p>用 lambda + sorted 从学生列表中找出分数最高的学生。</p>

<h3>练习 3</h3>
<p>用 map 把 <code>["1", "2", "3"]</code> 转成 <code>[1, 2, 3]</code>。</p>

<h3>练习 4</h3>
<p>用 filter 从列表中提取所有正数，然后平方。</p>

<h3>练习 5</h3>
<p>用 reduce 求列表所有元素的乘积。</p>
`
    },
    {
        id: 'l20', stage: '05', title: '装饰器入门', desc: '在不改动原函数的前提下增强它',
        content: `
<h2>先理解：函数也是对象</h2>
~~~
def hello():
    print("hi")

f = hello      # 把函数赋值给变量
f()            # hi

def run(func): # 函数作为参数传入
    func()

run(hello)     # hi

def make():    # 函数作为返回值
    def inner():
        print("inner")
    return inner

fn = make()
fn()           # inner
~~~
<p>掌握这三点，装饰器就水到渠成了。</p>

<h2>从需求出发</h2>
<p>假设你想知道 <code>greet</code> 函数每次被调用花了多少时间。笨办法是改原函数：</p>
~~~
def greet():
    import time
    start = time.time()
    print("你好")
    print(f"耗时 {time.time() - start}")
~~~
<p>问题：每个函数都要加一遍，污染原逻辑。</p>
<p>装饰器的目标：<b>不改原函数代码，给它套一层包装。</b></p>

<h2>最简单的装饰器</h2>
~~~
def log(func):
    def wrapper():
        print("开始执行…")
        func()
        print("执行结束")
    return wrapper

@log
def greet():
    print("你好")

greet()
# 开始执行…
# 你好
# 执行结束
~~~

<h3>@ 是语法糖</h3>
~~~
@log
def greet():
    print("你好")

# 完全等价于
def greet():
    print("你好")
greet = log(greet)
~~~
<p>所以 <code>greet</code> 现在其实是 <code>wrapper</code> 函数。</p>

<h2>支持带参数的函数</h2>
<p>上面的 wrapper 不接受参数，无法包装有参数的函数。用 <code>*args, **kwargs</code> 解决：</p>
~~~
def log(func):
    def wrapper(*args, **kwargs):
        print(f"调用 {func.__name__}，参数：{args} {kwargs}")
        return func(*args, **kwargs)
    return wrapper

@log
def add(a, b):
    return a + b

print(add(3, 5))
# 调用 add，参数：(3, 5) {}
# 8
~~~

<h3>必须 return 原函数的返回值</h3>
~~~
def log(func):
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)   # 少了 return，add 返回 None
    return wrapper
~~~

<h2>保留原函数信息</h2>
<p>不加处理的话，被装饰的函数的 <code>__name__</code> 会变成 <code>wrapper</code>：</p>
~~~
@log
def add(a, b):
    """两数之和"""
    return a + b

print(add.__name__)    # wrapper，不是 add
print(add.__doc__)     # None
~~~

<p>用 <code>functools.wraps</code> 修复：</p>
~~~
import functools

def log(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs)
    return wrapper

@log
def add(a, b):
    """两数之和"""
    return a + b

print(add.__name__)   # add
print(add.__doc__)    # 两数之和
~~~

<h2>实用示例</h2>

<h3>计时装饰器</h3>
~~~
import time
import functools

def timer(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} 耗时 {elapsed:.4f} 秒")
        return result
    return wrapper

@timer
def slow_sum(n):
    return sum(range(n))

slow_sum(1000000)
# slow_sum 耗时 0.03xx 秒
~~~

<h3>缓存装饰器</h3>
~~~
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(100))   # 瞬间出结果
~~~
<p><code>lru_cache</code> 是官方装饰器，自动缓存函数结果，重复调用同一个参数直接返回缓存。</p>

<h3>权限校验（Web 常用）</h3>
~~~
def require_login(func):
    @functools.wraps(func)
    def wrapper(user, *args, **kwargs):
        if not user.get("logged_in"):
            raise PermissionError("请先登录")
        return func(user, *args, **kwargs)
    return wrapper

@require_login
def view_profile(user):
    print(f"欢迎 {user['name']}")

view_profile({"name": "Alice", "logged_in": True})
# view_profile({"name": "Bob", "logged_in": False})  # PermissionError
~~~

<h2>带参数的装饰器（进阶）</h2>
<p>装饰器本身要接受参数，需要三层嵌套：</p>
~~~
def repeat(times):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for _ in range(times):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def hi():
    print("hi")

hi()
# hi
# hi
# hi
~~~
<p>理解方式：<code>repeat(3)</code> 返回 <code>decorator</code>，<code>decorator</code> 再作用到 hi 上。</p>

<h2>多个装饰器</h2>
~~~
@timer
@log
def work():
    time.sleep(0.1)

# 等价于 work = timer(log(work))
~~~
<p>执行顺序从下往上：先 log 包装，再 timer 包装。</p>

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>写装饰器 <code>@timer</code>，打印被装饰函数的运行耗时。</p>

<h3>练习 2</h3>
<p>写装饰器 <code>@debug</code>，打印函数的入参和返回值。</p>

<h3>练习 3</h3>
<p>写带参数的装饰器 <code>@repeat(n)</code>，让函数执行 n 次。</p>

<h3>练习 4</h3>
<p>写装饰器 <code>@cache</code>，用字典缓存函数的计算结果（只支持位置参数）。</p>

<h3>练习 5</h3>
<p>用 <code>functools.lru_cache</code> 优化递归版的斐波那契，对比优化前后的耗时。</p>
`
    }

);