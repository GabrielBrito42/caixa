import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CaixaComponent } from './caixa/caixa.component';
import { DepositarComponent } from './caixa/depositar/depositar.component';
import { SacarComponent } from './caixa/sacar/sacar.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full',	
	},
	{
		path: 'home',
		component: HomeComponent,
		pathMatch: 'full',
	},
	{
		path: 'caixa',
		component: CaixaComponent,
		children: [
			{
				path: 'depositar',
				component: DepositarComponent,
			},
			{
				path: 'sacar',
				component: SacarComponent,
			},
		],
	},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
