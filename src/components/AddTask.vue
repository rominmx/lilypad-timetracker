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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      taskIsAdding: false,
      taskName: '',
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
      this.$emit('addTask', this.taskName);
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
