import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { ContaService } from '../shared/conta.service';
import { map, catchError } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Contato } from '../shared/contato';

@Component({
  selector: 'app-sacar',
  templateUrl: './sacar.component.html',
  styleUrls: ['./sacar.component.css']
})
export class SacarComponent implements OnInit {
	key: string;
	notas: string;
	data: string;
	resultadoFinal: string="Voce sacou: ";
	conta: number;
	resto: number=0;
	total: number;
	auxiliar: number=1;
	alterar: number;
	htmlToAdd;
	botaoDois;
	botaoCinco;
	botaoDez;
	botaoVinte;
	botaoCinquenta;
	botaoCem;
	resultado;
	sem;
	usuario: Observable<any>;

  constructor(private db: AngularFireDatabase, private contaService: ContaService) { }

  ngOnInit(): void {
  	this.key = this.contaService.getKey();
  	this.usuario = this.db.object('/conta/' + this.key).valueChanges();
	this.usuario.subscribe(value => this.data = value.dinheiro);
  }


  sacar(){
  	if (+this.notas%2 == 0 || +this.notas%5 == 0) {
  		this.htmlToAdd = '<h2>Deseja alguma nota em especifico?</h2>';
  		this.sem = '<button (click)="nao()">SACAR</button>';
	  	this.botaoDois = '<button>2</button>';
	  	this.botaoCinco = '<button (click)="notasCinco()">5</button>';
	  	this.botaoDez = '<button (click)="notasDez()">10</button>';
	  	this.botaoVinte = '<button (click)="notasVinte()">20</button>';
	  	this.botaoCinquenta = '<button (click)="notasCinquenta()">50</button>';
	  	this.botaoCem = '<button (click)="notasCem()">100</button>';
  	} else {
  		this.htmlToAdd = '<h2>Insira um valor valido para saque</h2>';
  		this.sem = '';
	  	this.botaoDois = '';
	  	this.botaoCinco = '';
	  	this.botaoDez = '';
	  	this.botaoVinte = '';
	  	this.botaoCinquenta = '';
	  	this.botaoCem = '';
  	}
  }

  opcao(opcao: string){
  		this.auxiliar = +this.notas;
  		switch (opcao) {
  		case "dois":
  			this.cem(this.auxiliar, 2);
  			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de dois ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de dois ";
  			}
  			break;
  		case "cinco":
  			this.cem(this.auxiliar, 5);
  			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de cinco ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de cinco ";
  			}
  			break;
  		case "dez":
  			this.cem(this.auxiliar, 10);
  			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de dez ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de dez ";
  			}
  			break;
  		case "vinte":
  			this.cem(this.auxiliar, 20);
  			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de vinte ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de vinte ";
  			}
  			break;
  		case "cinquenta":
  			this.cem(this.auxiliar, 50);
  			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de cinquenta ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de cinquenta ";
  			}
  			break;
  		case "cem":
  			this.cem(this.auxiliar, 100);
  			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de cem ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de cem ";
  			}
  			break;
  		default:
  			break;
  	}
  	while(this.auxiliar!=0){
		if(this.auxiliar >= 50){
			this.cem(this.auxiliar, 50);
			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de cinquenta ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de cinquenta ";
  			}
		} else if (this.auxiliar >= 20 && this.auxiliar < 50) {
			this.cem(this.auxiliar, 20);
			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de vinte ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de vinte ";
  			}
		} else if(this.auxiliar >= 10 && this.auxiliar < 20){
			this.cem(this.auxiliar, 10);
			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de dez ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de dez ";
  			}
		} else if(this.auxiliar >= 5 && this.auxiliar < 10){
			this.cem(this.auxiliar, 5);
			if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de cinco ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de cinco ";
  			}
		}
	}
	this.resultado = this.resultadoFinal;
	this.alterar = +this.data;
	this.alterar = this.alterar - +this.notas;
	this.contaService.alterar(this.key, this.alterar);
  }

  nao(){
  	this.auxiliar = +this.notas;
  	while(this.auxiliar!=0){
	  	if(this.auxiliar >= 100){
	  		this.cem(this.auxiliar, 100);
	  		if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de cem ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de cem ";
  			}
	  	}else if(this.auxiliar >=50 && this.auxiliar < 100){
	  		this.cem(this.auxiliar, 50);
	  		if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de cinquenta ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de cinquenta ";
  			}
	  	}else if(this.auxiliar >=20 && this.auxiliar < 50){
	  		this.cem(this.auxiliar, 20);
	  		if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de vinte ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de vinte ";
  			}
	  	}else if(this.auxiliar >=10 && this.auxiliar < 20){
	  		this.cem(this.auxiliar, 10);
	  		if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de dez ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de dez ";
  			}
	  	}else if(this.auxiliar <= 10){
	  		this.cem(this.auxiliar, 2);
	  		if(this.conta > 1){
  				this.resultadoFinal += `${this.conta}` + ": notas de dois ";
  			} else {	
  				this.resultadoFinal += `${this.conta}` + ": nota de dois ";
  			}
	  	}
	}
	this.resultado = this.resultadoFinal;
	this.contaService.alterar(this.key, +this.notas);
  }

  cem(teste: number, total: number){
  	this.auxiliar = teste%total;
  	console.log(this.auxiliar)
  	if(this.auxiliar == 0){
  		this.conta = teste/total;
  	}else{
	  	this.conta = teste - this.auxiliar;
	  	this.conta = this.conta/total;
	}
  }
}
