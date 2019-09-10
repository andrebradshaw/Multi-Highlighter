/*test script*/
var keywords = `apostrophe
why is the separator
advance option`.split(/\n/)

function highlight(){
  var page = document.body.innerHTML;
  for(var i=0; i<keywords.length; i++){
    var rxi = new RegExp(keywords[i].replace(/\s+/g, '.{0,12}'),'i');
    var rxg = new RegExp(keywords[i].replace(/\s+/g, '.{0,12}'),'gi');
    var matches = page.match(rxg) ? page.match(rxg) : [];
    for(var m=0; m<matches.length; m++){
      page = page.replace(matches[m], `<i style="background: hsl(${((i+1)*15)}, 100%, 50%); color: #fff; border: 1px solid hsl(${((i+1)*15)}, 100%, 45%); border-radius: 0.25em;">${matches[m]}</i>`);
    }
  }
  document.body.innerHTML = page;
}

highlight()
