import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatCheckboxModule,MatListModule, MatIconModule, MatButtonModule } from '@angular/material';
import { CalendarComponent } from './components/calendar/calendar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './components/register/register.component';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './services/auth.interceptor';
import { EditTodoComponent } from './components/edit-todo/edit-todo.component';

export function tokenGetter() {
  return localStorage.getItem('token');
}


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CalendarComponent,
    LoginComponent,
    RegisterComponent,
    EditTodoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    FormsModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatListModule,
    DragDropModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
