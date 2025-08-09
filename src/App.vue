<script setup lang="ts">
import { onBeforeMount } from 'vue';
import ViewNotas from './views/ViewNotas.vue';
import RepositoryNotas from './repositories/RepositoryNotas.ts';
import getNotasDefault from './services/getNotasDefault.ts';

const repositoryNotas = new RepositoryNotas();

onBeforeMount(async () => {
  try {
    const notas = await getNotasDefault();
    if (notas.length > 0) {
      notas.forEach(nota => {
        repositoryNotas.create(nota.titulo, nota.contenido);
      })
    } else {
      console.warn('No hay notas por defecto para cargar.');
    }
  } catch (error) {
    console.error('Error al cargar las notas por defecto:', error);
  }
});
</script>

<template>
  <ViewNotas :repositoryNotas/>
</template>

<style scoped>
</style>
