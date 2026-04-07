#!/usr/bin/env node

/**
 * Processing2Vue CLI
 *
 * 命令行工具，用于将 Processing 代码转换为 Vue 组件
 */

import { convert } from '../dist/processing2vue.esm.js'
import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * 显示帮助信息
 */
function showHelp() {
  console.log(`
Processing2Vue CLI - 将 Processing 代码转换为 Vue 3 组件

使用方法:
  p2v <input> [output] [options]

参数:
  input                输入文件 (.pde) 或目录
  output               输出文件 (.vue) 或目录 (可选)

选项:
  -h, --help           显示帮助信息
  -v, --version        显示版本号
  -w, --width          设置画布宽度 (默认: 400)
  -H, --height         设置画布高度 (默认: 400)
  --no-p5              不使用 p5.js
  --no-scoped          不使用 scoped 样式
  --batch              批量转换目录中的所有 .pde 文件

示例:
  # 转换单个文件
  p2v sketch.pde sketch.vue

  # 转换单个文件（自动命名）
  p2v sketch.pde

  # 批量转换目录
  p2v ./sketches ./vue-components --batch

  # 设置画布尺寸
  p2v sketch.pde --width 800 --height 600

  # 批量转换当前目录
  p2v . . --batch
`)
}

/**
 * 显示版本信息
 */
function showVersion() {
  const packagePath = join(__dirname, '../package.json')
  const pkg = JSON.parse(readFileSync(packagePath, 'utf-8'))
  console.log(`Processing2Vue CLI v${pkg.version}`)
}

/**
 * 解析命令行参数
 */
function parseArgs(args) {
  const options = {
    input: null,
    output: null,
    width: 400,
    height: 400,
    useP5: true,
    scoped: true,
    batch: false,
    help: false,
    version: false,
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg === '-h' || arg === '--help') {
      options.help = true
    } else if (arg === '-v' || arg === '--version') {
      options.version = true
    } else if (arg === '-w' || arg === '--width') {
      options.width = parseInt(args[++i])
    } else if (arg === '-H' || arg === '--height') {
      options.height = parseInt(args[++i])
    } else if (arg === '--no-p5') {
      options.useP5 = false
    } else if (arg === '--no-scoped') {
      options.scoped = false
    } else if (arg === '--batch') {
      options.batch = true
    } else if (!options.input) {
      options.input = arg
    } else if (!options.output) {
      options.output = arg
    }
  }

  return options
}

/**
 * 获取所有 .pde 文件
 */
function getPdeFiles(dir) {
  const files = []

  function traverse(currentDir) {
    const items = readdirSync(currentDir)

    for (const item of items) {
      const fullPath = join(currentDir, item)
      const stat = statSync(fullPath)

      if (stat.isDirectory()) {
        // 跳过 node_modules 和隐藏目录
        if (!item.startsWith('.') && item !== 'node_modules') {
          traverse(fullPath)
        }
      } else if (item.endsWith('.pde')) {
        files.push(fullPath)
      }
    }
  }

  traverse(dir)
  return files
}

/**
 * 转换单个文件
 */
function convertFile(inputPath, outputPath, options) {
  if (!existsSync(inputPath)) {
    console.error(`❌ 错误: 找不到文件 ${inputPath}`)
    return false
  }

  try {
    const code = readFileSync(inputPath, 'utf-8')
    const vueCode = convert(code, {
      width: options.width,
      height: options.height,
      useP5: options.useP5,
      scoped: options.scoped,
    })

    // 确保输出目录存在
    const outputDir = dirname(outputPath)
    if (!existsSync(outputDir)) {
      // 这里简化处理，实际应该递归创建目录
    }

    writeFileSync(outputPath, vueCode)
    console.log(`✅ 转换成功: ${inputPath} → ${outputPath}`)
    return true
  } catch (error) {
    console.error(`❌ 转换失败: ${inputPath}`)
    console.error(error.message)
    return false
  }
}

/**
 * 批量转换目录
 */
function convertDirectory(inputDir, outputDir, options) {
  console.log(`📂 批量转换模式: ${inputDir} → ${outputDir}`)

  const pdeFiles = getPdeFiles(inputDir)

  if (pdeFiles.length === 0) {
    console.log('⚠️  未找到 .pde 文件')
    return
  }

  console.log(`📄 找到 ${pdeFiles.length} 个文件\n`)

  let successCount = 0
  let failCount = 0

  for (const pdeFile of pdeFiles) {
    const relativePath = pdeFile.replace(inputDir, '')
    const outputPath = join(outputDir, relativePath.replace('.pde', '.vue'))

    if (convertFile(pdeFile, outputPath, options)) {
      successCount++
    } else {
      failCount++
    }
  }

  console.log(`\n📊 转换完成: ${successCount} 成功, ${failCount} 失败`)
}

/**
 * 主函数
 */
function main() {
  const args = process.argv.slice(2)
  const options = parseArgs(args)

  if (options.help) {
    showHelp()
    process.exit(0)
  }

  if (options.version) {
    showVersion()
    process.exit(0)
  }

  if (!options.input) {
    console.error('❌ 错误: 请指定输入文件或目录')
    showHelp()
    process.exit(1)
  }

  if (options.batch) {
    const outputDir = options.output || options.input
    convertDirectory(options.input, outputDir, options)
  } else {
    // 单文件转换
    const outputPath = options.output || options.input.replace('.pde', '.vue')
    const success = convertFile(options.input, outputPath, options)
    process.exit(success ? 0 : 1)
  }
}

// 运行
main()
