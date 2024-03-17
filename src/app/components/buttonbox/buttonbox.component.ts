import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';

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



  async borrarUsuario(_id: string) {
    const confirmar = await Swal.fire({
      title: '¿Seguro que quieres borrar el usuario con id ' + this.idUsuario + "?",
      text: "¡No podrás revertirlo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Borrar",
      cancelButtonText: "Cancelar"
    });

    if (confirmar.isConfirmed) {
      try {
        const response = await this.userServices.delete(_id);
        console.log(response);
        if (response._id) {
          Swal.fire({
            title: "Borrado",
            text: "El usuario ha sido borrado correctamente",
            icon: "success"
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

}

