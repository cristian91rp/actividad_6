import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { ButtonboxComponent } from '../buttonbox/buttonbox.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [ButtonboxComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() miUsuario!: IUser;
}
