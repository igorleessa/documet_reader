import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session, SessionDoc, SessionService } from '../../services/session.service';

@Component({
  selector: 'app-session-doc-viewer',
  templateUrl: './session-doc-viewer.component.html',
  styleUrl: './session-doc-viewer.component.scss'
})
export class SessionDocViewerComponent implements OnInit {
  session: Session | null = null;
  doc: SessionDoc | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sessionService: SessionService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const sessionId = params['id'];
      const docId = params['docId'];
      this.session = this.sessionService.getSession(sessionId);
      if (!this.session) {
        this.router.navigate(['/sessions']);
        return;
      }
      this.doc = this.session.documents.find(d => d.id === docId) ?? null;
      if (!this.doc) {
        this.router.navigate(['/sessions', sessionId]);
      }
    });
  }

  goBack(): void {
    if (this.session) {
      this.router.navigate(['/sessions', this.session.id]);
    } else {
      this.router.navigate(['/sessions']);
    }
  }
}
