# Analytics Tracking Plan

Last updated: 2026-06-19

Tool: Google Analytics 4

Measurement ID: `G-2CJ15FLWPY`

Production page path: `/space-economy`

Production page location: `https://dandanstop.me/space-economy`

Project-level parameters attached to page view and custom events:

- `project_slug`: `space-economy`
- `project_name`: `Space Economy`

## Implementation Notes

Analytics code lives in `src/analytics.js`.

GA4 is enabled only on:

- `dandanstop.me`
- `www.dandanstop.me`
- local URLs with `?analyticsDebug=1`

Local development and automated browser tests do not send analytics hits by default. This avoids polluting production GA4 reports.

## Page View

GA4 config sends one page view with:

- `page_path`: `/space-economy`
- `page_location`: `https://dandanstop.me/space-economy`
- `page_title`: current document title
- `project_slug`: `space-economy`
- `project_name`: `Space Economy`

## Events

| Event name | Trigger | Key parameters |
| --- | --- | --- |
| `language_selected` | User changes language | `language`, `previous_language`, `label` |
| `intro_skipped` | User clicks Skip intro | `language` |
| `intro_replayed` | User clicks Replay intro | `language` |
| `intro_completed` | Guided intro completes automatically | `language` |
| `node_selected` | User selects a node through nav, 3D object, desktop wheel, or mobile scroll | `interaction_type`, `node_id`, `chapter_id`, `node_title`, `language` |
| `overview_opened` | Mobile sticky card opens Overview bottom sheet | `interaction_type`, `node_id`, `chapter_id`, `node_title`, `language` |
| `overview_closed` | Mobile Overview bottom sheet closes | `node_id`, `language` |
| `detail_tab_selected` | User selects Overview, Industry, or Engineering tab | `detail_layer`, `node_id`, `language` |
| `content_disclosure_opened` | User opens Deep dive or Sources | `disclosure_title`, `node_id`, `detail_layer`, `language` |
| `about_opened` | User opens About modal | `language` |
| `about_closed` | User closes About modal | `close_method`, `language` |
| `contact_clicked` | User clicks Contact mailto link | `contact_method`, `link_url`, `language` |

`node_selected.interaction_type` values currently include:

- `chapter_navigation`
- `model_raycast`
- `desktop_wheel`
- `mobile_scroll`

## Validation

After deployment:

1. Visit `https://dandanstop.me/space-economy`.
2. Open GA4 DebugView or Google Tag Assistant.
3. Confirm page view uses `/space-economy`.
4. Confirm custom events include `project_slug` and `project_name`.
5. Confirm local preview URLs do not appear in production reports unless `?analyticsDebug=1` is used.

Run local checks:

```bash
npm test
npm run build
npm run verify:browser
```
