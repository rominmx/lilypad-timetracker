<template>
  <div :class="$style.container">
    <tasks-list
      :tasks="tasks"
      @deleteTask="deleteTask"
      @startTask="startTask"
      @clearAll="clearAll"
    />
    <add-task @addTask="addTask" />
    <view-task
      v-if="taskRunning"
      :title="currentTask.title"
      :total-time="currentTask.totalTime"
      @stop="stopTask"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TasksList from '@/components/Tasks.vue';
import AddTask from '@/components/AddTask.vue';
import ViewTask from '@/components/ViewTask.vue';
import { RUNNING, PAUSED } from '@/store/constants';

export default {
  name: 'Home',
  components: {
    AddTask,
    TasksList,
    ViewTask,
  },
  data() {
    return {
      currentTask: {
        status: PAUSED,
        id: null,
        title: 0,
        totalTime: 0,
      },
    };
  },
  computed: {
    ...mapState(['tasks']),
    taskRunning() {
      return this.currentTask.status === RUNNING;
    },
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
    clearAll() {
      this.$store.commit('setTasks', []);
      this.saveTasks();
    },
    startTask({ id, title, totalTime }) {
      const startTime = new Date().getTime();

      this.$store.dispatch('startTask', { id, startTime });
      this.editCurrentTask({
        status: RUNNING,
        id,
        title,
        totalTime,
      });
    },
    stopTask() {
      const stopTime = new Date().getTime();

      this.$store.dispatch('stopTask', { id: this.currentTask.id, stopTime });
      this.editCurrentTask({
        id: null,
        status: PAUSED,
        title: '',
        totalTime: 0,
      });
      this.saveTasks();
    },
    // eslint-disable-next-line
    editCurrentTask({ status, id, title, totalTime }) {
      this.currentTask.status = status;
      this.currentTask.id = id;
      this.currentTask.title = title;
      this.currentTask.totalTime = totalTime;
    },
  },
};
</script>

<style module>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
}
</style>
