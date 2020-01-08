import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UsersResponse, Pagination } from '@models';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = `http://localhost:3000`;

  constructor(private http: HttpClient) {}

  getUsers(page = 1): Observable<UsersResponse> {
    return this.http
      .get<User[]>(`${this.baseUrl}/users?_page=${page}`, { observe: 'response' })
      .pipe(
        map((res: HttpResponse<User[]>) => {
          return { users: res.body, pagination: this.getPaginationObject(res.headers.get('Link')) };
        }),
        tap(console.log),
      );
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

  private getPaginationObject(paginationHeader: string) {
    const links = paginationHeader.split(',');
    const pagination: Pagination = {} as any;
    links.forEach((link: string) => {
      let rel = link.split('rel=')[1];
      rel = rel.replace(/"/g, '');
      const page = link.split('_page=')[1].split('>')[0];

      pagination[rel] = page;
    });

    return pagination;
  }
}
