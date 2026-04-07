/**
 * TypeScript 类型定义
 */

/**
 * 转换配置选项
 */
export interface ConversionOptions {
  /** 使用 p5.js 模式 */
  useP5?: boolean
  /** 使用 Composition API */
  compositionApi?: boolean
  /** 添加 scoped 样式 */
  scoped?: boolean
  /** 画布宽度 */
  width?: number
  /** 画布高度 */
  height?: number
  /** 画布 ID */
  canvasId?: string
  /** p5 实例变量名 */
  p5Instance?: string
}

/**
 * 默认配置
 */
export const defaultOptions: Required<ConversionOptions>

/**
 * 解析后的 Processing 代码结构
 */
export interface ParsedCode {
  /** 画布宽度 */
  width: number
  /** 画布高度 */
  height: number
  /** 全局变量声明 */
  globalVars: string[]
  /** 类定义 */
  classes: ClassDefinition[]
  /** 图片加载调用 */
  imageLoads: ImageLoad[]
  /** 字体加载调用 */
  fontLoads: FontLoad[]
  /** 函数映射 */
  functions: {
    [key: string]: {
      /** 函数参数 */
      params: string
      /** 函数体 */
      body: string
    }
  }
  /** 原始代码 */
  originalCode: string
}

/**
 * 类定义
 */
export interface ClassDefinition {
  /** 类名 */
  name: string
  /** 类体 */
  body: string
}

/**
 * 图片加载调用
 */
export interface ImageLoad {
  /** 图片文件名 */
  filename: string
}

/**
 * 字体加载调用
 */
export interface FontLoad {
  /** 字体文件名 */
  filename: string
}

/**
 * 解析 Processing 代码
 *
 * @param code - Processing 源代码
 * @returns 解析后的代码结构
 *
 * @example
 * ```typescript
 * const parsed = parse(`
 * void setup() {
 *   size(400, 400);
 * }
 * `)
 * console.log(parsed.width)  // 400
 * console.log(parsed.height) // 400
 * ```
 */
export function parse(code: string): ParsedCode

/**
 * 生成 Vue 组件代码
 *
 * @param parsed - 解析后的代码结构
 * @param options - 转换配置
 * @returns Vue 3 组件代码字符串
 *
 * @example
 * ```typescript
 * const parsed = parse(processingCode)
 * const vueCode = generate(parsed, {
 *   width: 800,
 *   height: 600,
 *   scoped: true
 * })
 * ```
 */
export function generate(parsed: ParsedCode, options?: ConversionOptions): string

/**
 * 一键转换 Processing 代码为 Vue 组件
 *
 * @param processingCode - Processing 源代码
 * @param options - 转换配置
 * @returns Vue 3 组件代码字符串
 *
 * @example
 * ```typescript
 * const vueCode = convert(`
 * void setup() {
 *   size(400, 400);
 * }
 *
 * void draw() {
 *   background(0);
 *   circle(mouseX, mouseY, 50);
 * }
 * `)
 * console.log(vueCode)
 * ```
 */
export function convert(processingCode: string, options?: ConversionOptions): string

/**
 * CLI 工具函数
 */
export function cli(): void

export default {
  convert,
  parse,
  generate,
  cli,
}
