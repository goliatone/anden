define('client', function(require) {
	var $ = require('jquery');

	var Client = function() {};
	Client.prototype.init = function() {
		console.log('Init');
		window.addEventListener('load', this.onPageLoaded.bind(this), false);
	};

	Client.prototype.onPageLoaded = function() {
		this.wsUri = document.getElementById('wsUri');
		this.toggleTls();

		this.connected = false;
		this.connectionBtn = document.getElementById('connect');
		this.connectionBtn.onclick = this.handleConnection.bind(this);
		this.connectionBtn.initialClasses = this.connectionBtn.className;

		this.sendMessage = document.getElementById('sendMessage');

		this.sendBut = document.getElementById('send');
		this.sendBut.onclick = this.doSend.bind(this);

		this.consoleLog = document.getElementById('consoleLog');

		this.clearLogBut = document.getElementById('clearLogBut');
		this.clearLogBut.onclick = this.clearLog.bind(this);

		this.setGuiConnected(false);

		// document.getElementById('disconnect').onclick = this.doDisconnect.bind(this);
		document.getElementById('send').onclick = this.doSend.bind(this);
	};

	Client.prototype.toggleTls = function() {
		console.log('toggle tls');
		var wsPort = (window.location.port.toString() === '' ? '' : ':' + window.location.port);
		if (!this.wsUri.value) this.wsUri.value = 'ws://' + window.location.hostname.replace('www', 'echo') + wsPort;
	};

	Client.prototype.handleConnection = function() {
		if (this.connected) this.doDisconnect();
		else this.doConnect();
	};

	Client.prototype.doConnect = function() {
		console.log('do connect');

		this.checkWebSocketSupport();

		this.connected = true;
		this.connectionBtn.innerHTML = 'Disconnect';
		this.connectionBtn.className = this.connectionBtn.initialClasses + ' success';

		// prefer text messages
		var uri = this.wsUri.value;
		if (uri.indexOf('?') === -1) uri += '?encoding=text';
		else uri += '&encoding=text';

		this.websocket = new WebSocket(uri);
		this.websocket.onopen = this.onOpen.bind(this);
		this.websocket.onclose = this.onClose.bind(this);
		this.websocket.onmessage = this.onMessage.bind(this);
		this.websocket.onerror = this.onError.bind(this);
	};

	Client.prototype.checkWebSocketSupport = function() {
		if (window.MozWebSocket) {
			logToConsole('<span style="color: red;"><strong>Info:</strong> This browser supports WebSocket using the MozWebSocket constructor</span>');
			window.WebSocket = window.MozWebSocket;
		} else if (!window.WebSocket) {
			logToConsole('<span style="color: red;"><strong>Error:</strong> This browser does not have support for WebSocket</span>');
			return;
		}
	};

	Client.prototype.doDisconnect = function() {
		this.connected = false;
		this.connectionBtn.innerHTML = "Connect";
		this.connectionBtn.className = this.connectionBtn.initialClasses;
		this.websocket.close();
	};

	Client.prototype.doSend = function() {
		console.log('sent: ', this.sendMessage.value);
		this.logToConsole('<hr/>');
		this.logToConsole('<span>SENT:</span><br/><pre><code>' + this.sendMessage.value + '</code></pre>');
		this.websocket.send(this.sendMessage.value);
	};

	Client.prototype.logToConsole = function(message) {
		var pre = document.createElement("p");
		pre.style.wordWrap = "break-word";
		pre.innerHTML = message;
		this.consoleLog.appendChild(pre);

		while (this.consoleLog.childNodes.length > 50) {
			this.consoleLog.removeChild(this.consoleLog.firstChild);
		}

		this.consoleLog.scrollTop = this.consoleLog.scrollHeight;
	};

	Client.prototype.onOpen = function(e) {
		this.logToConsole("CONNECTED");
		this.setGuiConnected(true);
	};


	Client.prototype.onClose = function(e) {
		this.logToConsole('DISCONNECTED');
		this.setGuiConnected(false);
	};

	Client.prototype.onMessage = function(e) {
		var response = JSON.parse(e.data);
		response = JSON.stringify(response, undefined, 4);
		this.logToConsole('<span tyle="color: green;">EMITTED:</span><br/><pre><code>' + response + '</code></pre>');
	};

	Client.prototype.onError = function(e) {
		this.logToConsole('<span style="color: red;">ERROR:</span> ' + e.data);
	};


	Client.prototype.setGuiConnected = function(isConnected) {
		this.wsUri.disabled = isConnected;
		this.sendMessage.disabled = !isConnected;
		this.sendBut.disabled = !isConnected;
	};

	Client.prototype.clearLog = function() {
		while (this.consoleLog.childNodes.length > 1) {
			this.consoleLog.removeChild(this.consoleLog.lastChild);
		}
	};



	var _debounce = function(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this,
				args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	};

	var UI = function() {};
	UI.prototype.init = function() {
		console.log('INIT')
		$('#deletePayload').on('click', function() {
			var id = $('#messageID').val();
			if (!id) return;

			$('#sendMessage').val('');
			$("#snippets option[value='" + id + "']").remove();

			localStorage.removeItem(id);
			this.removeIndex(id);
		}.bind(this));
		//load data

		var indexes = this.getIndexes();

		indexes.forEach(function(index) {
			$('#snippets').append('<option value="' + index + '">' + index + '</option>')
		});

		$('#snippets').on('change', function() {
			var value = this.value,
				item = localStorage.getItem(value);
			console.log('on change', this.value, item);
			$('#sendMessage').val(item);
			$('#messageID').val(this.value);
		});

		$('#send').on('click', function() {
			var id = $('#messageID').val();
			if (!id) return;
			var data = $('#sendMessage').val();
			localStorage.setItem(id, data);
			this.setIndex(id);
		}.bind(this));

		var called = 0;
		var updateConsoleHightlight = function() {
			if (!this.c || this.c < 0) this.c = 0;
			else this.c++;
			if (this.c > 10) return this.c = -1;

			$('pre code').each(function(i, e) {
				if ($(this).hasClass('hljs') || $(this).find('hljs').length !== 0) return;
				hljs.highlightBlock(e);
			});
		};

		var observer = new MutationObserver(_debounce(updateConsoleHightlight, 0, true));
		observer.observe($('#consoleLog')[0], {
			attributes: false,
			childList: true,
			subtree: false
		});


	};

	UI.prototype.removeIndex = function(id) {
		var indexes = this.getIndexes(),
			index = indexes.indexOf(id);
		if (index < 0) return;

		indexes.splice(index, 1);

		var data = JSON.stringify(indexes);
		localStorage.setItem('ui.payloads.indexes', data);
	};


	UI.prototype.getIndexes = function() {
		var indexes = localStorage.getItem('ui.payloads.indexes') || [];
		if (typeof indexes === 'string') indexes = JSON.parse(indexes);
		return indexes;
	};

	UI.prototype.setIndex = function(id) {
		var indexes = this.getIndexes();
		if (indexes.indexOf(id) > -1) return;
		indexes.push(id);
		var data = JSON.stringify(indexes);
		localStorage.setItem('ui.payloads.indexes', data);
	};

UI.prototype.dump = function(group) {
    var output = {},
        str = '';
    this.getIndexes().filter(function(id) {
        return id.indexOf(group) === 0;
    }).map(function(id) {
        output[id] = localStorage.getItem(id);
        str += id + '\n' + output[id] + '\n\n';
    });
    console.log(str);
    return output;
};

window.ui = new UI();
window.ui.init();

	var client = new Client();
	client.init();

	window.ui = ui;
	window.client = client;
	//hack, for now
	if (document.readyState === 'complete') window.dispatchEvent(new Event('load'));
});