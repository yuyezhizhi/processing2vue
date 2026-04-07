/**
 * 测试字体加载支持
 */

PFont font;

void setup() {
  size(400, 400);
  font = loadFont("Arial.ttf");
}

void draw() {
  background(220);
  textFont(font);
  textSize(24);
  fill(0);
  text("Hello, Processing2Vue!", 100, 200);
}
