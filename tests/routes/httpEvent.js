
module.exports.makeHttpEvent = (method = 'GET', path = '/', queryStringParams = {}) => {
    
    const routeKey = `${method} ${path}`

    const hasQueryString = Object.keys(queryStringParams).length > 0

    let queryString = ''
    if ( hasQueryString ) {
        queryString = '?'
        for (k in queryStringParams) {
            if (queryString.length > 1) queryString += '&'
            queryString += `${k}=${queryStringParams[k]}`
        }
    }

    let event = {
        "version": "2.0",
        "routeKey": routeKey,
        "rawPath": path,
        "rawQueryString": queryString,
        "headers": {
                "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-GB,en-US;q=0.9,en;q=0.8,ko;q=0.7,de;q=0.6",
                "content-length": "0",
                "host": "1kh212c4ej.execute-api.eu-west-2.amazonaws.com",
                "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"91\", \"Chromium\";v=\"91\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "document",
                "sec-fetch-mode": "navigate",
                "sec-fetch-site": "none",
                "sec-fetch-user": "?1",
                "upgrade-insecure-requests": "1",
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36",
                "x-amzn-trace-id": "Root=1-60d0d673-32a5d6231647c0225d86a899",
                "x-forwarded-for": "82.29.124.253",
                "x-forwarded-port": "443",
                "x-forwarded-proto": "https"
        },
        "requestContext": {
                "accountId": "963594709043",
                "apiId": "1kh212c4ej",
                "domainName": "1kh212c4ej.execute-api.eu-west-2.amazonaws.com",
                "domainPrefix": "1kh212c4ej",
                "http": {
                        "method": method,
                        "path": path,
                        "protocol": "HTTP/1.1",
                        "sourceIp": "82.29.124.253",
                        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.106 Safari/537.36"
                },
                "requestId": "BSZyEhjoLPEEJOw=",
                "routeKey": routeKey,
                "stage": "$default",
                "time": "21/Jun/2021:18:12:03 +0000",
                "timeEpoch": 1624299123459
        },
        "isBase64Encoded": false
    }

    if ( hasQueryString ) {
        event.queryStringParameters = queryStringParams
    }

    return event

}