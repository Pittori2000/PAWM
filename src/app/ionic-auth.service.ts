import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})

export class IonicAuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private toastController : ToastController
  ) { }  

  createUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => {
            this.openToast('success', 'Utente creato.');
            resolve(res);
          },
          err => {
            reject(err);
            if(err.code=='auth/email-already-in-use')
              this.openToast('danger', 'Email non disponibile. Inseriscine un\'altra.');
          }
        );
    });
  }

  signinUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
      .then(
        (ris) => resolve(this.openToast('success', 'Login effettuato.')),
        (err) => {
          reject(err);
          this.switchSignInUserError(err);
            //eccezione per gestione troppi tentativi
        } 
      );
    }
    );
    }

  signoutUser() {
    return new Promise<void>((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            console.log("Sign out");
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  userDetails() {
    return this.angularFireAuth.user
  }

  PasswordRecover(passwordResetEmail) {
    return this.angularFireAuth.sendPasswordResetEmail(passwordResetEmail)
    .then(() => {
      window.alert('Email per il Reset della Password inviata, controllare la posta.');
    }).catch((error) => {
      
      if(error.code=='auth/user-not-found')
        this.openToast("danger", "Utente inesistente")
    })
  }

  
  private switchSignInUserError(err: any) {
    if(err.code=='auth/user-not-found')
      this.openToast('danger', 'Utente inesistente.');
    if(err.code=='auth/wrong-password')
      this.openToast('danger', 'Crredenziali errate.');
  }

  async openToast(colore: string, messaggio: string) {  
    const toast = await this.toastController.create({  
      color: colore,
      message: messaggio,   
      duration: 4000  
    });  
    toast.present();  
  }  

}