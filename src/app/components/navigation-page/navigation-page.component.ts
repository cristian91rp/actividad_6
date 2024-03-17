import { Component, Input, inject, } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IData } from '../../interfaces/idata.interface';

@Component({
  selector: 'app-navigation-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navigation-page.component.html',
  styleUrl: './navigation-page.component.css'
})
export class NavigationPageComponent {
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  @Input() data: IData | any
  page: string = ""
  
/*   
  userServices = inject(UsersService)
  usuario!: IUser | undefined  */

  ngOnInit(): void{
    this.activatedRoute.params.subscribe(async(params: any) =>{
      this.page = params
      console.log(this.page)
    })
  }
      
    
  
  }

