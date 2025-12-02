const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'data.sqlite');
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('Failed to open database:', err);
    process.exit(1);
  }
  console.log('Database connected:', DB_PATH);
});

console.log('모든 게시글 조회 중...\n');

// 모든 게시글과 투표 현황 조회
db.all(
  `SELECT p.id, p.title, p.created_at,
   COALESCE(SUM(CASE WHEN v.vote_type = 'upvote' THEN 1 ELSE 0 END), 0) as upvotes,
   COALESCE(SUM(CASE WHEN v.vote_type = 'downvote' THEN 1 ELSE 0 END), 0) as downvotes
   FROM posts p
   LEFT JOIN votes v ON p.id = v.post_id
   GROUP BY p.id
   ORDER BY p.created_at ASC`,
  [],
  (err, rows) => {
    if (err) {
      console.error('Error finding posts:', err);
      db.close();
      return;
    }

    if (rows.length === 0) {
      console.log('게시글이 없습니다.');
      db.close();
      return;
    }

    console.log(`총 ${rows.length}개의 게시글:\n`);
    rows.forEach((row, index) => {
      const date = new Date(row.created_at);
      const netScore = row.upvotes - row.downvotes;
      console.log(`${index + 1}. ID: ${row.id}`);
      console.log(`   제목: ${row.title}`);
      console.log(`   찬성: ${row.upvotes}, 반대: ${row.downvotes}, 순점수: ${netScore}`);
      console.log(`   작성일: ${date.toLocaleString('ko-KR')}`);
      console.log('');
    });

    // 반대표가 있는 게시글 필터링
    const downvoted = rows.filter((row) => {
      const netScore = row.upvotes - row.downvotes;
      return netScore < 0 || (row.downvotes > 0 && row.upvotes === 0);
    });

    if (downvoted.length > 0) {
      console.log(`\n반대표를 받은 게시글 (${downvoted.length}개):`);
      downvoted.forEach((row, index) => {
        const date = new Date(row.created_at);
        const netScore = row.upvotes - row.downvotes;
        console.log(`${index + 1}. ID: ${row.id}`);
        console.log(`   제목: ${row.title}`);
        console.log(`   순점수: ${netScore}`);
        console.log(`   작성일: ${date.toLocaleString('ko-KR')}`);
      });
    }

    db.close();
  }
);

