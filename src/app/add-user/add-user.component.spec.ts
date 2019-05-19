import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {of} from 'rxjs';

import { AddUserComponent } from './add-user.component';
import { UserService } from '../service/user.service';
import { User } from '../models/user';
import { AppModule } from '../app.module';


describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [UserService],
      imports: [
        AppModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    userService = TestBed.get(UserService);
    spyOn(userService, 'getUsers').and.returnValue(of([new User()]));
    spyOn(userService, 'addUser').and.returnValue(of(new User()));
    spyOn(userService, 'getUserNames').and.returnValue(['VIVEK']);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate the friends list', () => {
    component.friendsList.subscribe(res => {
      expect(res.length).toBe(1);
    });
  });

  it('should be able edit user and save', () => {
    const userObject = new User({name: 'Monika', age: 31, weight: 130, friends: []});
    component.createForm(userObject);
    component.createUser();
    expect(userService.addUser).toHaveBeenCalledWith(userObject);
  });

  it('should be able check for duplicate name', () => {
    expect(component.checkDuplicateName('vivek')).toBeTruthy();
    expect(component.checkDuplicateName('venkatachari')).toBeFalsy();
    const userObject = new User({name: 'vivek', age: 31, weight: 130, friends: []});
    component.createForm(userObject);
    component.createUser();
    expect(component.duplicateUser).toBeTruthy();
  });
});
