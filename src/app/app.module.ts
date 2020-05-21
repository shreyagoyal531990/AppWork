import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFirestoreModule,
    // ReactiveFormsModule ,
    // FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA7n7GYvzOUj5ry9F1LrJwrGpWrE5pnqvo",
      authDomain: "apptunix-801eb.firebaseapp.com",
      databaseURL: "https://apptunix-801eb.firebaseio.com",
      projectId: "apptunix-801eb",
      storageBucket: "apptunix-801eb.appspot.com",
      messagingSenderId: "886475794199",
      appId: "1:886475794199:web:168ce243f58853b16c7952",
      measurementId: "G-XDN337TQY8"
    }),
   
    AngularFireAuthModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
