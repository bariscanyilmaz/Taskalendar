import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from 'src/app/models/Task';
import { Todo } from 'src/app/models/Todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.css']
})
export class EditTodoComponent implements OnInit {

  @ViewChild('todoModal') todoModal: ElementRef<HTMLDivElement>;
  @Input('task') task: Task;
  @Input('todo') todo: Todo;
  tempTodo:String='';

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    
  }

  save() {
    this.todo.todo=this.tempTodo;    
    this.updateTodo();
    this.dismiss();
  }

  open() {
    this.todoModal.nativeElement.style.display = 'flex';
    this.tempTodo=this.todo.todo;
  }

  dismiss() {
    this.todoModal.nativeElement.style.display = 'none';
  }

  updateTodo(){
    this.todoService.updateTodo(this.todo).subscribe(data=>{
      console.log(data);
    });
  }

}
