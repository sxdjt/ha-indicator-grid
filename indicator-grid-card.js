/* Last changed: 06/12/2026, 23:33:30 */
function e(e,t,s,i){var o,n=arguments.length,l=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,s):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,s,i);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(l=(n<3?o(l):n>3?o(t,s,l):o(t,s))||l);return n>3&&l&&Object.defineProperty(t,s,l),l}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,s=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),o=new WeakMap;let n=class{constructor(e,t,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(s&&void 0===e){const s=void 0!==t&&1===t.length;s&&(e=o.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),s&&o.set(t,e))}return e}toString(){return this.cssText}};const l=(e,...t)=>{const s=1===e.length?e[0]:t.reduce((t,s,i)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+e[i+1],e[0]);return new n(s,e,i)},a=s?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const s of e.cssRules)t+=s.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,i))(t)})(e):e,{is:r,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:u,getPrototypeOf:g}=Object,_=globalThis,p=_.trustedTypes,f=p?p.emptyScript:"",$=_.reactiveElementPolyfillSupport,m=(e,t)=>e,v={toAttribute(e,t){switch(t){case Boolean:e=e?f:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let s=e;switch(t){case Boolean:s=null!==e;break;case Number:s=null===e?null:Number(e);break;case Object:case Array:try{s=JSON.parse(e)}catch(e){s=null}}return s}},b=(e,t)=>!r(e,t),x={attribute:!0,type:String,converter:v,reflect:!1,useDefault:!1,hasChanged:b};Symbol.metadata??=Symbol("metadata"),_.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(e,s,t);void 0!==i&&c(this.prototype,e,i)}}static getPropertyDescriptor(e,t,s){const{get:i,set:o}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:i,set(t){const n=i?.call(this);o?.call(this,t),this.requestUpdate(e,n,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=g(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...d(e),...u(e)];for(const s of t)this.createProperty(s,e[s])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,s]of t)this.elementProperties.set(e,s)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const s=this._$Eu(e,t);void 0!==s&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const s=new Set(e.flat(1/0).reverse());for(const e of s)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const s=t.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const s of t.keys())this.hasOwnProperty(s)&&(e.set(s,this[s]),delete this[s]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,i)=>{if(s)e.adoptedStyleSheets=i.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const s of i){const i=document.createElement("style"),o=t.litNonce;void 0!==o&&i.setAttribute("nonce",o),i.textContent=s.cssText,e.appendChild(i)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,s){this._$AK(e,s)}_$ET(e,t){const s=this.constructor.elementProperties.get(e),i=this.constructor._$Eu(e,s);if(void 0!==i&&!0===s.reflect){const o=(void 0!==s.converter?.toAttribute?s.converter:v).toAttribute(t,s.type);this._$Em=e,null==o?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(e,t){const s=this.constructor,i=s._$Eh.get(e);if(void 0!==i&&this._$Em!==i){const e=s.getPropertyOptions(i),o="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:v;this._$Em=i;const n=o.fromAttribute(t,e.type);this[i]=n??this._$Ej?.get(i)??n,this._$Em=null}}requestUpdate(e,t,s,i=!1,o){if(void 0!==e){const n=this.constructor;if(!1===i&&(o=this[e]),s??=n.getPropertyOptions(e),!((s.hasChanged??b)(o,t)||s.useDefault&&s.reflect&&o===this._$Ej?.get(e)&&!this.hasAttribute(n._$Eu(e,s))))return;this.C(e,t,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==o||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||s||(t=void 0),this._$AL.set(e,t)),!0===i&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,s]of e){const{wrapped:e}=s,i=this[t];!0!==e||this._$AL.has(t)||void 0===i||this.C(t,void 0,s,i)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[m("elementProperties")]=new Map,y[m("finalized")]=new Map,$?.({ReactiveElement:y}),(_.reactiveElementVersions??=[]).push("2.1.2");const w=globalThis,C=e=>e,A=w.trustedTypes,E=A?A.createPolicy("lit-html",{createHTML:e=>e}):void 0,S="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,T="?"+k,O=`<${T}>`,N=document,H=()=>N.createComment(""),z=e=>null===e||"object"!=typeof e&&"function"!=typeof e,P=Array.isArray,M="[ \t\n\f\r]",R=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,I=/-->/g,U=/>/g,D=RegExp(`>|${M}(?:([^\\s"'>=/]+)(${M}*=${M}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),j=/'/g,B=/"/g,L=/^(?:script|style|textarea|title)$/i,V=(e=>(t,...s)=>({_$litType$:e,strings:t,values:s}))(1),F=Symbol.for("lit-noChange"),W=Symbol.for("lit-nothing"),q=new WeakMap,G=N.createTreeWalker(N,129);function J(e,t){if(!P(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==E?E.createHTML(t):t}const K=(e,t)=>{const s=e.length-1,i=[];let o,n=2===t?"<svg>":3===t?"<math>":"",l=R;for(let t=0;t<s;t++){const s=e[t];let a,r,c=-1,h=0;for(;h<s.length&&(l.lastIndex=h,r=l.exec(s),null!==r);)h=l.lastIndex,l===R?"!--"===r[1]?l=I:void 0!==r[1]?l=U:void 0!==r[2]?(L.test(r[2])&&(o=RegExp("</"+r[2],"g")),l=D):void 0!==r[3]&&(l=D):l===D?">"===r[0]?(l=o??R,c=-1):void 0===r[1]?c=-2:(c=l.lastIndex-r[2].length,a=r[1],l=void 0===r[3]?D:'"'===r[3]?B:j):l===B||l===j?l=D:l===I||l===U?l=R:(l=D,o=void 0);const d=l===D&&e[t+1].startsWith("/>")?" ":"";n+=l===R?s+O:c>=0?(i.push(a),s.slice(0,c)+S+s.slice(c)+k+d):s+k+(-2===c?t:d)}return[J(e,n+(e[s]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),i]};class Z{constructor({strings:e,_$litType$:t},s){let i;this.parts=[];let o=0,n=0;const l=e.length-1,a=this.parts,[r,c]=K(e,t);if(this.el=Z.createElement(r,s),G.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(i=G.nextNode())&&a.length<l;){if(1===i.nodeType){if(i.hasAttributes())for(const e of i.getAttributeNames())if(e.endsWith(S)){const t=c[n++],s=i.getAttribute(e).split(k),l=/([.?@])?(.*)/.exec(t);a.push({type:1,index:o,name:l[2],strings:s,ctor:"."===l[1]?te:"?"===l[1]?se:"@"===l[1]?ie:ee}),i.removeAttribute(e)}else e.startsWith(k)&&(a.push({type:6,index:o}),i.removeAttribute(e));if(L.test(i.tagName)){const e=i.textContent.split(k),t=e.length-1;if(t>0){i.textContent=A?A.emptyScript:"";for(let s=0;s<t;s++)i.append(e[s],H()),G.nextNode(),a.push({type:2,index:++o});i.append(e[t],H())}}}else if(8===i.nodeType)if(i.data===T)a.push({type:2,index:o});else{let e=-1;for(;-1!==(e=i.data.indexOf(k,e+1));)a.push({type:7,index:o}),e+=k.length-1}o++}}static createElement(e,t){const s=N.createElement("template");return s.innerHTML=e,s}}function Q(e,t,s=e,i){if(t===F)return t;let o=void 0!==i?s._$Co?.[i]:s._$Cl;const n=z(t)?void 0:t._$litDirective$;return o?.constructor!==n&&(o?._$AO?.(!1),void 0===n?o=void 0:(o=new n(e),o._$AT(e,s,i)),void 0!==i?(s._$Co??=[])[i]=o:s._$Cl=o),void 0!==o&&(t=Q(e,o._$AS(e,t.values),o,i)),t}class X{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:s}=this._$AD,i=(e?.creationScope??N).importNode(t,!0);G.currentNode=i;let o=G.nextNode(),n=0,l=0,a=s[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new Y(o,o.nextSibling,this,e):1===a.type?t=new a.ctor(o,a.name,a.strings,this,e):6===a.type&&(t=new oe(o,this,e)),this._$AV.push(t),a=s[++l]}n!==a?.index&&(o=G.nextNode(),n++)}return G.currentNode=N,i}p(e){let t=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(e,s,t),t+=s.strings.length-2):s._$AI(e[t])),t++}}class Y{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,s,i){this.type=2,this._$AH=W,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Q(this,e,t),z(e)?e===W||null==e||""===e?(this._$AH!==W&&this._$AR(),this._$AH=W):e!==this._$AH&&e!==F&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>P(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==W&&z(this._$AH)?this._$AA.nextSibling.data=e:this.T(N.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:s}=e,i="number"==typeof s?this._$AC(e):(void 0===s.el&&(s.el=Z.createElement(J(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(t);else{const e=new X(i,this),s=e.u(this.options);e.p(t),this.T(s),this._$AH=e}}_$AC(e){let t=q.get(e.strings);return void 0===t&&q.set(e.strings,t=new Z(e)),t}k(e){P(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let s,i=0;for(const o of e)i===t.length?t.push(s=new Y(this.O(H()),this.O(H()),this,this.options)):s=t[i],s._$AI(o),i++;i<t.length&&(this._$AR(s&&s._$AB.nextSibling,i),t.length=i)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=C(e).nextSibling;C(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class ee{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,s,i,o){this.type=1,this._$AH=W,this._$AN=void 0,this.element=e,this.name=t,this._$AM=i,this.options=o,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=W}_$AI(e,t=this,s,i){const o=this.strings;let n=!1;if(void 0===o)e=Q(this,e,t,0),n=!z(e)||e!==this._$AH&&e!==F,n&&(this._$AH=e);else{const i=e;let l,a;for(e=o[0],l=0;l<o.length-1;l++)a=Q(this,i[s+l],t,l),a===F&&(a=this._$AH[l]),n||=!z(a)||a!==this._$AH[l],a===W?e=W:e!==W&&(e+=(a??"")+o[l+1]),this._$AH[l]=a}n&&!i&&this.j(e)}j(e){e===W?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class te extends ee{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===W?void 0:e}}class se extends ee{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==W)}}class ie extends ee{constructor(e,t,s,i,o){super(e,t,s,i,o),this.type=5}_$AI(e,t=this){if((e=Q(this,e,t,0)??W)===F)return;const s=this._$AH,i=e===W&&s!==W||e.capture!==s.capture||e.once!==s.once||e.passive!==s.passive,o=e!==W&&(s===W||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,s){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(e){Q(this,e)}}const ne=w.litHtmlPolyfillSupport;ne?.(Z,Y),(w.litHtmlVersions??=[]).push("3.3.2");const le=globalThis;class ae extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,s)=>{const i=s?.renderBefore??t;let o=i._$litPart$;if(void 0===o){const e=s?.renderBefore??null;i._$litPart$=o=new Y(t.insertBefore(H(),e),e,void 0,s??{})}return o._$AI(e),o})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return F}}ae._$litElement$=!0,ae.finalized=!0,le.litElementHydrateSupport?.({LitElement:ae});const re=le.litElementPolyfillSupport;re?.({LitElement:ae}),(le.litElementVersions??=[]).push("4.2.2");const ce=e=>(t,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},he={attribute:!0,type:String,converter:v,reflect:!1,hasChanged:b},de=(e=he,t,s)=>{const{kind:i,metadata:o}=s;let n=globalThis.litPropertyMetadata.get(o);if(void 0===n&&globalThis.litPropertyMetadata.set(o,n=new Map),"setter"===i&&((e=Object.create(e)).wrapped=!0),n.set(s.name,e),"accessor"===i){const{name:i}=s;return{set(s){const o=t.get.call(this);t.set.call(this,s),this.requestUpdate(i,o,e,!0,s)},init(t){return void 0!==t&&this.C(i,void 0,e,t),t}}}if("setter"===i){const{name:i}=s;return function(s){const o=this[i];t.call(this,s),this.requestUpdate(i,o,e,!0,s)}}throw Error("Unsupported decorator location: "+i)};function ue(e){return(t,s)=>"object"==typeof s?de(e,t,s):((e,t,s)=>{const i=t.hasOwnProperty(s);return t.constructor.createProperty(s,e),i?Object.getOwnPropertyDescriptor(t,s):void 0})(e,t,s)}function ge(e){return ue({...e,state:!0,attribute:!1})}var _e,pe;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(_e||(_e={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(pe||(pe={}));const fe=(e,t,s,i)=>{i=i||{},s=null==s?{}:s;const o=new Event(t,{bubbles:void 0===i.bubbles||i.bubbles,cancelable:Boolean(i.cancelable),composed:void 0===i.composed||i.composed});return o.detail=s,e.dispatchEvent(o),o};console.info("%c  INDICATOR-GRID-CARD  \n%c  Version 1.8.0  ","color: black; background: #F2720C; font-weight: 600;","color: black; background: #00a5c9; font-weight: 600;"),window.customCards=window.customCards||[],window.customCards.push({type:"indicator-grid-card",name:"Indicator Grid Card",description:"A card displaying a grid of indicator lights showing entity status",preview:!0,getEntitySuggestion:(e,t)=>{if(!e.states[t])return null;const s=t.split(".")[0];return["binary_sensor","switch","light","input_boolean"].includes(s)?{config:{type:"custom:indicator-grid-card",entities:[{entity:t}]}}:null}});let $e=class extends ae{_normalizeSize(e,t){if(void 0===e)return t;const s=String(e);return/^\d+(\.\d+)?$/.test(s)?`${s}px`:s}static async getConfigElement(){return await Promise.resolve().then(function(){return ve}),document.createElement("indicator-grid-card-editor")}static getStubConfig(e){const t=["binary_sensor","switch","light","input_boolean"];return{columns:3,rows:2,cell_width:"",cell_height:100,cell_gap:5,font_size:16,font_weight:"bold",show_icons:!1,icon_placement:"above",icon_size:24,entities:e?Object.keys(e.states).filter(e=>t.includes(e.split(".")[0])).slice(0,6).map(e=>({entity:e})):[],unavailable_text:"INOP",global_colors:{on:"green",off:"gray",text:"white",unavailable:"orange",blank:"#333333"}}}setConfig(e){if(!e)throw new Error("Invalid configuration");const t=(e,t)=>{if(void 0===e)return t;const s=String(e);return/^\d+(\.\d+)?$/.test(s)?`${s}px`:s};let s=e.cell_width,i=e.cell_height;void 0!==e.cell_size&&(s=s??`${e.cell_size}px`,i=i??`${e.cell_size}px`),this.config={...e,columns:e.columns??3,rows:e.rows??2,cell_width:t(s,""),cell_height:t(i,"100px"),cell_gap:t(e.cell_gap,"5px"),font_size:t(e.font_size,"16px"),font_weight:e.font_weight??"bold",show_icons:e.show_icons??!1,icon_placement:e.icon_placement??"above",icon_size:t(e.icon_size,"24px"),unavailable_text:e.unavailable_text??"INOP",global_colors:{on:"green",off:"gray",text:"white",unavailable:"orange",blank:"#333333",...e.global_colors}}}getCardSize(){if(!this.config)return 2;const e=this._normalizeSize(this.config.cell_height,"100px"),t=parseFloat(e),s=this._normalizeSize(this.config.cell_gap,"5px"),i=parseFloat(s),o=this.config.rows||2,n=o*t+(o-1)*i;return Math.ceil(n/50)}getGridOptions(){return{rows:3,columns:12,min_rows:1,min_columns:3}}shouldUpdate(e){if(!this.config)return!1;if(e.has("config"))return!0;if(e.has("hass")){const t=e.get("hass");if(!t)return!0;const s=this.config.entities.filter(e=>e&&!!e.entity).map(e=>e.entity),i=this.config.entities.filter(e=>e&&!!e.text_template).flatMap(e=>this._extractTemplateEntityIds(e.text_template)),o=(this.config.header_rows||[]).flatMap(e=>e.cells).flatMap(e=>this._extractTemplateEntityIds(e.text));return[...new Set([...s,...i,...o])].some(e=>t.states[e]!==this.hass.states[e])}return!0}_getCells(){const e=this.config.columns*this.config.rows,t=[];for(let s=0;s<e;s++){const e=this.config.entities[s];if(!e||!e.entity){t.push({displayText:e?.text||"",backgroundColor:this._getColor("blank",e?.colors),textColor:this._getColor("text",e?.colors),textOpacity:1,textAlign:e?.text_align,clickable:!1,clickAction:"none",colspan:e?.colspan||1});continue}const i=this.hass.states[e.entity],o=this._computeCell(e,i);t.push(o)}return t}_computeCell(e,t){if(!t||"unavailable"===t.state||"unknown"===t.state){const s=`${e.text||t?.attributes?.friendly_name||e.entity||"Unknown"}\n${this.config.unavailable_text||"INOP"}`;return{entity:e.entity,displayText:s,backgroundColor:this._getColor("unavailable",e.colors),textColor:this._getColor("text",e.colors),textOpacity:1,textAlign:e.text_align,state:t?.state,clickable:!1,clickAction:"none",colspan:e.colspan||1}}const s=t.state,i=this._getDisplayText(e,t),o=this._getBackgroundColor(s,e);let n,l=this._getColor("text",e.colors);const a=parseFloat(s);if(!isNaN(a)){const t=this._getThresholdStyles(a,e.colors)||this._getThresholdStyles(a,this.config.global_colors);t&&(t.textColor&&(l=t.textColor),t.fontWeight&&(n=t.fontWeight))}const r=this._getTextOpacity(s,e),c=this._getIcon(s,e,t),h=e.click_action||this._getDefaultClickAction(t);return{entity:e.entity,displayText:i,backgroundColor:o,textColor:l,textOpacity:r,textAlign:e.text_align,fontWeight:n,icon:c,state:s,clickable:"none"!==h,clickAction:h,colspan:e.colspan||1}}_getDisplayText(e,t){if(e.text)return e.text;if(e.text_template)return this._renderTemplate(e.text_template,t,e);const s=this._formatNumericState(t.state,e),i=parseFloat(t.state),o=void 0!==e.decimals||void 0!==this.config.decimals;return!isNaN(i)&&o?s:t.attributes.friendly_name||e.entity||""}_renderTemplate(e,t,s){return e.replace(/\{\{\s*(.+?)\s*\}\}/g,(e,i)=>{const o=i.split("|").map(e=>e.trim());let n=this._resolveTemplateVariable(o[0],t,s);for(let e=1;e<o.length;e++)n=this._applyTemplateFilter(n,o[e]);return n})}_resolveTemplateVariable(e,t,s){const i=this._formatNumericState(t.state,s);if("state"===e)return i;if("name"===e)return t.attributes.friendly_name||s.entity||"";if("entity_id"===e)return t.entity_id||s.entity||"";if("unit"===e)return t.attributes.unit_of_measurement||"";if("state_with_unit"===e){const e=t.attributes.unit_of_measurement;return e?`${i} ${e}`:i}if("last_changed"===e)return this._relativeTime(t.last_changed);if("last_updated"===e)return this._relativeTime(t.last_updated);if(e.startsWith("attributes.")){const s=e.slice(11),i=t.attributes[s];return null!=i?String(i):""}const o=e.match(/^states\(['"]([^'"]+)['"]\)$/);if(o){const e=this.hass.states[o[1]];return e?e.state:""}return e}_relativeTime(e){if(!e)return"";const t=Math.floor((Date.now()-new Date(e).getTime())/1e3);if(t<60)return"just now";const s=Math.floor(t/60);if(s<60)return`${s} minute${1===s?"":"s"} ago`;const i=Math.floor(s/60);if(i<24)return`${i} hour${1===i?"":"s"} ago`;const o=Math.floor(i/24);return`${o} day${1===o?"":"s"} ago`}_extractTemplateEntityIds(e){const t=[],s=/\{\{\s*states\(['"]([^'"]+)['"]\)/g;let i;for(;null!==(i=s.exec(e));)t.push(i[1]);return t}_applyTemplateFilter(e,t){const s=t.indexOf("("),i=s>=0?t.slice(0,s).trim():t.trim();let o=[];if(s>=0){o=t.slice(s+1,t.lastIndexOf(")")).split(",").map(e=>e.trim().replace(/^['"]|['"]$/g,""))}switch(i){case"upper":return e.toUpperCase();case"lower":return e.toLowerCase();case"title":return e.replace(/\b\w/g,e=>e.toUpperCase());case"round":{const t=o.length>0?parseInt(o[0],10):0,s=parseFloat(e);return isNaN(s)?e:s.toFixed(isNaN(t)?0:t)}case"int":{const t=parseInt(e,10);return isNaN(t)?o.length>0?o[0]:"0":String(t)}case"float":{const t=parseFloat(e);return isNaN(t)?o.length>0?o[0]:"0":String(t)}case"replace":return o.length>=2?e.split(o[0]).join(o[1]):e;case"truncate":{const t=o.length>0?parseInt(o[0],10):255,s=isNaN(t)?255:t;return e.length>s?e.slice(0,s)+"...":e}case"default":return""!==e?e:o.length>0?o[0]:"";default:return e}}_getBackgroundColor(e,t){const s=t.colors;if(s?.states&&s.states[e])return s.states[e];if(this.config.global_colors?.states&&this.config.global_colors.states[e])return this.config.global_colors.states[e];const i=parseFloat(e);if(!isNaN(i)){const e=this._getThresholdStyles(i,s)||this._getThresholdStyles(i,this.config.global_colors);if(e?.backgroundColor)return e.backgroundColor}return"on"===e?this._getColor("on",s):this._getColor("off",s)}_getThresholdStyles(e,t){if(!t?.thresholds||0===t.thresholds.length)return null;const s=[...t.thresholds].sort((e,t)=>e.value-t.value);for(const t of s){let s=!1;switch(t.operator||"<="){case"<":s=e<t.value;break;case"<=":s=e<=t.value;break;case">":s=e>t.value;break;case">=":s=e>=t.value;break;case"==":s=e===t.value}if(s)return{backgroundColor:t.color,textColor:t.text_color,fontWeight:t.font_weight}}return null}_getColor(e,t){if(t&&t[e])return t[e];if(this.config.global_colors&&this.config.global_colors[e])return this.config.global_colors[e];return{on:"green",off:"gray",unavailable:"orange",text:"white",blank:"#333333"}[e]}_getIcon(e,t,s){if(t&&void 0!==t.show_icon){if(!t.show_icon)return}else if(!this.config.show_icons)return;const i="on"===e?"on":"off";if(t&&t.icon&&t.icon[i])return t.icon[i];if(s&&s.attributes){if(s.attributes.icon)return s.attributes.icon;const t=s.entity_id.split(".")[0],i={light:"on"===e?"mdi:lightbulb-on":"mdi:lightbulb",switch:"on"===e?"mdi:toggle-switch":"mdi:toggle-switch-off",binary_sensor:"on"===e?"mdi:checkbox-marked-circle":"mdi:checkbox-blank-circle-outline",sensor:"mdi:eye"};if(i[t])return i[t]}}_getTextOpacity(e,t){return"off"!==e?1:void 0!==t.dim_off_text?t.dim_off_text/100:void 0!==this.config.dim_off_text?this.config.dim_off_text/100:1}_formatNumericState(e,t){const s=parseFloat(e);if(isNaN(s))return e;let i;if(void 0!==t.decimals?i=t.decimals:void 0!==this.config.decimals&&(i=this.config.decimals),void 0===i)return e;const o=Math.max(0,Math.min(10,Math.floor(i)));return isFinite(s)?s.toFixed(o):e}_getDefaultClickAction(e){const t=e.entity_id.split(".")[0];return["light","switch","input_boolean","automation","fan"].includes(t)?"toggle":"more-info"}_handleClick(e){e.clickable&&e.entity&&("toggle"===e.clickAction?this._toggleEntity(e.entity):"more-info"===e.clickAction&&this._showMoreInfo(e.entity))}_toggleEntity(e){const t=e.split(".")[0];this.hass.callService(t,"toggle",{entity_id:e})}_showMoreInfo(e){fe(this,"hass-more-info",{entityId:e})}_isHeaderRow(e){return!!this.config.header_rows&&this.config.header_rows.some(t=>t.row_index===e)}_getHeaderRow(e){if(this.config.header_rows)return this.config.header_rows.find(t=>t.row_index===e)}_processHeaderText(e){return e.replace(/\{\{\s*(.+?)\s*\}\}/g,(e,t)=>{const s=t.split("|").map(e=>e.trim()),i=s[0].match(/^states\(['"]([^'"]+)['"]\)$/);let o="";if(i){const e=this.hass.states[i[1]];o=e?e.state:""}else o=s[0];for(let e=1;e<s.length;e++)o=this._applyTemplateFilter(o,s[e]);return o})}_renderHeaderCell(e){const t=e.colspan||1,s=e.text_align||"center",i=this._normalizeSize(this.config.font_size,"16px"),o=this._normalizeSize(e.font_size,i),n=e.font_weight||this.config.font_weight||"bold",l=e.text_color||this._getColor("text",void 0),a=e.background_color||this._getColor("blank",void 0),r=this._processHeaderText(e.text),c={"background-color":a,color:l,"font-size":o,"font-weight":String(n),"text-align":s,"grid-column":`span ${t}`};return V`
      <div class="cell header-cell" style=${this._styleMap(c)}>
        <div class="cell-text">
          <div class="text-line">${r}</div>
        </div>
      </div>
    `}_renderAllCells(){const e=[];let t=0;for(let s=0;s<this.config.rows;s++)if(this._isHeaderRow(s)){const t=this._getHeaderRow(s);t&&t.cells&&t.cells.forEach(t=>{e.push(this._renderHeaderCell(t))})}else{let s=0;for(;s<this.config.columns&&t<this.config.entities.length;){const i=this.config.entities[t],o=i?.colspan||1;let n;if(i&&i.entity){const e=this.hass.states[i.entity];n=this._computeCell(i,e)}else n={displayText:i?.text||"",backgroundColor:this._getColor("blank",i?.colors),textColor:this._getColor("text",i?.colors),textOpacity:1,textAlign:i?.text_align,clickable:!1,clickAction:"none",colspan:o};e.push(this._renderCell(n)),s+=o,t++}}return e}static get styles(){return l`
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
    `}render(){if(!this.config||!this.hass)return V``;const e=this._normalizeSize(this.config.cell_width,""),t=e&&""!==e.trim()?e:"1fr",s=this._normalizeSize(this.config.cell_height,"100px"),i=this._normalizeSize(this.config.cell_gap,"5px"),o={"grid-template-columns":`repeat(${this.config.columns}, ${t})`,"grid-template-rows":`repeat(${this.config.rows}, ${s})`,gap:i};return V`
      <ha-card>
        <div class="grid-container" style=${this._styleMap(o)}>
          ${this._renderAllCells()}
        </div>
      </ha-card>
    `}_colorWithOpacity(e,t){const s=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);if(s)return`rgba(${s[1]}, ${s[2]}, ${s[3]}, ${t})`;const i=e.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(i){return`rgba(${parseInt(i[1],16)}, ${parseInt(i[2],16)}, ${parseInt(i[3],16)}, ${t})`}const o=document.createElement("div");o.style.color=e,document.body.appendChild(o);const n=getComputedStyle(o).color;document.body.removeChild(o);const l=n.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);return l?`rgba(${l[1]}, ${l[2]}, ${l[3]}, ${t})`:e}_renderCell(e){const t=e.textOpacity<1?this._colorWithOpacity(e.textColor,e.textOpacity):e.textColor,s={"background-color":e.backgroundColor,color:t,"font-size":this._normalizeSize(this.config.font_size,"16px"),"font-weight":String(e.fontWeight??this.config.font_weight??"bold")};e.colspan&&e.colspan>1&&(s["grid-column"]=`span ${e.colspan}`);const i={left:"flex-start",center:"center",right:"flex-end"};e.textAlign&&(s["justify-content"]=i[e.textAlign]||"center",s["text-align"]=e.textAlign);const o=e.icon?`icon-${this.config.icon_placement}`:"",n={"--mdc-icon-size":this._normalizeSize(this.config.icon_size,"24px")},l={};e.textAlign&&(l["align-items"]=i[e.textAlign]||"center");const a=e.displayText.split("\n");return V`
      <div
        class="cell ${e.clickable?"clickable":""} ${o}"
        style=${this._styleMap(s)}
        @click=${()=>this._handleClick(e)}
      >
        ${e.icon?V`<ha-icon class="cell-icon" .icon=${e.icon} style=${this._styleMap(n)}></ha-icon>`:""}
        <div class="cell-text" style=${this._styleMap(l)}>
          ${a.map(e=>V`<div class="text-line">${e}</div>`)}
        </div>
      </div>
    `}_styleMap(e){return Object.entries(e).map(([e,t])=>`${e}: ${t}`).join("; ")}};e([ue({attribute:!1})],$e.prototype,"hass",void 0),e([ge()],$e.prototype,"config",void 0),$e=e([ce("indicator-grid-card")],$e);let me=class extends ae{constructor(){super(...arguments),this._selectedEntityIndex=-1}setConfig(e){this._config=e}_valueChanged(e){if(!this._config||!this.hass)return;const t={...this._config,...e.detail.value};fe(this,"config-changed",{config:t})}_configValueChanged(e,t){if(!this._config||!this.hass)return;const s={...this._config,[e]:t};fe(this,"config-changed",{config:s})}_globalColorChanged(e,t){const s=e.detail.value,i={...this._config};i.global_colors||(i.global_colors={}),i.global_colors={...i.global_colors,[t]:s},fe(this,"config-changed",{config:i})}_addEntity(){const e={...this._config};e.entities||(e.entities=[]),e.entities=[...e.entities,{entity:""}],fe(this,"config-changed",{config:e})}_removeEntity(e){const t={...this._config};t.entities=[...t.entities],t.entities.splice(e,1),this._selectedEntityIndex===e&&(this._selectedEntityIndex=-1),fe(this,"config-changed",{config:t})}_entityChanged(e,t,s){const i={...this._config};i.entities=[...i.entities],i.entities[e]={...i.entities[e],[t]:s},fe(this,"config-changed",{config:i})}_entityColorChanged(e,t,s){const i={...this._config};i.entities=[...i.entities];const o={...i.entities[e]};o.colors||(o.colors={}),o.colors={...o.colors,[t]:s},i.entities[e]=o,fe(this,"config-changed",{config:i})}_entityIconChanged(e,t,s){const i={...this._config};i.entities=[...i.entities];const o={...i.entities[e]};o.icon||(o.icon={}),o.icon={...o.icon,[t]:s},i.entities[e]=o,fe(this,"config-changed",{config:i})}_addHeaderRow(){const e={...this._config};e.header_rows||(e.header_rows=[]),e.header_rows=[...e.header_rows,{row_index:0,cells:[{text:"Header",colspan:1}]}],fe(this,"config-changed",{config:e})}_removeHeaderRow(e){const t={...this._config};t.header_rows&&(t.header_rows=[...t.header_rows],t.header_rows.splice(e,1),fe(this,"config-changed",{config:t}))}_headerRowChanged(e,t,s){const i={...this._config};i.header_rows&&(i.header_rows=[...i.header_rows],i.header_rows[e]={...i.header_rows[e],[t]:s},fe(this,"config-changed",{config:i}))}_addHeaderCell(e){const t={...this._config};if(!t.header_rows)return;t.header_rows=[...t.header_rows];const s={...t.header_rows[e]};s.cells=[...s.cells,{text:"Header",colspan:1}],t.header_rows[e]=s,fe(this,"config-changed",{config:t})}_removeHeaderCell(e,t){const s={...this._config};if(!s.header_rows)return;s.header_rows=[...s.header_rows];const i={...s.header_rows[e]};i.cells=[...i.cells],i.cells.splice(t,1),s.header_rows[e]=i,fe(this,"config-changed",{config:s})}_headerCellChanged(e,t,s,i){const o={...this._config};if(!o.header_rows)return;o.header_rows=[...o.header_rows];const n={...o.header_rows[e]};n.cells=[...n.cells],n.cells[t]={...n.cells[t],[s]:i},o.header_rows[e]=n,fe(this,"config-changed",{config:o})}static get styles(){return l`
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
    `}render(){return this.hass&&this._config?V`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"columns",selector:{number:{min:1,max:20,mode:"box"}}},{name:"rows",selector:{number:{min:1,max:20,mode:"box"}}}]}
        .computeLabel=${e=>e.label||e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-selector
        .hass=${this.hass}
        .label=${"Cell Width"}
        .value=${this._config.cell_width||""}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("cell_width",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .label=${"Cell Height"}
        .value=${this._config.cell_height||"100px"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("cell_height",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .label=${"Cell Gap"}
        .value=${this._config.cell_gap||"5px"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("cell_gap",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .label=${"Font Size"}
        .value=${this._config.font_size||"16px"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("font_size",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .selector=${{select:{options:[{value:"300",label:"Light (300)"},{value:"normal",label:"Normal (400)"},{value:"500",label:"Medium (500)"},{value:"600",label:"Semi-Bold (600)"},{value:"bold",label:"Bold (700)"},{value:"800",label:"Extra Bold (800)"},{value:"900",label:"Black (900)"}]}}}
        .value=${this._config.font_weight||"bold"}
        @value-changed=${e=>this._configValueChanged("font_weight",e.detail.value)}
        .label=${"Font Weight"}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .label=${"Unavailable Text"}
        .value=${this._config.unavailable_text||"INOP"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("unavailable_text",e.detail.value)}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .label=${"Dim Off Text (%)"}
        .value=${this._config.dim_off_text??""}
        .selector=${{number:{min:0,max:100,mode:"box",step:1}}}
        @value-changed=${e=>this._configValueChanged("dim_off_text",""!==e.detail.value&&void 0!==e.detail.value?Number(e.detail.value):void 0)}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .label=${"Decimals"}
        .value=${this._config.decimals??""}
        .selector=${{number:{min:0,max:10,mode:"box",step:1}}}
        @value-changed=${e=>this._configValueChanged("decimals",""!==e.detail.value&&void 0!==e.detail.value?Number(e.detail.value):void 0)}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .selector=${{boolean:{}}}
        .value=${this._config.show_icons??!1}
        @value-changed=${e=>this._configValueChanged("show_icons",e.detail.value)}
        .label=${"Show Icons"}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .selector=${{select:{options:[{value:"above",label:"Above text"},{value:"below",label:"Below text"},{value:"left",label:"Left of text"},{value:"right",label:"Right of text"}]}}}
        .value=${this._config.icon_placement||"above"}
        @value-changed=${e=>this._configValueChanged("icon_placement",e.detail.value)}
        .label=${"Icon Placement"}
      ></ha-selector>

      <ha-selector
        .hass=${this.hass}
        .label=${"Icon Size"}
        .value=${this._config.icon_size||"24px"}
        .selector=${{text:{}}}
        @value-changed=${e=>this._configValueChanged("icon_size",e.detail.value)}
      ></ha-selector>

      <ha-expansion-panel header="Global Colors" .expanded=${!1}>
        <ha-selector
          .hass=${this.hass}
          .label=${"On Color"}
          .value=${this._config.global_colors?.on||"green"}
          .selector=${{text:{}}}
          @value-changed=${e=>this._globalColorChanged(e,"on")}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .label=${"Off Color"}
          .value=${this._config.global_colors?.off||"gray"}
          .selector=${{text:{}}}
          @value-changed=${e=>this._globalColorChanged(e,"off")}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .label=${"Unavailable Color"}
          .value=${this._config.global_colors?.unavailable||"orange"}
          .selector=${{text:{}}}
          @value-changed=${e=>this._globalColorChanged(e,"unavailable")}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .label=${"Text Color"}
          .value=${this._config.global_colors?.text||"white"}
          .selector=${{text:{}}}
          @value-changed=${e=>this._globalColorChanged(e,"text")}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .label=${"Blank Cell Color"}
          .value=${this._config.global_colors?.blank||"#333333"}
          .selector=${{text:{}}}
          @value-changed=${e=>this._globalColorChanged(e,"blank")}
        ></ha-selector>
      </ha-expansion-panel>

      <div style="margin-top: 16px;">
        <h3>Header Rows</h3>
        ${(this._config.header_rows||[]).map((e,t)=>this._renderHeaderRowConfig(e,t))}

        <mwc-button @click=${this._addHeaderRow}>
          Add Header Row
        </mwc-button>
      </div>

      <div style="margin-top: 16px;">
        <h3>Entities</h3>
        ${(this._config.entities||[]).map((e,t)=>this._renderEntityConfig(e,t))}

        <mwc-button @click=${this._addEntity}>
          Add Entity
        </mwc-button>
      </div>
    `:V``}_renderHeaderRowConfig(e,t){return V`
      <div class="entity-item">
        <div class="entity-header">
          <strong>Header Row ${t+1}</strong>
          <mwc-button @click=${()=>this._removeHeaderRow(t)}>Remove</mwc-button>
        </div>

        <div class="entity-details">
          <ha-selector
            .hass=${this.hass}
            .label=${"Row Index (0-based)"}
            .value=${e.row_index}
            .selector=${{number:{min:0,max:this._config.rows-1,mode:"box",step:1}}}
            @value-changed=${e=>this._headerRowChanged(t,"row_index",Number(e.detail.value))}
          ></ha-selector>

          <h4>Header Cells</h4>
          ${e.cells.map((e,s)=>this._renderHeaderCellConfig(t,e,s))}

          <mwc-button @click=${()=>this._addHeaderCell(t)}>
            Add Header Cell
          </mwc-button>
        </div>
      </div>
    `}_renderHeaderCellConfig(e,t,s){return V`
      <div style="border: 1px dashed var(--divider-color); padding: 8px; margin: 8px 0; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong>Cell ${s+1}</strong>
          <mwc-button @click=${()=>this._removeHeaderCell(e,s)}>Remove</mwc-button>
        </div>

        <ha-selector
          .hass=${this.hass}
          .label=${"Text"}
          .value=${t.text||""}
          .selector=${{text:{}}}
          @value-changed=${t=>this._headerCellChanged(e,s,"text",t.detail.value)}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .label=${"Column Span"}
          .value=${t.colspan||1}
          .selector=${{number:{min:1,max:this._config.columns,mode:"box",step:1}}}
          @value-changed=${t=>this._headerCellChanged(e,s,"colspan",Number(t.detail.value))}
        ></ha-selector>

        <ha-selector
          .hass=${this.hass}
          .selector=${{select:{options:[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}]}}}
          .value=${t.text_align||"center"}
          @value-changed=${t=>this._headerCellChanged(e,s,"text_align",t.detail.value)}
          .label=${"Text Alignment"}
        ></ha-selector>

        <ha-expansion-panel header="Advanced Styling (optional)" .expanded=${!1}>
          <ha-selector
            .hass=${this.hass}
            .label=${"Font Size"}
            .value=${t.font_size||""}
            .selector=${{text:{}}}
            @value-changed=${t=>this._headerCellChanged(e,s,"font_size",t.detail.value)}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"",label:"Default (from card)"},{value:"300",label:"Light (300)"},{value:"normal",label:"Normal (400)"},{value:"500",label:"Medium (500)"},{value:"600",label:"Semi-Bold (600)"},{value:"bold",label:"Bold (700)"},{value:"800",label:"Extra Bold (800)"},{value:"900",label:"Black (900)"}]}}}
            .value=${t.font_weight||""}
            @value-changed=${t=>this._headerCellChanged(e,s,"font_weight",t.detail.value)}
            .label=${"Font Weight"}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .label=${"Text Color"}
            .value=${t.text_color||""}
            .selector=${{text:{}}}
            @value-changed=${t=>this._headerCellChanged(e,s,"text_color",t.detail.value)}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .label=${"Background Color"}
            .value=${t.background_color||""}
            .selector=${{text:{}}}
            @value-changed=${t=>this._headerCellChanged(e,s,"background_color",t.detail.value)}
          ></ha-selector>
        </ha-expansion-panel>
      </div>
    `}_renderEntityConfig(e,t){const s=this._config.columns*this._config.rows,i=Math.floor(t/this._config.columns)+1,o=t%this._config.columns+1;return t>=s?V``:V`
      <div class="entity-item">
        <div class="entity-header">
          <strong>Cell ${t+1} (Row ${i}, Col ${o})</strong>
          <mwc-button @click=${()=>this._removeEntity(t)}>Remove</mwc-button>
        </div>

        <div class="entity-details">
          <ha-selector
            .hass=${this.hass}
            .selector=${{entity:{}}}
            .value=${e.entity||""}
            @value-changed=${e=>this._entityChanged(t,"entity",e.detail.value)}
            .label=${"Entity (leave empty for blank cell)"}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .label=${"Custom text (optional)"}
            .value=${e.text||""}
            .selector=${{text:{}}}
            @value-changed=${e=>this._entityChanged(t,"text",e.detail.value)}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .label=${"Text template"}
            .value=${e.text_template||""}
            .selector=${{text:{}}}
            @value-changed=${e=>this._entityChanged(t,"text_template",e.detail.value)}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .label=${"Column Span"}
            .value=${e.colspan||1}
            .selector=${{number:{min:1,max:this._config.columns,mode:"box",step:1}}}
            @value-changed=${e=>this._entityChanged(t,"colspan",Number(e.detail.value))}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"",label:"Center (default)"},{value:"left",label:"Left"},{value:"right",label:"Right"}]}}}
            .value=${e.text_align||""}
            @value-changed=${e=>this._entityChanged(t,"text_align",e.detail.value||void 0)}
            .label=${"Text Alignment"}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"",label:"Auto (toggle or more-info)"},{value:"toggle",label:"Toggle"},{value:"more-info",label:"More Info"},{value:"none",label:"None"}]}}}
            .value=${e.click_action||""}
            @value-changed=${e=>this._entityChanged(t,"click_action",e.detail.value)}
            .label=${"Click Action"}
          ></ha-selector>

          <ha-selector
            .hass=${this.hass}
            .selector=${{boolean:{}}}
            .value=${e.show_icon??!1}
            @value-changed=${e=>this._entityChanged(t,"show_icon",e.detail.value)}
            .label=${"Show Icon (override global setting)"}
          ></ha-selector>

          <ha-expansion-panel header="Per-Entity Colors (optional)" .expanded=${!1}>
            <div class="color-grid">
              <ha-selector
                .hass=${this.hass}
                .label=${"On Color"}
                .value=${e.colors?.on||""}
                .selector=${{text:{}}}
                @value-changed=${e=>this._entityColorChanged(t,"on",e.detail.value)}
              ></ha-selector>

              <ha-selector
                .hass=${this.hass}
                .label=${"Off Color"}
                .value=${e.colors?.off||""}
                .selector=${{text:{}}}
                @value-changed=${e=>this._entityColorChanged(t,"off",e.detail.value)}
              ></ha-selector>

              <ha-selector
                .hass=${this.hass}
                .label=${"Text Color"}
                .value=${e.colors?.text||""}
                .selector=${{text:{}}}
                @value-changed=${e=>this._entityColorChanged(t,"text",e.detail.value)}
              ></ha-selector>

              <ha-selector
                .hass=${this.hass}
                .label=${"Blank Cell Color"}
                .value=${e.colors?.blank||""}
                .selector=${{text:{}}}
                @value-changed=${e=>this._entityColorChanged(t,"blank",e.detail.value)}
              ></ha-selector>

              <ha-selector
                .hass=${this.hass}
                .label=${"Dim Off Text (%)"}
                .value=${e.dim_off_text??""}
                .selector=${{number:{min:0,max:100,mode:"box",step:1}}}
                @value-changed=${e=>this._entityChanged(t,"dim_off_text",""!==e.detail.value&&void 0!==e.detail.value?Number(e.detail.value):void 0)}
              ></ha-selector>

              <ha-selector
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
              .hass=${this.hass}
              .selector=${{icon:{}}}
              .value=${e.icon?.on||""}
              @value-changed=${e=>this._entityIconChanged(t,"on",e.detail.value)}
              .label=${"On Icon"}
            ></ha-selector>

            <ha-selector
              .hass=${this.hass}
              .selector=${{icon:{}}}
              .value=${e.icon?.off||""}
              @value-changed=${e=>this._entityIconChanged(t,"off",e.detail.value)}
              .label=${"Off Icon"}
            ></ha-selector>
          </ha-expansion-panel>
        </div>
      </div>
    `}};e([ue({attribute:!1})],me.prototype,"hass",void 0),e([ge()],me.prototype,"_config",void 0),e([ge()],me.prototype,"_selectedEntityIndex",void 0),me=e([ce("indicator-grid-card-editor")],me);var ve=Object.freeze({__proto__:null,get IndicatorGridCardEditor(){return me}});export{$e as IndicatorGridCard};
//# sourceMappingURL=indicator-grid-card.js.map
