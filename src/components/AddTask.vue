<template>
  <div>
    <button
      :disabled="taskIsAdding"
      :class="[$button.container, $style.button]"
      @click="displayUI(true)"
    >
      Add New Task
    </button>
    <template v-if="taskIsAdding">
      <div :class="$style.overlay" @click="closeUI"></div>
      <div :class="$style.container">
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
    </template>
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

.overlay {
  background-color: #000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='4' height='4' viewBox='0 0 4 4'%3E%3Cpath fill='%23ffffff' fill-opacity='1' d='M1 3h1v1H1V3zm2-2h1v1H3V1z'%3E%3C/path%3E%3C/svg%3E");
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0.75;
}

.container {
  --position: 3vw;

  border: 2px solid #000;
  padding: 2vw;
  position: fixed;
  z-index: 20;
  background-color: #fff;
  left: var(--position);
  top: var(--position);
  right: var(--position);
  bottom: var(--position);
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
