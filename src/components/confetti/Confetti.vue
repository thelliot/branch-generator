<template>
  <div ref="confetti">
    <canvas class="confetti" ref="canvas" width="1" height="1"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Confetti',
  props: {
    autoPlay: {
      type: Boolean,
      default: false,
    },
    friction: {
      type: Number,
      default: 55,
    },
    count: {
      type: Number,
      required: false,
    },
    colors: {
      type: Array,
      required: false,
    }
  },
  data() {
    return {
      shouldAutoPlay: this.autoPlay,
      shouldRespawn: false,
      confettiColors: this.colors,
      confettiCount: this.count,
      startTime: 0,
      stopTimeout: 0,
      interval: 0,
      canvas: this.$refs.canvas as HTMLCanvasElement,
      context: {} as CanvasRenderingContext2D,
      confettiPapers: [],
    }
  },
  methods: {
    create(canvas: HTMLCanvasElement) {
      this.canvas = canvas;
      this.context = this.canvas.getContext('2d');
      // this.context.webkitImageSmoothingEnabled = false;
      // this.context.mozImageSmoothingEnabled = false;
      this.context.imageSmoothingEnabled = false;
      this.confettiPapers = [];
      this.setCanvasValues();
      if(this.shouldAutoPlay) {
        this.start();
      }
    },
    start() {
      clearTimeout(this.stopTimeout);
      this.pause();
      this.shouldRespawn = true;
      this.startTime = performance.now();
      this.update();
    },
    pause() {
      cancelAnimationFrame(this.interval);
    },
    stop() {
      this.shouldRespawn = false;
      this.stopTimeout = setTimeout(() => {
        this.clearCanvas();
      }, this.canvas.offsetHeight * 50 / 2);
    },
    clearCanvas() {
      cancelAnimationFrame(this.interval);
      this.shouldAutoPlay = false;
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.create(this.$refs.canvas as HTMLCanvasElement);
    },
    update(time = 0){
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      for (let i = 0; i < this.confettiCount; i++) {
        this.confettiPapers[i].Update((time - this.startTime) / 1000, this.shouldRespawn);
        this.confettiPapers[i].Draw(this.context);
      }
      this.interval = requestAnimationFrame(this.update);
    },
    setCanvasValues() {
      const canvasWidth = this.canvas.offsetWidth;
      const canvasHeight = this.canvas.offsetHeight;
      this.canvas.width = canvasWidth * devicePixelRatio;
      this.canvas.height = canvasHeight * devicePixelRatio;
      this.context.scale(devicePixelRatio, devicePixelRatio);
      ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
      this.confettiCount = this.count || window.innerWidth / 7;
      if (this.confettiPapers.length > this.confettiCount) {
        this.confettiPapers.splice(0, this.confettiPapers.length - this.confettiCount);
        return;
      }
      for (let i = this.confettiPapers.length; i < this.confettiCount; i++) {
        const colorIndex = Math.round(Math.random() * (this.confettiColors.length - 1));
        this.confettiPapers[i] = new ConfettiPaper(
          Math.random() * canvasWidth,
          -Math.random() * canvasHeight,
          this.confettiColors[colorIndex][0],
          this.confettiColors[colorIndex][1],
          Math.random() * 4 + 3.5
        );
      }
    }
  },
})
</script>

