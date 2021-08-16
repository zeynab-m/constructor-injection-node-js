function CroppieHelper(canvas_id, file_input_id, url_input_id) {
    this.canvas_id = canvas_id;
    this.file_input_id = file_input_id;
    this.url_input_id = url_input_id;
}

CroppieHelper.prototype.loadImage = function(imageUrl) {
    $(this.canvas_id).croppie('destroy');
    $(this.canvas_id).croppie({
        enableResize: true,
        viewport: {
          width: 250,
          height: 250,
          type: 'square'
        },
        boundary: {
          width: 250,
          height: 250
        },
        url: imageUrl
    });
}

CroppieHelper.prototype.bind = function() {
    var $image = $(this.canvas_id);
    var url_input_id = this.url_input_id;

    $(this.file_input_id).change(function(event){

        if (this.files && this.files[0]) {
            var reader = new FileReader();
            $image.removeClass('hidden');
            reader.onload = function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function(){

                    var maxWidth = 200; // Max width for the pic
                    var maxHeight = 200;    // Max height for the pic
                    var ratio = 0;  // Used for aspect ratio
                    var width = this.width;    // Current pic width
                    var height = this.height;  // Current pic height

                    // Check if the current width is larger than the max
                    if(width > maxWidth){
                        ratio = maxWidth / width;   // get ratio for scaling pic
                        height = height * ratio;    // Reset height to match scaled pic
                        width = width * ratio;    // Reset width to match scaled pic
                    }
                    // Check if current height is larger than max
                    if(height > maxHeight){
                        ratio = maxHeight / height; // get ratio for scaling pic
                        width = width * ratio;    // Reset width to match scaled pic
                        height = height * ratio;    // Reset height to match scaled pic
                    }
                    var boundaryWidth = width < 150 ? 150 : width;
                    var boundaryHeight = height < 150 ? 150 : height;
                    $image.croppie('destroy')
                    $image.croppie({
                        viewport: {
                            width: width,
                            height: height,
                            type: 'square'
                        },
                        boundary: {
                            width: boundaryWidth,
                            height: boundaryHeight
                        },
                        url: image.src,
                    })

                };
            }
            
            reader.readAsDataURL(this.files[0]);
        }
        else {
            swal("Sorry - you're browser doesn't support the FileReader API");
        }
    });
    $image.on('update.croppie', function(event, cropData) {
        $image.croppie('result', {
            type: 'base64',
            circle: false,
            size: 'original'
        }).then(function(data){
            // var data = imageToDataUri(canvas, 256, 256, 'pic/png');
            $(url_input_id).val(data);
        })
        .catch(function(err) {
            alert(err.message);
        })
    });
    return this
};
