module.exports = async (req, res) => {
  const { path, ...rest } = req.query;
  const allowed = ['movie/now_playing', 'movie/upcoming', 'movie/popular', 'search/movie'];
  if (!allowed.includes(path)) return res.status(400).json({ error: 'Not allowed' });
  const params = new URLSearchParams({ ...rest, language: 'en-US' });
  const r = await fetch('https://api.themoviedb.org/3/' + path + '?' + params, {
    headers: { Authorization: 'Bearer ' + process.env.TMDB_TOKEN, accept: 'application/json' }
  });
  res.setHeader('Cache-Control', 's-maxage=600');
  res.status(r.status).json(await r.json());
};
