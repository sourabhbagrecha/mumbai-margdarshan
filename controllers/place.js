const Place = require('../models/place');
const Station = require('../models/station');

exports.createPlace = async (req, res, next) => {
  try {
    const created = await Place.create({
      name: req.body.name,
      imgSrc: req.body.imgsrc,
      station: req.body.station,
      distance: req.body.distance,
      description: req.body.description,
      link: req.body.link
    })
    console.log(created);
    const station = await Station.findById(req.body.station);
    station.places.push(created._id);
    station.save();
    return res.status(201).json(created);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

exports.getPlaces = async (req, res, next) => {
  try {
    const places = await Place.find({});
    return res.status(200).json(places);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

exports.getPlace = async (req, res, next) => {
  try {
    const place = await Place.findById(req.params.id);
    return res.status(200).json(place);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
}

exports.updatePlace = async (req, res, next) => {
  try{
    const place = await Place.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      imgSrc: req.body.imgSrc,
      station: req.body.station,
      distance: req.body.distance,
      description: req.body.description,
      link: req.body.link })
    const updatedPlace = await Place.findById(req.params.id);
    return res.status(202).json(updatedPlace);
  } catch(error) {
    console.log(error)
    return res.status(500).json(error);
  }
}

exports.deletePlace = (req, res, next) => {
  Place.findByIdAndDelete(req.params.id)
    .then(results => { return res.status(200).json({message: "deleted"}); })
    .catch(err => {console.log(err); return res.status(500).json({message: "Cannot delete"})} );
}