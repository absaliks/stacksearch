import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {Question} from "../model/question.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {SearchCriteria} from "../model/search-criteria.model";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {}

  search(criteria: SearchCriteria): Observable<Page<Question>> {
    let params = new HttpParams()
        .set('query', criteria.query)
        .set('page', '' + criteria.page)
        .set('size', '' + criteria.size);
    return this.httpClient.get<Page<Question>>('http://localhost:8080/search', {params});
  }
}
