const Station = require('../models/station');
const Place = require('../models/place');

exports.getSearchPage = async (req, res, next) => {
  try {
    const stations = await Station.find();
    console.log(req.user, req.isLoggedIn);
    return res.render('web/search',{
      title: 'search',
      stations: stations,
      isLoggedIn: req.session.isLoggedIn,
      user: req.user
    })
  } catch (error) {
    console.log(error);
    return res.redirect('404',{
      title: 'search',
      stations: stations,
      isLoggedIn: req.session.isLoggedIn,
      user: req.user
    })
  }
}

exports.getMap = (req, res, next) => {
  return res.render('web/map',{
    title: 'Mumbai Local Train Map',
    isLoggedIn: req.session.isLoggedIn,
    user: req.user
  })
}

exports.getAboutUs = (req, res, next) => {
  return res.render('web/about-us',{
    title: 'About Us | Mumbai Margdarshan',
    isLoggedIn: req.session.isLoggedIn,
    user: req.user
  })
}

exports.getFAQ = (req, res, next) => {
  return res.render('web/faq',{
    title: 'Frequently Asked Questions | Mumbai Margdarshan',
    isLoggedIn: req.session.isLoggedIn,
    user: req.user
  })
}

exports.getAboutMumbai = async (req, res, next) => {
  const topPlaces = await Place.find({}).limit(6).populate('station','name');
  const centralStations = await Station.find({isCentral: true},'name places').sort('distance');
  const harbourStations = await Station.find({isHarbour: true},'name places').sort('distance');
  const westernStations = await Station.find({isWestern: true},'name places').sort('distance');
  return res.render('web/about-mumbai',{
    title: 'Explore Mumbai | Mumbai Margdarshan',
    isLoggedIn: req.session.isLoggedIn,
    user: req.user,
    topPlaces: topPlaces,
    centralStations: centralStations,
    harbourStations: harbourStations,
    westernStations: westernStations
  })
}

exports.getStation = async (req, res, next) => {
  const station = await Station.findById(req.params.id).populate('places');
  return res.render('web/station',{
    title: 'Explore Mumbai | Mumbai Margdarshan',
    isLoggedIn: req.session.isLoggedIn,
    user: req.user,
    station: station
  })
}