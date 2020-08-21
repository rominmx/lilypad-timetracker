<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <div :class="$style.time">{{ displayTime | formatTime }}</div>
      <h3 :class="$style.title">{{ title }}</h3>
      <button @click="stop">
        Stop
      </button>
    </div>
  </div>
</template>

<script>
import { formatTime } from '@/utils/time';

export default {
  filters: {
    formatTime,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    totalTime: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      interval: null,
      displayTime: 0,
    };
  },
  created() {
    this.displayTime = this.totalTime;
    this.interval = setInterval(() => {
      this.displayTime += 1000;
    }, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    stop() {
      this.$emit('stop');
    },
  },
};
</script>

<style lang="scss" module>
.container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
