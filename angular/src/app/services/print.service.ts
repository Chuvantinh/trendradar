/**
 * click button print
 */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  constructor (){}

  public mediaprint(){
    window.print();
  }
}
