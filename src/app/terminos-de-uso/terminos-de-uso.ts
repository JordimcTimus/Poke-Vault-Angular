import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {Capcelera} from '../capcelera/capcelera';
import {Productes} from '../services/productes';
import {Page} from '../services/page';

@Component({
  selector: 'app-terminos-de-uso',
  imports: [Capcelera],
  templateUrl: './terminos-de-uso.html',
  styleUrl: './terminos-de-uso.css',
})
export class TerminosDeUso implements OnInit{
  constructor(private s: Page) { }

  ngOnInit(){
      this.s.getUsuaris().subscribe((res:any) => {
        console.log(res)
        }
      )
    }
}
