<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import ComponentNota from '../components/ComponentNota.vue';
import RepositoryNotas from '../repositories/RepositoryNotas.ts';
import Nota from '../models/ModelNota';

const { repositoryNotas } = defineProps<{
  repositoryNotas: RepositoryNotas;
}>();
const notas = ref<Nota[]>([]);

const cargarNotas = async () => {
  try {
    notas.value = await repositoryNotas.findAll();
  } catch (error) {
    console.error('Error al cargar las notas:', error);
  }
};

const editarNota = (nota: Nota) => {
  // Lógica para editar la nota
  console.log('Editar nota:', nota);
  //repositoryNotas.update(nota);
};

const eliminarNota = async (id: number) => {
  try {
    repositoryNotas.delete(id);
    cargarNotas(); // Recargar las notas después de eliminar
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
  }
};

onBeforeMount(() => {
  cargarNotas();
});
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Nota</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="nota in notas" :key="nota.id">
        <td><ComponentNota :nota /></td>
        <td>
          <button @click="editarNota(nota)">Editar</button>
          <button @click="eliminarNota(nota.id)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>