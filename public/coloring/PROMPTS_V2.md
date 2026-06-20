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
  * Same uniform black stroke as the rest of the line art
- FOUR CORNER MOTIFS: small geometric right-angle meander pattern (반자 무늬) at each corner only:
  * Each corner motif ~70×70px, sitting in the space inside the inner border line
  * Geometric ONLY — nested right-angle hooks, like a small "L" turning into another "L" inward, 2-3 right-angle steps
  * NO curls, NO spirals, NO curves — pure right-angle geometry, like a tiny Greek-key fragment confined to the corner
- The four SIDES of the border are PLAIN — no repeating pattern, just the two clean parallel lines
- Border itself is line-art only (no fills, no shading)
- The border closes off any subject line that would otherwise reach the canvas edge
- Subject illustration sits entirely INSIDE this border with ~40px breathing room
- Same border on EVERY scene of EVERY story — brand-level consistency

REJECT and re-render if:
- The parallel border lines are broken, dashed, or have gaps (must be continuous)
- The corner motifs use curves, curls, or spirals (must be right-angle hooks)
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
- Hanbok must show: collar (깃) line, ribbon (고름), sleeve cuff line, gathered hem fold line — at minimum 4–5 visible garment lines per character. NOT a plain dress silhouette.
- Faces must show: eyes with iris + pupil circles, small nose line, mouth line, hair strands (3–5 lines), ear shape.
- Architecture must show: wood grain lines on doors, individual paper panels (한지문 grid pattern), roof straw texture (slanted lines), woven basket pattern (criss-cross weave), oil lamp wick + flame shape.
- Target: a 5-year-old should see "many things to color" — at least 12–15 distinct enclosed regions per scene.
- AVOID the "minimal flat sticker" look. Aim for "traditional Korean picture book illustration".

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

1. **줌 인 (300%)** — 모든 윤곽선 닫혀 있나? 두 선이 만나는 곳에 갭이 있으면 ❌ → 재생성
2. **자동 색칠 테스트** — 인접 영역 한 곳에 단색으로 바켓 채우기 시도. 의도하지 않은 영역까지 색이 새면 ❌
3. **스트로크 두께** — 같은 굵기인가? 어떤 선만 가늘면 그 부분에서 누출 위험 → 재생성
4. **검정 채움** — 솔리드 검정 영역 있으면 ❌. 칠할 곳을 닫아버림
5. **그림자/해칭** — 회색 점·선 있으면 ❌. 채색 시 톤 충돌
6. **보더 프레임** — 한국 반자 무늬 + 4코너 메달리온, 60px 안쪽에 균일하게 있나?
7. **흰 여백** — 보더 안쪽 최소 5% 여백 있나?
8. **연결되지 않은 선** — 어디에 닿지도 않고 멈춘 짧은 선이 있으면 ❌
9. **워터마크/사인** — 어디에도 없어야 함

→ 한 항목이라도 ❌면 재생성. 후속 프롬프트 한 줄 추가 팁:
- 닫히지 않은 선이 있을 때: `"Re-render. Every outline MUST close — overlap meeting strokes by 4px or more."`
- 회색·해칭이 섞일 때: `"Re-render. Remove all gray fills, hatching, and shading. Only pure black outlines on pure white."`
- 솔리드 검정이 나올 때: `"Re-render. NO filled black regions — silhouettes must be hollow outlines only."`
- 보더 없거나 불규칙할 때: `"Re-render. Add a border 60px from each edge: TWO CONTINUOUS thin parallel rectangle lines (~14px apart, unbroken all the way around) plus a small right-angle meander hook (~70×70px) at each of the 4 corners only. NO pattern along the sides."`
- 보더 선이 끊겨 있을 때: `"Re-render. The two parallel border rectangles must be CONTINUOUS lines all the way around — no dashes, no gaps. Only the 4 corner motifs are separate."`
- 코너에 곡선이 나올 때: `"Re-render. The 4 corner motifs must be RIGHT-ANGLE geometric hooks only (반자 무늬) — small nested L-shapes turning inward. NO curls, NO spirals, NO curves."`
- 그림이 너무 단순할 때: `"Re-render with more detail. Hanbok must show collar, ribbon, sleeve cuff, and hem lines. Faces must show iris pupils, nose, mouth, hair strands, ears. Architectural elements need wood grain, paper panel grids, and weave patterns. Add background environment details (ground texture, individual leaves/flowers). Target 12-15 distinct enclosed regions per scene."`

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

## Scene 1 — `folktale/scene-1-knock.png`

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

## Scene 2 — `folktale/scene-2-decision.png`

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

## Scene 3a — `folktale/scene-3a-pine.png` (소나무 분기)

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

## Scene 3b — `folktale/scene-3b-well.png` (우물 분기)

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

## Scene 4 — `folktale/scene-4-rope.png` (정통 결말)

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

배치 위치: `public/coloring/folktale/` (기존 폴더에 덮어쓰기 또는 별도 백업 후 교체)

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
