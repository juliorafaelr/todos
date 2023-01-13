<template>
  <div class="container">
   <HeaderTodos :showForm="showForm" @toggle-add-task="toggleAddForm" title="To-dos"/>
   <div v-show="showForm">
      <AddTask :createErrors="createErrors" @emit-task="createTask" ></AddTask>
   </div>
   <div v-if="taskToEdit.attributes.text !== ''">
      <EditTask :editErrors="editErrors" :taskToEdit="taskToEdit" @emit-task="editTask" ></EditTask>
   </div>
   <TasksTodos 
    @task-emit-delete="deleteTask" 
    @task-emit-edit="editTaskForm"
    @task-emit-toggle="toggleTask"
    :tasks="tasks"/>
  </div>
</template>

<script lang="ts">
import HeaderTodos from './components/HearderTodos.vue';
import { CreateError } from './interfaces/CreateError';
import TasksTodos from './components/TasksTodos.vue';
import EditTask from './components/EditTask.vue';
import AddTask from './components/AddTask.vue';
import { Task } from './interfaces/Task';
import { defineComponent } from "vue";
import axios from 'axios';


axios.defaults.baseURL = process.env.VUE_APP_API_HOST;

export default defineComponent({
  components: {
    HeaderTodos,
    TasksTodos,
    EditTask,
    AddTask,
  },
  data() {
    let tasks: Task[] = []

    let createErrors: CreateError[] = [];

    let editErrors: CreateError[] = [];

    let task: Task = {
        type: 'tasks',
        id: '',
        attributes: {
          text:'',
          day:'',
          done: false
         }
      };

    return {
      taskToEdit: task,
      tasks: tasks,
      showForm: false,
      createErrors: createErrors,
      editErrors: editErrors
     }
  },
  methods: {
    async deleteTask(taskEmit: Task) {
      if(confirm(`do yoy want to delete task "${taskEmit.attributes.text}"`)) {
        try {
          await axios
          .delete(
          `api/v1/tasks/${taskEmit.id}`,
          {
              headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
              }
            }
          )

          this.tasks = this.tasks.filter((task) => task.id !== taskEmit.id)

          this.taskToEdit = {
            type: 'tasks',
            id: '',
            attributes: {
              text:'',
              day:'',
              done: false
            }
          }; 
        } catch(error) {
          if (axios.isAxiosError(error)) {
            alert(`error message:  ${error.response?.data.errors[0].detail}`);
          }
        }
      }
    },
     async toggleTask(taskEmit: Task) {
      const updatedTask = JSON.parse(JSON.stringify(taskEmit))

      updatedTask.attributes.done = !taskEmit.attributes.done;
      try {
        await axios
        .patch(
          `api/v1/tasks/${taskEmit.id}`,
          JSON.stringify({data:updatedTask}),
          {
            headers: {
              Accept: 'application/vnd.api+json',
              'Content-Type': 'application/vnd.api+json',
              Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
            }
          }
        )

        this.tasks = this.tasks.map((task) => {
          if(task.id === taskEmit.id) {
            const newtask = task

            newtask.attributes.done = !task.attributes.done;

            return {...task, newtask}
          }

          return task
       })
      } catch(error) {
        if (axios.isAxiosError(error)) {
          alert(`error message:  ${error.response?.data.errors[0].detail}`);
        }
      }
    },
    async createTask(task: Task) {
      try {
        const response = await axios
        .post(
          'api/v1/tasks/',
          JSON.stringify({data:task}),
          {
              headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
              }
            }
          )

        this.tasks = [...this.tasks, response.data.data];

        this.showForm = !this.showForm;
      } catch(error) {
        if (axios.isAxiosError(error)) {
          const errors : CreateError[] = error.response?.data.errors

          this.createErrors = errors;
        }
      }
    },
    editTaskForm(task: Task) {
      if(this.taskToEdit.id !== undefined && this.taskToEdit.id === task.id) {
        this.editErrors = [];

        this.taskToEdit = {
            type: 'tasks',
            id: '',
            attributes: {
              text:'',
              day:'',
              done: false
            }
          };
      } else {
        this.taskToEdit = task;
        
        this.showForm = false;
      }

    
    },
    async editTask(taskEmit: Task) {
      try {
       const response = await axios
        .patch(
          `api/v1/tasks/${taskEmit.id}`,
          JSON.stringify({data:taskEmit}),
          {
              headers: {
                Accept: 'application/vnd.api+json',
                'Content-Type': 'application/vnd.api+json',
                Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
              }
            }
          )

          this.tasks = this.tasks.map((task) => {
          if(task.id === taskEmit.id) {
            return response.data.data;
          }

          return task;
        })

        this.taskToEdit = {
            type: 'tasks',
            id: '',
            attributes: {
              text:'',
              day:'',
              done: false
            }
          };
          
          this.showForm = false;
      } catch(error) {
        if (axios.isAxiosError(error)) {
          const errors : CreateError[] = error.response?.data.errors

          this.editErrors = errors;
        }
      }
    },
    toggleAddForm() {
      this.showForm = !this.showForm;

      this.createErrors= [];

      this.taskToEdit = {
        type: 'tasks',
        id: '',
        attributes: {
          text:'',
          day:'',
          done: false
         }
      };
    },
    async fetchTasks(): Promise<Task[]> {
      try {
      const response = await axios
        .get(
          'api/v1/tasks?sort=created_at',
          {
              headers: {
                Accept: 'application/vnd.api+json',
                Authorization: `Bearer ${process.env.VUE_APP_API_TOKEN}`
              }
            }
          )

        return response.data.data;
      } catch(error) {
        if (axios.isAxiosError(error)) {
          return Promise.reject(error.response?.data.errors[0].detail)
        }
      }
      
      return Promise.reject('')
    }
  },
  async created() {
    try {
      this.tasks = await this.fetchTasks();
    } catch(error) {
      alert(`error message: ${error}`);
    }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Poppins', sans-serif;
}

.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}

.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}

.btn:focus {
  outline: none;
}

.btn:active {
  transform: scale(0.98);
}

.btn-block {
  display: block;
  width: 100%;
}
</style>
