import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {Question} from "../model/question.model";
import {SearchService} from "./search.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss'],
  providers: [SearchService]
})
export class SearchResultsComponent implements AfterViewInit {

  query = 'kotlin';

  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Question> = new MatTableDataSource([]);

  displayedColumns = ['title', 'owner', 'createdOn'];

  constructor(private service: SearchService) {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    // this.paginator.page.subscribe(this.search())
  }

  search() {
    this.service.search(this.query, this.paginator.pageIndex, this.paginator.pageSize)
        .subscribe(data => this.dataSource.data = data.items)
  }
}
