<div align="center">

# Processing2Vue

**🎨 将 Processing 代码转换为 Vue 3 组件，让创意作品无缝迁移到 Web**

[![npm version](https://badge.fury.io/js/processing2vue.svg)](https://www.npmjs.com/package/processing2vue)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/yuyezhizhi/processing2vue?style=social)](https://github.com/yuyezhizhi/processing2vue/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/yuyezhizhi/processing2vue?style=social)](https://github.com/yuyezhizhi/processing2vue/network/members)
[![GitHub issues](https://img.shields.io/github/issues/yuyezhizhi/processing2vue)](https://github.com/yuyezhizhi/processing2vue/issues)
[![GitHub license](https://img.shields.io/github/license/yuyezhizhi/processing2vue)](https://github.com/yuyezhizhi/processing2vue/blob/main/LICENSE)
[![Node.js Version](https://img.shields.io/node/v/processing2vue)](https://github.com/yuyezhizhi/processing2vue)

[在线体验](https://processing2vue.vercel.app/) | [Demo 预览](./demos/index.html)

</div>

---

## ✨ 特性

- 🔄 **一键转换** - Processing 代码 → Vue 3 组件
- ⚡ **实时预览** - 边写边看效果
- 🎯 **p5.js 驱动** - 基于成熟的 p5.js 库
- 📦 **零配置** - 开箱即用，无需复杂设置
- 🎨 **完整支持** - 图形、颜色、坐标变换、动画等
- 📦 **npm 包** - 方便集成到你的项目

---

## 🚀 快速开始

### 方式一：命令行使用

```bash
# 安装
npm install -g processing2vue

# 转换单个文件
p2v input.pde output.vue

# 或直接转换（自动命名）
p2v input.pde
```

### 方式二：在 Vue 项目中使用

```bash
# 安装
npm install p5 processing2vue
```

```vue
<template>
  <MyProcessingSketch />
</template>

<script setup>
import MyProcessingSketch from './MyProcessingSketch.vue'
</script>
```

### 方式三：编程方式

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

---

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

---

## 🎯 支持的 Processing 语法

### 图形绘制

| Processing | p5.js | 状态 |
|-----------|-------|------|
| `circle(x, y, r)` | `circle()` | ✅ |
| `ellipse(x, y, w, h)` | `ellipse()` | ✅ |
| `rect(x, y, w, h)` | `rect()` | ✅ |
| `line(x1, y1, x2, y2)` | `line()` | ✅ |
| `point(x, y)` | `point()` | ✅ |
| `triangle(x1, y1, x2, y2, x3, y3)` | `triangle()` | ✅ |
| `arc(x, y, w, h, start, stop)` | `arc()` | ✅ |
| `bezier(...)` | `bezier()` | ✅ |
| `quad(...)` | `quad()` | ✅ |
| `beginShape()`, `vertex()`, `endShape()` | `beginShape()`, `vertex()`, `endShape()` | ✅ |

### 颜色和样式

| Processing | p5.js | 状态 |
|-----------|-------|------|
| `fill(r, g, b)` | `fill()` | ✅ |
| `stroke(r, g, b)` | `stroke()` | ✅ |
| `noFill()` | `noFill()` | ✅ |
| `noStroke()` | `noStroke()` | ✅ |
| `background(r, g, b)` | `background()` | ✅ |
| `strokeWeight(w)` | `strokeWeight()` | ✅ |
| `colorMode()` | `colorMode()` | ✅ |

### 坐标变换

| Processing | p5.js | 状态 |
|-----------|-------|------|
| `translate(x, y)` | `translate()` | ✅ |
| `rotate(angle)` | `rotate()` | ✅ |
| `scale(s)` | `scale()` | ✅ |
| `push()` | `push()` | ✅ |
| `pop()` | `pop()` | ✅ |
| `resetMatrix()` | `resetMatrix()` | ✅ |

### 变量和常量

| Processing | p5.js | 状态 |
|-----------|-------|------|
| `width` | `width` | ✅ |
| `height` | `height` | ✅ |
| `mouseX` | `mouseX` | ✅ |
| `mouseY` | `mouseY` | ✅ |
| `pmouseX` | `pmouseX` | ✅ |
| `pmouseY` | `pmouseY` | ✅ |
| `frameCount` | `frameCount` | ✅ |
| `frameRate` | `frameRate()` | ✅ |
| `PI`, `TWO_PI`, `HALF_PI` | `PI`, `TWO_PI`, `HALF_PI` | ✅ |

### 数学函数

| Processing | p5.js | 状态 |
|-----------|-------|------|
| `random()` | `random()` | ✅ |
| `randomSeed()` | `randomSeed()` | ✅ |
| `noise()` | `noise()` | ✅ |
| `map()` | `map()` | ✅ |
| `sin()`, `cos()`, `tan()` | `sin()`, `cos()`, `tan()` | ✅ |
| `abs()`, `floor()`, `ceil()` | `abs()`, `floor()`, `ceil()` | ✅ |
| `dist()` | `dist()` | ✅ |
| `lerp()` | `lerp()` | ✅ |
| `constrain()` | `constrain()` | ✅ |

### 文本

| Processing | p5.js | 状态 |
|-----------|-------|------|
| `text(str, x, y)` | `text()` | ✅ |
| `textSize(s)` | `textSize()` | ✅ |
| `textAlign(align)` | `textAlign()` | ✅ |
| `textLeading(leading)` | `textLeading()` | ✅ |
| `textWidth(str)` | `textWidth()` | ✅ |

### 流程控制

| Processing | 状态 |
|-----------|------|
| `if`, `else` | ✅ |
| `for`, `while` | ✅ |
| `switch`, `case` | ✅ |
| `break`, `continue` | ✅ |

---

## 🛠️ API 文档

### `convert(code, options)`

将 Processing 代码转换为 Vue 组件。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `code` | string | ✅ | Processing 代码 |
| `options` | object | ❌ | 可选配置 |

**options 配置项：**

| 选项 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `useP5` | boolean | true | 使用 p5.js |
| `compositionApi` | boolean | true | 使用 Composition API |
| `scoped` | boolean | true | 使用 scoped 样式 |
| `width` | number | 400 | 画布宽度 |
| `height` | number | 400 | 画布高度 |
| `p5Instance` | string | 'sketchInstance' | p5 实例变量名 |

**返回：** Vue 组件代码字符串

### `parse(code)`

解析 Processing 代码，返回 AST。

### `generate(ast, options)`

从 AST 生成 Vue 组件。

---

## 🧪 开发指南

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/yuyezhizhi/processing2vue.git
cd processing2vue

# 安装依赖
npm install

# 运行开发服务器
npm run dev

# 运行测试
npm test

# 构建
npm run build
```

### 项目结构

```
processing2vue/
├── src/
│   ├── parser/          # 语法解析
│   ├── transformer/     # 代码转换
│   ├── generator/       # Vue 生成
│   └── index.ts         # 主入口
├── demos/               # 示例
├── tests/               # 测试
└── package.json
```

---

## 🔜 规划中

- [ ] 图像加载支持 (`loadImage()`)
- [ ] 字体加载支持 (`loadFont()`, `textFont()`)
- [ ] 声音支持 (p5.sound)
- [ ] 3D 模式支持 (WEBGL)
- [ ] 交互事件支持 (keyPressed, mousePressed 等)
- [ ] 类 (class) 支持
- [ ] 文件夹批量转换
- [ ] TypeScript 支持
- [ ] 更多 p5.js 特性

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

### 代码规范

- 使用 TypeScript
- 遵循 ESLint 规则
- 添加适当的测试
- 更新文档

---

## 📄 许可证

[Apache License 2.0](./LICENSE)

---

## 📚 更多文档

- [更新日志](./CHANGELOG.md) - 查看版本更新历史
- [贡献指南](./CONTRIBUTING.md) - 如何参与贡献
- [安全策略](./SECURITY.md) - 安全漏洞报告流程
- [许可证](./LICENSE) - Apache License 2.0

## 🙏 致谢

- [p5.js](https://p5js.org/) - 优秀的创意编程库
- [Processing](https://processing.org/) - 开创性的创意编程环境
- [Vue.js](https://vuejs.org/) - 渐进式 JavaScript 框架
- [Vite](https://vitejs.dev/) - 下一代前端构建工具
- [Vitest](https://vitest.dev/) - 极速的单元测试框架

---

## 📮 联系方式

- 作者：[yuyezhizhi](https://github.com/yuyezhizhi)
- 问题反馈：[Issues](https://github.com/yuyezhizhi/processing2vue/issues)

---

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yuyezhizhi/processing2vue&type=Date)](https://star-history.com/#yuyezhizhi/processing2vue&Date)

---

<div align="center">

**⭐ 如果这个项目对你有帮助，请给个 Star！**

</div>
