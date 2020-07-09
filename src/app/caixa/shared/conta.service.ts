import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { Contato } from './contato';
import { auth } from 'firebase/app';
import { map, catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ContaService {
  constructor(private db: AngularFireDatabase, private fire: AngularFireAuth) { }

  key: string;
  email: string;
  valor: string;

  setValor(valor: string){
    this.valor = valor
  }

  getValor(){
    return this.valor;
  }

  setEmail(email: string){
    this.email = email;
  }

  setKey(key: string){
    this.key = key;
  }

  getKey(){
    return this.key;
  }

  alterar(key: string, notas: number){
    this.db.object('/conta/' + key)
      .update({dinheiro: notas})
  }

  getEmail(){
    return this.email;
  }

  registro(conta: Contato){
    this.fire.createUserWithEmailAndPassword(conta.email, conta.senha).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
    })
  }

  login(conta: Contato){
    this.fire.signInWithEmailAndPassword(conta.email, conta.senha)
  }

  insert(conta: Contato){
  	this.db.list('conta').push(conta)
  		.then((result: any) => {
  			
  		});
  }

  atualizar(conta: Contato, key: string) {
    this.db.list('conta').update(key, conta)
      .catch((error: any) => {
        console.error(error);
      });
  }

}