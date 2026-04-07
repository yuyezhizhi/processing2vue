/**
 * 测试文件 - basic.test.js
 */

import { describe, it, expect } from 'vitest'
import { parse, generate, convert } from '../src/index.js'

describe('Processing2Vue - 解析功能', () => {
  it('应该正确解析 size() 参数', () => {
    const code = `
void setup() {
  size(400, 300);
}
`
    const parsed = parse(code)
    expect(parsed.width).toBe(400)
    expect(parsed.height).toBe(300)
  })

  it('应该提取全局变量', () => {
    const code = `
int x = 10;
float y = 20.5;
String name = "test";

void setup() {
  size(400, 400);
}
`
    const parsed = parse(code)
    expect(parsed.globalVars).toHaveLength(3)
  })

  it('应该提取函数块', () => {
    const code = `
void setup() {
  size(400, 400);
}

void draw() {
  background(0);
}

void mousePressed() {
  console.log("clicked");
}
`
    const parsed = parse(code)
    expect(parsed.functions.setup).toBeDefined()
    expect(parsed.functions.draw).toBeDefined()
    expect(parsed.functions.mousePressed).toBeDefined()
  })
})

describe('Processing2Vue - 转换功能', () => {
  it('应该生成有效的 Vue 组件', () => {
    const code = `
void setup() {
  size(400, 400);
}

void draw() {
  background(0);
  circle(mouseX, mouseY, 50);
}
`
    const parsed = parse(code)
    const vueCode = generate(parsed)

    expect(vueCode).toContain('<template>')
    expect(vueCode).toContain('<script setup>')
    expect(vueCode).toContain('import p5')
    expect(vueCode).toContain('onMounted')
    expect(vueCode).toContain('onUnmounted')
  })

  it('应该正确转换 Processing 关键字', () => {
    const code = `
void setup() {
  size(400, 400);
}

void draw() {
  background(0);
  circle(mouseX, mouseY, 50);
}
`
    const vueCode = convert(code)

    expect(vueCode).toContain('p.createCanvas')
    expect(vueCode).toContain('p.background')
    expect(vueCode).toContain('p.circle')
    expect(vueCode).toContain('p.mouseX')
    expect(vueCode).toContain('p.mouseY')
  })

  it('应该支持自定义选项', () => {
    const code = `
void setup() {
  size(400, 400);
}

void draw() {
  background(0);
}
`
    const vueCode = convert(code, {
      width: 800,
      height: 600,
      scoped: false,
    })

    expect(vueCode).toContain('width: 800px')
    expect(vueCode).toContain('height: 600px')
    expect(vueCode).not.toContain('scoped')
  })
})

describe('Processing2Vue - 图形函数', () => {
  it('应该支持 circle', () => {
    const code = 'circle(200, 200, 100);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.circle(200, 200, 100)')
  })

  it('应该支持 ellipse', () => {
    const code = 'ellipse(200, 200, 100, 50);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.ellipse(200, 200, 100, 50)')
  })

  it('应该支持 rect', () => {
    const code = 'rect(100, 100, 50, 50);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.rect(100, 100, 50, 50)')
  })

  it('应该支持 line', () => {
    const code = 'line(0, 0, 400, 400);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.line(0, 0, 400, 400)')
  })
})

describe('Processing2Vue - 颜色函数', () => {
  it('应该支持 fill', () => {
    const code = 'fill(255, 100, 100);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.fill(255, 100, 100)')
  })

  it('应该支持 stroke', () => {
    const code = 'stroke(0);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.stroke(0)')
  })

  it('应该支持 noFill', () => {
    const code = 'noFill();'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.noFill()')
  })
})

describe('Processing2Vue - 坐标变换', () => {
  it('应该支持 translate', () => {
    const code = 'translate(100, 100);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.translate(100, 100)')
  })

  it('应该支持 rotate', () => {
    const code = 'rotate(PI / 4);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.rotate')
  })

  it('应该支持 push/pop', () => {
    const code = 'push(); rect(0, 0, 50, 50); pop();'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.push()')
    expect(vueCode).toContain('p.pop()')
  })
})

describe('Processing2Vue - 数学函数', () => {
  it('应该支持 random', () => {
    const code = 'float x = random(100);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.random(100)')
  })

  it('应该支持 map', () => {
    const code = 'float y = map(x, 0, 100, 0, 200);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.map')
  })

  it('应该支持 sin/cos', () => {
    const code = 'float x = sin(frameCount);'
    const vueCode = convert(code)
    expect(vueCode).toContain('p.sin')
  })
})

describe('Processing2Vue - 事件函数', () => {
  it('应该支持 mousePressed', () => {
    const code = `
void setup() {
  size(400, 400);
}

void mousePressed() {
  background(255);
}
`
    const vueCode = convert(code)
    expect(vueCode).toContain('p.mousePressed')
  })

  it('应该支持 keyPressed', () => {
    const code = `
void setup() {
  size(400, 400);
}

void keyPressed() {
  console.log(key);
}
`
    const vueCode = convert(code)
    expect(vueCode).toContain('p.keyPressed')
  })
})

describe('Processing2Vue - 复杂示例', () => {
  it('应该处理完整的动画示例', () => {
    const code = `
float x = 0;

void setup() {
  size(400, 400);
}

void draw() {
  background(0);
  fill(255, 100, 100);
  circle(x, 200, 50);
  x += 2;
}
`
    const vueCode = convert(code)

    expect(vueCode).toContain('p.setup')
    expect(vueCode).toContain('p.draw')
    expect(vueCode).toContain('p.createCanvas')
    expect(vueCode).toContain('p.background')
    expect(vueCode).toContain('p.fill')
    expect(vueCode).toContain('p.circle')
    expect(vueCode).toContain('float x')
  })
})
