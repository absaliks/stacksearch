import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Page} from "../model/page.model";
import {Question} from "../model/question.model";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class SearchService {

  constructor(private httpClient: HttpClient) {}

  search(query: string, page: number, size: number): Observable<Page<Question>> {
    let params = new HttpParams().set('query', query).set('page', '' + page).set('size', '' + size);
    return this.httpClient.get<Page<Question>>('http://localhost:8080/search', {params});
  }
}
