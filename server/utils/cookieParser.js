var CookieParser = function() {
    var x = 7;
}

CookieParser.prototype.getCookie = function(cookieName, req) {
    var cookie = req.headers.cookie;
    var response;
    if (cookie) {
        var split = cookie.split(';');
        split.forEach(function(cookieValue) {
            var parts = cookieValue.split('=');
            if (parts[0].trim() === cookieName) {
                response = parts[1].trim();
            }
        });
    }

    return response;
};

module.exports = new CookieParser();
