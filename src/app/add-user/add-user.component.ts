import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../models/user';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';
import {from, Observable, Subscription} from 'rxjs';
import {mergeAll} from 'rxjs/operators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  friendsList: Observable<Array<User>>;
  subscription: Subscription;
  duplicateUser: boolean;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  /**
   * This function sets all init values required for the form
   * If a user object is passed, it will be used as a edit form
   * This way we keep the code reusable for add and edit
   */
  createForm(user?: User) {
    this.formGroup = this.formBuilder.group({
      name: [null, Validators.required],
      age: [1, Validators.min(1)],
      weight: [0.1, Validators.min(0.1)],
      friends: [[]]

    });
    if (user) {
      this.formGroup.setValue(user);
    }
    this.friendsList = this.userService.getUsers();
  }


  createUser() {
    this.duplicateUser = false;
    const user = new User(this.formGroup.value);
    // for edit screen need to handle this, duplicate is not necessary if it is same
    // name record. Though name if edited have to be checked. We are assuming here that name has
    // to be unique
    if (this.checkDuplicateName(user.name)) {
      this.duplicateUser = true;
      return false;
    }
    this.subscription = this.userService.addUser(user).subscribe( () => {
      this.createForm();
      this.router.navigateByUrl('/dashboard');
    }, (err) => {
      if (err === 'duplicate') {
        // Ideally this will be a backend handled error, we could hook on to validation
        // framework to handle this
        console.warn('Duplicate name');
        return false;
      }
    });
  }


  checkDuplicateName(name) {
    return this.userService.getUserNames().indexOf(name.toUpperCase()) > -1 ? 'duplicate' : null;
  }

  // For testing quickly
  addDefaultUsers() {
    const observableArray = [];
    observableArray.push(this.userService.addUser(new User({name: 'John Smith', age: 10, weight: 45, friends: []})));
    observableArray.push(this.userService.addUser(new User({name: 'Joseph Smith', age: 11, weight: 47, friends: [1]})));
    observableArray.push(this.userService.addUser(new User({name: 'Vivek Venkatachari', age: 9, weight: 35, friends: [1, 2]})));
    observableArray.push(this.userService.addUser(new User({name: 'Lauren MacDowell', age: 12, weight: 50, friends: [3]})));
    from(observableArray).pipe(mergeAll()).subscribe(res => {
      this.router.navigateByUrl('/dashboard');
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


}
