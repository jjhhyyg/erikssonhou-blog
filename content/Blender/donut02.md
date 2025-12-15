---
title: Blender donut 学习项目：2、甜甜圈与糖浆建模
date: 2025-12-12
description: Blender 甜甜圈糖浆建模技巧与高级 Modifier 应用
updateDate: 2025-12-12
---

## 一、基础物体操作

### 1.1 物体复制与删除

| 快捷键 | 功能 | 应用场景 |
|--------|------|----------|
| **Shift+D** | 复制物体 | 快速创建相似物体 |
| **Esc** (复制后) | 取消移动 | 将复制物体创建在原点位置 |
| **X** | 删除菜单 | 删除点/线/面（注意不同模式下的效果差异） |

**技巧**：

- 在 **X-Ray** 模式及网格视角下选中物体部分进行删除
- 选择工具默认只选中当前视角下可见的部分
- 删除点、线、面会产生不同效果，需根据需求选择

---

## 二、甜甜圈形状塑造

### 2.1 Proportional Editing（比例编辑）

**快捷键**：**O** 开启/关闭 Proportional Editing

**核心操作**：

1. 选中某个顶点后按 **G** 移动
2. 滚动**滚轮**（或 **PgUp/PgDown**）调整影响范围
3. 按 **X/Y/Z** 限制变形方向（垂直于某轴）

**应用场景**：

- 为甜甜圈表面添加融化糖浆的自然凹陷效果
- 创建有机形状的平滑过渡

### 2.2 自然形状调整方法

**方法一：Proportional Editing 精细调整**

- 使用 **G + Proportional Editing** 逐个调整顶点
- 适合局部微调

**方法二：Lattice（晶格变形）**

1. 选中甜甜圈和糖浆两个物体
2. **Shift+A** → Lattice → **Lattice Deform Selected**
3. 系统自动创建包裹物体的立方体晶格
4. 进入 Edit Mode 编辑晶格，变形会应用到包裹的物体上
5. 在右侧面板：Lattice → Lattice 中调整 **Resolution U/V/W** 参数

**Lattice 优势**：

- ✅ 非破坏性操作（作为 Modifier 存在）
- ✅ 同时变形多个物体，保持相对关系
- ✅ 可随时调整分辨率实现更细粒度控制

---

## 三、糖浆建模技巧

### 3.1 创建滴落糖浆效果

**基础流程**：

1. 选中一条边 → **E** 拉伸至想要的长度
2. 添加 **Subdivision Surface** Modifier 增加平滑度
3. 此时糖浆是悬空的，需贴附到甜甜圈表面

### 3.2 Shrinkwrap Modifier（收缩包裹）

**配置步骤**：

1. 为糖浆添加 **Shrinkwrap** Modifier
2. Target 选择甜甜圈物体
3. 糖浆会自动贴附到甜甜圈表面

**⚠️ 关键：Modifier 顺序**

| 错误顺序 | 结果 |
|----------|------|
| Solidify → Shrinkwrap | 先添加厚度，再整体贴附 → 糖浆外表面与甜甜圈表面重合（覆盖效果） |

| 正确顺序 | 结果 |
|----------|------|
| **Shrinkwrap → Solidify** | 先贴附网格，再添加厚度 → 糖浆自然覆盖在表面上 ✅ |

**技巧**：

- 在 Modifier 面板中拖动调整顺序
- **Ctrl+A** 可以 Apply Modifier（破坏性操作）

### 3.3 从闭合边创建延伸边

**方法**：

1. 选中闭合的边循环
2. 按 **E**（Extrude）
3. 立即按 **Esc** 取消移动
4. 按 **S**（Scale）进行缩放

**⚠️ 注意**：

- 按 E → Esc 后会产生重合边
- **解决方案**：选择全部顶点 → **M**（Merge）→ **By Distance**
- 界面底部会提示删除了多少重复顶点

### 3.4 糖浆细节塑造

#### 方法一：Sculpting（雕刻模式）

**推荐工具**：

1. 切换到 **Sculpting** 菜单
2. **Inflate/Deflate** 画笔：增加/减少厚度
3. **Grab** 画笔：修改整体形状

**适用场景**：快速调整糖浆的有机形状

#### 方法二：手动编辑

1. Apply **Subdivision Surface** Modifier
2. 使用 **G/S** 等工具逐个调整顶点
3. 适合精细局部调整

### 3.5 糖浆滴落处圆润效果

**调整交界弧度的两种方法**：

**方法一：Loop Cut**

- 在底部平面添加 **Loop Cut**（Cmd+R）
- 用 **G+G** 滑动至合适位置

**方法二：Edge Crease（边缘折痕）**

- 选中边缘 → 右键 → **Edge Crease**（或 **Shift+E**）
- 拖动鼠标调整折痕强度
- 影响 Subdivision Surface 的细分效果

---

## 四、物体关系管理

### 4.1 独立物体 vs 合并物体

**重要概念**：

- 在 **Object Mode** 下，物体接触**不会自动产生关联**
- 每个物体保持独立，可分别编辑

**检查方法**：

1. 在 **Outliner** 面板查看物体是否独立列出
2. 确认是否误按 **Ctrl+J** 合并了物体

**合并物体**：

- **Ctrl+J**：将多个选中物体合并为单一物体
- 合并后共享同一套顶点数据

---

## 五、工作流程总结

### 5.1 甜甜圈塑形流程

1. **创建基础环形** → Shift+A 添加 Torus
2. **Proportional Editing** → 添加表面起伏
3. **Lattice 整体变形** → 调整整体形态
4. **细节调整** → Sculpting 或手动编辑

### 5.2 糖浆制作流程

1. **选择边循环** → 确定糖浆覆盖范围
2. **E → Esc → S** → 创建延伸边
3. **M → By Distance** → 清理重复顶点
4. **添加 Modifiers**：
   - Shrinkwrap（贴附甜甜圈）
   - Solidify（添加厚度）
   - Subdivision Surface（平滑表面）
5. **调整细节**：
   - Loop Cut 控制边缘
   - Edge Crease 调整弧度
   - Sculpting 添加滴落效果

---

## 六、常见陷阱与排查

### 6.1 移动物体时其他物体也跟着动

**现象**：

- 移动杯子/甜甜圈时，盘子也跟着有轻微移动
- 物体之间明明是独立的，但操作时互相影响

**根本原因**：

- ⚠️ **Proportional Editing (O) 仍处于开启状态**
- 在 Object Mode 下，Proportional Editing 会影响附近的所有物体

**解决方案**：

1. 按 **O** 关闭 Proportional Editing
2. 检查顶部工具栏的图标确认已关闭（图标不高亮）

**最佳实践**：

- ✅ 仅在需要有机变形时开启 Proportional Editing
- ✅ 用完后立即按 **O** 关闭
- ✅ 移动独立物体前检查工具栏状态

### 6.2 Proportional Editing 使用场景对比

| 模式 | 是否开启 Proportional Editing | 应用场景 |
|------|------------------------------|----------|
| **Edit Mode** | ✅ 开启 | 塑造甜甜圈表面凹陷、创建有机形状 |
| **Object Mode** | ❌ 关闭 | 移动独立物体（杯子、甜甜圈、盘子） |

---

## 七、关键要点

✅ **Proportional Editing (O)** 是创建有机形状的核心工具
✅ **Modifier 顺序极其重要**：Shrinkwrap 必须在 Solidify 之前
✅ **Lattice 变形**：同时调整多个物体的最佳方案
✅ **E → Esc → S**：从闭合边创建延伸边的标准流程
✅ **M → By Distance**：及时清理重复顶点，避免后续问题
✅ **Edge Crease** vs **Loop Cut**：两种控制细分弧度的方法
✅ **Sculpting 模式**：快速添加有机细节（Inflate/Grab 画笔）
✅ **Ctrl+A Apply Modifier**：确认效果后再执行破坏性操作
✅ **Object Mode 物体独立**：接触不会自动关联，检查 Outliner 确认
✅ **非破坏性优先**：尽可能使用 Modifier，延后 Apply 时机
