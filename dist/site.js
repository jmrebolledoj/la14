const landing = document.querySelector('.landing');
const canvas = document.querySelector('.pitch');
const context = canvas.getContext('2d');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const discover = document.querySelector('.discover');
const team = document.querySelector('.team');
const close = document.querySelector('.close');

discover.addEventListener('click', () => team.showModal());
close.addEventListener('click', () => team.close());
team.addEventListener('close', () => discover.focus());
team.addEventListener('click', (event) => {
  const bounds = team.getBoundingClientRect();
  if (
    event.target === team &&
    (event.clientX < bounds.left || event.clientX > bounds.right ||
      event.clientY < bounds.top || event.clientY > bounds.bottom)
  ) {
    team.close();
  }
});

if (context) {
  let width = 0;
  let height = 0;
  let frameId = 0;
  let previousTime = 0;
  let markings = new Path2D();
  let centerCircle = new Path2D();
  const pointer = { x: .5, y: .47, active: 0 };
  const current = { x: .5, y: .47, active: 0 };

  function createMarkings() {
    const left = width > 700 ? width * .045 : -width * .37;
    const right = width - left;
    const top = Math.max(107, height * .17);
    const bottom = height - 137;
    const centerX = width / 2;
    const centerY = (top + bottom) / 2;
    const fieldHeight = bottom - top;
    const circleRadius = Math.min(width * .42, fieldHeight * .46, 296);
    const boxDepth = (right - left) * .14;
    const boxHeight = fieldHeight * .57;
    const goalDepth = boxDepth * .36;
    const goalHeight = boxHeight * .49;

    markings = new Path2D();
    markings.rect(left, top, right - left, fieldHeight);
    markings.moveTo(centerX, top);
    markings.lineTo(centerX, bottom);
    markings.rect(left, centerY - boxHeight / 2, boxDepth, boxHeight);
    markings.rect(right - boxDepth, centerY - boxHeight / 2, boxDepth, boxHeight);
    markings.rect(left, centerY - goalHeight / 2, goalDepth, goalHeight);
    markings.rect(right - goalDepth, centerY - goalHeight / 2, goalDepth, goalHeight);
    markings.moveTo(centerX + circleRadius, centerY);
    markings.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);

    centerCircle = new Path2D();
    centerCircle.arc(centerX, centerY, circleRadius, 0, Math.PI * 2);
    centerCircle.moveTo(centerX + 2, centerY);
    centerCircle.arc(centerX, centerY, 2, 0, Math.PI * 2);
  }

  function draw() {
    const offsetX = (current.x - .5) * 13 * current.active;
    const offsetY = (current.y - .47) * 10 * current.active;
    context.clearRect(0, 0, width, height);
    context.save();
    context.translate(offsetX, offsetY);
    context.lineWidth = .8;
    context.strokeStyle = 'rgba(167, 177, 146, 0.12)';
    context.stroke(markings);

    const ambient = context.createLinearGradient(width * .32, height * .20, width * .71, height * .69);
    ambient.addColorStop(0, 'rgba(221, 130, 56, 0.10)');
    ambient.addColorStop(.52, 'rgba(199, 128, 63, 0.12)');
    ambient.addColorStop(1, 'rgba(244, 151, 69, 0.50)');
    context.strokeStyle = ambient;
    context.stroke(centerCircle);

    if (current.active > .002) {
      const x = current.x * width - offsetX;
      const y = current.y * height - offsetY;
      const radius = Math.min(width * .25, 270);
      const light = context.createRadialGradient(x, y, 0, x, y, radius);
      light.addColorStop(0, 'rgba(255, 175, 98, 0.92)');
      light.addColorStop(.35, 'rgba(255, 133, 43, 0.52)');
      light.addColorStop(1, 'rgba(255, 133, 43, 0)');
      context.globalAlpha = current.active;
      context.lineWidth = 1.25;
      context.strokeStyle = light;
      context.shadowColor = 'rgba(255, 130, 41, 0.38)';
      context.shadowBlur = 7;
      context.stroke(markings);
    }
    context.restore();
  }

  function animate(time) {
    frameId = 0;
    const elapsed = Math.min(time - previousTime || 16.7, 50);
    previousTime = time;
    const ease = 1 - Math.exp(-elapsed / 115);
    current.x += (pointer.x - current.x) * ease;
    current.y += (pointer.y - current.y) * ease;
    current.active += (pointer.active - current.active) * ease;
    draw();
    const remaining = Math.abs(pointer.x - current.x) + Math.abs(pointer.y - current.y) +
      Math.abs(pointer.active - current.active);
    if (remaining > .001 && !document.hidden) frameId = requestAnimationFrame(animate);
  }

  function schedule() {
    if (!frameId && !document.hidden) {
      previousTime = performance.now();
      frameId = requestAnimationFrame(animate);
    }
  }

  function reset() {
    pointer.x = .5;
    pointer.y = .47;
    pointer.active = 0;
    if (reducedMotion.matches || document.hidden) {
      cancelAnimationFrame(frameId);
      frameId = 0;
      Object.assign(current, pointer);
      draw();
    } else {
      schedule();
    }
  }

  function resize() {
    width = landing.clientWidth;
    height = landing.clientHeight;
    const resolution = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * resolution);
    canvas.height = Math.round(height * resolution);
    context.setTransform(resolution, 0, 0, resolution, 0, 0);
    createMarkings();
    draw();
  }

  landing.addEventListener('pointermove', (event) => {
    if (reducedMotion.matches || !finePointer.matches || event.pointerType === 'touch') return;
    const bounds = landing.getBoundingClientRect();
    pointer.x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / width));
    pointer.y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / height));
    pointer.active = 1;
    schedule();
  });
  landing.addEventListener('pointerleave', reset);
  reducedMotion.addEventListener('change', reset);
  finePointer.addEventListener('change', reset);
  document.addEventListener('visibilitychange', reset);
  new ResizeObserver(resize).observe(landing);
  resize();
}
