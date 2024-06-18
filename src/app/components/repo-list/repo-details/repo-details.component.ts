import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {GithubService} from "../../../services/github.service";

@Component({
  selector: 'app-repo-details',
  templateUrl: './repo-details.component.html',
  styleUrls: ['./repo-details.component.scss']
})
export class RepoDetailsComponent implements OnInit {
  repoDetails: any = null;
  issues: any[] = [];
  owner: string = '';
  repo: string = '';
  filteredIssues: any[] = [];
  issueState: string = 'All';
  issueStates: any[] = [];

  constructor(private route: ActivatedRoute,
              private githubService: GithubService) { }

  ngOnInit(): void {
    this.owner = this.route.snapshot.paramMap.get('owner')!;
    this.repo = this.route.snapshot.paramMap.get('repo')!;
    this.githubService.getRepositoryDetails(this.owner, this.repo).subscribe((data: any) => {
      this.repoDetails = data;
    });
    this.githubService.getRepositoryIssues(this.owner, this.repo).subscribe((data: any) => {
      this.issues = data.items;
      this.filterIssues();
    });

    this.issueDropdown();
  }

  public filterIssues(): void {
    if (this.issueState === 'All') {
      this.filteredIssues = this.issues;
    } else {
      this.filteredIssues = this.issues.filter(issue => issue.state === this.issueState);
    }
  }

  public onStateChange(state: string): void {
    this.issueState = state;
    this.filterIssues();
  }

  private issueDropdown(): void {
    this.issueStates = [
      { label: 'All', value: 'All' },
      { label: 'Open', value: 'open' },
      { label: 'Closed', value: 'closed' }
    ];
  }

}
