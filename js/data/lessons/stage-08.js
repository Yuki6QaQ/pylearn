window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l27', stage: '08', title: '文件读写', desc: 'open 与 with 上下文',
        content: `
<h2>读写文件的完整流程</h2>
<ol>
  <li>打开文件（open）</li>
  <li>读或写（read / write）</li>
  <li>关闭文件（close）</li>
</ol>

<h2>最推荐的写法：with</h2>
~~~
with open("test.txt", "w", encoding="utf-8") as f:
    f.write("Hello\\n")
    f.write("World\\n")
~~~
<p><code>with</code> 会在代码块结束时自动关闭文件，即使中途出错也不会泄漏资源。</p>

<h3>为什么不用 f = open()</h3>
~~~
# 危险写法：中间出错，f.close() 不会执行
f = open("test.txt", "r")
content = f.read()
f.close()
~~~
<p>文件句柄是系统资源，不释放会导致「文件被占用」「句柄耗尽」等问题。永远用 with。</p>

<h2>打开模式</h2>
<ul>
  <li><code>"r"</code> 只读（默认，文件必须存在）</li>
  <li><code>"w"</code> 写入（文件存在则清空）</li>
  <li><code>"a"</code> 追加（在末尾添加）</li>
  <li><code>"x"</code> 独占创建（文件已存在则报错）</li>
  <li><code>"r+"</code> 读写（从开头）</li>
  <li><code>"b"</code> 二进制模式，如 <code>"rb"</code>、<code>"wb"</code></li>
</ul>

<h3>w 模式会清空文件</h3>
~~~
with open("test.txt", "w") as f:
    f.write("新的内容")   # 原来的内容全没了
~~~

<h3>a 模式追加</h3>
~~~
with open("test.txt", "a", encoding="utf-8") as f:
    f.write("新加的一行\\n")
~~~

<h2>读取文件</h2>

<h3>1. 一次读全部</h3>
~~~
with open("test.txt", "r", encoding="utf-8") as f:
    content = f.read()
    print(content)
~~~

<h3>2. 按行读取（推荐，大文件友好）</h3>
~~~
with open("test.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
~~~
<p>文件对象本身就是可迭代的，逐行读不会一次性加载整个文件到内存。</p>

<h3>3. 一次读成列表</h3>
~~~
with open("test.txt", "r", encoding="utf-8") as f:
    lines = f.readlines()
    # lines = ['Hello\\n', 'World\\n']
~~~

<h3>4. 读指定大小</h3>
~~~
with open("test.txt", "r", encoding="utf-8") as f:
    chunk = f.read(10)     # 读 10 个字符
~~~

<h2>写入文件</h2>
~~~
# 覆盖写入
with open("output.txt", "w", encoding="utf-8") as f:
    f.write("第一行\\n")
    f.write("第二行\\n")

# 一次写多行
lines = ["line1\\n", "line2\\n", "line3\\n"]
with open("output.txt", "w", encoding="utf-8") as f:
    f.writelines(lines)
~~~

<h2>路径处理</h2>
~~~
import os

# 用 os.path.join 拼接，跨平台安全
path = os.path.join("data", "file.txt")
with open(path, "w") as f:
    f.write("hi")

# 用 pathlib（更现代）
from pathlib import Path
p = Path("data") / "file.txt"
p.parent.mkdir(exist_ok=True)   # 确保目录存在
with open(p, "w") as f:
    f.write("hi")
~~~

<h2>encoding 的重要性</h2>
<p>Windows 中文版默认用 GBK 编码，Linux/macOS 默认 UTF-8。跨平台读写文本文件时，<b>务必指定 <code>encoding="utf-8"</code></b>：</p>
~~~
# 不指定时，在 Windows 上可能乱码
with open("data.txt", "w") as f:
    f.write("中文")

# 推荐写法
with open("data.txt", "w", encoding="utf-8") as f:
    f.write("中文")
~~~

<h2>处理 CSV 文件</h2>
~~~
import csv

# 写入
rows = [
    ["姓名", "年龄", "城市"],
    ["Alice", 25, "Beijing"],
    ["Bob", 30, "Shanghai"]
]
with open("people.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerows(rows)

# 读取
with open("people.csv", "r", encoding="utf-8") as f:
    for row in csv.reader(f):
        print(row)
~~~
<p><code>newline=""</code> 是官方推荐，避免 Windows 上出现空行。</p>

<h3>用 DictReader / DictWriter</h3>
~~~
with open("people.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.DictWriter(f, fieldnames=["name", "age"])
    writer.writeheader()
    writer.writerow({"name": "Alice", "age": 25})

with open("people.csv", "r", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        print(row["name"], row["age"])
~~~

<h2>读写 JSON 文件</h2>
~~~
import json

data = {"name": "Alice", "hobbies": ["reading", "coding"]}

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded)
~~~

<h2>处理文件不存在的情况</h2>
~~~
try:
    with open("missing.txt", "r") as f:
        content = f.read()
except FileNotFoundError:
    print("文件不存在，创建空文件")
    with open("missing.txt", "w") as f:
        pass

# 或先判断
import os
if os.path.exists("data.txt"):
    with open("data.txt") as f:
        print(f.read())
~~~

<h2>大文件的处理</h2>
~~~
# 错误：一次读整个大文件
with open("huge.log", "r") as f:
    content = f.read()    # 可能撑爆内存

# 正确：逐行处理
with open("huge.log", "r", encoding="utf-8") as f:
    for line in f:
        if "ERROR" in line:
            print(line.strip())
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>把用户输入的多行文字保存到文件，再读出来打印。</p>

<h3>练习 2</h3>
<p>统计一个文本文件有多少行、多少个单词、多少个字符。</p>

<h3>练习 3</h3>
<p>读取一个 CSV 文件，计算某一列的平均值。</p>

<h3>练习 4</h3>
<p>把一个字典保存成 JSON，再读回来打印，验证内容一致。</p>

<h3>练习 5</h3>
<p>写一个程序：把 <code>input.txt</code> 的每一行加上行号后写入 <code>output.txt</code>。</p>
`
    },
    {
        id: 'l28', stage: '08', title: '异常处理', desc: 'try / except / finally',
        content: `
<h2>为什么需要异常处理</h2>
~~~
num = int(input("输入一个数字："))
print(10 / num)
~~~
<p>如果用户输入 "abc"，会抛出 <code>ValueError</code> 并终止程序；如果输入 0，会抛 <code>ZeroDivisionError</code>。异常处理让我们能优雅地应对。</p>

<h2>基本结构</h2>
~~~
try:
    num = int(input("输入一个数字："))
    print(10 / num)
except ValueError:
    print("输入的不是数字")
except ZeroDivisionError:
    print("不能除以零")
~~~

<h3>执行流程</h3>
<ol>
  <li>执行 try 块的代码</li>
  <li>没异常：跳过所有 except，继续往下</li>
  <li>有异常：按 except 顺序匹配，命中就执行对应块</li>
  <li>没有匹配的 except：异常继续向上抛，程序崩溃</li>
</ol>

<h2>捕获多种异常</h2>
~~~
try:
    data = [1, 2, 3]
    print(data[10])
except IndexError as e:
    print(f"索引越界：{e}")

# 一次捕获多个
try:
    risky()
except (ValueError, TypeError) as e:
    print(f"出错了：{e}")
~~~

<h2>捕获所有异常</h2>
~~~
try:
    risky()
except Exception as e:
    print(f"未知错误：{e}")
    # 通常还要记日志
    import logging
    logging.exception("发生异常")
~~~
<p><b>谨慎使用！</b>过于宽泛会掩盖真正的 bug。只在你真的能处理所有情况时用。</p>

<h2>else 与 finally</h2>
~~~
try:
    f = open("data.txt", "r", encoding="utf-8")
except FileNotFoundError:
    print("文件不存在")
else:
    print("读取成功")     # 没异常才执行
    content = f.read()
    f.close()
finally:
    print("无论如何都执行")  # 常用于释放资源
~~~

<h3>典型场景</h3>
<ul>
  <li><code>else</code>：只在无异常时执行，让 try 块尽量小</li>
  <li><code>finally</code>：无论是否异常都执行，用于清理资源</li>
</ul>

<h2>主动抛出异常</h2>
~~~
def set_age(age):
    if not isinstance(age, int):
        raise TypeError("年龄必须是整数")
    if age < 0 or age > 150:
        raise ValueError(f"年龄 {age} 不合理")
    return age

set_age(-1)   # ValueError: 年龄 -1 不合理
~~~

<h3>重新抛出</h3>
~~~
try:
    risky()
except ValueError as e:
    print("记录日志")
    raise     # 继续往上抛，让上层处理
~~~

<h2>常见内置异常</h2>
<ul>
  <li><code>ValueError</code> 值不合适，如 <code>int("abc")</code></li>
  <li><code>TypeError</code> 类型错误，如 <code>"a" + 1</code></li>
  <li><code>KeyError</code> 字典键不存在</li>
  <li><code>IndexError</code> 列表索引越界</li>
  <li><code>AttributeError</code> 属性/方法不存在</li>
  <li><code>FileNotFoundError</code> 文件不存在</li>
  <li><code>ZeroDivisionError</code> 除以零</li>
  <li><code>ImportError</code> / <code>ModuleNotFoundError</code> 导入失败</li>
  <li><code>PermissionError</code> 权限不足</li>
</ul>

<h2>EAFP vs LBYL</h2>
~~~
# LBYL: Look Before You Leap（先检查）
import os
if os.path.exists("data.txt"):
    with open("data.txt") as f:
        content = f.read()
else:
    content = ""

# EAFP: Easier to Ask Forgiveness than Permission（Python 风格）
try:
    with open("data.txt") as f:
        content = f.read()
except FileNotFoundError:
    content = ""
~~~
<p>Python 社区更推荐 EAFP，原因：</p>
<ul>
  <li>避免竞态条件（检查到打开之间文件可能被删）</li>
  <li>性能更好（无异常时没有额外判断开销）</li>
  <li>代码更简洁</li>
</ul>

<h2>自定义异常</h2>
~~~
class InsufficientBalanceError(Exception):
    """余额不足"""
    pass

class BankAccount:
    def __init__(self, balance):
        self.balance = balance

    def withdraw(self, amount):
        if amount > self.balance:
            raise InsufficientBalanceError(f"余额 {self.balance} 不足支付 {amount}")
        self.balance -= amount

acc = BankAccount(100)
try:
    acc.withdraw(500)
except InsufficientBalanceError as e:
    print(e)
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>写一个安全的除法函数，处理「输入非数字」和「除数为零」两种情况。</p>

<h3>练习 2</h3>
<p>写函数读取用户指定的文件，文件不存在时给出友好提示。</p>

<h3>练习 3</h3>
<p>写程序循环让用户输入数字，输入 q 退出，非数字时提示重输。</p>

<h3>练习 4</h3>
<p>用 try/except/else/finally 完整处理一个文件读取流程，观察各块的执行顺序。</p>
`
    },
    {
        id: 'l29', stage: '08', title: '自定义异常与上下文管理器', desc: 'raise 与 with 的背后',
        content: `
<h2>为什么要自定义异常</h2>
<p>内置异常（ValueError、TypeError 等）只说明「出了什么类型的错」，不说明业务上发生了什么。自定义异常可以让错误语义更清晰：</p>
~~~
class InsufficientBalanceError(Exception):
    """余额不足"""
    pass

class AccountFrozenError(Exception):
    """账户被冻结"""
    pass

def withdraw(account, amount):
    if account["frozen"]:
        raise AccountFrozenError("账户已冻结")
    if amount > account["balance"]:
        raise InsufficientBalanceError(f"需要 {amount}，只有 {account['balance']}")
    account["balance"] -= amount
~~~
<p>调用方可以精确地处理每一种业务错误：</p>
~~~
try:
    withdraw({"balance": 100, "frozen": False}, 500)
except InsufficientBalanceError:
    print("请先充值")
except AccountFrozenError:
    print("请联系客服")
~~~

<h2>异常继承体系</h2>
<p>把相关的异常组织成一棵树，调用方可以捕获整个类别：</p>
~~~
class AppError(Exception):
    """所有应用异常的基类"""
    pass

class NetworkError(AppError):
    pass

class TimeoutError(NetworkError):
    pass

class ParseError(AppError):
    pass

# 捕获整个体系
try:
    ...
except AppError as e:
    print(f"应用错误：{e}")

# 也可以精确捕获子类
try:
    ...
except TimeoutError:
    print("请求超时")
~~~

<h2>带额外信息的异常</h2>
~~~
class ValidationError(Exception):
    def __init__(self, field, message):
        self.field = field
        self.message = message
        super().__init__(f"[{field}] {message}")

try:
    raise ValidationError("email", "格式不正确")
except ValidationError as e:
    print(e.field)      # email
    print(e.message)    # 格式不正确
    print(str(e))       # [email] 格式不正确
~~~

<h2>上下文管理器：with 的背后</h2>
<p>任何实现了 <code>__enter__</code> 和 <code>__exit__</code> 的对象都能用在 with 里：</p>
~~~
class Timer:
    def __enter__(self):
        import time
        self.start = time.time()
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        import time
        print(f"耗时 {time.time() - self.start:.4f} 秒")
        return False
~~~

<h3>__exit__ 的参数</h3>
<ul>
  <li><code>exc_type</code>：异常类型，无异常时是 None</li>
  <li><code>exc_val</code>：异常实例</li>
  <li><code>exc_tb</code>：traceback 对象</li>
</ul>
<p><b>返回 True</b> 表示异常已处理，不再往外抛；返回 False 或 None 会继续传播。</p>

<h3>用异常处理示例</h3>
~~~
class SafeOpen:
    def __init__(self, filename):
        self.filename = filename

    def __enter__(self):
        self.f = open(self.filename, "r", encoding="utf-8")
        return self.f

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.f.close()
        if exc_type is not None:
            print(f"发生异常：{exc_val}")
            return True    # 吞掉异常，不往外抛
        return False

with SafeOpen("missing.txt") as f:
    content = f.read()
print("程序继续执行")
~~~

<h2>contextlib：简化上下文管理器</h2>
~~~
from contextlib import contextmanager

@contextmanager
def tag(name):
    print(f"<{name}>")
    try:
        yield
    finally:
        print(f"</{name}>")

with tag("div"):
    print("内容")
# <div>
# 内容
# </div>
~~~

<h3>带返回值的上下文管理器</h3>
~~~
@contextmanager
def open_file(path, mode="r"):
    f = open(path, mode, encoding="utf-8")
    try:
        yield f          # yield 的值就是 as 后面拿到的
    finally:
        f.close()

with open_file("data.txt") as f:
    print(f.read())
~~~

<h3>计时器</h3>
~~~
import time
from contextlib import contextmanager

@contextmanager
def timed(label="耗时"):
    start = time.time()
    try:
        yield
    finally:
        print(f"{label}：{time.time() - start:.4f} 秒")

with timed("求和"):
    sum(range(1000000))
~~~

<h2>其他实用上下文管理器</h2>

<h3>contextlib.suppress：忽略指定异常</h3>
~~~
from contextlib import suppress
import os

with suppress(FileNotFoundError):
    os.remove("missing.txt")
# 文件不存在也不报错
~~~

<h3>contextlib.redirect_stdout：重定向输出</h3>
~~~
from contextlib import redirect_stdout
import io

buf = io.StringIO()
with redirect_stdout(buf):
    print("这行不会显示到屏幕")

print("捕获的内容：", buf.getvalue().strip())
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>定义 <code>NegativeNumberError</code>，写一个求平方根的函数，遇到负数抛异常并捕获。</p>

<h3>练习 2</h3>
<p>用 <code>@contextmanager</code> 写一个 <code>timed()</code>，统计代码块耗时。</p>

<h3>练习 3</h3>
<p>写一个 <code>Database</code> 类，<code>__enter__</code> 打开连接，<code>__exit__</code> 关闭连接。</p>

<h3>练习 4</h3>
<p>设计一个异常体系：<code>AppError</code> 基类，派生 <code>DatabaseError</code>、<code>NetworkError</code>，各自再派生子类。</p>
`
    }

);