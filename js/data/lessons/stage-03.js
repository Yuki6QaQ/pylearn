window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l08', stage: '03', title: 'if 条件判断', desc: '让程序做选择',
        content: `
<h2>基本结构</h2>
<p>Python 用<b>缩进</b>表示代码块，标准是 4 个空格。缩进错误会直接报错，这是 Python 的特色，也是新手最容易踩的坑。</p>
~~~
age = 18
if age >= 18:
    print("成年")
else:
    print("未成年")
~~~

<h3>语法要点</h3>
<ul>
  <li>条件后面<b>必须有冒号</b> <code>:</code></li>
  <li>代码块靠缩进区分，不是花括号</li>
  <li>同一代码块内缩进必须完全一致（4 个空格或 1 个 Tab，不要混用）</li>
</ul>

<h2>多分支 elif</h2>
~~~
score = 85
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
~~~
<p>从上往下依次判断，命中一个就跳过其余。<code>elif</code> 可以有很多个，<code>else</code> 最多一个。</p>

<h3>顺序很重要</h3>
~~~
score = 95
# 错误顺序：95 也会被第一个条件截住
if score >= 60:
    print("及格")
elif score >= 90:
    print("优秀")   # 永远走不到
~~~
<p>条件范围要<b>从窄到宽</b>或<b>从高到低</b>排列，否则后面的分支会被前面的截胡。</p>

<h2>嵌套 if</h2>
~~~
age = 20
has_ticket = True

if age >= 18:
    if has_ticket:
        print("可以入场")
    else:
        print("请先买票")
else:
    print("未成年不得入场")
~~~

<h3>用 and 简化</h3>
~~~
if age >= 18 and has_ticket:
    print("可以入场")
~~~
<p>能用逻辑运算符合并的就不要嵌套，代码更扁平、更好读。</p>

<h2>真值判断</h2>
<p>以下值在条件中都被当作「假」：</p>
<ul>
  <li><code>False</code></li>
  <li><code>None</code></li>
  <li><code>0</code>、<code>0.0</code>、<code>0j</code></li>
  <li>空字符串 <code>""</code></li>
  <li>空列表 <code>[]</code>、空元组 <code>()</code>、空字典 <code>{}</code>、空集合 <code>set()</code></li>
</ul>
<p>其余都是「真」。</p>

~~~
name = ""
if name:
    print("有名字")
else:
    print("名字为空")
~~~

<h3>判断"非空"的惯用法</h3>
~~~
items = [1, 2, 3]
if items:
    print("有元素")
# 不要写 if len(items) > 0:  虽然也对，但不够 Pythonic
~~~

<h2>三元表达式</h2>
~~~
age = 20
status = "成年" if age >= 18 else "未成年"
print(status)
~~~

<p>嵌套三元表达式不推荐，会降低可读性：</p>
~~~
# 不推荐
grade = "A" if s>=90 else "B" if s>=80 else "C" if s>=60 else "F"
~~~

<h2>match...case（Python 3.10+）</h2>
~~~
command = "start"
match command:
    case "start":
        print("启动")
    case "stop":
        print("停止")
    case _:
        print("未知命令")
~~~
<p>类似其他语言的 switch，但更强大，支持模式匹配。</p>

<h2>常见错误</h2>

<h3>错误 1：漏冒号</h3>
~~~
if x > 0    # SyntaxError
    print("正数")
~~~

<h3>错误 2：缩进不一致</h3>
~~~
if x > 0:
    print("a")
      print("b")    # IndentationError
~~~

<h3>错误 3：把 == 写成 =</h3>
~~~
if x = 5:    # SyntaxError
~~~
<p><code>=</code> 是赋值，<code>==</code> 是判断。</p>

<h3>错误 4：用中文标点</h3>
~~~
if x > 0：    # 中文冒号，报错
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>输入一个年份，判断是否是闰年。规则：能被 4 整除且不能被 100 整除，或者能被 400 整除。</p>
~~~
year = int(input("输入年份："))
# 你的代码
~~~

<h3>练习 2</h3>
<p>输入三个数字，输出最大值（用 if 判断，不要用 max）。</p>

<h3>练习 3</h3>
<p>输入一个字符，判断是大写字母、小写字母、数字还是其他。提示：用 <code>isupper()</code>、<code>islower()</code>、<code>isdigit()</code>。</p>

<h3>练习 4</h3>
<p>BMI 计算器：输入身高（米）和体重（公斤），计算 BMI 并输出等级。</p>
<ul>
  <li>BMI &lt; 18.5：偏瘦</li>
  <li>18.5 ≤ BMI &lt; 24：正常</li>
  <li>24 ≤ BMI &lt; 28：偏胖</li>
  <li>BMI ≥ 28：肥胖</li>
</ul>
<p>公式：BMI = 体重 / 身高²</p>
`
    },
    {
        id: 'l09', stage: '03', title: 'while 循环', desc: '条件为真就重复',
        content: `
<h2>基本用法</h2>
~~~
i = 1
while i <= 5:
    print(i)
    i += 1
print("循环结束")
~~~
<p>执行流程：</p>
<ol>
  <li>判断条件 <code>i &lt;= 5</code>，为真进入循环</li>
  <li>执行循环体</li>
  <li>回到步骤 1 重新判断</li>
  <li>条件为假时退出循环</li>
</ol>

<h2>死循环与避免</h2>
<p>如果条件永远为真，程序会一直跑：</p>
~~~
# 危险：i 没有变化，条件永远为真
# i = 1
# while i <= 5:
#     print(i)
~~~
<p>写 while 必须保证循环体内有让条件趋向结束的语句，通常是<b>计数器递增</b>或<b>状态改变</b>。</p>

<h3>故意写死循环</h3>
~~~
while True:
    cmd = input("输入命令（q 退出）：")
    if cmd == "q":
        break
    print(f"执行：{cmd}")
~~~
<p>服务端程序、命令行工具经常用这种模式：一直循环，靠 break 或异常退出。</p>

<h3>强制中断</h3>
<p>如果真进入死循环，在终端按 <code>Ctrl + C</code> 强制结束程序。</p>

<h2>while...else</h2>
<p>while 正常结束（不是被 break 打断）时执行 else：</p>
~~~
n = 3
while n > 0:
    print(n)
    n -= 1
else:
    print("正常结束")
# 3
# 2
# 1
# 正常结束
~~~

~~~
n = 3
while n > 0:
    if n == 2:
        break
    print(n)
    n -= 1
else:
    print("正常结束")
# 3
# 打印 2 时 break，else 不执行
~~~

<h2>经典应用</h2>

<h3>1. 累加求和</h3>
~~~
total = 0
i = 1
while i <= 100:
    total += i
    i += 1
print(total)   # 5050
~~~

<h3>2. 猜数字游戏</h3>
~~~
import random

target = random.randint(1, 100)
tries = 0
while True:
    guess = int(input("猜一个 1-100 的数："))
    tries += 1
    if guess > target:
        print("大了")
    elif guess < target:
        print("小了")
    else:
        print(f"猜对了！用了 {tries} 次")
        break
~~~

<h3>3. 输入验证</h3>
~~~
while True:
    age = input("输入年龄：")
    if age.isdigit() and 0 < int(age) < 150:
        age = int(age)
        break
    print("输入无效，请重试")
print(f"你的年龄是 {age}")
~~~

<h3>4. 数字反转</h3>
~~~
n = 12345
reversed_n = 0
while n > 0:
    reversed_n = reversed_n * 10 + n % 10
    n //= 10
print(reversed_n)   # 54321
~~~

<h2>while 与 for 怎么选</h2>
<ul>
  <li><b>for</b>：知道循环次数，或要遍历一个集合</li>
  <li><b>while</b>：只知道「一直做到某条件满足」，次数不确定</li>
</ul>
~~~
# 遍历列表 → for
for item in [1, 2, 3]:
    print(item)

# 一直读输入直到正确 → while
while True:
    ...
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>用 while 输出 1 到 50 之间所有能被 3 整除的数。</p>

<h3>练习 2</h3>
<p>用 while 计算：1 + 2 + 3 + ... + n，当和超过 1000 时停止，输出此时的 n 和总和。</p>

<h3>练习 3</h3>
<p>输入一个正整数，用 while 反转它（如 12345 → 54321）。</p>

<h3>练习 4</h3>
<p>写一个简易密码验证：最多允许输入 3 次，超过 3 次就退出程序。</p>

<h3>练习 5</h3>
<p>斐波那契数列：输出前 20 项（用 while 实现）。</p>
`
    },
    {
        id: 'l10', stage: '03', title: 'for 循环', desc: '遍历序列的首选',
        content: `
<h2>基本用法</h2>
<p>for 用于遍历一个可迭代对象（列表、字符串、range 等）：</p>
~~~
for i in range(5):
    print(i)      # 0 1 2 3 4

for ch in "abc":
    print(ch)     # a b c

for item in [10, 20, 30]:
    print(item)   # 10 20 30
~~~

<h3>可迭代对象</h3>
<p>能用 for 遍历的都叫「可迭代对象」（iterable），包括：</p>
<ul>
  <li>字符串、列表、元组、字典、集合</li>
  <li>range 对象</li>
  <li>文件对象</li>
  <li>生成器、任何实现了 <code>__iter__</code> 的对象</li>
</ul>

<h2>range 详解</h2>
~~~
range(5)          # 0,1,2,3,4
range(2, 6)       # 2,3,4,5
range(0, 10, 2)   # 0,2,4,6,8
range(10, 0, -1)  # 10,9,8,7,6,5,4,3,2,1
~~~

<h3>range 是惰性的</h3>
~~~
r = range(1000000)
print(len(r))     # 1000000，但没占用那么多内存
print(r[500])     # 500，可以索引
~~~

<h3>range 不能直接打印</h3>
~~~
print(range(5))         # range(0, 5)，不是 [0,1,2,3,4]
print(list(range(5)))   # [0,1,2,3,4]
~~~

<h2>遍历列表的多种方式</h2>

<h3>只要值</h3>
~~~
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
~~~

<h3>要索引和值：enumerate</h3>
~~~
for i, fruit in enumerate(fruits):
    print(i, fruit)
# 0 apple
# 1 banana
# 2 cherry

# 从 1 开始计数
for i, fruit in enumerate(fruits, start=1):
    print(f"{i}. {fruit}")
~~~

<h3>同时遍历多个序列：zip</h3>
~~~
names = ["Alice", "Bob", "Charlie"]
ages = [25, 30, 35]
for name, age in zip(names, ages):
    print(f"{name} 今年 {age} 岁")
~~~
<p>zip 以最短的序列为准，长度不一致时多余的元素会被忽略。</p>

<h3>不要这样写</h3>
~~~
fruits = ["apple", "banana"]
# 不推荐：C 风格
for i in range(len(fruits)):
    print(fruits[i])

# 推荐
for fruit in fruits:
    print(fruit)
~~~

<h2>遍历字典</h2>
~~~
person = {"name": "Alice", "age": 25}

for key in person:
    print(key)

for key, value in person.items():
    print(key, value)

for value in person.values():
    print(value)
~~~
<p>遍历字典时不能修改字典的大小，否则会报 <code>RuntimeError</code>。要修改先转成 list：</p>
~~~
for key in list(person.keys()):
    if key == "age":
        del person[key]
~~~

<h2>嵌套循环</h2>
~~~
# 九九乘法表
for i in range(1, 10):
    for j in range(1, i + 1):
        print(f"{j}×{i}={i*j}", end="  ")
    print()
~~~
<p>输出：</p>
~~~
1×1=1
1×2=2  2×2=4
1×3=3  2×3=6  3×3=9
...
~~~

<h2>for...else</h2>
~~~
for n in [2, 4, 6, 8]:
    if n % 2 != 0:
        print("有奇数")
        break
else:
    print("全是偶数")   # 会执行
~~~
<p>else 在循环正常结束（没被 break）时执行，常用于「查找不存在」的场景。</p>

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>打印九九乘法表（见上面的例子）。</p>

<h3>练习 2</h3>
<p>输入一句话，统计其中有多少个元音字母（a/e/i/o/u，不区分大小写）。</p>

<h3>练习 3</h3>
<p>求 1 到 100 中所有偶数的和，所有奇数的和。</p>

<h3>练习 4</h3>
<p>用嵌套循环打印一个直角三角形：</p>
~~~
*
**
***
****
*****
~~~

<h3>练习 5</h3>
<p>给定两个列表 <code>["张三","李四","王五"]</code> 和 <code>[85, 92, 78]</code>，用 zip 输出「姓名：分数」。</p>
`
    },
    {
        id: 'l11', stage: '03', title: 'break 与 continue', desc: '控制循环节奏',
        content: `
<h2>break：立即跳出整个循环</h2>
~~~
for i in range(1, 10):
    if i == 5:
        break
    print(i)
# 输出 1 2 3 4
~~~
<p>break 一执行，循环立即结束，后面的代码（包括剩余迭代）都不再执行。</p>

<h2>continue：跳过本次，进入下一轮</h2>
~~~
for i in range(1, 6):
    if i == 3:
        continue
    print(i)
# 输出 1 2 4 5
~~~
<p>continue 只跳过当前这一轮剩余代码，循环继续。</p>

<h3>对比</h3>
~~~
# break：永远停在 5
for i in range(10):
    if i == 5:
        break
    print(i)   # 0 1 2 3 4

# continue：只跳过 5
for i in range(10):
    if i == 5:
        continue
    print(i)   # 0 1 2 3 4 6 7 8 9
~~~

<h2>常见场景</h2>

<h3>1. 查找</h3>
~~~
numbers = [3, 8, 15, 22, 9]
target = 15
for n in numbers:
    if n == target:
        print("找到了")
        break
else:
    print("没找到")
~~~

<h3>2. 过滤无效数据</h3>
~~~
data = ["1", "abc", "3", "", "5"]
total = 0
for item in data:
    if not item.isdigit():
        continue
    total += int(item)
print(total)   # 9
~~~

<h3>3. 输入验证</h3>
~~~
while True:
    age = input("输入年龄：")
    if not age.isdigit():
        print("请输入数字")
        continue
    age = int(age)
    if not (0 < age < 150):
        print("年龄范围 1-149")
        continue
    break
~~~

<h2>嵌套循环中的 break</h2>
<p>break 只跳出<b>当前这一层</b>循环：</p>
~~~
for i in range(3):
    for j in range(3):
        if j == 1:
            break
        print(i, j)
# 输出 (0,0) (1,0) (2,0)
~~~

<h3>如何跳出多层循环</h3>

<p><b>方法一：标志变量</b></p>
~~~
found = False
for i in range(3):
    for j in range(3):
        if i + j == 3:
            found = True
            break
    if found:
        break
~~~

<p><b>方法二：函数 return</b></p>
~~~
def find():
    for i in range(3):
        for j in range(3):
            if i + j == 3:
                return (i, j)
    return None

result = find()
~~~
<p>推荐方法二，逻辑清晰。</p>

<h2>不要滥用 break / continue</h2>
<p>过度使用会让代码难读。能用推导式或内置函数替代的，优先用：</p>
~~~
# 不推荐
result = []
for n in nums:
    if n % 2 == 0:
        result.append(n * 2)

# 推荐
result = [n * 2 for n in nums if n % 2 == 0]
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>遍历 1-100，跳过 7 的倍数，遇到大于 50 的数就停止，输出过程中所有数字的和。</p>

<h3>练习 2</h3>
<p>输入一个数，判断它是否是素数（用 for + break）。</p>

<h3>练习 3</h3>
<p>输入一段文字，遇到第一个句号或问号就停止输出。</p>

<h3>练习 4</h3>
<p>给定一个列表，找到第一个负数就停止，返回它前面的所有正数之和。</p>
`
    }

);