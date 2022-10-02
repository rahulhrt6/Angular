import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employee.model';
import { EmployeeserviceService } from 'src/app/service/employeeservice.service';
import { UserFilter } from '../user-filter-pipe';

@Component({
  selector: 'app-display-user',
  templateUrl: './display-user.component.html',
  styleUrls: ['./display-user.component.css'],
  providers:[
    UserFilter
  ]
})
export class DisplayUserComponent implements OnInit {

  @Input() employee: Employee[] = [];
  users: Employee[]=[];
  dataSource: any;
  page: number = 1;
  tableSize: number = 15;
  tableSizes: any = [10, 20, 50,100];
  count: number = 0;
  searchterm:string="";
  status : string = "";
  displayedColumns: string[] = [
    'username',
    'emailaddress',
    'phoneNumber',
    'socialConnection',
    'status',
    'action',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matsort!: MatSort;
  constructor(
    private _service: EmployeeserviceService,
    private _route: Router,
    private _pipe:UserFilter
  ) {}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.AllUsers();
  }

  FilterChange(event: Event) {
    const filter = (event.target as HTMLInputElement).value;
    // var data = this._pipe.transform(this.dataSource,filter);
    this.dataSource.filter = filter;
  }

  getRow(row: any) {}

  onTableDataChange(event: any) {
    this.page = event;
    this.AllUsers();
  }

  onTableSizeChange(event: any): void {
    this.tableSize = event.table.value;
    this.page = 1;
    this.AllUsers();
  }
  ngOnInit(): void {
    this.AllUsers();
    console.log(this.dataSource);
  }

  AllUsers() {
    this._service.GetUsers().subscribe((data) => {
      this.dataSource = data;
      this.users = data;
      
      if(this.status != "")
        this.users = this.users.filter(x => x.status?.toLocaleLowerCase() == this.status.toLocaleLowerCase());
      this.dataSource = new MatTableDataSource<Employee>(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.matsort;
    });
  }

  deleteUser(event: any) {
    let id=event['id'];
    this._service.deleteUser(id).subscribe(x=>{
      
      this.dataSource.filter =x;
      this.AllUsers();
    });
  }

  editUser(event: any) {
    let id=event['id'];
    this._route.navigate(['/edit', id]);
  }

  viewUser(event:any) {
    let id=event['id'];
    this._route.navigate(['/user', id]);
  }

  create(){
    this._route.navigateByUrl('/edit/0');
  }

  FilterActive(){
    this.status = "Active";
    this.AllUsers();
  }

  FilterInActive(){
    this.status = "InActive";
    this.AllUsers();
  }

  FilterBlocked(){
    this.status = "Blocked";
    this.AllUsers();
  }
}
