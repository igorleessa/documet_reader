import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocListComponent } from './components/doc-list/doc-list.component';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';
import { SessionListComponent } from './components/session-list/session-list.component';
import { SessionDetailComponent } from './components/session-detail/session-detail.component';
import { SessionDocViewerComponent } from './components/session-doc-viewer/session-doc-viewer.component';

const routes: Routes = [
  { path: '', component: DocListComponent },
  { path: 'doc/:filename', component: DocViewerComponent },
  { path: 'sessions', component: SessionListComponent },
  { path: 'sessions/:id', component: SessionDetailComponent },
  { path: 'sessions/:id/doc/:docId', component: SessionDocViewerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
