# DocumentReader

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

A Markdown document viewer that lets you drop `.md` files into `src/assets/docs/` and view them with full visual rendering — headings, tables, code blocks, task lists, blockquotes, and more.

## Adding Documents

1. Place your `.md` file in `src/assets/docs/`
2. Register it in `src/app/services/doc.service.ts` inside `getDocuments()`
3. Run the app and click the document card

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

---

## Security Notes

This application uses Angular 17.3.x. Several advisories affecting this version range have been reviewed. Below is a summary of applicability and mitigations applied.

### XSRF Token Leakage via Protocol-Relative URLs — `@angular/common`

| Advisory | Affected | Upstream fix |
|----------|----------|--------------|
| [XSRF token leakage](https://github.com/advisories/GHSA-hqmp-g7ph-x543) | 17.x – 19.2.15 (all versions before 19.2.16) | 19.2.16 / 20.3.14 / 21.0.1 |

**Status:** No upstream patch for Angular 17.x.

**Mitigation applied:** `UrlGuardInterceptor` (`src/app/interceptors/url-guard.interceptor.ts`) blocks any HTTP request whose URL starts with `//` (protocol-relative syntax). This eliminates the specific attack vector regardless of the Angular version. All HTTP requests in this application use relative paths (`assets/docs/...`) and cannot be manipulated by this attack.

---

### XSS via i18n Attribute Bindings — `@angular/compiler` / `@angular/core`

| Advisory | Affected | Upstream fix |
|----------|----------|--------------|
| XSS in i18n bindings | 17.0.0 – 18.2.14 | Not available for 17.x / 18.x |

**Status:** No upstream patch for Angular 17.x.

**Applicability:** This vulnerability affects Angular's template compiler when processing `i18n-*` attribute bindings (e.g., `i18n-title="..."`). **This application does not use Angular i18n in any template.** The vulnerability is not reachable.

---

### XSS via Unsanitized SVG Script Attributes & SVG Animation / MathML — `@angular/compiler` / `@angular/core`

| Advisory | Affected | Upstream fix |
|----------|----------|--------------|
| SVG script XSS | all versions up to and including 18.2.14 | Not available for 17.x / 18.x |
| SVG animation / MathML XSS | all versions up to and including 18.2.14 | Not available for 17.x / 18.x |

**Status:** No upstream patch for Angular 17.x.

**Mitigation applied:** These vulnerabilities relate to Angular's sanitizer not blocking certain SVG/MathML payloads. The previous implementation used `SecurityContext.NONE` (disabled Angular's sanitizer entirely for markdown output), which would have left this application fully exposed.

The current implementation uses `SafeMarkdownPipe` (`src/app/pipes/safe-markdown.pipe.ts`), which:
1. Renders markdown → HTML via `marked` with a custom renderer (task-list checkboxes become `<span>` elements, bypassing the need to disable the sanitizer)
2. Returns a plain `string`; Angular's `[innerHTML]` binding automatically passes it through `DomSanitizer` (`SecurityContext.HTML`), stripping `<script>`, dangerous SVG attributes (`onload`, `href` with `javascript:`), SVG `<script>` elements, MathML attributes, and event handlers
3. No `SecurityContext.NONE` or `bypassSecurityTrustHtml` is used

This is a defence-in-depth mitigation. Angular 17's sanitizer allowlist may not cover every attack variant described in these advisories, but the sanitizer is active and the highest-risk patterns (SVG `<script>`, event handlers, `javascript:` URLs) are blocked.

---

### Angular i18n XSS — `@angular/core`

| Advisory | Affected | Upstream fix |
|----------|----------|--------------|
| i18n XSS | all versions up to and including 18.2.14 | Not available for 17.x / 18.x |

**Status:** No upstream patch for Angular 17.x.

**Applicability:** Same as the i18n advisory above — this application does not use Angular i18n. Not reachable.

---

> **Recommendation:** Upgrade to Angular 19.x or later when the project requirements allow. All the above advisories have upstream patches in Angular ≥ 19.2.x.

