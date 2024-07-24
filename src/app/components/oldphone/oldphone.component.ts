import { Component, Input } from '@angular/core';
import { IOldphone } from '../../models/OldPhone';
import { PhoneService } from '../../services/phone-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-oldphone',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './oldphone.component.html',
  styleUrl: './oldphone.component.css',
  providers:[PhoneService]
})
export class OldphoneComponent {
  @Input() oldphone:IOldphone;

}
