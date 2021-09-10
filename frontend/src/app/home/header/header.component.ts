import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  nameUser: any = localStorage.getItem('user');

  constructor(public _userService: UserService) {}

  ngOnInit(): void {
    this.nameUser = localStorage.getItem('user');
    console.log(this.nameUser);
  }

  
}
