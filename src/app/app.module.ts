import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { PerfilComponent } from './component/perfil/perfil.component';
import { PerfilSocioComponent } from './component/perfil-socio/perfil-socio.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { UsuariosComponent } from './component/usuarios/usuarios.component';
import { ProyectosComponent } from './component/proyectos/proyectos.component';
import { PublicidadComponent } from './component/publicidad/publicidad.component';
import { VideoComponent } from './component/video/video.component';
import { BannerComponent } from './component/banner/banner.component';
import { MenbresiasComponent } from './component/menbresias/menbresias.component';
import { SocioComponent } from './component/socio/socio.component';
import { AreasComponent } from './component/areas/areas.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

// Carga de imagenes
import { ImageCropperModule } from 'ngx-image-cropper';

import { environment } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';

// Guard
import { AuthguardGuard } from './guards/authguard.guard';

const AppRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthguardGuard]},
  {path: 'login', component: LoginComponent, },
  {path: 'usuarios', component: UsuariosComponent, canActivate: [AuthguardGuard]},
  {path: 'publicidad', component: PublicidadComponent, canActivate: [AuthguardGuard]},
  {path: 'proyectos', component: ProyectosComponent, canActivate: [AuthguardGuard]},
  {path: 'video', component: VideoComponent, canActivate: [AuthguardGuard]},
  {path: 'banner', component: BannerComponent, canActivate: [AuthguardGuard]},
  {path: 'membresias', component: MenbresiasComponent, canActivate: [AuthguardGuard]},
  {path: 'socios', component: SocioComponent, canActivate: [AuthguardGuard]},
  {path: 'perfil/:uid', component: PerfilComponent, canActivate: [AuthguardGuard]},
  {path: 'areas', component: AreasComponent, canActivate: [AuthguardGuard]},
  {path: 'perfil-socio/:uid', component: PerfilSocioComponent, canActivate: [AuthguardGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UsuariosComponent,
    FooterComponent,
    ProyectosComponent,
    PublicidadComponent,
    VideoComponent,
    BannerComponent,
    MenbresiasComponent,
    SocioComponent,
    HeaderComponent,
    PerfilComponent,
    AreasComponent,
    PerfilSocioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot( AppRoutes ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FormsModule,
    AngularFireMessagingModule,
    ImageCropperModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
