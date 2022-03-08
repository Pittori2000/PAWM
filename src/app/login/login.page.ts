import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { IonicAuthService } from '../ionic-auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  

  error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Email richiesta.' 
      },
      { 
        type: 'email', 
        message: 'Email non valida.' 
      }
    ],
    'password': [
      { 
        type: 'required', 
        message: 'Password richiesta.' 
      },
      { 
        type: 'minlength', 
        message: 'La Password deve contenere almeno 6 caratteri.' 
      }
    ]
  };

  constructor(
    private router: Router,
    private ionicAuthService: IonicAuthService,
    private fb: FormBuilder,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required
      ])),
    });
  }

  login(value) {
    this.ionicAuthService.signinUser(value)
      .then((response) => {
        this.errorMsg = "";
        //this.router.navigateByUrl('dashboard');
      }, error => {
        this.errorMsg = "Credenziali Errate";
        this.successMsg = "";
      })
  }

  goToRegistrazione() {
    this.router.navigateByUrl('registrazione');
  }

  resetPassword(email: string){
    this.ionicAuthService.PasswordRecover(email);
    this.openToast();
  }

  async openToast() {  
    const toast = await this.toastController.create({  
      color: "success",
      message: 'Email per il recupero della password Inviata',   
      duration: 4000  
    });  
    toast.present();  
  }  

}