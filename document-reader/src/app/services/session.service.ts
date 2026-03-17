import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface SessionDoc {
  id: string;
  name: string;
  filename: string;
  content: string;
  uploadedAt: string;
}

export interface Session {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  documents: SessionDoc[];
}

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly STORAGE_KEY = 'doc_reader_sessions';

  getSessions(): Session[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  getSession(id: string): Session | null {
    return this.getSessions().find(s => s.id === id) ?? null;
  }

  createSession(name: string, description?: string): Session {
    const sessions = this.getSessions();
    const session: Session = {
      id: this.generateId(),
      name: name.trim(),
      description: description?.trim(),
      createdAt: new Date().toISOString(),
      documents: []
    };
    sessions.push(session);
    this.saveSessions(sessions);
    return session;
  }

  deleteSession(id: string): void {
    const sessions = this.getSessions().filter(s => s.id !== id);
    this.saveSessions(sessions);
  }

  addDocumentToSession(sessionId: string, file: File): Observable<SessionDoc> {
    return new Observable(observer => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        const sessions = this.getSessions();
        const sessionIndex = sessions.findIndex(s => s.id === sessionId);
        if (sessionIndex === -1) {
          observer.error('Sessão não encontrada');
          return;
        }
        const doc: SessionDoc = {
          id: this.generateId(),
          name: file.name.replace(/\.[^/.]+$/, ''),
          filename: file.name,
          content,
          uploadedAt: new Date().toISOString()
        };
        sessions[sessionIndex].documents.push(doc);
        this.saveSessions(sessions);
        observer.next(doc);
        observer.complete();
      };
      reader.onerror = () => observer.error('Falha ao ler o arquivo');
      reader.readAsText(file);
    });
  }

  removeDocumentFromSession(sessionId: string, docId: string): void {
    const sessions = this.getSessions();
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      session.documents = session.documents.filter(d => d.id !== docId);
      this.saveSessions(sessions);
    }
  }

  private saveSessions(sessions: Session[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(sessions));
  }

  private generateId(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }
}
