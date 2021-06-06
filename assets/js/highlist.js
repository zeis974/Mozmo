var hljs=function(){"use strict";function e(t){return t instanceof Map?t.clear=t.delete=t.set=(()=>{throw Error("map is read-only")}):t instanceof Set&&(t.add=t.clear=t.delete=(()=>{throw Error("set is read-only")})),Object.freeze(t),Object.getOwnPropertyNames(t).forEach(n=>{var i=t[n];"object"!=typeof i||Object.isFrozen(i)||e(i)}),t}var t=e,n=e;t.default=n;class i{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function s(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function a(e,...t){const n=Object.create(null);for(const t in e)n[t]=e[t];return t.forEach(e=>{for(const t in e)n[t]=e[t]}),n}const r=e=>!!e.kind;class l{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=s(e)}openNode(e){if(!r(e))return;let t=e.kind;e.sublanguage||(t=`${this.classPrefix}${t}`),this.span(t)}closeNode(e){r(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}class o{constructor(){this.rootNode={children:[]},this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t={kind:e,children:[]};this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach(t=>this._walk(e,t)),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every(e=>"string"==typeof e)?e.children=[e.children.join("")]:e.children.forEach(e=>{o._collapse(e)}))}}class c extends o{constructor(e){super(),this.options=e}addKeyword(e,t){""!==e&&(this.openNode(t),this.addText(e),this.closeNode())}addText(e){""!==e&&this.add(e)}addSublanguage(e,t){const n=e.root;n.kind=t,n.sublanguage=!0,this.add(n)}toHTML(){return new l(this,this.options).value()}finalize(){return!0}}function g(e){return e?"string"==typeof e?e:e.source:null}const u=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./,d="[a-zA-Z]\\w*",h="[a-zA-Z_]\\w*",f="\\b\\d+(\\.\\d+)?",m="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",p="\\b(0b[01]+)",b={begin:"\\\\[\\s\\S]",relevance:0},_={className:"string",begin:"'",end:"'",illegal:"\\n",contains:[b]},E={className:"string",begin:'"',end:'"',illegal:"\\n",contains:[b]},x={begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},y=(e,t,n={})=>{const i=a({className:"comment",begin:e,end:t,contains:[]},n);return i.contains.push(x),i.contains.push({className:"doctag",begin:"(?:TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):",relevance:0}),i},w=y("//","$"),v=y("/\\*","\\*/"),N=y("#","$");var R=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:d,UNDERSCORE_IDENT_RE:h,NUMBER_RE:f,C_NUMBER_RE:m,BINARY_NUMBER_RE:p,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:(e={})=>{const t=/^#![ ]*\//;return e.binary&&(e.begin=((...e)=>e.map(e=>g(e)).join(""))(t,/.*\b/,e.binary,/\b.*/)),a({className:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},BACKSLASH_ESCAPE:b,APOS_STRING_MODE:_,QUOTE_STRING_MODE:E,PHRASAL_WORDS_MODE:x,COMMENT:y,C_LINE_COMMENT_MODE:w,C_BLOCK_COMMENT_MODE:v,HASH_COMMENT_MODE:N,NUMBER_MODE:{className:"number",begin:f,relevance:0},C_NUMBER_MODE:{className:"number",begin:m,relevance:0},BINARY_NUMBER_MODE:{className:"number",begin:p,relevance:0},CSS_NUMBER_MODE:{className:"number",begin:f+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},REGEXP_MODE:{begin:/(?=\/[^\/\n]*\/)/,contains:[{className:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[b,{begin:/\[/,end:/\]/,relevance:0,contains:[b]}]}]},TITLE_MODE:{className:"title",begin:d,relevance:0},UNDERSCORE_TITLE_MODE:{className:"title",begin:h,relevance:0},METHOD_GUARD:{begin:"\\.\\s*[a-zA-Z_]\\w*",relevance:0},END_SAME_AS_BEGIN:e=>Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})});function k(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function M(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=k,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function O(e,t){Array.isArray(e.illegal)&&(e.illegal=((...e)=>"("+e.map(e=>g(e)).join("|")+")")(...e.illegal))}function L(e,t){if(e.match){if(e.begin||e.end)throw Error("begin & end are not supported with match");e.begin=e.match,delete e.match}}function A(e,t){void 0===e.relevance&&(e.relevance=1)}const I=["of","and","for","in","not","or","if","then","parent","list","value"];function B(e,t){return t?Number(t):(e=>I.includes(e.toLowerCase()))(e)?0:1}function T(e,{plugins:t}){function n(t,n){return RegExp(g(t),"m"+(e.case_insensitive?"i":"")+(n?"g":""))}class i{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=(e=>RegExp(e.toString()+"|").exec("").length-1)(e)+1}compile(){0===this.regexes.length&&(this.exec=(()=>null));const e=this.regexes.map(e=>e[1]);this.matcherRe=n(((e,t="|")=>{let n=0;return e.map(e=>{const t=n+=1;let i=g(e),s="";for(;i.length>0;){const e=u.exec(i);if(!e){s+=i;break}s+=i.substring(0,e.index),i=i.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?s+="\\"+(Number(e[1])+t):(s+=e[0],"("===e[0]&&n++)}return s}).map(e=>`(${e})`).join(t)})(e),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex;const t=this.matcherRe.exec(e);if(!t)return null;const n=t.findIndex((e,t)=>t>0&&void 0!==e),i=this.matchIndexes[n];return t.splice(0,n),Object.assign(t,i)}}class s{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e];const t=new i;return this.rules.slice(e).forEach(([e,n])=>t.addRule(e,n)),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex);t.lastIndex=this.lastIndex;let n=t.exec(e);if(this.resumingScanAtSamePosition())if(n&&n.index===this.lastIndex);else{const t=this.getMatcher(0);t.lastIndex=this.lastIndex+1,n=t.exec(e)}return n&&(this.regexIndex+=n.position+1,this.regexIndex===this.count&&this.considerAll()),n}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.");return e.classNameAliases=a(e.classNameAliases||{}),function t(i,r){const l=i;if(i.isCompiled)return l;[L].forEach(e=>e(i,r)),e.compilerExtensions.forEach(e=>e(i,r)),i.__beforeBegin=null,[M,O,A].forEach(e=>e(i,r)),i.isCompiled=!0;let o=null;if("object"==typeof i.keywords&&(o=i.keywords.$pattern,delete i.keywords.$pattern),i.keywords&&(i.keywords=function e(t,n,i="keyword"){const s={};return"string"==typeof t?a(i,t.split(" ")):Array.isArray(t)?a(i,t):Object.keys(t).forEach(i=>{Object.assign(s,e(t[i],n,i))}),s;function a(e,t){n&&(t=t.map(e=>e.toLowerCase())),t.forEach(t=>{const n=t.split("|");s[n[0]]=[e,B(n[0],n[1])]})}}(i.keywords,e.case_insensitive)),i.lexemes&&o)throw Error("ERR: Prefer `keywords.$pattern` to `mode.lexemes`, BOTH are not allowed. (see mode reference) ");return o=o||i.lexemes||/\w+/,l.keywordPatternRe=n(o,!0),r&&(i.begin||(i.begin=/\B|\b/),l.beginRe=n(i.begin),i.endSameAsBegin&&(i.end=i.begin),i.end||i.endsWithParent||(i.end=/\B|\b/),i.end&&(l.endRe=n(i.end)),l.terminatorEnd=g(i.end)||"",i.endsWithParent&&r.terminatorEnd&&(l.terminatorEnd+=(i.end?"|":"")+r.terminatorEnd)),i.illegal&&(l.illegalRe=n(i.illegal)),i.contains||(i.contains=[]),i.contains=[].concat(...i.contains.map(e=>(e=>(e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(t=>a(e,{variants:null},t))),e.cachedVariants?e.cachedVariants:function e(t){return!!t&&(t.endsWithParent||e(t.starts))}(e)?a(e,{starts:e.starts?a(e.starts):null}):Object.isFrozen(e)?a(e):e))("self"===e?i:e))),i.contains.forEach(e=>{t(e,l)}),i.starts&&t(i.starts,r),l.matcher=(e=>{const t=new s;return e.contains.forEach(e=>t.addRule(e.begin,{rule:e,type:"begin"})),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t})(l),l}(e)}function j(e){const t={props:["language","code","autodetect"],data:()=>({detectedLanguage:"",unknownLanguage:!1}),computed:{className(){return this.unknownLanguage?"":"hljs "+this.detectedLanguage},highlighted(){if(!this.autoDetect&&!e.getLanguage(this.language))return console.warn(`The language "${this.language}" you specified could not be found.`),this.unknownLanguage=!0,s(this.code);let t={};return this.autoDetect?(t=e.highlightAuto(this.code),this.detectedLanguage=t.language):(t=e.highlight(this.language,this.code,this.ignoreIllegals),this.detectedLanguage=this.language),t.value},autoDetect(){return!(this.language&&(e=this.autodetect,!e&&""!==e));var e},ignoreIllegals:()=>!0},render(e){return e("pre",{},[e("code",{class:this.className,domProps:{innerHTML:this.highlighted}})])}};return{Component:t,VuePlugin:{install(e){e.component("highlightjs",t)}}}}const C={"after:highlightElement":({el:e,result:t,text:n})=>{const i=D(e);if(!i.length)return;const a=document.createElement("div");a.innerHTML=t.value,t.value=((e,t,n)=>{let i=0,a="";const r=[];function l(){return e.length&&t.length?e[0].offset!==t[0].offset?e[0].offset<t[0].offset?e:t:"start"===t[0].event?e:t:e.length?e:t}function o(e){a+="<"+S(e)+[].map.call(e.attributes,function(e){return" "+e.nodeName+'="'+s(e.value)+'"'}).join("")+">"}function c(e){a+="</"+S(e)+">"}function g(e){("start"===e.event?o:c)(e.node)}for(;e.length||t.length;){let t=l();if(a+=s(n.substring(i,t[0].offset)),i=t[0].offset,t===e){r.reverse().forEach(c);do{g(t.splice(0,1)[0]),t=l()}while(t===e&&t.length&&t[0].offset===i);r.reverse().forEach(o)}else"start"===t[0].event?r.push(t[0].node):r.pop(),g(t.splice(0,1)[0])}return a+s(n.substr(i))})(i,D(a),n)}};function S(e){return e.nodeName.toLowerCase()}function D(e){const t=[];return function e(n,i){for(let s=n.firstChild;s;s=s.nextSibling)3===s.nodeType?i+=s.nodeValue.length:1===s.nodeType&&(t.push({event:"start",offset:i,node:s}),i=e(s,i),S(s).match(/br|hr|img|input/)||t.push({event:"stop",offset:i,node:s}));return i}(e,0),t}const P={},H=e=>{console.error(e)},$=(e,...t)=>{console.log("WARN: "+e,...t)},U=(e,t)=>{P[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),P[`${e}/${t}`]=!0)},q=s,K=a,z=Symbol("nomatch");return(e=>{const n=Object.create(null),s=Object.create(null),a=[];let r=!0;const l=/(^(<[^>]+>|\t|)+|\n)/gm,o="Could not find the language '{}', did you forget to load/include a language module?",g={disableAutodetect:!0,name:"Plain text",contains:[]};let u={noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",tabReplace:null,useBR:!1,languages:null,__emitter:c};function d(e){return u.noHighlightRe.test(e)}function h(e,t,n,i){let s="",a="";"object"==typeof t?(s=e,n=t.ignoreIllegals,a=t.language,i=void 0):(U("10.7.0","highlight(lang, code, ...args) has been deprecated."),U("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),a=e,s=t);const r={code:s,language:a};M("before:highlight",r);const l=r.result?r.result:f(r.language,r.code,n,i);return l.code=r.code,M("after:highlight",l),l}function f(e,t,s,l){function c(e,t){const n=E.case_insensitive?t[0].toLowerCase():t[0];return Object.prototype.hasOwnProperty.call(e.keywords,n)&&e.keywords[n]}function g(){null!=w.subLanguage?(()=>{if(""===k)return;let e=null;if("string"==typeof w.subLanguage){if(!n[w.subLanguage])return void R.addText(k);e=f(w.subLanguage,k,!0,N[w.subLanguage]),N[w.subLanguage]=e.top}else e=m(k,w.subLanguage.length?w.subLanguage:null);w.relevance>0&&(M+=e.relevance),R.addSublanguage(e.emitter,e.language)})():(()=>{if(!w.keywords)return void R.addText(k);let e=0;w.keywordPatternRe.lastIndex=0;let t=w.keywordPatternRe.exec(k),n="";for(;t;){n+=k.substring(e,t.index);const i=c(w,t);if(i){const[e,s]=i;if(R.addText(n),n="",M+=s,e.startsWith("_"))n+=t[0];else{const n=E.classNameAliases[e]||e;R.addKeyword(t[0],n)}}else n+=t[0];e=w.keywordPatternRe.lastIndex,t=w.keywordPatternRe.exec(k)}n+=k.substr(e),R.addText(n)})(),k=""}function d(e){return e.className&&R.openNode(E.classNameAliases[e.className]||e.className),w=Object.create(e,{parent:{value:w}})}function h(e,t,n){let s=((e,t)=>{const n=e&&e.exec(t);return n&&0===n.index})(e.endRe,n);if(s){if(e["on:end"]){const n=new i(e);e["on:end"](t,n),n.isMatchIgnored&&(s=!1)}if(s){for(;e.endsParent&&e.parent;)e=e.parent;return e}}if(e.endsWithParent)return h(e.parent,t,n)}function p(e){return 0===w.matcher.regexIndex?(k+=e[0],1):(A=!0,0)}let b={};function _(n,a){const l=a&&a[0];if(k+=n,null==l)return g(),0;if("begin"===b.type&&"end"===a.type&&b.index===a.index&&""===l){if(k+=t.slice(a.index,a.index+1),!r){const t=Error("0 width match regex");throw t.languageName=e,t.badRule=b.rule,t}return 1}if(b=a,"begin"===a.type)return function(e){const t=e[0],n=e.rule,s=new i(n),a=[n.__beforeBegin,n["on:begin"]];for(const n of a)if(n&&(n(e,s),s.isMatchIgnored))return p(t);return n&&n.endSameAsBegin&&(n.endRe=RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"),"m")),n.skip?k+=t:(n.excludeBegin&&(k+=t),g(),n.returnBegin||n.excludeBegin||(k=t)),d(n),n.returnBegin?0:t.length}(a);if("illegal"===a.type&&!s){const e=Error('Illegal lexeme "'+l+'" for mode "'+(w.className||"<unnamed>")+'"');throw e.mode=w,e}if("end"===a.type){const e=function(e){const n=e[0],i=t.substr(e.index),s=h(w,e,i);if(!s)return z;const a=w;a.skip?k+=n:(a.returnEnd||a.excludeEnd||(k+=n),g(),a.excludeEnd&&(k=n));do{w.className&&R.closeNode(),w.skip||w.subLanguage||(M+=w.relevance),w=w.parent}while(w!==s.parent);return s.starts&&(s.endSameAsBegin&&(s.starts.endRe=s.endRe),d(s.starts)),a.returnEnd?0:n.length}(a);if(e!==z)return e}if("illegal"===a.type&&""===l)return 1;if(L>1e5&&L>3*a.index)throw Error("potential infinite loop, way more iterations than matches");return k+=l,l.length}const E=v(e);if(!E)throw H(o.replace("{}",e)),Error('Unknown language: "'+e+'"');const x=T(E,{plugins:a});let y="",w=l||x;const N={},R=new u.__emitter(u);(()=>{const e=[];for(let t=w;t!==E;t=t.parent)t.className&&e.unshift(t.className);e.forEach(e=>R.openNode(e))})();let k="",M=0,O=0,L=0,A=!1;try{for(w.matcher.considerAll();;){L++,A?A=!1:w.matcher.considerAll(),w.matcher.lastIndex=O;const e=w.matcher.exec(t);if(!e)break;const n=_(t.substring(O,e.index),e);O=e.index+n}return _(t.substr(O)),R.closeAllNodes(),R.finalize(),y=R.toHTML(),{relevance:Math.floor(M),value:y,language:e,illegal:!1,emitter:R,top:w}}catch(n){if(n.message&&n.message.includes("Illegal"))return{illegal:!0,illegalBy:{msg:n.message,context:t.slice(O-100,O+100),mode:n.mode},sofar:y,relevance:0,value:q(t),emitter:R};if(r)return{illegal:!1,relevance:0,value:q(t),emitter:R,language:e,top:w,errorRaised:n};throw n}}function m(e,t){t=t||u.languages||Object.keys(n);const i=(e=>{const t={relevance:0,emitter:new u.__emitter(u),value:q(e),illegal:!1,top:g};return t.emitter.addText(e),t})(e),s=t.filter(v).filter(k).map(t=>f(t,e,!1));s.unshift(i);const a=s.sort((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance;if(e.language&&t.language){if(v(e.language).supersetOf===t.language)return 1;if(v(t.language).supersetOf===e.language)return-1}return 0}),[r,l]=a,o=r;return o.second_best=l,o}const p={"before:highlightElement":({el:e})=>{u.useBR&&(e.innerHTML=e.innerHTML.replace(/\n/g,"").replace(/<br[ \/]*>/g,"\n"))},"after:highlightElement":({result:e})=>{u.useBR&&(e.value=e.value.replace(/\n/g,"<br>"))}},b=/^(<[^>]+>|\t)+/gm,_={"after:highlightElement":({result:e})=>{u.tabReplace&&(e.value=e.value.replace(b,e=>e.replace(/\t/g,u.tabReplace)))}};function E(e){let t=null;const n=(e=>{let t=e.className+" ";t+=e.parentNode?e.parentNode.className:"";const n=u.languageDetectRe.exec(t);if(n){const t=v(n[1]);return t||($(o.replace("{}",n[1])),$("Falling back to no-highlight mode for this block.",e)),t?n[1]:"no-highlight"}return t.split(/\s+/).find(e=>d(e)||v(e))})(e);if(d(n))return;M("before:highlightElement",{el:e,language:n});const i=(t=e).textContent,a=n?h(i,{language:n,ignoreIllegals:!0}):m(i);M("after:highlightElement",{el:e,result:a,text:i}),e.innerHTML=a.value,((e,t,n)=>{const i=t?s[t]:n;e.classList.add("hljs"),i&&e.classList.add(i)})(e,n,a.language),e.result={language:a.language,re:a.relevance,relavance:a.relevance},a.second_best&&(e.second_best={language:a.second_best.language,re:a.second_best.relevance,relavance:a.second_best.relevance})}const x=()=>{x.called||(x.called=!0,U("10.6.0","initHighlighting() is deprecated.  Use highlightAll() instead."),document.querySelectorAll("pre code").forEach(E))};let y=!1;function w(){"loading"!==document.readyState?document.querySelectorAll("pre code").forEach(E):y=!0}function v(e){return e=(e||"").toLowerCase(),n[e]||n[s[e]]}function N(e,{languageName:t}){"string"==typeof e&&(e=[e]),e.forEach(e=>{s[e.toLowerCase()]=t})}function k(e){const t=v(e);return t&&!t.disableAutodetect}function M(e,t){const n=e;a.forEach(e=>{e[n]&&e[n](t)})}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",()=>{y&&w()},!1),Object.assign(e,{highlight:h,highlightAuto:m,highlightAll:w,fixMarkup:e=>{return U("10.2.0","fixMarkup will be removed entirely in v11.0"),U("10.2.0","Please see https://github.com/highlightjs/highlight.js/issues/2534"),t=e,u.tabReplace||u.useBR?t.replace(l,e=>"\n"===e?u.useBR?"<br>":e:u.tabReplace?e.replace(/\t/g,u.tabReplace):e):t;var t},highlightElement:E,highlightBlock:e=>(U("10.7.0","highlightBlock will be removed entirely in v12.0"),U("10.7.0","Please use highlightElement now."),E(e)),configure:e=>{e.useBR&&(U("10.3.0","'useBR' will be removed entirely in v11.0"),U("10.3.0","Please see https://github.com/highlightjs/highlight.js/issues/2559")),u=K(u,e)},initHighlighting:x,initHighlightingOnLoad:()=>{U("10.6.0","initHighlightingOnLoad() is deprecated.  Use highlightAll() instead."),y=!0},registerLanguage:(t,i)=>{let s=null;try{s=i(e)}catch(e){if(H("Language definition for '{}' could not be registered.".replace("{}",t)),!r)throw e;H(e),s=g}s.name||(s.name=t),n[t]=s,s.rawDefinition=i.bind(null,e),s.aliases&&N(s.aliases,{languageName:t})},unregisterLanguage:e=>{delete n[e];for(const t of Object.keys(s))s[t]===e&&delete s[t]},listLanguages:()=>Object.keys(n),getLanguage:v,registerAliases:N,requireLanguage:e=>{U("10.4.0","requireLanguage will be removed entirely in v11."),U("10.4.0","Please see https://github.com/highlightjs/highlight.js/pull/2844");const t=v(e);if(t)return t;throw Error("The '{}' language is required, but not loaded.".replace("{}",e))},autoDetection:k,inherit:K,addPlugin:e=>{(e=>{e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=(t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))})),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=(t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))}))})(e),a.push(e)},vuePlugin:j(e).VuePlugin}),e.debugMode=(()=>{r=!1}),e.safeMode=(()=>{r=!0}),e.versionString="10.7.2";for(const e in R)"object"==typeof R[e]&&t(R[e]);return Object.assign(e,R),e.addPlugin(p),e.addPlugin(C),e.addPlugin(_),e})({})}();"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=hljs),hljs.registerLanguage("c",(()=>{"use strict";function e(e){return((...e)=>e.map(e=>(e=>e?"string"==typeof e?e:e.source:null)(e)).join(""))("(",e,")?")}return t=>{const n=t.COMMENT("//","$",{contains:[{begin:/\\\n/}]}),i="[a-zA-Z_]\\w*::",s="(decltype\\(auto\\)|"+e(i)+"[a-zA-Z_]\\w*"+e("<[^<>]+>")+")",a={className:"keyword",begin:"\\b[a-z\\d_]*_t\\b"},r={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[t.BACKSLASH_ESCAPE]},{begin:"(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",end:"'",illegal:"."},t.END_SAME_AS_BEGIN({begin:/(?:u8?|U|L)?R"([^()\\ ]{0,16})\(/,end:/\)([^()\\ ]{0,16})"/})]},l={className:"number",variants:[{begin:"\\b(0b[01']+)"},{begin:"(-?)\\b([\\d']+(\\.[\\d']*)?|\\.[\\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)"},{begin:"(-?)(\\b0[xX][a-fA-F0-9']+|(\\b[\\d']+(\\.[\\d']*)?|\\.[\\d']+)([eE][-+]?[\\d']+)?)"}],relevance:0},o={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,keywords:{"meta-keyword":"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef include"},contains:[{begin:/\\\n/,relevance:0},t.inherit(r,{className:"meta-string"}),{className:"meta-string",begin:/<.*?>/},n,t.C_BLOCK_COMMENT_MODE]},c={className:"title",begin:e(i)+t.IDENT_RE,relevance:0},g=e(i)+t.IDENT_RE+"\\s*\\(",u={keyword:"int float while private char char8_t char16_t char32_t catch import module export virtual operator sizeof dynamic_cast|10 typedef const_cast|10 const for static_cast|10 union namespace unsigned long volatile static protected bool template mutable if public friend do goto auto void enum else break extern using asm case typeid wchar_t short reinterpret_cast|10 default double register explicit signed typename try this switch continue inline delete alignas alignof constexpr consteval constinit decltype concept co_await co_return co_yield requires noexcept static_assert thread_local restrict final override atomic_bool atomic_char atomic_schar atomic_uchar atomic_short atomic_ushort atomic_int atomic_uint atomic_long atomic_ulong atomic_llong atomic_ullong new throw return and and_eq bitand bitor compl not not_eq or or_eq xor xor_eq",built_in:"std string wstring cin cout cerr clog stdin stdout stderr stringstream istringstream ostringstream auto_ptr deque list queue stack vector map set pair bitset multiset multimap unordered_set unordered_map unordered_multiset unordered_multimap priority_queue make_pair array shared_ptr abort terminate abs acos asin atan2 atan calloc ceil cosh cos exit exp fabs floor fmod fprintf fputs free frexp fscanf future isalnum isalpha iscntrl isdigit isgraph islower isprint ispunct isspace isupper isxdigit tolower toupper labs ldexp log10 log malloc realloc memchr memcmp memcpy memset modf pow printf putchar puts scanf sinh sin snprintf sprintf sqrt sscanf strcat strchr strcmp strcpy strcspn strlen strncat strncmp strncpy strpbrk strrchr strspn strstr tanh tan vfprintf vprintf vsprintf endl initializer_list unique_ptr _Bool complex _Complex imaginary _Imaginary",literal:"true false nullptr NULL"},d=[o,a,n,t.C_BLOCK_COMMENT_MODE,l,r],h={variants:[{begin:/=/,end:/;/},{begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],keywords:u,contains:d.concat([{begin:/\(/,end:/\)/,keywords:u,contains:d.concat(["self"]),relevance:0}]),relevance:0},f={className:"function",begin:"("+s+"[\\*&\\s]+)+"+g,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,keywords:u,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:"decltype\\(auto\\)",keywords:u,relevance:0},{begin:g,returnBegin:!0,contains:[c],relevance:0},{className:"params",begin:/\(/,end:/\)/,keywords:u,relevance:0,contains:[n,t.C_BLOCK_COMMENT_MODE,r,l,a,{begin:/\(/,end:/\)/,keywords:u,relevance:0,contains:["self",n,t.C_BLOCK_COMMENT_MODE,r,l,a]}]},a,n,t.C_BLOCK_COMMENT_MODE,o]};return{name:"C",aliases:["h"],keywords:u,disableAutodetect:!0,illegal:"</",contains:[].concat(h,f,d,[o,{begin:"\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array)\\s*<",end:">",keywords:u,contains:["self",a]},{begin:t.IDENT_RE+"::",keywords:u},{className:"class",beginKeywords:"enum class struct union",end:/[{;:<>=]/,contains:[{beginKeywords:"final class struct"},t.TITLE_MODE]}]),exports:{preprocessor:o,strings:r,keywords:u}}}})());