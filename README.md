# Processing2Vue

🎨 将 Processing 代码转换为 Vue 3 组件，让创意作品无缝迁移到 Web

[在线体验](https://processing2vue.vercel.app/) | [Demo 预览](./demos/index.html)

## ✨ 特性

- 🔄 **一键转换** - Processing 代码 → Vue 3 组件
- ⚡ **实时预览** - 边写边看效果
- 🎯 **p5.js 驱动** - 基于成熟的 p5.js 库
- 📦 **零配置** - 开箱即用，无需复杂设置
- 📦 **npm 发布** - 方便集成到你的项目

## 🚀 快速开始

### 在线使用

直接打开 [demos/index.html](./demos/index.html) 或访问在线版本

### 命令行使用

```bash
# 安装
npm install -g processing2vue

# 转换单个文件
p2v input.pde output.vue

# 或直接转换
p2v input.pde
```

### 编程使用

```javascript
import { convert } from 'processing2vue'

const processingCode = `
void setup() {
  size(400, 400);
}

void draw() {
  background(0);
  circle(mouseX, mouseY, 50);
}
`

const vueComponent = convert(processingCode)
console.log(vueComponent)
```

## 📖 使用示例

### 输入 Processing 代码

```java
void setup() {
  size(400, 400);
  background(0);
}

void draw() {
  // 跟随鼠标的渐变圆
  background(0, 20);
  
  for (int i = 5; i > 0; i--) {
    fill(0, 200, 255, 50);
    circle(mouseX, mouseY, i * 30);
  }
}
```

### 输出 Vue 3 组件

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
    p.background(0)
  }

  p.draw = () => {
    p.background(0, 20)
    
    for (let i = 5; i > 0; i--) {
      p.fill(0, 200, 255, 50)
      p.circle(p.mouseX, p.mouseY, i * 30)
    }
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

## 🔧 支持的 Processing 语法

### 图形绘制

| Processing | p5.js |
|-----------|-------|
| `circle(x, y, r)` | ✅ |
| `ellipse(x, y, w, h)` | ✅ |
| `rect(x, y, w, h)` | ✅ |
| `line(x1, y1, x2, y2)` | ✅ |
| `point(x, y)` | ✅ |
| `triangle(x1, y1, x2, y2, x3, y3)` | ✅ |
| `arc(x, y, w, h, start, stop)` | ✅ |
| `bezier(...)` | ✅ |

### 颜色和样式

| Processing | p5.js |
|-----------|-------|
| `fill(r, g, b)` | ✅ |
| `stroke(r, g, b)` | ✅ |
| `noFill()` | ✅ |
| `noStroke()` | ✅ |
| `background(r, g, b)` | ✅ |
| `strokeWeight(w)` | ✅ |

### 坐标变换

| Processing | p5.js |
|-----------|-------|
| `translate(x, y)` | ✅ |
| `rotate(angle)` | ✅ |
| `scale(s)` | ✅ |
| `push()` | ✅ |
| `pop()` | ✅ |

### 变量和常量

| Processing | p5.js |
|-----------|-------|
| `width` | ✅ |
| `height` | ✅ |
| `mouseX` | ✅ |
| `mouseY` | ✅ |
| `frameCount` | ✅ |
| `frameRate` | ✅ |
| `PI`, `TWO_PI` | ✅ |

### 数学函数

| Processing | p5.js |
|-----------|-------|
| `random()` | ✅ |
| `map()` | ✅ |
| `sin()`, `cos()`, `tan()` | ✅ |
| `abs()`, `floor()`, `ceil()` | ✅ |
| `dist()` | ✅ |
| `lerp()` | ✅ |

### 文本

| Processing | p5.js |
|-----------|-------|
| `text(str, x, y)` | ✅ |
| `textSize(s)` | ✅ |
| `textAlign(align)` | ✅ |
| `loadFont()` | 🔜 规划中 |
| `textFont()` | 🔜 规划中 |

## 📦 在 Vue 项目中使用

### 1. 安装依赖

```bash
npm install p5
npm install processing2vue
```

### 2. 在 Vue 组件中使用

```vue
<template>
  <MyProcessingSketch />
</template>

<script setup>
import MyProcessingSketch from './MyProcessingSketch.vue'
</script>
```

## 🛠️ API

### `convert(code, options)`

将 Processing 代码转换为 Vue 组件。

**参数：**
- `code` (string): Processing 代码
- `options` (object): 可选配置

**选项：**
- `useP5` (boolean): 使用 p5.js，默认 true
- `compositionApi` (boolean): 使用 Composition API，默认 true
- `scoped` (boolean): 使用 scoped 样式，默认 true
- `width` (number): 画布宽度，默认 400
- `height` (number): 画布高度，默认 400

**返回：** Vue 组件代码字符串

### `parse(code)`

解析 Processing 代码，返回 AST。

### `generate(ast, options)`

从 AST 生成 Vue 组件。

## 🔜 规划中

- [ ] 图像加载支持
- [ ] 字体加载支持
- [ ] 声音支持 (p5.sound)
- [ ] 3D 模式支持
- [ ] 交互事件支持 (keyPressed, mousePressed 等)
- [ ] 类 (class) 支持
- [ ] 文件夹批量转换

## 📄 许可证

Apache License 2.0 - 详见 [LICENSE](./LICENSE)

## 🙏 致谢

- [p5.js](https://p5js.org/) - 优秀的创意编程库
- [Processing](https://processing.org/) - 开创性的创意编程环境
