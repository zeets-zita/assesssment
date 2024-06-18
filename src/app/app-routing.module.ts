import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RepoListComponent } from "./components/repo-list/repo-list.component";
import { RepoDetailsComponent } from "./components/repo-list/repo-details/repo-details.component";

const routes: Routes = [
  { path: '', component: RepoListComponent },
  { path: 'repo-details/:owner/:repo', component: RepoDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
