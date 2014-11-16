define('console', function(require){

	var Ractive = require('ractive');

	var Console = Ractive.extend({
        id: 'console',
        template: '#console-template',
        init: function() {
            this.on('clearLog', this.onClickClear.bind(this));
        },
        onClickClear: function() {
            this.set('messages', []);
        },
        appendLog: function(message) {
            if (typeof message !== 'string') message = JSON.stringify(message, null, 4);
            var msg = {
                text: message,
                time: Date.now()
            };
            this.unshift('messages', msg);
            this.fire('messageRendered');
        },
        data: {
            messages: [],
            highlightText: function(text) {
                return hljs.highlightAuto(text).value;
            },
            formatDate: function (source) {
			    return new Date(source).format(" h:mm:ss yyyy-MM-dd")
			}
        }
    });

	//Do not want to load moment.js
	//http://stackoverflow.com/a/13452892/125083
	Date.prototype.format = function(format) //author: meizz
	{
	  var o = {
	    "M+" : this.getMonth()+1, //month
	    "d+" : this.getDate(),    //day
	    "h+" : this.getHours(),   //hour
	    "m+" : this.getMinutes(), //minute
	    "s+" : this.getSeconds(), //second
	    "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
	    "S" : this.getMilliseconds() //millisecond
	  }

	  if(/(y+)/.test(format)) format=format.replace(RegExp.$1,
	    (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	  for(var k in o)if(new RegExp("("+ k +")").test(format))
	    format = format.replace(RegExp.$1,
	      RegExp.$1.length==1 ? o[k] :
	        ("00"+ o[k]).substr((""+ o[k]).length));
	  return format;
	};

    Ractive.components.Console = Console;

    return Console;
});