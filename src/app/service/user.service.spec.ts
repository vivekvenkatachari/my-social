import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { User } from '../models/user';
import { skip } from 'rxjs/operators';

describe('UserService', () => {

  it('should be created', () => {
    const service = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('should add users and update friend relation', () => {
    const service = TestBed.get(UserService);
    // Adding first user with no friend
    service.addUser(new User({name: 'Vivek', friends: []})).subscribe(() => {
      expect(service.getUserNames().length).toBe(1);
    });
    // Adding second user with user1 as friend
    service.addUser(new User({name: 'Venkatachari', friends: [1]})).subscribe(() => {
      expect(service.getUserNames().length).toBe(2);
    });
    spyOn(service, 'addUser').and.callThrough();
    service.getUsers().subscribe(res => {
      expect(res[0].friends.length).toBe(1);
      // check if the username array is updated too
      expect(service.getUserName(1)).toBe('VIVEK');
      expect(service.getUserName(2)).toBe('VENKATACHARI');
    });
    spyOn(service, 'getUsers').and.callThrough();

  });

  it('should error for duplicate on same name', () => {
    const service = TestBed.get(UserService);
    service.addUser(new User({name: 'Vivek', friends: []})).subscribe(() => {
      expect(service.getUserNames().length).toBe(1);
    });
    // Adding second user with user1 as friend
    service.addUser(new User({name: 'Vivek', friends: [1]})).subscribe(() => {

    }, error => {
      console.log(error);
      expect(service.getUserNames().length).toBe(1);
    });
    spyOn(service, 'addUser').and.callThrough();
  });

  it('should be able to notify partner', () => {
    const service = TestBed.get(UserService);
    service.getSharedData().pipe(skip(1)).subscribe(res => {
      expect(res.name).toBe('Vivek');
    });
    service.notifyMyPartner(new User({name: 'Vivek'}));

  });


});
