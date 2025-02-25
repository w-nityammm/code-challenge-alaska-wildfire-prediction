//Region of Interest: Approximate polygon for Karnal region, Haryana
var karnal = ee.Geometry.Polygon([
    [[76.31, 29.09], [77.12, 29.09], [77.12, 29.83], [76.31, 29.83]]
  ]);
  
  var s2 = ee.ImageCollection('COPERNICUS/S2')
      .filterBounds(karnal)
      .filterDate('2022-01-01', '2022-12-31')
      .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 20));
  
  var addNDVI = function(image) {
    var ndvi = image.normalizedDifference(['B8', 'B4']).rename('NDVI');
    return image.addBands(ndvi);
  };
  
  var s2WithNDVI = s2.map(addNDVI);
  
  //Median composite of NDVI values
  var medianNDVI = s2WithNDVI.select('NDVI').median().clip(karnal);
  
  // Visualize the median NDVI composite
  Map.centerObject(karnal, 10);
  Map.addLayer(medianNDVI, {min: 0, max: 1, palette: ['blue', 'white', 'green']}, 'Median NDVI');  