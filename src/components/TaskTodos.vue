<template>
  <div @dblclick="toggleTask(task)" :class="[ task.attributes.done ? 'done': '', 'task' ]">
    <div style="width: 80%;">
      <h3>{{ task.attributes.text }}</h3>
      <p>{{ task.attributes.day }}</p>
    </div>
    <div>
      <i @click="editTask(task)" class="fa-solid fa-pen-to-square"></i>
      <i @click="deleteTask(task)" class="fa-solid fa-trash"></i>
    </div>
</div> 
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Task } from './../interfaces/Task';
import type { PropType } from 'vue'

export default defineComponent({
  name:'TaskTodos',
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true
    },
  },
  emits: {
    taskEmitEdit(taskEmit: Task) {
      return taskEmit;
    },
    taskEmitDelete(taskEmit: Task) {
      return taskEmit;
    },
    taskEmitToggle(taskEmit: Task) {
      return taskEmit;
    }
  },
  methods: {
    editTask(taskEmit: Task) {
      this.$emit('taskEmitEdit', taskEmit)
    },
    deleteTask(taskEmit: Task) {
      this.$emit('taskEmitDelete', taskEmit)
    },
    toggleTask(taskEmit: Task) {
      this.$emit('taskEmitToggle', taskEmit)
    }
  }
})
</script>

<style scoped>
.fa-trash {
  color: red;
  margin-left: 20px;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
}
.task.done {
  border-left: 5px solid green;
  text-decoration: line-through;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>