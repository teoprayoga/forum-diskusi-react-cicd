# API Reference - Dicoding Forum API

Base URL: `https://forum-api.dicoding.dev/v1`

## 🔐 Authentication

Beberapa endpoint memerlukan authentication menggunakan Bearer Token di header:
```
Authorization: Bearer <access_token>
```

## 📌 Endpoints

### 1. User Management

#### Register User
```http
POST /register
Content-Type: application/json

Body:
{
  "name": "string",
  "email": "string",
  "password": "string"
}

Response Success (200):
{
  "status": "success",
  "message": "User created",
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "avatar": "string"
    }
  }
}
```

#### Login User
```http
POST /login
Content-Type: application/json

Body:
{
  "email": "string",
  "password": "string"
}

Response Success (200):
{
  "status": "success",
  "message": "ok",
  "data": {
    "token": "string"
  }
}
```

#### Get Own Profile
```http
GET /users/me
Authorization: Bearer <token>

Response Success (200):
{
  "status": "success",
  "message": "ok",
  "data": {
    "user": {
      "id": "string",
      "name": "string",
      "email": "string",
      "avatar": "string"
    }
  }
}
```

#### Get All Users
```http
GET /users

Response Success (200):
{
  "status": "success",
  "message": "ok",
  "data": {
    "users": [
      {
        "id": "string",
        "name": "string",
        "email": "string",
        "avatar": "string"
      }
    ]
  }
}
```

### 2. Thread Management

#### Get All Threads
```http
GET /threads

Response Success (200):
{
  "status": "success",
  "message": "ok",
  "data": {
    "threads": [
      {
        "id": "string",
        "title": "string",
        "body": "string (HTML)",
        "category": "string",
        "createdAt": "string (ISO date)",
        "ownerId": "string",
        "upVotesBy": ["userId"],
        "downVotesBy": ["userId"],
        "totalComments": number
      }
    ]
  }
}
```

#### Create Thread
```http
POST /threads
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "title": "string",
  "body": "string",
  "category": "string (optional)"
}

Response Success (201):
{
  "status": "success",
  "message": "Thread created",
  "data": {
    "thread": {
      "id": "string",
      "title": "string",
      "body": "string",
      "category": "string",
      "createdAt": "string",
      "ownerId": "string",
      "upVotesBy": [],
      "downVotesBy": []
    }
  }
}
```

#### Get Thread Detail
```http
GET /threads/:id

Response Success (200):
{
  "status": "success",
  "message": "ok",
  "data": {
    "detailThread": {
      "id": "string",
      "title": "string",
      "body": "string (HTML)",
      "category": "string",
      "createdAt": "string",
      "owner": {
        "id": "string",
        "name": "string",
        "avatar": "string"
      },
      "upVotesBy": ["userId"],
      "downVotesBy": ["userId"],
      "comments": [
        {
          "id": "string",
          "content": "string (HTML)",
          "createdAt": "string",
          "owner": {
            "id": "string",
            "name": "string",
            "avatar": "string"
          },
          "upVotesBy": ["userId"],
          "downVotesBy": ["userId"]
        }
      ]
    }
  }
}
```

### 3. Comment Management

#### Create Comment
```http
POST /threads/:id/comments
Authorization: Bearer <token>
Content-Type: application/json

Body:
{
  "content": "string"
}

Response Success (201):
{
  "status": "success",
  "message": "Comment created",
  "data": {
    "comment": {
      "id": "string",
      "content": "string",
      "createdAt": "string",
      "upVotesBy": [],
      "downVotesBy": [],
      "owner": {
        "id": "string",
        "name": "string",
        "email": "string"
      }
    }
  }
}
```

### 4. Voting System

#### Up-Vote Thread
```http
POST /threads/:id/up-vote
Authorization: Bearer <token>

Response Success (200):
{
  "status": "success",
  "message": "Thread up voted",
  "data": {
    "vote": {
      "id": "string",
      "userId": "string",
      "threadId": "string",
      "voteType": 1
    }
  }
}
```

#### Down-Vote Thread
```http
POST /threads/:id/down-vote
Authorization: Bearer <token>

Response Success (200):
{
  "status": "success",
  "message": "Thread down voted",
  "data": {
    "vote": {
      "id": "string",
      "userId": "string",
      "threadId": "string",
      "voteType": -1
    }
  }
}
```

#### Neutral Vote Thread
```http
POST /threads/:id/neutral-vote
Authorization: Bearer <token>

Response Success (200):
{
  "status": "success",
  "message": "Thread neutral voted"
}
```

#### Up-Vote Comment
```http
POST /threads/:threadId/comments/:commentId/up-vote
Authorization: Bearer <token>

Response Success (200):
{
  "status": "success",
  "message": "Comment up voted",
  "data": {
    "vote": {
      "id": "string",
      "userId": "string",
      "commentId": "string",
      "voteType": 1
    }
  }
}
```

#### Down-Vote Comment
```http
POST /threads/:threadId/comments/:commentId/down-vote
Authorization: Bearer <token>

Response Success (200):
{
  "status": "success",
  "message": "Comment down voted",
  "data": {
    "vote": {
      "id": "string",
      "userId": "string",
      "commentId": "string",
      "voteType": -1
    }
  }
}
```

#### Neutral Vote Comment
```http
POST /threads/:threadId/comments/:commentId/neutral-vote
Authorization: Bearer <token>

Response Success (200):
{
  "status": "success",
  "message": "Comment neutral voted"
}
```

### 5. Leaderboard

#### Get Leaderboards
```http
GET /leaderboards

Response Success (200):
{
  "status": "success",
  "message": "ok",
  "data": {
    "leaderboards": [
      {
        "user": {
          "id": "string",
          "name": "string",
          "email": "string",
          "avatar": "string"
        },
        "score": number
      }
    ]
  }
}
```

## 🔄 Vote Logic

### Thread/Comment Voting:
- User belum vote → Up-vote → upVotesBy bertambah
- User sudah up-vote → Up-vote lagi → upVotesBy berkurang (neutral)
- User sudah up-vote → Down-vote → upVotesBy berkurang, downVotesBy bertambah
- User sudah down-vote → Down-vote lagi → downVotesBy berkurang (neutral)
- User sudah down-vote → Up-vote → downVotesBy berkurang, upVotesBy bertambah

### Neutral Vote:
- Menghapus vote user dari thread/comment
- Digunakan untuk cancel vote

## 📝 Notes

1. **HTML Content**: Field `body` di thread dan `content` di comment bisa berisi HTML
2. **Date Format**: Semua date dalam format ISO 8601
3. **Avatar**: URL ke gambar avatar user
4. **Category**: Kategori thread bersifat free text, tidak ada list kategori fixed
5. **Token**: Token disimpan di localStorage setelah login berhasil
6. **Vote Type**: 1 untuk up-vote, -1 untuk down-vote

## ⚠️ Error Responses

Semua error response memiliki format:
```json
{
  "status": "fail",
  "message": "error message"
}
```

Common Errors:
- `400` - Bad Request (validation error)
- `401` - Unauthorized (token invalid/expired)
- `404` - Not Found (resource tidak ditemukan)
- `500` - Internal Server Error

## 🛠️ Implementasi di Proyek

Semua endpoint ini diimplementasikan di file:
```
src/utils/api.js
```

Dengan fungsi-fungsi:
- `api.register()`
- `api.login()`
- `api.getOwnProfile()`
- `api.getAllUsers()`
- `api.getAllThreads()`
- `api.createThread()`
- `api.getThreadDetail()`
- `api.createComment()`
- `api.upVoteThread()`
- `api.downVoteThread()`
- `api.neutralVoteThread()`
- `api.upVoteComment()`
- `api.downVoteComment()`
- `api.neutralVoteComment()`
- `api.getLeaderboards()`

## 🧪 Testing dengan cURL

### Register
```bash
curl -X POST https://forum-api.dicoding.dev/v1/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST https://forum-api.dicoding.dev/v1/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Get Threads
```bash
curl https://forum-api.dicoding.dev/v1/threads
```

### Create Thread (with auth)
```bash
curl -X POST https://forum-api.dicoding.dev/v1/threads \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"title":"Test Thread","body":"This is a test","category":"test"}'
```

---

📚 **Dokumentasi Lengkap**: https://forum-api.dicoding.dev/v1
