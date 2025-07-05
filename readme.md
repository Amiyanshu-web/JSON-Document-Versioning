# Document Versioning API

A RESTful API for JSON document versioning with real-time collaboration features, built with Node.js, Express, and MongoDB.

## 🚀 Features

- **JSON Document Versioning**: Track changes to JSON documents with full version history
- **Concurrent Editing**: Handle multiple users editing the same document simultaneously(upto 5 users for now)
- **Automatic Merge**: Smart conflict resolution when users modify different fields
- **Version Rollback**: Restore documents to any previous version
- **Custom Diff Algorithm**: Visualize field-level changes across nested JSON structures
- **JWT Authentication**: Secure API endpoints with token-based authentication
- **Pagination**: Efficiently browse through version history
- **Soft Deletion**: Documents are marked as deleted, not permanently removed

## 🛠️ Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs

## 📁 Project Structure

```
document-versioning-api/
├── controllers/          # Request handlers
├── models/              # Database schemas
├── routes/              # API endpoints
├── middleware/          # Authentication, validation & rate limit
├── utils/               # Diff algorithm, merge logic, jwt token generation
├── config/              # Database configuration
└── index.js             # Main application file
```

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Amiyanshu-web/JSON-Document-Versioning
   cd JSON-Document-Versioning
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
    PORT=
    MONGO_URI=
    JWT_SECRET=
    JWT_EXPIRES_IN=
    MAX_PROPERTIES=5000 #5000 key-value pairs
    MAX_RESPONSE_SIZE=1 #1mb
    MAX_DEPTH=10
   ```

4. **Start the server**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Documents
- `POST /api/documents` - Create new document
- `GET /api/documents/:id` - Get current version of document
- `PUT /api/documents/:id` - Update document (creates new version)
- `DELETE /api/documents/:id` - Soft delete document

### Versions
- `GET /api/documents/:id/versions` - Get all versions (paginated)
- `GET /api/documents/:id/versions/:versionId` - Get specific version
- `GET /api/documents/:id/versions/:versionId/diff` - Show changes from previous version
- `POST /api/documents/:id/rollback` - Rollback to specific version

## 📊 How It Works

### Version Control
Every document update creates a new version while preserving the original. Like Git, but for JSON documents.

```javascript
// Version 1
{"name": "John", "age": 25}

// Version 2 (after update)
{"name": "John", "age": 26, "city": "NYC"}
```

### Concurrent Editing
When multiple users edit simultaneously, the system automatically merges changes to different fields:

```javascript
// User A changes name: "John" → "Johnny"
// User B changes age: 25 → 26
// Result: {"name": "Johnny", "age": 26, "city": "NYC"}
```

### Diff Visualization
The diff engine shows exactly what changed between versions:

```json
{
  "diff": {
    "modified": {
      "user.name": {"old": "John", "new": "Johnny"}
    },
    "added": {
      "user.email": "john@example.com"
    },
    "removed": {
      "user.oldField": "removedValue"
    }
  }
}
```
## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Related Projects

- [Git](https://git-scm.com/) - Inspiration for version control concepts
- [Google Docs](https://docs.google.com/) - Real-time collaboration reference
- [MongoDB](https://www.mongodb.com/) - Document database for JSON storage

---

**Built with ❤️ for learning system design and backend development**