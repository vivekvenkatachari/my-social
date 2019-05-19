import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { UserListComponent } from './user-list.component';
import { AppModule } from '../app.module';
import { of } from 'rxjs';
import { User } from '../models/user';
import { UserService } from '../service/user.service';
import { Router } from '@angular/router';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: UserService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppModule
      ],
      providers: [
        {
          provide: Router,
          useValue: {
            url: '/path'
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    userService = TestBed.get(UserService);
    spyOn(userService, 'getUsers').and.returnValue(of([new User({name: 'Vivek', age: 10, weight: 10, friends: [1, 2]})]));
    spyOn(userService, 'notifyMyPartner').and.returnValue(1);
    spyOn(userService, 'getUserName').and.returnValue('VIVEK');
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on data table', () => {
    expect(component.dataSource.data.length).toBe(1);
  });

  it('should not notify Subject when it is not dashboard', () => {
    expect(userService.notifyMyPartner).not.toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it('should notify Subject when it is dashboard', () => {
    const router = TestBed.get(Router);
    router.url = '/dashboard';
    component.ngOnInit();
    expect(userService.notifyMyPartner).toHaveBeenCalled();
    expect(component).toBeTruthy();
  });

  it('should get the right friend name for passed id', () => {
    expect(component.getFriendsName(1)).toBe('VIVEK');
  });
});
