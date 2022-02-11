import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { QuotesComponent } from './quotes/quotes.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { KnowledgeComponent } from './knowledge/knowledge.component';
import { PowershellComponent } from './powershell/powershell.component';
import { SccmComponent } from './sccm/sccm.component';
import { RaspberrypiComponent } from './raspberrypi/raspberrypi.component';


@NgModule({
  declarations: [
    AppComponent,
    QuotesComponent,
    HomeComponent,
    ResumeComponent,
    KnowledgeComponent,
    PowershellComponent,
    SccmComponent,
    RaspberrypiComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
