const Station = require('../models/station');

const findLines = (station) => {
  const lines = []
  if(station.isWestern){lines.push('isWestern')}
  if(station.isCentral){lines.push('isCentral')}
  if(station.isHarbour){lines.push('isHarbour')}
  return lines;
}

exports.searchStation = (req, res, next) => {
  Station.find()
    .then(stations => {
      return res.json(stations);
    })
    .catch(err => console.log(err));
}

exports.routeDiscovey = async(req, res, next) => {
  try{
    let fromStation = await Station.findById(req.body.fromstation); //Bandra
    let toStation = await Station.findById(req.body.tostation); //Byculla
    let fromStationLines = findLines(fromStation);
    let toStationLines = findLines(toStation);
    let fromSameLine = false;
    let commonStationF,commonStationT;
    console.log(fromStation,toStation);
    fromStationLines.forEach(f=> {
      toStationLines.forEach(t => {
        if(f === t){
          fromSameLine = true;
        }
      })
    })
    if(fromSameLine){
      let intermediateStations;
      let totalTime = 0;
      let totalDistance = 0;
      if(fromStation.distance > toStation.distance){
        totalDistance += (fromStation.distance - toStation.distance); totalTime += (fromStation.arrival - toStation.arrival);
        intermediateStations = await Station.find({'isWestern': true, 'distance': {$gt : toStation.distance, $lt: fromStation.distance}}).sort('-distance');
      }else{
        totalDistance += (toStation.distance - fromStation.distance); totalTime += (toStation.arrival - fromStation.arrival);
        intermediateStations = await Station.find({'isWestern': true, 'distance': {$gt : fromStation.distance, $lt: toStation.distance}});
      }
      return res.render('web/results',{
        title: 'Search Results',
        toStation: toStation,
        fromStation: fromStation,
        intermediateStations: intermediateStations,
        commonStationT : false,
        totalDistance: totalDistance,
        totalTime: totalTime,
        user: req.user,
        isLoggedIn: req.session.isLoggedIn
      });
    } else {
      const calcQuery = (line) => {
        let query;
        switch(line){
          case 'isWestern': query = {'isWestern' : true}; break;
          case 'isCentral': query = {'isCentral': true}; break;
          case 'isHarbour': query = {'isHarbour': true}; break;
        }
        return query;
      };
      let fromL = fromStationLines[0];
      let toL = toStationLines[0];
      let fromQuery = calcQuery(fromL);
      let toQuery = calcQuery(toL);
      let fromLall = await Station.find(fromQuery).sort('distance')
      let toLall = await Station.find(toQuery).sort('distance');
      fromLall.forEach(f => {
        toLall.forEach(t => {
          if(f.name === t.name){
            commonStationT = t;
            commonStationF = f;
          }
        })
      })
      let fStations, tStations;
      let totalDistance = 0 ;
      let totalTime = 0;
      if(fromStation.distance > commonStationF.distance){
        console.log('running @ 75');
        totalDistance += (fromStation.distance - commonStationF.distance); totalTime += (fromStation.arrival - commonStationF.arrival);
        fStations = await Station.find(fromQuery).where('distance').gte(commonStationF.distance).lt(fromStation.distance).sort('-distance')
      }else{
        console.log('running @ 78');
        totalDistance += (commonStationF.distance - fromStation.distance); totalTime += (commonStationF.arrival - fromStation.distance);
        fStations = await Station.find(fromQuery).where('distance').gt(fromStation.distance).lte(commonStationF.distance).sort('distance')
      }
      if(commonStationT.distance > toStation.distance){
        console.log('running @ 82');
        totalDistance += (commonStationT.distance - toStation.distance); totalTime += (commonStationT.arrival - toStation.arrival);
        tStations = await Station.find(toQuery).where('distance').gt(toStation.distance).lt(commonStationT.distance).sort('-distance')
      }else{
        console.log('running @ 85');
        totalDistance += (toStation.distance - commonStationF.distance); totalTime += (toStation.arrival - commonStationT.arrival);
        tStations = await Station.find(toQuery).where('distance').gt(commonStationT.distance).lt(toStation.distance).sort('distance')        
      }
      console.log(tStations,fStations)
      console.log(totalDistance,'km', totalTime);
      let intermediateStations=[...fStations,...tStations];
      return res.render('web/results',{
        title: 'Search Results',
        toStation: toStation,
        fromStation: fromStation,
        intermediateStations: intermediateStations,
        commonStationT: commonStationT,
        totalDistance: totalDistance,
        totalTime: totalTime,
        isLoggedIn: req.session.isLoggedIn,
        user: req.user
      })
    }
  }catch(err){
    console.log(err);
    return res.render('web/error-results',{
      title: "No route Available",
      isLoggedIn: req.session.isLoggedIn,
      user: req.user
    })
  }
}