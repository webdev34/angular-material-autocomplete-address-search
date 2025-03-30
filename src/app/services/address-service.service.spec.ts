import { TestBed } from '@angular/core/testing';
import { AddressService } from './address-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AddressService', () => {
  let service: AddressService;
  let httpMock: HttpTestingController;
  const API_URL = 'https://nominatim.openstreetmap.org/search';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AddressService],
    });

    service = TestBed.inject(AddressService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make HTTP GET request when search query is at least 3 chars', (done) => {
    const mockResponse = [{ display_name: 'Test Address' }];

    service.search('123');

    setTimeout(() => {
      const req = httpMock.expectOne((request) =>
        request.url === API_URL &&
        request.params.get('q') === '123' &&
        request.params.get('format') === 'json' &&
        request.params.get('addressdetails') === '1' &&
        request.params.get('limit') === '5'
      );

      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      expect(service.suggestions()).toEqual(mockResponse);
      done();
    }, 300); // debounce
  });

});
export { AddressService };

