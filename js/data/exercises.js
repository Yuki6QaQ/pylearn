/* ============================================================
   PyLearn 练习题数据（覆盖全部 36 节课）
   ============================================================ */

window.Exercises = {

    /* ============ 阶段 01 ============ */
    l01: [
        {
            title: '打印版本信息',
            desc: '用 print 输出任意一句话，例如你的名字。',
            code: '# 在这里写代码\n',
            answer: 'print("Hello, Python!")\n',
            check: { code: ['print'] }
        },
        {
            title: '数学运算',
            desc: '用 print 输出 <code>2 ** 10</code> 的结果。',
            code: 'print(\n',
            answer: 'print(2 ** 10)\n',
            check: ['1024']
        }
    ],

    l02: [
        {
            title: '自我介绍',
            desc: '用一条 print，输出你的姓名和年龄，中间用空格分隔。',
            code: 'print(\n',
            answer: 'print("Alice", 20)\n',
            check: { code: ['print'] }
        },
        {
            title: '计算表达式',
            desc: '用一条 print 输出 <code>1 + 2 + 3 + ... + 10</code> 的结果。',
            code: 'print(\n',
            answer: 'print(1+2+3+4+5+6+7+8+9+10)\n',
            check: ['55']
        }
    ],

    l03: [
        {
            title: '输出日期',
            desc: '导入 datetime 模块，用 print 输出今天的日期。',
            code: 'from datetime import date\n# 在这里写代码\n',
            answer: 'from datetime import date\nprint(date.today())\n',
            check: { code: ['print', 'date'] }
        }
    ],

    /* ============ 阶段 02 ============ */
    l04: [
        {
            title: '定义三个变量',
            desc: '定义 name、age、city 三个变量，分别赋值你的姓名、年龄、城市，然后打印。',
            code: 'name = \nage = \ncity = \nprint(name, age, city)\n',
            answer: 'name = "Alice"\nage = 20\ncity = "Beijing"\nprint(name, age, city)\n',
            check: { code: ['name', 'age', 'city', 'print'] }
        },
        {
            title: '交换两个变量',
            desc: '定义 a = 1，b = 2，交换它们的值，让最后 print 出来是 <code>2 1</code>。',
            code: 'a = 1\nb = 2\n# 交换 a 和 b\n\nprint(a, b)\n',
            answer: 'a = 1\nb = 2\na, b = b, a\nprint(a, b)\n',
            check: ['2 1']
        }
    ],

    l05: [
        {
            title: '类型转换',
            desc: '把字符串 "3.14" 转成 float，乘以 2 后打印结果。',
            code: 's = "3.14"\n# 转成 float，乘 2 后打印\n',
            answer: 's = "3.14"\nprint(float(s) * 2)\n',
            check: ['6.28']
        },
        {
            title: '判断真假',
            desc: '用 print 输出 <code>bool("")</code> 和 <code>bool("0")</code> 的结果。',
            code: 'print(\nprint(\n',
            answer: 'print(bool(""))\nprint(bool("0"))\n',
            check: ['False', 'True']
        }
    ],

    l06: [
        {
            title: '拆分三位数',
            desc: '给定 num = 456，分别输出百位、十位、个位数字。',
            code: 'num = 456\n# 分别输出百位、十位、个位\n',
            answer: 'num = 456\nprint(num // 100)\nprint(num // 10 % 10)\nprint(num % 10)\n',
            check: ['4', '5', '6']
        },
        {
            title: '秒数转换',
            desc: '给定秒数 total = 3725，转换成「时:分:秒」格式，打印 <code>1:2:5</code>。',
            code: 'total = 3725\n# 你的代码\n',
            answer: 'total = 3725\nh = total // 3600\nm = total % 3600 // 60\ns = total % 60\nprint(f"{h}:{m}:{s}")\n',
            check: ['1:2:5']
        }
    ],

    l07: [
        {
            title: '反转字符串',
            desc: '给定 s = "Python"，输出它的反转 "nohtyP"。',
            code: 's = "Python"\n# 输出反转后的字符串\n',
            answer: 's = "Python"\nprint(s[::-1])\n',
            check: ['nohtyP']
        },
        {
            title: '手机号打码',
            desc: '给定 phone = "13812345678"，把中间四位替换成 *，输出 <code>138****5678</code>。',
            code: 'phone = "13812345678"\n# 你的代码\n',
            answer: 'phone = "13812345678"\nprint(phone[:3] + "****" + phone[7:])\n',
            check: ['138****5678']
        }
    ],

    /* ============ 阶段 03 ============ */
    l08: [
        {
            title: '判断奇偶',
            desc: '给定 n = 7，判断它的奇偶性，输出 "奇数" 或 "偶数"。',
            code: 'n = 7\n# 你的代码\n',
            answer: 'n = 7\nif n % 2 == 0:\n    print("偶数")\nelse:\n    print("奇数")\n',
            check: ['奇数']
        },
        {
            title: '闰年判断',
            desc: '给定 year = 2024，判断是否是闰年，输出 "闰年" 或 "平年"。',
            code: 'year = 2024\n# 你的代码\n',
            answer: 'year = 2024\nif (year % 4 == 0 and year % 100 != 0) or year % 400 == 0:\n    print("闰年")\nelse:\n    print("平年")\n',
            check: ['闰年']
        }
    ],

    l09: [
        {
            title: '累加求和',
            desc: '用 while 循环计算 1 到 100 的和，并打印结果。',
            code: 'total = 0\ni = 1\n# 你的代码\n\nprint(total)\n',
            answer: 'total = 0\ni = 1\nwhile i <= 100:\n    total += i\n    i += 1\nprint(total)\n',
            check: ['5050']
        },
        {
            title: '反转数字',
            desc: '给定 n = 12345，用 while 循环反转它，输出 54321。',
            code: 'n = 12345\nreversed_n = 0\n# 你的代码\n\nprint(reversed_n)\n',
            answer: 'n = 12345\nreversed_n = 0\nwhile n > 0:\n    reversed_n = reversed_n * 10 + n % 10\n    n //= 10\nprint(reversed_n)\n',
            check: ['54321']
        }
    ],

    l10: [
        {
            title: '打印直角三角形',
            desc: '用 for 循环打印 5 行星星，每行逐渐增加一个 *。',
            code: '# 你的代码\n',
            answer: 'for i in range(1, 6):\n    print("*" * i)\n',
            check: ['*', '**', '***', '****', '*****']
        },
        {
            title: '元音统计',
            desc: '给定 text = "Hello World"，统计其中元音字母（aeiou，不区分大小写）的个数。',
            code: 'text = "Hello World"\ncount = 0\n# 你的代码\n\nprint(count)\n',
            answer: 'text = "Hello World"\ncount = 0\nfor ch in text.lower():\n    if ch in "aeiou":\n        count += 1\nprint(count)\n',
            check: ['3']
        }
    ],

    l11: [
        {
            title: '跳过偶数',
            desc: '遍历 1—10，跳过偶数，只打印奇数。',
            code: '# 你的代码\n',
            answer: 'for i in range(1, 11):\n    if i % 2 == 0:\n        continue\n    print(i)\n',
            check: ['1', '3', '5', '7', '9']
        },
        {
            title: '判断素数',
            desc: '给定 n = 17，判断是否是素数，输出 "素数" 或 "不是素数"。',
            code: 'n = 17\n# 你的代码\n',
            answer: 'n = 17\nif n < 2:\n    print("不是素数")\nelse:\n    is_prime = True\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            is_prime = False\n            break\n    print("素数" if is_prime else "不是素数")\n',
            check: ['素数']
        }
    ],

    /* ============ 阶段 04 ============ */
    l12: [
        {
            title: '列表统计',
            desc: '给定 nums = [3, 1, 4, 1, 5, 9, 2, 6]，输出最大值、最小值、平均值。',
            code: 'nums = [3, 1, 4, 1, 5, 9, 2, 6]\n# 你的代码\n',
            answer: 'nums = [3, 1, 4, 1, 5, 9, 2, 6]\nprint(max(nums))\nprint(min(nums))\nprint(sum(nums) / len(nums))\n',
            check: ['9', '1']
        },
        {
            title: '保序去重',
            desc: '给定列表 [3, 1, 3, 2, 1]，去掉重复元素并保持原顺序。',
            code: 'lst = [3, 1, 3, 2, 1]\n# 你的代码\n',
            answer: 'lst = [3, 1, 3, 2, 1]\nresult = list(dict.fromkeys(lst))\nprint(result)\n',
            check: ['3', '1', '2']
        }
    ],

    l13: [
        {
            title: '元组解包',
            desc: '给定元组 point = (3, 5)，解包成 x 和 y，分别打印。',
            code: 'point = (3, 5)\n# 你的代码\n',
            answer: 'point = (3, 5)\nx, y = point\nprint(x)\nprint(y)\n',
            check: ['3', '5']
        },
        {
            title: '返回多个值',
            desc: '写一个函数 min_max，接收一个列表，返回 (最小值, 最大值)。调用并打印。',
            code: 'def min_max(nums):\n    # 你的代码\n    pass\n\nprint(min_max([3, 1, 4, 1, 5]))\n',
            answer: 'def min_max(nums):\n    return min(nums), max(nums)\n\nprint(min_max([3, 1, 4, 1, 5]))\n',
            check: ['1', '5']
        }
    ],

    l14: [
        {
            title: '词频统计',
            desc: '给定文本 "apple banana apple cherry"，统计每个单词出现次数。',
            code: 'text = "apple banana apple cherry"\ncount = {}\n# 你的代码\n\nprint(count)\n',
            answer: 'text = "apple banana apple cherry"\ncount = {}\nfor word in text.split():\n    count[word] = count.get(word, 0) + 1\nprint(count)\n',
            check: ['apple', '2', 'banana', '1']
        },
        {
            title: '合并字典',
            desc: '把两个字典 a = {"x": 1} 和 b = {"y": 2} 合并成一个。',
            code: 'a = {"x": 1}\nb = {"y": 2}\n# 你的代码\n',
            answer: 'a = {"x": 1}\nb = {"y": 2}\nc = {**a, **b}\nprint(c)\n',
            check: ['x', 'y', '1', '2']
        }
    ],

    l15: [
        {
            title: '列表去重',
            desc: '用集合给 [1, 2, 2, 3, 3, 3] 去重。',
            code: 'lst = [1, 2, 2, 3, 3, 3]\n# 你的代码\n',
            answer: 'lst = [1, 2, 2, 3, 3, 3]\nprint(set(lst))\n',
            check: ['1', '2', '3']
        },
        {
            title: '共同元素',
            desc: '求两个集合 {1, 2, 3} 和 {2, 3, 4} 的交集。',
            code: 'a = {1, 2, 3}\nb = {2, 3, 4}\n# 你的代码\n',
            answer: 'a = {1, 2, 3}\nb = {2, 3, 4}\nprint(a & b)\n',
            check: ['2', '3']
        }
    ],

    l16: [
        {
            title: '偶数平方',
            desc: '用列表推导式，生成 1—10 中所有偶数的平方。',
            code: '# 你的代码\n',
            answer: 'result = [i ** 2 for i in range(1, 11) if i % 2 == 0]\nprint(result)\n',
            check: ['4', '16', '36', '64', '100']
        },
        {
            title: '转大写',
            desc: '用推导式把 ["hello", "world"] 转成 ["HELLO", "WORLD"]。',
            code: 'words = ["hello", "world"]\n# 你的代码\n',
            answer: 'words = ["hello", "world"]\nresult = [w.upper() for w in words]\nprint(result)\n',
            check: ['HELLO', 'WORLD']
        }
    ],

    /* ============ 阶段 05 ============ */
    l17: [
        {
            title: '判断素数函数',
            desc: '写一个函数 is_prime(n)，判断 n 是否是素数。',
            code: 'def is_prime(n):\n    # 你的代码\n    pass\n\nprint(is_prime(17))\nprint(is_prime(18))\n',
            answer: 'def is_prime(n):\n    if n < 2:\n        return False\n    for i in range(2, int(n ** 0.5) + 1):\n        if n % i == 0:\n            return False\n    return True\n\nprint(is_prime(17))\nprint(is_prime(18))\n',
            check: ['True', 'False']
        },
        {
            title: '阶乘函数',
            desc: '写一个函数 factorial(n)，返回 n 的阶乘（用循环实现）。',
            code: 'def factorial(n):\n    # 你的代码\n    pass\n\nprint(factorial(5))\n',
            answer: 'def factorial(n):\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nprint(factorial(5))\n',
            check: ['120']
        }
    ],

    l18: [
        {
            title: '默认参数',
            desc: '写函数 greet(name, greeting="你好")，返回 "你好，XXX"。',
            code: 'def greet(name, greeting="你好"):\n    # 你的代码\n    pass\n\nprint(greet("Alice"))\nprint(greet("Bob", "Hi"))\n',
            answer: 'def greet(name, greeting="你好"):\n    return f"{greeting}，{name}"\n\nprint(greet("Alice"))\nprint(greet("Bob", "Hi"))\n',
            check: ['你好，Alice', 'Hi，Bob']
        },
        {
            title: '可变参数',
            desc: '写函数 total(*nums)，返回所有数字的和。',
            code: 'def total(*nums):\n    # 你的代码\n    pass\n\nprint(total(1, 2, 3, 4, 5))\n',
            answer: 'def total(*nums):\n    return sum(nums)\n\nprint(total(1, 2, 3, 4, 5))\n',
            check: ['15']
        }
    ],

    l19: [
        {
            title: 'lambda 排序',
            desc: '用 sorted + lambda，把 ["banana", "apple", "cherry"] 按长度排序。',
            code: 'words = ["banana", "apple", "cherry"]\n# 你的代码\n',
            answer: 'words = ["banana", "apple", "cherry"]\nresult = sorted(words, key=lambda w: len(w))\nprint(result)\n',
            check: ['apple', 'banana', 'cherry']
        },
        {
            title: 'map 转换',
            desc: '用 map 把 ["1", "2", "3"] 转成整数列表。',
            code: 'strs = ["1", "2", "3"]\n# 你的代码\n',
            answer: 'strs = ["1", "2", "3"]\nresult = list(map(int, strs))\nprint(result)\n',
            check: ['1', '2', '3']
        }
    ],

    l20: [
        {
            title: '计时装饰器',
            desc: '写一个装饰器 timer，打印被装饰函数的运行耗时。',
            code: 'import time\n\ndef timer(func):\n    # 你的代码\n    pass\n\n@timer\ndef work():\n    time.sleep(0.1)\n\nwork()\n',
            answer: 'import time\n\ndef timer(func):\n    def wrapper(*args, **kwargs):\n        start = time.time()\n        result = func(*args, **kwargs)\n        print(f"耗时 {time.time() - start:.4f} 秒")\n        return result\n    return wrapper\n\n@timer\ndef work():\n    time.sleep(0.1)\n\nwork()\n',
            check: ['耗时']
        }
    ],

    /* ============ 阶段 06 ============ */
    l21: [
        {
            title: '数学计算',
            desc: '用 math 模块计算 16 的平方根，并保留 2 位小数。',
            code: 'import math\n# 你的代码\n',
            answer: 'import math\nprint(round(math.sqrt(16), 2))\n',
            check: ['4']
        },
        {
            title: '随机数',
            desc: '用 random 生成一个 1—100 之间的整数（结果随机，验证只需看到数字）。',
            code: 'import random\n# 你的代码\n',
            answer: 'import random\nprint(random.randint(1, 100))\n',
            check: { code: ['random', 'randint'] }
        }
    ],

    l22: [
        {
            title: '自定义函数模块',
            desc: '在当前文件里定义函数 add(a, b) 和 square(x)，调用它们。',
            code: 'def add(a, b):\n    # 你的代码\n    pass\n\ndef square(x):\n    # 你的代码\n    pass\n\nprint(add(3, 5))\nprint(square(4))\n',
            answer: 'def add(a, b):\n    return a + b\n\ndef square(x):\n    return x * x\n\nprint(add(3, 5))\nprint(square(4))\n',
            check: ['8', '16']
        }
    ],

    l23: [
        {
            title: '虚拟环境概念',
            desc: '写注释说明为什么需要虚拟环境（此练习不验证输出）。',
            code: '# 用注释写下你的理解\n',
            answer: '# 虚拟环境可以隔离不同项目的依赖，避免版本冲突\n',
            check: { code: ['#'] }
        }
    ],

    /* ============ 阶段 07 ============ */
    l24: [
        {
            title: '矩形类',
            desc: '定义 Rectangle 类，包含 width、height，提供 area() 和 perimeter() 方法。',
            code: 'class Rectangle:\n    def __init__(self, width, height):\n        # 你的代码\n        pass\n    \n    def area(self):\n        # 你的代码\n        pass\n    \n    def perimeter(self):\n        # 你的代码\n        pass\n\nr = Rectangle(4, 5)\nprint(r.area())\nprint(r.perimeter())\n',
            answer: 'class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n    \n    def area(self):\n        return self.width * self.height\n    \n    def perimeter(self):\n        return 2 * (self.width + self.height)\n\nr = Rectangle(4, 5)\nprint(r.area())\nprint(r.perimeter())\n',
            check: ['20', '18']
        },
        {
            title: '银行账户',
            desc: '定义 BankAccount 类，包含 owner、balance，支持 deposit 和 withdraw。',
            code: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        # 你的代码\n        pass\n    \n    def deposit(self, amount):\n        # 你的代码\n        pass\n    \n    def withdraw(self, amount):\n        # 你的代码\n        pass\n\nacc = BankAccount("Alice", 100)\nacc.deposit(50)\nacc.withdraw(30)\nprint(acc.balance)\n',
            answer: 'class BankAccount:\n    def __init__(self, owner, balance=0):\n        self.owner = owner\n        self.balance = balance\n    \n    def deposit(self, amount):\n        self.balance += amount\n    \n    def withdraw(self, amount):\n        self.balance -= amount\n\nacc = BankAccount("Alice", 100)\nacc.deposit(50)\nacc.withdraw(30)\nprint(acc.balance)\n',
            check: ['120']
        }
    ],

    l25: [
        {
            title: '继承 Animal',
            desc: '定义 Animal 基类和 Dog 子类，Dog 重写 speak() 方法。',
            code: 'class Animal:\n    def speak(self):\n        print("...")\n\nclass Dog(Animal):\n    # 你的代码\n    pass\n\nd = Dog()\nd.speak()\n',
            answer: 'class Animal:\n    def speak(self):\n        print("...")\n\nclass Dog(Animal):\n    def speak(self):\n        print("汪汪")\n\nd = Dog()\nd.speak()\n',
            check: ['汪汪']
        },
        {
            title: '多态',
            desc: '定义 Shape 基类，派生 Circle 和 Square，各自实现 area() 方法。',
            code: 'class Shape:\n    def area(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return 3.14 * self.r ** 2\n\nclass Square(Shape):\n    # 你的代码\n    pass\n\nshapes = [Circle(1), Square(2)]\nfor s in shapes:\n    print(round(s.area(), 2))\n',
            answer: 'class Shape:\n    def area(self):\n        pass\n\nclass Circle(Shape):\n    def __init__(self, r):\n        self.r = r\n    def area(self):\n        return 3.14 * self.r ** 2\n\nclass Square(Shape):\n    def __init__(self, side):\n        self.side = side\n    def area(self):\n        return self.side ** 2\n\nshapes = [Circle(1), Square(2)]\nfor s in shapes:\n    print(round(s.area(), 2))\n',
            check: ['3.14', '4']
        }
    ],

    l26: [
        {
            title: '__str__ 魔术方法',
            desc: '给 Book 类添加 __str__，让 print 输出 "《书名》— 作者"。',
            code: 'class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n    \n    # 添加 __str__ 方法\n\nb = Book("Python入门", "张三")\nprint(b)\n',
            answer: 'class Book:\n    def __init__(self, title, author):\n        self.title = title\n        self.author = author\n    \n    def __str__(self):\n        return f"《{self.title}》— {self.author}"\n\nb = Book("Python入门", "张三")\nprint(b)\n',
            check: ['《Python入门》', '张三']
        },
        {
            title: '__len__ 魔术方法',
            desc: '给 Playlist 类添加 __len__，让 len(p) 返回歌曲数量。',
            code: 'class Playlist:\n    def __init__(self, songs):\n        self.songs = songs\n    \n    # 添加 __len__ 方法\n\np = Playlist(["歌1", "歌2", "歌3"])\nprint(len(p))\n',
            answer: 'class Playlist:\n    def __init__(self, songs):\n        self.songs = songs\n    \n    def __len__(self):\n        return len(self.songs)\n\np = Playlist(["歌1", "歌2", "歌3"])\nprint(len(p))\n',
            check: ['3']
        }
    ],

    /* ============ 阶段 08 ============ */
    l27: [
        {
            title: '写字符串',
            desc: '用 print 输出两行内容（第一行 "Hello"，第二行 "World"）。',
            code: 'print(\nprint(\n',
            answer: 'print("Hello")\nprint("World")\n',
            check: ['Hello', 'World']
        },
        {
            title: '读取多行文本',
            desc: '给定多行字符串 text，用 splitlines() 拆成列表并打印。',
            code: 'text = "Hello\\nWorld\\nPython"\n# 你的代码\n',
            answer: 'text = "Hello\\nWorld\\nPython"\nprint(text.splitlines())\n',
            check: ['Hello', 'World', 'Python']
        }
    ],

    l28: [
        {
            title: '捕获异常',
            desc: '用 try/except 捕获 int("abc") 的 ValueError，打印 "转换失败"。',
            code: 'try:\n    # 你的代码\n    pass\nexcept:\n    pass\n',
            answer: 'try:\n    num = int("abc")\nexcept ValueError:\n    print("转换失败")\n',
            check: ['转换失败']
        },
        {
            title: 'finally 块',
            desc: '写 try/except/finally，无论是否出错都执行 finally 里的 print。',
            code: 'try:\n    print("尝试")\n    # 触发一个异常\nfinally:\n    # 你的代码\n    pass\n',
            answer: 'try:\n    print("尝试")\n    1 / 0\nexcept ZeroDivisionError:\n    print("除以零")\nfinally:\n    print("结束")\n',
            check: ['结束']
        }
    ],

    l29: [
        {
            title: '自定义异常',
            desc: '定义 NegativeError 异常，写函数 sqrt(n) 对负数抛异常。',
            code: 'class NegativeError(Exception):\n    pass\n\ndef sqrt(n):\n    # 你的代码\n    pass\n\ntry:\n    sqrt(-1)\nexcept NegativeError:\n    print("负数不能开方")\n',
            answer: 'class NegativeError(Exception):\n    pass\n\ndef sqrt(n):\n    if n < 0:\n        raise NegativeError()\n    return n ** 0.5\n\ntry:\n    sqrt(-1)\nexcept NegativeError:\n    print("负数不能开方")\n',
            check: ['负数不能开方']
        }
    ],

    /* ============ 阶段 09 ============ */
    l30: [
        {
            title: '路径拼接',
            desc: '用 os.path.join 拼接 "data" 和 "file.txt"。',
            code: 'import os\n# 你的代码\n',
            answer: 'import os\nprint(os.path.join("data", "file.txt"))\n',
            check: ['data', 'file.txt']
        },
        {
            title: '命令行参数',
            desc: '用 sys.argv 打印当前脚本名（此处为 "-c" 或其他，验证只需看到 sys 用法）。',
            code: 'import sys\n# 打印 sys.argv 的类型\n',
            answer: 'import sys\nprint(type(sys.argv))\nprint("sys imported")\n',
            check: ['list', 'sys imported']
        }
    ],

    l31: [
        {
            title: '时间格式化',
            desc: '用 datetime 输出当前年份。',
            code: 'from datetime import datetime\n# 你的代码\n',
            answer: 'from datetime import datetime\nprint(datetime.now().year)\n',
            check: { code: ['datetime', 'print'] }
        },
        {
            title: 'JSON 转换',
            desc: '把字典 {"name": "Alice"} 转成 JSON 字符串并打印。',
            code: 'import json\ndata = {"name": "Alice"}\n# 你的代码\n',
            answer: 'import json\ndata = {"name": "Alice"}\ns = json.dumps(data, ensure_ascii=False)\nprint(s)\n',
            check: ['name', 'Alice']
        }
    ],

    l32: [
        {
            title: '正则提取数字',
            desc: '用 re.findall 从 "abc123def456" 提取所有数字。',
            code: 'import re\ntext = "abc123def456"\n# 你的代码\n',
            answer: 'import re\ntext = "abc123def456"\nprint(re.findall(r"\\d+", text))\n',
            check: ['123', '456']
        },
        {
            title: '邮箱验证',
            desc: '用 re.fullmatch 验证 "alice@example.com" 是否是合法邮箱，输出 True。',
            code: 'import re\nemail = "alice@example.com"\n# 你的代码\n',
            answer: 'import re\nemail = "alice@example.com"\nprint(bool(re.fullmatch(r"[\\w.]+@[\\w.]+", email)))\n',
            check: ['True']
        }
    ],

    /* ============ 阶段 10 ============ */
    l33: [
        {
            title: '待办列表操作',
            desc: '用列表模拟待办：添加 "买菜"、"跑步"，然后打印列表。',
            code: 'todos = []\n# 你的代码\n',
            answer: 'todos = []\ntodos.append("买菜")\ntodos.append("跑步")\nprint(todos)\n',
            check: ['买菜', '跑步']
        },
        {
            title: '标记完成',
            desc: '把 todos 里的每一项从字符串变成 {"title": "xxx", "done": False} 结构。',
            code: 'titles = ["买菜", "跑步"]\ntodos = []\n# 你的代码\n\nprint(todos)\n',
            answer: 'titles = ["买菜", "跑步"]\ntodos = []\nfor t in titles:\n    todos.append({"title": t, "done": False})\nprint(todos)\n',
            check: ['title', 'done', 'False']
        }
    ],

    l34: [
        {
            title: '解析天气 JSON',
            desc: '给定一个天气字典，打印温度。',
            code: 'data = {"current": {"temp_C": "15", "humidity": "65"}}\n# 你的代码\n',
            answer: 'data = {"current": {"temp_C": "15", "humidity": "65"}}\nprint(data["current"]["temp_C"])\n',
            check: ['15']
        },
        {
            title: '温度判断',
            desc: '根据 temp 判断天气："冷"（<10）、"适中"（10-25）、"热"（>25）。',
            code: 'temp = 15\n# 你的代码\n',
            answer: 'temp = 15\nif temp < 10:\n    print("冷")\nelif temp <= 25:\n    print("适中")\nelse:\n    print("热")\n',
            check: ['适中']
        }
    ],

    l35: [
        {
            title: '正则提取链接',
            desc: '从一段 HTML 里提取所有 http 链接。',
            code: 'import re\nhtml = \'<a href="https://a.com">A</a><a href="https://b.com">B</a>\'\n# 你的代码\n',
            answer: 'import re\nhtml = \'<a href="https://a.com">A</a><a href="https://b.com">B</a>\'\nprint(re.findall(r"https?://[^\\"]+", html))\n',
            check: ['a.com', 'b.com']
        },
        {
            title: '解析标签文本',
            desc: '给定 HTML 片段，用切片提取文本 "Hello"。',
            code: 'html = "<p>Hello</p>"\n# 你的代码\n',
            answer: 'html = "<p>Hello</p>"\nimport re\nprint(re.sub(r"<[^>]+>", "", html))\n',
            check: ['Hello']
        }
    ],

    l36: [
        {
            title: '学生成绩统计',
            desc: '给定学生列表，计算平均分。',
            code: 'students = [\n    {"name": "Alice", "score": 88},\n    {"name": "Bob", "score": 92}\n]\n# 你的代码\n',
            answer: 'students = [\n    {"name": "Alice", "score": 88},\n    {"name": "Bob", "score": 92}\n]\navg = sum(s["score"] for s in students) / len(students)\nprint(avg)\n',
            check: ['90']
        },
        {
            title: '成绩排名',
            desc: '按分数从高到低排序学生列表，输出排名第一的名字。',
            code: 'students = [\n    {"name": "Alice", "score": 88},\n    {"name": "Bob", "score": 92},\n    {"name": "Charlie", "score": 72}\n]\n# 你的代码\n',
            answer: 'students = [\n    {"name": "Alice", "score": 88},\n    {"name": "Bob", "score": 92},\n    {"name": "Charlie", "score": 72}\n]\nranked = sorted(students, key=lambda s: s["score"], reverse=True)\nprint(ranked[0]["name"])\n',
            check: ['Bob']
        }
    ]

};