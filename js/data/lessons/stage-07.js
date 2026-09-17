window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l24', stage: '07', title: '类与对象', desc: 'class 定义与实例化',
        content: `
<h2>为什么需要面向对象</h2>
<p>假设你要管理一批学生信息，用字典存：</p>
~~~
student1 = {"name": "Alice", "age": 20, "scores": [90, 85]}
student2 = {"name": "Bob", "age": 22, "scores": [88, 92]}

def average(s):
    return sum(s["scores"]) / len(s["scores"])
~~~
<p>问题：</p>
<ul>
  <li>字典的键是字符串，写错了不报错，运行时才发现</li>
  <li>函数和数据分离，调用时容易忘记传什么</li>
  <li>多个学生共享相同的逻辑，但写法松散</li>
</ul>

<p>面向对象把「数据」和「操作数据的方法」打包在一起：</p>
~~~
class Student:
    def __init__(self, name, age, scores):
        self.name = name
        self.age = age
        self.scores = scores

    def average(self):
        return sum(self.scores) / len(self.scores)

s1 = Student("Alice", 20, [90, 85])
print(s1.average())     # 87.5
~~~

<h2>类与对象的关系</h2>
<ul>
  <li><b>类（class）</b>：模板，定义有哪些属性、哪些方法</li>
  <li><b>对象（object / 实例）</b>：按模板造出来的具体实例</li>
</ul>
<p>类比：<code>Student</code> 是「学生」这个概念，<code>s1</code> 是「张三」这个具体的学生。</p>

<h2>定义类</h2>
~~~
class Dog:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def bark(self):
        print(f"{self.name}：汪汪！")

    def birthday(self):
        self.age += 1
~~~

<h3>关键概念</h3>

<p><b>__init__</b>：构造方法，创建对象时自动调用，用来初始化属性。</p>

<p><b>self</b>：代表对象自身，必须是实例方法的第一个参数。调用时不需要传，Python 自动传入。</p>

<p><b>实例属性</b>：通过 <code>self.xxx</code> 定义，每个对象独立。</p>

<h2>创建与使用对象</h2>
~~~
d = Dog("旺财", 3)
d.bark()             # 旺财：汪汪！
print(d.name)        # 旺财
print(d.age)         # 3
d.birthday()
print(d.age)         # 4
~~~

<h3>可以创建多个对象</h3>
~~~
d1 = Dog("旺财", 3)
d2 = Dog("来福", 5)

d1.bark()   # 旺财：汪汪！
d2.bark()   # 来福：汪汪！

# 两个对象的属性互相独立
d1.age = 10
print(d2.age)   # 仍然是 5
~~~

<h2>实例属性 vs 类属性</h2>
~~~
class Dog:
    species = "犬科"          # 类属性，所有实例共享

    def __init__(self, name):
        self.name = name      # 实例属性，每个对象独立

d1 = Dog("旺财")
d2 = Dog("来福")

print(d1.species)     # 犬科
print(d2.species)     # 犬科
print(d1.name)        # 旺财
print(d2.name)        # 来福

# 修改类属性会影响所有实例
Dog.species = "Canidae"
print(d1.species)     # Canidae
~~~

<h3>类属性的坑</h3>
~~~
class Counter:
    count = 0

    def increment(self):
        # 错误：这会创建一个实例属性，类属性不变
        self.count += 1

c1 = Counter()
c2 = Counter()
c1.increment()
c2.increment()
print(Counter.count)   # 0，不是 2
print(c1.count)        # 1，实例属性
~~~

<p>正确写法是用类名访问：</p>
~~~
class Counter:
    count = 0

    @classmethod
    def increment(cls):
        cls.count += 1

Counter.increment()
Counter.increment()
print(Counter.count)   # 2
~~~

<h2>三种方法</h2>
~~~
class Demo:
    class_attr = "类属性"

    def instance_method(self):
        """实例方法：操作具体对象"""
        return f"实例方法，self 是 {self}"

    @classmethod
    def class_method(cls):
        """类方法：操作类本身，常用于工厂方法"""
        return f"类方法，cls 是 {cls}"

    @staticmethod
    def static_method():
        """静态方法：不需要 self 或 cls，只是放在类里的普通函数"""
        return "静态方法"
~~~

<h3>使用场景</h3>
<ul>
  <li><b>实例方法</b>：需要访问/修改对象属性时</li>
  <li><b>类方法</b>：工厂方法（用不同方式创建实例）、需要访问类属性时</li>
  <li><b>静态方法</b>：和类相关但不需要访问类或实例的辅助函数</li>
</ul>

<h3>工厂方法示例</h3>
~~~
class Student:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    @classmethod
    def from_string(cls, s):
        """从 'name,age' 格式创建实例"""
        name, age = s.split(",")
        return cls(name, int(age))

s = Student.from_string("Alice,20")
print(s.name, s.age)   # Alice 20
~~~

<h2>完整示例：银行账户</h2>
~~~
class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self.balance = balance
        self.history = []

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("金额必须为正")
        self.balance += amount
        self.history.append(f"存入 {amount}")
        return self.balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise ValueError("余额不足")
        self.balance -= amount
        self.history.append(f"取出 {amount}")
        return self.balance

    def show(self):
        print(f"{self.owner}：余额 {self.balance}")

acc = BankAccount("Alice", 100)
acc.deposit(50)
acc.withdraw(30)
acc.show()          # Alice：余额 120
print(acc.history)  # ['存入 50', '取出 30']
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>定义 <code>Rectangle</code> 类，包含长和宽，提供 <code>area()</code> 和 <code>perimeter()</code> 方法。</p>

<h3>练习 2</h3>
<p>定义 <code>BankAccount</code> 类，支持存钱、取钱、查余额，取钱超过余额时报错。</p>

<h3>练习 3</h3>
<p>定义 <code>Book</code> 类（标题、作者、页数），实现 <code>__str__</code> 让 print 友好显示。</p>

<h3>练习 4</h3>
<p>定义 <code>Stack</code> 类（栈），支持 push、pop、peek、is_empty。</p>

<h3>练习 5</h3>
<p>定义 <code>Student</code> 类，用 <code>@classmethod</code> 实现两个工厂方法：<code>from_dict</code> 和 <code>from_string</code>。</p>
`
    },
    {
        id: 'l25', stage: '07', title: '继承与多态', desc: '复用与重写',
        content: `
<h2>为什么需要继承</h2>
<p>假设你要写「狗」「猫」「鸟」三个类，它们都有 <code>name</code> 属性、<code>eat</code> 方法，只有叫声不同。不用继承，你要把相同的代码复制三遍。</p>
<p>继承让子类自动拥有父类的一切，只需写差异部分。</p>

<h2>基本语法</h2>
~~~
class Animal:
    def __init__(self, name):
        self.name = name

    def eat(self):
        print(f"{self.name} 在吃东西")

    def speak(self):
        print("...")

class Dog(Animal):
    def speak(self):
        print(f"{self.name}：汪汪")

class Cat(Animal):
    def speak(self):
        print(f"{self.name}：喵")
~~~
<p><code>class Dog(Animal)</code> 表示 Dog 继承自 Animal。</p>

~~~
d = Dog("旺财")
d.eat()      # 旺财 在吃东西（继承自父类）
d.speak()    # 旺财：汪汪（子类重写）

c = Cat("咪咪")
c.eat()      # 咪咪 在吃东西
c.speak()    # 咪咪：喵
~~~

<h2>方法重写</h2>
<p>子类定义与父类同名的方法，会覆盖父类的版本：</p>
~~~
class Animal:
    def speak(self):
        print("动物在叫")

class Dog(Animal):
    def speak(self):
        print("汪汪")
        # 如果还想保留父类行为，可以调用 super()
        # super().speak()
~~~

<h2>super()：调用父类方法</h2>

<h3>场景 1：扩展 __init__</h3>
~~~
class Animal:
    def __init__(self, name):
        self.name = name

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)   # 先调用父类的 __init__
        self.breed = breed       # 再处理自己的属性

d = Dog("旺财", "金毛")
print(d.name, d.breed)   # 旺财 金毛
~~~

<h3>场景 2：增强父类方法</h3>
~~~
class Logger:
    def log(self, msg):
        print(f"[LOG] {msg}")

class FileLogger(Logger):
    def log(self, msg):
        super().log(msg)              # 先执行父类逻辑
        with open("app.log", "a") as f:  # 再添加自己的逻辑
            f.write(msg + "\\n")
~~~

<h2>多态</h2>
<p>同一个方法名，在不同对象上有不同表现。调用者不需要知道对象是什么类型：</p>
~~~
animals = [Dog("旺财"), Cat("咪咪"), Animal("无名")]

for a in animals:
    a.speak()      # 每个对象按自己的方式响应
~~~

<h3>多态的价值</h3>
<p>新增一种动物，只需定义新类，调用代码完全不用改：</p>
~~~
class Bird(Animal):
    def speak(self):
        print(f"{self.name}：啾啾")

animals.append(Bird("小鸟"))
for a in animals:
    a.speak()      # 循环代码没变，自动支持新类型
~~~

<h2>isinstance 与 issubclass</h2>
~~~
d = Dog("旺财")

print(isinstance(d, Dog))       # True
print(isinstance(d, Animal))    # True，子类实例也是父类实例
print(isinstance(d, Cat))       # False

print(issubclass(Dog, Animal))  # True
print(issubclass(Animal, Dog))  # False
~~~

<h3>类型检查应用</h3>
~~~
def describe(obj):
    if isinstance(obj, Dog):
        print("这是一只狗")
    elif isinstance(obj, Cat):
        print("这是一只猫")
~~~

<h2>多重继承</h2>
~~~
class Swimmer:
    def swim(self):
        print("游泳")

class Flyer:
    def fly(self):
        print("飞行")

class Duck(Swimmer, Flyer):
    pass

d = Duck()
d.swim()    # 游泳
d.fly()     # 飞行
~~~

<h3>MRO：方法解析顺序</h3>
~~~
class A:
    def hello(self):
        print("A")

class B:
    def hello(self):
        print("B")

class C(A, B):
    pass

C().hello()          # A
print(C.__mro__)     # 查看完整顺序
~~~
<p>Python 用 MRO（Method Resolution Order）从左到右找方法，遇到第一个就停。</p>

<h2>抽象基类（进阶）</h2>
~~~
from abc import ABC, abstractmethod

class Shape(ABC):
    @abstractmethod
    def area(self):
        pass

    @abstractmethod
    def perimeter(self):
        pass

class Circle(Shape):
    def __init__(self, r):
        self.r = r

    def area(self):
        return 3.14159 * self.r ** 2

    def perimeter(self):
        return 2 * 3.14159 * self.r

# s = Shape()          # TypeError：不能实例化抽象类
c = Circle(5)
print(c.area())
~~~
<p>抽象基类强制子类实现指定的方法，保证接口一致。</p>

<h2>一个完整的继承案例</h2>
~~~
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def work(self):
        print(f"{self.name} 在工作中")

    def get_salary(self):
        return self.salary

class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)
        self.team_size = team_size

    def work(self):
        print(f"{self.name} 管理 {self.team_size} 人的团队")

    def get_salary(self):
        # 经理有奖金
        return super().get_salary() + 5000

class Developer(Employee):
    def work(self):
        print(f"{self.name} 在写代码")

employees = [
    Manager("Alice", 20000, 5),
    Developer("Bob", 15000),
    Developer("Charlie", 18000)
]

for e in employees:
    e.work()
    print(f"工资：{e.get_salary()}")
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>定义 <code>Shape</code> 基类，派生 <code>Circle</code>、<code>Square</code>、<code>Rectangle</code>，各自实现 <code>area()</code>，用列表统一遍历输出面积。</p>

<h3>练习 2</h3>
<p>定义 <code>Employee</code> 基类，派生 <code>Manager</code> 和 <code>Developer</code>，各自重写 <code>work()</code>。</p>

<h3>练习 3</h3>
<p>设计一个 <code>Vehicle</code> 基类，派生 <code>Car</code>、<code>Bike</code>、<code>Truck</code>，每个类有自己的 <code>fuel_cost()</code> 方法。</p>

<h3>练习 4</h3>
<p>用抽象基类 <code>Shape</code> 强制子类实现 <code>area</code> 和 <code>perimeter</code>。</p>
`
    },
    {
        id: 'l26', stage: '07', title: '魔术方法', desc: '__str__ / __len__ / __eq__ 等',
        content: `
<h2>什么是魔术方法</h2>
<p>以双下划线开头和结尾的方法，Python 会在特定操作时自动调用，让你的对象支持内置语法（print、len、==、+ 等）。</p>

<h2>__str__ 与 __repr__</h2>
~~~
class Book:
    def __init__(self, title, author):
        self.title = title
        self.author = author

    def __str__(self):
        """给用户看的，print() 会调用"""
        return f"《{self.title}》— {self.author}"

    def __repr__(self):
        """给开发者看的，调试和列表显示时用"""
        return f"Book({self.title!r}, {self.author!r})"

b = Book("Python入门", "张三")
print(b)              # 《Python入门》— 张三
print(repr(b))        # Book('Python入门', '张三')
print([b])            # [Book('Python入门', '张三')]
~~~

<h3>区别</h3>
<ul>
  <li><code>__str__</code>：面向用户，友好显示</li>
  <li><code>__repr__</code>：面向开发者，最好能 <code>eval</code> 还原对象</li>
  <li>没定义 <code>__str__</code> 时，print 会退而使用 <code>__repr__</code></li>
</ul>

<h2>__len__ 支持 len()</h2>
~~~
class Playlist:
    def __init__(self, songs):
        self.songs = list(songs)

    def __len__(self):
        return len(self.songs)

p = Playlist(["歌1", "歌2", "歌3"])
print(len(p))     # 3

# 支持 bool 判断
if p:
    print("非空")
~~~

<h2>__eq__ 自定义相等判断</h2>
~~~
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        if not isinstance(other, Point):
            return NotImplemented
        return self.x == other.x and self.y == other.y

print(Point(1, 2) == Point(1, 2))   # True
print(Point(1, 2) == Point(3, 4))   # False
~~~

<h3>__hash__ 也要一起定义</h3>
~~~
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))

# 现在可以放进 set
points = {Point(1, 2), Point(1, 2), Point(3, 4)}
print(len(points))   # 2
~~~
<p>定义了 <code>__eq__</code> 后，Python 会把 <code>__hash__</code> 设为 None，导致对象不能放进 set 或作字典键。所以要显式定义 <code>__hash__</code>。</p>

<h2>__add__ 支持 + 运算</h2>
~~~
class Vector:
    def __init__(self, x, y):
        self.x, self.y = x, y

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __sub__(self, other):
        return Vector(self.x - other.x, self.y - other.y)

    def __str__(self):
        return f"({self.x}, {self.y})"

print(Vector(1, 2) + Vector(3, 4))   # (4, 6)
print(Vector(5, 5) - Vector(2, 3))   # (3, 2)
~~~

<h3>其他运算符</h3>
<ul>
  <li><code>__mul__</code> 乘、<code>__truediv__</code> 除、<code>__floordiv__</code> 整除</li>
  <li><code>__mod__</code> 取模、<code>__pow__</code> 幂</li>
  <li><code>__lt__</code> &lt;、<code>__le__</code> ≤、<code>__gt__</code> &gt;、<code>__ge__</code> ≥</li>
</ul>

<h2>__getitem__ 支持索引</h2>
~~~
class MyList:
    def __init__(self, data):
        self.data = list(data)

    def __getitem__(self, i):
        return self.data[i]

    def __setitem__(self, i, v):
        self.data[i] = v

    def __len__(self):
        return len(self.data)

m = MyList([10, 20, 30, 40])
print(m[0])          # 10
print(m[1:3])        # [20, 30]   切片也支持
m[0] = 100
print(m[0])          # 100
print(len(m))        # 4
~~~

<h2>__iter__ 支持 for 循环</h2>
~~~
class Countdown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        n = self.start
        while n > 0:
            yield n
            n -= 1

for x in Countdown(3):
    print(x)
# 3
# 2
# 1
~~~

<h2>__call__ 让对象可调用</h2>
~~~
class Multiplier:
    def __init__(self, n):
        self.n = n

    def __call__(self, x):
        return x * self.n

double = Multiplier(2)
print(double(5))     # 10，像函数一样调用
~~~

<h2>__enter__ / __exit__ 支持 with</h2>
~~~
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        print(f"耗时 {time.time() - self.start:.4f} 秒")
        return False    # 返回 True 会吞掉异常

with Timer():
    total = sum(range(1000000))
~~~

<h2>常用魔术方法速查</h2>
<ul>
  <li><code>__init__</code> 构造</li>
  <li><code>__str__</code> / <code>__repr__</code> 打印显示</li>
  <li><code>__len__</code> len()</li>
  <li><code>__eq__</code> / <code>__lt__</code> / <code>__hash__</code> 比较与哈希</li>
  <li><code>__add__</code> / <code>__sub__</code> / <code>__mul__</code> 运算</li>
  <li><code>__getitem__</code> / <code>__setitem__</code> 索引</li>
  <li><code>__iter__</code> / <code>__next__</code> 迭代</li>
  <li><code>__call__</code> 可调用</li>
  <li><code>__enter__</code> / <code>__exit__</code> with 语句</li>
  <li><code>__contains__</code> in 运算</li>
  <li><code>__bool__</code> bool 判断</li>
</ul>

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>定义 <code>Fraction</code> 分数类，实现 <code>__add__</code>、<code>__eq__</code>、<code>__str__</code>，让两个分数可以直接相加并友好打印。</p>

<h3>练习 2</h3>
<p>定义 <code>Matrix</code> 类，实现 <code>__getitem__</code> 支持 <code>m[i][j]</code> 访问，<code>__str__</code> 输出好看的矩阵格式。</p>

<h3>练习 3</h3>
<p>定义 <code>ShoppingCart</code> 类，实现 <code>__len__</code>（商品数量）、<code>__iter__</code>（遍历商品）、<code>__add__</code>（合并购物车）。</p>

<h3>练习 4</h3>
<p>定义 <code>Temperature</code> 类，实现 <code>__eq__</code>（相同温度相等）、<code>__lt__</code>（比较温度）、<code>__add__</code>（温度相加）。</p>
`
    }

);