<template>
  <div>
    <h1>Tasks</h1>
    <tasks-list :tasks="tasks" @deleteTask="deleteTask" />
    <add-task @addTask="addTask" />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TasksList from '../components/Tasks.vue';
import AddTask from '../components/AddTask.vue';

export default {
  name: 'Home',
  components: {
    AddTask,
    TasksList,
  },
  computed: {
    ...mapState(['tasks']),
  },
  created() {
    const parsedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (Array.isArray(parsedTasks)) {
      this.$store.dispatch('addTasks', parsedTasks);
    }
  },
  methods: {
    saveTasks() {
      const stringifiedTasks = JSON.stringify(this.tasks);

      localStorage.setItem('tasks', stringifiedTasks);
    },
    addTask(params) {
      this.$store.dispatch('addTask', params);
      this.saveTasks();
    },
    deleteTask(params) {
      this.$store.commit('deleteTask', params);
      this.saveTasks();
    },
  },
};
</script>
