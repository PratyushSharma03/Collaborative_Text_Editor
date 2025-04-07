const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const Document = require('./models/Document');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch((err) => console.error('MongoDB connection error:', err));

app.get("/", (req, res) => {
  res.send("Shared document API is running.");
});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const SHARED_DOCUMENT_ID = "shared-document-id";
const activeUsers = new Set();

function emitActiveUserCount() {
  io.emit("update-user-count", activeUsers.size);
}

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  activeUsers.add(socket.id);
  emitActiveUserCount();

  socket.on("disconnect", () => {
    activeUsers.delete(socket.id);
    emitActiveUserCount();
    console.log("User disconnected:", socket.id);
  });

  socket.on("get-document", async () => {
    const document = await findOrCreateDocument(SHARED_DOCUMENT_ID);
    socket.join(SHARED_DOCUMENT_ID);
    socket.emit("load-document", document.data);

    socket.on("send-changes", (delta) => {
      socket.broadcast.to(SHARED_DOCUMENT_ID).emit("receive-changes", delta);
    });

    socket.on("save-document", async (data) => {
      await Document.findByIdAndUpdate(SHARED_DOCUMENT_ID, { data });
    });
  });
});

async function findOrCreateDocument(id) {
  let doc = await Document.findById(id);
  if (doc) return doc;
  return await Document.create({ _id: id, data: "" });
}
