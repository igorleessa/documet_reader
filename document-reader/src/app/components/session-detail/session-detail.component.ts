import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session, SessionDoc, SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session-detail',
  templateUrl: './session-detail.component.html',
  styleUrl: './session-detail.component.scss'
})
export class SessionDetailComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  session: Session | null = null;
  isLoading = false;
  uploadError = '';
  uploadSuccess = '';
  isDragging = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.loadSession(params['id']);
    });
  }

  loadSession(id: string): void {
    this.session = this.sessionService.getSession(id);
    if (!this.session) {
      this.router.navigate(['/sessions']);
    }
  }

  openFileDialog(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadFiles(Array.from(input.files));
      input.value = '';
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.uploadFiles(Array.from(files));
    }
  }

  uploadFiles(files: File[]): void {
    this.uploadError = '';
    this.uploadSuccess = '';

    const mdFiles = files.filter(f => f.name.endsWith('.md') || f.name.endsWith('.txt'));
    if (mdFiles.length === 0) {
      this.uploadError = 'Apenas arquivos .md e .txt são suportados.';
      return;
    }

    this.isLoading = true;
    let remaining = mdFiles.length;

    mdFiles.forEach(file => {
      this.sessionService.addDocumentToSession(this.session!.id, file).subscribe({
        next: () => {
          remaining--;
          if (remaining === 0) {
            this.isLoading = false;
            this.uploadSuccess = `${mdFiles.length} arquivo(s) enviado(s) com sucesso!`;
            this.loadSession(this.session!.id);
            setTimeout(() => (this.uploadSuccess = ''), 3000);
          }
        },
        error: (err: string) => {
          this.isLoading = false;
          this.uploadError = err || 'Erro ao fazer upload do arquivo.';
        }
      });
    });
  }

  removeDocument(event: Event, docId: string): void {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('Tem certeza que deseja remover este documento?')) {
      this.sessionService.removeDocumentFromSession(this.session!.id, docId);
      this.loadSession(this.session!.id);
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  goBack(): void {
    this.router.navigate(['/sessions']);
  }
}
