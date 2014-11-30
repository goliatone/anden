# Anden

[![Build Status](https://secure.travis-ci.org/goliatone/anden.png)](http://travis-ci.org/goliatone/anden)

Application structure for express apps.

Andén (Spanish)
**plat•form** _(plătˈfôrmˌ)_
>n.  A horizontal surface raised above the level of the adjacent area, as a landing alongside railroad tracks.

## Getting Started
Install the module with: `npm install anden`

You can also install `anden` as a global package and use it in the terminal.

`npm install anden -g`

```terminal
anden -h
anden -p 9000 -a localhost
```

## Organization
HMVC
Sub apps:
static: prefixed with mount name. 
```javascript
//in sub app console
var mountName = 'console';
// GET /console/style.css etc.
app.use(mountName, express.static(__dirname + '/public'));
```

## Examples

## TODOs
- init: Make core modules configurable, ie io-sockets or ws-socket.
- config manager: so we can edit options from CLI and save them in `.anden.json`
- logging: Internal log support. Provide endpoint for apps.

Apps:
- WsConsole
- Log dashboard
- Fakeful
- Tuxedo
- Route dashboard
- Default index page

## Documentation
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2014 goliatone  
Licensed under the MIT license.

