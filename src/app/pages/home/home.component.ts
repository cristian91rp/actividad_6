import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { NavigationPageComponent } from '../../components/navigation-page/navigation-page.component';
import { IData } from '../../interfaces/idata.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, UserCardComponent, NavigationPageComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usuarios: IUser[]= []
  userServices = inject(UsersService)
  activatedRoute = inject(ActivatedRoute)
  hola: IData[] | any = [] 


  async ngOnInit(): Promise<void> {
    
    try{
      let data = await this.userServices.getAllPromises()
      this.usuarios = data.results
      this.hola = data.page
      console.log(this.hola)
      console.log(this.usuarios)

      this.activatedRoute.queryParams.subscribe((params: any) =>{
        const buscar = params.query
        console.log(buscar)
      if (buscar){
        let name = this.userServices.quitarTildes(buscar)
        let filterUsuarios = this.usuarios.filter(user => 
          this.userServices.quitarTildes(user.first_name).includes(name) || 
          this.userServices.quitarTildes(user.last_name).includes(name)
        )
        this.usuarios = filterUsuarios
    }if(buscar === undefined || ""){
        this.usuarios= data.results
      }

    })
    
    } catch (err) {
      console.log(err)
    }
  }
}