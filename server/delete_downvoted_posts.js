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

console.log('반대표를 받은 게시글 찾는 중...');

// net_score가 -1인 게시글 찾기 (downvote 1개)
db.all(
  `SELECT p.id, p.title, p.created_at,
   COALESCE(SUM(CASE WHEN v.vote_type = 'upvote' THEN 1 ELSE 0 END), 0) as upvotes,
   COALESCE(SUM(CASE WHEN v.vote_type = 'downvote' THEN 1 ELSE 0 END), 0) as downvotes
   FROM posts p
   LEFT JOIN votes v ON p.id = v.post_id
   GROUP BY p.id
   HAVING (COALESCE(SUM(CASE WHEN v.vote_type = 'upvote' THEN 1 ELSE 0 END), 0) - 
           COALESCE(SUM(CASE WHEN v.vote_type = 'downvote' THEN 1 ELSE 0 END), 0)) = -1
   ORDER BY p.created_at ASC`,
  [],
  (err, rows) => {
    if (err) {
      console.error('Error finding posts:', err);
      db.close();
      return;
    }

    if (rows.length === 0) {
      console.log('반대표를 받은 게시글을 찾을 수 없습니다.');
      db.close();
      return;
    }

    console.log(`\n찾은 게시글 (${rows.length}개):`);
    rows.forEach((row) => {
      const date = new Date(row.created_at);
      const netScore = row.upvotes - row.downvotes;
      console.log(`- ID: ${row.id}`);
      console.log(`  제목: ${row.title}`);
      console.log(`  찬성: ${row.upvotes}, 반대: ${row.downvotes}, 순점수: ${netScore}`);
      console.log(`  작성일: ${date.toLocaleString('ko-KR')}`);
    });

    // 게시글 ID 목록
    const postIds = rows.map((row) => row.id);

    console.log('\n삭제 시작...');

    // 연관된 데이터도 함께 삭제
    db.serialize(() => {
      // 1. 투표 삭제
      db.run(
        'DELETE FROM votes WHERE post_id IN (' + postIds.map(() => '?').join(',') + ')',
        postIds,
        function(err) {
          if (err) {
            console.error('Error deleting votes:', err);
          } else {
            console.log(`✓ 투표 ${this.changes}개 삭제됨`);
          }
        }
      );

      // 2. 댓글 삭제
      db.run(
        'DELETE FROM comments WHERE post_id IN (' + postIds.map(() => '?').join(',') + ')',
        postIds,
        function(err) {
          if (err) {
            console.error('Error deleting comments:', err);
          } else {
            console.log(`✓ 댓글 ${this.changes}개 삭제됨`);
          }
        }
      );

      // 3. HOT 아이디어에서 제거
      db.run(
        'DELETE FROM hot_ideas WHERE post_id IN (' + postIds.map(() => '?').join(',') + ')',
        postIds,
        function(err) {
          if (err) {
            console.error('Error deleting from hot_ideas:', err);
          } else {
            console.log(`✓ HOT 아이디어 ${this.changes}개 제거됨`);
          }
        }
      );

      // 4. vote_history에서 제거
      db.run(
        'DELETE FROM vote_history WHERE post_id IN (' + postIds.map(() => '?').join(',') + ')',
        postIds,
        function(err) {
          if (err) {
            console.error('Error deleting from vote_history:', err);
          } else {
            console.log(`✓ 투표 내역 ${this.changes}개 제거됨`);
          }
        }
      );

      // 5. 게시글 삭제
      db.run(
        'DELETE FROM posts WHERE id IN (' + postIds.map(() => '?').join(',') + ')',
        postIds,
        function(err) {
          if (err) {
            console.error('Error deleting posts:', err);
          } else {
            console.log(`✓ 게시글 ${this.changes}개 삭제됨`);
          }

          console.log('\n✅ 삭제 완료!');
          db.close();
        }
      );
    });
  }
);

