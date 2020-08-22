<template>
  <div :class="$style.container">
    <div :class="$style.overlay" @click="close"></div>
    <div :class="$style.dialogContainer">
      <button @click="close" :class="$style.close">
        <svg :class="$style.icon">
          <use xlink:href="#icon_close" />
        </svg>
      </button>
      <input
        ref="input"
        v-model="taskName"
        :class="[$form.input, $style.input]"
        placeholder="Task name"
      />
      <div :class="$radio.container">
        <div
          v-for="key in priorites.keys()"
          :key="key"
          :class="[$radio.radio, { [$radio.selected]: priority === key }]"
        >
          <input type="radio" v-model="priority" :value="key" :id="`priority_${key}`" />
          <label :for="`priority_${key}`">{{ priorites.get(key) }}</label>
        </div>
      </div>
      <div>
        <button
          :disabled="taskName.trim() === ''"
          :class="[$button.container, $style.addButton]"
          @click="addTask"
        >
          Add Task
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { PRIORITIES_MAP, DEFAULT_PRIORITY } from '../store/constants';

export default {
  data() {
    return {
      taskName: '',
      priority: DEFAULT_PRIORITY,
      priorites: PRIORITIES_MAP,
    };
  },
  mounted() {
    this.$refs.input.focus();
  },
  beforeDestroy() {
    this.taskName = '';
    this.priority = DEFAULT_PRIORITY;
  },
  methods: {
    close() {
      this.$emit('close');
    },
    addTask() {
      this.$emit('addTask', {
        title: this.taskName,
        priority: this.priority,
      });
    },
  },
};
</script>

<style lang="scss" module>
.container {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  background-color: #000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  opacity: 0.75;
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

.dialogContainer {
  width: 60%;
  border: 2px solid #000;
  padding: 2vw 2vw 3vw;
  position: relative;
  z-index: 2;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.close {
  position: absolute;
  right: 1vw;
  top: 1vw;
  cursor: pointer;
  background-color: transparent;
  border: none;
  padding: 0;
  width: 3vh;
  height: 3vh;
  display: flex;
  align-items: center;
  justify-content: center;

  &:active {
    outline: 2px dotted #000;
  }
}

.icon {
  fill: #000;
  width: 2.5vh;
  height: 2.5vh;
}

.addButton {
  font-size: 3vw;
}

.input {
  font-size: 3vw;
  width: 100%;
}
</style>

<style lang="scss" src="../stylesheets/radio.scss" module="$radio" />
<style lang="scss" src="../stylesheets/buttons.scss" module="$button" />
<style lang="scss" src="../stylesheets/forms.scss" module="$form" />
