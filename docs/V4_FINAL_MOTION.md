# V4 final motion and release handoff

The motion branch starts from approved visual commit `40006f8`. The independently audited `58641ed` remains available through the local `v4-motion-craftsmanship-baseline` tag.

## Motion at the initial polish checkpoint

- The Process shares the same scroll position for both photo plates, the liquid displacement and the active copy. Each boundary spans 0.78 of a stage interval, up from 0.50. The desktop maximum displacement drops from 76 to 69 and the touch maximum from 50 to 46. The original plate fills transparent edges during the wave. Desktop scrub settles over 180 ms and touch selection over 900 ms.
- The Process and comparison hosts use 156vh and 138vh on motion-enabled desktop. The comparison retains its full endpoints, keyboard controls, native vertical touch panning and the disclosure beside the approved illustrative pair. Minor facial contour differences remain in the pair.
- Desktop vertical scroll advances the actual native stylist overflow over 66% of a viewport, without a third pin. The available horizontal range is measured from the rail on update. Manual controls, pointer input and card focus take priority. Narrow and touch layouts keep their native swipe. Reduced-motion desktops show the complete static grid.
- The Alternative A palette, accessible shades, and approved photographs are retained. See the visual handoff for their provenance and the limitations of the campaign comparison.

## Media and release decision

The pre-cleanup public refs placed `main` and the Phase 2 tag at `7861d30`. Those refs exposed four MP4 files and four derived posters at `public/media/videos/`. The V3 branch and tag held different files at the same paths. This branch removes the stock-derived Phase 2 screenshot from its current tree. The latest production output serves the existing AERA stills and directs visitors to the Mixkit source pages. The opt-in local player remains available for authorized footage.

Mixkit's free item licence permits commercial and non-commercial project use. The provider's terms restrict supplying items to third parties except as expressly permitted. Those terms and the item pages do not establish rights to publish standalone clips or posters through a public repository or reusable client package. The earlier V3 sources and asset-level handoff rights for the generated concept photos remain open. [Mixkit Stock Video Free License](https://mixkit.co/license/modal/videoFree/) · [Mixkit terms](https://mixkit.co/terms/)

Keep the existing public repository decision with its owner. Seek the required permissions for each generation of footage and derivative poster, or provide a clean-history export with owned or cleared media. Separately decide how to address already-public refs, tags, caches, forks, clones, releases and hosted copies. A normal merge would leave existing historical objects reachable. GitHub explains the limits of rewriting even after affected refs are changed. [GitHub history and cache documentation](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

## Local verification

- Chromium at 1440×900, 1280×800, 768×1024 and 390×844 returned the seven route documents and a real unknown-document 404. All 32 route scans reported zero axe violations, broken images, console errors or horizontal document overflow. Type checking, ten unit tests and nineteen applicable Playwright tests passed.
- At 1440×900 the two pins consumed 568 px and 406 px, down from 604 px and 478 px. Desktop page height was 7,433 px, down from 7,541 px. The approved and final mobile pages both measured 7,120 px. Mobile comparison touch panning and native stylist swipe moved 145 px and 309 px respectively in the recorded run.
- At 560 px/s the approved recording registered 20 forward ripple frames and the final recording 27. Peak desktop scale was 69, down from 76. Both retained approximately 16.7–16.8 ms p95 frame intervals in the Process samples. One final slow forward frame interval exceeded 25 ms. Wheel input advanced the final desktop stylist rail about 208 px and reversed to the start. These are loopback Chromium samples.
- Preview verified real 404 responses for missing JS, image, video and sitemap paths. An isolated build with a test origin kept the canonical and Open Graph URL synchronized across client navigation. Authorized local video requested two clips on demand through HTTP 206, paused the previous clip and paused offscreen. The default build retained zero MP4s even when files were supplied locally.
- The lockfile is unchanged. The 27 November OSV npm snapshot was checked locally against all 224 entries, with zero matching active advisories at that snapshot.

## Vercel checklist

1. Use the version-controlled Vite build and `dist` output in `vercel.json`. The build command disables local reel packaging. Verify the deployed artifact contains zero MP4s or stock posters.
2. Set `VITE_AERA_SITE_URL` to the approved HTTPS origin. Without it the build omits absolute canonical and share URLs. The fictional showcase retains `noindex, follow`, no sitemap or business JSON-LD, no live WhatsApp target and no appointment transport.
3. In an authorized Vercel preview, verify all seven routes, `/services?pillar=sculptural-colour`, the unknown document, and missing JS, image and MP4 paths. Confirm the custom 404 response and the status and content type of missing resources. [Vercel static configuration](https://vercel.com/docs/project-configuration/vercel-json) · [Vercel custom error pages](https://vercel.com/docs/custom-error-pages)
4. Verify the deployed security headers, redirects, HTTPS, runtime CSP and caching under the actual hostname. The preview enforces the same document CSP locally. The production build checks the entrance bootstrap against the CSP hash. Retest the entrance, fonts, route transition, mirror, SVG, comparison and booking against the deployed policy. Check immutable assets separately from default HTML and media caching.
5. Check actual iOS and Android hardware, screen-reader announcements and the eventual public origin's field performance. Gather consented or otherwise cleared photographs and releases before a real salon handoff.

Local comparison evidence is under `audit-captures/v4-final-motion-polish/`. The repository configuration disables Git-triggered Vercel deployments. The owner handles the manual deployment and hosted verification.

## Scroll pacing follow-up

Desktop Process and Before & After now use 176vh and 152vh. At 1440×900 that adds 180 px to the Process pin and 126 px to the comparison wipe. Desktop and tablet scroll select the Process stage, and each neighboring-stage transition then plays for about 0.8 s, even if scrolling stops. Crossing a threshold in reverse retargets the same ripple without stacking animations. Tablets keep a natural vertical layout, and the comparison uses a wider viewport range below the desktop breakpoint. Phones retain the Process stage controls.
