const cookie = {};

cookieController.setCookie = (req, res, next) => {
    res.cookie('userID', res.locals.id, {httpOnly:true});
    next()
}