import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeserviceService } from 'src/app/service/employeeservice.service';

@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css'],
})
export class CreateuserComponent implements OnInit {
  user: Employee = new Employee();
  id: number = 0;
  employees: any;
  error: string = '';
  isEdit: boolean = true;
  intId: number = 0;
  registerForm!: FormGroup;
  submitted = false;
  constructor(
    private _userService: EmployeeserviceService,
    private _route: Router,
    private _nav: ActivatedRoute,
    private formBuilder: FormBuilder,
    private _navigate: Router
  ) {}

  saveEmployee(): void {
    var id = this.user.id.toString();
    this.intId = +id;
    if (id === '0') {
      this.user.status="Active";
      this._userService
        .createUser(this.user)
        .subscribe((res) => console.log(res));
      this._route.navigate(['list']);
    } else {
      this._userService.updateUser(this.intId, this.user);
      this._route.navigate(['list']);
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this._nav.paramMap.subscribe((param) => {
      let number1 = param.get('id');

      if (number1 !== null) {
        this.id = +number1;
      }
      this.getEmployees(this.id);
    });

    if (this.id === 0) {
      this.isEdit = false;
    }
  }

  private getEmployees(id: number) {
    if (id === 0) {
      this.user = new Employee();
    } else {
      var data = this._userService.getUser(id).subscribe((object: any) => {
        this.user = object;
      });
    }
  }

  back() {
    this._navigate.navigate(['/list']);
  }
}
