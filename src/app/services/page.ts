import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuariModels} from '../models/usuari.models';
import { environment } from 'src/environments/environment';
import {map} from 'rxjs';

const URL = environment.urlServer;
@Injectable({
  providedIn: 'root',
})
export class Page {

  constructor(private http:HttpClient) {  }

  crearUsuari(usuari:UsuariModels){
    return this.http.post(`${URL}/usuari.json`, usuari).pipe(

      map((res:any) =>{
        usuari.id = res.name;
        return usuari
      })
    )
  }

  updateUsuari(usuari:UsuariModels){

    let usuariTemp = {...usuari};
    delete usuariTemp.id;
    return this.http.put(`${URL}/${usuari.id}.json`,usuariTemp);
  }

  getUsuari(id:String){
    return this.http.get(`${URL}/usuaris/${id}.json`)
  }

  getUsuaris(){
    return this.http.get(`${URL}/usuaris.json`).pipe(
      map(this.arreglo)
    )
  }

  // @ts-ignore
  private arreglo(usuarisObj:any):UsuariModels[]{
    const usuaris:UsuariModels[]=[];

    if (usuarisObj === null) {
      return usuaris;
    }

    for(let registre in usuarisObj){
      usuarisObj[registre].id = registre;
      usuaris.push(usuarisObj[registre]);
    }
    return usuaris;
  }

  verificarEmail(email:any){
    return this.getUsuaris().pipe(
      map((usuaris:UsuariModels[])=>{
        return usuaris.some(usuari => usuari.email === email)
      })
    )
  }
}
