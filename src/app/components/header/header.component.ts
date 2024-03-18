import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  router = inject(Router)


  getSearch(searchForm: any): void {
    let busqueda = searchForm.value.busqueda
    this.router.navigateByUrl("/?query=" + busqueda)
  }
}
