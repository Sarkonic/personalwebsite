import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { QuotesComponent} from './quotes/quotes.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent} from './home/home.component';
import { ResumeComponent} from './resume/resume.component';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import {PowershellComponent} from "./powershell/powershell.component";
import {SccmComponent} from "./sccm/sccm.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'quotes', component: QuotesComponent},
  {path: 'resume', component: ResumeComponent},
  {path: 'knowledge', component: KnowledgeComponent},
  {path: 'powershell', component: PowershellComponent},
  {path: 'sccm', component: SccmComponent}

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
