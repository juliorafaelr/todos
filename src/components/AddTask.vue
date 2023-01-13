<template>
    <form @submit="onSubmit" class="add-form">
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
        <div class="ns-checkboxes ns-checkboxes--small">
            <div class="ns-checkboxes__item">
                <input v-model="done" class="ns-checkboxes__input" id="organisation" name="organisation" type="checkbox" value="hmrc">
                <label class="ns-label ns-checkboxes__label" for="organisation">
                    <span class="ns-label-span">done</span>
                </label>
            </div>
        </div>
        <input type="submit" value="Save Task" class="btn btn-block" />
    </form>
</template>

<script lang="ts">
import { CreateError } from '@/interfaces/CreateError';
import { Task } from '@/interfaces/Task';
import { defineComponent, PropType } from 'vue'

export default defineComponent({
    name: 'AddTask',
    data() {
        return {
            text: '',
            day: '',
            done: false
        }
    },
    props: {
        createErrors: {
            type: Object as PropType<CreateError[]>
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
        },
        ifError(field: string) {
            return this.createErrors?.filter((error) => error.source?.pointer === field)[0];
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
<style>
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

  /* Start Check Box */

  .ns-checkboxes__item {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.25;
    display: block;
    position: relative;
    min-height: 40px;
    margin-bottom: 10px;
    padding-left: 40px;
    clear: left;
}
@media print {
    .ns-checkboxes__item {
        font-family: sans-serif;
    }
}

@media print {
    .ns-checkboxes__item {
        font-size: 14pt;
        line-height: 1.15;
    }
}
.ns-checkboxes__item:last-child,
.ns-checkboxes__item:last-of-type {
    margin-bottom: 0;
}
.ns-checkboxes__item:hover .ns-label-span  {
	background-color: #f8d44c;
	transition: 0.2s ease;
}
.ns-checkboxes__input {
    cursor: pointer;
    position: absolute;
    z-index: 1;
    top: -2px;
    left: -2px;
    width: 44px;
    height: 44px;
    margin: 0;
    opacity: 0;
}
.ns-checkboxes__label {
    display: inline-flex;
    margin-bottom: 0;
    padding: 8px 15px 5px;
    cursor: pointer;
    -ms-touch-action: manipulation;
    touch-action: manipulation;
}
label.ns-checkboxes__label.noBold{
	font-family: "open_sansregular",Helvetica,Arial,Tahoma,sans-serif;
	font-weight: normal;
}
.ns-checkboxes__label:before {
    content: "";
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 40px;
    height: 40px;
    border: 1px solid #A2A2A2;
    background: #fff;
	transition: 0.2s ease;
}
.ns-checkboxes__input:checked + .ns-checkboxes__label:before {
	background: #0058A4;
} 
.ns-checkboxes__label:after {
    content: "";
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 11px;
    left: 9px;
    width: 23px;
    height: 12px;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    border: solid;
    border-width: 0 0 5px 5px;
    border-top-color: transparent;
    opacity: 0;
    background: transparent;
	color: #fff;
}
.ns-checkboxes__hint {
    display: block;
    padding-right: 15px;
    padding-left: 15px;
	line-height: 1.5rem;
}

.ns-checkboxes__input:focus + .ns-checkboxes__label:before, .ns-checkboxes__input:hover + .ns-checkboxes__label:before  {
    -webkit-box-shadow: 0 0 0 3px #F8D44C;
    box-shadow: 0 0 0 3px #F8D44C;
}
.ns-checkboxes__input:checked + .ns-checkboxes__label:after {
    opacity: 1;
}
.ns-checkboxes__input:disabled,
.ns-checkboxes__input:disabled + .ns-checkboxes__label {
    cursor: default;
}
.ns-checkboxes__input:disabled + .ns-checkboxes__label {
    opacity: 0.5;
}
.ns-checkboxes__conditional {
    margin-bottom: 15px;
    margin-left: 18px;
    padding-left: 33px;
    border-left: 4px solid #b1b4b6;
}
@media (min-width: 40.0625em) {
    .ns-checkboxes__conditional {
        margin-bottom: 20px;
    }
}
.js-enabled .ns-checkboxes__conditional--hidden {
    display: none;
}
.ns-checkboxes__conditional > :last-child {
    margin-bottom: 0;
}
.ns-checkboxes--small .ns-checkboxes__item {
    min-height: 0;
    margin-bottom: 0;
    padding-left: 34px;
    float: left;
}
.ns-checkboxes--small .ns-checkboxes__item:after {
    content: "";
    display: block;
    clear: both;
}
.ns-checkboxes--small .ns-checkboxes__input {
    left: -10px;
}
.ns-checkboxes--small .ns-checkboxes__label {
    margin-top: -2px;
    padding: 13px 15px 13px 1px;
    float: left;
}
.ns-checkboxes--small .ns-checkboxes__item .ns-label-span {
	padding: 0px 12px;
    position: relative;
    left: -10px; 
}
@media (min-width: 40.0625em) {
    .ns-checkboxes--small .ns-checkboxes__label {
        padding: 11px 15px 10px 1px;
    }
}
.ns-checkboxes--small .ns-checkboxes__label:before {
    top: 8px;
    width: 24px;
    height: 24px;
}
.ns-checkboxes--small .ns-checkboxes__label:after {
    top: 15px;
    left: 6px;
    width: 12px;
    height: 6.5px;
    border-width: 0 0 3px 3px;
}
.ns-checkboxes--small .ns-checkboxes__hint {
    padding: 0;
    clear: both;
}
.ns-checkboxes--small .ns-checkboxes__conditional {
    margin-left: 10px;
    padding-left: 20px;
    clear: both;
}
.ns-checkboxes--small .ns-checkboxes__item:hover .ns-checkboxes__input:not(:disabled) + .ns-checkboxes__label:before {
    -webkit-box-shadow: 0 0 0 10px #F8D44C;
    box-shadow: 0 0 0 5px #F8D44C;
}
.ns-checkboxes--small .ns-checkboxes__item:hover .ns-checkboxes__input:focus + .ns-checkboxes__label:before {
    -webkit-box-shadow: 0 0 0 3px #F8D44C, 0 0 0 5px #F8D44C;
    box-shadow: 0 0 0 3px #F8D44C, 0 0 0 5px #F8D44C;
}
</style>
