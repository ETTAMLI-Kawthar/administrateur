import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms'
import { User } from 'src/app/model/User';
import { UserService } from 'src/app/service/admin.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  utilDetail !: FormGroup;
  utilObj : User = new User();
  utilList : User[] = [];

  constructor(private formBuilder : FormBuilder, private utilService : UserService) { }

  ngOnInit(): void {

    this.getAllUser();

    this.utilDetail = this.formBuilder.group({
      idUser : [''],
      firstNameUser : [''],
      lastNameUser : [''],
      emailUser: [''],
      passwordUser: ['']
    });

  }

  addUser() {
    console.log(this.utilDetail);
    this.utilObj.idUser = this.utilDetail.value.idUser;
    this.utilObj.firstNameUser = this.utilDetail.value.firstNameUser;
    this.utilObj.lastNameUser = this.utilDetail.value.lastNameUser;
    this.utilObj.emailUser = this.utilDetail.value.emailUser;
    this.utilObj.passwordUser = this.utilDetail.value.passwordUser;

    this.utilService.addUser(this.utilObj).subscribe(res=>{
        console.log(res);
        this.getAllUser();
    },err=>{
        console.log(err);
    });

  }

  getAllUser() {
    this.utilService.getAllUser().subscribe(res=>{
        this.utilList = res;
    },err=>{
      console.log("error while fetching data.")
    });
  }

  editUser(user : User) {
    this.utilDetail.controls['idUser'].setValue(user.idUser);
    this.utilDetail.controls['firstNameUser'].setValue(user.firstNameUser);
    this.utilDetail.controls['lastNameUser'].setValue(user.lastNameUser);
    this.utilDetail.controls['emailUser'].setValue(user.emailUser);
    this.utilDetail.controls['passwordUser'].setValue(user.passwordUser);

  }

  updateUser() {
    this.utilObj.idUser = this.utilDetail.value.idUser;
    this.utilObj.firstNameUser= this.utilDetail.value.firstNameUser;
    this.utilObj.lastNameUser = this.utilDetail.value.lastNameUser;
    this.utilObj.emailUser = this.utilDetail.value.emailUser;
    this.utilObj.passwordUser = this.utilDetail.value.passwordUser;
    this.utilService.updateUser(this.utilObj).subscribe(res=>{
      console.log(res);
      this.getAllUser();
    },err=>{
      console.log(err);
    })

  }

  deleteUser(userId : string) {

    this.utilService.deleteUser(userId).subscribe(res=>{
      console.log(res);
      alert('User deleted successfully');
      this.getAllUser();
    },err => {
      console.log(err);
    });

  }

}
