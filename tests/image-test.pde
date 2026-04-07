/**
 * 测试图像加载支持
 */

PImage img;

void setup() {
  size(400, 400);
  img = loadImage("test.jpg");
}

void draw() {
  image(img, 0, 0);
}
