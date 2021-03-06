import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Utente } from './utente';

@Injectable({
  providedIn: 'root'
})
export class UtenteService {


  private url!: string;

  constructor(private client: HttpClient) { 
    this.url = 'http://localhost:8080/'
  }

  public registra(ut: Utente) {
    this.client.put<Utente>(this.url + 'registrazione', ut).subscribe(ris => {
    });
  }
}
