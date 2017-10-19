import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../database/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase'

/*
  Generated class for the CallBooksProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CallBooksProvider {

  user:Observable<firebase.User>
  books = []
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public db:DatabaseProvider,
    public authFB:AngularFireAuth,
    public http?:Http
  ) {
    this.user = authFB.authState;
    this.user.subscribe(user=>{
      this.db.getBooksInTheUser(user.uid).subscribe(books=>{
        this.books = books
        console.log(books);
      })
    })
  }

}