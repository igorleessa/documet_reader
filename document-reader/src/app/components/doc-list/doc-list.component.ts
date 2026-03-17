import { Component, OnInit } from '@angular/core';
import { DocFile, DocService } from '../../services/doc.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrl: './doc-list.component.scss'
})
export class DocListComponent implements OnInit {
  documents: DocFile[] = [];

  constructor(private docService: DocService) {}

  ngOnInit(): void {
    this.documents = this.docService.getDocuments();
  }
}
