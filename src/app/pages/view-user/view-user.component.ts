import { Component, inject } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { ButtonboxComponent } from '../../components/buttonbox/buttonbox.component';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [ButtonboxComponent],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.css'
})
export class ViewUserComponent {
  activedRoute = inject(ActivatedRoute)
  userServices = inject(UsersService)
  usuario!: IUser | undefined 

  ngOnInit(): void{
    this.activedRoute.params.subscribe(async(params: any) =>{
      const id = params._id
      try{
        let response = await this.userServices.getById(id)
        this.usuario = response
      }catch (error){
        console.log(error);
      }
    })
  }
  
}
