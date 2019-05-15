import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {Page} from "../model/page.model";
import {Question} from "../model/question.model";

@Injectable()
export class SearchService {

  private readonly DATA = [
    createQuestion('kotlin hello world', 'https://stackoverflow.com/questions/50581234/kotlin-create-an-arraylist-of-random-integers-of-specified-length', 'John Doe'),
    createQuestion('java hello world', 'https://stackoverflow.com/questions/49110196/problems-with-create-react-kotlin-app-and-backend', 'Jane Doe'),
    createQuestion('what\'s the heck?', 'https://google.com', 'John Q. Public'),
    createQuestion('absdfjklsd sdfkljsdkl', 'https://google.com', 'John Q. Public'),
    createQuestion('sdfjl lksdj lfkdjdkl', 'https://google.com', 'John Q. Public'),
    createQuestion('zlzzl slkdj sl;kjksj kjs', 'https://google.com', 'John Q. Public'),
  ];

  search(query: string, page: number, size: number): Observable<Page<Question>> {
    let start = page * size;
    return of({
      items: this.DATA.slice(start, start + size),
      has_more: this.DATA.length > start + size
    });
  }
}

function createQuestion(title: string, link: string, owner: string): Question {
  return {title, link,
    owner: {display_name: owner},
    creation_date: "2019-03-18T21:52:02Z"
  } as Question;
}
