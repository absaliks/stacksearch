import {Component, OnDestroy} from '@angular/core';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBar, MatTableDataSource} from '@angular/material';
import {Question} from "../model/question.model";
import {SearchService} from "./search.service";
import {of, Subject, Subscription} from "rxjs";
import {emptyPage} from "../model/page.model";
import {SearchCriteria} from "../model/search-criteria.model";
import {catchError, debounceTime, distinctUntilChanged, switchMap, timeout} from "rxjs/operators";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [
    SearchService,
    MatSnackBar,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}}
  ]
})
export class SearchResultsComponent implements OnDestroy {

  page = 0;
  pageSizes = [5, 15, 25, 50];
  pageSize = 15;
  hasMore = false;
  rangeLabel = '';

  loading = false;
  query = '';
  private lastQuery: string;

  dataSource: MatTableDataSource<Question> = new MatTableDataSource([]);
  displayedColumns = ['title', 'owner', 'createdOn'];

  private readonly data$: Subscription;
  private readonly searchTerms$ = new Subject<SearchCriteria>();

  constructor(private service: SearchService,
              private snackBar: MatSnackBar) {
    this.data$ = this.searchTerms$.pipe(
      debounceTime(24),
      distinctUntilChanged(),
      switchMap(request =>
        this.service.search(request).pipe(
          timeout(20000),
          catchError(err => {
            const errorMessage = 'Unable to get data';
            console.error(errorMessage, JSON.stringify(err));
            this.snackBar.open(errorMessage);
            return of(emptyPage());
          })
      ))
    ).subscribe(page => {
      this.dataSource.data = page.items;
      this.updatePaginator(page.has_more);
      this.loading = false;
    })
  }

  ngOnDestroy() {
    this.data$.unsubscribe();
  }

  setPage(page: number) {
    this.page = page;
    this.loadData();
  }

  search() {
    this.lastQuery = this.query;
    this.loadData();
  }

  private loadData() {
    this.loading = true;
    this.searchTerms$.next({
      query: this.lastQuery,
      page: this.page,
      size: this.pageSize
    })
  }

  private updatePaginator(hasMore: boolean) {
    const startIndex = this.page * this.pageSize;
    const endIndex = startIndex + this.dataSource.data.length;
    const total = hasMore ? endIndex + '+' : endIndex;
    this.rangeLabel = `${startIndex + 1} - ${endIndex} of ${total}`;
    this.hasMore = hasMore;
  }
}
