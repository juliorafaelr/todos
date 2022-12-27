<template>
    <header>
        <h1>{{ title }}</h1>
        <ButtonTask @toggle-button="toggleAddTaskButton" class="btn" :text="showForm ? 'Close' : 'Add Task'" :color="showForm ? 'red' : 'green'"></ButtonTask>
    </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ButtonTask from './ButtonTask.vue';

export default defineComponent({
    name: 'HeaderTodos',
    components: {
        ButtonTask
    },
    props: {
        title: String,
        showForm: Boolean
    },
    emits:['toggleAddTask'],
    methods: {
        toggleAddTaskButton() {
            this.$emit('toggleAddTask')
        }
    }
})
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
</style>