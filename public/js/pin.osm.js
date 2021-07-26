class Pin{
    constructor(element) {
        this.drawnItems = new L.FeatureGroup();
        this.drawnAreas = new L.FeatureGroup();
        this.drawControlFull = null;
        this.drawControlEditOnly = null;


    }


    initiateMap(potions={}){

        this.elementId=potions.elementId || 'map'
        this.center=potions.center || [32.150497, 54.370955]
        this.zoom=potions.zoom || 6

        this.map= L.map(this.elementId).setView(this.center,this.zoom)

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        return this
    }
    initiateDrawManager(){

        this.drawnItems.addTo(this.map)
        this.drawControlEditOnly = new L.Control.Draw({
            edit: {
                featureGroup: this.drawnItems
            },
            draw: false
        });
        this.drawControlFull = new L.Control.Draw({
            edit: {
                featureGroup: this.drawnItems
            },
            draw: {
                polygon:false,
                polyline: false,
                circlemarker: false,
                circle: false,
                rectangle: false,
            }
        })

        this.drawControlFull.addTo(this.map)

        this.map.on(L.Draw.Event.CREATED, this.onDrawCreated.bind(this))

        return this;
    }

    onDrawCreated (event) {

        this.drawnItems.addLayer(event.layer)



    };

   onDrawEdited (event) {

    };

   onDrawDeleted(event) {


    };
   getDrawnItemsGeoJson () {
        var coords = {};

        this.drawnItems.eachLayer(function(layer){

            if (layer instanceof L.Marker) {
                coords.marker = layer.toGeoJSON().geometry;
            }
        });

        return coords;

    };
   addMarkers (points) {
        console.log({points})
       let geoJson={
           "type": "FeatureCollection",
           features:[]
       }
       points.forEach(point=>{

           geoJson.features.push({

                   type: 'Feature',
                   "geometry": point.location,
                   "properties": {
                       'title': point.name,
                       'color':'#ff0000',
                       'images':point.pics.map(pic=>{return ["http://localhost:1080/"+pic.original,point.about]})

                   }
               }


           )
       })



       L.geoJson(geoJson, {
           style: function (feature) {
               console.log({feature})
               return {color: feature.properties.color};
           },
           onEachFeature: this.onEachFeature,
           }
       ).addTo(this.map);


       return this;

    };

    onEachFeature(feature, layer){

        if (feature.properties && feature.properties.title) {

            var images = feature.properties.images
            var slideshowContent = '';

            for(var i = 0; i < images.length; i++) {
                var img = images[i];

                slideshowContent += '<div class="image' + (i === 0 ? ' active' : '') + '">' +
                    '<img src="' + img[0] + '" />' +
                    '<div class="caption">' + img[1] + '</div>' +
                    '</div>';
            }

            var popupContent =  '<div id="' + feature.properties.title + '" class="popup">' +
                '<div class="slideshow">' +
                slideshowContent +
                '</div>' +
                '<div class="cycle">' +
                '<a href="#" class="prev">&laquo; Previous</a>' +
                '<a href="#" class="next">Next &raquo;</a>' +
                '</div>'
            '</div>';

            layer.bindPopup(popupContent);
        }

                   }




}
