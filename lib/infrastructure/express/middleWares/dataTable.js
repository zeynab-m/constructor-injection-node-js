
module.exports.dataTable = function (req, res, next) {
    let params = {
        select: {},
        sort: {},
    };

    let columns = req.query.columns;
    let order = req.query.order;

    for (let index in columns) {
        params[index] = columns[index]['data']
        params['select'][[columns[index]['data']]] = 1
    }
    if (order && order.length > 0) {
        params['sort'][[params[order[0]['column']]]] = order[0]['dir'] == "asc" ? 1 : -1;
    }
    params['draw'] = req.query.draw;
    params['length'] = parseInt(req.query.length);
    params['start'] = parseInt(req.query.start);
    params['query'] = req.query.query || {};
    params['excelColumns'] = req.query.excelColumns || {};
    req.dtParams = params;
    next();
};

