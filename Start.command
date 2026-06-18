#!/bin/bash
# 마법사의 성 — 컬러링 북 시작 스크립트
# 더블클릭하면 dev 서버를 켜고 브라우저를 자동으로 엽니다.

set -e

cd "$(dirname "$0")"

PORT=3000
URL="http://localhost:$PORT"

echo ""
echo "  ✦ 마법사의 성 컬러링 북"
echo "  ────────────────────────"
echo "  📂 $(pwd)"
echo "  🌐 $URL"
echo ""

if [ ! -d "node_modules" ]; then
  echo "  📦 패키지 설치 중... (처음 한 번만)"
  npm install
  echo ""
fi

# 서버가 뜨면 브라우저 자동 열기 (서버가 떴는지 확인 후)
(
  for i in {1..30}; do
    sleep 1
    if curl -s -o /dev/null "$URL"; then
      open "$URL"
      break
    fi
  done
) &

echo "  🚀 서버 시작 — 종료하려면 Ctrl+C 또는 이 창을 닫으세요"
echo ""

npm run dev -- --port "$PORT"
