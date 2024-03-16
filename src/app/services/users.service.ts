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
}
