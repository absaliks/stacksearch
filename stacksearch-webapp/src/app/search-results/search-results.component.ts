import {Component} from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import {Question} from "../model/question.model";
import {SearchService} from "./search.service";
import {Observable, Subject} from "rxjs";
import {Page} from "../model/page.model";
import {SearchCriteria} from "../model/search-criteria.model";
import {debounceTime, distinctUntilChanged, switchMap} from "rxjs/operators";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [
    SearchService
  ]
})
export class SearchResultsComponent {

  page = 0;
  pageSizes = [5, 15, 25, 50];
  pageSize = 15;
  hasMore = false;
  rangeLabel = '';

  query = '';
  private lastQuery: string;

  dataSource: MatTableDataSource<Question> = new MatTableDataSource([]);
  displayedColumns = ['title', 'owner', 'createdOn'];

  private readonly data$: Observable<Page<Question>>;
  private readonly searchTerms$ = new Subject<SearchCriteria>();

  constructor(private service: SearchService) {
    this.data$ = this.searchTerms$.pipe(
      debounceTime(24),
      distinctUntilChanged(),
      switchMap(request => this.service.search(request))
    );
    this.data$.subscribe(page => {
      this.dataSource.data = page.items;
      this.updatePaginator(page.has_more);
    })
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
