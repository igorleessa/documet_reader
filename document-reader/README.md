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

This application uses Angular 17.3.x. All known advisories against the installed packages have been reviewed. Below is a current analysis.

### XSRF Token Leakage via Protocol-Relative URLs — `@angular/common`

| Advisory | Affected | Status for 17.3.12 | Upstream fix |
|----------|----------|--------------------|--------------|
| [XSRF token leakage](https://github.com/advisories/GHSA-hqmp-g7ph-x543) | All versions `< 19.2.16` | ⚠️ Affected — no upstream patch for 17.x | 19.2.16 / 20.3.14 / 21.0.1 |

**Mitigation applied:** `UrlGuardInterceptor` (`src/app/interceptors/url-guard.interceptor.ts`) blocks every outgoing HTTP request whose URL starts with `//` (protocol-relative syntax). This eliminates the specific attack vector — XSRF tokens can only leak to unintended origins via protocol-relative URLs, and this interceptor ensures no such URL can ever be dispatched. All HTTP requests in this application use relative paths (`assets/docs/...`).

---

### Stored XSS via SVG Animation, SVG URL and MathML Attributes — `@angular/compiler`

| Advisory | Affected | Status for 17.3.12 |
|----------|----------|--------------------|
| Stored XSS SVG/MathML | `>= 19.0.0-next.0, < 19.2.17` | ✅ Not affected — 17.3.12 is below the lower bound |
| Stored XSS SVG/MathML | `>= 20.0.0-next.0, < 20.3.15` | ✅ Not affected — 17.3.12 is below the lower bound |
| Stored XSS SVG/MathML | `>= 21.0.0-next.0, < 21.0.2`  | ✅ Not affected — 17.3.12 is below the lower bound |

All three affected ranges start at `>= 19.0.0-next.0` or higher. Angular 17.3.12 is outside every range; the advisory scanner flags this package by name but version matching shows 17.3.12 is not in any affected range.

**Defence in depth:** Although not required, `SafeMarkdownPipe` (`src/app/pipes/safe-markdown.pipe.ts`) keeps Angular's `DomSanitizer` (`SecurityContext.HTML`) active for all markdown-rendered HTML, which strips dangerous SVG and MathML attributes regardless.

---

### Angular i18n vulnerable to Cross-Site Scripting — `@angular/core`

| Advisory | Affected | Status for 17.3.12 |
|----------|----------|--------------------|
| i18n XSS | `>= 19.0.0-next.0, <= 19.2.18` | ✅ Not affected — 17.3.12 is below the lower bound |
| i18n XSS | `>= 20.0.0-next.0, <= 20.3.16` | ✅ Not affected — 17.3.12 is below the lower bound |
| i18n XSS | `>= 21.0.0-next.0, <= 21.1.5`  | ✅ Not affected — 17.3.12 is below the lower bound |
| i18n XSS | `>= 21.2.0-next.0, <= 21.2.0-rc.0` | ✅ Not affected — 17.3.12 is below the lower bound |

All four affected ranges start at `>= 19.0.0-next.0` or higher. 17.3.12 is not in any range. Additionally, this application contains zero `i18n` or `i18n-*` attribute bindings in any template, so this vulnerability class is not reachable regardless of version.

---

> **Recommendation:** Upgrade to Angular ≥ 19.2.x when the project requirements allow. The only advisory that genuinely affects Angular 17.3.12 is the XSRF one, which is already mitigated by `UrlGuardInterceptor`.


