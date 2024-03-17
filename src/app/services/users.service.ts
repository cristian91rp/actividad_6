import { Injectable, inject } from '@angular/core';
import { IUser } from '../interfaces/iuser.interface';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IData } from '../interfaces/idata.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient)
  private arrUsuarios: IUser[] = []

  private baseUrl = 'https://peticiones.online/api/users' 

  
  getAllPromises(): Promise<IData> {
    return lastValueFrom(this.httpClient.get<IData>(this.baseUrl))
  }

  getById(_id: string): Promise<IUser>{
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`))
  }

  delete(_id: string) : Promise<IUser>{
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`))
  }

  update(formUser: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.put<IUser>(`${this.baseUrl}/${formUser._id}`, formUser))
  }

  insert(formUser: IUser): Promise<IUser>{
    return lastValueFrom(this.httpClient.post<IUser>(this.baseUrl, formUser))
  }

 getByName(first_name: string): Promise<IUser>{
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${first_name}`))

    /* return this.arrUsuarios.filter(user => {
      let userName = this.quitarTildes(user.first_name) + this.quitarTildes(user.last_name)
      let parameterName = this.quitarTildes(name)
      return userName.includes(parameterName)
    }) */
  }


  quitarTildes(palabra: string){
    let sinTildes = ""
    sinTildes = palabra.toLocaleLowerCase()
    sinTildes = sinTildes.replaceAll ('á', 'a')
    sinTildes = sinTildes.replaceAll ('é', 'e')
    sinTildes = sinTildes.replaceAll ('í', 'i')
    sinTildes = sinTildes.replaceAll ('ó', 'o')
    sinTildes = sinTildes.replaceAll ('ú', 'u')
    return sinTildes;
  }
}
