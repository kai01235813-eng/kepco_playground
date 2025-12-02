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

// 삭제할 게시글 제목
const titlesToDelete = [
  '가상발전소(VPP) 시뮬레이션',
  'V2G 시스템 시뮬레이션'
];

console.log('찾는 중...');

// 먼저 해당 게시글들을 찾기
db.all(
  'SELECT id, title, created_at FROM posts WHERE title IN (?, ?)',
  titlesToDelete,
  (err, rows) => {
    if (err) {
      console.error('Error finding posts:', err);
      db.close();
      return;
    }

    if (rows.length === 0) {
      console.log('해당 제목의 게시글을 찾을 수 없습니다.');
      db.close();
      return;
    }

    console.log(`\n찾은 게시글 (${rows.length}개):`);
    rows.forEach((row) => {
      const date = new Date(row.created_at);
      console.log(`- ID: ${row.id}`);
      console.log(`  제목: ${row.title}`);
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

      // 4. 게시글 삭제
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

