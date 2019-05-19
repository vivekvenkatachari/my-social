import { Injectable} from '@angular/core';
import { User} from '../models/user';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users: Array<User> = [];
  private userNames: Array<string> = [];
  private sharedSubject = new BehaviorSubject([]);

  constructor() {
  }

  addUser(user): Observable<any> {
    return Observable.create((observer) => {
      if (this.userNames.indexOf(user.name.toUpperCase()) > -1) {
        observer.error('duplicate');
        return false;
      }
      user.id = this.userNames.length + 1;
      this.users.push(user);
      this.updateFriendMap(user.friends, user.id);
      this.userNames.push(user.name.toUpperCase());
      observer.next(user);
      observer.complete();
    });
  }

  private updateFriendMap(friends, newId) {
    this.users.forEach((user) => {
      if (friends && friends.indexOf(user.id) > -1) {
        user.friends.push(newId);
      }
    });
  }

  getSharedData() {
    return this.sharedSubject.asObservable();
  }

  notifyMyPartner(data) {
    this.sharedSubject.next(data);
  }

  getUserName(id) {
    return this.userNames[id - 1];
  }

  getUserNames() {
    return this.userNames;
  }

  getUsers() {
    return of(this.users);
  }
}
