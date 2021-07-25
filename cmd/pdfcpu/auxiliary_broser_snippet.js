async function getArrayBuffer(file) {
	file.arrayBuffer().then((result) => {
		return result;
	});
}

function optimize() {
	inputs = document.querySelectorAll('input');
	firstFile = inputs[0].files[0];
	console.log(inputs[0].files[0]);

	firstFile.arrayBuffer().then((buffer) => {
		saveByteArray('test.pdf', OptimizeJS(new Uint8Array(buffer)));
	});
}

function merge() {
	inputs = document.querySelectorAll('input');

	promises = [];
	console.log(inputs[0].files);
	for (f of inputs[0].files) {
		promises.push(f.arrayBuffer());
	}

	Promise.all(promises).then((values) => {
		uintArrays = [];
		for (v of values) {
			uintArrays.push(new Uint8Array(v));
		}
		res = MergeJS(uintArrays);
		console.log(res);
		saveByteArray('test.pdf', res);
	});
}

function decrypt(userPW = '', ownerPW = '', keyLength = 128) {
	inputs = document.querySelectorAll('input');
	firstFile = inputs[0].files[0];
	console.log(inputs[0].files[0]);

	firstFile.arrayBuffer().then((buffer) => {
		[res, err_msg] = DecryptJS(new Uint8Array(buffer), userPW, ownerPW, keyLength);
		if (err_msg == '') {
			console.log(res);
			saveByteArray('test.pdf', res);
		} else {
			console.log(err_msg);
		}
	});
}

created_urls = [];

function saveByteArray(reportName, byte) {
	for (url of created_urls) {
		URL.revokeObjectURL(url);
	}
	var blob = new Blob([byte], { type: 'application/pdf' });
	var link = document.createElement('a');
	url = window.URL.createObjectURL(blob);
	created_urls.push(url);
	link.href = url;
	var fileName = reportName;
	link.download = fileName;
	link.click();
}
