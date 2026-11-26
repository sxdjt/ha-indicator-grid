/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$2=globalThis,e$2=t$2.ShadowRoot&&(void 0===t$2.ShadyCSS||t$2.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s$2=Symbol(),o$4=new WeakMap;let n$3 = class n{constructor(t,e,o){if(this._$cssResult$=true,o!==s$2)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e;}get styleSheet(){let t=this.o;const s=this.t;if(e$2&&void 0===t){const e=void 0!==s&&1===s.length;e&&(t=o$4.get(s)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&o$4.set(s,t));}return t}toString(){return this.cssText}};const r$4=t=>new n$3("string"==typeof t?t:t+"",void 0,s$2),i$3=(t,...e)=>{const o=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(true===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new n$3(o,t,s$2)},S$1=(s,o)=>{if(e$2)s.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const e of o){const o=document.createElement("style"),n=t$2.litNonce;void 0!==n&&o.setAttribute("nonce",n),o.textContent=e.cssText,s.appendChild(o);}},c$2=e$2?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return r$4(e)})(t):t;

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:i$2,defineProperty:e$1,getOwnPropertyDescriptor:h$1,getOwnPropertyNames:r$3,getOwnPropertySymbols:o$3,getPrototypeOf:n$2}=Object,a$1=globalThis,c$1=a$1.trustedTypes,l$1=c$1?c$1.emptyScript:"",p$1=a$1.reactiveElementPolyfillSupport,d$1=(t,s)=>t,u$1={toAttribute(t,s){switch(s){case Boolean:t=t?l$1:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t);}return t},fromAttribute(t,s){let i=t;switch(s){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t);}catch(t){i=null;}}return i}},f$1=(t,s)=>!i$2(t,s),b$1={attribute:true,type:String,converter:u$1,reflect:false,useDefault:false,hasChanged:f$1};Symbol.metadata??=Symbol("metadata"),a$1.litPropertyMetadata??=new WeakMap;let y$1 = class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t);}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,s=b$1){if(s.state&&(s.attribute=false),this._$Ei(),this.prototype.hasOwnProperty(t)&&((s=Object.create(s)).wrapped=true),this.elementProperties.set(t,s),!s.noAccessor){const i=Symbol(),h=this.getPropertyDescriptor(t,i,s);void 0!==h&&e$1(this.prototype,t,h);}}static getPropertyDescriptor(t,s,i){const{get:e,set:r}=h$1(this.prototype,t)??{get(){return this[s]},set(t){this[s]=t;}};return {get:e,set(s){const h=e?.call(this);r?.call(this,s),this.requestUpdate(t,h,i);},configurable:true,enumerable:true}}static getPropertyOptions(t){return this.elementProperties.get(t)??b$1}static _$Ei(){if(this.hasOwnProperty(d$1("elementProperties")))return;const t=n$2(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties);}static finalize(){if(this.hasOwnProperty(d$1("finalized")))return;if(this.finalized=true,this._$Ei(),this.hasOwnProperty(d$1("properties"))){const t=this.properties,s=[...r$3(t),...o$3(t)];for(const i of s)this.createProperty(i,t[i]);}const t=this[Symbol.metadata];if(null!==t){const s=litPropertyMetadata.get(t);if(void 0!==s)for(const[t,i]of s)this.elementProperties.set(t,i);}this._$Eh=new Map;for(const[t,s]of this.elementProperties){const i=this._$Eu(t,s);void 0!==i&&this._$Eh.set(i,t);}this.elementStyles=this.finalizeStyles(this.styles);}static finalizeStyles(s){const i=[];if(Array.isArray(s)){const e=new Set(s.flat(1/0).reverse());for(const s of e)i.unshift(c$2(s));}else void 0!==s&&i.push(c$2(s));return i}static _$Eu(t,s){const i=s.attribute;return  false===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=false,this.hasUpdated=false,this._$Em=null,this._$Ev();}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this));}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.();}removeController(t){this._$EO?.delete(t);}_$E_(){const t=new Map,s=this.constructor.elementProperties;for(const i of s.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t);}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return S$1(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(true),this._$EO?.forEach(t=>t.hostConnected?.());}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.());}attributeChangedCallback(t,s,i){this._$AK(t,i);}_$ET(t,s){const i=this.constructor.elementProperties.get(t),e=this.constructor._$Eu(t,i);if(void 0!==e&&true===i.reflect){const h=(void 0!==i.converter?.toAttribute?i.converter:u$1).toAttribute(s,i.type);this._$Em=t,null==h?this.removeAttribute(e):this.setAttribute(e,h),this._$Em=null;}}_$AK(t,s){const i=this.constructor,e=i._$Eh.get(t);if(void 0!==e&&this._$Em!==e){const t=i.getPropertyOptions(e),h="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:u$1;this._$Em=e;const r=h.fromAttribute(s,t.type);this[e]=r??this._$Ej?.get(e)??r,this._$Em=null;}}requestUpdate(t,s,i,e=false,h){if(void 0!==t){const r=this.constructor;if(false===e&&(h=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??f$1)(h,s)||i.useDefault&&i.reflect&&h===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,s,i);} false===this.isUpdatePending&&(this._$ES=this._$EP());}C(t,s,{useDefault:i,reflect:e,wrapped:h},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??s??this[t]),true!==h||void 0!==r)||(this._$AL.has(t)||(this.hasUpdated||i||(s=void 0),this._$AL.set(t,s)),true===e&&this._$Em!==t&&(this._$Eq??=new Set).add(t));}async _$EP(){this.isUpdatePending=true;try{await this._$ES;}catch(t){Promise.reject(t);}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,s]of this._$Ep)this[t]=s;this._$Ep=void 0;}const t=this.constructor.elementProperties;if(t.size>0)for(const[s,i]of t){const{wrapped:t}=i,e=this[s];true!==t||this._$AL.has(s)||void 0===e||this.C(s,void 0,i,e);}}let t=false;const s=this._$AL;try{t=this.shouldUpdate(s),t?(this.willUpdate(s),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(s)):this._$EM();}catch(s){throw t=false,this._$EM(),s}t&&this._$AE(s);}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=true,this.firstUpdated(t)),this.updated(t);}_$EM(){this._$AL=new Map,this.isUpdatePending=false;}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return  true}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM();}updated(t){}firstUpdated(t){}};y$1.elementStyles=[],y$1.shadowRootOptions={mode:"open"},y$1[d$1("elementProperties")]=new Map,y$1[d$1("finalized")]=new Map,p$1?.({ReactiveElement:y$1}),(a$1.reactiveElementVersions??=[]).push("2.1.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t$1=globalThis,i$1=t=>t,s$1=t$1.trustedTypes,e=s$1?s$1.createPolicy("lit-html",{createHTML:t=>t}):void 0,h="$lit$",o$2=`lit$${Math.random().toFixed(9).slice(2)}$`,n$1="?"+o$2,r$2=`<${n$1}>`,l=document,c=()=>l.createComment(""),a=t=>null===t||"object"!=typeof t&&"function"!=typeof t,u=Array.isArray,d=t=>u(t)||"function"==typeof t?.[Symbol.iterator],f="[ \t\n\f\r]",v=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,_=/-->/g,m=/>/g,p=RegExp(`>|${f}(?:([^\\s"'>=/]+)(${f}*=${f}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),g=/'/g,$=/"/g,y=/^(?:script|style|textarea|title)$/i,x=t=>(i,...s)=>({_$litType$:t,strings:i,values:s}),b=x(1),E=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),C=new WeakMap,P=l.createTreeWalker(l,129);function V(t,i){if(!u(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==e?e.createHTML(i):i}const N=(t,i)=>{const s=t.length-1,e=[];let n,l=2===i?"<svg>":3===i?"<math>":"",c=v;for(let i=0;i<s;i++){const s=t[i];let a,u,d=-1,f=0;for(;f<s.length&&(c.lastIndex=f,u=c.exec(s),null!==u);)f=c.lastIndex,c===v?"!--"===u[1]?c=_:void 0!==u[1]?c=m:void 0!==u[2]?(y.test(u[2])&&(n=RegExp("</"+u[2],"g")),c=p):void 0!==u[3]&&(c=p):c===p?">"===u[0]?(c=n??v,d=-1):void 0===u[1]?d=-2:(d=c.lastIndex-u[2].length,a=u[1],c=void 0===u[3]?p:'"'===u[3]?$:g):c===$||c===g?c=p:c===_||c===m?c=v:(c=p,n=void 0);const x=c===p&&t[i+1].startsWith("/>")?" ":"";l+=c===v?s+r$2:d>=0?(e.push(a),s.slice(0,d)+h+s.slice(d)+o$2+x):s+o$2+(-2===d?i:x);}return [V(t,l+(t[s]||"<?>")+(2===i?"</svg>":3===i?"</math>":"")),e]};class S{constructor({strings:t,_$litType$:i},e){let r;this.parts=[];let l=0,a=0;const u=t.length-1,d=this.parts,[f,v]=N(t,i);if(this.el=S.createElement(f,e),P.currentNode=this.el.content,2===i||3===i){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes);}for(;null!==(r=P.nextNode())&&d.length<u;){if(1===r.nodeType){if(r.hasAttributes())for(const t of r.getAttributeNames())if(t.endsWith(h)){const i=v[a++],s=r.getAttribute(t).split(o$2),e=/([.?@])?(.*)/.exec(i);d.push({type:1,index:l,name:e[2],strings:s,ctor:"."===e[1]?I:"?"===e[1]?L:"@"===e[1]?z:H}),r.removeAttribute(t);}else t.startsWith(o$2)&&(d.push({type:6,index:l}),r.removeAttribute(t));if(y.test(r.tagName)){const t=r.textContent.split(o$2),i=t.length-1;if(i>0){r.textContent=s$1?s$1.emptyScript:"";for(let s=0;s<i;s++)r.append(t[s],c()),P.nextNode(),d.push({type:2,index:++l});r.append(t[i],c());}}}else if(8===r.nodeType)if(r.data===n$1)d.push({type:2,index:l});else {let t=-1;for(;-1!==(t=r.data.indexOf(o$2,t+1));)d.push({type:7,index:l}),t+=o$2.length-1;}l++;}}static createElement(t,i){const s=l.createElement("template");return s.innerHTML=t,s}}function M(t,i,s=t,e){if(i===E)return i;let h=void 0!==e?s._$Co?.[e]:s._$Cl;const o=a(i)?void 0:i._$litDirective$;return h?.constructor!==o&&(h?._$AO?.(false),void 0===o?h=void 0:(h=new o(t),h._$AT(t,s,e)),void 0!==e?(s._$Co??=[])[e]=h:s._$Cl=h),void 0!==h&&(i=M(t,h._$AS(t,i.values),h,e)),i}class R{constructor(t,i){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=i;}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:i},parts:s}=this._$AD,e=(t?.creationScope??l).importNode(i,true);P.currentNode=e;let h=P.nextNode(),o=0,n=0,r=s[0];for(;void 0!==r;){if(o===r.index){let i;2===r.type?i=new k(h,h.nextSibling,this,t):1===r.type?i=new r.ctor(h,r.name,r.strings,this,t):6===r.type&&(i=new Z(h,this,t)),this._$AV.push(i),r=s[++n];}o!==r?.index&&(h=P.nextNode(),o++);}return P.currentNode=l,e}p(t){let i=0;for(const s of this._$AV) void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,i),i+=s.strings.length-2):s._$AI(t[i])),i++;}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,i,s,e){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=i,this._$AM=s,this.options=e,this._$Cv=e?.isConnected??true;}get parentNode(){let t=this._$AA.parentNode;const i=this._$AM;return void 0!==i&&11===t?.nodeType&&(t=i.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,i=this){t=M(this,t,i),a(t)?t===A||null==t||""===t?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==E&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):d(t)?this.k(t):this._(t);}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t));}_(t){this._$AH!==A&&a(this._$AH)?this._$AA.nextSibling.data=t:this.T(l.createTextNode(t)),this._$AH=t;}$(t){const{values:i,_$litType$:s}=t,e="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(V(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===e)this._$AH.p(i);else {const t=new R(e,this),s=t.u(this.options);t.p(i),this.T(s),this._$AH=t;}}_$AC(t){let i=C.get(t.strings);return void 0===i&&C.set(t.strings,i=new S(t)),i}k(t){u(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let s,e=0;for(const h of t)e===i.length?i.push(s=new k(this.O(c()),this.O(c()),this,this.options)):s=i[e],s._$AI(h),e++;e<i.length&&(this._$AR(s&&s._$AB.nextSibling,e),i.length=e);}_$AR(t=this._$AA.nextSibling,s){for(this._$AP?.(false,true,s);t!==this._$AB;){const s=i$1(t).nextSibling;i$1(t).remove(),t=s;}}setConnected(t){ void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t));}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,i,s,e,h){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=i,this._$AM=e,this.options=h,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=A;}_$AI(t,i=this,s,e){const h=this.strings;let o=false;if(void 0===h)t=M(this,t,i,0),o=!a(t)||t!==this._$AH&&t!==E,o&&(this._$AH=t);else {const e=t;let n,r;for(t=h[0],n=0;n<h.length-1;n++)r=M(this,e[s+n],i,n),r===E&&(r=this._$AH[n]),o||=!a(r)||r!==this._$AH[n],r===A?t=A:t!==A&&(t+=(r??"")+h[n+1]),this._$AH[n]=r;}o&&!e&&this.j(t);}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"");}}class I extends H{constructor(){super(...arguments),this.type=3;}j(t){this.element[this.name]=t===A?void 0:t;}}class L extends H{constructor(){super(...arguments),this.type=4;}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A);}}class z extends H{constructor(t,i,s,e,h){super(t,i,s,e,h),this.type=5;}_$AI(t,i=this){if((t=M(this,t,i,0)??A)===E)return;const s=this._$AH,e=t===A&&s!==A||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,h=t!==A&&(s===A||e);e&&this.element.removeEventListener(this.name,this,s),h&&this.element.addEventListener(this.name,this,t),this._$AH=t;}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t);}}class Z{constructor(t,i,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=i,this.options=s;}get _$AU(){return this._$AM._$AU}_$AI(t){M(this,t);}}const B=t$1.litHtmlPolyfillSupport;B?.(S,k),(t$1.litHtmlVersions??=[]).push("3.3.3");const D=(t,i,s)=>{const e=s?.renderBefore??i;let h=e._$litPart$;if(void 0===h){const t=s?.renderBefore??null;e._$litPart$=h=new k(i.insertBefore(c(),t),t,void 0,s??{});}return h._$AI(t),h};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const s=globalThis;class i extends y$1{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0;}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const r=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=D(r,this.renderRoot,this.renderOptions);}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(true);}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(false);}render(){return E}}i._$litElement$=true,i["finalized"]=true,s.litElementHydrateSupport?.({LitElement:i});const o$1=s.litElementPolyfillSupport;o$1?.({LitElement:i});(s.litElementVersions??=[]).push("4.2.2");

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=t=>(e,o)=>{ void 0!==o?o.addInitializer(()=>{customElements.define(t,e);}):customElements.define(t,e);};

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const o={attribute:true,type:String,converter:u$1,reflect:false,hasChanged:f$1},r$1=(t=o,e,r)=>{const{kind:n,metadata:i}=r;let s=globalThis.litPropertyMetadata.get(i);if(void 0===s&&globalThis.litPropertyMetadata.set(i,s=new Map),"setter"===n&&((t=Object.create(t)).wrapped=true),s.set(r.name,t),"accessor"===n){const{name:o}=r;return {set(r){const n=e.get.call(this);e.set.call(this,r),this.requestUpdate(o,n,t,true,r);},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===n){const{name:o}=r;return function(r){const n=this[o];e.call(this,r),this.requestUpdate(o,n,t,true,r);}}throw Error("Unsupported decorator location: "+n)};function n(t){return (e,o)=>"object"==typeof o?r$1(t,e,o):((t,e,o)=>{const r=e.hasOwnProperty(o);return e.constructor.createProperty(o,t),r?Object.getOwnPropertyDescriptor(e,o):void 0})(t,e,o)}

/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function r(r){return n({...r,state:true,attribute:false})}

var NumberFormat;
(function (NumberFormat) {
    NumberFormat["language"] = "language";
    NumberFormat["system"] = "system";
    NumberFormat["comma_decimal"] = "comma_decimal";
    NumberFormat["decimal_comma"] = "decimal_comma";
    NumberFormat["space_comma"] = "space_comma";
    NumberFormat["none"] = "none";
})(NumberFormat || (NumberFormat = {}));
var TimeFormat;
(function (TimeFormat) {
    TimeFormat["language"] = "language";
    TimeFormat["system"] = "system";
    TimeFormat["am_pm"] = "12";
    TimeFormat["twenty_four"] = "24";
})(TimeFormat || (TimeFormat = {}));

// Polymer legacy event helpers used courtesy of the Polymer project.
//
// Copyright (c) 2017 The Polymer Authors. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are
// met:
//
//    * Redistributions of source code must retain the above copyright
// notice, this list of conditions and the following disclaimer.
//    * Redistributions in binary form must reproduce the above
// copyright notice, this list of conditions and the following disclaimer
// in the documentation and/or other materials provided with the
// distribution.
//    * Neither the name of Google Inc. nor the names of its
// contributors may be used to endorse or promote products derived from
// this software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
// "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
// LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
// A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
// OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
// LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
// DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
// THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
// OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
/**
 * Dispatches a custom event with an optional detail value.
 *
 * @param {string} type Name of event type.
 * @param {*=} detail Detail value containing event-specific
 *   payload.
 * @param {{ bubbles: (boolean|undefined),
 *           cancelable: (boolean|undefined),
 *           composed: (boolean|undefined) }=}
 *  options Object specifying options.  These may include:
 *  `bubbles` (boolean, defaults to `true`),
 *  `cancelable` (boolean, defaults to false), and
 *  `node` on which to fire the event (HTMLElement, defaults to `this`).
 * @return {Event} The new event that was fired.
 */
const fireEvent = (node, type, detail, options) => {
    options = options || {};
    // @ts-ignore
    detail = detail === null || detail === undefined ? {} : detail;
    const event = new Event(type, {
        bubbles: options.bubbles === undefined ? true : options.bubbles,
        cancelable: Boolean(options.cancelable),
        composed: options.composed === undefined ? true : options.composed
    });
    event.detail = detail;
    node.dispatchEvent(event);
    return event;
};

// Operator applied when a threshold omits one. Matches the documented default
// so existing "value only" ladders keep behaving as a series of "<=" bands.
const DEFAULT_OPERATOR = '<=';
/**
 * Returns the threshold's comparison operator, defaulting to '<=' and trimming
 * stray whitespace so a value like '>= ' still matches a known operator.
 */
function normalizeOperator(threshold) {
    return (threshold.operator ?? DEFAULT_OPERATOR).trim();
}
/**
 * Tests whether `value` satisfies a single threshold's comparison.
 * An unrecognized operator never matches.
 */
function matchesThreshold(value, threshold) {
    // YAML `value: '50'` is a string. The relational operators coerce it, but '==' used
    // ===, so a quoted value never matched. Compare as numbers throughout.
    const limit = Number(threshold.value);
    switch (normalizeOperator(threshold)) {
        case '<':
            return value < limit;
        case '<=':
            return value <= limit;
        case '>':
            return value > limit;
        case '>=':
            return value >= limit;
        case '==':
            return value === limit;
        default:
            return false;
    }
}
/** Extracts the display styles carried by a matched threshold. */
function stylesFor(threshold) {
    return {
        backgroundColor: threshold.color,
        textColor: threshold.text_color,
        fontWeight: threshold.font_weight,
    };
}
/**
 * Resolves the styles for the first threshold that matches `value`, using
 * operator-aware ordering so mixed operators resolve the way a user intuitively
 * expects. Evaluation happens in three passes:
 *
 *   1. Greater-than thresholds ('>', '>=') are checked highest value first, so
 *      the tightest lower bound wins (e.g. '>=60' is preferred over '>=0').
 *   2. Less-than thresholds ('<', '<=') are checked lowest value first, so the
 *      tightest upper bound wins (e.g. '<40' is preferred over '<60').
 *   3. Equality thresholds ('==') are checked last.
 *
 * A plain ascending ladder of default '<=' thresholds still resolves exactly as
 * before, since every band lands in the less-than pass in ascending order.
 *
 * Returns null when no threshold matches, letting the caller fall back to other
 * color sources.
 */
function evaluateThresholds(value, thresholds) {
    if (!thresholds || thresholds.length === 0) {
        return null;
    }
    const isGreaterThan = (threshold) => {
        const operator = normalizeOperator(threshold);
        return operator === '>' || operator === '>=';
    };
    const isLessThan = (threshold) => {
        const operator = normalizeOperator(threshold);
        return operator === '<' || operator === '<=';
    };
    const isEqual = (threshold) => {
        return normalizeOperator(threshold) === '==';
    };
    // Greater-than: largest value first so the strictest lower bound wins.
    const greaterThan = thresholds
        .filter(isGreaterThan)
        .sort((first, second) => second.value - first.value);
    // Less-than: smallest value first so the strictest upper bound wins.
    const lessThan = thresholds
        .filter(isLessThan)
        .sort((first, second) => first.value - second.value);
    // Equality: order does not matter, checked last.
    const equal = thresholds.filter(isEqual);
    for (const threshold of [...greaterThan, ...lessThan, ...equal]) {
        if (matchesThreshold(value, threshold)) {
            return stylesFor(threshold);
        }
    }
    return null;
}

const CARD_VERSION = '2026.11.11';
console.info(`%c  INDICATOR-GRID-CARD  \n%c  Version ${CARD_VERSION}  `, 'color: black; background: #F2720C; font-weight: 600;', 'color: black; background: #00a5c9; font-weight: 600;');
window.customCards = window.customCards || [];
window.customCards.push({
    type: 'indicator-grid-card',
    name: 'Indicator Grid Card',
    description: 'A card displaying a grid of indicator lights showing entity status',
    preview: true,
    // Suggest this card for entities that naturally map to on/off indicator lights:
    // binary sensors, switches, lights, and input booleans. Other domains (sensors,
    // climate, etc.) are not a clear fit for an indicator grid display.
    getEntitySuggestion: (hass, entityId) => {
        const entityState = hass?.states?.[entityId];
        if (!entityState)
            return null;
        const domain = entityId.split('.')[0];
        const indicatorDomains = ['binary_sensor', 'switch', 'light', 'input_boolean'];
        if (!indicatorDomains.includes(domain))
            return null;
        return { config: { type: 'custom:indicator-grid-card', entities: [{ entity: entityId }] } };
    },
});
let IndicatorGridCard = class IndicatorGridCard extends i {
    // Helper to normalize size values - add "px" if just a number. A blank value (a YAML
    // key left empty is null; a field cleared in the editor is '') uses the default: both
    // became invalid CSS ('null', '') that collapsed the grid.
    _normalizeSize(value, defaultValue) {
        if (value === undefined || value === null || value === '')
            return defaultValue;
        const str = String(value);
        // If it's just digits (with optional decimal), append "px"
        return /^\d+(\.\d+)?$/.test(str) ? `${str}px` : str;
    }
    // A state is numeric only when the whole string is a number. parseFloat reads the
    // leading number of any string, so '192.168.1.1', '2026.11.3' and timestamps got
    // decimals formatting and threshold colors.
    _toNumber(state) {
        if (typeof state !== 'string' || state.trim() === '')
            return NaN;
        return Number(state);
    }
    static async getConfigElement() {
        await Promise.resolve().then(function () { return editor; });
        return document.createElement('indicator-grid-card-editor');
    }
    static getStubConfig(hass) {
        const indicatorDomains = ['binary_sensor', 'switch', 'light', 'input_boolean'];
        const entities = hass?.states
            ? Object.keys(hass.states)
                .filter((id) => indicatorDomains.includes(id.split('.')[0]))
                .slice(0, 6)
                .map((id) => ({ entity: id }))
            : [];
        return {
            columns: 3,
            rows: 2,
            cell_width: '',
            cell_height: 100,
            cell_gap: 5,
            font_size: 16,
            font_weight: 'bold',
            show_icons: false,
            icon_placement: 'above',
            icon_size: 24,
            entities,
            unavailable_text: 'INOP',
            global_colors: {
                on: 'green',
                off: 'gray',
                text: 'white',
                unavailable: 'orange',
                blank: '#333333',
            },
        };
    }
    setConfig(config) {
        if (!config) {
            throw new Error('Invalid configuration');
        }
        // Backward compatibility: if cell_size is set, use it for width and height
        let cellWidth = config.cell_width;
        let cellHeight = config.cell_height;
        if (config.cell_size !== undefined) {
            cellWidth = cellWidth ?? `${config.cell_size}px`;
            cellHeight = cellHeight ?? `${config.cell_size}px`;
        }
        this.config = {
            ...config,
            columns: config.columns ?? 3,
            rows: config.rows ?? 2,
            cell_width: this._normalizeSize(cellWidth, ''),
            cell_height: this._normalizeSize(cellHeight, '100px'),
            cell_gap: this._normalizeSize(config.cell_gap, '5px'),
            font_size: this._normalizeSize(config.font_size, '16px'),
            font_weight: config.font_weight ?? 'bold',
            show_icons: config.show_icons ?? false,
            icon_placement: config.icon_placement ?? 'above',
            icon_size: this._normalizeSize(config.icon_size, '24px'),
            unavailable_text: config.unavailable_text ?? 'INOP',
            // No text default here: an unset text color means "black or white, whichever
            // contrasts more with the cell fill" (see _getTextColor)
            global_colors: {
                on: 'green',
                off: 'gray',
                unavailable: 'orange',
                blank: '#333333',
                ...config.global_colors,
            },
        };
    }
    getCardSize() {
        if (!this.config) {
            return 2;
        }
        // Parse cell_height - expects pixel values (e.g., "100px", 100)
        const cellHeightStr = this._normalizeSize(this.config.cell_height, '100px');
        const cellHeight = parseFloat(cellHeightStr);
        // Parse cell_gap - expects pixel values (e.g., "5px", 5)
        const cellGapStr = this._normalizeSize(this.config.cell_gap, '5px');
        const cellGap = parseFloat(cellGapStr);
        // Calculate total height in pixels
        const rows = this.config.rows || 2;
        const totalHeight = (rows * cellHeight) + ((rows - 1) * cellGap);
        // Convert to Home Assistant card units (1 unit = 50px)
        // Round up to ensure we allocate enough space
        return Math.ceil(totalHeight / 50);
    }
    // Sections view (grid layout) sizing - 12-column grid system.
    // Reports how many section grid rows the card needs so HA reserves the
    // correct height. A fixed value here clips taller grids, so derive it from
    // the configured rows / cell height the same way getCardSize does.
    getGridOptions() {
        // HA sections grid geometry: each row is 56px tall with an 8px gap between
        // rows (defaults for --ha-section-grid-row-height / --ha-section-grid-row-gap).
        // A card given N rows is allocated N*56 + (N-1)*8 pixels of height.
        const SECTION_ROW_HEIGHT = 56;
        const SECTION_ROW_GAP = 8;
        const rows = this.config?.rows ?? 2;
        const cellHeight = parseFloat(this._normalizeSize(this.config?.cell_height, '100px'));
        const cellGap = parseFloat(this._normalizeSize(this.config?.cell_gap, '5px'));
        const cardHeight = (rows * cellHeight) + ((rows - 1) * cellGap);
        // Solve N*56 + (N-1)*8 >= cardHeight for N, rounding up so we never clip.
        const gridRows = Math.ceil((cardHeight + SECTION_ROW_GAP) / (SECTION_ROW_HEIGHT + SECTION_ROW_GAP));
        return {
            rows: gridRows,
            columns: 12,
            min_rows: 1,
            min_columns: 3,
        };
    }
    shouldUpdate(changedProps) {
        if (!this.config) {
            return false;
        }
        // Always update if config changed
        if (changedProps.has('config')) {
            return true;
        }
        // Check if any of our configured entities changed
        if (changedProps.has('hass')) {
            const oldHass = changedProps.get('hass');
            if (!oldHass) {
                return true;
            }
            // Get all entity IDs from config (direct entities + template-referenced entities)
            const entityIds = this.config.entities
                .filter((e) => e && !!e.entity)
                .map(e => e.entity);
            const templateEntityIds = this.config.entities
                .filter((e) => e && !!e.text_template)
                .flatMap(e => this._extractTemplateEntityIds(e.text_template));
            // Also track entities referenced in header row cell text templates. A header row
            // without cells, or a cell without text, is skipped rather than throwing.
            const headerEntityIds = (this.config.header_rows || [])
                .flatMap(hr => hr.cells || [])
                .flatMap(cell => this._extractTemplateEntityIds(cell?.text ?? ''));
            const allEntityIds = [...new Set([...entityIds, ...templateEntityIds, ...headerEntityIds])];
            // Check if any of our entities changed
            return allEntityIds.some(entityId => {
                const oldState = oldHass.states[entityId];
                const newState = this.hass.states[entityId];
                return oldState !== newState;
            });
        }
        return true;
    }
    _computeCell(entityConfig, stateObj) {
        if (!stateObj || stateObj.state === 'unavailable' || stateObj.state === 'unknown') {
            // Get entity name - prefer custom text, then friendly_name, then entity ID
            const entityName = entityConfig.text ||
                stateObj?.attributes?.friendly_name ||
                entityConfig.entity ||
                'Unknown';
            const unavailableText = this.config.unavailable_text || 'INOP';
            const displayText = `${entityName}\n${unavailableText}`;
            const unavailableBackground = this._getColor('unavailable', entityConfig.colors);
            return {
                entity: entityConfig.entity,
                displayText,
                backgroundColor: unavailableBackground,
                textColor: this._getTextColor(entityConfig.colors, unavailableBackground),
                textOpacity: 1,
                textAlign: entityConfig.text_align,
                state: stateObj?.state,
                clickable: false,
                clickAction: 'none',
                colspan: entityConfig.colspan || 1,
            };
        }
        const state = stateObj.state;
        const displayText = this._getDisplayText(entityConfig, stateObj);
        const backgroundColor = this._getBackgroundColor(state, entityConfig);
        // Check for threshold styles (text_color and font_weight)
        let textColor = this._getTextColor(entityConfig.colors, backgroundColor);
        let fontWeight = undefined;
        const numericState = this._toNumber(state);
        if (!isNaN(numericState)) {
            const thresholdStyles = this._getThresholdStyles(numericState, entityConfig.colors) ||
                this._getThresholdStyles(numericState, this.config.global_colors);
            if (thresholdStyles) {
                if (thresholdStyles.textColor) {
                    textColor = thresholdStyles.textColor;
                }
                if (thresholdStyles.fontWeight) {
                    fontWeight = thresholdStyles.fontWeight;
                }
            }
        }
        const textOpacity = this._getTextOpacity(state, entityConfig);
        const icon = this._getIcon(state, entityConfig, stateObj);
        const clickAction = entityConfig.click_action || this._getDefaultClickAction(stateObj);
        return {
            entity: entityConfig.entity,
            displayText,
            backgroundColor,
            textColor,
            textOpacity,
            textAlign: entityConfig.text_align,
            fontWeight,
            icon,
            state,
            clickable: clickAction !== 'none',
            clickAction,
            colspan: entityConfig.colspan || 1,
        };
    }
    _getDisplayText(entityConfig, stateObj) {
        // Static custom text - return as-is without formatting
        if (entityConfig.text) {
            return entityConfig.text;
        }
        // Template with Jinja2-style filter support
        if (entityConfig.text_template) {
            return this._renderTemplate(entityConfig.text_template, stateObj, entityConfig);
        }
        // Format state value for numeric sensors
        const formattedState = this._formatNumericState(stateObj.state, entityConfig);
        // Default display: if decimals configured and state is numeric, show formatted number
        // Otherwise show friendly name (existing behavior)
        const parsedState = this._toNumber(stateObj.state);
        const hasDecimalsConfig = entityConfig.decimals !== undefined || this.config.decimals !== undefined;
        if (!isNaN(parsedState) && hasDecimalsConfig) {
            return formattedState;
        }
        return stateObj.attributes.friendly_name || entityConfig.entity || '';
    }
    // Render a text_template string, supporting Jinja2-style {{ variable | filter }} syntax.
    // Supported variables: state, name, unit, state_with_unit, entity_id, last_changed, last_updated, attributes.<attr>
    // Supported filters: upper, lower, title, round(n), int, float, replace('a','b'), truncate(n), default('val')
    _renderTemplate(template, stateObj, entityConfig) {
        return template.replace(/\{\{\s*(.+?)\s*\}\}/g, (_match, expression) => {
            const parts = expression.split('|').map((s) => s.trim());
            let value = this._resolveTemplateVariable(parts[0], stateObj, entityConfig);
            for (let i = 1; i < parts.length; i++) {
                value = this._applyTemplateFilter(value, parts[i]);
            }
            return value;
        });
    }
    _resolveTemplateVariable(variable, stateObj, entityConfig) {
        const formattedState = this._formatNumericState(stateObj.state, entityConfig);
        if (variable === 'state')
            return formattedState;
        if (variable === 'name')
            return stateObj.attributes.friendly_name || entityConfig.entity || '';
        if (variable === 'entity_id')
            return stateObj.entity_id || entityConfig.entity || '';
        if (variable === 'unit')
            return stateObj.attributes.unit_of_measurement || '';
        if (variable === 'state_with_unit') {
            const unit = stateObj.attributes.unit_of_measurement;
            return unit ? `${formattedState} ${unit}` : formattedState;
        }
        if (variable === 'last_changed')
            return this._relativeTime(stateObj.last_changed);
        if (variable === 'last_updated')
            return this._relativeTime(stateObj.last_updated);
        // Support attributes.xxx
        if (variable.startsWith('attributes.')) {
            const attr = variable.slice('attributes.'.length);
            const val = stateObj.attributes[attr];
            return val !== undefined && val !== null ? String(val) : '';
        }
        // Support states('entity_id') to reference any entity's state
        const statesMatch = variable.match(/^states\(['"]([^'"]+)['"]\)$/);
        if (statesMatch) {
            const entity = this.hass.states[statesMatch[1]];
            return entity ? entity.state : '';
        }
        return variable;
    }
    // Convert an ISO 8601 timestamp to a human-readable relative time string.
    // e.g. "just now", "5 minutes ago", "2 hours ago", "3 days ago"
    _relativeTime(isoTimestamp) {
        if (!isoTimestamp)
            return '';
        const diffSeconds = Math.floor((Date.now() - new Date(isoTimestamp).getTime()) / 1000);
        // Invalid timestamps produce NaN here; return empty rather than render "NaN days ago"
        if (isNaN(diffSeconds))
            return '';
        if (diffSeconds < 60)
            return 'just now';
        const diffMinutes = Math.floor(diffSeconds / 60);
        if (diffMinutes < 60)
            return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24)
            return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    }
    // Extract entity IDs referenced via states('entity_id') in a template string
    _extractTemplateEntityIds(template) {
        const entityIds = [];
        const regex = /\{\{\s*states\(['"]([^'"]+)['"]\)/g;
        let match;
        while ((match = regex.exec(template)) !== null) {
            entityIds.push(match[1]);
        }
        return entityIds;
    }
    _applyTemplateFilter(value, filter) {
        // Parse filter name and optional args: e.g. round(2), replace('a','b'), default('N/A')
        const parenIdx = filter.indexOf('(');
        const filterName = parenIdx >= 0 ? filter.slice(0, parenIdx).trim() : filter.trim();
        let args = [];
        if (parenIdx >= 0) {
            const argsStr = filter.slice(parenIdx + 1, filter.lastIndexOf(')'));
            // Split on commas, strip surrounding quotes/spaces from each arg
            args = argsStr.split(',').map(s => s.trim().replace(/^['"]|['"]$/g, ''));
        }
        switch (filterName) {
            case 'upper': return value.toUpperCase();
            case 'lower': return value.toLowerCase();
            case 'title': return value.replace(/\b\w/g, c => c.toUpperCase());
            case 'round': {
                const decimals = args.length > 0 ? parseInt(args[0], 10) : 0;
                const num = parseFloat(value);
                return isNaN(num) ? value : num.toFixed(isNaN(decimals) ? 0 : decimals);
            }
            case 'int': {
                const num = parseInt(value, 10);
                return isNaN(num) ? (args.length > 0 ? args[0] : '0') : String(num);
            }
            case 'float': {
                const num = parseFloat(value);
                return isNaN(num) ? (args.length > 0 ? args[0] : '0') : String(num);
            }
            case 'replace':
                if (args.length >= 2)
                    return value.split(args[0]).join(args[1]);
                return value;
            case 'truncate': {
                const len = args.length > 0 ? parseInt(args[0], 10) : 255;
                const limit = isNaN(len) ? 255 : len;
                return value.length > limit ? value.slice(0, limit) + '...' : value;
            }
            case 'default':
                return value !== '' ? value : (args.length > 0 ? args[0] : '');
            default:
                return value; // Unknown filter: pass through unchanged
        }
    }
    _getBackgroundColor(state, entityConfig) {
        const colors = entityConfig.colors;
        // Check for specific state mapping first
        if (colors?.states && colors.states[state]) {
            return colors.states[state];
        }
        // Check global state mapping
        if (this.config.global_colors?.states && this.config.global_colors.states[state]) {
            return this.config.global_colors.states[state];
        }
        // Check for numeric thresholds
        const numericState = this._toNumber(state);
        if (!isNaN(numericState)) {
            const thresholdStyles = this._getThresholdStyles(numericState, colors) ||
                this._getThresholdStyles(numericState, this.config.global_colors);
            if (thresholdStyles?.backgroundColor) {
                return thresholdStyles.backgroundColor;
            }
        }
        // Check for on/off states
        if (state === 'on') {
            return this._getColor('on', colors);
        }
        if (state === 'off') {
            return this._getColor('off', colors);
        }
        // Default fallback
        return this._getColor('off', colors);
    }
    _getThresholdStyles(value, colors) {
        // Delegates to the operator-aware evaluator so mixed operators (e.g. a
        // ">=60" band alongside "<40") resolve correctly. See src/thresholds.ts.
        return evaluateThresholds(value, colors?.thresholds);
    }
    _getColor(type, entityColors) {
        // Check entity-specific color first
        if (entityColors && entityColors[type]) {
            return entityColors[type];
        }
        // Fall back to global color
        if (this.config.global_colors && this.config.global_colors[type]) {
            return this.config.global_colors[type];
        }
        // Hard-coded defaults
        const defaults = {
            on: 'green',
            off: 'gray',
            unavailable: 'orange',
            text: 'white',
            blank: '#333333',
        };
        return defaults[type];
    }
    // Text color for a cell: entity color, then global color, then black or white,
    // whichever has the higher WCAG contrast against the fill. The old default was always
    // white, which is under 4.5:1 on the default off (gray) and unavailable (orange) fills.
    _getTextColor(entityColors, background) {
        if (entityColors?.text)
            return entityColors.text;
        if (this.config.global_colors?.text)
            return this.config.global_colors.text;
        const rgb = this._resolveRgb(background);
        if (!rgb)
            return 'white';
        const lin = (c) => {
            const v = c / 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        };
        const lum = 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
        return (lum + 0.05) / 0.05 >= 1.05 / (lum + 0.05) ? 'black' : 'white';
    }
    // [r, g, b] for a hex, rgb() or named color, or undefined when it cannot be resolved
    // here (e.g. var(--token), which only resolves inside the card)
    _resolveRgb(color) {
        const hex6 = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (hex6)
            return [parseInt(hex6[1], 16), parseInt(hex6[2], 16), parseInt(hex6[3], 16)];
        const hex3 = color.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);
        if (hex3)
            return [parseInt(hex3[1] + hex3[1], 16), parseInt(hex3[2] + hex3[2], 16), parseInt(hex3[3] + hex3[3], 16)];
        const rgb = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (rgb)
            return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3])];
        if (color.startsWith('var(') || typeof document === 'undefined' || typeof getComputedStyle !== 'function')
            return undefined;
        // Named colors: let the browser resolve them
        const temp = document.createElement('div');
        temp.style.color = color;
        document.body.appendChild(temp);
        let computed;
        try {
            computed = getComputedStyle(temp).color;
        }
        finally {
            temp.remove();
        }
        const resolved = computed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        return resolved ? [Number(resolved[1]), Number(resolved[2]), Number(resolved[3])] : undefined;
    }
    _getIcon(state, entityConfig, stateObj) {
        // Check entity-specific override first
        if (entityConfig && entityConfig.show_icon !== undefined) {
            // Entity explicitly sets show_icon, respect it
            if (!entityConfig.show_icon) {
                return undefined;
            }
            // Entity wants icon, continue to get icon
        }
        else {
            // No entity override, check global setting
            if (!this.config.show_icons) {
                return undefined;
            }
        }
        // Determine which icon to use based on state
        const iconType = state === 'on' ? 'on' : 'off';
        // Check entity-specific custom icon first
        if (entityConfig && entityConfig.icon && entityConfig.icon[iconType]) {
            return entityConfig.icon[iconType];
        }
        // Fall back to entity's own icon from Home Assistant
        if (stateObj && stateObj.attributes) {
            // Try icon attribute first
            if (stateObj.attributes.icon) {
                return stateObj.attributes.icon;
            }
            // Try entity_picture as fallback (some entities use this)
            // Actually, entity_picture is an image URL, not an icon, so skip this
            // For domains that don't set icon, return a default based on domain
            const domain = stateObj.entity_id.split('.')[0];
            const domainIcons = {
                'light': state === 'on' ? 'mdi:lightbulb-on' : 'mdi:lightbulb',
                'switch': state === 'on' ? 'mdi:toggle-switch' : 'mdi:toggle-switch-off',
                'binary_sensor': state === 'on' ? 'mdi:checkbox-marked-circle' : 'mdi:checkbox-blank-circle-outline',
                'sensor': 'mdi:eye',
            };
            if (domainIcons[domain]) {
                return domainIcons[domain];
            }
        }
        // No icon available
        return undefined;
    }
    _getTextOpacity(state, entityConfig) {
        // Only dim if state is "off"
        if (state !== 'off') {
            return 1;
        }
        // Check for per-entity dim setting first
        if (entityConfig.dim_off_text !== undefined) {
            return entityConfig.dim_off_text / 100;
        }
        // Fall back to global dim setting
        if (this.config.dim_off_text !== undefined) {
            return this.config.dim_off_text / 100;
        }
        // Default: no dimming
        return 1;
    }
    _formatNumericState(state, entityConfig) {
        // Try to parse the state as a number
        const numericState = this._toNumber(state);
        // If not numeric, return original state as-is
        if (isNaN(numericState)) {
            return state;
        }
        // Check for decimals setting - per-entity first, then global
        let decimals;
        if (entityConfig.decimals !== undefined) {
            decimals = entityConfig.decimals;
        }
        else if (this.config.decimals !== undefined) {
            decimals = this.config.decimals;
        }
        // If no decimals setting configured, return original state
        if (decimals === undefined) {
            return state;
        }
        // Validate decimals range (0-10)
        const validDecimals = Math.max(0, Math.min(10, Math.floor(decimals)));
        // Handle special numeric values (Infinity, -Infinity)
        if (!isFinite(numericState)) {
            return state;
        }
        // Format the number with specified decimal places
        return numericState.toFixed(validDecimals);
    }
    _getDefaultClickAction(stateObj) {
        const domain = stateObj.entity_id.split('.')[0];
        // Toggleable domains
        if (['light', 'switch', 'input_boolean', 'automation', 'fan'].includes(domain)) {
            return 'toggle';
        }
        // Everything else shows more-info
        return 'more-info';
    }
    _handleClick(cell) {
        if (!cell.clickable || !cell.entity) {
            return;
        }
        if (cell.clickAction === 'toggle') {
            this._toggleEntity(cell.entity);
        }
        else if (cell.clickAction === 'more-info') {
            this._showMoreInfo(cell.entity);
        }
    }
    _handleCellKeydown(e, cell) {
        if (!cell.clickable || (e.key !== 'Enter' && e.key !== ' ')) {
            return;
        }
        // Space would otherwise scroll the page
        e.preventDefault();
        this._handleClick(cell);
    }
    _toggleEntity(entityId) {
        const domain = entityId.split('.')[0];
        this.hass.callService(domain, 'toggle', {
            entity_id: entityId,
        });
    }
    _showMoreInfo(entityId) {
        fireEvent(this, 'hass-more-info', { entityId });
    }
    _isHeaderRow(rowIndex) {
        if (!this.config.header_rows) {
            return false;
        }
        return this.config.header_rows.some(hr => hr.row_index === rowIndex);
    }
    _getHeaderRow(rowIndex) {
        if (!this.config.header_rows) {
            return undefined;
        }
        return this.config.header_rows.find(hr => hr.row_index === rowIndex);
    }
    // Process template expressions in header cell text.
    // Supports {{ states('entity_id') }} with optional filters (e.g., | upper).
    _processHeaderText(text) {
        return text.replace(/\{\{\s*(.+?)\s*\}\}/g, (_match, expression) => {
            const parts = expression.split('|').map((s) => s.trim());
            const statesMatch = parts[0].match(/^states\(['"]([^'"]+)['"]\)$/);
            let value;
            if (statesMatch) {
                const entity = this.hass.states[statesMatch[1]];
                value = entity ? entity.state : '';
            }
            else {
                value = parts[0]; // Unknown expression: return as-is
            }
            for (let i = 1; i < parts.length; i++) {
                value = this._applyTemplateFilter(value, parts[i]);
            }
            return value;
        });
    }
    _renderHeaderCell(headerCell) {
        const colspan = headerCell.colspan || 1;
        const textAlign = headerCell.text_align || 'center';
        const defaultFontSize = this._normalizeSize(this.config.font_size, '16px');
        const fontSize = this._normalizeSize(headerCell.font_size, defaultFontSize);
        const fontWeight = headerCell.font_weight || this.config.font_weight || 'bold';
        const backgroundColor = headerCell.background_color || this._getColor('blank', undefined);
        const textColor = headerCell.text_color || this._getTextColor(undefined, backgroundColor);
        const displayText = this._processHeaderText(headerCell.text ?? '');
        const cellStyle = {
            'background-color': backgroundColor,
            'color': textColor,
            'font-size': fontSize,
            'font-weight': String(fontWeight),
            'text-align': textAlign,
            'grid-column': `span ${colspan}`,
        };
        return b `
      <div class="cell header-cell" style=${this._styleMap(cellStyle)}>
        <div class="cell-text">
          <div class="text-line">${displayText}</div>
        </div>
      </div>
    `;
    }
    _renderAllCells() {
        const allCells = [];
        let entityIndex = 0;
        for (let row = 0; row < this.config.rows; row++) {
            if (this._isHeaderRow(row)) {
                // Render header row
                const headerRow = this._getHeaderRow(row);
                if (headerRow && headerRow.cells) {
                    headerRow.cells.forEach(headerCell => {
                        allCells.push(this._renderHeaderCell(headerCell));
                    });
                }
            }
            else {
                // Render entity row - track columns filled by colspan
                let colsFilled = 0;
                while (colsFilled < this.config.columns && entityIndex < this.config.entities.length) {
                    const entityConfig = this.config.entities[entityIndex];
                    const colspan = entityConfig?.colspan || 1;
                    // Create and render the cell
                    let cell;
                    if (!entityConfig || !entityConfig.entity) {
                        // Text-only or blank cell
                        const blankBackground = this._getColor('blank', entityConfig?.colors);
                        cell = {
                            displayText: entityConfig?.text || '',
                            backgroundColor: blankBackground,
                            textColor: this._getTextColor(entityConfig?.colors, blankBackground),
                            textOpacity: 1,
                            textAlign: entityConfig?.text_align,
                            clickable: false,
                            clickAction: 'none',
                            colspan: colspan,
                        };
                    }
                    else {
                        const stateObj = this.hass.states[entityConfig.entity];
                        cell = this._computeCell(entityConfig, stateObj);
                    }
                    allCells.push(this._renderCell(cell));
                    colsFilled += colspan;
                    entityIndex++;
                }
            }
        }
        return allCells;
    }
    static get styles() {
        return i$3 `
      :host {
        display: block;
        height: 100%;
        position: relative;
        contain: layout;
      }

      ha-card {
        box-shadow: none;
        padding: 0;
        background: transparent;
        border: none;
        position: relative;
        overflow: visible;
        height: 100%;
      }

      .grid-container {
        display: grid;
        width: 100%;
        position: relative;
        min-height: 100%;
      }

      .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        word-wrap: break-word;
        overflow: hidden;
        padding: 4px;
        box-sizing: border-box;
      }

      .header-cell {
        /* Header cells don't need icon placement classes */
      }

      .cell.icon-above {
        flex-direction: column;
      }

      .cell.icon-below {
        flex-direction: column-reverse;
      }

      .cell.icon-left {
        flex-direction: row;
      }

      .cell.icon-right {
        flex-direction: row-reverse;
      }

      .cell-icon {
        flex-shrink: 0;
      }

      .cell.icon-above .cell-icon,
      .cell.icon-below .cell-icon {
        margin: 2px 0;
      }

      .cell.icon-left .cell-icon,
      .cell.icon-right .cell-icon {
        margin: 0 4px;
      }

      .cell-text {
        min-width: 0;
        word-break: break-word;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .text-line {
        line-height: 1.2;
      }

      .cell.clickable {
        cursor: pointer;
      }

      .cell.clickable:hover {
        filter: brightness(1.2);
      }

      .cell.clickable:active {
        filter: brightness(0.8);
      }

      .cell.clickable:focus-visible {
        outline: 2px solid var(--primary-text-color);
        outline-offset: 2px;
      }
    `;
    }
    render() {
        if (!this.config || !this.hass) {
            return b ``;
        }
        // If cell_width is blank/empty, use 1fr for auto-sizing
        const cellWidthNormalized = this._normalizeSize(this.config.cell_width, '');
        const columnSize = cellWidthNormalized && cellWidthNormalized.trim() !== ''
            ? cellWidthNormalized
            : '1fr';
        const cellHeightNormalized = this._normalizeSize(this.config.cell_height, '100px');
        const cellGapNormalized = this._normalizeSize(this.config.cell_gap, '5px');
        const gridStyle = {
            'grid-template-columns': `repeat(${this.config.columns}, ${columnSize})`,
            'grid-template-rows': `repeat(${this.config.rows}, ${cellHeightNormalized})`,
            'gap': cellGapNormalized,
        };
        return b `
      <ha-card>
        <div class="grid-container" style=${this._styleMap(gridStyle)}>
          ${this._renderAllCells()}
        </div>
      </ha-card>
    `;
    }
    _colorWithOpacity(color, opacity) {
        // If already rgba, extract rgb and apply new opacity
        const rgbaMatch = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);
        if (rgbaMatch) {
            return `rgba(${rgbaMatch[1]}, ${rgbaMatch[2]}, ${rgbaMatch[3]}, ${opacity})`;
        }
        // Try to convert hex to rgba
        const hexMatch = color.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);
        if (hexMatch) {
            const r = parseInt(hexMatch[1], 16);
            const g = parseInt(hexMatch[2], 16);
            const b = parseInt(hexMatch[3], 16);
            return `rgba(${r}, ${g}, ${b}, ${opacity})`;
        }
        // For named colors, we'll need to use a different approach
        // Create a temporary element to get computed color
        const temp = document.createElement('div');
        temp.style.color = color;
        document.body.appendChild(temp);
        let computed;
        try {
            computed = getComputedStyle(temp).color;
        }
        finally {
            // Ensure the temporary element is always removed, even if reading the
            // computed style throws for some reason.
            temp.remove();
        }
        // Extract RGB from computed rgb() or rgba()
        const computedMatch = computed.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (computedMatch) {
            return `rgba(${computedMatch[1]}, ${computedMatch[2]}, ${computedMatch[3]}, ${opacity})`;
        }
        // Fallback: just return the color as-is
        return color;
    }
    _renderCell(cell) {
        // Convert text color to rgba with opacity if needed
        const textColor = cell.textOpacity < 1
            ? this._colorWithOpacity(cell.textColor, cell.textOpacity)
            : cell.textColor;
        const cellStyle = {
            'background-color': cell.backgroundColor,
            'color': textColor,
            'font-size': this._normalizeSize(this.config.font_size, '16px'),
            'font-weight': String(cell.fontWeight ?? this.config.font_weight ?? 'bold'),
        };
        // Add grid-column span if colspan is set
        if (cell.colspan && cell.colspan > 1) {
            cellStyle['grid-column'] = `span ${cell.colspan}`;
        }
        // Map text alignment to flexbox justify-content and text-align
        // justify-content: positions content block within the flex cell
        // text-align: controls how wrapped text aligns within text divs
        const alignmentMap = {
            'left': 'flex-start',
            'center': 'center',
            'right': 'flex-end',
        };
        if (cell.textAlign) {
            cellStyle['justify-content'] = alignmentMap[cell.textAlign] || 'center';
            cellStyle['text-align'] = cell.textAlign;
        }
        // Determine icon placement class
        const iconPlacementClass = cell.icon
            ? `icon-${this.config.icon_placement}`
            : '';
        const iconStyle = {
            '--mdc-icon-size': this._normalizeSize(this.config.icon_size, '24px'),
        };
        // Style for cell-text to match alignment
        const cellTextStyle = {};
        if (cell.textAlign) {
            cellTextStyle['align-items'] = alignmentMap[cell.textAlign] || 'center';
        }
        // Check if text contains newlines for multi-line display
        const textLines = cell.displayText.split('\n');
        // Clickable cells are keyboard buttons (Tab to reach, Enter or Space to activate);
        // their accessible name is the cell text. Lit keeps the element across updates, so
        // focus survives state changes.
        return b `
      <div
        class="cell ${cell.clickable ? 'clickable' : ''} ${iconPlacementClass}"
        style=${this._styleMap(cellStyle)}
        role=${cell.clickable ? 'button' : A}
        tabindex=${cell.clickable ? '0' : A}
        aria-haspopup=${cell.clickable && cell.clickAction === 'more-info' ? 'dialog' : A}
        @click=${() => this._handleClick(cell)}
        @keydown=${(e) => this._handleCellKeydown(e, cell)}
      >
        ${cell.icon ? b `<ha-icon class="cell-icon" .icon=${cell.icon} style=${this._styleMap(iconStyle)}></ha-icon>` : ''}
        <div class="cell-text" style=${this._styleMap(cellTextStyle)}>
          ${textLines.map(line => b `<div class="text-line">${line}</div>`)}
        </div>
      </div>
    `;
    }
    _styleMap(styles) {
        return Object.entries(styles)
            .map(([key, value]) => `${key}: ${value}`)
            .join('; ');
    }
};
__decorate([
    n({ attribute: false })
], IndicatorGridCard.prototype, "hass", void 0);
__decorate([
    r()
], IndicatorGridCard.prototype, "config", void 0);
IndicatorGridCard = __decorate([
    t('indicator-grid-card')
], IndicatorGridCard);

let IndicatorGridCardEditor = class IndicatorGridCardEditor extends i {
    setConfig(config) {
        this._config = config;
    }
    _valueChanged(ev) {
        if (!this._config || !this.hass) {
            return;
        }
        const newConfig = { ...this._config, ...ev.detail.value };
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    _configValueChanged(key, value) {
        if (!this._config || !this.hass) {
            return;
        }
        const newConfig = { ...this._config, [key]: value };
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    // Move keyboard focus to a control that survives re-render (the list's Add button),
    // so focus is not lost to <body> when the row holding the clicked Remove button disappears
    _focusControl(key) {
        this.shadowRoot?.querySelector(`[data-focus-key="${key}"]`)?.focus();
    }
    _globalColorChanged(colorType, value) {
        const newConfig = { ...this._config };
        if (!newConfig.global_colors) {
            newConfig.global_colors = {};
        }
        newConfig.global_colors = {
            ...newConfig.global_colors,
            [colorType]: value,
        };
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    _addEntity() {
        const newConfig = { ...this._config };
        if (!newConfig.entities) {
            newConfig.entities = [];
        }
        newConfig.entities = [...newConfig.entities, { entity: '' }];
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    _removeEntity(index) {
        const newConfig = { ...this._config };
        newConfig.entities = [...newConfig.entities];
        newConfig.entities.splice(index, 1);
        fireEvent(this, 'config-changed', { config: newConfig });
        this._focusControl('add-entity');
    }
    _entityChanged(index, key, value) {
        const newConfig = { ...this._config };
        newConfig.entities = [...newConfig.entities];
        newConfig.entities[index] = {
            ...newConfig.entities[index],
            [key]: value,
        };
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    _entityColorChanged(index, colorType, value) {
        const newConfig = { ...this._config };
        newConfig.entities = [...newConfig.entities];
        const entity = { ...newConfig.entities[index] };
        if (!entity.colors) {
            entity.colors = {};
        }
        entity.colors = {
            ...entity.colors,
            [colorType]: value,
        };
        newConfig.entities[index] = entity;
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    _entityIconChanged(index, iconType, value) {
        const newConfig = { ...this._config };
        newConfig.entities = [...newConfig.entities];
        const entity = { ...newConfig.entities[index] };
        if (!entity.icon) {
            entity.icon = {};
        }
        entity.icon = {
            ...entity.icon,
            [iconType]: value,
        };
        newConfig.entities[index] = entity;
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    _addHeaderRow() {
        const newConfig = { ...this._config };
        if (!newConfig.header_rows) {
            newConfig.header_rows = [];
        }
        newConfig.header_rows = [
            ...newConfig.header_rows,
            {
                row_index: 0,
                cells: [{ text: 'Header', colspan: 1 }],
            },
        ];
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    _removeHeaderRow(index) {
        const newConfig = { ...this._config };
        if (!newConfig.header_rows) {
            return;
        }
        newConfig.header_rows = [...newConfig.header_rows];
        newConfig.header_rows.splice(index, 1);
        fireEvent(this, 'config-changed', { config: newConfig });
        this._focusControl('add-header-row');
    }
    _headerRowChanged(index, key, value) {
        const newConfig = { ...this._config };
        if (!newConfig.header_rows) {
            return;
        }
        newConfig.header_rows = [...newConfig.header_rows];
        newConfig.header_rows[index] = {
            ...newConfig.header_rows[index],
            [key]: value,
        };
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    _addHeaderCell(rowIndex) {
        const newConfig = { ...this._config };
        if (!newConfig.header_rows) {
            return;
        }
        newConfig.header_rows = [...newConfig.header_rows];
        const headerRow = { ...newConfig.header_rows[rowIndex] };
        headerRow.cells = [...headerRow.cells, { text: 'Header', colspan: 1 }];
        newConfig.header_rows[rowIndex] = headerRow;
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    _removeHeaderCell(rowIndex, cellIndex) {
        const newConfig = { ...this._config };
        if (!newConfig.header_rows) {
            return;
        }
        newConfig.header_rows = [...newConfig.header_rows];
        const headerRow = { ...newConfig.header_rows[rowIndex] };
        headerRow.cells = [...headerRow.cells];
        headerRow.cells.splice(cellIndex, 1);
        newConfig.header_rows[rowIndex] = headerRow;
        fireEvent(this, 'config-changed', { config: newConfig });
        this._focusControl(`add-header-cell-${rowIndex}`);
    }
    _headerCellChanged(rowIndex, cellIndex, key, value) {
        const newConfig = { ...this._config };
        if (!newConfig.header_rows) {
            return;
        }
        newConfig.header_rows = [...newConfig.header_rows];
        const headerRow = { ...newConfig.header_rows[rowIndex] };
        headerRow.cells = [...headerRow.cells];
        headerRow.cells[cellIndex] = {
            ...headerRow.cells[cellIndex],
            [key]: value,
        };
        newConfig.header_rows[rowIndex] = headerRow;
        fireEvent(this, 'config-changed', { config: newConfig });
    }
    static get styles() {
        return i$3 `
      ha-selector {
        display: block;
        margin-bottom: 8px;
      }

      ha-expansion-panel {
        display: block;
        margin-top: 16px;
        margin-bottom: 16px;
      }

      .entity-item {
        border: 1px solid var(--divider-color);
        border-radius: 4px;
        padding: 12px;
        margin-bottom: 8px;
        background: var(--card-background-color);
      }

      .entity-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 12px;
      }

      .entity-details {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .color-grid {
        display: grid;
        gap: 8px;
        margin-top: 8px;
      }

      .color-field {
        margin-bottom: 8px;
      }

      .color-field ha-selector {
        margin-bottom: 0;
      }

      /* Text stays primary color for 4.5:1; red is used only on non-text parts
         (bar, icon), which need 3:1 */
      .error-text {
        display: flex;
        align-items: flex-start;
        gap: 6px;
        font-size: 12px;
        color: var(--primary-text-color);
        margin: 6px 0 0 0;
        padding: 4px 8px;
        border-left: 3px solid var(--error-color, #db4437);
      }

      .error-text:empty {
        display: none;
      }

      .error-text ha-icon {
        flex: 0 0 auto;
        color: var(--error-color, #db4437);
        --mdc-icon-size: 16px;
      }

      .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
      }
    `;
    }
    // Color text field with an inline error for invalid colors. ha-selector keeps its input
    // in a shadow root, so aria-describedby cannot reach it; the error is a live region instead.
    // It is always rendered, and Lit only rewrites its content when validity flips, so it is
    // announced once per change rather than on every keystroke.
    _renderColorField(label, value, onChange, helper) {
        const invalid = !!value && !CSS.supports('color', value);
        return b `
      <div class="color-field">
        <ha-selector
          .hass=${this.hass}
          .required=${false}
          .label=${label}
          .value=${value}
          .helper=${helper}
          .selector=${{ text: {} }}
          @value-changed=${(ev) => onChange(ev.detail.value)}
        ></ha-selector>
        <div class="error-text" aria-live="polite">${invalid ? b `<ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon><span><strong>Error:</strong> ${label} is not a valid color. Use a hex code (#FF0000), a color name (red), or var(--token).</span>` : A}</div>
      </div>
    `;
    }
    render() {
        if (!this.hass || !this._config) {
            return b ``;
        }
        return b `
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[
            { name: 'columns', selector: { number: { min: 1, max: 20, mode: 'box' } } },
            { name: 'rows', selector: { number: { min: 1, max: 20, mode: 'box' } } },
        ]}
        .computeLabel=${(schema) => schema.label || schema.name}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .label=${'Cell Width'}
        .value=${this._config.cell_width || ''}
        .selector=${{ text: {} }}
        @value-changed=${(ev) => this._configValueChanged('cell_width', ev.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .label=${'Cell Height'}
        .value=${this._config.cell_height || '100px'}
        .selector=${{ text: {} }}
        @value-changed=${(ev) => this._configValueChanged('cell_height', ev.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .label=${'Cell Gap'}
        .value=${this._config.cell_gap || '5px'}
        .selector=${{ text: {} }}
        @value-changed=${(ev) => this._configValueChanged('cell_gap', ev.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .label=${'Font Size'}
        .value=${this._config.font_size || '16px'}
        .selector=${{ text: {} }}
        @value-changed=${(ev) => this._configValueChanged('font_size', ev.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .selector=${{
            select: {
                options: [
                    { value: '300', label: 'Light (300)' },
                    { value: 'normal', label: 'Normal (400)' },
                    { value: '500', label: 'Medium (500)' },
                    { value: '600', label: 'Semi-Bold (600)' },
                    { value: 'bold', label: 'Bold (700)' },
                    { value: '800', label: 'Extra Bold (800)' },
                    { value: '900', label: 'Black (900)' },
                ],
            },
        }}
        .value=${this._config.font_weight || 'bold'}
        @value-changed=${(ev) => this._configValueChanged('font_weight', ev.detail.value)}
        .label=${'Font Weight'}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .label=${'Unavailable Text'}
        .value=${this._config.unavailable_text || 'INOP'}
        .selector=${{ text: {} }}
        @value-changed=${(ev) => this._configValueChanged('unavailable_text', ev.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .label=${'Dim Off Text (%)'}
        .value=${this._config.dim_off_text ?? ''}
        .selector=${{ number: { min: 0, max: 100, mode: 'box', step: 1 } }}
        @value-changed=${(ev) => this._configValueChanged('dim_off_text', ev.detail.value !== '' && ev.detail.value !== undefined ? Number(ev.detail.value) : undefined)}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .label=${'Decimals'}
        .value=${this._config.decimals ?? ''}
        .selector=${{ number: { min: 0, max: 10, mode: 'box', step: 1 } }}
        @value-changed=${(ev) => this._configValueChanged('decimals', ev.detail.value !== '' && ev.detail.value !== undefined ? Number(ev.detail.value) : undefined)}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .selector=${{ boolean: {} }}
        .value=${this._config.show_icons ?? false}
        @value-changed=${(ev) => this._configValueChanged('show_icons', ev.detail.value)}
        .label=${'Show Icons'}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .selector=${{
            select: {
                options: [
                    { value: 'above', label: 'Above text' },
                    { value: 'below', label: 'Below text' },
                    { value: 'left', label: 'Left of text' },
                    { value: 'right', label: 'Right of text' },
                ],
            },
        }}
        .value=${this._config.icon_placement || 'above'}
        @value-changed=${(ev) => this._configValueChanged('icon_placement', ev.detail.value)}
        .label=${'Icon Placement'}
      ></ha-selector>

      <ha-selector
        .required=${false}
        .hass=${this.hass}
        .label=${'Icon Size'}
        .value=${this._config.icon_size || '24px'}
        .selector=${{ text: {} }}
        @value-changed=${(ev) => this._configValueChanged('icon_size', ev.detail.value)}
      ></ha-selector>

      <ha-expansion-panel header="Global Colors" .expanded=${false}>
        ${this._renderColorField('On Color', this._config.global_colors?.on || 'green', (value) => this._globalColorChanged('on', value))}

        ${this._renderColorField('Off Color', this._config.global_colors?.off || 'gray', (value) => this._globalColorChanged('off', value))}

        ${this._renderColorField('Unavailable Color', this._config.global_colors?.unavailable || 'orange', (value) => this._globalColorChanged('unavailable', value))}

        ${this._renderColorField('Text Color', this._config.global_colors?.text || '', (value) => this._globalColorChanged('text', value), 'Leave empty for black or white, whichever contrasts more with each cell')}

        ${this._renderColorField('Blank Cell Color', this._config.global_colors?.blank || '#333333', (value) => this._globalColorChanged('blank', value))}
      </ha-expansion-panel>

      <div style="margin-top: 16px;">
        <h3>Header Rows</h3>
        ${(this._config.header_rows || []).map((headerRow, index) => this._renderHeaderRowConfig(headerRow, index))}

        <ha-button data-focus-key="add-header-row" @click=${this._addHeaderRow}>
          Add Header Row
        </ha-button>
      </div>

      <div style="margin-top: 16px;">
        <h3>Entities</h3>
        ${(this._config.entities || []).map((entity, index) => this._renderEntityConfig(entity, index))}

        <ha-button data-focus-key="add-entity" @click=${this._addEntity}>
          Add Entity
        </ha-button>
      </div>
    `;
    }
    _renderHeaderRowConfig(headerRow, rowIndex) {
        return b `
      <div class="entity-item">
        <div class="entity-header">
          <strong>Header Row ${rowIndex + 1}</strong>
          <ha-button appearance="plain" variant="danger" @click=${() => this._removeHeaderRow(rowIndex)}>
            Remove<span class="visually-hidden"> header row ${rowIndex + 1}</span>
          </ha-button>
        </div>

        <div class="entity-details">
          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .label=${'Row Index (0-based)'}
            .value=${headerRow.row_index}
            .selector=${{ number: { min: 0, max: this._config.rows - 1, mode: 'box', step: 1 } }}
            @value-changed=${(ev) => this._headerRowChanged(rowIndex, 'row_index', Number(ev.detail.value))}
          ></ha-selector>

          <h4>Header Cells</h4>
          ${headerRow.cells.map((cell, cellIndex) => this._renderHeaderCellConfig(rowIndex, cell, cellIndex))}

          <ha-button appearance="plain" data-focus-key="add-header-cell-${rowIndex}"
            @click=${() => this._addHeaderCell(rowIndex)}>
            Add Header Cell<span class="visually-hidden"> to header row ${rowIndex + 1}</span>
          </ha-button>
        </div>
      </div>
    `;
    }
    _renderHeaderCellConfig(rowIndex, cell, cellIndex) {
        return b `
      <div style="border: 1px dashed var(--divider-color); padding: 8px; margin: 8px 0; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong>Cell ${cellIndex + 1}</strong>
          <ha-button appearance="plain" variant="danger" @click=${() => this._removeHeaderCell(rowIndex, cellIndex)}>
            Remove<span class="visually-hidden"> cell ${cellIndex + 1} of header row ${rowIndex + 1}</span>
          </ha-button>
        </div>

        <ha-selector
          .required=${false}
          .hass=${this.hass}
          .label=${'Text'}
          .value=${cell.text || ''}
          .selector=${{ text: {} }}
          @value-changed=${(ev) => this._headerCellChanged(rowIndex, cellIndex, 'text', ev.detail.value)}
        ></ha-selector>

        <ha-selector
          .required=${false}
          .hass=${this.hass}
          .label=${'Column Span'}
          .value=${cell.colspan || 1}
          .selector=${{ number: { min: 1, max: this._config.columns, mode: 'box', step: 1 } }}
          @value-changed=${(ev) => this._headerCellChanged(rowIndex, cellIndex, 'colspan', Number(ev.detail.value))}
        ></ha-selector>

        <ha-selector
          .required=${false}
          .hass=${this.hass}
          .selector=${{
            select: {
                options: [
                    { value: 'left', label: 'Left' },
                    { value: 'center', label: 'Center' },
                    { value: 'right', label: 'Right' },
                ],
            },
        }}
          .value=${cell.text_align || 'center'}
          @value-changed=${(ev) => this._headerCellChanged(rowIndex, cellIndex, 'text_align', ev.detail.value)}
          .label=${'Text Alignment'}
        ></ha-selector>

        <ha-expansion-panel header="Advanced Styling (optional)" .expanded=${false}>
          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .label=${'Font Size'}
            .value=${cell.font_size || ''}
            .selector=${{ text: {} }}
            @value-changed=${(ev) => this._headerCellChanged(rowIndex, cellIndex, 'font_size', ev.detail.value)}
          ></ha-selector>

          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .selector=${{
            select: {
                options: [
                    { value: '', label: 'Default (from card)' },
                    { value: '300', label: 'Light (300)' },
                    { value: 'normal', label: 'Normal (400)' },
                    { value: '500', label: 'Medium (500)' },
                    { value: '600', label: 'Semi-Bold (600)' },
                    { value: 'bold', label: 'Bold (700)' },
                    { value: '800', label: 'Extra Bold (800)' },
                    { value: '900', label: 'Black (900)' },
                ],
            },
        }}
            .value=${cell.font_weight || ''}
            @value-changed=${(ev) => this._headerCellChanged(rowIndex, cellIndex, 'font_weight', ev.detail.value)}
            .label=${'Font Weight'}
          ></ha-selector>

          ${this._renderColorField('Text Color', cell.text_color || '', (value) => this._headerCellChanged(rowIndex, cellIndex, 'text_color', value))}

          ${this._renderColorField('Background Color', cell.background_color || '', (value) => this._headerCellChanged(rowIndex, cellIndex, 'background_color', value))}
        </ha-expansion-panel>
      </div>
    `;
    }
    _renderEntityConfig(entity, index) {
        const totalCells = this._config.columns * this._config.rows;
        const row = Math.floor(index / this._config.columns) + 1;
        const col = (index % this._config.columns) + 1;
        if (index >= totalCells) {
            return b ``;
        }
        return b `
      <div class="entity-item">
        <div class="entity-header">
          <strong>Cell ${index + 1} (Row ${row}, Col ${col})</strong>
          <ha-button appearance="plain" variant="danger" @click=${() => this._removeEntity(index)}>
            Remove<span class="visually-hidden"> cell ${index + 1}</span>
          </ha-button>
        </div>

        <div class="entity-details">
          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .selector=${{ entity: {} }}
            .value=${entity.entity || ''}
            @value-changed=${(ev) => this._entityChanged(index, 'entity', ev.detail.value)}
            .label=${'Entity (leave empty for blank cell)'}
          ></ha-selector>

          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .label=${'Custom text (optional)'}
            .value=${entity.text || ''}
            .selector=${{ text: {} }}
            @value-changed=${(ev) => this._entityChanged(index, 'text', ev.detail.value)}
          ></ha-selector>

          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .label=${'Text template'}
            .helper=${'Use {{ name }}, {{ state }}, {{ unit }}, {{ last_changed }} or {{ attributes.<name> }}, e.g. {{ name }}: {{ state }}'}
            .value=${entity.text_template || ''}
            .selector=${{ text: {} }}
            @value-changed=${(ev) => this._entityChanged(index, 'text_template', ev.detail.value)}
          ></ha-selector>

          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .label=${'Column Span'}
            .value=${entity.colspan || 1}
            .selector=${{ number: { min: 1, max: this._config.columns, mode: 'box', step: 1 } }}
            @value-changed=${(ev) => this._entityChanged(index, 'colspan', Number(ev.detail.value))}
          ></ha-selector>

          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .selector=${{
            select: {
                options: [
                    { value: '', label: 'Center (default)' },
                    { value: 'left', label: 'Left' },
                    { value: 'right', label: 'Right' },
                ],
            },
        }}
            .value=${entity.text_align || ''}
            @value-changed=${(ev) => this._entityChanged(index, 'text_align', ev.detail.value || undefined)}
            .label=${'Text Alignment'}
          ></ha-selector>

          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .selector=${{
            select: {
                options: [
                    { value: '', label: 'Auto (toggle or more-info)' },
                    { value: 'toggle', label: 'Toggle' },
                    { value: 'more-info', label: 'More Info' },
                    { value: 'none', label: 'None' },
                ],
            },
        }}
            .value=${entity.click_action || ''}
            @value-changed=${(ev) => this._entityChanged(index, 'click_action', ev.detail.value)}
            .label=${'Click Action'}
          ></ha-selector>

          <ha-selector
            .required=${false}
            .hass=${this.hass}
            .selector=${{ boolean: {} }}
            .value=${entity.show_icon ?? false}
            @value-changed=${(ev) => this._entityChanged(index, 'show_icon', ev.detail.value)}
            .label=${'Show Icon (override global setting)'}
          ></ha-selector>

          <ha-expansion-panel header="Per-Entity Colors (optional)" .expanded=${false}>
            <div class="color-grid">
              ${this._renderColorField('On Color', entity.colors?.on || '', (value) => this._entityColorChanged(index, 'on', value))}

              ${this._renderColorField('Off Color', entity.colors?.off || '', (value) => this._entityColorChanged(index, 'off', value))}

              ${this._renderColorField('Text Color', entity.colors?.text || '', (value) => this._entityColorChanged(index, 'text', value))}

              ${this._renderColorField('Blank Cell Color', entity.colors?.blank || '', (value) => this._entityColorChanged(index, 'blank', value))}

              <ha-selector
                .required=${false}
                .hass=${this.hass}
                .label=${'Dim Off Text (%)'}
                .value=${entity.dim_off_text ?? ''}
                .selector=${{ number: { min: 0, max: 100, mode: 'box', step: 1 } }}
                @value-changed=${(ev) => this._entityChanged(index, 'dim_off_text', ev.detail.value !== '' && ev.detail.value !== undefined ? Number(ev.detail.value) : undefined)}
              ></ha-selector>

              <ha-selector
                .required=${false}
                .hass=${this.hass}
                .label=${'Decimals'}
                .value=${entity.decimals ?? ''}
                .selector=${{ number: { min: 0, max: 10, mode: 'box', step: 1 } }}
                @value-changed=${(ev) => this._entityChanged(index, 'decimals', ev.detail.value !== '' && ev.detail.value !== undefined ? Number(ev.detail.value) : undefined)}
              ></ha-selector>
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel header="Custom Icons (optional)" .expanded=${false}>
            <ha-selector
              .required=${false}
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${entity.icon?.on || ''}
              @value-changed=${(ev) => this._entityIconChanged(index, 'on', ev.detail.value)}
              .label=${'On Icon'}
            ></ha-selector>

            <ha-selector
              .required=${false}
              .hass=${this.hass}
              .selector=${{ icon: {} }}
              .value=${entity.icon?.off || ''}
              @value-changed=${(ev) => this._entityIconChanged(index, 'off', ev.detail.value)}
              .label=${'Off Icon'}
            ></ha-selector>
          </ha-expansion-panel>
        </div>
      </div>
    `;
    }
};
__decorate([
    n({ attribute: false })
], IndicatorGridCardEditor.prototype, "hass", void 0);
__decorate([
    r()
], IndicatorGridCardEditor.prototype, "_config", void 0);
IndicatorGridCardEditor = __decorate([
    t('indicator-grid-card-editor')
], IndicatorGridCardEditor);

var editor = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get IndicatorGridCardEditor () { return IndicatorGridCardEditor; }
});

export { IndicatorGridCard };
//# sourceMappingURL=indicator-grid-card.js.map
