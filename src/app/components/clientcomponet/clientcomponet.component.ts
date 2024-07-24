import { Component, Input } from '@angular/core';
import { ClientResponse, ICLientResponse } from '../../models/IClient';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clientcomponet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './clientcomponet.component.html',
  styleUrl: './clientcomponet.component.css'
})
export class ClientcomponetComponent {
  @Input() client:ICLientResponse;

}
