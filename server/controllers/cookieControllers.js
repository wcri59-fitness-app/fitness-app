const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    res.cookie('userID', res.locals.userID, {httpOnly:true});
    return next()
}

module.exports = cookieController;