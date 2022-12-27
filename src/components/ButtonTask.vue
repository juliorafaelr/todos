<template>
    <button @click="onClick" :style="{ background: color }">{{ text }}</button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'ButtonTask',
    props: {
        text: String,
        color: String,
    },
    emits: ['toggleButton'],
    methods: {
        onClick() {
            this.$emit('toggleButton');
        }
    }
})
</script>
