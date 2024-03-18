import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-form-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-user.component.html',
  styleUrl: './form-user.component.css'
})
export class FormUserComponent {
  formUser: FormGroup;

  activatedRoute = inject(ActivatedRoute)
  userService = inject(UsersService)
  router = inject(Router)

  parent: string = ''


  constructor() {
    this.formUser = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
      ]),
      image: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)
      ]),
    }, [])
  };

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params._id) {
        this.parent = params
        const response = await this.userService.getById(params._id)

        this.formUser = new FormGroup({
          _id: new FormControl(response._id, [
          ]),
          first_name: new FormControl(response.first_name, [
            Validators.required,
            Validators.minLength(2)
          ]),
          last_name: new FormControl(response.last_name, [
            Validators.required,
            Validators.minLength(2)
          ]),
          username: new FormControl(response.username, [
            Validators.required,
            Validators.minLength(5)
          ]),
          email: new FormControl(response.email, [
            Validators.required,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
          ]),
          image: new FormControl(response.image, [
            Validators.required,
            Validators.pattern(/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i)
          ]),
        }, [])
      }

    })
  }


  async getDataForm() {
    if (this.formUser.value._id) {
      const response = await this.userService.update(this.formUser.value)
      console.log(response)
      if (response._id) {
        Swal.fire({
          icon: "success",
          title: `${response.first_name + " " + response.last_name} se ha actualizado correctemente`,
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate(['/'])

      } else {
        Swal.fire('"El usuario que intentas editar no existe"')
      }

    } else {
      const response = await this.userService.insert(this.formUser.value)
      console.log(response)
      if (response.id) {
        Swal.fire({
          icon: "success",
          title: `${response.first_name + " " + response.last_name} se ha añadido correctemente`,
          showConfirmButton: false,
          timer: 2500
        });
        this.router.navigate(['/'])
      }
      this.formUser.reset()
    }
  }

  checkControl(formControlName: string, validador: string): boolean | undefined {
    return this.formUser.get(formControlName)?.hasError(validador) && this.formUser.get(formControlName)?.touched
  }

}
