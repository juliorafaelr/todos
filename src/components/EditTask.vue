<template>
    <form  @submit="onSubmit" class="edit-form">
        <div :class="[ ifError('/data/attributes/text') ? 'ns-form-group-message-error': '', 'ns-form-group', 'form-control' ]">
            <h3 class="ns-label-wrapper">
                <label class="ns-label" for="event-name">
                    Task
                </label>
            </h3>
            <span v-show="ifError('/data/attributes/text')" id="changed-name-error" class="ns-error-message field-validation-error">
                <i class="fa fa-exclamation-circle error-indicator errorAlert" aria-hidden="true"></i>
                <span class="ns-visually-hidden"> Error:</span> enter a task
            </span>
            <input v-model="text" placeholder="Add a Task" :class="[ ifError('/data/attributes/text') ? 'ns-input--error': '', 'ns-input', 'fw-30' ]" id="event-name" name="event-name" type="text" :aria-describedby="ifError('/data/attributes/text') ? 'event-name-hint event-name-error': 'event-name-hint'">
        </div>
        <div :class="[ ifError('/data/attributes/day') ? 'ns-form-group-message-error': '', 'ns-form-group', 'form-control' ]">
            <h3 class="ns-label-wrapper">
                <label class="ns-label" for="event-name">
                    Day & Time
                </label>
            </h3>
            <span v-show="ifError('/data/attributes/day')" id="changed-name-error" class="ns-error-message field-validation-error">
                <i class="fa fa-exclamation-circle error-indicator errorAlert" aria-hidden="true"></i>
                <span class="ns-visually-hidden"> Error:</span> enter a Day & Time
            </span>
            <input v-model="day" placeholder="Add Day & Time" :class="[ ifError('/data/attributes/text') ? 'ns-input--error': '', 'ns-input', 'fw-30' ]" id="event-name" name="event-name" type="text" :aria-describedby="ifError('/data/attributes/text') ? 'event-name-hint event-name-error': 'event-name-hint'">
        </div>
        <input type="submit" value="Edit Task" class="btn btn-block" />
    </form>
</template>

<script lang="ts">
import { CreateError } from '@/interfaces/CreateError';
import { Task } from '@/interfaces/Task';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'AddTask',
    props: {
        taskToEdit: {
            type: Object as PropType<Task>
        },
        editErrors: {
            type: Object as PropType<CreateError[]>
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
        },
        ifError(field: string) {
            return this.editErrors?.filter((error) => error.source?.pointer === field)[0];
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
/* -------------------------------------------- Start fixed widths ----------------------------------------------------- */

input[type="text"], input[type="email"], input[type="number"], input[type="tel"], textarea, input[list], select {
    width:100%;
}

.fw-2 {
    max-width: 3em;
    width: 100%;
}
.fw-4 {
    max-width: 4em;
    width: 100%;
}
.fw-6 {
    max-width: 6em;
    width: 100%;
}
.fw-8 {
    max-width: 8em;
    width: 100%;
}
.fw-10 {
    max-width: 10em;
    width: 100%;
}
.fw-15 {
    max-width: 15em;
    width: 100%;
}
.fw-20 {
    max-width: 20em;
    width: 100%;
}
.fw-25 {
    max-width: 25em;
    width: 100%;
}
.fw-30 {
    max-width: 30em;
    width: 100%;
}
.fw-35 {
    max-width: 35em;
    width: 100%;
}
.fw-40 {
    max-width: 40em;
    width: 100%;
}
.fw-50 {
    max-width: 50em;
    width: 100%;
}

/* -------------------------------------------- End fixed widths ----------------------------------------------------- */

/* -------------------------------------------- start fieldset ----------------------------------------------------- */

.ns-fieldset {
    margin-bottom: 20px;
}
.ns-fieldset:after {
    content: "";
    display: block;
    clear: both;
}
@media (min-width: 40.0625em) {
    .ns-fieldset {
        margin-bottom: 30px;
    }
}
.ns-fieldset .ns-fieldset:last-of-type {
    margin-bottom: 0;
}
.ns-fieldset__heading {
    margin: 0;
}
/* -------------------------------------------- end fieldset ----------------------------------------------------- */

/* -------------------------------------------- start form group ----------------------------------------------------- */

.ns-form-group {
    margin-bottom: 20px;
}
.ns-form-group:after {
    content: "";
    display: block;
    clear: both;
}
@media (min-width: 40.0625em) {
    .ns-form-group {
        margin-bottom: 30px;
    }
}
.ns-form-group .ns-form-group:last-of-type {
    margin-bottom: 0;
}
.ns-form-group--error {
    padding-left: 15px;
    border-left: 5px solid #d4351c;
}
.ns-form-group--error .ns-form-group {
    padding: 0;
    border: 0;
}

.ns-form-group-message-error {
    padding-left: 15px;
    border-left: 5px solid #a94442;
}

.ns-form-group-message-warning {
    padding-left: 15px;
    border-left: 5px solid #8a6d3b;
}

/* -------------------------------------------- end form group ----------------------------------------------------- */

/* -------------------------------------------- start legend ----------------------------------------------------- */
legend{
	margin-bottom: 0.5em;
}
legend.label{
    margin-bottom: 1;
    font-size: 1em;
    line-height: inherit;
    color: inherit;
    font-weight: 600;
	border-bottom: 0;
	color: #444;
	font-family: "open_sansbold",Helvetica,Arial,Tahoma,sans-serif;
}

legend.noBorder{
	border-bottom: 0 !important;
}

legend.label .ns-fieldset__heading{
	font-size: inherit;
    font-weight: inherit;
}

/* -------------------------------------------- end legend ----------------------------------------------------- */

/* -------------------------------------------- start label ----------------------------------------------------- */
.ns-label-wrapper {
    margin: 0;
}
h1.ns-label-wrapper .ns-label, h2.ns-label-wrapper .ns-label, h3.ns-label-wrapper .ns-label, h4.ns-label-wrapper .ns-label, h5.ns-label-wrapper .ns-label{
	font-family: "open_sansregular",Helvetica,Arial,Tahoma,sans-serif;
    font-weight: 400;
	margin-bottom: .5em;
}

label.ns-label{
	font-family: "open_sansbold",Helvetica,Arial,Tahoma,sans-serif;
	font-weight: 400;
}

.ns-label.noBold{
	font-family: "open_sansregular",Helvetica,Arial,Tahoma,sans-serif;
	font-weight: normal;
}

.ns-label-span {
    padding: 0px 15px;
    position: relative;
    left: -15px;
	flex: 1 1 auto;
	font-size: 1rem;
}

/* -------------------------------------------- end label ----------------------------------------------------- */

/* -------------------------------------------- start form hint ----------------------------------------------------- */
.ns-hint {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: block;
  margin-bottom: 15px; }
  
.ns-fieldset__legend + .ns-hint, .ns-label-wrapper + .ns-hint {
    margin-top: -0.5em;
} 

/* -------------------------------------------- end form hint ----------------------------------------------------- */



/* -------------------------------------------- start fieldset error ----------------------------------------------------- */

.ns-fieldset-message-error {
    padding-left: 15px;
    border-left: 5px solid #a94442;
}
.ns-fieldset-message-warning {
    padding-left: 15px;
    border-left: 5px solid #8a6d3b;
}

.ns-fieldset--error .ns-fieldset {
    padding: 0;
    border: 0;
}
.ns--message {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.25;
    display: block;
    margin-bottom: 15px;
    clear: both;
}
.ns-error-message {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.25;
    display: block;
    margin-bottom: 15px;
    clear: both;
    color: #a94442;
}
.ns-warning-message {
    color: #8a6d3b;
}
.ns-error-indicator{
    color: #a94442;
}
input[type="text"].ns-input--error, input[type="email"].ns-input--error, input[type="number"].ns-input--error, input[type="tel"].ns-input--error, textarea.ns-input--error, input[list].ns-input--error {
    border: 2px solid #a94442;
}

.ns-error-link{
	text-decoration: underline;
	color: #a94442;
}
/* -------------------------------------------- end fieldset error ----------------------------------------------------- */

</style>
