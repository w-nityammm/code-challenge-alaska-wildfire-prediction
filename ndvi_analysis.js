//Region of Interest: Karnal, Haryana
var karnal = ee.Geometry.Polygon([
  [[76.31, 29.09], [77.12, 29.09], [77.12, 29.83], [76.31, 29.83]]
]);

var s2 = ee.ImageCollection('COPERNICUS/S2')
    .filterBounds(karnal)
    .filterDate('2022-09-01', '2022-11-30')  // Peak vegetation period (Post-monsoon)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 5));  

var addNDVI = function(image) {
  var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI'); 
  return image.addBands(ndvi);
};

var s2WithNDVI = s2.map(addNDVI);
var medianNDVI = s2WithNDVI.select('NDVI').median().clip(karnal);

var ndviStats = medianNDVI.reduceRegion({
  reducer: ee.Reducer.percentile([2, 98]),
  geometry: karnal,
  scale: 30,
  maxPixels: 1e9
});

var minNDVI = ee.Number(ndviStats.get('NDVI_p2'));
var maxNDVI = ee.Number(ndviStats.get('NDVI_p98'));

minNDVI.evaluate(function(minValue) {
  maxNDVI.evaluate(function(maxValue) {
    print('NDVI Range:', minValue, maxValue);
    Map.addLayer(medianNDVI, {
      min: minValue, 
      max: maxValue, 
      palette: ['brown', 'yellow', 'green']  // Brown: Barren, Yellow: Sparse Vegetation, Green: Healthy Vegetation
    }, 'Median NDVI (Fixed)');
  });
});

// Display Karnal Boundary
Map.centerObject(karnal, 10);
Map.addLayer(karnal, {color: 'red'}, 'Karnal Boundary');