import { Component, OnInit } from '@angular/core';
import { JwtService } from '../services/jwt/jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = "";
  password = "";
  error = "";

  constructor(
    private jwtService: JwtService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  login() {
    this.jwtService.login(this.email, this.password)
      .subscribe(
        res => this.router.navigate(['contact-list']),
        err => this.error = 'Authentication Error'
      );
  }

}
