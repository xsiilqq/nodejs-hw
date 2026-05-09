import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import pretty from 'pino-pretty';

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const stream = pretty();

app.use(cors());
app.use(express.json());
app.use(pinoHttp({ stream }));

app.get('/notes', (req, res) => {
  void req;

  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

app.get('/test-error', (req, res) => {
  void req;
  void res;

  throw new Error('Simulated server error');
});

app.use((req, res) => {
  void req;

  res.status(404).json({
    message: 'Route not found',
  });
});

app.use((err, req, res, next) => {
  void req;
  void next;

  res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
