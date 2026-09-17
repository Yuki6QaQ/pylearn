window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l33', stage: '10', title: '项目一：待办事项 CLI', desc: '增删改查 + 文件持久化',
        content: `
<h2>需求分析</h2>
<p>做一个命令行待办工具，支持：</p>
<ul>
  <li>查看所有待办</li>
  <li>添加新待办</li>
  <li>标记完成为完成</li>
  <li>删除待办</li>
  <li>数据保存到 JSON 文件，重启不丢</li>
</ul>

<h2>完整代码</h2>
~~~
import json
import os

FILE = "todos.json"

def load():
    """读取待办列表"""
    if not os.path.exists(FILE):
        return []
    try:
        with open(FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except json.JSONDecodeError:
        print("数据文件损坏，已重置")
        return []

def save(todos):
    """保存待办列表"""
    with open(FILE, "w", encoding="utf-8") as f:
        json.dump(todos, f, ensure_ascii=False, indent=2)

def show(todos):
    """显示所有待办"""
    if not todos:
        print("暂无待办")
        return
    print("\\n" + "=" * 40)
    for i, t in enumerate(todos, 1):
        mark = "✓" if t["done"] else " "
        print(f"  {i}. [{mark}] {t['title']}")
    print("=" * 40)

def get_index(todos, prompt="输入编号："):
    """获取用户输入的编号，返回 0-based 索引，失败返回 None"""
    try:
        idx = int(input(prompt)) - 1
        if 0 <= idx < len(todos):
            return idx
        print("编号超出范围")
        return None
    except ValueError:
        print("请输入数字")
        return None

def main():
    todos = load()
    menu = """
1. 查看待办
2. 添加待办
3. 标记完成
4. 删除待办
5. 退出
"""
    while True:
        print(menu)
        choice = input("请选择：").strip()

        if choice == "1":
            show(todos)

        elif choice == "2":
            title = input("输入待办内容：").strip()
            if title:
                todos.append({"title": title, "done": False})
                save(todos)
                print("✓ 已添加")
            else:
                print("内容不能为空")

        elif choice == "3":
            show(todos)
            idx = get_index(todos)
            if idx is not None:
                todos[idx]["done"] = True
                save(todos)
                print("✓ 已完成")

        elif choice == "4":
            show(todos)
            idx = get_index(todos)
            if idx is not None:
                removed = todos.pop(idx)
                save(todos)
                print(f"✓ 已删除：{removed['title']}")

        elif choice == "5":
            print("再见！")
            break

        else:
            print("无效选项，请重新选择")

if __name__ == "__main__":
    main()
~~~

<h2>代码拆解</h2>

<h3>数据结构</h3>
~~~
{
    "title": "学习 Python",
    "done": false
}
~~~
<p>用列表存多条，每条是一个字典。这种嵌套结构在真实项目中非常常见。</p>

<h3>持久化</h3>
<p>load / save 函数各司其职，每次修改后立即保存，保证数据不丢。</p>

<h3>错误处理</h3>
<ul>
  <li>文件不存在：返回空列表</li>
  <li>文件损坏：捕获 JSONDecodeError</li>
  <li>输入非数字：捕获 ValueError</li>
  <li>编号越界：返回 None 让调用方处理</li>
</ul>

<h2>用到的知识点</h2>
<ul>
  <li>列表与字典的增删改查</li>
  <li>json 读写文件做持久化</li>
  <li>os.path.exists 判断文件</li>
  <li>while 循环 + 分支处理菜单</li>
  <li>enumerate 输出编号</li>
  <li>try/except 处理非法输入</li>
  <li>函数封装（load、save、show、get_index）</li>
  <li>__name__ == "__main__"</li>
</ul>

<h2>重构：面向对象版本</h2>
<p>把过程式代码重构成面向对象，职责更清晰：</p>
~~~
import json
import os

class TodoApp:
    def __init__(self, file="todos.json"):
        self.file = file
        self.todos = self.load()

    def load(self):
        if not os.path.exists(self.file):
            return []
        try:
            with open(self.file, "r", encoding="utf-8") as f:
                return json.load(f)
        except json.JSONDecodeError:
            return []

    def save(self):
        with open(self.file, "w", encoding="utf-8") as f:
            json.dump(self.todos, f, ensure_ascii=False, indent=2)

    def add(self, title):
        self.todos.append({"title": title, "done": False})
        self.save()

    def complete(self, index):
        if 0 <= index < len(self.todos):
            self.todos[index]["done"] = True
            self.save()

    def delete(self, index):
        if 0 <= index < len(self.todos):
            self.todos.pop(index)
            self.save()

    def show(self):
        for i, t in enumerate(self.todos, 1):
            mark = "✓" if t["done"] else " "
            print(f"{i}. [{mark}] {t['title']}")

    def run(self):
        while True:
            # 菜单逻辑
            pass

if __name__ == "__main__":
    TodoApp().run()
~~~

<h2>进阶挑战</h2>
<ul>
  <li>增加「按状态筛选」功能（只看未完成）</li>
  <li>增加截止日期字段并按日期排序</li>
  <li>用 <code>rich</code> 库美化输出（彩色、表格）</li>
  <li>改用 <code>argparse</code> 支持命令行参数：<code>python todo.py add "买牛奶"</code></li>
  <li>增加优先级字段（高/中/低）</li>
  <li>支持编辑已有待办</li>
</ul>

<h2>动手练习</h2>
<ol>
  <li>完整敲一遍上面的代码，跑起来</li>
  <li>加上「删除全部已完成」功能</li>
  <li>把 TodoApp 改造成类版本</li>
  <li>写单元测试（pytest）验证 add、complete、delete 的正确性</li>
</ol>
`
    },
    {
        id: 'l34', stage: '10', title: '项目二：天气查询', desc: 'API + JSON 解析',
        content: `
<h2>需求</h2>
<p>输入城市名，调用公开天气 API，输出当前温度和天气状况。</p>

<h3>选择 API</h3>
<p>本示例使用无需 Key 的 <b>wttr.in</b>，适合学习：</p>
~~~
https://wttr.in/Beijing?format=j1
~~~

<h3>先手动看接口返回什么</h3>
<p>浏览器里直接访问上面这个 URL，会看到一大段 JSON。找到结构：</p>
~~~
{
  "current_condition": [
    {
      "temp_C": "15",
      "FeelsLikeC": "14",
      "humidity": "65",
      "weatherDesc": [{"value": "Partly cloudy"}]
    }
  ],
  ...
}
~~~

<h2>完整代码</h2>
~~~
import requests

def get_weather(city):
    """查询城市天气"""
    url = f"https://wttr.in/{city}?format=j1"

    try:
        r = requests.get(url, timeout=8)
        r.raise_for_status()
    except requests.Timeout:
        return "请求超时，请检查网络"
    except requests.RequestException as e:
        return f"请求失败：{e}"

    try:
        data = r.json()
        current = data["current_condition"][0]
    except (KeyError, IndexError, ValueError) as e:
        return f"解析数据失败：{e}"

    return {
        "city": city,
        "temp": current["temp_C"],
        "feels_like": current["FeelsLikeC"],
        "desc": current["weatherDesc"][0]["value"],
        "humidity": current["humidity"]
    }


def format_weather(info):
    """格式化输出"""
    if isinstance(info, str):
        return info
    return (
        f"\\n城市：{info['city']}\\n"
        f"温度：{info['temp']}°C（体感 {info['feels_like']}°C）\\n"
        f"天气：{info['desc']}\\n"
        f"湿度：{info['humidity']}%"
    )


def main():
    print("简易天气查询（输入 q 退出）")
    while True:
        city = input("\\n请输入城市名（支持英文）：").strip()
        if city.lower() == "q":
            print("再见！")
            break
        if not city:
            continue
        result = get_weather(city)
        print(format_weather(result))


if __name__ == "__main__":
    main()
~~~

<h2>代码拆解</h2>

<h3>1. 请求部分</h3>
<ul>
  <li><b>f-string 拼 URL</b>：把城市名嵌入地址</li>
  <li><b>timeout=8</b>：防止请求无限等待</li>
  <li><b>raise_for_status</b>：状态码非 2xx 主动抛异常</li>
  <li><b>分开捕获 Timeout 和 RequestException</b>：给用户更准确的提示</li>
</ul>

<h3>2. 解析部分</h3>
<ul>
  <li><b>逐层索引</b>：<code>data["current_condition"][0]["temp_C"]</code></li>
  <li><b>捕获 KeyError</b>：接口返回结构可能变化</li>
  <li><b>捕获 IndexError</b>：列表可能为空</li>
</ul>

<h3>3. 展示部分</h3>
<p>把数据收集和展示分开，方便以后改成图形界面或网页。</p>

<h2>如何读懂陌生 API</h2>
<ol>
  <li>先访问接口地址，在浏览器里看返回的 JSON</li>
  <li>用 <code>json.dumps(data, indent=2)</code> 格式化，结构一目了然</li>
  <li>找到你要的字段，写出它的完整路径</li>
  <li>用 <code>print(type(field))</code> 确认类型</li>
  <li>加 try/except 兜底</li>
</ol>

<h2>面向对象重构</h2>
~~~
import requests
import json

class WeatherApp:
    BASE = "https://wttr.in"

    def __init__(self):
        self.history = []

    def query(self, city):
        url = f"{self.BASE}/{city}?format=j1"
        try:
            r = requests.get(url, timeout=8)
            r.raise_for_status()
            data = r.json()
            info = self._parse(city, data)
            self.history.append(info)
            return info
        except requests.RequestException as e:
            return {"error": str(e)}

    def _parse(self, city, data):
        c = data["current_condition"][0]
        return {
            "city": city,
            "temp": c["temp_C"],
            "feels_like": c["FeelsLikeC"],
            "desc": c["weatherDesc"][0]["value"],
            "humidity": c["humidity"]
        }

    def show(self, info):
        if "error" in info:
            print(f"查询失败：{info['error']}")
            return
        print(f"\\n{info['city']}")
        print(f"  {info['temp']}°C  体感 {info['feels_like']}°C")
        print(f"  {info['desc']}  湿度 {info['humidity']}%")

    def run(self):
        while True:
            city = input("城市（q 退出）：").strip()
            if city.lower() == "q":
                break
            if city:
                self.show(self.query(city))
~~~

<h2>进阶挑战</h2>
<ul>
  <li>把查询历史保存到 JSON 文件</li>
  <li>支持多个城市批量查询</li>
  <li>用 <code>rich</code> 给不同温度加颜色（高温红、低温蓝）</li>
  <li>加缓存：同一城市 5 分钟内不重复请求</li>
  <li>加命令行参数支持：<code>python weather.py Beijing</code></li>
</ul>

<h2>动手练习</h2>
<ol>
  <li>完整敲一遍代码，查询你所在的城市</li>
  <li>把当前的温度判断成「冷/适中/热」并输出</li>
  <li>把查询结果保存到 JSON 文件</li>
  <li>加上缓存机制</li>
</ol>
`
    },
    {
        id: 'l35', stage: '10', title: '项目三：网页爬虫入门', desc: 'requests + BeautifulSoup',
        content: `
<h2>安装依赖</h2>
~~~
pip install requests beautifulsoup4
~~~

<h2>爬虫的基本流程</h2>
<ol>
  <li><b>请求</b>：用 requests 拿到网页 HTML 源码</li>
  <li><b>解析</b>：用 BeautifulSoup 把 HTML 转成可查询的树</li>
  <li><b>提取</b>：按标签、类名、CSS 选择器找到目标数据</li>
  <li><b>保存</b>：写入 CSV / JSON / 数据库</li>
</ol>

<h2>完整示例：抓取书籍列表</h2>
<p>我们抓取 <b>books.toscrape.com</b>（一个专门供练习爬虫的网站）。</p>

~~~
import requests
from bs4 import BeautifulSoup
import csv
import time

BASE_URL = "http://books.toscrape.com/"

def fetch(url):
    """请求页面，返回 HTML 文本"""
    headers = {"User-Agent": "Mozilla/5.0 (学习爬虫)"}
    r = requests.get(url, headers=headers, timeout=10)
    r.raise_for_status()
    r.encoding = r.apparent_encoding    # 自动识别编码
    return r.text

def parse(html):
    """解析 HTML，提取书籍信息"""
    soup = BeautifulSoup(html, "html.parser")
    books = []

    for item in soup.select("article.product_pod"):
        title = item.select_one("h3 a")["title"]
        price = item.select_one(".price_color").text
        in_stock = item.select_one(".instock.availability").text.strip()
        books.append({
            "title": title,
            "price": price,
            "stock": in_stock
        })

    return books

def save_csv(books, filename="books.csv"):
    with open(filename, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(f, fieldnames=["title", "price", "stock"])
        writer.writeheader()
        writer.writerows(books)

def crawl_all(max_pages=3):
    """翻页抓取多页"""
    all_books = []
    for page in range(1, max_pages + 1):
        url = f"{BASE_URL}catalogue/page-{page}.html"
        print(f"抓取 {url}")
        try:
            html = fetch(url)
            books = parse(html)
            all_books.extend(books)
            time.sleep(1)      # 礼貌延迟
        except requests.RequestException as e:
            print(f"抓取失败：{e}")
            break
    return all_books

if __name__ == "__main__":
    books = crawl_all(max_pages=3)
    print(f"共抓取 {len(books)} 本书")
    save_csv(books)
    for b in books[:5]:
        print(b)
~~~

<h2>BeautifulSoup 常用方法</h2>

<h3>查找</h3>
~~~
soup = BeautifulSoup(html, "html.parser")

# 找第一个
tag = soup.find("div")
tag = soup.find("div", class_="item")
tag = soup.find("a", href=True)

# 找所有
tags = soup.find_all("a")
tags = soup.find_all("div", class_="item", limit=5)

# CSS 选择器（推荐）
items = soup.select("div.item > a")
first = soup.select_one("#main .title")
~~~

<h3>取内容</h3>
~~~
tag.text                # 纯文本（递归所有子节点）
tag.get_text(strip=True)  # 纯文本，去掉两端空白
tag["href"]             # 取属性
tag.get("href", "")     # 安全取属性
tag.attrs               # 所有属性，返回字典
~~~

<h3>遍历结构</h3>
~~~
tag.parent              # 父节点
tag.children            # 子节点（迭代器）
tag.find_next_sibling() # 下一个兄弟
~~~

<h3>CSS 选择器速查</h3>
<ul>
  <li><code>div</code> 所有 div</li>
  <li><code>.price</code> class="price"</li>
  <li><code>#main</code> id="main"</li>
  <li><code>div > p</code> 直接子元素</li>
  <li><code>div p</code> 后代元素</li>
  <li><code>a[href]</code> 有 href 属性的 a</li>
  <li><code>div.item a</code> class 为 item 的 div 里的 a</li>
</ul>

<h2>翻页抓取</h2>
~~~
def crawl_all(base, max_pages=10):
    all_items = []
    for page in range(1, max_pages + 1):
        url = f"{base}?page={page}"
        html = fetch(url)
        items = parse(html)
        if not items:      # 没有数据说明到末尾
            break
        all_items.extend(items)
        time.sleep(1)
    return all_items
~~~

<h2>爬虫道德与法律</h2>
<ul>
  <li>遵守网站的 <b>robots.txt</b>（访问 <code>example.com/robots.txt</code> 查看）</li>
  <li>加 <code>time.sleep(1)</code> 控制频率，不给服务器压力</li>
  <li>不要爬取需要登录或明确禁止的私密数据</li>
  <li>数据仅用于学习研究，不用于商业用途</li>
  <li>注意版权，不要直接复制大段受保护的内容</li>
  <li>尊重个人隐私，不爬取个人信息</li>
</ul>

<h2>反爬与应对（了解）</h2>
<ul>
  <li><b>User-Agent 检测</b>：加请求头伪装</li>
  <li><b>频率限制</b>：加延迟、用代理</li>
  <li><b>验证码</b>：打码平台或 Selenium 模拟</li>
  <li><b>JS 动态渲染</b>：用 Selenium / Playwright</li>
</ul>

<h2>更现代的方案：Selenium</h2>
~~~
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
driver.get("https://example.com")
titles = driver.find_elements(By.CSS_SELECTOR, "h2.title")
for t in titles:
    print(t.text)
driver.quit()
~~~
<p>Selenium 会启动真实浏览器，能处理 JS 渲染的页面，但速度慢。</p>

<h2>进阶挑战</h2>
<ul>
  <li>把价格转成浮点数并按价格排序</li>
  <li>结果同时存成 JSON 和 CSV</li>
  <li>用 <code>concurrent.futures</code> 并发抓取多个页面</li>
  <li>用 <code>lxml</code> 替代 html.parser，速度更快</li>
  <li>抓取书籍封面图并下载</li>
</ul>

<h2>动手练习</h2>
<ol>
  <li>完整敲一遍代码，跑通基础抓取</li>
  <li>增加「抓取书籍评分」功能</li>
  <li>把结果按价格从低到高排序</li>
  <li>改成并发抓取 5 页，对比耗时</li>
</ol>
`
    },
    {
        id: 'l36', stage: '10', title: '项目四：学生成绩管理系统', desc: '面向对象综合实战',
        content: `
<h2>需求</h2>
<p>用面向对象方式做成绩管理系统，支持：</p>
<ul>
  <li>添加学生</li>
  <li>录入成绩（多科目）</li>
  <li>查看全部学生</li>
  <li>按平均分排名</li>
  <li>查看各科平均分</li>
  <li>删除学生</li>
  <li>数据持久化到 JSON</li>
</ul>

<h2>设计</h2>
<ul>
  <li><b>Student 类</b>：表示单个学生（学号、姓名、各科成绩）</li>
  <li><b>Manager 类</b>：管理所有学生，处理增删改查和持久化</li>
  <li><b>main 函数</b>：命令行交互</li>
</ul>

<h2>完整代码</h2>
~~~
import json
import os

FILE = "students.json"


class Student:
    def __init__(self, sid, name, scores=None):
        self.sid = sid
        self.name = name
        self.scores = scores or {}     # {科目: 分数}

    @property
    def average(self):
        """平均分（计算属性）"""
        if not self.scores:
            return 0
        return sum(self.scores.values()) / len(self.scores)

    def to_dict(self):
        return {"sid": self.sid, "name": self.name, "scores": self.scores}

    @classmethod
    def from_dict(cls, d):
        return cls(d["sid"], d["name"], d["scores"])

    def __str__(self):
        return f"{self.sid}  {self.name}  平均分 {self.average:.1f}"

    def __repr__(self):
        return f"Student({self.sid!r}, {self.name!r})"


class Manager:
    def __init__(self, file=FILE):
        self.file = file
        self.students = []
        self.load()

    # ---------- 持久化 ----------
    def load(self):
        if not os.path.exists(self.file):
            return
        try:
            with open(self.file, "r", encoding="utf-8") as f:
                data = json.load(f)
                self.students = [Student.from_dict(d) for d in data]
        except (json.JSONDecodeError, KeyError) as e:
            print(f"数据文件损坏：{e}，已重置")
            self.students = []

    def save(self):
        with open(self.file, "w", encoding="utf-8") as f:
            json.dump(
                [s.to_dict() for s in self.students],
                f,
                ensure_ascii=False,
                indent=2
            )

    # ---------- 增删改查 ----------
    def add(self, sid, name):
        if self.find(sid):
            print("✗ 学号已存在")
            return False
        self.students.append(Student(sid, name))
        self.save()
        print("✓ 添加成功")
        return True

    def find(self, sid):
        return next((s for s in self.students if s.sid == sid), None)

    def delete(self, sid):
        s = self.find(sid)
        if not s:
            print("✗ 未找到")
            return False
        self.students.remove(s)
        self.save()
        print("✓ 已删除")
        return True

    def set_score(self, sid, subject, score):
        s = self.find(sid)
        if not s:
            print("✗ 未找到该学生")
            return False
        try:
            s.scores[subject] = float(score)
        except ValueError:
            print("✗ 分数必须是数字")
            return False
        self.save()
        print("✓ 成绩已录入")
        return True

    # ---------- 统计 ----------
    def rank(self):
        return sorted(self.students, key=lambda s: s.average, reverse=True)

    def subject_average(self):
        """各科平均分"""
        totals = {}
        for s in self.students:
            for subject, score in s.scores.items():
                totals.setdefault(subject, []).append(score)
        return {k: sum(v) / len(v) for k, v in totals.items()}

    def top_student(self):
        if not self.students:
            return None
        return max(self.students, key=lambda s: s.average)

    # ---------- 展示 ----------
    def show_all(self):
        if not self.students:
            print("暂无数据")
            return
        print("\\n" + "=" * 50)
        for s in self.students:
            print(f"  {s}")
        print("=" * 50)

    def show_rank(self):
        if not self.students:
            print("暂无数据")
            return
        print("\\n【排名】")
        for i, s in enumerate(self.rank(), 1):
            print(f"  {i}. {s}")

    def show_subject_averages(self):
        averages = self.subject_average()
        if not averages:
            print("暂无成绩")
            return
        print("\\n【各科平均分】")
        for subject, avg in averages.items():
            print(f"  {subject}: {avg:.1f}")


# ---------- 命令行交互 ----------
MENU = """
╔══════════════════════════╗
║  学生成绩管理系统         ║
╠══════════════════════════╣
║  1. 添加学生              ║
║  2. 录入成绩              ║
║  3. 查看全部              ║
║  4. 成绩排名              ║
║  5. 各科平均分            ║
║  6. 删除学生              ║
║  7. 退出                  ║
╚══════════════════════════╝
"""


def main():
    m = Manager()
    while True:
        print(MENU)
        choice = input("请选择：").strip()

        if choice == "1":
            sid = input("学号：").strip()
            name = input("姓名：").strip()
            if sid and name:
                m.add(sid, name)

        elif choice == "2":
            sid = input("学号：").strip()
            subject = input("科目：").strip()
            score = input("分数：").strip()
            m.set_score(sid, subject, score)

        elif choice == "3":
            m.show_all()

        elif choice == "4":
            m.show_rank()

        elif choice == "5":
            m.show_subject_averages()

        elif choice == "6":
            sid = input("学号：").strip()
            m.delete(sid)

        elif choice == "7":
            print("再见！")
            break

        else:
            print("无效选项")


if __name__ == "__main__":
    main()
~~~

<h2>代码亮点</h2>

<h3>1. 类与对象</h3>
<p>Student 表示数据，Manager 表示逻辑。职责分离，各司其职。</p>

<h3>2. @property 计算属性</h3>
~~~
@property
def average(self):
    if not self.scores:
        return 0
    return sum(self.scores.values()) / len(self.scores)
~~~
<p>用 <code>s.average</code> 就像读属性一样，实际是实时计算。比 <code>s.average()</code> 更自然。</p>

<h3>3. @classmethod 工厂方法</h3>
~~~
@classmethod
def from_dict(cls, d):
    return cls(d["sid"], d["name"], d["scores"])
~~~
<p>从字典还原对象，常用于反序列化。</p>

<h3>4. __str__ 与 __repr__</h3>
<p>让 print 和调试都更友好。</p>

<h3>5. lambda + sorted</h3>
~~~
sorted(self.students, key=lambda s: s.average, reverse=True)
~~~

<h3>6. next + 生成器表达式</h3>
~~~
next((s for s in self.students if s.sid == sid), None)
~~~
<p>优雅地查找并返回默认值，避免多写 if。</p>

<h3>7. setdefault 分组统计</h3>
~~~
totals.setdefault(subject, []).append(score)
~~~
<p>一行完成「有则追加、无则创建」。</p>

<h3>8. 完整的异常处理</h3>
<ul>
  <li>文件损坏 → JSONDecodeError</li>
  <li>数据缺字段 → KeyError</li>
  <li>输入非数字 → ValueError</li>
</ul>

<h2>进一步挑战</h2>
<ul>
  <li>用 <code>argparse</code> 支持命令行直接调用：<code>python grade.py add 001 张三</code></li>
  <li>导出成绩单为 CSV</li>
  <li>增加各科最高/最低分统计</li>
  <li>写单元测试（pytest）</li>
  <li>用 <code>rich</code> 做表格化输出</li>
  <li>支持修改学生姓名</li>
  <li>增加班级字段，按班级分组</li>
</ul>

<h2>恭喜完成全部 36 课</h2>
<p>到这里你已经掌握了 Python 的核心语法、面向对象、异常处理、常用库和综合项目开发。</p>

<p><b>下一步建议：</b></p>
<ul>
  <li><b>选一个方向深入</b>：
    <ul>
      <li>Web 后端：Flask → FastAPI → Django</li>
      <li>数据分析：numpy → pandas → matplotlib</li>
      <li>自动化：Selenium、pyautogui、openpyxl</li>
      <li>爬虫：requests + BeautifulSoup + Scrapy</li>
      <li>AI/ML：scikit-learn → PyTorch</li>
    </ul>
  </li>
  <li><b>读源码</b>：GitHub 上找小型开源项目，从 main 函数读起</li>
  <li><b>练算法</b>：LeetCode、Codewars 每天一道</li>
  <li><b>做真实项目</b>：解决你自己遇到的问题，比任何教程都有效</li>
</ul>

<p>祝你学习顺利，代码无 bug！</p>
`
    }

);