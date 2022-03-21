import { Component, OnInit } from '@angular/core';
import { Todo, TodosService } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  todos: Todo[] = [];
  todoTitle = '';
  loading = false;
  error = '';
  

  constructor(
    private todosService: TodosService
  ) {}
  
  ngOnInit(): void {
    this.fetchTodos();
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }

    const newTodo: Todo = {
      title: this.todoTitle,
      completed: false
    }

    this.todosService.addTodo(newTodo)
      .subscribe(todo => {
        this.todos.unshift(todo);
        this.todoTitle = '';
      });
  }

  fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodos()
      .subscribe(response => {
        this.todos = response;
        this.loading = false;
      }, err => {
        this.error = err.message;
      })
  }

  removeTodo(id?: number) {
    this.todosService.removeTodo(id)
      .subscribe(() => this.todos = this.todos.filter(todo => todo.id !== id));
  }

  completeTodo(todo: Todo) {
    const changedTodo: Todo = {
      title: todo.title,
      completed: true,
      id: todo.id
    }
    this.todosService.completeTodo(todo.id)
      .subscribe((response) => {
        todo.completed = response.completed;
      });
  }

}
