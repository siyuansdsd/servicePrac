function cors(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Controll-Allow-Headers', '*');
    next();
};

module.exports = cors;