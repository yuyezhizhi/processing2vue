# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-04-07

### Added

- 🎨 Initial release of Processing2Vue
- ✅ Core conversion functionality - Processing code to Vue 3 components
- 🎯 p5.js integration for rendering
- 📦 npm package support
- 🔧 CLI tool (`p2v` command)
- 📚 Comprehensive documentation
- 🧪 Test suite with Vitest
- 📝 TypeScript type definitions
- 🎨 Multiple demo examples
- 🔄 Support for 30+ Processing functions
- 🎯 Event handlers (mousePressed, keyPressed, etc.)
- 📐 Coordinate transformations (translate, rotate, scale)
- 🎨 Graphics primitives (circle, ellipse, rect, line, etc.)
- 🌈 Color and styling (fill, stroke, noFill, etc.)
- 📊 Mathematical functions (sin, cos, random, map, etc.)
- 📝 Text rendering (text, textSize, textAlign)
- 🔄 Flow control (if, for, while, switch)
- 📦 Support for global variables
- ⚙️ CLI options (batch mode, custom dimensions, etc.)
- 📖 Star History badge in README

### Features

- One-click conversion from Processing to Vue 3
- Real-time preview support
- Zero configuration required
- Composition API support
- Scoped styles support
- Custom canvas dimensions
- Batch conversion for directories
- Interactive shell script for CLI

### Supported Processing Syntax

**Graphics:**
- circle, ellipse, rect, line, point, triangle, quad, arc, bezier
- beginShape, vertex, endShape

**Colors & Styles:**
- fill, stroke, noFill, noStroke, strokeWeight
- background, clear
- colorMode

**Transformations:**
- translate, rotate, scale, push, pop
- resetMatrix

**Variables & Constants:**
- width, height, mouseX, mouseY, pmouseX, pmouseY
- frameCount, frameRate
- PI, TWO_PI, HALF_PI, QUARTER_PI

**Math Functions:**
- random, randomSeed, noise, map
- sin, cos, tan
- abs, floor, ceil, round, min, max, dist, lerp, constrain

**Text:**
- text, textSize, textAlign, textLeading, textWidth

**Events:**
- mousePressed, mouseReleased, mouseMoved, mouseDragged
- keyPressed, keyReleased, keyTyped

**Flow Control:**
- if/else, for/while, switch/case, break/continue

### Documentation

- Comprehensive README with usage examples
- API documentation
- Development guide
- Contribution guidelines
- Multiple demo examples (circle-bounce, particle-system, geometric-patterns)

### Development Tools

- Vitest for testing
- TypeScript type definitions
- ESLint support
- Prettier support
- Build system with Vite

### Performance

- Efficient code parsing
- Optimized Vue component generation
- Fast conversion speed

### Compatibility

- Node.js >= 16.0.0
- Vue 3
- p5.js >= 1.9.0
- Modern browsers

---

## Planned Features

### Version 1.1.0

- [ ] Image loading support (`loadImage()`)
- [ ] Font loading support (`loadFont()`, `textFont()`)
- [ ] Improved class support
- [ ] Better error handling

### Version 1.2.0

- [ ] Sound support (p5.sound)
- [ ] 3D mode support (WEBGL)
- [ ] More interactive events
- [ ] Performance optimizations

### Version 2.0.0

- [ ] Full TypeScript rewrite
- [ ] Plugin system for custom transformers
- [ ] VS Code extension
- [ ] Online playground
- [ ] Import/Export Processing projects

---

## Contributors

- [yuyezhizhi](https://github.com/yuyezhizhi) - Author

## Links

- [GitHub Repository](https://github.com/yuyezhizhi/processing2vue)
- [NPM Package](https://www.npmjs.com/package/processing2vue)
- [Documentation](https://github.com/yuyezhizhi/processing2vue#readme)
- [Issue Tracker](https://github.com/yuyezhizhi/processing2vue/issues)

---

**Note:** This project follows Semantic Versioning. For the versions available, see the [tags on this repository](https://github.com/yuyezhizhi/processing2vue/tags).
