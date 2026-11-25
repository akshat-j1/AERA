# V4 Phase 3

Phase 3 starts from `v4-phase2-baseline` at `7861d30`, which matched the local and remote `main` at the start of the audit. The comparison build was generated in an isolated directory from that tag. The work is on `feat/v4-motion-craftsmanship`.

The V3 independent audit scored 6.1/10 and 59% scope completion. The Phase 2 comparison carried forward Phase 1's direct-route prerenders and demo booking safeguards. It supplied a matched illustrative comparison pair and removed the long stylist pin identified in V3. The independent browser pass found that the translucent entrance and the Process transition still interrupted the homepage flow.

## Creative and interaction changes

- In Phase 2 the live wordmark showed through the closed glass, then overlapped the temporary entrance mark. Phase 3 uses one architectural photograph for the masked façade and both opaque door leaves. The lintel crest clears before the hinges move. The forward push reveals the live daylight room, with the mobile crop aligned to the doorway before it settles into the homepage.
- The offset room and portrait share a continuous paler backdrop with the opposing type strips and mirror room. The photograph and portrait travel at different rates. The mirror room opens diagonally into the selected treatment and pricing ledger, and its pointer, touch and keyboard paths share the same selection state.
- The Process has two direction-symmetric liquid boundaries. The scroll position selects the outgoing image, incoming image, local refraction and active copy. The displacement is inactive between boundaries. The compare frame holds its desktop position during its wipe, while manual input retains the divider until resuming scroll or leaving the frame.
- Phase 2's desktop stylist grid became a native portrait rail. The reels are staggered on desktop and swipeable on mobile. Inner pages share a shorter editorial header, with the service selector closer to the top. The configuration-driven catalogue, portfolio disclosures and demo appointment workflow remain available across all seven routes.

The Before and After images depict the same illustrative subject, studio background and broadly matched framing, with a visible change in hair shape and finish. Slight differences in facial contour, shoulder and garment detail are visible at the divider. Keep the illustrative disclosure with the pair.

## Reel provenance

The four clips and their poster frames were matched against their source pages and preview imagery. Each source page identifies its footage as Mixkit's Stock Video Free License.

| Local file | Source | Contributor |
| --- | --- | --- |
| `hair-brushing.mp4` | [40592 · Bride getting her makeup and hair done](https://mixkit.co/free-stock-video/bride-getting-her-makeup-and-hair-done-40592/) | `@rubenvelasco` |
| `scalp-wash.mp4` | [52141 · Woman receiving a facial treatment at the spa](https://mixkit.co/free-stock-video/woman-receiving-a-facial-treatment-at-the-spa-52141/) | `@mixkit` |
| `mirror-makeup.mp4` | [40583 · Stylist and makeup artist working on a bride](https://mixkit.co/free-stock-video/stylist-and-makeup-artist-working-on-a-bride-40583/) | `@rubenvelasco` |
| `bridal-brush.mp4` | [40560 · Bride admiring her makeup](https://mixkit.co/free-stock-video/bride-admiring-her-makeup-40560/) | `@edgarfernandez` |

The license supports use in a commercial or non-commercial project. The scope of permission to distribute standalone clips and stock-derived posters as part of a reusable public repository could not be confirmed. The Phase 3 tree removes those files. A default build features related AERA stills and links to each original clip. The published Phase 2 checkpoint and earlier Git history still expose the old blobs. [Mixkit Stock Video Free License](https://mixkit.co/license/modal/videoFree/), [Mixkit terms](https://mixkit.co/terms/).

With authorization to use the clips locally, place the MP4s above and optional matching `*-poster.jpg` files under `public/media/local-reels/`, then run `AERA_ENABLE_LOCAL_REELS=1 npm run build`. Available clips play on demand. Missing clips link to their source pages. `npm run build` omits the local footage even when the source files are available on disk.

## Verification

Evidence is stored locally in `audit-captures/v4-phase3/` with a comparison page, desktop and mobile recordings, all route stills, and raw lab data. This directory contains local QA recordings and is ignored by Git.

### Local lab comparison

Three cold Chromium `159.0.8154.6` runs per scenario on the same arm64 Mac and production preview. The desktop ran without throttling. Mobile used 4× CPU slowdown, 150 ms RTT, 1.6 Mbps down and 0.75 Mbps up. Readings are medians. JavaScript transfer is the sum of resource transfer sizes.

| Scenario | FCP, ms | LCP, ms | Entrance cleared, ms from navigation | CLS | JavaScript, kB |
| --- | ---: | ---: | ---: | ---: | ---: |
| Desktop homepage | 60 → 72 | 88 → 96 | 2,316 → 2,514 | 0.00006 → 0 | 171.26 → 171.24 |
| Mobile homepage, first visit | 764 → 908 | 860 → 980 | 3,055 → 3,350 | 0.00055 → 0.00018 | 171.26 → 171.24 |
| Mobile homepage, entrance seen | 852 → 860 | 868 → 876 | — | 0.00012 → 0.00056 | 171.26 → 171.24 |
| Mobile direct Services | 688 → 708 | 688 → 708 | — | 0.00050 → 0.00050 | 160.20 → 160.29 |

The studio image painted while the entrance dialog was still open. On throttled first-visit mobile runs the median LCP was 980 ms from navigation and the dialog cleared at 3.35 s. The dialog itself ran about 2.46 s. The opaque façade added about 11.1 kB to the transferred homepage document. Both builds made zero initial MP4 requests. The opt-in playback journey requested the two selected clips on first play. Their 206 responses reported body sizes of 376,741 and 295,225 bytes.

At 1440×900 the homepage document shortened from 8,334 px to 7,541 px. At 390×844 it shortened from 8,395 px to 7,100 px. Desktop Process frame interval p95 fell from 33.4 ms to 16.8 ms in both directions during the recorded scripted scroll. The full-page sweeps at 0.95, 0.55 and 4.5 viewports per second logged 13, 16 and 1 intervals above 25 ms in Phase 2 and zero in the Phase 3 sweep. These are headless `requestAnimationFrame` intervals recorded during playback capture on one machine. Field responsiveness and physical-device behavior require separate checks.

### Regression checks

- Type checking, 10 unit tests, client and SSR builds, and all prerenders passed.
- The Playwright suite passed all 19 applicable tests in both reel configurations. Each run had 38 project-filtered skips.
- Chromium covered seven routes and the 404 response at 1440×900, 1280×800, 768×1024 and 390×844. Axe returned zero violations across 32 route scans and three open-dialog scans. The route scans recorded zero broken images, horizontal document overflows and uncaught page errors.
- Browser interaction review covered Escape and skip, replay, mirror keyboard and touch selection, Process reversal, full comparison endpoints, divider drag and keyboard input, native vertical touch, both horizontal touch rails, and reduced-motion bypass. The opt-in reels confirmed single-playback and offscreen pause. The default build showed all four source links and omitted the local reel directory.
