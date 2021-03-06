<template>
  <div :class="$dialog.container">
    <div :class="$dialog.overlay" @click="close"></div>
    <form
      :class="$style.dialogContainer"
      @submit="addTask"
    >
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
        <input
          :disabled="taskName.trim() === ''"
          :class="[$button.container, $style.addButton]"
          type="submit"
          value="Add Task"
        />
      </div>
      <button @click="close" :class="$style.close">
        <svg :class="$style.icon">
          <use xlink:href="#icon_close" />
        </svg>
      </button>
    </form>
  </div>
</template>

<script>
import { PRIORITIES_MAP, DEFAULT_PRIORITY } from '@/store/constants';

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
<style lang="scss" src="../stylesheets/dialogs.scss" module="$dialog" />
