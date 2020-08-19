<template>
  <div>
    <h1>Tasks</h1>
    <tasks-list :tasks="tasks" @deleteTask="deleteTask" />
    <add-task @addTask="addTask" />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
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
  methods: {
    ...mapActions(['addTask']),
    ...mapMutations(['deleteTask']),
  },
};
</script>
