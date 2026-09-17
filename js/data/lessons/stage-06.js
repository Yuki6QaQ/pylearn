window.__PyLearnLessons = window.__PyLearnLessons || [];

window.__PyLearnLessons.push(

    {
        id: 'l21', stage: '06', title: '导入模块', desc: 'import 的几种写法',
        content: `
<h2>为什么需要模块</h2>
<p>把功能拆到不同文件，好处是：代码好找、职责清晰、可以复用、方便测试。一个 .py 文件就是一个模块。</p>

<h2>import 的几种形式</h2>

<h3>1. 导入整个模块</h3>
~~~
import math
print(math.pi)          # 3.141592653589793
print(math.sqrt(16))    # 4.0
print(math.floor(3.7))  # 3
print(math.ceil(3.2))   # 4
~~~

<h3>2. 导入特定成员</h3>
~~~
from math import sqrt, pi
print(sqrt(25))         # 5.0
print(pi)               # 3.141592653589793
~~~

<h3>3. 起别名</h3>
~~~
import math as m
print(m.sqrt(9))        # 3.0

# 通用约定
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
~~~

<h3>4. 导入全部（不推荐）</h3>
~~~
from math import *
~~~
<p>会污染命名空间，容易和自定义变量重名。比如 math 里有 <code>pow</code>，你自己定义了 pow，就会被覆盖。</p>

<h2>模块搜索路径</h2>
<p>Python 找模块的顺序：</p>
<ol>
  <li>当前脚本所在目录</li>
  <li>环境变量 <code>PYTHONPATH</code> 指定的目录</li>
  <li>Python 安装目录下的标准库</li>
  <li>第三方包目录（site-packages）</li>
</ol>

<p>查看完整路径：</p>
~~~
import sys
for p in sys.path:
    print(p)
~~~

<h2>常用标准库</h2>

<h3>math：数学函数</h3>
~~~
import math
print(math.pi)          # 圆周率
print(math.e)           # 自然常数
print(math.sqrt(16))    # 平方根
print(math.pow(2, 10))  # 2 的 10 次方
print(math.floor(3.7))  # 向下取整
print(math.ceil(3.2))   # 向上取整
print(math.fabs(-5))    # 绝对值
print(math.log(100, 10))# 对数
print(math.sin(math.pi / 2))   # 三角函数
~~~

<h3>random：随机数</h3>
~~~
import random

print(random.random())          # [0.0, 1.0) 之间的小数
print(random.randint(1, 10))    # [1, 10] 之间的整数
print(random.randrange(0, 10, 2))  # [0, 10) 步长 2
print(random.choice(["a", "b", "c"]))       # 随机选一个
print(random.choices(["a", "b"], k=5))      # 可重复抽 5 个
print(random.sample(range(100), 5))         # 不重复抽 5 个

lst = [1, 2, 3, 4, 5]
random.shuffle(lst)             # 原地打乱
print(lst)

# 设置随机种子，让结果可复现
random.seed(42)
print(random.randint(1, 100))
~~~

<h3>os：操作系统</h3>
~~~
import os
print(os.getcwd())             # 当前目录
print(os.listdir("."))         # 列出文件
print(os.name)                 # 'nt' 或 'posix'
print(os.path.exists("a.txt"))
print(os.path.join("a", "b.txt"))
~~~

<h3>datetime：时间</h3>
~~~
from datetime import datetime, date, timedelta
print(datetime.now())
print(date.today())
print(datetime.now() + timedelta(days=7))
~~~

<h3>sys：解释器</h3>
~~~
import sys
print(sys.version)
print(sys.platform)
print(sys.argv)
~~~

<h2>惰性导入</h2>
<p>import 语句会真正执行模块代码。有些库很重，可以在需要时才导入：</p>
~~~
def process_image(path):
    from PIL import Image    # 只在这个函数被调用时才导入
    return Image.open(path)
~~~

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>用 random 写抽奖程序：从 10 个名字里随机抽 3 个不重复的中奖者。</p>

<h3>练习 2</h3>
<p>用 math 计算圆的面积（用 math.pi）和 16 的平方根。</p>

<h3>练习 3</h3>
<p>用 datetime 输出今天的日期和星期几。</p>

<h3>练习 4</h3>
<p>用 random 模拟掷骰子 1000 次，统计每个点数出现的次数。</p>
`
    },
    {
        id: 'l22', stage: '06', title: '自定义模块', desc: '把自己的代码拆成文件',
        content: `
<h2>创建自己的模块</h2>
<p>新建文件 <b>mymath.py</b>：</p>
~~~
def add(a, b):
    return a + b

def square(x):
    return x * x

PI = 3.14159

class Calculator:
    def multiply(self, a, b):
        return a * b
~~~

<h2>在同目录下导入</h2>
<p>新建 <b>main.py</b>（和 mymath.py 放在同一个文件夹）：</p>
~~~
import mymath

print(mymath.add(2, 3))         # 5
print(mymath.square(4))         # 16
print(mymath.PI)                # 3.14159

calc = mymath.Calculator()
print(calc.multiply(3, 4))      # 12
~~~

<h3>或者只导入需要的</h3>
~~~
from mymath import add, square, PI

print(add(10, 20))
print(PI)
~~~

<h2>模块内部代码什么时候执行</h2>
<p>import 一个模块时，模块顶层代码会被执行一次。所以模块里不应该有太多副作用代码。</p>

<h3>__name__ 变量</h3>
<p>每个模块都有一个 <code>__name__</code> 属性：</p>
<ul>
  <li>直接运行该文件时，值是 <code>"__main__"</code></li>
  <li>被其他文件 import 时，值是模块名（如 <code>"mymath"</code>）</li>
</ul>

<p>利用这个特性，可以让文件「既能当脚本运行，又能当模块导入」：</p>
~~~
def main():
    print("作为脚本运行")

if __name__ == "__main__":
    main()
~~~
<p>作为脚本直接运行时，会执行 main；被别人 import 时不会。</p>

<h2>包：多个模块的集合</h2>
<p>文件夹里放一个 <code>__init__.py</code>，就成了包：</p>
~~~
mypackage/
├── __init__.py
├── utils.py
├── models.py
└── sub/
    ├── __init__.py
    └── helpers.py
~~~

<h3>__init__.py 的作用</h3>
<ul>
  <li>标记这个文件夹是 Python 包</li>
  <li>可以写包级别的初始化代码</li>
  <li>可以控制 <code>from mypackage import *</code> 的行为</li>
</ul>

~~~
# mypackage/__init__.py
from . import utils
from . import models
print("mypackage 已加载")
~~~

<h3>导入包里的模块</h3>
~~~
from mypackage import utils
from mypackage.models import User
import mypackage.sub.helpers as helpers
~~~

<h2>相对导入（进阶）</h2>
<p>在包内部的模块之间，可以用相对导入：</p>
~~~
# mypackage/utils.py 里

# 导入同包的模块
from . import models

# 导入上一级包的模块
from ..other import helper
~~~
<p><code>.</code> 代表当前包，<code>..</code> 代表上一级包。<b>相对导入只能在包内使用</b>，直接运行的文件里不能用。</p>

<h2>模块的组织建议</h2>
<ul>
  <li>一个模块只放相关的功能</li>
  <li>模块名小写，不要和标准库重名（别叫 <code>math.py</code>、<code>random.py</code>）</li>
  <li>模块内部用 <code>if __name__ == "__main__"</code> 区分脚本执行和导入</li>
  <li>大项目拆包，每个包负责一个领域</li>
</ul>

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>创建 <code>string_utils.py</code>，包含 <code>reverse(s)</code> 和 <code>is_palindrome(s)</code> 两个函数，在另一个文件中导入使用。</p>

<h3>练习 2</h3>
<p>创建 <code>calculator.py</code>，包含加减乘除四个函数，写 <code>__name__ == "__main__"</code> 测试。</p>

<h3>练习 3</h3>
<p>建一个包 <code>tools</code>，包含 <code>math_tools.py</code> 和 <code>text_tools.py</code>，从主程序导入使用。</p>

<h3>练习 4</h3>
<p>把上一个练习的模块拆成包，让 <code>tools/__init__.py</code> 直接暴露常用函数，这样用户可以 <code>from tools import add</code>。</p>
`
    },
    {
        id: 'l23', stage: '06', title: 'pip 与虚拟环境', desc: '管理第三方依赖',
        content: `
<h2>pip 是什么</h2>
<p>Python 的包管理工具，从 PyPI（Python Package Index，全球最大的 Python 包仓库）安装第三方库。</p>

<h2>常用命令</h2>
~~~
pip install requests              # 安装
pip uninstall requests            # 卸载
pip list                          # 已安装的包
pip show requests                 # 查看某个包的详情
pip install requests==2.31.0      # 指定版本
pip install "requests>=2.28"      # 版本范围
pip install --upgrade requests    # 升级到最新版
pip search keyword                # 搜索（已弃用）
~~~

<h3>国内加速</h3>
~~~
pip install requests -i https://pypi.tuna.tsinghua.edu.cn/simple
~~~
<p>常用镜像：</p>
<ul>
  <li>清华：<code>https://pypi.tuna.tsinghua.edu.cn/simple</code></li>
  <li>阿里云：<code>https://mirrors.aliyun.com/pypi/simple/</code></li>
  <li>中科大：<code>https://pypi.mirrors.ustc.edu.cn/simple/</code></li>
</ul>

<h3>设置永久镜像源</h3>
~~~
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
~~~

<h3>使用 python -m pip</h3>
~~~
python -m pip install requests
~~~
<p>当系统里有多个 Python 版本时，用 <code>python -m pip</code> 更稳妥，确保装到当前用的 Python 上。</p>

<h2>为什么要用虚拟环境</h2>
<p>不同项目可能依赖同一个包的不同版本：</p>
<ul>
  <li>项目 A 需要 requests 2.28</li>
  <li>项目 B 需要 requests 2.31</li>
</ul>
<p>全局安装会互相覆盖。虚拟环境为每个项目隔离出一套独立的依赖。</p>

<h2>venv：Python 内置方案</h2>

<h3>创建虚拟环境</h3>
~~~
python -m venv venv
~~~
<p>会生成一个 <code>venv/</code> 文件夹，里面是独立的 Python 环境。</p>

<h3>激活</h3>
~~~
# Windows
venv\\Scripts\\activate

# macOS / Linux
source venv/bin/activate
~~~
<p>激活后命令行前面会出现 <code>(venv)</code> 提示：</p>
~~~
(venv) C:\\project>
~~~

<h3>在激活状态下安装包</h3>
~~~
pip install requests
~~~
<p>只装在当前虚拟环境里。</p>

<h3>退出</h3>
~~~
deactivate
~~~

<h3>删除虚拟环境</h3>
<p>直接删除 <code>venv</code> 文件夹即可，没有副作用。</p>

<h2>导出与还原依赖</h2>
~~~
# 导出当前环境的依赖列表
pip freeze > requirements.txt

# 在新环境里一键还原
pip install -r requirements.txt
~~~
<p>这是团队协作的标准做法。把 <code>requirements.txt</code> 提交到 Git，别人 clone 后一条命令就能装好所有依赖。</p>

<h3>requirements.txt 长什么样</h3>
~~~
requests==2.31.0
flask==3.0.0
numpy>=1.24.0
~~~

<h2>其他工具</h2>

<h3>conda</h3>
~~~
conda create -n myenv python=3.11
conda activate myenv
conda install numpy
~~~
<p>数据科学常用，能管理非 Python 依赖（如 CUDA、MKL）。</p>

<h3>poetry</h3>
~~~
poetry new myproject
poetry add requests
poetry install
~~~
<p>用 <code>pyproject.toml</code> 管理依赖，比 requirements.txt 更现代。</p>

<h3>uv（最快）</h3>
~~~
uv venv
uv pip install requests
~~~
<p>Rust 写的，速度比 pip 快 10 倍以上。</p>

<h2>常见问题</h2>

<h3>pip 安装慢</h3>
<p>用国内镜像源，或加 <code>--timeout 60</code> 提高超时时间。</p>

<h3>ModuleNotFoundError</h3>
<p>先确认装没装：<code>pip list | grep 模块名</code>。装过还报错，可能是装到了别的 Python 版本上，用 <code>python -m pip list</code> 再查一遍。</p>

<h3>SSL 证书错误</h3>
<p>临时方案：<code>pip install xxx --trusted-host pypi.org --trusted-host files.pythonhosted.org</code></p>

<h2>动手练习</h2>

<h3>练习 1</h3>
<p>为你的学习项目创建虚拟环境，安装 requests，导出 requirements.txt。</p>

<h3>练习 2</h3>
<p>安装 <code>rich</code> 库，用 <code>rich.print</code> 输出彩色文字。</p>
~~~
from rich import print
print("[bold red]警告[/bold red] [green]正常[/green]")
~~~

<h3>练习 3</h3>
<p>分别用 <code>pip list</code> 和 <code>python -m pip list</code> 查看安装列表，对比差异。</p>
`
    }

);