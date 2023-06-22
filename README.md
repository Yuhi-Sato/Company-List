# Company-List
今までは、スプレッドシートやエクセルやテキストなど、部署や個人で管理していた企業情報を、1つにまとめた検索システム

# 概要
インターン選考の技術課題（技術課題概要.txt参照）として、ローカル環境で動作するアプリケーションを作成しました。

「Company-List」には以下の機能があります。
* ユーザー認証機能
* ユーザー権限管理機能
* 企業情報の閲覧・作成・編集・削除機能
* 会計情報の閲覧・作成・編集・削除機能
* 売上・利益・利益率のチャート化機能
* メモ機能

# アピールポイント
Railsのパッケージdevise,devise_token_authを利用して、JWTによるユーザー認証を実装し、事前にDBにユーザー情報が保管されているユーザーのみがログインできるようにしました。

Railsのパッケージcancancanを利用して、admin権限を持つユーザーのみが企業情報・会計情報の作成、編集、削除を行えるようにしました。

DBには、企業・会計・メモ・ユーザーのデータを保存していますが、データ矛盾が起きないように以下のようなDBを設計・実装しました(ER図.png参照)。
* カラムに一意制約を設ける
* 関係テーブルの親要素が削除された場合に子要素も削除する

# スクリーンショット
### ログイン画面
<img width="1438" alt="スクリーンショット 2023-06-22 10 30 00" src="https://github.com/Yuhi-Sato/Company-List/assets/91863685/ce12cc47-3402-4c42-8d0e-dc3fa2472161">

### 企業リスト画面
<img width="1440" alt="スクリーンショット 2023-06-22 10 52 22" src="https://github.com/Yuhi-Sato/Company-List/assets/91863685/53c54652-bd5c-49e0-b86e-0418c39b0c4f">

### 企業検索画面
<img width="1440" alt="スクリーンショット 2023-06-22 10 52 43" src="https://github.com/Yuhi-Sato/Company-List/assets/91863685/a741e8e6-6751-4af1-9172-43ec57e262f6">

### 売上・利益・利益率チャート画面
<img width="1437" alt="スクリーンショット 2023-06-22 11 21 11" src="https://github.com/Yuhi-Sato/Company-List/assets/91863685/1ca81309-9dbb-4b96-b24f-466903807047">

### 技術
* Rails　API(devise, devise_token_auth, cancancan)
* Next.js
* Chart.js
