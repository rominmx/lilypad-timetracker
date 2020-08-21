<template>
  <div>
    <button
      :disabled="taskIsAdding"
      :class="[$button.container, $style.button]"
      @click="displayUI(true)"
    >
      Add New Task
    </button>
    <div v-if="taskIsAdding" :class="$style.container">
      <button @click="closeUI" :class="$style.close">
        <svg :class="$style.icon">
          <use xlink:href="#icon_close" />
        </svg>
      </button>
      <input v-model="taskName" :class="[$form.input, $style.input]" placeholder="Task name" />
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
      taskIsAdding: false,
      taskName: '',
      priority: DEFAULT_PRIORITY,
      priorites: PRIORITIES_MAP,
    };
  },
  methods: {
    displayUI(flag) {
      this.taskIsAdding = flag;
    },
    closeUI() {
      this.displayUI(false);
      this.taskName = '';
      this.priority = DEFAULT_PRIORITY;
    },
    addTask() {
      this.$emit('addTask', {
        title: this.taskName,
        priority: this.priority,
      });
      this.closeUI();
    },
  },
};
</script>

<style lang="scss" module>
.button {
  font-size: 3vw;
}

.container {
  border: 2px solid #000;
  padding: 2vw;
  position: fixed;
  background-color: #fff;
  left: 2vw;
  top: 2vw;
  right: 2vw;
  bottom: 2vw;
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
