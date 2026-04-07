# 贡献指南

感谢你对 Processing2Vue 项目的关注！我们欢迎任何形式的贡献。

## 📋 如何贡献

### 报告问题

如果你发现了 bug 或有新功能建议：

1. 先检查 [Issues](https://github.com/yuyezhizhi/processing2vue/issues) 确保问题未被报告
2. 如果是新的问题，创建一个 Issue，包含：
   - 清晰的标题
   - 详细的描述
   - 重现步骤
   - 预期行为 vs 实际行为
   - 环境信息（Node.js 版本、操作系统等）

### 提交代码

1. **Fork 项目**
   ```bash
   # 在 GitHub 上 Fork 本仓库
   ```

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/你的用户名/processing2vue.git
   cd processing2vue
   ```

3. **创建特性分支**
   ```bash
   git checkout -b feature/你的特性名称
   ```

4. **进行修改**
   - 遵循代码规范
   - 添加测试
   - 更新文档

5. **运行测试**
   ```bash
   npm test
   ```

6. **提交修改**
   ```bash
   git add .
   git commit -m "feat: 添加你的功能描述"
   ```

7. **推送到你的 Fork**
   ```bash
   git push origin feature/你的特性名称
   ```

8. **创建 Pull Request**
   - 在 GitHub 上创建 PR
   - 清楚描述你的改动
   - 引用相关的 Issue

## 📝 代码规范

### JavaScript

- 使用 ES6+ 语法
- 函数名使用 camelCase
- 变量名使用 camelCase
- 常量名使用 UPPER_SNAKE_CASE

```javascript
// ✅ 好的
function convertProcessingCode() {
  const MAX_SIZE = 400
  let currentIndex = 0
}

// ❌ 不好的
function Convert_Processing_Code() {
  const max_size = 400
  let CurrentIndex = 0
}
```

### 注释

- 为复杂逻辑添加注释
- 使用 JSDoc 风格的函数注释
- 注释要简洁明了

```javascript
/**
 * 解析 Processing 代码
 * @param {string} code - Processing 源代码
 * @returns {ParsedCode} 解析后的代码结构
 */
function parse(code) {
  // 实现...
}
```

### 提交信息

使用 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

- `feat:` 新功能
- `fix:` 修复 bug
- `docs:` 文档更新
- `style:` 代码格式（不影响功能）
- `refactor:` 重构
- `test:` 添加测试
- `chore:` 构建/工具链更新

示例：
```bash
git commit -m "feat: 添加图像加载支持"
git commit -m "fix: 修复 translate 函数转换错误"
git commit -m "docs: 更新 API 文档"
```

## 🧪 测试

- 为新功能添加测试
- 测试覆盖率应该 >= 80%
- 运行测试确保所有测试通过

```bash
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm run test:coverage
```

## 📚 文档

- 更新 README.md 如果有新功能
- 更新 CHANGELOG.md
- 添加 JSDoc 注释
- 如果有新示例，添加到 demos/examples/

## 🎯 开发优先级

当前最需要帮助的功能（按优先级）：

### 🔴 高优先级
1. 图像加载支持 (`loadImage()`)
2. 字体加载支持 (`loadFont()`, `textFont()`)
3. 改进 class 支持和转换

### 🟡 中优先级
1. 声音支持 (p5.sound)
2. 3D 模式支持 (WEBGL)
3. 更多交互事件

### 🟢 低优先级
1. VS Code 扩展
2. 在线 Playground
3. 性能优化

## 🤝 行为准则

- 尊重所有贡献者
- 保持友好和专业的交流
- 关注问题本身，而非个人
- 欢迎新手提问和贡献

## 📧 联系方式

- 作者：[yuyezhizhi](https://github.com/yuyezhizhi)
- 问题反馈：[Issues](https://github.com/yuyezhizhi/processing2vue/issues)
- Discussions：[GitHub Discussions](https://github.com/yuyezhizhi/processing2vue/discussions)

---

再次感谢你的贡献！🙏
