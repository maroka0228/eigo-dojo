import { useState, useRef, useCallback } from "react";

// ── 単語リスト ────────────────────────────────────────────────
const WORD_LIST = [
  { en: "time", ja: "時間" }, { en: "year", ja: "年" }, { en: "people", ja: "人々" },
  { en: "way", ja: "方法・道" }, { en: "day", ja: "日" }, { en: "man", ja: "男性" },
  { en: "woman", ja: "女性" }, { en: "child", ja: "子供" }, { en: "world", ja: "世界" },
  { en: "life", ja: "人生・生活" }, { en: "hand", ja: "手" }, { en: "part", ja: "部分" },
  { en: "place", ja: "場所" }, { en: "case", ja: "場合・事例" }, { en: "week", ja: "週" },
  { en: "company", ja: "会社" }, { en: "system", ja: "システム" }, { en: "program", ja: "プログラム" },
  { en: "question", ja: "質問" }, { en: "government", ja: "政府" }, { en: "number", ja: "数" },
  { en: "night", ja: "夜" }, { en: "point", ja: "点・ポイント" }, { en: "home", ja: "家・故郷" },
  { en: "water", ja: "水" }, { en: "room", ja: "部屋" }, { en: "mother", ja: "母" },
  { en: "area", ja: "地域・エリア" }, { en: "money", ja: "お金" }, { en: "story", ja: "話・物語" },
  { en: "fact", ja: "事実" }, { en: "month", ja: "月" }, { en: "lot", ja: "たくさん" },
  { en: "right", ja: "右・正しい・権利" }, { en: "study", ja: "勉強・研究" }, { en: "book", ja: "本" },
  { en: "eye", ja: "目" }, { en: "job", ja: "仕事" }, { en: "word", ja: "言葉・単語" },
  { en: "business", ja: "ビジネス" }, { en: "issue", ja: "問題・課題" }, { en: "side", ja: "側・面" },
  { en: "kind", ja: "種類・親切な" }, { en: "head", ja: "頭" }, { en: "house", ja: "家" },
  { en: "service", ja: "サービス" }, { en: "friend", ja: "友人" }, { en: "father", ja: "父" },
  { en: "power", ja: "力・権力" }, { en: "hour", ja: "時間（1時間）" }, { en: "game", ja: "ゲーム" },
  { en: "line", ja: "線・列" }, { en: "end", ja: "終わり" }, { en: "never", ja: "決して〜ない" },
  { en: "last", ja: "最後の・続く" }, { en: "always", ja: "いつも" }, { en: "sometimes", ja: "時々" },
  { en: "together", ja: "一緒に" }, { en: "city", ja: "都市" }, { en: "small", ja: "小さい" },
  { en: "large", ja: "大きい" }, { en: "often", ja: "よく・しばしば" }, { en: "important", ja: "重要な" },
  { en: "young", ja: "若い" }, { en: "public", ja: "公共の" }, { en: "private", ja: "私的な" },
  { en: "real", ja: "本当の" }, { en: "best", ja: "最良の" }, { en: "free", ja: "自由な・無料の" },
  { en: "early", ja: "早い" }, { en: "able", ja: "できる" }, { en: "human", ja: "人間" },
  { en: "local", ja: "地元の" }, { en: "sure", ja: "確信している" }, { en: "clear", ja: "明確な" },
  { en: "hard", ja: "難しい・硬い" }, { en: "long", ja: "長い" }, { en: "high", ja: "高い" },
  { en: "low", ja: "低い" }, { en: "next", ja: "次の" }, { en: "open", ja: "開いている・開ける" },
  { en: "include", ja: "含む" }, { en: "continue", ja: "続ける" }, { en: "learn", ja: "学ぶ" },
  { en: "change", ja: "変える・変化" }, { en: "lead", ja: "導く・リード" }, { en: "understand", ja: "理解する" },
  { en: "watch", ja: "見る・時計" }, { en: "follow", ja: "従う・フォローする" }, { en: "stop", ja: "止まる・止める" },
  { en: "create", ja: "作る・創造する" }, { en: "speak", ja: "話す" }, { en: "read", ja: "読む" },
  { en: "spend", ja: "過ごす・使う" }, { en: "grow", ja: "育つ・成長する" }, { en: "walk", ja: "歩く" },
  { en: "win", ja: "勝つ" }, { en: "offer", ja: "提供する・申し出" }, { en: "remember", ja: "覚えている" },
  { en: "love", ja: "愛する・愛" }, { en: "consider", ja: "考慮する" }, { en: "appear", ja: "現れる・〜に見える" },
  { en: "buy", ja: "買う" }, { en: "wait", ja: "待つ" }, { en: "send", ja: "送る" },
  { en: "expect", ja: "期待する" }, { en: "build", ja: "建てる・構築する" }, { en: "stay", ja: "滞在する" },
  { en: "fall", ja: "落ちる・秋" }, { en: "cut", ja: "切る" }, { en: "reach", ja: "届く・達する" },
  { en: "remain", ja: "残る" }, { en: "suggest", ja: "提案する" }, { en: "raise", ja: "上げる・育てる" },
  { en: "pass", ja: "通る・渡す" }, { en: "sell", ja: "売る" }, { en: "require", ja: "必要とする" },
  { en: "decide", ja: "決める" }, { en: "carry", ja: "運ぶ" }, { en: "break", ja: "壊す・休憩" },
  { en: "sit", ja: "座る" }, { en: "eat", ja: "食べる" }, { en: "allow", ja: "許す・可能にする" },
  { en: "add", ja: "加える" }, { en: "design", ja: "デザイン・設計する" }, { en: "happen", ja: "起こる" },
  { en: "explain", ja: "説明する" }, { en: "manage", ja: "管理する・なんとかする" }, { en: "check", ja: "確認する" },
  { en: "lose", ja: "失う・負ける" }, { en: "choose", ja: "選ぶ" }, { en: "difficult", ja: "難しい" },
  { en: "beautiful", ja: "美しい" }, { en: "possible", ja: "可能な" }, { en: "different", ja: "異なる・違う" },
  { en: "special", ja: "特別な" }, { en: "natural", ja: "自然な" }, { en: "society", ja: "社会" },
  { en: "culture", ja: "文化" }, { en: "technology", ja: "技術" }, { en: "environment", ja: "環境" },
  { en: "experience", ja: "経験" }, { en: "information", ja: "情報" }, { en: "education", ja: "教育" },
  { en: "health", ja: "健康" }, { en: "relationship", ja: "関係" }, { en: "opportunity", ja: "機会" },
  { en: "challenge", ja: "挑戦・課題" }, { en: "success", ja: "成功" }, { en: "effort", ja: "努力" },
  { en: "knowledge", ja: "知識" }, { en: "attitude", ja: "態度" }, { en: "decision", ja: "決断" },
  { en: "solution", ja: "解決策" }, { en: "direction", ja: "方向・指示" }, { en: "freedom", ja: "自由" },
  { en: "pressure", ja: "圧力・プレッシャー" }, { en: "influence", ja: "影響" },
  { en: "responsibility", ja: "責任" }, { en: "communication", ja: "コミュニケーション" },
  { en: "ability", ja: "能力" }, { en: "purpose", ja: "目的" }, { en: "progress", ja: "進歩・進捗" },
  { en: "situation", ja: "状況" }, { en: "research", ja: "研究・調査" }, { en: "achievement", ja: "達成・業績" },
  { en: "dream", ja: "夢" }, { en: "fear", ja: "恐れ・恐怖" }, { en: "hope", ja: "希望" },
  { en: "trust", ja: "信頼・信用" }, { en: "memory", ja: "記憶" }, { en: "future", ja: "未来" },
  { en: "past", ja: "過去" }, { en: "moment", ja: "瞬間・ちょっとの間" }, { en: "truth", ja: "真実" },
  { en: "value", ja: "価値" }, { en: "language", ja: "言語" }, { en: "history", ja: "歴史" },
  { en: "nation", ja: "国家・国民" }, { en: "economy", ja: "経済" }, { en: "science", ja: "科学" },
  { en: "art", ja: "芸術・アート" }, { en: "music", ja: "音楽" }, { en: "sport", ja: "スポーツ" },
  { en: "travel", ja: "旅行" }, { en: "food", ja: "食べ物" }, { en: "animal", ja: "動物" },
  { en: "light", ja: "光・軽い" }, { en: "dark", ja: "暗い・闇" }, { en: "voice", ja: "声" },
  { en: "heart", ja: "心臓・心" }, { en: "mind", ja: "心・精神" }, { en: "body", ja: "体" },
  { en: "face", ja: "顔・向き合う" }, { en: "smile", ja: "笑顔・笑う" },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function playSound(type) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    if (type === "correct") {
      [523, 659, 784].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.connect(gain);
        osc.frequency.value = freq;
        osc.type = "sine";
        gain.gain.setValueAtTime(0.3, ctx.currentTime + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + i * 0.12 + 0.2);
        osc.start(ctx.currentTime + i * 0.12);
        osc.stop(ctx.currentTime + i * 0.12 + 0.2);
      });
    } else {
      const osc = ctx.createOscillator();
      osc.connect(gain);
      osc.frequency.value = 120;
      osc.type = "sawtooth";
      gain.gain.setValueAtTime(0.4, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.5);
    }
  } catch(e) {}
}

async function callClaude(userMessage, systemPrompt) {
  const resp = await fetch("/api/claude", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });
  const data = await resp.json();
  return data.content?.[0]?.text ?? "";
}

// ── Push-to-Talk hook (Web Speech API) ───────────────────────
// ボタンを押している間だけ録音し、離したら確定する
function usePushToTalk({ lang, onResult }) {
  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState("");
  const recRef = useRef(null);
  const finalRef = useRef("");

  const supported = !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const press = useCallback(() => {
    if (!supported) {
      alert("お使いのブラウザは音声入力に対応していません。\nChromeまたはEdgeをお使いください。");
      return;
    }
    if (recRef.current) return; // already running

    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.lang = lang;
    rec.interimResults = true;
    rec.continuous = true; // 押している間ずっと聞き続ける
    rec.maxAlternatives = 1;
    recRef.current = rec;
    finalRef.current = "";

    rec.onstart = () => { setListening(true); setInterim(""); };
    rec.onerror = (e) => {
      console.warn("speech error", e.error);
      setListening(false);
      setInterim("");
      recRef.current = null;
    };
    rec.onresult = (e) => {
      let fin = "";
      let inter = "";
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) fin += e.results[i][0].transcript;
        else inter += e.results[i][0].transcript;
      }
      finalRef.current = fin;
      setInterim(inter);
    };
    rec.onend = () => {
      setListening(false);
      setInterim("");
      recRef.current = null;
      if (finalRef.current) onResult(finalRef.current.trim());
    };
    rec.start();
  }, [lang, onResult, supported]);

  const release = useCallback(() => {
    if (recRef.current) {
      recRef.current.stop(); // onend fires → onResult called
    }
  }, []);

  return { listening, interim, supported, press, release };
}

// ── Push-to-Talk Button ───────────────────────────────────────
function PTTButton({ listening, interim, supported, onPress, onRelease, lang }) {
  const label = lang === "ja-JP" ? "日本語" : "English";
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, margin: "16px 0" }}>
      <button
        onMouseDown={onPress}
        onMouseUp={onRelease}
        onTouchStart={(e) => { e.preventDefault(); onPress(); }}
        onTouchEnd={(e) => { e.preventDefault(); onRelease(); }}
        style={{
          width: 120, height: 120,
          borderRadius: "50%",
          border: listening ? `3px solid ${C.red}` : `3px solid ${C.border}`,
          background: listening
            ? `radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(239,68,68,0.05) 100%)`
            : `radial-gradient(circle, #2a2a2a 0%, #1a1a1a 100%)`,
          color: listening ? C.red : C.muted,
          cursor: "pointer",
          display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center",
          fontSize: 40,
          gap: 4,
          transition: "all 0.15s",
          boxShadow: listening
            ? `0 0 0 8px rgba(239,68,68,0.15), 0 0 0 16px rgba(239,68,68,0.07)`
            : `0 4px 20px rgba(0,0,0,0.4)`,
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
      >
        {listening ? "⏹" : "🎤"}
      </button>
      <div style={{ fontSize: 12, color: listening ? C.red : C.muted, letterSpacing: 1, textAlign: "center" }}>
        {listening
          ? (interim ? `"${interim}"` : "聞いています…")
          : `押している間だけ録音 (${label})`}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState("home");
  return (
    <div style={styles.root}>
      <div style={styles.grain} />
      {screen === "home" && <HomeScreen onSelect={setScreen} />}
      {screen === "quiz" && <QuizScreen onBack={() => setScreen("home")} />}
      {screen === "sentence" && <SentenceScreen onBack={() => setScreen("home")} />}
    </div>
  );
}

// ── HOME ──────────────────────────────────────────────────────
function HomeScreen({ onSelect }) {
  return (
    <div style={styles.homeWrap}>
      <div style={styles.badge}>3,000 WORDS</div>
      <h1 style={styles.homeTitle}>
        <span style={styles.titleEn}>EIGO</span>
        <span style={styles.titleJa}>英語道場</span>
      </h1>
      <p style={styles.homeSubtitle}>本気で覚える英単語トレーニング</p>
      <div style={styles.modeGrid}>
        <button style={{ ...styles.modeCard, ...styles.modeCardBlue }} onClick={() => onSelect("quiz")}>
          <div style={styles.modeIcon}>⚡</div>
          <div style={styles.modeName}>単語クイズ</div>
          <div style={styles.modeDesc}>英語↔日本語<br />瞬間判定モード</div>
        </button>
        <button style={{ ...styles.modeCard, ...styles.modeCardAmber }} onClick={() => onSelect("sentence")}>
          <div style={styles.modeIcon}>✍️</div>
          <div style={styles.modeName}>例文チャレンジ</div>
          <div style={styles.modeDesc}>単語を使って<br />文章を作ろう</div>
        </button>
      </div>
      <div style={styles.homeFooter}>Powered by Claude AI · 🎤 音声入力対応 (Chrome推奨)</div>
    </div>
  );
}

// ── QUIZ ──────────────────────────────────────────────────────
function QuizScreen({ onBack }) {
  const [direction, setDirection] = useState("en2ja");
  const [words] = useState(() => shuffle(WORD_LIST));
  const [idx, setIdx] = useState(0);
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);

  const word = words[idx % words.length];
  const question = direction === "en2ja" ? word.en : word.ja;
  const answer = direction === "en2ja" ? word.ja : word.en;
  const speechLang = direction === "en2ja" ? "ja-JP" : "en-US";

  const { listening, interim, supported, press, release } = usePushToTalk({
    lang: speechLang,
    onResult: (text) => setInput(text),
  });

  function judge() {
    const val = input.trim();
    if (!val) return;
    const correct = direction === "en2ja"
      ? word.ja.split("・").some(a => val.toLowerCase() === a)
      : val.toLowerCase() === word.en.toLowerCase();
    if (correct) { playSound("correct"); setResult("correct"); setStreak(s => s + 1); }
    else { playSound("wrong"); setResult("wrong"); setStreak(0); }
    setTotal(t => t + 1);
  }

  function next() {
    setIdx(i => i + 1);
    setInput("");
    setResult(null);
  }

  return (
    <div style={styles.screenWrap}>
      <div style={styles.topBar}>
        <button style={styles.backBtn} onClick={onBack}>← ホーム</button>
        <div style={styles.stats}>🔥 {streak}連続　｜　{total}問</div>
        <button style={styles.dirBtn}
          onClick={() => { setDirection(d => d === "en2ja" ? "ja2en" : "en2ja"); setResult(null); setInput(""); }}>
          {direction === "en2ja" ? "EN→JA" : "JA→EN"}
        </button>
      </div>

      <div style={styles.quizCard}>
        <div style={styles.quizLabel}>{direction === "en2ja" ? "この英単語の意味は？" : "この日本語を英語で？"}</div>
        <div style={styles.questionWord}>{question}</div>

        {result === null ? (
          <>
            <input
              autoFocus
              style={styles.answerInput}
              placeholder={direction === "en2ja" ? "日本語で入力…" : "Type in English…"}
              value={interim || input}
              onChange={e => { if (!listening) setInput(e.target.value); }}
              onKeyDown={e => e.key === "Enter" && judge()}
              disabled={listening}
            />

            <PTTButton
              listening={listening} interim={interim} supported={supported}
              onPress={press} onRelease={release} lang={speechLang}
            />

            <button style={styles.judgeBtn} onClick={judge} disabled={listening || !input.trim()}>
              判定する
            </button>
          </>
        ) : (
          <div style={{ textAlign: "center", paddingTop: 8 }}>
            <div style={result === "correct" ? styles.resultCorrect : styles.resultWrong}>
              {result === "correct" ? "🎯 ピンポン！正解！" : "💥 ブブー！不正解"}
            </div>
            <div style={styles.yourAnswer}>あなたの答え：<strong>{input}</strong></div>
            <div style={styles.correctAnswer}>正解：<strong>{answer}</strong></div>
            <button style={styles.nextBtn} onClick={next}>次の問題 →</button>
          </div>
        )}
      </div>

      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${((idx % 50) / 50) * 100}%` }} />
      </div>
    </div>
  );
}

// ── SENTENCE ─────────────────────────────────────────────────
function SentenceScreen({ onBack }) {
  const [words] = useState(() => shuffle(WORD_LIST));
  const [idx, setIdx] = useState(0);
  const [sentence, setSentence] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const word = words[idx % words.length];

  const { listening, interim, supported, press, release } = usePushToTalk({
    lang: "en-US",
    onResult: (text) => setSentence(text),
  });

  async function submitSentence() {
    if (!sentence.trim()) return;
    setLoading(true);
    setFeedback(null);
    try {
      const system = `あなたは英語教師です。ユーザーが指定された英単語を使って文章を作ります。
以下の観点で評価し、日本語でフィードバックしてください：
1. 単語の使い方が文脈的に正しいか
2. 文法は正しいか
3. 自然な英語かどうか
返答はJSON形式で: { "correct": true/false, "score": 1-5, "good": "良い点", "improve": "改善点", "example": "より良い例文", "summary": "一言まとめ" }
JSONのみ返してください。`;
      const raw = await callClaude(`単語「${word.en}」（意味：${word.ja}）を使った文章：\n${sentence}`, system);
      const parsed = JSON.parse(raw.replace(/```json|```/g, "").trim());
      setFeedback(parsed);
      setCount(c => c + 1);
    } catch {
      setFeedback({ correct: false, score: 0, summary: "エラーが発生しました。もう一度お試しください。" });
    }
    setLoading(false);
  }

  function next() {
    setIdx(i => i + 1);
    setSentence("");
    setFeedback(null);
  }

  const stars = feedback
    ? "⭐".repeat(Math.max(0, feedback.score)) + "☆".repeat(Math.max(0, 5 - feedback.score))
    : "";

  return (
    <div style={styles.screenWrap}>
      <div style={styles.topBar}>
        <button style={styles.backBtn} onClick={onBack}>← ホーム</button>
        <div style={styles.stats}>✏️ {count}文作成</div>
        <div style={{ width: 80 }} />
      </div>

      <div style={styles.quizCard}>
        <div style={styles.quizLabel}>この単語を使って英文を作ろう</div>
        <div style={styles.questionWord}>{word.en}</div>
        <div style={styles.wordMeaning}>（{word.ja}）</div>

        {!feedback && (
          <>
            <textarea
              style={styles.sentenceInput}
              placeholder="ここに英文を入力、または下のボタンで話す…"
              value={interim || sentence}
              onChange={e => { if (!listening) setSentence(e.target.value); }}
              rows={3}
              disabled={loading || listening}
            />

            <PTTButton
              listening={listening} interim={interim} supported={supported}
              onPress={press} onRelease={release} lang="en-US"
            />

            <button style={styles.judgeBtn} onClick={submitSentence} disabled={loading || listening || !sentence.trim()}>
              {loading ? "AIが採点中…" : "送信して採点 ✓"}
            </button>

            {loading && (
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 16 }}>
                {[0,1,2].map(i => (
                  <span key={i} style={{ display: "inline-block", width: 8, height: 8, background: C.muted, borderRadius: "50%", animation: `bounce 1.2s ${i*0.2}s infinite` }} />
                ))}
              </div>
            )}
          </>
        )}

        {feedback && (
          <div style={styles.feedbackBox}>
            <div style={feedback.correct ? styles.resultCorrect : styles.resultWrong}>
              {feedback.correct ? "✅ 正しく使えています！" : "❌ 使い方に問題があります"}
            </div>
            <div style={{ textAlign: "center", fontSize: 13, color: C.muted, marginBottom: 8 }}>
              あなたの文：<em style={{ color: C.text }}>{sentence}</em>
            </div>
            <div style={styles.stars}>{stars}</div>
            <div style={styles.fbSummary}>{feedback.summary}</div>
            {feedback.good && (
              <div style={styles.fbSection}>
                <span style={styles.fbGoodLabel}>👍 良い点</span>
                <span>{feedback.good}</span>
              </div>
            )}
            {feedback.improve && (
              <div style={styles.fbSection}>
                <span style={styles.fbImpLabel}>💡 改善点</span>
                <span>{feedback.improve}</span>
              </div>
            )}
            {feedback.example && (
              <div style={styles.fbExample}>
                <div style={styles.fbExLabel}>📝 より良い例文</div>
                <div style={styles.fbExText}>{feedback.example}</div>
              </div>
            )}
            <button style={styles.nextBtn} onClick={next}>次の単語 →</button>
          </div>
        )}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════
const C = {
  bg: "#0d0d0d", surface: "#161616", card: "#1e1e1e", border: "#2a2a2a",
  blue: "#3b82f6", amber: "#f59e0b", green: "#22c55e", red: "#ef4444",
  text: "#f0f0f0", muted: "#888", accent: "#e2c97e",
};

const styles = {
  root: { minHeight: "100vh", background: C.bg, fontFamily: "'Noto Sans JP','Segoe UI',sans-serif", color: C.text, position: "relative", overflowX: "hidden" },
  grain: { position: "fixed", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`, pointerEvents: "none", zIndex: 0 },

  homeWrap: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 20px", position: "relative", zIndex: 1 },
  badge: { background: "transparent", border: `1px solid ${C.accent}`, color: C.accent, fontSize: 11, letterSpacing: 3, padding: "4px 14px", borderRadius: 2, marginBottom: 28, fontWeight: 600 },
  homeTitle: { margin: 0, lineHeight: 1, textAlign: "center", marginBottom: 12 },
  titleEn: { display: "block", fontSize: 72, fontWeight: 900, letterSpacing: -2, color: C.text, fontFamily: "'Georgia',serif" },
  titleJa: { display: "block", fontSize: 28, fontWeight: 700, color: C.accent, letterSpacing: 8, marginTop: 4 },
  homeSubtitle: { color: C.muted, fontSize: 14, letterSpacing: 2, marginBottom: 48 },
  modeGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, width: "100%", maxWidth: 480 },
  modeCard: { padding: "28px 20px", borderRadius: 12, border: "1px solid", cursor: "pointer", textAlign: "center", transition: "transform 0.15s", background: "transparent" },
  modeCardBlue: { borderColor: C.blue, boxShadow: `0 0 30px rgba(59,130,246,0.15)`, color: C.text },
  modeCardAmber: { borderColor: C.amber, boxShadow: `0 0 30px rgba(245,158,11,0.15)`, color: C.text },
  modeIcon: { fontSize: 32, marginBottom: 10 },
  modeName: { fontSize: 16, fontWeight: 700, marginBottom: 6, letterSpacing: 1 },
  modeDesc: { fontSize: 12, color: C.muted, lineHeight: 1.6 },
  homeFooter: { marginTop: 56, fontSize: 11, color: "#444", letterSpacing: 1 },

  screenWrap: { minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 16px 40px", position: "relative", zIndex: 1, maxWidth: 600, margin: "0 auto" },
  topBar: { width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, padding: "0 4px" },
  backBtn: { background: "transparent", border: `1px solid ${C.border}`, color: C.muted, padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 13 },
  dirBtn: { background: "transparent", border: `1px solid ${C.blue}`, color: C.blue, padding: "6px 14px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 700, letterSpacing: 1 },
  stats: { fontSize: 13, color: C.muted, letterSpacing: 1 },

  quizCard: { width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: "32px 28px", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" },
  quizLabel: { fontSize: 12, color: C.muted, letterSpacing: 2, marginBottom: 20, textAlign: "center" },
  questionWord: { fontSize: 52, fontWeight: 900, textAlign: "center", marginBottom: 8, letterSpacing: -1, fontFamily: "'Georgia',serif", color: C.accent },
  wordMeaning: { fontSize: 16, color: C.muted, textAlign: "center", marginBottom: 20 },

  answerInput: { width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", fontSize: 18, color: C.text, outline: "none", marginBottom: 4, boxSizing: "border-box" },
  sentenceInput: { width: "100%", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px", fontSize: 15, color: C.text, outline: "none", marginBottom: 4, boxSizing: "border-box", resize: "vertical", lineHeight: 1.6, fontFamily: "inherit" },

  judgeBtn: { width: "100%", padding: "14px", borderRadius: 8, background: C.blue, border: "none", color: "#fff", fontSize: 15, fontWeight: 700, cursor: "pointer", letterSpacing: 1, opacity: 1 },
  nextBtn: { marginTop: 20, width: "100%", padding: "12px", borderRadius: 8, background: "transparent", border: `1px solid ${C.border}`, color: C.text, fontSize: 14, fontWeight: 600, cursor: "pointer", letterSpacing: 1 },

  resultCorrect: { fontSize: 22, fontWeight: 700, color: C.green, marginBottom: 12, textAlign: "center" },
  resultWrong: { fontSize: 22, fontWeight: 700, color: C.red, marginBottom: 12, textAlign: "center" },
  yourAnswer: { color: C.muted, marginBottom: 6, textAlign: "center", fontSize: 14 },
  correctAnswer: { fontSize: 20, fontWeight: 700, color: C.accent, textAlign: "center", marginBottom: 8 },

  feedbackBox: { marginTop: 8 },
  stars: { fontSize: 18, textAlign: "center", marginBottom: 10 },
  fbSummary: { textAlign: "center", fontSize: 15, marginBottom: 16, fontWeight: 600, color: C.text },
  fbSection: { display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10, fontSize: 13, color: C.muted, lineHeight: 1.6 },
  fbGoodLabel: { flexShrink: 0, color: C.green, fontWeight: 700 },
  fbImpLabel: { flexShrink: 0, color: C.amber, fontWeight: 700 },
  fbExample: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px", marginTop: 12 },
  fbExLabel: { fontSize: 11, color: C.muted, letterSpacing: 2, marginBottom: 6 },
  fbExText: { fontSize: 15, color: C.accent, fontWeight: 600, fontStyle: "italic" },

  progressBar: { marginTop: 20, width: "100%", height: 3, background: C.border, borderRadius: 2 },
  progressFill: { height: "100%", background: C.blue, borderRadius: 2, transition: "width 0.4s ease" },
};

const styleEl = document.createElement("style");
styleEl.textContent = `
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&display=swap');
  * { box-sizing: border-box; }
  button:hover { opacity: 0.88; }
  input:focus, textarea:focus { border-color: #3b82f6 !important; }
  @keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
  button:disabled { opacity: 0.4; cursor: not-allowed; }
`;
document.head.appendChild(styleEl);
