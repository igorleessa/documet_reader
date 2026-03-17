import { Pipe, PipeTransform } from '@angular/core';
import { marked, Renderer } from 'marked';

/**
 * Renders a markdown string to HTML using the `marked` library.
 *
 * The pipe returns a plain `string`; Angular's `[innerHTML]` binding automatically
 * sanitizes it with SecurityContext.HTML (the default), which strips <script>,
 * dangerous SVG/MathML attributes, inline event handlers, and other XSS vectors.
 * No SecurityContext.NONE or bypassSecurityTrustHtml is required.
 *
 * Security posture:
 *   Angular's DomSanitizer (SecurityContext.HTML) runs on the rendered HTML when
 *   bound via [innerHTML], mitigating the SVG/MathML XSS advisories for
 *   @angular/compiler and @angular/core <= 18.2.14 (no upstream patch for Angular 17.x):
 *     • "Angular has XSS Vulnerability via Unsanitized SVG Script Attributes"
 *     • "Angular Stored XSS via SVG Animation, SVG URL and MathML Attributes"
 *
 * Task-list checkboxes:
 *   Angular's sanitizer strips <input> elements. This pipe overrides marked's list-item
 *   renderer to emit <span> elements instead, which are in Angular's allowlist and render
 *   visually as check/circle glyphs styled via .task-checked / .task-unchecked classes.
 */
@Pipe({ name: 'safeMarkdown' })
export class SafeMarkdownPipe implements PipeTransform {

  private readonly renderer: Renderer;

  constructor() {
    this.renderer = new Renderer();

    // Override list-item rendering: convert GFM task-list checkboxes from
    // <input type="checkbox"> (stripped by sanitizer) to styled <span> elements.
    this.renderer.listitem = (text: string, task: boolean, checked: boolean): string => {
      if (task) {
        const checkbox = checked
          ? '<span class="task-checkbox task-checked" aria-label="done">&#10003;</span>'
          : '<span class="task-checkbox task-unchecked" aria-label="pending">&#9675;</span>';
        return `<li class="task-list-item">${checkbox} ${text}</li>\n`;
      }
      return `<li>${text}</li>\n`;
    };
  }

  transform(markdown: string): string {
    if (!markdown) {
      return '';
    }

    // Return raw marked output as a string. Angular's [innerHTML] binding sanitizes
    // it automatically with SecurityContext.HTML before inserting into the DOM.
    return marked(markdown, {
      renderer: this.renderer,
      gfm: true,
      breaks: false,
    }) as string;
  }
}
