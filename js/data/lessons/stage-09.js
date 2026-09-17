window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l30', stage: '09', title: 'os 与 sys', desc: '与操作系统和解释器交互',
        content: `
<h2>os 模块：与操作系统交互</h2>

<h3>获取路径信息</h3>
~~~
import os

print(os.getcwd())              # 当前工作目录
print(os.listdir("."))          # 列出当前目录内容
print(os.listdir("/tmp"))       # 列出指定目录

# 路径判断
print(os.path.exists("test.txt"))     # 是否存在
print(os.path.isfile("test.txt"))     # 是否是文件
print(os.path.isdir("folder"))        # 是否是目录
~~~

<h3>路径拼接（重要）</h3>
~~~
# 不要这样写：Windows 用 \\，Linux 用 /，跨平台会出错
path = "data/" + "file.txt"

# 推荐：用 os.path.join
path = os.path.join("data", "file.txt")

# 或者用 pathlib
from pathlib import Path
path = Path("data") / "file.txt"
~~~

<h3>路径拆解</h3>
~~~
p = "/home/user/data/file.txt"
print(os.path.basename(p))    # file.txt
print(os.path.dirname(p))     # /home/user/data
print(os.path.splitext(p))    # ('/home/user/data/file', '.txt')
~~~

<h3>创建与删除</h3>
~~~
os.mkdir("newdir")                    # 创建单级目录
os.makedirs("a/b/c", exist_ok=True)   # 递归创建，存在不报错

os.rename("old.txt", "new.txt")       # 重命名

os.remove("file.txt")                 # 删除文件
os.rmdir("emptydir")                  # 删除空目录
import shutil
shutil.rmtree("dir")                  # 删除整个目录树
~~~

<h3>遍历目录</h3>
~~~
# 单层
for name in os.listdir("."):
    print(name)

# 递归遍历
for root, dirs, files in os.walk("."):
    for f in files:
        if f.endswith(".py"):
            full_path = os.path.join(root, f)
            print(full_path)
~~~

<h3>环境变量</h3>
~~~
print(os.environ.get("PATH"))
print(os.environ.get("HOME", "未设置"))
os.environ["MY_VAR"] = "hello"
~~~

<h3>执行系统命令（谨慎使用）</h3>
~~~
os.system("ls -l")     # 简单执行，不推荐

import subprocess
result = subprocess.run(["ls", "-l"], capture_output=True, text=True)
print(result.stdout)
~~~

<h2>sys 模块：与解释器交互</h2>
~~~
import sys

print(sys.version)         # Python 版本
print(sys.platform)        # 'win32' / 'linux' / 'darwin'
print(sys.executable)      # Python 解释器路径
print(sys.path)            # 模块搜索路径
print(sys.maxsize)         # 最大整数
~~~

<h3>命令行参数</h3>
~~~
# 保存为 greet.py，运行：python greet.py Alice 25
import sys

if len(sys.argv) > 1:
    name = sys.argv[1]
    age = sys.argv[2] if len(sys.argv) > 2 else "未知"
    print(f"你好 {name}，{age} 岁")
else:
    print("用法：python greet.py <name> [age]")
~~~
<p><code>sys.argv[0]</code> 是脚本名，后面的才是参数。</p>

<h3>退出程序</h3>
~~~
import sys
if error:
    sys.exit(1)     # 非零表示异常退出
sys.exit(0)         # 0 表示正常退出
~~~

<h3>重定向输出</h3>
~~~
import sys
sys.stdout.write("标准输出\\n")
sys.stderr.write("错误输出\\n")

# 修改默认输出
sys.stdout = open("log.txt", "w")
print("这行会写到文件")
~~~

<h2>pathlib：现代路径处理（推荐）</h2>
~~~
from pathlib import Path

p = Path("data") / "sub" / "file.txt"
print(p)              # data/sub/file.txt
print(p.name)         # file.txt
print(p.stem)         # file
print(p.suffix)       # .txt
print(p.parent)       # data/sub
print(p.exists())     # 是否存在

# 创建目录
p.parent.mkdir(parents=True, exist_ok=True)

# 读写文件
p.write_text("hello", encoding="utf-8")
content = p.read_text(encoding="utf-8")

# 遍历
for f in Path(".").glob("*.py"):
    print(f)

for f in Path(".").rglob("*.txt"):   # 递归
    print(f)
~~~

<h2>跨平台注意事项</h2>
<ul>
  <li>路径分隔符：用 <code>os.path.join</code> 或 <code>pathlib</code>，不要手写 <code>/</code> 或 <code>\\</code></li>
  <li>换行符：Windows 是 <code>\\r\\n</code>，Linux 是 <code>\\n</code>，写文本文件时加 <code>newline=""</code></li>
  <li>文件编码：显式指定 <code>encoding="utf-8"</code></li>
  <li>路径长度：Windows 有 260 字符限制</li>
</ul>

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>写脚本接收目录路径作为参数，列出其中所有 .py 文件。</p>

<h3>练习 2</h3>
<p>用 os.walk 统计一个目录下所有文件的总大小。</p>

<h3>练习 3</h3>
<p>用 pathlib 把一批文件批量重命名（加前缀）。</p>

<h3>练习 4</h3>
<p>写命令行工具：<code>python copy.py src dst</code>，把文件从 src 复制到 dst。</p>
`
    },
    {
        id: 'l31', stage: '09', title: 'datetime 与 json', desc: '时间处理与数据交换',
        content: `
<h2>datetime 基础</h2>
~~~
from datetime import datetime, date, time, timedelta

now = datetime.now()
print(now)                      # 2025-01-15 10:30:45.123456
print(now.year)                 # 2025
print(now.month)                # 1
print(now.day)                  # 15
print(now.hour, now.minute, now.second)
print(now.weekday())            # 0=周一，6=周日

today = date.today()
print(today)                    # 2025-01-15

t = time(14, 30, 0)
print(t)                        # 14:30:00
~~~

<h3>格式化与解析</h3>
~~~
now = datetime.now()
print(now.strftime("%Y-%m-%d %H:%M:%S"))
# 2025-01-15 10:30:45

s = "2025-01-15 10:30:00"
d = datetime.strptime(s, "%Y-%m-%d %H:%M:%S")
print(d.year)                   # 2025
~~~

<h3>常用格式符</h3>
<ul>
  <li><code>%Y</code> 四位年，<code>%y</code> 两位年</li>
  <li><code>%m</code> 月，<code>%d</code> 日</li>
  <li><code>%H</code> 24 小时制，<code>%I</code> 12 小时制</li>
  <li><code>%M</code> 分，<code>%S</code> 秒</li>
  <li><code>%A</code> 星期全名，<code>%a</code> 缩写</li>
  <li><code>%B</code> 月份全名，<code>%b</code> 缩写</li>
  <li><code>%p</code> AM/PM</li>
</ul>

<h3>时间计算</h3>
~~~
now = datetime.now()
tomorrow = now + timedelta(days=1)
last_week = now - timedelta(weeks=1)
in_2_hours = now + timedelta(hours=2)

delta = tomorrow - now
print(delta.days)             # 1
print(delta.total_seconds())  # 86400.0
~~~

<h3>时间戳</h3>
~~~
import time
ts = time.time()              # 当前 Unix 时间戳
print(ts)

dt = datetime.fromtimestamp(ts)
print(dt)

# datetime 转时间戳
ts2 = dt.timestamp()
~~~

<h3>时区（进阶）</h3>
~~~
from datetime import timezone, timedelta

# UTC 时间
utc_now = datetime.now(timezone.utc)
print(utc_now)

# 带时区
beijing = timezone(timedelta(hours=8))
bj_now = datetime.now(beijing)
print(bj_now)
~~~

<h2>json：数据交换标准</h2>
<p>JSON 是「JavaScript Object Notation」，已经成为跨语言的数据交换格式。Python 的 dict / list 可以直接转成 JSON 字符串。</p>

<h3>序列化：Python 对象 → JSON 字符串</h3>
~~~
import json

data = {
    "name": "Alice",
    "age": 25,
    "hobbies": ["reading", "coding"],
    "is_student": False,
    "score": None
}

s = json.dumps(data)
print(s)
# {"name": "Alice", "age": 25, "hobbies": ["reading", "coding"], ...}

# 美化输出
s = json.dumps(data, ensure_ascii=False, indent=2)
print(s)
~~~

<h3>反序列化：JSON 字符串 → Python 对象</h3>
~~~
s = '{"name": "Alice", "age": 25}'
obj = json.loads(s)
print(obj["name"])     # Alice
~~~

<h3>类型对应关系</h3>
<ul>
  <li>JSON object ↔ Python dict</li>
  <li>JSON array ↔ Python list</li>
  <li>JSON string ↔ Python str</li>
  <li>JSON number ↔ Python int / float</li>
  <li>JSON true/false ↔ Python True/False</li>
  <li>JSON null ↔ Python None</li>
</ul>

<h3>读写 JSON 文件</h3>
~~~
import json

data = {"users": [{"name": "Alice"}, {"name": "Bob"}]}

with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
print(loaded)
~~~

<p><b>ensure_ascii=False</b> 让中文正常显示，否则会变成 \\uXXXX 转义。</p>

<h3>处理不支持的类型</h3>
~~~
from datetime import datetime
import json

data = {"time": datetime.now()}
# json.dumps(data)   # TypeError：datetime 不可序列化

def default(o):
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(f"无法序列化 {type(o)}")

s = json.dumps(data, default=default)
print(s)
~~~

<h3>格式校验</h3>
~~~
bad = '{"name": "Alice",}'    # 多了一个逗号
try:
    json.loads(bad)
except json.JSONDecodeError as e:
    print(f"JSON 格式错误：{e}")
~~~

<h2>实战：配置文件读写</h2>
~~~
import json
from pathlib import Path

CONFIG_FILE = Path("config.json")

DEFAULT_CONFIG = {
    "theme": "dark",
    "font_size": 14,
    "auto_save": True
}

def load_config():
    if not CONFIG_FILE.exists():
        save_config(DEFAULT_CONFIG)
        return DEFAULT_CONFIG.copy()
    with open(CONFIG_FILE, encoding="utf-8") as f:
        return json.load(f)

def save_config(config):
    with open(CONFIG_FILE, "w", encoding="utf-8") as f:
        json.dump(config, f, ensure_ascii=False, indent=2)

config = load_config()
print(config)
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>用 json 保存待办列表到文件，读取后打印未完成项。</p>

<h3>练习 2</h3>
<p>计算你从出生到今天一共活了多少天。</p>

<h3>练习 3</h3>
<p>写程序每次运行都把当前时间追加到一个 JSON 数组，保留最近 10 次记录。</p>

<h3>练习 4</h3>
<p>把 Python 对象（含 datetime）序列化为 JSON，再反序列化回来。</p>
`
    },
    {
        id: 'l32', stage: '09', title: 'requests 与正则', desc: '网络请求与文本匹配',
        content: `
<h2>安装 requests</h2>
~~~
pip install requests
~~~

<h2>发起请求</h2>
~~~
import requests

r = requests.get("https://api.github.com")
print(r.status_code)         # 200
print(r.headers["content-type"])
print(r.text[:200])          # 响应文本
~~~

<h3>status_code 常见值</h3>
<ul>
  <li>200 OK 成功</li>
  <li>301 / 302 重定向</li>
  <li>400 请求错误</li>
  <li>401 未授权</li>
  <li>403 禁止访问</li>
  <li>404 页面不存在</li>
  <li>500 服务器错误</li>
</ul>

<h3>带参数</h3>
~~~
params = {"q": "python", "page": 1, "sort": "stars"}
r = requests.get("https://api.github.com/search/repositories", params=params)
print(r.url)
# https://api.github.com/search/repositories?q=python&page=1&sort=stars
~~~

<h3>解析 JSON 响应</h3>
~~~
r = requests.get("https://api.github.com/users/torvalds")
data = r.json()              # 直接转成字典
print(data["name"])
print(data["public_repos"])
print(data["followers"])
~~~

<h3>POST 请求</h3>
~~~
payload = {"username": "alice", "password": "123"}
r = requests.post("https://httpbin.org/post", json=payload)
print(r.json())
~~~

<h3>自定义请求头</h3>
~~~
headers = {
    "User-Agent": "Mozilla/5.0",
    "Authorization": "Bearer YOUR_TOKEN",
    "Accept": "application/json"
}
r = requests.get(url, headers=headers)
~~~

<h3>超时与异常</h3>
~~~
try:
    r = requests.get("https://example.com", timeout=5)
    r.raise_for_status()          # 非 2xx 抛异常
except requests.Timeout:
    print("请求超时")
except requests.ConnectionError:
    print("连接失败")
except requests.HTTPError as e:
    print(f"HTTP 错误：{e}")
except requests.RequestException as e:
    print(f"其他错误：{e}")
~~~

<h3>Session：保持会话</h3>
~~~
session = requests.Session()
session.headers.update({"User-Agent": "MyApp"})

# 多次请求共享 cookies 和 headers
session.get("https://example.com/login")
session.post("https://example.com/api", json={"key": "value"})
~~~

<h3>下载文件</h3>
~~~
r = requests.get("https://example.com/image.jpg", stream=True)
with open("image.jpg", "wb") as f:
    for chunk in r.iter_content(chunk_size=8192):
        f.write(chunk)
~~~

<h2>正则表达式 re</h2>
~~~
import re

text = "我的电话是 13812345678，邮箱是 alice@example.com"

# 查找所有匹配
phones = re.findall(r"1[3-9]\\d{9}", text)
print(phones)      # ['13812345678']

emails = re.findall(r"[\\w.]+@[\\w.]+", text)
print(emails)      # ['alice@example.com']

# 替换
masked = re.sub(r"1[3-9]\\d{9}", "***", text)
print(masked)

# 分割
parts = re.split(r"[,，]", "a,b，c")
print(parts)       # ['a', 'b', 'c']
~~~

<h3>匹配方法</h3>
~~~
print(re.match(r"\\d+", "123abc"))     # 从开头匹配，返回 Match 或 None
print(re.search(r"\\d+", "abc123"))    # 任意位置搜索
print(re.fullmatch(r"\\d+", "123"))    # 必须完全匹配

# Match 对象
m = re.search(r"(\\d{4})-(\\d{2})", "2025-01")
print(m.group(0))     # '2025-01'  完整匹配
print(m.group(1))     # '2025'     第一个分组
print(m.group(2))     # '01'       第二个分组
print(m.groups())     # ('2025', '01')
~~~

<h3>编译正则（多次使用时）</h3>
~~~
pattern = re.compile(r"\\d+")
print(pattern.findall("a1b22c333"))
# ['1', '22', '333']
~~~

<h3>常用正则符号</h3>
<ul>
  <li><code>\\d</code> 数字，<code>\\D</code> 非数字</li>
  <li><code>\\w</code> 字母数字下划线，<code>\\W</code> 非</li>
  <li><code>\\s</code> 空白，<code>\\S</code> 非空白</li>
  <li><code>.</code> 任意字符（除换行）</li>
  <li><code>^</code> 开头，<code>$</code> 结尾</li>
  <li><code>+</code> 一次或多次，<code>*</code> 零次或多次，<code>?</code> 零次或一次</li>
  <li><code>{3}</code> 恰好 3 次，<code>{2,5}</code> 2-5 次</li>
  <li><code>[]</code> 字符集合，如 <code>[abc]</code>、<code>[a-z]</code>、<code>[^0-9]</code></li>
  <li><code>()</code> 分组，<code>|</code> 或</li>
</ul>

<h3>贪婪 vs 非贪婪</h3>
~~~
text = "<a>1</a><a>2</a>"
print(re.findall(r"<a>.*</a>", text))    # ['<a>1</a><a>2</a>']  贪婪
print(re.findall(r"<a>.*?</a>", text))   # ['<a>1</a>', '<a>2</a>']  非贪婪
~~~

<h3>实用正则示例</h3>
~~~
# 手机号
r"^1[3-9]\\d{9}$"

# 邮箱
r"^[\\w.-]+@[\\w.-]+\\.\\w+$"

# 身份证（18 位）
r"^\\d{17}[\\dXx]$"

# IP 地址
r"^(\\d{1,3}\\.){3}\\d{1,3}$"

# 日期 YYYY-MM-DD
r"^\\d{4}-\\d{2}-\\d{2}$"

# URL
r"https?://[^\\s]+"
~~~

<h3>验证函数</h3>
~~~
def is_valid_phone(s):
    return bool(re.fullmatch(r"1[3-9]\\d{9}", s))

print(is_valid_phone("13812345678"))   # True
print(is_valid_phone("12345678901"))   # False
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>调用公开 API 获取数据，用正则从返回文本中提取所有邮箱。</p>

<h3>练习 2</h3>
<p>写函数验证手机号、邮箱、身份证格式。</p>

<h3>练习 3</h3>
<p>从一段 HTML 文本中提取所有链接。</p>

<h3>练习 4</h3>
<p>把一段文字里所有的日期（YYYY-MM-DD）替换成「[日期]」。</p>
`
    }

);