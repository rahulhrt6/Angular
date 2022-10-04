import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { DisplayUserComponent } from './users/display-user/display-user.component';
import { CreateuserComponent } from './users/createuser/createuser.component';

import { RouterModule , Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialExampleModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserdetailComponent } from './users/userdetail/userdetail.component';
import { UserFilter } from './users/user-filter-pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { NotfoundComponent } from './notfound/notfound.component';
import { RequestInterceptor } from './request.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EmployeeserviceService } from './service/employeeservice.service';

const appRoute: Routes=[
  {path:'list',component:UserListComponent},
  {path:'edit/:id',component:CreateuserComponent},
  {path:'user/:id',component:UserdetailComponent},
  {path:'',redirectTo:'/list', pathMatch:'full'},
  {path:'**',component:NotfoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    DisplayUserComponent,
    CreateuserComponent,
    UserdetailComponent,
    UserFilter
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    MatCardModule
  ],
  providers: [
    {
provide:'EmployeeserviceService',
useValue:EmployeeserviceService,
    },
    
    {
    provide:HTTP_INTERCEPTORS,
    useClass:RequestInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
