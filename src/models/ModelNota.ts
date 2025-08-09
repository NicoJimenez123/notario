export default class Nota {
  id: number;
  titulo: string;
  contenido: string;

  constructor(id: number, titulo: string, contenido: string) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
  }
}