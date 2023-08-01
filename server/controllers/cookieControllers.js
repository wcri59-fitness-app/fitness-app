const cookieController = {};

cookieController.setCookie = (req, res, next) => {
    res.cookie('userID', res.locals.userID, {httpOnly:true});
    // console.log(res.getHeaders());
    return next()
}

module.exports = cookieController;