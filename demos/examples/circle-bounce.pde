/**
 * 示例1: 基础圆形动画
 */

float x, y;
float dx = 2;
float dy = 3;
float radius = 30;

void setup() {
  size(400, 400);
  x = width / 2;
  y = height / 2;
}

void draw() {
  background(220);

  // 更新位置
  x += dx;
  y += dy;

  // 边界检测
  if (x > width - radius || x < radius) {
    dx = -dx;
  }
  if (y > height - radius || y < radius) {
    dy = -dy;
  }

  // 绘制圆形
  fill(255, 100, 100);
  stroke(0);
  strokeWeight(2);
  circle(x, y, radius * 2);
}
