/**
 * Utils
 *
 * Holds any helper utils that express-subdomain-handler requires
 */



/**
 * Escapes special character in a string for use in
 * a regex.
 *
 * @param  {string} str
 * @return {string}
 */
exports.escapeRegExp = function(str) {
	return str.replace(/[-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};
