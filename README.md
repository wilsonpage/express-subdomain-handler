#express-subdomain-handler

Express subdomain handler takes all the headache out of subdomain routing in (Express)[http://expressjs.com]. It captures the contents of any
subdomains and writes them into the Express req.url. This means you can write specific route handlers for subdomain urls.

##Examples

http://mysubdomain.example.com => '/subdomain/mysubdomain/'
http://myexcellentsubdom.example.com/homepage => '/subdomain/myexcellentsubdom/homepage'
http://first.second.example.com => '/subdomain/first/second/'
http://first.second.example.com/another/page => '/subdomain/first/second/another/page'


##Usage

Add express-subdomain-handler to your express middleware (stack before any routes are specified)

	app.use( require('express-subdomain-handler')({ baseUrl: 'example.com', prefix: 'myprefix', logger: true }) );


Setup routes to catch subdomain urls so for 'http://mysubdomain.example.com/homepage' I would write my route
handler to look like this.

	app.get('/myprefix/:thesubdomain/thepage', function(req, res, next){

		// for the example url this will print 'mysubdomain'
		res.send(req.params.thesubdomain);

	});