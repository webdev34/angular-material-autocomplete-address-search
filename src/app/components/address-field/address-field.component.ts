import { Component, Input, Output, EventEmitter, effect, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { AddressService } from '../../services/address-service.service';
import { IStructuredAddress } from '../../interfaces/structured-address';

@Component({
  selector: 'app-address-field',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatListModule,
  ],
  templateUrl: './address-field.component.html',
  styleUrls: ['./address-field.component.css']
})
export class AddressFieldComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: true }) placeholder!: string;
  @Output() addressSelected = new EventEmitter<any>();

  searchInput = signal('');
  loading = signal(false);
  focusedIndex = signal<number>(-1);

  suggestions = computed(() => this.searchInput().length >= 3 ? this.addressService.suggestions() : []);

  constructor(private addressService: AddressService) {
    effect(() => {
      const query = this.searchInput();
      if (query.length >= 3) {
        this.loading.set(true);
        this.addressService.search(query);
      } else {
        this.loading.set(false);
      }

      if (this.suggestions().length) {
        this.loading.set(false);
        this.focusedIndex.set(-1);
      }
    });
  }

  selectAddress(address: any) {
    const structuredAddress: IStructuredAddress = {
      fullAddress: address.display_name,
      street: address.address.road || '',
      buildingNumber: address.address.house_number || '',
      city: address.address.city || address.address.town || address.address.village || '',
      postalCode: address.address.postcode || '',
      country: address.address.country || '',
      latitude: address.lat,
      longitude: address.lon,
      propertyType: address.type || '',
    };

    this.searchInput.set('');
    this.addressSelected.emit(structuredAddress);
  }

  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchInput.set(input.value);
  }

  handleKeyDown(event: KeyboardEvent) {
    const total = this.suggestions().length;
    const current = this.focusedIndex();

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (current === -1 && total > 0) {
        this.focusedIndex.set(0);
      } else if (current < total - 1) {
        this.focusedIndex.set(current + 1);
      }
    }

    else if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (current > 0) {
        this.focusedIndex.set(current - 1);
      }
    }

    else if (event.key === 'Enter') {
      event.preventDefault();
      const currentSuggestion = this.suggestions()[this.focusedIndex()];
      if (currentSuggestion) {
        this.selectAddress(currentSuggestion);
      }
    }
  }
}
