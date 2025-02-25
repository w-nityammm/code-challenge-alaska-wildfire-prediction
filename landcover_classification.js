//Region of Interest: Karnal region polygon
var karnal = ee.Geometry.Polygon([
    [[76.31, 29.09], [77.12, 29.09], [77.12, 29.83], [76.31, 29.83]]
  ]);
  
  var s2 = ee.ImageCollection('COPERNICUS/S2')
      .filterBounds(karnal)
      .filterDate('2022-01-01', '2022-12-31')
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20))
      .median()
      .clip(karnal)
      .select(['B2', 'B3', 'B4', 'B8']);
  
  //Sample training data (for demonstration: agricultural vs. non-agricultural)
  var agriculture = ee.FeatureCollection([
    ee.Feature(ee.Geometry.Point([76.5, 29.5]), {'landcover': 1}),
    ee.Feature(ee.Geometry.Point([76.6, 29.55]), {'landcover': 1})
  ]);
  var nonAgriculture = ee.FeatureCollection([
    ee.Feature(ee.Geometry.Point([76.8, 29.7]), {'landcover': 0}),
    ee.Feature(ee.Geometry.Point([76.9, 29.65]), {'landcover': 0})
  ]);
  
  var trainingSamples = agriculture.merge(nonAgriculture);
  
  var trainingData = s2.sampleRegions({
    collection: trainingSamples,
    properties: ['landcover'],
    scale: 10
  });
  
  var classifier = ee.Classifier.smileRandomForest(50).train({
    features: trainingData,
    classProperty: 'landcover',
    inputProperties: s2.bandNames()
  });
  
  var classified = s2.classify(classifier);
  
  //Classification results: red for non-agriculture, green for agriculture
  Map.addLayer(classified, {min: 0, max: 1, palette: ['red', 'green']}, 'Land Cover Classification');  