/*test script*/
var keywords = `HTML
Javascript
full stack`.split(/\n/)

function highlight(){
  var pages = Array.from(document.querySelectorAll('*')).filter(el=> el.innerHTML && /<[a-zA-Z].*?>/.test(el.innerHTML) === false); 
/*dives into all elements and returns the lowest level elm by omitting anything with an HTML tag. This will cause problems with poorly written HTML, and text content which is representing HTML data, but fuck it because what a simple solution this is. */
  console.log(pages);
  for(var p=0; p<pages.length; p++){
    var page = pages[p].innerHTML;
    for(var i=0; i<keywords.length; i++){
      var rxi = new RegExp(keywords[i].replace(/\s+/g, '.{0,12}'),'i');
      var rxg = new RegExp(keywords[i].replace(/\s+/g, '.{0,12}'),'gi');
      var matches = page.match(rxg) ? page.match(rxg) : [];
      for(var m=0; m<matches.length; m++){
        page = page.replace(matches[m], `<i style="background: hsl(${((i+1)*15)}, 100%, 50%); color: #fff; border: 1px solid hsl(${((i+1)*15)}, 100%, 45%); border-radius: 0.25em;">${matches[m]}</i>`);
      }
    }
    pages[p].innerHTML = page;
  }
}

highlight()

