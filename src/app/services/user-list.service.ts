import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { usersList, CountriesList } from '../data/data';

@Injectable({
  providedIn: 'root'
})
export class UserListService {

  constructor(private http: HttpClient) { }

  getAllUsers() {
    //return  this.http.get('Api url here')
    return usersList;
  }

  getAllCountriesList() {
    return CountriesList;
  }



}
