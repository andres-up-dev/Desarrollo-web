const express = require('express');
const authRoutes = require('./routes/authRoutes');
const apiRoutes = require('./routes/apiRoutes');
const AppError = require('./utils/appError');
const { errorMiddleware } = require('./middleware/errorMiddleware');

const app = express();

app.use(express.json());
app.use(express.static('client'));

app.use('/api/auth', authRoutes);
app.use('/api/initiatives', apiRoutes);

app.use(function (req, res, next) {
  next(new AppError('Route not found', 404));
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server running on http://localhost:' + PORT);
});
