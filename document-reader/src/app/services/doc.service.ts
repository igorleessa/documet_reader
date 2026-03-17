import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocFile {
  name: string;
  filename: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocService {

  private docsBasePath = 'assets/docs/';

  constructor(private http: HttpClient) { }

  getDocuments(): DocFile[] {
    return [
      {
        name: 'Introdução',
        filename: 'introducao.md',
        description: 'Visão geral do Document Reader e suas funcionalidades'
      },
      {
        name: 'Guia de Uso',
        filename: 'guia-de-uso.md',
        description: 'Como adicionar e visualizar documentos Markdown'
      },
      {
        name: 'Markdown Cheatsheet',
        filename: 'markdown-cheatsheet.md',
        description: 'Referência rápida de sintaxe Markdown'
      }
    ];
  }

  getDocumentContent(filename: string): Observable<string> {
    return this.http.get(`${this.docsBasePath}${filename}`, { responseType: 'text' });
  }
}
