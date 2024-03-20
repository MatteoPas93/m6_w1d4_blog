const loggerMiddleware = (request, response, next) => {
    const {url, ip, method} = request;

    console.log(`${new Date().toISOString()} request ${method} to endpoint ${url} from ip ${ip}`);

    next()
}



module.exports = loggerMiddleware;