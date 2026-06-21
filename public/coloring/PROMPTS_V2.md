# 도안 PNG 생성 가이드 V2 (Gemini 등 AI 이미지 생성)

V1과의 차이:
- **Y-구조 5장면** (1·2 공통 → 3 분기 → 4 정통 결말)
- **모든 장면에 통일된 한국 전통 보더 프레임** (반자 무늬 + 코너 메달리온)
- **카논(원작) 결말 보존** — 분기는 여정에만, 결말은 정통
- **각 장면 narration 강화** (어머니의 운명, 의심의 단서, 남매의 정 등 원작 모티프 살림)

각 장면에 들어갈 PNG 파일 이름과 프롬프트입니다. 모두 같은 폴더(`public/coloring/`)에 그대로 떨어뜨려 주세요.

---

## 공통 베이스 프롬프트 (모든 장면에 붙여 쓰기)

```
COLORING BOOK PAGE — strict technical requirements below. Failure to follow any line item disqualifies the image.

PURPOSE
A printable / clickable digital coloring page for ages 4-10. Every enclosed white region must be paintable by a single click-to-fill bucket tool.

LINE WORK
- Style: simple flat line art only.
- Stroke: uniform thickness 5–6 pixels, pure black (#000000), zero variation.
- Strokes have rounded ends (lineCap: round) and clean joins. NO tapering, NO thin-to-thick variation, NO sketchy double lines.
- Every shape outline is ONE continuous closed loop. Two strokes that should meet MUST overlap by at least 4 pixels — never gap, never just touch.
- NO stray marks, dust speckles, loose end whiskers, signature, watermark, or texture noise.

FORBIDDEN — render NONE of these
- NO shading, NO hatching, NO cross-hatching, NO stippling, NO dotted shading.
- NO gradients, NO gray fills, NO color of any kind.
- NO black solid fills (e.g., filled silhouettes). Only outlines on white.
- NO photo-realistic rendering, NO 3D depth shading.
- NO text, NO captions, NO speech bubbles, NO numbers.

CLOSED REGIONS RULE (most important)
- Every region the colorist might want to fill (sky, ground, hair, hat, leaf, water, garment fold, animal body, building, etc.) MUST be a fully enclosed shape with no gaps.
- Mentally trace each outline with a pen — if you would have to lift the pen and re-draw to close it, the line art is WRONG.

DECORATIVE BORDER — every scene MUST include this identical frame
- Position: ~60px inside each canvas edge, forming a square inner frame
- TWO CONTINUOUS thin parallel rectangle lines:
  * Outer rectangle ~60px from canvas edges
  * Inner rectangle ~14px inside the outer (parallel to it)
  * Both UNBROKEN, going fully around all four sides — never dashed, never gapped
  * The parallel lines RUN STRAIGHT through the corner areas behind/under the
    corner motifs. The corner ornament is layered ON TOP — it does NOT break
    the parallel lines.
  * Same uniform black stroke as the rest of the line art
- FOUR CORNER MOTIFS — SMALL and SIMPLE:
  * Each corner ornament fits inside a ~50×50px box at each corner (smaller
    than before so the parallel lines visually dominate)
  * Two or three nested square-step right-angle hooks (반자 무늬 fragment)
    — like a small "ㄱ" shape stepping inward
  * NO curls, NO spirals, NO curves, NO intricate filigree — keep them
    quiet enough that the eye still reads "double rectangle frame first,
    decorative corners second"
- The four SIDES of the border are PLAIN — no repeating pattern, just the
  two clean parallel lines visible the whole way around
- Border itself is line-art only (no fills, no shading)
- The border closes off any subject line that would otherwise reach the
  canvas edge
- Subject illustration sits entirely INSIDE this border with ~40px breathing
  room
- Same border on EVERY scene of EVERY story — brand-level consistency

REJECT and re-render if:
- The parallel border lines are broken, dashed, or visibly stop at the
  corners. They must be visibly continuous all the way around — including
  passing through the corner regions.
- The corner motifs are large or busy enough that the parallel lines look
  "absorbed" into them — shrink/simplify the corner ornaments.
- The corner motifs use curves, curls, or spirals (must be right-angle
  hooks only)
- A repeating pattern runs along the four sides (sides must be plain lines)

COMPOSITION
- Square 1024 × 1024 pixels, centered subject inside the inner border.
- Medium detail — friendly, readable shapes that a 5-year-old can recognize and a 10-year-old finds interesting.

BACKGROUND
- Pure white (#FFFFFF) inside the border. No texture, no off-white tint, no shadow.

ART STYLE
- Korean traditional / minhwa folk-art sensibility — slightly stylized, friendly, big round eyes for characters and animals, NOT photo-realistic, NOT anime/chibi.
- Hanbok-clad children, traditional Korean architectural elements (한지문, 초가집, 한옥 지붕, 장독, 우물, 호롱불, 소나무, 수수밭) when relevant.

DETAIL LEVEL — DO NOT oversimplify CHARACTERS or ARCHITECTURE
(These minima are HARD requirements. An image that misses any of these
is rejected and re-rendered.)

CHARACTER FACES — every visible character face MUST show:
- Two eyes EACH with an outer eye shape + a clearly drawn iris (round shape
  inside the eye) + a small pupil dot in the iris. NOT just dots, NOT just
  closed-eye curves (unless the character is sleeping).
- A small nose line (one short curved or angled line — not absent).
- A mouth line (one curve for closed/smiling, or a small oval for speaking).
- 3–5 hair strand lines visible (not a flat helmet of hair).
- Ear shape on the side (one simple ear curve).
- For characters facing front: both eyes visible. For 3/4 view: at least one
  full eye + nose bridge hint.

GARMENTS — hanbok / diving suit / robes MUST show at least 4–5 internal
lines, including:
- Collar line (깃) — the V-shaped or rounded neckline edge
- Ribbon (고름) on hanbok — the bow tie at chest
- Sleeve cuff line — where the sleeve ends at the wrist
- Hem line — where the garment ends at the leg/ankle, with at least 2-3
  gathered fold lines
- One belt / sash line at the waist if the garment has one
- For diving suit / fitted clothing: a neckline + sleeve cuff + waist seam +
  ankle cuff = 4 lines minimum. NEVER render fitted clothing as a single
  flat silhouette without internal lines.

ARCHITECTURE — built elements MUST show internal structure:
- Doors: wood grain (2-4 vertical lines) and any paper panel grid
- Korean thatched roof: slanted straw lines across the roof surface
- Jeju traditional house (제주 초가): ROPE GRID pattern criss-crossing the
  thatch (this is the distinctive Jeju feature — REQUIRED when a Jeju
  house appears, not a generic dome)
- Stone wall (돌담): individual stones clearly outlined as separate regions
- Basket / net bag: criss-cross weave pattern visible
- Oil lamp (호롱불): bowl + visible wick + flame shape, not just a glow blob

PROPS — Korean tool/object specifics (Gemini often substitutes Western
equivalents — call these out explicitly):
- 빗창 (bitchang, haenyeo's diving hook): a SHORT CURVED METAL HOOK with a
  wooden handle, ~30cm long. NOT a ship's anchor, NOT a fish hook. Looks
  like a small sickle or pry bar with a curved point. If the prompt mentions
  bitchang, say "small curved metal hook (NOT a ship's anchor)".
- 테왁 (tewak): orange ROUND buoy with a net bag below. NOT a fishing float
  on a line.
- 호롱불: small oil bowl with a single wick sticking up + a flame.
- 지게 (A-frame carrier): wooden A-shape on the back, NOT a backpack.
- 동아줄 (dong-a-jul): thick BRAIDED rope, NOT a smooth single rope.

TARGET: a 5-year-old should see "many things to color" — at least 12–15
distinct enclosed regions per scene. AVOID the "minimal flat sticker"
look. Aim for "traditional Korean picture book illustration with delicate
line work".

COMMON MISSES — explicitly check before accepting an image:
1. Are the character's eyes just two dots? → reject. Iris + pupil required.
2. Does the diving suit / hanbok have ZERO seam lines? → reject. 4-5 lines
   required.
3. Did Gemini substitute a ship's anchor for the bitchang hook? → reject
   and specify "small curved metal hook, not an anchor".
4. Are the Jeju houses smooth domes without rope-grid texture? → reject and
   call out 제주 초가 rope grid explicitly.
5. Is the border ornament so busy that the parallel lines disappear into
   the corner? → reject and demand simpler corner motifs.

GROUPED NATURAL TEXTURES — DO NOT oversummate small elements
Natural textures with many small repeating units (tree foliage, pine needles, grass, leaves, water ripples, grain stalks, clouds, stars) MUST be drawn as a few LARGE grouped clusters, NOT as individual elements. The colorist should be able to fill each group with ONE click.

- Pine tree foliage: 6–10 large fluffy "cloud-shaped" or fan-shaped foliage clusters, NOT individual needles. Each cluster is one fill-able region.
- Leafy tree foliage: 4–8 rounded blob clusters, NOT individual leaves.
- Tree trunk: only 2–4 vertical wood-grain lines, NO detailed bark texture, NO heavy hatching.
- Grass / bushes: small fan-shaped tufts (3–5 strokes each), spaced apart with white between them. Don't carpet the ground.
- Grain field (sorghum 수수, rice, etc.): bundled stalks — show as 5–8 GROUPS of 3–5 vertical stems sharing one grain head per group, NOT 30 individual stalks.
- Clouds: 2–4 simple billowy outlines per scene, big and soft, NOT detailed wisps.
- Water ripples: 2–3 concentric arcs around a single point, not many.
- Stars: simple 5-point shapes, 8–15 scattered, all the same simple star icon — not detailed sparkles.

REJECT if any individual leaf / needle / blade of grass / single grain stalk is drawn as its own enclosed region — that means too many tiny clicks. Group them.

OUTPUT
- 1024 × 1024 PNG.
- High-resolution square. If the model wants to output smaller, override: "render at full 1024×1024, do not downscale".
```

위 베이스 + 아래 장면 설명을 합쳐서 한 번에 넣으세요.

---

## 🔁 결과물 검수 체크리스트 (각 PNG 받자마자)

**선 기본**
1. **줌 인 (300%)** — 모든 윤곽선 닫혀 있나? 두 선이 만나는 곳에 갭이 있으면 ❌ → 재생성
2. **자동 색칠 테스트** — 인접 영역 한 곳에 단색으로 바켓 채우기 시도. 의도하지 않은 영역까지 색이 새면 ❌
3. **스트로크 두께** — 같은 굵기인가? 어떤 선만 가늘면 그 부분에서 누출 위험 → 재생성

**금지 사항**
4. **검정 채움** — 솔리드 검정 영역 있으면 ❌
5. **그림자/해칭** — 회색 점·선 있으면 ❌
6. **워터마크/사인** — 어디에도 없어야 함

**보더 (외각 프레임)**
7. **연속성** — 두 평행 사각선이 네 변 모두 끝까지 명확하게 보이나? 코너에서 흐름이 끊긴 듯 보이면 ❌ → 재생성하며 코너 ornament 더 작게 (~50×50px)
8. **코너 디자인** — 4코너 ornament가 직각 반자(L-step)뿐인가? 곡선이 섞이면 ❌
9. **여백** — 보더 안쪽 최소 5% 여백 있나?

**캐릭터 디테일 (가장 자주 빠지는 부분)**
10. **얼굴** — 모든 인물 얼굴에 ◯ 외곽 + 홍채 + 동공 + 코 라인 + 입 라인 + 머리카락 3-5선 + 귀 형태가 있나? 눈이 점 두 개뿐이면 ❌
11. **의상** — 한복/잠수복에 4-5선 (깃·고름·소맷부리·치마단·허리선)이 다 보이나? 단순 실루엣이면 ❌
12. **소품 정확성** — 빗창이 닻으로, 테왁이 일반 부표로, 지게가 백팩으로 등 서구 도구로 대체된 곳 없나?
13. **건축 디테일** — 문 나무결, 한지문 격자, 제주 초가 로프 격자, 돌담 개별 돌 윤곽 등 살아있나?

→ 한 항목이라도 ❌면 재생성. 후속 프롬프트 스니펫은 아래 참고.

→ 한 항목이라도 ❌면 재생성. 후속 프롬프트 한 줄 추가 팁:
- 닫히지 않은 선이 있을 때: `"Re-render. Every outline MUST close — overlap meeting strokes by 4px or more."`
- 회색·해칭이 섞일 때: `"Re-render. Remove all gray fills, hatching, and shading. Only pure black outlines on pure white."`
- 솔리드 검정이 나올 때: `"Re-render. NO filled black regions — silhouettes must be hollow outlines only."`
- 보더 없거나 불규칙할 때: `"Re-render. Add a border 60px from each edge: TWO CONTINUOUS thin parallel rectangle lines (~14px apart, unbroken all the way around — they must pass STRAIGHT through the corner regions). Add small right-angle meander hooks (~50×50px) at each of the 4 corners only, sitting OVER the parallel lines without breaking them. NO pattern along the sides."`
- 보더 선이 코너에서 흐름 끊긴 듯 보일 때: `"Re-render. The two parallel border rectangles must visibly continue STRAIGHT through every corner. Shrink the corner ornaments to ~50×50px and keep them simple (2-3 nested right-angle hooks only) so they sit OVER the lines instead of absorbing them."`
- 코너에 곡선이 나올 때: `"Re-render. The 4 corner motifs must be RIGHT-ANGLE geometric hooks only (반자 무늬) — small nested L-shapes turning inward. NO curls, NO spirals, NO curves."`
- 인물 얼굴이 너무 단순할 때 (점 두 개 눈): `"Re-render. Every character face must show: two eyes EACH with an outer eye shape + iris circle + pupil dot, a nose line, a mouth line, 3-5 hair strand lines, and an ear shape. NOT just dots for eyes."`
- 의상에 라인이 없을 때 (밋밋한 실루엣): `"Re-render. The character's hanbok/diving suit must show at least 4-5 internal lines: collar/neckline, ribbon or sash, sleeve cuff, hem with fold lines, waist seam. NOT a flat silhouette."`
- Gemini가 빗창을 닻으로 그릴 때: `"Re-render. Replace the anchor with a 빗창 (bitchang) — a small curved metal hook with a short wooden handle, like a small sickle or pry bar. NOT a ship's anchor."`
- 제주 초가집이 그냥 둥근 돔으로 나올 때: `"Re-render the Jeju thatched houses (제주 초가) with their distinctive ROPE GRID pattern criss-crossing over the thatch — a network of straight rope lines forming a wide square grid across the roof. This is the signature Jeju feature."`
- 그림이 너무 단순할 때 (전체적으로): `"Re-render with more detail. Apply ALL the DETAIL LEVEL rules strictly: faces with iris+pupil+nose+mouth+hair+ears; garments with 4-5 seam lines; architecture with wood grain / paper panels / rope grids / weave patterns. Target 12-15 distinct enclosed regions per scene."`

---

# 🌙 Story 1 — 해님 달님 (Sun and Moon)

**구조**: Y-구조 (1·2 공통 → 3 분기 → 4 정통 결말)

```
                ┌── 3a (소나무 분기) ──┐
1 → 2 (선택) ──┤                       ├── 4 (정통 결말)
                └── 3b (우물 분기) ────┘
```

5장면, 한 회 플레이 시 4장면. 분기 1회.

---

## Scene 1 — `01-folktale/scene-1-knock.png`

**제목 ko**: 1장. 늦은 밤의 문 두드림
**제목 en**: Chapter 1 — Late-Night Knock

**Narration KO**:
> 깊은 산속 작은 초가집. 어머니는 새벽부터 떡 광주리를 머리에 이고 장에 가셨다. "곧 돌아올게, 문 잘 닫고 있으렴." 하지만 해가 지고 달이 떠도 어머니는 돌아오시지 않았다. 호롱불이 깜빡이는 방, 오빠는 잠 못 드는 동생을 꼭 안고 문 쪽을 지켜보았다. 그때 — 똑똑똑. "얘들아, 엄마야. 떡을 가져왔단다." 그런데 그 목소리가 어딘가 굵고 낯설었다.

**Narration EN**:
> A small thatched-roof house deep in the mountains. Mother had set out at dawn with a basket of rice cakes balanced on her head. "I'll be back soon — keep the door closed." But the sun set, the moon rose, and still she had not returned. In the flickering lamplight the older brother held his sleepless little sister close, watching the door. Then — knock, knock, knock. "Children, it's Mother. I've brought rice cakes." But the voice was strangely low, strangely strange.

**다음 장면**: → Scene 2 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Wide interior establishing shot — show the whole one-room cottage.
The camera is pulled BACK, taking in the full room. Door is small in the background.

Subject: Inside a cozy small Korean thatched-roof cottage at deep night. The full
room is visible: traditional wood-plank floor, a small paper-screen window
(한지창) on the LEFT wall through which a large round full moon is clearly
visible outside, with three small distant mountain silhouettes. A low wooden tea
table (소반) center-front with a small traditional Korean oil lamp (호롱불 —
oil bowl + wick + small flame). Behind the table, the older brother (~10,
hanbok) sits cross-legged on the floor, gently cradling his drowsy younger
sister (~6, hanbok with ribbon) against his shoulder — the sister's eyes are
half-closed but the brother is awake and watchful. Back wall has: a tall wooden
chest of drawers with an EMPTY bamboo rice-cake basket on top (signaling mother
hasn't returned). A small paper-paneled door (한지문 — visible grid of paper
panels) is at the BACK-RIGHT of the canvas, smaller than the window, closed.
A folded blanket (이불) on the floor near the children. A few clay water bowls
on a low shelf. The thatched roof beams (서까래) visible at the very top of
the interior view.

Mood: domestic intimacy + quiet loneliness + the long wait — pre-tension, not
yet alarmed. This scene is about ABSENCE (mother gone) and ATMOSPHERE, not
about confrontation yet.

Composition: WIDE interior, low-medium camera angle. Window with moon on the
LEFT (~25% of frame), siblings and tea table CENTER (occupying middle 50%), the
small back door visible at BACK-RIGHT in the distance (~15%). Lots of room
detail filling the space — chest, blanket, bowls, beams.
```

---

## Scene 2 — `01-folktale/scene-2-decision.png`

**제목 ko**: 2장. 두 가지 시험
**제목 en**: Chapter 2 — Two Tests

**Narration KO**:
> 오빠는 동생의 손을 꼭 잡고 가만히 문 앞으로 다가갔다. 어머니라면 이런 목소리일 리 없다. 어떻게 정체를 확인하지? "어머니, 손을 한 번 보여주세요." 손이 정말 거칠다면 호랑이가 분명하다. "어머니, 자장가를 한 번 불러주세요." 목소리에 으르렁 소리가 섞인다면 호랑이가 분명하다. 두 시험 중 하나를 택해야 한다.

**Narration EN**:
> The brother took his sister's hand and crept closer to the door. Mother's voice never sounded like this. How could they be sure? "Mother, would you show us your hand?" If the hand was rough, it had to be the tiger. "Mother, would you sing us a lullaby?" If the voice growled deep inside, it had to be the tiger. They had to choose one test.

**선택지**:
- 🖐 `손을 보여달라고 한다` / `Ask to see the hand` → **Scene 3a (소나무)**
- 🎵 `자장가를 불러달라고 한다` / `Ask for a lullaby` → **Scene 3b (우물)**

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Tight close-up at the threshold. The paper-paneled door (한지문)
fills MOST of the canvas — large, looming, dominant. Camera angle slightly LOW,
looking up toward the door. Completely different composition from Scene 1 —
this is claustrophobic, vertical, confrontational.

Subject: The closed paper-paneled door (한지문) dominates the canvas, occupying
~70% of the frame. Show the door's full panel grid (3 columns × 5 rows of
paper-paneled squares) with subtle wood frame between panels. Behind the door's
translucent paper panels, a LARGER, more menacing tiger silhouette than Scene 1
— show the curve of a hulking back, two pointed ears, the outline of a snout
pressing slightly against one panel from outside. The silhouette is hinted-at
but unmistakably a big tiger. At the BOTTOM of the canvas, small in the
foreground, the brother (~10, hanbok, from BEHIND — we see his back and
hair) crouches with one arm extended toward the door's lower edge, palm up
— performing the "show me your hand" gesture. Right beside him, the sister
(~6, hanbok, also from a 3/4 back view) leans with her ear toward the door
panels, hands clasped in front of her — listening for the "lullaby" voice
test. Show BOTH gestures clearly. Tiny details on the door: small metal ring
handle, lower wooden threshold board with subtle grain. A bit of the cottage
floor visible in the foreground, with the oil lamp glow casting up onto the
door from below-left (lamp itself is OFF-FRAME this time).

Mood: dread, threshold confrontation, the children small against the looming
door — TIGHT and DRAMATIC, not the cozy wide of Scene 1.

Composition: VERTICAL emphasis — towering door fills the middle-and-upper
canvas, children small at the bottom seen from behind/3-quarter back. The
tiger silhouette behind the paper panels is the visual climax.
```

---

## Scene 3a — `01-folktale/scene-3a-pine.png` (소나무 분기)

**제목 ko**: 3장. 달빛 아래 소나무
**제목 en**: Chapter 3 — Under the Moonlit Pine

**Narration KO**:
> "어머니의 손은 이렇게 거칠지 않아요!" 오빠가 소리쳤다. 호랑이가 으르렁 발톱을 드러내자 오누이는 뒷문을 열고 산속으로 달렸다. 달빛이 환한 곳에 거대한 소나무 한 그루가 가지를 펼치고 서 있었다. 오빠는 동생을 먼저 올려 보내고 뒤따라 올라갔다. 호랑이가 곧 따라와 나무 아래에서 물었다. "거기 어떻게 올라갔니?" 오빠가 짐짓 거짓으로 답했다. "참기름을 발랐지요." 호랑이가 부엌으로 달려간 사이, 오누이는 더 높은 가지로 옮겨가며 하늘을 올려다보았다.

**Narration EN**:
> "Mother's hand is never this rough!" the brother shouted. The tiger growled and bared its claws — the siblings flung open the back door and ran into the mountains. In a moonlit clearing stood a giant old pine tree with wide, spreading branches. The brother lifted his sister up first, then climbed after. Soon the tiger arrived, sniffing at the trunk: "How did you climb up there?" The brother answered cleverly: "We rubbed sesame oil on the bark." While the tiger ran off to find some, the siblings climbed higher and looked up at the sky.

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
Subject: An outdoor moonlit Korean mountain scene. A huge old Korean pine tree (소나무 — gnarled trunk, layered scaly bark, wide horizontal branches with clusters of needle bundles) stands at center. High on a thick lower branch sit the brother (~10) and sister (~6) in hanbok, brother helping sister stay safe — his arm around her. Their hanbok hems flutter slightly. At the base of the trunk on the ground, a stylized friendly Korean minhwa-style tiger (NOT realistic — large round eyes, rounded face, bold flat stripes, friendly proportions) looks up at the children with paws on the trunk and mouth slightly open as if speaking. Around the tiger's feet: a fallen straw sandal and a small overturned pot of sesame oil (참기름 — show a small ceramic pot, not detailed liquid). Upper-right of the sky: a large round bright moon with a few stylized clouds. Pine cones and pine needles on the ground. Small mountains in the distant horizon.

Mood: tense night-time chase but with folktale charm — clever children, fooled tiger.
Composition: massive pine tree filling center vertical, siblings on a branch upper-mid, tiger at base of tree, moon upper-right, sesame oil pot near tiger.
```

---

## Scene 3b — `01-folktale/scene-3b-well.png` (우물 분기)

**제목 ko**: 3장. 우물에 비친 보름달
**제목 en**: Chapter 3 — The Full Moon in the Well

**Narration KO**:
> "어머니라면 자장가를 부르실 거예요." 오빠가 말하자 문 너머에서 으르렁 깊은 울음이 새어 나왔다. 오누이는 옆문으로 빠져나와 뒤뜰의 우물 쪽으로 달렸다. 우물 속 검은 물 위에 보름달이 동그랗게 비쳐 있었다. 오빠는 동생을 큰 장독 뒤에 숨기고, 자기는 우물가에 살짝 그림자를 드리워 호랑이를 유인했다. 호랑이는 우물 속에 비친 그림자를 진짜 아이로 알고 고개를 들이밀었다. 그 사이 오빠는 동생의 손을 잡고 하늘을 올려다보며 두 손을 모았다.

**Narration EN**:
> "If you were Mother, you would sing us a lullaby," the brother said. From beyond the door came only a low growl. The siblings slipped out the side door and ran to the well in the back yard. In the dark water, the full moon shone round and clear. The brother hid his sister behind a tall fermenting jar and let his own shadow fall over the well's edge to draw the tiger close. The tiger thought the reflection was the children and peered down inside. While it was distracted, the brother took his sister's hand, looked up at the sky, and pressed his palms together to pray.

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Mid-range outdoor night shot, balanced composition with the stone
well as the central focal anchor. Horizontal/symmetrical emphasis.

Subject: An outdoor moonlit Korean backyard. A traditional Korean round stone
well (우물) at the center foreground — low circular wall built of clearly
defined individual stones (show ~10-14 distinct stones, each its own enclosed
region — NOT a blurred mass), single wooden crossbeam across the top with a
small wooden bucket-pulley. Inside the well opening, on the dark water surface,
a perfectly round bright reflection of the full moon (one clean fill-able
region). Behind the well to the LEFT, a large traditional Korean fermenting
jar (장독 — wide rounded body with subtle horizontal banding at the shoulder).
The little sister (~6, hanbok with ribbon) hides crouched behind the jar — only
her face and one hand peeking around its side. To the RIGHT of the well, the
older brother (~10, hanbok) stands close to the well's edge in a quiet,
careful pose. From the FAR RIGHT, a stylized minhwa-style tiger (cute round
eyes, bold flat stripes — same style as Scene 3a, friendly proportions, NOT
realistic) leans its head and front paws down into the well opening, eyes
fixed puzzled on the moon-reflection. UPPER-RIGHT sky: the real full moon,
large and round (one circle). UPPER-LEFT: 2-3 simple cloud shapes. BACKGROUND
behind the jar and brother: a section of traditional hanok rooftop with curved
tile eaves (show ~6-8 visible roof tiles as repeated curved units), and a few
straight horizontal lines suggesting the wall. AT GROUND LEVEL around the
well: 3-4 small fan-shaped grass tufts (spaced apart, NOT a carpet), one or
two small pebbles. Apply the GROUPED NATURAL TEXTURES rule strictly — clouds
simple, grass in tufts, NO individual leaves.

Mood: clever hide-and-seek — children outwitting the tiger by the moonlight.
Composition: BALANCED HORIZONTAL — stone well dead center foreground, sister-and-jar
forming the left pillar, brother-and-tiger forming the right pillar, hanok
rooftop and moon spanning the upper band, ground tufts the lower band.
```

---

## Scene 4 — `01-folktale/scene-4-rope.png` (정통 결말)

**제목 ko**: 마지막 장. 하늘로 오른 동아줄
**제목 en**: Final — The Rope That Climbed to the Sky

**Narration KO**:
> "하늘이시여, 저희를 살리시려거든 튼튼한 동아줄을, 저희를 거두시려거든 썩은 동아줄을 내려주세요." 오빠가 빌자 하늘에서 굵고 튼튼한 금빛 동아줄이 스르르 내려왔다. 오누이는 그 줄을 잡고 별 사이로 올라갔다. 호랑이도 따라 빌었지만, 호랑이에게는 썩은 동아줄이 내려왔고, 줄은 곧 끊어져 호랑이가 수수밭 위로 떨어졌다. 그날 이후 수수는 호랑이의 피로 붉게 물들었다. 처음엔 동생이 해님이었지만 사람들이 자꾸 자기 얼굴을 쳐다보는 게 부끄러워, 오빠와 자리를 바꿔달라 부탁했다. 그래서 오빠는 해님이 되어 낮을 환히 밝히고, 동생은 달님이 되어 조용히 밤을 비추게 되었다.

**Narration EN**:
> "Heaven above — if you mean us to live, send down a strong rope. If you mean us to fall, send a rotten one." A thick golden rope unwound from the sky and lowered to the siblings. They held on and rose up through the stars. The tiger prayed too, but the rope it received was frayed and rotten. It snapped, and the tiger tumbled down onto a field of sorghum. From that day, sorghum has been stained red with the tiger's blood. At first the little sister became the Sun — but she felt shy whenever people looked up at her face, and she asked her brother to trade places. So the brother became the bright Sun who lights the day, and the sister became the quiet Moon who lights the night.

**Ending Label**: ☀️🌙 `해님 달님 — 정통 결말` / `Sun and Moon — the canonical ending`

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Mythic split-canvas night sky scene. Vertical movement (rising vs
falling). The canvas reads in two halves — left/right — telling two destinies
at once.

Subject: A magical night sky climax with two parallel destinies.

LEFT HALF (the saved):
- A thick, well-braided golden rope (동아줄 — show clear twist/braid pattern,
  4-5 visible plait lines along its length) descending from billowing clouds
  at the TOP-LEFT down toward mid-left
- The brother (~10) and sister (~6) in hanbok hold the rope together as they
  rise — brother above, gripping the rope with one hand and steadying the
  sister below him with the other. Both look UP toward the clouds.
- ABOVE the clouds at the very upper-left corner: a stylized smiling SUN FACE
  (round face with ~8 short straight rays around it) and beside it a calm
  CRESCENT MOON FACE (gentle expression) — both as simple single-region
  shapes, NOT detailed.
- 2-3 LARGE billowing cloud shapes around the rope's upper end (simple
  outlines, no wispy detail).

RIGHT HALF (the fallen):
- UPPER-RIGHT sky: a separate frayed broken rope dangling mid-air, end clearly
  snapped (~3-4 splintered fiber lines at the break, not many).
- MID-RIGHT to LOWER-RIGHT: a stylized minhwa-style tiger (same style as
  Scenes 3a and 3b — cute round eyes, bold flat stripes, friendly proportions)
  shown mid-fall, paws up, mouth in surprised "O", tail flipping.
- BOTTOM-RIGHT corner: a field of sorghum (수수) — show as 5-7 BUNDLED GROUPS
  of stalks. Each group is 3-4 vertical lines sharing one bushy grain head at
  the top. Each group is ONE fill-able region. Do NOT draw 30 individual
  stalks. The tiger is falling toward these groups.

BACKGROUND across both halves:
- MIDDLE-BOTTOM horizon: a small distant Korean village (3-4 simple thatched
  roof silhouettes with curved eaves, one or two hanok walls)
- NIGHT SKY across the whole canvas: 10-15 simple 5-point stars scattered
  evenly, all the SAME simple star icon (one region each, not detailed
  sparkles)

Apply GROUPED NATURAL TEXTURES rule strictly: sorghum in bundled groups,
clouds as 2-4 big shapes, stars as simple repeating icon.

Mood: cosmic justice, transformation, awe — the climax of a Korean folktale.
Composition: SPLIT-CANVAS — ascending column on the LEFT (rope + siblings +
sun/moon faces + clouds), descending column on the RIGHT (broken rope + tiger
mid-fall + sorghum field), distant village across the lower middle as a
unifying horizon, stars across the whole upper background.
```

---

# 📋 받은 PNG 체크리스트 (해님 달님)

배치 위치: `public/coloring/01-folktale/` (기존 폴더에 덮어쓰기 또는 별도 백업 후 교체)

- [ ] `scene-1-knock.png` — 1장. 늦은 밤의 문 두드림
- [ ] `scene-2-decision.png` — 2장. 두 가지 시험 (분기 시작)
- [ ] `scene-3a-pine.png` — 3장 분기 A. 달빛 아래 소나무
- [ ] `scene-3b-well.png` — 3장 분기 B. 우물에 비친 보름달
- [ ] `scene-4-rope.png` — 마지막 장. 하늘로 오른 동아줄 (정통 결말)

---

# 🛠️ 통합 시 필요한 코드 작업

5장이 다 모이면 다음 작업을 한꺼번에:

1. **Scene 타입 확장** — 1-choice (linear) 지원
   - `choices?: [Choice] | [Choice, Choice]` 또는 별도 `nextId?: SceneId`
2. **렌더링 업데이트** — 1-choice 시 "Continue → / 다음 이야기로 →" 단일 버튼
3. **`src/lib/story.ts`** — folktale 데이터 위 narration + 새 구조로 교체
4. **기존 5장면 백업 유지** — 이미 `v0.6-scenes-original` 태그 + `.backups/coloring-v0.6/` 에 있음. 새 5장만 교체

---

*V2는 해님 달님부터 시작. 검증되면 나머지 7개 스토리도 같은 Y-구조 + 보더 + 정통 결말 패턴으로 점진 적용.*

---

# 🌊 Story 2 — 해녀와 인어 (The Haenyeo and the Mermaid)

**원작 배경**: 제주 해녀 문화 + 한국 바다 정령 전설을 엮은 이야기. 해녀는 제주 고유의 여자 잠수부 (유네스코 무형 문화유산).

**Y-구조**: 1·2 공통 → 3 분기 (산호 미로 / 해초 숲) → 4 정통 결말 (진주를 돌려주고 수호자가 됨)

```
                ┌── 3a (산호 미로) ──┐
1 → 2 (선택) ──┤                    ├── 4 (정통 결말: 수호자)
                └── 3b (해초 숲) ────┘
```

5장면, 한 회 플레이 시 4장면. 분기 1회. 두 길 모두 "진주는 바다의 것"이라는 깨달음으로 수렴.

---

## Scene 1 — `02-haenyeo/scene-1-shore.png`

**제목 ko**: 1장. 새벽 바다 앞에서
**제목 en**: Chapter 1 — At the Dawn-Lit Shore

**Narration KO**:
> 옛날, 제주 바다 어느 마을에 한 해녀가 살고 있었더라. 그녀의 어머니도 해녀였고, 그 어머니의 어머니도 해녀였단다. 한 집안의 여인들은 대대로 같은 바다에 들어가 같은 물질을 했고, 같은 갯바위에서 같은 노을을 보며 자랐다.
>
> 그날 새벽, 해녀는 아직 별이 보이는 시간에 일어났다. 어머니가 남겨준 낡은 잠수경을 손바닥에 올려 한참을 들여다보았다. "오늘은 더 깊은 곳까지 가봐야겠어요." 어머니에게 인사하듯 중얼거리고는, 검은 잠수복을 단단히 여미었다.
>
> 갯바위에 나가 앉았다. 주황색 테왁을 옆에 두고, 빗창을 허리에 매었다. 바다는 아직 어두운 푸른빛인데, 동쪽 하늘 끝이 천천히 붉어지기 시작했다. 갈매기 한 마리가 멀리서 원을 그리며 날아갔다.
>
> "바다 어머니, 오늘도 잘 부탁드립니다."
>
> 해녀는 두 손을 모아 한 번 절을 하고, 깊게 숨을 들이쉬었다. 그러고는 푸른 바다 속으로 미끄러져 들어갔다.

**Narration EN**:
> Long ago, in a fishing village on the southern Jeju coast, there lived a haenyeo — a woman who could swim into the deep on a single breath. Her mother had been a haenyeo, and her mother's mother before her. For generations the women of that family had slipped into the same sea, dove the same deeps, sat upon the same shore-rocks watching the same long evenings.
>
> One dawn, before the stars had faded, she rose. She held her mother's old swimming goggles in her palm and gazed at them a while. "Today I will go a little deeper." She fastened the goggles and drew on her dark diving suit.
>
> Beside her on the shore-rock she set down her orange tewak buoy, and at her hip she tied her bitchang hook. The sea was still dark, but the eastern edge of the sky was slowly turning red. Far off, a single gull traced a slow circle.
>
> "Mother of the Sea, please keep me safe today."
>
> She bowed once with her two palms together, drew one long, deep breath, and slipped into the blue.

**다음 장면**: → Scene 2 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Wide outdoor establishing shot at coastal dawn. Horizontal landscape
emphasis — half sky, half sea-and-rocks. The haenyeo is mid-foreground, full
body visible.

Subject: A Jeju coastal scene at dawn. Center-foreground: a Korean haenyeo
(woman diver, ~30 years old). She wears a traditional dark diving suit
(잠수복 — full-body cover with visible neckline and sleeve cuff lines), hair
tied back in a bun with a head-cloth, swim goggles (잠수경 — round lenses
joined by a band) pushed up on her forehead. She sits on a flat lava-rock
ledge in profile, one knee up, looking toward the sea. Beside her on the
rock: a round tewak (테왁 — orange floating buoy ball with a small net bag
hanging underneath holding shellfish — show net pattern as criss-cross
weave, ~6-8 visible diamond cells) and a small curved diving hook (빗창).

LEFT BACKGROUND: a stretch of Jeju 'oreum' (volcanic hillside, gentle round
shape) silhouette and 2-3 small Jeju traditional thatched houses (초가집 with
ropes crossing the roof, distinct from mainland thatched — show roof-rope
grid pattern). In front of the houses, a low Jeju 돌담 (basalt stone wall
made of stacked rough lava stones — show ~8-10 distinct stones as fill-able
regions).

RIGHT: the sea stretching toward the horizon, with 2-3 simple wave outlines
near the rock. Above the horizon, a stylized rising sun (round, partly above
the sea line, with 6-8 simple straight rays). Sky has 2-3 large soft cloud
shapes (one fill-able region each).

UPPER-RIGHT: a single seagull mid-flight (simple V-wing outline).

Apply GROUPED NATURAL TEXTURES strictly: rocks as ~8-10 distinct stones,
waves as 2-3 outlines, clouds as 2-3 big shapes, NO individual feather/wave
detail.

Mood: peaceful, anticipatory dawn — a working morning, before the dive.
Composition: WIDE landscape. Haenyeo + tewak in lower-left foreground (~30%),
sea + sun in the right half (~40%), village + oreum upper-left background,
seagull upper-right.
```

---

## Scene 2 — `02-haenyeo/scene-2-deep.png`

**제목 ko**: 2장. 두 갈래 빛
**제목 en**: Chapter 2 — The Two Lights

**Narration KO**:
> 물속은 처음에는 환했다. 햇살이 부서져 내려와 모래밭을 알록달록하게 비추었다. 하지만 해녀가 더 깊이 헤엄칠수록 빛은 점점 흐려졌다. 5미터, 10미터, 15미터… 익숙한 깊이를 지나, 어머니도 다 가보지 못한 곳으로 향했다.
>
> 가슴이 답답해질 무렵, 어둠 속에서 무엇인가가 깜빡였다. 푸른빛이었다. 가까이 갈수록 더 또렷해지는, 살아 있는 듯한 빛.
>
> "무엇이지?"
>
> 그 빛을 따라 한참을 더 내려가니, 바닷속 깊은 곳에 길이 두 갈래로 나뉘어 있었다. 왼쪽으로는 색색의 산호가 미로처럼 얽혀 있고, 오른쪽으로는 키 큰 해초들이 부드럽게 흔들리고 있었다.
>
> 어머니의 목소리가 귓가에 들리는 듯했다. "얘야, 바다는 두 얼굴을 가졌단다. 한쪽은 노래로 말하고, 한쪽은 침묵으로 말한단다."
>
> 해녀는 숨이 다 떨어지기 전에 결정해야 했다.

**Narration EN**:
> The shallow water was bright. Sunlight broke into ribbons across the sandy floor. But the deeper she went, the dimmer the world became. Five meters, ten, fifteen — past the depth her mother had taught her, into water she had never tasted before.
>
> Her chest was tightening when something blinked in the dark. A blue light, faint, then clearer — alive, almost breathing.
>
> "What is that?"
>
> She followed it down, and at last the path divided. To her left, branches of colored coral wove like a maze. To her right, tall kelp swayed in a long slow current.
>
> Her mother's voice rose from memory: "Child, the sea has two faces. One speaks in song, the other in silence."
>
> She had to choose before her breath was gone.

**선택지**:
- 🪸 `산호 미로로 들어간다` / `Enter the coral maze` → **Scene 3a**
- 🌿 `해초 숲으로 들어간다` / `Enter the kelp forest` → **Scene 3b**

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Underwater mid-shot. Haenyeo is small-to-medium in the canvas — the
DEEP WATER and the TWO PATHS are the real subject. Slight downward angle (the
light is below). Vertical emphasis (depth).

Subject: A deep underwater scene. The haenyeo (same diving suit + goggles
NOW down over her eyes + held breath + hair flowing slightly) is in the
upper-middle of the canvas, mid-swim, body slightly tilted forward. Bubbles
rise from her mouth in 2-3 SIMPLE GROUPED bubble clusters (not many little
bubbles — each group is 1 enclosed region).

The water around her is dark — indicate this with a few wavy current lines
(no fills, NO hatching). In the MIDDLE-BOTTOM, a single faint round blue
glowing orb visible in the distance (one clean round region).

The path forks below: TO THE LEFT, the entrance to a CORAL MAZE — show
3-4 large stylized coral cluster shapes (NOT individual polyps), like
branched mushroom shapes or fan corals, each as ONE fill-able region. TO
THE RIGHT, the entrance to a KELP FOREST — show 4-5 tall vertical kelp
fronds in 2-3 BUNDLED GROUPS (each group is a tall ribbon shape with
soft curves, NOT individual leaves).

A few small fish (3-4 fish, simple oval bodies with triangle tails, single
fill-able region each) drifting between the two paths.

UPPER background: water surface visible at the very top of the canvas as a
soft horizontal wavy line, with broken sunlight rays slanting down (~4-5
diagonal lines).

Apply GROUPED NATURAL TEXTURES: corals as 3-4 cluster shapes, kelp as 2-3
bundled groups, bubbles in 2-3 small groups, fish simple.

Mood: depth, mystery, decision — the divide is dramatic.
Composition: VERTICAL emphasis (depth from surface to dark deep). Haenyeo
upper-middle, blue glow lower-middle, coral path lower-left, kelp path
lower-right, broken surface light streaming down from the top.
```

---

## Scene 3a — `02-haenyeo/scene-3a-coral.png` (산호 미로 분기)

**제목 ko**: 3장. 산호 사이의 인어
**제목 en**: Chapter 3 — The Mermaid Among the Corals

**Narration KO**:
> 알록달록한 산호 사이로 헤엄쳐 들어가자, 길이 자꾸만 갈라지고 다시 모였다. 그러다 어디선가 부드럽고 슬픈 노래가 흘러왔다. 사람의 목소리도 아니고 새의 목소리도 아닌, 바다가 직접 부르는 듯한 노래였다.
>
> 노래를 따라 가장 깊은 곳에 다다랐을 때, 어두운 그림자 사이로 긴 머리의 인어가 천천히 모습을 드러냈다. 비늘이 달빛처럼 은은하게 빛났다.
>
> 인어는 두 손을 모은 채 그 안에 작은 진주 하나를 들고 있었다.
>
> "이것은 우리 어머니의 눈물이에요." 인어가 말했다. "오랜 세월 바다 깊은 곳을 지켜온 우리 어머니가 흘린 단 하나의 눈물. 사람들에게 주면 가장 비싼 보물이 되고, 바다에 두면 마을의 안전을 지킨답니다."
>
> 인어는 가만히 진주를 내밀었다.
>
> "가지실 건가요, 돌려주실 건가요?"

**Narration EN**:
> She slipped between the corals. The paths split and rejoined, split and rejoined. From somewhere a soft, sorrowful song drifted through the water — not the voice of a person, nor of a bird, but the sea singing to itself.
>
> At the deepest place she came to a halt. From the shadows, a mermaid with long flowing hair appeared. Her scales shone like moonlight on water.
>
> In her two cupped hands she held a single small pearl.
>
> "This is my mother's tear," the mermaid said. "Our mother has guarded the depths for many ages, and this is the one tear she has shed. To people, it would be the most precious of treasures. Kept in the sea, it keeps a village safe."
>
> The mermaid quietly held out the pearl.
>
> "Will you keep it, or will you give it back?"

**다음 장면**: → Scene 4 (linear — 정통 결말로 수렴)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Underwater medium-close shot. Two figures center-frame, the
coral environment surrounding them like an arch. Square/centered emphasis.

Subject: An underwater encounter scene set inside a coral maze. The haenyeo
(diving suit, goggles down over eyes, hair tied back) is on the LEFT in mid-
swim, body angled toward center, hands relaxed by her sides.

CENTER-RIGHT: a mermaid (stylized — friendly Korean folktale style, NOT
Western Ariel-style). She has long flowing hair (drawn as 5-6 thick curving
strands, not many individual hairs), a graceful upper body, no clothing
details needed beyond a simple V-line at the chest, and a long curved fish
tail covered in 8-10 visible large scales arranged in 2-3 rows (each scale
is ONE fill-able region — NOT a sea of tiny scales). The mermaid holds her
two hands cupped in front of her with a single round pearl resting in her
palms (one clean circle, one fill region).

SURROUNDING the figures: 5-7 stylized coral CLUSTERS forming a maze-like
archway around the encounter. Each coral cluster is ONE clean fill-able
region. Use varied coral shapes (branching like deer antlers, fan-shaped,
mushroom-cap, brain-like swirl), but each as a single simple silhouette.
NO individual polyps. NO hatching.

A few small details: 2-3 small fish drifting nearby (same simple style as
Scene 2), a few scattered bubble clusters (2 groups), faint vertical water
current lines (no fills).

BACKGROUND: dark deep water with 2-3 broken sunlight rays from above (soft
diagonal lines).

Apply GROUPED NATURAL TEXTURES: corals as cluster shapes (each ONE region),
mermaid scales 8-10 max, fish simple, NO individual coral polyps.

Mood: hushed encounter, sacred meeting, gentle question.
Composition: CENTERED — haenyeo left, mermaid center-right with the pearl
between them, coral cluster archway framing the two figures, surface light
above.
```

---

## Scene 3b — `02-haenyeo/scene-3b-kelp.png` (해초 숲 분기)

**제목 ko**: 3장. 해초 숲의 잠든 자라
**제목 en**: Chapter 3 — The Sleeping Turtle in the Kelp

**Narration KO**:
> 해초 숲 사이로 천천히 헤엄쳐 들어가자 모든 것이 고요했다. 부드러운 물결에 해초 줄기들이 한쪽으로 길게 쏠려 있었다. 그 안쪽 깊은 곳에, 거대한 자라 한 마리가 등껍질을 둥글게 말고 깊이 잠들어 있었다.
>
> 자라는 너무 오래 이곳에 있었던 듯, 등껍질 위로 작은 산호가 자라고 미역이 한두 줄기 붙어 있었다. 그 등 한가운데에 작은 진주가 맑게 빛났다. 자라의 숨결에 맞춰 빛이 살짝 깜빡거리는 것 같았다.
>
> 해녀가 손을 뻗으려 할 때, 옆에서 인기척이 느껴졌다. 긴 머리의 인어가 조용히 다가왔다. 인어는 입술에 손가락을 가져다 댔다.
>
> "조용히 해 주세요. 이것은 바다가 자라에게 맡긴 거예요. 자라는 천 년 전부터 이 진주를 지키고 있어요."
>
> 해녀는 그 말과 자라의 평온한 잠을 번갈아 보았다.

**Narration EN**:
> She swam slowly between the kelp and everything went still. The kelp leaned all in one slow direction with the current. In a hollow within the forest she found a great sea turtle, asleep on the floor with its dome shell curled around it.
>
> The turtle must have been there a very long time — small corals were growing on the shell and a thread of seaweed clung to one of its plates. At the very center of the shell, a small pearl shone clear. It seemed to flicker faintly, breathing with the turtle.
>
> She reached out — and felt someone beside her. The mermaid had drifted close. She raised one finger to her lips.
>
> "Quiet. The sea gave this to the turtle. He has been guarding it for a thousand years."
>
> The haenyeo looked from the mermaid to the turtle's peaceful sleep, and back again.

**다음 장면**: → Scene 4 (linear — 정통 결말로 수렴)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Underwater horizontal shot. The sleeping turtle is the visual
anchor at lower-center. The kelp forest forms vertical bars on both sides.
The mermaid enters from one side.

Subject: An underwater scene inside a quiet kelp forest. CENTER-LOWER: a
large stylized Korean sea turtle (자라) sleeping on a sandy seafloor patch.
The turtle has: a domed shell with 6-8 hexagonal/rounded shell plates clearly
outlined (each plate is ONE fill-able region — NOT a busy texture), 4 stubby
legs tucked in, closed eyes, a calm peaceful face. On the very TOP of the
shell, a single small pearl resting (round, one region), with 3-4 short
simple sparkle lines around it suggesting a soft glow.

LEFT and RIGHT: vertical KELP fronds forming the forest. Show 4-5 BUNDLED
GROUPS of kelp on each side (so 8-10 groups total), each group as a tall
ribbon-shape with a soft curve from the current. Each kelp group is ONE
fill-able region. NO individual leaves. NO veins.

ENTERING FROM THE RIGHT: the mermaid (same friendly style as Scene 3a, long
flowing hair as 5-6 strands, simple chest line, long curved tail with 8-10
large visible scales). She is mid-swim, gently approaching, with one finger
raised to her lips (asking for quiet). Show her from mid-thigh up only — the
rest of her tail trails offstage right.

The haenyeo is in the UPPER-LEFT, smaller in scale, hovering quietly,
watching with her hands at her sides — only show her from waist up.

BACKGROUND: dark blue-green water suggested by 2-3 wavy current lines
(no fills), one or two scattered tiny shellfish on the sandy floor.

Apply GROUPED NATURAL TEXTURES strictly: kelp in bundled groups, turtle
shell plates 6-8 max, NO individual blades of kelp.

Mood: hushed sacred secret — quiet, reverent, do-not-wake.
Composition: HORIZONTAL — sleeping turtle dead center-lower as the anchor,
kelp forest framing both sides as vertical pillars, mermaid entering from
the right, haenyeo small in upper-left.
```

---

## Scene 4 — `02-haenyeo/scene-4-guardian.png` (정통 결말)

**제목 ko**: 마지막 장. 바다의 수호자
**제목 en**: Final — Guardian of the Sea

**Narration KO**:
> 해녀는 잠시 진주를 손바닥 위에 올려놓고 그 무게를 가만히 느꼈다. 진주는 작았지만, 손바닥에 닿는 그 차가움은 바다 전체의 무게처럼 묵직했다.
>
> "이것은 바다의 것이지요."
>
> 해녀는 그 말과 함께 진주를 다시 인어에게 돌려주었다. 인어는 미소를 지으며 진주를 받아 자기 가슴 가까이 가져다 댔다.
>
> 그러자 — 바다 깊은 곳에서 푸른빛이 천천히 위로 퍼져 올라왔다. 처음에는 한 가닥이었다가, 곧 바닷속 모든 산호와 해초와 자라의 등껍질까지 환하게 비추었다. 해녀의 숨이 다 떨어졌다 싶은 순간, 그 빛이 그녀의 몸을 가볍게 들어 올려 수면 위로 올려주었다.
>
> 해녀가 갯바위 위로 올라왔을 때, 동쪽 해는 이미 높이 떠 있었다. 마치 그녀가 잠시 깊은 꿈을 꾸고 온 것 같았다. 그러나 손에 끼고 있던 어머니의 낡은 잠수경 안쪽에, 그날 본 푸른빛이 작은 별처럼 한 점 박혀 있었다.
>
> 그날부터 해녀는 바다와 마을을 잇는 수호자가 되었다.
>
> 보름달이 뜨는 밤마다 그녀는 갯바위에 나가 앉았다. 푸른 바다는 보름달 아래에서 은빛으로 빛났고, 이윽고 인어가 수면 위로 천천히 떠올랐다. 두 사람은 아무 말 없이 함께 앉아, 마을 어부들의 안전과 바다의 풍요를 빌었다.
>
> 그 후로 그 마을에는 큰 폭풍이 없었더라. 그물에는 늘 물고기가 가득 들어왔고, 깊은 바다에 들어간 해녀들은 모두 안전하게 돌아왔다.
>
> 세월이 흘러 해녀가 늙어 더 이상 잠수하지 못하게 되었을 때, 그녀의 손녀가 같은 갯바위에 앉아 같은 바다를 보았다. 손녀는 할머니의 낡은 잠수경을 손바닥에 올려 한참을 들여다보았다.
>
> 잠수경 안에 박힌 작은 푸른 별 한 점.
>
> "오늘은 더 깊은 곳까지 가봐야겠어요."
>
> 손녀가 중얼거리며 검은 잠수복을 단단히 여미는 그날 새벽, 갯바위 너머 바다 깊은 곳에서 인어가 조용히 미소 짓고 있었더라.

**Narration EN**:
> The haenyeo laid the pearl on her open palm and felt its weight. It was a small thing, but cold against her skin in the way the whole sea is cold — heavy as all the deep water that had ever been.
>
> "This belongs to the sea."
>
> With those words she gave the pearl back. The mermaid smiled, took it, and drew it close to her heart.
>
> And then — from far below, a soft blue light began to spread upward. First a single thread, then every coral, every kelp frond, every sleeping turtle's shell, all aglow. Just as her breath was about to fail, the light lifted her gently to the surface.
>
> When she climbed back onto the shore-rock, the sun was already high. It felt as though she had returned from a long quiet dream. But inside the lenses of her mother's old goggles, a small blue point of light — like a single star — had set there forever.
>
> From that day on, the haenyeo became a guardian between the village and the sea.
>
> On every full-moon night she went out to the shore-rock. The sea shone silver under the moon, and the mermaid would rise slowly to the surface. The two of them would sit together without speaking, praying for the fishermen's safety and the ocean's kindness.
>
> After that, no great storm came to the village. The nets returned heavy with fish. The haenyeo who went into deep water all came back alive.
>
> Years passed, and when the haenyeo grew too old to dive, her granddaughter came to sit on the same shore-rock and watch the same sea. The girl held the grandmother's old goggles in her palm and gazed at them a while.
>
> A small blue star, fixed inside the lens.
>
> "Today I will go a little deeper."
>
> The granddaughter fastened the goggles and drew on her dark diving suit. And far below, in the dawn-blue depths, the mermaid was quietly smiling.

**Ending Label**: 🌊 `바다의 수호자 — 정통 결말` / `Guardian of the Sea — the canonical ending`

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Surface-of-sea shot, half above water / half below water. A
horizontal split with sky-and-sea above the waterline and the underwater
scene below. The full moon is the central visual anchor.

Subject: A magical night-time scene split between two worlds — surface and
deep — connected by a glowing pearl returned.

UPPER HALF (above water):
- A large round FULL MOON dead center in the night sky (one clean circle).
- Around it, 10-15 simple 5-point stars scattered (each identical, one
  fill-able region per star).
- LEFT BACKGROUND: a Jeju coastal silhouette — 2 oreum (volcanic hills) in
  the distance, 2-3 small Jeju thatched houses (with roof-rope grids) lit
  by lantern light (small visible lantern circle on one house's front).
- RIGHT FOREGROUND: a flat lava-rock shore ledge where the haenyeo (now
  with her goggles off and resting around her neck) sits cross-legged in
  profile, looking out toward the moon's reflection on the water. Her tewak
  is beside her on the rock.
- Between the haenyeo and the moon: the moon's vertical light reflection
  shimmering on the water (~5-6 short horizontal wave-glint lines stacked
  vertically — NOT a busy water pattern).
- 2-3 large soft cloud shapes in the upper sky.

LOWER HALF (below water — through the surface):
- The water surface drawn as a horizontal wavy line cutting the canvas roughly
  at 55-60% height.
- Just BELOW the surface, the MERMAID swimming up, body tilted upward, one
  arm reaching up toward the haenyeo, hair flowing. The same mermaid as
  Scenes 3a / 3b (long hair as 5-6 strands, simple chest line, long curved
  tail with 8-10 large visible scales).
- Between the haenyeo's hand and the mermaid's hand: the small round PEARL,
  now glowing softly (show 4-6 short sparkle lines radiating from it).
- DEEPER BELOW: the sleeping sea turtle small in the distance (same style
  as Scene 3b but smaller scale), and a few stylized coral clusters and
  bundled kelp fronds in the deep background — TINY in scale, just hinted.

Apply GROUPED NATURAL TEXTURES strictly: clouds, stars, kelp, coral all
in simple grouped shapes — NO individual elements.

Mood: blessing, reconciliation, guardianship between two worlds — a soft
mythic closing.
Composition: HORIZONTAL SPLIT — sky-and-village + haenyeo on the upper
band, moon centered as the visual anchor, mermaid + glowing pearl just
below the waterline, deep sea (turtle, coral, kelp) hinted in the lower
band as small far-away echoes of Scenes 3a and 3b.
```

---

# 📋 받은 PNG 체크리스트 (해녀와 인어)

배치 위치: `public/coloring/02-haenyeo/`

- [ ] `scene-1-shore.png` — 1장. 새벽 바다 앞에서
- [ ] `scene-2-deep.png` — 2장. 두 갈래 빛 (분기 시작)
- [ ] `scene-3a-coral.png` — 3장 분기 A. 산호 사이의 인어
- [ ] `scene-3b-kelp.png` — 3장 분기 B. 해초 숲의 잠든 자라
- [ ] `scene-4-guardian.png` — 마지막 장. 바다의 수호자 (정통 결말)

기존 `start.png`, `coral.png`, `kelp.png`, `ending-guardian.png`, `ending-village.png`는 `Backup_v1/`에 그대로 유지 (롤백용).

---

# 🦌 Story 3 — 선녀와 나무꾼 (The Fairy and the Woodcutter)

**원작 배경**: 한국 옛이야기 중 가장 사랑받는 작품 중 하나. 사슴의 보은(報恩) + 하늘의 선녀 + 깨진 약속 + 새벽 빛의 etiology가 한 이야기에 엮인다.

**기승전결 매핑** (Y-구조 5장면):
- **기 (起)** Scene 1 — 나무꾼이 사슴을 구함 (자비)
- **승 (承)** Scene 2 — 사슴의 보은, 별빛 연못, 선녀 만남 + 분기
- **전 (轉)** Scene 3a/3b — 두 자녀와의 삶, 선녀의 그리움이 깊어짐
- **결 (結)** Scene 4 — 약속이 깨짐 → 하늘 가족 재회 → 새벽 빛이 된 그리움

```
                ┌── 3a (산속 오두막) ──┐
1 → 2 (선택) ──┤                     ├── 4 (정통 결말: 새벽 빛)
                └── 3b (마을 어머니 곁) ──┘
```

**정통 결말**: 두 자녀를 안고 하늘로 올라간 선녀. 사슴의 두레박 도움으로 나무꾼도 하늘 가족과 재회. 그러나 산골 어머니에 대한 그리움이 매일 새벽 첫 빛이 되어 어머니의 창문에 내려앉음. (한국 옛이야기 특유의 원인설화 — 새벽 빛이 왜 부드러운가)

5장면, 한 회 플레이 시 4장면. 분기 1회. 두 길 모두 "약속이 깨지고 선녀가 떠남"이라는 운명으로 수렴.

---

## Scene 1 — `03-woodcutter/scene-1-deer.png` (기)

**제목 ko**: 1장. 사슴을 구한 날
**제목 en**: Chapter 1 — The Day He Saved the Deer

**Narration KO**:
> 옛날, 깊은 산 아래 작은 초가집에서 늙은 어머니와 단둘이 사는 나무꾼이 있었더라. 가난했지만 마음씨가 따뜻한 청년이었다. 새벽이면 지게를 지고 산에 올라 나무를 하고, 해질녘이면 어머니가 기다리는 집으로 돌아왔다.
>
> 그날도 산에서 나무를 하고 있는데, 어디선가 거친 발소리가 들렸다. 흰 사슴 한 마리가 헐떡이며 그의 발 앞에 무릎을 꿇었다.
>
> "구해 주세요. 사냥꾼이 쫓아오고 있어요."
>
> 사슴은 사람처럼 말했다. 나무꾼은 놀랐지만, 그 까만 눈에 비친 두려움을 보고 망설이지 않았다. 자기가 베어 둔 나뭇더미 뒤에 사슴을 숨겨 주고, 그 위에 다시 나뭇잎을 덮어 주었다.
>
> 곧 험상궂은 사냥꾼이 활을 들고 나타났다.
>
> "여기 흰 사슴 한 마리 못 보았소?"
>
> 나무꾼은 손가락으로 반대편 산봉우리를 가리켰다.
>
> "방금 저쪽으로 뛰어 올라갔습니다요."
>
> 사냥꾼이 멀어진 뒤, 나뭇잎을 들춰 보니 사슴이 두 눈에 눈물이 그렁그렁한 채 바라보고 있었다.

**Narration EN**:
> Long ago, in a small thatched-roof house at the foot of a high mountain, there lived a young woodcutter with his elderly mother. They were poor, but he was kind-hearted. Each dawn he shouldered his A-frame carrier and climbed the mountain for firewood; each dusk he returned to the house where his mother waited.
>
> One such day, as he was at his work, heavy footsteps came crashing through the brush. A white deer staggered up to him and dropped to its knees.
>
> "Please, hide me. A hunter is coming."
>
> The deer spoke like a person. The woodcutter was startled, but seeing the fear in those dark eyes, he did not hesitate. He hid the deer behind the firewood he had cut and covered it with fallen leaves.
>
> A grim-faced hunter soon appeared, bow in hand.
>
> "Have you seen a white deer come this way?"
>
> The woodcutter pointed to the far ridge. "Just now, it bounded up that mountain over there, sir."
>
> When the hunter had gone, he brushed the leaves aside. The deer was looking up at him, its two eyes brimming with tears.

**다음 장면**: → Scene 2 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Wide outdoor mountain forest scene, mid-morning. Horizontal
composition with a moment of stillness right after a chase. The woodcutter
and pile-of-firewood form the left mass; the approaching hunter is on the
right edge.

Subject: A Korean mountain forest scene. CENTER-LEFT: a young woodcutter
(~25, plain hanbok with a short jeogori and baji, head-cloth tied around
his forehead, an A-frame carrier 지게 standing upright beside him with
several bundles of cut firewood strapped on). He stands with one hand
gently lowered, palm down — the gesture of "shush" — while looking with
soft alarm toward the right. At his feet behind the firewood pile, a
white deer (slender Korean spotted deer, two delicate antlers, gentle
face, large dark eyes) crouches half-hidden, with fallen leaves draped
over its back as makeshift cover. Show one of the deer's eyes peeking out
clearly — visibly tearful.

RIGHT EDGE OF CANVAS: a hunter (older man, simple traditional hunting
clothes, fur cap, leather belt) approaching with a wooden bow held in
one hand and an arrow nocked. His face is suspicious, scanning the trees.
He is mid-stride.

BACKGROUND: a few large old Korean pine trees (소나무) standing tall —
apply GROUPED NATURAL TEXTURES strictly: each pine has 5-7 large cloud-
shaped foliage clusters (NOT individual needles), trunk has 2-4 vertical
wood-grain lines only. Behind the trees: distant mountain ridges in the
horizon (2-3 simple curved silhouettes). On the ground: scattered fallen
leaves (in 3-4 SMALL GROUPS, not a carpet), a few mushrooms, one or two
fan-shaped grass tufts. A small stream visible in the lower-left corner
with 2-3 simple wave lines suggesting flow.

UPPER-LEFT sky: 2-3 simple cloud shapes, a single bird in the distance.

Mood: held breath, the quiet right after danger has passed close. The
moment of unspoken kindness.
Composition: WIDE landscape. Woodcutter + firewood + hidden deer occupy
the left-center (~50% of canvas), hunter entering from right (~25%),
mountain ridges and pines spanning the upper band, ground details and
stream in the lower band.
```

---

## Scene 2 — `03-woodcutter/scene-2-pond.png` (승)

**제목 ko**: 2장. 별빛 연못의 비밀
**제목 en**: Chapter 2 — The Secret of the Starlit Pond

**Narration KO**:
> "은혜는 잊지 않겠습니다." 사슴이 말했다. "원하시는 게 있다면 들어드리지요."
>
> 나무꾼은 한참을 망설이다 솔직하게 말했다. "저는 가난해 장가를 들지 못합니다. 어머니께 며느리 한 번 보여 드리고 싶습니다만…"
>
> 사슴은 잠시 눈을 감았다가 천천히 입을 열었다.
>
> "산 가장 깊은 곳에 별빛이 비치는 연못이 있습니다. 보름달이 뜨는 밤이면 하늘의 선녀들이 그 연못에 내려와 목욕을 합지요. 한 사람의 날개옷을 몰래 숨기면 그 선녀는 하늘로 돌아가지 못합니다. 그러면 아내로 맞이할 수 있을 거예요. 단, 한 가지 약속을 꼭 지키셔야 합니다."
>
> 사슴이 검고 깊은 눈으로 나무꾼을 똑바로 바라보았다.
>
> "자녀 셋을 낳기 전에는 절대로 날개옷을 돌려주지 마세요. 약속이 깨지면 선녀는 하늘로 돌아갈 거예요."
>
> 나무꾼은 깊이 고개를 끄덕였다.
>
> 그날 밤, 보름달이 하늘 가운데 올라왔을 때 나무꾼은 별빛 연못에 도착했다. 정말로 여러 선녀가 옷을 벗어 둔 채 물에 몸을 담그고 있었다. 옷마다 깃털 같은 빛이 깃들어 있었다. 그는 한 벌의 옷을 몰래 집어 들어 품에 안았다.
>
> 한참 뒤, 선녀들이 하늘로 다시 올라갈 시간이 되었다. 그러나 한 사람만 자신의 옷을 찾지 못하고 연못가에 서서 울고 있었다. 어디로 그녀를 데려갈까?

**Narration EN**:
> "I will not forget your kindness," the deer said. "If you have a wish, tell me."
>
> The woodcutter hesitated, then spoke plainly. "I am poor and cannot marry. I only wish to bring my mother a daughter-in-law once, before her years are done."
>
> The deer closed its eyes for a moment, then opened them slowly.
>
> "Deep in the heart of the mountain there is a pond where starlight pools. On the night of the full moon, fairies of heaven come down to bathe there. If you hide the feathered robe of one of them, she cannot fly back. You may take her as your wife. But you must keep one promise."
>
> The deer fixed him with its dark, deep eyes.
>
> "Until she has borne three children, you must never return her robe. If the promise is broken, she will fly back to heaven."
>
> The woodcutter nodded deeply.
>
> That night, when the full moon hung in the sky's middle, he reached the starlit pond. Truly there were fairies bathing, their feathered robes folded by the water's edge, each shimmering with a soft inner light. He gathered up one robe and held it close to his chest.
>
> When the hour came for the fairies to fly back, one of them could not find her robe. She stood at the water's edge, weeping. Where should the woodcutter take her now?

**선택지**:
- 🏠 `산속 작은 오두막으로 데려간다` / `Take her to a small hut in the deep mountain` → **Scene 3a**
- 🏘 `마을 어머니 곁으로 데려간다` / `Take her down to my mother's house in the village` → **Scene 3b**

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Mythic night scene at a starlit mountain pond. Wide composition,
mid-distance bird's-eye angle — viewer can see the pond, multiple bathing
fairies, the discarded robes, and the hidden woodcutter all at once.
Vertical emphasis (sky reflected in water).

Subject: A round mountain pond at the heart of the forest, lit by a large
full moon and many stars above. The pond's water reflects the moon as one
clean circle and the night sky as a few simple star points.

IN THE POND: 4 fairies (선녀, beautiful Korean traditional style, NOT
anime/chibi — gentle round faces, long flowing hair). Each is bathing
modestly in the water, wearing a simple long sleeveless white
underdress (속적삼, like a soft cotton shift) that covers shoulders and
chest down to the waterline. NO bare shoulders, NO bare chest ─ this
is a Korean children's storybook. Their bodies are suggested simply
with the white dress + flowing hair. Long hair as 5-6 thick curving
strands per fairy.

ON THE STONES AROUND THE POND: 4 folded feathered robes (날개옷), each
shimmering with soft inner light (3-4 short sparkle lines around each
robe). Each robe is folded into a simple bundle shape. ONE robe (closest
to the right side) is MISSING — only an empty space remains where it had
been.

LOWER-RIGHT, behind a large boulder partly in shadow: the woodcutter
(same character as Scene 1) crouches, holding the stolen robe close to
his chest with both hands. Only his head, shoulders, and the held robe
peek above the boulder. His face shows quiet shame mixed with hope.

UPPER-LEFT BACKGROUND: tall old Korean pine trees (apply GROUPED NATURAL
TEXTURES — 5-7 cloud-shaped foliage clusters per tree). Above the trees:
the large round full moon and 12-15 simple 5-point stars scattered.

LOWER-LEFT FOREGROUND: a single fairy who has stepped out of the pond
onto the stones — this is the one whose robe is gone. She stands in
her long white underdress (속적삼, modestly covering shoulders to
ankles), hands raised to her face, weeping. Her long hair flows down
behind her. A single small tear visible on her cheek.

ALSO IN THE SCENE: the white deer (same as Scene 1) standing at the edge
of the trees on the upper-right, watching quietly. Just barely visible.

Apply GROUPED NATURAL TEXTURES strictly: pine foliage as cluster shapes,
stars as 5-point simple icons (all identical), water ripples as 2-3
concentric arcs around the moon's reflection. NO individual leaves, NO
wave detail.

Mood: hushed mythic — a forbidden glimpse, a moment that will change
everything. Tender and slightly sad.
Composition: BIRD'S-EYE WIDE — round pond center filling 40% of canvas,
bathing fairies in the pond, robes on the surrounding stones, weeping
fairy lower-left foreground, woodcutter hidden lower-right, pines + moon
+ stars upper band, deer barely visible upper-right edge.
```

---

## Scene 3a — `03-woodcutter/scene-3a-hut.png` (전 · 산속 분기)

**제목 ko**: 3장. 산속 오두막의 두 자녀
**제목 en**: Chapter 3 — Two Children in the Mountain Hut

**Narration KO**:
> 나무꾼은 선녀를 산속 깊은 작은 오두막으로 데려갔다. 처음에는 슬퍼하기만 하던 선녀도, 시간이 지나면서 그의 따뜻한 마음에 마음을 열었다.
>
> 봄이면 함께 산나물을 캐고, 여름이면 폭포에서 물을 길었다. 가을이면 다람쥐가 모아둔 도토리를 함께 줍고, 겨울이면 솔잎으로 차를 끓여 마셨다. 두 사람 사이에는 곧 사내아이와 누이동생, 두 명의 자녀가 태어났다.
>
> 사슴의 약속 — 자녀 셋을 낳기 전에는 날개옷을 돌려주지 말라 — 는 나무꾼의 마음 한구석에 늘 무겁게 남아 있었다. 그는 날개옷을 자기 지게 깊숙이 숨겨 놓았다.
>
> 그러나 선녀는 가끔 한밤중에 잠에서 깨어 작은 창 너머 별을 올려다보았다. 두 아이가 잠든 사이, 그녀는 가만히 흐느꼈다.
>
> "저 별들 사이에 어머니가 계신데… 한 번만 만나 뵙고 싶어요."
>
> 어느 날 밤, 그녀의 슬픈 모습을 더는 보고 있을 수 없었던 나무꾼은 결심했다. 자녀가 둘뿐이지만, 한 번만 — 한 번만 옷을 입어 보게 해 주리라. 그는 지게 속 깊은 곳에서 날개옷을 꺼내 그녀에게 건넸다.

**Narration EN**:
> The woodcutter took her to a small hut deep in the mountain. At first she only grieved, but as the seasons passed she opened her heart to his quiet kindness.
>
> In spring they gathered mountain herbs together. In summer they drew water from the waterfall. In autumn they picked up acorns the squirrels had gathered. In winter they brewed pine-needle tea. Soon they had two children — a little boy and his younger sister.
>
> The deer's promise — that the robe must not be returned until three children were born — weighed always on the woodcutter's mind. He had hidden the robe deep in his A-frame carrier.
>
> But sometimes in the deep of night the fairy woke and looked up through the small window at the stars. While the two children slept, she wept quietly.
>
> "My mother is among those stars… I only wish to see her once."
>
> One night, no longer able to bear her sorrow, the woodcutter made up his mind. Two children, not three — but he would let her wear the robe just once, only once. He drew the feathered robe from the bottom of his carrier and held it out to her.

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Intimate interior night scene. Cozy small one-room mountain
hut at midnight. The scene splits between sleeping children (left) and
the wakeful fairy at the window (right). Soft warm domestic + bittersweet
tone.

Subject: Inside a small Korean mountain hut at deep night. WOOD-PLANK
floor, low ondol-style sleeping area on the LEFT where two small
children sleep on a folded yo-blanket: a little boy (~5, in simple
white sleep-hanbok 잠한복 ─ short white top with collar line and loose
white pants, hand under his cheek) and his younger sister (~3, in
matching simple white sleep-hanbok with a small ribbon at the collar,
holding a small folded cloth doll). Show their faces clearly asleep,
eyelids gently closed, small smiles.

CENTER: a low wooden tea table (소반) with an oil lamp (호롱불 — bowl +
wick + flame) softly glowing. A small ceramic teacup beside it. On the
back wall behind the children, an A-frame carrier (지게) leaned against
the wall with bundles attached — and tucked behind one bundle, visible to
the viewer but not to the children, a folded feathered robe (날개옷,
with 3-4 short sparkle lines around it suggesting its hidden glow).

RIGHT SIDE: a small paper-paneled window (한지창 — 3-by-3 grid of panels).
Standing barefoot before it: the fairy (~25, plain Korean home hanbok,
hair loose down her back, NOT in the feathered robe). She has her hands
flat against the windowpane, looking up through it. Through the window
panels: a night sky with the moon (round) and 8-10 simple stars visible
outside. A single tear visible on her cheek.

CROUCHING IN THE FOREGROUND between the table and the window: the
woodcutter (same character as Scenes 1 + 2, now older with a few small
worry lines on his brow). He has just opened the A-frame carrier and is
holding the feathered robe out toward the fairy with both hands. His
expression is tender + resigned.

DETAILS: A few mountain plant decorations on the back wall (dried herbs
hanging — show as 2-3 small bundles, each one fill region). On the floor:
a small wooden bowl with a few acorns inside (autumn detail). Roof beams
(서까래) visible at the very top of the interior view.

Apply DETAIL LEVEL strictly: hanbok shows collar + ribbon + sleeve + hem
lines, faces show iris + pupils + nose + mouth + hair strands, windows
show paper-panel grid.

Mood: tender goodbye in the making — the moment before a promise breaks.
Domestic warmth shadowed by inevitable sorrow.
Composition: HORIZONTAL interior. Sleeping children + tea table forming
the left/center block, fairy at window forming the right, woodcutter
holding robe in the middle-foreground bridging them. Hidden robe in the
carrier upper-back-left as the visual cue.
```

---

## Scene 3b — `03-woodcutter/scene-3b-village.png` (전 · 마을 분기)

**제목 ko**: 3장. 마을 어머니 곁의 두 자녀
**제목 en**: Chapter 3 — Two Children at Grandmother's House

**Narration KO**:
> 나무꾼은 선녀를 산에서 내려와 마을의 어머니 집으로 데려갔다. 어머니는 며느리를 보며 눈물을 흘렸고, 마을 사람들은 그토록 아름다운 여인이 시집을 왔다는 소문에 들떠 했다.
>
> 어머니의 따뜻한 보살핌 속에, 두 사람은 곧 사내아이와 누이동생 두 자녀를 낳았다. 마을 어귀의 우물가에서 빨래를 하고, 장에서 떡을 나눠 먹고, 명절이면 한복을 차려입고 어머니께 절을 올렸다. 그렇게 선녀는 점점 인간 세상의 여인으로 살아갔다.
>
> 그러나 가을바람이 차가워질 때면, 선녀는 마당에 나가 하늘을 한참 올려다보았다. 두 아이가 그녀의 치맛자락을 붙들고 같이 올려다보았다.
>
> "엄마, 저 위에 뭐가 있어요?"
>
> "별이 있단다. 우리 별이…"
>
> 선녀는 더 말을 잇지 못하고 두 아이를 꼭 안았다. 어느 날 밤, 그녀가 자녀 둘만 안고 잠든 모습을 본 나무꾼은 가슴이 미어졌다. 약속을 떠올렸지만 — 사슴이 셋을 낳기 전엔 안 된다 했지만 — 그래도 한 번만, 그녀가 어머니를 볼 수 있게.
>
> 그는 다락방 깊은 곳에 숨겨 놓았던 날개옷을 꺼냈다.

**Narration EN**:
> The woodcutter brought her down from the mountain to his mother's house in the village. His mother wept for joy at meeting her daughter-in-law, and the villagers were quietly amazed that so beautiful a woman had come to wed.
>
> Under his mother's warm care, soon a little boy and his younger sister were born. The fairy washed clothes at the village well, shared rice cakes at the market, dressed in hanbok at festivals and bowed to the elder mother. So she lived, little by little, as a woman of the human world.
>
> But when the autumn wind turned cold, she would step out into the courtyard and gaze long up at the sky. The two children would catch at her skirt and look up with her.
>
> "Mama, what's up there?"
>
> "Stars, my darling. Our star is…"
>
> She could not finish, and held the children close. One night the woodcutter watched her sleep with their two children in her arms, and his heart ached. He remembered the promise — three before the robe — but only once, only once so she could see her mother.
>
> He climbed to the loft and drew out the feathered robe he had hidden there.

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor village courtyard at late autumn dusk. The fairy + 2
children stand in the courtyard looking up at the sky. The hanok wall +
elder mother visible inside the home. Soft horizontal village-life scene.

Subject: A traditional Korean hanok courtyard scene. CENTER-FOREGROUND:
the fairy (~25, dressed now in full village hanbok — visible collar
(깃), ribbon (고름), gathered sleeves and full skirt (치마), hair tied up
in a married woman's style with a binyeo hairpin). She stands in the
courtyard with her head tilted slightly back, looking up at the sky. Both
hands rest gently on the heads of two small children at her sides.

LEFT CHILD: a little boy (~5, in small hanbok matching father's style),
clutching the fairy's skirt with one hand, also looking up. RIGHT CHILD:
a little sister (~3, in tiny hanbok with a small jacket and skirt),
holding the fairy's other hand and looking up.

BACKGROUND-LEFT: the hanok house wall with curved tile-roof eaves (~6-8
visible roof tiles as repeated curved units). A wooden door is partly
open — through it, the elder mother (~65, gray hair in low bun, simple
hanbok with apron) is visible inside, sitting at a low wooden table
gently sewing a small piece of cloth with needle and thread (NOT a
loom ─ a simple sewing scene). She glances out at the fairy + children
with a soft loving expression.

BACKGROUND-RIGHT: the village extends in the middle distance — show 2-3
small thatched roofs and a single tall persimmon tree (감나무) with bare
branches and 4-5 round persimmon fruits hanging (each fruit one fill
region). Behind the village, a low mountain ridge silhouette.

UPPER SKY: late autumn evening sky, soft gradient suggested by a few
horizontal cloud lines. 6-8 simple 5-point stars beginning to appear in
the upper band. NO moon visible yet — this is dusk turning to evening.

ON THE COURTYARD GROUND: a few fallen yellow ginkgo leaves (apply
GROUPED NATURAL TEXTURES — show as 4-5 small fan-shaped leaf groups,
NOT a carpet of individual leaves). A wooden jar (장독) at one corner.
A bamboo broom leaning against the wall.

INSIDE THE LOFT visible at the top of the hanok: a hint of the feathered
robe peeking from a chest — show as a small folded shape with 2-3 short
sparkle lines around it.

Mood: autumn quiet, domestic warmth, the longing of someone who belongs
to two worlds.
Composition: HORIZONTAL. Fairy + two children centered in the courtyard
foreground, hanok with elder mother glimpsed inside on the left, village
view + persimmon tree right background, autumn sky with appearing stars
spanning the upper band, ground details lower. Hidden robe glimpse at
upper-left as the visual cue.
```

---

## Scene 4 — `03-woodcutter/scene-4-dawn.png` (결 · 정통 결말)

**제목 ko**: 마지막 장. 새벽 빛이 된 그리움
**제목 en**: Final — The Dawn Light of Longing

**Narration KO**:
> 선녀는 날개옷을 받아 들자 가만히 한참을 들여다보았다. 그러더니 그 옷을 입었다. 어깨에서 깃털 빛이 흘러나오고, 발이 천천히 바닥에서 떠올랐다.
>
> "한 번만 다녀올게요." 선녀가 슬픈 미소로 말했다.
>
> 그러나 옷을 입은 그녀는 본능처럼 두 아이를 양팔에 안았다. 한 아이는 오른팔 안에, 한 아이는 왼팔 안에. 그러고는 그대로 천천히, 천천히 별빛이 쏟아지는 밤하늘로 올라가기 시작했다.
>
> "안 돼요! 잠깐만요!"
>
> 나무꾼이 달려 나가 손을 뻗었지만, 이미 그녀와 두 자녀는 하늘 너머로 사라지고 있었다. 사슴이 한 말이 비로소 뼈저렸다. 셋을 낳기 전에는 옷을 돌려주지 말 것을. 자녀가 셋이었다면, 한 아이는 안고 가지 못해 그녀가 다시 내려왔을 것을.
>
> 그가 무너져 앉아 울고 있을 때, 등 뒤에서 부드러운 발소리가 들렸다.
>
> "울지 마세요. 가실 길이 하나 남아 있어요."
>
> 흰 사슴이었다. 사슴은 나무꾼을 별빛 연못으로 다시 데려갔다.
>
> "보름달이 뜨는 밤이면 하늘에서 두레박이 물을 길러 내려옵니다. 그 두레박에 몰래 올라타세요. 다만 — 절대로 두 발이 다시 땅에 닿게 해서는 안 됩니다."
>
> 그날 밤, 하늘에서 정말로 큰 두레박 하나가 별빛 연못에 내려왔다. 나무꾼은 그 안에 몸을 숨겼다. 두레박이 다시 하늘로 올라가는 동안 그는 두 손을 모아 가족을 그리는 마음만을 빌었다.
>
> 마침내 두레박은 하늘에 닿았다. 그곳에서 선녀와 두 자녀가 그를 기다리고 있었다. 그는 별들 사이에서 가족과 함께 살게 되었다.
>
> 그러나 — 한 가지가 마음에 걸렸다. 산 아래 작은 초가집에서 아들이 돌아오기만을 기다리고 계신 어머니. 그는 매일 새벽이면 하늘 끝에 서서 땅을 내려다보았다. 그 그리움이 새벽 첫 빛이 되어 산골 어머니의 창문에 가만히 내려앉았더라.
>
> 그래서 오늘날도 새벽 첫 빛이 산 너머에서 부드럽게 비쳐 오면, 그것은 하늘에 있는 아들이 어머니를 그리는 마음이라고 — 옛 어른들이 이렇게 손주에게 전했단다.

**Narration EN**:
> When the fairy received the feathered robe, she gazed at it a long while. Then she put it on. Light spilled from its shoulders, and her feet rose slowly from the floor.
>
> "I will only go once," she said with a sad smile.
>
> But the robe spoke to her instincts. She gathered her two children into her arms — one in the right, one in the left. And slowly, slowly, she rose into the star-strewn night sky.
>
> "Wait — don't go!"
>
> The woodcutter ran out, reached up, but already she and the two children were vanishing beyond the sky. Only now did the deer's words bite deep. Don't return the robe until three. If there had been three children, one would have remained — she would have had to come back.
>
> As he sat broken on the ground, soft footsteps came behind him.
>
> "Don't weep. One road yet remains."
>
> It was the white deer. The deer led him back to the starlit pond.
>
> "On full-moon nights, a great bucket descends from heaven to draw water from this pond. Hide inside that bucket. Only — do not let your two feet touch the earth again."
>
> That night, sure enough, a great bucket came down from the sky into the starlit pond. The woodcutter hid himself inside. As the bucket lifted toward heaven, he prayed only for his family.
>
> At last the bucket reached the sky. There the fairy and his two children were waiting. He came to live with them among the stars.
>
> But one thing weighed on his heart. His old mother, in the small thatched-roof house at the foot of the mountain, was still waiting for her son to come home. Every dawn the woodcutter went to the edge of heaven and looked down at the earth. His longing became the first soft light of morning, settling gently on his mother's window in the mountain village.
>
> So even today, when the first morning light slips softly over the ridge, the old ones say — that is the son in heaven, missing his mother. So the grandmothers tell their grandchildren still.

**Ending Label**: ☁️ `새벽 빛이 된 그리움 — 정통 결말` / `The Dawn Light of Longing — the canonical ending`

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Mythic vertical canvas — SKY HALF (top 60%) showing the heaven
family + dawn light, EARTH HALF (bottom 40%) showing the small mountain
house + waiting mother. The two realms are visually connected by a soft
beam of dawn light descending from the heavens to the earth.

Subject: A two-world canvas at the moment of dawn, connecting heaven and
the mountain village by a beam of soft light.

UPPER 60% — HEAVEN:
- Layered stylized clouds across the entire upper band (apply GROUPED
  NATURAL TEXTURES — 5-7 large billowy cloud shapes, soft and simple).
- CENTER-LEFT: the woodcutter (same character as previous scenes, now in
  flowing heavenly robes — visible collar, sleeve, hem). He stands at
  the very edge of a cloud, facing the viewer but with his head turned
  DOWN AND TO THE RIGHT, looking toward earth. One hand at his chest.
- RIGHT OF HIM: the fairy (in her feathered robe again, glowing with 3-4
  short sparkle lines around her shoulders) holding the hand of the
  older child (~6, in small heavenly robe). The little sister (~4) sits
  on a small cloud beside her, looking peacefully at her father.
- ABOVE / UPPER-LEFT BACKGROUND: a stylized smiling moon face (gentle
  crescent moon with closed eyes) and 12-15 simple 5-point stars.

A SOFT VERTICAL BEAM OF LIGHT descends from the woodcutter's chest down
through the clouds toward the lower portion of the canvas — drawn as
2-3 long parallel soft lines suggesting a gentle dawn ray.

VISUAL ECHO OF THE BUCKET: in the upper-right corner of the heaven half
(behind the fairy + children), a small simple wooden well-bucket (두레박)
hangs from a curved rope, suggesting how the woodcutter was lifted up.
This is a small symbolic detail, not the focus — just enough so a
child reading the narration recognizes "ah, the bucket that brought him
home". Show: simple round wooden bucket shape + 2-3 rope coil lines.

LOWER 40% — EARTH:
- Center: a small Korean thatched-roof house (초가집) with a single
  paper-paneled window glowing softly from within (warm interior light
  suggested with 3-4 short rays around the window frame).
- Inside the window (visible through the panels): the elderly mother
  (gray hair in low bun, simple hanbok) sitting at a low wooden table
  with a cup of tea, looking out the window with a calm, hopeful
  expression. She does not see her son in the sky — she simply feels
  the morning light on her face.
- LEFT of the house: a low Korean stone wall (rough stacked stones — show
  ~6-8 distinct stones), and a small persimmon tree with a few hanging
  fruits.
- RIGHT of the house: the white deer (from Scenes 1, 2) standing quietly
  at the edge of the trees, looking up at the sky, having watched it all.
- BACKGROUND: a low mountain ridge silhouette and the first hint of dawn
  on the horizon (a soft horizontal band).

THE BEAM OF LIGHT from the woodcutter's chest above lands gently on the
glowing window of the house. The mother's window is the visual anchor —
where heaven touches earth.

Apply GROUPED NATURAL TEXTURES strictly: clouds in 5-7 simple billowy
shapes, stars 5-point identical icons, persimmon fruits as ROUND single
regions, mountain ridge as ONE silhouette.

Mood: bittersweet mythic resolution — family reunited above, mother
remembered below, the gentle dawn as the bridge between them.
Composition: VERTICAL TWO-WORLD CANVAS. Heaven occupies the upper 60%
(woodcutter + fairy + children + clouds + moon + stars), beam of light
descends through the middle band, earth occupies the lower 40% (thatched
house + mother through window + deer + stone wall + dawn horizon). The
beam of light is the central vertical axis of the canvas.
```

---

# 📋 받은 PNG 체크리스트 (선녀와 나무꾼)

배치 위치: `public/coloring/03-woodcutter/`

- [ ] `scene-1-deer.png` — 1장. 사슴을 구한 날 (기)
- [ ] `scene-2-pond.png` — 2장. 별빛 연못의 비밀 (승 + 분기)
- [ ] `scene-3a-hut.png` — 3장 분기 A. 산속 오두막의 두 자녀 (전)
- [ ] `scene-3b-village.png` — 3장 분기 B. 마을 어머니 곁의 두 자녀 (전)
- [ ] `scene-4-dawn.png` — 마지막 장. 새벽 빛이 된 그리움 (결 / 정통 결말)

기존 `start.png`, `sage.png`, `forest.png`, `ending-sky.png`, `ending-mountain.png`은 `Backup_v1/`에 그대로 유지 (롤백용).

---

# 🥁 Story 4 — 혹부리 영감 (The Old Man and the Goblins)

**원작 배경**: 한국 전래동화의 권선징악 원형. 정직한 노래와 욕심에 대한 도깨비의 심판. 한국 사람의 정서 ─ 노래·정·진심 ─ 가 모두 들어 있다.

**기승전결**:
- **기 (起)** Scene 1 — 마음씨 좋은 영감, 노래를 사랑하는 일상
- **승 (承)** Scene 2 — 산속 빈집에 머묾, 한밤중 도깨비 잔치, 어떤 노래를 부를까 + 분기
- **전 (轉)** Scene 3a/3b — 흥겨운 마을 노래(춤) / 어머니의 자장가(졸음)
- **결 (結)** Scene 4 — 혹을 떼어가고 보물을 줌, 욕심쟁이 영감의 응징

```
                ┌── 3a (흥겨운 노래 + 도깨비 춤) ──┐
1 → 2 (선택) ──┤                                ├── 4 (정통: 노래의 보답 + 욕심 응징)
                └── 3b (자장가 + 도깨비 졸음) ────┘
```

**정통 결말**: 영감의 진심 어린 노래에 감동한 도깨비가 혹을 떼어가고 보물을 안겨줌. 욕심쟁이 옆 영감이 따라하다 도깨비에게 들켜 혹 두 개를 달고 내려옴. ─ 한국 옛이야기의 권선징악 + 노래·진심에 대한 찬사.

---

## Scene 1 — `04-dokkaebi/scene-1-hut.png` (기)

**제목 ko**: 1장. 노래하는 영감과 외딴 빈집
**제목 en**: Chapter 1 — The Singing Old Man and the Lonely Hut

**Narration KO**:
> 옛날, 어느 마을에 마음씨가 곱고 노래를 잘 부르는 영감 한 분이 살고 계셨더라. 그런데 이 영감에게는 턱 한쪽에 커다란 혹이 매달려 있었다. 마을 아이들이 가끔 그 혹을 신기하게 바라보았지만, 영감은 한 번도 부끄러워하지 않았다. 오히려 혹을 슬쩍 두드리며 "이건 내 노래 주머니란다" 하고 웃었다.
>
> 영감은 매일 산에 올라 나무를 했다. 등에 진 지게에 나뭇단을 묶고 산을 내려오면서, 그는 늘 흥얼흥얼 노래를 불렀다. 새들이 따라 지저귀고, 다람쥐들이 멈춰 서서 귀를 기울이는 것 같았다.
>
> 그날도 영감은 산 깊은 곳까지 나무를 하러 갔다. 한참을 작업하고 보니 어느덧 해가 산 너머로 기울고 있었다. 길은 어두워지고 안개가 깔리기 시작했다.
>
> "이거 큰일이군. 오늘은 마을까지 못 내려가겠어."
>
> 마침 길 옆에 오래되어 보이는 빈 초가집 한 채가 있었다. 영감은 그 안에 들어가 짚단 위에 누웠다. 곧 깊은 잠에 빠졌다.

**Narration EN**:
> Long ago in a certain village there lived a kind-hearted old man with a wonderful singing voice. He had, though, a large lump hanging from one side of his jaw. The village children sometimes stared at it in wonder, but the old man was never ashamed. He would tap the lump lightly and say with a smile, "This is my song-pouch."
>
> Every day he climbed the mountain to gather firewood. As he made his way down with bundles tied to his A-frame carrier, he would hum and sing. The birds seemed to answer him, and the squirrels paused on the branches to listen.
>
> That day he went deeper than usual. By the time he had finished his work, the sun had slipped behind the ridge. The path darkened, and a soft mist began to rise.
>
> "Trouble. I can't reach the village before nightfall."
>
> Beside the path stood an old, abandoned thatched-roof hut. The old man slipped inside, lay down on a pile of straw, and was soon fast asleep.

**다음 장면**: → Scene 2 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Wide outdoor mountain scene at dusk transitioning to twilight.
Horizontal landscape composition with the lonely hut as the visual anchor
on one side. The old man approaches it from the foreground path.

Subject: A Korean mountain trail at dusk. CENTER-FOREGROUND: an old man
(~65, kind face with wrinkles, a long gray beard, plain hanbok with
visible collar/ribbon/sleeve lines, head-cloth tied around forehead). On
one side of his jaw — clearly visible — a round soft lump (혹) about the
size of a small peach (one clean fill region with a soft outline). He
carries an A-frame carrier (지게) on his back loaded with 3-4 bundles of
firewood (each bundle is one fill region with a few stick-end details).
He's mid-stride, looking at the hut with a quietly resigned smile.

RIGHT-MIDGROUND: an old, slightly leaning Korean thatched-roof hut (초가집)
with: a small paper-paneled door (한지문 with 2-by-3 panel grid), one
small paper window beside it, thatched roof showing slanted straw lines,
a tilted wooden post supporting one corner. The hut clearly looks
abandoned — overgrown grass tufts around its base, a small spider web
hinted at the doorway.

BACKGROUND: layered mountain ridges (3-4 simple silhouettes, smaller in
the distance), soft horizontal lines suggesting mist between the ridges.
A few tall Korean pine trees (apply GROUPED NATURAL TEXTURES — 5-7
cloud-shaped foliage clusters per pine, 2-4 trunk grain lines).

UPPER SKY: a slim crescent moon (one clean shape) appearing through 2-3
big soft cloud shapes. 5-8 simple 5-point stars beginning to appear.

GROUND DETAILS: 3-4 small fan-shaped grass tufts along the path, scattered
pine cones (3-4), one small mushroom by the hut's wall. NO carpet of
detail.

Mood: tired-day's-end peace + the gentle isolation of a man about to step
into something extraordinary.
Composition: WIDE horizontal — old man on the path foreground-left,
abandoned hut right-mid, mountains and pines spanning the background,
crescent moon and dusk sky upper, gentle ground details lower.
```

---

## Scene 2 — `04-dokkaebi/scene-2-feast.png` (승)

**제목 ko**: 2장. 한밤중 도깨비들의 잔치
**제목 en**: Chapter 2 — The Goblins' Midnight Feast

**Narration KO**:
> 한밤중, 빈집 문을 누군가 와락 열어젖혔다. 영감은 깜짝 놀라 눈을 떴지만, 곧 짚단 더미 뒤에 몸을 숨겼다. 살짝 머리만 들어 마루를 바라보니 ─ 거기에는 둥글둥글하고 머리에 외뿔이 난 도깨비들이 줄줄이 들어오고 있었다.
>
> 한 마리, 두 마리, 셋, 다섯, 일곱… 빈집 마루 한가운데 큰 솥과 술병이 놓이고, 도깨비들이 둥글게 둘러앉아 잔치를 벌이기 시작했다. "오늘은 보름달이 좋구나!" "노래를 부르자, 노래를!"
>
> 그런데 어쩐 일인지 도깨비들의 노랫소리는 영 신통치 않았다. 음정도 맞지 않고, 박자도 엉성했다. 도깨비들이 머리를 긁적이며 서로를 쳐다보았다. "왜 우리 노래는 이러지?"
>
> 짚단 뒤의 영감은 입이 근질거렸다. 평생 노래를 사랑해 온 그였다. 도저히 가만히 있을 수가 없었다.
>
> "에라, 무서운 도깨비라도 좋다. 한 곡 불러보자."
>
> 그는 두 가지 노래 중 어떤 노래를 부를지 잠시 망설였다. 신나서 모두가 일어나 춤추게 할 마을 노래를 부를까, 아니면 어머니께 어릴 때 배운 부드러운 자장가를 들려줄까.

**Narration EN**:
> In the middle of the night, the hut's door swung open with a bang. The old man started, then quickly hid himself behind the pile of straw. Peeking out, he saw — a line of round-bodied dokkaebi goblins, each with a single horn on its head, marching into the room.
>
> One, two, three, five, seven… In the middle of the floor they set down a great cauldron and a tall wine jar, and seated themselves in a circle to begin a feast. "What a fine full moon!" they cried. "Let us sing!"
>
> But for some reason their singing was — not very good. Pitches drifted, the rhythm was crooked. The dokkaebi scratched their horns and looked at each other in confusion. "Why does our song sound like this?"
>
> Behind the straw, the old man's mouth twitched. He had loved song all his life. He could not stay silent.
>
> "Even if they are frightful goblins, I must sing one song."
>
> He hesitated between two — the lively village song that would have them all dancing, or the soft lullaby his own mother had sung him long ago.

**선택지**:
- 🎵 `흥겨운 마을 노래를 부른다` / `Sing the lively village song` → **Scene 3a**
- 🌙 `어머니의 자장가를 부른다` / `Sing his mother's lullaby` → **Scene 3b**

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Interior nighttime scene inside the abandoned hut. The dokkaebi
circle is the visual center; the hidden old man peeks from behind a straw
pile on one side. Slight wide-angle to show the whole room.

Subject: Inside the abandoned thatched hut at deep midnight. CENTER: a
ring of 5 dokkaebi (Korean traditional goblins ─ stylized minhwa style:
round bodies, single curved horn on top of head, large round eyes, simple
toothy mouths, short stubby arms and legs, NOT scary, friendly cartoon
proportions). They sit cross-legged in a circle on the wooden floor.
Each dokkaebi is one main fill region for the body + separate regions for
horn, eyes, mouth.

CENTER OF THE CIRCLE: a large round cauldron (가마솥, with 2-3 wood grain
lines on its lid) and a tall wine jar (술병 with a narrow neck and round
body). A couple of wooden bowls.

LEFT-FOREGROUND: a tall pile of straw (gathered as 4-5 bundle shapes,
each one fill region — NOT individual straws). Peeking out from behind:
just the head and shoulders of the old man (gray beard, lump on jaw),
one hand cupped near his mouth as if about to sing, eyes wide with mixed
fear and excitement.

LIGHTING: the full moon is visible through a small paper window on the
back wall (small clean round shape inside the panel grid). One small oil
lamp (호롱불) sitting on a low ledge gives interior glow.

WALLS: simple plank walls with a few rough horizontal grain lines, the
edge of the thatched roof visible at the top. Cobwebs at one corner
(simple ~4 line spider web shape).

UPPER RIGHT: a couple of dokkaebi look puzzled at each other — show speech
through gesture (one scratching its horn, one holding its mouth as if
trying to understand the bad singing).

Apply DETAIL LEVEL: dokkaebi each show clear eyes/mouth/horn, old man's
hanbok shows collar/ribbon, hut wall shows wood grain.
GROUPED NATURAL TEXTURES: straw in 4-5 bundles, NO individual stalks.

Mood: midnight wonder + a man's quiet bravery building behind the straw.
Composition: HORIZONTAL interior. Dokkaebi ring dead-center on the floor,
straw + hidden old man left-foreground, moonlit window + oil lamp back
wall, simple ceiling beam line at the top.
```

---

## Scene 3a — `04-dokkaebi/scene-3a-dance.png` (전 · 흥겨운 노래)

**제목 ko**: 3장. 도깨비들과 함께 춤추는 밤
**제목 en**: Chapter 3 — A Night of Dancing with the Goblins

**Narration KO**:
> 영감이 짚단 뒤에서 천천히 일어서며 박수를 한 번 치고 노래를 시작했다.
>
> "달 떠라 떠라 보름달 떠라, 우리 마을 잔치 벌어졌다!"
>
> 영감의 목소리가 빈집을 가득 채웠다. 도깨비들이 깜짝 놀라 자리에서 벌떡 일어났다. 처음에는 어리둥절했지만, 곧 영감의 노래에 맞춰 한 마리, 두 마리 어깨를 으쓱이기 시작했다.
>
> "이 노래는 무슨 노래냐!" "어쩜 이리 신나는고!"
>
> 도깨비들이 둥글게 둘러서서 빙글빙글 돌며 춤을 추기 시작했다. 외뿔이 흔들리고, 둥근 배가 출렁였다. 영감도 짚단 더미에서 나와 도깨비들 사이에 끼어 함께 춤을 추었다. 빈집의 마루가 쿵쿵 울리고 천장의 거미줄이 흔들렸다.
>
> 한참을 신나게 놀고 나서, 가장 큰 도깨비 두목이 헐떡이며 영감 앞에 멈춰 섰다.
>
> "영감님, 어떻게 그런 좋은 노래가 나오십니까? 우리도 그런 노래를 부르고 싶습니다!"

**Narration EN**:
> The old man rose slowly from behind the straw, clapped once, and began to sing.
>
> "Moon rise, full moon rise — the village feast is ready tonight!"
>
> His voice filled the hut. The dokkaebi sprang up in surprise. They stared at first, then one by one their shoulders began to bounce in time with the song.
>
> "What song is that!" "What a fine, fine sound!"
>
> They formed a ring and spun round and round, dancing. Their horns bobbed, their round bellies bounced. The old man stepped out from behind the straw and danced among them. The floor of the hut thumped, the cobwebs at the ceiling trembled.
>
> When they had danced a long while, the biggest dokkaebi — their chief — stopped before the old man, panting.
>
> "Sir, how do such fine songs come from you? We want to sing songs like that too!"

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Dynamic interior dance scene. The dokkaebi + old man dance in
a wide circle; viewer sees the whole ring from a slightly low angle. Lots
of motion lines and joy.

Subject: Inside the same hut. CIRCLE OF 6 figures dancing in a ring: 5
dokkaebi (same style as Scene 2 — round bodies, single horn, friendly
faces) and the old man (gray beard, lump still on his jaw, eyes shut in
joyful song, mouth open singing, arms raised). All are mid-step, one foot
lifted, the next about to come down. Show 2-3 short motion lines around
each figure suggesting movement.

Each dokkaebi has a slightly different pose: one with arms over its head,
one with hands on its belly, one twirling. Their horns sway. The old man
in the middle of the ring is the visual anchor, distinguishable by his
human form and hanbok.

FLOOR: simple wood planks, with the cauldron + wine jar pushed to one
side now (no longer the center).

BACKGROUND: the same hut interior — the paper window with the moon, the
straw pile (smaller now in the corner), the oil lamp.

MOTION DETAILS: a couple of cobwebs trembling at the ceiling (with 2-3
small wavy lines suggesting shake), a few dust puffs around the dancers'
feet (each puff is one cloud-like shape, 4-5 puffs total).

Apply DETAIL LEVEL strictly: each dokkaebi face shows eyes/mouth/horn
clearly, old man's hanbok shows collar/ribbon/sleeves.

Mood: pure joyful celebration ─ the old man's song bursting into a wild
goblin dance.
Composition: DYNAMIC CIRCLE. Ring of dancers center, motion lines around
each, the cauldron + jar pushed to one side, dust puffs at feet, window
+ moon back wall as a calm anchor framing the joy.
```

---

## Scene 3b — `04-dokkaebi/scene-3b-lullaby.png` (전 · 자장가)

**제목 ko**: 3장. 자장가에 잠드는 도깨비들
**제목 en**: Chapter 3 — Goblins Drowsing to a Lullaby

**Narration KO**:
> 영감이 짚단 뒤에서 가만히 일어서며, 옛날 어머니께 배운 자장가를 부드럽게 부르기 시작했다.
>
> "자장자장 우리 아기 잘도 잔다, 산 너머 별빛도 잠이 들고…"
>
> 영감의 목소리가 잔잔하게 빈집에 퍼졌다. 시끄럽던 도깨비들이 동작을 멈추고 가만히 귀를 기울였다. 처음에는 어리둥절했지만, 곧 한 마리, 두 마리 눈꺼풀이 무거워지기 시작했다.
>
> "어쩜 이리 마음이 따뜻해지는고…" "잠이 솔솔 오는구나…"
>
> 도깨비들이 둥글게 둘러앉은 채로 서로의 어깨에 머리를 기댔다. 외뿔이 살짝 흔들리고, 큰 눈이 천천히 감겼다. 영감도 가만히 노래를 이어가며, 도깨비들 한복판에 자리를 잡고 앉았다. 달빛이 빈 창으로 부드럽게 흘러 들어왔다.
>
> 한참 후, 가장 큰 도깨비 두목이 졸린 눈을 비비며 영감에게 물었다.
>
> "영감님, 어떻게 그런 따뜻한 노래가 나오십니까? 우리도 그런 노래를 부르고 싶습니다!"

**Narration EN**:
> The old man rose softly from behind the straw and began the lullaby his mother had taught him long ago.
>
> "Sleep, sleep, my little one sleeps, the starlight beyond the mountain is sleeping too…"
>
> His gentle voice spread through the hut like a slow tide. The noisy dokkaebi stopped their motion and listened. They blinked, confused, and then one by one their eyelids grew heavy.
>
> "How warm it makes the heart…" "Sleep comes so soft…"
>
> They sat in their circle and leaned their heads gently against each other's shoulders. Their horns swayed a little, their large eyes slowly closed. The old man continued his quiet singing and took his seat in the middle of them. The moonlight slid in through the empty window.
>
> After a long while, the biggest dokkaebi rubbed his sleepy eyes and asked,
>
> "Sir, how do such warm songs come from you? We want to sing songs like that too!"

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Calm interior nighttime scene. Same hut, soft moonlight
streaming through the window. The dokkaebi sit in a drowsy circle leaning
on each other. The old man sits in the middle, still singing softly.
Horizontal/balanced composition.

Subject: Inside the same hut as Scene 2. CIRCLE OF 5 dokkaebi sitting on
the floor, leaning on each other's shoulders, eyes mostly closed
(suggested with simple soft curve eye lines instead of round open eyes).
Their bodies relaxed, horns tilted slightly. Some have a small "Z" or a
visible breath puff (just a tiny shape near the mouth) suggesting sleep.

CENTER OF THE CIRCLE: the old man (same character) sits cross-legged on
the floor, eyes gently shut, mouth slightly open in song, hands folded in
his lap. His lump still hangs from his jaw. A calm peaceful smile.

LIGHTING: a long beam of moonlight enters from the paper window on the
back wall (one diagonal soft line of light landing on the floor between
the dokkaebi). The oil lamp is dimmer now, flame smaller. The cauldron +
wine jar are still where they were, untouched.

ROOM DETAILS: same paper window with the moon visible (clean round
shape), the straw pile in the corner (smaller now), cobwebs hanging
quietly at the ceiling, wood plank floor.

Apply DETAIL LEVEL: hanbok details on old man, individual dokkaebi
faces (now showing drowsy/sleepy versions of the same characters from
Scene 2), wood grain on floor.

Mood: tender quiet — the kind of song that can put even goblins to
sleep. A lullaby spell.
Composition: BALANCED HORIZONTAL. Drowsy dokkaebi circle in the middle
ground, old man centered in the ring, moonlight beam diagonal across the
floor as a soft accent, paper window + moon back wall.
```

---

## Scene 4 — `04-dokkaebi/scene-4-lump.png` (결 · 정통 결말)

**제목 ko**: 마지막 장. 혹과 보물, 그리고 욕심쟁이의 길
**제목 en**: Final — The Lump, the Treasure, and the Greedy Man's Road

**Narration KO**:
> 영감은 두목 도깨비를 한참 바라보다가, 자기 턱에 매달린 큰 혹을 손으로 살짝 두드렸다.
>
> "사실은… 이 혹에서 나옵니다. 이 안에 평생 모은 노래가 다 들어 있지요."
>
> 도깨비들이 너 나 할 것 없이 영감에게 다가왔다. "그 혹을 우리에게 파시오! 보물을 한가득 드리겠소!"
>
> 두목 도깨비가 손가락을 가볍게 들어 영감의 혹을 어루만지자, 혹이 거짓말처럼 스르륵 떨어졌다. 영감의 턱이 깨끗해졌다. 그 자리에 도깨비들은 큰 보따리를 한가득 내려놓았다. 안에는 금덩어리와 은붙이, 비단과 곡식이 가득 들어 있었다.
>
> "고맙소이다, 영감님! 잘 가시오!"
>
> 어느새 첫 닭이 울고, 도깨비들은 사르르 빈집에서 사라졌다. 영감은 보물 보따리를 지고 어두운 산길을 더듬어 새벽 무렵 마을로 돌아왔다.
>
> 마을 사람들은 영감의 깨끗한 턱과 한가득 든 보물에 깜짝 놀랐다. 영감은 자기가 본 모든 것을 솔직히 들려주었다. 마을은 잔치를 열고 영감을 칭송했다.
>
> 그런데 이 이야기를 옆 마을에 사는 욕심 많은 영감 한 분이 듣게 되었더라. 그 영감의 턱에도 큰 혹이 매달려 있었다. 다만 그는 노래도 못 하고 마음도 곱지 않았다.
>
> "허허, 그 늙은이가 했다면 나도 못 할 게 있나? 보물도 받고 혹도 떼어 오리라."
>
> 다음 보름달 밤, 욕심쟁이 영감은 일부러 그 빈집에 찾아가 짚단 뒤에 숨었다. 도깨비들이 와서 잔치를 시작했다. 영감은 큰소리로 노래를 시작했다 ─ 그러나 음정도 박자도 엉망진창이었다. 도깨비들이 인상을 찌푸렸다.
>
> "이 노래는 또 무엇이냐?" "지난번 그 영감이 아니로구나!"
>
> 두목 도깨비가 욕심쟁이 영감을 노려보았다. "우리는 한 번 속았다. 이번엔 안 속는다."
>
> 도깨비들은 지난번에 가져간 혹을 다시 꺼냈다. 그것을 욕심쟁이 영감의 다른 쪽 턱에 떡 하니 붙여 버렸다. 욕심쟁이 영감은 혹 두 개를 양쪽 턱에 매달고 울며 산을 내려갔다.
>
> 그래서 옛 어른들은 손주에게 이렇게 일러 주었더라 ─ "재주는 진심에서 나오는 것이지, 욕심에서 나오는 것이 아니란다."

**Narration EN**:
> The old man looked at the chief a long while, then gently tapped the lump on his jaw.
>
> "To tell the truth… it all comes from this lump. All my songs have been gathered here for a lifetime."
>
> The dokkaebi gathered close around him. "Sell us that lump! We will give you treasure beyond counting!"
>
> The chief raised a single finger and brushed the old man's lump — and the lump came away as easily as a soap bubble. The old man's jaw was clean. In its place the dokkaebi heaped great bundles before him — gold ingots, silver work, silk and grain.
>
> "Thank you, kind sir! Farewell!"
>
> The first rooster crowed, and the dokkaebi vanished from the hut. The old man shouldered the bundles and made his way down the dark path, reaching the village at dawn.
>
> The villagers marveled at his clean jaw and the wealth he carried. He told them all that he had seen, honestly. The village held a feast in his honor.
>
> Now — this story reached a greedy old man living in the next village over. He also had a great lump on his jaw, but he could not sing and his heart was not kind.
>
> "Ha! If that fool managed it, why not I? I shall have treasure and a clean jaw both."
>
> On the next full-moon night the greedy man went deliberately to the same hut and hid behind the straw. The dokkaebi came, set up their feast. The man began to sing in a loud voice — but his pitch was off and his rhythm tumbled. The dokkaebi frowned.
>
> "What is this noise?" "This is not the same old man!"
>
> The chief glared. "We were tricked once. We will not be tricked again."
>
> The dokkaebi brought out the lump they had taken last time and stuck it firmly to the greedy man's other jaw. He stumbled home with TWO lumps, weeping all the way down the mountain.
>
> So the old ones tell their grandchildren: "Skill comes from sincerity, not greed."

**Ending Label**: 🥁 `노래와 정직의 보답 — 정통 결말` / `The Reward of Song and Honesty — the canonical ending`

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Two-panel split canvas, LEFT half showing the good ending
(clean-jaw old man + treasure + happy village), RIGHT half showing the
greedy man's fate (two-lump weeping old man going down the mountain).
The two halves are visually separated by a subtle vertical line of
dawn light or a tree.

Subject: A canvas of two destinies side by side.

LEFT HALF — GOOD OLD MAN:
- Center: the kind old man (same character) standing in the village
  square at dawn, clean jaw (no lump), arms slightly raised in joy.
- At his feet: 2-3 large open bundles overflowing with treasure — gold
  ingots (3-4 simple rectangular shapes), silver pieces (3-4 round
  disks), folded silk fabric (2-3 cloth shapes), grain bags (2-3 round
  sacks with simple drawstring tops).
- Behind him: 3-4 villagers cheering, hands raised. A simple low table
  set with rice cake (떡 — round patties stacked).
- Background: hanok rooftops with curved eaves, a low Korean stone wall,
  a persimmon tree with 3-4 round fruits.

RIGHT HALF — GREEDY OLD MAN:
- The greedy old man (same general age, gray hair and beard but slightly
  fancier hanbok suggesting wealth) descending a mountain trail. He has
  TWO LUMPS on his jaw — one on each side (clearly visible).
- His shoulders slumped, head down, face crumpled in tears (2-3 short
  tear lines on each cheek). One hand wiping his eyes.
- Background: rocky mountain path, a couple of pine trees (apply
  GROUPED NATURAL TEXTURES — 5-7 cloud-shaped foliage clusters per
  pine), a few mocking magpie birds in the trees (3-4 simple bird shapes).

DIVIDING ELEMENT: a tall vertical pine tree at center separating the
two halves, OR a soft vertical line of dawn light from sky to ground.

UPPER SKY: across both halves, a calm dawn — soft horizontal cloud lines
(2-3), a small rising sun on the upper-left side (round with 6-8 simple
rays), 4-5 fading stars on the upper-right side.

Apply DETAIL LEVEL strictly: both old men show full hanbok detail, faces
distinct in expression (one joyful clean, one sad with two lumps).

Mood: cosmic justice rendered gently — the kind man's reward + the
greedy man's lesson, both bathed in the same morning light.
Composition: SPLIT CANVAS — good old man + village + treasure on the
LEFT (~50%), greedy old man + mountain descent on the RIGHT (~50%), the
canvas divided by a central pine or light beam, dawn sky uniting both
halves at the top.
```

---

# 📋 받은 PNG 체크리스트 (혹부리 영감)

배치 위치: `public/coloring/04-dokkaebi/`

- [ ] `scene-1-hut.png` — 1장. 노래하는 영감과 외딴 빈집 (기)
- [ ] `scene-2-feast.png` — 2장. 한밤중 도깨비들의 잔치 (승 + 분기)
- [ ] `scene-3a-dance.png` — 3장 분기 A. 도깨비들과 함께 춤추는 밤 (전)
- [ ] `scene-3b-lullaby.png` — 3장 분기 B. 자장가에 잠드는 도깨비들 (전)
- [ ] `scene-4-lump.png` — 마지막 장. 혹과 보물, 그리고 욕심쟁이의 길 (결 / 정통 결말)

기존 `start.png`, `sing.png`, `hide.png`, `ending-blessing.png`, `ending-wander.png`은 `Backup_v1/`에 그대로 유지 (롤백용).

---

# 🐸 Story 5 — 콩쥐와 두꺼비 (Kongjwi and the Toad)

**원작 배경**: 한국판 신데렐라. 계모와 의붓동생 팥쥐의 학대를 받는 콩쥐가 자연(두꺼비·참새·검은 소)의 도움으로 잔치에 가게 되고, 신발 한 짝을 통해 사또를 만나 행복해진다.

**기승전결**:
- **기 (起)** Scene 1 — 콩쥐의 외로운 일상, 깨진 항아리 임무
- **승 (承)** Scene 2 — 두꺼비의 첫 도움, 계모의 더 큰 일거리 + 분기
- **전 (轉)** Scene 3a/3b — 참새들의 베틀 도움 / 검은 소의 옷과 신발
- **결 (結)** Scene 4 — 잔치, 잃어버린 신발, 사또의 발견과 따뜻한 결말

```
                ┌── 3a (참새 베틀) ────┐
1 → 2 (선택) ──┤                    ├── 4 (정통: 잔치 + 신발)
                └── 3b (검은 소의 선물) ──┘
```

**정통 결말**: 두 분기 모두 콩쥐가 잔치에 가게 되고, 잔치에서 잃어버린 꽃신 한 짝이 사또에게 들려 콩쥐를 찾아온다. 정직과 부지런함, 자연의 보살핌이 보상받는 한국적 권선징악 + 따뜻한 신데렐라.

---

## Scene 1 — `05-kongjwi/scene-1-jar.png` (기)

**제목 ko**: 1장. 깨진 항아리와 작은 두꺼비
**제목 en**: Chapter 1 — The Cracked Jar and the Little Toad

**Narration KO**:
> 옛날, 어느 마을에 콩쥐라는 착한 처녀가 살고 있었더라. 어머니가 일찍 돌아가시고 아버지가 새로 장가를 든 뒤로, 콩쥐는 늘 외로웠다. 새어머니는 자기 친딸 팥쥐만 귀하게 여기고, 콩쥐에게는 새벽부터 밤늦게까지 일만 시켰다.
>
> 어느 날, 마을에서 큰 잔치가 열린다는 소식이 전해졌다. 사또께서 마을을 둘러보러 오신다는 것이었다. 새어머니는 팥쥐의 손을 잡고 곱게 단장을 시켰지만, 콩쥐 앞에는 무거운 항아리 하나를 내려놓았다.
>
> "이 항아리에 물을 가득 채워라. 다 채워 놓지 않으면 잔치에 못 갈 줄 알아라."
>
> 콩쥐가 두레박으로 물을 길어 항아리에 부었다. 그런데 어찌 된 일인지 항아리는 좀처럼 차오르지 않았다. 자세히 보니 항아리 바닥에 큰 금이 가서 물이 줄줄 새고 있었다.
>
> 콩쥐는 그 자리에 주저앉아 가만히 울었다.
>
> 그때 마당 한구석에서 부스럭 소리가 났다. 천천히 두꺼비 한 마리가 콩쥐 앞으로 기어 나왔다. 작은 검은 눈동자가 콩쥐를 가만히 올려다보았다.
>
> "콩쥐 누나, 울지 마세요. 제가 깨진 곳을 막아 드릴게요."
>
> 두꺼비는 항아리 안으로 들어가더니, 자기 몸으로 깨진 자리를 막아 주었다. 콩쥐가 다시 물을 길어 붓자, 이번에는 항아리가 천천히 차오르기 시작했다.

**Narration EN**:
> Long ago in a certain village there lived a kind-hearted young woman named Kongjwi. Her mother had died when she was small, and her father had remarried. Ever since, Kongjwi had been lonely. Her stepmother cherished only her own daughter Patjwi and gave Kongjwi nothing but work from dawn until late at night.
>
> One day word came that the village would hold a great feast — the magistrate himself was coming. The stepmother dressed Patjwi up in fine hanbok with her own hands. In front of Kongjwi she set down a heavy clay jar.
>
> "Fill this jar to the very brim. If it isn't full, you will not be going to the feast."
>
> Kongjwi drew water from the well with a dipper and poured it into the jar. But somehow the jar would not fill. Looking closely, she saw a wide crack along its base — the water was slipping away as fast as she could pour.
>
> She sank to the ground and wept quietly.
>
> Just then there was a rustle in the corner of the yard. Slowly, a small toad crept out and stopped before her. Its little black eyes looked up at her steadily.
>
> "Sister Kongjwi, please don't cry. I'll fill the broken place for you."
>
> The toad climbed inside the jar and pressed its body against the crack. When Kongjwi poured the next bucket of water, the jar began at last, slowly, to fill.

**다음 장면**: → Scene 2 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor Korean traditional yard scene at midday. Center-
foreground composition with the tall cracked jar and the young woman + toad
as the focal anchor. Warm domestic-but-lonely tone.

Subject: A Korean village yard. CENTER: a tall traditional clay
fermenting jar (장독 / 항아리 — wide rounded body, narrow top, ~1.2 meters
tall). A clear visible CRACK runs from the middle down the side to the
base, with a few water droplets seeping out (3-4 small teardrop shapes).
The jar sits on a flat stone slab.

KNEELING TO THE LEFT OF THE JAR: a young woman (Kongjwi, ~17, plain
simple work hanbok — visible collar/ribbon/sleeve cuff lines, long hair
in a single braid down her back tied with a plain ribbon, gentle sad
face with one tear visible). She holds a wooden dipper in one hand,
the other hand resting on the jar's side. She looks toward the toad.

AT THE BASE OF THE JAR, FRONT: a stylized friendly Korean toad (두꺼비 —
plump rounded body, big round eyes, gentle smile, simple bumpy back
texture shown as ~5-6 small round bumps in two rows, NOT a hundred warts).
The toad is climbing toward the jar's crack with one foreleg raised.

LEFT BACKGROUND: a hanok wall with curved tile eaves (~6-8 visible roof
tiles), a wooden door partly open. Through the doorway, a glimpse of
the stepmother (older woman in fine hanbok with strict eyebrows) and
Patjwi (a younger girl in fine colorful hanbok with hair ribbons) ─ both
shown in profile/back view, sister adjusting Patjwi's hair ribbon. They
should be visible enough to convey the family contrast but small.

RIGHT BACKGROUND: a simple Korean well (우물 — low circular stone wall)
with a wooden bucket-pulley. A pail beside it.

GROUND: scattered fan-shaped grass tufts (3-4 spaced apart), a few small
pebbles, one scattered chicken (simple shape) pecking.

SKY: 2-3 simple cloud shapes, a gentle sun in the upper-left (round with
6-8 simple rays).

Apply DETAIL LEVEL: Kongjwi hanbok shows collar/ribbon/cuff/hem, face
shows iris/pupil/nose/mouth/hair strands, jar shows clean rounded silhouette
with grain bands at shoulder.
GROUPED NATURAL TEXTURES: grass in tufts, clouds simple.

Mood: a quiet sad moment turning gently to hope — a friend arrives from
the smallest corner.
Composition: CENTER FOCAL. Tall cracked jar dead-center, Kongjwi
kneeling beside it left, toad at the jar's base front, hanok with
stepmother + Patjwi glimpsed background-left, well right-background,
sky and sun upper band.
```

---

## Scene 2 — `05-kongjwi/scene-2-tasks.png` (승)

**제목 ko**: 2장. 잔치는 다가오고, 두 가지 일거리
**제목 en**: Chapter 2 — The Feast Approaches, and Two Tasks

**Narration KO**:
> 콩쥐가 항아리에 물을 다 채우고 환한 얼굴로 새어머니께 보여드렸다. 그러나 새어머니의 표정은 더 차가워졌다.
>
> "잔치는 멀었다. 너에게는 아직 할 일이 둘이나 더 있다. 이 일을 다 끝내 놓아야 잔치에 갈 생각이라도 해 보거라."
>
> 새어머니가 마당에 두 가지를 내려놓았다.
>
> 하나는 커다란 베틀과 짜야 할 비단실 한 광주리. 잔치 전까지 비단 한 필을 짜내야 한다는 것이었다. 어린 콩쥐가 혼자서는 도저히 끝낼 수 없는 일이었다.
>
> 다른 하나는 잡곡 한 가마니. 그 안에 좋은 곡식과 모래·검불이 마구 섞여 있었다. 그것을 깨끗이 골라 두라는 것이었다. 손가락 끝이 다 까지도록 골라도 며칠은 걸릴 분량이었다.
>
> 새어머니는 팥쥐를 데리고 잔치 구경을 가 버렸다. 콩쥐는 마당에 혼자 남았다. 어느 일거리부터 시작해야 할까?

**Narration EN**:
> When the jar was full, Kongjwi went brightly to her stepmother. But the woman's face only grew colder.
>
> "The feast is hours away. There are still two tasks for you. Finish both before you so much as think about going."
>
> She set down two things in the yard.
>
> The first was a great wooden loom and a basket heaped with silk thread. A whole bolt of silk must be woven before the feast — work no young woman could finish alone in an afternoon.
>
> The second was a sack of grain. Inside, good rice was mixed in with sand, with pebbles, with chaff. She must pick it all clean. Even with fingers raw from sorting, it would take days.
>
> The stepmother took Patjwi and left for the feast. Kongjwi stood alone in the yard. Which task should she begin?

**선택지**:
- 🧵 `먼저 베틀 앞에 앉아 비단을 짜기 시작한다` / `Sit at the loom first and begin weaving the silk` → **Scene 3a**
- 🌾 `먼저 잡곡 광주리부터 골라낸다` / `Begin sorting the grain first` → **Scene 3b**

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor yard scene at golden afternoon hour. Wide composition
showing the two impossible tasks side by side, Kongjwi small between them.
Slightly elevated camera angle so the viewer sees both tasks clearly.

Subject: The same Korean yard, now midday-to-golden-afternoon. CENTER
FOREGROUND: Kongjwi (same character, same hanbok) standing in the middle
of the yard, looking from one task to the other, hands clasped at her
heart.

LEFT TASK — LOOM AND SILK:
A traditional Korean wooden weaving loom (베틀 — show clearly: foot
treadles at the bottom, a vertical frame, the thread mechanism, the
warp threads as 8-10 parallel vertical lines). Beside it a large round
woven basket overflowing with silk thread spools (4-5 visible spools,
each one fill region). 2-3 birds (small simple sparrow shapes) are
perched on the loom's top — hinting at help to come.

RIGHT TASK — GRAIN SACK:
A large straw rice sack tipped over, spilling its contents onto a
straw mat on the ground. The spilled pile shows a clearly MIXED mass
of: clean rice grains (cluster of small dots), pebbles (3-4 small
round shapes), straw bits (3-4 thin line clusters), small dirt clumps
(2-3 irregular shapes). Beside the sack: a sorting tray (키 — flat
woven winnowing tray, one clean shape).

BACKGROUND-LEFT: the hanok house wall with the wooden door now closed,
a few pieces of nicer hanbok hanging on a clothesline (suggesting
Patjwi and stepmother left in their best).

BACKGROUND-RIGHT: the cracked jar (now filled, water level visible at
the top), the well, and the toad sitting quietly at the well's edge
looking up at Kongjwi.

UPPER SKY: golden afternoon, simple horizontal cloud shapes (2-3),
warm sun lower in the sky now (round with rays). A few autumn leaves
falling (3-4 simple leaf shapes drifting down).

Apply DETAIL LEVEL: loom shows full mechanism, hanbok full detail,
faces detailed. GROUPED NATURAL TEXTURES: clouds simple, leaves in
small groups not a swarm.

Mood: weight of impossible work + the quiet companions watching from
the edges — sparrows + toad already there to help.
Composition: WIDE balanced — loom + silk + sparrows on the LEFT third,
Kongjwi center, grain sack + sorting tray on the RIGHT third, hanok and
quiet helpers in the background.
```

---

## Scene 3a — `05-kongjwi/scene-3a-sparrows.png` (전 · 참새 베틀)

**제목 ko**: 3장. 참새 떼와 베틀 앞에서
**제목 en**: Chapter 3 — At the Loom with a Flock of Sparrows

**Narration KO**:
> 콩쥐는 베틀 앞에 앉아 가만히 손을 모았다. 비단 한 필이라니 ─ 혼자서는 도저히 끝낼 수 없는 일이지만, 그래도 한 올 한 올 정성껏 짜기 시작했다.
>
> 그때 어디선가 푸드덕푸드덕 날갯짓 소리가 들렸다. 마당 위 감나무 가지에 앉아 있던 참새들이 한 마리, 두 마리, 다섯 마리, 열 마리, 한 떼가 베틀 곁으로 내려왔다.
>
> 가장 큰 참새가 콩쥐의 손등에 가볍게 앉아 짹짹거렸다.
>
> "콩쥐 누나, 우리가 도와 드릴게요. 누나는 가만히 계세요."
>
> 참새들이 베틀 위로 휘 날아오르더니, 작은 부리로 실을 잡고 살짝살짝 잡아당기기 시작했다. 한 마리는 위에서, 두 마리는 아래에서, 다른 참새들은 옆에서 ─ 모두가 한 호흡으로 움직였다.
>
> 콩쥐가 한참을 바라보고 있는 사이, 베틀 위에서는 어느새 고운 비단 한 필이 차곡차곡 짜여 가고 있었다. 햇살에 닿은 비단은 분홍빛과 연두빛이 번갈아 비치는 듯했다.
>
> 비단 짜기가 다 끝났을 무렵, 가장 큰 참새가 콩쥐 앞에 다시 내려와 짹짹거렸다.
>
> "이걸 입고 잔치에 가세요. 사또께서 콩쥐 누나를 기다리고 계실 거예요."

**Narration EN**:
> Kongjwi sat down at the loom and folded her hands a moment. A whole bolt of silk — no one could finish it alone. Still, she began, thread by careful thread.
>
> Then came a soft whirring of wings. From the persimmon tree above the yard, sparrows came down one, two, five, ten — a whole flock — and settled around the loom.
>
> The largest sparrow lit gently on the back of her hand and chirped.
>
> "Sister Kongjwi, we will help. Please just rest."
>
> The sparrows flew up onto the loom. With their tiny beaks they took hold of the threads and tugged in perfect rhythm. One worked from above, two from below, others at the sides — all moving as a single breath.
>
> While Kongjwi only watched, the loom began to fill, line after line, with a beautiful pale silk. Where the afternoon sun touched it, the cloth shimmered between rose-pink and soft green.
>
> When the bolt was finished, the largest sparrow returned to her and chirped again.
>
> "Wear this and go to the feast. The magistrate is waiting for you."

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Charming interior-yard scene at warm afternoon. The loom is
the visual center; sparrows fly around and on it in active poses. Kongjwi
sits in gentle wonder. Slightly storybook feel.

Subject: A Korean traditional yard mid-afternoon. CENTER: the wooden
weaving loom (베틀 with full traditional mechanism visible — frame, treadles,
warp threads as 8-10 vertical lines). On the loom, a half-woven bolt of
beautiful silk is forming (show as a rolled cloth shape at the lower part
of the loom with a few simple decorative pattern lines suggesting
shimmer).

ON THE LOOM AND AROUND IT: a flock of 8-10 sparrows (small simple Korean
sparrow shapes — round body, small head, short beak, two small dot eyes,
NO detailed feathers). Each sparrow holds a thread with its beak. Show
their poses varied: some flying with thread in beak, some perched on the
top crossbar, some standing on the half-woven cloth. 2-3 short motion
lines around each sparrow suggesting busy work.

KONGJWI: sits on a low wooden stool to the right of the loom. Hands
clasped at her chest, eyes wide with gentle wonder, soft smile. Same
plain work hanbok as previous scenes.

THE LARGEST SPARROW: perched on Kongjwi's hand (closer to viewer),
chirping toward her — show its open beak with a tiny line suggesting
song.

BACKGROUND-LEFT: a small Korean persimmon tree (감나무) — apply GROUPED
NATURAL TEXTURES: 4-5 large rounded blob foliage clusters (each one
fill region), 2-4 trunk grain lines only, 5-6 round persimmon fruits
hanging (each one fill region).

BACKGROUND-RIGHT: the corner of the hanok house, the cracked jar (now
full), and the toad sitting quietly at the well's edge watching.

UPPER SKY: warm afternoon, 2-3 simple cloud shapes, sun low in the
upper-right with simple rays.

Apply DETAIL LEVEL: full hanbok detail on Kongjwi, faces detailed, loom
fully drawn.
GROUPED NATURAL TEXTURES strictly: persimmon foliage in clusters, NO
individual leaves.

Mood: a small miracle ─ tiny helpers stepping in for an impossible task,
quiet joy.
Composition: CENTERED on the loom + working sparrows. Kongjwi seated
right, persimmon tree background-left with more sparrows, hanok corner
and quiet jar+toad background-right.
```

---

## Scene 3b — `05-kongjwi/scene-3b-ox.png` (전 · 검은 소의 선물)

**제목 ko**: 3장. 검은 소의 선물
**제목 en**: Chapter 3 — The Black Ox's Gift

**Narration KO**:
> 콩쥐는 잡곡 광주리를 끌어다 놓고, 한 알 한 알 곡식을 골라내기 시작했다. 햇살에 까져 가는 손가락 끝이 따끔따끔했지만, 콩쥐는 묵묵히 일했다.
>
> 그때 마을 어귀에서 묵직한 발소리가 들려왔다. 검은 털이 윤기 나는 큰 소 한 마리가 사립문을 지나 마당으로 들어왔다. 등에는 무엇인가 가지런히 묶인 보따리가 얹혀 있었다.
>
> 검은 소는 콩쥐 앞에 천천히 무릎을 꿇었다. 큰 검은 눈동자가 콩쥐를 가만히 바라보았다.
>
> "콩쥐 누나, 누나는 그 일을 다 끝내지 않아도 됩니다. 하늘이 다 보고 계셨어요. 이것을 입고 잔치에 가세요."
>
> 검은 소가 등에 진 보따리를 마당에 부려 놓았다. 보따리 안에서는 — 곱게 자수가 놓인 분홍빛 한복 한 벌과, 푸른 비단 댕기 한 줄과, 작은 꽃신 한 켤레가 천천히 나왔다. 꽃신에는 금실로 작은 꽃이 수놓여 있었다.
>
> 콩쥐가 한복을 입고, 댕기를 머리에 묶고, 꽃신을 신자 그녀의 모습이 봄날의 진달래꽃처럼 환해졌다.
>
> 검은 소가 다시 무릎을 꿇고 등을 내밀었다.
>
> "타세요. 잔치에 데려다 드릴게요."

**Narration EN**:
> Kongjwi pulled the grain sack closer and began picking out the rice grain by grain. The sun beat down, her fingertips grew raw, but she worked on quietly.
>
> Then a slow, heavy hoofbeat came from the village gate. A great black ox with a glossy coat passed through the open gate into the yard. On its back rested a carefully tied bundle.
>
> The black ox knelt before Kongjwi. Its large dark eyes looked at her steadily.
>
> "Sister Kongjwi, you do not have to finish this task. Heaven has been watching. Wear this and go to the feast."
>
> The ox set down its bundle in the yard. From inside came — a beautifully embroidered pale-pink hanbok, a blue silk ribbon for the hair, and a small pair of flowered shoes (꽃신). On the shoes, tiny flowers were stitched in gold thread.
>
> When Kongjwi put on the hanbok, tied the ribbon, and slipped on the flowered shoes, she shone like spring azaleas in bloom.
>
> The black ox knelt again and offered its back.
>
> "Climb up. I will take you to the feast."

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor yard scene at golden afternoon. The ox is the visual
anchor, kneeling. Kongjwi mid-transformation — putting on the gifted
clothes. Centered storybook composition.

Subject: The same Korean yard, late golden afternoon. CENTER: a great
black ox (소 — Korean traditional ox with a strong body, two short curved
horns, a single wooden bell hanging from a rope around its neck, large
dark eyes, gentle expression). The ox is KNEELING with its forelegs
folded under, head slightly bowed. On its back, the bundle is open and
slipping down — a beautiful folded hanbok partly spilling out (visible
pink silk with embroidered floral pattern lines).

RIGHT OF THE OX: Kongjwi (same character) in the middle of putting on a
new beautiful pale-pink hanbok over her simple work clothes — the new
hanbok has visible delicate floral embroidery lines along the collar
and sleeve cuffs. She has just tied a blue ribbon (댕기) in her braid.
At her feet sit a pair of small flowered shoes (꽃신 — pointed-tip Korean
traditional women's shoes with delicate flower embroidery patterns of
small petals on each shoe). She holds one shoe in her hand, just about
to slip her foot in. Her face shows tender gratitude — small surprised
smile, soft moist eyes.

LEFT-FOREGROUND: the abandoned grain sack with the sorting tray, only
partly cleaned (the work she will no longer have to finish). A handful
of clean rice scattered on the tray.

BACKGROUND-LEFT: the cracked jar (now full) and the toad sitting quietly
on the stone slab beside it, watching with approval.

BACKGROUND-RIGHT: the hanok wall with the open wooden gate that the ox
just walked through. A simple wooden sign-pole beside the gate.

UPPER SKY: golden afternoon turning warm — soft horizontal cloud
shapes (2-3), large warm sun lower in the sky, a few sparrows flying
overhead (small simple shapes, 3-4) ─ as if the sparrows from the OTHER
branch are also celebrating from afar.

GROUND: scattered grass tufts (3-4), one or two persimmon leaves
fallen.

Apply DETAIL LEVEL: ox shows clear simple features (eyes, ears, neck
bell, gentle face), Kongjwi's new hanbok shows embroidery pattern lines,
the flowered shoes are visibly detailed with petal stitching.
GROUPED NATURAL TEXTURES: clouds simple, grass in tufts.

Mood: heaven-touched generosity — a working girl receives a gift she
did not ask for, given freely by a creature of the land.
Composition: CENTERED. Black ox kneeling center, Kongjwi to the right
putting on her gift, abandoned task left-foreground, jar + toad approving
left-background, gate behind the ox, golden sky upper.
```

---

## Scene 4 — `05-kongjwi/scene-4-banquet.png` (결 · 정통 결말)

**제목 ko**: 마지막 장. 잔치, 꽃신, 그리고 사또의 가마
**제목 en**: Final — The Feast, the Flowered Shoe, and the Magistrate's Sedan

**Narration KO**:
> 콩쥐는 잔치 마당에 들어섰다. 비단을 두르고 댕기를 묶고 꽃신을 신은 그녀를 마을 사람들이 모두 한 번씩 돌아보았다. 새어머니와 팥쥐는 멀리서 콩쥐를 보고도 알아보지 못했다.
>
> 잔치 한가운데에는 사또께서 앉아 계셨다. 마을 어른들이 한 사람씩 인사를 올리고, 사또는 고개를 끄덕이며 흐뭇하게 잔치를 바라보고 계셨다. 콩쥐도 멀찍이 서서 잔치를 구경했다.
>
> 그런데 ─ 누군가 콩쥐에게 다가오는 발소리가 들렸다. 새어머니가 콩쥐를 알아본 것이다! 새어머니는 무서운 얼굴로 다가왔다.
>
> 콩쥐는 놀라 잔치 마당을 빠져나가려 했다. 그러다 그만 한쪽 꽃신이 작은 도랑에 빠지고 말았다. 신발을 주울 새도 없이, 콩쥐는 맨발 한 짝으로 산길을 달려 집으로 돌아왔다.
>
> 잔치가 끝난 뒤, 사또의 행렬이 마을을 떠나려고 할 때, 누군가가 도랑에서 무엇인가를 건져 올렸다. 작은 분홍빛 꽃신 한 짝이었다. 금실로 수놓인 작은 꽃이 햇살에 반짝였다.
>
> 사또가 그 신을 받아 들고 한참을 들여다보더니, 천천히 말했다.
>
> "이 꽃신의 주인을 찾아내라. 이런 정성스러운 신을 신은 사람이라면, 마음이 곱고 손길이 부지런한 처녀임에 틀림없다. 내가 그 사람을 한 번 만나 보고 싶구나."
>
> 사또의 사람들이 마을 집집을 다니며 꽃신을 신어 보게 했다. 새어머니는 팥쥐에게 억지로 신을 신겨 보았지만 발이 너무 커서 들어가지도 않았다. 한참 만에 사또의 사람들이 콩쥐의 집 마당까지 왔다.
>
> 콩쥐가 천천히 발을 내밀어 신을 신어 보자, 꽃신이 그녀의 발에 꼭 맞았다. 나머지 한 짝 꽃신을 콩쥐가 옷자락 안에서 꺼내 보였다. 두 짝이 비로소 한 켤레가 되었다.
>
> 사또는 콩쥐를 가마에 태워 그녀의 손을 잡았다. "어떤 어려움 속에서도 마음의 정직을 잃지 않은 그대를 내가 잘 모시리라."
>
> 그날 이후로 콩쥐는 사또의 곁에서 따뜻한 보살핌 속에 살게 되었다. 새어머니와 팥쥐는 부끄러움에 마을을 떠났다. 그러나 콩쥐는 사또께 부탁하여 그들도 굶지 않도록 마을 한쪽에 작은 집을 마련해 주었더라.
>
> "용서는 가장 큰 선물이란다." 옛 어른들은 손주에게 이렇게 일러 주었더라.

**Narration EN**:
> Kongjwi stepped into the feast yard. With her silk gown, her ribboned braid, her flowered shoes, every villager turned to look at her once. Even her own stepmother and Patjwi did not recognize her from afar.
>
> At the heart of the feast sat the magistrate. One by one the village elders bowed before him; he nodded gently and watched the celebration with a quiet smile. Kongjwi stood at a respectful distance and watched too.
>
> Then — she heard footsteps behind her. The stepmother had recognized her! The woman's face was thunder as she came closer.
>
> Startled, Kongjwi turned to slip away. As she ran, one of her flowered shoes fell into a small roadside ditch. There was no time to fetch it. With one bare foot she fled all the way home along the mountain path.
>
> After the feast, as the magistrate's procession was leaving, someone fished a small thing out of the ditch — a single rose-pink flowered shoe, embroidered with gold-thread petals that shone in the sun.
>
> The magistrate held the shoe a long while. Then he spoke slowly.
>
> "Find the owner of this shoe. Whoever stitched and wore something so careful must have a kind heart and a busy, honest hand. I would like to meet that person."
>
> His men carried the shoe from house to house through the village. The stepmother forced Patjwi to try it — but Patjwi's foot was far too large; the shoe would not even slip on. At last the magistrate's men reached Kongjwi's yard.
>
> When Kongjwi slowly held out her foot, the shoe fit her exactly. From a fold in her skirt she drew out the other shoe, the missing twin. At last the pair was a pair again.
>
> The magistrate took her hand and helped her into his sedan. "You who kept the honesty of your heart through every hard hour — I shall care for you well."
>
> From that day on, Kongjwi lived under his warm protection. The stepmother and Patjwi left the village in shame. But Kongjwi asked the magistrate to give them a small house at the edge of the village, so they would not go hungry.
>
> "Forgiveness is the largest gift of all," the old ones tell their grandchildren still.

**Ending Label**: 🌸 `꽃신의 짝 — 정통 결말` / `The Twin of the Flowered Shoe — the canonical ending`

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor village courtyard scene at golden hour. The magistrate's
sedan + Kongjwi + the flowered shoe being placed on her foot are the
visual center. The stepmother + Patjwi watch in shame from the side. Warm
celebratory closing tone.

Subject: A Korean village yard at golden hour.

CENTER FOREGROUND: Kongjwi (now in her beautiful pale-pink hanbok with
floral embroidery, hair ribbon, hopeful gentle smile) sits gracefully
on a low wooden stool with one foot extended. A kneeling official (남자
in formal Joseon official attire — official's robe, black gat hat) holds
the missing flowered shoe and is gently slipping it onto her foot. Show
both shoes visible: one already on her other foot, the matching one in
the official's hands.

CENTER MID-GROUND: a traditional Korean sedan chair (가마 — wooden box
with curved roof, decorative carved sides, two long carrying poles
extending front and back). The magistrate (사또 — older man, formal
Joseon official robe with embroidered chest panel 흉배, wearing a
SAMO 사모 ─ the black official's hat with two horizontal wings
extending from the back, NOT a peaked gat. Dignified kind face with a
small smile). He stands beside the sedan looking at Kongjwi with
approval.

LEFT-BACKGROUND: the stepmother and Patjwi (both in fine but now slightly
disheveled hanbok). The stepmother's face is shocked, mouth half-open;
Patjwi clutches her mother's sleeve and looks down at the ground, shame
clear on her face. They stand farther back, smaller in the frame.

RIGHT-BACKGROUND: a quiet support cast — the cracked jar (still in its
yard corner, now whole-looking as if it has been mended), the toad
sitting on the jar's lid watching peacefully, a few sparrows on the
hanok roof, and the black ox standing at the back gate. All the helpers
have come to witness.

ABOVE THE SCENE: the hanok house with curved tile roof, a small wooden
sign beside the door. Behind it, a wider view of the village with
thatched roofs.

UPPER SKY: golden afternoon turning to soft early evening. 2-3 simple
cloud shapes lit warmly. A gentle sun in the upper-right with simple
rays. A few sparrows in flight (small simple shapes, 3-4).

GROUND DETAILS: scattered grass tufts (3-4), a few persimmon leaves on
the ground, the small ditch with a tiny reflection of the sky visible in
its puddle (the ditch where the shoe had fallen).

Apply DETAIL LEVEL: Kongjwi's hanbok shows floral embroidery, sedan chair
shows decorative carving lines, all faces detailed.
GROUPED NATURAL TEXTURES: clouds simple, grass in tufts, sparrows simple.

Mood: warm cosmic justice — kindness and patience finally rewarded, all
the small helpers of the story gathered to witness, even the shamed
stepmother allowed her quiet space at the edge.
Composition: CENTERED FOCAL. Kongjwi + official + shoe center foreground,
magistrate + sedan center mid-ground, stepmother + Patjwi small at left-
background, jar + toad + ox + sparrows witnessing right-background and
above.
```

---

# 📋 받은 PNG 체크리스트 (콩쥐와 두꺼비)

배치 위치: `public/coloring/05-kongjwi/`

- [ ] `scene-1-jar.png` — 1장. 깨진 항아리와 작은 두꺼비 (기)
- [ ] `scene-2-tasks.png` — 2장. 잔치는 다가오고, 두 가지 일거리 (승 + 분기)
- [ ] `scene-3a-sparrows.png` — 3장 분기 A. 참새 떼와 베틀 앞에서 (전)
- [ ] `scene-3b-ox.png` — 3장 분기 B. 검은 소의 선물 (전)
- [ ] `scene-4-banquet.png` — 마지막 장. 잔치, 꽃신, 그리고 사또의 가마 (결 / 정통 결말)

기존 `start.png`, `toad.png`, `cow.png`, `ending-banquet.png`, `ending-village.png`은 `Backup_v1/`에 그대로 유지 (롤백용).

---

# 🐢 Story 6 — 별주부전 (The Hare and the Dragon King)

**원작 배경**: 판소리 다섯 마당 중 하나. 용왕의 병을 고치기 위한 자라(별주부)의 충성과 토끼의 기지가 부딪치는 이야기. 한국 옛이야기 중 가장 재치 있고 유머가 있는 작품이다.

**기승전결**:
- **기 (起)** Scene 1 — 용궁의 위기 (용왕의 병)
- **승 (承)** Scene 2 — 자라가 산에 올라 토끼를 만나 꾐 + 분기
- **전 (轉)** Scene 3a/3b — 용궁에 들어가 위기를 알아챔 / 산속에서 미리 위험을 알아챔
- **결 (結)** Scene 4 — 토끼의 기지로 산으로 돌아옴, 자라는 충성을 다함 (양쪽 다 살림)

```
                ┌── 3a (토끼 용궁행, 위기) ──┐
1 → 2 (선택) ──┤                          ├── 4 (정통: 토끼의 기지 + 산 + 우정)
                └── 3b (산속 도깨비의 귀띔) ──┘
```

**정통 결말**: 어느 길로 가든 토끼는 결국 자기 기지로 산으로 돌아오고, 자라는 자기 충성을 다해 용왕을 위한 다른 약을 찾아 떠난다. 토끼·자라 둘 다 살리는 한국적 화해 결말 ─ 적이 아니라 서로의 자리를 인정함.

---

## Scene 1 — `06-byeoljubu/scene-1-palace.png` (기)

**제목 ko**: 1장. 용궁의 큰 시름
**제목 en**: Chapter 1 — A Great Worry at the Dragon Palace

**Narration KO**:
> 옛날 바다 깊은 곳에 화려한 용궁이 있었더라. 용궁의 주인 용왕은 오대양의 바다 짐승을 다스리고, 비를 내리며, 풍어와 풍랑을 다 정하시는 분이었다. 그런데 어느 해부터 용왕께서 깊은 병에 드시고 말았다. 산호로 만든 침상에 누워 며칠을 식음을 전폐하셨다.
>
> 용궁 안의 모든 의원이 다 모여 용왕의 맥을 짚어 보았지만, 어떤 약도 듣지 않았다. 마지막으로 가장 늙은 잉어 의원이 용왕의 눈을 살피더니 깊게 한숨을 쉬었다.
>
> "한 가지 약밖에 없습니다. 산속 토끼의 간… 그 따뜻한 토끼의 간을 잡수셔야 용왕님의 병이 나으실 것입니다."
>
> 용궁이 술렁였다. 토끼는 바다가 아니라 산에 사는 짐승이었다. 누가 감히 산에 올라가 토끼를 잡아 올 수 있단 말인가.
>
> 그때 한 작은 자라 한 마리가 천천히 앞으로 나왔다. 이름은 별주부였다. 등껍질이 단단하고, 다리가 짧지만, 마음만은 깊은 바다보다 더 굳었다.
>
> "용왕마마, 제가 가겠습니다. 제가 산에 올라가 토끼를 모셔 오겠습니다."
>
> 용궁의 모든 짐승이 별주부를 한 번씩 돌아보았다. 자라는 헤엄도 잘 치지만, 산길을 오르기에는 너무 느리고 약하지 않은가? 그러나 별주부의 검은 눈은 흔들리지 않았다.

**Narration EN**:
> Long ago, deep beneath the sea, there stood a splendid Dragon Palace. Its master, the Dragon King, ruled the beasts of the five oceans, sent the rains, and ordered the bounty and storm of the sea. But one year the king fell into a deep illness. He lay on his coral bed and would take neither food nor water for many days.
>
> Every healer of the palace gathered to feel his pulse, but no medicine worked. At last the oldest carp physician looked into the king's eyes and let out a long sigh.
>
> "There is one medicine only. The liver of a hare from the mountains — the warm liver of a hare — will heal the king."
>
> The palace stirred uneasily. The hare lives on the mountain, not in the sea. Who could climb up and bring one back?
>
> Then a small turtle stepped slowly forward. His name was Byeoljubu. His shell was hard, his legs were short, but his heart was firmer than the deep sea.
>
> "My king, I will go. I will climb the mountain and bring a hare back to you."
>
> Every creature in the palace turned to look at him. He swam well enough, yes — but he was small and slow for mountain climbing. Still, the turtle's dark eyes did not waver.

**다음 장면**: → Scene 2 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Underwater interior scene of the Dragon Palace throne room.
Grand mythic Korean undersea hall. The ailing Dragon King reclined on a
coral bed, sea creatures gathered, the small turtle stepping forward.
Wide formal composition.

Subject: Inside a magnificent Korean undersea Dragon Palace (용궁).

CENTER-BACK: a grand throne carved like coral and waves, with a large
flowing curtain made of strands of seaweed (apply GROUPED NATURAL TEXTURES
─ show as 4-5 vertical ribbon shapes, NOT individual strands). In front
of the throne, a low coral-stone bed.

ON THE BED: the Dragon King (용왕) ─ stylized friendly Korean dragon (NOT
Western dragon, NOT fierce). Long sinuous body coiled comfortably on the
bed, two delicate horns and whiskers, kind tired face with closed eyes,
a small frown. His scales as ~12-15 large outlined plates in 3-4 rows
(each plate one fill region). A single round wisdom pearl held lightly
in one foreclaw.

LEFT-FOREGROUND: a small Korean soft-shelled turtle (자라 별주부) ─ rounded
dome shell with 6-8 hexagonal plates clearly outlined, four short stubby
legs, gentle determined face, dark dot eyes, small smile of resolve. He
stands in profile facing the throne with one foreleg slightly raised.

OTHER COURT CREATURES gathered around:
- An old carp doctor (잉어 ─ long body with 6-8 large scales, gentle
  whiskers like a Chinese sage, holding a small medicinal pouch)
- 2-3 large fish courtiers (each a different friendly Korean fish style,
  one with a tiny scholar's hat)
- 1-2 small jellyfish drifting (simple bell shapes with 4-5 dangling lines)
- A crab courtier (round body, two raised claws, 4-5 simple legs)

UPPER BACKGROUND: arched palace ceilings carved like sea waves, lit by
glowing pearls hanging from arches (3-4 round shapes as light sources).
Water current lines suggesting movement (no fills).

LOWER FOREGROUND: a smooth coral-stone floor with a few simple pearl
ornaments.

NOTE: this is INSIDE the palace, so DO NOT draw sun/moon. The light
sources are the hanging pearls.

Apply DETAIL LEVEL: dragon scales clearly outlined, turtle shell plates,
fish details. GROUPED NATURAL TEXTURES: seaweed in 4-5 ribbon shapes,
NO individual fronds.

Mood: a grand court fallen into worry ─ even the dragon is sick ─ and
one small turtle's quiet courage stepping forward.
Composition: FORMAL CENTRAL. Coral throne + sick dragon center-back,
small turtle stepping forward left-foreground, gathered creatures in a
respectful semicircle, pearl lanterns above, current lines softly
filling background.
```

---

## Scene 2 — `06-byeoljubu/scene-2-meeting.png` (승)

**제목 ko**: 2장. 산속 토끼와 자라의 만남
**제목 en**: Chapter 2 — Turtle Meets Hare on the Mountain

**Narration KO**:
> 별주부는 며칠 동안 바다를 헤엄쳐 오르고, 또 며칠을 산기슭을 기어 올랐다. 등껍질이 흙으로 묻고, 다리가 마디마디 아파 왔지만, 그는 한 번도 멈추지 않았다.
>
> 마침내 별주부가 산속의 어느 양지바른 곳에 다다랐다. 거기에 한 토끼가 풀잎을 뜯고 있었다. 긴 두 귀가 양쪽으로 쫑긋 서 있고, 까만 코끝이 부지런히 씰룩이고 있었다. 별주부는 큰 숨을 한 번 들이쉬고 토끼 앞으로 나아갔다.
>
> "토끼 형님, 안녕하십니까. 멀고 먼 바닷속에서 형님을 뵈러 왔습니다."
>
> 토끼가 풀잎을 입에 문 채 별주부를 한참 바라보았다.
>
> "바닷속에서? 자네가 나를 왜 찾는단 말인가?"
>
> "용궁에서 잔치가 열리는데, 산속의 가장 슬기로운 분으로 형님을 모시고 싶다 하셨습니다. 바닷속의 모든 진귀한 보물과 맛있는 음식이 다 차려져 있고, 무엇보다 — 거기 가시면 영원히 늙지 않으신다고 합니다."
>
> 토끼는 솔깃했다. 산속의 거친 살림에 늘 굶주리던 그는 용궁의 잔치라는 말에 마음이 흔들렸다. 그러나 한편으로는 의심도 들었다. 자기는 바다 짐승이 아닌데 어찌 바다에 들어가 살 수 있단 말인가?
>
> 토끼는 잠시 망설였다. 자라의 말을 그대로 믿고 함께 용궁으로 갈까, 아니면 한번 더 살펴보고 결정할까?

**Narration EN**:
> For days the turtle swam upstream and for days he crawled the foothills. His shell was caked with earth, every joint in his short legs ached, but he never stopped.
>
> At last he reached a sunlit clearing on the mountainside. There, a hare was nibbling on a leaf. His two long ears stood up sharply, his small black nose twitched busily. The turtle took one deep breath and walked forward.
>
> "Brother Hare, good day to you. I have come from the depths of the sea to call upon you."
>
> The hare held the leaf in his teeth and stared at him a moment.
>
> "From the sea? Why would you seek me out?"
>
> "The Dragon Palace is holding a great feast. They wish to invite the wisest one of the mountain. Every rare treasure of the sea and every delicacy is laid out, and most of all — those who visit, it is said, never grow old."
>
> The hare's ears perked. Hungry as he often was in the rough mountain life, the words "feast" and "never grow old" tugged at him. But somewhere underneath, a doubt rose. He was not a sea creature — how could he live underwater?
>
> The hare hesitated. Should he believe the turtle and go straight to the palace, or look around once more before deciding?

**선택지**:
- 🌊 `자라의 말을 믿고 용궁으로 따라간다` / `Trust the turtle and follow him to the palace` → **Scene 3a**
- 🐸 `산속을 한번 둘러본 후에 결정한다` / `Look around the mountain first before deciding` → **Scene 3b**

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor sunlit mountain glade at midday. Two characters meeting
center, framed by nature. Wide horizontal composition.

Subject: A small open clearing on a Korean mountain side at high noon.
The ground is grassy with small wildflowers.

CENTER-LEFT: a Korean mountain hare (산토끼 ─ stylized friendly: rounded
body, two long upright ears with pink inner ear lines, large round black
eyes, small twitching pink nose, small white tail puff). He's seated on
his haunches with a single leaf in his front paws (he was eating it),
ears perked alert, head tilted curiously toward the turtle.

CENTER-RIGHT: the same soft-shelled turtle from Scene 1 (자라 별주부 ─
dome shell with 6-8 hexagonal plates, four short legs, gentle determined
face). He stands facing the hare with his head extended forward in formal
greeting, one front leg slightly raised. His shell is dusted with a few
flecks of earth and tiny moss bits (showing the long journey, but each
fleck is small simple shape ─ not a busy texture).

BACKGROUND-LEFT: a few tall Korean pine trees (apply GROUPED NATURAL
TEXTURES strictly ─ 5-7 cloud-shaped foliage clusters per tree, 2-4
trunk grain lines). A few rocks (3-4 simple rounded shapes) and small
fan-shaped grass tufts (4-5 spaced).

BACKGROUND-RIGHT: a clear mountain stream (계곡물) flowing down across
the right side. Show as 3-4 simple flowing curve lines suggesting water.
Behind it, the mountain ridge rising upward with simple silhouette
shapes.

GROUND DETAILS: a small handful of mountain wildflowers (3-4 simple
flower shapes ─ 5 petals each, each one fill region), a few smooth
stones, one pine cone.

UPPER SKY: bright cheerful midday. 2-3 simple cloud shapes. A bright
sun in the upper-right with 6-8 simple rays. A single small bird
flying high (one simple V shape).

Apply DETAIL LEVEL: both animals show clear eyes/nose/mouth, hare ear
inner lines, turtle shell plates clear. GROUPED NATURAL TEXTURES: pine
foliage in clusters, flowers in small groups, NO individual leaves
or fur strands.

Mood: a meeting of two worlds, hare's natural curiosity meeting turtle's
quiet purpose. Bright sunny ambivalence.
Composition: BALANCED HORIZONTAL ─ hare and turtle facing each other
in the central glade, pine forest framing left, mountain stream + ridge
right, grass and flowers in the lower band.
```

---

## Scene 3a — `06-byeoljubu/scene-3a-undersea.png` (전 · 용궁의 위기)

**제목 ko**: 3장. 용궁에서 알게 된 비밀
**제목 en**: Chapter 3 — The Secret He Learned in the Palace

**Narration KO**:
> "잘 생각하셨습니다, 토끼 형님. 등에 올라타십시오."
>
> 토끼는 별주부의 등껍질에 올라탔다. 자라는 두 발을 강하게 내딛으며 산을 내려와 바닷가에 닿았고, 곧장 바닷속으로 미끄러져 들어갔다. 토끼는 처음에는 숨이 막힐 줄 알았지만, 신기하게도 바닷속에서도 숨을 쉴 수 있었다. 자라가 가는 길에 누군가 보이지 않는 보호의 손길을 펴 둔 것 같았다.
>
> 한참 만에 용궁이 보였다. 산호와 진주로 지은 화려한 궁. 토끼는 입이 떡 벌어졌다. 그러나 — 용궁 안으로 들어가자마자 분위기가 이상했다. 잔치 음식은 보이지 않고, 의원들이 분주히 오가고 있었다. 침상에 누운 용왕의 모습은 병들어 있었다.
>
> 토끼가 어리둥절해 있는데, 한구석에서 잉어 의원 두 사람이 속닥거리는 소리가 들렸다.
>
> "토끼의 간만 따 내면 용왕마마께서 곧 회복되실 것이오." "그 자라가 정말 큰 공을 세우는구먼."
>
> 토끼는 그제야 모든 것을 알아챘다. 잔치고 보물이고 다 거짓말이었다. 자기는 약으로 잡혀 왔던 것이다. 토끼의 까만 눈동자가 가늘게 떨렸다. 그러나 토끼는 산에서 평생을 살아오며 위기 앞에서도 머리를 굴리는 데 익숙한 짐승이었다. 잠시 후, 토끼의 얼굴에 작은 미소가 떠올랐다.
>
> 토끼는 천천히 용왕 앞으로 나아가 큰절을 올렸다.
>
> "용왕마마, 그동안 마음 고생이 크셨겠습니다. 제 간이 마마의 약이 된다 하니 큰 영광이지요. 그런데 한 가지 — 제 간은 워낙 귀한 것이라, 평소에는 깨끗한 옹달샘 옆 큰 바위 아래에 모셔 두었답니다. 오늘 따라 가지러 가지 않아서, 지금 저는 빈손이올시다."

**Narration EN**:
> "You have chosen wisely, Brother Hare. Climb onto my back."
>
> The hare climbed onto the turtle's shell. The turtle pushed off down the mountain with strong, steady steps, reached the shore, and slipped straight into the sea. The hare thought at first he would choke, but somehow he could breathe under the water — as though an unseen protective hand had been laid over him as long as he traveled with the turtle.
>
> At last the palace came into view — a splendid hall built of coral and pearl. The hare's mouth fell open in wonder. But — as soon as they were inside, something felt wrong. No feast was laid; physicians hurried about; the king lay ill on a coral bed.
>
> While the hare stood confused, he overheard two carp doctors whispering in a corner.
>
> "Only the hare's liver will save His Majesty." "What a great deed the turtle has done."
>
> All at once the hare understood. There was no feast, no treasure — he had been brought as medicine. His dark eyes trembled. But the hare had spent his whole life turning quick somersaults of thought before danger. After a moment, a small smile touched his face.
>
> Slowly, he bowed deeply before the throne.
>
> "Great King, what a hard sorrow you have borne. That my liver might be your medicine is the greatest honor. There is, however, one small matter. My liver is so precious that I usually leave it under a large rock by a clean spring on the mountain. I did not bring it with me today — I am empty-handed here, alas."

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Inside Dragon Palace throne room, similar setting to Scene 1
but more INTIMATE close-up on the hare bowing before the throne and the
nearby reactions. The hare's clever expression is the visual focal point.

Subject: Inside the Dragon Palace throne room, day later than Scene 1.

CENTER-FOREGROUND: the hare (same character from Scene 2) kneeling on
the coral-stone floor in a deep bow, forelegs flat on the ground in front
of him, ears laid back politely. His face is turned slightly upward
toward the throne with a small CLEVER smile (a single curved line for the
sly grin) — his right eye visible has a small clever sparkle (a tiny
short line near the eye corner).

BEHIND HIM: the turtle (Byeoljubu) standing proudly with chest puffed,
not yet realizing he is being outwitted, looking at the king hopefully.

CENTER-BACK: the same coral throne and bed as Scene 1. The Dragon King
sits up slightly more alert now, leaning forward, listening with surprised
interest to the hare's words. His expression is curious and worried (his
treatment may yet slip away).

LEFT-MIDGROUND: two carp doctors (잉어 의원 ─ each a long fish body with
6-8 large scales, sage-like long whiskers, small scholar's cap). They
are shown half-turned toward each other, mid-whisper, with small
gestures — clearly the conversation the hare overheard. One has a
hand raised near his mouth.

RIGHT-MIDGROUND: a crab courtier and a small jellyfish, looking puzzled,
heads tilted.

LIGHTING: same hanging pearl lanterns from arches (3-4 pearl light
sources). Soft water-current lines drifting across the upper background.

DETAIL ELEMENTS: a small bubble cluster (2-3 simple round bubbles) near
the hare's nose suggesting his speech, a few decorative pearl ornaments
on the floor.

Apply DETAIL LEVEL: hare's face shows the sly clever smile clearly,
king's posture shows interest, doctors mid-whisper. GROUPED NATURAL
TEXTURES: bubbles in groups.

Mood: a small witty creature outsmarting a great kingdom ─ tension
softened by gentle comedy.
Composition: hare's bowing form FRONT-CENTER, turtle hopeful behind him,
king leaning forward on throne center-back, whispering carp doctors
mid-left, courtiers right, pearl lanterns from above, water currents
soft fill.
```

---

## Scene 3b — `06-byeoljubu/scene-3b-whisper.png` (전 · 까치의 귀띔)

**제목 ko**: 3장. 까치의 귀띔
**제목 en**: Chapter 3 — A Whisper from a Magpie

**Narration KO**:
> "잠시만 기다리시오, 자라 어른. 잔치라니 좋은 일이긴 한데, 한번 풀밭이나 둘러보고 가겠소이다."
>
> 토끼는 자라의 곁을 떠나 잠시 풀밭 한구석으로 가서 풀잎을 뜯는 척 했다. 그때 머리 위 소나무 가지에서 까치 한 마리가 깍깍 소리를 내며 내려왔다. 산속의 길조 까치는 가만히 토끼의 어깨 가까이 내려앉았다.
>
> "토끼 형님, 가만히 들으시오." 까치가 작은 부리로 속삭이듯 알려 주었다. "저 자라가 산에 올라온 데는 다른 까닭이 있소이다. 용왕이 병이 들어 형님의 간이 약이라 한답니다. 자라는 충직한 신하라, 형님을 잔치라 속여 모시고 가려는 것이지요."
>
> 토끼의 까만 눈동자가 가늘어졌다. 까치는 가지 위로 다시 폴짝 날아올라 깍깍 한 번 짧게 울고 사라졌다.
>
> 토끼는 한참을 생각했다. 그대로 도망쳐 버릴까? 그러나 자라는 형님 형님 하며 자기를 진심으로 모시러 온 사람이었다. 자기가 그냥 도망가면 자라는 빈 등껍질로 용궁에 돌아가 큰 벌을 받을 것이다.
>
> 토끼는 자라에게 다시 돌아갔다. 그러나 이번엔 마음속에 한 가지 꾀가 분명히 자리 잡혀 있었다.
>
> "자라 어른, 잘 생각해 보니 잔치에 빈손으로 갈 수는 없겠소이다. 제 가장 귀한 보물 — 제 간 — 을 평소에는 깨끗한 옹달샘 옆 큰 바위 아래에 모셔 두었지요. 그것을 먼저 가지러 가야 잔치에 갈 수 있겠습니다. 자라 어른께서도 그게 좋겠다 싶지 않으십니까?"

**Narration EN**:
> "One moment please, good Turtle. A feast is fine news indeed — but let me look once around the meadow before we go."
>
> The hare drifted off and pretended to nibble grass at the edge of the clearing. Just then a magpie cawed sharply overhead and fluttered down from a pine branch — in Korean tales, the magpie is a bringer of news. It settled near the hare's shoulder.
>
> "Brother Hare, listen carefully," the magpie whispered with its small beak. "That turtle has come up the mountain for a different reason. The Dragon King is ill, and your liver is the medicine. The turtle is a loyal servant. He plans to take you in disguise of a feast."
>
> The hare's dark eyes narrowed. The magpie hopped back up to the branch, cawed once more, and was gone.
>
> The hare thought for a long while. Should he simply run? But the turtle had called him "Brother" and had truly come to fetch him with care in his heart. If the hare just ran, the turtle would return with an empty shell and be punished severely.
>
> So the hare went back to the turtle. But now a clear plan was in his mind.
>
> "Good Turtle, on reflection, I cannot go to a feast empty-handed. My most precious treasure — my liver — I usually keep under a large rock by a clean spring. I must fetch it first before we go. Don't you think that's wise, dear Turtle?"

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor mountain glade scene, late afternoon. Two zones in
the same canvas: the LEFT shows the hare pretending to graze with the
magpie whispering from a low pine branch; the RIGHT shows the turtle
waiting patiently a short distance away. Soft horizontal composition.

Subject: A sunlit Korean mountain glade in golden late afternoon.

LEFT THIRD — THE WHISPER:
The hare (same character as Scene 2) is in a low crouch among grass, ears
slightly down, head turned subtly to the side so he can hear what's
behind him. One front paw holds a leaf as if grazing (it's a ruse). The
hare's eye is slightly squinted — listening intently.

From a low pine branch directly above the hare, a Korean magpie (까치 ─
simple black-and-white bird shape, distinctive Korean magpie body: white
belly, dark wings, long forked tail, small black eye, sharp small beak)
leans down close to the hare's ear. The magpie is in a head-tilted
whisper pose, beak slightly open. A few short curving "whisper" lines
float between the magpie's beak and the hare's ear — 3-4 small wisp
shapes suggesting a hushed voice.

CENTER-RIGHT: the same Korean turtle (Byeoljubu) sitting patiently on a
flat rock at a polite distance, head extended with a kind smile, looking
the other way (NOT seeing the dokkaebi). His shell is clean now (he has
been waiting). One small wildflower visible by his front leg.

BACKGROUND-LEFT: a Korean mountain stream (계곡물) with simple 3-4
flowing lines. A few rocks. Beyond, a pine tree (apply GROUPED NATURAL
TEXTURES ─ 5-7 cloud-shaped foliage clusters).

BACKGROUND-RIGHT: the slope of the mountain going down, with low hills
and the suggestion of the sea far below (a thin horizontal line).

UPPER SKY: late afternoon, soft 2-3 horizontal cloud bands, warm low
sun on the right edge (round with 6-8 rays). 2-3 small mountain birds
in flight (simple V shapes).

GROUND DETAILS: scattered fan-shaped grass tufts (4-5 spaced), 2-3
mountain wildflowers, one chestnut on the ground.

Apply DETAIL LEVEL: hare's face shows tense listening expression with
ear position, magpie's distinctive Korean magpie markings (white belly +
dark wings + long forked tail) clear, turtle's patient kind posture.
GROUPED NATURAL TEXTURES: pine in clusters, grass in tufts, clouds simple.

Mood: secret comedy ─ wise messenger magpie whispering a warning, hare
pretending unconcern, oblivious turtle waiting kindly nearby. Late golden
calm.

Cultural note: In Korean folktales the magpie (까치) is the traditional
bringer of news and good omens — its appearance here as the whisperer
of truth fits the Korean folk vocabulary far better than a goblin would.

Composition: HORIZONTAL THREE-ZONE ─ whispering magpie on pine branch
above + listening hare LEFT, midground gap, patient turtle RIGHT,
mountain background.
```

---

## Scene 4 — `06-byeoljubu/scene-4-return.png` (결 · 정통 결말)

**제목 ko**: 마지막 장. 토끼의 기지와 자라의 충성
**제목 en**: Final — The Hare's Wit and the Turtle's Loyalty

**Narration KO**:
> 자라가 곰곰이 생각해 보더니 고개를 끄덕였다. 토끼의 간이 그렇게 귀한 것이라면 마땅히 가지러 가야지. 자라는 다시 토끼를 등에 태우고 바닷속을 헤엄쳐 산으로 돌아왔다. 둘이 산기슭에 닿자, 토끼가 자라의 등에서 폴짝 뛰어내렸다.
>
> 그러더니 토끼는 산으로 한참을 깡총깡총 뛰어 올라가, 큰 바위 위에 올라서서 자라를 내려다보았다. 자라가 어리둥절해 토끼를 올려다보았다.
>
> "토끼 형님, 그 간은 어디 있습니까?"
>
> 토끼가 두 귀를 흔들며 큰소리로 웃었다.
>
> "허허, 자라 어른! 이 세상에 자기 간을 꺼내 두고 다니는 짐승이 어디 있겠소이까. 간은 내 몸 안에 늘 있는 것이지요. 다만 — 마마의 병이 깊으시다 하니 마음은 안쓰럽소이다."
>
> 자라는 그제야 모든 것을 깨달았다. 가슴이 무너졌다. 빈 등껍질로 용궁에 돌아가면 자기는 큰 벌을 받을 것이고, 용왕은 회복되지 못할 것이다. 자라의 작은 검은 눈에서 눈물이 한 방울 떨어졌다.
>
> 토끼는 자라의 눈물을 한참 바라보았다. 자라가 자기를 진심으로 모시려 한 마음, 그리고 용왕에 대한 그 깊은 충성이 토끼의 마음을 움직였다. 토끼가 바위에서 내려와 자라 곁에 앉았다.
>
> "자라 어른, 용왕마마의 병은 토끼 간으로만 낫는 것이 아닐 것이오. 산속 가장 깊은 곳에 백 년 된 산삼이 있다 들었소. 그것을 캐어 가져가시면, 토끼 간보다 더 좋은 약이 될 것이외다. 제가 그 자리를 알려 드리지요."
>
> 토끼는 자라에게 산삼이 자라는 깊은 골짜기의 위치를 자세히 일러 주었다. 자라가 짧은 다리를 끄덕끄덕 인사하더니, 천천히 그 골짜기를 향해 떠났다. 등껍질 위에 가을 햇살이 환하게 비쳤다.
>
> 자라는 그날부터 산속을 부지런히 다니며 산삼을 찾았다. 마침내 백 년 산삼을 캐어 용궁으로 돌아왔고, 용왕은 그 약으로 병이 나았더라. 자라의 충성은 두고두고 용궁의 자랑이 되었고, 토끼의 기지는 산속에서 두고두고 전해 내려왔다.
>
> "지혜는 살리는 길을 찾는 것이고, 충성은 끝까지 길을 가는 것이란다." 옛 어른들이 이렇게 손주에게 일러 주었더라.

**Narration EN**:
> The turtle thought it over, then nodded. If the hare's liver was so precious, of course it should be fetched. He took the hare onto his back, swam down through the sea, and climbed back up the mountain. As soon as they reached the foothills, the hare leaped lightly off the turtle's shell.
>
> Then he hopped — hop, hop, hop — all the way up onto a tall rock, and looked down at the turtle. The turtle blinked up at him in confusion.
>
> "Brother Hare, where is the liver?"
>
> The hare waved both ears and laughed.
>
> "Ha! Good Turtle! Where in this world is the creature who takes out his own liver and leaves it lying about? My liver is inside me, always. But — that the king is so deeply ill, my heart truly aches for him."
>
> Only now did the turtle understand. His chest sank. If he returned with an empty shell, he himself would be severely punished, and the king would not recover. A single tear fell from his small dark eyes.
>
> The hare looked down at the turtle's tears a long while. The turtle's true intention, his depth of loyalty to his king — these moved the hare's heart. He came down from the rock and sat beside the turtle.
>
> "Good Turtle, I do not believe the hare's liver is the only cure. Deep in the mountain there grows a hundred-year-old wild ginseng (산삼). Bring that to the king — it is a finer medicine than a hare's liver could ever be. I will tell you exactly where it grows."
>
> The hare gave the turtle careful directions to a hidden deep valley where the ginseng grew. The turtle bowed his short legs in thanks and set off slowly toward the valley, autumn sunlight warming his shell.
>
> From that day, the turtle searched the mountains tirelessly until at last he dug up a hundred-year ginseng and returned it to the palace. The Dragon King recovered. The turtle's loyalty became a proud tale of the sea, and the hare's quick wit a proud tale of the mountain.
>
> "Wisdom finds the road that lets both live; loyalty is to walk that road to its end." So the old ones tell their grandchildren still.

**Ending Label**: 🌿 `산삼과 우정 — 정통 결말` / `Wild Ginseng and Friendship — the canonical ending`

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor mountain valley scene in warm autumn light. The hare
sits beside the turtle showing him a map-like gesture toward the valley
where the ginseng grows. Wide warm reconciliation composition.

Subject: A Korean mountain slope in early autumn afternoon.

CENTER-FOREGROUND: the hare (same character) sitting on a low flat rock,
ears relaxed (no longer alarmed), one front paw extended pointing
gently toward the deeper valley to the right. His face is kind, no
trace of mockery — a settled smile.

BESIDE THE HARE on the same rock: the turtle (Byeoljubu, same character)
is sitting low, his shell turned partly toward the hare. He is looking
in the direction the hare points. A single small tear-drop shape near
his eye, mixing relief and gratitude. One forefoot lifted slightly.

THE TWO ANIMALS ARE CLEARLY FRIENDS NOW — small body language: turtle's
shell leaning slightly toward hare, hare looking at turtle warmly.

RIGHT-MIDGROUND: the deep valley the hare is pointing toward. Show as
a soft V-shape valley with mountain ridges on either side, and at its
bottom, a clear suggestion of a hidden wild ginseng (산삼 ─ a small plant
with 5-7 leaves arrayed around a central stalk; show 2-3 of these
ginseng plants growing in the valley floor as distinct enclosed
shapes). A gentle stream winds through the valley.

BACKGROUND: Korean autumn mountain ridges layered, with autumn foliage
in clusters — apply GROUPED NATURAL TEXTURES strictly: foliage as 6-8
rounded blob clusters per visible tree, NOT individual leaves. Two trees
clearly autumn-colored (visible by oval-leaf cluster shape, treat the
cluster as one fill region).

UPPER-LEFT BACKGROUND: a small flock of geese flying southward in a V
formation (5-6 simple V-shape birds in a line).

LEFT-FOREGROUND: a small mountain wildflower cluster (3-4 simple
5-petal flowers), a few pebbles, one fallen pine cone.

UPPER SKY: warm autumn afternoon, 2-3 simple cloud shapes, warm sun
upper-left with simple rays.

DETAIL — at the very far horizon, hint at the SEA (a thin horizontal line
suggesting where the turtle came from), to remind viewer of his journey.

Apply DETAIL LEVEL: hare's face soft kind, turtle's small tear visible,
ginseng plants distinct shapes. GROUPED NATURAL TEXTURES: foliage in
clusters, geese as simple shapes, flowers in groups.

Mood: warm reconciliation, friendship between mountain and sea ─ each
keeps its own life and gives the other the road home.
Composition: BALANCED. Hare + turtle on rock CENTER-LEFT, valley with
ginseng RIGHT, autumn mountain layers BACKGROUND, geese upper-left,
ground details lower.
```

---

# 📋 받은 PNG 체크리스트 (별주부전)

배치 위치: `public/coloring/06-byeoljubu/`

- [ ] `scene-1-palace.png` — 1장. 용궁의 큰 시름 (기)
- [ ] `scene-2-meeting.png` — 2장. 산속 토끼와 자라의 만남 (승 + 분기)
- [ ] `scene-3a-undersea.png` — 3장 분기 A. 용궁에서 알게 된 비밀 (전)
- [ ] `scene-3b-whisper.png` — 3장 분기 B. 까치의 귀띔 (전)
- [ ] `scene-4-return.png` — 마지막 장. 토끼의 기지와 자라의 충성 (결 / 정통 결말)

기존 `start.png`, `palace.png`, `forest.png`, `ending-clever.png`, `ending-honor.png`은 `Backup_v1/`에 그대로 유지 (롤백용).

---

# 🪺 Story 7 — 흥부와 놀부 (Heungbu and Nolbu)

**원작 배경**: 판소리 다섯 마당 중 하나. 형제의 대비를 통해 자비와 욕심의 결과를 보여주는 한국 권선징악의 대표작. 박씨를 물어 온 제비가 만드는 두 개의 박이 두 형제의 마음을 비춘다.

**기승전결**:
- **기 (起)** Scene 1 — 두 형제의 대비 (놀부의 욕심, 흥부의 가난)
- **승 (承)** Scene 2 — 흥부가 다친 제비를 정성껏 치료 + 분기 (어떻게 보살필까)
- **전 (轉)** Scene 3a/3b — 가족과 함께 따뜻하게 보살핌 / 어머니의 가르침으로 정성껏 약을 만듦
- **결 (結)** Scene 4 — 봄에 제비가 박씨를 물어다 줌 → 박에서 보물 → 놀부의 욕심과 응징

```
                ┌── 3a (가족과 함께 보살핌) ──┐
1 → 2 (선택) ──┤                            ├── 4 (정통: 박씨 + 보물 + 놀부 응징)
                └── 3b (어머니의 약방문) ────┘
```

**정통 결말**: 어느 길로 보살피든 제비는 봄에 돌아와 박씨를 물어다 준다. 박에서 금은보화가 쏟아져 흥부가 부자가 되고, 욕심에 일부러 제비 다리를 부러뜨린 놀부의 박에서는 도깨비와 재앙이 쏟아진다. ─ 한국적 권선징악의 결정판.

---

## Scene 1 — `07-heungbu/scene-1-brothers.png` (기)

**제목 ko**: 1장. 두 형제, 두 마당
**제목 en**: Chapter 1 — Two Brothers, Two Yards

**Narration KO**:
> 옛날, 한 마을에 두 형제가 살고 있었더라. 형의 이름은 놀부, 아우의 이름은 흥부였다. 같은 어머니에게서 태어나 같은 마당에서 자랐건만, 두 사람의 마음은 마치 다른 하늘 아래 자란 사람들 같았다.
>
> 형 놀부는 욕심이 많고 마음씨가 모질었다. 어머니가 돌아가시자 놀부는 부모가 물려준 살림과 논밭과 식량을 모조리 자기 집으로 가져갔다. 아우 흥부에게는 빈 손으로 마을을 떠나라 하였다.
>
> 흥부는 한 마디 원망도 하지 않았다. 어린 자식들의 손을 잡고, 다 무너져 가는 작은 초가집을 빌려 마을 한 귀퉁이에 자리를 잡았다. 그 집은 지붕이 새고, 벽이 갈라지고, 마당에는 잡초만 가득했지만, 흥부는 매일 새벽에 일어나 일감을 찾아 다녔다.
>
> 가난해도 흥부의 마당에는 늘 새들이 모여들었다. 작은 떡 부스러기 한 알이라도 떨어지면, 흥부는 그것을 아이들에게 먼저 주고, 남는 것을 새들에게 던져 주었다. 새들은 흥부의 마당을 자기 집처럼 드나들었다.
>
> 그러는 동안 형 놀부의 큰 기와집은 곡식 창고가 가득 차 있었지만, 놀부의 마당에는 새 한 마리 내려앉지 않았다.

**Narration EN**:
> Long ago in a certain village there lived two brothers. The elder was named Nolbu, the younger Heungbu. Born of the same mother, raised in the same yard, the two had hearts that seemed to have grown beneath different skies.
>
> Nolbu was greedy and his heart was hard. When their mother died, he took every bit of the inheritance — house, fields, grain — to his own home. He told his younger brother to leave the village empty-handed.
>
> Heungbu did not utter one word of complaint. With his little children's hands in his own, he found a half-collapsing thatched hut to borrow at the corner of the village and settled there. The roof leaked, the walls were cracked, weeds filled the yard. But Heungbu rose at dawn every day to look for work.
>
> Poor as he was, birds kept gathering in his yard. If even a single rice-cake crumb fell, Heungbu gave it first to the children and threw the rest to the birds. The birds came to his yard as if it were their own home.
>
> All the while, Nolbu's great tile-roof house had storehouses bursting with grain — but not a single bird ever lit upon his yard.

**다음 장면**: → Scene 2 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor wide split-yard scene at golden afternoon. The canvas
shows TWO YARDS side by side, separated by a low fence or pathway. LEFT
half is poor-but-warm Heungbu's yard; RIGHT half is rich-but-cold
Nolbu's yard. Establish character contrast immediately.

Subject: A Korean village seen as two adjacent yards.

LEFT HALF — HEUNGBU'S YARD:
- A small dilapidated thatched-roof hut (초가집 — visibly worn, thatched
  roof with a few sagging sections, one section showing daylight through
  a hole, paper-paneled door slightly askew, a wooden post leaning).
- HEUNGBU himself (kind-faced man ~35, simple worn hanbok with visible
  patches at the elbows and knees, gentle wrinkled face from worry, kind
  eyes). He stands at the front of his yard, scattering crumbs from a
  small wooden bowl.
- 5-7 small Korean sparrows and 2-3 magpies (까치) gathered around his
  feet, eating eagerly — friendly simple bird shapes, GROUPED simply.
- 2-3 small children (his children, ~3, ~5, ~7, in small simple hanbok,
  some patched) standing in the doorway watching with affectionate
  smiles. The youngest holds a tiny rice ball in both hands.
- An empty grain sack hanging by the door, a single hoe propped against
  the wall, a small dry persimmon tree (apply GROUPED NATURAL TEXTURES
  ─ 3-4 rounded blob foliage clusters with 2-3 ripe persimmons hanging).
- A few weed tufts in the yard (4-5 fan-shaped grass groups, not a
  carpet).

DIVIDING LINE — a low wooden fence runs vertically down the center of
the canvas separating the two yards. A single magpie sits on the fence,
turned toward the Heungbu side.

RIGHT HALF — NOLBU'S YARD:
- A grand Korean tile-roof house (한옥 with curved gimong tiles, ornate
  carved beam ends, sturdy posts, paper door with intricate grid pattern).
- Multiple grain storage jars (장독 — 4-5 tall jars in a row along the
  wall, all clearly full).
- NOLBU (older brother, similar facial features to Heungbu but with
  fuller cheeks, scowling expression with downturned mouth, fine
  embroidered hanbok with wide sleeves, hands behind his back). He stands
  in the middle of his yard glaring out — but not at his brother;
  glaring at the air, generally displeased.
- NOT A SINGLE BIRD anywhere on his side of the fence. The yard is
  immaculate but empty of life.
- A finely groomed ornamental tree (apply GROUPED NATURAL TEXTURES ─ 4-5
  rounded foliage clusters), pristine but lifeless feel.

UPPER SKY (across both halves): golden afternoon, 2-3 simple cloud
shapes, large warm sun in the upper-center. Birds flying in formation
over Heungbu's side only (4-5 simple V shapes), none over Nolbu's side.

Apply DETAIL LEVEL: both houses show their respective construction
details, both brothers full hanbok detail, children's faces detailed,
birds detailed enough to feel cheerful. GROUPED NATURAL TEXTURES: trees
in clusters, weeds in tufts, clouds simple.

Mood: gentle but unmistakable moral contrast ─ warm-poor vs cold-rich.
Composition: SPLIT-CANVAS VERTICAL. Heungbu's yard with birds and children
LEFT (~50%), low fence with magpie as the divider CENTER, Nolbu's yard
empty and grand RIGHT (~50%), unified sky above.
```

---

## Scene 2 — `07-heungbu/scene-2-swallow.png` (승)

**제목 ko**: 2장. 다친 제비를 만난 날
**제목 en**: Chapter 2 — The Day He Found the Injured Swallow

**Narration KO**:
> 어느 봄날, 흥부네 처마 밑 둥지에 살던 제비 한 마리가 마당으로 툭 떨어졌다. 흥부가 깜짝 놀라 다가가 보니, 제비의 한쪽 다리가 부러져 피가 흐르고 있었다. 둥지에서 떨어지면서 지붕에 부딪힌 듯했다.
>
> 흥부는 두 손으로 제비를 살포시 안아 들었다. 작은 가슴이 콩닥콩닥 빠르게 뛰고 있었다.
>
> "걱정 말아라, 작은 제비야. 내가 보살펴 주마."
>
> 흥부는 제비를 안고 집 안으로 들어갔다. 어떻게 치료할지 잠시 고민이 되었다. 아내와 아이들과 함께 따뜻하게 보살피며 마음을 모을까. 아니면 어머니께서 옛날에 가르쳐 주신 약방문대로 정성껏 약을 지어 발라 줄까.
>
> 어느 쪽을 택해도 진심은 같았다. 그러나 흥부는 잠시 멈추어 깊이 생각해 보았다.

**Narration EN**:
> One spring day, a swallow from the nest under Heungbu's eaves fell suddenly into the yard. Heungbu rushed over to find the small bird with one of its legs broken and bleeding — it must have struck the roof on the way down.
>
> Heungbu cupped the swallow gently in his two hands. Its tiny chest was beating fast.
>
> "Don't be afraid, little swallow. I will care for you."
>
> He carried the swallow inside. For a moment, he hesitated as to how. Should he and his wife and children gather their warm hearts around it together — or should he carefully prepare the medicinal remedy his mother had taught him long ago?
>
> Either way was sincere. Heungbu paused and thought deeply for a moment.

**선택지**:
- 👪 `아내와 아이들과 함께 따뜻하게 보살핀다` / `Care for it together with wife and children` → **Scene 3a**
- 🌿 `어머니의 약방문대로 정성껏 약을 짓는다` / `Prepare the medicinal remedy his mother taught him` → **Scene 3b**

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Spring outdoor courtyard scene at midday. Heungbu kneeling in
the center of his yard holding the small fallen swallow. The dilapidated
hut + sky + spring flowers create the gentle backdrop. Intimate composition.

Subject: A spring day in Heungbu's small yard. CENTER-FOREGROUND: Heungbu
(same character as Scene 1, simple worn hanbok with patches) kneels on
one knee in the middle of the yard. He holds his two hands gently
cupped in front of his chest. Inside the cupped hands rests a small
Korean swallow (제비 ─ rounded body, sleek black back, white belly, long
forked tail, small black eyes, tiny beak). One of the swallow's legs is
clearly bent at an awkward angle, with a few small marks suggesting
injury (NOT detailed blood, just suggestion).

Heungbu's face is gentle and concerned, head bent toward the bird with
careful tenderness.

ABOVE THE YARD: under the thatched eaves, a small empty swallow's nest
(둥지 ─ simple round basket shape) tucked into the corner. A few stray
twigs scattered around it suggest the fall.

LEFT-MIDGROUND: Heungbu's children peeking out from the doorway, all
three faces watching with worry and curiosity. The youngest holds the
hand of the middle one.

RIGHT-MIDGROUND: Heungbu's wife (kind face, simple hanbok, hair tied
back, a clean apron) hurries from inside the hut carrying a small
clean cloth (suggesting she will help bandage). Her face is gently
focused, not panicked.

BACKGROUND: the dilapidated hut as in Scene 1, but now with hints of
spring around it ─ small wildflowers blooming at the base of the wall
(apply GROUPED NATURAL TEXTURES ─ 3-4 small flower clusters of simple
5-petal shapes). A small magnolia tree (목련) in early bloom by the
fence with 4-5 large rounded blossom shapes (each one fill region). The
persimmon tree from Scene 1 still bare-branched.

UPPER SKY: bright spring sky. 2-3 soft cloud shapes. Other swallows
flying overhead (3-4 simple V shapes with forked tails). The sun upper-
right with simple rays.

GROUND DETAILS: scattered wildflowers, a fan-shaped grass tuft, one
small shovel propped against the wall.

Apply DETAIL LEVEL: Heungbu's worn hanbok shows patches + collar +
sleeve, his face detailed with kind worry, swallow clearly shows
broken leg shape, family members faces visible.
GROUPED NATURAL TEXTURES: magnolia in clusters, flowers in groups, swallows
overhead simple V shapes.

Mood: spring tenderness, a moment of decision rooted in kindness ─
the family gathering inward around a small wounded life.
Composition: CENTERED on Heungbu and the swallow in his hands, family
flanking left and right, dilapidated hut + magnolia + spring background,
swallows in the sky above.
```

---

## Scene 3a — `07-heungbu/scene-3a-family.png` (전 · 가족과 함께)

**제목 ko**: 3장. 식구들의 따뜻한 손길
**제목 en**: Chapter 3 — The Family's Warm Hands

**Narration KO**:
> 흥부는 제비를 가만히 부엌 문턱에 누이고 가족을 다 불러 모았다. 아내가 깨끗한 무명 천을 잘게 찢어 와서 작은 끈을 만들었고, 큰아이는 마당에서 곧은 나뭇가지 하나를 골라 와 다듬었다. 막내는 손가락으로 제비의 등을 살짝살짝 쓸어 주었다.
>
> "작은 제비야, 우리가 같이 있단다. 무섭지 마라."
>
> 막내의 작은 손이 제비의 깃털을 어루만지자, 빠르게 뛰던 제비의 가슴이 차츰 가라앉기 시작했다. 흥부가 부러진 다리에 곧은 나뭇가지를 대고, 아내가 무명 천 끈으로 가만가만 묶었다.
>
> 그동안 다른 아이들은 처마 밑에 떨어진 둥지의 잔가지들을 모아 새 둥지를 만들었다. 짚단을 동그랗게 엮고, 그 안에 부드러운 솜털 같은 솔잎을 깔았다.
>
> 제비를 새 둥지에 살포시 누이고, 가족이 모두 둘러앉아 가만히 지켜보았다. 작은 화로 위에 따뜻한 보리차를 끓이는 소리만 마당에 가만히 울렸다. 제비는 작은 까만 눈을 한참 흥부와 아이들을 번갈아 바라보다가, 천천히 잠이 들었다.

**Narration EN**:
> Heungbu laid the swallow gently on the kitchen threshold and called the whole family in. His wife tore a clean cotton cloth into thin strips for binding; the eldest child went out and chose a straight twig from the yard, smoothing it. The youngest stroked the swallow's back ever so lightly with one fingertip.
>
> "Little swallow, we are all here. Don't be afraid."
>
> Under the small fingers, the swallow's racing chest began to slow. Heungbu set the straight twig against the broken leg, and his wife wound the cotton strips around it with delicate care.
>
> Meanwhile the other children gathered up the broken nest pieces from under the eaves and built a new nest of their own. Round and round they wove straw, then lined the inside with soft pine needles like cotton fluff.
>
> They laid the swallow inside the new nest and all sat around, watching quietly. Only the soft sound of barley tea coming to boil on the small brazier filled the air. The swallow looked from Heungbu to the children, back and forth, with its small black eyes — then slowly fell asleep.

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Cozy interior nighttime scene inside Heungbu's modest hut.
The family gathered around the swallow on the kitchen threshold. Warm
intimate composition.

Subject: Inside Heungbu's modest one-room thatched hut at early evening.
The room is small but warm. A wood-plank floor, simple paper-paneled
walls, low ceiling beams visible at the top.

CENTER-FOREGROUND: a low wooden threshold area where the swallow rests.
Heungbu (same character) crouches with great care, his hands gently
positioning a thin straight twig against the swallow's broken leg.

NEXT TO HIM: his wife (kind face, simple hanbok, hair tied back, clean
apron) winds a strip of cotton cloth around the leg, her face focused.

LEFT-FOREGROUND: the youngest child (~3, in small night-time hanbok)
sits with one tiny finger gently touching the swallow's back, head
tilted with utmost tender concentration.

UPPER-RIGHT-MIDGROUND: the two older children (~5 and ~7) sit on the
floor weaving straw into a new round nest, hands busy. Beside them, a
small handful of soft pine needle clumps (one fill region) ready to
line the nest's inside.

CENTER-BACK: a small clay brazier (화로) with a copper kettle on top.
2-3 simple steam wisp lines rising from the spout, suggesting warm
barley tea.

RIGHT-BACK: a single paper-paneled window (한지창 ─ 3-by-3 grid). Through
it, a soft spring evening sky visible with 2-3 stars and a slim crescent
moon, plus 2-3 swallows flying outside (small V shapes).

LEFT-BACK: a small wooden chest with simple folded clean cloth on top,
showing modest careful domestic care.

CEILING: simple roof beams (서까래 ─ 4-5 horizontal lines).

LIGHT SOURCE: one small oil lamp (호롱불) sitting on a wooden ledge,
casting a soft glow ─ show 3-4 short ray lines around its flame.

Apply DETAIL LEVEL: every family member's face detailed and tender,
hanbok shows collar/cuff/hem, the new nest is clearly woven with visible
straw strands, the brazier kettle shows clear shape.
GROUPED NATURAL TEXTURES: pine needles clump as one region, steam as
2-3 wisp lines.

Mood: warm domestic intimacy ─ the family quietly gathered as one heart
around a tiny wounded creature. The kind of moment fairy-tale magic
quietly rewards.
Composition: CIRCULAR intimate ─ swallow + Heungbu + wife center-low,
youngest child at swallow's level left, older children weaving nest
upper-right, brazier + steam center-back, paper window with night sky
upper-right.
```

---

## Scene 3b — `07-heungbu/scene-3b-medicine.png` (전 · 어머니의 약방문)

**제목 ko**: 3장. 어머니가 가르쳐 주신 약방문
**제목 en**: Chapter 3 — The Remedy His Mother Taught Him

**Narration KO**:
> 흥부는 제비를 가만히 부엌 한쪽에 눕히고, 어머니가 살아 계실 때 가르쳐 주신 약방문을 떠올렸다.
>
> "다리를 다친 새에게는 산쑥과 까치 발자국 모양의 잎이 좋단다. 둘을 함께 빻아 부드럽게 으깨면, 작은 뼈도 잘 붙는단다." 어머니의 목소리가 머릿속에 또렷이 들리는 듯했다.
>
> 흥부는 어둑한 새벽 마당으로 나가 산기슭으로 올라갔다. 이슬에 젖은 풀숲을 헤치며 산쑥을 한 줌 캐고, 까치발 모양의 잎을 한 줌 모았다. 동이 트기 전에 돌아와 절구에 풀잎을 넣고 정성껏 빻기 시작했다.
>
> 절구질을 하는 동안 흥부는 어머니께 가만히 말을 걸었다.
>
> "어머니, 제 마음이 한결같기를 빌어 주세요. 이 작은 새 한 마리도 우리 집을 찾아온 손님이지요. 손님을 정성껏 모시는 것은 어머니가 늘 가르쳐 주신 일이지요."
>
> 잘 빻은 풀잎을 깨끗한 천에 펴고, 그 위에 제비의 부러진 다리를 살포시 올린 다음, 또 다른 천으로 가만가만 감쌌다. 풀잎의 시원한 약 기운이 작은 다리를 부드럽게 감싸 안았다.
>
> 제비가 작은 까만 눈으로 흥부를 한참 바라보았다. 그러더니 무엇을 약속하는 듯이, 가만히 머리를 한 번 끄덕였다.

**Narration EN**:
> Heungbu laid the swallow gently in one corner of the kitchen and called to mind the remedy his mother had taught him when she was still alive.
>
> "For a bird with a hurt leg, mountain mugwort and the leaf shaped like a magpie's foot are good. Crush them together until soft, and even tiny bones knit well." Her voice was clear in his mind.
>
> He went out into the still-dark yard before dawn and climbed the foothills. Pushing through dew-wet grass he gathered a handful of mugwort and a handful of the magpie-foot leaves. Before the sky lightened he was back at home, dropping the leaves into a stone mortar and beginning to grind them carefully.
>
> As he ground, he spoke softly to his mother.
>
> "Mother, please pray that my heart stays steady. This small bird is also a guest who came to our home. To care for a guest with all one's heart — that was what you always taught me."
>
> He spread the well-crushed leaves on a clean cloth, gently laid the swallow's broken leg over it, and wrapped it with another cloth. The cool medicinal power of the herbs seemed to wrap softly around the tiny leg.
>
> The swallow looked at Heungbu a long while with its small black eyes. Then, as if making a promise, it gave one quiet nod of its head.

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Interior kitchen scene at first light of dawn. Single
focused setting on Heungbu grinding herbs at a stone mortar, with the
swallow watching from the corner. The mountain-gathering moment is
hinted at the window outside, not shown as a separate scene. Intimate
centered composition.

Subject: Inside Heungbu's modest kitchen at the very first light of
dawn. The room is small, warm, and quiet.

CENTER-FOREGROUND: Heungbu (same character ─ worn hanbok with patches,
sleeves rolled up, focused gentle face) kneeling on the wood-plank
floor at a low wooden surface. A stone mortar (절구) sits in front of
him. He holds a stone pestle (절굿공이) in both hands, mid-grind. The
gathered herbs are partially mashed inside the mortar ─ show as a
small mound of crushed leaves with a hint of soft texture.

ON THE WORK SURFACE beside the mortar: a small woven basket containing
the gathered FRESH HERBS (showing two distinct herb types: mountain
mugwort 산쑥 with small jagged star-shaped leaves, 2-3 plants; and
magpie-foot leaves 까치발 모양 with three-pointed trident-like leaves,
2-3 plants ─ each plant as a small distinct group of 3-5 leaves clearly
outlined). Beside the basket: a clean folded white cotton cloth ready
for binding, and a small ceramic bowl of water.

LEFT-CORNER OF THE KITCHEN: the small swallow (제비 ─ same character
as Scene 2) rests on a folded small cushion, head slightly raised,
watching Heungbu with its little black eyes. One small head-nod motion
line suggests it just nodded faintly in trust.

RIGHT-BACK WALL: a single paper-paneled window (한지창 ─ 3-by-3 grid).
Through the window, the first faint dawn light is just beginning ─ show
a soft horizontal band of pale light through the panels, plus the
silhouette of one tall pine outside and the head of a single Korean
magpie (까치) perched on a branch outside the window (just visible
through the paper panel grid, suggesting the morning where the herbs
came from). This single window detail replaces a separate mountain
scene ─ the gathering is implied, not separately drawn.

CENTER-BACK: a small clay brazier (화로) on a low ledge, embers
glowing softly (3-4 small ember dots), giving a faint warm glow.

CEILING: simple roof beams (서까래 ─ 3-4 horizontal lines).

ADDITIONAL DETAIL: a small wooden chest in the upper-left corner with
a folded blanket on top. A pair of straw sandals near the door (visible
edge of the room). Apply DETAIL LEVEL strictly.

GROUPED NATURAL TEXTURES: herbs grouped by plant (each plant ONE
fill region), embers as 3-4 dots, NO carpets of detail.

Mood: quiet dawn devotion ─ the kind of careful skill that is also
prayer. A son remembering his mother's teaching while caring for the
smallest guest. The window suggests the mountain where he gathered;
the kitchen holds the work itself.

Composition: CENTERED INTIMATE. Heungbu + mortar dead-center
foreground, herb basket + cloth + bowl on the surface right of him,
swallow on cushion corner-left, paper window with dawn-light hint +
magpie outside upper-right, brazier center-back, all in a single warm
room.
```

---

## Scene 4 — `07-heungbu/scene-4-justice.png` (결 · 정통 결말)

**제목 ko**: 마지막 장. 박씨가 가져온 두 마당의 결말
**제목 en**: Final — Two Yards, Two Gourds, Two Endings

**Narration KO**:
> 가을이 깊어지자 제비는 따뜻한 곳을 찾아 멀리 날아갔다. 흥부네 식구는 그저 작별의 손을 흔들 뿐이었다. 다음 해 봄, 따뜻한 바람이 다시 마당에 불어왔을 때, 그 제비가 정말로 돌아왔다. 그러나 이번에는 무엇인가 작은 씨앗 하나를 부리에 물고 있었다.
>
> 제비는 흥부의 어깨에 살포시 내려앉아 그 박씨를 흥부의 손바닥 위에 가만히 떨어뜨렸다. 그러고는 한 번 짹짹 울고는 다시 하늘로 날아갔다.
>
> 흥부는 그 씨앗을 마당 한쪽에 심었다. 며칠 만에 줄기가 길게 뻗어 나가더니, 한 달 만에 큰 박 세 통이 마당의 지붕 위에 둥글둥글 매달렸다. 박이 충분히 익자, 흥부네 식구는 가장 큰 박 한 통을 따 와 마당에 놓고 톱으로 켜기 시작했다.
>
> "슬근슬근 톱질이야, 우리 식구 박 켜는 소리…"
>
> 박이 쩌억 하고 두 쪽으로 갈라지자 ─ 그 안에서 금덩어리와 은붙이가 쏟아져 나왔다! 두 번째 박을 켜자 비단과 곡식이 가득 쏟아졌다. 세 번째 박을 켜자 작은 한옥 한 채를 통째로 세울 만한 목재와 기와가 산처럼 쏟아져 나왔다.
>
> 흥부네는 큰 잔치를 열어 마을 사람들을 모두 모셨다. 가난했던 시절에 도와주신 분들께 음식과 옷을 나누어 드리고, 새들에게는 가장 좋은 곡식을 따로 마당에 뿌려 주었다.
>
> 그런데 ─ 이 이야기를 들은 형 놀부의 얼굴이 흙빛이 되었더라.
>
> "내 동생이 박씨로 부자가 되었다? 그 별것 아닌 박씨가? 그렇다면 나도!"
>
> 놀부는 부랴부랴 자기 마당으로 달려갔다. 그러나 자기 마당에는 제비 한 마리도 둥지를 틀지 않았다는 것을 그제야 깨달았다. 놀부는 못된 꾀를 냈다 ─ 한 둥지의 어린 제비 한 마리를 일부러 떨어뜨려 다치게 하고는, 천으로 그럴듯이 싸 매고 "내가 너를 살려 주었다" 하고 둥지에 도로 넣었다. 진심이 없는 보살핌이었다.
>
> 가을이 가고 다음 봄이 왔다. 정말로 그 제비도 박씨 하나를 물어 와 놀부의 손바닥 위에 떨어뜨렸다. 놀부는 흥부보다 다섯 배는 큰 마당 가득 그 박씨를 심었다.
>
> 그러나 놀부의 박이 익어 톱으로 켰을 때 ─ 첫 번째 박에서는 무서운 도깨비 떼가 우르르 쏟아져 나왔다. 두 번째 박에서는 똥과 재가 한가득 쏟아져 마당이 다 더러워졌다. 세 번째 박에서는 신선이 나타나 놀부를 꾸짖고는, 놀부의 곡식 창고를 모두 비게 만들어 버렸다.
>
> 놀부는 가난해진 채 마당에 주저앉아 한참을 울었다. 그때 흥부가 형의 마당으로 들어왔다. 흥부는 한 마디 원망도 하지 않고 형의 손을 잡았다.
>
> "형님, 같이 가십시다. 제 집에 형님 자리가 있습니다."
>
> 놀부는 처음으로 동생 앞에서 부끄러움에 머리를 숙였다. 그날부터 두 형제는 한마당에서 함께 살게 되었더라.
>
> "박씨를 가져다 주는 것은 제비가 아니라, 그 사람의 마음이란다." 옛 어른들이 손주에게 그렇게 일러 주었더라.

**Narration EN**:
> When autumn deepened, the swallow flew away to warmer lands. Heungbu's family only waved farewell. The next spring, when warm winds blew once again through the yard, that same swallow truly returned — but this time it carried a small seed in its beak.
>
> The swallow landed lightly on Heungbu's shoulder and dropped the seed into his palm. Then with a single chirp it flew up into the sky.
>
> Heungbu planted the seed in one corner of the yard. Within days the vine stretched long; within a month, three great round gourds hung swelling on the rooftop. When the gourds were ripe, the family rolled out the biggest one into the yard and began to saw it open.
>
> "Saw, saw, slow and sure, the sound of our family's gourd…"
>
> When the gourd split in two with a clean crack — out poured ingots of gold and pieces of silver! When the second gourd was sawn, silks and grain came tumbling out. When the third was sawn, enough timber and roof tiles for a small hanok came pouring out like a mountain.
>
> Heungbu held a great feast and called all the village to it. He shared food and clothes with those who had helped him in his lean years, and laid the finest grain in the yard for the birds.
>
> But then — when Nolbu heard of all this, his face turned the color of clay.
>
> "My brother grew rich from a swallow's seed? From that trifle? Then I can do the same!"
>
> Nolbu rushed back to his own yard — and only then realized that not a single swallow had ever nested there. So he played a cruel trick: he caused a young swallow to fall from a nest and hurt itself, then wrapped its leg in cloth for show and put it back, declaring loudly, "I have saved you." There was no kindness in the caring — only the wish for treasure.
>
> Autumn passed and spring came. Sure enough, that swallow too brought back a single seed and dropped it into Nolbu's palm. Nolbu planted the seed across an entire yard five times the size of Heungbu's.
>
> But when his gourds ripened and he sawed them open — the first gourd released a horde of fearsome dokkaebi who poured out everywhere. The second gourd poured forth dung and ash that fouled the whole yard. The third gourd brought forth a stern mountain sage who scolded Nolbu and emptied all his storehouses in a single breath.
>
> Nolbu sat in his ruined yard, now poor, and wept for a long while. Then Heungbu came in through the gate. Without one word of complaint, he took his brother's hand.
>
> "Elder brother, come with us. There is a place for you in my home."
>
> For the first time Nolbu lowered his head before his younger brother in shame. From that day on, the two brothers lived together in the same yard.
>
> "It is not the swallow that brings the seed — it is the heart of the person," the old ones tell their grandchildren still.

**Ending Label**: 🪺 `박씨와 형제의 손 — 정통 결말` / `The Seed and the Brothers' Hands — the canonical ending`

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Warm closing scene centered on the two brothers reconciling.
The emotional anchor is BIG and CLEAR: Heungbu's gentle outstretched hand
meeting Nolbu's lowered head. Their two yards are simplified to small
hints on either side. Background tells the story of "what happened" in
small simple silhouettes, NOT competing detail panels. Wide horizontal
composition with the two figures dominating the center.

Subject: A late-afternoon Korean village scene of brotherly
reconciliation, the emotional resolution of the whole tale.

CENTER FOREGROUND (the visual + emotional anchor, ~50% of canvas):
The TWO BROTHERS meeting. HEUNGBU on the LEFT, standing upright in a
warm peaceful posture, his right hand extended forward palm-up — open,
gentle, no grudge. His face shows quiet kindness, a soft small smile.
His hanbok is the same simple worn hanbok from earlier scenes but
mended-looking and clean. NOLBU on the RIGHT, head LOWERED in shame
before his younger brother for the first time, shoulders slumped, his
formerly fine hanbok now visibly disheveled. He is BEGINNING to lift
his own hand toward Heungbu's open palm — their fingers ALMOST touching
at the very center of the canvas. A single small tear visible on
Nolbu's cheek (one teardrop shape).

BACKGROUND-LEFT (small, hinted ─ NOT a full panel):
Far behind Heungbu, a small simple silhouette suggestion of his yard:
the small thatched hut with a single split gourd showing a soft glow
inside (suggesting treasure but NOT detailing it ─ just one bright
glow shape). 3-4 small swallows flying overhead. A small persimmon tree
with a few round fruits (apply GROUPED NATURAL TEXTURES). Keep this
LEFT background simple ─ this is the AFTERMATH, not the main subject.

BACKGROUND-RIGHT (small, hinted ─ NOT a full panel):
Far behind Nolbu, a small simple silhouette suggestion of his yard: the
grand tile-roof house slightly tilted and dimmed. One split gourd
visible with a few faint dark wisps drifting up from it (suggesting
chaos but NOT detailed ─ 2-3 curling wisp lines only). NO dokkaebi or
sage drawn in detail ─ keep this side quiet and empty by contrast. The
storehouse door is ajar with a few grain spill lines on the ground.

UPPER SKY: warm late afternoon. 2-3 large soft cloud shapes that span
BOTH halves (the same sky over both fates). The sun is upper-center
with simple rays ─ lighting both brothers equally. A few swallows fly
in a V formation across the sky overhead (3-4 simple V shapes).

GROUND-CENTER (between the brothers): a single sprouting bok-vine grows
up from the path between them, suggesting new growth ─ 3-4 simple vine
leaves around their feet.

Apply DETAIL LEVEL strictly: both brothers' faces clearly distinct in
expression and posture, hanbok detailed (Heungbu simple but mended;
Nolbu finer but disheveled). The reconciliation gesture (their hands)
is the visual climax ─ position it dead center.

GROUPED NATURAL TEXTURES strictly: persimmons in clusters, swallows
simple V's, clouds simple. No busy background detail.

Mood: warm cosmic moral resolution ─ the canonical Korean reconciliation.
Where two yards once stood as opposites, now two brothers stand as one.
Even the punishment of Nolbu lives only in soft background hints; the
foreground is FORGIVENESS.

Composition: WIDE HORIZONTAL with CENTRAL VERTICAL EMOTIONAL AXIS.
Brothers' figures + reaching hands dominate the center foreground (~50%),
Heungbu's small bright yard far-left background (~25%), Nolbu's small
empty yard far-right background (~25%), unified warm sky above. The
two brothers' reaching fingers at the dead center are the climactic
focal point.
```

---

# 📋 받은 PNG 체크리스트 (흥부와 놀부)

배치 위치: `public/coloring/07-heungbu/`

- [ ] `scene-1-brothers.png` — 1장. 두 형제, 두 마당 (기)
- [ ] `scene-2-swallow.png` — 2장. 다친 제비를 만난 날 (승 + 분기)
- [ ] `scene-3a-family.png` — 3장 분기 A. 식구들의 따뜻한 손길 (전)
- [ ] `scene-3b-medicine.png` — 3장 분기 B. 어머니가 가르쳐 주신 약방문 (전)
- [ ] `scene-4-justice.png` — 마지막 장. 박씨가 가져온 두 마당의 결말 (결 / 정통 결말)

기존 `start.png`, `swallow.png`, `greed.png`, `ending-blessing.png`, `ending-lesson.png`은 `Backup_v1/`에 그대로 유지 (롤백용).

---

# 🪓 Story 8 — 금도끼 은도끼 (The Gold Axe and the Silver Axe)

**원작 배경**: 한국에서 가장 짧고 명료한 권선징악 옛이야기. 산신령의 시험을 통해 정직과 욕심의 결과가 곧바로 드러난다. 어린이가 가장 먼저 듣는 도덕 우화 중 하나.

**기승전결**:
- **기 (起)** Scene 1 — 가난한 나무꾼과 어머니의 평화로운 일상
- **승 (承)** Scene 2 — 도끼가 연못에 빠지고 산신령이 나타남 + 분기 (어떻게 답할까)
- **전 (轉)** Scene 3a/3b — 금도끼·은도끼 시험을 정직히 견딤 / 잠시 마음이 흔들리지만 끝내 정직으로 돌아옴
- **결 (結)** Scene 4 — 정직의 보상 + 욕심쟁이 나무꾼의 응징

```
                ┌── 3a (단호한 정직) ──────┐
1 → 2 (선택) ──┤                          ├── 4 (정통: 세 도끼 보상 + 욕심 응징)
                └── 3b (잠시 흔들리는 마음) ─┘
```

**정통 결말**: 두 분기 모두 결국 "쇠도끼가 내 것입니다"라는 정직한 답으로 수렴. 산신령이 세 도끼를 모두 주고, 욕심쟁이 나무꾼이 따라하다 세 도끼를 다 잃는다. ─ 한국 옛이야기 권선징악의 가장 단정한 마무리.

---

## Scene 1 — `08-woodman/scene-1-mother.png` (기)

**제목 ko**: 1장. 나무꾼과 늙으신 어머니
**제목 en**: Chapter 1 — The Woodcutter and His Aged Mother

**Narration KO**:
> 옛날, 어느 깊은 산골에 가난한 나무꾼 한 사람이 늙으신 어머니와 단둘이 살고 있었더라. 어머니는 허리가 굽으셨고 눈도 침침해지셨지만, 늘 아들을 위해 작은 밥상을 차려 주셨다. 아들은 매일 산에 올라 나무를 해 와 시장에 내다 팔았다. 그것이 두 사람의 모든 살림이었다.
>
> 나무꾼이 가진 것은 단 하나뿐이었다. 어머니가 결혼하실 때 외조부께서 만들어 주셨다는 오래된 쇠도끼 한 자루. 자루는 손때가 묻어 반들반들해졌고, 도끼날은 수십 년을 써도 닳지 않고 단단했다. 어머니는 그 도끼를 두고 늘 말씀하셨다.
>
> "이 도끼는 우리 집안의 손이 닿은 것이란다. 잘 보살펴라."
>
> 어느 가을날 아침, 나무꾼은 어머니께 인사를 드리고 산에 올랐다. 산 깊은 곳까지 들어가 키 큰 소나무 한 그루 앞에 섰다. 어머니께 따뜻한 약을 한 첩 사다 드릴 수 있을 만큼 나무를 해야 할 일이었다.
>
> 그는 두 손에 침을 한 번 뱉고, 익숙한 자세로 도끼를 어깨 위로 들어 올렸다. 그러나 ─ 마침 그 순간, 도끼가 자루에서 슥 빠져 산비탈을 굴러 내려가더니, 산 아래 맑은 연못 속으로 풍덩 빠져 버렸다.

**Narration EN**:
> Long ago, deep in a mountain valley, there lived a poor woodcutter alone with his aged mother. Her back was bent now and her eyes were dim, but every day she set a small meal on the table for her son. Each day he climbed the mountain, cut wood, and sold it at the market. That was their whole living.
>
> The woodcutter owned only one truly precious thing — an old iron axe his grandfather had made for his mother as a wedding gift. The handle had grown smooth from use over the years, the blade still sharp through decades of work. His mother always said,
>
> "This axe carries the hands of our family. Care for it well."
>
> One autumn morning, the woodcutter bowed his goodbye to his mother and climbed the mountain. He went deep into the woods and stopped before a tall pine tree. He had to cut enough today to buy his mother a small packet of warming medicine.
>
> He spit lightly on his palms in the familiar way and raised the axe over his shoulder. But — at that very moment, the axe head slipped from the handle, rolled down the slope, and plunged with a great splash into the clear pond below.

**다음 장면**: → Scene 2 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor mountain scene at gentle autumn morning. Two-moment
composition: LEFT side shows the small hut with mother at the threshold;
RIGHT side shows the woodcutter mid-strike at a pine tree with the axe
head flying off down toward the pond. Wide horizontal landscape.

Subject: A Korean mountain valley in early autumn morning.

LEFT THIRD — THE HUT:
- A small modest Korean thatched-roof hut tucked at the foot of the
  mountain. Paper-paneled door, one small window, simple wooden frame.
- AT THE THRESHOLD: the aged mother (older woman, bent back, gray hair
  in a small low bun, simple plain hanbok with apron, kind wrinkled
  face) stands waving her hand gently in farewell. A small wooden
  walking stick beside her.
- Small details around the hut: a chimney smoking with 2-3 wisp lines,
  a low stone wall (rough basalt stones, 6-8 distinct), a hen pecking
  in the yard.

CENTER — MOUNTAIN MIDGROUND:
- A winding mountain path rising from the hut toward the woodcutter.
  Show as a simple curving line through the landscape.
- 2-3 mountain ridges in the background (simple silhouettes).

RIGHT TWO-THIRDS — WOODCUTTER + ACCIDENT:
- The woodcutter (~30, plain worn hanbok with sleeves rolled up, head-
  cloth tied around forehead, lean kind face). He stands at the base of
  a TALL Korean pine tree (apply GROUPED NATURAL TEXTURES strictly ─
  6-9 cloud-shaped foliage clusters as separate fill regions, 2-4 trunk
  grain lines only, NO detailed bark).
- His arms are raised high holding the axe HANDLE — but the AXE HEAD
  has just SEPARATED from the handle. Show the axe head mid-air, flying
  in a small arc DOWN toward the pond visible at the bottom-right of
  the canvas.
- 2-3 small motion lines following the axe head's trajectory.
- The woodcutter's face is mid-shock — eyes wide, mouth slightly open in
  surprise.

LOWER-RIGHT — THE POND:
- A clear round mountain pond (연못) at the very bottom-right of the
  canvas. Surface clear and still. The axe head is about to land in it,
  with a small "splash mark" suggested by 2-3 short ripple lines just
  starting to form. The pond's edge has a few rounded stones (5-7
  distinct) and a small fan-shaped reed clump.

UPPER SKY: clear autumn morning. 2-3 simple cloud shapes. Sun upper-right
with 6-8 simple rays. 2-3 small birds flying.

GROUND DETAILS: scattered fallen pine cones (3-4), fan-shaped grass
tufts spaced apart (4-5), a few small autumn leaves grouped (3-4 leaf
clusters of 2-3 leaves each, NOT a carpet).

Apply DETAIL LEVEL: hanbok detail on both characters, mother's bent
posture and walking stick clear, woodcutter's face shock visible, pine
tree foliage clean clusters, axe head clearly defined.
GROUPED NATURAL TEXTURES strictly: foliage in clusters, grass in tufts,
leaves in small groups.

Mood: gentle autumn morning interrupted by a small disaster ─ a poor
honest day going suddenly wrong.
Composition: WIDE LANDSCAPE. Hut + mother LEFT (~25%), winding path +
mountain ridges MIDGROUND, woodcutter + pine tree CENTER-RIGHT, pond
with falling axe LOWER-RIGHT, autumn sky upper.
```

---

## Scene 2 — `08-woodman/scene-2-pond.png` (승)

**제목 ko**: 2장. 연못가에 나타난 산신령
**제목 en**: Chapter 2 — The Mountain Spirit at the Pond

**Narration KO**:
> 나무꾼은 연못가로 한달음에 내려갔다. 도끼가 빠진 자리에 작은 물결만 동그랗게 퍼지고 있었다. 그는 무릎을 꿇고 연못 안을 들여다보았지만, 물이 깊어 도끼는 보이지 않았다.
>
> "어머니께서 잘 보살피라 하셨건만…" 나무꾼은 두 손에 얼굴을 묻고 그 자리에 한참을 앉아 있었다. 살림 밑천이라곤 그 도끼 한 자루뿐이었다. 그것이 없으면 오늘 저녁에 어머니께 따뜻한 죽 한 그릇 끓여 드릴 길도 없었다.
>
> 그때 연못 한가운데서 물이 동그랗게 일렁이기 시작했다. 나무꾼이 놀라 고개를 들자, 연못의 가운데에서 흰 수염을 길게 늘어뜨린 노인 한 분이 천천히 떠오르셨다. 흰 한복을 입고, 머리에는 작은 관을 쓰고, 손에는 옥지팡이를 짚고 계셨다. 산신령이었다.
>
> 산신령께서 부드럽게 웃으시며 손에 무엇인가를 들어 보이셨다.
>
> "이 도끼가 네 것이냐?"
>
> 산신령의 손에 들린 것은 ─ 햇살에 눈이 부실 만큼 환하게 빛나는 큰 금도끼였다.
>
> 나무꾼은 가슴이 두근거렸다. 어떻게 답해야 할까? 단호하게 단숨에 정직하게 말해 버릴까, 아니면 마음속에 잠시 일어난 그 작은 흔들림까지 솔직히 다 말씀드릴까.

**Narration EN**:
> The woodcutter rushed down to the pond. Where the axe had fallen, only small ripples were spreading. He knelt at the edge and peered into the water, but the pond was deep and the axe was gone.
>
> "Mother told me to care for it well…" He buried his face in his hands and sat a long while. That axe had been his whole livelihood. Without it, there was no way to make even a bowl of warm porridge for his mother that night.
>
> Then the center of the pond began to swell in slow circles. As he looked up startled, from the middle of the water there rose an old man with a long white beard. He wore white hanbok, a small crown upon his head, a jade staff in his hand. It was the Mountain Spirit.
>
> The Mountain Spirit smiled gently and held something out.
>
> "Is this axe yours?"
>
> In his hand he held — a great golden axe, so bright in the sunlight that the woodcutter had to shield his eyes.
>
> The woodcutter's heart began to race. How should he answer? Should he speak the simple truth at once and finish — or should he confess even the small flicker of temptation that had risen in his heart for just a moment?

**선택지**:
- 🪓 `단숨에 '쇠도끼가 제 것입니다' 답한다` / `Answer at once: "The iron axe is mine"` → **Scene 3a**
- 🌬 `잠시 흔들렸던 마음까지 솔직히 말씀드린다` / `Honestly confess even the brief flicker of temptation` → **Scene 3b**

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor mountain pond scene at clear autumn midday. The
mountain spirit rising from the center of the pond, woodcutter kneeling
at the bank in awe. The golden axe held aloft is the bright visual
focal point. Vertical-leaning composition.

Subject: A clear round Korean mountain pond at midday, with mythic
revelation happening at its center.

CENTER OF THE POND: a stately mountain spirit (산신령 ─ traditional
Korean depiction: long flowing white beard reaching to his chest, white
hanbok with wide sleeves, a small jade crown or simple silk band on his
head, holding a long jade staff in one hand). He rises from the water
gracefully, only visible from the WAIST UP. The water around his waist
shows 3-4 concentric ripple lines spreading outward (apply GROUPED
NATURAL TEXTURES rule). His face is kind, with a small testing smile.

IN HIS OTHER HAND, RAISED HIGH: a magnificent GOLDEN AXE (금도끼) ─ the
blade clearly larger and more ornate than an ordinary axe, with simple
decorative pattern lines suggesting filigree. Around the axe, 4-6 short
sparkle/ray lines suggesting bright golden light.

POND EDGE — LEFT-FOREGROUND: the woodcutter (same character from Scene
1, plain worn hanbok) is kneeling at the bank, hands resting on his
thighs, looking up at the spirit with wide reverent eyes. His mouth is
slightly open in surprise. One hand half-raised toward his eyes
shielding from the gold's brightness.

POND EDGE — RIGHT-MIDGROUND: rounded smooth stones (6-8 distinct), a
few simple reed clumps growing from the water's edge (3-4 fan-shaped
groups, each one fill region), one or two lily pad shapes floating on
the water surface (each one simple flat oval).

BACKGROUND: the mountain rising on the far side of the pond, with tall
Korean pine trees (apply GROUPED NATURAL TEXTURES strictly ─ 5-7 cloud-
shaped foliage clusters per pine, 2-4 trunk lines only). Behind the
pines, simple mountain ridge silhouettes.

UPPER SKY: a few large soft cloud shapes (2-3) parting around the
spirit's appearance. Sun behind the spirit acting as a halo (a soft
round shape behind his crown with 6-8 simple rays radiating outward).

WATER SURFACE DETAILS: smooth except for the ripples around the spirit
and 2-3 leaf shapes floating elsewhere (small fall leaves drifted from
above).

Apply DETAIL LEVEL: spirit's beard + robe + crown clearly detailed,
woodcutter's reverent posture clear, golden axe ornate distinct, pond
stones each distinct.
GROUPED NATURAL TEXTURES strictly: ripples grouped, pine foliage in
clusters, reeds in tufts, clouds simple.

Mood: mythic encounter ─ a humble man before a kind testing spirit.
The moment before a moral choice settles a life.
Composition: BALANCED VERTICAL. Mountain spirit rising at center of
pond, golden axe raised HIGH as visual peak, woodcutter kneeling on
the LEFT bank, pond and stones in mid-band, mountains and pines
upper background.
```

---

## Scene 3a — `08-woodman/scene-3a-firm.png` (전 · 단호한 정직)

**제목 ko**: 3장. 단숨에 답한 정직
**제목 en**: Chapter 3 — The Quick Honest Answer

**Narration KO**:
> 나무꾼은 깊게 한 번 숨을 들이쉬고, 두 손을 무릎 위에 가지런히 모았다. 그러고는 산신령의 눈을 똑바로 마주 보며 입을 열었다.
>
> "산신령님, 그 도끼는 제 것이 아닙니다. 제 것은 낡은 쇠도끼 한 자루뿐이옵니다."
>
> 나무꾼의 목소리에는 망설임이 한 알도 섞여 있지 않았다. 산신령께서 흰 수염을 가만히 쓰다듬으시더니, 들고 계셨던 금도끼를 다시 연못 속으로 살며시 가라앉히셨다. 잠시 후, 다시 손을 들어 보이셨을 때 그 손에는 ─ 달빛처럼 환한 큰 은도끼가 들려 있었다.
>
> "그렇다면 이 도끼가 네 것이냐?"
>
> 나무꾼은 다시 한 번 깊게 숨을 들이쉬었다. 그러고는 변함없이 또렷한 목소리로 답했다.
>
> "산신령님, 그 도끼도 제 것이 아닙니다. 제 것은 낡은 쇠도끼 한 자루뿐이옵니다."
>
> 산신령께서 두 번째로 흰 수염을 가만히 쓰다듬으셨다. 그러고는 은도끼도 다시 연못 속에 살며시 가라앉히셨다. 한 번 더 손을 들어 올리셨을 때, 그 손에 들린 것은 ─ 자루에 손때가 묻어 반들반들한, 나무꾼의 그 낡은 쇠도끼였다.
>
> 나무꾼의 눈이 환해졌다. 그가 무릎으로 한 걸음 다가가며 두 손을 모았다.
>
> "예, 산신령님! 그것이 제 도끼입니다. 어머니께서 늘 잘 보살피라 하시던 그 도끼이옵니다."

**Narration EN**:
> The woodcutter drew one deep breath and rested his hands neatly on his knees. Then, meeting the Mountain Spirit's eyes straight, he spoke.
>
> "Mountain Spirit, that axe is not mine. My axe is only an old iron one."
>
> Not the smallest grain of hesitation was in his voice. The Mountain Spirit stroked his white beard slowly and let the golden axe sink back into the water. When he raised his hand again, in it was — a great silver axe, bright as moonlight.
>
> "Then is this axe yours?"
>
> The woodcutter drew another deep breath. Then, as clear as before, he answered:
>
> "Mountain Spirit, that axe is not mine either. My axe is only an old iron one."
>
> The Mountain Spirit stroked his beard a second time and let the silver axe sink back as well. When he raised his hand a third time — he held the worn old iron axe, its handle smooth-polished from many years.
>
> The woodcutter's eyes shone. He shuffled forward on his knees and clasped his hands together.
>
> "Yes, Mountain Spirit! That is my axe. The very one my mother told me always to care for."

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Same pond setting as Scene 2 but now the THREE-AXE TEST is
visualized. Show all three axes within the canvas in a vertical
sequence: golden axe in the spirit's raised hand (upper), silver axe
half-rising from the water (middle), iron axe being held forth (lower).
Wide vertical composition emphasizing the moral sequence.

Subject: The mountain pond, same as Scene 2, but in a moment that
captures the FULL three-axe test as a single tableau.

CENTER OF POND: the Mountain Spirit (same character as Scene 2 ─
flowing white beard, white hanbok, jade staff). He stands in the water
slightly higher now (visible from chest up), with three positions of
his right hand shown in a soft vertical column:

  UPPER POSITION (his hand at top): holding the GOLDEN AXE (same ornate
  bright axe as Scene 2) ─ but slightly shaded/lower priority now, the
  sparkle lines softer.
  MIDDLE POSITION (his hand at middle): holding the SILVER AXE — silver
  bright like moonlight, with 4-6 short sparkle lines. Slightly smaller
  in scale than the golden axe.
  LOWER POSITION (his hand at lower center): holding the IRON AXE ─ the
  woodcutter's familiar old plain axe with a worn smooth wooden handle.
  Simple, unornamented, but distinctly NOT shiny like the others. This
  is the TRUE axe.

THE THREE AXES are stacked in the spirit's hand area in a faint vertical
arc, suggesting "the test happened over time but here is the whole
test at once". The IRON AXE at the bottom is the only one held in a
FORWARD-extending gesture toward the woodcutter.

LEFT-FOREGROUND: the woodcutter (same character) now KNEELING with both
hands raised together in a respectful "received" gesture, head bowed
slightly, face glowing with relief and gratitude (small smile, eyes
brightening). His upper body is leaning forward toward the iron axe.

THE SPIRIT'S FACE: now warm and approving, a clear smile, eyes
crinkled with gentleness. He has stopped testing.

POND DETAILS: same edge as Scene 2 ─ stones, reeds, lily pads. Ripples
around the spirit still active.

BACKGROUND: same mountains and pines (apply GROUPED NATURAL TEXTURES ─
5-7 cluster foliage per pine, simple ridges).

UPPER SKY: same clouds and sun behind the spirit's head as halo, slightly
brighter now (a few more sun rays radiating).

Apply DETAIL LEVEL: clearly distinguish the three axes by ornament/finish,
spirit's robe + beard detailed, woodcutter's reverent posture and small
smile visible.

Mood: the moral peak of the story ─ honesty meeting recognition. The
quiet warmth of a test passed.
Composition: VERTICAL EMPHASIS. Spirit in pond center, three axes
stacked vertically from upper (gold) → middle (silver) → lower (iron),
woodcutter kneeling LEFT in a receiving posture, mountains and clouds
upper background.
```

---

## Scene 3b — `08-woodman/scene-3b-honest.png` (전 · 흔들리는 마음의 정직)

**제목 ko**: 3장. 흔들리는 마음까지 솔직히
**제목 en**: Chapter 3 — Honest Even About the Flicker

**Narration KO**:
> 나무꾼은 두 손을 무릎 위에 가지런히 모은 채 한참을 가만히 있었다. 정말이지 답하기 어려웠다.
>
> 산신령의 손에 들린 금도끼는 너무도 환했다. 저것을 받기만 하면 어머니께 따뜻한 약을 드릴 수 있고, 새로운 집도 지을 수 있고, 마을 사람들에게 빚진 곡식도 다 갚을 수 있을 것이었다. 그 생각이 마음 한구석을 짧게 스쳤다. 그러나 그 흔들림 자체가 자기 마음을 부끄럽게 만들었다.
>
> 한참 만에 나무꾼이 입을 열었다.
>
> "산신령님, 솔직히 말씀드리겠습니다. 그 도끼는 제 것이 아닙니다. 다만 한 가지 ─ 제 마음이 잠시 흔들렸다는 것을 함께 말씀드리겠습니다. 저렇게 환한 도끼를 보니, 잠깐 '내 것이라 답해도 되지 않을까' 하는 생각이 마음 한구석을 스쳤습니다. 부끄러운 마음이옵니다. 그러나 제 진짜 도끼는 낡은 쇠도끼 한 자루뿐이옵니다."
>
> 산신령께서 흰 수염을 가만히 쓰다듬으시며 부드럽게 웃으셨다.
>
> "흔들리는 것이 부끄러운 것이 아니란다. 흔들리고도 다시 바로 서는 것이 가장 귀한 정직이지." 산신령께서는 금도끼를 연못에 살며시 가라앉히시고, 다음에는 은도끼를 보여주셨다.
>
> 두 번째도 나무꾼은 같은 마음으로 답했다. 은도끼도 자기 것이 아니라 답하면서, 마음 한구석이 또 한 번 작게 흔들렸다는 것을 함께 말씀드렸다. 산신령께서는 두 번째로 부드럽게 웃으셨다.
>
> 세 번째로 산신령께서 들어 보이신 것은 ─ 손때 묻은 그 낡은 쇠도끼였다. 나무꾼이 무릎으로 한 걸음 다가가며 환하게 답했다.
>
> "예, 산신령님! 그것이 제 도끼입니다."

**Narration EN**:
> The woodcutter sat very still, hands neat on his knees. The answer was harder than he had imagined.
>
> The golden axe in the spirit's hand shone too bright. With it, he could buy his mother warm medicine, build a new house, repay everyone he owed grain to in the village. That thought brushed across one corner of his heart for a single moment. And it was that brush itself that shamed him.
>
> After a long while, he spoke.
>
> "Mountain Spirit, I will tell you honestly. That axe is not mine. But there is one thing more — I must also tell you that my heart was shaken just a little. Seeing such a bright axe, for one moment the thought crossed my mind: would it be so wrong to say it was mine? That thought shames me. But my true axe is only an old iron one."
>
> The Mountain Spirit stroked his beard and smiled gently.
>
> "It is no shame to be shaken. To be shaken and yet to stand straight again — that is the most precious honesty of all." He let the golden axe sink, and then raised the silver axe.
>
> The second time the woodcutter answered the same way ─ that the silver was not his, and that his heart had been shaken just a little once more. The Mountain Spirit smiled again, more warmly.
>
> The third time, what the spirit raised was — the worn old iron axe with its smooth handle. The woodcutter shuffled forward on his knees and answered, beaming.
>
> "Yes, Mountain Spirit! That is my axe."

**다음 장면**: → Scene 4 (linear)

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Outdoor pond scene at gentle midday, similar staging to Scene
2 but more INTIMATE on the woodcutter's face during his honest confession.
The spirit raises the golden axe but also extends an open empathic hand
toward the woodcutter. Centered close composition.

Subject: The mountain pond again. The Mountain Spirit (same character)
stands in the center of the pond visible chest-up, holding the GOLDEN
AXE high in one hand. But this time, his OTHER HAND is extended open
and palm-up toward the woodcutter on the bank ─ a gesture of listening
gentleness, not testing.

The spirit's expression is no longer just kind ─ it shows clear
recognition of the woodcutter's struggle: eyebrows slightly raised in
gentle approval, a soft warm smile, eyes warm with understanding.

LEFT-FOREGROUND: the woodcutter (same character) kneeling at the bank,
much closer to the spirit's open hand than in Scene 2. His face is
the central emotional focus — show clearly:
- Eyes slightly downcast (humble)
- Cheeks faintly flushed (shame at his small flicker of temptation)
- Mouth speaking honestly (slightly open in mid-confession)
- Hands clasped before his chest in a thoughtful searching gesture

A few short SPEECH WISP lines connect the woodcutter's mouth toward
the spirit's open hand (3-4 small wisp shapes suggesting the words being
"received" by the spirit's listening palm).

NO thought-bubble or floating cartoon device ─ the brief temptation is
told only through the woodcutter's face (slightly downcast eyes, faintly
flushed cheeks, parted mouth mid-confession) and through the spirit's
deeply understanding expression. Korean folktale tone, not comic-strip.

THE GOLDEN AXE in the spirit's other hand is held HIGH but its sparkle
lines are softer in this scene (it's no longer the test; the test is
already passing).

POND DETAILS: same as Scene 2 ─ ripples, stones, reeds, lily pads. The
pond's water around the spirit slightly more luminous, with 5-6 short
sparkle lines on the surface.

BACKGROUND: same mountains + pines (apply GROUPED NATURAL TEXTURES ─
5-7 foliage clusters per pine).

UPPER SKY: gentle midday, 2-3 soft cloud shapes, sun behind spirit's
head as a softer halo, with 4-6 simple rays. A small pair of birds flying
gently overhead.

Apply DETAIL LEVEL: woodcutter's face emotion clear (shame, honesty,
hope), spirit's gentle warm smile clear, hands of both characters in
meaningful gestures.

Mood: tender mythic intimacy ─ a man telling the truth about his
hesitations and being met not with rebuke but with deeper recognition.
The KOREAN definition of honesty as warm, not stern.
Composition: CENTERED intimate. Spirit center of pond, woodcutter
kneeling close on the LEFT bank, the two figures connected by the
spirit's outstretched palm and the speech wisps, golden axe held high
but secondary to the emotional exchange, mountains and sky backdrop.
```

---

## Scene 4 — `08-woodman/scene-4-justice.png` (결 · 정통 결말)

**제목 ko**: 마지막 장. 세 도끼와 욕심쟁이의 길
**제목 en**: Final — The Three Axes and the Greedy Man's Road

**Narration KO**:
> 산신령께서 환하게 웃으시며 말씀하셨다.
>
> "네 마음이 곱구나. 정직한 사람은 자기 것 외에는 탐하지 않는 법이지. 그러니 이 세 도끼를 모두 너에게 주노라. 금도끼와 은도끼는 시장에 내다 팔아 어머니께 따뜻한 약과 좋은 옷을 해 드리고, 쇠도끼는 변함없이 네 손에 쥐고 부지런히 일하라."
>
> 산신령께서 세 도끼를 모두 나무꾼의 손에 가만히 얹어 주셨다. 나무꾼은 큰절을 세 번 올리고, 어찌할 줄 모를 만큼 감격하여 산을 내려왔다. 어머니는 아들이 가지고 온 세 도끼를 보시고 두 손을 마주 잡으셨다.
>
> "아들아, 이것은 네 정직한 마음이 받은 것이지, 운이 받은 것이 아니란다."
>
> 어머니의 말씀이 옳았다. 그날부터 나무꾼네 집안에는 따뜻한 약 냄새와 함께 늘 웃음소리가 끊이지 않았다.
>
> 그런데 ─ 마을 한구석에 살던 욕심 많은 나무꾼이 이 이야기를 듣게 되었더라. 그는 노래도 못 하고 마음도 모질었지만, 머리 굴리는 데에는 빠른 자였다.
>
> "허, 그 늙은이가 그렇게 한 거라면 나도 못 할 게 있나? 이번엔 내가 부자가 되어 보겠다."
>
> 그는 멀쩡한 자기 쇠도끼를 들고 산에 올라가, 일부러 그 연못 앞에 다다라 도끼를 풍덩 던져 버렸다. 그러고는 무릎을 꿇고 큰소리로 울기 시작했다.
>
> "아이고, 산신령님! 제 도끼가 빠졌습니다! 살려 주십시오!"
>
> 연못 한가운데서 다시 물결이 일고, 산신령께서 천천히 떠오르셨다. 산신령께서 손에 들어 보이신 것은 ─ 어김없이 환하게 빛나는 큰 금도끼였다.
>
> "이 도끼가 네 것이냐?"
>
> 욕심쟁이 나무꾼은 환하게 웃으며 두 손을 내밀었다.
>
> "예! 예, 산신령님! 그것이 제 도끼이옵니다! 어서 제게 주십시오!"
>
> 산신령의 흰 수염이 천천히 흔들렸다. 산신령께서는 깊게 한숨을 쉬시고, 들고 계셨던 금도끼를 다시 연못 속에 살며시 가라앉히셨다.
>
> "거짓을 말하는 자에게는 한 자루의 도끼도 줄 수 없다. 너는 네 쇠도끼마저 잃었으니, 빈손으로 산을 내려가거라."
>
> 산신령께서는 그렇게 말씀하시고 연못 속으로 다시 사라지셨다. 욕심쟁이 나무꾼은 자기 쇠도끼마저 잃은 채, 빈 자루만 든 어깨로 산을 터덜터덜 내려와야 했다.
>
> "도끼는 욕심을 알아본단다. 정직한 사람의 손에만 머문단다." 옛 어른들은 손주에게 이렇게 일러 주었더라.

**Narration EN**:
> The Mountain Spirit smiled brightly and said,
>
> "Your heart is gentle. The honest man does not covet what is not his own. Therefore I give you all three axes. Sell the gold and silver at the market, buy your mother warm medicine and good clothes, and keep the iron axe steady in your hand for the work you love."
>
> The spirit set all three axes gently into the woodcutter's hands. He bowed three deep bows and went down the mountain with a heart too full for words. When his mother saw the three axes, she joined her two hands together at her chest.
>
> "My son, this is what your honest heart received — not what luck gave you."
>
> She was right. From that day on, the smell of warm medicine and the sound of laughter never left the small hut.
>
> Now — a greedy woodcutter who lived in one corner of the village heard the story. He could not sing and his heart was hard, but his head was clever in scheming.
>
> "Ha. If that old fool managed it, why not I? This time I shall be rich."
>
> He took his own perfectly good iron axe up the mountain, marched right up to the pond, and threw it deliberately into the water with a great splash. Then he knelt and began to cry loudly.
>
> "Oh, Mountain Spirit! My axe has fallen in! Help me!"
>
> The center of the pond stirred, and the Mountain Spirit rose slowly once more. In his hand he held — unmistakably — the great bright golden axe.
>
> "Is this axe yours?"
>
> The greedy man beamed and stretched out both hands.
>
> "Yes! Yes, Mountain Spirit! That is my axe! Please, give it to me!"
>
> The Mountain Spirit's white beard swayed slowly. He sighed deeply and let the golden axe sink back into the pond.
>
> "To one who lies, I cannot give a single axe. You have lost even your own iron axe — go down the mountain empty-handed."
>
> So saying, he sank back into the water. The greedy man had to trudge home with only the empty axe handle, having lost his own real axe besides.
>
> "An axe knows greed when it sees it. It will only rest in honest hands," the old ones tell their grandchildren still.

**Ending Label**: 🪓 `세 도끼의 보답과 빈 손의 길 — 정통 결말` / `Three Axes Given and a Road Walked Empty-Handed — the canonical ending`

**Gemini Prompt** (베이스 + 아래):
```
SHOT TYPE: Split-canvas. LEFT half: the honest woodcutter returning home
with the three axes, his mother at the door, the warm hut. RIGHT half:
the greedy woodcutter trudging down the mountain empty-handed with just
an axe handle. Wide horizontal composition with the mountain pond at the
visual center connecting both halves.

Subject: A two-fate canvas of the moral conclusion.

CENTER OF CANVAS: the mountain pond, now empty and silent. The Mountain
Spirit has sunk back beneath. A few simple ripple lines on the surface
suggest his recent presence. Tall pines around the pond (apply GROUPED
NATURAL TEXTURES ─ 5-7 cluster foliage per pine).

LEFT HALF — THE HONEST WOODCUTTER (returning home):
- The mountain path leading DOWN from the pond to the small thatched hut
  at the foot of the mountain (the hut from Scene 1).
- The HONEST WOODCUTTER walking down the path in joyful posture ─ both
  arms full of the THREE AXES: golden axe over one shoulder (bright with
  3-4 sparkle lines), silver axe in his other hand (bright with 3-4
  sparkle lines), iron axe tucked across his back. His face shows quiet
  awed gratitude, a calm smile.
- AT THE HUT'S THRESHOLD: the aged mother (same character as Scene 1)
  stands with both hands joined together at her chest, looking up at her
  son returning. A soft smile of recognition + pride on her face.
- The hut now seems brighter ─ a small puff of smoke rising from the
  chimney, paper-paneled window with a soft glow.
- Around the path: persimmon trees with ripe fruit (apply GROUPED NATURAL
  TEXTURES ─ 4-5 cluster foliage per tree, 4-5 round persimmons hanging),
  fan-shaped grass tufts spaced.

RIGHT HALF — THE GREEDY WOODCUTTER (descending empty-handed):
- A separate path on the OTHER side of the pond going down. The greedy
  woodcutter — clearly differentiated visually from the honest one:
  rounder face with thicker cheeks, bushy heavy eyebrows, a small
  scraggly beard, MERCHANT-STYLE hanbok (a fine outer vest with a
  visible diamond or floral patterned panel across the chest, an
  embroidered sash at the waist) now disheveled and dusty from the
  trip up the mountain. A small money pouch dangles half-empty from
  his belt. He's older and visibly fancier than the honest woodcutter
  ─ a 3-second read should tell the viewer "this is a different,
  greedier man".
- He trudges DOWN the path slumped over, head bowed.
- In his hand: a single bare WOODEN AXE HANDLE (자루) ─ no blade.
- His mouth is downturned, head bowed. One hand wipes his eyes (3-4
  short tear lines on his cheeks).
- Around him: scattered fallen autumn leaves, a few stones, scrubbier
  vegetation (less lush than the honest woodcutter's side).
- A pair of mocking magpies on a branch nearby (2 simple bird shapes).

DIVIDING ELEMENT: the central mountain pond at the very center of the
canvas, slightly elevated, with the surface gently rippling. Behind it
a tall central pine tree separating the two halves visually.

UPPER SKY (across both halves): warm late afternoon. 2-3 simple cloud
shapes. The sun upper-center with simple rays as a unifying warm
presence ─ both fates received the same daylight.

GROUND DETAILS: scattered autumn leaves in groups (3-4 small clusters
per side), fan-shaped grass tufts, a few pine cones.

Apply DETAIL LEVEL: both woodcutters' faces clear and contrasting,
mother's posture and expression clear, three axes visually distinct
(gold ornate, silver bright, iron plain).
GROUPED NATURAL TEXTURES strictly: pine foliage in clusters, leaves
in small groups, magpies simple shapes, clouds simple.

Mood: serene final justice ─ both endings under the same warm sun, but
one walking toward a lit window and the other walking down with nothing.
The cosmic gentleness of Korean folktale endings: even punishment is
quiet.
Composition: SPLIT CANVAS unified by CENTRAL POND. Honest woodcutter +
mother + lit hut LEFT (~45%), central pond + pine + rippling water
CENTER (~10%), greedy woodcutter + bare path + mocking magpies RIGHT
(~45%), unified warm sky above.
```

---

# 📋 받은 PNG 체크리스트 (금도끼 은도끼)

배치 위치: `public/coloring/08-woodman/`

- [ ] `scene-1-mother.png` — 1장. 나무꾼과 늙으신 어머니 (기)
- [ ] `scene-2-pond.png` — 2장. 연못가에 나타난 산신령 (승 + 분기)
- [ ] `scene-3a-firm.png` — 3장 분기 A. 단숨에 답한 정직 (전)
- [ ] `scene-3b-honest.png` — 3장 분기 B. 흔들리는 마음까지 솔직히 (전)
- [ ] `scene-4-justice.png` — 마지막 장. 세 도끼와 욕심쟁이의 길 (결 / 정통 결말)

기존 `start.png`, `trial.png`, `temptation.png`, `ending-share.png`, `ending-quiet.png`은 `Backup_v1/`에 그대로 유지 (롤백용).

---

# 🎉 PROMPTS_V2 ─ 8 스토리 모두 완료

| # | Story | 정통 결말 핵심 |
|---|---|---|
| 1 | 해님 달님 (folktale) | 두 동아줄·수수밭·해/달 부끄럼 자리 바꿈 |
| 2 | 해녀와 인어 (haenyeo) | 바다의 것은 바다에·수호자·잠수경 안 푸른 별 |
| 3 | 선녀와 나무꾼 (woodcutter) | 두레박·하늘 가족·새벽 빛이 된 그리움 |
| 4 | 혹부리 영감 (dokkaebi) | 진심 어린 노래·혹 떼임·욕심쟁이 혹 두 개 |
| 5 | 콩쥐와 두꺼비 (kongjwi) | 꽃신 짝·사또와 만남·계모 가족 용서 |
| 6 | 별주부전 (byeoljubu) | 토끼 기지·자라 충성·산삼·우정 |
| 7 | 흥부와 놀부 (heungbu) | 박씨·도깨비·산신·형제 화해 |
| 8 | 금도끼 은도끼 (woodman) | 세 도끼·정직의 따스함·욕심쟁이 빈 손 |

각 스토리는 동일 구조:
- Y구조 (1·2 공통 → 3 분기 → 4 정통 결말)
- 기승전결 4막 명확히 매핑
- 옛이야기 톤 KO narration (~더라·~었단다·할머니 입버릇) + 매칭 EN
- 멀티 paragraph (스크롤 박스 호환)
- SHOT TYPE 명시된 Gemini 프롬프트 (각 장면 시각적으로 완전 분리)
- 한국 디테일: 한복·한옥·소나무·도깨비·산신령·돌담·장독·테왁 등
- GROUPED NATURAL TEXTURES + 직각 반자 보더 + 디테일 가이드 일관 적용
