import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeserviceService {
  url:string="http://localhost:3006/data";
  coreUrl:string="https://localhost:44353/api/Users";
  constructor(private _http:HttpClient) { }

  GetUsers(): Observable<Employee[]> {
    return this._http
      .get<Employee[]>(this.coreUrl)
      .pipe(catchError(this.errorHandler));
  }

  // CreateUser(employee: any) {
  //   const mData = JSON.stringify(employee);
  //   this._http.post(this.url, employee);
  // }

  createUser(employee: any): Observable<any> {
    //const mData = JSON.stringify(employee);
    return this._http.post(this.coreUrl, employee).pipe(catchError(this.errorHandler));
  }

  deleteUser(id: number): Observable<unknown> {
    const url = `${this.coreUrl}/${id}`;
    return this._http.delete(url).pipe(catchError(this.errorHandler));
  }

  updateUser(id:number,emp:Employee){
    console.log(emp);
    const url = `${this.coreUrl}/${id}`;
    this._http.put(url, emp).subscribe();
  }

  getUser(id: any): Observable<Employee> {
    const url = `${this.coreUrl}/${id}`;
    return this._http
      .get<Employee>(url)
      .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server error');
  }
}
