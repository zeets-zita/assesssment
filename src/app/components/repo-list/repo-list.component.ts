import {Component, OnDestroy, OnInit} from '@angular/core';
import { GithubService } from "../../services/github.service";
import {Router} from "@angular/router";
import {finalize, map} from "rxjs/operators";

@Component({
  selector: 'app-repo-list',
  templateUrl: './repo-list.component.html',
  styleUrls: ['./repo-list.component.scss']
})
export class RepoListComponent implements OnInit {

  repositories: any[] = [];
  recentRepositories: any[] = [];

  query: string = '';
  loading: boolean = false;

  constructor(private githubService: GithubService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loadRecentRepositories();
    this.loadQueryFromLocalStorage();

  }

  public search(): void {
    this.loading = true;
    this.saveQueryToLocalStorage();

    this.githubService.searchRepositories(this.query).pipe(
      map(response => response.items),
      finalize(() => this.loading = false)
    ).subscribe(
      (data: any) => {
        this.repositories = data;
      },
      (error) => {
        console.error('Error fetching repositories:', error);
      }
    );
  }

  public loadRecentRepositories(): void {
    this.githubService.getRecentRepositories().subscribe(
      data => {
        this.recentRepositories = data;
      },
      error => {
        console.error('Error fetching recent repositories:', error);
      });
  }

  public selectRepository(repo: any): void {
    this.router.navigate(['/repo-details', repo.owner.login, repo.name]);
  }

  private saveQueryToLocalStorage(): void {
    localStorage.setItem('searchQuery', this.query);
  }

  private loadQueryFromLocalStorage(): void {
    const savedQuery = localStorage.getItem('searchQuery');
    if (savedQuery) {
      this.query = savedQuery;
      this.search();
    }
  }

  public clearInput() {
    this.query = '';
    this.repositories = [];
    localStorage.removeItem('searchQuery');
  }
}
