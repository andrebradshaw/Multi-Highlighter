function initCtrlShiftFListen() {
  var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
  document.body.onkeydown = advFind;
  var cont = [];
  function advFind(e) {
    cont.push(e.key.toString());
    cont = unq(cont);
    if (['Shift', 'Control', 'F'].every(el => cont.some(i => i == el))) {
      console.log('yes');      
      initAdvancedHighlighterHTML();
      cont = [];
    }
    if (cont.length > 3) {
      cont = [];
    }
  }
}

async function initAdvancedHighlighterHTML(){
var reg = (o, n) => o ? o[n] : '';
var cn = (o, s) => o ? o.getElementsByClassName(s) : console.log(o);
var tn = (o, s) => o ? o.getElementsByTagName(s) : console.log(o);
var gi = (o, s) => o ? o.getElementById(s) : console.log(o);
var rando = (n) => Math.round(Math.random() * n);
var unq = (arr) => arr.filter((e, p, a) => a.indexOf(e) == p);
var delay = (ms) => new Promise(res => setTimeout(res, ms));
var ele = (t) => document.createElement(t);
var attr = (o, k, v) => o.setAttribute(k, v);
// var formatDivContentAsString = (s) => s.replace(/<span>|<br>/g, '\n').replace(/<\w.+?>/g, '').trim();

async function generateDefaultData() {
  var currentState = await getStorageData('qs_main_key');
  if (currentState == undefined || Object.getOwnPropertyNames(currentState).length === 0) {
    var mainKey = 'qs_main_key';
    var mainOptions = JSON.stringify({
      bool_str: 'This.+?example AND (things OR methods) AND "of search"'
    });
    var jsonfile = {};
    jsonfile[mainKey] = mainOptions;
    chrome.storage.sync.set(jsonfile, () =>
      console.log('Saved', mainKey, mainOptions)
    );
  } else {
    console.log(currentState);
  }
}
async function replaceAllData(str) {
  /* used when overwriting from the user input*/
  var mainKey = 'qs_main_key';
  var mainOptions = JSON.stringify({
    bool_str: str
  });
  var jsonfile = {};
  jsonfile[mainKey] = mainOptions;
  chrome.storage.sync.set(jsonfile, () =>
    console.log('Saved', mainKey, mainOptions)
  );
}

const getStorageData = key =>
  new Promise((resolve, reject) =>
    chrome.storage.sync.get(key, result =>
      chrome.runtime.lastError ?
      reject(Error(chrome.runtime.lastError.message)) :
      resolve(result)
    )
  )

async function getMainKeyData() {
  var savedValue = await getStorageData('qs_main_key');
  if (savedValue == undefined || Object.getOwnPropertyNames(savedValue).length === 0) {
    await generateDefaultData();
    var savedValue = await getStorageData('qs_main_key');
  }
  console.log(savedValue);
  var qs_main_obj = JSON.parse(savedValue.qs_main_key);
  return qs_main_obj.bool_str;
}


function aninCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(45deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(135deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function anoutCloseBtn() {
  var l1 = tn(this, 'path')[0];
  var l2 = tn(this, 'path')[1];
  l1.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l1.style.transition = "all 233ms";
  l2.style.transform = "translate(49px, 50px) rotate(225deg) translate(-49px, -50px)";
  l2.style.transition = "all 233ms";
}

function closeView() {
  this.parentElement.parentElement.outerHTML = '';
}

function dragElement() {
  var el = this.parentElement;
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(this.id)) document.getElementById(this.id).onmousedown = dragMouseDown;
  else this.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    el.style.top = (el.offsetTop - pos2) + "px";
    el.style.left = (el.offsetLeft - pos1) + "px";
    el.style.opacity = "0.85";
    el.style.transition = "opacity 700ms";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    el.style.opacity = "1";
  }
}

async function createUserInputHTML(){  
/*used when we first open the HTML*/
  var storage = await getMainKeyData();
  highlight(parseAsRegexArr(storage));
if(gi(document,'keyword_box_input')) gi(document,'keyword_box_input').outerHTML = '';

  var cont = ele('div');
  attr(cont,'id','keyword_box_input');
  attr(cont,'style',`position: fixed; width: ${Math.round(document.body.getBoundingClientRect().width)*.33}px; top: 1px; left: 1px; z-index: 13300;`);
  document.body.appendChild(cont);

  var head = ele('div');
  attr(head, 'style', `display: grid; grid-template-columns: 91% 9%; height: 38px; background: #09274f; border: 1.3px solid #020a14; border-top-left-radius: 0.3em; border-top-right-radius: 0.3em; cursor: move; padding: 6px;`);
  cont.appendChild(head);
  head.onmouseover = dragElement;

  var htxt = ele('div');
  attr(htxt, 'style', `grid-area: 1 / 1; color: #fff;`);
  head.appendChild(htxt);
  htxt.innerText = 'Highlight These Words';

  var cls = ele('div');
  attr(cls, 'style', `grid-area: 1 / 2; width: 30px; height: 30px; cursor: pointer;`);
  head.appendChild(cls);
  cls.innerHTML = `<svg x="0px" y="0px" viewBox="0 0 100 100"><g style="transform: scale(0.85, 0.85)" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g transform="translate(2, 2)" stroke="#e21212" stroke-width="8"><path d="M47.806834,19.6743435 L47.806834,77.2743435" transform="translate(49, 50) rotate(225) translate(-49, -50) "/><path d="M76.6237986,48.48 L19.0237986,48.48" transform="translate(49, 50) rotate(225) translate(-49, -50) "/></g></g></svg>`;
  cls.onmouseenter = aninCloseBtn;
  cls.onmouseleave = anoutCloseBtn;
  cls.onclick = closeView;

  var cbod = ele('div');
  attr(cbod, 'style', `display: grid; grid-template-rows; grid-gap: 10px; border: 1.3px solid #020a14; border-bottom-left-radius: 0.3em; border-bottom-right-radius: 0.3em; background: #fff; padding: 12px;`);
  cont.appendChild(cbod);

  var userInput = ele('input');
  attr(userInput,'id','user_keyword_input');
  attr(userInput,'style', `background: #e9eff7; border-radius: 0.3em; padding: 10px;`);
  cbod.appendChild(userInput);
  userInput.value = storage;
  userInput.onkeyup = highlightKeywords;
  userInput.onblur = updateLastHighlightedBool;
}

function updateLastHighlightedBool(){  
  if(gi(document,'user_keyword_input').value.trim().length > 2) replaceAllData( gi(document,'user_keyword_input').value.trim() );
}
function highlightKeywords(e){
  if(e.key == "Enter"){
    var content = this.value;
    highlight(parseAsRegexArr(content));
  }
}

var parseAsRegexArr = (str)=> /\\|\[|\?|\.\+/.test(str) ? str.split(/\s{0,}\band\b\s{0,}/i).map(el=> el.replace(/\s{0,}\bor\b\s{0,}/ig, '|')).map(el=> new RegExp(el,'i')) : str.split(/\s{0,}\band\b\s{0,}/i).map(el=> el.replace(/\s{0,}\bor\b\s{0,}/ig, '|').replace(/"/g,'\\b').replace(/\(/g,'').replace(/\)/g,'')).map(el=> new RegExp(el,'i'));


function clearHighlightClass(){
  var highlighted = Array.from(cn(document,'highlight_search_res'));
  if(highlighted.length > 0) highlighted.forEach(el=> el.outerHTML = el.innerText);
}

function highlight(keywords){
  clearHighlightClass();
  var pages = Array.from(document.querySelectorAll('*')).filter(el=> el.innerHTML && /<[a-zA-Z].*?>/.test(el.innerHTML) === false); 
/*dives into all elements and returns the lowest level elm by omitting anything with an HTML tag. This will cause problems with poorly written HTML, and text content which is representing HTML data, but fuck it because what a simple solution this is. */
  for(var p=0; p<pages.length; p++){
    var page = pages[p].innerHTML;
    for(var i=0; i<keywords.length; i++){
      var rxg = keywords[i];
      var matches = page && page.match(rxg) ? page.match(rxg) : [];
      for(var m=0; m<matches.length; m++){
        var colorSwitch = (((i+1) * 15) > 39 && (i+1 * 15) < 100) || (((i+1) * 15) > 169 && (i+1 * 15) < 190) ? '#000' : '#fff';
        page = page.replace(matches[m], `<i class="highlight_search_res" style="background: hsl(${((i+1)*15)}, 100%, 50%); color: ${colorSwitch}; border: 1px solid hsl(${((i+1)*15)}, 100%, 45%); border-radius: 0.25em; box-shadow: 1px 1px #bababa; padding: 1px;">${matches[m]}</i>`);
      }
    }
    pages[p].innerHTML = page;
  }
  var search_results_fields = Array.from(cn(document,'highlight_search_res'));
  if(search_results_fields && search_results_fields[0]) search_results_fields[0].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
}
createUserInputHTML();
}//initAdvancedHighlighterHTML

initCtrlShiftFListen();
// onPageLoad
