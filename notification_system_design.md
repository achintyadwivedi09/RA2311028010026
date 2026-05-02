
# Notification System Design

## Stage 1 — API Design

### Endpoints
- GET /notifications?studentId=
- POST /notifications
- PATCH /notifications/:id/read

### Sample Response
{
  "id": "1",
  "type": "placement",
  "message": "Company XYZ arrived",
  "isRead": false,
  "timestamp": "2026-05-02T10:00:00Z"
}

### Real-time Mechanism
- WebSockets (preferred) or long polling

---

## Stage 2 — Database

### Choice: MongoDB
- Flexible schema
- High write throughput

### Schema
{
  studentId: String,
  type: String, // placement, result, event
  message: String,
  isRead: Boolean,
  timestamp: Date
}

### Scaling Issues
- Large reads → slow queries

### Solution
- Indexing (studentId, isRead, timestamp)
- Pagination

---

## Stage 3 — Query Optimization

Original:
SELECT * FROM notifications
WHERE studentId = 1042 AND isRead = false
ORDER BY createdAt DESC;

### Issues
- No index → full scan

### Fix
- Add index:
CREATE INDEX idx_student_read_time ON notifications(studentId, isRead, createdAt DESC);

### Why not index everything?
- Slows writes
- Wastes memory

### New Query (last 7 days placements)
SELECT * FROM notifications
WHERE type = 'Placement'
AND createdAt >= NOW() - INTERVAL 7 DAY;

---

## Stage 4 — Performance Improvement

### Problem
DB overload due to frequent fetch

### Solutions
- Caching (Redis)
- Lazy loading / pagination
- WebSockets

### Tradeoffs
- Cache → stale data
- WebSockets → complexity

---

## Stage 5 — Scaling Notifications

### Problems in given approach
- Sequential → slow
- Failures not handled

### Solution
- Use Queue (RabbitMQ / Kafka)

### Improved Flow
for each student:
  push job to queue

worker:
  send email
  save to DB

### Why separate?
- Reliability
- Retry failed jobs

---

## Stage 6 — Priority Inbox

### Logic
- Placement > Result > Event
- Then sort by latest

### Approach
- Use max heap or sorting

### Efficient Update
- Maintain heap of size 10