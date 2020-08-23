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
    <confirmation-dialog
      v-if="dialog.visible"
      :message="dialog.message"
      @cancel="dialogCancel"
      @continue="dialogContinue"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import TasksList from '@/components/Tasks.vue';
import AddTask from '@/components/AddTask.vue';
import ViewTask from '@/components/ViewTask.vue';
import ActionButton from '@/components/ActionButton.vue';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
import { RUNNING, PAUSED } from '@/store/constants';

const DELETE_TASK = 'deleteTask';
const CLEAR_ALL = 'clearAll';
const MESSAGES = {
  [DELETE_TASK]: 'You\`re gonna delete this task. Continue?', // eslint-disable-line
  [CLEAR_ALL]: 'You\`re gonna permanently remove all tasks. Proceed?', // eslint-disable-line
};

export default {
  name: 'Home',
  components: {
    ActionButton,
    AddTask,
    ConfirmationDialog,
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
      dialog: {
        type: null,
        visible: false,
        message: '',
        id: null,
      },
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

    window.addEventListener('unload', () => {
      if (this.currentTask.status === RUNNING) {
        this.stopTask();
      }
    });
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
    deleteTask(id) {
      this.setCurrentDialog({
        type: DELETE_TASK,
        message: MESSAGES[DELETE_TASK],
      });
      this.dialog.id = id;
    },
    clearAll() {
      this.setCurrentDialog({
        type: CLEAR_ALL,
        message: MESSAGES[CLEAR_ALL],
      });
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
    setCurrentDialog({ type, message }) {
      this.dialog.visible = true;
      this.dialog.type = type;
      this.dialog.message = message;
    },
    dialogCancel() {
      this.dialog.visible = false;
      this.dialog.message = '';
      this.dialog.type = null;
      this.dialog.id = null;
    },
    dialogContinue() {
      if (this.dialog.type === CLEAR_ALL) {
        this.$store.commit('setTasks', []);
      }

      if (this.dialog.type === DELETE_TASK) {
        this.$store.commit('deleteTask', this.dialog.id);
      }

      this.saveTasks();
      this.dialogCancel();
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
