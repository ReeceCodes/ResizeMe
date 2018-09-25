let _height;
let _width;
let _padheight;
let _padwidth;
let didRun = false;
let intID;

chrome.commands.onCommand.addListener(function (cmd) {
	if (cmd == 'exec_RM')
	{
		chrome.storage.sync.get({
    Qheight: screen.availHeight,
    Qwidth: screen.availWidth,
	Qpadheight: 0,
	Qpadwidth: 0
  }, function(items) {
    _height = items.Qheight;
    _width = items.Qwidth;
	_padheight = items.Qpadheight;
	_padwidth = items.Qpadwidth;
	
  });
		
		didRun = false;
		
		intID = setInterval(SizeIt, 50);
		
	}		
});

function SizeIt()
{
	chrome.windows.update(chrome.windows.WINDOW_ID_CURRENT, {height:(_height*1)+(_padheight*1), width:(_width*1)+(_padwidth*1), left:0, top:0}); //adding pixels to account for bookmarks bar, and scrollbars		
	
	didRun = true;	
	
	clearInterval(intID);
}