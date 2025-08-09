export default class RepositoryNota {
  private notas: Nota[] = [];
  private nextId: number = 1;

  public async create(titulo: string, contenido: string): Promise<Nota> {
    const nota = new Nota(this.nextId++, titulo, contenido);
    this.notas.push(nota);
    return nota;
  }

  public async findAll(): Promise<Nota[]> {
    return this.notas;
  }

  public async findById(id: number): Promise<Nota | null> {
    const nota = this.notas.find(n => n.id === id);
    return nota || null;
  }

  public async update(id: number, titulo: string, contenido: string): Promise<Nota | null> {
    const nota = await this.findById(id);
    if (nota) {
      nota.titulo = titulo;
      nota.contenido = contenido;
      return nota;
    }
    return null;
  }

  public async delete(id: number): Promise<boolean> {
    const index = this.notas.findIndex(n => n.id === id);
    if (index !== -1) {
      this.notas.splice(index, 1);
      return true;
    }
    return false;
  }
}

import Nota from '../models/ModelNota';