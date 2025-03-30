import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressFieldComponent } from './address-field.component';
import { AddressService } from '../../services/address-service.service';
import { signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';

describe('AddressFieldComponent', () => {
  let component: AddressFieldComponent;
  let fixture: ComponentFixture<AddressFieldComponent>;
  let mockAddressService: Partial<AddressService>;

  beforeEach(async () => {
    mockAddressService = {
      suggestions: signal([]),
      search: jasmine.createSpy('search'),
    };

    await TestBed.configureTestingModule({
      imports: [AddressFieldComponent, MatFormFieldModule,MatInputModule, MatProgressSpinnerModule, MatListModule],
      providers: [{ provide: AddressService, useValue: mockAddressService }],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update searchInput signal on user input', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = '123 Main St';
    inputElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.searchInput()).toBe('123 Main St');
  });

  it('should trigger addressService search when input length >= 3', () => {
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    inputElement.value = '123';
    inputElement.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    expect(mockAddressService.search).toHaveBeenCalledWith('123');
  });

  it('should show spinner when loading', () => {
    component.loading.set(true);
    fixture.detectChanges();
    const spinnerElement = fixture.debugElement.query(By.css('mat-spinner'));
    expect(spinnerElement).toBeTruthy();
  });
});
