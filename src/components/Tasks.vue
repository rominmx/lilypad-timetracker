<template>
  <div>
    <div v-if="!tasks.length">No tasks yet</div>
    <table v-else :class="$style.table">
      <thead>
        <tr>
          <th>#</th>
          <th>Task</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="task.id">
          <td>{{ index + 1 }}</td>
          <td>{{ task.title }}</td>
          <td>{{ task.status }}</td>
          <td>{{ task.priority | getPriority }}</td>
          <td>
            <button @click="$emit('deleteTask', task.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { PRIORITIES_MAP } from '@/store/constants';

export default {
  filters: {
    getPriority(value) {
      return PRIORITIES_MAP.get(value);
    },
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" module>
.table {
  border-collapse: collapse;
  width: 800px;
  margin-bottom: 24px;

  th,
  td {
    border: 1px solid #000;
  }
}
</style>
