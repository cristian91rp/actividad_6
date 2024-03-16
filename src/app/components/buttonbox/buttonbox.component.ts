import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-buttonbox',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './buttonbox.component.html',
  styleUrl: './buttonbox.component.css'
})
export class ButtonboxComponent {
  @Input() idUsuario: any | string
  @Input() parent: string = "";

  userServices = inject(UsersService)


  async borrarUsuario(_id: string){
    console.log(this.idUsuario)
    let confirmar = confirm('¿Seguro que quieres borrar el usuario con id' + this.idUsuario +"?")
    console.log(confirmar)
    console.log(this.idUsuario)
    if(confirmar){
      let response = await this.userServices.delete(_id)
      console.log(response)
      if(response._id){
        alert('Se ha borrado correctamente el usuario ' + response.first_name + ' ' + response.last_name)
      }
    }
  }
}
