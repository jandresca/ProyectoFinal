import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-headertres',
  templateUrl: './headertres.component.html',
  styleUrls: ['./headertres.component.css']
})
export class HeadertresComponent implements OnInit {
  nameUser: any = localStorage.getItem('user');
  constructor(public _userService: UserService) { }

  ngOnInit(): void {
    this.nameUser = localStorage.getItem('user');
  }

}
