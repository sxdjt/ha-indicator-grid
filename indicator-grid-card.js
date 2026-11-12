/* Last changed: 11/11/2026, 20:13:17 */
function e(e,t,i,s){var o,n=arguments.length,r=n<3?t:null===s?s=Object.getOwnPropertyDescriptor(t,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(e,t,i,s);else for(var l=e.length-1;l>=0;l--)(o=e[l])&&(r=(n<3?o(r):n>3?o(t,i,r):o(t,i))||r);return n>3&&r&&Object.defineProperty(t,i,r),r}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,s=Symbol(),o=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==s)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&o.set(t,e))}return e}toString(){return this.cssText}};const r=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,s)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[s+1],e[0]);return new n(i,e,s)},l=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,s))(t)})(e):e,{is:a,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,p=globalThis,_=p.trustedTypes,f=_?_.emptyScript:"",$=p.reactiveElementPolyfillSupport,m=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},b=(e,t)=>!a(e,t),y={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let x=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=y){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(e,i,t);void 0!==s&&c(this.prototype,e,s)}}static getPropertyDescriptor(e,t,i){const{get:s,set:o}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:s,set(t){const n=s?.call(this);o?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??y}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...d(e),...u(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(l(e))}else void 0!==e&&t.push(l(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,s)=>{if(i)e.adoptedStyleSheets=s.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of s){const s=document.createElement("style"),o=t.litNonce;void 0!==o&&s.setAttribute("nonce",o),s.textContent=i.cssText,e.appendChild(s)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,i);if(void 0!==s&&!0===i.reflect){const o=(void 0!==i.converter?.toAttribute?i.converter:v).toAttribute(t,i.type);this._$Em=e,null==o?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,t){const i=this.constructor,s=i._$Eh.get(e);if(void 0!==s&&this._$Em!==s){const e=i.getPropertyOptions(s),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=s;const n=o.fromAttribute(t,e.type);this[s]=n??this._$Ej?.get(s)??n,this._$Em=null}}requestUpdate(e,t,i,s=!1,o){if(void 0!==e){const n=this.constructor;if(!1===s&&(o=this[e]),i??=n.getPropertyOptions(e),!((i.hasChanged??b)(o,t)||i.useDefault&&i.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:s,wrapped:o},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===s&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,s=this[t];!0!==e||this._$AL.has(t)||void 0===s||this.C(t,void 0,i,s)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[m("elementProperties")]=new Map,x[m("finalized")]=new Map,$?.({ReactiveElement:x}),(p.reactiveElementVersions??=[]).push("2.1.2");const C=globalThis,w=e=>e,A=C.trustedTypes,S=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+k,z=`<${T}>`,N=document,O=()=>N.createComment(""),H=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,R="[ \t\n\f\r]",M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,U=/>/g,q=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),F=/'/g,D=/"/g,j=/^(?:script|style|textarea|title)$/i,B=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),L=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,G=N.createTreeWalker(N,129);function K(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==S?S.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,s=[];let o,n=2===t?"<svg>":3===t?"<math>":"",r=M;for(let t=0;t<i;t++){const i=e[t];let l,a,c=-1,h=0;for(;h<i.length&&(r.lastIndex=h,a=r.exec(i),null!==a);)h=r.lastIndex,r===M?"!--"===a[1]?r=I:void 0!==a[1]?r=U:void 0!==a[2]?(j.test(a[2])&&(o=RegExp("</"+a[2],"g")),r=q):void 0!==a[3]&&(r=q):r===q?">"===a[0]?(r=o??M,c=-1):void 0===a[1]?c=-2:(c=r.lastIndex-a[2].length,l=a[1],r=void 0===a[3]?q:'"'===a[3]?D:F):r===D||r===F?r=q:r===I||r===U?r=M:(r=q,o=void 0);const d=r===q&&e[t+1].startsWith("/>")?" ":"";n+=r===M?i+z:c>=0?(s.push(l),i.slice(0,c)+E+i.slice(c)+k+d):i+k+(-2===c?t:d)}return[K(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),s]};class Z{constructor({strings:e,_$litType$:t},i){let s;this.parts=[];let o=0,n=0;const r=e.length-1,l=this.parts,[a,c]=J(e,t);if(this.el=Z.createElement(a,i),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(s=G.nextNode())&&l.length<r;){if(1===s.nodeType){if(s.hasAttributes())for(const e of s.getAttributeNames())if(e.endsWith(E)){const t=c[n++],i=s.getAttribute(e).split(k),r=/([.?@])?(.*)/.exec(t);l.push({type:1,index:o,name:r[2],strings:i,ctor:"."===r[1]?te:"?"===r[1]?ie:"@"===r[1]?se:ee}),s.removeAttribute(e)}else e.startsWith(k)&&(l.push({type:6,index:o}),s.removeAttribute(e));if(j.test(s.tagName)){const e=s.textContent.split(k),t=e.length-1;if(t>0){s.textContent=A?A.emptyScript:"";for(let i=0;i<t;i++)s.append(e[i],O()),G.nextNode(),l.push({type:2,index:++o});s.append(e[t],O())}}}else if(8===s.nodeType)if(s.data===T)l.push({type:2,index:o});else{let e=-1;for(;-1!==(e=s.data.indexOf(k,e+1));)l.push({type:7,index:o}),e+=k.length-1}o++}}static createElement(e,t){const i=N.createElement("template");return i.innerHTML=e,i}}function Q(e,t,i=e,s){if(t===L)return t;let o=void 0!==s?i._$Co?.[s]:i._$Cl;const n=H(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,i,s)),void 0!==s?(i._$Co??=[])[s]=o:i._$Cl=o),void 0!==o&&(t=Q(e,o._$AS(e,t.values),o,s)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,s=(e?.creationScope??N).importNode(t,!0);G.currentNode=s;let o=G.nextNode(),n=0,r=0,l=i[0];for(;void 0!==l;){if(n===l.index){let t;2===l.type?t=new Y(o,o.nextSibling,this,e):1===l.type?t=new l.ctor(o,l.name,l.strings,this,e):6===l.type&&(t=new oe(o,this,e)),this._$AV.push(t),l=i[++r]}n!==l?.index&&(o=G.nextNode(),n++)}return G.currentNode=N,s}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),H(e)?e===V||null==e||""===e?(this._$AH!==V&&this._$AR(),this._$AH=V):e!==this._$AH&&e!==L&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==V&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,s="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=Z.createElement(K(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(t);else{const e=new X(s,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new Z(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,s=0;for(const o of e)s===t.length?t.push(i=new Y(this.O(O()),this.O(O()),this,this.options)):i=t[s],i._$AI(o),s++;s<t.length&&(this._$AR(i&&i._$AB.nextSibling,s),t.length=s)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=w(e).nextSibling;w(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,s,o){this.type=1,this._$AH=V,this._$AN=void 0,this.element=e,this.name=t,this._$AM=s,this.options=o,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(e,t=this,i,s){const o=this.strings;let n=!1;if(void 0===o)e=Q(this,e,t,0),n=!H(e)||e!==this._$AH&&e!==L,n&&(this._$AH=e);else{const s=e;let r,l;for(e=o[0],r=0;r<o.length-1;r++)l=Q(this,s[i+r],t,r),l===L&&(l=this._$AH[r]),n||=!H(l)||l!==this._$AH[r],l===V?e=V:e!==V&&(e+=(l??"")+o[r+1]),this._$AH[r]=l}n&&!s&&this.j(e)}j(e){e===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===V?void 0:e}}class ie extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==V)}}class se extends ee{constructor(e,t,i,s,o){super(e,t,i,s,o),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??V)===L)return;const i=this._$AH,s=e===V&&i!==V||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,o=e!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ne=C.litHtmlPolyfillSupport;ne?.(Z,Y),(C.litHtmlVersions??=[]).push("3.3.3");const re=globalThis;class le extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const s=i?.renderBefore??t;let o=s._$litPart$;if(void 0===o){const e=i?.renderBefore??null;s._$litPart$=o=new Y(t.insertBefore(O(),e),e,void 0,i??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return L}}le._$litElement$=!0,le.finalized=!0,re.litElementHydrateSupport?.({LitElement:le});const ae=re.litElementPolyfillSupport;ae?.({LitElement:le}),(re.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},de=(e=he,t,i)=>{const{kind:s,metadata:o}=i;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===s&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===s){const{name:s}=i;return{set(i){const o=t.get.call(this);t.set.call(this,i),this.requestUpdate(s,o,e,!0,i)},init(t){return void 0!==t&&this.C(s,void 0,e,t),t}}}if("setter"===s){const{name:s}=i;return function(i){const o=this[s];t.call(this,i),this.requestUpdate(s,o,e,!0,i)}}throw Error("Unsupported decorator location: "+s)};function ue(e){return(t,i)=>"object"==typeof i?de(e,t,i):((e,t,i)=>{const s=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),s?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return ue({...e,state:!0,attribute:!1})}var pe,_e;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(pe||(pe={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(_e||(_e={}));const fe=(e,t,i,s)=>{s=s||{},i=null==i?{}:i;const o=new Event(t,{bubbles:void 0===s.bubbles||s.bubbles,cancelable:Boolean(s.cancelable),composed:void 0===s.composed||s.composed});return o.detail=i,e.dispatchEvent(o),o};function $e(e){return(e.operator??"<=").trim()}function me(e,t){switch($e(t)){case"<":return e<t.value;case"<=":return e<=t.value;case">":return e>t.value;case">=":return e>=t.value;case"==":return e===t.value;default:return!1}}function ve(e){return{backgroundColor:e.color,textColor:e.text_color,fontWeight:e.font_weight}}console.info("%c  INDICATOR-GRID-CARD  \n%c  Version 2026.11.11  ","color: black; background: #F2720C; font-weight: 600;","color: black; background: #00a5c9; font-weight: 600;"),window.customCards=window.customCards||[],window.customCards.push({type:"indicator-grid-card",name:"Indicator Grid Card",description:"A card displaying a grid of indicator lights showing entity status",preview:!0,getEntitySuggestion:(e,t)=>{const i=e?.states?.[t];if(!i)return null;const s=t.split(".")[0];return["binary_sensor","switch","light","input_boolean"].includes(s)?{config:{type:"custom:indicator-grid-card",entities:[{entity:t}]}}:null}});let be=class extends le{_normalizeSize(e,t){if(void 0===e)return t;const i=String(e);return/^\d+(\.\d+)?$/.test(i)?`${i}px`:i}static async getConfigElement(){return await Promise.resolve().then(function(){return xe}),document.createElement("indicator-grid-card-editor")}static getStubConfig(e){const t=["binary_sensor","switch","light","input_boolean"];return{columns:3,rows:2,cell_width:"",cell_height:100,cell_gap:5,font_size:16,font_weight:"bold",show_icons:!1,icon_placement:"above",icon_size:24,entities:e?.states?Object.keys(e.states).filter(e=>t.includes(e.split(".")[0])).slice(0,6).map(e=>({entity:e})):[],unavailable_text:"INOP",global_colors:{on:"green",off:"gray",text:"white",unavailable:"orange",blank:"#333333"}}}setConfig(e){if(!e)throw new Error("Invalid configuration");let t=e.cell_width,i=e.cell_height;void 0!==e.cell_size&&(t=t??`${e.cell_size}px`,i=i??`${e.cell_size}px`),this.config={...e,columns:e.columns??3,rows:e.rows??2,cell_width:this._normalizeSize(t,""),cell_height:this._normalizeSize(i,"100px"),cell_gap:this._normalizeSize(e.cell_gap,"5px"),font_size:this._normalizeSize(e.font_size,"16px"),font_weight:e.font_weight??"bold",show_icons:e.show_icons??!1,icon_placement:e.icon_placement??"above",icon_size:this._normalizeSize(e.icon_size,"24px"),unavailable_text:e.unavailable_text??"INOP",global_colors:{on:"green",off:"gray",unavailable:"orange",blank:"#333333",...e.global_colors}}}getCardSize(){if(!this.config)return 2;const e=this._normalizeSize(this.config.cell_height,"100px"),t=parseFloat(e),i=this._normalizeSize(this.config.cell_gap,"5px"),s=parseFloat(i),o=this.config.rows||2,n=o*t+(o-1)*s;return Math.ceil(n/50)}getGridOptions(){const e=this.config?.rows??2,t=e*parseFloat(this._normalizeSize(this.config?.cell_height,"100px"))+(e-1)*parseFloat(this._normalizeSize(this.config?.cell_gap,"5px"));return{rows:Math.ceil((t+8)/64),columns:12,min_rows:1,min_columns:3}}shouldUpdate(e){if(!this.config)return!1;if(e.has("config"))return!0;if(e.has("hass")){const t=e.get("hass");if(!t)return!0;const i=this.config.entities.filter(e=>e&&!!e.entity).map(e=>e.entity),s=this.config.entities.filter(e=>e&&!!e.text_template).flatMap(e=>this._extractTemplateEntityIds(e.text_template)),o=(this.config.header_rows||[]).flatMap(e=>e.cells).flatMap(e=>this._extractTemplateEntityIds(e.text));return[...new Set([...i,...s,...o])].some(e=>t.states[e]!==this.hass.states[e])}return!0}_computeCell(e,t){if(!t||"unavailable"===t.state||"unknown"===t.state){const i=`${e.text||t?.attributes?.friendly_name||e.entity||"Unknown"}\n${this.config.unavailable_text||"INOP"}`,s=this._getColor("unavailable",e.colors);return{entity:e.entity,displayText:i,backgroundColor:s,textColor:this._getTextColor(e.colors,s),textOpacity:1,textAlign:e.text_align,state:t?.state,clickable:!1,clickAction:"none",colspan:e.colspan||1}}const i=t.state,s=this._getDisplayText(e,t),o=this._getBackgroundColor(i,e);let n,r=this._getTextColor(e.colors,o);const l=parseFloat(i);if(!isNaN(l)){const t=this._getThresholdStyles(l,e.colors)||this._getThresholdStyles(l,this.config.global_colors);t&&(t.textColor&&(r=t.textColor),t.fontWeight&&(n=t.fontWeight))}const a=this._getTextOpacity(i,e),c=this._getIcon(i,e,t),h=e.click_action||this._getDefaultClickAction(t);return{entity:e.entity,displayText:s,backgroundColor:o,textColor:r,textOpacity:a,textAlign:e.text_align,fontWeight:n,icon:c,state:i,clickable:"none"!==h,clickAction:h,colspan:e.colspan||1}}_getDisplayText(e,t){if(e.text)return e.text;if(e.text_template)return this._renderTemplate(e.text_template,t,e);const i=this._formatNumericState(t.state,e),s=parseFloat(t.state),o=void 0!==e.decimals||void 0!==this.config.decimals;return!isNaN(s)&&o?i:t.attributes.friendly_name||e.entity||""}_renderTemplate(e,t,i){return e.replace(/\{\{\s*(.+?)\s*\}\}/g,(e,s)=>{const o=s.split("|").map(e=>e.trim());let n=this._resolveTemplateVariable(o[0],t,i);for(let e=1;e<o.length;e++)n=this._applyTemplateFilter(n,o[e]);return n})}_resolveTemplateVariable(e,t,i){const s=this._formatNumericState(t.state,i);if("state"===e)return s;if("name"===e)return t.attributes.friendly_name||i.entity||"";if("entity_id"===e)return t.entity_id||i.entity||"";if("unit"===e)return t.attributes.unit_of_measurement||"";if("state_with_unit"===e){const e=t.attributes.unit_of_measurement;return e?`${s} ${e}`:s}if("last_changed"===e)return this._relativeTime(t.last_changed);if("last_updated"===e)return this._relativeTime(t.last_updated);if(e.startsWith("attributes.")){const i=e.slice(11),s=t.attributes[i];return null!=s?String(s):""}const o=e.match(/^states\(['"]([^'"]+)['"]\)$/);if(o){const e=this.hass.states[o[1]];return e?e.state:""}return e}_relativeTime(e){if(!e)return"";const t=Math.floor((Date.now()-new Date(e).getTime())/1e3);if(isNaN(t))return"";if(t<60)return"just now";const i=Math.floor(t/60);if(i<60)return`${i} minute${1===i?"":"s"} ago`;const s=Math.floor(i/60);if(s<24)return`${s} hour${1===s?"":"s"} ago`;const o=Math.floor(s/24);return`${o} day${1===o?"":"s"} ago`}_extractTemplateEntityIds(e){const t=[],i=/\{\{\s*states\(['"]([^'"]+)['"]\)/g;let s;for(;null!==(s=i.exec(e));)t.push(s[1]);return t}_applyTemplateFilter(e,t){const i=t.indexOf("("),s=i>=0?t.slice(0,i).trim():t.trim();let o=[];if(i>=0){o=t.slice(i+1,t.lastIndexOf(")")).split(",").map(e=>e.trim().replace(/^['"]|['"]$/g,""))}switch(s){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"title":return e.replace(/\b\w/g,e=>e.toUpperCase());case"round":{const t=o.length>0?parseInt(o[0],10):0,i=parseFloat(e);return isNaN(i)?e:i.toFixed(isNaN(t)?0:t)}case"int":{const t=parseInt(e,10);return isNaN(t)?o.length>0?o[0]:"0":String(t)}case"float":{const t=parseFloat(e);return isNaN(t)?o.length>0?o[0]:"0":String(t)}case"replace":return o.length>=2?e.split(o[0]).join(o[1]):e;case"truncate":{const t=o.length>0?parseInt(o[0],10):255,i=isNaN(t)?255:t;return e.length>i?e.slice(0,i)+"...":e}case"default":return""!==e?e:o.length>0?o[0]:"";default:return e}}_getBackgroundColor(e,t){const i=t.colors;if(i?.states&&i.states[e])return i.states[e];if(this.config.global_colors?.states&&this.config.global_colors.states[e])return this.config.global_colors.states[e];const s=parseFloat(e);if(!isNaN(s)){const e=this._getThresholdStyles(s,i)||this._getThresholdStyles(s,this.config.global_colors);if(e?.backgroundColor)return e.backgroundColor}return"on"===e?this._getColor("on",i):this._getColor("off",i)}_getThresholdStyles(e,t){return function(e,t){if(!t||0===t.length)return null;const i=t.filter(e=>{const t=$e(e);return">"===t||">="===t}).sort((e,t)=>t.value-e.value),s=t.filter(e=>{const t=$e(e);return"<"===t||"<="===t}).sort((e,t)=>e.value-t.value),o=t.filter(e=>"=="===$e(e));for(const t of[...i,...s,...o])if(me(e,t))return ve(t);return null}(e,t?.thresholds)}_getColor(e,t){if(t&&t[e])return t[e];if(this.config.global_colors&&this.config.global_colors[e])return this.config.global_colors[e];return{on:"green",off:"gray",unavailable:"orange",text:"white",blank:"#333333"}[e]}_getTextColor(e,t){if(e?.text)return e.text;if(this.config.global_colors?.text)return this.config.global_colors.text;const i=this._resolveRgb(t);if(!i)return"white";const s=e=>{const t=e/255;return t<=.03928?t/12.92:Math.pow((t+.055)/1.055,2.4)},o=.2126*s(i[0])+.7152*s(i[1])+.0722*s(i[2]);return(o+.05)/.05>=1.05/(o+.05)?"black":"white"}_resolveRgb(e){const t=e.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(t)return[parseInt(t[1],16),parseInt(t[2],16),parseInt(t[3],16)];const i=e.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i);if(i)return[parseInt(i[1]+i[1],16),parseInt(i[2]+i[2],16),parseInt(i[3]+i[3],16)];const s=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);if(s)return[Number(s[1]),Number(s[2]),Number(s[3])];if(e.startsWith("var(")||"undefined"==typeof document||"function"!=typeof getComputedStyle)return;const o=document.createElement("div");let n;o.style.color=e,document.body.appendChild(o);try{n=getComputedStyle(o).color}finally{o.remove()}const r=n.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);return r?[Number(r[1]),Number(r[2]),Number(r[3])]:void 0}_getIcon(e,t,i){if(t&&void 0!==t.show_icon){if(!t.show_icon)return}else if(!this.config.show_icons)return;const s="on"===e?"on":"off";if(t&&t.icon&&t.icon[s])return t.icon[s];if(i&&i.attributes){if(i.attributes.icon)return i.attributes.icon;const t=i.entity_id.split(".")[0],s={light:"on"===e?"mdi:lightbulb-on":"mdi:lightbulb",switch:"on"===e?"mdi:toggle-switch":"mdi:toggle-switch-off",binary_sensor:"on"===e?"mdi:checkbox-marked-circle":"mdi:checkbox-blank-circle-outline",sensor:"mdi:eye"};if(s[t])return s[t]}}_getTextOpacity(e,t){return"off"!==e?1:void 0!==t.dim_off_text?t.dim_off_text/100:void 0!==this.config.dim_off_text?this.config.dim_off_text/100:1}_formatNumericState(e,t){const i=parseFloat(e);if(isNaN(i))return e;let s;if(void 0!==t.decimals?s=t.decimals:void 0!==this.config.decimals&&(s=this.config.decimals),void 0===s)return e;const o=Math.max(0,Math.min(10,Math.floor(s)));return isFinite(i)?i.toFixed(o):e}_getDefaultClickAction(e){const t=e.entity_id.split(".")[0];return["light","switch","input_boolean","automation","fan"].includes(t)?"toggle":"more-info"}_handleClick(e){e.clickable&&e.entity&&("toggle"===e.clickAction?this._toggleEntity(e.entity):"more-info"===e.clickAction&&this._showMoreInfo(e.entity))}_handleCellKeydown(e,t){!t.clickable||"Enter"!==e.key&&" "!==e.key||(e.preventDefault(),this._handleClick(t))}_toggleEntity(e){const t=e.split(".")[0];this.hass.callService(t,"toggle",{entity_id:e})}_showMoreInfo(e){fe(this,"hass-more-info",{entityId:e})}_isHeaderRow(e){return!!this.config.header_rows&&this.config.header_rows.some(t=>t.row_index===e)}_getHeaderRow(e){if(this.config.header_rows)return this.config.header_rows.find(t=>t.row_index===e)}_processHeaderText(e){return e.replace(/\{\{\s*(.+?)\s*\}\}/g,(e,t)=>{const i=t.split("|").map(e=>e.trim()),s=i[0].match(/^states\(['"]([^'"]+)['"]\)$/);let o;if(s){const e=this.hass.states[s[1]];o=e?e.state:""}else o=i[0];for(let e=1;e<i.length;e++)o=this._applyTemplateFilter(o,i[e]);return o})}_renderHeaderCell(e){const t=e.colspan||1,i=e.text_align||"center",s=this._normalizeSize(this.config.font_size,"16px"),o=this._normalizeSize(e.font_size,s),n=e.font_weight||this.config.font_weight||"bold",r=e.background_color||this._getColor("blank",void 0),l=e.text_color||this._getTextColor(void 0,r),a=this._processHeaderText(e.text),c={"background-color":r,color:l,"font-size":o,"font-weight":String(n),"text-align":i,"grid-column":`span ${t}`};return B`
      <div class="cell header-cell" style=${this._styleMap(c)}>
        <div class="cell-text">
          <div class="text-line">${a}</div>
        </div>
      </div>
    `}_renderAllCells(){const e=[];let t=0;for(let i=0;i<this.config.rows;i++)if(this._isHeaderRow(i)){const t=this._getHeaderRow(i);t&&t.cells&&t.cells.forEach(t=>{e.push(this._renderHeaderCell(t))})}else{let i=0;for(;i<this.config.columns&&t<this.config.entities.length;){const s=this.config.entities[t],o=s?.colspan||1;let n;if(s&&s.entity){const e=this.hass.states[s.entity];n=this._computeCell(s,e)}else{const e=this._getColor("blank",s?.colors);n={displayText:s?.text||"",backgroundColor:e,textColor:this._getTextColor(s?.colors,e),textOpacity:1,textAlign:s?.text_align,clickable:!1,clickAction:"none",colspan:o}}e.push(this._renderCell(n)),i+=o,t++}}return e}static get styles(){return r`
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
    `}render(){if(!this.config||!this.hass)return B``;const e=this._normalizeSize(this.config.cell_width,""),t=e&&""!==e.trim()?e:"1fr",i=this._normalizeSize(this.config.cell_height,"100px"),s=this._normalizeSize(this.config.cell_gap,"5px"),o={"grid-template-columns":`repeat(${this.config.columns}, ${t})`,"grid-template-rows":`repeat(${this.config.rows}, ${i})`,gap:s};return B`
      <ha-card>
        <div class="grid-container" style=${this._styleMap(o)}>
          ${this._renderAllCells()}
        </div>
      </ha-card>
    `}_colorWithOpacity(e,t){const i=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);if(i)return`rgba(${i[1]}, ${i[2]}, ${i[3]}, ${t})`;const s=e.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(s){return`rgba(${parseInt(s[1],16)}, ${parseInt(s[2],16)}, ${parseInt(s[3],16)}, ${t})`}const o=document.createElement("div");let n;o.style.color=e,document.body.appendChild(o);try{n=getComputedStyle(o).color}finally{o.remove()}const r=n.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);return r?`rgba(${r[1]}, ${r[2]}, ${r[3]}, ${t})`:e}_renderCell(e){const t=e.textOpacity<1?this._colorWithOpacity(e.textColor,e.textOpacity):e.textColor,i={"background-color":e.backgroundColor,color:t,"font-size":this._normalizeSize(this.config.font_size,"16px"),"font-weight":String(e.fontWeight??this.config.font_weight??"bold")};e.colspan&&e.colspan>1&&(i["grid-column"]=`span ${e.colspan}`);const s={left:"flex-start",center:"center",right:"flex-end"};e.textAlign&&(i["justify-content"]=s[e.textAlign]||"center",i["text-align"]=e.textAlign);const o=e.icon?`icon-${this.config.icon_placement}`:"",n={"--mdc-icon-size":this._normalizeSize(this.config.icon_size,"24px")},r={};e.textAlign&&(r["align-items"]=s[e.textAlign]||"center");const l=e.displayText.split("\n");return B`
      <div
        class="cell ${e.clickable?"clickable":""} ${o}"
        style=${this._styleMap(i)}
        role=${e.clickable?"button":V}
        tabindex=${e.clickable?"0":V}
        aria-haspopup=${e.clickable&&"more-info"===e.clickAction?"dialog":V}
        @click=${()=>this._handleClick(e)}
        @keydown=${t=>this._handleCellKeydown(t,e)}
      >
        ${e.icon?B`<ha-icon class="cell-icon" .icon=${e.icon} style=${this._styleMap(n)}></ha-icon>`:""}
        <div class="cell-text" style=${this._styleMap(r)}>
          ${l.map(e=>B`<div class="text-line">${e}</div>`)}
        </div>
      </div>
    `}_styleMap(e){return Object.entries(e).map(([e,t])=>`${e}: ${t}`).join("; ")}};e([ue({attribute:!1})],be.prototype,"hass",void 0),e([ge()],be.prototype,"config",void 0),be=e([ce("indicator-grid-card")],be);let ye=class extends le{setConfig(e){this._config=e}_valueChanged(e){if(!this._config||!this.hass)return;const t={...this._config,...e.detail.value};fe(this,"config-changed",{config:t})}_configValueChanged(e,t){if(!this._config||!this.hass)return;const i={...this._config,[e]:t};fe(this,"config-changed",{config:i})}_focusControl(e){this.shadowRoot?.querySelector(`[data-focus-key="${e}"]`)?.focus()}_globalColorChanged(e,t){const i={...this._config};i.global_colors||(i.global_colors={}),i.global_colors={...i.global_colors,[e]:t},fe(this,"config-changed",{config:i})}_addEntity(){const e={...this._config};e.entities||(e.entities=[]),e.entities=[...e.entities,{entity:""}],fe(this,"config-changed",{config:e})}_removeEntity(e){const t={...this._config};t.entities=[...t.entities],t.entities.splice(e,1),fe(this,"config-changed",{config:t}),this._focusControl("add-entity")}_entityChanged(e,t,i){const s={...this._config};s.entities=[...s.entities],s.entities[e]={...s.entities[e],[t]:i},fe(this,"config-changed",{config:s})}_entityColorChanged(e,t,i){const s={...this._config};s.entities=[...s.entities];const o={...s.entities[e]};o.colors||(o.colors={}),o.colors={...o.colors,[t]:i},s.entities[e]=o,fe(this,"config-changed",{config:s})}_entityIconChanged(e,t,i){const s={...this._config};s.entities=[...s.entities];const o={...s.entities[e]};o.icon||(o.icon={}),o.icon={...o.icon,[t]:i},s.entities[e]=o,fe(this,"config-changed",{config:s})}_addHeaderRow(){const e={...this._config};e.header_rows||(e.header_rows=[]),e.header_rows=[...e.header_rows,{row_index:0,cells:[{text:"Header",colspan:1}]}],fe(this,"config-changed",{config:e})}_removeHeaderRow(e){const t={...this._config};t.header_rows&&(t.header_rows=[...t.header_rows],t.header_rows.splice(e,1),fe(this,"config-changed",{config:t}),this._focusControl("add-header-row"))}_headerRowChanged(e,t,i){const s={...this._config};s.header_rows&&(s.header_rows=[...s.header_rows],s.header_rows[e]={...s.header_rows[e],[t]:i},fe(this,"config-changed",{config:s}))}_addHeaderCell(e){const t={...this._config};if(!t.header_rows)return;t.header_rows=[...t.header_rows];const i={...t.header_rows[e]};i.cells=[...i.cells,{text:"Header",colspan:1}],t.header_rows[e]=i,fe(this,"config-changed",{config:t})}_removeHeaderCell(e,t){const i={...this._config};if(!i.header_rows)return;i.header_rows=[...i.header_rows];const s={...i.header_rows[e]};s.cells=[...s.cells],s.cells.splice(t,1),i.header_rows[e]=s,fe(this,"config-changed",{config:i}),this._focusControl(`add-header-cell-${e}`)}_headerCellChanged(e,t,i,s){const o={...this._config};if(!o.header_rows)return;o.header_rows=[...o.header_rows];const n={...o.header_rows[e]};n.cells=[...n.cells],n.cells[t]={...n.cells[t],[i]:s},o.header_rows[e]=n,fe(this,"config-changed",{config:o})}static get styles(){return r`
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
    `}_renderColorField(e,t,i,s){const o=!!t&&!CSS.supports("color",t);return B`
      <div class="color-field">
        <ha-selector
          .hass=${this.hass}
          .required=${!1}
          .label=${e}
          .value=${t}
          .helper=${s}
          .selector=${{text:{}}}
          @value-changed=${e=>i(e.detail.value)}
        ></ha-selector>
        <div class="error-text" aria-live="polite">${o?B`<ha-icon icon="mdi:alert-circle" aria-hidden="true"></ha-icon><span><strong>Error:</strong> ${e} is not a valid color. Use a hex code (#FF0000), a color name (red), or var(--token).</span>`:V}</div>
      </div>
    `}render(){return this.hass&&this._config?B`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"columns",selector:{number:{min:1,max:20,mode:"box"}}},{name:"rows",selector:{number:{min:1,max:20,mode:"box"}}}]}
        .computeLabel=${e=>e.label||e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .label=${"Cell Width"}
        .value=${this._config.cell_width||""}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("cell_width",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .label=${"Cell Height"}
        .value=${this._config.cell_height||"100px"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("cell_height",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .label=${"Cell Gap"}
        .value=${this._config.cell_gap||"5px"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("cell_gap",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .label=${"Font Size"}
        .value=${this._config.font_size||"16px"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("font_size",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .selector=${{select:{options:[{value:"300",label:"Light (300)"},{value:"normal",label:"Normal (400)"},{value:"500",label:"Medium (500)"},{value:"600",label:"Semi-Bold (600)"},{value:"bold",label:"Bold (700)"},{value:"800",label:"Extra Bold (800)"},{value:"900",label:"Black (900)"}]}}}
        .value=${this._config.font_weight||"bold"}
        @value-changed=${e=>this._configValueChanged("font_weight",e.detail.value)}
        .label=${"Font Weight"}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .label=${"Unavailable Text"}
        .value=${this._config.unavailable_text||"INOP"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("unavailable_text",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .label=${"Dim Off Text (%)"}
        .value=${this._config.dim_off_text??""}
        .selector=${{number:{min:0,max:100,mode:"box",step:1}}}
        @value-changed=${e=>this._configValueChanged("dim_off_text",""!==e.detail.value&&void 0!==e.detail.value?Number(e.detail.value):void 0)}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .label=${"Decimals"}
        .value=${this._config.decimals??""}
        .selector=${{number:{min:0,max:10,mode:"box",step:1}}}
        @value-changed=${e=>this._configValueChanged("decimals",""!==e.detail.value&&void 0!==e.detail.value?Number(e.detail.value):void 0)}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .selector=${{boolean:{}}}
        .value=${this._config.show_icons??!1}
        @value-changed=${e=>this._configValueChanged("show_icons",e.detail.value)}
        .label=${"Show Icons"}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .selector=${{select:{options:[{value:"above",label:"Above text"},{value:"below",label:"Below text"},{value:"left",label:"Left of text"},{value:"right",label:"Right of text"}]}}}
        .value=${this._config.icon_placement||"above"}
        @value-changed=${e=>this._configValueChanged("icon_placement",e.detail.value)}
        .label=${"Icon Placement"}
      ></ha-selector>

      <ha-selector
        .required=${!1}
        .hass=${this.hass}
        .label=${"Icon Size"}
        .value=${this._config.icon_size||"24px"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("icon_size",e.detail.value)}
      ></ha-selector>

      <ha-expansion-panel header="Global Colors" .expanded=${!1}>
        ${this._renderColorField("On Color",this._config.global_colors?.on||"green",e=>this._globalColorChanged("on",e))}

        ${this._renderColorField("Off Color",this._config.global_colors?.off||"gray",e=>this._globalColorChanged("off",e))}

        ${this._renderColorField("Unavailable Color",this._config.global_colors?.unavailable||"orange",e=>this._globalColorChanged("unavailable",e))}

        ${this._renderColorField("Text Color",this._config.global_colors?.text||"",e=>this._globalColorChanged("text",e),"Leave empty for black or white, whichever contrasts more with each cell")}

        ${this._renderColorField("Blank Cell Color",this._config.global_colors?.blank||"#333333",e=>this._globalColorChanged("blank",e))}
      </ha-expansion-panel>

      <div style="margin-top: 16px;">
        <h3>Header Rows</h3>
        ${(this._config.header_rows||[]).map((e,t)=>this._renderHeaderRowConfig(e,t))}

        <ha-button data-focus-key="add-header-row" @click=${this._addHeaderRow}>
          Add Header Row
        </ha-button>
      </div>

      <div style="margin-top: 16px;">
        <h3>Entities</h3>
        ${(this._config.entities||[]).map((e,t)=>this._renderEntityConfig(e,t))}

        <ha-button data-focus-key="add-entity" @click=${this._addEntity}>
          Add Entity
        </ha-button>
      </div>
    `:B``}_renderHeaderRowConfig(e,t){return B`
      <div class="entity-item">
        <div class="entity-header">
          <strong>Header Row ${t+1}</strong>
          <ha-button appearance="plain" variant="danger" @click=${()=>this._removeHeaderRow(t)}>
            Remove<span class="visually-hidden"> header row ${t+1}</span>
          </ha-button>
        </div>

        <div class="entity-details">
          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .label=${"Row Index (0-based)"}
            .value=${e.row_index}
            .selector=${{number:{min:0,max:this._config.rows-1,mode:"box",step:1}}}
            @value-changed=${e=>this._headerRowChanged(t,"row_index",Number(e.detail.value))}
          ></ha-selector>

          <h4>Header Cells</h4>
          ${e.cells.map((e,i)=>this._renderHeaderCellConfig(t,e,i))}

          <ha-button appearance="plain" data-focus-key="add-header-cell-${t}"
            @click=${()=>this._addHeaderCell(t)}>
            Add Header Cell<span class="visually-hidden"> to header row ${t+1}</span>
          </ha-button>
        </div>
      </div>
    `}_renderHeaderCellConfig(e,t,i){return B`
      <div style="border: 1px dashed var(--divider-color); padding: 8px; margin: 8px 0; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong>Cell ${i+1}</strong>
          <ha-button appearance="plain" variant="danger" @click=${()=>this._removeHeaderCell(e,i)}>
            Remove<span class="visually-hidden"> cell ${i+1} of header row ${e+1}</span>
          </ha-button>
        </div>

        <ha-selector
          .required=${!1}
          .hass=${this.hass}
          .label=${"Text"}
          .value=${t.text||""}
          .selector=${{text:{}}}
          @value-changed=${t=>this._headerCellChanged(e,i,"text",t.detail.value)}
        ></ha-selector>

        <ha-selector
          .required=${!1}
          .hass=${this.hass}
          .label=${"Column Span"}
          .value=${t.colspan||1}
          .selector=${{number:{min:1,max:this._config.columns,mode:"box",step:1}}}
          @value-changed=${t=>this._headerCellChanged(e,i,"colspan",Number(t.detail.value))}
        ></ha-selector>

        <ha-selector
          .required=${!1}
          .hass=${this.hass}
          .selector=${{select:{options:[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}]}}}
          .value=${t.text_align||"center"}
          @value-changed=${t=>this._headerCellChanged(e,i,"text_align",t.detail.value)}
          .label=${"Text Alignment"}
        ></ha-selector>

        <ha-expansion-panel header="Advanced Styling (optional)" .expanded=${!1}>
          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .label=${"Font Size"}
            .value=${t.font_size||""}
            .selector=${{text:{}}}
            @value-changed=${t=>this._headerCellChanged(e,i,"font_size",t.detail.value)}
          ></ha-selector>

          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"",label:"Default (from card)"},{value:"300",label:"Light (300)"},{value:"normal",label:"Normal (400)"},{value:"500",label:"Medium (500)"},{value:"600",label:"Semi-Bold (600)"},{value:"bold",label:"Bold (700)"},{value:"800",label:"Extra Bold (800)"},{value:"900",label:"Black (900)"}]}}}
            .value=${t.font_weight||""}
            @value-changed=${t=>this._headerCellChanged(e,i,"font_weight",t.detail.value)}
            .label=${"Font Weight"}
          ></ha-selector>

          ${this._renderColorField("Text Color",t.text_color||"",t=>this._headerCellChanged(e,i,"text_color",t))}

          ${this._renderColorField("Background Color",t.background_color||"",t=>this._headerCellChanged(e,i,"background_color",t))}
        </ha-expansion-panel>
      </div>
    `}_renderEntityConfig(e,t){const i=this._config.columns*this._config.rows,s=Math.floor(t/this._config.columns)+1,o=t%this._config.columns+1;return t>=i?B``:B`
      <div class="entity-item">
        <div class="entity-header">
          <strong>Cell ${t+1} (Row ${s}, Col ${o})</strong>
          <ha-button appearance="plain" variant="danger" @click=${()=>this._removeEntity(t)}>
            Remove<span class="visually-hidden"> cell ${t+1}</span>
          </ha-button>
        </div>

        <div class="entity-details">
          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .selector=${{entity:{}}}
            .value=${e.entity||""}
            @value-changed=${e=>this._entityChanged(t,"entity",e.detail.value)}
            .label=${"Entity (leave empty for blank cell)"}
          ></ha-selector>

          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .label=${"Custom text (optional)"}
            .value=${e.text||""}
            .selector=${{text:{}}}
            @value-changed=${e=>this._entityChanged(t,"text",e.detail.value)}
          ></ha-selector>

          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .label=${"Text template"}
            .helper=${"Use {{ name }}, {{ state }}, {{ unit }}, {{ last_changed }} or {{ attributes.<name> }}, e.g. {{ name }}: {{ state }}"}
            .value=${e.text_template||""}
            .selector=${{text:{}}}
            @value-changed=${e=>this._entityChanged(t,"text_template",e.detail.value)}
          ></ha-selector>

          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .label=${"Column Span"}
            .value=${e.colspan||1}
            .selector=${{number:{min:1,max:this._config.columns,mode:"box",step:1}}}
            @value-changed=${e=>this._entityChanged(t,"colspan",Number(e.detail.value))}
          ></ha-selector>

          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"",label:"Center (default)"},{value:"left",label:"Left"},{value:"right",label:"Right"}]}}}
            .value=${e.text_align||""}
            @value-changed=${e=>this._entityChanged(t,"text_align",e.detail.value||void 0)}
            .label=${"Text Alignment"}
          ></ha-selector>

          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"",label:"Auto (toggle or more-info)"},{value:"toggle",label:"Toggle"},{value:"more-info",label:"More Info"},{value:"none",label:"None"}]}}}
            .value=${e.click_action||""}
            @value-changed=${e=>this._entityChanged(t,"click_action",e.detail.value)}
            .label=${"Click Action"}
          ></ha-selector>

          <ha-selector
            .required=${!1}
            .hass=${this.hass}
            .selector=${{boolean:{}}}
            .value=${e.show_icon??!1}
            @value-changed=${e=>this._entityChanged(t,"show_icon",e.detail.value)}
            .label=${"Show Icon (override global setting)"}
          ></ha-selector>

          <ha-expansion-panel header="Per-Entity Colors (optional)" .expanded=${!1}>
            <div class="color-grid">
              ${this._renderColorField("On Color",e.colors?.on||"",e=>this._entityColorChanged(t,"on",e))}

              ${this._renderColorField("Off Color",e.colors?.off||"",e=>this._entityColorChanged(t,"off",e))}

              ${this._renderColorField("Text Color",e.colors?.text||"",e=>this._entityColorChanged(t,"text",e))}

              ${this._renderColorField("Blank Cell Color",e.colors?.blank||"",e=>this._entityColorChanged(t,"blank",e))}

              <ha-selector
                .required=${!1}
                .hass=${this.hass}
                .label=${"Dim Off Text (%)"}
                .value=${e.dim_off_text??""}
                .selector=${{number:{min:0,max:100,mode:"box",step:1}}}
                @value-changed=${e=>this._entityChanged(t,"dim_off_text",""!==e.detail.value&&void 0!==e.detail.value?Number(e.detail.value):void 0)}
              ></ha-selector>

              <ha-selector
                .required=${!1}
                .hass=${this.hass}
                .label=${"Decimals"}
                .value=${e.decimals??""}
                .selector=${{number:{min:0,max:10,mode:"box",step:1}}}
                @value-changed=${e=>this._entityChanged(t,"decimals",""!==e.detail.value&&void 0!==e.detail.value?Number(e.detail.value):void 0)}
              ></ha-selector>
            </div>
          </ha-expansion-panel>

          <ha-expansion-panel header="Custom Icons (optional)" .expanded=${!1}>
            <ha-selector
              .required=${!1}
              .hass=${this.hass}
              .selector=${{icon:{}}}
              .value=${e.icon?.on||""}
              @value-changed=${e=>this._entityIconChanged(t,"on",e.detail.value)}
              .label=${"On Icon"}
            ></ha-selector>

            <ha-selector
              .required=${!1}
              .hass=${this.hass}
              .selector=${{icon:{}}}
              .value=${e.icon?.off||""}
              @value-changed=${e=>this._entityIconChanged(t,"off",e.detail.value)}
              .label=${"Off Icon"}
            ></ha-selector>
          </ha-expansion-panel>
        </div>
      </div>
    `}};e([ue({attribute:!1})],ye.prototype,"hass",void 0),e([ge()],ye.prototype,"_config",void 0),ye=e([ce("indicator-grid-card-editor")],ye);var xe=Object.freeze({__proto__:null,get IndicatorGridCardEditor(){return ye}});export{be as IndicatorGridCard};
//# sourceMappingURL=indicator-grid-card.js.map
