/**
 * 示例3: 几何图案
 */

void setup() {
  size(600, 600);
  colorMode(HSB, 360, 100, 100);
  noFill();
}

void draw() {
  background(230);

  translate(width / 2, height / 2);

  // 绘制多个旋转的矩形
  for (int i = 0; i < 12; i++) {
    push();
    rotate(frameCount * 0.02 + i * TWO_PI / 12);
    stroke(i * 30, 80, 90);
    strokeWeight(2);

    // 动态大小
    float size = 100 + sin(frameCount * 0.05 + i) * 50;
    rectMode(CENTER);
    rect(0, 0, size, size);
    pop();
  }

  // 中心圆
  push();
  fill(180, 80, 90);
  circle(0, 0, 50);
  pop();
}
