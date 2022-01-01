import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HttpParams} from "@angular/common/http";
import {ICity} from "../city.model";
import {MyDataSource} from "../../../core/utils/datasource/datasource";
import {CityService} from "../service/city.service";
import {Router} from "@angular/router";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {BehaviorSubject, merge} from "rxjs";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.scss']
})
export class CityListComponent implements OnInit, AfterViewInit{
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined ;
  @ViewChild(MatSort) sort: MatSort = new MatSort();
  dataSource: MyDataSource;
  subject = new BehaviorSubject<any[]>([]);
  nameSearch: string;
  displayedColumns: Array<any> = [];

  constructor(private router: Router, private cityService: CityService) {
    this.dataSource = new MyDataSource(this.cityService, this.subject);
    this.nameSearch = '';
  }

  ngOnInit(): void {
    this.displayedColumns = ['name', 'photo', 'action'];
    this.loadData();
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator!.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator!.page)
      .pipe(
        tap(() => this.loadData())
      )
      .subscribe();

  }

  loadData(): void {
    const params = new HttpParams().set('name', this.nameSearch!)
      .set('size', this.paginator?.pageSize ? this.paginator?.pageSize.toString() : '20')
      .set('page', this.paginator?.pageIndex ? this.paginator?.pageIndex.toString() : '0')
      .set('sortDirection', this.sort?.direction ? this.sort?.direction : 'asc')
      .set('sortBy', this.sort?.active ? this.sort?.active : 'name');
    this.dataSource.loadData(params);
  }

}
