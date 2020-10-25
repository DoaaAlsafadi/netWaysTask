import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserListService } from '../services/user-list.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  @ViewChild('closeUpdateModal') closeUpdateModal: ElementRef;


  AddUserForm: FormGroup;
  users: any;
  countries: any;
  usersIndex: any;
  showAlertMessage: boolean = false
  errorMessages = {}
  countryName: String
  selectedUser: any;
  constructor(private userListService: UserListService) { }

  ngOnInit(): void {
    this.createUser();
    this.users = this.userListService.getAllUsers();
    this.countries = this.userListService.getAllCountriesList();
  }

  createUser() {
    this.AddUserForm = new FormGroup({
      userName: new FormControl("", Validators.required),
      dateOfBirth: new FormControl("", Validators.required),
      Address: new FormControl("", Validators.required),
      Salary: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      profilePicture: new FormControl("", Validators.required),
      isActive: new FormControl("", Validators.required),
    });
  }

  AddUser() {
    this.errorMessages = {}
    this.getFormValidations();
    if (Object.keys(this.errorMessages).length == 0) {
      this.users.push(this.AddUserForm.value);
      this.showAlertMessage = true
      this.closeDialog(this.closeModal)
    }
  }

  resetForm() {
    this.AddUserForm.reset();
  }

  getUserindex(i) {
    this.usersIndex = i
  }

  deleteUser() {
    this.users.splice(this.usersIndex, 1)
  }

  get formControls() {
    return this.AddUserForm.controls;
  }

  getFormValidations() {

    if (this.formControls.userName.errors) {
      this.errorMessages["userName"] = "User Name is required";
    }

    if (this.formControls.dateOfBirth.errors) {
      this.errorMessages["dateOfBirth"] = "Date of Birth is required";
    }

    if (this.formControls.Address.errors) {
      this.errorMessages["Address"] = "Address is required";
    }

    if (this.formControls.Salary.errors) {
      this.errorMessages["Salary"] = "Salary is required";
    }

    if (this.formControls.country.errors) {
      this.errorMessages["country"] = "country is required";
    }

    if (this.formControls.profilePicture.errors) {
      this.errorMessages["profilePicture"] = "profile Picture is required";
    }


  }

  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.AddUserForm.patchValue({
          profilePicture: (<FileReader>event.target).result
        })
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  updateUser(user) {
    console.log(user);
    this.selectedUser = user
    this.AddUserForm.patchValue({
      userName: user.userName,
      dateOfBirth: user.dateOfBirth,
      Address: user.Address,
      Salary: user.Salary,
      country: user.country,
      profilePicture: user.profilePicture,
      isActive: user.isActive
    });

  }

  EditUser() {
    this.errorMessages = {}
    this.getFormValidations();
    if (Object.keys(this.errorMessages).length == 0) {
      this.selectedUser.userName = this.AddUserForm.value.userName
      this.selectedUser.dateOfBirth = this.AddUserForm.value.dateOfBirth
      this.selectedUser.Address = this.AddUserForm.value.Address
      this.selectedUser.country = this.AddUserForm.value.country
      this.selectedUser.Salary = this.AddUserForm.value.Salary
      this.selectedUser.profilePicture = this.AddUserForm.value.profilePicture
      this.selectedUser.isActive = this.AddUserForm.value.isActive
      this.showAlertMessage = true
      this.closeDialog(this.closeUpdateModal)
    }
  }

  closeDialog(modelRef) {
    modelRef.nativeElement.click();
  }

}
