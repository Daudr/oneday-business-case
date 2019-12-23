import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  getUser(userID: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${userID}`);
  }

  saveUser(user: User) {
    if (user.id) {
      return this.http.put(`${this.baseUrl}/users/${user.id}`, user);
    } else {
      user.id = this.generateRandomID();
      return this.http.post(`${this.baseUrl}/users`, user);
    }
  }

  deleteUser(userID: string) {
    return this.http.delete(`${this.baseUrl}/users/${userID}`);
  }

  autocomplete(filter: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?q=${filter}`);
  }

  private generateRandomID() {
    return Math.random()
      .toString(36)
      .substr(2, 9);
  }
}
