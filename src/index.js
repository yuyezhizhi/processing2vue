/**
 * Processing to Vue 3 Component Converter
 *
 * 将Processing代码转换为Vue 3组件（使用p5.js）
 */

/**
 * 转换配置
 */
export const defaultOptions = {
  useP5: true,           // 使用p5.js模式
  compositionApi: true,   // 使用Composition API
  scoped: true,           // 添加scoped样式
  canvasId: 'processing-canvas',
  width: 400,
  height: 400,
}

/**
 * 关键字映射：Processing → JavaScript
 */
const keywordMap = {
  'void': 'function',
  'setup': 'p.setup',
  'draw': 'p.draw',
  'mousePressed': 'p.mousePressed',
  'mouseReleased': 'p.mouseReleased',
  'mouseMoved': 'p.mouseMoved',
  'mouseDragged': 'p.mouseDragged',
  'keyPressed': 'p.keyPressed',
  'keyReleased': 'p.keyReleased',
  'keyTyped': 'p.keyTyped',
  'size(': 'p.createCanvas(',
  'width': 'p.width',
  'height': 'p.height',
  'mouseX': 'p.mouseX',
  'mouseY': 'p.mouseY',
  'pmouseX': 'p.pmouseX',
  'pmouseY': 'p.pmouseY',
  'frameCount': 'p.frameCount',
  'frameRate': 'p.frameRate',
  'millis': 'p.millis',
  'random': 'p.random',
  'noise': 'p.noise',
  'map': 'p.map',
  'sin': 'p.sin',
  'cos': 'p.cos',
  'tan': 'p.tan',
  'abs': 'p.abs',
  'floor': 'p.floor',
  'ceil': 'p.ceil',
  'round': 'p.round',
  'min': 'p.min',
  'max': 'p.max',
  'dist': 'p.dist',
  'PI': 'p.PI',
  'TWO_PI': 'p.TWO_PI',
  'HALF_PI': 'p.HALF_PI',
  'QUARTER_PI': 'p.QUARTER_PI',
  'print(': 'p.print(',
  'println(': 'p.println(',
  'class ': 'class ',
  'new ': 'new ',
}

/**
 * 图形函数映射
 */
const graphicsFuncs = [
  'circle', 'ellipse', 'rect', 'line', 'point', 'triangle', 'quad',
  'arc', 'bezier', 'bezierPoint', 'bezierVertex',
  'fill', 'stroke', 'noFill', 'noStroke', 'strokeWeight',
  'background', 'clear',
  'text', 'textSize', 'textAlign', 'textWidth',
  'push', 'pop', 'translate', 'rotate', 'scale',
  'image', 'imageMode',
  'loadImage',
]

/**
 * 检测是否为图形函数
 */
function isGraphicsFunc(name) {
  return graphicsFuncs.includes(name)
}

/**
 * 处理函数名
 */
function transformFunctionName(code) {
  let result = code

  for (const [proc, js] of Object.entries(keywordMap)) {
    // 避免部分匹配
    const regex = new RegExp(`\\b${proc.replace('(', '\\(')}\\b`, 'g')
    result = result.replace(regex, js)
  }

  return result
}

/**
 * 提取全局变量声明
 */
function extractGlobalVars(code) {
  const vars = []
  const lines = code.split('\n')
  const varTypes = ['int', 'float', 'boolean', 'String', 'color', 'PVector', 'ArrayList', 'List']

  for (const line of lines) {
    const trimmed = line.trim()
    // 跳过空行和函数/类定义
    if (!trimmed || trimmed.startsWith('void') || trimmed.startsWith('class')) {
      continue
    }
    for (const type of varTypes) {
      if (trimmed.startsWith(type) && trimmed.includes(';') && !trimmed.includes('(')) {
        // 移除类型声明，保留完整的变量声明（包括数组）
        let varWithoutType = trimmed.replace(new RegExp(`^\\s*${type}\\s+`), '')
        // 移除末尾的分号
        varWithoutType = varWithoutType.replace(/;$/, '')
        // 转换为 JavaScript 语法：int[] x = new int[10]; -> let x = new Array(10)
        const jsVar = varWithoutType
          .replace(/new\s+(\w+)\[\s*(\d+)\s*\]/g, 'new Array($2)') // new int[10] -> new Array(10)
          .replace(/^(\w+)\[\s*\]/g, 'let $1 = []') // int[] x -> let x = []
        vars.push(jsVar)
        break
      }
    }
  }

  return vars
}

/**
 * 提取类定义
 */
function extractClasses(code) {
  const classes = []
  // 匹配类定义：class ClassName { ... }
  const classPattern = /(?:public\s+)?(?:private\s+)?(?:static\s+)?class\s+(\w+)\s*\{/g
  let match

  while ((match = classPattern.exec(code)) !== null) {
    const className = match[1]
    const start = match.index
    const braceStart = code.indexOf('{', start)

    // 找配对的右括号
    let braceCount = 1
    let end = braceStart + 1
    while (braceCount > 0 && end < code.length) {
      if (code[end] === '{') braceCount++
      if (code[end] === '}') braceCount--
      end++
    }

    const classBody = code.slice(braceStart + 1, end - 1)
    classes.push({
      name: className,
      body: classBody,
    })
  }

  return classes
}

/**
 * 转换类定义
 */
function transformClasses(classes) {
  return classes.map(cls => {
    // 移除类体中的类型声明
    let classBody = cls.body
      .replace(/\b(int|float|boolean|String|color|void)\s+/g, '') // 移除所有类型关键字
      .replace(/:\s*(int|float|boolean|String|color)\s*/g, '') // 移除类型注解

    return `  class ${cls.name} {
${classBody}
  }`
  }).join('\n\n')
}

/**
 * 解析Processing代码结构
 */
export function parse(code) {
  // 移除注释
  let cleanCode = code
    .replace(/\/\/.*$/gm, '')  // 单行注释
    .replace(/\/\*[\s\S]*?\*\//g, '')  // 多行注释

  // 提取size()参数
  const sizeMatch = cleanCode.match(/size\s*\(\s*(\d+)\s*,\s*(\d+)\s*[,\)]/)
  const width = sizeMatch ? parseInt(sizeMatch[1]) : defaultOptions.width
  const height = sizeMatch ? parseInt(sizeMatch[2]) : defaultOptions.height

  // 提取全局变量
  const globalVars = extractGlobalVars(cleanCode)

  // 提取类定义
  const classes = extractClasses(cleanCode)

  // 提取各个函数块
  const functions = {}
  const funcPattern = /(?:public\s+)?(?:private\s+)?(?:static\s+)?void\s+(\w+)\s*\(([^)]*)\)\s*\{/g
  let match

  while ((match = funcPattern.exec(cleanCode)) !== null) {
    const funcName = match[1]
    const params = match[2].trim()
    const start = match.index
    const braceStart = cleanCode.indexOf('{', start)

    // 找配对的右括号
    let braceCount = 1
    let end = braceStart + 1
    while (braceCount > 0 && end < cleanCode.length) {
      if (cleanCode[end] === '{') braceCount++
      if (cleanCode[end] === '}') braceCount--
      end++
    }

    const funcBody = cleanCode.slice(braceStart + 1, end - 1)
    functions[funcName] = { params, body: funcBody }
  }

  return {
    width,
    height,
    globalVars,
    classes,
    functions,
    originalCode: code,
  }
}

/**
 * 生成Vue组件
 */
export function generate(parsed, options = {}) {
  const opts = { ...defaultOptions, ...options }
  const { width, height, globalVars, classes, functions } = parsed

  // 处理全局变量
  const globalVarNames = globalVars.map(v => {
    const match = v.match(/(?:int|float|boolean|String|color|PVector|ArrayList|List)\s+(\w+)/)
    return match ? match[1] : null
  }).filter(Boolean)

  // 转换类定义
  const classDefinitions = transformClasses(classes)

  // 生成setup函数体
  let setupBody = `p.createCanvas(${width}, ${height});\n`
  if (functions.setup) {
    const setupLines = functions.setup.body.split('\n')
      .filter(line => !line.trim().startsWith('size'))
      .join('\n      ')
    setupBody += '    ' + transformFunctionName(setupLines)
  }

  // 生成draw函数体
  let drawBody = ''
  if (functions.draw) {
    drawBody = transformFunctionName(functions.draw.body)
  } else {
    drawBody = '// No draw function'
  }

  // 生成其他事件函数
  const eventHandlers = []
  const eventFuncs = ['mousePressed', 'mouseReleased', 'mouseMoved', 'mouseDragged',
                       'keyPressed', 'keyReleased', 'keyTyped']

  for (const eventName of eventFuncs) {
    if (functions[eventName]) {
      const handler = transformFunctionName(functions[eventName].body)
      eventHandlers.push(`  p.${eventName} = () => {\n    ${handler}\n  }`)
    }
  }

  // 组装Vue组件
  const vueComponent = `<template>
  <div class="processing-wrapper">
    <div ref="canvasContainer"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
${opts.useP5 ? "import p5 from 'p5'" : ''}

const canvasContainer = ref(null)
let sketchInstance = null

// 全局变量
${globalVars.join('\n')}

// 类定义
${classDefinitions}

const sketch = (p) => {
  // Setup
  p.setup = () => {
${setupBody.split('\n').map(l => '    ' + l).join('\n')}
  }

  // Draw
  p.draw = () => {
${drawBody.split('\n').map(l => '    ' + l).join('\n')}
  }
${eventHandlers.join('\n')}
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

<style${opts.scoped ? ' scoped' : ''}>
.processing-wrapper {
  width: ${width}px;
  height: ${height}px;
}
.processing-wrapper canvas {
  display: block;
}
</style>
`

  return vueComponent
}

/**
 * 一键转换
 */
export function convert(processingCode, options = {}) {
  const parsed = parse(processingCode)
  return generate(parsed, options)
}

/**
 * CLI工具
 */
export function cli() {
  const fs = require('fs')
  const path = require('path')

  const inputFile = process.argv[2]
  const outputFile = process.argv[3] || inputFile.replace('.pde', '.vue')

  if (!inputFile) {
    console.error('Usage: node src/index.js <input.pde> [output.vue]')
    process.exit(1)
  }

  const code = fs.readFileSync(inputFile, 'utf-8')
  const vueCode = convert(code)

  fs.writeFileSync(outputFile, vueCode)
  console.log(`✅ Converted: ${inputFile} → ${outputFile}`)
}

export default { convert, parse, generate }
