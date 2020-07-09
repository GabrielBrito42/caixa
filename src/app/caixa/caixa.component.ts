import { Component, OnInit } from '@angular/core';
import { ContaService } from './shared/conta.service';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { ContaDataService } from './shared/conta-data.service';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { Chave } from './shared/chave';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Component({
  selector: 'app-caixa',
  templateUrl: './caixa.component.html',
  styleUrls: ['./caixa.component.css']
})
export class CaixaComponent implements OnInit { 
	contas: Observable<any>
	usuario: Observable<any>
	email: string
  nome: Observable<any>;
  chave: string

  constructor(private contaService: ContaService, private db: AngularFireDatabase) {
    this.email = this.contaService.getEmail()
  }	

  ngOnInit(): void {
  	this.usuario = this.db.list('/conta', ref =>
  		ref.orderByChild('email').equalTo(this.email)
  	).snapshotChanges().pipe(map(actions => 
  		actions.map(action => {
  		const key = action.payload.key;
  		this.contaService.setKey(action.payload.key);
  		return {key}
   		})
  	));
    this.usuario.subscribe();
  }

}