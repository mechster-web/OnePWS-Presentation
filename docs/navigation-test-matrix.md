# Navigation Test Matrix

| Area | Scenario | Expected result | Status |
|---|---|---|---|
| Presenter mode | Next/previous controls | Route moves immediately without long animation delay | Build verified; manual browser QA needed |
| Presenter mode | Search chapter | Results match title, keyword, outcome and scene ID | Build verified |
| Presenter mode | Temporary route | Add, start and reset route without source changes | Build verified |
| Self-guided mode | Open map | Spatial map opens and closes with keyboard/touch controls | HTTP smoke verified; manual QA needed |
| Self-guided mode | Optional branch | Branch opens and return path restores main route | Build verified |
| Autoplay mode | Active route | Autoplay follows navigation route and can be interrupted | Build verified |
| Exhibition mode | Opening route | Existing opening exhibition mode remains available | HTTP smoke verified |
| Standard opening | Journey selection | Selection activates matching navigation journey | Build verified |
| Condensed opening | Route handoff | Query mode still serves and hands off to route model | HTTP smoke verified |
| Full journey | Complete route | All referenced chapter IDs are existing chapters | Build verified |
| Role journey | Operations, architect, technology | Role routes resolve to existing chapters | Build verified |
| Outcome journey | Operator performance | Outcome route resolves to existing chapters | Build verified |
| Time-limited journey | Configured routes | Time routes map to journey IDs | Build verified |
| Optional branch | Return-to-journey | Branch stack returns to configured chapter | Build verified |
| Reduced motion | Map and transitions | Uses fast opacity/layout changes | Manual QA needed |
| Keyboard | Arrow, Page, g, m, c, p, h, End, s, r, Escape | Shortcuts dispatch navigation actions | Build verified |
| Touch | Swipe and edge controls | Existing swipe remains; edge buttons are touch targets | Manual QA needed |
| Offline | Manifest and service worker | PWA assets remain served | HTTP smoke verified |
| Media failure | Missing thumbnails | Destination still renders text and metadata | Build verified |
| Deep link | `#chapter-id` | Existing hash chapter loading preserved | HTTP smoke verified |
| Legacy chapters | Non-redesigned scene | Legacy renderer remains active | Build verified |
