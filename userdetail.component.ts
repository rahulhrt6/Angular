import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeserviceService } from 'src/app/service/employeeservice.service';

@Component({
  selector: 'app-userdetail',
  templateUrl: './userdetail.component.html',
  styleUrls: ['./userdetail.component.css']
})
export class UserdetailComponent implements OnInit {

  user:Employee=new Employee();
  id:number=0;
  constructor(private _route:ActivatedRoute,
    private _userService:EmployeeserviceService,
    private _navigate:Router) { }

  ngOnInit(): void {
    //this.id = +this._route.snapshot.params['id'];
    this._route.paramMap.subscribe(param=>{
      let number1 = param.get('id');

      if (number1 !== null) {
        this.id = +number1;
      }
      this._userService.getUser(this.id).subscribe(data=>this.user=data);
    })
    
  }

  back(){
    this._navigate.navigate(['/list']);
  }

  next(){
    this.id = this.id + 1;
    this._navigate.navigate(['/user', this.id]);
  }

}
