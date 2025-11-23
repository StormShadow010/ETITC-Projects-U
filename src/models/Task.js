// Modelo para una tarea (lógica de negocio pura)
class Task {
  constructor(id, title, description, status, userId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status; // 'por_hacer', 'en_progreso', 'terminada'
    this.userId = userId;
  }

  // Método para validar si la tarea es válida
  isValid() {
    return this.title && this.title.length > 0;
  }

  // Método para cambiar estado
  updateStatus(newStatus) {
    if (["por_hacer", "en_progreso", "terminada"].includes(newStatus)) {
      this.status = newStatus;
    }
  }
}

export default Task;
