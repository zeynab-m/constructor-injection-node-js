function Areas(data){

    this.areas = data.areas || [];
    this.areaType = data.areaType;

    this.map = null;
    this.drawControlFull = null;
    this.drawControlEditOnly = null;

    this.drawControlMode = 'full';

    this.drawnItems = data.drawnItems || new L.FeatureGroup();
    this.drawnAreas = new L.FeatureGroup();
    
};

Areas.prototype.initializeOsm = function(options = {}) {
    
    if (!options.elementId) {
        options.elementId = 'map'
    };
    if (!options.center) {
        options.center = [32.150497, 54.370955]
    };
    if (!options.zoom) {
        options.zoom = 6
    };

    this.map = L.map(options.elementId).setView(options.center, options.zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    return this;
};

Areas.prototype.initializeDrawManager = function(options) {

    this.drawnItems.addTo(this.map);

    this.drawControlFull = new L.Control.Draw({
        edit: {
            featureGroup: this.drawnItems
        },
        draw: {
            polygon: {
                showArea: true,
                showLength: true,
                allowIntersection: false
            },
            polyline: false,
            circlemarker: false,
            circle: false
        }
    })

    this.drawControlEditOnly = new L.Control.Draw({
        edit: {
            featureGroup: this.drawnItems
        },
        draw: false
    });

    if (options && options.mode == 'editOnly') {
        this.drawControlMode = options.mode;
        this.drawControlEditOnly.addTo(this.map);
    } else if (options && options.mode == 'full') {
        this.drawControlMode = options.mode;
        this.drawControlFull.addTo(this.map);
    }

    this.map.on(L.Draw.Event.CREATED, this.onDrawCreated.bind(this))
    this.map.on(L.Draw.Event.EDITSTOP, this.onDrawEdited.bind(this))
    this.map.on(L.Draw.Event.DELETED, this.onDrawDeleted.bind(this))

    return this;
};

Areas.prototype.getDrawnItemsGeoJson = function() {
    var coords = {};
    
    this.drawnItems.eachLayer(function(layer){

        if (layer instanceof L.Marker) {
            coords.marker = layer.toGeoJSON().geometry;
        } else if (layer instanceof L.Polygon) {
            coords.polygon = layer.toGeoJSON().geometry;
        }
    });

    return coords;
    
};

Areas.prototype.drawAreas = function(options = {}) {

    for (var i = 0; i < this.areas.length; i++ ) {
        var coordinates = this.areas[i].location.coordinates.map(function(coords){
            return {lat: coords[1], lng: coords[0]}
        })
        var area = L.polygon(coordinates, {
            color: this.areas[i].isActive ? 'blue' : 'red',
            weight: 2
        }).bindPopup(
            new L.Popup({ 
                autoClose: false, 
                closeOnClick: false,
            }).setContent(this.areas[i].name)
        ).addTo(this.map).on('click', options.onDrawnAreasClickHandler || this.onDrawnAreasClick).openPopup();
        
        area.id = this.areas[i].id;
        area.name = this.areas[i].name;
        area.isActive = this.areas[i].isActive;
        this.drawnAreas.addLayer(area);

    }
    return this;
};

Areas.prototype.checkIntersections = function() {

    var drawnPolygon = this.drawnItems.getLayers().filter(l => l instanceof L.Polygon)[0];
    var drawnAreas = this.drawnAreas.getLayers();

    if (drawnAreas.length && drawnPolygon) {
        var drwanAreasLatLngs = drawnAreas.map(d => d.toGeoJSON().geometry.coordinates);
        var drawnItemLatLngs = drawnPolygon.toGeoJSON().geometry.coordinates;

        var intersection = turf.intersect(
            turf.polygon(drawnItemLatLngs),
            turf.multiPolygon(drwanAreasLatLngs),
        );
        intersection = Boolean(intersection.geometry);
        if (intersection == true) {
            drawnPolygon.setStyle({
                color: 'red'
            });
        } else if (!intersection) {
            drawnPolygon.setStyle({
                color: 'blue'
            });
        }
        return intersection;
    }

};

// --------------- event handlers ---------------
Areas.prototype.onDrawCreated = function(event) {


    var layers = this.drawnItems.getLayers();
    var markerCount = layers.filter(l => l instanceof L.Marker).length;
    var polygonCount = layers.filter(l => l instanceof L.Polygon).length;
    
    
    if (
        markerCount < 1 && event.layer instanceof L.Marker ||
        polygonCount < 1 && event.layer instanceof L.Polygon
    ) {
        this.drawnItems.addLayer(event.layer)
    };

    if (markerCount >= 1 && polygonCount >= 1 && this.drawControlMode == 'full') {
        this.drawControlFull.remove(this.map);
        this.drawControlEditOnly.addTo(this.map);  
    };

    if (event.layer instanceof L.Polygon) this.checkIntersections();
    
    
    
};

Areas.prototype.onDrawEdited = function(event) {

    var polygonCount = this.drawnItems.getLayers().filter(l => l instanceof L.Polygon).length;
    if (polygonCount) this.checkIntersections();
    
};

Areas.prototype.onDrawDeleted = function(event) {

    if (this.drawnItems.getLayers().length < 2 && this.drawControlMode == 'full'){
        this.drawControlFull.addTo(this.map);
        this.drawControlEditOnly.remove(this.map);                    
    };

};

Areas.prototype.onDrawnAreasClick = function(event) {


};

// --------------- event handlers ---------------
