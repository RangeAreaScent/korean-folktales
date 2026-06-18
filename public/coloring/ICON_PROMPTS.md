# 스토리 카드 아이콘 프롬프트 (Gemini 등 AI 이미지 생성)

픽커 카드 위쪽의 이모지(🐯🌊...) 자리에 들어갈 **라인아트 미니 일러스트** 8개입니다. 카드를 작은 책 표지처럼 보이게 하는 게 목표.

저장 위치: `public/coloring/icons/{storyId}.png`

---

## 공통 베이스 프롬프트 (모든 아이콘에 붙여 쓰기)

```
Single-subject lineart icon for a story card. Centered composition with generous breathing room.
Style: thick uniform black outlines (5–6px), bold clean strokes, simple flat line art.
NO shading, NO gradients, NO gray fills, NO cross-hatching, NO color — pure black lines only.
TRANSPARENT background (PNG with alpha channel). All shapes fully enclosed by lines.
Iconic, instantly readable at small size (~128px). Friendly storybook tone matching a Korean folktale coloring book.
Output exactly 1024×1024 pixels, square, with the subject occupying roughly the centered 70% — leave clear margin.
```

**중요**: 배경은 **반드시 투명**이어야 카드의 따뜻한 그라데이션 위에 자연스럽게 얹힘. Gemini에서 "transparent background", "PNG with alpha" 표현을 꼭 포함.

위 베이스 + 아래 스토리별 프롬프트를 합쳐서 넣으세요.

---

## 1) `icons/folktale.png` — 해님 달님 (Sun and Moon)

```
Subject: Two small children (a brother and a sister wearing simple hanbok) climbing a long rope of light that descends from a smiling crescent moon and a smiling sun in the sky. The rope curls vertically through the frame.
Composition: rope as a vertical S-curve, sun upper-left, moon upper-right, two children near lower-middle, both looking up.
Mood: hopeful, gentle.
```

## 2) `icons/haenyeo.png` — 해녀와 인어 (Haenyeo and the Mermaid)

```
Subject: A traditional Korean haenyeo (woman freediver, hair tied back, simple diving suit) floating gracefully underwater next to a small mermaid with a long flowing fish-tail. A single round pearl between them, glowing softly with simple line sparkles.
Composition: haenyeo on the left, mermaid on the right, pearl centered between their hands. Curved water-ripple lines around them.
Mood: serene, friendly.
```

## 3) `icons/woodcutter.png` — 선녀와 나무꾼 (Fairy and Woodcutter)

```
Subject: A young woodcutter holding an axe over his shoulder, standing next to a calm deer with antlers. A celestial fairy in a flowing hanbok with feathered sleeves floats slightly above them, ribbon-like sleeves trailing.
Composition: woodcutter and deer grounded at the bottom, fairy hovering above, sleeves curling around the upper frame.
Mood: tender, magical.
```

## 4) `icons/dokkaebi.png` — 혹부리 영감 (Old Man and the Goblins)

```
Subject: A friendly old man with a small lump on his cheek, holding a traditional Korean drum or singing with mouth open, surrounded by two cute round dokkaebi goblins with single horns, wide eyes, and short clubs. A small crescent moon above.
Composition: old man centered, two goblins dancing on either side, moon top center.
Mood: playful, mischievous but kind.
```

## 5) `icons/kongjwi.png` — 콩쥐와 두꺼비 (Kongjwi and the Toad)

```
Subject: A gentle girl in hanbok kneeling beside a tall traditional Korean clay jar (onggi) with a visible crack down its side. A plump friendly toad sitting at the base of the jar, looking up at her. A single water droplet on the toad's back.
Composition: jar centered tall, girl kneeling on the left, toad at lower right base of jar.
Mood: warm, caring.
```

## 6) `icons/byeoljubu.png` — 별주부전 (Hare and the Dragon King)

```
Subject: A calm sea turtle (jara) with a domed shell carrying a curious hare on its back. The hare's long ears bend forward as it leans down to listen. A few simple curved lines below suggest a wave or palace gate arch behind.
Composition: turtle horizontal in the lower half, hare upright on the shell facing right, curved wave arc behind both.
Mood: witty, adventurous.
```

## 7) `icons/heungbu.png` — 흥부와 놀부 (Heungbu and Nolbu)

```
Subject: A small swallow with one wing wrapped in a tiny bandage, perched on the rim of an open gourd (bak — round pumpkin-like fruit split open) from which a thin curling vine emerges holding a single round coin or pearl.
Composition: gourd centered low, swallow perched on the rim, vine curling upward to the upper right with the coin hanging at its tip.
Mood: hopeful, kind.
```

## 8) `icons/woodman.png` — 금도끼 은도끼 (Gold and Silver Axe)

```
Subject: An old mountain spirit (sansillyeong — long flowing beard, traditional robes, calm smile) rising waist-up from a still round pond. He holds out two crossed axes side by side — one gold, one silver — but rendered as line art only (no fills). Small ripple circles in the pond around him.
Composition: spirit centered, axes crossed in front of his chest, ripples radiating outward at the pond surface.
Mood: wise, gentle.
```

---

## 받은 PNG 체크리스트

배치 위치: `public/coloring/icons/`

- [ ] `folktale.png`
- [ ] `haenyeo.png`
- [ ] `woodcutter.png`
- [ ] `dokkaebi.png`
- [ ] `kongjwi.png`
- [ ] `byeoljubu.png`
- [ ] `heungbu.png`
- [ ] `woodman.png`

---

## 통합 시 코드 변경 (참고)

8개 다 받으면 `src/lib/story.ts`에 `iconSrc: "/coloring/icons/{storyId}.png"` 필드 추가하고, `src/components/StoryPicker.tsx`의 `<span>{story.emoji}</span>`를 `<img>` 또는 emoji fallback으로 교체하면 됨.
