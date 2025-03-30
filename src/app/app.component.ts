import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressFieldComponent } from './components/address-field/address-field.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, AddressFieldComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedAddress: any;

  handleAddressSelected(address: any) {
    this.selectedAddress = address;
  }
}
