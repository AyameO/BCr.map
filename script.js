var osmUrl='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {
    attribution: osmAttrib,
    detectRetina: true
});

// please replace this with your own mapbox token!
var token = 'pk.eyJ1IjoiZG9tb3JpdHoiLCJhIjoiY2o0OHZuY3MwMGo1cTMybGM4MTFrM2dxbCJ9.yCQe43DMRqobazKewlhi9w';
var mapboxUrl = 'https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/{z}/{x}/{y}@2x?access_token=' + token;
var mapboxAttrib = 'Map data © <a href="http://osm.org/copyright">OpenStreetMap</a> contributors. Tiles from <a href="https://www.mapbox.com">Mapbox</a>.';
var mapbox = new L.TileLayer(mapboxUrl, {
  attribution: mapboxAttrib,
  tileSize: 512,
  zoomOffset: -1
});

var map = new L.Map('map', {
    layers: [mapbox],
    center: [51.505, -0.09],
    zoom: 10,
    zoomControl: true
});

// add location control to global name space for testing only
// on a production site, omit the "lc = "!
lc = L.control.locate({
    strings: {
        title: "Show me where I am, yo!"
    }
}).addTo(map);

// define toolbar options
var options = {
    position: 'topleft', // toolbar position, options are 'topleft', 'topright', 'bottomleft', 'bottomright'
    useFontAwesome: false, // use fontawesome instead of geomanIcons (you need to include fontawesome yourself)
    drawMarker: true, // adds button to draw markers
    drawPolyline: true, // adds button to draw a polyline
    drawRectangle: true, // adds button to draw a rectangle
    drawPolygon: true, // adds button to draw a polygon
    drawCircle: true, // adds button to draw a cricle
    cutPolygon: true, // adds button to cut a hole in a polygon
    editMode: true, // adds button to toggle edit mode for all layers
    removalMode: true, // adds a button to remove layers
};

// add leaflet.pm controls to the map
map.pm.addControls(options);

// listen to when a new layer is created
map.on('pm:create', function(e) {
        // データを生成
        const data = new Blob([JSON.stringify(e.layer._latlngs)], {
            type:'application/json'
        });
        // ダウンロードURLを生成
        const url = URL.createObjectURL(data);
    
        // ダウンロード用のボタン(見えない)を生成
        const link = document.createElement('a');
        link.href = url;
        link.download = 'rect.json';
    
        // スクリプトでクリック
        link.click();
    
        // ダウンロードURLを削除
        URL.revokeObjectURL(url);
    
});


