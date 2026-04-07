# 快速入门指南

欢迎来到 Processing2Vue！本指南将帮助你快速上手。

## 📦 安装

### 通过 npm 安装

```bash
npm install processing2vue p5
```

### 全局安装 CLI 工具

```bash
npm install -g processing2vue
```

## 🚀 第一个例子

### 步骤 1：创建 Processing 代码

创建一个文件 `sketch.pde`：

```java
void setup() {
  size(400, 400);
}

void draw() {
  background(220);
  circle(mouseX, mouseY, 50);
}
```

### 步骤 2：转换为 Vue 组件

**方式一：使用 CLI**

```bash
p2v sketch.pde sketch.vue
```

**方式二：使用 npm 包**

```javascript
import { convert } from 'processing2vue'

const processingCode = `
void setup() {
  size(400, 400);
}

void draw() {
  background(220);
  circle(mouseX, mouseY, 50);
}
`

const vueCode = convert(processingCode)
console.log(vueCode)
```

### 步骤 3：在 Vue 项目中使用

创建 Vue 组件 `MySketch.vue`：

```vue
<template>
  <div class="processing-wrapper">
    <div ref="canvasContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import p5 from 'p5'

const canvasContainer = ref(null)
let sketchInstance = null

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(400, 400)
  }

  p.draw = () => {
    p.background(220)
    p.circle(p.mouseX, p.mouseY, 50)
  }
}

onMounted(() => {
  if (canvasContainer.value) {
    sketchInstance = new p5(sketch, canvasContainer.value)
  }
})

onUnmounted(() => {
  if (sketchInstance) {
    sketchInstance.remove()
    sketchInstance = null
  }
})
</script>

<style scoped>
.processing-wrapper {
  width: 400px;
  height: 400px;
}
.processing-wrapper canvas {
  display: block;
}
</style>
```

## 📖 常用功能

### 1. 基本图形

```java
void setup() {
  size(400, 400);
}

void draw() {
  background(255);

  // 圆形
  fill(255, 100, 100);
  circle(100, 100, 50);

  // 矩形
  fill(100, 255, 100);
  rect(150, 75, 50, 50);

  // 线条
  stroke(0);
  strokeWeight(2);
  line(250, 100, 350, 100);
}
```

### 2. 动画

```java
float x = 0;

void setup() {
  size(400, 400);
}

void draw() {
  background(220);
  circle(x, 200, 50);
  x += 2;

  if (x > width) {
    x = 0;
  }
}
```

### 3. 交互

```java
void setup() {
  size(400, 400);
}

void draw() {
  background(220);
  fill(255, 100, 100);
  circle(mouseX, mouseY, 50);
}

void mousePressed() {
  background(255);
}

void keyPressed() {
  if (key == 'r' || key == 'R') {
    background(255, 0, 0);
  }
}
```

### 4. 颜色和样式

```java
void setup() {
  size(400, 400);
}

void draw() {
  background(30);

  // 带透明度的颜色
  noStroke();
  fill(255, 100, 100, 100);
  circle(150, 200, 100);

  fill(100, 255, 100, 100);
  circle(250, 200, 100);
}
```

### 5. 坐标变换

```java
void setup() {
  size(400, 400);
}

void draw() {
  background(220);

  translate(width / 2, height / 2);
  rotate(frameCount * 0.02);

  rectMode(CENTER);
  fill(255, 100, 100);
  rect(0, 0, 100, 100);
}
```

## 🎨 更多示例

查看 `demos/examples/` 目录获取更多示例：

- `circle-bounce.pde` - 弹跳球动画
- `particle-system.pde` - 粒子系统
- `geometric-patterns.pde` - 几何图案

## ⚙️ 配置选项

```javascript
const vueCode = convert(processingCode, {
  width: 800,        // 画布宽度
  height: 600,       // 画布高度
  useP5: true,       // 使用 p5.js
  scoped: true,      // 使用 scoped 样式
  compositionApi: true, // 使用 Composition API
})
```

## 🔄 批量转换

转换整个目录的 `.pde` 文件：

```bash
p2v ./sketches ./vue-components --batch
```

## 🧪 测试

运行测试：

```bash
npm test
```

## 🐛 遇到问题？

1. 检查 [README.md](./README.md) 中的完整文档
2. 查看 [API 文档](./README.md#🛠️-api-文档)
3. 提交 [Issue](https://github.com/yuyezhizhi/processing2vue/issues)
4. 查看 [贡献指南](./CONTRIBUTING.md)

## 📚 下一步

- 阅读 [完整文档](./README.md)
- 查看 [示例代码](./demos/examples/)
- 了解 [API 参考](./README.md#🛠️-api-文档)
- 加入 [GitHub Discussions](https://github.com/yuyezhizhi/processing2vue/discussions)

## 💡 提示

1. **性能优化**：避免在 `draw()` 中创建新对象
2. **响应式画布**：使用 CSS 实现响应式，而不是改变画布大小
3. **清理资源**：确保在 `onUnmounted` 中清理 p5 实例
4. **调试**：使用 `console.log()` 或 p5.js 的 `print()` 函数

---

祝你使用愉快！🎉
