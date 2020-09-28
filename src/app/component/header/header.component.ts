import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor
  (
    private afAuth: AngularFireAuth,
    private router: Router,
  )
  {}

  ngOnInit() {
  }

  logout() {
    return new Promise((resolve, reject) => {
      if (this.afAuth.currentUser) {
        this.afAuth.signOut()
        .then(() => {
          console.log('LOG Out');
          resolve();
        }).catch((error) => {
          reject();
        });
        this.router.navigate(['/login']);
    }
  });
  }

}
