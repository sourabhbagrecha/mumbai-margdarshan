const Station = require('../models/station');

exports.getSearchPage = async (req, res, next) => {
  const stations = await Station.find();
  return res.render('web/search',{
    title: 'search',
    stations: stations
  })
}