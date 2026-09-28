/*!
  Highlight.js v11.12.0 (git: fc3f06392f)
  (c) 2006-2026 Josh Goebel <hello@joshgoebel.com> and other contributors
  License: BSD-3-Clause
 */
var hljs=function(){"use strict";class e{constructor(e){
void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}
ignoreMatch(){this.isMatchIgnored=!0}}function s(e){
return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")
}function t(e,...s){const t=Object.create(null);for(const s in e)t[s]=e[s]
;return s.forEach(e=>{for(const s in e)t[s]=e[s]}),t}function n(e){
if(null===e||"object"!=typeof e||Object.isFrozen(e))return e;Object.freeze(e)
;for(const s of Object.getOwnPropertyNames(e))n(e[s]);return e}
const p=e=>!!e.scope;class a{constructor(e,s){
this.buffer="",this.classPrefix=s.classPrefix,e.walk(this)}addText(e){
this.buffer+=s(e)}openNode(e){if(!p(e))return;const s=((e,{prefix:s})=>{
if(e.startsWith("language:"))return e.replace("language:","language-")
;if(e.includes(".")){const t=e.split(".")
;return[`${s}${t.shift()}`,...t.map((e,s)=>`${e}${"_".repeat(s+1)}`)].join(" ")}
return`${s}${e}`})(e.scope,{prefix:this.classPrefix});this.span(s)}closeNode(e){
p(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){
this.buffer+=`<span class="${e}">`}}const r=(e={})=>{const s={children:[]}
;return Object.assign(s,e),s};class d{constructor(){
this.rootNode=r(),this.stack=[this.rootNode]}get top(){
return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){
this.top.children.push(e)}openNode(e){const s=r({scope:e})
;this.add(s),this.stack.push(s)}closeNode(){
if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){
for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}
walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,s){
return"string"==typeof s?e.addText(s):s.children&&(e.openNode(s),
s.children.forEach(s=>this._walk(e,s)),e.closeNode(s)),e}static _collapse(e){
"string"!=typeof e&&e.children&&(e.children.every(e=>"string"==typeof e)?e.children=[e.children.join("")]:e.children.forEach(e=>{
d._collapse(e)}))}}class c extends d{constructor(e){super(),this.options=e}
addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){
this.closeNode()}__addSublanguage(e,s){const t=e.root
;s&&(t.scope="language:"+s),this.add(t)}toHTML(){
return new a(this,this.options).value()}finalize(){
return this.closeAllNodes(),!0}}function i(e){
return e?"string"==typeof e?e:e.source:null}function o(e){return v("(?=",e,")")}
function l(e){return v("(?:",e,")*")}function m(e){return v("(?:",e,")?")}
function v(...e){return e.map(e=>i(e)).join("")}function u(...e){const s=(e=>{
const s=e[e.length-1]
;return"object"==typeof s&&s.constructor===Object?(e.splice(e.length-1,1),s):{}
})(e);return"("+(s.capture?"":"?:")+e.map(e=>i(e)).join("|")+")"}function f(e){
return RegExp(e.toString()+"|").exec("").length-1}
const b=RegExp(u(/\[(?:[^\\\]]|\\.)*\]/,/\(\?<(?![=!])[^>]+>/,/\(\?'[^']+'/,/\(\??/,/\\([1-9][0-9]*)/,/\\./))
;function g(e,{joinWith:s}){let t=0;return e.map(e=>{t+=1;const s=t
;let n=i(e),p="";for(;n.length>0;){const e=b.exec(n);if(!e){p+=n;break}
p+=n.substring(0,e.index),
n=n.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?p+="\\"+(Number(e[1])+s):(p+=e[0],
("("===e[0]||/^\(\?[<']/.test(e[0]))&&t++)}return p}).map(e=>`(${e})`).join(s)}
const _="[a-zA-Z]\\w*",h="[a-zA-Z_]\\w*",x="\\b\\d+(\\.\\d+)?",w="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",q="\\b(0b[01]+)",E={
begin:"\\\\[\\s\\S]",relevance:0},y={scope:"string",begin:"'",end:"'",
illegal:"\\n",contains:[E]},k={scope:"string",begin:'"',end:'"',illegal:"\\n",
contains:[E]},N=(e,s,n={})=>{const p=t({scope:"comment",begin:e,end:s,
contains:[]},n);p.contains.push({scope:"doctag",
begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",
end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0})
;const a=u("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/)
;return p.contains.push({begin:v(/[ ]+/,"(",a,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),p
},O=N("//","$"),M=N("/\\*","\\*/"),A=N("#","$");var T=Object.freeze({
__proto__:null,APOS_STRING_MODE:y,BACKSLASH_ESCAPE:E,BINARY_NUMBER_MODE:{
scope:"number",begin:q,relevance:0},BINARY_NUMBER_RE:q,COMMENT:N,
C_BLOCK_COMMENT_MODE:M,C_LINE_COMMENT_MODE:O,C_NUMBER_MODE:{scope:"number",
begin:w,relevance:0},C_NUMBER_RE:w,END_SAME_AS_BEGIN:e=>Object.assign(e,{
"on:begin":(e,s)=>{s.data._beginMatch=e[1]},"on:end":(e,s)=>{
s.data._beginMatch!==e[1]&&s.ignoreMatch()}}),HASH_COMMENT_MODE:A,IDENT_RE:_,
MATCH_NOTHING_RE:/\b\B/,METHOD_GUARD:{begin:"\\.\\s*"+h,relevance:0},
NUMBER_MODE:{scope:"number",begin:x,relevance:0},NUMBER_RE:x,
PHRASAL_WORDS_MODE:{
begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/
},QUOTE_STRING_MODE:k,REGEXP_MODE:{scope:"regexp",begin:/\/(?=[^/\n]*\/)/,
end:/\/[gimuy]*/,contains:[E,{begin:/\[/,end:/\]/,relevance:0,contains:[E]}]},
RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",
SHEBANG:(e={})=>{const s=/^#![ ]*\//
;return e.binary&&(e.begin=v(s,/.*\b/,e.binary,/\b.*/)),t({scope:"meta",begin:s,
end:/$/,relevance:0,"on:begin":(e,s)=>{0!==e.index&&s.ignoreMatch()}},e)},
TITLE_MODE:{scope:"title",begin:_,relevance:0},UNDERSCORE_IDENT_RE:h,
UNDERSCORE_TITLE_MODE:{scope:"title",begin:h,relevance:0}});function z(e,s){
"."===e.input[e.index-1]&&s.ignoreMatch()}function C(e,s){
void 0!==e.className&&(e.scope=e.className,delete e.className)}function S(e,s){
s&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",
e.__beforeBegin=z,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,
void 0===e.relevance&&(e.relevance=0))}function L(e,s){
Array.isArray(e.illegal)&&(e.illegal=u(...e.illegal))}function R(e,s){
if(e.match){
if(e.begin||e.end)throw Error("begin & end are not supported with match")
;e.begin=e.match,delete e.match}}function I(e,s){
void 0===e.relevance&&(e.relevance=1)}const D=(e,s)=>{if(!e.beforeMatch)return
;if(e.starts)throw Error("beforeMatch cannot be used with starts")
;const t=Object.assign({},e);Object.keys(e).forEach(s=>{delete e[s]
}),e.keywords=t.keywords,e.begin=v(t.beforeMatch,o(t.begin)),e.starts={
relevance:0,contains:[Object.assign(t,{endsParent:!0})]
},e.relevance=0,delete t.beforeMatch
},j=["of","and","for","in","not","or","if","then","parent","list","value"]
;function B(e,s,t="keyword"){const n=Object.create(null)
;return"string"==typeof e?p(t,e.split(" ")):Array.isArray(e)?p(t,e):Object.keys(e).forEach(t=>{
Object.assign(n,B(e[t],s,t))}),n;function p(e,t){
s&&(t=t.map(e=>e.toLowerCase())),t.forEach(s=>{const t=s.split("|")
;n[t[0]]=[e,U(t[0],t[1])]})}}function U(e,s){
return s?Number(s):(e=>j.includes(e.toLowerCase()))(e)?0:1}const P={},F=e=>{
console.error(e)},$=(e,...s)=>{console.log("WARN: "+e,...s)},H=(e,s)=>{
P[`${e}/${s}`]||(console.log(`Deprecated as of ${e}. ${s}`),P[`${e}/${s}`]=!0)
},K=Error();function G(e,s,{key:t}){let n=0;const p=e[t],a={},r={}
;for(let e=1;e<=s.length;e++)r[e+n]=p[e],a[e+n]=!0,n+=f(s[e-1])
;e[t]=r,e[t]._emit=a,e[t]._multi=!0}function Z(e){(e=>{
e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,
delete e.scope)})(e),"string"==typeof e.beginScope&&(e.beginScope={
_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope
}),(e=>{if(Array.isArray(e.begin)){
if(e.skip||e.excludeBegin||e.returnBegin)throw F("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),
K
;if("object"!=typeof e.beginScope||null===e.beginScope)throw F("beginScope must be object"),
K;G(e,e.begin,{key:"beginScope"}),e.begin=g(e.begin,{joinWith:""})}})(e),(e=>{
if(Array.isArray(e.end)){
if(e.skip||e.excludeEnd||e.returnEnd)throw F("skip, excludeEnd, returnEnd not compatible with endScope: {}"),
K
;if("object"!=typeof e.endScope||null===e.endScope)throw F("endScope must be object"),
K;G(e,e.end,{key:"endScope"}),e.end=g(e.end,{joinWith:""})}})(e)}function X(e){
function s(s,t){
return RegExp(i(s),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(t?"g":""))
}class n{constructor(){
this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}
addRule(e,s){
s.position=this.position++,this.matchIndexes[this.matchAt]=s,this.regexes.push([s,e]),
this.matchAt+=f(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null)
;const e=this.regexes.map(e=>e[1]);this.matcherRe=s(g(e,{joinWith:"|"
}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex
;const s=this.matcherRe.exec(e);if(!s)return null
;const t=s.findIndex((e,s)=>s>0&&void 0!==e),n=this.matchIndexes[t]
;return s.splice(0,t),Object.assign(s,n)}}class p{constructor(){
this.rules=[],this.multiRegexes=[],
this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){
if(this.multiRegexes[e])return this.multiRegexes[e];const s=new n
;return this.rules.slice(e).forEach(([e,t])=>s.addRule(e,t)),
s.compile(),this.multiRegexes[e]=s,s}resumingScanAtSamePosition(){
return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,s){
this.rules.push([e,s]),"begin"===s.type&&this.count++}exec(e){
const s=this.getMatcher(this.regexIndex);s.lastIndex=this.lastIndex
;let t=s.exec(e)
;if(this.resumingScanAtSamePosition())if(t&&t.index===this.lastIndex);else{
const s=this.getMatcher(0);s.lastIndex=this.lastIndex+1,t=s.exec(e)}
return t&&(this.regexIndex+=t.position+1,
this.regexIndex===this.count&&this.considerAll()),t}}
if(e.compilerExtensions||(e.compilerExtensions=[]),
e.contains&&e.contains.includes("self"))throw Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.")
;return e.classNameAliases=t(e.classNameAliases||{}),function n(a,r){const d=a
;if(a.isCompiled)return d
;[C,R,Z,D].forEach(e=>e(a,r)),e.compilerExtensions.forEach(e=>e(a,r)),
a.__beforeBegin=null,[S,L,I].forEach(e=>e(a,r)),a.isCompiled=!0;let c=null
;return"object"==typeof a.keywords&&a.keywords.$pattern&&(a.keywords=Object.assign({},a.keywords),
c=a.keywords.$pattern,
delete a.keywords.$pattern),c=c||/\w+/,a.keywords&&(a.keywords=B(a.keywords,e.case_insensitive)),
d.keywordPatternRe=s(c,!0),
r&&(a.begin||(a.begin=/\B|\b/),d.beginRe=s(d.begin),a.end||a.endsWithParent||(a.end=/\B|\b/),
a.end&&(d.endRe=s(d.end)),
d.terminatorEnd=i(d.end)||"",a.endsWithParent&&r.terminatorEnd&&(d.terminatorEnd+=(a.end?"|":"")+r.terminatorEnd)),
a.illegal&&(d.illegalRe=s(a.illegal)),
a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map(e=>(e=>(e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map(s=>t(e,{
variants:null},s))),e.cachedVariants?e.cachedVariants:W(e)?t(e,{
starts:e.starts?t(e.starts):null
}):Object.isFrozen(e)?t(e):e))("self"===e?a:e))),a.contains.forEach(e=>{n(e,d)
}),a.starts&&n(a.starts,r),d.matcher=(e=>{const s=new p
;return e.contains.forEach(e=>s.addRule(e.begin,{rule:e,type:"begin"
})),e.terminatorEnd&&s.addRule(e.terminatorEnd,{type:"end"
}),e.illegal&&s.addRule(e.illegal,{type:"illegal"}),s})(d),d}(e)}function W(e){
return!!e&&(e.endsWithParent||W(e.starts))}class Q extends Error{
constructor(e,s){super(e),this.name="HTMLInjectionError",this.html=s}}
const V=s,Y=t,J=Symbol("nomatch"),ee=s=>{
const t=Object.create(null),p=Object.create(null),a=[];let r=!0
;const d="Could not find the language '{}', did you forget to load/include a language module?",i={
disableAutodetect:!0,name:"Plain text",contains:[]};let f={
ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,
languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",
cssSelector:"pre code",languages:null,__emitter:c};function b(e){
return f.noHighlightRe.test(e)}function g(e,s,t){let n="",p=""
;"object"==typeof s?(n=e,
t=s.ignoreIllegals,p=s.language):(H("10.7.0","highlight(lang, code, ...args) has been deprecated."),
H("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),
p=e,n=s),void 0===t&&(t=!0);const a={code:n,language:p};N("before:highlight",a)
;const r=a.result?a.result:_(a.language,a.code,t)
;return r.code=a.code,N("after:highlight",r),r}function _(s,n,p,a){
const c=Object.create(null);function i(e,s){return e.keywords[s]}function o(){
if(!M.keywords)return void T.addText(z);let e=0;M.keywordPatternRe.lastIndex=0
;let s=M.keywordPatternRe.exec(z),t="";for(;s;){t+=z.substring(e,s.index)
;const n=y.case_insensitive?s[0].toLowerCase():s[0],p=i(M,n);if(p){const[e,a]=p
;if(T.addText(t),
t="",c[n]=(c[n]||0)+1,c[n]<=7&&(C+=a),e.startsWith("_"))t+=s[0];else{
const t=y.classNameAliases[e]||e;m(s[0],t)}}else t+=s[0]
;e=M.keywordPatternRe.lastIndex,s=M.keywordPatternRe.exec(z)}
t+=z.substring(e),T.addText(t)}function l(){null!=M.subLanguage?(()=>{
if(""===z)return;let e=null;if("string"==typeof M.subLanguage){
if(!t[M.subLanguage])return void T.addText(z)
;e=_(M.subLanguage,z,!0,A[M.subLanguage]),A[M.subLanguage]=e._top
}else e=h(z,M.subLanguage.length?M.subLanguage:null)
;M.relevance>0&&(C+=e.relevance),T.__addSublanguage(e._emitter,e.language)
})():o(),z=""}function m(e,s){
""!==e&&(T.startScope(s),T.addText(e),T.endScope())}function v(e,s){let t=1
;const n=s.length-1;for(;t<=n;){if(!e._emit[t]){t++;continue}
const n=y.classNameAliases[e[t]]||e[t],p=s[t];n?m(p,n):(z=p,o(),z=""),t++}}
function u(e,s){
return e.scope&&"string"==typeof e.scope&&T.openNode(y.classNameAliases[e.scope]||e.scope),
e.beginScope&&(e.beginScope._wrap?(m(z,y.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),
z=""):e.beginScope._multi&&(v(e.beginScope,s),z="")),O.push(e),M=e,M}
function b(s,t,n){const p=O[s];let a=((e,s)=>{const t=e&&e.exec(s)
;return t&&0===t.index})(p.endRe,n);if(a){if(p["on:end"]){const s=new e(p)
;p["on:end"](t,s),s.isMatchIgnored&&(a=!1)}if(a){for(;O[s].endsParent&&s>0;)s--
;return s}}return p.endsWithParent&&s>0?b(s-1,t,n):null}function g(e){
return 0===M.matcher.regexIndex?(z+=e[0],1):(R=!0,0)}function x(e){
const s=e[0],t=n.substring(e.index),p=b(O.length-1,e,t);if(null===p)return J
;const a=O[p],r=M
;for(M.endScope&&M.endScope._wrap?(l(),m(s,M.endScope._wrap)):M.endScope&&M.endScope._multi?(l(),
v(M.endScope,e)):r.skip?z+=s:(r.returnEnd||r.excludeEnd||(z+=s),
l(),r.excludeEnd&&(z=s));O.length>p;)M.scope&&T.closeNode(),
M.skip||M.subLanguage||(C+=M.relevance),O.pop(),M=O[O.length-1]
;return a.starts&&u(a.starts,e),r.returnEnd?0:s.length}let w={};function q(t,a){
const d=a&&a[0];if(z+=t,null==d)return l(),0
;if("begin"===w.type&&"end"===a.type&&w.index===a.index&&""===d){
if(z+=n.slice(a.index,a.index+1),!r){const e=Error(`0 width match regex (${s})`)
;throw e.languageName=s,e.badRule=w.rule,e}return 1}
if(w=a,"begin"===a.type)return(s=>{
const t=s[0],n=s.rule,p=new e(n),a=[n.__beforeBegin,n["on:begin"]]
;for(const e of a)if(e&&(e(s,p),p.isMatchIgnored))return g(t)
;return n.skip?z+=t:(n.excludeBegin&&(z+=t),
l(),n.returnBegin||n.excludeBegin||(z=t)),u(n,s),n.returnBegin?0:t.length})(a)
;if("illegal"===a.type&&!p){
const e=Error('Illegal lexeme "'+d+'" for mode "'+(M.scope||"<unnamed>")+'"')
;throw e.mode=M,e}if("end"===a.type){const e=x(a);if(e!==J)return e}
if("illegal"===a.type&&""===d)return a.index===n.length||(z+="\n"),1
;if(L>1e5&&L>3*a.index)throw Error("potential infinite loop, way more iterations than matches")
;return z+=d,d.length}const y=E(s)
;if(!y)throw F(d.replace("{}",s)),Error('Unknown language: "'+s+'"')
;const k=X(y);let N="";const O=a?a.slice():[k];let M=O[O.length-1]
;const A={},T=new f.__emitter(f);(()=>{for(let e=1;e<O.length;e++){
const s=O[e].scope;s&&T.openNode(s)}})();let z="",C=0,S=0,L=0,R=!1;try{
if(y.__emitTokens)y.__emitTokens(n,T);else{for(M.matcher.considerAll();;){
L++,R?R=!1:M.matcher.considerAll(),M.matcher.lastIndex=S
;const e=M.matcher.exec(n);if(!e)break;const s=q(n.substring(S,e.index),e)
;S=e.index+s}q(n.substring(S))}return T.finalize(),N=T.toHTML(),{language:s,
value:N,relevance:C,illegal:!1,_emitter:T,_top:O}}catch(e){
if(e.message&&e.message.includes("Illegal"))return{language:s,value:V(n),
illegal:!0,relevance:0,_illegalBy:{message:e.message,index:S,
context:n.slice(S-100,S+100),mode:e.mode,resultSoFar:N},_emitter:T};if(r)return{
language:s,value:V(n),illegal:!1,relevance:0,errorRaised:e,_emitter:T,_top:O}
;throw e}}function h(e,s){s=s||f.languages||Object.keys(t);const n=(e=>{
const s={value:V(e),illegal:!1,relevance:0,_top:[i],_emitter:new f.__emitter(f)}
;return s._emitter.addText(e),s})(e),p=s.filter(E).filter(k).map(s=>_(s,e,!1))
;p.unshift(n);const a=p.sort((e,s)=>{
if(e.relevance!==s.relevance)return s.relevance-e.relevance
;if(e.language&&s.language){if(E(e.language).supersetOf===s.language)return 1
;if(E(s.language).supersetOf===e.language)return-1}return 0}),[r,d]=a,c=r
;return c.secondBest=d,c}function x(e){let s=null;const t=(e=>{
let s=e.className+" ";s+=e.parentNode?e.parentNode.className:""
;const t=f.languageDetectRe.exec(s);if(t){const s=E(t[1])
;return s||($(d.replace("{}",t[1])),
$("Falling back to no-highlight mode for this block.",e)),s?t[1]:"no-highlight"}
return s.split(/\s+/).find(e=>b(e)||E(e))})(e);if(b(t))return
;if(N("before:highlightElement",{el:e,language:t
}),e.dataset.highlighted)return void console.log("Element previously highlighted. To highlight again, first unset `dataset.highlighted`.",e)
;if(e.children.length>0&&(f.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),
console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),
console.warn("The element with unescaped HTML:"),
console.warn(e)),f.throwUnescapedHTML))throw new Q("One of your code blocks includes unescaped HTML.",e.innerHTML)
;s=e;const n=s.textContent,a=t?g(n,{language:t,ignoreIllegals:!0}):h(n)
;e.innerHTML=a.value,e.dataset.highlighted="yes",((e,s,t)=>{const n=s&&p[s]||t
;e.classList.add("hljs"),e.classList.add("language-"+n)
})(e,t,a.language),e.result={language:a.language,re:a.relevance,
relevance:a.relevance},a.secondBest&&(e.secondBest={
language:a.secondBest.language,relevance:a.secondBest.relevance
}),N("after:highlightElement",{el:e,result:a,text:n})}let w=!1;function q(){
if("loading"===document.readyState)return w||window.addEventListener("DOMContentLoaded",()=>{
q()},!1),void(w=!0);document.querySelectorAll(f.cssSelector).forEach(x)}
function E(e){return e=(e||"").toLowerCase(),t[e]||t[p[e]]}
function y(e,{languageName:s}){"string"==typeof e&&(e=[e]),e.forEach(e=>{
p[e.toLowerCase()]=s})}function k(e){const s=E(e);return s&&!s.disableAutodetect
}function N(e,s){const t=e;a.forEach(e=>{e[t]&&e[t](s)})}Object.assign(s,{
highlight:g,highlightAuto:h,highlightAll:q,highlightElement:x,
highlightBlock:e=>(H("10.7.0","highlightBlock will be removed entirely in v12.0"),
H("10.7.0","Please use highlightElement now."),x(e)),configure:e=>{f=Y(f,e)},
initHighlighting:()=>{
q(),H("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},
initHighlightingOnLoad:()=>{
q(),H("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")
},registerLanguage:(e,n)=>{let p=null;try{p=n(s)}catch(s){
if(F("Language definition for '{}' could not be registered.".replace("{}",e)),
!r)throw s;F(s),p=i}
p.name||(p.name=e),t[e]=p,p.rawDefinition=n.bind(null,s),p.aliases&&y(p.aliases,{
languageName:e})},unregisterLanguage:e=>{delete t[e]
;for(const s of Object.keys(p))p[s]===e&&delete p[s]},
listLanguages:()=>Object.keys(t),getLanguage:E,registerAliases:y,
autoDetection:k,inherit:Y,addPlugin:e=>{(e=>{
e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=s=>{
e["before:highlightBlock"](Object.assign({block:s.el},s))
}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=s=>{
e["after:highlightBlock"](Object.assign({block:s.el},s))})})(e),a.push(e)},
removePlugin:e=>{const s=a.indexOf(e);-1!==s&&a.splice(s,1)}}),s.debugMode=()=>{
r=!1},s.safeMode=()=>{r=!0},s.versionString="11.12.0",s.regex={concat:v,
lookahead:o,either:u,optional:m,anyNumberOfTimes:l}
;for(const e in T)"object"==typeof T[e]&&n(T[e]);return Object.assign(s,T),s
},se=ee({});se.newInstance=()=>ee({});var te=Object.freeze({__proto__:null,
grmr_armasm:e=>{const s={variants:[e.COMMENT("^[ \\t]*(?=#)","$",{relevance:0,
excludeBegin:!0}),e.COMMENT("[;@]","$",{relevance:0
}),e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE]};return{name:"ARM Assembly",
case_insensitive:!0,aliases:["arm"],keywords:{$pattern:"\\.?"+e.IDENT_RE,
meta:".2byte .4byte .align .ascii .asciz .balign .byte .code .data .else .end .endif .endm .endr .equ .err .exitm .extern .global .hword .if .ifdef .ifndef .include .irp .long .macro .rept .req .section .set .skip .space .text .word .arm .thumb .code16 .code32 .force_thumb .thumb_func .ltorg ALIAS ALIGN ARM AREA ASSERT ATTR CN CODE CODE16 CODE32 COMMON CP DATA DCB DCD DCDU DCDO DCFD DCFDU DCI DCQ DCQU DCW DCWU DN ELIF ELSE END ENDFUNC ENDIF ENDP ENTRY EQU EXPORT EXPORTAS EXTERN FIELD FILL FUNCTION GBLA GBLL GBLS GET GLOBAL IF IMPORT INCBIN INCLUDE INFO KEEP LCLA LCLL LCLS LTORG MACRO MAP MEND MEXIT NOFP OPT PRESERVE8 PROC QN READONLY RELOC REQUIRE REQUIRE8 RLIST FN ROUT SETA SETL SETS SN SPACE SUBT THUMB THUMBX TTL WHILE WEND ",
built_in:"r0 r1 r2 r3 r4 r5 r6 r7 r8 r9 r10 r11 r12 r13 r14 r15 w0 w1 w2 w3 w4 w5 w6 w7 w8 w9 w10 w11 w12 w13 w14 w15 w16 w17 w18 w19 w20 w21 w22 w23 w24 w25 w26 w27 w28 w29 w30 x0 x1 x2 x3 x4 x5 x6 x7 x8 x9 x10 x11 x12 x13 x14 x15 x16 x17 x18 x19 x20 x21 x22 x23 x24 x25 x26 x27 x28 x29 x30 pc lr sp ip sl sb fp a1 a2 a3 a4 v1 v2 v3 v4 v5 v6 v7 v8 f0 f1 f2 f3 f4 f5 f6 f7 p0 p1 p2 p3 p4 p5 p6 p7 p8 p9 p10 p11 p12 p13 p14 p15 c0 c1 c2 c3 c4 c5 c6 c7 c8 c9 c10 c11 c12 c13 c14 c15 q0 q1 q2 q3 q4 q5 q6 q7 q8 q9 q10 q11 q12 q13 q14 q15 cpsr_c cpsr_x cpsr_s cpsr_f cpsr_cx cpsr_cxs cpsr_xs cpsr_xsf cpsr_sf cpsr_cxsf spsr_c spsr_x spsr_s spsr_f spsr_cx spsr_cxs spsr_xs spsr_xsf spsr_sf spsr_cxsf s0 s1 s2 s3 s4 s5 s6 s7 s8 s9 s10 s11 s12 s13 s14 s15 s16 s17 s18 s19 s20 s21 s22 s23 s24 s25 s26 s27 s28 s29 s30 s31 d0 d1 d2 d3 d4 d5 d6 d7 d8 d9 d10 d11 d12 d13 d14 d15 d16 d17 d18 d19 d20 d21 d22 d23 d24 d25 d26 d27 d28 d29 d30 d31 {PC} {VAR} {TRUE} {FALSE} {OPT} {CONFIG} {ENDIAN} {CODESIZE} {CPU} {FPU} {ARCHITECTURE} {PCSTOREOFFSET} {ARMASM_VERSION} {INTER} {ROPI} {RWPI} {SWST} {NOSWST} . @"
},contains:[{className:"keyword",
begin:"\\b(adc|(qd?|sh?|u[qh]?)?add(8|16)?|usada?8|(q|sh?|u[qh]?)?(as|sa)x|and|adrl?|sbc|rs[bc]|asr|b[lx]?|blx|bxj|cbn?z|tb[bh]|bic|bfc|bfi|[su]bfx|bkpt|cdp2?|clz|clrex|cmp|cmn|cpsi[ed]|cps|setend|dbg|dmb|dsb|eor|isb|it[te]{0,3}|lsl|lsr|ror|rrx|ldm(([id][ab])|f[ds])?|ldr((s|ex)?[bhd])?|movt?|mvn|mra|mar|mul|[us]mull|smul[bwt][bt]|smu[as]d|smmul|smmla|mla|umlaal|smlal?([wbt][bt]|d)|mls|smlsl?[ds]|smc|svc|sev|mia([bt]{2}|ph)?|mrr?c2?|mcrr2?|mrs|msr|orr|orn|pkh(tb|bt)|rbit|rev(16|sh)?|sel|[su]sat(16)?|nop|pop|push|rfe([id][ab])?|stm([id][ab])?|str(ex)?[bhd]?|(qd?)?sub|(sh?|q|u[qh]?)?sub(8|16)|[su]xt(a?h|a?b(16)?)|srs([id][ab])?|swpb?|swi|smi|tst|teq|wfe|wfi|yield)(eq|ne|cs|cc|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al|hs|lo)?[sptrx]?(?=\\s)"
},s,e.QUOTE_STRING_MODE,{className:"string",begin:"'",end:"[^\\\\]'",relevance:0
},{className:"title",begin:"\\|",end:"\\|",illegal:"\\n",relevance:0},{
className:"number",variants:[{begin:"[#$=]?0x[0-9a-f]+"},{begin:"[#$=]?0b[01]+"
},{begin:"[#$=]\\d+"},{begin:"\\b\\d+"}],relevance:0},{className:"symbol",
variants:[{begin:"^[ \\t]*[a-z_\\.\\$][a-z0-9_\\.\\$]+:"},{
begin:"^[a-z_\\.\\$][a-z0-9_\\.\\$]+"},{begin:"[=#]\\w+"}],relevance:0}]}},
grmr_c:e=>{const s=e.regex,t=e.COMMENT("//","$",{contains:[{begin:/\\\n/}]
}),n="decltype\\(auto\\)",p="[a-zA-Z_]\\w*::",a="("+n+"|"+s.optional(p)+"[a-zA-Z_]\\w*"+s.optional("<[^<>]+>")+")",r={
className:"type",variants:[{begin:"\\b[a-z\\d_]*_t\\b"},{
match:s.concat(/\batomic_/,s.either("bool","char","schar","uchar","short","ushort","int","uint","long","ulong","llong","ullong","char16_t","char32_t","wchar_t","int_least8_t","uint_least8_t","int_least16_t","uint_least16_t","int_least32_t","uint_least32_t","int_least64_t","uint_least64_t","int_fast8_t","uint_fast8_t","int_fast16_t","uint_fast16_t","int_fast32_t","uint_fast32_t","int_fast64_t","uint_fast64_t","intptr_t","uintptr_t","size_t","ptrdiff_t","intmax_t","uintmax_t"),/\b/)
}]},d={className:"string",variants:[{begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",
contains:[e.BACKSLASH_ESCAPE]},{
begin:"(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
end:"'",illegal:"."},e.END_SAME_AS_BEGIN({
begin:/(?:u8?|U|L)?R"([^()\\\s"]{0,16})\(/,end:/\)([^()\\\s"]{0,16})"/})]},c={
className:"number",variants:[{match:/\b(0b[01']+)/},{
match:/(-?)\b([\d']+(\.[\d']*)?|\.[\d']+)((ll|LL|l|L)(u|U)?|(u|U)(ll|LL|l|L)?|f|F|b|B)/
},{
match:/(-?)\b(0[xX][a-fA-F0-9]+(?:'[a-fA-F0-9]+)*(?:\.[a-fA-F0-9]*(?:'[a-fA-F0-9]*)*)?(?:[pP][-+]?[0-9]+)?(l|L)?(u|U)?)/
},{match:/(-?)\b\d+(?:'\d+)*(?:\.\d*(?:'\d*)*)?(?:[eE][-+]?\d+)?/}],relevance:0
},i={scope:"meta",begin:/#\s*include\b/,end:/$/,keywords:{keyword:"include"},
contains:[{begin:/\\\n/},d,{scope:"string",begin:/<.*?>/
},t,e.C_BLOCK_COMMENT_MODE]},o={className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,
keywords:{
keyword:"if else elif endif define undef warning error line pragma _Pragma ifdef ifndef elifdef elifndef include"
},contains:[{begin:/\\\n/,relevance:0},e.inherit(d,{className:"string"
}),t,e.C_BLOCK_COMMENT_MODE]},l=[i,o],m={className:"title",
begin:s.optional(p)+e.IDENT_RE,relevance:0
},v=s.optional(p)+e.IDENT_RE+"\\s*\\(",u={
keyword:["asm","auto","break","case","continue","default","do","else","enum","extern","for","fortran","goto","if","inline","register","restrict","return","sizeof","typeof","typeof_unqual","struct","switch","typedef","union","volatile","while","_Alignas","_Alignof","_Atomic","_Generic","_Noreturn","_Static_assert","_Thread_local","alignas","alignof","noreturn","static_assert","thread_local","_Pragma"],
type:["float","double","signed","unsigned","int","short","long","char","void","_Bool","_BitInt","_Complex","_Imaginary","_Decimal32","_Decimal64","_Decimal96","_Decimal128","_Decimal64x","_Decimal128x","_Float16","_Float32","_Float64","_Float128","_Float32x","_Float64x","_Float128x","const","static","constexpr","complex","bool","imaginary"],
literal:["true","false","NULL"],
built_in:["stdin","stdout","stderr","abort","abs","acos","asin","atan2","atan","calloc","ceil","cosh","cos","exit","exp","fabs","floor","fmod","fprintf","fputs","free","frexp","fscanf","isalnum","isalpha","iscntrl","isdigit","isgraph","islower","isprint","ispunct","isspace","isupper","isxdigit","tolower","toupper","labs","ldexp","log10","log","malloc","realloc","memchr","memcmp","memcpy","memset","modf","pow","printf","putchar","puts","scanf","sinh","sin","snprintf","sprintf","sqrt","sscanf","strcat","strchr","strcmp","strcpy","strcspn","strlen","strncat","strncmp","strncpy","strpbrk","strrchr","strspn","strstr","tanh","tan","vfprintf","vprintf","vsprintf"]
},f=[...l,r,t,e.C_BLOCK_COMMENT_MODE,c,d],b={variants:[{begin:/=/,end:/;/},{
begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],
keywords:u,contains:f.concat([{begin:/\(/,end:/\)/,keywords:u,
contains:f.concat(["self"]),relevance:0}]),relevance:0},g={
begin:"("+a+"[\\*&\\s]+){1,12}"+v,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,
keywords:u,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:n,keywords:u,relevance:0},{
begin:v,returnBegin:!0,contains:[e.inherit(m,{className:"title.function"})],
relevance:0},{relevance:0,match:/,/},{className:"params",begin:/\(/,end:/\)/,
keywords:u,relevance:0,contains:[t,e.C_BLOCK_COMMENT_MODE,d,c,r,{begin:/\(/,
end:/\)/,keywords:u,relevance:0,contains:["self",t,e.C_BLOCK_COMMENT_MODE,d,c,r]
}]},r,t,e.C_BLOCK_COMMENT_MODE,...l]};return{name:"C",aliases:["h"],keywords:u,
disableAutodetect:!0,illegal:"</",contains:[].concat(b,g,f,[...l,{
begin:e.IDENT_RE+"::",keywords:u},{className:"class",
beginKeywords:"enum class struct union",end:/[{;:<>=]/,contains:[{
beginKeywords:"final class struct"},e.TITLE_MODE]}]),exports:{preprocessor:o,
strings:d,keywords:u}}},grmr_cpp:e=>{const s=e.regex,t=e.COMMENT("//","$",{
contains:[{begin:/\\\n/}]
}),n="decltype\\(auto\\)",p="[a-zA-Z_]\\w*::",a="(?!struct)("+n+"|"+s.optional(p)+"[a-zA-Z_]\\w*"+s.optional("<[^<>]+>")+")",r={
className:"type",begin:"\\b[a-z\\d_]*_t\\b"},d={className:"string",variants:[{
begin:'(u8?|U|L)?"',end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},{
begin:"(u8?|U|L)?'(\\\\(x[0-9A-Fa-f]{2}|u[0-9A-Fa-f]{4,8}|[0-7]{3}|\\S)|.)",
end:"'",illegal:"."},e.END_SAME_AS_BEGIN({
begin:/(?:u8?|U|L)?R"([^()\\\s"]{0,16})\(/,end:/\)([^()\\\s"]{0,16})"/})]},c={
className:"number",variants:[{
begin:"[+-]?(?:(?:\\b[0-9](?:'?[0-9])*\\.(?:[0-9](?:'?[0-9])*)?|\\.[0-9](?:'?[0-9])*)(?:[Ee][+-]?[0-9](?:'?[0-9])*)?|\\b[0-9](?:'?[0-9])*[Ee][+-]?[0-9](?:'?[0-9])*|\\b0[Xx](?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*(?:\\.(?:[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)?)?|\\.[0-9A-Fa-f](?:'?[0-9A-Fa-f])*)[Pp][+-]?[0-9](?:'?[0-9])*)(?:[Ff](?:16|32|64|128)?|(BF|bf)16|[Ll]|)"
},{
begin:"[+-]?\\b(?:0[Bb][01](?:'?[01])*|0[Xx][0-9A-Fa-f](?:'?[0-9A-Fa-f])*|0(?:'?[0-7])*|[1-9](?:'?[0-9])*)(?:[Uu](?:LL?|ll?)|[Uu][Zz]?|(?:LL?|ll?)[Uu]?|[Zz][Uu]|)"
}],relevance:0},i=[{scope:"meta",begin:/#\s*include\b/,end:/$/,
keywords:["include"],contains:[{begin:/\\\n/},d,{scope:"string",begin:/<.*?>/
},t,e.C_BLOCK_COMMENT_MODE]},{className:"meta",begin:/#\s*[a-z]+\b/,end:/$/,
keywords:["if","else","elif","embed","endif","define","undef","warning","error","line","pragma","_Pragma","ifdef","ifndef","include"],
contains:[{begin:/\\\n/,relevance:0},e.inherit(d,{className:"string"
}),t,e.C_BLOCK_COMMENT_MODE]}],o={className:"title",
begin:s.optional(p)+e.IDENT_RE,relevance:0
},l=["alignas","alignof","and","and_eq","asm","atomic_cancel","atomic_commit","atomic_noexcept","auto","bitand","bitor","break","case","catch","class","co_await","co_return","co_yield","compl","concept","const_cast|10","consteval","constexpr","constinit","continue","contract_assert","decltype","default","delete","do","dynamic_cast|10","else","enum","explicit","export","extern","false","final","for","friend","goto","if","import","inline","module","mutable","namespace","new","noexcept","not","not_eq","nullptr","operator","or","or_eq","override","pre","private","protected","post","public","reflexpr","register","reinterpret_cast|10","requires","return","sizeof","static_assert","static_cast|10","struct","switch","synchronized","template","this","thread_local","throw","transaction_safe","transaction_safe_dynamic","true","try","typedef","typeid","typename","union","using","virtual","volatile","while","xor","xor_eq","_Atomic","_BitInt"],m=s.optional(p)+`\\b(?!(?:${l.map(e=>e.replace(/\|\d+/,"")).join("|")})\\b)`+e.IDENT_RE+"\\s*\\(",v={
type:["bool","char","char16_t","char32_t","char8_t","double","float","int","long","short","void","wchar_t","unsigned","signed","const","static"],
keyword:l,literal:["NULL","false","nullopt","nullptr","true"],
built_in:["_Pragma"],
_type_hints:["any","auto_ptr","barrier","binary_semaphore","bitset","complex","condition_variable","condition_variable_any","counting_semaphore","deque","false_type","flat_map","flat_set","future","imaginary","initializer_list","istringstream","jthread","latch","lock_guard","multimap","multiset","mutex","optional","ostringstream","packaged_task","pair","promise","priority_queue","queue","recursive_mutex","recursive_timed_mutex","scoped_lock","set","shared_future","shared_lock","shared_mutex","shared_timed_mutex","shared_ptr","stack","string_view","stringstream","timed_mutex","thread","true_type","tuple","unique_lock","unique_ptr","unordered_map","unordered_multimap","unordered_multiset","unordered_set","variant","vector","weak_ptr","wstring","wstring_view"]
},u=s.either(...l.map(e=>e.replace(/\|\d+$/,""))),f={scope:"function.dispatch",
keywords:{
_hint:["abort","abs","acos","apply","as_const","asin","atan","atan2","calloc","ceil","cerr","cin","clog","cos","cosh","cout","declval","endl","exchange","exit","exp","fabs","floor","fmod","forward","fprintf","fputs","free","frexp","fscanf","future","invoke","isalnum","isalpha","iscntrl","isdigit","isgraph","islower","isprint","ispunct","isspace","isupper","isxdigit","labs","launder","ldexp","log","log10","make_pair","make_shared","make_shared_for_overwrite","make_tuple","make_unique","malloc","memchr","memcmp","memcpy","memset","modf","move","pow","printf","putchar","puts","realloc","scanf","sin","sinh","snprintf","sprintf","sqrt","sscanf","std","stderr","stdin","stdout","strcat","strchr","strcmp","strcpy","strcspn","strlen","strncat","strncmp","strncpy","strpbrk","strrchr","strspn","strstr","swap","tan","tanh","terminate","to_underlying","tolower","toupper","vfprintf","visit","vprintf","vsprintf"]
},begin:s.concat(/\b/,`(?!${u}\\b)`,e.IDENT_RE,s.lookahead(/(<[^<>]+>|)\s*\(/))
},b=[f,...i,r,t,e.C_BLOCK_COMMENT_MODE,c,d],g={variants:[{begin:/=/,end:/;/},{
begin:/\(/,end:/\)/},{beginKeywords:"new throw return else",end:/;/}],
keywords:v,contains:b.concat([{begin:/\(/,end:/\)/,keywords:v,
contains:b.concat(["self"]),relevance:0}]),relevance:0},_={className:"function",
begin:"("+a+"[\\*&\\s]+){1,12}"+m,returnBegin:!0,end:/[{;=]/,excludeEnd:!0,
keywords:v,illegal:/[^\w\s\*&:<>.]/,contains:[{begin:n,keywords:v,relevance:0},{
begin:m,returnBegin:!0,contains:[o],relevance:0},{begin:/::/,relevance:0},{
begin:/:/,endsWithParent:!0,contains:[d,c]},{relevance:0,match:/,/},{
className:"params",begin:/\(/,end:/\)/,keywords:v,relevance:0,
contains:[t,e.C_BLOCK_COMMENT_MODE,d,c,r,{begin:/\(/,end:/\)/,keywords:v,
relevance:0,contains:["self",t,e.C_BLOCK_COMMENT_MODE,d,c,r]}]
},r,t,e.C_BLOCK_COMMENT_MODE,...i]};return{name:"C++",
aliases:["cc","c++","h++","hpp","hh","hxx","cxx"],keywords:v,illegal:"</",
classNameAliases:{"function.dispatch":"built_in"},
contains:[].concat(g,_,f,b,[...i,{
begin:"\\b(deque|list|queue|priority_queue|pair|stack|vector|map|set|bitset|multiset|multimap|unordered_map|unordered_set|unordered_multiset|unordered_multimap|array|tuple|optional|variant|function|flat_map|flat_set)\\s*<(?!<)",
end:">",keywords:v,contains:["self",r]},{begin:e.IDENT_RE+"::",keywords:v},{
match:[/\b(?:enum(?:\s+(?:class|struct))?|class|struct|union)/,/\s+/,/\w+/],
className:{1:"keyword",3:"title.class"}}])}},grmr_ebnf:e=>{
const s=e.COMMENT(/\(\*/,/\*\)/);return{name:"Extended Backus-Naur Form",
illegal:/\S/,contains:[s,{className:"attribute",
begin:/^[ ]*[a-zA-Z]+([\s_-]+[a-zA-Z]+)*/},{begin:/=/,end:/[.;]/,contains:[s,{
className:"meta",begin:/\?.*\?/},{className:"string",
variants:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,{begin:"`",end:"`"}]}]}]}},
grmr_llvm:e=>{const s=e.regex,t=/([-a-zA-Z$._][\w$.-]*)/,n={
className:"variable",variants:[{begin:s.concat(/%/,t)},{begin:/%\d+/},{
begin:/#\d+/}]},p={className:"title",variants:[{begin:s.concat(/@/,t)},{
begin:/@\d+/},{begin:s.concat(/!/,t)},{begin:s.concat(/!\d+/,t)},{begin:/!\d+/}]
};return{name:"LLVM IR",keywords:{
keyword:"begin end true false declare define global constant private linker_private internal available_externally linkonce linkonce_odr weak weak_odr appending dllimport dllexport common default hidden protected extern_weak external thread_local zeroinitializer undef null to tail target triple datalayout volatile nuw nsw nnan ninf nsz arcp fast exact inbounds align addrspace section alias module asm sideeffect gc dbg linker_private_weak attributes blockaddress initialexec localdynamic localexec prefix unnamed_addr ccc fastcc coldcc x86_stdcallcc x86_fastcallcc arm_apcscc arm_aapcscc arm_aapcs_vfpcc ptx_device ptx_kernel intel_ocl_bicc msp430_intrcc spir_func spir_kernel x86_64_sysvcc x86_64_win64cc x86_thiscallcc cc c signext zeroext inreg sret nounwind noreturn noalias nocapture byval nest readnone readonly inlinehint noinline alwaysinline optsize ssp sspreq noredzone noimplicitfloat naked builtin cold nobuiltin noduplicate nonlazybind optnone returns_twice sanitize_address sanitize_memory sanitize_thread sspstrong uwtable returned type opaque eq ne slt sgt sle sge ult ugt ule uge oeq one olt ogt ole oge ord uno ueq une x acq_rel acquire alignstack atomic catch cleanup filter inteldialect max min monotonic nand personality release seq_cst singlethread umax umin unordered xchg add fadd sub fsub mul fmul udiv sdiv fdiv urem srem frem shl lshr ashr and or xor icmp fcmp phi call trunc zext sext fptrunc fpext uitofp sitofp fptoui fptosi inttoptr ptrtoint bitcast addrspacecast select va_arg ret br switch invoke unwind unreachable indirectbr landingpad resume malloc alloca free load store getelementptr extractelement insertelement shufflevector getresult extractvalue insertvalue atomicrmw cmpxchg fence argmemonly",
type:"void half bfloat float double fp128 x86_fp80 ppc_fp128 x86_amx x86_mmx ptr label token metadata opaque"
},contains:[{className:"type",begin:/\bi\d+(?=\s|\b)/},e.COMMENT(/;\s*$/,null,{
relevance:0}),e.COMMENT(/;/,/$/),e.C_BLOCK_COMMENT_MODE,{className:"string",
begin:/"/,end:/"/,contains:[{className:"char.escape",match:/\\\d\d/}]},p,{
className:"punctuation",relevance:0,begin:/,/},{className:"operator",
relevance:0,begin:/=/},n,{className:"symbol",variants:[{begin:/^\s*[a-z]+:/}],
relevance:0},{className:"number",variants:[{
begin:/[su]?0[xX][KMLHR]?[a-fA-F0-9]+/},{
begin:/[-+]?\d+(?:[.]\d+)?(?:[eE][-+]?\d+(?:[.]\d+)?)?/}],relevance:0}]}},
grmr_qc:e=>{const s={
keyword:["if","else","switch","case","default","while","for","do","loop","foreach","in","break","continue","return","try","catch","throw","defer","comptime","foreign","extern","namespace","class","struct","enum","type","friend","friendly","static","abstract","final","public","protected","private","operator","roperator","concept","proves","with_proof","_of","at_least","all_of","proved_by","modifier","on_call","on_return","on_use","sizeof","fn","function","qif","qelse","qelif","qswitch"],
modifier:["const","atomic","long","short","out","inout","volatile","restrict"],
type:["int","float","double","bool","string","qbool","char","void","auto","byte","nibble","addr_t"],
literal:["true","false","qtrue","qfalse","both","none","nullptr"]},t={
begin:/[a-zA-Z_]\w*/,keywords:s,relevance:0},n={className:"string",begin:/f"/,
end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE,{className:"subst",
begin:/\{/,end:/\}/,keywords:s.literal}]},p={className:"string",begin:'"',
end:'"',illegal:"\\n",contains:[e.BACKSLASH_ESCAPE]},a={className:"string",
begin:"'",end:"'",contains:[e.BACKSLASH_ESCAPE]};return{name:"QuarticC",
aliases:["C^4","qc"],keywords:s,
contains:[e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE,{className:"built_in",
begin:/`[a-zA-Z_]\w*/,relevance:10},n,{className:"string",
begin:/R"[^\s\\()]*\(/,end:/\)[^\s\\()]*"/},p,a,{className:"number",variants:[{
begin:/\b0[xX][0-9a-fA-F']+[lisyn]?/},{begin:/\b0[oO][0-7']+[lisyn]?/},{
begin:/\b0[bB][01']+[lisyn]?/},{begin:/\b[0-9']+(\.[0-9']+)?[flsayn]?\b/}]},{
className:"operator",
begin:/(\+\+|\+=|\+|--|-=|->|\*=|\*|\/=|\/|===|==|!==|!=|!!|!|>=|>|<<<=|<<<|<<=|<<|<=|<|%=|%|&&&|&\|&|&&|&=|&|\|\|\||\|&\||\|>>=|\|>>|\|>=|\|>|\|\||\|=|\||\^\^|\^|#\^|::|:>=|:>|\$=|\$|~|\?|\.\.\.|@)/
},t]}},grmr_x86asm:e=>({name:"Intel x86 Assembly",aliases:["asm"],
case_insensitive:!0,keywords:{$pattern:"[.%]?"+e.IDENT_RE,
keyword:"lock rep repe repz repne repnz xaquire xrelease bnd nobnd aaa aad aam aas adc add and arpl bb0_reset bb1_reset bound bsf bsr bswap bt btc btr bts call cbw cdq cdqe clc cld cli clts cmc cmp cmpsb cmpsd cmpsq cmpsw cmpxchg cmpxchg486 cmpxchg8b cmpxchg16b cpuid cpu_read cpu_write cqo cwd cwde daa das dec div dmint emms enter equ f2xm1 fabs fadd faddp fbld fbstp fchs fclex fcmovb fcmovbe fcmove fcmovnb fcmovnbe fcmovne fcmovnu fcmovu fcom fcomi fcomip fcomp fcompp fcos fdecstp fdisi fdiv fdivp fdivr fdivrp femms feni ffree ffreep fiadd ficom ficomp fidiv fidivr fild fimul fincstp finit fist fistp fisttp fisub fisubr fld fld1 fldcw fldenv fldl2e fldl2t fldlg2 fldln2 fldpi fldz fmul fmulp fnclex fndisi fneni fninit fnop fnsave fnstcw fnstenv fnstsw fpatan fprem fprem1 fptan frndint frstor fsave fscale fsetpm fsin fsincos fsqrt fst fstcw fstenv fstp fstsw fsub fsubp fsubr fsubrp ftst fucom fucomi fucomip fucomp fucompp fxam fxch fxtract fyl2x fyl2xp1 hlt ibts icebp idiv imul in inc incbin insb insd insw int int01 int1 int03 int3 into invd invpcid invlpg invlpga iret iretd iretq iretw jcxz jecxz jrcxz jmp jmpe lahf lar lds lea leave les lfence lfs lgdt lgs lidt lldt lmsw loadall loadall286 lodsb lodsd lodsq lodsw loop loope loopne loopnz loopz lsl lss ltr mfence monitor mov movd movq movsb movsd movsq movsw movsx movsxd movzx mul mwait neg nop not or out outsb outsd outsw packssdw packsswb packuswb paddb paddd paddsb paddsiw paddsw paddusb paddusw paddw pand pandn pause paveb pavgusb pcmpeqb pcmpeqd pcmpeqw pcmpgtb pcmpgtd pcmpgtw pdistib pf2id pfacc pfadd pfcmpeq pfcmpge pfcmpgt pfmax pfmin pfmul pfrcp pfrcpit1 pfrcpit2 pfrsqit1 pfrsqrt pfsub pfsubr pi2fd pmachriw pmaddwd pmagw pmulhriw pmulhrwa pmulhrwc pmulhw pmullw pmvgezb pmvlzb pmvnzb pmvzb pop popa popad popaw popf popfd popfq popfw por prefetch prefetchw pslld psllq psllw psrad psraw psrld psrlq psrlw psubb psubd psubsb psubsiw psubsw psubusb psubusw psubw punpckhbw punpckhdq punpckhwd punpcklbw punpckldq punpcklwd push pusha pushad pushaw pushf pushfd pushfq pushfw pxor rcl rcr rdshr rdmsr rdpmc rdtsc rdtscp ret retf retn rol ror rdm rsdc rsldt rsm rsts sahf sal salc sar sbb scasb scasd scasq scasw sfence sgdt shl shld shr shrd sidt sldt skinit smi smint smintold smsw stc std sti stosb stosd stosq stosw str sub svdc svldt svts swapgs syscall sysenter sysexit sysret test ud0 ud1 ud2b ud2 ud2a umov verr verw fwait wbinvd wrshr wrmsr xadd xbts xchg xlatb xlat xor cmove cmovz cmovne cmovnz cmova cmovnbe cmovae cmovnb cmovb cmovnae cmovbe cmovna cmovg cmovnle cmovge cmovnl cmovl cmovnge cmovle cmovng cmovc cmovnc cmovo cmovno cmovs cmovns cmovp cmovpe cmovnp cmovpo je jz jne jnz ja jnbe jae jnb jb jnae jbe jna jg jnle jge jnl jl jnge jle jng jc jnc jo jno js jns jpo jnp jpe jp sete setz setne setnz seta setnbe setae setnb setnc setb setnae setcset setbe setna setg setnle setge setnl setl setnge setle setng sets setns seto setno setpe setp setpo setnp addps addss andnps andps cmpeqps cmpeqss cmpleps cmpless cmpltps cmpltss cmpneqps cmpneqss cmpnleps cmpnless cmpnltps cmpnltss cmpordps cmpordss cmpunordps cmpunordss cmpps cmpss comiss cvtpi2ps cvtps2pi cvtsi2ss cvtss2si cvttps2pi cvttss2si divps divss ldmxcsr maxps maxss minps minss movaps movhps movlhps movlps movhlps movmskps movntps movss movups mulps mulss orps rcpps rcpss rsqrtps rsqrtss shufps sqrtps sqrtss stmxcsr subps subss ucomiss unpckhps unpcklps xorps fxrstor fxrstor64 fxsave fxsave64 xgetbv xsetbv xsave xsave64 xsaveopt xsaveopt64 xrstor xrstor64 prefetchnta prefetcht0 prefetcht1 prefetcht2 maskmovq movntq pavgb pavgw pextrw pinsrw pmaxsw pmaxub pminsw pminub pmovmskb pmulhuw psadbw pshufw pf2iw pfnacc pfpnacc pi2fw pswapd maskmovdqu clflush movntdq movnti movntpd movdqa movdqu movdq2q movq2dq paddq pmuludq pshufd pshufhw pshuflw pslldq psrldq psubq punpckhqdq punpcklqdq addpd addsd andnpd andpd cmpeqpd cmpeqsd cmplepd cmplesd cmpltpd cmpltsd cmpneqpd cmpneqsd cmpnlepd cmpnlesd cmpnltpd cmpnltsd cmpordpd cmpordsd cmpunordpd cmpunordsd cmppd comisd cvtdq2pd cvtdq2ps cvtpd2dq cvtpd2pi cvtpd2ps cvtpi2pd cvtps2dq cvtps2pd cvtsd2si cvtsd2ss cvtsi2sd cvtss2sd cvttpd2pi cvttpd2dq cvttps2dq cvttsd2si divpd divsd maxpd maxsd minpd minsd movapd movhpd movlpd movmskpd movupd mulpd mulsd orpd shufpd sqrtpd sqrtsd subpd subsd ucomisd unpckhpd unpcklpd xorpd addsubpd addsubps haddpd haddps hsubpd hsubps lddqu movddup movshdup movsldup clgi stgi vmcall vmclear vmfunc vmlaunch vmload vmmcall vmptrld vmptrst vmread vmresume vmrun vmsave vmwrite vmxoff vmxon invept invvpid pabsb pabsw pabsd palignr phaddw phaddd phaddsw phsubw phsubd phsubsw pmaddubsw pmulhrsw pshufb psignb psignw psignd extrq insertq movntsd movntss lzcnt blendpd blendps blendvpd blendvps dppd dpps extractps insertps movntdqa mpsadbw packusdw pblendvb pblendw pcmpeqq pextrb pextrd pextrq phminposuw pinsrb pinsrd pinsrq pmaxsb pmaxsd pmaxud pmaxuw pminsb pminsd pminud pminuw pmovsxbw pmovsxbd pmovsxbq pmovsxwd pmovsxwq pmovsxdq pmovzxbw pmovzxbd pmovzxbq pmovzxwd pmovzxwq pmovzxdq pmuldq pmulld ptest roundpd roundps roundsd roundss crc32 pcmpestri pcmpestrm pcmpistri pcmpistrm pcmpgtq popcnt getsec pfrcpv pfrsqrtv movbe aesenc aesenclast aesdec aesdeclast aesimc aeskeygenassist vaesenc vaesenclast vaesdec vaesdeclast vaesimc vaeskeygenassist vaddpd vaddps vaddsd vaddss vaddsubpd vaddsubps vandpd vandps vandnpd vandnps vblendpd vblendps vblendvpd vblendvps vbroadcastss vbroadcastsd vbroadcastf128 vcmpeq_ospd vcmpeqpd vcmplt_ospd vcmpltpd vcmple_ospd vcmplepd vcmpunord_qpd vcmpunordpd vcmpneq_uqpd vcmpneqpd vcmpnlt_uspd vcmpnltpd vcmpnle_uspd vcmpnlepd vcmpord_qpd vcmpordpd vcmpeq_uqpd vcmpnge_uspd vcmpngepd vcmpngt_uspd vcmpngtpd vcmpfalse_oqpd vcmpfalsepd vcmpneq_oqpd vcmpge_ospd vcmpgepd vcmpgt_ospd vcmpgtpd vcmptrue_uqpd vcmptruepd vcmplt_oqpd vcmple_oqpd vcmpunord_spd vcmpneq_uspd vcmpnlt_uqpd vcmpnle_uqpd vcmpord_spd vcmpeq_uspd vcmpnge_uqpd vcmpngt_uqpd vcmpfalse_ospd vcmpneq_ospd vcmpge_oqpd vcmpgt_oqpd vcmptrue_uspd vcmppd vcmpeq_osps vcmpeqps vcmplt_osps vcmpltps vcmple_osps vcmpleps vcmpunord_qps vcmpunordps vcmpneq_uqps vcmpneqps vcmpnlt_usps vcmpnltps vcmpnle_usps vcmpnleps vcmpord_qps vcmpordps vcmpeq_uqps vcmpnge_usps vcmpngeps vcmpngt_usps vcmpngtps vcmpfalse_oqps vcmpfalseps vcmpneq_oqps vcmpge_osps vcmpgeps vcmpgt_osps vcmpgtps vcmptrue_uqps vcmptrueps vcmplt_oqps vcmple_oqps vcmpunord_sps vcmpneq_usps vcmpnlt_uqps vcmpnle_uqps vcmpord_sps vcmpeq_usps vcmpnge_uqps vcmpngt_uqps vcmpfalse_osps vcmpneq_osps vcmpge_oqps vcmpgt_oqps vcmptrue_usps vcmpps vcmpeq_ossd vcmpeqsd vcmplt_ossd vcmpltsd vcmple_ossd vcmplesd vcmpunord_qsd vcmpunordsd vcmpneq_uqsd vcmpneqsd vcmpnlt_ussd vcmpnltsd vcmpnle_ussd vcmpnlesd vcmpord_qsd vcmpordsd vcmpeq_uqsd vcmpnge_ussd vcmpngesd vcmpngt_ussd vcmpngtsd vcmpfalse_oqsd vcmpfalsesd vcmpneq_oqsd vcmpge_ossd vcmpgesd vcmpgt_ossd vcmpgtsd vcmptrue_uqsd vcmptruesd vcmplt_oqsd vcmple_oqsd vcmpunord_ssd vcmpneq_ussd vcmpnlt_uqsd vcmpnle_uqsd vcmpord_ssd vcmpeq_ussd vcmpnge_uqsd vcmpngt_uqsd vcmpfalse_ossd vcmpneq_ossd vcmpge_oqsd vcmpgt_oqsd vcmptrue_ussd vcmpsd vcmpeq_osss vcmpeqss vcmplt_osss vcmpltss vcmple_osss vcmpless vcmpunord_qss vcmpunordss vcmpneq_uqss vcmpneqss vcmpnlt_usss vcmpnltss vcmpnle_usss vcmpnless vcmpord_qss vcmpordss vcmpeq_uqss vcmpnge_usss vcmpngess vcmpngt_usss vcmpngtss vcmpfalse_oqss vcmpfalsess vcmpneq_oqss vcmpge_osss vcmpgess vcmpgt_osss vcmpgtss vcmptrue_uqss vcmptruess vcmplt_oqss vcmple_oqss vcmpunord_sss vcmpneq_usss vcmpnlt_uqss vcmpnle_uqss vcmpord_sss vcmpeq_usss vcmpnge_uqss vcmpngt_uqss vcmpfalse_osss vcmpneq_osss vcmpge_oqss vcmpgt_oqss vcmptrue_usss vcmpss vcomisd vcomiss vcvtdq2pd vcvtdq2ps vcvtpd2dq vcvtpd2ps vcvtps2dq vcvtps2pd vcvtsd2si vcvtsd2ss vcvtsi2sd vcvtsi2ss vcvtss2sd vcvtss2si vcvttpd2dq vcvttps2dq vcvttsd2si vcvttss2si vdivpd vdivps vdivsd vdivss vdppd vdpps vextractf128 vextractps vhaddpd vhaddps vhsubpd vhsubps vinsertf128 vinsertps vlddqu vldqqu vldmxcsr vmaskmovdqu vmaskmovps vmaskmovpd vmaxpd vmaxps vmaxsd vmaxss vminpd vminps vminsd vminss vmovapd vmovaps vmovd vmovq vmovddup vmovdqa vmovqqa vmovdqu vmovqqu vmovhlps vmovhpd vmovhps vmovlhps vmovlpd vmovlps vmovmskpd vmovmskps vmovntdq vmovntqq vmovntdqa vmovntpd vmovntps vmovsd vmovshdup vmovsldup vmovss vmovupd vmovups vmpsadbw vmulpd vmulps vmulsd vmulss vorpd vorps vpabsb vpabsw vpabsd vpacksswb vpackssdw vpackuswb vpackusdw vpaddb vpaddw vpaddd vpaddq vpaddsb vpaddsw vpaddusb vpaddusw vpalignr vpand vpandn vpavgb vpavgw vpblendvb vpblendw vpcmpestri vpcmpestrm vpcmpistri vpcmpistrm vpcmpeqb vpcmpeqw vpcmpeqd vpcmpeqq vpcmpgtb vpcmpgtw vpcmpgtd vpcmpgtq vpermilpd vpermilps vperm2f128 vpextrb vpextrw vpextrd vpextrq vphaddw vphaddd vphaddsw vphminposuw vphsubw vphsubd vphsubsw vpinsrb vpinsrw vpinsrd vpinsrq vpmaddwd vpmaddubsw vpmaxsb vpmaxsw vpmaxsd vpmaxub vpmaxuw vpmaxud vpminsb vpminsw vpminsd vpminub vpminuw vpminud vpmovmskb vpmovsxbw vpmovsxbd vpmovsxbq vpmovsxwd vpmovsxwq vpmovsxdq vpmovzxbw vpmovzxbd vpmovzxbq vpmovzxwd vpmovzxwq vpmovzxdq vpmulhuw vpmulhrsw vpmulhw vpmullw vpmulld vpmuludq vpmuldq vpor vpsadbw vpshufb vpshufd vpshufhw vpshuflw vpsignb vpsignw vpsignd vpslldq vpsrldq vpsllw vpslld vpsllq vpsraw vpsrad vpsrlw vpsrld vpsrlq vptest vpsubb vpsubw vpsubd vpsubq vpsubsb vpsubsw vpsubusb vpsubusw vpunpckhbw vpunpckhwd vpunpckhdq vpunpckhqdq vpunpcklbw vpunpcklwd vpunpckldq vpunpcklqdq vpxor vrcpps vrcpss vrsqrtps vrsqrtss vroundpd vroundps vroundsd vroundss vshufpd vshufps vsqrtpd vsqrtps vsqrtsd vsqrtss vstmxcsr vsubpd vsubps vsubsd vsubss vtestps vtestpd vucomisd vucomiss vunpckhpd vunpckhps vunpcklpd vunpcklps vxorpd vxorps vzeroall vzeroupper pclmullqlqdq pclmulhqlqdq pclmullqhqdq pclmulhqhqdq pclmulqdq vpclmullqlqdq vpclmulhqlqdq vpclmullqhqdq vpclmulhqhqdq vpclmulqdq vfmadd132ps vfmadd132pd vfmadd312ps vfmadd312pd vfmadd213ps vfmadd213pd vfmadd123ps vfmadd123pd vfmadd231ps vfmadd231pd vfmadd321ps vfmadd321pd vfmaddsub132ps vfmaddsub132pd vfmaddsub312ps vfmaddsub312pd vfmaddsub213ps vfmaddsub213pd vfmaddsub123ps vfmaddsub123pd vfmaddsub231ps vfmaddsub231pd vfmaddsub321ps vfmaddsub321pd vfmsub132ps vfmsub132pd vfmsub312ps vfmsub312pd vfmsub213ps vfmsub213pd vfmsub123ps vfmsub123pd vfmsub231ps vfmsub231pd vfmsub321ps vfmsub321pd vfmsubadd132ps vfmsubadd132pd vfmsubadd312ps vfmsubadd312pd vfmsubadd213ps vfmsubadd213pd vfmsubadd123ps vfmsubadd123pd vfmsubadd231ps vfmsubadd231pd vfmsubadd321ps vfmsubadd321pd vfnmadd132ps vfnmadd132pd vfnmadd312ps vfnmadd312pd vfnmadd213ps vfnmadd213pd vfnmadd123ps vfnmadd123pd vfnmadd231ps vfnmadd231pd vfnmadd321ps vfnmadd321pd vfnmsub132ps vfnmsub132pd vfnmsub312ps vfnmsub312pd vfnmsub213ps vfnmsub213pd vfnmsub123ps vfnmsub123pd vfnmsub231ps vfnmsub231pd vfnmsub321ps vfnmsub321pd vfmadd132ss vfmadd132sd vfmadd312ss vfmadd312sd vfmadd213ss vfmadd213sd vfmadd123ss vfmadd123sd vfmadd231ss vfmadd231sd vfmadd321ss vfmadd321sd vfmsub132ss vfmsub132sd vfmsub312ss vfmsub312sd vfmsub213ss vfmsub213sd vfmsub123ss vfmsub123sd vfmsub231ss vfmsub231sd vfmsub321ss vfmsub321sd vfnmadd132ss vfnmadd132sd vfnmadd312ss vfnmadd312sd vfnmadd213ss vfnmadd213sd vfnmadd123ss vfnmadd123sd vfnmadd231ss vfnmadd231sd vfnmadd321ss vfnmadd321sd vfnmsub132ss vfnmsub132sd vfnmsub312ss vfnmsub312sd vfnmsub213ss vfnmsub213sd vfnmsub123ss vfnmsub123sd vfnmsub231ss vfnmsub231sd vfnmsub321ss vfnmsub321sd rdfsbase rdgsbase rdrand wrfsbase wrgsbase vcvtph2ps vcvtps2ph adcx adox rdseed clac stac xstore xcryptecb xcryptcbc xcryptctr xcryptcfb xcryptofb montmul xsha1 xsha256 llwpcb slwpcb lwpval lwpins vfmaddpd vfmaddps vfmaddsd vfmaddss vfmaddsubpd vfmaddsubps vfmsubaddpd vfmsubaddps vfmsubpd vfmsubps vfmsubsd vfmsubss vfnmaddpd vfnmaddps vfnmaddsd vfnmaddss vfnmsubpd vfnmsubps vfnmsubsd vfnmsubss vfrczpd vfrczps vfrczsd vfrczss vpcmov vpcomb vpcomd vpcomq vpcomub vpcomud vpcomuq vpcomuw vpcomw vphaddbd vphaddbq vphaddbw vphadddq vphaddubd vphaddubq vphaddubw vphaddudq vphadduwd vphadduwq vphaddwd vphaddwq vphsubbw vphsubdq vphsubwd vpmacsdd vpmacsdqh vpmacsdql vpmacssdd vpmacssdqh vpmacssdql vpmacsswd vpmacssww vpmacswd vpmacsww vpmadcsswd vpmadcswd vpperm vprotb vprotd vprotq vprotw vpshab vpshad vpshaq vpshaw vpshlb vpshld vpshlq vpshlw vbroadcasti128 vpblendd vpbroadcastb vpbroadcastw vpbroadcastd vpbroadcastq vpermd vpermpd vpermps vpermq vperm2i128 vextracti128 vinserti128 vpmaskmovd vpmaskmovq vpsllvd vpsllvq vpsravd vpsrlvd vpsrlvq vgatherdpd vgatherqpd vgatherdps vgatherqps vpgatherdd vpgatherqd vpgatherdq vpgatherqq xabort xbegin xend xtest andn bextr blci blcic blsi blsic blcfill blsfill blcmsk blsmsk blsr blcs bzhi mulx pdep pext rorx sarx shlx shrx tzcnt tzmsk t1mskc valignd valignq vblendmpd vblendmps vbroadcastf32x4 vbroadcastf64x4 vbroadcasti32x4 vbroadcasti64x4 vcompresspd vcompressps vcvtpd2udq vcvtps2udq vcvtsd2usi vcvtss2usi vcvttpd2udq vcvttps2udq vcvttsd2usi vcvttss2usi vcvtudq2pd vcvtudq2ps vcvtusi2sd vcvtusi2ss vexpandpd vexpandps vextractf32x4 vextractf64x4 vextracti32x4 vextracti64x4 vfixupimmpd vfixupimmps vfixupimmsd vfixupimmss vgetexppd vgetexpps vgetexpsd vgetexpss vgetmantpd vgetmantps vgetmantsd vgetmantss vinsertf32x4 vinsertf64x4 vinserti32x4 vinserti64x4 vmovdqa32 vmovdqa64 vmovdqu32 vmovdqu64 vpabsq vpandd vpandnd vpandnq vpandq vpblendmd vpblendmq vpcmpltd vpcmpled vpcmpneqd vpcmpnltd vpcmpnled vpcmpd vpcmpltq vpcmpleq vpcmpneqq vpcmpnltq vpcmpnleq vpcmpq vpcmpequd vpcmpltud vpcmpleud vpcmpnequd vpcmpnltud vpcmpnleud vpcmpud vpcmpequq vpcmpltuq vpcmpleuq vpcmpnequq vpcmpnltuq vpcmpnleuq vpcmpuq vpcompressd vpcompressq vpermi2d vpermi2pd vpermi2ps vpermi2q vpermt2d vpermt2pd vpermt2ps vpermt2q vpexpandd vpexpandq vpmaxsq vpmaxuq vpminsq vpminuq vpmovdb vpmovdw vpmovqb vpmovqd vpmovqw vpmovsdb vpmovsdw vpmovsqb vpmovsqd vpmovsqw vpmovusdb vpmovusdw vpmovusqb vpmovusqd vpmovusqw vpord vporq vprold vprolq vprolvd vprolvq vprord vprorq vprorvd vprorvq vpscatterdd vpscatterdq vpscatterqd vpscatterqq vpsraq vpsravq vpternlogd vpternlogq vptestmd vptestmq vptestnmd vptestnmq vpxord vpxorq vrcp14pd vrcp14ps vrcp14sd vrcp14ss vrndscalepd vrndscaleps vrndscalesd vrndscaless vrsqrt14pd vrsqrt14ps vrsqrt14sd vrsqrt14ss vscalefpd vscalefps vscalefsd vscalefss vscatterdpd vscatterdps vscatterqpd vscatterqps vshuff32x4 vshuff64x2 vshufi32x4 vshufi64x2 kandnw kandw kmovw knotw kortestw korw kshiftlw kshiftrw kunpckbw kxnorw kxorw vpbroadcastmb2q vpbroadcastmw2d vpconflictd vpconflictq vplzcntd vplzcntq vexp2pd vexp2ps vrcp28pd vrcp28ps vrcp28sd vrcp28ss vrsqrt28pd vrsqrt28ps vrsqrt28sd vrsqrt28ss vgatherpf0dpd vgatherpf0dps vgatherpf0qpd vgatherpf0qps vgatherpf1dpd vgatherpf1dps vgatherpf1qpd vgatherpf1qps vscatterpf0dpd vscatterpf0dps vscatterpf0qpd vscatterpf0qps vscatterpf1dpd vscatterpf1dps vscatterpf1qpd vscatterpf1qps prefetchwt1 bndmk bndcl bndcu bndcn bndmov bndldx bndstx sha1rnds4 sha1nexte sha1msg1 sha1msg2 sha256rnds2 sha256msg1 sha256msg2 hint_nop0 hint_nop1 hint_nop2 hint_nop3 hint_nop4 hint_nop5 hint_nop6 hint_nop7 hint_nop8 hint_nop9 hint_nop10 hint_nop11 hint_nop12 hint_nop13 hint_nop14 hint_nop15 hint_nop16 hint_nop17 hint_nop18 hint_nop19 hint_nop20 hint_nop21 hint_nop22 hint_nop23 hint_nop24 hint_nop25 hint_nop26 hint_nop27 hint_nop28 hint_nop29 hint_nop30 hint_nop31 hint_nop32 hint_nop33 hint_nop34 hint_nop35 hint_nop36 hint_nop37 hint_nop38 hint_nop39 hint_nop40 hint_nop41 hint_nop42 hint_nop43 hint_nop44 hint_nop45 hint_nop46 hint_nop47 hint_nop48 hint_nop49 hint_nop50 hint_nop51 hint_nop52 hint_nop53 hint_nop54 hint_nop55 hint_nop56 hint_nop57 hint_nop58 hint_nop59 hint_nop60 hint_nop61 hint_nop62 hint_nop63",
built_in:"ip eip rip al ah bl bh cl ch dl dh sil dil bpl spl r8b r9b r10b r11b r12b r13b r14b r15b ax bx cx dx si di bp sp r8w r9w r10w r11w r12w r13w r14w r15w eax ebx ecx edx esi edi ebp esp eip r8d r9d r10d r11d r12d r13d r14d r15d rax rbx rcx rdx rsi rdi rbp rsp r8 r9 r10 r11 r12 r13 r14 r15 cs ds es fs gs ss st st0 st1 st2 st3 st4 st5 st6 st7 mm0 mm1 mm2 mm3 mm4 mm5 mm6 mm7 xmm0  xmm1  xmm2  xmm3  xmm4  xmm5  xmm6  xmm7  xmm8  xmm9 xmm10  xmm11 xmm12 xmm13 xmm14 xmm15 xmm16 xmm17 xmm18 xmm19 xmm20 xmm21 xmm22 xmm23 xmm24 xmm25 xmm26 xmm27 xmm28 xmm29 xmm30 xmm31 ymm0  ymm1  ymm2  ymm3  ymm4  ymm5  ymm6  ymm7  ymm8  ymm9 ymm10  ymm11 ymm12 ymm13 ymm14 ymm15 ymm16 ymm17 ymm18 ymm19 ymm20 ymm21 ymm22 ymm23 ymm24 ymm25 ymm26 ymm27 ymm28 ymm29 ymm30 ymm31 zmm0  zmm1  zmm2  zmm3  zmm4  zmm5  zmm6  zmm7  zmm8  zmm9 zmm10  zmm11 zmm12 zmm13 zmm14 zmm15 zmm16 zmm17 zmm18 zmm19 zmm20 zmm21 zmm22 zmm23 zmm24 zmm25 zmm26 zmm27 zmm28 zmm29 zmm30 zmm31 k0 k1 k2 k3 k4 k5 k6 k7 bnd0 bnd1 bnd2 bnd3 cr0 cr1 cr2 cr3 cr4 cr8 dr0 dr1 dr2 dr3 dr8 tr3 tr4 tr5 tr6 tr7 r0 r1 r2 r3 r4 r5 r6 r7 r0b r1b r2b r3b r4b r5b r6b r7b r0w r1w r2w r3w r4w r5w r6w r7w r0d r1d r2d r3d r4d r5d r6d r7d r0h r1h r2h r3h r0l r1l r2l r3l r4l r5l r6l r7l r8l r9l r10l r11l r12l r13l r14l r15l db dw dd dq dt ddq do dy dz resb resw resd resq rest resdq reso resy resz incbin equ times byte word dword qword nosplit rel abs seg wrt strict near far a32 ptr",
meta:"%define %xdefine %+ %undef %defstr %deftok %assign %strcat %strlen %substr %rotate %elif %else %endif %if %ifmacro %ifctx %ifidn %ifidni %ifid %ifnum %ifstr %iftoken %ifempty %ifenv %error %warning %fatal %rep %endrep %include %push %pop %repl %pathsearch %depend %use %arg %stacksize %local %line %comment %endcomment .nolist __FILE__ __LINE__ __SECT__  __BITS__ __OUTPUT_FORMAT__ __DATE__ __TIME__ __DATE_NUM__ __TIME_NUM__ __UTC_DATE__ __UTC_TIME__ __UTC_DATE_NUM__ __UTC_TIME_NUM__  __PASS__ struc endstruc istruc at iend align alignb sectalign daz nodaz up down zero default option assume public bits use16 use32 use64 default section segment absolute extern global common cpu float __utf16__ __utf16le__ __utf16be__ __utf32__ __utf32le__ __utf32be__ __float8__ __float16__ __float32__ __float64__ __float80m__ __float80e__ __float128l__ __float128h__ __Infinity__ __QNaN__ __SNaN__ Inf NaN QNaN SNaN float8 float16 float32 float64 float80m float80e float128l float128h __FLOAT_DAZ__ __FLOAT_ROUND__ __FLOAT__"
},contains:[e.COMMENT(";","$",{relevance:0}),{className:"number",variants:[{
begin:"\\b(?:([0-9][0-9_]*)?\\.[0-9_]*(?:[eE][+-]?[0-9_]+)?|(0[Xx])?[0-9][0-9_]*(\\.[0-9_]*)?(?:[pP](?:[+-]?[0-9_]+)?)?)\\b",
relevance:0},{begin:"\\$[0-9][0-9A-Fa-f]*",relevance:0},{
begin:"\\b(?:[0-9A-Fa-f][0-9A-Fa-f_]*[Hh]|[0-9][0-9_]*[DdTt]?|[0-7][0-7_]*[QqOo]|[0-1][0-1_]*[BbYy])\\b"
},{
begin:"\\b(?:0[Xx][0-9A-Fa-f_]+|0[DdTt][0-9_]+|0[QqOo][0-7_]+|0[BbYy][0-1_]+)\\b"
}]},e.QUOTE_STRING_MODE,{className:"string",variants:[{begin:"'",end:"[^\\\\]'"
},{begin:"`",end:"[^\\\\]`"}],relevance:0},{className:"symbol",variants:[{
begin:"^\\s*[A-Za-z._?][A-Za-z0-9_$#@~.?]*(:|\\s+label)"},{
begin:"^\\s*%%[A-Za-z0-9_$#@~.?]*:"}],relevance:0},{className:"subst",
begin:"%[0-9]+",relevance:0},{className:"subst",begin:"%!S+",relevance:0},{
className:"meta",begin:/^\s*\.[\w_-]+/}]})});const ne=se
;for(const e of Object.keys(te)){const s=e.replace("grmr_","").replace("_","-")
;ne.registerLanguage(s,te[e])}return ne}()
;"object"==typeof exports&&"undefined"!=typeof module&&(module.exports=hljs);
