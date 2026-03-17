import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Session, SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session-list',
  templateUrl: './session-list.component.html',
  styleUrl: './session-list.component.scss'
})
export class SessionListComponent implements OnInit {
  sessions: Session[] = [];
  showCreateForm = false;
  newSessionName = '';
  newSessionDescription = '';

  constructor(
    private sessionService: SessionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  loadSessions(): void {
    this.sessions = this.sessionService.getSessions();
  }

  toggleCreateForm(): void {
    this.showCreateForm = !this.showCreateForm;
    if (!this.showCreateForm) {
      this.resetForm();
    }
  }

  createSession(): void {
    if (!this.newSessionName.trim()) {
      return;
    }
    const session = this.sessionService.createSession(
      this.newSessionName,
      this.newSessionDescription
    );
    this.resetForm();
    this.showCreateForm = false;
    this.router.navigate(['/sessions', session.id]);
  }

  deleteSession(event: Event, id: string): void {
    event.preventDefault();
    event.stopPropagation();
    if (confirm('Tem certeza que deseja excluir esta sessão?')) {
      this.sessionService.deleteSession(id);
      this.loadSessions();
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

  private resetForm(): void {
    this.newSessionName = '';
    this.newSessionDescription = '';
  }
}
