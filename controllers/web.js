const Station = require('../models/station');
const Place = require('../models/place');
const User = require('../models/user');

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

exports.getPaymentPage = async (req, res, next) => {
  try {
    distance = parseInt(req.body.distance);
    const bill = {
      name: user.name,
      from: req.body.from,
      to: req.body.to,
      fare: (distance * 2),
      distance: distance,
      time: req.body.time
    };
    return res.render('/web/payment',{
      title: 'Book your tickets!',
      isLoggedIn: req.session.isLoggedIn,
      user: req.user,
      bill: bill 
    })
  } catch (error) {
    console.log(error);
    return res.json(500).json({message: "Internal Server Error!"});
  }
}

exports.bookTicket = async (req, res, next) => {
  try {
    const user = User.findById(req.user._id);
    let ticket = {
      name: user.name,
      from: req.body.from,
      to: req.body.to,
      fare: (req.body.distance * 2),
      distance: req.body.distance,
      time: req.body.time
    };
    user.bookedTickets.push(ticket);
    const results = await user.save();
    return res.redirect('/')
  } catch (error) {
    console.log(error);
    return res.json(500).json({message: "Internal Server Error!"});
  }
}