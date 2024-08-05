import express from 'express';
import router from './routes/index.js';

const app = express();
const PORT = 5000 || process.env.PORT;

app.use('', router);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
