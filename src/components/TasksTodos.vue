<template>
  <i v-show="hasProperty()">(double click to mark the task as done)</i>
  <div v-for="task in tasks" :key="task.id">
    <TaskTodo 
      @task-emit-delete="deleteTask" 
      @task-emit-edit="editTask"
      @task-emit-toggle="toggleTask"
      :task="task"
    ></TaskTodo>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task } from './../interfaces/Task';
import TaskTodo from './TaskTodos.vue'
import type { PropType } from 'vue'

export default defineComponent({
  name:'TasksTodos',
  components: {
    TaskTodo
  },
  props: {
    tasks: {
      type: Object as PropType<Task[]>,
      required: true
    },
  },
  emits: {
    taskEmitDelete(taskEmit: Task) {
      return taskEmit;
    },
    taskEmitEdit(taskEmit: Task) {
      return taskEmit;
    },
    taskEmitToggle(taskEmit: Task) {
      return taskEmit;
    } 
  },
  methods: {
    hasProperty(){
        return this.tasks 
          && this.tasks.length > 0 
     },
     deleteTask(taskEmit: Task) {
      this.$emit('taskEmitDelete', taskEmit);
    },
    editTask(taskEmit: Task) {
      this.$emit('taskEmitEdit', taskEmit);
    },
    toggleTask(taskEmit: Task) {
      this.$emit('taskEmitToggle', taskEmit);
    }
  }
})
</script>