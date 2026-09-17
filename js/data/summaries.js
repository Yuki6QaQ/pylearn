/* ============================================================
   每节课的「本章要点」
   ============================================================ */

window.Summaries = {

    /* ============ 阶段 01 起步 ============ */
    l01: [
        'Python 官网 python.org 下载最新稳定版',
        'Windows 安装时务必勾选「Add Python to PATH」',
        '用 python --version 验证安装是否成功',
        'pip 是包管理工具，pip --version 检查它'
    ],
    l02: [
        'print() 输出内容，多个参数之间自动加空格',
        '三种运行方式：命令行、REPL 交互模式、IDE',
        'end 控制结尾，sep 控制分隔符',
        '常见报错：中文引号、括号不配对、漏冒号'
    ],
    l03: [
        'VS Code 必装扩展：Python、Pylance、Black Formatter',
        'Ctrl + / 注释，Ctrl + D 批量选中，F5 运行',
        'Tab 用 4 个空格，Python 官方规范',
        '养成项目目录习惯，代码不要全堆桌面'
    ],

    /* ============ 阶段 02 基础语法 ============ */
    l04: [
        '变量是「标签」不是「盒子」，本质是指向',
        'Python 是动态类型，变量可以换类型',
        '命名规则：字母数字下划线，不能数字开头',
        '命名惯例：普通变量小写下划线，常量全大写',
        '多重赋值、解包、交换是 Python 特色'
    ],
    l05: [
        '四类基础类型：int、float、str、bool',
        '浮点数有精度问题：0.1 + 0.2 ≠ 0.3',
        '字符串不可变，改只能创建新字符串',
        'bool 本质是整数，True=1，False=0',
        '类型转换：int()、float()、str()、bool()'
    ],
    l06: [
        '/ 真除法结果永远是 float，// 整除向下取整',
        '-7 // 2 = -4，不是 -3',
        '比较运算符返回布尔值',
        'and / or 有短路特性',
        '优先级：** > * / > + - > 比较 > not > and > or'
    ],
    l07: [
        '索引从 0 开始，负索引从末尾数',
        '切片 [start:end:step] 含头不含尾',
        'f-string 是推荐的格式化方式',
        '常用方法：strip、split、replace、join',
        '字符串不可变，方法都返回新字符串'
    ],

    /* ============ 阶段 03 流程控制 ============ */
    l08: [
        '缩进表示代码块，标准 4 个空格',
        '条件后必须有冒号',
        'elif 从上到下依次判断，命中就跳过',
        '真值判断：空字符串、0、空列表都是假',
        '三元表达式：a if cond else b'
    ],
    l09: [
        'while 条件为真就循环',
        '循环体内必须有让条件趋向结束的语句',
        'while...else 在正常结束时执行',
        '死循环用 Ctrl + C 强制退出',
        'for 用于已知次数，while 用于未知次数'
    ],
    l10: [
        'for 遍历可迭代对象：列表、字符串、range',
        'range(5) / range(2,6) / range(0,10,2)',
        'enumerate 同时拿索引和值',
        'zip 同时遍历多个序列',
        '不要用 range(len(lst)) 遍历列表'
    ],
    l11: [
        'break 立即跳出整个循环',
        'continue 跳过本次进入下一轮',
        'break 只跳出当前这一层循环',
        'for...else 可用于「没找到」场景',
        '嵌套循环跳出多层：用标志变量或 return'
    ],

    /* ============ 阶段 04 数据结构 ============ */
    l12: [
        '列表有序可变，索引从 0 开始',
        'append 加一个，extend 加多个',
        'remove 按值删，pop 按索引删，del 也行',
        'sort 原地排序，sorted 返回新列表',
        '浅复制用 copy/slice，嵌套要用 deepcopy'
    ],
    l13: [
        '元组用小括号，不可变',
        '单元素元组必须加逗号 (42,)',
        '解包是元组最常用的场景',
        '元组可作字典键，列表不行',
        'namedtuple 给元组每个位置起名字'
    ],
    l14: [
        '字典键值对存储，键必须可哈希',
        'get(key, default) 安全访问，避免 KeyError',
        'items() 同时遍历键和值',
        '字典推导式：{k: v for k, v in ...}',
        'Counter 做词频统计最方便'
    ],
    l15: [
        '集合元素不重复、无序',
        '集合运算：| 并集、& 交集、- 差集、^ 对称差',
        '去重但保序用 list(dict.fromkeys(lst))',
        'frozenset 是不可变集合，可作字典键',
        '判断重复：len(lst) != len(set(lst))'
    ],
    l16: [
        '结构：[表达式 for 变量 in 可迭代 if 条件]',
        '嵌套推导：外层循环在前，内层在后',
        '字典/集合也有推导式',
        '生成器表达式用 () 惰性求值，省内存',
        '条件超过两层建议换回普通循环'
    ],

    /* ============ 阶段 05 函数 ============ */
    l17: [
        'def 定义函数，return 返回结果',
        '没有 return 返回 None',
        '遇到 return 立即结束函数',
        '返回多个值 = 返回元组，可以解包',
        '作用域：函数内是局部，global 不推荐'
    ],
    l18: [
        '有默认值的参数必须在后面',
        '关键字参数可以不按顺序传',
        '*args 接收任意位置参数，打包成元组',
        '**kwargs 接收任意关键字参数，打包成字典',
        '可变默认值的坑：默认值只在定义时创建一次'
    ],
    l19: [
        'lambda 只能有一个表达式',
        'sorted 的 key 参数最常用 lambda',
        'map / filter / reduce 是高阶函数',
        '多数场景推导式比 map/filter 更易读',
        'max / min 的 key 也支持 lambda'
    ],
    l20: [
        '函数也是对象，可以赋值、传参、返回',
        '@decorator 等价于 func = decorator(func)',
        'wrapper(*args, **kwargs) 接收任意参数',
        'functools.wraps 保留原函数信息',
        '带参数的装饰器是三层嵌套'
    ],

    /* ============ 阶段 06 模块与包 ============ */
    l21: [
        'import xxx / from xxx import yyy',
        'import xxx as 别名',
        '不要用 from xxx import *',
        '常用标准库：math、random、os、datetime、sys',
        'sys.path 是模块搜索路径列表'
    ],
    l22: [
        '一个 .py 文件就是一个模块',
        '__name__ == "__main__" 判断是否被直接运行',
        '包 = 文件夹 + __init__.py',
        '相对导入：. 当前包，.. 上一级包',
        '模块名别和标准库重名'
    ],
    l23: [
        'pip install / uninstall / list / show',
        '国内镜像源加速下载',
        '虚拟环境为每个项目隔离依赖',
        'python -m venv venv 创建，activate 激活',
        'pip freeze > requirements.txt 导出依赖'
    ],

    /* ============ 阶段 07 面向对象 ============ */
    l24: [
        '类 = 模板，对象 = 实例',
        '__init__ 是构造方法，创建对象时自动调用',
        'self 代表对象自身，必须是第一个参数',
        '实例属性 vs 类属性：一个独立一个共享',
        '三种方法：实例方法 / @classmethod / @staticmethod'
    ],
    l25: [
        'class Child(Parent) 表示继承',
        '子类可以重写父类方法',
        'super() 调用父类方法',
        '多态：同一方法名不同表现',
        '抽象基类 ABC 强制子类实现接口'
    ],
    l26: [
        '__str__ 给用户看，__repr__ 给开发者看',
        '__len__ 支持 len()，__eq__ 自定义相等',
        '定义 __eq__ 通常也要定义 __hash__',
        '__add__ / __sub__ 支持运算符',
        '__getitem__ / __iter__ / __call__ 支持内置语法'
    ],

    /* ============ 阶段 08 文件与异常 ============ */
    l27: [
        '用 with open() as f 自动关闭文件',
        '模式：r 只读、w 覆盖、a 追加、b 二进制',
        '读写文本务必指定 encoding="utf-8"',
        '大文件用 for line in f 逐行处理',
        'csv 和 json 是常用结构化数据格式'
    ],
    l28: [
        'try / except / else / finally 四块',
        '捕获多种异常：(ValueError, TypeError)',
        '主动抛异常：raise ValueError("...")',
        'EAFP 风格优于 LBYL（Python 社区推荐）',
        '常见异常：ValueError、KeyError、IndexError'
    ],
    l29: [
        '自定义异常继承 Exception',
        '异常继承体系让调用方能按类别捕获',
        '带额外信息的异常：重写 __init__',
        '上下文管理器实现 __enter__ / __exit__',
        '@contextmanager 简化自定义上下文'
    ],

    /* ============ 阶段 09 常用库 ============ */
    l30: [
        '用 os.path.join 拼接路径，跨平台安全',
        'os.walk 递归遍历目录',
        'sys.argv 是命令行参数列表',
        'pathlib 是更现代的路径处理方式',
        'os.environ 读写环境变量'
    ],
    l31: [
        'datetime.now() 当前时间，date.today() 当前日期',
        'strftime 格式化，strptime 解析',
        'timedelta 做时间加减',
        'json.dumps / loads 处理字符串',
        'json.dump / load 处理文件，ensure_ascii=False 显示中文'
    ],
    l32: [
        'requests.get / post 发请求',
        'timeout 和 raise_for_status 是标配',
        'r.json() 直接把响应解析成字典',
        're.findall / search / sub 是常用方法',
        '贪婪 vs 非贪婪：.* 和 .*?'
    ],

    /* ============ 阶段 10 项目实战 ============ */
    l33: [
        '数据结构：{title, done} 嵌套在列表里',
        'load / save 函数职责分离',
        'try/except 处理非法输入，不让程序崩',
        'enumerate 输出带编号的列表',
        '重构思路：过程式 → 面向对象'
    ],
    l34: [
        'f-string 拼 URL，把城市名嵌进去',
        'timeout=8 防止请求无限等待',
        '逐层索引 JSON：data["a"][0]["b"]',
        '先手动看接口返回，再写代码',
        '面向对象封装：App 类管理查询和展示'
    ],
    l35: [
        'requests 拿 HTML，BeautifulSoup 解析',
        'CSS 选择器：soup.select("div.item a")',
        '翻页抓取要检查数据为空时停止',
        '遵守 robots.txt，加 time.sleep(1)',
        '道德底线：不爬隐私数据，不商业用途'
    ],
    l36: [
        'Student 和 Manager 各司其职',
        '@property 把平均分做成计算属性',
        '@classmethod 从字典还原对象',
        'lambda + sorted 按平均分排名',
        'json 持久化，异常兜底，单元测试'
    ]

};