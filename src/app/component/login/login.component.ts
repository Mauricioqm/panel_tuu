import { Component, OnInit } from '@angular/core';
import { AuthenticacionService } from '../../services/authenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = null;
  password: string = null;

  constructor
  (
    private authenticationService: AuthenticacionService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password).then((data) => {
      alert('Logeado correctamente');
      console.log(data);
      this.router.navigateByUrl('/home');
    }).catch((error) => {
      console.log(error);
    });

  }

}
