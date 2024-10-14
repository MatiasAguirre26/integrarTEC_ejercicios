class Task {
    constructor({id, title, description, dueDate, priority}) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
    }
  }
  
  class TaskManager {
    constructor(tasks) {
      this.tasks = tasks.map(task => new Task(task));
    }
  
    // Agregar una nueva tarea
    addTask({title, description, dueDate, priority}) {
      const id = this.tasks.length + 1;
      const task = new Task({id, title, description, dueDate, priority});
      this.tasks.push(task);
    }
  
    // Eliminar una tarea por índice
    removeTask(id) {   
      this.tasks = this.tasks.filter(task => task.id !== id);
    }
  
    // Ordenar las tareas por prioridad
    sortTasksByPriority() {
      this.tasks.sort((a, b) => a.priority - b.priority);
    }
  
    // Mostrar las tareas
    displayTasks() {
      console.log("Lista de tareas:");
      this.tasks.forEach(task => console.log(task));
    }
  }
  
  // Datos iniciales
  const initialTasks = [
    { id: 1, title: "Completar informe", description: "Finalizar informe trimestral", dueDate: "2024-03-15", priority: 2 },
    { id: 2, title: "Reunión con cliente", description: "Presentar propuesta de proyecto", dueDate: "2024-03-10", priority: 1 },
    { id: 3, title: "Actualizar software", description: "Instalar últimas actualizaciones", dueDate: "2024-03-20", priority: 3 }
  ];
  
  // Crear una instancia de TaskManager con las tareas iniciales
  const taskManager = new TaskManager(initialTasks);
  
  
  // Agregar una nueva tarea
  taskManager.addTask({title:"Planificar evento", description:"Organizar el evento anual", dueDate:"2024-04-01", priority:1});
  
  // Mostrar las tareas iniciales
  taskManager.sortTasksByPriority();
  taskManager.displayTasks();
  