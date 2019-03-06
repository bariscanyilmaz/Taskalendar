import { Injectable } from '@angular/core';
import { Task } from '../models/Task';
import { Observable, of } from 'rxjs';
import * as uuid from 'uuid/v1';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from '../models/Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  API_URL = 'http://localhost:3000/';

  Tasks: Task[] = [
    {
      dayId: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime(),
      todos: [{
        id: uuid(),
        todo: 'Go School',
        isDone: false
      }, {
        id: uuid(),
        todo: 'Buy new Jean',
        isDone: false
      }, {
        id: uuid(),
        todo: 'Get a new Girlfriend',
        isDone: true
      }]
    },
    {
      dayId: 1549918800000,
      todos: [{
        id: uuid(),
        todo: 'Go Travel',
        isDone: false
      }, {
        id: uuid(),
        todo: 'Translate letter',
        isDone: false
      }, {
        id: uuid(),
        todo: 'Buy a laptop',
        isDone: true
      }]
    },
    {
      dayId: 1549486800000,
      todos: [{
        id: uuid(),
        todo: 'Clear Room',
        isDone: false
      }, {
        id: uuid(),
        todo: 'Go to Doctor.',
        isDone: false
      }, {
        id: uuid(),
        todo: 'Go Gym',
        isDone: true
      }]
    },
    {
      dayId: 1550350800000,
      todos: [{
        id: uuid(),
        todo: 'Eat breakfast',
        isDone: false
      }, {
        id: uuid(),
        todo: 'Code UI',
        isDone: false
      }, {
        id: uuid(),
        todo: 'D Test',
        isDone: true
      }]
    }
  ];

  

  constructor(private http: HttpClient) {
    this.http.get('/assets/config.json').subscribe((data:any)=>{this.API_URL=(data.API_URL)});
  }


  getTask(dayId: number): Observable<Task> {
    return this.http.get<Task>(this.API_URL + `task/${dayId}`);
  }

  getTasks(gte: number, lte: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.API_URL + `task/?gte=${gte}&lte=${lte}`);
  }

  addOrUpdateTask(task: Task): Observable<String> {
    let url = this.API_URL + 'task/AddOrUpdate';
    let body = task;

    return this.http.post<String>(url, body);
  }
  updateTodo(todo:Todo){
    let url = this.API_URL + 'task/UpdateTodo';
    let body = todo;

    return this.http.post<String>(url, body);
  }
}
