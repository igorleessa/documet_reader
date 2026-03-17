import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { SecurityContext } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocListComponent } from './components/doc-list/doc-list.component';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    DocListComponent,
    DocViewerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // SecurityContext.NONE disables Angular's HTML sanitization for markdown output.
    // This is intentional because this app only loads static .md files from src/assets/docs/,
    // which are developer-controlled. If user-provided content is ever introduced,
    // this must be revisited with a proper sanitization strategy.
    MarkdownModule.forRoot({ sanitize: SecurityContext.NONE })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
