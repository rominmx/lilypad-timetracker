<template>
  <div :class="$style.container" @dblclick="stop">
    <div :class="$style.time">{{ displayTime | formatTime }}</div>
    <h3 :class="$style.title">{{ title }}</h3>
    <button :class="[$button.container, $button.large, $style.button]" @click="stop">
      Stop
    </button>
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  padding-left: 1vw;
  padding-right: 1vw;
}

.time {
  font-size: 10vw;
  line-height: 1;
}

.title {
  font-size: 6vw;
  font-weight: 400;
  line-height: 1;
  margin-top: 0.5em;
  text-align: center;
}

.button {
  font-size: 4vw;
}
</style>

<style lang="scss" src="../stylesheets/buttons.scss" module="$button" />
