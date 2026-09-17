window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l12', stage: '04', title: '列表 list', desc: '有序、可变、最常用',
        content: `
<h2>为什么列表是最重要的数据结构</h2>
<p>现实里很多东西是「一组」的：一个班的学生、一份购物清单、一周的气温。用十几个变量去存会很痛苦，而且没法用 for 遍历一组不同变量名。</p>
<p>列表用<b>一个名字装一组有序的数据</b>：</p>
~~~
students = ["Alice", "Bob", "Charlie"]
for s in students:
    print(s)
~~~

<h2>创建列表</h2>
~~~
nums = [1, 2, 3]
empty = []
chars = list("abc")             # ['a', 'b', 'c']
rng = list(range(5))            # [0, 1, 2, 3, 4]
mixed = [1, "hello", 3.14, True]
nested = [[1, 2], [3, 4], [5, 6]]
~~~
<p>列表里可以放任何类型，包括另一个列表。不过实践中同一个列表最好放同类型的东西。</p>

<h2>索引：从 0 开始</h2>
~~~
fruits = ["apple", "banana", "cherry", "date"]

print(fruits[0])     # apple
print(fruits[1])     # banana
print(fruits[-1])    # date     最后一个
print(fruits[-2])    # cherry   倒数第二个
print(len(fruits))   # 4
~~~
<p>索引越界会报 <code>IndexError</code>，Python 不会像某些语言那样返回 null。</p>

<h2>切片</h2>
<p>语法 <code>[start:end:step]</code>，<b>含头不含尾</b>。</p>
~~~
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(nums[2:5])      # [2, 3, 4]
print(nums[:3])       # [0, 1, 2]
print(nums[7:])       # [7, 8, 9]
print(nums[::2])      # [0, 2, 4, 6, 8]
print(nums[::-1])     # [9, 8, ..., 0]
print(nums[100:200])  # []  不报错
~~~
<p><b>切片返回新列表</b>，不是原列表的视图。</p>

<h3>切片赋值</h3>
~~~
nums = [1, 2, 3, 4, 5]
nums[1:3] = [20, 30]      # [1, 20, 30, 4, 5]
nums[::2] = [0, 0, 0]     # 隔一个赋值
~~~

<h2>增：添加元素</h2>
~~~
nums = [1, 2, 3]

nums.append(4)              # [1, 2, 3, 4]    末尾加一个
nums.extend([5, 6])         # [1, 2, 3, 4, 5, 6]  末尾加多个
nums.insert(0, 0)           # [0, 1, 2, 3, 4, 5, 6]  在索引 0 插入

a = [1, 2]
b = [3, 4]
c = a + b                   # [1, 2, 3, 4]    a、b 不变
d = a * 2                   # [1, 2, 1, 2]
~~~

<h3>append vs extend 的坑</h3>
~~~
a = [1, 2]
a.append([3, 4])     # [1, 2, [3, 4]]   整个列表当一个元素
print(a)

a = [1, 2]
a.extend([3, 4])     # [1, 2, 3, 4]     逐个加入
print(a)
~~~

<h2>删：移除元素</h2>
~~~
nums = [1, 2, 3, 2, 4]

# 按值删，删除第一个匹配的
nums.remove(2)       # [1, 3, 2, 4]

# 按索引删，返回被删的值
popped = nums.pop(0) # popped = 1，nums = [3, 2, 4]

# 默认删末尾
last = nums.pop()    # last = 4

# 用 del 按索引删
del nums[0]

# 用 del 删切片
nums = [1, 2, 3, 4, 5]
del nums[1:3]        # [1, 4, 5]

# 清空
nums.clear()
~~~

<h3>remove vs pop vs del</h3>
<ul>
  <li><code>remove(x)</code>：知道值不知道位置</li>
  <li><code>pop(i)</code>：知道位置，且想拿到被删的值</li>
  <li><code>del lst[i]</code>：知道位置，不需要被删的值</li>
</ul>

<h3>循环里删除元素的坑</h3>
~~~
nums = [1, 2, 2, 3, 4]
# 错误：边遍历边删会导致跳元素
for n in nums:
    if n == 2:
        nums.remove(n)
print(nums)   # [1, 2, 3, 4]  还有 2！

# 正确：用推导式或倒序
nums = [n for n in nums if n != 2]
# 或
for i in range(len(nums) - 1, -1, -1):
    if nums[i] == 2:
        del nums[i]
~~~

<h2>改：修改元素</h2>
~~~
nums = [1, 2, 3, 4]
nums[0] = 100        # [100, 2, 3, 4]
nums[1:3] = [20, 30] # [100, 20, 30, 4]
~~~

<h2>查：查找与判断</h2>
~~~
nums = [3, 1, 4, 1, 5, 9, 2, 6]
print(len(nums))        # 8
print(4 in nums)        # True
print(100 in nums)      # False
print(nums.index(4))    # 2   返回索引
print(nums.count(1))    # 2   出现次数
print(max(nums))        # 9
print(min(nums))        # 1
print(sum(nums))        # 31
~~~

<h2>排序</h2>
~~~
nums = [3, 1, 4, 1, 5]
nums.sort()              # 原地排序，改自己
print(nums)              # [1, 1, 3, 4, 5]

nums.sort(reverse=True)  # 降序

# sorted 返回新列表，不改原列表
original = [3, 1, 4]
sorted_copy = sorted(original)
print(original)          # [3, 1, 4]
print(sorted_copy)       # [1, 3, 4]
~~~

<h3>按自定义规则排序</h3>
~~~
words = ["banana", "apple", "cherry", "date"]

words.sort(key=len)
print(words)          # ['date', 'apple', 'banana', 'cherry']

# 多级排序：先按长度，长度相同按字母
words.sort(key=lambda w: (len(w), w))
~~~

<h3>反转</h3>
~~~
nums = [1, 2, 3]
nums.reverse()       # 原地反转，改自己
print(nums)          # [3, 2, 1]

print(list(reversed([1, 2, 3])))   # [3, 2, 1]
~~~

<h2>遍历的多种方式</h2>
~~~
fruits = ["apple", "banana", "cherry"]

for fruit in fruits:
    print(fruit)

for i, fruit in enumerate(fruits):
    print(i, fruit)

prices = [3.5, 1.2, 8.0]
for fruit, price in zip(fruits, prices):
    print(f"{fruit}: {price} 元")
~~~

<h2>复制列表</h2>
~~~
a = [1, 2, 3]

# 浅复制
b = a.copy()          # 推荐
c = a[:]              # 也可以
d = list(a)           # 也可以
import copy
e = copy.copy(a)      # 也可以

# b、c、d、e 都和 a 独立
b.append(4)
print(a)   # [1, 2, 3]
~~~

<h3>嵌套列表要深复制</h3>
~~~
import copy
a = [[1, 2], [3, 4]]
b = a.copy()          # 浅复制，只复制外层
b[0][0] = 999
print(a)              # [[999, 2], [3, 4]]  a 也变了！

c = copy.deepcopy(a)  # 深复制，完全独立
c[0][0] = 111
print(a)              # 不受影响
~~~

<h2>嵌套列表（二维）</h2>
~~~
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
]

print(matrix[0][1])    # 2
print(matrix[2][2])    # 9

for row in matrix:
    for n in row:
        print(n, end=" ")
    print()
~~~

<h2>常用方法速查</h2>
<ul>
  <li><code>len(lst)</code> 长度</li>
  <li><code>lst.append(x)</code> 末尾加一个</li>
  <li><code>lst.extend(iterable)</code> 末尾加多个</li>
  <li><code>lst.insert(i, x)</code> 在 i 处插入</li>
  <li><code>lst.remove(x)</code> 删除第一个 x</li>
  <li><code>lst.pop(i)</code> 弹出 i 处元素</li>
  <li><code>lst.index(x)</code> 找 x 的索引</li>
  <li><code>lst.count(x)</code> 数 x 出现次数</li>
  <li><code>lst.sort()</code> 原地排序</li>
  <li><code>lst.reverse()</code> 原地反转</li>
  <li><code>lst.copy()</code> 浅复制</li>
  <li><code>lst.clear()</code> 清空</li>
</ul>

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>创建一个 5 个数字的列表，输出最大值、最小值、平均值。</p>

<h3>练习 2</h3>
<p>给定 <code>[3, 1, 4, 1, 5, 9, 2, 6, 5, 3]</code>，去掉所有重复元素且保持原顺序（不要用 set，会乱序）。</p>

<h3>练习 3</h3>
<p>输入一行空格分隔的数字，输出排序结果，并给出每个数字在原始列表中的索引。</p>

<h3>练习 4</h3>
<p>用嵌套列表表示 3×3 矩阵，写一个函数计算它的转置（行变列、列变行）。</p>

<h3>练习 5</h3>
<p>合并两个有序列表，保持结果有序（不要用 sort）。</p>
~~~
a = [1, 3, 5]
b = [2, 4, 6]
# 结果：[1, 2, 3, 4, 5, 6]
~~~
`
    },
    {
        id: 'l13', stage: '04', title: '元组 tuple', desc: '不可变、更安全',
        content: `
<h2>为什么要有元组</h2>
<p>列表很灵活，但有时我们需要「固定不变」的一组数据。比如一个坐标点 <code>(3, 5)</code>，一个 RGB 颜色 <code>(255, 0, 0)</code>。这些数据的意义在于「作为一个整体」，不应该被单独修改。</p>
<p>元组就是这种不可变的序列。</p>

<h2>创建元组</h2>
~~~
point = (3, 5)
colors = ("red", "green", "blue")
single = (42,)            # 单元素必须加逗号，否则是整数 42
not_tuple = (42)          # 这就是整数 42
empty = ()
also_tuple = 1, 2, 3      # 不加括号也可以
~~~

<h3>用 tuple() 转换</h3>
~~~
t = tuple([1, 2, 3])      # (1, 2, 3)
t = tuple("abc")          # ('a', 'b', 'c')
t = tuple(range(3))       # (0, 1, 2)
~~~

<h2>索引和切片</h2>
<p>和列表完全相同：</p>
~~~
point = (3, 5, 8, 2)
print(point[0])       # 3
print(point[-1])      # 2
print(point[1:3])     # (5, 8)
print(point[::-1])    # (2, 8, 5, 3)
print(len(point))     # 4
~~~

<h2>不可变意味着什么</h2>
~~~
t = (1, 2, 3)
# t[0] = 100     # TypeError
# t.append(4)    # AttributeError: 元组没有 append
~~~
<p>但不能修改不代表完全「冻结」，元组里的可变对象仍可改：</p>
~~~
t = ([1, 2], [3, 4])
t[0].append(99)
print(t)           # ([1, 2, 99], [3, 4])
~~~

<h2>解包（最重要的用法）</h2>
~~~
point = (3, 5)
x, y = point
print(x, y)        # 3 5

# 函数返回多个值，本质是返回元组
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4, 1, 5])
print(lo, hi)      # 1 5
~~~

<h3>用 * 收集</h3>
~~~
first, *rest = (1, 2, 3, 4, 5)
print(first)      # 1
print(rest)       # [2, 3, 4, 5]

*init, last = (1, 2, 3, 4, 5)
print(init)       # [1, 2, 3, 4]
print(last)       # 5

head, *mid, tail = (1, 2, 3, 4, 5)
print(head, mid, tail)   # 1 [2, 3, 4] 5
~~~

<h2>为什么元组比列表好</h2>
<ul>
  <li><b>安全</b>：不会被意外修改</li>
  <li><b>快</b>：创建和访问都比列表快</li>
  <li><b>省内存</b>：同样的元素，元组占用更少</li>
  <li><b>可哈希</b>：可以作为字典的键或集合的元素，列表不行</li>
</ul>
~~~
d = {(0, 0): "起点", (1, 1): "终点"}
~~~

<h2>元组与列表互转</h2>
~~~
t = (1, 2, 3)
lst = list(t)      # [1, 2, 3]
t2 = tuple(lst)    # (1, 2, 3)
~~~

<h2>命名元组（namedtuple）</h2>
<p>给元组的每个位置起名字，可读性更好：</p>
~~~
from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 5)
print(p.x, p.y)     # 3 5
print(p[0], p[1])   # 3 5
print(p)            # Point(x=3, y=5)

# 支持解包
x, y = p
~~~

<h2>元组不能做的操作</h2>
<ul>
  <li>修改元素：<code>t[0] = x</code> 报错</li>
  <li>append / remove / pop：没有这些方法</li>
  <li>sort：没有原地排序，用 <code>sorted(t)</code> 返回新列表</li>
</ul>

<h2>什么时候用元组</h2>
<ul>
  <li>函数返回多个值</li>
  <li>固定的坐标、RGB、日期（年,月,日）</li>
  <li>做字典的键</li>
  <li>配置项的常量组合</li>
</ul>

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>写函数返回列表中的最大值和最小值（返回元组），调用后解包输出。</p>

<h3>练习 2</h3>
<p>给定两个元组，交换它们的值（不借助临时变量）。</p>

<h3>练习 3</h3>
<p>用元组列表表示学生的 (姓名, 分数)，按分数从高到低排序。</p>
~~~
students = [("Alice", 88), ("Bob", 95), ("Charlie", 72)]
# 你的代码
~~~

<h3>练习 4</h3>
<p>用 namedtuple 表示一本书 (title, author, year)，创建几本书并打印。</p>
`
    },
    {
        id: 'l14', stage: '04', title: '字典 dict', desc: '键值对，查找极快',
        content: `
<h2>为什么需要字典</h2>
<p>列表靠索引（数字）访问。但现实里我们更想用「名字」找东西：用学号查学生、用科目查分数、用用户名查密码。字典就是干这个的。</p>
~~~
person = {
    "name": "Alice",
    "age": 25,
    "city": "Beijing"
}
print(person["name"])           # Alice
print(person.get("age"))        # 25
print(person.get("phone", "未填写"))   # 未填写
~~~

<h2>字典的特点</h2>
<ul>
  <li>键值对存储，键唯一</li>
  <li>键必须是可哈希的（字符串、数字、元组），值任意</li>
  <li>Python 3.7+ 保持插入顺序</li>
  <li>查找速度 O(1)，比列表快得多</li>
</ul>

<h2>创建字典</h2>
~~~
d1 = {"a": 1, "b": 2}
d2 = dict(a=1, b=2)
d3 = dict([("a", 1), ("b", 2)])
d4 = {x: x ** 2 for x in range(3)}    # 推导式
empty = {}
~~~

<h2>访问与修改</h2>
~~~
person = {"name": "Alice", "age": 25}

# 访问
print(person["name"])         # Alice
# print(person["phone"])      # KeyError

# 安全访问
print(person.get("phone"))          # None
print(person.get("phone", "N/A"))   # N/A

# 新增 / 修改
person["age"] = 26            # 修改
person["city"] = "Beijing"    # 新增
~~~

<h3>用 in 判断键</h3>
~~~
print("name" in person)       # True
print("phone" in person)      # False
~~~

<h2>删除</h2>
~~~
person = {"name": "Alice", "age": 25, "city": "Beijing"}

del person["age"]                # 直接删
city = person.pop("city")        # 弹出并返回
none = person.pop("xxx", None)   # 安全弹出
person.clear()                   # 清空
~~~

<h2>遍历</h2>
~~~
scores = {"语文": 90, "数学": 95, "英语": 88}

for key in scores:
    print(key)

for key, value in scores.items():
    print(key, value)

for value in scores.values():
    print(value)

# 同时拿索引
for i, (k, v) in enumerate(scores.items()):
    print(i, k, v)
~~~

<h2>常用操作</h2>
~~~
scores = {"语文": 90, "数学": 95}

print(len(scores))            # 2
print("语文" in scores)        # True
print(list(scores.keys()))    # ['语文', '数学']
print(list(scores.values()))  # [90, 95]
print(list(scores.items()))   # [('语文', 90), ('数学', 95)]
~~~

<h3>合并字典</h3>
~~~
a = {"x": 1}
b = {"y": 2}

a.update(b)              # a 变成 {'x': 1, 'y': 2}

c = {**a, **b}           # 创建新字典
c = a | b                # Python 3.9+
~~~

<h3>setdefault：带默认值的更新</h3>
~~~
# 传统写法：词频统计
count = {}
for word in ["apple", "banana", "apple"]:
    count[word] = count.get(word, 0) + 1

# setdefault 写法
count = {}
for word in ["apple", "banana", "apple"]:
    count.setdefault(word, 0)
    count[word] += 1

# 更 Pythonic：Counter
from collections import Counter
count = Counter(["apple", "banana", "apple"])
~~~

<h2>字典推导式</h2>
~~~
squares = {i: i ** 2 for i in range(5)}
print(squares)   # {0:0, 1:1, 2:4, 3:9, 4:16}

# 反转键值
d = {"a": 1, "b": 2}
rev = {v: k for k, v in d.items()}

# 带条件
nums = {"a": 1, "b": 2, "c": 3}
evens = {k: v for k, v in nums.items() if v % 2 == 0}
~~~

<h2>嵌套字典</h2>
~~~
users = {
    "alice": {"age": 25, "city": "Beijing"},
    "bob": {"age": 30, "city": "Shanghai"}
}

print(users["alice"]["city"])   # Beijing
users["alice"]["age"] = 26
~~~

<h2>字典的键必须可哈希</h2>
~~~
d = {}
d["name"] = 1        # 字符串 OK
d[42] = 2            # 数字 OK
d[(1, 2)] = 3        # 元组 OK
# d[[1, 2]] = 4      # TypeError：列表不可哈希
~~~

<h2>典型应用：词频统计</h2>
~~~
text = "apple banana apple cherry banana apple"
count = {}
for word in text.split():
    count[word] = count.get(word, 0) + 1
print(count)
# {'apple': 3, 'banana': 2, 'cherry': 1}

# 按次数排序输出
sorted_items = sorted(count.items(), key=lambda x: x[1], reverse=True)
for word, n in sorted_items:
    print(f"{word}: {n}")
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>创建学生成绩字典（科目→分数），遍历输出每科成绩并计算平均分。</p>

<h3>练习 2</h3>
<p>输入一段英文，统计每个单词出现次数，按次数从高到低输出。</p>

<h3>练习 3</h3>
<p>把两个列表 <code>["a","b","c"]</code> 和 <code>[1,2,3]</code> 合并成一个字典。</p>

<h3>练习 4</h3>
<p>实现一个简单的电话簿：支持添加、查找、删除联系人，用字典存储。</p>

<h3>练习 5</h3>
<p>用嵌套字典表示一个班级的学生信息（学号 → {姓名, 成绩}），实现按成绩排序输出。</p>
`
    },
    {
        id: 'l15', stage: '04', title: '集合 set', desc: '去重与集合运算',
        content: `
<h2>集合的特点</h2>
<ul>
  <li>元素<b>不重复</b></li>
  <li><b>无序</b>（不能索引）</li>
  <li>查找速度 O(1)</li>
  <li>元素必须可哈希</li>
</ul>
~~~
nums = {1, 2, 3, 3, 2, 1}
print(nums)         # {1, 2, 3}  自动去重
~~~

<h3>创建集合</h3>
~~~
s1 = {1, 2, 3}
s2 = set([1, 2, 2, 3])   # {1, 2, 3}
s3 = set("hello")        # {'h', 'e', 'l', 'o'}
empty = set()            # 空集合必须用 set()，{} 是空字典
~~~

<h2>常用操作</h2>
~~~
s = {1, 2, 3}

s.add(4)             # 添加
s.remove(1)          # 删除（不存在会报错）
s.discard(99)        # 删除（不存在也不报错）
s.pop()              # 随机弹出一个
s.clear()            # 清空

print(2 in s)        # True
print(len(s))        # 集合大小
~~~

<h2>集合运算</h2>
~~~
a = {1, 2, 3, 4}
b = {3, 4, 5, 6}

# 并集
print(a | b)             # {1, 2, 3, 4, 5, 6}
print(a.union(b))

# 交集
print(a & b)             # {3, 4}
print(a.intersection(b))

# 差集（在 a 不在 b）
print(a - b)             # {1, 2}
print(a.difference(b))

# 对称差（只在其中一个）
print(a ^ b)             # {1, 2, 5, 6}
print(a.symmetric_difference(b))
~~~

<h3>子集与超集</h3>
~~~
a = {1, 2}
b = {1, 2, 3}
print(a.issubset(b))      # True
print(b.issuperset(a))    # True
print(a.isdisjoint({3, 4}))  # True 没有交集
~~~

<h2>典型应用</h2>

<h3>1. 去重</h3>
~~~
lst = [1, 2, 2, 3, 3, 3]
unique = list(set(lst))
print(unique)         # 顺序不保证
~~~

<h3>保持顺序的去重</h3>
~~~
lst = [3, 1, 3, 2, 1]
unique = list(dict.fromkeys(lst))
print(unique)         # [3, 1, 2]  保持顺序
~~~

<h3>2. 共同好友</h3>
~~~
alice = {"Bob", "Charlie", "David"}
bob = {"Charlie", "David", "Eve"}

common = alice & bob
print(common)              # {'Charlie', 'David'}
print(alice | bob)         # 所有人的好友
print(alice - bob)         # alice 独有
~~~

<h3>3. 判断是否有重复</h3>
~~~
def has_duplicate(lst):
    return len(lst) != len(set(lst))

print(has_duplicate([1, 2, 3]))     # False
print(has_duplicate([1, 2, 2]))     # True
~~~

<h3>4. 快速统计不重复元素</h3>
~~~
words = ["a", "b", "a", "c", "b"]
print(len(set(words)))    # 3
~~~

<h3>5. 数据对比</h3>
~~~
old = {"a", "b", "c"}
new = {"b", "c", "d"}
print("新增:", new - old)    # {'d'}
print("删除:", old - new)    # {'a'}
print("不变:", old & new)    # {'b', 'c'}
~~~

<h2>可变集合 vs 不可变集合</h2>
~~~
s = {1, 2, 3}              # set，可变
fs = frozenset([1, 2, 3])  # frozenset，不可变

# frozenset 可以做字典的键
d = {frozenset([1, 2]): "值"}
~~~

<h2>集合推导式</h2>
~~~
squares = {i ** 2 for i in range(5)}
print(squares)   # {0, 1, 4, 9, 16}

evens = {i for i in range(10) if i % 2 == 0}
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>给定两个列表，用集合找出它们的共同元素和所有不重复元素。</p>

<h3>练习 2</h3>
<p>输入一句话，输出其中所有不重复的字母，按字母顺序排序。</p>

<h3>练习 3</h3>
<p>判断两个字符串是否是变位词（字母完全相同、顺序不同），如 "listen" 和 "silent"。</p>

<h3>练习 4</h3>
<p>有两个班级的学生名单，找出：两个班都有的学生、只在 A 班的学生、两个班总共有多少人（去重）。</p>
`
    },
    {
        id: 'l16', stage: '04', title: '列表推导式', desc: '一行生成列表',
        content: `
<h2>基本语法</h2>
<p>把「循环 + 追加」压缩成一行：</p>
~~~
# 传统写法
squares = []
for i in range(5):
    squares.append(i ** 2)

# 推导式
squares = [i ** 2 for i in range(5)]
print(squares)     # [0, 1, 4, 9, 16]
~~~

<h3>基本结构</h3>
~~~
[ 表达式 for 变量 in 可迭代对象 ]
[ 表达式 for 变量 in 可迭代对象 if 条件 ]
~~~

<h2>带条件筛选</h2>
~~~
nums = [1, 2, 3, 4, 5, 6]
evens = [n for n in nums if n % 2 == 0]
print(evens)     # [2, 4, 6]

# 条件表达式放在前面（三元）
labels = ["偶" if n % 2 == 0 else "奇" for n in nums]
print(labels)
~~~

<h3>多个条件</h3>
~~~
nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = [n for n in nums if n % 2 == 0 if n % 3 == 0]
# 等价于 if n % 2 == 0 and n % 3 == 0
print(result)    # [6]
~~~

<h2>嵌套推导</h2>
~~~
matrix = [[1, 2], [3, 4], [5, 6]]
flat = [n for row in matrix for n in row]
print(flat)      # [1, 2, 3, 4, 5, 6]
~~~
<p><b>顺序：</b>外层循环在前，内层循环在后。</p>

<h3>生成矩阵</h3>
~~~
matrix = [[i * 3 + j for j in range(3)] for i in range(3)]
print(matrix)
# [[0, 1, 2], [3, 4, 5], [6, 7, 8]]
~~~

<h3>矩阵转置</h3>
~~~
m = [[1, 2, 3], [4, 5, 6]]
transposed = [[row[i] for row in m] for i in range(len(m[0]))]
print(transposed)   # [[1, 4], [2, 5], [3, 6]]
~~~

<h2>字典推导式</h2>
~~~
squares = {i: i ** 2 for i in range(4)}
print(squares)   # {0:0, 1:1, 2:4, 3:9}

# 反转键值
d = {"a": 1, "b": 2}
rev = {v: k for k, v in d.items()}
print(rev)       # {1: 'a', 2: 'b'}

# 单词长度映射
words = ["hi", "hello", "hey"]
lengths = {w: len(w) for w in words}
~~~

<h2>集合推导式</h2>
~~~
mods = {i % 3 for i in range(10)}
print(mods)      # {0, 1, 2}
~~~

<h2>生成器表达式（省内存）</h2>
<p>把 <code>[]</code> 换成 <code>()</code>，就是生成器，惰性求值：</p>
~~~
# 列表：一次性生成所有元素
total = sum([i ** 2 for i in range(1000000)])

# 生成器：边算边用，不占内存
total = sum(i ** 2 for i in range(1000000))
~~~

<h3>生成器的其他用法</h3>
~~~
gen = (i * 2 for i in range(5))
print(next(gen))    # 0
print(next(gen))    # 2
for x in gen:
    print(x)        # 4 6 8
~~~

<h2>嵌套条件的可读性</h2>
~~~
# 太复杂，不推荐
result = [x for x in range(100) if x % 2 == 0 if x % 3 == 0 if x > 10]

# 更清楚
result = []
for x in range(100):
    if x % 2 == 0 and x % 3 == 0 and x > 10:
        result.append(x)
~~~
<p>推导式适合逻辑简单的场景。条件超过两层就换成普通循环。</p>

<h2>常见应用</h2>

<h3>1. 转换类型</h3>
~~~
strs = ["1", "2", "3"]
nums = [int(s) for s in strs]
~~~

<h3>2. 过滤+转换</h3>
~~~
words = ["apple", "", "banana", "  ", "cherry"]
cleaned = [w.strip() for w in words if w.strip()]
~~~

<h3>3. 提取字段</h3>
~~~
students = [{"name": "Alice", "age": 20}, {"name": "Bob", "age": 22}]
names = [s["name"] for s in students]
~~~

<h3>4. 统计</h3>
~~~
nums = [1, -2, 3, -4, 5]
positive_count = sum(1 for n in nums if n > 0)
print(positive_count)   # 3
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>用推导式生成 1-20 中所有能被 3 整除的数的平方。</p>

<h3>练习 2</h3>
<p>把 <code>["hello", "world", "python"]</code> 转成 <code>["HELLO", "WORLD", "PYTHON"]</code>。</p>

<h3>练习 3</h3>
<p>用嵌套推导式把 3×3 矩阵转置。</p>

<h3>练习 4</h3>
<p>从一段文字中提取所有长度超过 3 的单词。</p>

<h3>练习 5</h3>
<p>给定两个列表 <code>[1, 2, 3]</code> 和 <code>['a', 'b', 'c']</code>，用推导式生成 <code>[(1,'a'), (2,'b'), (3,'c')]</code>。</p>
`
    }

);