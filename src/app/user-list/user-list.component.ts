import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {UserService} from '../service/user.service';
import {User} from '../models/user';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['name', 'age', 'weight', 'friends'];
  dataSource: MatTableDataSource<User>;
  subscription: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.subscription = this.userService.getUsers().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      if (this.router.url === '/dashboard') {
        this.notifyMyPartner(this.dataSource.data);
      }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
    this.notifyMyPartner(this.dataSource.filteredData);
  }

  getFriendsName(id) {
    return this.userService.getUserName(id);
  }

  private notifyMyPartner(data) {
    if (this.router.url === '/dashboard') {
      this.userService.notifyMyPartner(data);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }



}
