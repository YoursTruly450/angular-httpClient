import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, tap, throwError } from 'rxjs';

export interface Todo {
  completed: boolean;
  title: string;
  id?: number;
}

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  constructor(private http: HttpClient) {}

  addTodo(todo: Todo): Observable<Todo> {
    const headers = new HttpHeaders({
      'MyCustomHeader': Math.random().toString()
    })
    return this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', todo, {
      headers
    });
  }

  fetchTodos(): Observable<Todo[]> {
    let params = new HttpParams();
    params = params.append('_limit', '7');
    params = params.append('_custom', 'y');
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos', {
      params,
      observe: 'body'
    })
      .pipe(
        delay(1000),
        catchError(error => {
          console.log('Error: ', error.message);
          return throwError(error);
        })
      )
  }

  removeTodo(id?: number): Observable<any> {
    return this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      observe: 'events'
    })
    .pipe(
      tap(e => {
        if (e.type === HttpEventType.Sent) {
          console.log('Sent', event);
        }
        if (e.type === HttpEventType.Response) {
          console.log('Response', event);
        }
      })
    );
  }

  completeTodo(id?: number): Observable<Todo> {
    return this.http.put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      completed: true
    },
    {
      responseType: 'json'
    });
  }
}
