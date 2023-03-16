import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiServerUrl=environment.apiBaseUrl;

  addUtilURL : string;
  updateUtilUrl : string;
  constructor(private http : HttpClient) {

    this.addUtilURL = 'http://localhost:8080/user/add';
    this.updateUtilUrl = 'http://localhost:8080/user/updateUser';

   }

   addUser(user : User): Observable<User> {
     return this.http.post<User>(this.addUtilURL,user);
   }

   getAllUser(): Observable<User[]>{
     return this.http.get<User[]>(`${this.apiServerUrl}/user/all`);
   }

  updateUser(user :User) : Observable<User>{
     return this.http.put<User>(this.updateUtilUrl,user);
  }

  deleteUser(userID : string) : Observable<User> {
     return this.http.delete<User>(`${this.apiServerUrl}/user/delete/${userID}`);
   }


}
