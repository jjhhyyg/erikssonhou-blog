<template>
    <div class="text-3xl">Home</div>
    <UButton @click="store.increment()">{{ store.count }}</UButton>
</template>

<script setup lang="ts">

import { useTestStore } from '~/store'

const store = useTestStore()


</script>