import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  routeState: any;

  constructor(private router: Router) { 
    console.log(JSON.parse(localStorage.getItem('myData')))
  
  }

  ngOnInit(): void {
  }
}
