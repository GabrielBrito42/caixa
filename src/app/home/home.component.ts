import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Contato } from '../caixa/shared/Contato';
import { ContaDataService } from '../caixa/shared/conta-data.service';
import { ContaService } from '../caixa/shared/conta.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormControl, Validators} from '@angular/forms';
import { DOCUMENT } from '@angular/common'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hide = true;
  conta: Contato;
  container;
  email = new FormControl('', [Validators.required, Validators.email]);
  nome = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required, Validators.email]);
  key: string;

  constructor(private router: Router, private contaService: ContaService, 
    private contaDataService: ContaDataService, private route: ActivatedRoute,
    private fire: AngularFireAuth) {
  		this.conta = new Contato();
  		this.contaDataService.currentConta.subscribe(data => {
  		if(data.conta && data.key){
  			this.conta = new Contato();
  			this.conta.email = data.conta.email;
  			this.conta.senha = data.conta.senha;
  			this.key = data.key;
  			}
  		})
    }

  ngOnInit(): void {
    this.container = document.getElementById("container");
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
  }

  FazerLogin(){
    this.contaService.setEmail(this.conta.email);
    this.fire.signInWithEmailAndPassword(this.conta.email, this.conta.senha).then(value => {
      console.log('Usuario validado');
      this.router.navigate(['/caixa'])
    }).catch(err => {
      console.log('Algo deu errado', err.message);
      alert(`Usuario ou senhas incorretas`);
    })
  }

  TrocarTela(){
  	this.container.classList.add("right-panel-active");
  }

  TrocarTelaInversa(){
  	this.container.classList.remove("right-panel-active");
  }

  Cadastrar(){
    this.contaService.registro(this.conta);
    this.contaService.insert(this.conta);
    this.email.reset();
    this.senha.reset();
    alert("Usuario Cadastrado com sucesso");
    this.router.navigate(['/home'])
    this.TrocarTelaInversa();
  }

  Enviar(){
  	if(this.key){
  		this.contaService.atualizar(this.conta, this.key);
  	} else {
  		this.contaService.insert(this.conta);
  	}
  	this.conta = new Contato();
  }
}
