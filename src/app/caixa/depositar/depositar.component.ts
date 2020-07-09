import { Component, OnInit } from '@angular/core';
import { ContaService } from '../shared/conta.service';
import { FormGroup } from '@angular/forms';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-depositar',
  templateUrl: './depositar.component.html',
  styleUrls: ['./depositar.component.css']
})
export class DepositarComponent implements OnInit {
	notas: string;
	key: string;
  dinheiroTotal: number;
	valor: string;
  htmlToAdd;
  usuario: Observable<any>;

  constructor(private contaService: ContaService, private db: AngularFireDatabase) { }

  ngOnInit(): void {
  	this.key = this.contaService.getKey();
    this.usuario = this.db.object('/conta/' + this.key).valueChanges();
    this.usuario.subscribe(value => this.dinheiroTotal = value.dinheiro);
  }

  depositar(){
    this.dinheiroTotal += +this.notas
  	this.contaService.alterar(this.key, this.dinheiroTotal);
    this.notas = "";
    this.htmlToAdd = '<h2>Sua conta bancaria possui</h2>' + `${this.dinheiroTotal}`;
  }

  extrato(){
    this.htmlToAdd = '<h2>Sua conta bancaria possui</h2>' + `${this.dinheiroTotal}`;
  }
}
