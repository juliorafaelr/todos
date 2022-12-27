<template>
    <form  @submit="onSubmit" class="edit-form">
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
        <input type="submit" value="Edit Task" class="btn btn-block" />
    </form>
</template>

<script lang="ts">
import { Task } from '@/interfaces/Task';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'AddTask',
    props: {
        taskToEdit: {
            type: Object as PropType<Task>
        }
    },
    data() {
        return {
            id: '',
            text: '',
            day: '',
            done: false,
        }
    },
    emits: {
        emitTask(task: Task) {
            return task
        }
    },
    watch: {
        taskToEdit: function() {
            if(
            this.taskToEdit?.id !== undefined &&
            this.taskToEdit?.attributes.text !== undefined &&
            this.taskToEdit?.attributes.day !== undefined &&
            this.taskToEdit?.attributes.done !== undefined
        ) {
            this.id = this.taskToEdit.id;
            this.text = this.taskToEdit.attributes.text;
            this.day = this.taskToEdit.attributes.day;
            this.done = this.taskToEdit.attributes.done;
        }
        }
    },
    created() {
        if(
            this.taskToEdit?.id !== undefined &&
            this.taskToEdit?.attributes.text !== undefined &&
            this.taskToEdit?.attributes.day !== undefined &&
            this.taskToEdit?.attributes.done !== undefined
        ) {
            this.id = this.taskToEdit.id;
            this.text = this.taskToEdit.attributes.text;
            this.day = this.taskToEdit.attributes.day;
            this.done = this.taskToEdit.attributes.done;
        }
    },
    methods: {
        onSubmit(e: Event) {
            e.preventDefault();

            if(!this.text) {
                alert(`please fill text field`);

                return
            }

            if(this.text!== undefined && this.day!== undefined && this.done!== undefined) {
                const task = {
                    id: this.id,
                    type: 'tasks',
                    attributes: {
                        text: this.text,
                        day: this.day
                    }
                }

                this.$emit('emitTask', task);
            }
        }
    }
})
</script>

<style scoped>
.edit-form {
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
