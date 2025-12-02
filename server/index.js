const express = require('express');
const cors = require('cors');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = process.env.PORT || 4000;
const DB_PATH = path.join(__dirname, 'data.sqlite');

// 개발 환경에서는 모든 오리진 허용 (Vite dev 서버, 다른 포트에서도 접근 가능)
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to open database:', err);
    process.exit(1);
  }
  // eslint-disable-next-line no-console
  console.log('Database connected:', DB_PATH);
});

db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS anonymous_posts (
      id TEXT PRIMARY KEY,
      category TEXT NOT NULL,
      content TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS playground_apps (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      description TEXT,
      created_at INTEGER NOT NULL
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS votes (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL,
      voter_id TEXT NOT NULL,
      vote_type TEXT NOT NULL CHECK(vote_type IN ('upvote', 'downvote')),
      created_at INTEGER NOT NULL,
      UNIQUE(post_id, voter_id)
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at INTEGER NOT NULL
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      post_id TEXT NOT NULL,
      content TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS users (
      employee_id TEXT PRIMARY KEY,
      password TEXT NOT NULL,
      name TEXT NOT NULL,
      coin_balance INTEGER DEFAULT 0,
      created_at INTEGER NOT NULL
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS vote_history (
      id TEXT PRIMARY KEY,
      employee_id TEXT NOT NULL,
      post_id TEXT NOT NULL,
      post_title TEXT NOT NULL,
      vote_type TEXT NOT NULL,
      coins_earned INTEGER DEFAULT 50,
      created_at INTEGER NOT NULL
    )`
  );

  db.run(
    `CREATE TABLE IF NOT EXISTS daily_attendance (
      id TEXT PRIMARY KEY,
      employee_id TEXT NOT NULL,
      attendance_date TEXT NOT NULL,
      created_at INTEGER NOT NULL,
      UNIQUE(employee_id, attendance_date)
    )`
  );

  db.get('SELECT COUNT(*) as count FROM anonymous_posts', (err, row) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('DB count error', err);
      return;
    }
    if (row.count === 0) {
      const seedPosts = [
        {
          id: `seed-${Date.now()}-1`,
          category: 'suggestion',
          content: '예시) 익명으로 간단한 건의를 남겨보세요. 예: 다크 모드가 있으면 좋겠습니다!',
          password: '1234',
          created_at: Date.now() - 1000 * 60 * 30
        },
        {
          id: `seed-${Date.now()}-2`,
          category: 'proposal',
          content:
            '예시) 홈페이지 운영 방향에 대한 제안입니다. 메인 페이지에 실시간 기여 순위를 보여주면 참여가 더 활발해질 것 같아요.',
          password: '1234',
          created_at: Date.now() - 1000 * 60 * 20
        }
      ];
      const stmt = db.prepare(
        'INSERT INTO anonymous_posts (id, category, content, password, created_at) VALUES (?, ?, ?, ?, ?)'
      );
      seedPosts.forEach((p) => {
        stmt.run(p.id, p.category, p.content, p.password, p.created_at);
      });
      stmt.finalize();
    }
  });

  db.get('SELECT COUNT(*) as count FROM playground_apps', (err, row) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('DB playground count error', err);
      return;
    }
    if (row.count === 0) {
      const now = Date.now();
      const seedApps = [
        {
          id: `pg-${now}-1`,
          title: 'KEPCO V2G Game',
          url: 'https://kepco-v2g-game.vercel.app/',
          description:
            '전기차와 전력망(V2G) 개념을 게임으로 체험할 수 있는 예시 프로젝트입니다.',
          created_at: now - 1000 * 60 * 60
        },
        {
          id: `pg-${now}-2`,
          title: 'KEPCO VPP Game',
          url: 'https://vpp-game.vercel.app/',
          description:
            '가상발전소(VPP)와 주파수 제어 개념을 학습할 수 있는 시뮬레이터 예시입니다.',
          created_at: now - 1000 * 60 * 30
        }
      ];
      const stmt = db.prepare(
        'INSERT INTO playground_apps (id, title, url, description, created_at) VALUES (?, ?, ?, ?, ?)'
      );
      seedApps.forEach((a) => {
        stmt.run(a.id, a.title, a.url, a.description, a.created_at);
      });
      stmt.finalize();
    }
  });

  db.get('SELECT COUNT(*) as count FROM posts', (err, row) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('DB posts count error', err);
      return;
    }
    if (row.count === 0) {
      const now = Date.now();
      const seedPosts = [
        {
          id: `post-${now}-1`,
          title: 'V2G 시스템 시뮬레이션',
          content:
            'KEPCO V2G Game을 통해 전기차와 전력망(V2G) 상호작용을 체험할 수 있는 아이디어입니다.\n\n데모 링크: https://kepco-v2g-game.vercel.app/',
          password: '1234',
          created_at: now - 1000 * 60 * 60
        },
        {
          id: `post-${now}-2`,
          title: '가상발전소(VPP) 시뮬레이션',
          content:
            'KEPCO VPP Game으로 가상발전소(VPP)와 주파수 제어 개념을 직관적으로 익힐 수 있는 아이디어입니다.\n\n데모 링크: https://vpp-game.vercel.app/',
          password: '1234',
          created_at: now - 1000 * 60 * 30
        }
      ];
      const stmt = db.prepare(
        'INSERT INTO posts (id, title, content, password, created_at) VALUES (?, ?, ?, ?, ?)'
      );
      seedPosts.forEach((p) => {
        stmt.run(p.id, p.title, p.content, p.password, p.created_at);
      });
      stmt.finalize();
    }
  });
});

// 사용자 인증 API
app.post('/api/auth/signup', (req, res) => {
  const { employeeId, password, name } = req.body;
  if (!employeeId || !password || !name) {
    return res.status(400).json({ error: '사번, 비밀번호, 이름을 모두 입력해주세요.' });
  }
  db.get('SELECT employee_id FROM users WHERE employee_id = ?', [employeeId], (err, row) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({ error: 'DB error' });
    }
    if (row) {
      return res.status(409).json({ error: '이미 등록된 사번입니다.' });
    }
    db.run(
      'INSERT INTO users (employee_id, password, name, coin_balance, created_at) VALUES (?, ?, ?, ?, ?)',
      [employeeId, password, name, 0, Date.now()],
      (insertErr) => {
        if (insertErr) {
          // eslint-disable-next-line no-console
          console.error(insertErr);
          return res.status(500).json({ error: 'DB error' });
        }
        return res.status(201).json({ employeeId, name, coinBalance: 0 });
      }
    );
  });
});

app.post('/api/auth/login', (req, res) => {
  const { employeeId, password } = req.body;
  if (!employeeId || !password) {
    return res.status(400).json({ error: '사번과 비밀번호를 입력해주세요.' });
  }
  db.get(
    'SELECT employee_id, name, coin_balance FROM users WHERE employee_id = ? AND password = ?',
    [employeeId, password],
    (err, row) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      if (!row) {
        return res.status(401).json({ error: '사번 또는 비밀번호가 일치하지 않습니다.' });
      }
      return res.json({
        employeeId: row.employee_id,
        name: row.name,
        coinBalance: row.coin_balance
      });
    }
  );
});

// 투표 내역 API
app.get('/api/vote-history/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  db.all(
    'SELECT id, post_id, post_title, vote_type, coins_earned, created_at FROM vote_history WHERE employee_id = ? ORDER BY created_at DESC LIMIT 10',
    [employeeId],
    (err, rows) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      return res.json(rows);
    }
  );
});

app.get('/api/anonymous-posts', (req, res) => {
  const { category } = req.query;
  const params = [];
  let query = 'SELECT id, category, content, password, created_at as createdAt FROM anonymous_posts';

  if (category === 'suggestion' || category === 'proposal') {
    query += ' WHERE category = ?';
    params.push(category);
  }

  query += ' ORDER BY created_at DESC';

  db.all(query, params, (err, rows) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({ error: 'DB error' });
    }
    return res.json(rows);
  });
});

app.post('/api/anonymous-posts', (req, res) => {
  const { category, content, password } = req.body;
  if (
    (category !== 'suggestion' && category !== 'proposal') ||
    !content ||
    !password
  ) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const id = `${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const createdAt = Date.now();

  db.run(
    'INSERT INTO anonymous_posts (id, category, content, password, created_at) VALUES (?, ?, ?, ?, ?)',
    [id, category, content, password, createdAt],
    (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      return res.status(201).json({
        id,
        category,
        content,
        password,
        createdAt
      });
    }
  );
});

app.put('/api/anonymous-posts/:id', (req, res) => {
  const { id } = req.params;
  const { content, password } = req.body;
  if (!content || !password) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  db.get(
    'SELECT password FROM anonymous_posts WHERE id = ?',
    [id],
    (err, row) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if (row.password !== password) {
        return res.status(403).json({ error: 'Invalid password' });
      }

      db.run(
        'UPDATE anonymous_posts SET content = ? WHERE id = ?',
        [content, id],
        (updateErr) => {
          if (updateErr) {
            // eslint-disable-next-line no-console
            console.error(updateErr);
            return res.status(500).json({ error: 'DB error' });
          }
          return res.json({ id, content });
        }
      );
    }
  );
});

app.delete('/api/anonymous-posts/:id', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }

  db.get(
    'SELECT password FROM anonymous_posts WHERE id = ?',
    [id],
    (err, row) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Post not found' });
      }
      if (row.password !== password) {
        return res.status(403).json({ error: 'Invalid password' });
      }

      db.run(
        'DELETE FROM anonymous_posts WHERE id = ?',
        [id],
        (deleteErr) => {
          if (deleteErr) {
            // eslint-disable-next-line no-console
            console.error(deleteErr);
            return res.status(500).json({ error: 'DB error' });
          }
          return res.status(204).send();
        }
      );
    }
  );
});

app.get('/api/playground-apps', (req, res) => {
  db.all(
    'SELECT id, title, url, description, created_at as createdAt FROM playground_apps ORDER BY created_at DESC',
    [],
    (err, rows) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      return res.json(rows);
    }
  );
});

app.post('/api/playground-apps', (req, res) => {
  const { title, url, description } = req.body;
  if (!title || !url) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const id = `pg-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const createdAt = Date.now();
  db.run(
    'INSERT INTO playground_apps (id, title, url, description, created_at) VALUES (?, ?, ?, ?, ?)',
    [id, title, url, description || '', createdAt],
    (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      return res.status(201).json({
        id,
        title,
        url,
        description: description || '',
        createdAt
      });
    }
  );
});

app.get('/api/posts', (req, res) => {
  db.all(
    `SELECT p.id, p.title, p.content, p.created_at as createdAt,
     COALESCE(SUM(CASE WHEN v.vote_type = 'upvote' THEN 1 ELSE 0 END), 0) as upvotes,
     COALESCE(SUM(CASE WHEN v.vote_type = 'downvote' THEN 1 ELSE 0 END), 0) as downvotes
     FROM posts p
     LEFT JOIN votes v ON p.id = v.post_id
     GROUP BY p.id
     ORDER BY p.created_at DESC`,
    [],
    (err, rows) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      const postsWithNetScore = rows.map((row) => ({
        ...row,
        upvotes: row.upvotes || 0,
        downvotes: row.downvotes || 0,
        net_score: (row.upvotes || 0) - (row.downvotes || 0)
      }));
      return res.json(postsWithNetScore);
    }
  );
});

app.post('/api/posts', (req, res) => {
  const { title, content, password } = req.body;
  if (!title || !content || !password) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const id = `post-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const createdAt = Date.now();
  db.run(
    'INSERT INTO posts (id, title, content, password, created_at) VALUES (?, ?, ?, ?, ?)',
    [id, title, content, password, createdAt],
    (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      return res.status(201).json({ id, title, content, createdAt });
    }
  );
});

app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.get(
    `SELECT p.id, p.title, p.content, p.created_at as createdAt,
     COALESCE(SUM(CASE WHEN v.vote_type = 'upvote' THEN 1 ELSE 0 END), 0) as upvotes,
     COALESCE(SUM(CASE WHEN v.vote_type = 'downvote' THEN 1 ELSE 0 END), 0) as downvotes
     FROM posts p
     LEFT JOIN votes v ON p.id = v.post_id
     WHERE p.id = ?
     GROUP BY p.id`,
    [id],
    (err, row) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      if (!row) {
        return res.status(404).json({ error: 'Post not found' });
      }
      const upvotes = row.upvotes || 0;
      const downvotes = row.downvotes || 0;
      return res.json({
        ...row,
        upvotes,
        downvotes,
        net_score: upvotes - downvotes
      });
    }
  );
});

app.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, password } = req.body;
  if (!title || !content || !password) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  db.get('SELECT password FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({ error: 'DB error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (row.password !== password) {
      return res.status(403).json({ error: 'Invalid password' });
    }
    db.run(
      'UPDATE posts SET title = ?, content = ? WHERE id = ?',
      [title, content, id],
      (updateErr) => {
        if (updateErr) {
          // eslint-disable-next-line no-console
          console.error(updateErr);
          return res.status(500).json({ error: 'DB error' });
        }
        return res.json({ id, title, content });
      }
    );
  });
});

app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }
  db.get('SELECT password FROM posts WHERE id = ?', [id], (err, row) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({ error: 'DB error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Post not found' });
    }
    if (row.password !== password) {
      return res.status(403).json({ error: 'Invalid password' });
    }
    db.run('DELETE FROM posts WHERE id = ?', [id], (deleteErr) => {
      if (deleteErr) {
        // eslint-disable-next-line no-console
        console.error(deleteErr);
        return res.status(500).json({ error: 'DB error' });
      }
      return res.status(204).send();
    });
  });
});

app.get('/api/comments', (req, res) => {
  const { postId } = req.query;
  if (!postId) {
    return res.status(400).json({ error: 'postId is required' });
  }
  db.all(
    'SELECT id, post_id as postId, content, created_at as createdAt FROM comments WHERE post_id = ? ORDER BY created_at ASC',
    [postId],
    (err, rows) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      return res.json(rows);
    }
  );
});

app.post('/api/comments', (req, res) => {
  const { postId, content, password } = req.body;
  if (!postId || !content || !password) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  const id = `comment-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const createdAt = Date.now();
  db.run(
    'INSERT INTO comments (id, post_id, content, password, created_at) VALUES (?, ?, ?, ?, ?)',
    [id, postId, content, password, createdAt],
    (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      return res
        .status(201)
        .json({ id, postId, content, createdAt });
    }
  );
});

app.put('/api/comments/:id', (req, res) => {
  const { id } = req.params;
  const { content, password } = req.body;
  if (!content || !password) {
    return res.status(400).json({ error: 'Invalid payload' });
  }
  db.get('SELECT password FROM comments WHERE id = ?', [id], (err, row) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({ error: 'DB error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (row.password !== password) {
      return res.status(403).json({ error: 'Invalid password' });
    }
    db.run(
      'UPDATE comments SET content = ? WHERE id = ?',
      [content, id],
      (updateErr) => {
        if (updateErr) {
          // eslint-disable-next-line no-console
          console.error(updateErr);
          return res.status(500).json({ error: 'DB error' });
        }
        return res.json({ id, content });
      }
    );
  });
});

app.post('/api/posts/:id/vote', (req, res) => {
  const { id } = req.params;
  const { voterId, voteType, employeeId } = req.body;
  // eslint-disable-next-line no-console
  console.log(`[VOTE] POST /api/posts/${id}/vote`, { voterId, voteType, employeeId });
  if (!voterId || !voteType) {
    // eslint-disable-next-line no-console
    console.log('[VOTE] Missing voterId or voteType');
    return res.status(400).json({ error: 'voterId and voteType are required' });
  }
  if (voteType !== 'upvote' && voteType !== 'downvote') {
    // eslint-disable-next-line no-console
    console.log('[VOTE] Invalid voteType:', voteType);
    return res.status(400).json({ error: 'voteType must be "upvote" or "downvote"' });
  }
  // 게시글이 존재하는지 확인
  db.get('SELECT id FROM posts WHERE id = ?', [id], (err, post) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('[VOTE] DB error checking post:', err);
      return res.status(500).json({ error: 'DB error' });
    }
    if (!post) {
      // eslint-disable-next-line no-console
      console.log('[VOTE] Post not found:', id);
      return res.status(404).json({ error: 'Post not found' });
    }
    // 이미 투표했는지 확인
    db.get(
      'SELECT id, vote_type FROM votes WHERE post_id = ? AND voter_id = ?',
      [id, voterId],
      (voteErr, existingVote) => {
        if (voteErr) {
          // eslint-disable-next-line no-console
          console.error(voteErr);
          return res.status(500).json({ error: 'DB error' });
        }
        if (existingVote) {
          // 같은 타입 투표면 에러, 다른 타입이면 업데이트
          if (existingVote.vote_type === voteType) {
            return res.status(409).json({ error: 'Already voted with same type' });
          }
          // 기존 투표 삭제하고 새 투표 추가 (또는 업데이트)
          db.run(
            'DELETE FROM votes WHERE post_id = ? AND voter_id = ?',
            [id, voterId],
            (deleteErr) => {
              if (deleteErr) {
                // eslint-disable-next-line no-console
                console.error(deleteErr);
                return res.status(500).json({ error: 'DB error' });
              }
              // 새 투표 추가
              const voteId = `vote-${Date.now()}-${Math.random().toString(16).slice(2)}`;
              db.run(
                'INSERT INTO votes (id, post_id, voter_id, vote_type, created_at) VALUES (?, ?, ?, ?, ?)',
                [voteId, id, voterId, voteType, Date.now()],
                (insertErr) => {
                  if (insertErr) {
                    // eslint-disable-next-line no-console
                    console.error(insertErr);
                    return res.status(500).json({ error: 'DB error' });
                  }
                  // 투표 수 조회
                  db.get(
                    `SELECT 
                      COALESCE(SUM(CASE WHEN vote_type = 'upvote' THEN 1 ELSE 0 END), 0) as upvotes,
                      COALESCE(SUM(CASE WHEN vote_type = 'downvote' THEN 1 ELSE 0 END), 0) as downvotes
                      FROM votes WHERE post_id = ?`,
                    [id],
                    (countErr, countRow) => {
                      if (countErr) {
                        // eslint-disable-next-line no-console
                        console.error(countErr);
                        return res.status(500).json({ error: 'DB error' });
                      }
                      const upvotes = countRow.upvotes || 0;
                      const downvotes = countRow.downvotes || 0;
                      const net_score = upvotes - downvotes;
                      
                      // 로그인한 사용자면 코인 지급 및 투표 내역 저장
                      if (employeeId) {
                        const historyId = `vh-${Date.now()}-${Math.random().toString(16).slice(2)}`;
                        db.run(
                          'INSERT INTO vote_history (id, employee_id, post_id, post_title, vote_type, coins_earned, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
                          [historyId, employeeId, id, post.title, voteType, 50, Date.now()],
                          (historyErr) => {
                            if (historyErr) {
                              // eslint-disable-next-line no-console
                              console.error('[VOTE] History insert error:', historyErr);
                            }
                            // 코인 지급
                            db.run(
                              'UPDATE users SET coin_balance = coin_balance + ? WHERE employee_id = ?',
                              [50, employeeId],
                              (coinErr) => {
                                if (coinErr) {
                                  // eslint-disable-next-line no-console
                                  console.error('[VOTE] Coin update error:', coinErr);
                                }
                              }
                            );
                          }
                        );
                      }
                      
                      return res.json({
                        postId: id,
                        upvotes,
                        downvotes,
                        net_score
                      });
                    }
                  );
                }
              );
            }
          );
          return;
        }
        // 새 투표 추가
        const voteId = `vote-${Date.now()}-${Math.random().toString(16).slice(2)}`;
        db.run(
          'INSERT INTO votes (id, post_id, voter_id, vote_type, created_at) VALUES (?, ?, ?, ?, ?)',
          [voteId, id, voterId, voteType, Date.now()],
          (insertErr) => {
            if (insertErr) {
              // eslint-disable-next-line no-console
              console.error(insertErr);
              return res.status(500).json({ error: 'DB error' });
            }
            // 투표 수 조회
            db.get(
              `SELECT 
                COALESCE(SUM(CASE WHEN vote_type = 'upvote' THEN 1 ELSE 0 END), 0) as upvotes,
                COALESCE(SUM(CASE WHEN vote_type = 'downvote' THEN 1 ELSE 0 END), 0) as downvotes
                FROM votes WHERE post_id = ?`,
              [id],
              (countErr, countRow) => {
                if (countErr) {
                  // eslint-disable-next-line no-console
                  console.error(countErr);
                  return res.status(500).json({ error: 'DB error' });
                }
                const upvotes = countRow.upvotes || 0;
                const downvotes = countRow.downvotes || 0;
                const net_score = upvotes - downvotes;
                
                // 로그인한 사용자면 코인 지급 및 투표 내역 저장
                if (employeeId) {
                  const historyId = `vh-${Date.now()}-${Math.random().toString(16).slice(2)}`;
                  db.run(
                    'INSERT INTO vote_history (id, employee_id, post_id, post_title, vote_type, coins_earned, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [historyId, employeeId, id, post.title, voteType, 50, Date.now()],
                    (historyErr) => {
                      if (historyErr) {
                        // eslint-disable-next-line no-console
                        console.error('[VOTE] History insert error:', historyErr);
                      }
                      // 코인 지급
                      db.run(
                        'UPDATE users SET coin_balance = coin_balance + ? WHERE employee_id = ?',
                        [50, employeeId],
                        (coinErr) => {
                          if (coinErr) {
                            // eslint-disable-next-line no-console
                            console.error('[VOTE] Coin update error:', coinErr);
                          }
                        }
                      );
                    }
                  );
                }
                
                return res.json({
                  postId: id,
                  upvotes,
                  downvotes,
                  net_score
                });
              }
            );
          }
        );
      }
    );
  });
});

app.get('/api/posts/:id/votes', (req, res) => {
  const { id } = req.params;
  db.get(
    `SELECT 
      COALESCE(SUM(CASE WHEN vote_type = 'upvote' THEN 1 ELSE 0 END), 0) as upvotes,
      COALESCE(SUM(CASE WHEN vote_type = 'downvote' THEN 1 ELSE 0 END), 0) as downvotes
      FROM votes WHERE post_id = ?`,
    [id],
    (err, row) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
        return res.status(500).json({ error: 'DB error' });
      }
      const upvotes = row.upvotes || 0;
      const downvotes = row.downvotes || 0;
      const net_score = upvotes - downvotes;
      return res.json({
        postId: id,
        upvotes,
        downvotes,
        net_score
      });
    }
  );
});

app.delete('/api/comments/:id', (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ error: 'Password required' });
  }
  db.get('SELECT password FROM comments WHERE id = ?', [id], (err, row) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
      return res.status(500).json({ error: 'DB error' });
    }
    if (!row) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    if (row.password !== password) {
      return res.status(403).json({ error: 'Invalid password' });
    }
    db.run('DELETE FROM comments WHERE id = ?', [id], (deleteErr) => {
      if (deleteErr) {
        // eslint-disable-next-line no-console
        console.error(deleteErr);
        return res.status(500).json({ error: 'DB error' });
      }
      return res.status(204).send();
    });
  }  );
});

// 출석체크 상태 확인 API
app.get('/api/attendance/status/:employeeId', (req, res) => {
  const { employeeId } = req.params;
  
  // 한국 시간대로 오늘 날짜 계산
  const now = new Date();
  const koreaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const today = koreaTime.toISOString().split('T')[0]; // YYYY-MM-DD 형식

  db.get(
    'SELECT id FROM daily_attendance WHERE employee_id = ? AND attendance_date = ?',
    [employeeId, today],
    (err, row) => {
      if (err) {
        console.error('[ATTENDANCE] Status check error:', err);
        return res.status(500).json({ error: 'DB error: ' + err.message });
      }
      return res.json({ checked: !!row });
    }
  );
});

// 출석체크 처리 API
app.post('/api/attendance/check', (req, res) => {
  const { employeeId } = req.body;
  console.log('[ATTENDANCE] POST /api/attendance/check', { employeeId });
  
  if (!employeeId) {
    console.log('[ATTENDANCE] Missing employeeId');
    return res.status(400).json({ error: 'employeeId is required' });
  }

  // 한국 시간대로 오늘 날짜 계산
  const now = new Date();
  const koreaTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const today = koreaTime.toISOString().split('T')[0]; // YYYY-MM-DD 형식
  
  console.log('[ATTENDANCE] Today date:', today);
  
  const id = `attendance-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const createdAt = Date.now();

  // 사용자가 존재하는지 확인
  db.get('SELECT employee_id FROM users WHERE employee_id = ?', [employeeId], (userErr, user) => {
    if (userErr) {
      console.error('[ATTENDANCE] User check error:', userErr);
      return res.status(500).json({ error: 'DB error: ' + userErr.message });
    }
    
    if (!user) {
      console.log('[ATTENDANCE] User not found:', employeeId);
      return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
    }

    // 오늘 이미 출석체크 했는지 확인
    db.get(
      'SELECT id FROM daily_attendance WHERE employee_id = ? AND attendance_date = ?',
      [employeeId, today],
      (err, existing) => {
        if (err) {
          console.error('[ATTENDANCE] Check existing error:', err);
          return res.status(500).json({ error: 'DB error: ' + err.message });
        }

        if (existing) {
          console.log('[ATTENDANCE] Already checked today');
          return res.status(409).json({ error: '오늘은 이미 출석체크를 완료했습니다.' });
        }

        // 출석체크 기록 저장
        db.run(
          'INSERT INTO daily_attendance (id, employee_id, attendance_date, created_at) VALUES (?, ?, ?, ?)',
          [id, employeeId, today, createdAt],
          (insertErr) => {
            if (insertErr) {
              console.error('[ATTENDANCE] Insert error:', insertErr);
              return res.status(500).json({ error: 'DB error: ' + insertErr.message });
            }

            console.log('[ATTENDANCE] Attendance record inserted');

            // 코인 지급 (10 KEP)
            db.run(
              'UPDATE users SET coin_balance = coin_balance + ? WHERE employee_id = ?',
              [10, employeeId],
              (updateErr) => {
                if (updateErr) {
                  console.error('[ATTENDANCE] Coin update error:', updateErr);
                  return res.status(500).json({ error: 'DB error: ' + updateErr.message });
                }

                console.log('[ATTENDANCE] Coin updated');

                // 업데이트된 코인 잔액 조회
                db.get(
                  'SELECT coin_balance FROM users WHERE employee_id = ?',
                  [employeeId],
                  (balanceErr, userRow) => {
                    if (balanceErr) {
                      console.error('[ATTENDANCE] Balance fetch error:', balanceErr);
                      return res.status(500).json({ error: 'DB error: ' + balanceErr.message });
                    }

                    if (!userRow) {
                      console.error('[ATTENDANCE] User not found after update');
                      return res.status(500).json({ error: '사용자 정보를 찾을 수 없습니다.' });
                    }

                    // 출석체크 내역을 vote_history에 기록 (활동 피드에 표시하기 위해)
                    const historyId = `vh-${Date.now()}-${Math.random().toString(16).slice(2)}`;
                    db.run(
                      'INSERT INTO vote_history (id, employee_id, post_id, post_title, vote_type, coins_earned, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
                      [historyId, employeeId, 'attendance', '출석체크', 'attendance', 10, createdAt],
                      (historyErr) => {
                        if (historyErr) {
                          console.error('[ATTENDANCE] History insert error:', historyErr);
                          // 내역 저장 실패해도 출석체크는 성공으로 처리
                        } else {
                          console.log('[ATTENDANCE] History recorded');
                        }
                      }
                    );

                    console.log('[ATTENDANCE] Success, new balance:', userRow.coin_balance);
                    return res.json({
                      success: true,
                      coinsEarned: 10,
                      newBalance: userRow.coin_balance
                    });
                  }
                );
              }
            );
          }
        );
      }
    );
  });
});

// 프로세스 종료 시 데이터베이스 연결 종료
process.on('SIGINT', () => {
  // eslint-disable-next-line no-console
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error closing database:', err);
    } else {
      // eslint-disable-next-line no-console
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

process.on('SIGTERM', () => {
  // eslint-disable-next-line no-console
  console.log('\nShutting down server...');
  db.close((err) => {
    if (err) {
      // eslint-disable-next-line no-console
      console.error('Error closing database:', err);
    } else {
      // eslint-disable-next-line no-console
      console.log('Database connection closed.');
    }
    process.exit(0);
  });
});

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Anonymous board API server running on http://localhost:${PORT}`);
  // eslint-disable-next-line no-console
  console.log('Press Ctrl+C to stop the server.');
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    // eslint-disable-next-line no-console
    console.error(`\n❌ Port ${PORT} is already in use.`);
    // eslint-disable-next-line no-console
    console.error('Please close the existing server or use a different port.\n');
    // eslint-disable-next-line no-console
    console.error('To find and kill the process using port 4000:');
    // eslint-disable-next-line no-console
    console.error('Windows: netstat -ano | findstr :4000');
    // eslint-disable-next-line no-console
    console.error('Then: taskkill /PID <PID> /F\n');
    process.exit(1);
  } else {
    // eslint-disable-next-line no-console
    console.error('Server error:', err);
    process.exit(1);
  }
});


