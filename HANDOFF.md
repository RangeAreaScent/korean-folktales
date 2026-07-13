# Korean Folktales — Coloring Storybook · Handoff

> **읽기 시간 ~15분** · 새 세션 시작 시 컨텍스트를 즉시 잡기 위함.
> 코드 만지기 전에 §1·§2·§3·§9만 먼저 훑고, 막힐 때 §10·§11 참조하세요.

---

## 1. 한 줄 요약

**Korean Folktales — Coloring Storybook for Kids.**
미국·글로벌 K-content 관심층 + 자녀 둔 부모 타깃 **분기형 한국 옛이야기 색칠 책** 웹앱.
8개 옛이야기 × 5장면 = 40 도안 · 한/영 이중언어 · 클릭 wavefront 색칠 · PDF/PNG 공유 · 갤러리.

**라이브**: https://koreanfolktales.ink
**GitHub**: https://github.com/RangeAreaScent/korean-folktales
**Vercel 프로젝트**: `korean-folktales` (rangeareascent-s-projects)

핵심 차별점:
1. **8 한국 전래동화** (해님 달님·해녀와 인어·선녀와 나무꾼·혹부리 영감·콩쥐와 두꺼비·별주부전·흥부와 놀부·금도끼 은도끼)
2. **이중언어 (한/영)** — 콘텐츠 + UI 전부, localStorage 기억
3. **🔊 한국어 발음** (Web Speech API)
4. **인스타 친화 4:5 공유 이미지** + 페이지별 공유 + Web Share API
5. **갤러리** — localStorage 12권 cap, 재공유/삭제
6. **플립북 캐러셀** — 완성 후 표지 + 각 장면 좌우 슬라이드
7. **분기 + 정통 결말** (PROMPTS_V2 콘텐츠) — Y구조 4막 (1·2 공통 → 3 분기 → 4 정통)

---

## 2. 현재 버전 · v1.2 — iOS 앱 스캐폴딩 + 모바일 팔레트 iOS 재설계

> **v1.2 한눈에**: (1) Capacitor로 iOS 네이티브 앱 프로젝트 추가 (라이브 사이트 WebView 래핑, 시뮬레이터 빌드/실행 검증 완료), (2) 모바일 팔레트를 iOS 시스템 UI 톤으로 전면 재설계 (peek/expand 바텀시트 + segmented control + blur material), (3) 툴바를 그림 위 floating → 팔레트 위 별도 줄로 (그림 침범 제거) + 하단 고정 시트, (4) 모바일 캔버스를 세로로 크게 + 가운데 배치해서 확대 시 화면 전체 사용, (5) 배경 회전을 About/Privacy/SEO 페이지까지 확장, (6) 페이지 인디케이터를 헤더로 이동, (7) lint 클린업. 상세는 §4.20-4.23, §15.

| 분야 | 상태 |
|---|---|
| **iOS 앱 (v1.2 신규)** ⭐ | Capacitor로 iOS 네이티브 프로젝트 (`ios/`, `capacitor.config.ts`). 라이브 사이트(`server.url`)를 WKWebView로 래핑 — 콘텐츠 업데이트는 Vercel 배포로 즉시 반영, 앱 재심사 불필요. `xcodebuild` 시뮬레이터 빌드 + 실행 검증 완료. **미완**: Apple Developer 계정(2주 내), 아이콘/스플래시, AdMob, StoreKit "광고 제거" IAP, App Store Connect 제출 (§4.20, §15) |
| **콘텐츠 — 8 스토리 모두 V2.5 라이브** ⭐ | 8 스토리 V2.5 Y구조 5장면 + 풍부 narration + minhwa 스타일 PNG production. 모든 40 scene PNG가 **2048×2048** (waifu2x cunet으로 1024→2048 업스케일) |
| **앱 코어** | 클릭 wavefront · 그라데이션 3종 · undo · **줌 1-8x** · **erase mode** · pan(Space/한 손가락) · 트랙패드 핀치/Ctrl+휠 · 풀스크린 · 누출 감지 |
| **캔버스 줌 (v1.0 핀치 개선)** | **두 손가락 핀치**: midpoint anchor + 1% step + rAF coalesce (zigzag 제거). **한 손가락 드래그**: zoom > 1 일 때 pan으로 동작. **v1.1: 트랙패드 핀치/Ctrl+휠**도 동일 anchor 로직으로 지원 (데스크탑) |
| **Erase 기능 (v1.0 신규)** | `floodfill.eraseRegion()` — line-art boundary, color tolerance 무시 → gradient/radial fill도 깨끗 erase. Desktop + Mobile control bar 모두 토글 버튼 |
| **Scene 진행** | Y구조 3-state — `nextId` linear · `choices` branching (모바일: Continue 후 reveal) · `endingLabel` ending |
| **사운드 (v1.1: 실제 오디오 샘플로 교체)** | paint1/2/3.m4a 순환 (클릭 즉시 재생, 무음 트림) · page-turn.mp3 · chime.m4a · **BGM 피아노 루프 + 전용 토글** (기본 OFF, SFX와 독립) · 한국어 발음 · flat SVG 음소거/BGM 토글 |
| **PDF export** | US Letter · cover Option C (커스텀 아이콘 + tagline + 글로서리 + origin) · narration paragraph 자동 페이지네이션 · isEnding = `!!endingLabel` |
| **PNG export** | Instagram 4:5 표지/장면별 + Web Share |
| **갤러리** | localStorage 12권 cap, 픽커 상단 carousel, 재공유/삭제 |
| **최종 뷰** | 플립북 캐러셀 (표지 + 각 장면 좌우 슬라이드, 키보드 ←/→, 페이지별 share) |
| **Narration** | Desktop: 스크롤형 max-h 36vh inline. Mobile: **NarrationModal** 자동 열림 (per scene) + listen-in-Korean + locale toggle |
| **데스크탑 레이아웃** | max-w **1700px** · canvas max-w **768px** · sidebar **360px** · canvas image **rounded border 제거 → shadow only** · max zoom **8x** · 캔버스+팔레트 그룹 중앙 정렬(넓은 창에서 간격 고정, `minmax(0,768px)_360px` + justify-center) |
| **모바일 캔버스 (v1.2 확대/중앙)** | 뷰포트가 헤더~하단시트 사이 세로 공간을 채움 → 확대 시 화면 전체 사용. 그림은 정사각형 유지: 내부 콘텐츠 `calc(100cqmin * zoom)` (`container-type: size`), `m-auto`로 zoom 1엔 중앙(위아래 letterbox)·overflow 시 top-left origin (핀치 anchor 수식 보존). 데스크탑은 그대로 정사각형 (§4.22) |
| **DesktopControlBar** | 캔버스 바로 아래 inline strip — `[↶ Undo][🗑 Erase]    [⊖ 100% ⊕]    [⛶ Fullscreen]`. 100% 버튼 tooltip에 트랙패드 핀치 안내 (v1.1) |
| **MobileToolbar (v1.2 재구성, 이전 MobileControlBar/MobileFloatingToolbar)** | 캔버스와 팔레트 **사이의 별도 줄** — `[↶ 🗑]  ...  [📖][🔊][🎵][Continue/Choose →]` 유리 캡슐. 그림을 침범하지 않음. 페이지 인디케이터(1/N)는 v1.2에서 **헤더 우측**으로 이동 (툴 캡슐에 있으면 버튼처럼 오해) |
| **모바일 하단 시트 (v1.2 신규 구조)** | 툴바 + 팔레트를 `fixed inset-x-0 bottom-0`로 화면 하단 고정. 팔레트 확장 시 시트가 **위로** 자라남 (네이티브 바텀시트). work-area는 `flex-1` + `pb-[15.5rem]`로 시트 높이 예약, 캔버스를 세로 중앙 정렬 |
| **ColorPalette desktop** | **More 토글 제거**, always-expanded. 새 순서: themes → grid → fill (작은 직사각형 + 캡션) → recent → harmony → contrast → **current 맨 아래** (color + L slider + custom picker) |
| **MobilePaletteSheet (v1.2 iOS 재설계)** | **peek/expand 바텀시트** — 기본은 테마 chip + 색 grid + fill style(라벨+segmented control 한 줄)까지만, "More colors" 핸들(탭/드래그)로 recent/harmony/contrast/L슬라이더 펼침. iOS 재질: `backdrop-filter blur+saturate` 시트, grouped card, segmented control(슬라이딩 흰 pill), 네이티브 슬라이더 thumb(`.ios-native-slider`), SF-Symbols 톤 eyedropper 아이콘. 스와치 21/19px로 축소. tint = 회전 배경 accent (§4.21) |
| **배경 톤 (v1.1 회전형, v1.2 전 페이지 확장)** | 고정 Cool minimal white → **세션당 무작위 회전 6색** (단청 주홍·등불 자주·청자 세이지·홍시 감·자수정 플럼·쪽빛 하늘, 오방색). `sessionStorage`로 방문 내내 유지. **액센트도 함께 회전** (팔레트별 accent hex). **v1.2**: 픽커/색칠 화면뿐 아니라 **About·Privacy·8개 `/folktales/[slug]` SEO 페이지**까지 확장 (서버 컴포넌트는 `BackgroundShell`이 CSS 변수 `--accent`/`--bg-from`/`--bg-to`로 주입) |
| **팔레트 테마명 IP-safe** | Ghibli 4종 (Totoro/Spirited/Howl/Mononoke) → **Sunlit Forest / Lantern Night / Cloud Garden / Deep Forest** |
| **키보드 단축키** | `⌘Z` undo · `+/-/0` zoom (Shift 없이) · `F` fullscreen · `Space` pan · `Cmd+/-`는 브라우저가 reserved (override 불가). 하단 footer shortcut strip은 **좌측 정렬** (v1.1, 이전 중앙 정렬) |
| **픽커 히어로 카피 (v1.1 재작성)** | "Create your own storybook" (SaaS 스펙-리스트 톤) → **"Color your way through a Korean folktale"** — 서술형 문장 2줄로 재작성, trust pill도 자연스러운 표현으로 정리 |
| **타이포** | Gowun Batang display tier · Geist sans · Geist mono |
| **인프라** | Next.js 16, React 19, Tailwind 4 (Turbopack), Vercel 자동 배포 |
| **SEO / 검증 (v1.1 확장)** | Vercel Analytics · GSC + **Bing Webmaster Tools** verified (meta tag) · **Pinterest 도메인 인증** (meta tag) · sitemap.xml · robots.txt · multi-size favicon.ico + icon.png 192px · 정적 hero OG (landscape + square) · 8 SEO 페이지 |
| **수익화 (v1.1 착수)** | **Google AdSense 스크립트 삽입 + `ads.txt`** — 심사 요청 완료, 승인 대기 중. Raw `<script>` 태그 사용 (next/script 아님 — §10.26 참고) |
| **iOS Safari fix** | viewport meta (`maximumScale: 1, userScalable: false`) · `touch-action: manipulation` body · StoryPicker sibling-button 패턴 (nested interactive 회피) · `allowedDevOrigins` in next.config.ts (LAN dev) |

---

## 3. 디렉터리 구조

```
src/
├── app/
│   ├── layout.tsx                  providers + floating cluster + metadata + Analytics
│   ├── page.tsx                    메인 게임 페이지 (~1100 lines, PDF/PNG export 포함)
│   ├── globals.css                 Tailwind @theme + narration-scroll 스타일
│   ├── favicon.ico                 multi-size ICO (16/32/48) — Google/browser favicon (v0.9)
│   ├── icon.png                    192×192 tiger (Google 권장 favicon 사이즈)
│   ├── apple-icon.png              iOS home icon (1024×1024 tiger)
│   ├── opengraph-image.png         정적 OG landscape (1200×630, half-colored hero, v0.9)
│   ├── opengraph-image.alt.txt     OG alt 텍스트
│   ├── opengraph-image2.png        정적 OG square (1200×1200, Google/Pinterest용)
│   ├── opengraph-image2.alt.txt    동일 alt
│   ├── robots.ts                   /robots.txt
│   ├── sitemap.ts                  /sitemap.xml (11 URL)
│   ├── about/page.tsx              About 페이지 (한/영)
│   ├── privacy/page.tsx            Privacy 페이지 (한/영)
│   └── folktales/[slug]/page.tsx   8 SEO 페이지 (모달과 동일 콘텐츠 + Other folktales cross-links)
├── lib/
│   ├── story.ts                    ⭐ 8 스토리 데이터 (bilingual + originalTale + STORY_SLUGS)
│   ├── i18n.tsx                    LocaleProvider + useLocale + Localized type
│   ├── strings.ts                  UI 문자열 사전 (~80개)
│   ├── colors.ts                   8 테마 + harmony/contrast + HSL
│   ├── floodfill.ts                wavefront 애니메이션 + 3 fill style + 누출 감지 (maxFillRatio)
│   ├── sound.ts                    ⭐ v1.1: 실제 오디오 샘플 재생 엔진 (paint 순환 / pageTurn / chime / bgm loop) — 이전 Web Audio 절차적 합성에서 교체
│   ├── sound-provider.tsx          SoundProvider + useSound hook (v1.1: bgmOn 상태 추가, SFX와 독립)
│   ├── backgrounds.ts              ⭐ v1.1 신규 — 회전 배경 팔레트 6종 + accent hex + `useSessionBackground()` (sessionStorage 기반)
│   └── gallery.ts                  localStorage 12 책 저장 + 포맷
├── components/
│   ├── StoryPicker.tsx             픽커 (갤러리 carousel + 8 카드 + trust pills + About/Privacy 푸터). v1.1: 회전 배경/액센트 적용
│   ├── ColoringCanvas.tsx          캔버스 — 줌/팬/핀치(midpoint anchor)/풀스크린/erase mode. `hideToolbar` 항상 true. 트랙패드 핀치(ctrl+wheel). v1.2: 모바일 뷰포트 세로 확대 + cqmin 정사각형 유지 + elastic 핀치 bound
│   ├── ColorPalette.tsx            데스크탑 사이드바 (always-expanded, themes→grid→fill→recent→harmony→contrast→current)
│   ├── MobilePaletteSheet.tsx      ⭐ v1.2 iOS 재설계 — peek/expand 바텀시트, segmented control, blur material, 네이티브 슬라이더
│   ├── DesktopControlBar.tsx       ⭐ 데스크탑 캔버스 아래 control strip (undo / erase / zoom / fullscreen). max-w 768px
│   ├── MobileToolbar.tsx           ⭐ v1.2 (이전 MobileControlBar/MobileFloatingToolbar) — 캔버스와 팔레트 사이 유리 캡슐 줄. undo+erase / 📖·🔊·🎵·primary
│   ├── BackgroundShell.tsx         ⭐ v1.2 신규 — 서버 컴포넌트(SEO 페이지)를 회전 배경으로 감싸는 client 래퍼. CSS 변수 `--accent`/`--bg-from`/`--bg-to` 주입
│   ├── NarrationModal.tsx          ⭐ 모바일 narration 모달 — 매 scene 자동 열림. LocaleToggle + listen-in-Korean 버튼 footer
│   ├── OriginalTaleModal.tsx       원작 모달 (Web Speech 발음 + Start coloring + View as page)
│   ├── SavedBookViewer.tsx         갤러리 책 보기 (재공유·삭제)
│   ├── LocaleToggle.tsx            한/ENG — desktop floating cluster + NarrationModal footer
│   ├── SoundToggle.tsx             flat SVG 흑백 음소거 토글
│   └── BgmToggle.tsx               배경음악 on/off (음표 아이콘, SoundToggle과 동일 스타일)

ios/                                ⭐ v1.2 신규 — Capacitor iOS 네이티브 프로젝트 (Xcode). `ios/App/App.xcodeproj`. Pods/build 산출물은 gitignore
capacitor.config.ts                 ⭐ v1.2 신규 — appId com.koreanfolktales.app, server.url=라이브 사이트, webDir=capacitor-www (플레이스홀더)
capacitor-www/index.html            ⭐ v1.2 신규 — Capacitor가 요구하는 최소 webDir (실제로는 server.url 로드, 안 쓰임)

public/
├── sounds/                         paint1/2/3.m4a, page-turn.mp3, chime.m4a, bgm.m4a (압축본, 원본은 로컬 /sound/ gitignore)
├── ads.txt                         Google AdSense publisher 인증 라인
└── coloring/
    ├── PROMPTS.md                  V1 도안 프롬프트 (참고용)
    ├── PROMPTS_V2.md               ⭐ V2 풍부 narration + Y구조 + 보더 스펙 (모든 8 스토리)
    ├── ICON_PROMPTS.md             스토리 카드 아이콘 프롬프트 (Gemini 생성용)
    ├── 01-folktale/                해님 달님    (start, forest, well, ending-sky, ending-mountain)
    ├── 02-haenyeo/                 해녀와 인어
    ├── 03-woodcutter/              선녀와 나무꾼
    ├── 04-dokkaebi/                혹부리 영감
    ├── 05-kongjwi/                 콩쥐와 두꺼비
    ├── 06-byeoljubu/               별주부전
    ├── 07-heungbu/                 흥부와 놀부
    ├── 08-woodman/                 금도끼 은도끼
    ├── icons/                      8 라인아트 카드 아이콘 (storyId.png, 투명 배경)
    └── Backup_v1/                  v0.6 시점 모든 도안 백업 (git tag v0.6-scenes-original 와 동일)

scripts/ (개발 편의 — v1.0)
├── dev-lan.js                  `npm run dev:lan` — 0.0.0.0 바인딩 + LAN IP + QR 코드 출력 (iPhone/iPad 테스트)
└── upscale-2x.js               sharp Lanczos3 batch upscaler (대체로 waifu2x 사용)

루트 (꼭 알 것):
HANDOFF.md                       이 문서
PINTEREST_PLAYBOOK.md            Pinterest 마케팅 전략 (11 섹션)
README.md                        Next.js 기본
AGENTS.md / CLAUDE.md            프로젝트 메타
Start.command                    Mac 더블클릭 → dev + 브라우저
next.config.ts                   ⭐ `allowedDevOrigins` (10.0.0.*, 192.168.*.*, 172.16.*.*) — LAN dev access
.screenshots/                    🔻 모든 스크린샷/디버그 PNG는 여기로 (gitignore)
.backups/coloring-v0.6/          v0.6 도안 로컬 백업 (gitignore)
.backups/coloring-NN-storyId-1024/  각 스토리 1024 원본 백업 (waifu2x 업스케일 전, 롤백용)
.backups/coloring-04-dokkaebi-prev/  Story 4 prompt 강화 전 버전 (혹부리)
.claude/launch.json              ⭐ v1.1 신규 — Preview 도구용 dev server 설정 (`autoPort: true`로 3000 충돌 시 자동 대체 포트)
/sound/                          ⭐ v1.1 신규 — 사운드 원본 소스 (미압축, gitignore). 압축본만 public/sounds/에 커밋

외부 도구 (Mac local):
~/Tools/waifu2x/waifu2x-ncnn-vulkan-20250915-macos/  — Apple Silicon 바이너리. line-art 1024→2048 cunet 모델
```

---

## 4. 핵심 기술 결정 (Why these?)

### 4.1 i18n — custom Context, not next-intl
- 안정성·간결성 우선. 의존성 0, 2개 언어 + 유한 콘텐츠.
- `Localized = { ko: string; en: string }` 타입 모든 콘텐츠/UI에 적용.
- localStorage `coloring-storybook:locale` + `navigator.language` 자동 감지.

### 4.2 사운드 — Web Audio 절차적 합성
- 오디오 파일 0개, 번들 증가 0, 로딩/CORS 0.
- `plop()`은 물방울 톤 (5음 펜타토닉 C4-A4 랜덤 + 직후 sub-octave)
- pageTurn (~220ms 노이즈), chime (~750ms 삼화음)

### 4.3 한글 발음 — Web Speech API
- `speechSynthesis.speak(utter)` `lang = "ko-KR"`, `rate = 0.85`

### 4.4 PDF/PNG export — jspdf + html2canvas (동적 import)
- 동적 import로 메인 번들 안 키움
- PDF: A4 표지+장면별 ~1.5MB
- PNG: 1080×1350 Instagram 4:5
- **표지 + 장면별 share 둘 다 지원** (page.tsx에 `generateShareImage` + `generateScenePng`)

### 4.5 갤러리 — localStorage FIFO
- `coloring-storybook:books:v1` 12권 cap, quota error 시 자동 evict
- 표지 dataURL + 메타만 저장 (모든 장면 X)

### 4.6 폰트 — Gowun Batang via next/font
- `--font-gowun` → `--font-display`

### 4.7 폴더 구조 — `{NN}-{storyId}/{sceneId}.png`
- v0.7부터 숫자 prefix (01-folktale, …, 08-woodman) — 파일 시스템 순서가 캐논 순서 일치

### 4.8 누출 감지 — floodfill.ts
- `maxFillRatio: 0.55` 기본 — 한 클릭이 캔버스 55% 넘게 칠하면 abort + 친절한 hint
- 끊긴 선으로 색이 페이지 전체로 새는 것 차단

### 4.9 플립북 캐러셀
- `transition-transform duration-500 ease-out` 으로 부드러운 슬라이드
- 키보드 ←/→ + 도트 인디케이터 + pageTurn 사운드
- 표지 + N장 + 페이지별 share 버튼

### 4.10 V2 narration 스크롤
- 옛이야기 톤 narration이 길어서 카드 안에 max-h 36vh + 상/하 페이드 마스킹 + 멀티-paragraph (\\n\\n split)
- `globals.css`에 `.narration-scroll` 클래스

### 4.11 Scene 3-state (Y구조용)
`src/lib/story.ts`의 `Scene` 타입은 3가지 상태 중 하나만 가짐:
- **`nextId: SceneId`** — Linear scene. 단일 "Continue → / 다음 이야기로 →" 버튼. Y구조의 1·3a·3b 위치
- **`choices: [Choice, Choice]`** — Branching scene. 2개 카드. Y구조의 2번 위치
- **둘 다 없음 + `endingLabel`** — Ending scene. "그림책 완성하기" 버튼. Y구조의 4번 위치

`page.tsx` 렌더링에서 `choices ? branching : nextId ? linear : ending` 순서로 분기.
Linear 진행은 기존 `handleChoice(nextId)` 재활용 (chosenLabel은 null).

### 4.12 V2.5 한국 그림책 스타일라이제이션 레이어
V2 기본은 "한국적 요소가 있는 깔끔한 색칠 도안"이지만, V2.5는 한 단계 위 — **한국 전통 그림책 일러스트**.

핵심 차이:
- **구름** → 단순 블롭 ❌ → 민화 구름 무늬 (둘둘 말린 곡선)
- **해/달** → 직선 광선 ❌ → 곡선 광선 + 선택적 부드러운 얼굴
- **파도** → 단순 곡선 ❌ → minhwa 파도 무늬 (말린 curl)
- **산** → 작은 봉우리 ❌ → layered 실루엣 + ridge accent
- **인어·선녀** → 평범 strand 머리 ❌ → spiral curl 끝 + 한국 머리장식
- **제주 초가** → 단순 돔 ❌ → 로프 격자 패턴 명시
- **배경 액센트** → 매화 sprig·단청 띠 등 한국 시그니처

V2.5는 옵트인 레이어 — 각 스토리 PROMPTS_V2.md 상단에 "V2.5 적용 중" 마커가 있으면 베이스 + V2.5 레이어 + 스토리 체크리스트 + Subject 블록을 합쳐 Gemini 입력.

**현재 V2.5 적용 상태 (v1.0):**
- ⭐ 8 스토리 전부 V2.5 production 라이브
- 모든 40 PNG가 2048×2048 (waifu2x cunet 업스케일)
- Story 4 (혹부리) prompt 강화 — 혹 위치/크기/silhouette anchor 명시 (Mickey-ears 비유)

### 4.13 UI 컴포넌트 분리 패턴 (v1.0)
캔버스의 줌/undo/erase 같은 컨트롤이 ColoringCanvas 내부에 있으면 외부 layout 자유도가 떨어짐. v1.0에서:
- ColoringCanvas는 `hideToolbar` 항상 true → 내부 floating toolbar 비활성
- 외부 컴포넌트 두 개로 분리:
  - **DesktopControlBar** (`hidden lg:flex`) — 캔버스 아래 inline strip
  - **MobileControlBar** (`lg:hidden`) — 캔버스 아래 + primary action 내장
- ColoringCanvas는 `onZoomChange`/`onHistoryChange` callback과 imperative handle (`zoomBy`/`resetZoom`/`undo`/`setEraseMode`/`toggleFullscreen`)로 외부 toolbar와 통신
- 단일 source of truth는 캔버스 내부 state, 외부 bar는 reactive mirror

### 4.14 Erase 기능 (v1.0)
`floodfill.ts`의 `eraseRegion()`:
- 클릭한 픽셀에서 시작
- **line-art (검은 픽셀) 경계까지** flood
- 색 tolerance 무시 → gradient/radial fill 영역도 깨끗하게 white로 복구
- prior snapshot return → undo 스택에 push
ColoringCanvas는 `eraseModeRef` ref + click handler 분기. Mode toggle은 imperative `setEraseMode()`.

### 4.15 핀치 zoom anchor + smoothness (v1.0)
이전: midpoint 계산 없이 단순 setZoom → 항상 좌상단 anchor + 5% step → zigzag.
지금:
- 매 touchmove마다 midpoint local 좌표 기준 scrollLeft/Top 보정 (`(scroll + local) * ratio - local`)
- 1% step (was 5%)
- React state 업데이트는 rAF coalesce — DOM scroll 즉시 반영, setZoom은 다음 프레임 1회
- 한 손가락 드래그 (zoom > 1)에서 자동 pan 모드 진입 (`touchPanRef`)

### 4.16 배경 톤 결정 — Cool minimal white
초기: amber-50/rose-50 그라데이션 (cake-ivory). v1.0에서 사용자 피드백으로 여러 번 iterate:
1. 한지 (#faf6ea→#f3ecd5) — amber와 너무 비슷
2. 진한 hanji (#f3ecd5→#d8c89a) — 노란 hue 과함
3. 기와 (#c8d3df→#566677) — 너무 어두움
4. 백자 / 달항아리 / 청자 / 안개 — cream 계열 거부됨
5. 연한 슬레이트 (#eef1f5→#c3cdd8) — 살짝 차가움
6. Warm museum paper (#fbfaf6→#ebeae0) — cream 흔적 남음
7. **Cool minimal white (#fafbfc → #f3f5f7 → #e7eaee)** — 최종. 색칠 art가 warmth 담당, 배경은 neutral 무대

박스 borders도 동시에 amber-100/200 → gray-400/500 으로 (차가운 배경에 따뜻 amber 액센트는 hover 시에만 등장).

**v1.1 추가 피드백**: 위 "Cool minimal white" 최종안도 결국 "차갑고 회색적, 병원 느낌, 설화 분위기와 안 어울림"으로 재차 거절됨. §4.17 참고 — 고정 배경 자체를 폐기하고 회전형으로 교체.

### 4.17 배경 + 액센트 회전 시스템 (v1.1)
`src/lib/backgrounds.ts` — 고정 배경을 폐기하고 **세션당 무작위 회전**으로 교체:
- `BACKGROUNDS: PageBackground[]` — 6개 팔레트 (`from`/`to` 그라데이션 hex + 팔레트 전용 `accent` hex). 오방색(청·적·황) 스펙트럼 참고해 색상 자체가 다른 방향으로 선정 (단청 주홍·등불 자주·청자 세이지·홍시 감·자수정 플럼·쪽빛 하늘)
- `useSessionBackground()` — SSR-safe 훅. 서버 렌더/최초 페인트는 `BACKGROUNDS[0]` 고정 (hydration mismatch 방지), client `useEffect`에서 `sessionStorage` 확인 → 있으면 재사용, 없으면 무작위 선택 후 저장
- **"세션"의 의미**: 같은 탭에서 픽커 ↔ 색칠 화면 이동은 `sessionStorage` 덕에 같은 색 유지 (Home()과 StoryPicker가 별개 컴포넌트라도 동일 키 공유). 새 탭/새 방문에서 재추첨
- `accentAlpha(hex, alpha)` 헬퍼 — Tailwind의 `text-amber-700/80` 같은 색+투명도 조합을 런타임 계산 hex에 적용할 수 없어서, rgba() 문자열 직접 생성
- 적용 범위: StoryPicker 히어로(eyebrow/pills/divider) + page.tsx 배경 3곳(색칠 화면/완성 화면/분기 선택 카드). **플립북 내부 페이지(공유용 종이 질감)는 의도적으로 제외** — 인쇄물 메타포 유지

### 4.18 사운드 — 절차적 합성 → 실제 오디오 샘플 (v1.1)
v1.0까지는 Web Audio 절차적 합성(§4.2)이었으나, 사용자가 실제 mp3 소스를 제공하며 교체:
- `sound.ts`가 `HTMLAudioElement` 기반으로 전면 재작성. `plop()`은 paint1→2→3 순환 재생, `pageTurn()`/`chime()`은 각 1개 샘플
- **짧은 파일은 cloneNode 대신 element 재사용** — `cloneNode(true)`로 0.2-0.3초짜리 m4a를 복제하면 production 빌드에서 clone이 fetch를 다시 하다가 `play()` Promise가 조기 resolve되며 **무음 재생 실패**가 남. `currentTime = 0`으로 되감기 + 원본 element 재생이 안전
- **사운드 트리거 타이밍**: `sound.plop()`을 `floodFill().done.then()` 안에 두면 320ms 채우기 애니메이션이 끝난 뒤에야 소리가 나서 체감 지연이 큼. **fill 시작 직후**로 옮겨야 클릭과 소리가 동시에 느껴짐
- BGM(`bgm.m4a`, 피아노 루프)은 SFX와 별개 토글 (`BgmToggle` + `sound-provider.tsx`의 `bgmOn` 상태), 기본 OFF, `sessionStorage`가 아닌 `localStorage`로 영구 저장 (사용자 선호이므로)
- 압축: `afconvert -d aac -b <bitrate> -c <1|2>` — chime 165KB→44KB (mono 64kbps), bgm 6.2MB→2.2MB (stereo 96kbps). ffmpeg/sox 없는 환경에서도 macOS 기본 도구로 가능

### 4.19 트랙패드 핀치줌 — ctrl+wheel 컨벤션 (v1.1)
macOS Safari/Chrome은 트랙패드 두 손가락 핀치를 **`wheel` 이벤트 + `ctrlKey: true`** 로 브라우저에 전달한다 (사용자가 실제 Ctrl을 누르지 않아도). `ColoringCanvas.tsx`의 `handleWheel`이 이를 감지해 `e.preventDefault()` (네이티브 페이지 줌 차단) 후 커서 위치를 anchor로 확대/축소 — 터치 핀치(§4.15)와 동일한 `(scroll + local) * ratio - local` 공식. `zoomRef`로 rAF 코얼레싱해 빠른 휠 이벤트 연속에도 부드럽게 처리.

### 4.20 iOS 앱 — Capacitor WebView 래핑 (v1.2)
App Store 버전의 1단계. SwiftUI 재작성 대신 **Capacitor로 라이브 사이트를 WKWebView로 감싸는** 방식 (기존 웹 코드 100% 재사용, 웹/앱 동시 유지보수).
- `capacitor.config.ts`: `appId: com.koreanfolktales.app`, `server.url: https://koreanfolktales.ink` → 콘텐츠 업데이트가 Vercel 배포로 **즉시** 반영, 앱 재심사 불필요 (콘텐츠 앱에 최적)
- `webDir`는 정적 export가 아니라 최소 플레이스홀더(`capacitor-www/`) — server.url로 네트워크 로드하므로 로컬 번들 불필요. **기본값 `public/`을 그대로 두면 색칠 PNG 359MB가 iOS 프로젝트에 통째로 복사됨** (§10.31)
- 검증: `xcodebuild -scheme App -sdk iphonesimulator` 클린 빌드 + 시뮬레이터 설치·실행 → 브라우저 chrome 없이 풀스크린으로 사이트 로드 확인 (회전 배경까지)
- **셸 도구**: CocoaPods는 `brew install cocoapods`로 설치 (없었음). Xcode 26.5, xcodebuild 존재
- **앞으로 (코드 아님, 사용자 액션)**: Apple Developer Program($99/년, 2주 내 예정) · AppIcon/LaunchScreen(현재 Capacitor 기본값) · AdMob SDK(AdSense는 앱 내 정책 위반) · StoreKit "광고 제거" 비소모성 IAP · App Store Connect 리스팅/제출
- **수익화 모델(합의)**: 무료(AdMob 광고) + 유료 업그레이드(광고 제거 IAP). "아이폰 기본 광고"는 없음 → AdMob이 표준

### 4.21 모바일 팔레트 iOS 재설계 — peek/expand 바텀시트 (v1.2)
`MobilePaletteSheet.tsx` — WebView로 감쌌을 때 "웹사이트 티"가 나던 팔레트를 iOS 시스템 UI 톤으로:
- **peek 상태**: 테마 chip + 색 grid + "채우기" 라벨 + segmented control(한 줄) 까지만. recent/harmony/contrast/L슬라이더/커스텀은 **접힘** → "More colors" 핸들(탭 또는 grabber 드래그)로 펼침. `grid-template-rows: 0fr↔1fr` 트랜지션, 드래그 중엔 `${dragProgress}fr`로 손가락 따라 열림
- iOS 재질: 시트 `backdrop-filter: blur+saturate`, grouped card(반투명 흰), segmented control(슬라이딩 흰 pill + 그림자), 네이티브 슬라이더 thumb(`globals.css`의 `.ios-native-slider` — 큰 흰 원 + 그림자), 🎯 이모지 → SF-Symbols 톤 eyedropper 라인 아이콘. `<input type=color>`는 그대로라 탭 시 iOS 네이티브 컬러 피커
- 스와치 30 → 21/19px 축소, gap 좁힘
- tint(활성 chip/segmented/슬라이더 채움)는 세션 회전 accent(`--accent`)를 씀

### 4.22 모바일 캔버스 — 확대 시 화면 전체 사용 (v1.2)
이전엔 캔버스가 고정 `aspect-square` 박스라 핀치 확대해도 그 작은 사각형 안에서만 스크롤됐다. v1.2:
- 모바일 뷰포트가 헤더~하단시트 사이 세로 공간을 채움 (`page.tsx`: work-area `flex-1` + `pb-[15.5rem]`(시트 높이 예약), grid `max-lg:flex-1 max-lg:grid-rows-[1fr]`, 캔버스 컬럼 `max-lg:justify-center`, 캔버스 컨테이너 `h-full max-h-[560px]`)
- 그림은 **정사각형 유지**: 컨테이너 `container-type: size`, 내부 콘텐츠 `width: calc(100cqmin * zoom)` + `aspect-square` (100cqmin = 뷰포트 짧은 변). zoom 1엔 정사각형이 세로 letterbox와 함께 중앙, 확대 시 세로 뷰포트를 꽉 채움
- **`m-auto` 트릭**: fit일 땐 중앙 정렬, overflow일 땐 margin이 0으로 collapse → top-left origin → 기존 핀치 anchor 수식(`(scroll+local)*ratio-local`) 그대로 유효
- **elastic 핀치 경계**: `applyZoomElasticity()` — 1x/8x를 넘어 핀치하면 지수 감쇠로 살짝 늘어나고(iOS Photos 느낌), 손 떼면 `animateZoomTo()`가 마지막 중점을 anchor로 실제 경계로 스프링 복귀
- **더블탭 줌은 의도적 제외**: 모든 싱글탭에 ~250ms 대기(두 번째 탭 감지)를 걸어야 해서 "탭=즉시 채우기"라는 핵심 인터랙션을 해침

### 4.23 서버 컴포넌트에 회전 배경 주입 — BackgroundShell (v1.2)
`/folktales/[slug]` SEO 페이지는 async Server Component(generateStaticParams/Metadata 필요)라 `useSessionBackground()` client 훅을 직접 못 쓴다. `BackgroundShell`(client 래퍼)이 배경을 적용하고 **CSS 커스텀 프로퍼티**(`--accent`/`--bg-from`/`--bg-to`)로 노출 → 서버 렌더 자식들은 인라인 스타일/`color-mix(in srgb, var(--accent) …%, …)`로 참조. 커스텀 프로퍼티는 client/server 경계와 무관하게 DOM으로 cascade됨. About/Privacy는 `"use client"`라 훅을 직접 사용.

---

## 5. 스토리 8권 명세

| # | Slug (folder) | 한국어 | 영어 | 라이브 | 분기 (Y구조) | 정통 결말 |
|---|---|---|---|---|---|---|
| 1 | `01-folktale` (`sun-and-moon`) | 해님 달님 | Sun and Moon | **⭐ V2.5** | 손 보여달라 / 자장가 부르라 | 두 동아줄·수수밭·해/달 부끄럼 자리 바꿈 (Scene 4: day/night 좌우 분리) |
| 2 | `02-haenyeo` (`haenyeo-and-the-mermaid`) | 해녀와 인어 | Haenyeo and Mermaid | **⭐ V2.5** | 산호 미로 / 해초 숲 | 진주 반환·수호자·잠수경 안 푸른 별·손녀 대잇기 |
| 3 | `03-woodcutter` (`fairy-and-the-woodcutter`) | 선녀와 나무꾼 | Fairy and Woodcutter | **⭐ V2.5** | 산속 오두막 / 마을 어머니 곁 | 두레박·하늘 가족·새벽 빛이 된 그리움 |
| 4 | `04-dokkaebi` (`old-man-and-the-goblins`) | 혹부리 영감 | Old Man and Goblins | **⭐ V2.5** | 흥겨운 마을 노래 / 어머니 자장가 | 혹 떼임·보물·욕심쟁이 혹 두 개 |
| 5 | `05-kongjwi` (`kongjwi-and-the-toad`) | 콩쥐와 두꺼비 | Kongjwi and Toad | **⭐ V2.5** | 베틀 + 참새 / 검은 소의 선물 | 꽃신 짝·사또·계모 가족 용서 |
| 6 | `06-byeoljubu` (`hare-and-the-dragon-king`) | 별주부전 | Hare and Dragon King | **⭐ V2.5** | 자라 따라 용궁 / 까치 귀띔 | 토끼 기지·산삼·우정 |
| 7 | `07-heungbu` (`heungbu-and-nolbu`) | 흥부와 놀부 | Heungbu and Nolbu | **⭐ V2.5** | 가족과 보살핌 / 어머니 약방문 | 박씨 도착 → 박+보물 = Scene 4 focal anchor (v0.9 재구성) |
| 8 | `08-woodman` (`gold-axe-and-silver-axe`) | 금도끼 은도끼 | Gold and Silver Axe | **⭐ V2.5** | 단호한 정직 / 흔들림 포함 정직 | Scene 4 3-beat 시간 arc (재회/판결/응징) (v0.9 재구성) |

**Y구조**: 1·2 공통 → 3 분기 (3a/3b) → 4 정통 결말. 한 회 플레이 = 4 장면. Scene type 3-state(`nextId`/`choices`/`endingLabel`)로 구현.
**v0.9 라이브 상태**: 8 스토리 전부 V2.5 production. Story 1·7·8 Scene 4는 v0.9에서 narrative emphasis 추가 재구성 (Story 1 day/night, Story 7 박씨 강조, Story 8 3-beat).

각 스토리 `originalTale`에 `koreanTitle / romanized / englishTitle / origin / summary / glossary[] / ourVersion`.
**Slug 매핑**: `STORY_SLUGS` in `src/lib/story.ts` (URL용 영문 친화 슬러그)

---

## 6. 사용자 흐름 (state machine)

```
[Picker]
   ├─ 카드 클릭 → [Game: scene start]
   ├─ "📖 About" 버튼 클릭 → OriginalTaleModal
   │     ├─ Start coloring → 모달 닫고 게임 시작
   │     └─ 🔗 View as page → /folktales/{slug}
   ├─ 갤러리 썸네일 → SavedBookViewer
   └─ /about, /privacy 푸터 링크

[/folktales/{slug}] (SEO)
   └─ 🎨 Start coloring → /?start={storyId} → 자동 게임 시작 (page.tsx의 useEffect)

[Game: scene N]
   ├─ 캔버스 클릭 → wavefront fill (180ms) + plop
   ├─ 팔레트 색 선택 → state update
   ├─ 선택지 카드 → 0.4s fade + scene 교체 + pageTurn
   ├─ ↶ undo (max 15)
   ├─ 줌 −/100%/+ · Space+드래그 pan · 핀치 모바일
   └─ (마지막 장) ✨ 완성 → handleFinish

[Finish]
   ├─ generateShareImage() — 4:5 표지
   ├─ chime
   ├─ saveBook() — localStorage 자동
   └─ [Final view = Flipbook]
        ├─ 좌우 화살표 / 키보드 / 도트 → 표지 + 각 장면 슬라이드
        ├─ 📤 [표지 또는 이 장면] 공유 → 4:5 PNG + Web Share
        ├─ 📚 PDF 저장
        ├─ 🔄 다시 색칠 / 📖 다른 이야기
        └─ 색칠 완료 갤러리에 자동 추가
```

---

## 7. 인프라

### 7.1 도메인
- `koreanfolktales.ink` — Namecheap 등록, Vercel A record (76.76.21.21)
- `www.koreanfolktales.ink` — CNAME → cname.vercel-dns.com.
- TLS 자동 (Vercel)

### 7.2 GitHub
- `RangeAreaScent/korean-folktales` (public)
- `main` 브랜치가 production
- Vercel for GitHub 연결됨 → push 시 자동 배포

### 7.3 Vercel
- 프로젝트: `korean-folktales`
- 자동 배포 활성화
- Vercel Analytics 활성화 (cookieless, 무료 한도)
- `npx vercel --prod --yes --name korean-folktales` 로 수동 배포도 가능

### 7.4 Google Search Console
- URL prefix property: `https://koreanfolktales.ink` (verified via HTML meta tag in `layout.tsx`)
- Sitemap submitted: `sitemap.xml` (11 URL)
- `verification.google` 토큰: `FN2UIhpj0nlnXmj4IgbOJQE6J1e6VvHxt0WhHlo83Cg` (layout.tsx metadata)

### 7.4a Bing Webmaster Tools (v1.1 신규)
- HTML meta tag 방식으로 verified — `verification.other["msvalidate.01"]` in `layout.tsx` metadata
- Google과 같은 `metadata.verification` 객체 패턴 재사용, `other` 필드로 커스텀 meta name 추가

### 7.4b Google AdSense (v1.1 착수 → 1차 반려 → v1.2 후속에서 스코핑 fix, 재심사 요청)
- Publisher ID: `ca-pub-2376980284402579`
- `public/ads.txt`: `google.com, pub-2376980284402579, DIRECT, f08c47fec0942fa0`
- **1차 심사 반려 (사유)**: "Google-served ads on screens without publisher-content ... used for alerts, navigation or other behavioral purposes" + "Low value content". 원인은 AdSense 로더 스크립트가 루트 레이아웃(`layout.tsx`)에 있어서 **`/` (피커+색칠 캔버스+플립북 앱 전체)에도 로드**되고 있었던 것 — 색칠 캔버스는 텍스트 콘텐츠가 거의 없는 순수 인터랙션 화면이라 정책 위반
- **Fix**: `about`/`privacy`/`folktales/[slug]`를 `src/app/(content)/` route group으로 이동(URL 안 바뀜) + 그 안에 스크립트를 담은 전용 `layout.tsx` 신설. 루트 레이아웃에서는 스크립트 제거. `npx next build` 후 `.next/server/app/*.html`에서 `grep adsbygoogle`로 `/`엔 없고 `/about`·`/privacy`·`/folktales/*`엔 있는지 확인 완료 (§10.36)
- raw JSX `<script>` 태그 유지 (⚠️ `next/script` 아님 — §10.26 참고), 위치만 이동
- **알려진 트레이드오프**: 피커 화면(스토리 고르는 화면, 실제 콘텐츠 있음)도 `/`에 같이 물려 있어서 이번 fix로 광고 노출 대상에서 함께 빠짐. 실제 광고 유닛은 아직 어디에도 없었으므로(스크립트+ads.txt만 존재) 즉각적 노출 손실은 없음. 향후 노출 확대하려면 피커를 별도 라우트로 분리 + Auto Ads 끄고 수동 `<ins>` 배치가 필요 (§11)
- 재심사는 이 fix 배포(commit `adab522`) 후 사용자가 AdSense 콘솔에서 직접 요청
- 승인 후 남은 일: EEA/UK/CH 방문자용 **동의 배너(CMP)** 설정 — Google AdSense 콘솔에서 "3-button consent" 옵션 선택 권장 (거부 버튼도 동의만큼 쉽게 접근 가능해야 GDPR 엄격 해석 기준 충족). 코드 변경 불필요, Google이 스크립트로 자동 주입

### 7.4c Pinterest 도메인 인증 (v1.1 신규)
- HTML meta tag 방식 — `verification.other["p:domain_verify"]` in `layout.tsx` metadata
- 완료 후 뜨는 "Pinterest Ads Manager 설정"은 **유료 광고 계정**이라 별개 기능. 유기적(organic) 핀 업로드는 광고 계정 없이 바로 가능 — 이 온보딩 화면은 닫아도 도메인 인증 상태는 유지됨

### 7.5 백업
- Git tag `v0.6-scenes-original` (origin에 푸시됨) — v0.6 시점 모든 도안
- 로컬 `.backups/coloring-v0.6/` — 34MB, gitignore
- 각 스토리 폴더 안의 v1 PNG들은 `Backup_v1/` 으로 옮겨질 예정 (V2 도안 모이면)

---

## 8. 자주 만나는 작업 패턴

### 8.1 새 UI 문자열 추가
1. `src/lib/strings.ts` — `UI` 객체에 `{ko, en}` 추가
2. 컴포넌트에서 `const { t } = useLocale(); t(UI.myKey)`

### 8.2 새 도안 (V2.5) 생성 → 통합 (Story 2 검증된 패턴)
**Gemini 프롬프트 생성:**
1. `public/coloring/PROMPTS_V2.md` 해당 스토리 섹션의 V2.5 마커 확인
2. **베이스 스펙** + **V2.5 레이어** + **스토리 체크리스트** + **Scene Subject 블록** 순서로 합쳐 Gemini 입력
3. 받은 PNG에 13항목 QA (PROMPTS_V2.md 체크리스트) 적용 — 보더 연속성·디테일 최소선·한국 도구 대체 방지·V2.5 minhwa 요소 모두 점검
4. `public/coloring/{NN}-{storyId}/scene-{1-shore|2-deep|3a-...|3b-...|4-...}.png` 위치 저장
5. 5장 다 모이면 story.ts 마이그레이션

**story.ts 마이그레이션 (Story 2 패턴 그대로):**
1. 해당 스토리 객체의 `startSceneId` → `scene-1-...` 으로 변경
2. `scenes` 객체를 V2.5 5장면으로 재구성:
   ```ts
   "scene-1-...": { ..., nextId: "scene-2-..." },        // linear
   "scene-2-...": { ..., choices: [..3a, ..3b] },        // branching
   "scene-3a-...": { ..., nextId: "scene-4-..." },       // linear
   "scene-3b-...": { ..., nextId: "scene-4-..." },       // linear
   "scene-4-...": { ..., endingLabel: {...} },           // canonical ending
   ```
3. 각 narration은 PROMPTS_V2.md의 풍부 버전 그대로 (멀티-paragraph `\\n\\n` 포함)
4. `originalTale.ourVersion` 도 V2.5 정통 결말 반영해 갱신 (분기 엔딩 언급 제거)
5. `npx tsc --noEmit` + `npx next build` 통과 확인
6. `npm run dev` → 두 분기 (3a, 3b) 다 플레이 → Complete book → 플립북 검증

### 8.3 새 스토리 추가
1. `src/lib/story.ts` — `StoryId` 타입에 ID 추가 + 데이터 객체 + `STORIES` + `STORY_LIST` + `STORY_SLUGS`
2. `public/coloring/{NN}-{storyId}/` 폴더 5장 PNG
3. `public/coloring/icons/{storyId}.png` 라인아트 아이콘 (투명 배경 1024×1024)
4. `PROMPTS_V2.md`에 새 스토리 섹션 추가 (Y구조 + 풍부 narration)

### 8.4 새 사운드 추가
`src/lib/sound.ts`의 `SoundEngine` 클래스에 메서드 추가, Web Audio nodes로 합성

### 8.5 스크린샷 / 디버그 PNG 저장 위치 ⚠️
**모든 임시 스크린샷은 `.screenshots/` 폴더로** (gitignore됨). 루트에 직접 저장 금지.
- Playwright MCP `browser_take_screenshot` 사용 시 `filename: ".screenshots/foo.png"` 처럼 명시
- Bash로 PNG 임시 생성 시 `.screenshots/...` 경로 사용
- `.gitignore`에 `/*.png` 룰 있어서 루트 PNG는 자동 제외되지만, 깔끔하게 폴더 분리 권장

---

## 9. 실행 방법

### 9.1 개발
```bash
cd /Users/ryan/Projects/Coloring_book-Website
npm run dev
# → http://localhost:3000
# 또는 Start.command 더블클릭
```

### 9.2 빌드 검증
```bash
npx tsc --noEmit     # 타입 게이트
npx next build       # 프로덕션 빌드
```

### 9.3 배포
**자동:** `git push origin main` → Vercel이 자동 production 배포 (~1분)
**수동:** `npx vercel --prod --yes --name korean-folktales`

### 9.4 의존성
- `next@16.2.9`, `react@19.2.4`
- `tailwindcss@4`
- `jspdf`, `html2canvas` (export용)
- `@vercel/analytics`
- (next/font 통해) Geist, Geist Mono, Gowun Batang

---

## 10. Gotchas — 코드 만지기 전에 알아두면 좋은 것

### 10.1 F키 풀스크린이 안 먹힐 때
range/color/checkbox는 OK. 텍스트성 input/textarea/contenteditable만 차단. `isTypingTarget()` in `ColoringCanvas.tsx`.

### 10.2 그라데이션 영역 refill
다른 색으로 다시 칠할 때 시작 픽셀이 흰색이 아니면(`>230` 임계) tolerance 자동으로 60 → 220 (`floodfill.ts`).

### 10.3 모바일 핀치 줌 후 fill 오발
2손가락 끝난 직후 click 따라옴. `recentPinchEndRef` 350ms 억제.

### 10.4 wavefront 애니메이션 cancel
진행 중 undo → `handle.cancel()` + pre-fill snapshot 복원. 새 클릭은 애니메이션 중 무시.

### 10.5 갤러리 dataURL 용량
12권 × ~1MB = 12MB. localStorage 한계(5-10MB) 근접. quota error 시 자동 FIFO evict, 그래도 실패 시 skip.

### 10.6 누출 감지
한 클릭이 캔버스 55% 초과 칠 → abort + "선이 살짝 끊어진 곳 같아요" 안내. 비율은 `floodfill.ts`의 `maxFillRatio`. 새 도안에서 너무 민감하면 0.65로 올리면 됨.

### 10.7 PDF 한글 폰트
html2canvas는 페이지 로드된 폰트 캡처. Gowun Batang이 next/font로 로드돼 있으면 깨끗. 미리 로드 못 한 상태에서 export하면 fallback (Apple SD Gothic Neo / Pretendard / Georgia).

### 10.8 Story title의 chapter prefix
PDF + 플립북에서 scene 제목의 "1장. " 또는 "Chapter 1 — " regex로 떼고 출력. 새 스토리 추가 시 같은 패턴 따라야 prefix 처리됨.

### 10.9 모달 + 모바일 floating cluster z-index
모달 z-50, 모바일 toggle cluster top-3 right-3 z-50, 모바일 bottom sheet z-30/40.

### 10.10 카드 클릭 = Begin (Begin pill 시각 제거됨)
콘텐츠는 `pointer-events-none`, 아이콘+타이틀 영역 클릭 시 z-10 absolute 버튼이 받아 onPick 발사. 카드 내 About 버튼만 stopPropagation으로 모달 열림.

### 10.11 ?start=storyId 딥링크
`/?start=folktale` → page.tsx의 useEffect가 자동 pickStory 후 URL에서 파라미터 제거. `/folktales/[slug]`의 CTA가 이걸로 게임 시작.

### 10.12 V2.5 통일 완료 (v0.9)
8 스토리 모두 V2.5 라이브 — 혼재 상태 종료. Backup_v1/ 폴더는 v0.6 시점 원본 보존 (롤백/참고용). 신규 콘텐츠 추가 시 V2.5 패턴(§8.2) 그대로 따르면 됨.

### 10.13 Scene 3-state 진행 규칙
Scene 타입의 세 상태는 **상호 배타적**:
- `nextId` 있음 → linear ("Continue →" 단일 버튼)
- `choices` 있음 → branching (2개 카드)
- 둘 다 없음 + `endingLabel` → ending ("Complete book" 버튼)

`page.tsx` 렌더링은 `choices ? branching : nextId ? linear : ending` 순. 한 scene에 `nextId`와 `choices`를 같이 두면 `choices`가 이김 (의도된 동작 — branching 우선).

V1 스토리 (Story 1, 3-8)는 모든 scene이 `choices` 또는 `endingLabel` 만 사용 (linear 미사용). V2.5 스토리 (Story 2)는 5장면 중 3장면이 linear, 1장면이 branching, 1장면이 ending.

### 10.14 PDF export — isEnding 판정 (v0.9 회귀 fix)
`page.tsx` 1149/1293 라인. V1 시대엔 `!scene.choices` 로 ending 판정했지만 V2.5는 linear scene도 choices 없음 → Scene 1·3a까지 "ENDING" 라벨 표시되는 회귀. **`isEnding = !!scene.endingLabel`** 로 변경 — Scene 4만 ending. V2.5 도입 시 같은 패턴 다른 곳에 있을 수 있으니 새 export 로직 추가 시 확인 필요.

### 10.15 PDF narration 페이지 자동 분할 (v0.9)
`paginateNarration()` in page.tsx — paragraph (`\n\n`) 단위 분할. 한도: KO 520자 / EN 980자 (이미지 있는 첫 페이지), KO 2200 / EN 4200 (이미지 없는 continuation). 너무 짧게 잘리면 한도 올리고, 잘림 재발하면 한도 내리거나 image height (`height: 480px`) 줄이기.

### 10.16 PDF Letter format (v0.9)
A4 → Letter (8.5×11", 215.9×279.4mm). `PAGE_W=850 PAGE_H=1100` (Letter 비율 0.773), `PAGE_PAD_X=100 PAGE_PAD_Y=80`, jsPDF `format: "letter"`. iPad/Letter 프린트 호환.

### 10.17 GSC favicon 캐시
URL prefix property가 인증된 시점의 favicon이 GSC 대시보드에 남음. 실제 사용자에겐 호랑이 표시. 며칠~몇 주 후 자동 갱신. v0.9에서 favicon.ico (multi-size) + icon.png 192px 추가 — Google 재크롤 후 검색결과 thumbnail/favicon 갱신됨 (며칠~1주).

### 10.18 OG image 정적 PNG vs 동적 (v0.9)
`src/app/opengraph-image.tsx` (동적 ImageResponse) → `src/app/opengraph-image.png` (정적 PNG) 로 전환. 정적이 우선됨. `.alt.txt` 파일도 같이 둘 것. 만약 둘 다 있으면 정적 PNG 우선이지만 빌드 경고 가능 — 한 가지만 둘 것.

### 10.19 LAN dev access — allowedDevOrigins (v1.0) ★
Next.js 16의 **새 보안 정책**이 LAN IP에서의 `/_next/webpack-hmr` + RSC payload stream 차단. 증상: iPhone/iPad에서 페이지는 로드되지만 클릭 → React state update 안 됨 (silent hydration 실패). 콘솔에 경고 1줄만 뜨고 클라이언트엔 에러 안 보임. `next.config.ts`의 `allowedDevOrigins` 에 LAN 범위 등록 필수. 이게 v1.0에서 가장 디버깅 어려웠던 이슈 — 클릭 핸들러나 viewport meta 같은 게 아니라 dev server 자체였음.

### 10.20 iOS Safari nested interactive (v1.0)
StoryPicker 카드를 `<button>` 안에 About `<span role="button">` nested 했더니 iOS가 outer button의 click handler를 비활성화. Chrome 모바일 에뮬레이션에선 정상. HTML 명세상 button 안 interactive descendant 금지인데 iOS만 strict. 해결: **sibling 패턴** — 카드 wrapper는 `<div>`, 안에 (a) 콘텐츠 클릭 `<button>` + (b) About `<button>` 두 sibling.

### 10.21 핀치 zoom anchor + smoothness (v1.0)
초기 구현은 단순 `setZoom()` 만 호출 → React 매 touchmove 재렌더 + scrollLeft/Top 보정 없음 → 항상 좌상단 anchor + 매끄럽지 못함. 해결책: scrollLeft/Top 보정 `(scroll + localMid) * ratio - localMid` + step 1% + rAF coalesce. 한 손가락 pan은 별도 `touchPanRef` 로 zoom > 1 일 때만 진입.

### 10.22 키보드 단축키 — Cmd 안 됨 (v1.0)
브라우저가 OS 레벨에서 `Cmd/Ctrl + +/-/0` 을 native page-zoom으로 가로채서 웹앱에서 `preventDefault`로도 못 막음. 우리 단축키는 **bare `+/-/0`** (no modifier, no Shift). 입력 포커스는 `isTypingTarget()`으로 제외.

### 10.23 Canvas image container border 제거 (v1.0)
이전: `rounded-2xl border` — V2.5 line-art에 이미 corner-bracket decorative border가 그려져 있어서 외부 둥근 border와 시각 충돌. 해결: border + rounded 모두 제거, `shadow-lg`로만 정의. canvas 컨테이너만 사각, 다른 박스들은 rounded 유지.

### 10.24 Erase mode 사용 패턴 (v1.0)
컨트롤 strip의 🗑 버튼 토글로 진입. 활성 시 다음 클릭은 fill 대신 `eraseRegion()` 호출 — 클릭한 region 전체를 white로 복구. Line-art boundary로 stop, color tolerance 무시. 한 번 erase 후 모드는 유지 (사용자가 다시 토글로 끔). 작동 안 보이면: 1) 클릭이 line 위 (검은 픽셀)인지 2) 이미 white인 region인지 확인.

### 10.25 배경 톤 hex 직접 관리 (v1.0, v1.1에서 회전형으로 대체)
amber-50/rose-50 같은 Tailwind 토큰 안 쓰고 hex로 직접 관리하던 방식. **v1.1에서 고정 hex 자체를 폐기**하고 `src/lib/backgrounds.ts`의 회전 팔레트로 교체됨 (§4.17). 이 항목은 과거 패턴 기록용 — 새 배경 관련 작업은 backgrounds.ts를 봐야 함.

### 10.26 next/script는 raw `<script>` 태그를 HTML에 안 씀 (v1.1) ★
AdSense 사이트 인증이 계속 "Unexpected error" / verify 실패로 막혔던 원인. `next/script`(어떤 `strategy`든 — `beforeInteractive` 포함)는 서버 렌더 HTML에 리터럴 `<script src="...">` 태그를 쓰지 않는다. 대신 `<link rel=preload>` + 내부 큐잉용 인라인 스크립트(`self.__next_s.push(...)`)만 남기고, 실제 태그는 클라이언트에서 JS로 나중에 생성한다. AdSense 크롤러처럼 raw HTML에서 리터럴 `<script src="https://pagead2...">` 문자열을 찾는 검증 방식은 이 패턴을 못 찾는다. **해결: `next/script` 대신 plain JSX `<script>` 요소를 직접 렌더** — 이건 React가 그대로 DOM에 반영하고 서버 HTML에도 리터럴로 남는다. `npm run build` 후 `.next/server/app/*.html`에서 `grep '<script.*adsbygoogle'`로 직접 확인 가능.

### 10.27 아주 짧은 오디오는 cloneNode 대신 재생 위치 리셋 (v1.1)
`cloneNode(true)`로 오디오를 복제하면 production 빌드에서 0.2-0.3초짜리 파일이 **소리 없이 재생 "성공"** 하는 경우가 있었음 (에러 없음, 그냥 안 들림). 원인 추정: 클론은 fetch를 새로 하고, 그 fetch가 끝나기 전에 `play()` Promise가 resolve되어 재생 시점에 오디오 데이터가 없음. 5초짜리 chime은 문제 없었음 (fetch가 재생 전에 항상 끝남) — 파일 길이에 좌우되는 버그라 로컬 테스트로는 놓치기 쉽다. 해결: 같은 `HTMLAudioElement`를 `currentTime = 0`으로 되감아 재사용.

### 10.28 사운드는 "무슨 소리냐"보다 "언제 트리거하냐"가 체감을 좌우 (v1.1)
`sound.plop()`을 `floodFill().done.then(...)` 안에 두면 파일 자체는 즉시 재생돼도 **320ms 채우기 애니메이션이 끝난 뒤**에야 호출된다 — 사용자는 "클릭 → 딜레이 → 소리"로 느낌. 오디오 파일의 무음 트림(§4.18)만으로는 못 고치는 지연. 애니메이션 시작 직후로 트리거를 옮겨야 클릭과 소리가 동시에 느껴짐. 사운드 버그 리포트를 받으면 파일부터 의심하지 말고 **호출 위치**를 먼저 확인할 것.

### 10.29 preview_start 포트 충돌 — autoPort (v1.1)
여러 세션이 동시에 `npm run dev`를 돌리면 3000번 포트가 이미 점유돼 `preview_start`가 실패한다. `.claude/launch.json`의 configuration에 `"autoPort": true` 추가하면 3000이 막혔을 때 자동으로 다른 포트를 골라준다 (`next dev`에 `-p` 하드코딩 안 돼 있어야 함 — `PORT` env var로 넘겨받음).

### 10.30 배경/액센트 회전 — SSR 안전한 기본값 (v1.1)
`useSessionBackground()`은 `useState(BACKGROUNDS[0])`으로 시작 — 서버 렌더와 클라이언트 최초 페인트가 항상 같은 값이어야 hydration mismatch가 안 남. 실제 무작위 선택/`sessionStorage` 조회는 `useEffect` 안에서만 (client-only). 즉 **아주 짧은 순간 첫 번째 팔레트(단청)로 보였다가 실제 색으로 바뀌는 flash**가 있을 수 있음 — 의도된 트레이드오프 (서버에서 랜덤값을 미리 알 방법이 없음).

### 10.31 Capacitor webDir 기본값 함정 — 359MB (v1.2) ★
`npx cap add ios`는 `webDir`(config에 없으면 `public`)을 통째로 iOS 프로젝트로 복사한다. `public/`에는 색칠 PNG 359MB가 있어서 iOS 프로젝트가 359MB로 부풀고 그대로 git에 커밋될 뻔했다. **해결**: `webDir`을 최소 플레이스홀더(`capacitor-www/` — 빈 index.html)로 지정. 어차피 `server.url`로 라이브 사이트를 네트워크 로드하므로 로컬 번들은 안 쓰임. → 359MB → 340KB. 재적용은 `npx cap sync ios`.

### 10.32 preview 도구는 iOS 네이티브를 못 봄 (v1.2)
`preview_start`/`preview_screenshot`은 웹 dev server용. iOS 시뮬레이터 확인은 `xcrun simctl` (boot → install `App.app` → launch → `xcrun simctl io <UDID> screenshot`) 로. `App.app` 경로는 `find ~/Library/Developer/Xcode/DerivedData -name App.app -path '*Debug-iphonesimulator*'`.

### 10.33 합성 터치/휠 이벤트는 preview에서 React 핸들러로 안 감 (v1.2) ★
`preview_eval`로 `new TouchEvent`/`new WheelEvent`를 `dispatchEvent` 해도 React의 delegated 합성 이벤트 시스템으로 라우팅되지 않아 **줌/핀치가 실제로 안 걸린다** (state 안 바뀜). 그래서 헤드리스 preview로는 핀치줌을 자동 검증할 수 없음 → 실제 기기/시뮬레이터에서 확인 필요. 표시 스케일링(`calc(100cqmin * zoom)`)만은 zoom 값을 인라인 스타일로 강제 주입해 검증 가능(§4.22).

### 10.34 모바일 하단 고정 시트 + 캔버스 겹침 (v1.2)
모바일에서 툴바+팔레트를 `fixed inset-x-0 bottom-0`로 하단 고정하면 캔버스가 그 밑으로 내려가 겹칠 수 있다. work-area를 `flex-1`로 세로를 채우되 `pb-[15.5rem]`로 **접힌 시트 높이만큼 하단 여백을 예약**해서 세로 중앙 정렬된 캔버스가 시트 위에 머물게 함. 시트가 `fixed`라 팔레트 확장은 위로 자라나 화면 밖으로 안 밀림.

### 10.35 데스크탑/모바일 레이아웃 분기 — max-lg:/lg: 스코핑 (v1.2)
캔버스·work-area·grid의 모바일 전용 동작(flex 세로 채움, 중앙 정렬, 세로 확대)은 전부 `max-lg:`로, 데스크탑 전용(aspect-square, 사이드바 grid, sticky aside)은 `lg:`로 스코핑. 한 컴포넌트가 두 레이아웃을 다 감당하므로 새 스타일 추가 시 어느 브레이크포인트인지 반드시 명시할 것. (예: `flex-1`을 무스코프로 두면 데스크탑에서 캔버스-팔레트 간격이 벌어짐 — 이전에 겪은 버그, §12)

### 10.36 AdSense 스크립트는 "URL 단위"로만 스코핑 가능 — SPA 상태별 분리 불가 (v1.2 후속) ★
`/`가 피커/캔버스/플립북을 client state로 전환하는 단일 SPA 라우트라, AdSense 로더 스크립트를 조건부로 "피커 상태에서만" 넣는 식은 안전하지 않다 — 스크립트가 페이지에 존재하면 Auto Ads가 그 URL 전체(캔버스 진입 후 상태 포함)에 광고를 꽂을 수 있어서다. 그래서 스코핑은 **route 단위**로만 가능 — `about`/`privacy`/`folktales/[slug]`를 `src/app/(content)/` route group(URL 안 바뀜)으로 묶고 그 안에 스크립트 전용 `layout.tsx`를 두는 방식으로 해결 (§7.4b). 검증은 `npx next build` 후 `.next/server/app/*.html`에서 `grep -c adsbygoogle`로 페이지별 존재 여부 확인. 트레이드오프: 콘텐츠가 있는 피커 화면도 `/`에 얹혀 있어서 같이 광고 대상에서 빠짐 — 노출 확대하려면 피커를 별도 URL로 쪼개야 함.

---

## 11. 미완 / 다음 후보

### ✅ v1.2에서 완료된 트랙
- ✅ Capacitor iOS 프로젝트 스캐폴딩 (라이브 사이트 WebView 래핑, 시뮬레이터 빌드/실행 검증)
- ✅ 모바일 팔레트 iOS 재설계 (peek/expand 바텀시트, segmented control, blur, 네이티브 슬라이더)
- ✅ 툴바를 그림 위 floating → 팔레트 위 별도 줄 + 하단 고정 시트 (그림 침범 제거)
- ✅ 모바일 캔버스 세로 확대 + 중앙 배치 (확대 시 화면 전체 사용) + elastic 핀치 경계
- ✅ 페이지 인디케이터(1/N) 툴 캡슐 → 헤더 우측 이동
- ✅ 회전 배경/액센트를 About·Privacy·8 SEO 페이지까지 확장 (BackgroundShell)
- ✅ 넓은 창에서 캔버스-팔레트 간격 벌어짐 fix (중앙 정렬)
- ✅ lint 클린업 (Row 컴포넌트 hoist, exhaustive-deps, set-state-in-effect 근거 주석)

### 🔥 다음 트랙 — iOS 앱 출시 (v1.3 예상, 사용자 액션 게이트)
1. **Apple Developer Program 가입** ($99/년, 2주 내 예정) — 이게 나머지의 전제
2. **AppIcon / LaunchScreen 에셋** — 현재 Capacitor 기본값. 호랑이 아이콘(`public/coloring/icons` 또는 favicon 소스) 활용
3. **AdMob 연동** — `@capacitor-community/admob` 등. AdSense 스크립트는 앱 WebView에서 정책 위반이므로 앱 빌드에선 제거/조건부 필요
4. **StoreKit "광고 제거" 비소모성 IAP** — 무료(광고)+유료(광고 제거) 모델
5. **App Store Connect** 리스팅(스크린샷·설명·개인정보 라벨) + 제출 (심사 가이드 4.2 최소기능 — 캔버스/오프라인 갤러리/공유로 통과 가능성 높음)
6. **safe-area 다듬기** — 시뮬레이터에서 상태바/노치와 헤더 겹침 확인됨, `env(safe-area-inset-*)` 패딩

### 🔥 후속 UX 개선 후보
1. **Touch tap target 44pt** (`@media (pointer: coarse)`): 스와치 아직 21/19px, Apple HIG 미달
2. **Capacitor Haptics** — 스와치 탭 시 진동 (네이티브 앱에서 체감 큼). 팔레트 재설계 목업에 계획돼 있었음
3. **Smart palette per scene**: `Scene.suggestedColors?: Hsl[]` → 도안별 6-8색 큐레이션
4. **즐겨찾는 색** (별 토글, recent보다 영구적)
5. **a11y 감사** (`design:accessibility-review`)
6. **zoom 1일 때 흰 letterbox 과다 여부** — 실기기 확인 후 max-h 조정 가능 (§4.22)

### ✅ v1.1에서 완료된 트랙
- ✅ 사운드 절차적 합성 → 실제 오디오 샘플 (paint 순환/pageTurn/chime) + 무음 트림 + 트리거 타이밍 fix
- ✅ 배경음악(BGM) 추가 — 전용 토글, SFX와 독립, 기본 OFF
- ✅ 배경 톤 — 고정 cool-white → **세션당 회전 6색** (오방색 스펙트럼)
- ✅ 액센트 색도 배경과 함께 회전 (eyebrow/pill/divider)
- ✅ 데스크탑 캔버스 20% 축소 (960px → 768px) — 랩탑 한 화면에 다 들어오도록
- ✅ 트랙패드 핀치줌 (ctrl+wheel) 지원 + footer/tooltip 안내 텍스트
- ✅ Footer shortcut strip 좌측 정렬
- ✅ 픽커 히어로 카피 재작성 (SaaS 스펙-리스트 톤 → storybook 톤)
- ✅ Bing Webmaster Tools + Pinterest 도메인 인증
- ✅ Google AdSense 스크립트 + ads.txt (심사 요청 완료)

### ✅ v1.0에서 완료된 UI 트랙
- ✅ 모바일 팔레트 always-expanded (peek/expand 제거)
- ✅ Mobile control strip 재배치 (undo + page + erase + 📖 + 🔊 + primary action)
- ✅ NarrationModal 자동 열림 + locale toggle 내장
- ✅ Desktop control bar (캔버스 아래 inline)
- ✅ Erase 기능 (gradient 영역 깨끗 erase)
- ✅ 핀치 zoom anchor + 1% step + rAF coalesce, 한 손가락 pan
- ✅ Max zoom 4 → 8
- ✅ 캔버스 image border 제거, shadow only
- ✅ Desktop width 1700px, canvas 960px, sidebar 360px
- ✅ Cool minimal white 배경 + dark gray box borders
- ✅ Theme명 IP-safe (Ghibli 4개 → atmospheric)
- ✅ Keyboard `+/-/0` (Shift 제거)
- ✅ Flat SVG SoundToggle
- ✅ ColorPalette 데스크탑 재구성 (always expanded, 새 순서, 작은 fill chips)
- ✅ iOS Safari fixes (viewport + allowedDevOrigins + sibling button)

### 🟢 콘텐츠 / 시각
- **OG image iterate** — 현재 half-colored hero artwork 정적 PNG. 사용자 피드백 받아 색감/구도 fine-tune 가능

### 🟢 마케팅 / 성장
- **Pinterest 첫 푸시** — `PINTEREST_PLAYBOOK.md` §10. 8 스토리 V2.5 production이라 30핀 한 번에 가능. 도메인 인증은 완료 (§7.4c), 유기적 핀 업로드 바로 가능
- **자동 핀 생성기** — `src/app/pin/[slug].tsx` ImageResponse로 1000×1500 핀 동적 생성 (playbook §6)
- **GA / Plausible 추가 분석** (현재 Vercel Analytics만)
- **GSC URL 검사 → Request Indexing** 8 스토리 페이지 + 새 favicon/OG로 재크롤 요청

### 🟢 폴리시
- **즐겨찾는 색** (별 토글, 빠른 픽)
- **장면 진행 미니맵** (헤더 ●→●→○)
- **a11y 감사** (`design:accessibility-review`)
- **테스트 코드** (현재 0개) — playwright e2e 1-2개

### 🟢 수익화 (AdSense — 진행 중)
- **자체 도메인** ✅
- **About / Privacy** ✅ (v1.1: AdSense/Analytics 광고 고지 반영)
- **Sitemap** ✅
- **AdSense 스크립트 + ads.txt** ✅ (v1.1, §7.4b)
- **1차 반려** ❌ → **스코핑 fix 완료 + 재심사 요청** ⏳ (v1.2 후속, commit `adab522`) — "screens without publisher-content" 반려, 스크립트를 `/`(색칠 앱)에서 빼고 콘텐츠 페이지 전용으로 이동 (§7.4b, §10.36)
- **재심사 결과 대기** ⏳ — 통과 후 남은 일: 실제 `<ins class="adsbygoogle">` 광고 유닛 배치 (현재 스크립트만 있고 유닛은 0개), 배치 위치 논의 (about/privacy/folktale 페이지 내 위치)
- **노출 확대 후속 과제** — 피커(스토리 고르는 화면)가 `/`에 얹혀 있어 현재 광고 스코프에서 제외됨. 트래픽이 가장 많을 화면이라, 피커를 별도 라우트로 분리 + Auto Ads 끄고 수동 배치하면 노출 회복 가능 (§10.36 트레이드오프 참고) — 아직 미착수
- **승인 후 남은 일**: EEA/UK/CH consent 배너(CMP) 설정 — §7.4b 참고

---

## 12. 결정 기록 (Why decisions were made)

| 결정 | 시점 | 근거 |
|---|---|---|
| 한국 전래동화로 톤 통일 (wizard 제거) | v0.3 | 미국 시장 K-content 포지셔닝 |
| 이중언어 — 옵션 C | v0.4 | 미국 부모 "내 아이가 한국어 노출" |
| custom i18n vs next-intl | v0.4 | 안정성·간결성 우선 |
| Gowun Batang | v0.5 | 영문·한글 모두 우아, next/font 자동 최적화 |
| 4:5 PNG (vs 세로 stacked) | v0.5 | Instagram-native 공유 |
| 한국 전통색 24×2 | v0.5 | 한국 정체성 + 따뜻한 톤·차가운 톤 분리 |
| 모바일 bottom sheet | v0.6 | 데스크탑처럼 한 화면에서 색 ↔ 캔버스 |
| 폴더 구조 `{storyId}/{sceneId}` | v0.6 | 새 스토리 디렉터리 하나 |
| 갤러리는 localStorage | v0.6 | 가벼움 우선 |
| **분기 여정 + 정통 결말 (Y구조)** | v0.7 | 옛이야기는 본질이 정통 결말. 분기는 여정에만 |
| **V1 → PROMPTS_V2 별도 파일** | v0.7 | V1 살려두면서 V2 점진 적용 |
| **폴더 NN- prefix** | v0.7 | 파일 시스템 정렬이 캐논 순서 일치 |
| **호랑이 favicon (minhwa 스타일)** | v0.7 | K 글자보다 한국 옛이야기 정체성 직접 표현 |
| **자체 도메인 .ink** | v0.7 | "잉크" 컨셉 + .com보다 저렴 + AdSense·SEO 신뢰도 ↑ |
| **카드 Begin pill 제거** | v0.7 | 카드 클릭 = Begin 직관 + UI 단순화 |
| **모달 + SEO 페이지 콘텐츠 통일** | v0.7 | 사용자가 어디서 봐도 같은 이야기·같은 구조 |
| **V2.5 한국 그림책 스타일라이제이션 레이어** | v0.8 | 미니멀 워크북 톤은 사이트 브랜드(한국 옛이야기)와 어긋남. minhwa 구름·산·물결·hair 디테일로 5초 안에 "한국 그림책" 인식 |
| **Scene 3-state (nextId / choices / endingLabel)** | v0.8 | Y구조 linear 진행을 표현하려면 단일 next 필요. 기존 2-choice 패턴 유지하면서 추가 |
| **Story 2 V2.5 testbed → 7 스토리 마커 확산** | v0.8 | 한 스토리 검증 후 패턴 복제. PROMPTS_V2.md 일관성 + Story 1, 3-8 도안 생성만 남음 |
| **V2.5 lightweight 적용 (per-story 마커 + 체크리스트)** | v0.8 | 35 scene 블록 다시 쓰는 대신 스토리당 1 마커 + 10-15 bullets로 효율적 가이드. Gemini가 base + layer + checklist 통합 적용 |
| **8 스토리 일괄 V2.5 production** | v0.9 | Story 2 testbed가 통과 후 35 도안 한 batch로 받아 한 commit에 마이그레이션. 혼재 상태 종료, 라이브 일관성 확보 |
| **PDF: A4 → US Letter** | v0.9 | US 가정용 프린터 친화 + 8.5×11" 표준. 사용자가 명시적으로 요청 |
| **PDF: narration paragraph 페이지네이션** | v0.9 | V2.5 narration이 길어져 한 페이지 한도 초과 → 묵묵히 잘림. paragraph 단위 자동 분할 + "다음 장에 계속…" 마커가 손실 없이 처리 |
| **PDF cover Option C (글로서리+origin)** | v0.9 | 빈 cover 70% 공간 활용. 단순 emoji가 아니라 story.id의 커스텀 아이콘. 글로서리 미리보기 2개 + origin 패러그래프로 책 가치 즉시 전달 |
| **isEnding = `!!scene.endingLabel`** (V2.5 회귀 fix) | v0.9 | V1 `!scene.choices` 로직이 V2.5 linear scene을 ending으로 잘못 분류. endingLabel 기준이 의도 일치 |
| **정적 OG image (1200×630 + 1200×1200)** | v0.9 | 동적 ImageResponse의 emoji 8개는 brand 정체성 약함. 사용자가 Gemini로 만든 half-line-art/half-colored 일러스트가 즉시 "coloring book" 인식 신호 |
| **multi-size favicon.ico + icon.png 192px** | v0.9 | Google 검색결과 generic K fallback 원인 = /favicon.ico 404 + 1024×1024 icon은 Google skip. 16/32/48 ICO + 192 PNG = 표준 SEO 권장 |
| **Site title softened ("Coloring Storybook for Kids")** | v0.9 | "A Bilingual..." 어색 + bilingual 과 강조. bilingual은 description에 유지, 타이틀은 활동+오디언스 시그널 |
| **DesktopControlBar 분리 (캔버스 내부 toolbar → 외부)** | v1.0 | 캔버스 내부 floating toolbar는 desktop에 비효율. 외부 inline strip이 layout 자유도 ↑, undo/zoom/erase/fullscreen 한 줄에 명확. ColoringCanvas는 imperative handle + callback으로 통신 |
| **MobileControlBar 재배치 — primary action 우측 끝** | v1.0 | Continue/Choose path 별도 row가 column 차지. 같은 strip 우측 끝으로 합치면서 엄지 자연 위치 활용. utility icons (📖, 🔊) 가운데, primary CTA rightmost |
| **Erase 기능 — line-art boundary** | v1.0 | 기존 fill은 color-tolerance 기반이라 gradient 영역 지우기 불가. boundary 검출 모드(`eraseRegion`)는 line만 멈추므로 gradient/radial fill도 깨끗 white로. 기존 fill과 모드 토글로 공존 |
| **핀치 zoom anchor + smoothness** | v1.0 | 좌상단 고정 anchor + 5% step 으로 zigzag. midpoint 기반 scroll 보정 + 1% step + rAF coalesce로 부드러운 줌 + 정확한 anchor. 한 손가락 pan은 zoom > 1 자동 진입 |
| **Cool minimal white 배경 (수많은 후보 끝)** | v1.0 | 한지→기와→백자→달항아리→청자→안개→슬레이트→warm paper 거쳐 결정. 색칠 art가 warmth 담당, 배경은 neutral 무대. 박스 borders도 amber → dark gray 동시 변경 |
| **Always-expanded palette** | v1.0 | More 토글 = 추가 클릭 = 친구지지 않음. Desktop 사이드바는 항상 모든 섹션 표시 (themes → grid → fill → recent → harmony → contrast → current). Mobile도 always-expanded inline panel |
| **ColorPalette 순서 — current 맨 아래** | v1.0 | current는 직접 조작 (slider/picker)이 메인. 빈도가 가장 적은 섹션이라 맨 아래. recent/harmony/contrast는 swatch 단순 클릭 픽이라 위쪽 |
| **Fill style — 작은 직사각형 + 캡션** | v1.0 | 큰 원형 preview는 사이드바 공간 낭비. 직사각형 mini preview + 작은 캡션이 정보 밀도 ↑ |
| **Theme명 IP-safe** | v1.0 | Ghibli 4종 (Totoro/Spirited/Howl/Mononoke) → atmospheric (Sunlit Forest/Lantern Night/Cloud Garden/Deep Forest). SEO+상업 안전, 색감 그대로 |
| **Keyboard `+/-/0` (Shift 제거)** | v1.0 | Shift+/-/0 비표준. bare 키가 직관적. Cmd+/-는 브라우저 reserved (override 불가) — bare 키로 충돌 회피 |
| **NarrationModal — auto-open per scene (mobile)** | v1.0 | V2.5 long narration 모바일에선 inline 표시 어려움. 매 scene 진입 시 자동 모달 → 사용자가 닫으면 색칠. 📖 버튼으로 재오픈. Locale toggle은 footer에 내장 |
| **Canvas image border 제거 (shadow only)** | v1.0 | V2.5 line-art에 이미 corner-bracket decorative border 그려져 있어 외부 rounded border와 충돌. shadow-lg로만 정의 → 사각 컨테이너가 art와 일관 |
| **Desktop width 1700px + canvas 960px** | v1.0 | 7xl=1280 + canvas 720은 wide monitor에서 자투리 공간. 1700+960으로 캔버스가 viewport 주도 |
| **waifu2x cunet 1024→2048 일괄** | v1.0 | Gemini가 2048 요청해도 1024 반환하는 경우 많음. waifu2x cunet은 line-art 전용 모델이라 edge 손실 거의 없음. 40 scene 일괄 처리 + .backups로 원본 보존 |
| **Story 4 (혹부리) prompt — 혹 = silhouette anchor** | v1.0 | "lump on jaw" 한 줄로는 Gemini 무시. character spec에 위치/크기/모양/fill region 명시 + "Mickey ears처럼 silhouette 정체성" 비유. scene별 Subject block에 3/4 angle 강제. Scene 4는 두 영감 시각 구분 (선한=clean jaw + shimmer / 욕심쟁이=merchant 한복 + 양쪽 혹) |
| **`allowedDevOrigins` next.config.ts** | v1.0 | Next.js 16 새 정책 — LAN IP에서 HMR/RSC 차단. 모바일 테스트 시 클릭은 되는데 state update 안 되는 silent failure. LAN 범위 (10.0.0.* / 192.168.*.* / 172.16.*.*) 허용 필수 |
| **사운드 절차적 합성 → 실제 오디오 샘플** | v1.1 | 사용자가 mp3/m4a 소스 직접 제공. 파일 크기는 압축(afconvert)으로 관리 가능하지만 절차적 합성의 "합성음 느낌"은 실제 녹음/샘플 대비 만족도가 낮았음 |
| **BGM은 SFX와 완전 독립 토글** | v1.1 | 배경음악을 원치 않는 사용자가 효과음까지 끄게 강제하면 안 됨. 별도 상태(`bgmOn`) + 별도 localStorage 키. 기본 OFF — 자동재생 정책 + 사용자 선택권 존중 |
| **고정 배경 폐기 → 세션당 회전 6색** | v1.1 | v1.0 "Cool minimal white" 최종안도 재차 "차갑고 회색적"이라는 피드백. 한 가지 정답을 찾으려 하기보다 다양성 자체를 기능화 — 오방색 스펙트럼 6색을 세션마다 무작위 노출해 "매번 다른 무드"를 컨셉으로 전환 |
| **액센트 색도 배경과 함께 회전** | v1.1 | 배경만 바뀌고 eyebrow/pill 텍스트가 고정 amber로 남으면 미스매치 (특히 차가운 계열 배경에서). 팔레트당 전용 accent hex로 톤 일관성 확보 |
| **데스크탑 캔버스 960px → 768px (20% 축소)** | v1.1 | 랩탑 화면(1280×800 내외)에서 캔버스+컨트롤바+팔레트가 스크롤 없이 한눈에 안 들어옴. 사용자가 직접 비율(20%) 지정 |
| **트랙패드 핀치줌 지원** | v1.1 | 데스크탑/랩탑 사용자가 모바일과 동일한 핀치 제스처를 기대함. macOS는 트랙패드 핀치를 `ctrl+wheel`로 노출하므로 기존 페이지 네이티브 줌과 충돌 — 캔버스 스코프에서만 가로채 자체 줌으로 흡수 |
| **픽커 히어로 카피 재작성** | v1.1 | 기존 카피가 SaaS 랜딩페이지 톤(가운뎃점 스펙 나열 + trust badge)이라 따뜻한 어린이 색칠책 정체성과 어긋남. 헤드라인 패턴도 "Create your own X" 같은 제네릭 문구에서 활동 중심 서술로 전환 |
| **AdSense 인증에 next/script 대신 raw `<script>`** | v1.1 | next/script는 어떤 strategy를 써도 서버 HTML에 리터럴 script 태그를 안 남김 (§10.26). AdSense 크롤러가 못 찾아서 verify 실패. plain JSX `<script>`로 교체해 해결 |
| **Bing/Pinterest도 Google과 같은 meta-tag verification 패턴** | v1.1 | `metadata.verification.other`에 커스텀 key 추가하는 방식이 이미 검증됐고(GSC), DNS TXT/파일 업로드보다 코드로 관리하기 쉬움 |
| **iOS 앱 = Capacitor WebView (SwiftUI 재작성 아님)** | v1.2 | 기존 웹 코드 100% 재사용 + 웹/앱 동시 유지보수. `server.url`로 라이브 로드해 콘텐츠 업데이트가 재심사 없이 즉시 반영. 콘텐츠 중심 앱에 최적 (§4.20) |
| **앱 내 광고는 AdMob (AdSense 아님)** | v1.2 | AdSense는 앱 WebView 내 사용이 정책 위반. AdMob이 앱 내 광고의 업계 표준. "아이폰 기본 광고"는 존재하지 않음 |
| **모바일 팔레트 peek/expand 바텀시트** | v1.2 | always-expanded는 세로 공간을 너무 먹음. 기본은 색+채우기까지만, 나머지는 접어서 iOS 바텀시트 관용에 맞춤. 툴/팔레트를 하단 고정해 그림에 최대 공간 |
| **툴바 = 그림 위 floating → 팔레트 위 별도 줄** | v1.2 | floating이 색칠 그림을 가려 clutter로 읽힘. 사용자 명시 요청으로 그림 침범 제거, 팔레트 위 줄로. 하단 고정이라 팔레트 확장은 위로 자라남 |
| **모바일 캔버스 세로 확대 + cqmin 정사각형** | v1.2 | 고정 aspect-square 박스는 확대해도 작은 사각형 안에서만 스크롤. 뷰포트를 세로로 키우되 `container-type: size` + `cqmin`으로 정사각형 유지 → 확대 시 화면 전체 사용. `m-auto`로 핀치 anchor 수식 보존 |
| **페이지 인디케이터(1/N) → 헤더로** | v1.2 | undo/erase 캡슐 안에 있으면 기능 버튼처럼 오해. 제목 줄 우측 status chip으로 분리 (사용자 지적) |
| **더블탭 줌 제외** | v1.2 | 감지하려면 모든 싱글탭에 ~250ms 지연 → "탭=즉시 채우기" 핵심 인터랙션 훼손. 트레이드오프 부적합 |
| **회전 배경 SEO 페이지 확장 — CSS 변수 주입** | v1.2 | 서버 컴포넌트는 client 훅 불가 → BackgroundShell이 `--accent` 등 커스텀 프로퍼티로 노출, 서버 렌더 자식이 `color-mix()`로 참조. 커스텀 프로퍼티는 client/server 경계 무관 cascade |
| **AdSense 스크립트를 route group으로 스코핑** | v1.2 후속 | 1차 심사 반려("screens without publisher-content") — 원인은 스크립트가 루트 레이아웃에 있어 색칠 앱(`/`) 전체에도 로드된 것. `about`/`privacy`/`folktales/[slug]`를 `(content)` route group으로 묶어 스크립트를 그 안으로만 이동. URL 단위로만 스코핑 가능해서(§10.36) 콘텐츠 있는 피커 화면도 `/`에 얹혀 있는 한 같이 제외됨 — 알려진 트레이드오프로 남김 |

---

## 13. 빠른 검증 체크리스트 (작업 끝 후 푸시 전)

- [ ] `npx tsc --noEmit` 통과
- [ ] `npm run dev`로 띄워 픽커 → 스토리 → 완성 풀 흐름 동작
- [ ] 한/영 토글 모든 텍스트 바뀜
- [ ] 📖 About 모달의 🔊 발음 재생
- [ ] 완성 시 갤러리 자동 추가 + Web Share 또는 다운로드
- [ ] 모바일 (414px 폭) bottom sheet peek + 확장
- [ ] 플립북 ←/→ 화살표 + 키보드 동작
- [ ] Console 0 에러
- [ ] 스크린샷·디버그 PNG가 루트에 안 남았는지 (`ls *.png 2>/dev/null` 결과 없어야 함)
- [ ] (v1.1+) 색칠 클릭 시 paint 사운드가 지연 없이 재생 (fill 시작과 동시)
- [ ] (v1.1+) 🎵 BGM 토글 — 켜면 루프 재생, 끄면 즉시 정지, 🔊 SFX 토글과 서로 영향 없음
- [ ] (v1.1+) 배경 회전 확인 — `sessionStorage.removeItem('coloring-storybook:bg')` 후 새로고침 시 다른 색 + 일치하는 액센트로 바뀜
- [ ] (v1.1+) 데스크탑 트랙패드/Ctrl+휠로 캔버스 확대·축소 동작
- [ ] (v1.2+) 모바일 팔레트 "More colors" 펼침/접힘 + segmented control 슬라이딩
- [ ] (v1.2+) 모바일: 툴바가 그림 안 가림 + 팔레트 하단 고정 + 페이지 인디케이터 헤더
- [ ] (v1.2+) 모바일 핀치줌이 화면 전체 사용 (⚠️ preview 자동검증 불가 — 실기기/시뮬레이터에서, §10.33)
- [ ] (v1.2+) About/Privacy/`/folktales/[slug]` 도 회전 배경 적용됐는지
- [ ] (v1.2+) iOS 앱 빌드: `cd ios/App && xcodebuild -scheme App -sdk iphonesimulator build` 성공

---

## 14. 핵심 인사이트 (디자인 비평·세션 회고에서 얻은)

1. **Typography hierarchy가 모든 화면의 기반** — Display tier 없으면 amateur 느낌
2. **Card spam을 피하라** — 모든 게 카드면 아무것도 카드가 아니다
3. **모바일 팔레트는 bottom sheet이거나 깨진 UX** — 색 ↔ 캔버스 흐름 끊지 말 것
4. **Web Share API는 마케팅 입소문의 발판** — 4:5 + 네이티브 공유 시트 = 마찰 최소
5. **🔊 한국어 발음**은 시그니처 모먼트 — 부모에게 "이 앱 진짜 교육적이다" 신호
6. **분기 엔딩 vs 정통 결말** — 옛이야기는 결말이 본질. 분기는 여정 차이로만 (v0.7 학습)
7. **이미지 한 컷 = 한 모먼트** — narration 다 표현하려 욕심내면 어린이가 못 따라옴 (v0.7 검수)
8. **모티프 중복 피하기** — 도깨비는 혹부리 영감 전용, 다른 스토리엔 까치·산신령·산토끼 등 (v0.7)

---

## 15. 연락 (지난 세션과의 교신)

### 최신 작업 (v1.2 후속, commit `adab522` — AdSense 반려 대응)

**AdSense 1차 심사 반려 → 스코핑 fix**:
- 사용자가 Google 반려 사유 전달: "Google-served ads on screens without publisher-content ... used for behavioral purposes" + "Low value content"
- 진단: AdSense 로더 스크립트가 `layout.tsx` 루트에 있어 `/` (피커+색칠 캔버스+플립북, 전부 하나의 SPA 라우트)에도 로드되고 있었음. 캔버스는 텍스트 콘텐츠 없는 순수 인터랙션 화면이라 정책 위반
- `about`/`privacy`/`folktales/[slug]`를 `src/app/(content)/` route group(URL 안 바뀜)으로 이동 + 스크립트를 담은 전용 `layout.tsx` 신설, 루트 레이아웃에선 스크립트 제거
- `npx next build` 후 `.next/server/app/*.html`에서 `grep adsbygoogle`로 `/`엔 없고 콘텐츠 페이지엔 있는 것 확인 (§7.4b, §10.36)
- `public/coloring/` 아래 도안 PNG 변경분(별도 진행 중이던 무관 작업)은 커밋에서 제외, 스테이징하지 않음
- 사용자 질문으로 트레이드오프 논의: 실제 광고 유닛이 아직 없어 즉각 노출 손실은 없음. 다만 콘텐츠 있는 피커 화면도 `/`에 얹혀 있어 스코프에서 함께 빠짐 — AdSense Auto Ads는 URL 단위로만 걸리기 때문에 SPA 상태별 분리가 불가능함이 핵심 (§10.36). 노출 확대하려면 피커를 별도 라우트로 분리 + 수동 `<ins>` 배치 필요 (미착수, §11)
- 사용자가 재심사 요청 예정

**다음 세션 체크**: AdSense 재심사 결과 확인. 통과 시 실제 광고 유닛 배치 위치 논의 + 피커 라우트 분리 여부 결정.

---

### 이전 작업 (v1.2, commits a19b50b..eabacb0 — 7개)

**iOS 앱 스캐폴딩 + 모바일 UI iOS 재설계 트랙** (한 세션):

1. **회전 배경 전 페이지 확장 + lint 클린업** (`a19b50b`)
   - About/Privacy(client) + 8개 `/folktales/[slug]`(server, `BackgroundShell`) 에 회전 배경/액센트 적용
   - `react-hooks` lint 정리: ColorPalette `Row` 모듈 스코프로 hoist(render 중 재생성 방지), ColoringCanvas `t` deps 추가, storage-hydration 6곳 근거 주석 + scoped disable

2. **넓은 창 캔버스-팔레트 간격 fix** (`03532ea`)
   - grid `[1fr_360px]` → `[minmax(0,768px)_360px]` + justify-center. 그룹 중앙 정렬로 간격 고정

3. **Capacitor iOS 프로젝트** (`ffca2fa`)
   - `brew install cocoapods` → `npm i @capacitor/{core,cli,ios}` → `npx cap add ios`
   - `capacitor.config.ts`: server.url=라이브, webDir=capacitor-www(플레이스홀더 — 기본 public/은 359MB 복사됨, §10.31)
   - 시뮬레이터 빌드+실행 검증 (풀스크린 로드, 회전 배경까지)

4. **모바일 팔레트 iOS 재설계 + floating 툴바** (`0878409`)
   - peek/expand 바텀시트, segmented control, blur, 네이티브 슬라이더 (§4.21). Artifact 목업으로 방향 합의 후 포팅
   - (이 커밋의 floating 툴바는 5에서 재조정됨)

5. **툴바를 그림 위 → 팔레트 위 별도 줄** (`7227a54`)
   - 사용자 피드백: floating이 그림 침범. `MobileFloatingToolbar` → `MobileToolbar`(일반 줄). 툴바+팔레트 하단 고정 시트로, 확장은 위로 자라남

6. **모바일 캔버스 세로 확대 + 중앙** (`515c304`)
   - 확대 시 화면 전체 사용. cqmin 정사각형 유지 + m-auto (§4.22) + elastic 핀치 경계

7. **페이지 인디케이터 → 헤더** (`eabacb0`)
   - 사용자 지적: 1/N이 undo/erase 캡슐에 있으면 버튼처럼 오해. 헤더 우측 status chip으로

**미완 (다음 세션 최우선)**: iOS 앱 출시 파이프라인 — Apple Developer 가입(2주 내) 후 AppIcon/AdMob/IAP/제출 (§11 "iOS 앱 출시" 트랙, §4.20)

---

### 이전 작업 (v1.1, commits fab7fd4..c265068 — 15개)

**사운드 + 배경 무드 + 수익화 인프라 트랙**:

1. **사운드 전면 교체 — 절차적 합성 → 실제 오디오 샘플** (`fab7fd4`, `0db5492`, `87df329`, `bd3fdb7`)
   - paint1/2/3.m4a 순환, page-turn.mp3, chime.m4a, bgm.m4a — 사용자 제공 원본을 `afconvert`로 압축 (chime 165KB→44KB, bgm 6.2MB→2.2MB)
   - 무음 트림 (paint1 552ms→326ms 등) — numpy로 앞뒤 무음 구간 계산 후 재인코딩
   - **cloneNode → element 재사용** — 짧은 파일이 production에서 무음 재생되는 버그 (§10.27)
   - **plop() 호출 위치 이동** — `floodFill().done.then()` (애니메이션 끝난 후) → fill 시작 직후로 (§10.28)

2. **BGM(배경음악) 신규 추가**
   - `BgmToggle` 컴포넌트, `sound-provider.tsx`에 `bgmOn` 상태 (SFX와 완전 독립)
   - 기본 OFF, `localStorage` 영구 저장

3. **배경 톤 — 고정 → 세션당 회전 6색** (`edda75d`, `a12e10e`)
   - v1.0 "Cool minimal white"도 "차갑고 회색적, 설화 느낌 안 남" 재차 피드백
   - `src/lib/backgrounds.ts` 신규 — 오방색 스펙트럼 6팔레트 (단청 주홍·등불 자주·청자 세이지·홍시 감·자수정 플럼·쪽빛 하늘)
   - `useSessionBackground()` — sessionStorage 기반, SSR-safe 기본값
   - **액센트 색도 함께 회전** — eyebrow/pill/divider가 팔레트 전용 accent hex 사용 (`accentAlpha()` 헬퍼)
   - Artifact로 색상 후보 시각 비교 (스크린샷이 이 세션 UI에서 안 보이는 이슈 발견 → Artifact로 전환)

4. **데스크탑 캔버스 축소 + 트랙패드 핀치줌** (`ab15dca`, `2b3dfc4`, `3a5b980`)
   - 960px → 768px (20% 축소) — 랩탑 화면에 스크롤 없이 맞춤
   - `ctrl+wheel` 감지해 트랙패드 핀치 지원 (터치 핀치와 동일 anchor 공식)
   - 100% 버튼 tooltip + footer shortcut strip에 안내 추가, footer는 좌측 정렬로 변경

5. **픽커 히어로 카피 재작성** (`c265068`)
   - SaaS 스펙-리스트 톤("Create your own storybook" + 가운뎃점 나열) → storybook 서술형
   - trust pill 문구도 재정리 ("Bilingual" → "한국어 & English")

6. **SEO/검증 확장** (`467d153`, `ea60791`, `9878d3c`, `e49a837`, `f475582`)
   - Bing Webmaster Tools meta tag 인증
   - Google AdSense 스크립트 + ads.txt (심사 요청 완료) — **next/script가 raw script 태그를 안 남기는 문제**로 verify 실패 → plain JSX `<script>`로 해결 (§10.26, 이 세션 최대 디버깅 포인트)
   - Pinterest 도메인 인증 meta tag
   - Privacy Policy에 AdSense/Analytics 고지 갱신

### 이전 작업 (v1.0, commits 9cfc30f + 이전 925c625 등)

**UI 대규모 재정비 트랙 — 한 세션에 모바일 + 데스크탑 모두 손봄**:

1. **모바일 UX 일괄 재배치**
   - MobileControlBar 재배치 — undo + page indicator 분리, primary action (Continue/Choose) 우측 끝, locale toggle은 NarrationModal로 이동
   - NarrationModal 신규 — 매 scene 자동 열림 (모바일), listen-in-Korean 발음 + LocaleToggle footer
   - MobilePaletteSheet always-expanded — chip row + 8×3 grid + fill chips + recent/harmony/contrast/L+picker
   - SoundToggle flat SVG (emoji → monochrome)
   - 핀치 zoom anchor + 1% step + rAF coalesce (zigzag 제거) + 한 손가락 pan (zoom > 1)
   - Max zoom 4 → 8

2. **데스크탑 UI 재정비**
   - DesktopControlBar 신규 (캔버스 아래 inline: undo / erase / zoom / fullscreen)
   - ColoringCanvas의 `hideToolbar` 항상 true → 외부 control bar 일관
   - Canvas image 컨테이너 rounded border 제거, shadow-lg only
   - max-w 7xl → 1700px, canvas 720 → 960px, sidebar 320 → 360px
   - ColorPalette 재구성 — always-expanded, themes → grid → fill (작은 직사각형 + 캡션) → recent → harmony → contrast → current 맨 아래
   - 일관 spacing (`<Row>` 헬퍼)

3. **배경 톤 — Cool minimal white**
   - 사용자 피드백으로 한지 → 기와 → 백자 → 달항아리 → 청자 → 안개 → 슬레이트 → warm paper → cool minimal 까지 iterate
   - 최종: `#fafbfc → #f3f5f7 → #e7eaee`
   - 동시에 amber-100/200 박스 borders → gray-400/500 (진한 회색)
   - hover에 amber 액센트는 유지

4. **Erase 기능 신규**
   - `floodfill.eraseRegion()` — line-art boundary, color tolerance 무시
   - Gradient / radial fill 영역도 깨끗 white로 복구
   - Desktop + Mobile control bar 모두 토글 버튼

5. **Theme명 IP-safe**
   - Ghibli 4종 → Sunlit Forest / Lantern Night / Cloud Garden / Deep Forest

6. **Keyboard `+/-/0`** — Shift 없이 (Cmd는 브라우저 reserved)

7. **iOS Safari fixes**
   - viewport meta (no native zoom, no double-tap zoom)
   - StoryPicker nested interactive 제거 → sibling button 패턴
   - **★ `allowedDevOrigins`** — LAN dev에서 click 안 되는 silent failure 핵심 원인. Next.js 16 새 정책

8. **Story 4 (혹부리) prompt 강화**
   - 캐릭터 spec에 혹 위치/크기/모양/silhouette anchor 명시 (Mickey ears 비유)
   - Scenes 2/3a/3b/4 Subject block — 3/4 head angle 강제
   - Scene 4 — 선한 영감 (clean jaw + shimmer) vs 욕심쟁이 (merchant 한복 + 양쪽 혹) 시각 구분
   - Scenes 2/3a/3b/4 PNG 재생성 + waifu2x 업스케일

9. **40 PNG 전체 waifu2x 1024 → 2048** — cunet 모델, .backups/coloring-NN-storyId-1024/ 백업

10. **개발 편의**
    - `scripts/dev-lan.js` — `npm run dev:lan` (0.0.0.0 + QR 코드)
    - `scripts/upscale-2x.js` — sharp 기반 배치 업스케일러

### 현재 진행 트랙
없음 (v1.2 iOS 스캐폴딩/모바일 재설계 완료). **최우선 다음 트랙 = iOS 앱 출시** — Apple Developer 가입(사용자, 2주 내)이 전제. 그 외 대기:
1. **iOS 앱 출시 파이프라인** (§11) — Developer 계정 후 AppIcon/AdMob/StoreKit IAP/App Store Connect 제출. safe-area 다듬기
2. **AdSense 승인 대기** (웹) — 결과 오면 광고 슬롯 위치 + consent 배너 (§7.4b)
3. **Pinterest 첫 푸시** — 도메인 인증 완료, 30핀 한 번에 (PINTEREST_PLAYBOOK.md §10)
4. **Touch tap target 44pt** + **Capacitor Haptics** (스와치 탭 진동)
5. **Smart palette per scene** · **즐겨찾는 색** · **a11y 감사** · **GA/Plausible + GSC Request Indexing**

### 사용자 톤 / 워크스타일
- 빠른 결정, 깔끔한 시각, 디테일 신경, 안정성 우선
- 응답 패턴: "응 가자" / "잘된다" / "이거 해줘" — 명확한 짧은 신호
- 한국어로 토론 + 영어 검색
- **Root cause 지적 선호** — surface 증상만 보지 말고 (v1.0: 모바일 클릭 안 됨 → 결국 `allowedDevOrigins`. v1.1: AdSense verify 실패 → 실제론 next/script HTML 렌더링(§10.26). v1.2: 캔버스-팔레트 간격 벌어짐 → 무스코프 `flex-1`(§10.35). 툴바 그림 침범 → floating 구조 자체 재검토)
- 시각 디자인 iteration 즐김 — 목업(Artifact)으로 방향 합의 후 코드 반영을 선호. **preview_screenshot 결과가 사용자 화면에 안 보임** → 색상/시각 비교는 Artifact(HTML)로
- **모바일/iOS 완성도에 진심** — "단순 웹사이트 복원이 아니라 iOS 로 제대로". peek/expand, 하단 고정 시트, 핀치 확대 화면 전체 사용 등 네이티브 감성 요구

---

*마지막 갱신: v1.2 후속 · AdSense 1차 심사 반려("screens without publisher-content") 대응 — 스크립트를 `/`(색칠 앱)에서 빼고 `(content)` route group(about/privacy/folktales)으로 스코핑, 재심사 요청 중. 다음: 재심사 결과 확인 + iOS 앱 출시(Apple Developer 가입 전제).*
