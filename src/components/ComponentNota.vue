<script setup lang="ts">
import { defineProps } from 'vue';
import ModelNota from '../models/ModelNota';

const { nota }: { nota: ModelNota } = defineProps<{
  nota: ModelNota;
}>(); 
</script>

<template>
  <div>
    <h3>{{ nota.titulo }}</h3>
    <p>{{ nota.contenido }}</p>
  </div>
</template>