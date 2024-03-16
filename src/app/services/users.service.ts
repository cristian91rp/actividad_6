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

  private baseUrl = 'https://peticiones.online/api/users' 

  
  getAllPromises(): Promise<IData> {
    return lastValueFrom(this.httpClient.get<IData>(this.baseUrl))
  }

  delete(_id: string) : Promise<IUser>{
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`))
  }
}
