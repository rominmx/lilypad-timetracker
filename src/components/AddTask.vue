<template>
  <div>
    <button :disabled="taskIsAdding" @click="displayUI(true)">
      Add New Task
    </button>
    <div v-if="taskIsAdding" :class="$style.container">
      <button @click="closeUI">Close</button>
      <div>
        <label>Task Name</label>
        <input v-model="taskName" />
        <button :disabled="taskName.trim() === ''" @click="addTask">
          Add Task
        </button>
      </div>
      <div>
        <label>Priority</label>
        <div v-for="key in priorites.keys()" :key="key">
          <input type="radio" v-model="priority" :value="key" :id="`priority_${key}`" />
          <label :for="`priority_${key}`">{{ priorites.get(key) }}</label>
        </div>
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
.container {
  width: 800px;
  border: 1px solid #000;
  padding: 36px;
  margin-top: 36px;
}
</style>
