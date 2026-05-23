# EIGO 英語道場

## セットアップ手順

### 1. このフォルダをGitHubにアップロード

### 2. Vercelにデプロイ
- vercel.com でGitHubと連携
- 「New Project」→ このリポジトリを選択
- 「Environment Variables」に以下を追加：
  - Key: `VITE_CLAUDE_API_KEY`
  - Value: あなたのAnthropicのAPIキー（https://console.anthropic.com）

### 3. Deploy ボタンを押す → 完成！

## ローカルで動かす場合
```
cp .env.example .env
# .envにAPIキーを入力
npm install
npm run dev
```
