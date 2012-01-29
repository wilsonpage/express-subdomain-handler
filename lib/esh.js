
/**
 * SubdomainHandler
 *
 * This runs on all routes and manipulates the req.url to include the tag
 * as the first parameter (/:tag/foo/bar). This then triggers different route listeners.
 * It is important because it transforms the fragile subdomain mesh tag into a more
 * tageable route parameter that is easily retrievable in later route middleware.
 *
 */


/**
 * Escapes special character in a string for use in
 * a regex.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeRegExp(str) {
	return str.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}



function subdomainRegex(baseUrl){
	return regex = new RegExp("((?!www)\\b[\\w\\.]+)\\." + escapeRegExp(baseUrl) + "(?::)?(?:\d+)?");
}



module.exports = function(options){

	// defaults
	options.prefix = options.prefix || 'subdomain';

	// the returned function
	return function(req, res, next){

		var

		// create our subdomain regex
		regex = subdomainRegex(options.baseUrl),

		// extract the subdomain string from the req.url
		subdomainString = regex.exec(req.headers.host)[1];
		//console.log(req.headers.host);
		//console.log(regex);
		console.log(subdomainString);
		// if there is no subdomain, return
		if(!subdomainString) return next();

		// create an array of subdomains
		subdomainArray = subdomainString.split('.');

		// prend each subdomain
		subdomainArray.forEach(function(subdomain){ req.url = '/' + subdomain + req.url; });

		// finally prepend the suffix so we end up with
		// something like: "/subdomain/[first]/[second]/page"
		req.url = '/' + options.prefix + req.url;

		console.log('req.url: ' + req.url);

		// jump to next middleware in stack
		next();
	};
};