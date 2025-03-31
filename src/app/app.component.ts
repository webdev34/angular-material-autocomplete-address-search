import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressFieldComponent } from './components/address-field/address-field.component';
import { MatButtonModule } from '@angular/material/button';
import { CamelCaseToLabelDisplayPipe } from './pipes/camel-case-to-label-display.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, AddressFieldComponent, CamelCaseToLabelDisplayPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  selectedAddress: any;

  addressForm = new FormGroup({
    address: new FormControl(''),
  });

  handleAddressSelected(address: any) {
    this.selectedAddress = address;
    this.addressForm.get('address')?.setValue(address.fullAddress);
  }
}
