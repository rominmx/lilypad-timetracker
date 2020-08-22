<template>
  <div :class="$style.container">
    <div :class="$style.content">
      <tasks-list
        v-if="tasks.length"
        :tasks="tasks"
        @deleteTask="deleteTask"
        @startTask="startTask"
        @clearAll="clearAll"
      />
      <div v-else :class="$style.message">
        You have not added any tasks yet.<br />
        Wanna add one?
      </div>
      <button
        :disabled="taskIsAdding"
        :class="[$button.container, $style.addButton]"
        @click="showAddTaskDialog(true)"
      >
        Add New Task
      </button>
    </div>
    <div v-if="tasks.length" :class="$style.footer">
      <action-button @click="clearAll" :class="$style.clearButton">Clear All Tasks</action-button>
    </div>
    <add-task v-if="taskIsAdding" @addTask="addTask" @close="showAddTaskDialog(false)" />
    <view-task
      v-if="taskIsRunning"
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
import ActionButton from '@/components/ActionButton.vue';
import { RUNNING, PAUSED } from '@/store/constants';

export default {
  name: 'Home',
  components: {
    ActionButton,
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
      taskIsAdding: false,
    };
  },
  computed: {
    ...mapState(['tasks']),
    taskIsRunning() {
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
    showAddTaskDialog(flag) {
      this.taskIsAdding = flag;
    },
    addTask(params) {
      this.$store.dispatch('addTask', params);
      this.showAddTaskDialog(false);
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
  min-height: 100%;
  width: 100%;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  padding-top: 2vw;
  padding-bottom: 2vw;
  width: 80%;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 2vw;
  padding-bottom: 2vw;
}

.message {
  font-size: 4vw;
  margin-bottom: 1em;
  text-align: center;
}

.addButton {
  font-size: 3vw;
}

.clearButton {
  font-size: 2vw;
}
</style>

<style lang="scss" src="../stylesheets/buttons.scss" module="$button" />
