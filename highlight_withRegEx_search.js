var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
var reChar = (s) => s.match(/&#.+?;/g) && s.match(/&#.+?;/g).length > 0 ? s.match(/&#.+?;/g).map(el=> [el,String.fromCharCode(/d+/.exec(el)[0])]).map(m=> s = s.replace(new RegExp(m[0], 'i'), m[1])).pop() : s;

var keywords = parseAsRegexArr('HTML.+?website AND requirements[\\w\\W\\n]+determin');

function parseAsRegexArr(bool) {
if(/\\|\[|\?|\.\+/.test(bool)){
  
  return bool.split(/\s*AND\s*/).map(el=> new RegExp(el,'ig'));
} else {
    var rxReady = (s) => s ? s.replace(/"/g, '\\b').trim().replace(/\)/g, '').replace(/\(/g, '').replace(/\s+/g, '.{0,2}').replace(/\//g, '\\/').replace(/\+/g, '\\+').replace(/\s*\*\s*/g, '.{0,29}') : s;
    var checkSimpleOR = (s)=> /\bor\b/i.test(s) && /\(/.test(s) === false && /\b\s+and\s\b/.test(s) === false;
    var checkAndOrSimple = (s) => [/\bor\b/i,/\band\b/i].every(el=> el.test(s) && /\(/.test(s) === false);

    if(checkAndOrSimple(bool)){
      return bool.replace(/\s+OR\s+|\s*\|\s*/gi, '|').replace(/\//g, '\\/').replace(/"/g, '\\b').replace(/\s+/g, '.{0,2}').replace(/\s*\*\s*/g, '.{0,29}').split(/\band\b/).map(el=> new RegExp(el.trim(), 'i'));

    } else if (checkSimpleOR(bool)) {
      return [new RegExp(bool.replace(/\s+OR\s+|\s*\|\s*/gi, '|').replace(/\//g, '\\/').replace(/"/g, '\\b').replace(/\s+/g, '.{0,2}').replace(/\s*\*\s*/g, '.{0,29}'), 'i')];

    } else {
      var orx = "\\(.+?\\)|(\\(\\w+\\s{0,1}OR\\s|\\w+\\s{0,1}OR\\s)+((\\w+\s)+?|(\\w+)\\)+)+?";
      var orMatch = bool ? bool.match(new RegExp(orx, 'g')) : [];
      var orArr = orMatch ? orMatch.map(b=> rxReady(b.replace(/\s+OR\s+|\s*\|\s*/gi, '|')) ) : [];
      var noOrs = bool ? bool.replace(new RegExp(orx, 'g'), '').split(/\s+[AND\s+]+/i) : bool;
      var ands = noOrs ? noOrs.map(a=> rxReady(a)) : [];
      var xArr = ands.concat(orArr).filter(i=> i != '').map(x=> new RegExp(x, 'ig') );
      return xArr;
    }
  }
}
// var booleanSearch = (bool, target) => parseAsRegexArr(bool).every(x=> x.test(target));



function highlight(){
  var pages = Array.from(document.querySelectorAll('*')).filter(el=> el.innerHTML && /<[a-zA-Z].*?>/.test(el.innerHTML) === false); 
/*dives into all elements and returns the lowest level elm by omitting anything with an HTML tag. This will cause problems with poorly written HTML, and text content which is representing HTML data, but fuck it because what a simple solution this is. */
  console.log(pages);
  for(var p=0; p<pages.length; p++){
    var page = pages[p].innerHTML;
    for(var i=0; i<keywords.length; i++){
      var rxg = keywords[i];
      var matches = page.match(rxg) ? page.match(rxg) : [];
      for(var m=0; m<matches.length; m++){
        page = page.replace(matches[m], `<i class="highlight_search_res" style="background: hsl(${((i+1)*15)}, 100%, 50%); color: #fff; border: 1px solid hsl(${((i+1)*15)}, 100%, 45%); border-radius: 0.25em;">${matches[m]}</i>`);
      }
    }
    pages[p].innerHTML = page;
  }
var search_results_fields = Array.from(cn(document,'highlight_search_res'));
search_results_fields[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
}

highlight()

