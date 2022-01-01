import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {ApiService} from '../services/services';
import {Page} from '../models/page';
import {HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

export class MyDataSource implements DataSource<any> {

  public page: Page;

  constructor(private service: ApiService, private subject: BehaviorSubject<any[]>) {
    this.page = new Page();
    this.page.totalElements = 0;
  }

  loadData(params: HttpParams) {
    this.service.getData(params).pipe(
      catchError(() => of([])))
      .subscribe(data => {
        this.page = data as Page;
        this.subject.next(this.page.content);
      });
  }

  connect(collectionViewer: CollectionViewer): Observable<any[]> {
    console.log('Connecting data source');
    return this.subject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subject.complete();
  }

}
