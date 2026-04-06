var BulkConfigurator=function(t){"use strict";
/**
   * @license
   * Copyright 2019 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */const e=globalThis,s=e.ShadowRoot&&(void 0===e.ShadyCSS||e.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),r=new WeakMap;let a=class n{constructor(t,e,s){if(this._$cssResult$=!0,s!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(s&&void 0===t){const s=void 0!==e&&1===e.length;s&&(t=r.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&r.set(e,t))}return t}toString(){return this.cssText}};const l=(t,...e)=>{const s=1===t.length?t[0]:e.reduce((e,s,o)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[o+1],t[0]);return new a(s,t,o)},d=s?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return(t=>new a("string"==typeof t?t:t+"",void 0,o))(e)})(t):t,{is:c,defineProperty:p,getOwnPropertyDescriptor:h,getOwnPropertyNames:u,getOwnPropertySymbols:g,getPrototypeOf:m}=Object,f=globalThis,b=f.trustedTypes,x=b?b.emptyScript:"",v=f.reactiveElementPolyfillSupport,w=(t,e)=>t,$={toAttribute(t,e){switch(e){case Boolean:t=t?x:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let s=t;switch(e){case Boolean:s=null!==t;break;case Number:s=null===t?null:Number(t);break;case Object:case Array:try{s=JSON.parse(t)}catch(o){s=null}}return s}},C=(t,e)=>!c(t,e),P={attribute:!0,type:String,converter:$,reflect:!1,useDefault:!1,hasChanged:C};
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;let Q=class y extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=P){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),o=this.getPropertyDescriptor(t,s,e);void 0!==o&&p(this.prototype,t,o)}}static getPropertyDescriptor(t,e,s){const{get:o,set:r}=h(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get:o,set(e){const a=o?.call(this);r?.call(this,e),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??P}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const t=m(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const t=this.properties,e=[...u(t),...g(t)];for(const s of e)this.createProperty(s,t[s])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,s]of e)this.elementProperties.set(t,s)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const t=this._$Eu(e,s);void 0!==t&&this._$Eh.set(t,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const t of s)e.unshift(d(t))}else void 0!==t&&e.push(d(t));return e}static _$Eu(t,e){const s=e.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((t,o)=>{if(s)t.adoptedStyleSheets=o.map(t=>t instanceof CSSStyleSheet?t:t.styleSheet);else for(const s of o){const o=document.createElement("style"),r=e.litNonce;void 0!==r&&o.setAttribute("nonce",r),o.textContent=s.cssText,t.appendChild(o)}})(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){const s=this.constructor.elementProperties.get(t),o=this.constructor._$Eu(t,s);if(void 0!==o&&!0===s.reflect){const r=(void 0!==s.converter?.toAttribute?s.converter:$).toAttribute(e,s.type);this._$Em=t,null==r?this.removeAttribute(o):this.setAttribute(o,r),this._$Em=null}}_$AK(t,e){const s=this.constructor,o=s._$Eh.get(t);if(void 0!==o&&this._$Em!==o){const t=s.getPropertyOptions(o),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:$;this._$Em=o;const a=r.fromAttribute(e,t.type);this[o]=a??this._$Ej?.get(o)??a,this._$Em=null}}requestUpdate(t,e,s,o=!1,r){if(void 0!==t){const a=this.constructor;if(!1===o&&(r=this[t]),s??=a.getPropertyOptions(t),!((s.hasChanged??C)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(a._$Eu(t,s))))return;this.C(t,e,s)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:o,wrapped:r},a){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,a??e??this[t]),!0!==r||void 0!==a)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),!0===o&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,s]of t){const{wrapped:t}=s,o=this[e];!0!==t||this._$AL.has(e)||void 0===o||this.C(e,void 0,s,o)}}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(t=>t.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(t=>t.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(t=>this._$ET(t,this[t])),this._$EM()}updated(t){}firstUpdated(t){}};Q.elementStyles=[],Q.shadowRootOptions={mode:"open"},Q[w("elementProperties")]=new Map,Q[w("finalized")]=new Map,v?.({ReactiveElement:Q}),(f.reactiveElementVersions??=[]).push("2.1.2");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const q=globalThis,A=t=>t,F=q.trustedTypes,T=F?F.createPolicy("lit-html",{createHTML:t=>t}):void 0,V="$lit$",_=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+_,U=`<${E}>`,M=document,O=()=>M.createComment(""),D=t=>null===t||"object"!=typeof t&&"function"!=typeof t,N=Array.isArray,B="[ \t\n\f\r]",W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,j=/-->/g,X=/>/g,G=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Y=/'/g,J=/"/g,K=/^(?:script|style|textarea|title)$/i,tt=(ot=1,(t,...e)=>({_$litType$:ot,strings:t,values:e})),et=Symbol.for("lit-noChange"),it=Symbol.for("lit-nothing"),st=new WeakMap,nt=M.createTreeWalker(M,129);var ot;function rt(t,e){if(!N(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==T?T.createHTML(e):e}class S{constructor({strings:t,_$litType$:e},s){let o;this.parts=[];let r=0,a=0;const l=t.length-1,d=this.parts,[c,p]=((t,e)=>{const s=t.length-1,o=[];let r,a=2===e?"<svg>":3===e?"<math>":"",l=W;for(let d=0;d<s;d++){const e=t[d];let s,c,p=-1,h=0;for(;h<e.length&&(l.lastIndex=h,c=l.exec(e),null!==c);)h=l.lastIndex,l===W?"!--"===c[1]?l=j:void 0!==c[1]?l=X:void 0!==c[2]?(K.test(c[2])&&(r=RegExp("</"+c[2],"g")),l=G):void 0!==c[3]&&(l=G):l===G?">"===c[0]?(l=r??W,p=-1):void 0===c[1]?p=-2:(p=l.lastIndex-c[2].length,s=c[1],l=void 0===c[3]?G:'"'===c[3]?J:Y):l===J||l===Y?l=G:l===j||l===X?l=W:(l=G,r=void 0);const u=l===G&&t[d+1].startsWith("/>")?" ":"";a+=l===W?e+U:p>=0?(o.push(s),e.slice(0,p)+V+e.slice(p)+_+u):e+_+(-2===p?d:u)}return[rt(t,a+(t[s]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),o]})(t,e);if(this.el=S.createElement(c,s),nt.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(o=nt.nextNode())&&d.length<l;){if(1===o.nodeType){if(o.hasAttributes())for(const t of o.getAttributeNames())if(t.endsWith(V)){const e=p[a++],s=o.getAttribute(t).split(_),l=/([.?@])?(.*)/.exec(e);d.push({type:1,index:r,name:l[2],strings:s,ctor:"."===l[1]?I:"?"===l[1]?L:"@"===l[1]?z:H}),o.removeAttribute(t)}else t.startsWith(_)&&(d.push({type:6,index:r}),o.removeAttribute(t));if(K.test(o.tagName)){const t=o.textContent.split(_),e=t.length-1;if(e>0){o.textContent=F?F.emptyScript:"";for(let s=0;s<e;s++)o.append(t[s],O()),nt.nextNode(),d.push({type:2,index:++r});o.append(t[e],O())}}}else if(8===o.nodeType)if(o.data===E)d.push({type:2,index:r});else{let t=-1;for(;-1!==(t=o.data.indexOf(_,t+1));)d.push({type:7,index:r}),t+=_.length-1}r++}}static createElement(t,e){const s=M.createElement("template");return s.innerHTML=t,s}}function at(t,e,s=t,o){if(e===et)return e;let r=void 0!==o?s._$Co?.[o]:s._$Cl;const a=D(e)?void 0:e._$litDirective$;return r?.constructor!==a&&(r?._$AO?.(!1),void 0===a?r=void 0:(r=new a(t),r._$AT(t,s,o)),void 0!==o?(s._$Co??=[])[o]=r:s._$Cl=r),void 0!==r&&(e=at(t,r._$AS(t,e.values),r,o)),e}class R{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,o=(t?.creationScope??M).importNode(e,!0);nt.currentNode=o;let r=nt.nextNode(),a=0,l=0,d=s[0];for(;void 0!==d;){if(a===d.index){let e;2===d.type?e=new k(r,r.nextSibling,this,t):1===d.type?e=new d.ctor(r,d.name,d.strings,this,t):6===d.type&&(e=new Z(r,this,t)),this._$AV.push(e),d=s[++l]}a!==d?.index&&(r=nt.nextNode(),a++)}return nt.currentNode=M,o}p(t){let e=0;for(const s of this._$AV)void 0!==s&&(void 0!==s.strings?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class k{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,o){this.type=2,this._$AH=it,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=o,this._$Cv=o?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=at(this,t,e),D(t)?t===it||null==t||""===t?(this._$AH!==it&&this._$AR(),this._$AH=it):t!==this._$AH&&t!==et&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>N(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==it&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:s}=t,o="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=S.createElement(rt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===o)this._$AH.p(e);else{const t=new R(o,this),s=t.u(this.options);t.p(e),this.T(s),this._$AH=t}}_$AC(t){let e=st.get(t.strings);return void 0===e&&st.set(t.strings,e=new S(t)),e}k(t){N(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,o=0;for(const r of t)o===e.length?e.push(s=new k(this.O(O()),this.O(O()),this,this.options)):s=e[o],s._$AI(r),o++;o<e.length&&(this._$AR(s&&s._$AB.nextSibling,o),e.length=o)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){const e=A(t).nextSibling;A(t).remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class H{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,o,r){this.type=1,this._$AH=it,this._$AN=void 0,this.element=t,this.name=e,this._$AM=o,this.options=r,s.length>2||""!==s[0]||""!==s[1]?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=it}_$AI(t,e=this,s,o){const r=this.strings;let a=!1;if(void 0===r)t=at(this,t,e,0),a=!D(t)||t!==this._$AH&&t!==et,a&&(this._$AH=t);else{const o=t;let l,d;for(t=r[0],l=0;l<r.length-1;l++)d=at(this,o[s+l],e,l),d===et&&(d=this._$AH[l]),a||=!D(d)||d!==this._$AH[l],d===it?t=it:t!==it&&(t+=(d??"")+r[l+1]),this._$AH[l]=d}a&&!o&&this.j(t)}j(t){t===it?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class I extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===it?void 0:t}}class L extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==it)}}class z extends H{constructor(t,e,s,o,r){super(t,e,s,o,r),this.type=5}_$AI(t,e=this){if((t=at(this,t,e,0)??it)===et)return;const s=this._$AH,o=t===it&&s!==it||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==it&&(s===it||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class Z{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){at(this,t)}}const lt=q.litHtmlPolyfillSupport;lt?.(S,k),(q.litHtmlVersions??=[]).push("3.3.2");const dt=globalThis;
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */class i extends Q{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,s)=>{const o=s?.renderBefore??e;let r=o._$litPart$;if(void 0===r){const t=s?.renderBefore??null;o._$litPart$=r=new k(e.insertBefore(O(),t),t,void 0,s??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return et}}i._$litElement$=!0,i.finalized=!0,dt.litElementHydrateSupport?.({LitElement:i});const ct=dt.litElementPolyfillSupport;ct?.({LitElement:i}),(dt.litElementVersions??=[]).push("4.2.2");
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */
const pt=t=>(e,s)=>{void 0!==s?s.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)},ht={attribute:!0,type:String,converter:$,reflect:!1,hasChanged:C},ut=(t=ht,e,s)=>{const{kind:o,metadata:r}=s;let a=globalThis.litPropertyMetadata.get(r);if(void 0===a&&globalThis.litPropertyMetadata.set(r,a=new Map),"setter"===o&&((t=Object.create(t)).wrapped=!0),a.set(s.name,t),"accessor"===o){const{name:o}=s;return{set(s){const r=e.get.call(this);e.set.call(this,s),this.requestUpdate(o,r,t,!0,s)},init(e){return void 0!==e&&this.C(o,void 0,t,e),e}}}if("setter"===o){const{name:o}=s;return function(s){const r=this[o];e.call(this,s),this.requestUpdate(o,r,t,!0,s)}}throw Error("Unsupported decorator location: "+o)};
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */function gt(t){return(e,s)=>"object"==typeof s?ut(t,e,s):((t,e,s)=>{const o=e.hasOwnProperty(s);return e.constructor.createProperty(s,t),o?Object.getOwnPropertyDescriptor(e,s):void 0})(t,e,s)}
/**
   * @license
   * Copyright 2017 Google LLC
   * SPDX-License-Identifier: BSD-3-Clause
   */function mt(t){return gt({...t,state:!0,attribute:!1})}function ft(){return"undefined"!=typeof window&&window.__BULK_CONFIG__?.proxyBase?window.__BULK_CONFIG__.proxyBase:"undefined"!=typeof window&&"localhost"===window.location.hostname?"3000"===window.location.port?"https://light-cow-51.andrewhartfordbac.deno.net":"":"https://light-cow-51.andrewhartfordbac.deno.net"}const yt={proxyBase:ft(),sheetsProxyUrl:function(){if("undefined"!=typeof window&&window.__BULK_CONFIG__?.sheetsProxyUrl)return window.__BULK_CONFIG__.sheetsProxyUrl;try{return"https://light-cow-51.andrewhartfordbac.deno.net/sheets"}catch{}return ft()+"/api/sheets"}(),cacheTtl:6e5,sessionPrefix:"bulk-config-"},bt=yt.sheetsProxyUrl,xt=yt.cacheTtl,vt=[{id:"front-only",name:"Front Only",sidedness:"one-sided"},{id:"back-only",name:"Back Only",sidedness:"one-sided"},{id:"left-chest",name:"Left Chest",sidedness:"one-sided"},{id:"right-chest",name:"Right Chest",sidedness:"one-sided"},{id:"full-front-full-back",name:"Full Front + Full Back",sidedness:"two-sided"},{id:"full-front-left-chest",name:"Full Front + Left Chest",sidedness:"two-sided"}],wt=[{size:"XS",sizeTier:"standard",sortOrder:1},{size:"S",sizeTier:"standard",sortOrder:2},{size:"M",sizeTier:"standard",sortOrder:3},{size:"L",sizeTier:"standard",sortOrder:4},{size:"XL",sizeTier:"standard",sortOrder:5},{size:"2XL",sizeTier:"2x",sortOrder:6},{size:"3XL",sizeTier:"3x",sortOrder:7},{size:"4XL",sizeTier:"4x",sortOrder:8}],$t=[{id:"standard-unisex",name:"Standard Unisex",brand:"Unisex G64000",tabName:"Standard Unisex",maxSize:"4XL"},{id:"standard-womens",name:"Standard Women's",brand:"Ladies G6400",tabName:"Standard Women's",maxSize:"2XL"},{id:"premium-unisex",name:"Premium Unisex",brand:"Unisex 3001 Canvas",tabName:"Premium Unisex",maxSize:"4XL"},{id:"premium-womens",name:"Premium Women's",brand:"Ladies 6400 Bella",tabName:"Premium Women's",maxSize:"2XL"},{id:"usa-premium-unisex",name:"USA-made Premium Unisex",brand:"Unisex 5001 Royal Apparel",tabName:"USA-made Premium Unisex",maxSize:"4XL"},{id:"usa-premium-womens",name:"USA-made Premium Women's",brand:"Women's 5001W Royal Apparel",tabName:"USA-made Premium Women's",maxSize:"2XL"}];function kt(t){const e=$t.find(e=>e.id===t);if(!e)return wt;const s=wt.find(t=>t.size===e.maxSize)?.sortOrder||99;return wt.filter(t=>t.sortOrder<=s)}let St=null;function Ct(t){const e={};if(!t||t.length<2)return e;const s=t[0],o=[];for(let a=1;a<s.length;a++){const t=s[a];"number"==typeof t&&o.push(t)}const r={NET:"standard","NET 2X":"2x","NET 3X":"3x","NET 4X":"4x"};for(let a=1;a<t.length;a++){const s=t[a];if(!s||!s[0])continue;const l=r[String(s[0]).trim().toUpperCase()];if(!l)continue;const d=[];for(let t=0;t<o.length;t++){const e=s[t+1];if(null==e||""===e)continue;const r="number"==typeof e?e:parseFloat(String(e).replace("$",""));isNaN(r)||d.push({minQty:o[t],maxQty:o[t+1]?o[t+1]-1:null,netPrice:r})}e[l]=d}return e}function Pt(t){const e={},s=[],o=[];let r=-1;for(let a=0;a<t.length;a++){const e=String(t[a]?.[0]||"").trim().toLowerCase();"dark one-sided"===e?o.push({type:"dark-one-sided",startRow:a}):"light one-sided"===e?o.push({type:"light-one-sided",startRow:a}):"dark two-sided"===e?o.push({type:"dark-two-sided",startRow:a}):"light two-sided"===e?o.push({type:"light-two-sided",startRow:a}):"garment color"===e&&(r=a)}for(const a of o){const s=t.slice(a.startRow+1,a.startRow+6);e[a.type]=Ct(s)}if(r>=0)for(let a=r+2;a<t.length;a++){const e=t[a];if(!e||e.length<3)continue;if("Y"!==String(e[0]||"").trim().toUpperCase())continue;const o=String(e[1]||"").trim();let r=String(e[2]||"").trim();"number"==typeof e[2]&&(r=String(e[2]).padStart(6,"0"));const l=r.replace("#",""),d=(299*(parseInt(l.substring(0,2),16)||0)+587*(parseInt(l.substring(2,4),16)||0)+114*(parseInt(l.substring(4,6),16)||0))/1e3>160?"light":"dark";s.push({name:o,hex:l,brightness:d})}return{pricing:e,colors:s}}async function zt(){const t=function(){if(St&&Date.now()-St.fetchedAt<xt)return St;try{const t=sessionStorage.getItem("bulk-tshirt-data");if(!t)return null;const e=JSON.parse(t);return Date.now()-e.fetchedAt>xt?null:(St=e,St)}catch{return null}}();if(t)return t;try{const t=await fetch(bt);if(!t.ok)throw new Error("Proxy error: "+t.status);const e=await t.json(),s={},o={};for(const a of $t){const t=e.tabs[a.tabName];if(!t){console.warn("Tab not found: "+a.tabName);continue}const r=Pt(t);o[a.id]=r.pricing,s[a.id]=r.colors,console.log("Parsed "+a.tabName+": "+Object.keys(r.pricing).length+" pricing sections, "+r.colors.length+" colors")}const r={styles:$t,sizes:wt,printLocations:vt,colors:s,pricing:o,fetchedAt:Date.now()};return function(t){St=t;try{sessionStorage.setItem("bulk-tshirt-data",JSON.stringify(t))}catch{}}(r),console.log("Sheet data loaded and cached"),r}catch(e){return console.error("Failed to load sheet data:",e),{styles:$t,sizes:wt,printLocations:vt,colors:{},pricing:{},fetchedAt:Date.now()}}}function Qt(t,e,s,o,r,a){const l=r.printLocations.find(t=>t.id===e),d=l?l.sidedness:"one-sided",c=s.replace("#",""),p=((299*(parseInt(c.substring(0,2),16)||0)+587*(parseInt(c.substring(2,4),16)||0)+114*(parseInt(c.substring(4,6),16)||0))/1e3>160?"light":"dark")+"-"+d,h=r.pricing[t];if(!h)return{printType:p,lines:[],totalQuantity:0,totalPrice:0};const u=h[p];if(!u)return{printType:p,lines:[],totalQuantity:0,totalPrice:0};const g=o.reduce((t,e)=>t+e.quantity,0),m=null!=a?a:g,f=[];let b=0,x=0;for(const v of o){if(v.quantity<=0)continue;const t=u[v.sizeTier];if(!t||0===t.length)continue;let e=null;for(const r of t){if(!(m>=r.minQty))break;e=r}e||(e=t[0]);const s=Math.round(100*e.netPrice)/100,o=Math.round(s*v.quantity*100)/100;f.push({size:v.size,sizeTier:v.sizeTier,quantity:v.quantity,unitPrice:s,lineTotal:o}),b+=v.quantity,x+=o}return{printType:p,lines:f,totalQuantity:b,totalPrice:Math.round(100*x)/100}}var qt=Object.defineProperty,At=Object.getOwnPropertyDescriptor,Ft=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?At(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&qt(e,s,a),a};let It=class extends i{constructor(){super(...arguments),this.productType="tshirt",this.sheetData=null,this.loading=!0,this.tiers=[],this.printLocations=[],this.selectedLocationId="",this.selectedTier="",this.selectedFit="",this.selectedColor=null,this.selectedUnisexColor=null,this.selectedWomensColor=null,this.displayColors=[],this.unisexColors=[],this.womensColors=[],this.unisexSizes=[],this.womensSizes=[],this.unisexQuantities={},this.womensQuantities={},this.priceLines=[],this.totalQty=0,this.totalPrice="",this.showValidation=!1,this.fitOptions=[{id:"unisex",name:"Unisex"},{id:"womens",name:"Women's"},{id:"both",name:"Unisex and Women's"}]}get unisexStyleId(){return this.selectedTier+"-unisex"}get womensStyleId(){return this.selectedTier+"-womens"}get unisexBrand(){if(!this.sheetData)return"";const t=this.sheetData.styles.find(t=>t.id===this.unisexStyleId);return t?t.brand:""}get womensBrand(){if(!this.sheetData)return"";const t=this.sheetData.styles.find(t=>t.id===this.womensStyleId);return t?t.brand:""}get hasSelections(){return!(!this.selectedTier||!this.selectedFit)}get showUnisexSizes(){return"unisex"===this.selectedFit||"both"===this.selectedFit}get showWomensSizes(){return"womens"===this.selectedFit||"both"===this.selectedFit}get isBothFit(){return"both"===this.selectedFit}get effectiveUnisexColor(){return this.isBothFit?this.selectedUnisexColor:this.selectedColor}get effectiveWomensColor(){return this.isBothFit?this.selectedWomensColor:this.selectedColor}get locationValid(){return!!this.selectedLocationId}get tierValid(){return!!this.selectedTier}get fitValid(){return!!this.selectedFit}get colorValid(){return this.isBothFit?!!this.selectedUnisexColor&&!!this.selectedWomensColor:!!this.selectedColor}get quantityValid(){return this.computeTotalQty()>0}get allValid(){return this.locationValid&&this.tierValid&&this.fitValid&&this.colorValid&&this.quantityValid}computeTotalQty(){return Object.values(this.unisexQuantities).reduce((t,e)=>t+e,0)+Object.values(this.womensQuantities).reduce((t,e)=>t+e,0)}getSelectedLocationSidedness(){if(!this.sheetData)return"one-sided";const t=this.sheetData.printLocations.find(t=>t.id===this.selectedLocationId);return t?t.sidedness:"one-sided"}validate(){if(this.showValidation=!0,!this.allValid){const t=this.shadowRoot?.querySelector(".card.invalid-highlight");return t&&t.scrollIntoView({behavior:"smooth",block:"center"}),!1}return!0}async connectedCallback(){super.connectedCallback(),this.loading=!0;try{this.sheetData=await zt(),this.printLocations=this.sheetData.printLocations,this.deriveTiers()}catch(t){console.error("Failed to load data:",t)}this.loading=!1}deriveTiers(){if(!this.sheetData)return;const t=new Map;for(const e of this.sheetData.styles){const s=e.id.replace(/-unisex$/,"").replace(/-womens$/,"");if(!t.has(s)){const o=e.name.replace(/ Unisex$/,"").replace(/ Women's$/,"").trim();t.set(s,o)}}this.tiers=Array.from(t.entries()).map(([t,e])=>({id:t,name:e}))}resetColorsAndBelow(){this.selectedColor=null,this.selectedUnisexColor=null,this.selectedWomensColor=null,this.displayColors=[],this.unisexColors=[],this.womensColors=[],this.unisexQuantities={},this.womensQuantities={},this.priceLines=[],this.totalQty=0,this.totalPrice=""}onLocationChange(t){this.selectedLocationId=t.target.value,this.dispatchEvent(new CustomEvent("step-data",{detail:{printLocationId:this.selectedLocationId,printLocationSidedness:this.getSelectedLocationSidedness()},bubbles:!0,composed:!0})),this.doPrice()}onTierChange(t){this.selectedTier=t.target.value,this.selectedFit="",this.resetColorsAndBelow(),this.dispatchEvent(new CustomEvent("step-data",{detail:{tier:this.selectedTier,fit:""},bubbles:!0,composed:!0}))}onFitChange(t){this.selectedFit=t.target.value,this.resetColorsAndBelow(),this.sheetData&&this.selectedTier&&this.selectedFit&&("unisex"===this.selectedFit?(this.displayColors=this.sheetData.colors[this.unisexStyleId]||[],this.unisexSizes=kt(this.unisexStyleId)):"womens"===this.selectedFit?(this.displayColors=this.sheetData.colors[this.womensStyleId]||[],this.womensSizes=kt(this.womensStyleId)):"both"===this.selectedFit&&(this.unisexColors=this.sheetData.colors[this.unisexStyleId]||[],this.womensColors=this.sheetData.colors[this.womensStyleId]||[],this.unisexSizes=kt(this.unisexStyleId),this.womensSizes=kt(this.womensStyleId)),this.dispatchEvent(new CustomEvent("step-data",{detail:{fit:this.selectedFit,printLocationId:this.selectedLocationId},bubbles:!0,composed:!0})))}onColorSelect(t){this.selectedColor=t,this.doPrice()}onUnisexColorSelect(t){this.selectedUnisexColor=t,this.doPrice()}onWomensColorSelect(t){this.selectedWomensColor=t,this.doPrice()}onUnisexQtyChange(t,e){this.unisexQuantities={...this.unisexQuantities,[t.size]:parseInt(e)||0},this.doPrice()}onWomensQtyChange(t,e){this.womensQuantities={...this.womensQuantities,[t.size]:parseInt(e)||0},this.doPrice()}doPrice(){if(!this.sheetData)return;this.totalQty=this.computeTotalQty();const t=this.isBothFit?!(!this.selectedUnisexColor||!this.selectedWomensColor):!!this.selectedColor;if(!this.selectedTier||!this.selectedFit||!this.selectedLocationId||!t||this.totalQty<1)return this.priceLines=[],this.totalPrice="",void this.dispatchStepData(null,null);const e=this.sheetData.sizes,s=this.totalQty,o=this.effectiveUnisexColor?.hex||"",r=this.effectiveWomensColor?.hex||"",a=this.showUnisexSizes?e.filter(t=>(this.unisexQuantities[t.size]||0)>0).map(t=>({size:t.size,sizeTier:t.sizeTier,quantity:this.unisexQuantities[t.size]})):[],l=this.showWomensSizes?e.filter(t=>(this.womensQuantities[t.size]||0)>0).map(t=>({size:t.size,sizeTier:t.sizeTier,quantity:this.womensQuantities[t.size]})):[],d=a.length>0?Qt(this.unisexStyleId,this.selectedLocationId,o,a,this.sheetData,s):null,c=l.length>0?Qt(this.womensStyleId,this.selectedLocationId,r,l,this.sheetData,s):null,p=[];let h=0,u=0;if(d){const t="both"===this.selectedFit?"Unisex ":"";for(const e of d.lines)p.push({label:t+e.size+" × "+e.quantity,priceEach:"$"+e.unitPrice.toFixed(2),priceLine:"$"+e.lineTotal.toFixed(2)});h+=d.totalPrice,u+=d.totalQuantity}if(c){const t="both"===this.selectedFit?"Women's ":"";for(const e of c.lines)p.push({label:t+e.size+" × "+e.quantity,priceEach:"$"+e.unitPrice.toFixed(2),priceLine:"$"+e.lineTotal.toFixed(2)});h+=c.totalPrice,u+=c.totalQuantity}this.priceLines=p,this.totalQty=u,this.totalPrice="$"+h.toFixed(2),this.dispatchStepData(d,c)}dispatchStepData(t,e){const s=(t?.totalPrice||0)+(e?.totalPrice||0),o=(t?.totalQuantity||0)+(e?.totalQuantity||0);this.dispatchEvent(new CustomEvent("step-data",{detail:{tier:this.selectedTier,fit:this.selectedFit,printLocationId:this.selectedLocationId,printLocationSidedness:this.getSelectedLocationSidedness(),color:this.isBothFit?null:this.selectedColor,unisexColor:this.isBothFit?this.selectedUnisexColor:this.selectedColor,womensColor:this.isBothFit?this.selectedWomensColor:this.selectedColor,unisexStyleId:this.showUnisexSizes?this.unisexStyleId:null,womensStyleId:this.showWomensSizes?this.womensStyleId:null,unisexQuantities:this.showUnisexSizes?this.unisexQuantities:null,womensQuantities:this.showWomensSizes?this.womensQuantities:null,priceResult:s>0?{unisex:t,womens:e,totalQuantity:o,totalPrice:s}:null},bubbles:!0,composed:!0}))}cardClass(t){return this.showValidation?"card"+(t?" valid":" invalid-highlight"):"card"+(t?" valid":"")}statusIcon(t){return t?"✓":""}statusClass(t){return"status "+(t?"done":"needed")}renderChecklist(){const t=[{label:"Print Location",done:this.locationValid},{label:"Garment Type",done:this.tierValid},{label:"Garment Style",done:this.fitValid},{label:"Garment Color",done:this.colorValid},{label:"Sizes & Quantities (at least 1)",done:this.quantityValid}];return t.every(t=>t.done)?tt``:tt`
      <div class="checklist">
        <div class="checklist-title">📋 Complete these to see your quote:</div>
        ${t.map(t=>tt`
            <div class="checklist-item ${t.done?"done":"pending"}">
              <span class="icon">${t.done?"✅":"⬜"}</span>
              <span class="label">${t.label}</span>
            </div>
          `)}
      </div>
    `}renderColorSection(){return this.hasSelections?this.isBothFit?tt`
        <div class="${this.cardClass(this.colorValid)}">
          <div class="card-header">
            <span>Garment Color</span>
            <span class="${this.statusClass(this.colorValid)}">
              ${this.statusIcon(this.colorValid)}
            </span>
          </div>
          <div class="card-body">
            <div class="color-section">
              <div class="color-section-title">Unisex Color</div>
              <div class="color-section-selected">
                Selected:
                <strong>${this.selectedUnisexColor?this.selectedUnisexColor.name:"None — pick a color"}</strong>
              </div>
              ${this.unisexColors.length>0?tt`
                    <div class="colors">
                      ${this.unisexColors.map(t=>tt`
                          <div
                            class="swatch ${this.selectedUnisexColor&&this.selectedUnisexColor.hex===t.hex?"picked":""} ${"light"===t.brightness?"lt":""}"
                            style="background-color: #${t.hex}"
                            title=${t.name}
                            @click=${()=>this.onUnisexColorSelect(t)}
                          ></div>
                        `)}
                    </div>
                  `:tt`<p>No colors available.</p>`}
            </div>

            <hr class="color-divider" />

            <div class="color-section">
              <div class="color-section-title">Women's Color</div>
              <div class="color-section-selected">
                Selected:
                <strong>${this.selectedWomensColor?this.selectedWomensColor.name:"None — pick a color"}</strong>
              </div>
              ${this.womensColors.length>0?tt`
                    <div class="colors">
                      ${this.womensColors.map(t=>tt`
                          <div
                            class="swatch ${this.selectedWomensColor&&this.selectedWomensColor.hex===t.hex?"picked":""} ${"light"===t.brightness?"lt":""}"
                            style="background-color: #${t.hex}"
                            title=${t.name}
                            @click=${()=>this.onWomensColorSelect(t)}
                          ></div>
                        `)}
                    </div>
                  `:tt`<p>No colors available.</p>`}
            </div>
          </div>
        </div>
      `:tt`
      <div class="${this.cardClass(this.colorValid)}">
        <div class="card-header">
          <span>Garment Color</span>
          <span class="${this.statusClass(this.colorValid)}">
            ${this.statusIcon(this.colorValid)}
          </span>
        </div>
        <div class="card-body">
          <p>
            Selected Color:
            <strong>${this.selectedColor?this.selectedColor.name:"None — please pick a color"}</strong>
          </p>
          ${this.displayColors.length>0?tt`
                <div class="colors">
                  ${this.displayColors.map(t=>tt`
                      <div
                        class="swatch ${this.selectedColor&&this.selectedColor.hex===t.hex?"picked":""} ${"light"===t.brightness?"lt":""}"
                        style="background-color: #${t.hex}"
                        title=${t.name}
                        @click=${()=>this.onColorSelect(t)}
                      ></div>
                    `)}
                </div>
              `:tt`<p>No colors available for this combination.</p>`}
        </div>
      </div>
    `:tt``}renderPriceArea(){if(this.priceLines.length>0)return tt`
        <div class="pricebox">
          ${this.priceLines.map(t=>tt`
              <div class="prow">
                <span class="prow-size">${t.label}</span>
                <span>@ ${t.priceEach} = ${t.priceLine}</span>
              </div>
            `)}
          <div class="ptotal">
            <span>Total (${this.totalQty} items)</span>
            <span>${this.totalPrice}</span>
          </div>
        </div>
      `;if(this.hasSelections){const t=[];if(this.colorValid||t.push("select a color"),this.quantityValid||t.push("enter quantities"),this.locationValid||t.push("choose a print location"),t.length>0)return tt`<div class="price-prompt">
          👆 Please
          <strong>${t.join("</strong> and <strong>")}</strong> to see your
          live quote
        </div>`}return tt``}render(){return this.loading?tt`<div class="loading">Loading pricing data...</div>`:tt`
      ${this.renderChecklist()}
      <div class="${this.cardClass(this.locationValid)}">
        <div class="card-header">
          <span>Print Location</span>
          <span class="${this.statusClass(this.locationValid)}">
            ${this.statusIcon(this.locationValid)}
          </span>
        </div>
        <div class="card-body">
          <select
            @change=${this.onLocationChange}
            .value=${this.selectedLocationId}
          >
            <option value="">— Select Print Location —</option>
            ${this.printLocations.map(t=>tt`<option
                  value=${t.id}
                  ?selected=${this.selectedLocationId===t.id}
                >
                  ${t.name}
                </option>`)}
          </select>
        </div>
      </div>
      <div class="${this.cardClass(this.tierValid)}">
        <div class="card-header">
          <span>Garment Type</span>
          <span class="${this.statusClass(this.tierValid)}">
            ${this.statusIcon(this.tierValid)}
          </span>
        </div>
        <div class="card-body">
          <select @change=${this.onTierChange} .value=${this.selectedTier}>
            <option value="">— Select Type —</option>
            ${this.tiers.map(t=>tt`<option
                  value=${t.id}
                  ?selected=${this.selectedTier===t.id}
                >
                  ${t.name}
                </option>`)}
          </select>
        </div>
      </div>
      ${this.selectedTier?tt`
            <div class="${this.cardClass(this.fitValid)}">
              <div class="card-header">
                <span>Garment Style</span>
                <span class="${this.statusClass(this.fitValid)}">
                  ${this.statusIcon(this.fitValid)}
                </span>
              </div>
              <div class="card-body">
                <select @change=${this.onFitChange} .value=${this.selectedFit}>
                  <option value="">— Select Style —</option>
                  ${this.fitOptions.map(t=>tt`<option
                        value=${t.id}
                        ?selected=${this.selectedFit===t.id}
                      >
                        ${t.name}
                      </option>`)}
                </select>
              </div>
            </div>
          `:tt``}
      ${this.hasSelections?tt`
            ${this.renderColorSection()}
            <div class="${this.cardClass(this.quantityValid)}">
              <div class="card-header">
                <span>Sizes and Quantities</span>
                <span class="${this.statusClass(this.quantityValid)}">
                  ${this.statusIcon(this.quantityValid)}
                </span>
              </div>
              <div class="card-body">
                ${this.showUnisexSizes?tt`
                      <div class="size-group">
                        <p class="size-group-title">
                          Unisex
                          Sizes${this.unisexBrand?" ("+this.unisexBrand+")":""}
                        </p>
                        <div class="sizes">
                          ${this.unisexSizes.map(t=>tt`
                              <div class="sz">
                                <label>${t.size}</label>
                                <input
                                  type="number"
                                  min="0"
                                  .value=${String(this.unisexQuantities[t.size]||"")}
                                  placeholder="0"
                                  @input=${e=>this.onUnisexQtyChange(t,e.target.value)}
                                />
                              </div>
                            `)}
                        </div>
                      </div>
                    `:tt``}
                ${this.showWomensSizes?tt`
                      <div class="size-group">
                        <p class="size-group-title">
                          Women's
                          Sizes${this.womensBrand?" ("+this.womensBrand+")":""}
                        </p>
                        <div class="sizes">
                          ${this.womensSizes.map(t=>tt`
                              <div class="sz">
                                <label>${t.size}</label>
                                <input
                                  type="number"
                                  min="0"
                                  .value=${String(this.womensQuantities[t.size]||"")}
                                  placeholder="0"
                                  @input=${e=>this.onWomensQtyChange(t,e.target.value)}
                                />
                              </div>
                            `)}
                        </div>
                      </div>
                    `:tt``}
                <div class="qty-summary">
                  Total Quantity: <strong>${this.computeTotalQty()}</strong>
                  ${0===this.computeTotalQty()?tt` <span style="color: #e67e22;"
                        >— enter at least 1</span
                      >`:tt``}
                </div>
              </div>
            </div>
            ${this.renderPriceArea()}
          `:tt``}
    `}};It.styles=l`
    :host {
      display: block;
      font-family: inherit;
    }
    .card {
      margin-bottom: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.3s;
    }
    .card.valid {
      border-color: #2ecc71;
    }
    .card.invalid-highlight {
      border-color: #e74c3c;
      animation: shake 0.4s ease-in-out;
    }
    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-4px);
      }
      75% {
        transform: translateX(4px);
      }
    }
    .card-header {
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafafa;
      border-bottom: 1px solid #e0e0e0;
    }
    .card-header .status {
      font-size: 13px;
      font-weight: 400;
    }
    .card-header .status.done {
      color: #2ecc71;
    }
    .card-header .status.needed {
      color: #e74c3c;
    }
    .card-body {
      padding: 16px;
    }
    select {
      padding: 8px 12px;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 4px;
      min-width: 200px;
    }
    select:focus {
      border-color: #4ecdc4;
      outline: none;
    }
    .colors {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 8px;
    }
    .swatch {
      width: 32px;
      height: 32px;
      border-radius: 4px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s;
    }
    .swatch:hover {
      opacity: 0.8;
      transform: scale(1.1);
    }
    .swatch.picked {
      border-color: #333;
      outline: 2px solid #333;
    }
    .swatch.lt {
      border-color: #ddd;
    }
    .color-section {
      margin-bottom: 16px;
    }
    .color-section-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 6px;
      color: #555;
    }
    .color-section-selected {
      font-size: 13px;
      color: #888;
      margin-bottom: 6px;
    }
    .color-section-selected strong {
      color: #333;
    }
    .color-divider {
      border: none;
      border-top: 1px solid #e0e0e0;
      margin: 12px 0;
    }
    .size-group {
      margin-bottom: 16px;
    }
    .size-group-title {
      text-align: center;
      font-weight: 600;
      margin-bottom: 12px;
    }
    .sizes {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      justify-content: center;
    }
    .sz {
      display: flex;
      align-items: center;
    }
    .sz label {
      padding: 6px 12px;
      font-weight: 600;
      font-size: 13px;
      min-width: 32px;
      text-align: center;
    }
    .sz input {
      width: 50px;
      padding: 6px;
      font-size: 13px;
      border: 1px solid #ccc;
      text-align: center;
      border-radius: 4px;
    }
    .sz input:focus {
      border-color: #4ecdc4;
      outline: none;
    }
    .pricebox {
      padding: 16px;
      margin-top: 16px;
      background: #f5f5f5;
      border-radius: 6px;
      border: 1px solid #e0e0e0;
    }
    .prow {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      font-size: 14px;
    }
    .prow-size {
      font-weight: 600;
    }
    .ptotal {
      display: flex;
      justify-content: space-between;
      border-top: 2px solid #333;
      margin-top: 8px;
      padding-top: 8px;
      font-weight: 700;
      font-size: 18px;
    }
    .loading {
      text-align: center;
      padding: 20px;
      color: #999;
    }
    .price-prompt {
      margin-top: 16px;
      padding: 16px;
      background: #f0f0f0;
      border-radius: 6px;
      text-align: center;
      color: #888;
      font-size: 14px;
      border: 1px dashed #ccc;
    }
    .price-prompt strong {
      color: #e67e22;
    }
    .qty-summary {
      text-align: center;
      margin-top: 12px;
      padding: 8px;
      background: #e8f8f5;
      border-radius: 4px;
    }
    .checklist {
      margin-top: 16px;
      padding: 16px;
      background: #fff9e6;
      border: 1px solid #f0d060;
      border-radius: 6px;
    }
    .checklist-title {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 8px;
      color: #333;
    }
    .checklist-item {
      padding: 4px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .checklist-item .icon {
      font-size: 16px;
      width: 20px;
      text-align: center;
    }
    .checklist-item.done {
      color: #2ecc71;
    }
    .checklist-item.done .label {
      text-decoration: line-through;
      color: #999;
    }
    .checklist-item.pending {
      color: #e67e22;
    }
  `,Ft([gt({type:String})],It.prototype,"productType",2),Ft([mt()],It.prototype,"sheetData",2),Ft([mt()],It.prototype,"loading",2),Ft([mt()],It.prototype,"tiers",2),Ft([mt()],It.prototype,"printLocations",2),Ft([mt()],It.prototype,"selectedLocationId",2),Ft([mt()],It.prototype,"selectedTier",2),Ft([mt()],It.prototype,"selectedFit",2),Ft([mt()],It.prototype,"selectedColor",2),Ft([mt()],It.prototype,"selectedUnisexColor",2),Ft([mt()],It.prototype,"selectedWomensColor",2),Ft([mt()],It.prototype,"displayColors",2),Ft([mt()],It.prototype,"unisexColors",2),Ft([mt()],It.prototype,"womensColors",2),Ft([mt()],It.prototype,"unisexSizes",2),Ft([mt()],It.prototype,"womensSizes",2),Ft([mt()],It.prototype,"unisexQuantities",2),Ft([mt()],It.prototype,"womensQuantities",2),Ft([mt()],It.prototype,"priceLines",2),Ft([mt()],It.prototype,"totalQty",2),Ft([mt()],It.prototype,"totalPrice",2),Ft([mt()],It.prototype,"showValidation",2),It=Ft([pt("step-tshirt-garment")],It);const Tt=[{id:"square",name:"Square",basePrice:.45,areaCalc:"rect"},{id:"rectangle",name:"Rectangle",basePrice:.45,areaCalc:"rect"},{id:"circle",name:"Circle",basePrice:.54,areaCalc:"circle"},{id:"oval",name:"Oval",basePrice:.54,areaCalc:"oval"},{id:"die-cut",name:"Die Cut",basePrice:.6,areaCalc:"rect"},{id:"bumper",name:"Bumper Sticker",basePrice:.45,areaCalc:"rect"},{id:"rounded-corner",name:"Rounded Corner",basePrice:.54,areaCalc:"rect"},{id:"sticker-sheet",name:"Sticker Sheets",basePrice:.77,areaCalc:"rect"}],Vt="Customer Service will be in contact regarding holographic design options before proofs.",_t=[{id:"gloss",name:"Gloss",multiplier:1,isHolographic:!1},{id:"matte",name:"Matte",multiplier:1,isHolographic:!1},{id:"mirror-holographic",name:"Mirror Holographic",multiplier:1.75,isHolographic:!0,note:Vt},{id:"glitter-holographic",name:"Glitter Holographic",multiplier:1.75,isHolographic:!0,note:Vt}],Et=[{minTensSqIn:2,discountPct:4.75},{minTensSqIn:251,discountPct:16.25},{minTensSqIn:501,discountPct:30.75},{minTensSqIn:751,discountPct:42.25},{minTensSqIn:1001,discountPct:48},{minTensSqIn:1501,discountPct:50.75},{minTensSqIn:1801,discountPct:53.25},{minTensSqIn:2101,discountPct:56.25},{minTensSqIn:2501,discountPct:57.25},{minTensSqIn:3701,discountPct:61.25},{minTensSqIn:5001,discountPct:63},{minTensSqIn:10001,discountPct:64.25},{minTensSqIn:20001,discountPct:65.5}];function Ut(t,e,s){switch(s){case"circle":return Math.PI*Math.pow(t/2,2);case"oval":return Math.PI*(t/2)*(e/2);default:return t*e}}function Lt(t,e,s,o,r){if(o<=0||e<=0)return null;const a=Tt.find(e=>e.id===t);if(!a)return null;const l=_t.find(t=>t.id===r);if(!l)return null;const d="circle"===a.areaCalc||"square"===a.id?e:s>0?s:e,c=Ut(e,d,a.areaCalc),p=c/10,h=p*o,u=function(t){let e=Et[0];for(const s of Et){if(!(t>=s.minTensSqIn))break;e=s}return e}(h),g=u.discountPct,m=a.basePrice*(1-g/100),f=Math.round(p*m*l.multiplier*100)/100,b=Math.round(f*o*100)/100,x=l.isHolographic?150:75,v=b>=x;return{shape:a,widthIn:e,heightIn:d,stickerAreaSqIn:Math.round(100*c)/100,tensSqInPerSticker:Math.round(1e3*p)/1e3,quantity:o,totalTensSqIn:Math.round(100*h)/100,finish:l,basePricePer10SqIn:a.basePrice,discountPct:g,discountedPricePer10SqIn:Math.round(100*m)/100,unitPrice:f,totalPrice:b,orderMinimum:x,meetsMinimum:v}}var Mt=Object.defineProperty,Ot=Object.getOwnPropertyDescriptor,Dt=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?Ot(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&Mt(e,s,a),a};const Nt=[{label:"2 × 2",width:2,height:2},{label:"3 × 3",width:3,height:3},{label:"3.5 × 3.5",width:3.5,height:3.5},{label:"4 × 4",width:4,height:4},{label:"5 × 5",width:5,height:5},{label:"6 × 6",width:6,height:6}],Rt=[100,200,300,500,1e3,2500,5e3,1e4];function Bt(t){return"$"+t.toFixed(2)}let Ht=class extends i{constructor(){super(...arguments),this.selectedShape=null,this.sizeMode="preset",this.selectedPresetIndex=-1,this.customWidth=0,this.customHeight=0,this.qtyMode="preset",this.selectedQtyIndex=-1,this.customQty=0,this.selectedFinish=null,this.priceResult=null,this.showValidation=!1,this.shapeIcons={square:"⬜",rectangle:"▬",circle:"⚫",oval:"⬭","die-cut":"✂️",bumper:"🚗","rounded-corner":"▢","sticker-sheet":"📄"}}get widthIn(){return"preset"===this.sizeMode&&this.selectedPresetIndex>=0?Nt[this.selectedPresetIndex].width:this.customWidth}get heightIn(){return"preset"===this.sizeMode&&this.selectedPresetIndex>=0?Nt[this.selectedPresetIndex].height:this.customHeight}get quantity(){return"preset"===this.qtyMode&&this.selectedQtyIndex>=0?Rt[this.selectedQtyIndex]:this.customQty}get needsHeight(){return!this.selectedShape||"square"!==this.selectedShape.id&&"circle"!==this.selectedShape.areaCalc}get customWidthValid(){return"custom"!==this.sizeMode||this.customWidth>=2}get customHeightValid(){return"custom"!==this.sizeMode||(!this.needsHeight||this.customHeight>=2)}get shapeValid(){return!!this.selectedShape}get sizeValid(){return"preset"===this.sizeMode?this.selectedPresetIndex>=0:!!this.customWidthValid&&(!(this.needsHeight&&!this.customHeightValid)&&this.widthIn>0)}get quantityValid(){return this.quantity>0}get finishValid(){return!!this.selectedFinish}get allValid(){return this.shapeValid&&this.sizeValid&&this.quantityValid&&this.finishValid}validate(){if(this.showValidation=!0,!this.allValid){const t=this.shadowRoot?.querySelector(".card.invalid-highlight");return t&&t.scrollIntoView({behavior:"smooth",block:"center"}),!1}return!(this.priceResult&&!this.priceResult.meetsMinimum)}onShapeSelect(t){this.selectedShape=t,this.doPrice()}onPresetSizeSelect(t){this.sizeMode="preset",this.selectedPresetIndex=t,this.doPrice()}onCustomSizeClick(){this.sizeMode="custom",this.selectedPresetIndex=-1,this.doPrice()}onCustomWidthChange(t){this.customWidth=parseFloat(t.target.value)||0,this.doPrice()}onCustomHeightChange(t){this.customHeight=parseFloat(t.target.value)||0,this.doPrice()}onPresetQtySelect(t){this.qtyMode="preset",this.selectedQtyIndex=t,this.doPrice()}onCustomQtyClick(){this.qtyMode="custom",this.selectedQtyIndex=-1,this.doPrice()}onCustomQtyChange(t){this.customQty=parseInt(t.target.value)||0,this.doPrice()}onFinishSelect(t){this.selectedFinish=t,this.doPrice()}doPrice(){if(!this.selectedShape||!this.selectedFinish||!this.sizeValid||this.quantity<=0)return this.priceResult=null,void this.dispatchStepData(null);const t=Lt(this.selectedShape.id,this.widthIn,this.needsHeight?this.heightIn:this.widthIn,this.quantity,this.selectedFinish.id);this.priceResult=t,this.dispatchStepData(t)}dispatchStepData(t){this.dispatchEvent(new CustomEvent("step-data",{detail:{shape:this.selectedShape,width:this.widthIn,height:this.heightIn,quantity:this.quantity,finish:this.selectedFinish,priceResult:t?{totalQuantity:t.quantity,totalPrice:t.totalPrice,unitPrice:t.unitPrice}:null,stickerPriceDetail:t},bubbles:!0,composed:!0}))}cardClass(t){return this.showValidation?"card"+(t?" valid":" invalid-highlight"):"card"+(t?" valid":"")}statusIcon(t){return t?"✓":""}statusClass(t){return"status "+(t?"done":"needed")}getAreaDisplay(){if(!this.selectedShape||!this.sizeValid)return"";const t=this.widthIn,e=this.needsHeight?this.heightIn:t,s=Ut(t,e,this.selectedShape.areaCalc);return"circle"===this.selectedShape.areaCalc?t+'" diameter — '+s.toFixed(1)+" sq in":t+'" × '+e+'" — '+s.toFixed(1)+" sq in"}renderChecklist(){const t=[{label:"Sticker Shape",done:this.shapeValid},{label:"Sticker Size",done:this.sizeValid},{label:"Quantity",done:this.quantityValid},{label:"Finish",done:this.finishValid}];return t.every(t=>t.done)?tt``:tt`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your stickers:</div>
        ${t.map(t=>tt`
            <div class="checklist-item ${t.done?"done":"pending"}">
              <span class="icon">${t.done?"✅":"⬜"}</span>
              <span class="label">${t.label}</span>
            </div>
          `)}
      </div>
    `}renderPriceArea(){if(this.priceResult){const t=this.priceResult,e=Bt(t.totalPrice),s=Bt(t.unitPrice),o=Bt(t.orderMinimum),r=Bt(75),a=Bt(150),l=this.getAreaDisplay(),d=t.quantity.toLocaleString(),c=t.totalTensSqIn.toLocaleString();return tt`
        <div class="price-display">
          <div class="price-main">${e}</div>
          <div class="price-per-unit">${s} Ea.</div>
          <div class="price-detail">
            ${t.shape.name} — ${l}<br />
            ${d} stickers × ${s} ea.<br />
            Volume discount: ${t.discountPct}% off (${c} tens sq in
            total)
            ${t.finish.isHolographic?tt`<br />Holographic surcharge: +75%`:""}
          </div>

          ${t.meetsMinimum?"":tt`
                <div class="min-order-warning">
                  ⚠️ Order minimum for
                  ${t.finish.isHolographic?"holographic":"regular"} stickers
                  is ${o}. Your current total is ${e}. Please
                  increase quantity or size.
                </div>
              `}

          <div class="min-order-info">
            Order minimum: ${r} regular / ${a} holographic
          </div>
        </div>
      `}const t=[];return this.shapeValid||t.push("shape"),this.sizeValid||t.push("size"),this.quantityValid||t.push("quantity"),this.finishValid||t.push("finish"),t.length>0&&(this.shapeValid||this.sizeValid||this.quantityValid)?tt`
        <div class="price-prompt">
          Select
          ${t.map((e,s)=>tt`
              <strong>${e}</strong>${s<t.length-1?", ":""}
            `)}
          to see your price
        </div>
      `:tt``}render(){return tt`
      ${this.renderChecklist()}

      <div class="${this.cardClass(this.shapeValid)}">
        <div class="card-header">
          <span>Sticker Shape</span>
          <span class="${this.statusClass(this.shapeValid)}">
            ${this.statusIcon(this.shapeValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="shape-grid">
            ${Tt.map(t=>tt`
                <div
                  class="shape-btn ${this.selectedShape?.id===t.id?"selected":""}"
                  @click=${()=>this.onShapeSelect(t)}
                >
                  <span class="shape-icon">
                    ${this.shapeIcons[t.id]||"📐"}
                  </span>
                  ${t.name}
                </div>
              `)}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.sizeValid)}">
        <div class="card-header">
          <span>Sticker Size (inches)</span>
          <span class="${this.statusClass(this.sizeValid)}">
            ${this.statusIcon(this.sizeValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="size-options">
            ${Nt.map((t,e)=>tt`
                <div
                  class="size-btn ${"preset"===this.sizeMode&&this.selectedPresetIndex===e?"selected":""}"
                  @click=${()=>this.onPresetSizeSelect(e)}
                >
                  ${t.label}
                </div>
              `)}
            <div
              class="size-btn ${"custom"===this.sizeMode?"selected":""}"
              @click=${()=>this.onCustomSizeClick()}
            >
              Custom Size
            </div>
          </div>

          ${"custom"===this.sizeMode?tt`
                <div class="custom-size-inputs">
                  <label>Width:</label>
                  <input
                    class="dim-input"
                    type="number"
                    min="${2}"
                    max="24"
                    step="0.25"
                    placeholder="W"
                    .value=${this.customWidth>0?String(this.customWidth):""}
                    @input=${this.onCustomWidthChange}
                  />

                  <span class="dim-x">×</span>

                  <label>Height:</label>
                  <input
                    class="dim-input"
                    type="number"
                    min="${2}"
                    max="24"
                    step="0.25"
                    placeholder="H"
                    .value=${this.customHeight>0?String(this.customHeight):""}
                    @input=${this.onCustomHeightChange}
                    ?disabled=${!this.needsHeight}
                  />

                  <span style="color:#888; font-size:13px;">inches</span>
                </div>

                <div class="dim-hint">
                  Minimum side length: ${2}" per side
                </div>

                ${this.customWidth>0&&this.customWidth<2?tt`
                      <div class="dim-error">
                        ⚠️ Width must be at least ${2}"
                      </div>
                    `:""}
                ${this.needsHeight&&this.customHeight>0&&this.customHeight<2?tt`
                      <div class="dim-error">
                        ⚠️ Height must be at least ${2}"
                      </div>
                    `:""}
                ${!this.needsHeight&&this.selectedShape?tt`
                      <div class="dim-hint">
                        ${"circle"===this.selectedShape.areaCalc?"Enter diameter — circles are equal on all sides":"Height matches width for squares"}
                      </div>
                    `:""}
              `:""}
          ${this.sizeValid&&this.selectedShape?tt`<p class="area-note">${this.getAreaDisplay()}</p>`:""}
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <span>Sticker Quantity</span>
          <span class="${this.statusClass(this.quantityValid)}">
            ${this.statusIcon(this.quantityValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="qty-options">
            ${Rt.map((t,e)=>tt`
                <div
                  class="qty-btn ${"preset"===this.qtyMode&&this.selectedQtyIndex===e?"selected":""}"
                  @click=${()=>this.onPresetQtySelect(e)}
                >
                  ${t.toLocaleString()}
                </div>
              `)}
            <div
              class="qty-btn ${"custom"===this.qtyMode?"selected":""}"
              @click=${()=>this.onCustomQtyClick()}
            >
              Custom
            </div>
          </div>

          ${"custom"===this.qtyMode?tt`
                <div class="custom-qty-input">
                  <label>Quantity:</label>
                  <input
                    class="qty-input"
                    type="number"
                    min="1"
                    step="1"
                    placeholder="Enter qty"
                    .value=${this.customQty>0?String(this.customQty):""}
                    @input=${this.onCustomQtyChange}
                  />
                </div>
              `:""}
        </div>
      </div>

      <div class="${this.cardClass(this.finishValid)}">
        <div class="card-header">
          <span>Sticker Finish</span>
          <span class="${this.statusClass(this.finishValid)}">
            ${this.statusIcon(this.finishValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="finish-options">
            ${_t.map(t=>tt`
                <label
                  class="finish-option ${this.selectedFinish?.id===t.id?"selected":""}"
                  @click=${()=>this.onFinishSelect(t)}
                >
                  <input
                    type="radio"
                    name="finish"
                    ?checked=${this.selectedFinish?.id===t.id}
                  />
                  <div>
                    <div class="finish-label">${t.name}</div>
                    ${t.isHolographic?tt`
                          <div class="finish-surcharge">
                            +75% surcharge • Min order
                            ${Bt(150)}
                          </div>
                        `:""}
                    ${t.note?tt` <div class="finish-note">${t.note}</div> `:""}
                  </div>
                </label>
              `)}
          </div>
        </div>
      </div>

      ${this.renderPriceArea()}
    `}};Ht.styles=l`
    :host {
      display: block;
      font-family: inherit;
    }

    .card {
      margin-bottom: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.3s;
    }

    .card.valid {
      border-color: #2ecc71;
    }

    .card.invalid-highlight {
      border-color: #e74c3c;
      animation: shake 0.4s ease-in-out;
    }

    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-4px);
      }
      75% {
        transform: translateX(4px);
      }
    }

    .card-header {
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafafa;
      border-bottom: 1px solid #e0e0e0;
    }

    .card-header .status {
      font-size: 13px;
      font-weight: 400;
    }

    .card-header .status.done {
      color: #2ecc71;
    }

    .card-header .status.needed {
      color: #e74c3c;
    }

    .card-body {
      padding: 16px;
    }

    .shape-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
      gap: 10px;
      margin-top: 8px;
    }

    .shape-btn {
      padding: 14px 10px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
      transition: all 0.2s;
      text-align: center;
    }

    .shape-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .shape-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .shape-icon {
      font-size: 24px;
      display: block;
      margin-bottom: 4px;
    }

    .size-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .size-btn {
      padding: 10px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      min-width: 70px;
      text-align: center;
    }

    .size-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .size-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .custom-size-inputs {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .custom-size-inputs label {
      font-weight: 600;
      font-size: 14px;
    }

    .dim-input {
      width: 70px;
      padding: 8px;
      font-size: 14px;
      border: 2px solid #ccc;
      border-radius: 4px;
      text-align: center;
    }

    .dim-input:focus {
      border-color: #4ecdc4;
      outline: none;
    }

    .dim-input:disabled {
      background: #f0f0f0;
      color: #999;
    }

    .dim-x {
      font-weight: 700;
      font-size: 16px;
      color: #666;
    }

    .dim-hint {
      font-size: 12px;
      color: #888;
      margin-top: 6px;
    }

    .dim-error {
      font-size: 12px;
      color: #e74c3c;
      margin-top: 6px;
      font-weight: 600;
    }

    .qty-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .qty-btn {
      padding: 10px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      min-width: 70px;
      text-align: center;
    }

    .qty-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .qty-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .custom-qty-input {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .custom-qty-input label {
      font-weight: 600;
      font-size: 14px;
    }

    .qty-input {
      width: 120px;
      padding: 8px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid #ccc;
      border-radius: 6px;
      text-align: center;
    }

    .qty-input:focus {
      border-color: #4ecdc4;
      outline: none;
    }

    .finish-options {
      margin-top: 8px;
    }

    .finish-option {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin: 10px 0;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .finish-option:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .finish-option.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .finish-option input[type="radio"] {
      accent-color: #4ecdc4;
      margin-top: 2px;
    }

    .finish-label {
      font-weight: 600;
      font-size: 15px;
    }

    .finish-note {
      font-size: 12px;
      color: #e67e22;
      font-style: italic;
      margin-top: 4px;
    }

    .finish-surcharge {
      font-size: 12px;
      color: #888;
      margin-top: 2px;
    }

    .price-display {
      margin-top: 20px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-main {
      font-size: 28px;
      font-weight: 700;
      color: #2c3e50;
    }

    .price-per-unit {
      font-size: 18px;
      color: #4ecdc4;
      font-weight: 600;
      margin-top: 4px;
    }

    .price-detail {
      font-size: 13px;
      color: #888;
      margin-top: 8px;
      line-height: 1.6;
    }

    .min-order-warning {
      margin-top: 12px;
      padding: 10px 16px;
      background: #fdf0ef;
      border: 1px solid #e74c3c;
      border-radius: 6px;
      font-size: 14px;
      color: #e74c3c;
      font-weight: 600;
      text-align: center;
    }

    .min-order-info {
      margin-top: 8px;
      font-size: 12px;
      color: #888;
      text-align: center;
    }

    .price-prompt {
      margin-top: 20px;
      padding: 16px;
      background: #f0f0f0;
      border-radius: 6px;
      text-align: center;
      color: #888;
      font-size: 14px;
      border: 1px dashed #ccc;
    }

    .price-prompt strong {
      color: #e67e22;
    }

    .area-note {
      color: #666;
      font-size: 13px;
      margin-top: 8px;
    }

    .checklist {
      margin-bottom: 16px;
      padding: 16px;
      background: #fff9e6;
      border: 1px solid #f0d060;
      border-radius: 6px;
    }

    .checklist-title {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 8px;
      color: #333;
    }

    .checklist-item {
      padding: 4px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checklist-item .icon {
      font-size: 16px;
      width: 20px;
      text-align: center;
    }

    .checklist-item.done {
      color: #2ecc71;
    }

    .checklist-item.done .label {
      text-decoration: line-through;
      color: #999;
    }

    .checklist-item.pending {
      color: #e67e22;
    }
  `,Dt([mt()],Ht.prototype,"selectedShape",2),Dt([mt()],Ht.prototype,"sizeMode",2),Dt([mt()],Ht.prototype,"selectedPresetIndex",2),Dt([mt()],Ht.prototype,"customWidth",2),Dt([mt()],Ht.prototype,"customHeight",2),Dt([mt()],Ht.prototype,"qtyMode",2),Dt([mt()],Ht.prototype,"selectedQtyIndex",2),Dt([mt()],Ht.prototype,"customQty",2),Dt([mt()],Ht.prototype,"selectedFinish",2),Dt([mt()],Ht.prototype,"priceResult",2),Dt([mt()],Ht.prototype,"showValidation",2),Ht=Dt([pt("step-sticker-config")],Ht);const Wt=[{id:"small",label:'1.25" Circle',diameter:"1.25"},{id:"large",label:'2.25" Circle',diameter:"2.25"}],jt=50,Xt=[{minQty:50,maxQty:99,retailPrice:1.1},{minQty:100,maxQty:249,retailPrice:.85},{minQty:250,maxQty:499,retailPrice:.6},{minQty:500,maxQty:999,retailPrice:.45},{minQty:1e3,maxQty:2499,retailPrice:.4},{minQty:2500,maxQty:null,retailPrice:.35}],Gt=[50,100,250,500,1e3,2500];var Yt=Object.defineProperty,Jt=Object.getOwnPropertyDescriptor,Kt=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?Jt(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&Yt(e,s,a),a};function Zt(t){return"$"+t.toFixed(2)}let te=class extends i{constructor(){super(...arguments),this.selectedSize=null,this.qtyMode="preset",this.selectedQtyIndex=-1,this.customQty=0,this.priceResult=null,this.showValidation=!1}get quantity(){return"preset"===this.qtyMode&&this.selectedQtyIndex>=0?Gt[this.selectedQtyIndex]:this.customQty}get sizeValid(){return!!this.selectedSize}get quantityValid(){return this.quantity>=jt}get allValid(){return this.sizeValid&&this.quantityValid}validate(){if(this.showValidation=!0,!this.allValid){const t=this.shadowRoot?.querySelector(".card.invalid-highlight");return t&&t.scrollIntoView({behavior:"smooth",block:"center"}),!1}return!(this.priceResult&&!this.priceResult.meetsMinimum)}onSizeSelect(t){this.selectedSize=t,this.doPrice()}onPresetQtySelect(t){this.qtyMode="preset",this.selectedQtyIndex=t,this.doPrice()}onCustomQtyClick(){this.qtyMode="custom",this.selectedQtyIndex=-1,this.doPrice()}onCustomQtyChange(t){this.customQty=parseInt(t.target.value)||0,this.doPrice()}doPrice(){if(!this.selectedSize||this.quantity<=0)return this.priceResult=null,void this.dispatchStepData(null);const t=function(t,e){if(e<=0)return null;const s=Wt.find(e=>e.id===t);if(!s)return null;const o=e>=jt;let r=null;for(const l of Xt){if(!(e>=l.minQty))break;r=l}r||(r=Xt[0]);const a=Math.round(100*r.retailPrice)/100;return{size:s,quantity:e,unitPrice:a,totalPrice:Math.round(a*e*100)/100,bracketLabel:r.maxQty?r.minQty+"–"+r.maxQty:r.minQty+"+",meetsMinimum:o}}(this.selectedSize.id,this.quantity);this.priceResult=t,this.dispatchStepData(t)}dispatchStepData(t){this.dispatchEvent(new CustomEvent("step-data",{detail:{buttonSize:this.selectedSize,quantity:this.quantity,priceResult:t?{totalQuantity:t.quantity,totalPrice:t.totalPrice,unitPrice:t.unitPrice}:null,buttonPriceDetail:t},bubbles:!0,composed:!0}))}cardClass(t){return this.showValidation?"card"+(t?" valid":" invalid-highlight"):"card"+(t?" valid":"")}statusIcon(t){return t?"✓":""}statusClass(t){return"status "+(t?"done":"needed")}renderChecklist(){const t=[{label:"Button Size",done:this.sizeValid},{label:"Quantity (minimum 50)",done:this.quantityValid}];return t.every(t=>t.done)?tt``:tt`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your buttons:</div>
        ${t.map(t=>tt`
            <div class="checklist-item ${t.done?"done":"pending"}">
              <span class="icon">${t.done?"✅":"⬜"}</span>
              <span class="label">${t.label}</span>
            </div>
          `)}
      </div>
    `}renderPriceTable(){return tt`
      <table class="price-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Price Each</th>
          </tr>
        </thead>
        <tbody>
          ${Xt.map(t=>{const e=t.maxQty?t.minQty+"–"+t.maxQty:t.minQty+"+",s=this.priceResult&&this.quantity>=t.minQty&&(null===t.maxQty||this.quantity<=t.maxQty);return tt`
              <tr class="${s?"current":""}">
                <td>${e}</td>
                <td>${Zt(t.retailPrice)}</td>
              </tr>
            `})}
        </tbody>
      </table>
    `}renderPriceArea(){if(this.priceResult){const t=this.priceResult,e=Zt(t.totalPrice),s=Zt(t.unitPrice);return tt`
        <div class="price-display">
          <div class="price-main">${e}</div>
          <div class="price-per-unit">${s} Ea.</div>
          <div class="price-detail">
            ${t.size.label} × ${t.quantity.toLocaleString()} buttons<br />
            Price bracket: ${t.bracketLabel}
          </div>

          ${t.meetsMinimum?"":tt`
                <div class="min-order-warning">
                  ⚠️ Minimum order is ${jt} buttons. You have
                  ${t.quantity}. Please increase your quantity.
                </div>
              `}
          ${this.renderPriceTable()}
        </div>
      `}const t=[];return this.sizeValid||t.push("size"),this.quantityValid||t.push("quantity"),t.length>0&&(this.sizeValid||this.quantity>0)?tt`
        <div class="price-prompt">
          Select
          ${t.map((e,s)=>tt`<strong>${e}</strong>${s<t.length-1?", ":""}`)}
          to see your price
        </div>
      `:tt``}render(){return tt`
      ${this.renderChecklist()}

      <div class="${this.cardClass(this.sizeValid)}">
        <div class="card-header">
          <span>Button Size</span>
          <span class="${this.statusClass(this.sizeValid)}">
            ${this.statusIcon(this.sizeValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="size-options">
            ${Wt.map(t=>tt`
                <div
                  class="size-btn ${this.selectedSize?.id===t.id?"selected":""}"
                  @click=${()=>this.onSizeSelect(t)}
                >
                  <span class="size-icon">⚫</span>
                  <span class="size-label">${t.label}</span>
                </div>
              `)}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <span>Button Quantity</span>
          <span class="${this.statusClass(this.quantityValid)}">
            ${this.statusIcon(this.quantityValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="qty-options">
            ${Gt.map((t,e)=>tt`
                <div
                  class="qty-btn ${"preset"===this.qtyMode&&this.selectedQtyIndex===e?"selected":""}"
                  @click=${()=>this.onPresetQtySelect(e)}
                >
                  ${t.toLocaleString()}
                </div>
              `)}
            <div
              class="qty-btn ${"custom"===this.qtyMode?"selected":""}"
              @click=${()=>this.onCustomQtyClick()}
            >
              Custom
            </div>
          </div>

          ${"custom"===this.qtyMode?tt`
                <div class="custom-qty-input">
                  <label>Quantity:</label>
                  <input
                    class="qty-input"
                    type="number"
                    min="${jt}"
                    step="1"
                    placeholder="Min ${jt}"
                    .value=${this.customQty>0?String(this.customQty):""}
                    @input=${this.onCustomQtyChange}
                  />
                </div>
              `:""}

          <div class="min-note">Minimum order: ${jt} buttons</div>

          ${this.quantity>0&&this.quantity<jt?tt`
                <div class="min-error">
                  ⚠️ Minimum order is ${jt} buttons
                </div>
              `:""}
        </div>
      </div>

      ${this.renderPriceArea()}
    `}};te.styles=l`
    :host {
      display: block;
      font-family: inherit;
    }

    .card {
      margin-bottom: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.3s;
    }

    .card.valid {
      border-color: #2ecc71;
    }

    .card.invalid-highlight {
      border-color: #e74c3c;
      animation: shake 0.4s ease-in-out;
    }

    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-4px);
      }
      75% {
        transform: translateX(4px);
      }
    }

    .card-header {
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafafa;
      border-bottom: 1px solid #e0e0e0;
    }

    .card-header .status {
      font-size: 13px;
      font-weight: 400;
    }

    .card-header .status.done {
      color: #2ecc71;
    }

    .card-header .status.needed {
      color: #e74c3c;
    }

    .card-body {
      padding: 16px;
    }

    .size-options {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      margin-top: 8px;
    }

    .size-btn {
      padding: 16px 24px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      text-align: center;
      min-width: 140px;
    }

    .size-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .size-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .size-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 6px;
    }

    .size-label {
      font-size: 15px;
    }

    .qty-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .qty-btn {
      padding: 10px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      min-width: 70px;
      text-align: center;
    }

    .qty-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .qty-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .custom-qty-input {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .custom-qty-input label {
      font-weight: 600;
      font-size: 14px;
    }

    .qty-input {
      width: 120px;
      padding: 8px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid #ccc;
      border-radius: 6px;
      text-align: center;
    }

    .qty-input:focus {
      border-color: #4ecdc4;
      outline: none;
    }

    .min-note {
      font-size: 12px;
      color: #888;
      margin-top: 6px;
    }

    .min-error {
      font-size: 12px;
      color: #e74c3c;
      margin-top: 6px;
      font-weight: 600;
    }

    .price-display {
      margin-top: 20px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-main {
      font-size: 28px;
      font-weight: 700;
      color: #2c3e50;
    }

    .price-per-unit {
      font-size: 18px;
      color: #4ecdc4;
      font-weight: 600;
      margin-top: 4px;
    }

    .price-detail {
      font-size: 13px;
      color: #888;
      margin-top: 8px;
      line-height: 1.6;
    }

    .min-order-warning {
      margin-top: 12px;
      padding: 10px 16px;
      background: #fdf0ef;
      border: 1px solid #e74c3c;
      border-radius: 6px;
      font-size: 14px;
      color: #e74c3c;
      font-weight: 600;
      text-align: center;
    }

    .price-table {
      width: 100%;
      margin-top: 12px;
      border-collapse: collapse;
      font-size: 13px;
    }

    .price-table th,
    .price-table td {
      padding: 6px 10px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-table th {
      background: #fafafa;
      font-weight: 600;
    }

    .price-table .current {
      background: #e8f8f5;
      font-weight: 700;
    }

    .price-prompt {
      margin-top: 20px;
      padding: 16px;
      background: #f0f0f0;
      border-radius: 6px;
      text-align: center;
      color: #888;
      font-size: 14px;
      border: 1px dashed #ccc;
    }

    .price-prompt strong {
      color: #e67e22;
    }

    .checklist {
      margin-bottom: 16px;
      padding: 16px;
      background: #fff9e6;
      border: 1px solid #f0d060;
      border-radius: 6px;
    }

    .checklist-title {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 8px;
      color: #333;
    }

    .checklist-item {
      padding: 4px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checklist-item .icon {
      font-size: 16px;
      width: 20px;
      text-align: center;
    }

    .checklist-item.done {
      color: #2ecc71;
    }

    .checklist-item.done .label {
      text-decoration: line-through;
      color: #999;
    }

    .checklist-item.pending {
      color: #e67e22;
    }
  `,Kt([mt()],te.prototype,"selectedSize",2),Kt([mt()],te.prototype,"qtyMode",2),Kt([mt()],te.prototype,"selectedQtyIndex",2),Kt([mt()],te.prototype,"customQty",2),Kt([mt()],te.prototype,"priceResult",2),Kt([mt()],te.prototype,"showValidation",2),te=Kt([pt("step-button-config")],te);const ee=[{id:"11oz-nonusa-white",label:"11oz Non-USA White",size:"11oz",origin:"Non-USA",color:"White",description:"11oz white ceramic mug"},{id:"11oz-nonusa-black",label:"11oz Non-USA Black",size:"11oz",origin:"Non-USA",color:"Black",description:"11oz black ceramic mug"},{id:"11oz-usa-white",label:"11oz USA-made White",size:"11oz",origin:"USA-made",color:"White",description:"11oz USA-made white ceramic mug"},{id:"15oz-usa-white",label:"15oz USA-made White",size:"15oz",origin:"USA-made",color:"White",description:"15oz USA-made white ceramic mug"}],ie={"11oz-nonusa-white":[{minQty:1,maxQty:1,price:22.24},{minQty:2,maxQty:4,price:14.74},{minQty:5,maxQty:8,price:10.24},{minQty:9,maxQty:23,price:8.91},{minQty:24,maxQty:35,price:7.86},{minQty:36,maxQty:71,price:7.66},{minQty:72,maxQty:107,price:7.45},{minQty:108,maxQty:143,price:7.45},{minQty:144,maxQty:null,price:7.45}],"11oz-nonusa-black":[{minQty:1,maxQty:1,price:23.52},{minQty:2,maxQty:4,price:16.02},{minQty:5,maxQty:8,price:11.52},{minQty:9,maxQty:23,price:10.18},{minQty:24,maxQty:35,price:9.14},{minQty:36,maxQty:71,price:8.93},{minQty:72,maxQty:107,price:8.73},{minQty:108,maxQty:143,price:8.66},{minQty:144,maxQty:null,price:8.52}],"11oz-usa-white":[{minQty:1,maxQty:1,price:28.07},{minQty:2,maxQty:4,price:20.57},{minQty:5,maxQty:8,price:16.07},{minQty:9,maxQty:23,price:14.74},{minQty:24,maxQty:35,price:13.7},{minQty:36,maxQty:71,price:13.49},{minQty:72,maxQty:107,price:13.28},{minQty:108,maxQty:143,price:13.28},{minQty:144,maxQty:null,price:13.18}],"15oz-usa-white":[{minQty:1,maxQty:1,price:29.58},{minQty:2,maxQty:4,price:22.18},{minQty:5,maxQty:8,price:17.75},{minQty:9,maxQty:23,price:16.43},{minQty:24,maxQty:35,price:15.41},{minQty:36,maxQty:71,price:15.2},{minQty:72,maxQty:107,price:14.99},{minQty:108,maxQty:143,price:14.99},{minQty:144,maxQty:null,price:14.99}]};var se=Object.defineProperty,ne=Object.getOwnPropertyDescriptor,oe=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?ne(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&se(e,s,a),a};function re(t){return"$"+t.toFixed(2)}let ae=class extends i{constructor(){super(...arguments),this.selectedStyle=null,this.quantity=0,this.includePackaging=!1,this.priceResult=null,this.showValidation=!1}get styleValid(){return!!this.selectedStyle}get quantityValid(){return this.quantity>0}get allValid(){return this.styleValid&&this.quantityValid}validate(){if(this.showValidation=!0,!this.allValid){const t=this.shadowRoot?.querySelector(".card.invalid-highlight");return t&&t.scrollIntoView({behavior:"smooth",block:"center"}),!1}return!0}onStyleSelect(t){this.selectedStyle=t,this.doPrice()}onQuantityChange(t){this.quantity=parseInt(t.target.value)||0,this.doPrice()}onPackagingToggle(t){t.preventDefault(),this.includePackaging=!this.includePackaging,this.doPrice()}doPrice(){if(!this.selectedStyle||this.quantity<=0)return this.priceResult=null,void this.dispatchStepData(null);const t=function(t,e,s){if(e<=0)return null;const o=ee.find(e=>e.id===t);if(!o)return null;const r=ie[t];if(!r||0===r.length)return null;let a=null;for(const u of r){if(!(e>=u.minQty))break;a=u}a||(a=r[0]);const l=Math.round(100*a.price)/100,d=Math.round(l*e*100)/100,c=s?2.5:0,p=Math.round(c*e*100)/100,h=Math.round(2.5*e*100)/100;return{style:o,quantity:e,unitPrice:l,subtotal:d,packagingPerMug:c,packagingTotal:p,includePackaging:s,shippingPerMug:2.5,shippingTotal:h,totalPrice:Math.round(100*(d+p+h))/100,bracketLabel:a.maxQty?a.minQty+"–"+a.maxQty:a.minQty+"+"}}(this.selectedStyle.id,this.quantity,this.includePackaging);this.priceResult=t,this.dispatchStepData(t)}dispatchStepData(t){this.dispatchEvent(new CustomEvent("step-data",{detail:{mugStyle:this.selectedStyle,quantity:this.quantity,includePackaging:this.includePackaging,priceResult:t?{totalQuantity:t.quantity,totalPrice:t.totalPrice,unitPrice:t.unitPrice}:null,mugPriceDetail:t},bubbles:!0,composed:!0}))}cardClass(t){return this.showValidation?"card"+(t?" valid":" invalid-highlight"):"card"+(t?" valid":"")}statusIcon(t){return t?"✓":""}statusClass(t){return"status "+(t?"done":"needed")}renderChecklist(){const t=[{label:"Mug Style",done:this.styleValid},{label:"Quantity (at least 1)",done:this.quantityValid}];return t.every(t=>t.done)?tt``:tt`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your mugs:</div>
        ${t.map(t=>tt`
            <div class="checklist-item ${t.done?"done":"pending"}">
              <span class="icon">${t.done?"✅":"⬜"}</span>
              <span class="label">${t.label}</span>
            </div>
          `)}
      </div>
    `}renderPriceTable(){if(!this.selectedStyle)return tt``;const t=(e=this.selectedStyle.id,ie[e]||[]);var e;return tt`
      <table class="price-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Price Each</th>
          </tr>
        </thead>
        <tbody>
          ${t.map(t=>{const e=t.maxQty?t.minQty+(t.minQty===t.maxQty?"":"–"+t.maxQty):t.minQty+"+",s=this.priceResult&&this.quantity>=t.minQty&&(null===t.maxQty||this.quantity<=t.maxQty);return tt`
              <tr class="${s?"current":""}">
                <td>${e}</td>
                <td>${re(t.price)}</td>
              </tr>
            `})}
        </tbody>
      </table>
    `}renderPriceArea(){if(this.priceResult){const t=this.priceResult,e=re(t.totalPrice),s=re(t.unitPrice),o=re(t.subtotal),r=re(t.packagingTotal),a=re(t.shippingTotal),l=re(t.unitPrice+t.packagingPerMug+t.shippingPerMug);return tt`
        <div class="price-display">
          <div class="price-main">${e}</div>
          <div class="price-per-unit">${l} per mug (all-in)</div>

          <div class="price-breakdown">
            <div class="price-row">
              <span>
                ${t.quantity.toLocaleString()} × ${t.style.label} @ ${s}
                ea.
              </span>
              <span>${o}</span>
            </div>
            ${t.includePackaging?tt`
                  <div class="price-row">
                    <span>
                      Individual packaging @ ${re(2.5)}/mug
                    </span>
                    <span>${r}</span>
                  </div>
                `:""}
            <div class="price-row">
              <span> Shipping @ ${re(2.5)}/mug </span>
              <span>${a}</span>
            </div>
            <div class="price-row total">
              <span>Total</span>
              <span>${e}</span>
            </div>
          </div>

          <div class="shipping-note">
            Shipping is ${re(2.5)} per mug for all orders
          </div>

          ${this.renderPriceTable()}
        </div>
      `}const t=[];return this.styleValid||t.push("mug style"),this.quantityValid||t.push("quantity"),t.length>0&&(this.styleValid||this.quantity>0)?tt`
        <div class="price-prompt">
          Select
          ${t.map((e,s)=>tt`<strong>${e}</strong>${s<t.length-1?", ":""}`)}
          to see your price
        </div>
      `:tt``}render(){return tt`
      ${this.renderChecklist()}

      <div class="${this.cardClass(this.styleValid)}">
        <div class="card-header">
          <span>Mug Style</span>
          <span class="${this.statusClass(this.styleValid)}">
            ${this.statusIcon(this.styleValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="style-grid">
            ${ee.map(t=>tt`
                <div
                  class="style-btn ${this.selectedStyle?.id===t.id?"selected":""}"
                  @click=${()=>this.onStyleSelect(t)}
                >
                  <span class="style-icon">☕</span>
                  <span class="style-label">${t.label}</span>
                  <span class="style-desc">${t.description}</span>
                  <span
                    class="style-badge ${"USA-made"===t.origin?"badge-usa":"badge-import"}"
                  >
                    ${"USA-made"===t.origin?"🇺🇸 USA-made":"🌍 Imported"}
                  </span>
                </div>
              `)}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <span>Quantity</span>
          <span class="${this.statusClass(this.quantityValid)}">
            ${this.statusIcon(this.quantityValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="qty-input-group">
            <label>How many mugs?</label>
            <input
              class="qty-input"
              type="number"
              min="1"
              step="1"
              placeholder="Qty"
              .value=${this.quantity>0?String(this.quantity):""}
              @input=${this.onQuantityChange}
            />
          </div>
          <div class="qty-hint">✓ No minimum order!</div>
        </div>
      </div>

      <div class="card valid">
        <div class="card-header">
          <span>Individual Packaging</span>
          <span class="status done">Optional</span>
        </div>
        <div class="card-body">
          <div
            class="packaging-option ${this.includePackaging?"selected":""}"
            @click=${this.onPackagingToggle}
          >
            <input type="checkbox" .checked=${this.includePackaging} />
            <div>
              <div class="packaging-label">
                Add individual gift box packaging
              </div>
              <div class="packaging-note">
                ${re(2.5)} per mug — each mug packaged
                separately in a gift-ready box
              </div>
            </div>
          </div>
        </div>
      </div>

      ${this.renderPriceArea()}
    `}};ae.styles=l`
    :host {
      display: block;
      font-family: inherit;
    }

    .card {
      margin-bottom: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.3s;
    }

    .card.valid {
      border-color: #2ecc71;
    }

    .card.invalid-highlight {
      border-color: #e74c3c;
      animation: shake 0.4s ease-in-out;
    }

    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-4px);
      }
      75% {
        transform: translateX(4px);
      }
    }

    .card-header {
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafafa;
      border-bottom: 1px solid #e0e0e0;
    }

    .card-header .status {
      font-size: 13px;
      font-weight: 400;
    }

    .card-header .status.done {
      color: #2ecc71;
    }

    .card-header .status.needed {
      color: #e74c3c;
    }

    .card-body {
      padding: 16px;
    }

    .style-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 12px;
      margin-top: 8px;
    }

    .style-btn {
      padding: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }

    .style-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .style-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .style-icon {
      font-size: 32px;
      display: block;
      margin-bottom: 6px;
    }

    .style-label {
      font-size: 14px;
      font-weight: 600;
    }

    .style-desc {
      font-size: 11px;
      color: #888;
      margin-top: 4px;
    }

    .style-badge {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 10px;
      font-size: 10px;
      font-weight: 700;
      margin-top: 6px;
    }

    .badge-usa {
      background: #e8f8f5;
      color: #27ae60;
    }

    .badge-import {
      background: #fef9e7;
      color: #f39c12;
    }

    .qty-input-group {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .qty-input-group label {
      font-weight: 600;
      font-size: 14px;
    }

    .qty-input {
      width: 120px;
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid #ccc;
      border-radius: 6px;
      text-align: center;
    }

    .qty-input:focus {
      border-color: #4ecdc4;
      outline: none;
    }

    .qty-hint {
      font-size: 12px;
      color: #27ae60;
      margin-top: 6px;
      font-weight: 600;
    }

    .packaging-option {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-top: 12px;
      padding: 14px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .packaging-option:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .packaging-option.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .packaging-option input[type="checkbox"] {
      accent-color: #4ecdc4;
      margin-top: 2px;
      width: 18px;
      height: 18px;
      pointer-events: none;
    }

    .packaging-label {
      font-weight: 600;
      font-size: 15px;
    }

    .packaging-note {
      font-size: 12px;
      color: #888;
      margin-top: 2px;
    }

    .price-display {
      margin-top: 20px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-main {
      font-size: 28px;
      font-weight: 700;
      color: #2c3e50;
    }

    .price-per-unit {
      font-size: 18px;
      color: #4ecdc4;
      font-weight: 600;
      margin-top: 4px;
    }

    .price-breakdown {
      margin-top: 12px;
      text-align: left;
      font-size: 14px;
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      color: #555;
    }

    .price-row.total {
      border-top: 2px solid #333;
      margin-top: 8px;
      padding-top: 8px;
      font-weight: 700;
      font-size: 16px;
      color: #2c3e50;
    }

    .price-table {
      width: 100%;
      margin-top: 16px;
      border-collapse: collapse;
      font-size: 13px;
    }

    .price-table th,
    .price-table td {
      padding: 6px 10px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-table th {
      background: #fafafa;
      font-weight: 600;
    }

    .price-table .current {
      background: #e8f8f5;
      font-weight: 700;
    }

    .shipping-note {
      font-size: 12px;
      color: #888;
      margin-top: 8px;
      text-align: center;
      font-style: italic;
    }

    .price-prompt {
      margin-top: 20px;
      padding: 16px;
      background: #f0f0f0;
      border-radius: 6px;
      text-align: center;
      color: #888;
      font-size: 14px;
      border: 1px dashed #ccc;
    }

    .price-prompt strong {
      color: #e67e22;
    }

    .checklist {
      margin-bottom: 16px;
      padding: 16px;
      background: #fff9e6;
      border: 1px solid #f0d060;
      border-radius: 6px;
    }

    .checklist-title {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 8px;
      color: #333;
    }

    .checklist-item {
      padding: 4px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checklist-item .icon {
      font-size: 16px;
      width: 20px;
      text-align: center;
    }

    .checklist-item.done {
      color: #2ecc71;
    }

    .checklist-item.done .label {
      text-decoration: line-through;
      color: #999;
    }

    .checklist-item.pending {
      color: #e67e22;
    }
  `,oe([mt()],ae.prototype,"selectedStyle",2),oe([mt()],ae.prototype,"quantity",2),oe([mt()],ae.prototype,"includePackaging",2),oe([mt()],ae.prototype,"priceResult",2),oe([mt()],ae.prototype,"showValidation",2),ae=oe([pt("step-mug-config")],ae);const le=24,de=[{id:"one-sided",label:"1-Sided Print"},{id:"two-sided",label:"2-Sided Print (front & back)"}],ce=[{id:"white",name:"White",hex:"FFFFFF",brightness:"light"},{id:"black",name:"Black",hex:"000000",brightness:"dark"},{id:"navy",name:"Navy Blue",hex:"1B2A4A",brightness:"dark"},{id:"royal-blue",name:"Royal Blue",hex:"1A5EC7",brightness:"dark"},{id:"light-blue",name:"Light Blue",hex:"87CEEB",brightness:"light"},{id:"red",name:"Red",hex:"CC0000",brightness:"dark"},{id:"maroon",name:"Maroon",hex:"6B1C2A",brightness:"dark"},{id:"orange",name:"Orange",hex:"FF6600",brightness:"dark"},{id:"burnt-orange",name:"Burnt Orange",hex:"CC5500",brightness:"dark"},{id:"gold",name:"Gold / Athletic Yellow",hex:"FFD700",brightness:"light"},{id:"yellow",name:"Yellow",hex:"FFEE00",brightness:"light"},{id:"kelly-green",name:"Kelly Green",hex:"2E8B57",brightness:"dark"},{id:"lime-green",name:"Lime Green",hex:"76C043",brightness:"light"},{id:"hunter-green",name:"Hunter Green",hex:"2D5A27",brightness:"dark"},{id:"teal",name:"Teal",hex:"008080",brightness:"dark"},{id:"purple",name:"Purple",hex:"6B2D8B",brightness:"dark"},{id:"lavender",name:"Lavender",hex:"B19CD9",brightness:"light"},{id:"pink",name:"Pink",hex:"FF69B4",brightness:"light"},{id:"hot-pink",name:"Hot Pink",hex:"FF1493",brightness:"dark"},{id:"gray",name:"Gray",hex:"808080",brightness:"dark"},{id:"charcoal",name:"Charcoal",hex:"36454F",brightness:"dark"},{id:"brown",name:"Brown",hex:"6B4226",brightness:"dark"},{id:"tan",name:"Tan / Khaki",hex:"D2B48C",brightness:"light"},{id:"coral",name:"Coral",hex:"FF7F50",brightness:"light"},{id:"neon-green",name:"Neon Green",hex:"39FF14",brightness:"light"},{id:"neon-orange",name:"Neon Orange",hex:"FF6103",brightness:"dark"},{id:"neon-pink",name:"Neon Pink",hex:"FF10F0",brightness:"dark"},{id:"camo",name:"Camo Green",hex:"4B5320",brightness:"dark"}],pe=[{minQty:24,maxQty:36,netPrice:2.83},{minQty:37,maxQty:72,netPrice:2.5},{minQty:73,maxQty:250,netPrice:2.2},{minQty:251,maxQty:500,netPrice:1.98},{minQty:501,maxQty:1e3,netPrice:1.93},{minQty:1001,maxQty:null,netPrice:1.89}],he=[{minQty:24,maxQty:36,netPrice:4.01},{minQty:37,maxQty:72,netPrice:3.68},{minQty:73,maxQty:250,netPrice:3.38},{minQty:251,maxQty:500,netPrice:3.16},{minQty:501,maxQty:1e3,netPrice:3.12},{minQty:1001,maxQty:null,netPrice:3.07}];function ue(t){return"two-sided"===t?he:pe}const ge=[24,48,72,100,150,250,500,1e3];var me=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,ye=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?fe(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&me(e,s,a),a};function be(t){return"$"+t.toFixed(2)}let xe=class extends i{constructor(){super(...arguments),this.selectedPrintSide=null,this.selectedColor=null,this.qtyMode="preset",this.selectedQtyIndex=-1,this.customQty=0,this.priceResult=null,this.showValidation=!1}get quantity(){return"preset"===this.qtyMode&&this.selectedQtyIndex>=0?ge[this.selectedQtyIndex]:this.customQty}get printSideValid(){return!!this.selectedPrintSide}get colorValid(){return!!this.selectedColor}get quantityValid(){return this.quantity>=le}get allValid(){return this.printSideValid&&this.colorValid&&this.quantityValid}validate(){if(this.showValidation=!0,!this.allValid){const t=this.shadowRoot?.querySelector(".card.invalid-highlight");return t&&t.scrollIntoView({behavior:"smooth",block:"center"}),!1}return!(this.priceResult&&!this.priceResult.meetsMinimum)}onPrintSideSelect(t){this.selectedPrintSide=t,this.doPrice()}onColorSelect(t){this.selectedColor=t,this.doPrice()}onPresetQtySelect(t){this.qtyMode="preset",this.selectedQtyIndex=t,this.doPrice()}onCustomQtyClick(){this.qtyMode="custom",this.selectedQtyIndex=-1,this.doPrice()}onCustomQtyChange(t){this.customQty=parseInt(t.target.value)||0,this.doPrice()}doPrice(){if(!this.selectedColor||!this.selectedPrintSide||this.quantity<=0)return this.priceResult=null,void this.dispatchStepData(null);const t=function(t,e,s){if(s<=0)return null;const o=ce.find(e=>e.id===t);if(!o)return null;const r=de.find(t=>t.id===e);if(!r)return null;const a=s>=le,l=ue(e);let d=null;for(const p of l){if(!(s>=p.minQty))break;d=p}d||(d=l[0]);const c=Math.round(100*d.netPrice)/100;return{color:o,printSide:r,quantity:s,unitPrice:c,totalPrice:Math.round(c*s*100)/100,bracketLabel:d.maxQty?d.minQty+"–"+d.maxQty:d.minQty+"+",meetsMinimum:a}}(this.selectedColor.id,this.selectedPrintSide.id,this.quantity);this.priceResult=t,this.dispatchStepData(t)}dispatchStepData(t){this.dispatchEvent(new CustomEvent("step-data",{detail:{coolerColor:this.selectedColor,coolerPrintSide:this.selectedPrintSide,quantity:this.quantity,priceResult:t?{totalQuantity:t.quantity,totalPrice:t.totalPrice,unitPrice:t.unitPrice}:null,coolerPriceDetail:t},bubbles:!0,composed:!0}))}cardClass(t){return this.showValidation?"card"+(t?" valid":" invalid-highlight"):"card"+(t?" valid":"")}statusIcon(t){return t?"✓":""}statusClass(t){return"status "+(t?"done":"needed")}renderChecklist(){const t=[{label:"Print Sides",done:this.printSideValid},{label:"Cooler Color",done:this.colorValid},{label:"Quantity (minimum 24)",done:this.quantityValid}];return t.every(t=>t.done)?tt``:tt`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your can coolers:</div>
        ${t.map(t=>tt`
            <div class="checklist-item ${t.done?"done":"pending"}">
              <span class="icon">${t.done?"✅":"⬜"}</span>
              <span class="label">${t.label}</span>
            </div>
          `)}
      </div>
    `}renderPriceTable(){if(!this.selectedPrintSide)return tt``;const t=ue(this.selectedPrintSide.id);return tt`
      <table class="price-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Price Each (${this.selectedPrintSide.label})</th>
          </tr>
        </thead>
        <tbody>
          ${t.map(t=>{const e=t.maxQty?t.minQty+"–"+t.maxQty:t.minQty+"+",s=this.priceResult&&this.quantity>=t.minQty&&(null===t.maxQty||this.quantity<=t.maxQty);return tt`
              <tr class="${s?"current":""}">
                <td>${e}</td>
                <td>${be(t.netPrice)}</td>
              </tr>
            `})}
        </tbody>
      </table>
    `}renderPriceArea(){if(this.priceResult){const t=this.priceResult,e=be(t.totalPrice),s=be(t.unitPrice);return tt`
        <div class="price-display">
          <div class="price-main">${e}</div>
          <div class="price-per-unit">${s} Ea.</div>
          <div class="price-detail">
            ${t.color.name} can cooler × ${t.quantity.toLocaleString()}<br />
            ${t.printSide.label} • Full color imprint<br />
            Price bracket: ${t.bracketLabel}
          </div>

          ${t.meetsMinimum?"":tt`
                <div class="min-order-warning">
                  ⚠️ Minimum order is ${le} can coolers. You have
                  ${t.quantity}. Please increase your quantity.
                </div>
              `}
          ${this.renderPriceTable()}
        </div>
      `}const t=[];return this.printSideValid||t.push("print sides"),this.colorValid||t.push("color"),this.quantityValid||t.push("quantity"),t.length>0&&(this.printSideValid||this.colorValid||this.quantity>0)?tt`
        <div class="price-prompt">
          Select
          ${t.map((e,s)=>tt`<strong>${e}</strong>${s<t.length-1?", ":""}`)}
          to see your price
        </div>
      `:tt``}render(){return tt`
      ${this.renderChecklist()}

      <div class="${this.cardClass(this.printSideValid)}">
        <div class="card-header">
          <span>Print Sides</span>
          <span class="${this.statusClass(this.printSideValid)}">
            ${this.statusIcon(this.printSideValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="print-options">
            ${de.map(t=>tt`
                <div
                  class="print-btn ${this.selectedPrintSide?.id===t.id?"selected":""}"
                  @click=${()=>this.onPrintSideSelect(t)}
                >
                  <span class="print-icon">
                    ${"one-sided"===t.id?"1️⃣":"2️⃣"}
                  </span>
                  ${t.label}
                </div>
              `)}
          </div>
          <div class="full-color-note">
            🎨 Full color imprints on all can coolers!
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.colorValid)}">
        <div class="card-header">
          <span>Cooler Color</span>
          <span class="${this.statusClass(this.colorValid)}">
            ${this.statusIcon(this.colorValid)}
          </span>
        </div>
        <div class="card-body">
          <p class="color-name">
            Selected:
            <strong>
              ${this.selectedColor?this.selectedColor.name:"None — pick a color"}
            </strong>
          </p>
          <div class="colors">
            ${ce.map(t=>tt`
                <div
                  class="swatch ${this.selectedColor?.id===t.id?"picked":""} ${"light"===t.brightness?"lt":""}"
                  style="background-color: #${t.hex}"
                  title=${t.name}
                  @click=${()=>this.onColorSelect(t)}
                ></div>
              `)}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <span>Quantity</span>
          <span class="${this.statusClass(this.quantityValid)}">
            ${this.statusIcon(this.quantityValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="qty-options">
            ${ge.map((t,e)=>tt`
                <div
                  class="qty-btn ${"preset"===this.qtyMode&&this.selectedQtyIndex===e?"selected":""}"
                  @click=${()=>this.onPresetQtySelect(e)}
                >
                  ${t.toLocaleString()}
                </div>
              `)}
            <div
              class="qty-btn ${"custom"===this.qtyMode?"selected":""}"
              @click=${()=>this.onCustomQtyClick()}
            >
              Custom
            </div>
          </div>

          ${"custom"===this.qtyMode?tt`
                <div class="custom-qty-input">
                  <label>Quantity:</label>
                  <input
                    class="qty-input"
                    type="number"
                    min="${le}"
                    step="1"
                    placeholder="Min ${le}"
                    .value=${this.customQty>0?String(this.customQty):""}
                    @input=${this.onCustomQtyChange}
                  />
                </div>
              `:""}

          <div class="min-note">
            Minimum order: ${le} can coolers
          </div>

          ${this.quantity>0&&this.quantity<le?tt`
                <div class="min-error">
                  ⚠️ Minimum order is ${le} can coolers
                </div>
              `:""}
        </div>
      </div>

      ${this.renderPriceArea()}
    `}};xe.styles=l`
    :host {
      display: block;
      font-family: inherit;
    }

    .card {
      margin-bottom: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.3s;
    }

    .card.valid {
      border-color: #2ecc71;
    }

    .card.invalid-highlight {
      border-color: #e74c3c;
      animation: shake 0.4s ease-in-out;
    }

    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-4px);
      }
      75% {
        transform: translateX(4px);
      }
    }

    .card-header {
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafafa;
      border-bottom: 1px solid #e0e0e0;
    }

    .card-header .status {
      font-size: 13px;
      font-weight: 400;
    }

    .card-header .status.done {
      color: #2ecc71;
    }

    .card-header .status.needed {
      color: #e74c3c;
    }

    .card-body {
      padding: 16px;
    }

    .print-options {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .print-btn {
      flex: 1;
      padding: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      text-align: center;
    }

    .print-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .print-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .print-icon {
      font-size: 24px;
      display: block;
      margin-bottom: 4px;
    }

    .colors {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .swatch {
      width: 36px;
      height: 36px;
      border-radius: 6px;
      cursor: pointer;
      border: 2px solid transparent;
      transition: all 0.15s;
      position: relative;
    }

    .swatch:hover {
      transform: scale(1.15);
    }

    .swatch.picked {
      border-color: #333;
      outline: 2px solid #333;
    }

    .swatch.lt {
      border-color: #ddd;
    }

    .color-name {
      margin-top: 8px;
      font-size: 14px;
    }

    .color-name strong {
      font-weight: 700;
    }

    .qty-options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 8px;
    }

    .qty-btn {
      padding: 10px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      min-width: 60px;
      text-align: center;
    }

    .qty-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .qty-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .custom-qty-input {
      margin-top: 12px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .custom-qty-input label {
      font-weight: 600;
      font-size: 14px;
    }

    .qty-input {
      width: 120px;
      padding: 8px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid #ccc;
      border-radius: 6px;
      text-align: center;
    }

    .qty-input:focus {
      border-color: #4ecdc4;
      outline: none;
    }

    .min-note {
      font-size: 12px;
      color: #888;
      margin-top: 6px;
    }

    .min-error {
      font-size: 12px;
      color: #e74c3c;
      margin-top: 6px;
      font-weight: 600;
    }

    .price-display {
      margin-top: 20px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-main {
      font-size: 28px;
      font-weight: 700;
      color: #2c3e50;
    }

    .price-per-unit {
      font-size: 18px;
      color: #4ecdc4;
      font-weight: 600;
      margin-top: 4px;
    }

    .price-detail {
      font-size: 13px;
      color: #888;
      margin-top: 8px;
      line-height: 1.6;
    }

    .min-order-warning {
      margin-top: 12px;
      padding: 10px 16px;
      background: #fdf0ef;
      border: 1px solid #e74c3c;
      border-radius: 6px;
      font-size: 14px;
      color: #e74c3c;
      font-weight: 600;
      text-align: center;
    }

    .price-table {
      width: 100%;
      margin-top: 16px;
      border-collapse: collapse;
      font-size: 13px;
    }

    .price-table th,
    .price-table td {
      padding: 6px 10px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-table th {
      background: #fafafa;
      font-weight: 600;
    }

    .price-table .current {
      background: #e8f8f5;
      font-weight: 700;
    }

    .price-prompt {
      margin-top: 20px;
      padding: 16px;
      background: #f0f0f0;
      border-radius: 6px;
      text-align: center;
      color: #888;
      font-size: 14px;
      border: 1px dashed #ccc;
    }

    .price-prompt strong {
      color: #e67e22;
    }

    .checklist {
      margin-bottom: 16px;
      padding: 16px;
      background: #fff9e6;
      border: 1px solid #f0d060;
      border-radius: 6px;
    }

    .checklist-title {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 8px;
      color: #333;
    }

    .checklist-item {
      padding: 4px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checklist-item .icon {
      font-size: 16px;
      width: 20px;
      text-align: center;
    }

    .checklist-item.done {
      color: #2ecc71;
    }

    .checklist-item.done .label {
      text-decoration: line-through;
      color: #999;
    }

    .checklist-item.pending {
      color: #e67e22;
    }

    .full-color-note {
      margin-top: 8px;
      padding: 8px 12px;
      background: #e8f8f5;
      border-radius: 4px;
      font-size: 13px;
      color: #27ae60;
      font-weight: 600;
    }
  `,ye([mt()],xe.prototype,"selectedPrintSide",2),ye([mt()],xe.prototype,"selectedColor",2),ye([mt()],xe.prototype,"qtyMode",2),ye([mt()],xe.prototype,"selectedQtyIndex",2),ye([mt()],xe.prototype,"customQty",2),ye([mt()],xe.prototype,"priceResult",2),ye([mt()],xe.prototype,"showValidation",2),xe=ye([pt("step-cancooler-config")],xe);const ve=[{id:"one-sided",label:"1-Sided (front only)"},{id:"two-sided",label:"2-Sided (front & back)"}],we=[{id:"none",label:"No Stakes",pricePerSign:0,description:"Sign only — no stakes included"},{id:"h-stake",label:"H-Stakes (wire)",pricePerSign:1.55,description:"2 wire H-stakes per sign — standard yard sign stakes"},{id:"i-stake",label:"I-Stakes (step)",pricePerSign:1.9,description:"2 step-in I-stakes per sign — heavy duty"}],$e=[{minQty:1,maxQty:5,netPrice:26.68},{minQty:6,maxQty:10,netPrice:7.93},{minQty:11,maxQty:50,netPrice:6.23},{minQty:51,maxQty:100,netPrice:4.62},{minQty:101,maxQty:250,netPrice:4.4},{minQty:251,maxQty:300,netPrice:4.29},{minQty:301,maxQty:500,netPrice:4.26},{minQty:501,maxQty:1e3,netPrice:4.18},{minQty:1001,maxQty:null,netPrice:4.18}],ke=[{minQty:1,maxQty:5,netPrice:29.4},{minQty:6,maxQty:10,netPrice:10.65},{minQty:11,maxQty:50,netPrice:8.94},{minQty:51,maxQty:100,netPrice:7.34},{minQty:101,maxQty:250,netPrice:7.12},{minQty:251,maxQty:300,netPrice:7.01},{minQty:301,maxQty:500,netPrice:6.97},{minQty:501,maxQty:1e3,netPrice:6.9},{minQty:1001,maxQty:null,netPrice:6.9}];function Se(t){return"two-sided"===t?ke:$e}var Ce=Object.defineProperty,Pe=Object.getOwnPropertyDescriptor,ze=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?Pe(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&Ce(e,s,a),a};function Qe(t){return"$"+t.toFixed(2)}let qe=class extends i{constructor(){super(...arguments),this.selectedPrintSide=null,this.quantity=0,this.fullBleed=!1,this.selectedStake=we[0],this.priceResult=null,this.showValidation=!1}get printSideValid(){return!!this.selectedPrintSide}get quantityValid(){return this.quantity>0}get allValid(){return this.printSideValid&&this.quantityValid}validate(){if(this.showValidation=!0,!this.allValid){const t=this.shadowRoot?.querySelector(".card.invalid-highlight");return t&&t.scrollIntoView({behavior:"smooth",block:"center"}),!1}return!0}onPrintSideSelect(t){this.selectedPrintSide=t,this.doPrice()}onQuantityChange(t){this.quantity=parseInt(t.target.value)||0,this.doPrice()}onFullBleedToggle(t){t.preventDefault(),this.fullBleed=!this.fullBleed,this.doPrice()}onStakeSelect(t,e){t.preventDefault(),this.selectedStake=e,this.doPrice()}doPrice(){if(!this.selectedPrintSide||this.quantity<=0)return this.priceResult=null,void this.dispatchStepData(null);const t=function(t,e,s,o){if(e<=0)return null;const r=ve.find(e=>e.id===t);if(!r)return null;const a=we.find(t=>t.id===o);if(!a)return null;const l=Se(t);let d=null;for(const f of l){if(!(e>=f.minQty))break;d=f}d||(d=l[0]);const c=Math.round(100*d.netPrice)/100,p=Math.round(c*e*100)/100,h=s?.5:0,u=Math.round(h*e*100)/100,g=a.pricePerSign,m=Math.round(g*e*100)/100;return{printSide:r,quantity:e,fullBleed:s,stakeOption:a,signUnitPrice:c,signSubtotal:p,fullBleedPerSign:h,fullBleedTotal:u,stakePerSign:g,stakeTotal:m,unitPriceAllIn:Math.round(100*(c+h+g))/100,totalPrice:Math.round(100*(p+u+m))/100,bracketLabel:d.maxQty?d.minQty+"–"+d.maxQty:d.minQty+"+"}}(this.selectedPrintSide.id,this.quantity,this.fullBleed,this.selectedStake.id);this.priceResult=t,this.dispatchStepData(t)}dispatchStepData(t){this.dispatchEvent(new CustomEvent("step-data",{detail:{signPrintSide:this.selectedPrintSide,quantity:this.quantity,fullBleed:this.fullBleed,stakeOption:this.selectedStake,priceResult:t?{totalQuantity:t.quantity,totalPrice:t.totalPrice,unitPrice:t.unitPriceAllIn}:null,signPriceDetail:t},bubbles:!0,composed:!0}))}cardClass(t){return this.showValidation?"card"+(t?" valid":" invalid-highlight"):"card"+(t?" valid":"")}statusIcon(t){return t?"✓":""}statusClass(t){return"status "+(t?"done":"needed")}renderChecklist(){const t=[{label:"Print Sides",done:this.printSideValid},{label:"Quantity (at least 1)",done:this.quantityValid}];return t.every(t=>t.done)?tt``:tt`
      <div class="checklist">
        <div class="checklist-title">📋 Configure your yard signs:</div>
        ${t.map(t=>tt`
            <div class="checklist-item ${t.done?"done":"pending"}">
              <span class="icon"> ${t.done?"✅":"⬜"} </span>
              <span class="label">${t.label}</span>
            </div>
          `)}
      </div>
    `}renderPriceTable(){if(!this.selectedPrintSide)return tt``;const t=Se(this.selectedPrintSide.id);return tt`
      <table class="price-table">
        <thead>
          <tr>
            <th>Quantity</th>
            <th>Sign Price Each (${this.selectedPrintSide.label})</th>
          </tr>
        </thead>
        <tbody>
          ${t.map(t=>{const e=t.maxQty?t.minQty===t.maxQty?String(t.minQty):t.minQty+"–"+t.maxQty:t.minQty+"+",s=this.priceResult&&this.quantity>=t.minQty&&(null===t.maxQty||this.quantity<=t.maxQty);return tt`
              <tr class="${s?"current":""}">
                <td>${e}</td>
                <td>${Qe(t.netPrice)}</td>
              </tr>
            `})}
        </tbody>
      </table>
    `}renderPriceArea(){if(this.priceResult){const t=this.priceResult,e=Qe(t.totalPrice),s=Qe(t.unitPriceAllIn),o=Qe(t.signSubtotal),r=Qe(t.signUnitPrice),a=Qe(t.fullBleedTotal),l=Qe(t.stakeTotal);return tt`
        <div class="price-display">
          <div class="price-main">${e}</div>
          <div class="price-per-unit">${s} per sign (all-in)</div>

          <div class="price-breakdown">
            <div class="price-row">
              <span>
                ${t.quantity.toLocaleString()} × ${t.printSide.label} signs @
                ${r} ea.
              </span>
              <span>${o}</span>
            </div>
            ${t.fullBleed?tt`
                  <div class="price-row">
                    <span>
                      Full-bleed @ ${Qe(.5)}/sign
                    </span>
                    <span>${a}</span>
                  </div>
                `:""}
            ${"none"!==t.stakeOption.id?tt`
                  <div class="price-row">
                    <span>
                      ${t.stakeOption.label} @
                      ${Qe(t.stakePerSign)}/sign
                    </span>
                    <span>${l}</span>
                  </div>
                `:""}
            <div class="price-row total">
              <span>Total</span>
              <span>${e}</span>
            </div>
          </div>

          ${this.renderPriceTable()}
        </div>
      `}const t=[];return this.printSideValid||t.push("print sides"),this.quantityValid||t.push("quantity"),t.length>0&&(this.printSideValid||this.quantity>0)?tt`
        <div class="price-prompt">
          Select
          ${t.map((e,s)=>tt`<strong>${e}</strong>${s<t.length-1?", ":""}`)}
          to see your price
        </div>
      `:tt``}render(){return tt`
      ${this.renderChecklist()}

      <div class="size-note">
        📐 Standard size: <strong>18" × 24"</strong> coroplast yard signs —
        full-color digitally printed.<br />
        Maximum size: 8' × 4'. Contact us for custom size quotes.
      </div>

      <div class="${this.cardClass(this.printSideValid)}">
        <div class="card-header">
          <span>Print Sides</span>
          <span class="${this.statusClass(this.printSideValid)}">
            ${this.statusIcon(this.printSideValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="print-options">
            ${ve.map(t=>tt`
                <div
                  class="print-btn ${this.selectedPrintSide?.id===t.id?"selected":""}"
                  @click=${()=>this.onPrintSideSelect(t)}
                >
                  <span class="print-icon">
                    ${"one-sided"===t.id?"1️⃣":"2️⃣"}
                  </span>
                  ${t.label}
                </div>
              `)}
          </div>
        </div>
      </div>

      <div class="${this.cardClass(this.quantityValid)}">
        <div class="card-header">
          <span>Quantity</span>
          <span class="${this.statusClass(this.quantityValid)}">
            ${this.statusIcon(this.quantityValid)}
          </span>
        </div>
        <div class="card-body">
          <div class="qty-input-group">
            <label>How many signs?</label>
            <input
              class="qty-input"
              type="number"
              min="1"
              step="1"
              placeholder="Qty"
              .value=${this.quantity>0?String(this.quantity):""}
              @input=${this.onQuantityChange}
            />
          </div>
          <div class="qty-hint">✓ No minimum order!</div>
        </div>
      </div>

      <div class="card valid">
        <div class="card-header">
          <span>Add-Ons</span>
          <span class="status done">Optional</span>
        </div>
        <div class="card-body">
          <div
            class="addon-option ${this.fullBleed?"selected":""}"
            @click=${this.onFullBleedToggle}
          >
            <input type="checkbox" .checked=${this.fullBleed} />
            <div>
              <div class="addon-label">Full-Bleed Printing</div>
              <div class="addon-note">
                Print extends to the edges with no white border
              </div>
              <div class="addon-price">
                +${Qe(.5)} per sign
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card valid">
        <div class="card-header">
          <span>Stakes</span>
          <span class="status done">Optional</span>
        </div>
        <div class="card-body">
          <div class="no-stakes-note">
            ⚠️ Sign price does not include stakes. Add stakes below if needed.
          </div>
          <div class="stake-options">
            ${we.map(t=>tt`
                <div
                  class="addon-option ${this.selectedStake.id===t.id?"selected":""}"
                  @click=${e=>this.onStakeSelect(e,t)}
                >
                  <input
                    type="radio"
                    name="stake"
                    .checked=${this.selectedStake.id===t.id}
                  />
                  <div>
                    <div class="addon-label">${t.label}</div>
                    <div class="addon-note">${t.description}</div>
                    ${t.pricePerSign>0?tt`
                          <div class="addon-price">
                            +${Qe(t.pricePerSign)} per sign
                          </div>
                        `:""}
                  </div>
                </div>
              `)}
          </div>
        </div>
      </div>

      <div class="custom-size-callout">
        Need a <strong>custom size</strong> (up to 8' × 4')? Please call or
        email us for a quote!
      </div>

      ${this.renderPriceArea()}
    `}};qe.styles=l`
    :host {
      display: block;
      font-family: inherit;
    }

    .card {
      margin-bottom: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      transition: border-color 0.3s;
    }

    .card.valid {
      border-color: #2ecc71;
    }

    .card.invalid-highlight {
      border-color: #e74c3c;
      animation: shake 0.4s ease-in-out;
    }

    @keyframes shake {
      0%,
      100% {
        transform: translateX(0);
      }
      25% {
        transform: translateX(-4px);
      }
      75% {
        transform: translateX(4px);
      }
    }

    .card-header {
      padding: 10px 16px;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fafafa;
      border-bottom: 1px solid #e0e0e0;
    }

    .card-header .status {
      font-size: 13px;
      font-weight: 400;
    }

    .card-header .status.done {
      color: #2ecc71;
    }

    .card-header .status.needed {
      color: #e74c3c;
    }

    .card-body {
      padding: 16px;
    }

    .print-options {
      display: flex;
      gap: 12px;
      margin-top: 8px;
    }

    .print-btn {
      flex: 1;
      padding: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      background: white;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.2s;
      text-align: center;
    }

    .print-btn:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .print-btn.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .print-icon {
      font-size: 24px;
      display: block;
      margin-bottom: 4px;
    }

    .qty-input-group {
      margin-top: 8px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .qty-input-group label {
      font-weight: 600;
      font-size: 14px;
    }

    .qty-input {
      width: 120px;
      padding: 10px;
      font-size: 16px;
      font-weight: 600;
      border: 2px solid #ccc;
      border-radius: 6px;
      text-align: center;
    }

    .qty-input:focus {
      border-color: #4ecdc4;
      outline: none;
    }

    .qty-hint {
      font-size: 12px;
      color: #27ae60;
      margin-top: 6px;
      font-weight: 600;
    }

    .addon-option {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      margin-top: 10px;
      padding: 14px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .addon-option:hover {
      border-color: #4ecdc4;
      background: #f9fffe;
    }

    .addon-option.selected {
      border-color: #4ecdc4;
      background: #e8f8f5;
    }

    .addon-option input[type="checkbox"],
    .addon-option input[type="radio"] {
      accent-color: #4ecdc4;
      margin-top: 2px;
      width: 18px;
      height: 18px;
      pointer-events: none;
    }

    .addon-label {
      font-weight: 600;
      font-size: 15px;
    }

    .addon-note {
      font-size: 12px;
      color: #888;
      margin-top: 2px;
    }

    .addon-price {
      font-size: 12px;
      color: #4ecdc4;
      font-weight: 600;
      margin-top: 2px;
    }

    .stake-options {
      margin-top: 8px;
    }

    .size-note {
      margin-top: 8px;
      padding: 10px 14px;
      background: #f0f7ff;
      border-radius: 6px;
      font-size: 13px;
      color: #2c3e50;
      line-height: 1.5;
    }

    .size-note strong {
      color: #1a5ec7;
    }

    .no-stakes-note {
      margin-top: 8px;
      padding: 8px 12px;
      background: #fff9e6;
      border-radius: 4px;
      font-size: 12px;
      color: #e67e22;
      font-style: italic;
    }

    .price-display {
      margin-top: 20px;
      padding: 20px;
      background: #f5f5f5;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-main {
      font-size: 28px;
      font-weight: 700;
      color: #2c3e50;
    }

    .price-per-unit {
      font-size: 18px;
      color: #4ecdc4;
      font-weight: 600;
      margin-top: 4px;
    }

    .price-breakdown {
      margin-top: 12px;
      text-align: left;
      font-size: 14px;
    }

    .price-row {
      display: flex;
      justify-content: space-between;
      padding: 4px 0;
      color: #555;
    }

    .price-row.total {
      border-top: 2px solid #333;
      margin-top: 8px;
      padding-top: 8px;
      font-weight: 700;
      font-size: 16px;
      color: #2c3e50;
    }

    .price-table {
      width: 100%;
      margin-top: 16px;
      border-collapse: collapse;
      font-size: 13px;
    }

    .price-table th,
    .price-table td {
      padding: 6px 10px;
      border: 1px solid #e0e0e0;
      text-align: center;
    }

    .price-table th {
      background: #fafafa;
      font-weight: 600;
    }

    .price-table .current {
      background: #e8f8f5;
      font-weight: 700;
    }

    .price-prompt {
      margin-top: 20px;
      padding: 16px;
      background: #f0f0f0;
      border-radius: 6px;
      text-align: center;
      color: #888;
      font-size: 14px;
      border: 1px dashed #ccc;
    }

    .price-prompt strong {
      color: #e67e22;
    }

    .checklist {
      margin-bottom: 16px;
      padding: 16px;
      background: #fff9e6;
      border: 1px solid #f0d060;
      border-radius: 6px;
    }

    .checklist-title {
      font-weight: 700;
      font-size: 15px;
      margin-bottom: 8px;
      color: #333;
    }

    .checklist-item {
      padding: 4px 0;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .checklist-item .icon {
      font-size: 16px;
      width: 20px;
      text-align: center;
    }

    .checklist-item.done {
      color: #2ecc71;
    }

    .checklist-item.done .label {
      text-decoration: line-through;
      color: #999;
    }

    .checklist-item.pending {
      color: #e67e22;
    }

    .custom-size-callout {
      margin-top: 12px;
      padding: 12px 16px;
      background: #f0f0f0;
      border-radius: 6px;
      font-size: 13px;
      color: #666;
      text-align: center;
    }

    .custom-size-callout strong {
      color: #333;
    }
  `,ze([mt()],qe.prototype,"selectedPrintSide",2),ze([mt()],qe.prototype,"quantity",2),ze([mt()],qe.prototype,"fullBleed",2),ze([mt()],qe.prototype,"selectedStake",2),ze([mt()],qe.prototype,"priceResult",2),ze([mt()],qe.prototype,"showValidation",2),qe=ze([pt("step-yardsign-config")],qe);const Ae=l`
  :host {
    display: block;
    font-family:
      -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  }

  .step-card {
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden;
    margin-bottom: 16px;
  }

  .step-header {
    padding: 12px 16px;
    font-size: 16px;
    font-weight: 600;
    background: #fafafa;
    border-bottom: 1px solid #e0e0e0;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .step-body {
    padding: 16px;
  }

  .info-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4ecdc4;
    color: white;
    font-size: 12px;
    font-weight: 700;
  }

  hr {
    border: none;
    border-top: 1px solid #e0e0e0;
    margin: 16px 0;
  }
`;var Fe=Object.defineProperty,Ie=Object.getOwnPropertyDescriptor,Te=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?Ie(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&Fe(e,s,a),a};const Ve=".eps,.ai,.psd,.png,.jpg,.jpeg,.gif,.bmp,.svg,.tiff,.pdf";let _e=class extends i{constructor(){super(...arguments),this.printLocationId="",this.sidedness="one-sided",this.artworkOption="upload",this.frontFileName="",this.frontFilePreview="",this.frontFileError="",this.frontFile=null,this.backFileName="",this.backFilePreview="",this.backFileError="",this.backFile=null,this.showValidation=!1}get isTwoSided(){return"two-sided"===this.sidedness}getUploadLabels(){switch(this.printLocationId){case"front-only":return["Front Artwork"];case"back-only":return["Back Artwork"];case"left-chest":return["Left Chest Artwork"];case"right-chest":return["Right Chest Artwork"];case"full-front-full-back":return["Front Artwork","Back Artwork"];case"full-front-left-chest":return["Front Artwork","Left Chest Artwork"];default:return this.isTwoSided?["Front Artwork","Back Artwork"]:["Artwork"]}}get frontValid(){return"upload"!==this.artworkOption||!!this.frontFileName}get backValid(){return"upload"!==this.artworkOption||(!this.isTwoSided||!!this.backFileName)}get isComplete(){return"email"===this.artworkOption||"help"===this.artworkOption||(this.isTwoSided?!(!this.frontFileName||!this.backFileName):!!this.frontFileName)}validate(){if(this.showValidation=!0,!this.isComplete){const t=this.shadowRoot?.querySelector(".upload-section.invalid-highlight");return t&&t.scrollIntoView({behavior:"smooth",block:"center"}),!1}return!0}clearAllFiles(){this.frontFile=null,this.frontFileName="",this.frontFilePreview="",this.frontFileError="",this.backFile=null,this.backFileName="",this.backFilePreview="",this.backFileError=""}dispatchData(){const t="upload"===this.artworkOption;this.dispatchEvent(new CustomEvent("step-data",{detail:{artworkOption:this.artworkOption,file:t?this.frontFile:null,backFile:t?this.backFile:null,frontFileName:t?this.frontFileName:"",backFileName:t?this.backFileName:""},bubbles:!0,composed:!0}))}onOptionChange(t){this.artworkOption=t,this.showValidation=!1,"upload"!==t&&this.clearAllFiles(),this.dispatchData()}validateFile(t){if(t.size>20971520)return"File is too large. Maximum size is 20 MB.";const e="."+t.name.split(".").pop()?.toLowerCase();return Ve.split(",").includes(e)?null:"File type not accepted. Please use: "+Ve}onFrontFileChange(t){const e=t.target.files?.[0];if(!e)return;const s=this.validateFile(e);if(s)this.frontFileError=s;else{if(this.frontFile=e,this.frontFileName=e.name,this.frontFilePreview="",this.frontFileError="",e.type.startsWith("image/")){const t=new FileReader;t.onload=()=>{this.frontFilePreview=t.result},t.readAsDataURL(e)}this.dispatchData()}}onBackFileChange(t){const e=t.target.files?.[0];if(!e)return;const s=this.validateFile(e);if(s)this.backFileError=s;else{if(this.backFile=e,this.backFileName=e.name,this.backFilePreview="",this.backFileError="",e.type.startsWith("image/")){const t=new FileReader;t.onload=()=>{this.backFilePreview=t.result},t.readAsDataURL(e)}this.dispatchData()}}removeFrontFile(){this.frontFile=null,this.frontFileName="",this.frontFilePreview="",this.frontFileError="",this.dispatchData()}removeBackFile(){this.backFile=null,this.backFileName="",this.backFilePreview="",this.backFileError="",this.dispatchData()}uploadSectionClass(t){return this.showValidation?"upload-section"+(t?" valid":" invalid-highlight"):"upload-section"+(t?" valid":"")}renderUploadSlot(t,e,s,o,r,a,l,d){return tt`
      <div class="${this.uploadSectionClass(r)}">
        <p class="upload-section-title">
          <span>${t}</span>
          <span class="status ${r?"done":"needed"}">
            ${r?"✓ Uploaded":"Required"}
          </span>
        </p>

        ${e?tt`
              <div class="file-name">
                <span>📎 ${e}</span>
                <span
                  class="remove"
                  title="Remove file"
                  @click=${l}
                  >✕</span
                >
              </div>
              ${s?tt`
                    <div class="preview-container">
                      <img class="preview" src=${s} alt="Preview" />
                    </div>
                  `:tt``}
            `:tt`
              <div class="file-input-wrapper">
                <button
                  class="file-btn"
                  @click=${()=>{const t=this.shadowRoot?.getElementById(d);t?.click()}}
                >
                  Choose File
                </button>
                <span style="color: #999; font-size: 13px;"
                  >No file chosen</span
                >
              </div>
              <input
                id=${d}
                type="file"
                class="file-input"
                accept=${Ve}
                @change=${a}
              />
              ${this.showValidation&&!r?tt`
                    <div class="missing-prompt">
                      ⚠️ Please upload your ${t.toLowerCase()}
                    </div>
                  `:tt``}
            `}
        ${o?tt`<p class="file-error">⚠️ ${o}</p>`:tt``}
      </div>
    `}renderChecklist(){if("upload"!==this.artworkOption)return tt``;const t=this.getUploadLabels(),e=[{label:t[0],done:this.frontValid}];this.isTwoSided&&t.length>1&&e.push({label:t[1],done:this.backValid});return e.every(t=>t.done)?tt``:tt`
      <div class="checklist">
        <div class="checklist-title">📋 Upload required artwork:</div>
        ${e.map(t=>tt`
            <div class="checklist-item ${t.done?"done":"pending"}">
              <span class="icon">${t.done?"✅":"⬜"}</span>
              <span class="label">${t.label}</span>
            </div>
          `)}
      </div>
    `}render(){const t=this.getUploadLabels(),e=this.isTwoSided?"Upload Artwork":"Upload "+t[0];return tt`
      <div class="step-card">
        <div class="step-header">
          <span class="info-icon">i</span> ${e}
        </div>
        <div class="step-body">
          <label class="upload-option">
            <input
              type="radio"
              name="artwork"
              ?checked=${"upload"===this.artworkOption}
              @change=${()=>this.onOptionChange("upload")}
            />
            Upload now
          </label>
          <label class="upload-option">
            <input
              type="radio"
              name="artwork"
              ?checked=${"email"===this.artworkOption}
              @change=${()=>this.onOptionChange("email")}
            />
            I'll send later via email
          </label>
          <label class="upload-option">
            <input
              type="radio"
              name="artwork"
              ?checked=${"help"===this.artworkOption}
              @change=${()=>this.onOptionChange("help")}
            />
            I Need Design Help!
          </label>

          ${"upload"===this.artworkOption?tt`
                <hr />
                ${this.renderChecklist()}
                ${this.renderUploadSlot(t[0],this.frontFileName,this.frontFilePreview,this.frontFileError,this.frontValid,t=>this.onFrontFileChange(t),()=>this.removeFrontFile(),"front-file-input")}
                ${this.isTwoSided&&t.length>1?tt`
                      ${this.renderUploadSlot(t[1],this.backFileName,this.backFilePreview,this.backFileError,this.backValid,t=>this.onBackFileChange(t),()=>this.removeBackFile(),"back-file-input")}
                    `:tt``}
                <p class="file-info">📏 20 MB Maximum file size</p>
                <p class="file-info">
                  📁 Accepted: .eps, .ai, .psd, .png, .jpg, .jpeg, .gif, .bmp,
                  .svg, .tiff, .pdf
                </p>
              `:tt``}
          ${"email"===this.artworkOption?tt`
                <div class="option-info">
                  <strong>📧 Send via email</strong><br />
                  After placing your order, email your artwork to
                  <strong>art@example.com</strong> with your order number in the
                  subject line. We'll get started as soon as we receive it!
                </div>
              `:tt``}
          ${"help"===this.artworkOption?tt`
                <div class="option-info">
                  <strong>🎨 Design Help</strong><br />
                  No worries! Our design team will reach out to you after your
                  order is placed to discuss your vision and create something
                  amazing. A design fee may apply.
                </div>
              `:tt``}
        </div>
      </div>
    `}};_e.styles=[Ae,l`
      .upload-option {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 0;
        cursor: pointer;
        font-size: 15px;
      }
      .upload-option input[type="radio"] {
        accent-color: #4ecdc4;
      }

      .upload-section {
        margin: 16px 0;
        padding: 16px;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        transition: border-color 0.3s;
      }
      .upload-section.valid {
        border-color: #2ecc71;
      }
      .upload-section.invalid-highlight {
        border-color: #e74c3c;
        animation: shake 0.4s ease-in-out;
      }
      @keyframes shake {
        0%,
        100% {
          transform: translateX(0);
        }
        25% {
          transform: translateX(-4px);
        }
        75% {
          transform: translateX(4px);
        }
      }

      .upload-section-title {
        font-weight: 600;
        font-size: 15px;
        margin-bottom: 12px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .upload-section-title .status {
        font-size: 13px;
        font-weight: 400;
      }
      .upload-section-title .status.done {
        color: #2ecc71;
      }
      .upload-section-title .status.needed {
        color: #e74c3c;
      }

      .file-input-wrapper {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 8px 0;
      }
      .file-btn {
        padding: 8px 16px;
        background: #333;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 600;
        transition: all 0.2s;
      }
      .file-btn:hover {
        background: #555;
      }
      .file-input {
        display: none;
      }

      .file-name {
        font-size: 14px;
        color: #333;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      .file-name .remove {
        color: #e74c3c;
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        padding: 0 4px;
      }
      .file-name .remove:hover {
        color: #c0392b;
      }

      .preview-container {
        margin: 12px 0;
        padding: 8px;
        background: #f9f9f9;
        border-radius: 4px;
        display: inline-block;
      }
      .preview {
        max-width: 200px;
        max-height: 200px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }

      .file-info {
        font-size: 13px;
        color: #888;
        margin-top: 8px;
      }
      .file-error {
        font-size: 13px;
        color: #e74c3c;
        margin-top: 4px;
        font-weight: 600;
      }

      .missing-prompt {
        color: #e74c3c;
        font-size: 14px;
        margin-top: 8px;
        padding: 8px 12px;
        background: #fdf0ef;
        border-radius: 4px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      .option-info {
        margin-top: 12px;
        padding: 12px 16px;
        background: #e8f8f5;
        border-radius: 6px;
        font-size: 14px;
        color: #333;
        line-height: 1.6;
      }
      .option-info strong {
        color: #2c3e50;
      }

      .checklist {
        margin-bottom: 16px;
        padding: 16px;
        background: #fff9e6;
        border: 1px solid #f0d060;
        border-radius: 6px;
      }
      .checklist-title {
        font-weight: 700;
        font-size: 15px;
        margin-bottom: 8px;
        color: #333;
      }
      .checklist-item {
        padding: 4px 0;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .checklist-item .icon {
        font-size: 16px;
        width: 20px;
        text-align: center;
      }
      .checklist-item.done {
        color: #2ecc71;
      }
      .checklist-item.done .label {
        text-decoration: line-through;
        color: #999;
      }
      .checklist-item.pending {
        color: #e67e22;
      }
    `],Te([gt({type:String})],_e.prototype,"printLocationId",2),Te([gt({type:String})],_e.prototype,"sidedness",2),Te([mt()],_e.prototype,"artworkOption",2),Te([mt()],_e.prototype,"frontFileName",2),Te([mt()],_e.prototype,"frontFilePreview",2),Te([mt()],_e.prototype,"frontFileError",2),Te([mt()],_e.prototype,"backFileName",2),Te([mt()],_e.prototype,"backFilePreview",2),Te([mt()],_e.prototype,"backFileError",2),Te([mt()],_e.prototype,"showValidation",2),_e=Te([pt("step-artwork")],_e);var Ee=Object.defineProperty,Ue=Object.getOwnPropertyDescriptor,Le=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?Ue(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&Ee(e,s,a),a};let Me=class extends i{constructor(){super(...arguments),this.unionLabel=!0}connectedCallback(){super.connectedCallback(),this.dispatchEvent(new CustomEvent("step-data",{detail:{unionLabel:this.unionLabel},bubbles:!0,composed:!0}))}get isComplete(){return!0}validate(){return!0}onToggle(t){this.unionLabel=t,this.dispatchEvent(new CustomEvent("step-data",{detail:{unionLabel:t},bubbles:!0,composed:!0}))}render(){return tt`
      <div class="step-card">
        <div class="step-header">
          <span class="info-icon">i</span> We're a Union Print Shop!
        </div>
        <div class="step-body">
          <p class="union-info">
            We can add a small Union label to your product so everyone will know
            it was printed and shipped by workers earning a living wage with
            access to quality, affordable health care. Our design team will send
            a proof!
          </p>
          <p><a href="#">Learn More</a></p>
          <hr />
          <label class="union-option ${this.unionLabel?"selected":""}">
            <input
              type="radio"
              name="union"
              ?checked=${this.unionLabel}
              @change=${()=>this.onToggle(!0)}
            />
            ✊ Yes, add a Union Label!
          </label>
          <label class="union-option ${this.unionLabel?"":"selected"}">
            <input
              type="radio"
              name="union"
              ?checked=${!this.unionLabel}
              @change=${()=>this.onToggle(!1)}
            />
            No thanks!
          </label>
        </div>
      </div>
    `}};Me.styles=[Ae,l`
      .union-info {
        font-size: 14px;
        line-height: 1.6;
        margin-bottom: 16px;
      }

      .union-option {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 12px 0;
        font-size: 16px;
        cursor: pointer;
        padding: 12px 16px;
        border: 2px solid #e0e0e0;
        border-radius: 6px;
        transition: all 0.2s;
      }

      .union-option:hover {
        border-color: #4ecdc4;
        background: #f9fffe;
      }

      .union-option.selected {
        border-color: #4ecdc4;
        background: #e8f8f5;
      }

      .union-option input {
        accent-color: #4ecdc4;
      }

      a {
        color: #4ecdc4;
      }
    `],Le([mt()],Me.prototype,"unionLabel",2),Me=Le([pt("step-union-label")],Me);var Oe=Object.defineProperty,De=Object.getOwnPropertyDescriptor,Ne=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?De(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&Oe(e,s,a),a};let Re=class extends i{constructor(){super(...arguments),this.notes=""}get isComplete(){return!0}validate(){return!0}onInput(t){this.notes=t.target.value,this.dispatchEvent(new CustomEvent("step-data",{detail:{notes:this.notes},bubbles:!0,composed:!0}))}render(){return tt`
      <div class="step-card">
        <div class="step-header">
          <span class="info-icon">i</span> Additional Customer Notes
          <span class="optional-badge">Optional</span>
        </div>
        <div class="step-body">
          <p>
            If you have additional notes or requests you would like to send in
            with your order, please type them below:
          </p>
          <textarea
            placeholder="Enter any special instructions, deadlines, color matching notes..."
            .value=${this.notes}
            @input=${this.onInput}
            maxlength="2000"
          ></textarea>
          <div class="char-count">${this.notes.length} / 2,000</div>
        </div>
      </div>
    `}};Re.styles=[Ae,l`
      textarea {
        width: 100%;
        min-height: 120px;
        padding: 12px;
        font-size: 15px;
        border: 2px solid #ddd;
        border-radius: 6px;
        resize: vertical;
        font-family: inherit;
        box-sizing: border-box;
      }
      textarea:focus {
        border-color: #4ecdc4;
        outline: none;
      }
      .char-count {
        text-align: right;
        font-size: 12px;
        color: #999;
        margin-top: 4px;
      }
      .optional-badge {
        display: inline-block;
        background: #e0e0e0;
        color: #666;
        padding: 2px 8px;
        border-radius: 10px;
        font-size: 11px;
        font-weight: 600;
        margin-left: 8px;
      }
    `],Ne([mt()],Re.prototype,"notes",2),Re=Ne([pt("step-notes")],Re);const Be={productType:"tshirt",label:"Custom T-Shirts",steps:[{id:"garment",title:"Choose Your Garment",tag:"step-tshirt-garment"},{id:"artwork",title:"Upload Artwork",tag:"step-artwork",props:t=>({printLocationId:t.printLocationId||"",sidedness:t.printLocationSidedness||"one-sided"})},{id:"union-label",title:"Union Label",tag:"step-union-label"},{id:"notes",title:"Additional Notes",tag:"step-notes"}]},He={tshirt:Be,sticker:{productType:"sticker",label:"Custom Stickers",steps:[{id:"sticker-config",title:"Configure Your Stickers",tag:"step-sticker-config"},{id:"artwork",title:"Upload Artwork",tag:"step-artwork",props:()=>({printLocationId:"sticker-front",sidedness:"one-sided"})},{id:"union-label",title:"Union Label",tag:"step-union-label"},{id:"notes",title:"Additional Notes",tag:"step-notes"}]},button:{productType:"button",label:"Custom Buttons",steps:[{id:"button-config",title:"Configure Your Buttons",tag:"step-button-config"},{id:"artwork",title:"Upload Artwork",tag:"step-artwork",props:()=>({printLocationId:"button-front",sidedness:"one-sided"})},{id:"union-label",title:"Union Label",tag:"step-union-label"},{id:"notes",title:"Additional Notes",tag:"step-notes"}]},mug:{productType:"mug",label:"Custom Mugs",steps:[{id:"mug-config",title:"Configure Your Mugs",tag:"step-mug-config"},{id:"artwork",title:"Upload Artwork",tag:"step-artwork",props:()=>({printLocationId:"mug-wrap",sidedness:"one-sided"})},{id:"union-label",title:"Union Label",tag:"step-union-label"},{id:"notes",title:"Additional Notes",tag:"step-notes"}]},cancooler:{productType:"cancooler",label:"Custom Can Coolers",steps:[{id:"cancooler-config",title:"Configure Your Can Coolers",tag:"step-cancooler-config"},{id:"artwork",title:"Upload Artwork",tag:"step-artwork",props:t=>({printLocationId:"cooler-wrap",sidedness:"two-sided"===t.coolerPrintSide?.id?"two-sided":"one-sided"})},{id:"union-label",title:"Union Label",tag:"step-union-label"},{id:"notes",title:"Additional Notes",tag:"step-notes"}]},yardsign:{productType:"yardsign",label:"Coroplast Yard Signs",steps:[{id:"yardsign-config",title:"Configure Your Yard Signs",tag:"step-yardsign-config"},{id:"artwork",title:"Upload Artwork",tag:"step-artwork",props:t=>({printLocationId:"sign-face",sidedness:"two-sided"===t.signPrintSide?.id?"two-sided":"one-sided"})},{id:"union-label",title:"Union Label",tag:"step-union-label"},{id:"notes",title:"Additional Notes",tag:"step-notes"}]}};function We(t){return He[t]||Be}const je=yt.sessionPrefix,Xe={475:{orderId:3706,frontArtwork:3712,backArtwork:3713},476:{orderId:3707,artwork:3714},477:{orderId:3708,artwork:3716},478:{orderId:3711,artwork:3717},479:{orderId:3709,frontArtwork:3718,backArtwork:3719},480:{orderId:3710,frontArtwork:3720,backArtwork:3721}};function Ge(t){try{const e=sessionStorage.getItem(je+t);return e?JSON.parse(e):null}catch{return null}}function Ye(t){return new Promise((e,s)=>{const o=new FileReader;o.onload=()=>{const t=new Image;t.onload=()=>{const s=150;let o=t.width,r=t.height;o>r?o>s&&(r=r*s/o,o=s):r>s&&(o=o*s/r,r=s);const a=document.createElement("canvas");a.width=o,a.height=r;a.getContext("2d").drawImage(t,0,0,o,r),e(a.toDataURL("image/jpeg",.7))},t.onerror=s,t.src=o.result},o.onerror=s,o.readAsDataURL(t)})}async function Je(t,e,s,o,r){const a=Xe[t];if(!a)return console.error("[submitNativeForm] No modifier config for product "+t),void(window.location.href="/cart.php");console.log("[submitNativeForm] Submitting via FormData:",{productId:t,productType:e,orderId:s,hasFrontFile:!!o,hasBackFile:!!r,frontFileName:o?.name||"none",backFileName:r?.name||"none"});const l=new FormData;if(l.append("product_id",String(t)),l.append("action","add"),l.append("qty[]","1"),l.append("attribute["+a.orderId+"]",s),o){const t=a.frontArtwork||a.artwork;t&&(l.append("attribute["+t+"]",o,o.name),console.log("[submitNativeForm] Attached front file:",o.name,"size:",o.size,"type:",o.type,"modifier:",t))}r&&a.backArtwork&&(l.append("attribute["+a.backArtwork+"]",r,r.name),console.log("[submitNativeForm] Attached back file:",r.name,"size:",r.size,"type:",r.type,"modifier:",a.backArtwork));try{const t=await fetch("/cart.php",{method:"POST",body:l,credentials:"same-origin",redirect:"follow"});console.log("[submitNativeForm] Response status:",t.status),console.log("[submitNativeForm] Response URL:",t.url),window.location.href="/cart.php"}catch(d){console.error("[submitNativeForm] Fetch error:",d),console.log("[submitNativeForm] Falling back to form element submission"),function(t,e,s,o,r){const a=Xe[t];if(!a)return void(window.location.href="/cart.php");const l=document.createElement("form");l.method="POST",l.action="/cart.php",l.enctype="multipart/form-data",l.style.display="none";const d=document.createElement("input");d.type="hidden",d.name="product_id",d.value=String(t),l.appendChild(d);const c=document.createElement("input");c.type="hidden",c.name="action",c.value="add",l.appendChild(c);const p=document.createElement("input");p.type="hidden",p.name="qty[]",p.value="1",l.appendChild(p);const h=document.createElement("input");if(h.type="hidden",h.name="attribute["+a.orderId+"]",h.value=s,l.appendChild(h),o){const t=a.frontArtwork||a.artwork;if(t){const e=document.createElement("input");e.type="file",e.name="attribute["+t+"]";const s=new DataTransfer;s.items.add(o),e.files=s.files,l.appendChild(e)}}if(r&&a.backArtwork){const t=document.createElement("input");t.type="file",t.name="attribute["+a.backArtwork+"]";const e=new DataTransfer;e.items.add(r),t.files=e.files,l.appendChild(t)}document.body.appendChild(l),l.submit()}(t,0,s,o,r)}}const Ke={upload:"Uploaded with order",email:"Will send later via email",help:"Needs design help"};var Ze=Object.defineProperty,ti=Object.getOwnPropertyDescriptor,ei=(t,e,s,o)=>{for(var r,a=o>1?void 0:o?ti(e,s):e,l=t.length-1;l>=0;l--)(r=t[l])&&(a=(o?r(e,s,a):r(a))||a);return o&&a&&Ze(e,s,a),a};return t.BulkConfigurator=class BulkConfigurator extends i{constructor(){super(...arguments),this.productType="tshirt",this.productId=0,this.currentStep=0,this.stepData={},this.toastMessage="",this.toastType="error",this.toastFading=!1,this.addingToCart=!1}get steps(){return this.productConfig.steps}get isLastStep(){return this.currentStep===this.steps.length-1}connectedCallback(){super.connectedCallback(),this.productConfig=We(this.productType);const t=Ge(this.productType);t&&(this.stepData=t.stepData||{},this.currentStep=t.currentStep||0)}firstUpdated(){this.renderRoot.addEventListener("step-data",t=>{t.stopPropagation(),this.stepData={...this.stepData,...t.detail},this.persistSession(),this.requestUpdate(),this.dispatchEvent(new CustomEvent("config-update",{detail:{...this.stepData},bubbles:!0,composed:!0}))})}updated(t){if(t.has("productType")&&void 0!==t.get("productType")){const e=t.get("productType");if(e&&e!==this.productType){this.productConfig=We(this.productType),this.currentStep=0;const t=Ge(this.productType);t?(this.stepData=t.stepData||{},this.currentStep=t.currentStep||0):this.stepData={}}}}persistSession(){!function(t,e){try{sessionStorage.setItem(je+t,JSON.stringify(e))}catch{}}(this.productType,{stepData:this.stepData,currentStep:this.currentStep})}showToast(t,e="error"){this.toastMessage=t,this.toastType=e,this.toastFading=!1,setTimeout(()=>{this.toastFading=!0,setTimeout(()=>{this.toastMessage="",this.toastFading=!1},300)},2700)}validateCurrentStep(){const t=this.steps[this.currentStep],e=this.shadowRoot?.querySelector(t.tag);return!e||"function"!=typeof e.validate||e.validate()}next(){this.validateCurrentStep()?this.currentStep<this.steps.length-1&&(this.currentStep++,this.persistSession(),this.scrollIntoView({behavior:"smooth",block:"start"})):this.showToast("⚠️ Please complete all required fields before continuing")}back(){this.currentStep>0&&(this.currentStep--,this.persistSession(),this.scrollIntoView({behavior:"smooth",block:"start"}))}goToStep(t){t<this.currentStep?(this.currentStep=t,this.persistSession()):t>this.currentStep&&(this.validateCurrentStep()&&t===this.currentStep+1?(this.currentStep=t,this.persistSession()):this.validateCurrentStep()?this.showToast("⚠️ Please complete each step in order"):this.showToast("⚠️ Please complete this step first"))}async handleAddToCart(){if(this.addingToCart)return;const t=this.stepData.priceResult;if(t&&t.totalPrice){this.addingToCart=!0;try{const e=function(t,e){const s={"Configurator Type":t};switch(t){case"tshirt":if(e.tier&&(s["Garment Tier"]=e.tier),e.fit&&(s["Garment Fit"]=e.fit),e.printLocationId&&(s["Print Location"]=e.printLocationId),e.color&&(s.Color=e.color.name+" (#"+e.color.hex+")"),"both"===e.fit&&(e.unisexColor&&(s["Unisex Color"]=e.unisexColor.name+" (#"+e.unisexColor.hex+")"),e.womensColor&&(s["Women's Color"]=e.womensColor.name+" (#"+e.womensColor.hex+")")),e.unisexQuantities){const t=Object.entries(e.unisexQuantities).filter(([t,e])=>e>0).map(([t,e])=>t+":"+e).join(", ");t&&(s["Unisex Sizes"]=t)}if(e.womensQuantities){const t=Object.entries(e.womensQuantities).filter(([t,e])=>e>0).map(([t,e])=>t+":"+e).join(", ");t&&(s["Women's Sizes"]=t)}break;case"sticker":e.shape&&(s.Shape=e.shape.name),e.width&&(s.Width=e.width+'"'),e.height&&(s.Height=e.height+'"'),e.finish&&(s.Finish=e.finish.name),e.quantity&&(s.Quantity=String(e.quantity));break;case"button":e.buttonSize&&(s["Button Size"]=e.buttonSize.label),e.quantity&&(s.Quantity=String(e.quantity));break;case"mug":e.mugStyle&&(s["Mug Style"]=e.mugStyle.label),e.quantity&&(s.Quantity=String(e.quantity)),e.includePackaging&&(s.Packaging="Individual gift box (+$2.50/mug)");break;case"cancooler":e.coolerColor&&(s["Cooler Color"]=e.coolerColor.name),e.coolerPrintSide&&(s["Print Sides"]=e.coolerPrintSide.label),e.quantity&&(s.Quantity=String(e.quantity));break;case"yardsign":e.signPrintSide&&(s["Print Sides"]=e.signPrintSide.label),e.quantity&&(s.Quantity=String(e.quantity)),e.fullBleed&&(s["Full Bleed"]="Yes (+$0.50/sign)"),e.stakeOption&&"none"!==e.stakeOption.id&&(s.Stakes=e.stakeOption.label)}return e.artworkOption&&(s["Upload Artwork"]=Ke[e.artworkOption]||e.artworkOption),e.frontFileName&&(s["Artwork File"]=e.frontFileName),e.backFileName&&(s["Artwork File 2"]=e.backFileName),s["Union Label"]=e.unionLabel?"Yes":"No",s.Notes=e.notes?e.notes:"None",e.priceResult&&(s["Quoted Price"]="$"+Number(e.priceResult.totalPrice).toFixed(2),s["Quoted Quantity"]=String(e.priceResult.totalQuantity||1)),s}(this.productType,this.stepData),s=this.stepData.file instanceof File?this.stepData.file:null,o=this.stepData.backFile instanceof File?this.stepData.backFile:null;let r,a;if(s)try{r=await Ye(s)}catch{}if(o)try{a=await Ye(o)}catch{}const l=this.productType+"-"+Date.now().toString(36)+"-"+Math.random().toString(36).slice(2,8),d={productType:this.productType,productId:this.productId,fields:e,artworkDataUrl:r,artworkDataUrl2:a,timestamp:Date.now(),needsPriceFix:!0,orderId:l},c="bulk-order-pending",p=JSON.parse(localStorage.getItem(c)||"[]");p.push(d),localStorage.setItem(c,JSON.stringify(p)),console.log("[handleAddToCart] Order config stored:",{productType:this.productType,productId:this.productId,price:t.totalPrice,orderId:l,hasFrontFile:!!s,hasBackFile:!!o}),this.dispatchEvent(new CustomEvent("add-to-cart",{detail:{productId:this.productId,productType:this.productType,quantity:t.totalQuantity||1,price:t.totalPrice,customFields:e},bubbles:!0,composed:!0})),this.productId>0?(this.showToast("✅ Adding to cart...","success"),function(t){try{sessionStorage.removeItem(je+t)}catch{}}(this.productType),await Je(this.productId,this.productType,l,s,o)):(console.log("[handleAddToCart] Dev mode — order config:",e),this.showToast("✅ Added to cart! (dev mode)","success"),this.addingToCart=!1)}catch(e){console.error("[handleAddToCart] Error:",e),this.showToast("⚠️ Error: "+String(e)),this.addingToCart=!1}}else this.showToast("⚠️ No price calculated")}getCartButtonText(){if(this.addingToCart)return"Adding...";if(this.stepData.priceResult){return"Add to Cart — "+("$"+Number(this.stepData.priceResult.totalPrice).toFixed(2))}return"Add to Cart"}getPriceDisplay(){const t=this.stepData.priceResult;if(!t||!t.totalPrice)return null;const e="$"+Number(t.totalPrice).toFixed(2),s=t.totalQuantity||0;return{total:e,unit:s>0?"$"+(t.totalPrice/s).toFixed(2)+" ea.":""}}renderStepElement(t,e){switch(t.tag){case"step-tshirt-garment":return tt`<step-tshirt-garment
          .productType=${this.productType}
        ></step-tshirt-garment>`;case"step-sticker-config":return tt`<step-sticker-config></step-sticker-config>`;case"step-button-config":return tt`<step-button-config></step-button-config>`;case"step-mug-config":return tt`<step-mug-config></step-mug-config>`;case"step-cancooler-config":return tt`<step-cancooler-config></step-cancooler-config>`;case"step-yardsign-config":return tt`<step-yardsign-config></step-yardsign-config>`;case"step-artwork":return tt`<step-artwork
          .printLocationId=${e.printLocationId||""}
          .sidedness=${e.sidedness||"one-sided"}
        ></step-artwork>`;case"step-union-label":return tt`<step-union-label></step-union-label>`;case"step-notes":return tt`<step-notes></step-notes>`;default:return tt`<div>Unknown step: ${t.tag}</div>`}}renderStep(t,e){const s=this.currentStep===e,o=t.props?t.props(this.stepData):{};return tt`
      <div class="${s?"":"hidden"}">
        ${this.renderStepElement(t,o)}
      </div>
    `}render(){const t=this.getPriceDisplay();return tt`
      ${this.toastMessage?tt`
            <div
              class="validation-toast ${this.toastType} ${this.toastFading?"fade-out":""}"
            >
              ${this.toastMessage}
            </div>
          `:""}

      <div class="step-indicator">
        ${this.steps.map((t,e)=>tt`
            <div
              class="step-dot
                ${e===this.currentStep?"active":""}
                ${e<this.currentStep?"complete":""}"
              @click=${()=>this.goToStep(e)}
            ></div>
          `)}
      </div>

      <div class="step-labels">
        ${this.steps.map((t,e)=>tt`
            <span
              class="step-label
                ${e===this.currentStep?"active":""}
                ${e<this.currentStep?"complete":""}"
            >
              ${t.title}
            </span>
          `)}
      </div>

      <div class="step-title">
        Step ${this.currentStep+1}: ${this.steps[this.currentStep].title}
      </div>

      ${this.steps.map((t,e)=>this.renderStep(t,e))}
      ${t?tt`
            <div class="price-bar">
              <span>Your Quote</span>
              <span>
                <span class="price-amount">${t.total}</span>
                <span class="price-unit">${t.unit}</span>
              </span>
            </div>
          `:""}

      <div class="nav-buttons">
        ${this.currentStep>0?tt`<button class="btn-back" @click=${this.back}>Back</button>`:""}
        ${this.isLastStep?tt`
              <button
                class="btn-cart ${this.addingToCart?"loading":""}"
                ?disabled=${this.addingToCart}
                @click=${this.handleAddToCart}
              >
                ${this.getCartButtonText()}
              </button>
            `:tt`<button class="btn-next" @click=${this.next}>Next</button>`}
      </div>
    `}},t.BulkConfigurator.styles=[Ae,l`
      :host {
        display: block;
      }

      .step-indicator {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-bottom: 8px;
      }

      .step-dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: #ddd;
        cursor: pointer;
        transition: all 0.2s;
      }

      .step-dot.active {
        background: #4ecdc4;
        transform: scale(1.2);
      }

      .step-dot.complete {
        background: #333;
      }

      .step-labels {
        display: flex;
        justify-content: center;
        gap: 24px;
        margin-bottom: 20px;
        font-size: 12px;
        color: #999;
      }

      .step-label {
        text-align: center;
        transition: color 0.2s;
      }

      .step-label.active {
        color: #333;
        font-weight: 600;
      }

      .step-label.complete {
        color: #2ecc71;
      }

      .hidden {
        display: none;
      }

      .nav-buttons {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-top: 20px;
        padding: 16px 0;
      }

      button {
        padding: 10px 24px;
        font-size: 14px;
        font-weight: 600;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      }

      button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      button:not(:disabled):hover {
        transform: translateY(-1px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      .btn-back {
        background: #999;
        color: white;
      }

      .btn-next {
        background: #333;
        color: white;
      }

      .btn-cart {
        background: #4ecdc4;
        color: white;
        font-size: 16px;
        padding: 12px 32px;
      }

      .btn-cart:disabled {
        background: #ccc;
      }

      .btn-cart.loading {
        background: #95d5d0;
        cursor: wait;
      }

      .step-title {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        margin-bottom: 16px;
        color: #333;
      }

      .validation-toast {
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        animation: slideDown 0.3s ease-out;
      }

      .validation-toast.error {
        background: #e74c3c;
        color: white;
      }

      .validation-toast.success {
        background: #2ecc71;
        color: white;
      }

      .validation-toast.fade-out {
        animation: slideUp 0.3s ease-in forwards;
      }

      @keyframes slideDown {
        from {
          transform: translateX(-50%) translateY(-20px);
          opacity: 0;
        }
        to {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
      }

      @keyframes slideUp {
        from {
          transform: translateX(-50%) translateY(0);
          opacity: 1;
        }
        to {
          transform: translateX(-50%) translateY(-20px);
          opacity: 0;
        }
      }

      .price-bar {
        position: sticky;
        bottom: 0;
        left: 0;
        right: 0;
        background: #2c3e50;
        color: white;
        padding: 12px 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px 8px 0 0;
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        margin-top: 16px;
      }

      .price-bar .price-amount {
        font-size: 22px;
        color: #4ecdc4;
      }

      .price-bar .price-unit {
        font-size: 14px;
        color: #bbb;
        margin-left: 8px;
      }
    `],ei([gt({type:String})],t.BulkConfigurator.prototype,"productType",2),ei([gt({type:Number})],t.BulkConfigurator.prototype,"productId",2),ei([mt()],t.BulkConfigurator.prototype,"currentStep",2),ei([mt()],t.BulkConfigurator.prototype,"stepData",2),ei([mt()],t.BulkConfigurator.prototype,"toastMessage",2),ei([mt()],t.BulkConfigurator.prototype,"toastType",2),ei([mt()],t.BulkConfigurator.prototype,"toastFading",2),ei([mt()],t.BulkConfigurator.prototype,"addingToCart",2),t.BulkConfigurator=ei([pt("bulk-configurator")],t.BulkConfigurator),t.CONFIG=yt,t.getProductConfig=We,Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),t}({});
