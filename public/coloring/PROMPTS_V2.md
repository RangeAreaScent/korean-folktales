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

DECORATIVE BORDER — every scene MUST include this identical SIMPLE frame
- Position: ~60px inside each canvas edge, forming a square inner frame
- Two thin parallel black lines (outer + inner), ~10px apart, same uniform stroke as the rest of the line art
- KEEP IT MINIMAL — NO meander pattern, NO Greek-key, NO repeating motifs along the sides. Just two clean thin parallel rectangles.
- Four small corner ornaments only: a tiny Korean cloud curl (구름 무늬) about 50×50px at each corner, formed by 2-3 nested curved strokes. Each ornament sits in the empty space between the two parallel border lines, at the corner.
- Border itself is line-art only (no fills, no shading)
- The border closes off any subject line that would otherwise reach the canvas edge
- Subject illustration sits entirely INSIDE this border with ~40px breathing room
- Same simple border on EVERY scene of EVERY story — this is brand-level consistency

REJECT and re-render if the border has any continuous repeating pattern along the four sides (meanders, hooks, dots, dashes, key patterns, etc.). The four sides should just be CLEAN PARALLEL THIN LINES with corner ornaments only.

COMPOSITION
- Square 1024 × 1024 pixels, centered subject inside the inner border.
- Medium detail — friendly, readable shapes that a 5-year-old can recognize and a 10-year-old finds interesting.

BACKGROUND
- Pure white (#FFFFFF) inside the border. No texture, no off-white tint, no shadow.

ART STYLE
- Korean traditional / minhwa folk-art sensibility — slightly stylized, friendly, big round eyes for characters and animals, NOT photo-realistic, NOT anime/chibi.
- Hanbok-clad children, traditional Korean architectural elements (한지문, 초가집, 한옥 지붕, 장독, 우물, 호롱불, 소나무, 수수밭) when relevant.

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
- 보더 없거나 불규칙할 때: `"Re-render. Add a SIMPLE border 60px from each edge: just two thin parallel rectangles, with a small cloud-curl ornament at each of the 4 corners. NO repeating pattern along the sides."`
- 보더가 너무 복잡하거나 메안더가 나올 때: `"Re-render. The border is too busy. Make it just two clean thin parallel lines around the canvas with a small 2-3 stroke cloud-curl in each corner — nothing else. NO meander, NO Greek-key, NO repeating motifs."`

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
Subject: Inside a small Korean thatched-roof cottage at night. A traditional paper-paneled door (한지문) on the right, closed. To the left, an older brother (~10 years old) in plain hanbok holds his younger sister (~6 years old, hanbok with a small ribbon) protectively in his arms — both looking nervously toward the door. On a low wooden tea table foreground-left, a small traditional Korean oil lamp (호롱불) with a single visible flame. On a wooden chest in the back-left, a small empty bamboo basket. Through the bottom gap of the paper door, a single ominous large clawed paw shadow visible on the floor (do NOT draw the tiger itself — only the shadow shape on the wood floor). A small folded blanket (이불) near the children.

Mood: hushed, late-night suspense, like a bedtime story moment.
Composition: paper door on the right occupying ~35% of the canvas height, siblings center-left, oil lamp foreground left, ominous paw shadow at the door's base extending onto the floor.
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
Subject: Inside the same Korean cottage, now closer to the paper-paneled door. The brother (~10) stands center holding the little sister's (~6) hand, both in hanbok. The brother is reaching out with his free hand toward the bottom of the paper door, palm up — gesturing as if about to ask the visitor to show a hand. The sister is on her tiptoes leaning slightly with one ear toward the door, hand near her mouth, eyes wide — as if listening for a voice. Show both gestures clearly because the colorist needs to feel "two tests are possible here". Through the paper door panels, a soft silhouette of a large crouched tiger visible (NOT clearly drawn — show only the outline of its rounded back and one pointed ear above the door's bottom rail). The oil lamp (호롱불) glows on the table foreground-left.

Mood: tense decision moment, two children quietly working together to outsmart the unknown.
Composition: paper door right side (40%), siblings center performing the two gesture-tests, oil lamp foreground left, tiger silhouette behind door.
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
Subject: An outdoor moonlit Korean backyard. A traditional Korean round stone well (우물) center foreground, low circular stone wall with a single wooden crossbeam above. Inside the well's dark water surface, a perfectly round reflection of the full moon — show it as a bright clear circle inside the dark well opening. Behind the well to the left, a large traditional Korean fermenting jar (장독 — wide rounded body, narrow top) where the little sister (~6, hanbok) hides crouched, only her face peeking around the jar's side. To the right of the well, the older brother (~10, hanbok) stands close to the well's edge casting a shadow downward into the water. From the right side of the canvas, a stylized minhwa-style tiger (cute round eyes, bold stripes, friendly proportions) leans its head down into the well, peering at the reflection with a puzzled expression. Up in the night sky upper-right: the real full moon, large and round. In the background: parts of a Korean traditional rooftop with curved tile eaves and a few hanok wall lines.

Mood: clever hide-and-seek — children outwitting the tiger by the moonlight.
Composition: stone well center foreground, sister hiding behind jar left, brother by well's edge, tiger leaning into well right, real moon upper-right, hanok background top.
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
Subject: A magical night sky scene with two destinies side by side. LEFT HALF: a thick, twisted, well-braided golden rope (동아줄) descends from large billowing stylized clouds at the top to the brother (~10) and sister (~6) in hanbok in the mid-left, holding the rope together as they rise — brother gripping the rope with one hand and gently lifting the sister with the other. Above the clouds at upper-left, a stylized smiling sun face (round face with short straight rays around it) and beside it a calm crescent moon face (gentle expression). RIGHT HALF: in the upper-right sky, a separate frayed broken rope dangling in mid-air, the end clearly snapped. Below it, a stylized minhwa-style tiger (cute round eyes, bold flat stripes) shown mid-fall, paws up, surprised expression. At the bottom-right of the canvas, a field of tall sorghum stalks (수수 — show as tall vertical thin plants with bushy grain heads at the top, in a row), the tiger falling toward them. In the middle-bottom horizon, a distant Korean village with a few small thatched roofs. Lots of small simple five-pointed stars scattered across the night sky.

Mood: cosmic justice, transformation, awe — the climax of a Korean folktale.
Composition: split-feel canvas — siblings ascending on the left with sun & moon faces above clouds, tiger falling on the right toward sorghum field below, distant village center-bottom, stars filling the night sky background.
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
