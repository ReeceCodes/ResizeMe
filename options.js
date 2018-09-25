  let _height = document.getElementById('height').value*1;
  let _width = document.getElementById('width').value*1;
  let _currHeight = 0;
  let _currWidth = 0;
  let _padheight = document.getElementById('padheight').value*1;
  let _padwidth = document.getElementById('padwidth').value*1;
  
  chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
    _currHeight = tabs[0].height;
	_currWidth = tabs[0].width;
});
  
// Saves options to chrome.storage
function save_options() {
	_height = document.getElementById('height').value*1;
	_width = document.getElementById('width').value*1;
	_padheight = document.getElementById('padheight').value*1;
    _padwidth = document.getElementById('padwidth').value*1;
  
  chrome.storage.sync.set({
    Qheight: _height,
    Qwidth: _width,
	Qpadheight: _padheight,
	Qpadwidth: _padwidth
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function transferHeight()
{
	_height = document.getElementById('currHeight').innerHTML;
	document.getElementById('height').value = _height
}

function transferWidth()
{
	_width = document.getElementById('currWidth').innerHTML;
	document.getElementById('width').value = _width;
}

function restore_options() {
  
  chrome.storage.sync.get({
    Qheight: screen.availHeight,
    Qwidth: screen.availWidth,
	Qpadheight: 0,
	Qpadwidth: 0
  }, function(items) {
    document.getElementById('height').value = items.Qheight;
    document.getElementById('width').value = items.Qwidth;
	document.getElementById('currHeight').innerHTML = _currHeight;
	document.getElementById('currWidth').innerHTML = _currWidth;
	document.getElementById('padheight').value = items.Qpadheight;
	document.getElementById('padwidth').value = items.Qpadwidth;
  });
  
}

document.addEventListener('DOMContentLoaded', restore_options);

document.getElementById('save').addEventListener('click',
    save_options);
	
document.getElementById('currHeight').addEventListener('click',
    transferHeight);
document.getElementById('currWidth').addEventListener('click',
    transferWidth);