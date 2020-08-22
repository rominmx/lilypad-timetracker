<template>
  <div :class="$style.container">
    <table :class="$style.table">
      <thead>
        <tr>
          <th>#</th>
          <th :class="$style.title">Task</th>
          <th>Actions</th>
          <th>Time</th>
          <th>Priority</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in tasks" :key="task.id">
          <td>{{ index + 1 }}</td>
          <td :class="$style.title">{{ task.title }}</td>
          <td>
            <button
              @click="
                $emit('startTask', { id: task.id, title: task.title, totalTime: task.totalTime })
              "
            >
              {{ task.totalTime ? 'Continue' : 'Start' }}
            </button>
          </td>
          <td>{{ task.totalTime | formatTime }}</td>
          <td>{{ task.priority | getPriority }}</td>
          <td>
            <button @click="$emit('deleteTask', task.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div :class="$style.total">Total time: {{ totalTime | formatTime }}</div>
    <button @click="$emit('clearAll')">Clear All Tasks</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { PRIORITIES_MAP } from '@/store/constants';
import { formatTime } from '@/utils/time';

export default {
  filters: {
    getPriority(value) {
      return PRIORITIES_MAP.get(value);
    },
    formatTime,
  },
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapGetters(['totalTime']),
  },
};
</script>

<style lang="scss" module>
.container {
  width: 100%;
}

.table {
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 24px;

  th {
    padding: 0.5em 0.6em;
    text-align: left;
  }

  th,
  td {
    border: 1px solid #000;
    font-size: 36px;
  }

  td {
    padding: 0.8em 0.6em;
  }
}

.title {
  width: 45%;
}

.total {
  font-size: 48px;
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
