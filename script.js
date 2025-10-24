// 3. JavaScript: 投票ロジックの定義
const genres = [
    "家電・カメラ",
    "ファッション",
    "食品・飲料",
    "本・コミック",
    "ゲーム・ホビー",
    "スポーツ・アウトドア",
    "DIY・工具",
    "ビューティー・ヘルス",
];

// 投票データをローカルストレージから読み込む。データがなければ初期値(0)を設定
const savedVotes = localStorage.getItem('genreVotes');
let votes = {};

if (savedVotes) {
    // ローカルストレージにデータがあればJSONとしてパースして使用
    votes = JSON.parse(savedVotes);
} else {
    // データがなければ初期値（0）を設定
    genres.forEach(genre => {
        votes[genre] = 0;
    });
}

const formDiv = document.getElementById('vote-form');
const resultsContainer = document.getElementById('results-container');
const submitButton = document.getElementById('submit-vote');
const voteMessage = document.getElementById('vote-message');

// 1. フォーム（サークル）の動的生成
function createGenreOptions() {
    genres.forEach((genre, index) => {
        const div = document.createElement('div');
        div.className = 'genre-option';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `genre_${index}`;
        checkbox.name = 'genre';
        checkbox.value = genre;

        const label = document.createElement('label');
        label.htmlFor = `genre_${index}`;
        label.textContent = genre; // 丸の中にジャンル名を表示

        div.appendChild(checkbox);
        div.appendChild(label);
        formDiv.appendChild(div);
    });
}

/* 2. 結果表示の更新
function updateResultsDisplay() {
    resultsContainer.innerHTML = '<h3>現在の投票結果</h3>'; // ヘッダーをクリアして再作成

    // 票数の多い順にソート
    const sortedResults = Object.entries(votes)
        .sort(([, a], [, b]) => b - a); // 降順ソート

    sortedResults.forEach(([genre, count]) => {
        const item = document.createElement('div');
        item.className = 'result-item';
        item.innerHTML = `<span class="result-name">${genre}</span> <span class="result-count">${count}票</span>`;
        resultsContainer.appendChild(item);
    });
}
*/
// 3. 投票処理
submitButton.addEventListener('click', () => {
    const checkedCheckboxes = document.querySelectorAll('input[name="genre"]:checked');

    if (checkedCheckboxes.length === 0) {
        alert('ジャンルを一つ以上選択してください！');
        return;
    }

    // 選択されたジャンルに投票を加算
    checkedCheckboxes.forEach(checkbox => {
        const genreName = checkbox.value;
        if (votes[genreName] !== undefined) {
            votes[genreName] += 1;
        }
        // チェックを外す (再投票しやすくするため)
        checkbox.checked = false;
    });

    // 投票済みフラグをセッションストレージに保存
    sessionStorage.setItem('hasVotedThisSession', 'true');

    // ローカルストレージに最新の投票データを保存
    localStorage.setItem('genreVotes', JSON.stringify(votes));

    // 投票ボタンを無効化する
    submitButton.disabled = true;
    submitButton.textContent = '投票済みです (ページを更新しても投票できません)';

    // 結果表示を更新
    updateResultsDisplay();

    // メッセージを表示
    voteMessage.style.display = 'block';
    setTimeout(() => {
        voteMessage.style.display = 'none';
    }, 3000);
});

// 初期処理
createGenreOptions();
updateResultsDisplay();

// ページ読み込み時に投票済みの状態をチェックし、ボタンを無効化
const isVoted = sessionStorage.getItem('hasVotedThisSession');
if (isVoted === 'true') {
    submitButton.disabled = true;
    submitButton.textContent = '投票済みです (ページを更新しても投票できません)';
}
