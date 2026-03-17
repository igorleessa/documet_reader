import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocFile, DocService } from '../../services/doc.service';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrl: './doc-viewer.component.scss'
})
export class DocViewerComponent implements OnInit {
  filename = '';
  document: DocFile | undefined;
  markdownContent = '';
  isLoading = true;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private docService: DocService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.filename = params['filename'];
      this.loadDocument();
    });
  }

  loadDocument(): void {
    this.isLoading = true;
    this.hasError = false;

    const docs = this.docService.getDocuments();
    this.document = docs.find(d => d.filename === this.filename);

    if (!this.document) {
      this.hasError = true;
      this.isLoading = false;
      return;
    }

    this.docService.getDocumentContent(this.filename).subscribe({
      next: (content) => {
        this.markdownContent = content;
        this.isLoading = false;
      },
      error: () => {
        this.hasError = true;
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
}
