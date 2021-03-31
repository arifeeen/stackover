import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FetchJsonService {
  url = environment.URL;
  httpParams;
  totalResults: number;
  currentSearchObject: any
  constructor(private http: HttpClient) { }

  getSearchResults(searchObject: any, pageNumber = 1): Observable<any> {
    this.currentSearchObject = searchObject;
    this.httpParams = new HttpParams({ fromObject: { ...searchObject, site: 'stackoverflow' , page:pageNumber, pagesize:10} });
    if (pageNumber === 1) {

      let newHttpParams = this.httpParams.append('filter', 'total');

      return this.http.get<any>(this.url, { params: newHttpParams }).pipe(tap(res => {
        this.totalResults = res.total;
        console.log('total', this.totalResults);
      }),
      switchMap(res => this.http.get<any>(this.url, {params:this.httpParams}))
      );
    } 
    return this.http.get<any>(this.url,{ params:this.httpParams});
    
    
  }

  nextPageResults() {

  }

  getCountSearchResults() {

  }
}
