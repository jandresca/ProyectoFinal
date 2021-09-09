import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  nameUser: any = '';
  
  constructor(public _userService: UserService) {
    this.nameUser=localStorage.getItem('user');
  }

  ngOnInit(): void {
  }

  name () {
    
  }
}
