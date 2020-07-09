import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContaDataService {
  private contaSource = new BehaviorSubject({ conta: null, key: ''});
  currentConta = this.contaSource.asObservable();

  constructor() { }

  
}
