import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocListComponent } from './components/doc-list/doc-list.component';
import { DocViewerComponent } from './components/doc-viewer/doc-viewer.component';

const routes: Routes = [
  { path: '', component: DocListComponent },
  { path: 'doc/:filename', component: DocViewerComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
