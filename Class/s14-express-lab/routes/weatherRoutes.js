import { Router } from 'express';
import { getWeatherFrom } from '../services/meteo-service.js';

const router = Router();

const cities = {
  GDL: { lat: 20.6597, long: -103.349 },
  LSN: { lat: 46.52, long: 6.63 },
};

router.get('/GDL', async (req, res) => {
  res.send(await getWeatherFrom(20.6766, -103.3475, 'Guadalajara'));
});

router.get('/LSN', async (req, res) => {
  res.send(await getWeatherFrom(46.52, 6.63, 'Lausanne'));
});

router.get('/:city', async (req, res) => {
  const { city } = req.params;
  if (!cities[city]) return res.status(400).json({ error: 'City code invalid. Use GDL or LSN.' });
  const { lat, long } = cities[city];
  res.send(await getWeatherFrom(lat, long, city));
});

export default router;
