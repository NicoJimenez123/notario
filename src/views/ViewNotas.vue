<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import ComponentNota from '../components/ComponentNota.vue';
import RepositoryNotas from '../repositories/RepositoryNotas.ts';
import Nota from '../models/ModelNota';
import getNotasDefault from '../services/getNotasDefault.ts';

const { repositoryNotas } = defineProps<{
  repositoryNotas: RepositoryNotas;
}>();
const notas = ref<Nota[]>([]);

const cargarNotas = async () => {
  try {
    let response = await repositoryNotas.findAll();
    notas.value = [...response];
    console.log('Cargando notas desde el repositorio...');
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
    console.log('Eliminando nota: ', id);
    if(await repositoryNotas.delete(id)) {
      await cargarNotas(); // Recargar las notas después de eliminar
    } else {
      console.warn('No existe nota con la ID: ', id);
    }
  } catch (error) {
    console.error('Error al eliminar la nota:', error);
  }
};

const listarNotas = async () => {
  console.log(notas.value);
}

const recargarNotas = async () => {
  let notasDefault = await getNotasDefault();
  notasDefault.forEach(nota => {
    repositoryNotas.create(nota.titulo, nota.contenido);
  })
  await cargarNotas();
}

onBeforeMount( async () => {
  await cargarNotas();
})
</script>

<template>
  <button @click="listarNotas()">Listar Notas</button>
  <button @click="recargarNotas()">Recargar Notas</button>
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