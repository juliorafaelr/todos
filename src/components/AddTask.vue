<template>
    <form  @submit="onSubmit" class="add-form">
        <div class="form-control">
            <label>Task</label>
            <input v-model="text" type="text" name="text" placeholder="Add Task" />
        </div>
        <div class="form-control">
            <label>Day & Time</label>
            <input
                v-model="day"
                type="text"
                name="day"
                placeholder="Add Day & Time"
            />
        </div>
        <div class="form-control form-control-check">
            <label>Set If Done</label>
            <input v-model="done" type="checkbox" name="reminder" />
        </div>
        <input type="submit" value="Save Task" class="btn btn-block" />
    </form>
</template>

<script lang="ts">
import { Task } from '@/interfaces/Task';
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'AddTask',
    data() {
        return {
            text: '',
            day: '',
            done: false
        }
    },
    emits: {
        emitTask(task: Task) {
            return task
        }
    },
    methods: {
        onSubmit(e: Event) {
            e.preventDefault();

            if(!this.text) {
                alert(`please fill text field`);

                return
            }

            const newTask = {
                type: 'tasks',
                attributes: {
                    text: this.text,
                    day: this.day,
                    done: this.done
                }
            }

            this.$emit('emitTask', newTask);

            this.text = '';
            this.day = '';
            this.done = false;
        }
    }
})
</script>

<style scoped>
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}
</style>
