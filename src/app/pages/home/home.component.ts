import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usuarios: IUser[]= []
  userServices = inject(UsersService)


  async ngOnInit(): Promise<void> {
    
    try{
      let data = await this.userServices.getAllPromises()
      this.usuarios = data.results
      console.log(this.usuarios)
    } catch (err) {
      console.log(err)
    }
  }
}
