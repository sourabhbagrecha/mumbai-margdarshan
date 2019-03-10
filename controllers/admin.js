const Station = require('../models/station');

exports.getDashboard = async (req, res, next) => {
  try{
    const centralStations = await Station.find({isCentral: true},'name places').sort('distance');
    const harbourStations = await Station.find({isHarbour: true},'name places').sort('distance');
    const westernStations = await Station.find({isWestern: true},'name places').sort('distance');
    return res.render('admin/dashboard',{
      title: 'Explore Mumbai | Mumbai Margdarshan',
      isLoggedIn: req.session.isLoggedIn,
      user: req.user,
      centralStations: centralStations,
      harbourStations: harbourStations,
      westernStations: westernStations
    })
  } catch(error) {
    console.log(error);
    return res.status(500).json({message: 'Request can not be processed!'});
  }
}

exports.getStationEdit = async (req, res, next) => {
  try{
    const station = await Station.findById(req.params.id).populate('places');
    return res.render('admin/station-details',{
      title: 'Edit Station',
      station: station,
      isLoggedIn: req.session.isLoggedIn,
      user: req.user
    })
  }
  catch(err){
    return console.log(err);
  }
};

exports.postStationEdit = async(req, res, next) => {
  console.log('running!');
  
  try{
    const station = await Station.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      imgSrc: req.body.imgsrc,
      description: req.body.desc
    })
    const updatedStation = await Station.findById(req.params.id);
    return res.redirect('/admin')
  } catch(error) {
    console.log(error)
    return res.status(500).json(error);
  }
}