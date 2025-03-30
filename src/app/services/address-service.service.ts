import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private readonly API_URL = 'https://nominatim.openstreetmap.org/search';
  private searchQuery$ = new Subject<string>();

  suggestions = toSignal(
    this.searchQuery$.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(query =>
        query.length >= 3
          ? this.http.get<any[]>(this.API_URL, {
              params: { q: query, format: 'json', addressdetails: '1', limit: '5' },
            })
          : []
      ),
    ),
    { initialValue: [] }
  );

  constructor(private http: HttpClient) {}

  search(query: string) {
    this.searchQuery$.next(query);
  }
}
