import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private apiUrl = 'https://api.github.com';
  private latestSearchesSubject = new BehaviorSubject<string[]>([]);
  latestSearches$ = this.latestSearchesSubject.asObservable();

  constructor(private http: HttpClient) { }

  public searchRepositories(query: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/repositories?q=${query}`);
  }

  public getRecentRepositories(): Observable<any> {
    const searchTerm = 'stars:>1';
    return this.http.get<any>(`${this.apiUrl}/search/repositories?q=${searchTerm}&sort=updated&order=desc`).pipe(
      map(response => response.items.slice(0, 10))
    );
  }
  public getRepositoryDetails(owner: string, repo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/repos/${owner}/${repo}`).pipe(
      map(data => {
        return data;
      })
    );
  }

  public getRepositoryIssues(owner: string, repo: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/search/issues?q=repo:${owner}/${repo}`);
  }
}
