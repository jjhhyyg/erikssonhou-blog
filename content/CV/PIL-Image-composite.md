---
title: PIL.Image.composite() 方法详解
date: 2025-11-29
description: PIL.Image.composite() 功能、参数说明等，通过掩码来在原图像上提取部分图像
---

## 方法签名

```python
PIL.Image.composite(image1, image2, mask)
```

## 功能说明

该方法用于根据掩码(mask)将两张图像合成为一张新图像。它会从两张输入图像中选择像素,选择的依据是掩码图像中对应位置的值。

## 参数说明

- **image1**: 第一张源图像
- **image2**: 第二张源图像  
- **mask**: 掩码图像,用于控制合成规则

## 工作原理

合成的基本规则如下:

- 当掩码像素值为 **255(白色)** 时,输出图像使用 **image1** 对应位置的像素
- 当掩码像素值为 **0(黑色)** 时,输出图像使用 **image2** 对应位置的像素
- 当掩码像素值在 **0-255 之间** 时,进行线性插值混合

数学表达式为:

```plaintext
out = image1 * (mask / 255.0) + image2 * (1 - mask / 255.0)
```

## 约束条件

- 三张图像(image1, image2, mask)必须具有**相同的尺寸**
- image1 和 image2 必须具有**相同的模式**(mode)
- mask 通常使用模式 "L"(灰度图)或 "1"(二值图)

## 使用示例

```python
from PIL import Image

# 加载两张图像
img1 = Image.open("image1.jpg")
img2 = Image.open("image2.jpg")

# 创建掩码(例如:圆形掩码)
mask = Image.new("L", img1.size, 0)
draw = ImageDraw.Draw(mask)
draw.ellipse((50, 50, 200, 200), fill=255)

# 合成图像
result = Image.composite(img1, img2, mask)
result.save("composite_result.jpg")
```

## 应用场景

1. **图像混合**: 实现两张图像的平滑过渡
2. **抠图合成**: 将前景物体合成到新背景上
3. **特效制作**: 创建渐变、晕影等视觉效果
4. **图像修复**: 选择性地融合多张图像的不同区域
