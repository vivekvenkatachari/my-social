import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendGraphComponent } from './friend-graph.component';
import { AppModule } from '../app.module';
import {UserService} from '../service/user.service';
import {of} from 'rxjs';
import {User} from '../models/user';
import {Router} from '@angular/router';

describe('FriendGraphComponent', () => {
  let component: FriendGraphComponent;
  let fixture: ComponentFixture<FriendGraphComponent>;
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
    fixture = TestBed.createComponent(FriendGraphComponent);
    userService = TestBed.get(UserService);
    spyOn(userService, 'getUsers').and.returnValue(of([
      new User({name: 'Vivek', friends: [2], id: 1}),
      new User({name: 'Venkatachari', friends: [1], id: 2})
    ]));
    spyOn(userService, 'getSharedData').and.returnValue(of([
      new User({name: 'Vivek', friends: [2], id: 1}),
      new User({name: 'Venkatachari', friends: [1], id: 2})
    ]));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get Users by Default', () => {
    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.nodes.length).toBe(2);
    expect(component.links.length).toBe(1);
  });

  it('should get shared data when in dashboard', () => {
    const router = TestBed.get(Router);
    router.url = '/dashboard';
    component.ngOnInit();
    expect(userService.getSharedData).toHaveBeenCalled();
    expect(component.nodes.length).toBe(2);
    expect(component.links.length).toBe(1);
  });
});
