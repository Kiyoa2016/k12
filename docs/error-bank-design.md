# 错题库设计文档

## 一、数据模型

### 错题数据结构

| 字段 | 类型 | 说明 | 来源 |
|------|------|------|------|
| id | string | 错题唯一标识 | 系统生成 |
| content | string | 题目内容（文本） | AI 批改 / 手动录入 |
| imageUrl | string? | 题目图片 | AI 批改 / 手动录入 |
| correctAnswer | string | 正确答案 | AI 批改 / 手动录入 |
| studentAnswer | string | 学生答案 | AI 批改 |
| subject | string | 学科（数学/语文/英语） | 自动关联 |
| curriculumId | string | 课标知识点 ID | AI 自动识别 |
| cognitiveLevel | string | 认知层次（了解/理解/掌握/运用） | AI 推断 |
| errorType | string | 错误类型（概念性/计算性/审题不清） | AI 推断 |
| errorStudents | string[] | 出错学生 ID 列表 | 批改自动归集 |
| source | string | 来源（作业批改/手动录入） | 自动标记 |
| createdAt | timestamp | 记录时间 | 自动记录 |
| classId | string | 班级 ID | 自动关联 |
| teacherId | string | 教师 ID | 自动关联 |

### 课标知识点结构

```
学科 → 学段 → 领域 → 知识点子类 → 细粒度知识点
```

示例（小学数学）：
```
数学 → 第一学段(1-2年级) → 数与代数 → 数的运算 → 乘法运算
数学 → 第二学段(3-4年级) → 图形与几何 → 测量 → 周长计算
```
