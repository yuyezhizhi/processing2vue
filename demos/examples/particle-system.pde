/**
 * 示例2: 跟随鼠标的粒子系统
 */

Particle[] particles;

void setup() {
  size(500, 500);
  particles = new Particle[50];

  for (int i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
}

void draw() {
  background(0, 20);

  for (int i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

class Particle {
  float x, y;
  float size;
  float speed;

  Particle() {
    x = random(width);
    y = random(height);
    size = random(5, 20);
    speed = random(1, 3);
  }

  void update() {
    // 向鼠标移动
    float angle = atan2(mouseY - y, mouseX - x);
    x += cos(angle) * speed;
    y += sin(angle) * speed;

    // 边界环绕
    if (x < 0) x = width;
    if (x > width) x = 0;
    if (y < 0) y = height;
    if (y > height) y = 0;
  }

  void display() {
    float d = dist(x, y, mouseX, mouseY);
    float alpha = map(d, 0, 200, 255, 50);

    noStroke();
    fill(100, 200, 255, alpha);
    circle(x, y, size);
  }
}
