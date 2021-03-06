/**
 * Created by amir on 4/28/16.
 */

// decode base64 method
exports.decodeBase64Image = function (dataString) {
    // console.log({dataString})

    if (dataString) {

        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
            response = {};

        if (matches && matches.length !== 3) {
            return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
    } else {
        return false;
    }

};
