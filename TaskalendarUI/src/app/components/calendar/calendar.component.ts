import { Component, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, Inject, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragMove, CdkDragExit } from '@angular/cdk/drag-drop';
import * as uuid from 'uuid/v1';
import { Todo } from 'src/app/models/Todo';
import { Task } from 'src/app/models/Task';
import { TodoService } from 'src/app/services/todo.service';
import { Subject } from 'rxjs';
import { EditTodoComponent } from '../edit-todo/edit-todo.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements AfterViewInit, OnInit {

  @ViewChild('day0') dayElement0: ElementRef<HTMLDivElement>;
  @ViewChild('day1') dayElement1: ElementRef<HTMLDivElement>;
  @ViewChild('day2') dayElement2: ElementRef<HTMLDivElement>;
  @ViewChild('day3') dayElement3: ElementRef<HTMLDivElement>;
  @ViewChild('day4') dayElement4: ElementRef<HTMLDivElement>;
  @ViewChild('day5') dayElement5: ElementRef<HTMLDivElement>;
  @ViewChild('day6') dayElement6: ElementRef<HTMLDivElement>;

  @ViewChild('monthElement') monthElement: ElementRef<HTMLHeadingElement>;
  @ViewChild('yearElement') yearElement: ElementRef<HTMLHeadingElement>;

  @ViewChild(EditTodoComponent)
  private editComponent: EditTodoComponent;





  taskBar: Task = { dayId: 0, todos: [] };
  Tasks: Task[] = [];

  taskBar1: Task = { dayId: 0, todos: [] };
  taskBar2: Task = { dayId: 0, todos: [] };
  taskBar3: Task = { dayId: 0, todos: [] };
  taskBar4: Task = { dayId: 0, todos: [] };
  taskBar5: Task = { dayId: 0, todos: [] };
  taskBar6: Task = { dayId: 0, todos: [] };
  taskBar7: Task = { dayId: 0, todos: [] };

  todoItem: Todo = new Todo();

  days: ElementRef<HTMLDivElement>[] = [];
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  taskBars: Task[] = [];

  d = new Date();
  currentDayIndex = this.d.getDay();
  currentDayNumber = this.d.getDate();
  currentDay = this.d.getTime();

  ONE_DAY = 24 * 60 * 60 * 1000

  constructor(private todoService: TodoService,private router:Router) {

    this.todoService.getTask(0).subscribe((data: any) => {
      if (data.isSuccessfull) {
        if (data.data) {
          this.taskBar = data.data;
        }


      }
    }, err => {
      this.router.navigate(['login']);
    }, () => {

    });

    let gapTime = this.firstAndLastDaysOfWeek(new Date());

    this.todoService.getTasks(gapTime.gte, gapTime.lte).subscribe((data: any) => {

      if (data.isSuccessfull) {
        if (data.data) {
          this.Tasks = data.data;
        }

      }
    }, err => {
      this.router.navigate(['login']);
    }, () => {
      this.init();
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.days = [this.dayElement0, this.dayElement1, this.dayElement2, this.dayElement3, this.dayElement4, this.dayElement5, this.dayElement6];
    this.taskBars = [this.taskBar1, this.taskBar2, this.taskBar3, this.taskBar4, this.taskBar5, this.taskBar6, this.taskBar7, this.taskBar];
  }

  addTodo() {
    this.todoItem.id = uuid();
    this.todoItem.isDone = false;
    this.taskBar.todos.push(this.todoItem);

    this.todoService.addOrUpdateTask(this.taskBar).subscribe((data)=>{},err=>{
      this.router.navigate(['login']);
    });
    this.todoItem = new Todo();

  }


  drop(event: CdkDragDrop<Todo[]>, task: Task) {

    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);

      let previousTask = this.detectTask(event.previousContainer.id);
      this.todoService.addOrUpdateTask(previousTask).subscribe((data)=>{
      },err=>{
        this.router.navigate(['login']);
      });

      this.todoService.addOrUpdateTask(task).subscribe((data)=>{
      },err=>{
        this.router.navigate(['login']);
      });
      
    }

  }


  init() {
    this.d.setDate(this.d.getDate() - this.currentDayIndex);
    for (let index = 0; index <= 6; index++) {
      const dayNum = this.d.getDate();
      const dayItem = this.days[index];

      dayItem.nativeElement.classList.remove('current-day');

      if (this.currentDay == this.d.getTime()) {
        dayItem.nativeElement.classList.add('current-day');
      }

      this.taskBars[index].dayId = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate()).getTime();

      this.Tasks.forEach(task => {
        if (task.dayId == new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate()).getTime()) {
          this.taskBars[index].todos = task.todos;
        }

      });

      if (index == 3) {
        this.yearElement.nativeElement.innerText = this.d.getFullYear().toString();
        this.monthElement.nativeElement.innerText = this.months[this.d.getMonth()];
      }

      dayItem.nativeElement.innerText = dayNum.toString();
      this.d.setDate(this.d.getDate() + 1);//günü bir gün arttır                            
    }

  }

  async nextWeek() {
    if (await this.clearTodoBars()) {
      //d.setDate(d.getDate() + 7);
      let gapTime = this.firstAndLastDaysOfWeek(new Date(this.d.getTime()));
      this.todoService.getTasks(gapTime.gte, gapTime.lte).subscribe((data: any) => {
        if (data.isSuccessfull) {
          this.Tasks = [];
          if (data.data) {
            this.Tasks = data.data;
          }

        }

      }, err => {
        this.router.navigate(['login']);
      }, () => {
        for (let index = 0; index < 7; index++) {

          const dayNum = this.d.getDate();
          const dayItem = this.days[index];

          dayItem.nativeElement.classList.remove('current-day');

          if (this.currentDay == this.d.getTime()) {
            dayItem.nativeElement.classList.add('current-day');
          }

          this.taskBars[index].dayId = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate()).getTime();

          this.Tasks.forEach(task => {
            if (task.dayId == this.taskBars[index].dayId) {
              this.taskBars[index].todos = task.todos;
            }
          });


          if (index == 3) {
            this.yearElement.nativeElement.innerText = this.d.getFullYear().toString();
            this.monthElement.nativeElement.innerText = this.months[this.d.getMonth()];
          }

          dayItem.nativeElement.innerText = dayNum.toString();
          this.d.setDate(this.d.getDate() + 1);//günü bir gün arttır
        }
      });


    }
  }

  async prevWeek() {
    if (await this.clearTodoBars()) {
      this.d = new Date(this.d.getTime() - 14 * this.ONE_DAY);

      let gapTime = this.firstAndLastDaysOfWeek(new Date(this.d.getTime()));
      this.todoService.getTasks(gapTime.gte, gapTime.lte).subscribe((data: any) => {
        if (data.isSuccessfull) {
          this.Tasks = [];
          if (data.data) {
            this.Tasks = data.data;
          }

        }

      }, err => {
        this.router.navigate(['login']);
      }, () => {
        for (let index = 0; index < 7; index++) {

          const dayNum = this.d.getDate();
          const dayItem = this.days[index];

          dayItem.nativeElement.classList.remove('current-day');

          if (this.currentDay == this.d.getTime()) {
            dayItem.nativeElement.classList.add('current-day');
          }

          this.taskBars[index].dayId = new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate()).getTime();

          this.Tasks.forEach(task => {

            if (task.dayId == new Date(this.d.getFullYear(), this.d.getMonth(), this.d.getDate()).getTime()) {
              this.taskBars[index].todos = task.todos;
            } else if (task.dayId == 0) {
              this.taskBars[7].todos = task.todos;
            }
          });

          if (index == 3) {
            this.yearElement.nativeElement.innerText = this.d.getFullYear().toString();
            this.monthElement.nativeElement.innerText = this.months[this.d.getMonth()];
          }

          dayItem.nativeElement.innerText = dayNum.toString();
          this.d.setDate(this.d.getDate() + 1);//günü bir gün arttır
        }
      });
    }
  }

  clearTodoBars(): Promise<Boolean> {
    return new Promise<Boolean>(resolve => {
      this.taskBars.forEach(element => {
        if (element.dayId != 0) {
          element.todos = [];
        }
      });

      resolve(true);
    });
  }

  deleteTodo(todo: Todo, task: Task) {
    const todoindex: number = task.todos.indexOf(todo);
    if (todoindex !== -1) {
      task.todos.splice(todoindex, 1);
      this.todoService.addOrUpdateTask(task).subscribe();
    }
  }

  firstAndLastDaysOfWeek(ourD: Date): any {

    let ourDay = ourD.getDay();
    ourD.setDate(ourD.getDate() - ourDay);
    let maxDate = 0;
    let minDate = 0;

    minDate = new Date(ourD.getFullYear(), ourD.getMonth(), ourD.getDate()).getTime();

    for (let index = 0; index <= 6; index++) {
      if (ourD.getTime() > minDate) {
        maxDate = new Date(ourD.getFullYear(), ourD.getMonth(), ourD.getDate()).getTime();
      }

      ourD = new Date(ourD.getTime() + this.ONE_DAY);
    }

    return { gte: minDate, lte: maxDate };

  }

  detectTask(containerId: string): Task {
    switch (containerId) {
      case 'cdk-drop-list-0':
        return this.taskBar;
        break;
      case 'cdk-drop-list-1':
        return this.taskBar1;
        break;
      case 'cdk-drop-list-2':
        return this.taskBar2;
        break;
      case 'cdk-drop-list-3':
        return this.taskBar3;
        break;
      case 'cdk-drop-list-4':
        return this.taskBar4;
        break;
      case 'cdk-drop-list-5':
        return this.taskBar5;
        break;
      case 'cdk-drop-list-6':
        return this.taskBar6;
        break;
      case 'cdk-drop-list-7':
        return this.taskBar7;
        break;
    }

  }

  checkBoxChange(task: Task, todo: Todo) {
    this.todoService.addOrUpdateTask(task).subscribe((data)=>{
    },err=>{
      this.router.navigate(['login']);
    });
  }

  edit(taskBar: Task, todo: Todo) {

    this.editComponent.todo = todo;
    this.editComponent.task = taskBar;
    this.editComponent.open();

  }

}




