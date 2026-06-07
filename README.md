# React ToDo App

初めてのReactを活用したアプリケーション実績です。
React / TypeScript / Vite の学習として作成した、ToDoアプリです。
タスクの追加、完了、削除という基本操作を実装しながら、コンポーネント分割と状態管理の流れを確認することを目的にしました。

## 実装した機能

- 入力欄からタスクを追加
- Enter キーまたは追加ボタンで登録
- 空文字のタスクは追加できないように制御
- 未完了タスクと完了済みタスクを分けて表示
- 未完了タスクを完了済みに移動
- タスクの削除
- Headless UI の Dialog を使った概要モーダル
- react-icons を使った操作ボタンのアイコン表示

## 使用技術

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Headless UI
- react-icons
- ESLint

## セットアップ

```bash
npm install
```

## 開発サーバーの起動

```bash
npm run dev
```

起動後、ターミナルに表示されたローカルURLをブラウザで開きます。

## ビルド

```bash
npm run build
```

TypeScript のビルドチェックを行ったうえで、Vite で本番用ファイルを生成します。

## Lint

```bash
npm run lint
```

## 実装メモ

タスク一覧の状態管理には `useReducer` を使いました。
追加、削除、完了状態の切り替えを reducer に集約することで、状態更新の処理を `App.tsx` の中で追いやすくしています。

タスクの型は `Todo` として定義し、`status` には `active` と `completed` の2種類を持たせました。
表示側ではこの `status` を見て、未完了リストと完了済みリストに分けています。

入力コンポーネントでは `useRef` で入力値を参照し、`useState` でボタンの disabled 状態を管理しています。
日本語入力中の Enter で誤って登録されないように、`e.nativeEvent.isComposing` も確認しています。

## ディレクトリ構成

```txt
src/
  App.tsx
  App.css
  index.css
  main.tsx
  components/
    ActiveTodoList.tsx
    CompletedTodoList.tsx
    CreateTodoInput.tsx
    Modal.tsx
```
