import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocListComponent } from './components/doc-list/doc-list.component';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { UrlGuardInterceptor } from './interceptors/url-guard.interceptor';
import { SafeMarkdownPipe } from './pipes/safe-markdown.pipe';

@NgModule({
  declarations: [
    AppComponent,
    DocListComponent,
    DocViewerComponent,
    SafeMarkdownPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    // Blocks protocol-relative URLs (//example.com) to mitigate XSRF token leakage.
    // Advisory: "Angular is Vulnerable to XSRF Token Leakage via Protocol-Relative URLs"
    // @angular/common < 19.2.16 — no upstream patch for Angular 17.x.
    { provide: HTTP_INTERCEPTORS, useClass: UrlGuardInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
