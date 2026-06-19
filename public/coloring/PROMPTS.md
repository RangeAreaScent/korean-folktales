# 도안 PNG 생성 가이드 (Gemini 등 AI 이미지 생성)

각 장면에 들어갈 PNG 파일 이름과 프롬프트입니다. 모두 같은 폴더(`public/coloring/`)에 그대로 떨어뜨려 주세요.

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
- Lines crossing the edge of the image MUST be terminated by the border (see BORDER below) — never by trailing off into white space.

BORDER (mandatory inner frame)
- Draw a clean thin rectangular border ~24px from each canvas edge, in the same black uniform-stroke style. This border closes any line that would otherwise reach the edge.
- The border itself is plain — no decorations on it. Korean-pattern decoration belongs to the subject, not the border.

COMPOSITION
- Square 1024 × 1024 pixels, centered subject.
- Generous breathing room: subject occupies ~70% of the inner border, leaving white margin.
- Medium detail — friendly, readable shapes that a 5-year-old can recognize and a 10-year-old finds interesting. Not too busy, not too sparse.

BACKGROUND
- Pure white (#FFFFFF). No texture, no off-white tint, no shadow.

OUTPUT
- 1024 × 1024 PNG.
- High-resolution square. If the model wants to output smaller, override: "render at full 1024×1024, do not downscale".
```

**해상도 주의** — 1024×1024 정사각형 PNG로 출력해 주세요. 작은 해상도로 나오면 캔버스에서 확대 시 흐릿해질 수 있어요. Gemini에서 "1024x1024 PNG", "high resolution square image" 같은 표현을 함께 넣으면 더 잘 나옵니다.

위 베이스 + 아래 장면 설명을 합쳐서 한 번에 넣으세요.

---

## 🔁 결과물 검수 체크리스트 (각 PNG 받자마자)

1. **줌 인 (300%)** — 모든 윤곽선 닫혀 있나? 두 선이 만나는 곳에 갭이 있으면 ❌ → 재생성
2. **자동 색칠 테스트** — 인접 영역 한 곳에 단색으로 바켓 채우기 시도. 의도하지 않은 영역까지 색이 새면 ❌
3. **스트로크 두께** — 같은 굵기인가? 어떤 선만 가늘면 그 부분에서 누출 위험 → 재생성
4. **검정 채움** — 솔리드 검정 영역 있으면 ❌. 칠할 곳을 닫아버림
5. **그림자/해칭** — 회색 점·선 있으면 ❌. 채색 시 톤 충돌
6. **테두리 프레임** — 24px 근처 균일한 검정 사각 테두리 있나?
7. **흰 여백** — 최소 5% 여백 있나? 너무 빽빽하면 ❌
8. **연결되지 않은 선** — 어디에 닿지도 않고 멈춘 짧은 선이 있으면 ❌
9. **워터마크/사인** — 어디에도 없어야 함

→ 한 항목이라도 ❌면 재생성. 후속 프롬프트 한 줄 추가 팁:
   - 닫히지 않은 선이 있을 때: `"Re-render. Every outline MUST close — overlap meeting strokes by 4px or more."`
   - 회색·해칭이 섞일 때: `"Re-render. Remove all gray fills, hatching, and shading. Only pure black outlines on pure white."`
   - 솔리드 검정이 나올 때: `"Re-render. NO filled black regions — silhouettes must be hollow outlines only."`
   - 테두리 없을 때: `"Re-render. Add a clean thin rectangular black border 24px from each edge."`

---

## 1) `scene-start.png` — 1장. 성문 앞

```
Subject: A young wizard with a tall pointed hat and a long cloak, holding a wooden staff, standing in front of a tall castle gate at night. Two crescent moons in the sky. Rune symbols carved on the gate. Cobblestone path leading to the gate.
Composition: full body of wizard centered front, castle gate rising behind, moons in upper corners.
```

## 2) `scene-tower.png` — 2장 (탑). 별빛 마법진

```
Subject: The inside of a tower top, open to the sky. A glowing magic circle floats in the center with stars and rune symbols. In the middle of the circle, a small round dragon egg with a star pattern. Tall arched windows on the sides.
Composition: magic circle centered, egg in the middle, arches framing the scene.
```

## 3) `scene-dungeon.png` — 2장 (던전). 잠든 보물방

```
Subject: A dungeon treasure room. Big rounded piles of gold coins, a few oversized gems, an old open treasure chest. A single dragon scale resting on top of the pile. Stone archway in the background. Dripping torch on the wall.
Composition: treasure pile centered low, archway behind, torch upper left.
```

## 4) `scene-ending-light.png` — 마지막 장. 빛의 용

```
Subject: A graceful long dragon made of light, with feather-like flowing scales, gently curling around a small wizard standing below. Soft star sparkles around them. Sun rising on the horizon.
Composition: dragon arcing over the wizard from upper right to lower left, wizard small at bottom center.
```

## 5) `scene-ending-shadow.png` — 마지막 장. 그림자의 용

```
Subject: A large dragon with smooth thick scales, half-emerging from dark smoke, large round eyes, holding a single glowing rune stone in its claw, offering it to a small wizard. Cracked stone floor.
Composition: dragon head and front body large in the upper half, wizard small in lower right reaching up.
```

---

## 받은 PNG 체크리스트

- [ ] 배경이 완전 흰색 (회색 끼 없음)
- [ ] 선이 끊긴 곳 없음 (있으면 flood fill이 새서 옆 영역까지 채워짐)
- [ ] 회색 그라데이션/음영 없음
- [ ] 1024×1024 정사각형

선 끊김이 있으면 Photoshop / Photopea (무료, 브라우저) / Procreate 에서 검정 브러시로 잇기만 하면 됩니다.

---

## 임시: PNG 없이도 앱 동작 확인

PNG가 아직 없어도 앱은 placeholder(빈 도안)로 동작합니다. 위 5개 파일을 그대로 떨어뜨리면 자동으로 인식돼요.

---

# 🐯 스토리 2 — 해님 달님

한국 옛이야기 — 호랑이를 피해 하늘로 오른 오누이의 분기 이야기.

## 공통 베이스 프롬프트 (위 베이스와 동일하되 스타일 라인 한 줄 추가)

```
Black-and-white coloring book page for all ages.
Style: simple flat line art, thick uniform black outlines (4–5px), bold clean strokes.
**Korean traditional folk-tale storybook style**, gentle and warm, suitable for all ages.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color.
Pure white background. All regions MUST be fully enclosed by lines (no broken outlines).
Output exactly 1024×1024 pixels, square aspect ratio, centered composition, generous white space.
```

---

## 1) `scene-folk-start.png` — 1장. 한밤중의 문 두드림

```
Subject: A small Korean traditional thatched-roof house (초가집) at night. Two children — a boy in hanbok and a girl in hanbok — standing nervously in front of the wooden sliding door (한지 문). Outside the door, the large silhouette of a tiger looms with a paw raised to knock. Full moon in the sky, a couple of pine trees beside the house.
Composition: house centered, children small in front of the door, tiger shadow at right edge, moon upper left.
```

## 2) `scene-folk-forest.png` — 2장. 달빛 어린 숲

```
Subject: A deep forest at night. Two children in hanbok (boy and girl) standing at the base of a giant ancient Korean pine tree (소나무) with sprawling branches. Full moon and stars peeking through the branches. A few mushrooms and ferns on the ground.
Composition: massive pine tree centered, children small at the base, moon and stars in the gaps between branches.
```

## 3) `scene-folk-well.png` — 2장. 우물가 그림자

```
Subject: A traditional Korean stone well (우물) in a back courtyard at night. Two children in hanbok crouching beside it, peering into the water where a full moon's reflection ripples. In the background, a tiger silhouette creeping out from the open kitchen door of a small thatched house.
Composition: stone well centered front, children to the left of well, tiger silhouette small in upper-right background.
```

## 4) `scene-folk-ending-sky.png` — 마지막 장. 해님과 달님

```
Subject: A golden rope (동아줄) descending from the clouds, two children in hanbok climbing it upward toward the sky. Above them, a sun on the left and a crescent moon on the right, with traditional Korean cloud swirls (구름 무늬) around. Stars sprinkled throughout.
Composition: rope diagonal from upper-center to lower-center, children climbing mid-rope, sun and moon flanking them above, clouds curling at corners.
```

## 5) `scene-folk-ending-mountain.png` — 마지막 장. 산신령의 가호

```
Subject: A friendly Korean mountain spirit (산신령) — an old man with a long flowing white beard, wearing traditional hanbok and a tall hat, holding a wooden staff. He is gently handing two small gourd-shaped bottles (호리병) to two children in hanbok kneeling before him. A tiger fleeing in the distance, mountain peaks in the background, moon shining above.
Composition: san-shin-ryeong (mountain spirit) large at center-left facing right toward the children at center-right, tiger small in lower-right background, mountains and moon in upper background.
```

---

## 받은 PNG 체크리스트 (해님 달님 5장)

- [x] `scene-folk-start.png`
- [x] `scene-folk-forest.png`
- [x] `scene-folk-well.png`
- [x] `scene-folk-ending-sky.png`
- [x] `scene-folk-ending-mountain.png`

PNG는 모두 `public/coloring/` 폴더에 넣어주세요. 마법사 스토리와 같은 위치.

---

# 🌊 스토리 3 — 해녀와 인어

깊은 제주 바다에서 진주를 둘러싼 해녀와 인어의 이야기.

## 공통 베이스 프롬프트

```
Black-and-white coloring book page for all ages.
Style: simple flat line art, thick uniform black outlines (4–5px), bold clean strokes.
**Ocean adventure storybook style with Korean haenyeo (female diver) elements**, gentle wavy lines, suitable for all ages.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color.
Pure white background. All regions MUST be fully enclosed by lines (no broken outlines).
Output exactly 1024×1024 pixels, square aspect ratio, centered composition, generous white space.
```

---

## 1) `scene-haenyeo-start.png` — 1장. 깊은 바다

```
Subject: Underwater scene. A Korean haenyeo (female diver) wearing traditional diving suit, swim cap, and goggles, holding a teawak (orange round float) and a string net (mangsari). She is mid-dive in clear ocean water with sun rays beaming down from above. Below her, two paths diverge — one leads toward a coral reef on the left, another into a kelp forest on the right. Small tropical fish around her, bubbles rising.
Composition: haenyeo centered upper-middle, two paths splitting below her, sun rays from top.
```

## 2) `scene-haenyeo-coral.png` — 2장. 산호 미로

```
Subject: A colorful coral reef maze, with branching coral structures (fan corals, brain corals, table corals) creating winding pathways. A mermaid with long flowing hair and a fish-scaled tail emerges from behind a coral, holding a small round pearl out in her hand. Small fish swim between corals. The haenyeo is at the entrance facing the mermaid.
Composition: mermaid right-center holding pearl out, haenyeo left-center facing her, coral structures framing both, pearl at the center.
```

## 3) `scene-haenyeo-kelp.png` — 2장. 해초 숲

```
Subject: A tall swaying kelp forest underwater. A large sea turtle (바다거북) is asleep on the sandy ocean floor in the center. On top of its shell rests a small round glowing pearl. A mermaid with long hair and fish tail floats softly to the side, watching gently. The haenyeo approaches from the foreground.
Composition: sleeping turtle large in center with pearl on shell, mermaid on right side floating in kelp, haenyeo small at lower-left approaching.
```

## 4) `scene-haenyeo-ending-guardian.png` — 마지막 장. 바다의 수호자

```
Subject: A peaceful underwater scene with light radiating outward from a returned pearl. The haenyeo and mermaid hold hands beside the pearl. Around them, sea creatures gather peacefully — turtles, fish schools, octopus, seahorses, dolphins. A full moon visible through the surface above.
Composition: haenyeo and mermaid centered holding hands beside glowing pearl, sea creatures fanning out in a circle around them, moon above through the surface.
```

## 5) `scene-haenyeo-ending-village.png` — 마지막 장. 마을로 돌아온 영웅

```
Subject: A Korean fishing village at sunset. The haenyeo standing on a rocky beach holding the pearl high, with villagers in traditional Korean clothes (hanbok) gathered around cheering and clapping. Thatched-roof houses behind. In the distant ocean, a mermaid's silhouette is barely visible looking on. Seagulls in the sky.
Composition: haenyeo centered on beach holding pearl up, villagers gathered around her, distant ocean with tiny mermaid silhouette upper-right, houses upper-left.
```

---

## 받은 PNG 체크리스트 (해녀와 인어 5장)

- [ ] `scene-haenyeo-start.png`
- [ ] `scene-haenyeo-coral.png`
- [ ] `scene-haenyeo-kelp.png`
- [ ] `scene-haenyeo-ending-guardian.png`
- [ ] `scene-haenyeo-ending-village.png`

---

# 🐰 스토리 4 — 토끼와 거북이

전통 우화의 분기형 재해석. 시점을 선택하고 결승선 너머의 의미를 만들어가는 이야기.

## 공통 베이스 프롬프트

```
Black-and-white coloring book page for all ages.
Style: simple flat line art, thick uniform black outlines (4–5px), bold clean strokes.
**Warm fable storybook style with rounded soft forms**, friendly characters, suitable for all ages.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color.
Pure white background. All regions MUST be fully enclosed by lines (no broken outlines).
Output exactly 1024×1024 pixels, square aspect ratio, centered composition, generous white space.
```

---

## 1) `scene-race-start.png` — 1장. 출발선에서

```
Subject: A cheerful rabbit and a turtle (with shell pattern) standing side by side at a starting line on a grassy meadow. The rabbit is upright on hind legs, smiling, wearing a small ribbon. The turtle has a friendly face. A big "START" banner over them (or simple flag). In the distance, a hill with a finish line ribbon. A rainbow arch in the sky. A few flowers and butterflies around.
Composition: rabbit and turtle side by side at center-bottom, START banner above, distant hill with finish line, rainbow arching across upper sky.
```

## 2) `scene-race-hare.png` — 2장. 토끼의 들판

```
Subject: A wide-open flowery meadow. The rabbit running mid-stride with confident expression, ears flowing back. To the side, a tall friendly tree with a wide shaded area underneath inviting rest. Butterflies and dragonflies around. Path winding through the meadow with stones.
Composition: rabbit running center-foreground, tree with shade upper-right, winding path going to the back-left toward a distant hill.
```

## 3) `scene-race-tortoise.png` — 2장. 거북이의 길

```
Subject: A small turtle approaching a small babbling stream with stepping stones. Water lilies floating. On the other side of the stream, blurred in the distance, the silhouette of a rabbit lying down asleep under a tree. Reeds and grass around. Small fish in the stream.
Composition: turtle left-center foreground at stream edge, stream cutting horizontally, distant sleeping rabbit silhouette upper-right, stepping stones across.
```

## 4) `scene-race-ending-reunion.png` — 마지막 장. 함께 도착

```
Subject: The rabbit and turtle crossing a finish line ribbon side by side, both smiling. Above them, a big rainbow arches across. Around them, woodland animal friends (squirrels, birds, fox, deer) are cheering with raised paws and confetti in the air. A sun shining warmly.
Composition: rabbit and turtle centered crossing finish line, ribbon breaking, rainbow above, animal friends fanning out on both sides cheering, sun upper-right.
```

## 5) `scene-race-ending-reflect.png` — 마지막 장. 결승선의 작은 후회

```
Subject: A solo figure (silhouette of either rabbit or turtle — design with soft rounded form to read as either) standing at the finish line holding a small trophy, but turned slightly looking back over the shoulder at the empty winding path behind. The sky is sunset with warm clouds. A single bird flying. Quiet, contemplative mood. A single banner that says "FINISH" small.
Composition: figure right-center with trophy, looking back to upper-left at empty path, sunset sky filling upper half with warm clouds, single bird upper-right.
```

---

## 받은 PNG 체크리스트 (토끼와 거북이 5장)

- [x] `scene-race-start.png`
- [x] `scene-race-hare.png`
- [x] `scene-race-tortoise.png`
- [x] `scene-race-ending-reunion.png`
- [x] `scene-race-ending-reflect.png`

PNG는 모두 `public/coloring/` 폴더에 넣어주세요.

---

# 🦌 스토리 5 — 선녀와 나무꾼

산속 폭포에서 시작된 인연이 하늘 혹은 산으로 이어지는 이야기.

## 공통 베이스 프롬프트

```
Black-and-white coloring book page for all ages.
Style: simple flat line art, thick uniform black outlines (4–5px), bold clean strokes.
**Korean traditional folk-tale storybook style with gentle, poetic mood**, suitable for all ages.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color.
Pure white background. All regions MUST be fully enclosed by lines.
Output exactly 1024×1024 pixels, square aspect ratio, centered composition, generous white space.
```

---

## 1) `scene-wood-start.png` — 1장. 폭포 옆 사슴

```
Subject: A Korean woodcutter (나무꾼) in traditional hanbok with an A-frame carrier (지게) and an axe, standing in front of a tall mountain waterfall. Behind a large boulder beside him hides a graceful deer (사슴) with antlers. On the path ahead, a hunter (사냥꾼) in hanbok with a bow approaches, looking around. Pine trees, stones, ferns around.
Composition: woodcutter centered, deer hiding behind boulder to his right, waterfall in background, hunter approaching from lower-left path.
```

## 2) `scene-wood-sage.png` — 2장. 별빛 연못

```
Subject: A serene mountain pond at night with stars and a full moon reflected on the water. On the grassy bank, a folded heavenly hanbok (선녀옷) is laid neatly. In the water, a fairy (선녀) with long flowing hair bathes, only her shoulders visible. The woodcutter peeks shyly from behind a tree. The deer rests nearby in the grass.
Composition: pond centered with moon reflected, hanbok folded on bank-left, fairy mid-water right, woodcutter behind tree at far left, deer in foreground.
```

## 3) `scene-wood-forest.png` — 2장. 깊은 숲의 흰 사슴

```
Subject: A misty deep forest. A pure white deer (흰 사슴) leads the way down a foggy path. Ahead, a fairy (선녀) in flowing hanbok stands with hand outstretched in welcome, her hair flowing softly. Tall pine trees and traditional Korean clouds (구름 무늬) around. The woodcutter approaches from the foreground.
Composition: fairy centered with outstretched hand, white deer to her side, woodcutter foreground-left looking at her, misty trees framing the scene.
```

## 4) `scene-wood-ending-sky.png` — 마지막 장. 하늘로 오른 약속

```
Subject: A magnificent rainbow bridge rising from a mountain peak into a starry sky. The fairy and the woodcutter walk hand-in-hand up the rainbow toward two glowing stars. The deer watches from the mountain below. Traditional Korean cloud swirls (구름 무늬) decorate the sky.
Composition: rainbow diagonal from lower-right to upper-left, couple mid-rainbow, deer small on mountaintop below, stars above.
```

## 5) `scene-wood-ending-mountain.png` — 마지막 장. 산의 정령이 되어

```
Subject: A small thatched-roof hut nestled in misty mountains. An old man with long white beard and a long pipe (the woodcutter aged into a 산신령), sits peacefully on the porch with the deer beside him. Small forest animals (squirrel, magpies, rabbit) gather around. Mist swirling, mountain peaks behind.
Composition: hut centered with old man and deer on porch, animal friends gathered around, misty mountains layered in the background.
```

---

## 받은 PNG 체크리스트 (선녀와 나무꾼 5장)

- [ ] `scene-wood-start.png`
- [ ] `scene-wood-sage.png`
- [ ] `scene-wood-forest.png`
- [ ] `scene-wood-ending-sky.png`
- [ ] `scene-wood-ending-mountain.png`

---

# 👺 스토리 6 — 혹부리 영감과 도깨비

달밤 산중에서 도깨비들과 마주친 영감의 노래 한 곡 이야기.

## 공통 베이스 프롬프트

```
Black-and-white coloring book page for all ages.
Style: simple flat line art, thick uniform black outlines (4–5px), bold clean strokes.
**Korean traditional folk-tale storybook style, slightly whimsical with playful goblin (dokkaebi) characters**, suitable for all ages.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color.
Pure white background. All regions MUST be fully enclosed by lines.
Output exactly 1024×1024 pixels, square aspect ratio, centered composition, generous white space.
```

**참고: dokkaebi (도깨비)** are Korean goblins — friendly cartoonish appearance, single horn or two horns on head, large round eyes, often carrying a bumpy magical club (도깨비방망이), wearing simple traditional clothes or loincloths, NOT scary.

---

## 1) `scene-dok-start.png` — 1장. 산중의 빈 집

```
Subject: A small traditional Korean hut deep in a mountain forest at night. Warm lantern light spills from the open paper doors. Inside the hut, several friendly dokkaebi (Korean goblins with horns, big round eyes, holding magical bumpy clubs called 도깨비방망이) are dancing and singing. An old Korean man (혹부리 영감, with a small cyst/bump on his cheek and a long pipe and hanbok) peeks shyly from behind a tree outside. Full moon overhead.
Composition: hut centered with dokkaebi visible inside through doorway, old man peeking from tree at left, moon upper right.
```

## 2) `scene-dok-sing.png` — 2장. 도깨비들과 함께

```
Subject: Inside the mountain hut. The old man (with cheek cyst, hanbok, long pipe) sits cross-legged, singing happily with his mouth open. Around him, four to five friendly dokkaebi (horns, big eyes, carrying clubs, simple loincloths) clap their hands and dance in a circle. Korean traditional instruments (drum, small gong) on the floor. Warm lantern hanging.
Composition: old man centered singing, dokkaebi dancing in circle around him with raised arms, lantern above, scattered instruments on the floor.
```

## 3) `scene-dok-hide.png` — 2장. 숨어서 본 잔치

```
Subject: A pile of treasures (round gold coins, gems, scrolls, an ornate vase, ribbons) heaped in the center of the hut. Several dokkaebi sit around the pile playing dice and laughing. One dokkaebi points his finger toward the hiding old man, who pokes his head out from behind a folding screen, looking startled.
Composition: treasure pile centered, dokkaebi around it, old man peeking from behind folding screen at right, one dokkaebi pointing at him.
```

## 4) `scene-dok-ending-blessing.png` — 마지막 장. 혹을 떼고 돌아온 길

```
Subject: A village square at dawn. The old man (now WITHOUT the cheek cyst), smiling, holds a glowing silk pouch. He sits on a low wooden platform with five or six Korean village children gathered around him in awe, listening to a story. Thatched-roof houses behind, sunrise sky.
Composition: old man centered on platform with pouch, children fanning around him listening, houses behind, sunrise sky overhead.
```

## 5) `scene-dok-ending-wander.png` — 마지막 장. 도깨비 친구의 길

```
Subject: A misty mountain path at night under a full moon. The old man (still with cheek cyst) and three dokkaebi walk together with arms over each other's shoulders, going down the path. A small dokkaebi carries a paper lantern ahead lighting the way. Pine trees, mist swirls. Their backs are to the viewer.
Composition: group walking centered-foreground from camera into distance, lantern dokkaebi in front, moon above through trees.
```

---

## 받은 PNG 체크리스트 (혹부리 영감 5장)

- [ ] `scene-dok-start.png`
- [ ] `scene-dok-sing.png`
- [ ] `scene-dok-hide.png`
- [ ] `scene-dok-ending-blessing.png`
- [ ] `scene-dok-ending-wander.png`

---

# 👟 스토리 7 — 콩쥐와 두꺼비

깨진 항아리로 시작된 콩쥐의 잔치 가는 길 이야기.

## 공통 베이스 프롬프트

```
Black-and-white coloring book page for all ages.
Style: simple flat line art, thick uniform black outlines (4–5px), bold clean strokes.
**Korean traditional folk-tale storybook style, warm Cinderella-like mood with cute animal helpers**, suitable for all ages.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color.
Pure white background. All regions MUST be fully enclosed by lines.
Output exactly 1024×1024 pixels, square aspect ratio, centered composition, generous white space.
```

---

## 1) `scene-kong-start.png` — 1장. 깨진 항아리

```
Subject: A Korean traditional courtyard with a large clay water jar (옹기 항아리) that has a crack at the bottom and water leaking out. A girl named Kongjwi in simple hanbok stands beside the jar holding a wooden water dipper, looking worried. In the shadow of the house doorway, the silhouette of a stern stepmother is visible. A small toad sits at the base of the jar.
Composition: large cracked jar left-center, Kongjwi standing beside it looking down, toad at jar base, stepmother silhouette in doorway right-background.
```

## 2) `scene-kong-toad.png` — 2장. 시냇가의 참새들

```
Subject: A small flowing stream with stepping stones. One Korean traditional flower-decorated shoe (꽃신) floats in the water. Kongjwi in hanbok kneels at the bank with hands clasped, looking up at a flock of friendly sparrows (참새) hovering near her. Reeds and small flowers around.
Composition: stream cutting horizontally, Kongjwi kneeling lower-left, shoe floating mid-stream, sparrows hovering above her on the right, reeds at the edges.
```

## 3) `scene-kong-cow.png` — 2장. 검은 소의 선물

```
Subject: A peaceful field outside a village. A large gentle ox (검은 소 — Korean black ox) faces Kongjwi (in simple hanbok), holding in its mouth a folded silk hanbok. On the ground at the cow's feet rests a folded simple hemp (베옷) garment. Kongjwi looks between the two, hand to her chin in thought. Mountains in the distance, small wildflowers.
Composition: ox right-center with silk hanbok in mouth, hemp clothes at its hooves, Kongjwi left facing the ox thinking, mountains in background.
```

## 4) `scene-kong-ending-banquet.png` — 마지막 장. 잔치에서의 만남

```
Subject: A festive village banquet with paper lanterns strung overhead and a low traditional Korean banquet table with food. Kongjwi in beautiful hanbok holds hands with a young Korean magistrate (사또, in official robes and brimmed hat 갓), both smiling. On the ground beside them, one flower shoe (꽃신). Village people in hanbok clap around them. Cherry blossoms or flower petals falling.
Composition: Kongjwi and 사또 centered holding hands, shoe on ground, villagers fanning around clapping, lanterns and blossoms above.
```

## 5) `scene-kong-ending-village.png` — 마지막 장. 마을로 돌아온 콩쥐

```
Subject: A small thatched-roof Korean cottage at the edge of a village at night. Warm light glows from the windows. At the gate, the toad, sparrows, and black ox welcome Kongjwi (in hanbok) home with friendly poses. Full moon shines above. Wildflowers along the path.
Composition: cottage centered glowing, Kongjwi at the gate-front, animal friends (toad lower-front, sparrows in air, ox at right) greeting her, moon above.
```

---

## 받은 PNG 체크리스트 (콩쥐와 두꺼비 5장)

- [x] `scene-kong-start.png`
- [x] `scene-kong-toad.png`
- [x] `scene-kong-cow.png`
- [x] `scene-kong-ending-banquet.png`
- [x] `scene-kong-ending-village.png`

---

# 🐢 스토리 8 — 별주부전

용궁의 자라가 토끼를 데리러 산으로 오는 한국 옛이야기.

## 공통 베이스 프롬프트

```
Black-and-white coloring book page for all ages.
Style: simple flat line art, thick uniform black outlines (4–5px), bold clean strokes.
**Korean traditional folk-tale storybook style with cute animal characters**, suitable for all ages.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color.
Pure white background. All regions MUST be fully enclosed by lines.
Output exactly 1024×1024 pixels, square aspect ratio, centered composition, generous white space.
```

---

## 1) `scene-byeol-start.png` — 1장. 산속에 온 자라

```
Subject: A grassy mountain meadow. A cute Korean rabbit (tokki) with long ears sits up nibbling clover. From the right edge, a soft-shell turtle (jara) climbs up onto a mossy rock, gesturing toward the sea visible in the distance. Korean pine trees, traditional Korean cloud swirls in the sky.
Composition: rabbit centered, turtle right side coming up onto rock, sea horizon in background-right with cloud swirls.
```

## 2) `scene-byeol-palace.png` — 2장. 용궁의 진실

```
Subject: A magnificent underwater Dragon Palace (Yonggung) with traditional Korean palace roof curves. Inside, the Dragon King (Yongwang) — a friendly dragon wearing a royal Korean crown — lies in a bed of corals. Sea minister servants (fish-headed figures in royal robes) stand around. The rabbit looks shocked in the foreground. Bubbles rising.
Composition: Dragon King in bed center-back, rabbit foreground-left looking startled, minister figures around the bed, palace pillars framing.
```

## 3) `scene-byeol-forest.png` — 2장. 산속 도깨비의 귀띔

```
Subject: A small clearing in a Korean pine forest. The rabbit sits crouched while a friendly dokkaebi (horned, with bumpy club, big eyes) whispers into its ear. The soft-shell turtle climbs up the mountain path in the lower right, approaching but still in the distance.
Composition: rabbit and dokkaebi center-left talking close, turtle climbing path lower-right, pine trees framing scene.
```

## 4) `scene-byeol-ending-clever.png` — 마지막 장. 기지의 토끼

```
Subject: The rabbit standing triumphantly on top of a large mountain boulder, laughing with paws raised. Sun rays around. Small forest animals (squirrels, birds, fox cubs) gathered below looking up admiringly. The empty Korean ocean horizon visible behind.
Composition: rabbit raised on boulder upper-center, animals fanning out below cheering, sun rays from upper-right.
```

## 5) `scene-byeol-ending-honor.png` — 마지막 장. 산과 바다를 잇는 친구

```
Subject: A shoreline where mountain meets sea. The rabbit and the soft-shell turtle sit side by side on rocks like old friends, with various herbs gathered between them. Behind them, the Dragon Palace silhouette in the sea on the right, and Korean pine mountains on the left. Cloud swirls.
Composition: rabbit and turtle centered facing each other warmly, herbs between them, palace silhouette right and mountains left.
```

---

## 받은 PNG 체크리스트 (별주부전 5장)

- [ ] `scene-byeol-start.png`
- [ ] `scene-byeol-palace.png`
- [ ] `scene-byeol-forest.png`
- [ ] `scene-byeol-ending-clever.png`
- [ ] `scene-byeol-ending-honor.png`

---

# 🪺 스토리 9 — 흥부와 놀부

마음 착한 흥부와 욕심 많은 놀부, 제비와 박씨의 이야기.

## 공통 베이스 프롬프트

```
Black-and-white coloring book page for all ages.
Style: simple flat line art, thick uniform black outlines (4–5px), bold clean strokes.
**Korean traditional folk-tale storybook style with warm rural village mood**, suitable for all ages.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color.
Pure white background. All regions MUST be fully enclosed by lines.
Output exactly 1024×1024 pixels, square aspect ratio, centered composition, generous white space.
```

---

## 1) `scene-heung-start.png` — 1장. 두 형제

```
Subject: A traditional Korean village split-scene. On the left, a small humble thatched-roof house with the kindhearted younger brother Heungbu in simple hanbok smiling outside. On the right, a grand tile-roofed house with the greedy elder brother Nolbu in fancier hanbok standing arms crossed. A swallow flies between the two houses overhead. A village path runs between them with flowers.
Composition: humble house left with Heungbu, grand house right with Nolbu, swallow flying upper-center connecting them, village path foreground.
```

## 2) `scene-heung-swallow.png` — 2장. 다친 제비

```
Subject: Heungbu's humble courtyard. The kindhearted brother kneels gently holding a small injured baby swallow with a bandaged broken leg. A nest visible on his thatched-roof eaves above. Children of Heungbu peek from the doorway watching. Wildflowers, a small clay water jar in the corner.
Composition: Heungbu kneeling center holding swallow, nest upper-right on eaves, children peeking from doorway left, flowers and jar foreground.
```

## 3) `scene-heung-greed.png` — 2장. 놀부의 욕심

```
Subject: Nolbu's fancy courtyard. The greedy elder brother kneels but with a calculating expression, holding a swallow with a broken leg he caused. Bandages and tools beside him. A tall tiled roof with many nests, a big traditional pot with grain. Nolbu's hand pauses mid-action as he looks at the swallow with conflict in his eyes.
Composition: Nolbu kneeling center with swallow, tools scattered, roof and nests upper, grain pot and decoration right side.
```

## 4) `scene-heung-ending-blessing.png` — 마지막 장. 박씨에서 핀 보물

```
Subject: A festive courtyard scene with a giant magic gourd (bak) cracked open in the center, spilling out silk rolls, gold coins, jewels, and ribbons. Heungbu and his family in traditional hanbok dance and laugh around it. Neighbors come from the village gate joining the feast. Paper lanterns above. A swallow circles in joy.
Composition: open gourd center-bottom spilling treasure, family dancing around, neighbors entering from right, swallow flying upper-left, lanterns above.
```

## 5) `scene-heung-ending-lesson.png` — 마지막 장. 박에서 나온 가르침

```
Subject: Nolbu's courtyard. A giant cracked-open gourd in the center, but instead of treasure, several friendly mischievous dokkaebi tumble out — gently shaking out his greedy heart in a humorous way. Nolbu sits on the ground stunned but slowly thoughtful, hand at his chin. His expression shifts from greed toward reflection. Lanterns and rooftop visible.
Composition: gourd center-bottom with dokkaebi spilling out, Nolbu on ground left side looking thoughtful, dokkaebi gesturing playfully, roof and lanterns upper.
```

---

## 받은 PNG 체크리스트 (흥부와 놀부 5장)

- [ ] `scene-heung-start.png`
- [ ] `scene-heung-swallow.png`
- [ ] `scene-heung-greed.png`
- [ ] `scene-heung-ending-blessing.png`
- [ ] `scene-heung-ending-lesson.png`

---

# 🪓 스토리 10 — 금도끼 은도끼

정직한 나무꾼과 산신령의 시험에 대한 한국 옛이야기.

## 공통 베이스 프롬프트

```
Black-and-white coloring book page for all ages.
Style: simple flat line art, thick uniform black outlines (4–5px), bold clean strokes.
**Korean traditional folk-tale storybook style with mountain and pond setting**, suitable for all ages.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color.
Pure white background. All regions MUST be fully enclosed by lines.
Output exactly 1024×1024 pixels, square aspect ratio, centered composition, generous white space.
```

---

## 1) `scene-axe-start.png` — 1장. 연못에 빠진 도끼

```
Subject: A calm mountain pond with reeds and water lilies at the edges. A Korean woodcutter in simple hanbok stands ALONE at the pond's bank with empty hands raised in shock, mouth slightly open. A small splash and concentric ripples spread on the water surface where his iron axe has just sunk. A few wood logs and a tree he was chopping behind him. Pine trees, mountain peaks in distance. NO mountain spirit, NO other figures — just the lonely "oh no" moment.
Composition: woodcutter center-left at bank with empty hands, ripples + small splash center of pond, chopped tree and logs behind him, mountains and pines background.
```

## 2) `scene-axe-trial.png` — 2장. 산신령의 시험

```
Subject: The Mountain Spirit (sansilryeong) — a wise old grandfather with long flowing white beard, traditional Korean hanbok robes and tall hat (galmot) — has emerged from the center of the pond, floating above the water. He holds up three axes side by side: a gold axe, a silver axe, and a plain iron axe. Sun rays shine down. The woodcutter stands at the bank, eyes wide with awe, hands clasped. Lotus blossoms on the water.
Composition: mountain spirit center floating above water with three axes held up in front of him, woodcutter on bank-left looking up in awe, sun rays from upper-right, lotus and ripples on water.
```

## 3) `scene-axe-temptation.png` — 2장. 황금의 유혹

```
Subject: The Mountain Spirit floats above the pond holding a single shimmering gold axe out toward the woodcutter, with the silver and iron axes held in his other hand. The gold axe sparkles with little star marks. The woodcutter looks conflicted — hand to chin, looking at the gold axe with longing eyes. Reflections of gold ripple in the water. Mountain peaks framing.
Composition: spirit right-center holding shimmering gold axe extended forward, woodcutter left looking longingly with hand to chin, silver+iron axes in spirit's other hand, mountain peaks in background.
```

## 4) `scene-axe-ending-share.png` — 마지막 장. 산이 가르친 선물

```
Subject: A peaceful village setting. The woodcutter sits on a low wooden platform sharing a tale with attentive village children gathered around him. Behind him on a small wooden shrine sit three axes — gold, silver, and iron — respectfully displayed. Soft sunshine. Thatched-roof houses in background. Mountain peaks behind.
Composition: woodcutter center-left on platform telling tale, children gathered around right, three axes on shrine upper-left background.
```

## 5) `scene-axe-ending-quiet.png` — 마지막 장. 다시 든 쇠도끼

```
Subject: The woodcutter walking up a mountain path alone at dawn, with only his simple iron axe over his shoulder. The expression on his face is quietly thoughtful, peaceful. Behind him the pond glimmers in the distance, empty. Pine trees, mist rising from the path. Mountain peaks above in soft cloud swirls.
Composition: woodcutter walking center-foreground up a path going away from viewer, pond small in lower-right background, mountains and mist above.
```

---

## 받은 PNG 체크리스트 (금도끼 은도끼 5장)

- [ ] `scene-axe-start.png`
- [ ] `scene-axe-trial.png`
- [ ] `scene-axe-temptation.png`
- [ ] `scene-axe-ending-share.png`
- [ ] `scene-axe-ending-quiet.png`
