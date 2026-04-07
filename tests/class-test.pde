/**
 * 测试类支持
 */

Particle[] particles;

void setup() {
  size(400, 400);
  particles = new Particle[50];

  for (int i = 0; i < particles.length; i++) {
    particles[i] = new Particle();
  }
}

void draw() {
  background(220, 20);

  for (int i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}

class Particle {
  float x, y;
  float vx, vy;
  float size;

  Particle() {
    x = random(width);
    y = random(height);
    vx = random(-1, 1);
    vy = random(-1, 1);
    size = random(5, 15);
  }

  void update() {
    x += vx;
    y += vy;

    if (x < 0) x = width;
    if (x > width) x = 0;
    if (y < 0) y = height;
    if (y > height) y = 0;
  }

  void display() {
    noStroke();
    fill(100, 200, 255, 150);
    circle(x, y, size);
  }
}
