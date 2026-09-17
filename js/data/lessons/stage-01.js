window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l01', stage: '01', title: '安装 Python', desc: '下载、安装与环境验证',
        content: `
<h2>为什么要先装 Python</h2>
<p>Python 是解释型语言，你的电脑需要先有一个「解释器」才能读懂并运行 .py 文件。安装包同时会带来 <code>pip</code>（包管理工具）和 <code>IDLE</code>（简易编辑器），后面所有课程都依赖这个环境。</p>

<h3>下载与安装</h3>
<ul>
  <li>打开官网 <b>python.org</b>，进入 Downloads 页</li>
  <li>根据系统选择 Windows / macOS 安装包</li>
  <li>下载最新稳定版（如 3.12.x），不要下 beta 版</li>
</ul>

<p><b>Windows 安装时的关键一步：</b>安装界面底部有一个 <b>Add Python to PATH</b> 的复选框，<b>必须勾选</b>。勾上它，终端里才能直接用 <code>python</code> 命令；忘记勾选会导致后面所有命令都提示「不是内部或外部命令」。</p>

<h3>验证安装</h3>
<p>打开终端（Windows 按 <code>Win + R</code> 输入 <code>cmd</code>；macOS 用 Spotlight 搜 <code>Terminal</code>），输入：</p>
~~~
python --version
~~~
<p>看到类似 <code>Python 3.12.1</code> 的输出即成功。若提示找不到命令，试试 <code>python3 --version</code>，某些系统里 Python 2 和 Python 3 是分开的。</p>

<h3>检查 pip</h3>
<p>pip 是 Python 的包安装工具，后面装第三方库全靠它：</p>
~~~
pip --version
~~~
<p>如果显示 pip 版本号，说明一切就绪。</p>

<h3>进入交互模式体验</h3>
<p>终端里输入：</p>
~~~
python
~~~
<p>会看到 <code>&gt;&gt;&gt;</code> 提示符。这里可以直接输入 Python 代码立即执行：</p>
~~~
>>> 1 + 1
2
>>> print("hello")
hello
>>> exit()
~~~
<p>这个环境叫 REPL（Read-Eval-Print Loop），适合做实验，但正式代码还是写在 .py 文件里。</p>

<h3>常见问题排查</h3>
<ul>
  <li><b>提示 python 不是内部或外部命令</b>：安装时没勾 PATH。重新运行安装程序，选 Modify，勾上 Add to PATH</li>
  <li><b>pip 命令报错</b>：尝试 <code>python -m pip --version</code></li>
  <li><b>有多个 Python 版本冲突</b>：用 <code>where python</code>（Windows）或 <code>which python</code>（macOS/Linux）查看实际用的是哪个</li>
</ul>

<h3>动手练习</h3>
<ol>
  <li>完成安装，在终端运行 <code>python --version</code> 并记下版本号</li>
  <li>进入交互模式，计算 <code>2 ** 10</code> 和 <code>100 / 7</code></li>
  <li>用 <code>exit()</code> 退出交互模式</li>
</ol>
`
    },
    {
        id: 'l02', stage: '01', title: '第一个程序', desc: 'Hello World 与三种运行方式',
        content: `
<h2>创建并运行第一个文件</h2>
<p>在你的学习目录里新建一个文本文件，命名为 <b>hello.py</b>。注意后缀必须是 <code>.py</code>，不是 <code>.txt</code>。写入一行：</p>
~~~
print("Hello, World!")
~~~

<h3>运行它</h3>
<p>终端里 cd 到该目录，执行：</p>
~~~
python hello.py
~~~
<p>屏幕会输出：</p>
~~~
Hello, World!
~~~

<h2>print 详解</h2>
<p><code>print()</code> 是内置函数，把括号里的内容输出到屏幕。它的参数可以有很多种：</p>
~~~
print("字符串")
print(42)
print(3.14)
print(True)
print("我今年", 18, "岁")
print("结果 =", 2 + 3)
~~~
<p>输出：</p>
~~~
字符串
42
3.14
True
我今年 18 岁
结果 = 5
~~~
<p><b>自动加空格：</b>多个参数之间，print 会自动插入一个空格。所以 <code>print("我今年", 18, "岁")</code> 是「我今年 18 岁」而不是「我今年18岁」。</p>

<h3>控制结尾</h3>
~~~
print("a", end="")
print("b")               # 输出 ab

print("x", end="--")
print("y")               # 输出 x--y
~~~
<p>默认 <code>end="\\n"</code>，每调用一次 print 就换行。改成空字符串就能不换行。</p>

<h3>控制分隔符</h3>
~~~
print("a", "b", "c", sep="-")
# 输出 a-b-c
~~~

<h2>三种运行 Python 的方式</h2>

<h3>1. 命令行运行文件（最常用）</h3>
~~~
python hello.py
~~~
<p>适合正式开发。IDE 底层的运行按钮本质上就是执行这条命令。</p>

<h3>2. 交互模式 REPL</h3>
~~~
python
>>> print("hi")
hi
~~~
<p>适合快速验证某个表达式。不能保存，退出就没了。</p>

<h3>3. IDE 内置运行</h3>
<p>VS Code 装好 Python 插件后，点右上角三角形按钮，或按 <code>F5</code>。本质是帮你在终端执行 <code>python 文件名</code>。</p>

<h2>新手最常遇到的报错</h2>

<h3>SyntaxError</h3>
~~~
print("hello"    # 少了右括号
~~~
<p>报错信息会指出大致位置。看到 <code>SyntaxError</code> 先检查：括号是否配对、引号是否配对、冒号是否漏了、是否误用了中文标点。</p>

<h3>中文引号问题</h3>
~~~
print(“hello”)   # 中文引号，会报错
~~~
<p>编程中一律用英文引号 <code>"</code> 和 <code>'</code>。</p>

<h3>缩进错误</h3>
~~~
  print("hello")   # 顶格代码前面多了空格，会报 IndentationError
~~~
<p>Python 用缩进表达代码块，顶格写代码不能有任何前导空格。</p>

<h3>文件编码</h3>
<p>如果代码里有中文，确保文件是 UTF-8 编码。VS Code 右下角可以直接切换编码。Python 3 默认源码就是 UTF-8，一般不用特别处理。</p>

<h2>动手练习</h2>
<ol>
  <li>创建 <code>intro.py</code>，用多条 print 输出你的姓名、城市、爱好</li>
  <li>用一条 print 输出 <code>1 + 2 + 3 + ... + 10</code> 的结果（提示：直接写 <code>print(1+2+...+10)</code>）</li>
  <li>尝试故意写一个语法错误（比如少一个括号），运行看看报错信息，学会读错误提示</li>
</ol>
`
    },
    {
        id: 'l03', stage: '01', title: 'IDE 与编辑器', desc: '选择趁手的开发工具',
        content: `
<h2>为什么不要用记事本写代码</h2>
<p>记事本能敲字符，但没有：语法高亮（分不清字符串和变量）、自动补全（打一半名字就提示）、错误提示（括号没配对不会告诉你）、调试功能（断点、单步执行）。用记事本写 Python，效率低且容易出错。</p>

<h2>三大主流选择</h2>

<h3>1. VS Code（推荐新手）</h3>
<p>微软出品，免费、轻量、插件生态强。安装后必装这三个扩展：</p>
<ul>
  <li><b>Python</b>（微软官方）— 语言支持、调试、运行</li>
  <li><b>Pylance</b> — 智能补全与类型检查</li>
  <li><b>Black Formatter</b> — 一键格式化，代码风格统一</li>
</ul>
<p>装完后，新建 .py 文件，右上角会出现运行按钮，点一下就能执行。</p>

<h3>2. PyCharm Community</h3>
<p>JetBrains 出品，功能更完整：重构工具、数据库工具、科学计算支持。缺点是启动慢，占用内存大。适合以后做大项目时切换。</p>

<h3>3. 在线环境（零安装）</h3>
<ul>
  <li><b>Google Colab</b> — 适合数据科学，自带 GPU</li>
  <li><b>Replit</b> — 完整 IDE，可多人协作</li>
  <li><b>Python Tutor</b> — 单步可视化执行，非常适合初学者理解代码流程</li>
</ul>

<h2>VS Code 常用快捷键</h2>
<ul>
  <li><code>Ctrl + /</code> 注释/取消注释选中行</li>
  <li><code>Ctrl + D</code> 选中下一个相同的词（批量改名神器）</li>
  <li><code>Shift + Alt + ↓</code> 向下复制当前行</li>
  <li><code>Alt + ↑/↓</code> 上下移动当前行</li>
  <li><code>Ctrl + Shift + P</code> 打开命令面板</li>
  <li><code>F5</code> 运行调试，<code>F9</code> 打断点</li>
  <li><code>Ctrl + 反引号</code> 打开内置终端</li >
</ul >

<h2>一个专业的项目目录</h2>
<p>学到这里就养成好习惯，代码不要全放在桌面：</p>
~~~
    python - learning /
├── day01 /
│   ├── hello.py
│   └── intro.py
├── day02 /
│   └── variables.py
└── README.md
~~~

    <h2>settings.json 推荐配置</h2>
    < p > VS Code 按 < code > Ctrl + Shift + P</ >，输入 "Open User Settings (JSON)"，加入：</p >
~~~
{
    "editor.fontSize": 14,
    "editor.tabSize": 4,
    "editor.formatOnSave": true,
    "python.languageServer": "Pylance",
    "files.autoSave": "afterDelay"
}
~~~
    <p>保存时自动格式化，Tab 用 4 个空格（Python 官方规范），这是最常见的工程约定。</p>

    < h2 > 动手练习</ >
<ol>
    <li>安装 VS Code 与 Python 扩展</li>
    <li>建一个 <code>python-learning</code> 文件夹作为你的学习根目录</li>
    <li>新建 <code>day01.py</code>，输出今天的日期（不会的话先照抄下面代码）：</li>
</ol>
~~~
    from datetime import date
print("今天是", date.today())
~~~
    <p>运行看看效果，感受 IDE 的便利。</p>
`
    }

);