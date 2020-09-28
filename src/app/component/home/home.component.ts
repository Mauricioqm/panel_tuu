import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  titulo: string;
  texto: string;

  constructor
  (
    private http: HttpClient,
  ) { }

  ngOnInit() {
  }

  enviar() {
    let header: HttpHeaders = new HttpHeaders();
    // tslint:disable-next-line:max-line-length
    header = header.set('Authorization', 'key=AAAA4HoZqC0:APA91bHPlRg_Nc9g4aoF2znQFykLVYrxaCV41uk0iEKtKHofEb2kjMhwIGbvFmmNkltpOpPhvg7Gvcb_T_CJr6HoVdRSaPd4sdRbtyL2DrYlFSdBNObYx8KsP_MehnmsMf_uqGvaaWVU'); 
    header = header.append('Content-Type', 'application/json');
    const body = {
      to: '/topics/todos',
      priority: 'high',
      notification: {
        title: this.titulo,
        body: this.texto,
        click_action: 'FCM_PLUGIN_ACTIVITY',
        sound: 'default',
        forceStart: '1',
      },
    };
    const URL = 'https://fcm.googleapis.com/fcm/send';
    this.http.post(URL, body, { headers: header }).subscribe(data => {
      console.log(data);
    });
  }

}
