/* ============================================================
   PyLearn 闯关题库
   ============================================================ */

window.PracticeQuestions = {

    /* ========== 简单难度 ========== */
    easy: [
        {
            id: 'e01',
            title: '输出你的名字',
            desc: '使用 print() 函数输出你的名字。',
            starterCode: 'print("在这里写你的名字")\n',
            answer: 'print("我的名字")\n',
            check: { code: ['print'] }
        },
        {
            id: 'e02',
            title: '计算两数之和',
            desc: '定义变量 a = 10, b = 20，计算它们的和并打印。',
            starterCode: 'a = 10\nb = 20\n# 在这里写代码\n',
            answer: 'a = 10\nb = 20\nprint(a + b)\n',
            check: ['30']
        },
        {
            id: 'e03',
            title: '判断奇偶',
            desc: '给定变量 n = 7，判断它是奇数还是偶数，并打印结果。',
            starterCode: 'n = 7\n# 在这里写代码\n',
            answer: 'n = 7\nif n % 2 == 0:\n    print("偶数")\nelse:\n    print("奇数")\n',
            check: ['奇数']
        },
        {
            id: 'e04',
            title: '计算字符串长度',
            desc: '给定字符串 s = "Hello, PyLearn!"，打印它的长度。',
            starterCode: 's = "Hello, PyLearn!"\n# 在这里写代码\n',
            answer: 's = "Hello, PyLearn!"\nprint(len(s))\n',
            check: ['15']
        },
        {
            id: 'e05',
            title: '类型转换',
            desc: '将字符串 "3.14" 转换为浮点数并打印。',
            starterCode: 's = "3.14"\n# 在这里写代码\n',
            answer: 's = "3.14"\nprint(float(s))\n',
            check: ['3.14']
        }
    ],

    /* ========== 普通难度 ========== */
    normal: [
        {
            id: 'n01',
            title: '反转字符串',
            desc: '给定字符串 s = "Python"，使用切片将其反转并打印。',
            starterCode: 's = "Python"\n# 在这里写代码\n',
            answer: 's = "Python"\nprint(s[::-1])\n',
            check: ['nohtyP']
        },
        {
            id: 'n02',
            title: '列表去重',
            desc: '给定列表 lst = [1, 2, 2, 3, 3, 3]，去除重复元素并打印。',
            starterCode: 'lst = [1, 2, 2, 3, 3, 3]\n# 在这里写代码\n',
            answer: 'lst = [1, 2, 2, 3, 3, 3]\nprint(list(set(lst)))\n',
            check: ['1', '2', '3']
        },
        {
            id: 'n03',
            title: '判断素数',
            desc: '编写程序判断一个数 n = 17 是否为素数，并打印结果（输出 "素数" 或 "不是素数"）。',
            starterCode: 'n = 17\n# 在这里写代码\n',
            answer: 'n = 17\nif n > 1:\n    is_prime = True\n    for i in range(2, int(n**0.5)+1):\n        if n % i == 0:\n            is_prime = False\n            break\n    print("素数" if is_prime else "不是素数")\nelse:\n    print("不是素数")\n',
            check: ['素数']
        },
        {
            id: 'n04',
            title: '字典合并',
            desc: '将两个字典 d1 = {"a": 1} 和 d2 = {"b": 2} 合并为一个字典并打印。',
            starterCode: 'd1 = {"a": 1}\nd2 = {"b": 2}\n# 在这里写代码\n',
            answer: 'd1 = {"a": 1}\nd2 = {"b": 2}\nmerged = {**d1, **d2}\nprint(merged)\n',
            check: ['a', 'b', '1', '2']
        },
        {
            id: 'n05',
            title: '列表推导式',
            desc: '使用列表推导式生成 1—10 中所有偶数的平方组成的列表，并打印。',
            starterCode: '# 在这里写代码\n',
            answer: 'result = [i ** 2 for i in range(1, 11) if i % 2 == 0]\nprint(result)\n',
            check: ['4', '16', '36', '64', '100']
        },
        {
            id: 'n06',
            title: '统计元音',
            desc: '给定 text = "Hello World"，统计其中元音字母（a/e/i/o/u，不区分大小写）的个数并打印。',
            starterCode: 'text = "Hello World"\n# 在这里写代码\n',
            answer: 'text = "Hello World"\ncount = sum(1 for ch in text.lower() if ch in "aeiou")\nprint(count)\n',
            check: ['3']
        }
    ],

    /* ========== 困难难度 ========== */
    hard: [
        {
            id: 'h01',
            title: '冒泡排序',
            desc: '使用冒泡排序算法对列表 nums = [64, 34, 25, 12, 22, 11, 90] 进行升序排序，并打印排序后的列表。',
            starterCode: 'nums = [64, 34, 25, 12, 22, 11, 90]\n# 在这里写代码\n',
            answer: 'nums = [64, 34, 25, 12, 22, 11, 90]\nn = len(nums)\nfor i in range(n-1):\n    for j in range(n-i-1):\n        if nums[j] > nums[j+1]:\n            nums[j], nums[j+1] = nums[j+1], nums[j]\nprint(nums)\n',
            check: ['11', '12', '22', '25', '34', '64', '90']
        },
        {
            id: 'h02',
            title: '不用 max() 找最大值',
            desc: '不使用内置的 max() 函数，找出列表 nums = [3, 7, 2, 9, 5] 中的最大值并打印。',
            starterCode: 'nums = [3, 7, 2, 9, 5]\n# 在这里写代码\n',
            answer: 'nums = [3, 7, 2, 9, 5]\nmax_val = nums[0]\nfor num in nums:\n    if num > max_val:\n        max_val = num\nprint(max_val)\n',
            check: ['9']
        },
        {
            id: 'h03',
            title: '计算阶乘',
            desc: '编写一个函数 factorial(n)，计算 n 的阶乘。调用该函数计算 5 的阶乘并打印。',
            starterCode: 'def factorial(n):\n    # 在这里写代码\n    pass\n\nprint(factorial(5))\n',
            answer: 'def factorial(n):\n    result = 1\n    for i in range(1, n + 1):\n        result *= i\n    return result\n\nprint(factorial(5))\n',
            check: ['120']
        },
        {
            id: 'h04',
            title: '斐波那契数列',
            desc: '用循环输出斐波那契数列的前 10 项，每项用空格分隔打印在同一行。',
            starterCode: '# 在这里写代码\n',
            answer: 'a, b = 0, 1\nresult = []\nfor _ in range(10):\n    result.append(str(a))\n    a, b = b, a + b\nprint(" ".join(result))\n',
            check: ['0', '1', '1', '2', '3', '5', '8', '13', '21', '34']
        },
        {
            id: 'h05',
            title: '两数之和',
            desc: '给定列表 nums = [2, 7, 11, 15] 和目标值 target = 9，找出列表中和为目标值的两个数的下标，以元组形式打印（例如 (0, 1)）。',
            starterCode: 'nums = [2, 7, 11, 15]\ntarget = 9\n# 在这里写代码\n',
            answer: 'nums = [2, 7, 11, 15]\ntarget = 9\nresult = None\nfor i in range(len(nums)):\n    for j in range(i+1, len(nums)):\n        if nums[i] + nums[j] == target:\n            result = (i, j)\n            break\n    if result:\n        break\nprint(result)\n',
            check: ['(0, 1)']
        },
        {
            id: 'h06',
            title: '回文字符串判断',
            desc: '编写一个函数 is_palindrome(s)，判断字符串 s 是否是回文（正着读和反着读一样）。调用并测试 "level" 和 "hello"，分别打印 True 和 False。',
            starterCode: 'def is_palindrome(s):\n    # 在这里写代码\n    pass\n\nprint(is_palindrome("level"))\nprint(is_palindrome("hello"))\n',
            answer: 'def is_palindrome(s):\n    return s == s[::-1]\n\nprint(is_palindrome("level"))\nprint(is_palindrome("hello"))\n',
            check: ['True', 'False']
        }
    ],

    /* ========== 自由练习 ========== */
    free: {
        title: '自由练习',
        desc: '在这里编写任意 Python 代码，自由探索。支持大部分标准库。',
        starterCode: '# 在这里自由编写 Python 代码\nprint("Hello, PyLearn!")\n',
        answer: 'print("Hello, PyLearn!")\n',
        check: ['Hello']
    }
};