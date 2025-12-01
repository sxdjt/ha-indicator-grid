/* Last changed: 11/30/2025, 17:54:00 */
function e(e,t,i,o){var s,n=arguments.length,l=n<3?t:null===o?o=Object.getOwnPropertyDescriptor(t,i):o;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,i,o);else for(var a=e.length-1;a>=0;a--)(s=e[a])&&(l=(n<3?s(l):n>3?s(t,i,l):s(t,i))||l);return n>3&&l&&Object.defineProperty(t,i,l),l}"function"==typeof SuppressedError&&SuppressedError;const t=globalThis,i=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),s=new WeakMap;let n=class{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(i&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=s.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&s.set(t,e))}return e}toString(){return this.cssText}};const l=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,o)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[o+1],e[0]);return new n(i,e,o)},a=i?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new n("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:r,defineProperty:c,getOwnPropertyDescriptor:h,getOwnPropertyNames:d,getOwnPropertySymbols:g,getPrototypeOf:u}=Object,p=globalThis,f=p.trustedTypes,_=f?f.emptyScript:"",$=p.reactiveElementPolyfillSupport,m=(e,t)=>e,b={toAttribute(e,t){switch(t){case Boolean:e=e?_:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},v=(e,t)=>!r(e,t),x={attribute:!0,type:String,converter:b,reflect:!1,useDefault:!1,hasChanged:v};Symbol.metadata??=Symbol("metadata"),p.litPropertyMetadata??=new WeakMap;let y=class extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=x){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),o=this.getPropertyDescriptor(e,i,t);void 0!==o&&c(this.prototype,e,o)}}static getPropertyDescriptor(e,t,i){const{get:o,set:s}=h(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:o,set(t){const n=o?.call(this);s?.call(this,t),this.requestUpdate(e,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??x}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const e=u(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const e=this.properties,t=[...d(e),...g(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(a(e))}else void 0!==e&&t.push(a(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((e,o)=>{if(i)e.adoptedStyleSheets=o.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of o){const o=document.createElement("style"),s=t.litNonce;void 0!==s&&o.setAttribute("nonce",s),o.textContent=i.cssText,e.appendChild(o)}})(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),o=this.constructor._$Eu(e,i);if(void 0!==o&&!0===i.reflect){const s=(void 0!==i.converter?.toAttribute?i.converter:b).toAttribute(t,i.type);this._$Em=e,null==s?this.removeAttribute(o):this.setAttribute(o,s),this._$Em=null}}_$AK(e,t){const i=this.constructor,o=i._$Eh.get(e);if(void 0!==o&&this._$Em!==o){const e=i.getPropertyOptions(o),s="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:b;this._$Em=o;const n=s.fromAttribute(t,e.type);this[o]=n??this._$Ej?.get(o)??n,this._$Em=null}}requestUpdate(e,t,i){if(void 0!==e){const o=this.constructor,s=this[e];if(i??=o.getPropertyOptions(e),!((i.hasChanged??v)(s,t)||i.useDefault&&i.reflect&&s===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:o,wrapped:s},n){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,n??t??this[e]),!0!==s||void 0!==n)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===o&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,o=this[t];!0!==e||this._$AL.has(t)||void 0===o||this.C(t,void 0,i,o)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}};y.elementStyles=[],y.shadowRootOptions={mode:"open"},y[m("elementProperties")]=new Map,y[m("finalized")]=new Map,$?.({ReactiveElement:y}),(p.reactiveElementVersions??=[]).push("2.1.1");const w=globalThis,C=w.trustedTypes,A=C?C.createPolicy("lit-html",{createHTML:e=>e}):void 0,E="$lit$",k=`lit$${Math.random().toFixed(9).slice(2)}$`,S="?"+k,O=`<${S}>`,z=document,P=()=>z.createComment(""),H=e=>null===e||"object"!=typeof e&&"function"!=typeof e,T=Array.isArray,R="[ \t\n\f\r]",N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,U=/-->/g,M=/>/g,I=RegExp(`>|${R}(?:([^\\s"'>=/]+)(${R}*=${R}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),B=/'/g,D=/"/g,j=/^(?:script|style|textarea|title)$/i,L=(e=>(t,...i)=>({_$litType$:e,strings:t,values:i}))(1),V=Symbol.for("lit-noChange"),F=Symbol.for("lit-nothing"),W=new WeakMap,q=z.createTreeWalker(z,129);function G(e,t){if(!T(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(t):t}const J=(e,t)=>{const i=e.length-1,o=[];let s,n=2===t?"<svg>":3===t?"<math>":"",l=N;for(let t=0;t<i;t++){const i=e[t];let a,r,c=-1,h=0;for(;h<i.length&&(l.lastIndex=h,r=l.exec(i),null!==r);)h=l.lastIndex,l===N?"!--"===r[1]?l=U:void 0!==r[1]?l=M:void 0!==r[2]?(j.test(r[2])&&(s=RegExp("</"+r[2],"g")),l=I):void 0!==r[3]&&(l=I):l===I?">"===r[0]?(l=s??N,c=-1):void 0===r[1]?c=-2:(c=l.lastIndex-r[2].length,a=r[1],l=void 0===r[3]?I:'"'===r[3]?D:B):l===D||l===B?l=I:l===U||l===M?l=N:(l=I,s=void 0);const d=l===I&&e[t+1].startsWith("/>")?" ":"";n+=l===N?i+O:c>=0?(o.push(a),i.slice(0,c)+E+i.slice(c)+k+d):i+k+(-2===c?t:d)}return[G(e,n+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),o]};class K{constructor({strings:e,_$litType$:t},i){let o;this.parts=[];let s=0,n=0;const l=e.length-1,a=this.parts,[r,c]=J(e,t);if(this.el=K.createElement(r,i),q.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(o=q.nextNode())&&a.length<l;){if(1===o.nodeType){if(o.hasAttributes())for(const e of o.getAttributeNames())if(e.endsWith(E)){const t=c[n++],i=o.getAttribute(e).split(k),l=/([.?@])?(.*)/.exec(t);a.push({type:1,index:s,name:l[2],strings:i,ctor:"."===l[1]?ee:"?"===l[1]?te:"@"===l[1]?ie:Y}),o.removeAttribute(e)}else e.startsWith(k)&&(a.push({type:6,index:s}),o.removeAttribute(e));if(j.test(o.tagName)){const e=o.textContent.split(k),t=e.length-1;if(t>0){o.textContent=C?C.emptyScript:"";for(let i=0;i<t;i++)o.append(e[i],P()),q.nextNode(),a.push({type:2,index:++s});o.append(e[t],P())}}}else if(8===o.nodeType)if(o.data===S)a.push({type:2,index:s});else{let e=-1;for(;-1!==(e=o.data.indexOf(k,e+1));)a.push({type:7,index:s}),e+=k.length-1}s++}}static createElement(e,t){const i=z.createElement("template");return i.innerHTML=e,i}}function Z(e,t,i=e,o){if(t===V)return t;let s=void 0!==o?i._$Co?.[o]:i._$Cl;const n=H(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),void 0===n?s=void 0:(s=new n(e),s._$AT(e,i,o)),void 0!==o?(i._$Co??=[])[o]=s:i._$Cl=s),void 0!==s&&(t=Z(e,s._$AS(e,t.values),s,o)),t}class Q{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,o=(e?.creationScope??z).importNode(t,!0);q.currentNode=o;let s=q.nextNode(),n=0,l=0,a=i[0];for(;void 0!==a;){if(n===a.index){let t;2===a.type?t=new X(s,s.nextSibling,this,e):1===a.type?t=new a.ctor(s,a.name,a.strings,this,e):6===a.type&&(t=new oe(s,this,e)),this._$AV.push(t),a=i[++l]}n!==a?.index&&(s=q.nextNode(),n++)}return q.currentNode=z,o}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class X{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,o){this.type=2,this._$AH=F,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=Z(this,e,t),H(e)?e===F||null==e||""===e?(this._$AH!==F&&this._$AR(),this._$AH=F):e!==this._$AH&&e!==V&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):(e=>T(e)||"function"==typeof e?.[Symbol.iterator])(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==F&&H(this._$AH)?this._$AA.nextSibling.data=e:this.T(z.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,o="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=K.createElement(G(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===o)this._$AH.p(t);else{const e=new Q(o,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=W.get(e.strings);return void 0===t&&W.set(e.strings,t=new K(e)),t}k(e){T(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,o=0;for(const s of e)o===t.length?t.push(i=new X(this.O(P()),this.O(P()),this,this.options)):i=t[o],i._$AI(s),o++;o<t.length&&(this._$AR(i&&i._$AB.nextSibling,o),t.length=o)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=e.nextSibling;e.remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class Y{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,o,s){this.type=1,this._$AH=F,this._$AN=void 0,this.element=e,this.name=t,this._$AM=o,this.options=s,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=F}_$AI(e,t=this,i,o){const s=this.strings;let n=!1;if(void 0===s)e=Z(this,e,t,0),n=!H(e)||e!==this._$AH&&e!==V,n&&(this._$AH=e);else{const o=e;let l,a;for(e=s[0],l=0;l<s.length-1;l++)a=Z(this,o[i+l],t,l),a===V&&(a=this._$AH[l]),n||=!H(a)||a!==this._$AH[l],a===F?e=F:e!==F&&(e+=(a??"")+s[l+1]),this._$AH[l]=a}n&&!o&&this.j(e)}j(e){e===F?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class ee extends Y{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===F?void 0:e}}class te extends Y{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==F)}}class ie extends Y{constructor(e,t,i,o,s){super(e,t,i,o,s),this.type=5}_$AI(e,t=this){if((e=Z(this,e,t,0)??F)===V)return;const i=this._$AH,o=e===F&&i!==F||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,s=e!==F&&(i===F||o);o&&this.element.removeEventListener(this.name,this,i),s&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class oe{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Z(this,e)}}const se=w.litHtmlPolyfillSupport;se?.(K,X),(w.litHtmlVersions??=[]).push("3.3.1");const ne=globalThis;class le extends y{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=((e,t,i)=>{const o=i?.renderBefore??t;let s=o._$litPart$;if(void 0===s){const e=i?.renderBefore??null;o._$litPart$=s=new X(t.insertBefore(P(),e),e,void 0,i??{})}return s._$AI(e),s})(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return V}}le._$litElement$=!0,le.finalized=!0,ne.litElementHydrateSupport?.({LitElement:le});const ae=ne.litElementPolyfillSupport;ae?.({LitElement:le}),(ne.litElementVersions??=[]).push("4.2.1");const re=e=>(t,i)=>{void 0!==i?i.addInitializer(()=>{customElements.define(e,t)}):customElements.define(e,t)},ce={attribute:!0,type:String,converter:b,reflect:!1,hasChanged:v},he=(e=ce,t,i)=>{const{kind:o,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(void 0===n&&globalThis.litPropertyMetadata.set(s,n=new Map),"setter"===o&&((e=Object.create(e)).wrapped=!0),n.set(i.name,e),"accessor"===o){const{name:o}=i;return{set(i){const s=t.get.call(this);t.set.call(this,i),this.requestUpdate(o,s,e)},init(t){return void 0!==t&&this.C(o,void 0,e,t),t}}}if("setter"===o){const{name:o}=i;return function(i){const s=this[o];t.call(this,i),this.requestUpdate(o,s,e)}}throw Error("Unsupported decorator location: "+o)};function de(e){return(t,i)=>"object"==typeof i?he(e,t,i):((e,t,i)=>{const o=t.hasOwnProperty(i);return t.constructor.createProperty(i,e),o?Object.getOwnPropertyDescriptor(t,i):void 0})(e,t,i)}function ge(e){return de({...e,state:!0,attribute:!1})}var ue,pe;!function(e){e.language="language",e.system="system",e.comma_decimal="comma_decimal",e.decimal_comma="decimal_comma",e.space_comma="space_comma",e.none="none"}(ue||(ue={})),function(e){e.language="language",e.system="system",e.am_pm="12",e.twenty_four="24"}(pe||(pe={}));var fe=function(e,t,i,o){o=o||{},i=null==i?{}:i;var s=new Event(t,{bubbles:void 0===o.bubbles||o.bubbles,cancelable:Boolean(o.cancelable),composed:void 0===o.composed||o.composed});return s.detail=i,e.dispatchEvent(s),s};console.info("%c  INDICATOR-GRID-CARD-BETA  \n%c  Version 1.1.0-beta.1  ","color: orange; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"),window.customCards=window.customCards||[],window.customCards.push({type:"indicator-grid-card-beta",name:"Indicator Grid Card (Beta)",description:"A card displaying a grid of indicator lights showing entity status (Beta version with column spanning)"});let _e=class extends le{_normalizeSize(e,t){if(void 0===e)return t;const i=String(e);return/^\d+(\.\d+)?$/.test(i)?`${i}px`:i}static async getConfigElement(){return await Promise.resolve().then(function(){return me}),document.createElement("indicator-grid-card-beta-editor")}static getStubConfig(){return{columns:3,rows:2,cell_width:"",cell_height:100,cell_gap:5,font_size:16,font_weight:"bold",show_icons:!1,icon_placement:"above",icon_size:24,entities:[],unavailable_text:"INOP",global_colors:{on:"green",off:"gray",text:"white",unavailable:"orange",blank:"#333333"}}}setConfig(e){if(!e)throw new Error("Invalid configuration");const t=(e,t)=>{if(void 0===e)return t;const i=String(e);return/^\d+(\.\d+)?$/.test(i)?`${i}px`:i};let i=e.cell_width,o=e.cell_height;void 0!==e.cell_size&&(i=i??`${e.cell_size}px`,o=o??`${e.cell_size}px`),this.config={...e,columns:e.columns??3,rows:e.rows??2,cell_width:t(i,""),cell_height:t(o,"100px"),cell_gap:t(e.cell_gap,"5px"),font_size:t(e.font_size,"16px"),font_weight:e.font_weight??"bold",show_icons:e.show_icons??!1,icon_placement:e.icon_placement??"above",icon_size:t(e.icon_size,"24px"),unavailable_text:e.unavailable_text??"INOP",global_colors:{on:"green",off:"gray",text:"white",unavailable:"orange",blank:"#333333",...e.global_colors}}}getCardSize(){if(!this.config)return 2;const e=this._normalizeSize(this.config.cell_height,"100px"),t=parseFloat(e),i=this._normalizeSize(this.config.cell_gap,"5px"),o=parseFloat(i),s=this.config.rows||2,n=s*t+(s-1)*o;return Math.ceil(n/50)}shouldUpdate(e){if(!this.config)return!1;if(e.has("config"))return!0;if(e.has("hass")){const t=e.get("hass");if(!t)return!0;const i=this.config.entities.filter(e=>e&&!!e.entity).map(e=>e.entity);return i.some(e=>t.states[e]!==this.hass.states[e])}return!0}_getCells(){const e=this.config.columns*this.config.rows,t=[];for(let i=0;i<e;i++){const e=this.config.entities[i];if(!e||!e.entity){t.push({displayText:"",backgroundColor:this._getColor("blank",e?.colors),textColor:this._getColor("text",e?.colors),textOpacity:1,clickable:!1,clickAction:"none",colspan:e?.colspan||1});continue}const o=this.hass.states[e.entity],s=this._computeCell(e,o);t.push(s)}return t}_computeCell(e,t){if(!t||"unavailable"===t.state||"unknown"===t.state){const i=`${e.text||t?.attributes?.friendly_name||e.entity||"Unknown"}\n${this.config.unavailable_text||"INOP"}`;return{entity:e.entity,displayText:i,backgroundColor:this._getColor("unavailable",e.colors),textColor:this._getColor("text",e.colors),textOpacity:1,state:t?.state,clickable:!1,clickAction:"none",colspan:e.colspan||1}}const i=t.state,o=this._getDisplayText(e,t),s=this._getBackgroundColor(i,e),n=this._getColor("text",e.colors),l=this._getTextOpacity(i,e),a=this._getIcon(i,e,t),r=e.click_action||this._getDefaultClickAction(t);return{entity:e.entity,displayText:o,backgroundColor:s,textColor:n,textOpacity:l,icon:a,state:i,clickable:"none"!==r,clickAction:r,colspan:e.colspan||1}}_getDisplayText(e,t){return e.text?e.text:e.text_template?e.text_template.replace(/\{\{\s*state\s*\}\}/g,t.state).replace(/\{\{\s*name\s*\}\}/g,t.attributes.friendly_name||e.entity):t.attributes.friendly_name||e.entity||""}_getBackgroundColor(e,t){const i=t.colors;if(i?.states&&i.states[e])return i.states[e];if(this.config.global_colors?.states&&this.config.global_colors.states[e])return this.config.global_colors.states[e];const o=parseFloat(e);if(!isNaN(o)){const e=this._getThresholdColor(o,i)||this._getThresholdColor(o,this.config.global_colors);if(e)return e}return"on"===e?this._getColor("on",i):this._getColor("off",i)}_getThresholdColor(e,t){if(!t?.thresholds||0===t.thresholds.length)return null;const i=[...t.thresholds].sort((e,t)=>e.value-t.value);for(const t of i){let i=!1;switch(t.operator||"<="){case"<":i=e<t.value;break;case"<=":i=e<=t.value;break;case">":i=e>t.value;break;case">=":i=e>=t.value;break;case"==":i=e===t.value}if(i)return t.color}return null}_getColor(e,t){if(t&&t[e])return t[e];if(this.config.global_colors&&this.config.global_colors[e])return this.config.global_colors[e];return{on:"green",off:"gray",unavailable:"orange",text:"white",blank:"#333333"}[e]}_getIcon(e,t,i){if(t&&void 0!==t.show_icon){if(!t.show_icon)return}else if(!this.config.show_icons)return;const o="on"===e?"on":"off";if(t&&t.icon&&t.icon[o])return t.icon[o];if(i&&i.attributes){if(i.attributes.icon)return i.attributes.icon;const t=i.entity_id.split(".")[0],o={light:"on"===e?"mdi:lightbulb-on":"mdi:lightbulb",switch:"on"===e?"mdi:toggle-switch":"mdi:toggle-switch-off",binary_sensor:"on"===e?"mdi:checkbox-marked-circle":"mdi:checkbox-blank-circle-outline",sensor:"mdi:eye"};if(o[t])return o[t]}}_getTextOpacity(e,t){return"off"!==e?1:void 0!==t.dim_off_text?t.dim_off_text/100:void 0!==this.config.dim_off_text?this.config.dim_off_text/100:1}_getDefaultClickAction(e){const t=e.entity_id.split(".")[0];return["light","switch","input_boolean","automation","fan"].includes(t)?"toggle":"more-info"}_handleClick(e){e.clickable&&e.entity&&("toggle"===e.clickAction?this._toggleEntity(e.entity):"more-info"===e.clickAction&&this._showMoreInfo(e.entity))}_toggleEntity(e){const t=e.split(".")[0];this.hass.callService(t,"toggle",{entity_id:e})}_showMoreInfo(e){fe(this,"hass-more-info",{entityId:e})}_isHeaderRow(e){return!!this.config.header_rows&&this.config.header_rows.some(t=>t.row_index===e)}_getHeaderRow(e){if(this.config.header_rows)return this.config.header_rows.find(t=>t.row_index===e)}_renderHeaderCell(e){const t=e.colspan||1,i=e.text_align||"center",o=this._normalizeSize(this.config.font_size,"16px"),s=this._normalizeSize(e.font_size,o),n=e.font_weight||this.config.font_weight||"bold",l=e.text_color||this._getColor("text",void 0),a={"background-color":e.background_color||this._getColor("blank",void 0),color:l,"font-size":s,"font-weight":String(n),"text-align":i,"grid-column":`span ${t}`};return L`
      <div class="cell header-cell" style=${this._styleMap(a)}>
        <div class="cell-text">
          <div class="text-line">${e.text}</div>
        </div>
      </div>
    `}_renderAllCells(){const e=[];let t=0;for(let i=0;i<this.config.rows;i++)if(this._isHeaderRow(i)){const t=this._getHeaderRow(i);t&&t.cells&&t.cells.forEach(t=>{e.push(this._renderHeaderCell(t))})}else{let i=0;for(;i<this.config.columns&&t<this.config.entities.length;){const o=this.config.entities[t],s=o?.colspan||1;let n;if(o&&o.entity){const e=this.hass.states[o.entity];n=this._computeCell(o,e)}else n={displayText:"",backgroundColor:this._getColor("blank",o?.colors),textColor:this._getColor("text",o?.colors),textOpacity:1,clickable:!1,clickAction:"none",colspan:s};e.push(this._renderCell(n)),i+=s,t++}}return e}static get styles(){return l`
      :host {
        display: block;
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
    `}render(){if(!this.config||!this.hass)return L``;const e=this._normalizeSize(this.config.cell_width,""),t=e&&""!==e.trim()?e:"1fr",i=this._normalizeSize(this.config.cell_height,"100px"),o=this._normalizeSize(this.config.cell_gap,"5px"),s={"grid-template-columns":`repeat(${this.config.columns}, ${t})`,"grid-template-rows":`repeat(${this.config.rows}, ${i})`,gap:o};return L`
      <ha-card>
        <div class="grid-container" style=${this._styleMap(s)}>
          ${this._renderAllCells()}
        </div>
      </ha-card>
    `}_colorWithOpacity(e,t){const i=e.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)$/);if(i)return`rgba(${i[1]}, ${i[2]}, ${i[3]}, ${t})`;const o=e.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i);if(o){return`rgba(${parseInt(o[1],16)}, ${parseInt(o[2],16)}, ${parseInt(o[3],16)}, ${t})`}const s=document.createElement("div");s.style.color=e,document.body.appendChild(s);const n=getComputedStyle(s).color;document.body.removeChild(s);const l=n.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);return l?`rgba(${l[1]}, ${l[2]}, ${l[3]}, ${t})`:e}_renderCell(e){const t=e.textOpacity<1?this._colorWithOpacity(e.textColor,e.textOpacity):e.textColor,i={"background-color":e.backgroundColor,color:t,"font-size":this._normalizeSize(this.config.font_size,"16px"),"font-weight":String(this.config.font_weight||"bold")};e.colspan&&e.colspan>1&&(i["grid-column"]=`span ${e.colspan}`);const o=e.icon?`icon-${this.config.icon_placement}`:"",s={"--mdc-icon-size":this._normalizeSize(this.config.icon_size,"24px")},n=e.displayText.split("\n");return L`
      <div
        class="cell ${e.clickable?"clickable":""} ${o}"
        style=${this._styleMap(i)}
        @click=${()=>this._handleClick(e)}
      >
        ${e.icon?L`<ha-icon class="cell-icon" .icon=${e.icon} style=${this._styleMap(s)}></ha-icon>`:""}
        <div class="cell-text">
          ${n.map(e=>L`<div class="text-line">${e}</div>`)}
        </div>
      </div>
    `}_styleMap(e){return Object.entries(e).map(([e,t])=>`${e}: ${t}`).join("; ")}};e([de({attribute:!1})],_e.prototype,"hass",void 0),e([ge()],_e.prototype,"config",void 0),_e=e([re("indicator-grid-card-beta")],_e);let $e=class extends le{constructor(){super(...arguments),this._selectedEntityIndex=-1}setConfig(e){this._config=e}_valueChanged(e){if(!this._config||!this.hass)return;const t={...this._config,...e.detail.value};fe(this,"config-changed",{config:t})}_configValueChanged(e,t){if(!this._config||!this.hass)return;const i={...this._config,[e]:t};fe(this,"config-changed",{config:i})}_globalColorChanged(e,t){const i=e.target.value,o={...this._config};o.global_colors||(o.global_colors={}),o.global_colors={...o.global_colors,[t]:i},fe(this,"config-changed",{config:o})}_addEntity(){const e={...this._config};e.entities||(e.entities=[]),e.entities=[...e.entities,{entity:""}],fe(this,"config-changed",{config:e})}_removeEntity(e){const t={...this._config};t.entities=[...t.entities],t.entities.splice(e,1),this._selectedEntityIndex===e&&(this._selectedEntityIndex=-1),fe(this,"config-changed",{config:t})}_entityChanged(e,t,i){const o={...this._config};o.entities=[...o.entities],o.entities[e]={...o.entities[e],[t]:i},fe(this,"config-changed",{config:o})}_entityColorChanged(e,t,i){const o={...this._config};o.entities=[...o.entities];const s={...o.entities[e]};s.colors||(s.colors={}),s.colors={...s.colors,[t]:i},o.entities[e]=s,fe(this,"config-changed",{config:o})}_entityIconChanged(e,t,i){const o={...this._config};o.entities=[...o.entities];const s={...o.entities[e]};s.icon||(s.icon={}),s.icon={...s.icon,[t]:i},o.entities[e]=s,fe(this,"config-changed",{config:o})}_addHeaderRow(){const e={...this._config};e.header_rows||(e.header_rows=[]),e.header_rows=[...e.header_rows,{row_index:0,cells:[{text:"Header",colspan:1}]}],fe(this,"config-changed",{config:e})}_removeHeaderRow(e){const t={...this._config};t.header_rows&&(t.header_rows=[...t.header_rows],t.header_rows.splice(e,1),fe(this,"config-changed",{config:t}))}_headerRowChanged(e,t,i){const o={...this._config};o.header_rows&&(o.header_rows=[...o.header_rows],o.header_rows[e]={...o.header_rows[e],[t]:i},fe(this,"config-changed",{config:o}))}_addHeaderCell(e){const t={...this._config};if(!t.header_rows)return;t.header_rows=[...t.header_rows];const i={...t.header_rows[e]};i.cells=[...i.cells,{text:"Header",colspan:1}],t.header_rows[e]=i,fe(this,"config-changed",{config:t})}_removeHeaderCell(e,t){const i={...this._config};if(!i.header_rows)return;i.header_rows=[...i.header_rows];const o={...i.header_rows[e]};o.cells=[...o.cells],o.cells.splice(t,1),i.header_rows[e]=o,fe(this,"config-changed",{config:i})}_headerCellChanged(e,t,i,o){const s={...this._config};if(!s.header_rows)return;s.header_rows=[...s.header_rows];const n={...s.header_rows[e]};n.cells=[...n.cells],n.cells[t]={...n.cells[t],[i]:o},s.header_rows[e]=n,fe(this,"config-changed",{config:s})}static get styles(){return l`
      ha-textfield,
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
    `}render(){return this.hass&&this._config?L`
      <ha-form
        .hass=${this.hass}
        .data=${this._config}
        .schema=${[{name:"columns",selector:{number:{min:1,max:20,mode:"box"}}},{name:"rows",selector:{number:{min:1,max:20,mode:"box"}}}]}
        .computeLabel=${e=>e.label||e.name}
        @value-changed=${this._valueChanged}
      ></ha-form>

      <ha-textfield
        label="Cell Width"
        .value=${this._config.cell_width||""}
        @input=${e=>this._configValueChanged("cell_width",e.target.value)}
        helper-text="Leave blank for auto (100% width), or use 100px, 25%, etc."
      ></ha-textfield>

      <ha-textfield
        label="Cell Height"
        .value=${this._config.cell_height||"100px"}
        @input=${e=>this._configValueChanged("cell_height",e.target.value)}
        helper-text="Examples: 100px, 10vh, 5rem"
      ></ha-textfield>

      <ha-textfield
        label="Cell Gap"
        .value=${this._config.cell_gap||"5px"}
        @input=${e=>this._configValueChanged("cell_gap",e.target.value)}
        helper-text="Gap between cells. Examples: 5px, 0.5rem, 1%"
      ></ha-textfield>

      <ha-textfield
        label="Font Size"
        .value=${this._config.font_size||"16px"}
        @input=${e=>this._configValueChanged("font_size",e.target.value)}
        helper-text="Examples: 16px, 1.2rem, 14pt"
      ></ha-textfield>

      <ha-selector
        .hass=${this.hass}
        .selector=${{select:{options:[{value:"300",label:"Light (300)"},{value:"normal",label:"Normal (400)"},{value:"500",label:"Medium (500)"},{value:"600",label:"Semi-Bold (600)"},{value:"bold",label:"Bold (700)"},{value:"800",label:"Extra Bold (800)"},{value:"900",label:"Black (900)"}]}}}
        .value=${this._config.font_weight||"bold"}
        @value-changed=${e=>this._configValueChanged("font_weight",e.detail.value)}
        .label=${"Font Weight"}
      ></ha-selector>

      <ha-textfield
        label="Unavailable Text"
        .value=${this._config.unavailable_text||"INOP"}
        @input=${e=>this._configValueChanged("unavailable_text",e.target.value)}
        helper-text="Text to display when entity is unavailable"
      ></ha-textfield>

      <ha-textfield
        label="Dim Off Text (%)"
        type="number"
        min="0"
        max="100"
        .value=${this._config.dim_off_text??""}
        @input=${e=>this._configValueChanged("dim_off_text",e.target.value?Number(e.target.value):void 0)}
        helper-text="Opacity percentage for text when entity is off (0-100). Leave blank for no dimming. Example: 50"
      ></ha-textfield>

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

      <ha-textfield
        label="Icon Size"
        .value=${this._config.icon_size||"24px"}
        @input=${e=>this._configValueChanged("icon_size",e.target.value)}
        helper-text="Examples: 24px, 2rem, 32px"
      ></ha-textfield>

      <ha-expansion-panel header="Global Colors" .expanded=${!1}>
        <ha-textfield
          label="On Color"
          .value=${this._config.global_colors?.on||"green"}
          @input=${e=>this._globalColorChanged(e,"on")}
          helper-text="e.g., green, #00FF00"
        ></ha-textfield>

        <ha-textfield
          label="Off Color"
          .value=${this._config.global_colors?.off||"gray"}
          @input=${e=>this._globalColorChanged(e,"off")}
          helper-text="e.g., gray, #808080"
        ></ha-textfield>

        <ha-textfield
          label="Unavailable Color"
          .value=${this._config.global_colors?.unavailable||"orange"}
          @input=${e=>this._globalColorChanged(e,"unavailable")}
          helper-text="e.g., orange, #FFA500"
        ></ha-textfield>

        <ha-textfield
          label="Text Color"
          .value=${this._config.global_colors?.text||"white"}
          @input=${e=>this._globalColorChanged(e,"text")}
          helper-text="e.g., white, #FFFFFF"
        ></ha-textfield>

        <ha-textfield
          label="Blank Cell Color"
          .value=${this._config.global_colors?.blank||"#333333"}
          @input=${e=>this._globalColorChanged(e,"blank")}
          helper-text="e.g., #333333, darkgray"
        ></ha-textfield>
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
    `:L``}_renderHeaderRowConfig(e,t){return L`
      <div class="entity-item">
        <div class="entity-header">
          <strong>Header Row ${t+1}</strong>
          <mwc-button @click=${()=>this._removeHeaderRow(t)}>Remove</mwc-button>
        </div>

        <div class="entity-details">
          <ha-textfield
            label="Row Index (0-based)"
            type="number"
            min="0"
            .max=${this._config.rows-1}
            .value=${e.row_index}
            @input=${e=>this._headerRowChanged(t,"row_index",Number(e.target.value))}
            helper-text="Which row this header occupies (0 = first row)"
          ></ha-textfield>

          <h4>Header Cells</h4>
          ${e.cells.map((e,i)=>this._renderHeaderCellConfig(t,e,i))}

          <mwc-button @click=${()=>this._addHeaderCell(t)}>
            Add Header Cell
          </mwc-button>
        </div>
      </div>
    `}_renderHeaderCellConfig(e,t,i){return L`
      <div style="border: 1px dashed var(--divider-color); padding: 8px; margin: 8px 0; border-radius: 4px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
          <strong>Cell ${i+1}</strong>
          <mwc-button @click=${()=>this._removeHeaderCell(e,i)}>Remove</mwc-button>
        </div>

        <ha-textfield
          label="Text"
          .value=${t.text||""}
          @input=${t=>this._headerCellChanged(e,i,"text",t.target.value)}
        ></ha-textfield>

        <ha-textfield
          label="Column Span"
          type="number"
          min="1"
          .max=${this._config.columns}
          .value=${t.colspan||1}
          @input=${t=>this._headerCellChanged(e,i,"colspan",Number(t.target.value))}
          helper-text="Number of columns this cell spans"
        ></ha-textfield>

        <ha-selector
          .hass=${this.hass}
          .selector=${{select:{options:[{value:"left",label:"Left"},{value:"center",label:"Center"},{value:"right",label:"Right"}]}}}
          .value=${t.text_align||"center"}
          @value-changed=${t=>this._headerCellChanged(e,i,"text_align",t.detail.value)}
          .label=${"Text Alignment"}
        ></ha-selector>

        <ha-expansion-panel header="Advanced Styling (optional)" .expanded=${!1}>
          <ha-textfield
            label="Font Size"
            .value=${t.font_size||""}
            @input=${t=>this._headerCellChanged(e,i,"font_size",t.target.value)}
            helper-text="Leave blank to use card font size"
          ></ha-textfield>

          <ha-selector
            .hass=${this.hass}
            .selector=${{select:{options:[{value:"",label:"Default (from card)"},{value:"300",label:"Light (300)"},{value:"normal",label:"Normal (400)"},{value:"500",label:"Medium (500)"},{value:"600",label:"Semi-Bold (600)"},{value:"bold",label:"Bold (700)"},{value:"800",label:"Extra Bold (800)"},{value:"900",label:"Black (900)"}]}}}
            .value=${t.font_weight||""}
            @value-changed=${t=>this._headerCellChanged(e,i,"font_weight",t.detail.value)}
            .label=${"Font Weight"}
          ></ha-selector>

          <ha-textfield
            label="Text Color"
            .value=${t.text_color||""}
            @input=${t=>this._headerCellChanged(e,i,"text_color",t.target.value)}
            helper-text="Leave blank to use global text color"
          ></ha-textfield>

          <ha-textfield
            label="Background Color"
            .value=${t.background_color||""}
            @input=${t=>this._headerCellChanged(e,i,"background_color",t.target.value)}
            helper-text="Leave blank to use global blank color"
          ></ha-textfield>
        </ha-expansion-panel>
      </div>
    `}_renderEntityConfig(e,t){const i=this._config.columns*this._config.rows,o=Math.floor(t/this._config.columns)+1,s=t%this._config.columns+1;return t>=i?L``:L`
      <div class="entity-item">
        <div class="entity-header">
          <strong>Cell ${t+1} (Row ${o}, Col ${s})</strong>
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

          <ha-textfield
            label="Custom text (optional)"
            .value=${e.text||""}
            @input=${e=>this._entityChanged(t,"text",e.target.value)}
          ></ha-textfield>

          <ha-textfield
            label="Text template"
            .value=${e.text_template||""}
            @input=${e=>this._entityChanged(t,"text_template",e.target.value)}
            helper-text="e.g., {{ state }}"
          ></ha-textfield>

          <ha-textfield
            label="Column Span"
            type="number"
            min="1"
            .max=${this._config.columns}
            .value=${e.colspan||1}
            @input=${e=>this._entityChanged(t,"colspan",Number(e.target.value))}
            helper-text="Number of columns this cell spans (default: 1)"
          ></ha-textfield>

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
              <ha-textfield
                label="On Color"
                .value=${e.colors?.on||""}
                @input=${e=>this._entityColorChanged(t,"on",e.target.value)}
                helper-text="Override global on color"
              ></ha-textfield>

              <ha-textfield
                label="Off Color"
                .value=${e.colors?.off||""}
                @input=${e=>this._entityColorChanged(t,"off",e.target.value)}
                helper-text="Override global off color"
              ></ha-textfield>

              <ha-textfield
                label="Text Color"
                .value=${e.colors?.text||""}
                @input=${e=>this._entityColorChanged(t,"text",e.target.value)}
                helper-text="Override global text color"
              ></ha-textfield>

              <ha-textfield
                label="Blank Cell Color"
                .value=${e.colors?.blank||""}
                @input=${e=>this._entityColorChanged(t,"blank",e.target.value)}
                helper-text="Override global blank color (for blank cells only)"
              ></ha-textfield>

              <ha-textfield
                label="Dim Off Text (%)"
                type="number"
                min="0"
                max="100"
                .value=${e.dim_off_text??""}
                @input=${e=>this._entityChanged(t,"dim_off_text",e.target.value?Number(e.target.value):void 0)}
                helper-text="Override global dim setting (0-100)"
              ></ha-textfield>
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
    `}};e([de({attribute:!1})],$e.prototype,"hass",void 0),e([ge()],$e.prototype,"_config",void 0),e([ge()],$e.prototype,"_selectedEntityIndex",void 0),$e=e([re("indicator-grid-card-beta-editor")],$e);var me=Object.freeze({__proto__:null,get IndicatorGridCardBetaEditor(){return $e}});export{_e as IndicatorGridCardBeta};
//# sourceMappingURL=indicator-grid-card-beta.js.map
