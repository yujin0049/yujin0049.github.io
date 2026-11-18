(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=`modulepreload`,t=function(e,t){return new URL(e,t).href},n={},r=function(e){return e.pathname.endsWith(`.css`)},i=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},a=function(a,o,s){let c=Promise.resolve();if(o&&o.length>0){let a,l=document.querySelector(`meta[property=csp-nonce]`),u=l?.nonce||l?.getAttribute(`nonce`);function d(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function f(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}c=d(o.map(o=>{o=t(o,s);let c=f(o),l=r(c);return i(n,c.href,()=>{if(a===void 0){a={all:new Set,styles:new Set};let e=document.getElementsByTagName(`link`);for(let t=e.length-1;t>=0;t--){let n=e[t];a.all.add(n.href),n.rel===`stylesheet`&&a.styles.add(n.href)}}if((l?a.styles:a.all).has(c.href))return;let t=document.createElement(`link`);if(t.rel=l?`stylesheet`:e,l||(t.as=`script`),t.crossOrigin=``,t.href=c.href,u&&t.setAttribute(`nonce`,u),document.head.appendChild(t),l)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${c}`)))})})}).filter(e=>e!==void 0))}function l(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return c.then(e=>{for(let t of e||[])t.status===`rejected`&&l(t.reason);return a().catch(l)})},o=6.283185307179586;function s(e,t){if(e=e.replace(/precision (highp|mediump) float;/,`$& uniform bool u_loop; uniform float u_loopPhase,u_loopCycles,u_loopStart;`),t===`metal`)e=e.replace(`float t = .3 * (u_time + firstFrameOffset);`,`float t = u_loop ? .3*(u_loopStart+firstFrameOffset)+u_loopPhase/6.28318530718*u_loopCycles : .3*(u_time+firstFrameOffset);`),e=e.replace(`snoise(uv - t)`,`snoise(u_loop ? uv-vec2(.3*(u_loopStart+2.8))+.65*vec2(cos(u_loopPhase*u_loopCycles),sin(u_loopPhase*u_loopCycles)) : uv-t)`);else if(t===`heat`)e=e.replace(`float t = .1 * u_time;`,`float t = u_loop ? .1*u_loopStart+u_loopPhase/6.28318530718*u_loopCycles : .1*u_time;`);else for(let[t,n,r]of[[`t*.72`,1,0],[`t*.65`,1,0],[`t*.61`,1,1.1],[`t*.76`,1,1.1],[`t*.5`,2,.4],[`u_time*.13`,1,0],[`u_time*.19+.8`,1,.8],[`u_time*.17`,1,0]])for(let i of[`sin`,`cos`])e=e.replaceAll(i+`(`+t+`)`,i+`(u_loop ? u_loopPhase*`+n+`.*u_loopCycles+`+r.toFixed(2)+` : `+t+`)`);return e}function c(e,t,n){return{u_loop:t>0,u_loopPhase:0,u_loopStart:n/1e3,u_loopCycles:t===0?0:e===`metal`?Math.max(1,Math.round(t*1.8)):e===`glass`?Math.max(1,Math.round(t/1.5)):1}}async function l({mount:e,canvas:t,mode:n,speed:r,transparent:i,onProgress:s}){let{Output:l,WebMOutputFormat:u,BufferTarget:d,CanvasSource:f,Quality:p,canEncodeVideo:m}=await a(async()=>{let{Output:e,WebMOutputFormat:t,BufferTarget:n,CanvasSource:r,Quality:i,canEncodeVideo:a}=await import(`./src-DZoE3RZV.js`);return{Output:e,WebMOutputFormat:t,BufferTarget:n,CanvasSource:r,Quality:i,canEncodeVideo:a}},[],import.meta.url),h=t.width,g=t.height,_=new p({bitrate:Math.max(8e6,h*g*3)}),v=await m(`vp9`,{width:h,height:g,quality:_,frameRate:30})?`vp9`:await m(`vp8`,{width:h,height:g,quality:_,frameRate:30})?`vp8`:null;if(!v)throw Error(`Video encoding is unavailable. Try Chrome or Edge.`);let y=new l({format:new u,target:new d}),b=new f(t,{codec:v,quality:_,alpha:i?`keep`:`discard`,keyFrameInterval:6});y.addVideoTrack(b,{frameRate:30});let x=e.getCurrentFrame();e.setSpeed(0);let S=c(n,r,x);e.setUniforms(S);try{await y.start();for(let n=0;n<180;n++){if(t.width!==h||t.height!==g)throw Error(`Preview resized during export. Please try again.`);e.setUniforms({u_loopPhase:o*n/180}),e.setFrame(x),await b.add(n/30,1/30,{keyFrame:n===0}),n%6==0&&(s(Math.round(n/180*100)),await new Promise(e=>setTimeout(e,0)))}return b.close(),await y.finalize(),new Blob([y.target.buffer],{type:`video/webm`})}catch(e){throw await y.cancel(),e}finally{e.setUniforms({u_loop:!1,u_loopPhase:0}),e.setFrame(x)}}var u=`#version 300 es
precision highp float;
uniform mediump vec2 u_resolution;
uniform mediump float u_scale,u_imageAspectRatio;
out vec4 fragColor;
uniform sampler2D u_image;
uniform float u_time,u_frost,u_backlight,u_thickness,u_angle,u_haze,u_lightSize;
uniform vec4 u_colorBack,u_glass,u_light,u_rim;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float softRing(vec2 p,float radius,float width){return exp(-pow((length(p)-radius)/width,2.));}
vec3 behind(vec2 p,float rough){
 float t=u_time*.23;
 vec2 a=vec2(.14*sin(t*.72),.24*cos(t*.65));
 vec2 b=vec2(-.2*cos(t*.61),-.25*sin(t*.76));
 float size=u_lightSize;
 float width=(.012+rough*.075)*size;
 float ring=softRing(p-a,(.105+.015*sin(t*.5))*size,width);
 float rear=softRing((p-b)*vec2(.9,1.1),.17*size,width*1.5);
 float disk=exp(-dot(p-b,p-b)/((.005+rough*.022)*size*size));
 float scatter=exp(-dot(p-a,p-a)/((.025+rough*.05)*size*size));
 return u_light.rgb*(ring*.56+rear*.23+disk*.34+scatter*.1)*u_backlight;
}
void main(){
 // Fragment coordinates avoid half-precision UV stepping at 2K/4K.
 float boxWidth=min(u_resolution.x/u_imageAspectRatio,u_resolution.y)*u_imageAspectRatio;
 vec2 boxSize=vec2(boxWidth,boxWidth/u_imageAspectRatio);
 vec2 uv=(gl_FragCoord.xy-.5*u_resolution)/boxSize/u_scale+.5;
 uv.y=1.-uv.y;
 vec2 footprint=fwidth(uv)*.38;
 vec4 field=texture(u_image,uv);
 float mask=(field.g*4.+texture(u_image,uv+footprint).g+texture(u_image,uv-footprint).g+texture(u_image,uv+vec2(footprint.x,-footprint.y)).g+texture(u_image,uv+vec2(-footprint.x,footprint.y)).g)/8.;
 vec2 texel=1./vec2(textureSize(u_image,0));
 // The Poisson field supplies a continuous curved face and rounded glass lip.
 vec2 delta=max(texel*16.,vec2(.006));
 vec2 slope=vec2(textureLod(u_image,uv+vec2(delta.x,0.),4.).r-textureLod(u_image,uv-vec2(delta.x,0.),4.).r,textureLod(u_image,uv+vec2(0.,delta.y),4.).r-textureLod(u_image,uv-vec2(0.,delta.y),4.).r)/max(delta.x+delta.y,.0001);
 vec2 bend=slope*(.085+.1*u_thickness);
 bend=bend/(1.+length(bend)*.7);
 vec3 normal=normalize(vec3(-bend,1.));
 vec3 ray=refract(vec3(0.,0.,-1.),normal,1./1.46);
 vec2 offset=ray.xy*(.16+.23*u_thickness)/max(.25,abs(ray.z));
 float angle=radians(u_angle);mat2 rot=mat2(cos(angle),-sin(angle),sin(angle),cos(angle));
 vec2 p=rot*(uv-.5);
 vec3 transmission=behind(p+rot*offset,u_frost);
 // Subtle second internal reflection gives the backlight real depth.
 transmission+=behind(p-rot*offset*.58+vec2(.012,-.02),min(1.,u_frost+.22))*.18;
 float cosView=clamp(normal.z,0.,1.);
 float fresnel=.035+.965*pow(1.-cosView,5.);
 float rim=pow(clamp(field.r,0.,1.),7.);
 float key=pow(max(0.,dot(normal,normalize(vec3(-.7+.3*sin(u_time*.13),.8,1.1)))),24.);
 float strip=exp(-pow((normal.x*.8+normal.y*.5-.32)/(.05+.12*u_frost),2.));
 float reflection=key*.18+strip*.045;
 // A rounded bevel bends the backlight into localized bright/dark ribbons.
 float edgeHeight=clamp(textureLod(u_image,uv,2.).r,0.,1.);
 float bevelBand=smoothstep(.24,.62,edgeHeight)*(1.-smoothstep(.9,.995,edgeHeight));
 vec2 movingKey=normalize(vec2(cos(u_time*.19+.8),sin(u_time*.19+.8)));
 float bevelFacing=pow(max(0.,dot(normalize(slope+vec2(.00001)),movingKey)),5.);
 float bevelWidth=.105+.055*u_frost;
 float crest=exp(-pow((edgeHeight-(.73+.035*sin(u_time*.17)))/bevelWidth,2.));
 float groove=exp(-pow((edgeHeight-.51)/(.05+.04*u_frost),2.));
 vec3 bevelTransmission=behind(p+rot*offset*1.8,u_frost*.65);
 float bevelStrength=.25+.75*u_thickness;
 transmission*=1.-groove*bevelFacing*.32*bevelStrength;
 transmission+=bevelTransmission*bevelBand*bevelFacing*.45*bevelStrength;
 reflection+=crest*bevelFacing*(.035+.095*u_thickness)*(1.-smoothstep(.9,.995,edgeHeight));
 // Thickness-dependent selective absorption plus frosted surface scattering.
 float glassValue=max(u_glass.r,max(u_glass.g,u_glass.b));
 vec3 glassHue=u_glass.rgb/max(glassValue,.08);
 float opticalPath=.35+u_thickness*1.45+rim*.65;
 vec3 absorption=exp(-(vec3(1.)-glassHue)*opticalPath*1.5);
 absorption*=mix(.35,1.,smoothstep(0.,.18,glassValue));
 float incident=dot(transmission,vec3(.2126,.7152,.0722));
 vec3 transmitted=transmission*mix(vec3(1.),absorption,.28+.16*u_thickness)*(1.-fresnel);
 // Frost scatters a little incident light into the glass color: opposing hues remain readable.
 float scattering=.5+.3*u_frost;
 float scatterZone=1.-smoothstep(.07,.38,incident);
 transmitted=mix(transmitted,glassHue*incident*.95,scatterZone*scattering);
 vec3 bodyColor=u_glass.rgb*(.016+.04*u_frost+.028*u_thickness)*(1.+incident*.6);
 vec3 edgeColor=mix(u_rim.rgb,glassHue,.18+.2*fresnel);
 // One broad, faint bevel reflection; no pixel-wide contour stroke.
 vec3 reflected=edgeColor*reflection*(.65+.35*fresnel);
 float grain=(hash(gl_FragCoord.xy)-.5)*.009*u_frost*(1.-smoothstep(.65,.95,edgeHeight));
 vec2 screenUV=gl_FragCoord.xy/u_resolution;
 float frameFade=smoothstep(0.,.12,screenUV.x)*smoothstep(0.,.12,1.-screenUV.x)*smoothstep(0.,.12,screenUV.y)*smoothstep(0.,.12,1.-screenUV.y);
 vec3 atmosphere=behind(p,1.)*u_haze*.38*frameFade;
 vec3 atmosphereTint=mix(vec3(1.),mix(absorption,glassHue,.18),mask*.6);
 vec3 surface=(transmitted+bodyColor+reflected+grain)*mask+atmosphere*atmosphereTint*(1.-mask*.55);
 surface=clamp(surface,0.,1.);
 float density=mask*(.045+.065*u_frost);
 float energy=max(surface.r,max(surface.g,surface.b));
 float alpha=clamp(density+energy*.8,0.,.92);
 vec3 result=surface+u_colorBack.rgb*u_colorBack.a*(1.-alpha);
 float outAlpha=alpha+u_colorBack.a*(1.-alpha);
 fragColor=vec4(result,outAlpha);
}`,d=`#version 300 es
precision mediump float;

layout(location = 0) in vec4 a_position;

uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform float u_imageAspectRatio;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;
uniform float u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;

out vec2 v_objectUV;
out vec2 v_objectBoxSize;
out vec2 v_responsiveUV;
out vec2 v_responsiveBoxGivenSize;
out vec2 v_patternUV;
out vec2 v_patternBoxSize;
out vec2 v_imageUV;

vec3 getBoxSize(float boxRatio, vec2 givenBoxSize) {
  vec2 box = vec2(0.);
  // fit = none
  box.x = boxRatio * min(givenBoxSize.x / boxRatio, givenBoxSize.y);
  float noFitBoxWidth = box.x;
  if (u_fit == 1.) { // fit = contain
    box.x = boxRatio * min(u_resolution.x / boxRatio, u_resolution.y);
  } else if (u_fit == 2.) { // fit = cover
    box.x = boxRatio * max(u_resolution.x / boxRatio, u_resolution.y);
  }
  box.y = box.x / boxRatio;
  return vec3(box, noFitBoxWidth);
}

void main() {
  gl_Position = a_position;

  vec2 uv = gl_Position.xy * .5;
  vec2 boxOrigin = vec2(.5 - u_originX, u_originY - .5);
  vec2 givenBoxSize = vec2(u_worldWidth, u_worldHeight);
  givenBoxSize = max(givenBoxSize, vec2(1.)) * u_pixelRatio;
  float r = u_rotation * 3.14159265358979323846 / 180.;
  mat2 graphicRotation = mat2(cos(r), sin(r), -sin(r), cos(r));
  vec2 graphicOffset = vec2(-u_offsetX, u_offsetY);


  // ===================================================

  float fixedRatio = 1.;
  vec2 fixedRatioBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );

  v_objectBoxSize = getBoxSize(fixedRatio, fixedRatioBoxGivenSize).xy;
  vec2 objectWorldScale = u_resolution.xy / v_objectBoxSize;

  v_objectUV = uv;
  v_objectUV *= objectWorldScale;
  v_objectUV += boxOrigin * (objectWorldScale - 1.);
  v_objectUV += graphicOffset;
  v_objectUV /= u_scale;
  v_objectUV = graphicRotation * v_objectUV;

  // ===================================================

  v_responsiveBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  float responsiveRatio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
  vec2 responsiveBoxSize = getBoxSize(responsiveRatio, v_responsiveBoxGivenSize).xy;
  vec2 responsiveBoxScale = u_resolution.xy / responsiveBoxSize;

  #ifdef ADD_HELPERS
  v_responsiveHelperBox = uv;
  v_responsiveHelperBox *= responsiveBoxScale;
  v_responsiveHelperBox += boxOrigin * (responsiveBoxScale - 1.);
  #endif

  v_responsiveUV = uv;
  v_responsiveUV *= responsiveBoxScale;
  v_responsiveUV += boxOrigin * (responsiveBoxScale - 1.);
  v_responsiveUV += graphicOffset;
  v_responsiveUV /= u_scale;
  v_responsiveUV.x *= responsiveRatio;
  v_responsiveUV = graphicRotation * v_responsiveUV;
  v_responsiveUV.x /= responsiveRatio;

  // ===================================================

  float patternBoxRatio = givenBoxSize.x / givenBoxSize.y;
  vec2 patternBoxGivenSize = vec2(
  (u_worldWidth == 0.) ? u_resolution.x : givenBoxSize.x,
  (u_worldHeight == 0.) ? u_resolution.y : givenBoxSize.y
  );
  patternBoxRatio = patternBoxGivenSize.x / patternBoxGivenSize.y;

  vec3 boxSizeData = getBoxSize(patternBoxRatio, patternBoxGivenSize);
  v_patternBoxSize = boxSizeData.xy;
  float patternBoxNoFitBoxWidth = boxSizeData.z;
  vec2 patternBoxScale = u_resolution.xy / v_patternBoxSize;

  v_patternUV = uv;
  v_patternUV += graphicOffset / patternBoxScale;
  v_patternUV += boxOrigin;
  v_patternUV -= boxOrigin / patternBoxScale;
  v_patternUV *= u_resolution.xy;
  v_patternUV /= u_pixelRatio;
  if (u_fit > 0.) {
    v_patternUV *= (patternBoxNoFitBoxWidth / v_patternBoxSize.x);
  }
  v_patternUV /= u_scale;
  v_patternUV = graphicRotation * v_patternUV;
  v_patternUV += boxOrigin / patternBoxScale;
  v_patternUV -= boxOrigin;
  // x100 is a default multiplier between vertex and fragmant shaders
  // we use it to avoid UV presision issues
  v_patternUV *= .01;

  // ===================================================

  vec2 imageBoxSize;
  if (u_fit == 1.) { // contain
    imageBoxSize.x = min(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else if (u_fit == 2.) { // cover
    imageBoxSize.x = max(u_resolution.x / u_imageAspectRatio, u_resolution.y) * u_imageAspectRatio;
  } else {
    imageBoxSize.x = min(10.0, 10.0 / u_imageAspectRatio * u_imageAspectRatio);
  }
  imageBoxSize.y = imageBoxSize.x / u_imageAspectRatio;
  vec2 imageBoxScale = u_resolution.xy / imageBoxSize;

  v_imageUV = uv;
  v_imageUV *= imageBoxScale;
  v_imageUV += boxOrigin * (imageBoxScale - 1.);
  v_imageUV += graphicOffset;
  v_imageUV /= u_scale;
  v_imageUV.x *= u_imageAspectRatio;
  v_imageUV = graphicRotation * v_imageUV;
  v_imageUV.x /= u_imageAspectRatio;

  v_imageUV += .5;
  v_imageUV.y = 1. - v_imageUV.y;
}`,f=8294400,p=class{parentElement;canvasElement;gl;program=null;uniformLocations={};fragmentShader;rafId=null;lastRenderTime=0;currentFrame=0;speed=0;currentSpeed=0;providedUniforms;mipmaps=[];hasBeenDisposed=!1;resolutionChanged=!0;textures=new Map;minPixelRatio;maxPixelCount;isSafari=_();uniformCache={};textureUnitMap=new Map;ownerDocument;constructor(e,t,n,r,i=0,a=0,o=2,s=f,c=[]){if(e?.nodeType===1)this.parentElement=e;else throw Error(`Paper Shaders: parent element must be an HTMLElement`);if(this.ownerDocument=e.ownerDocument,!this.ownerDocument.querySelector(`style[data-paper-shader]`)){let e=this.ownerDocument.createElement(`style`);e.innerHTML=g,e.setAttribute(`data-paper-shader`,``),this.ownerDocument.head.prepend(e)}let l=this.ownerDocument.createElement(`canvas`);this.canvasElement=l,this.parentElement.prepend(l),this.fragmentShader=t,this.providedUniforms=n,this.mipmaps=c,this.currentFrame=a,this.minPixelRatio=o,this.maxPixelCount=s;let u=l.getContext(`webgl2`,{antialias:!1,depth:!1,stencil:!1,...r});if(!u)throw Error(`Paper Shaders: WebGL is not supported in this browser`);this.gl=u,this.initProgram(),this.setupPositionAttribute(),this.setupUniforms(),this.setUniformValues(this.providedUniforms),this.setupResizeObserver(),visualViewport?.addEventListener(`resize`,this.handleVisualViewportChange),this.setupIntersectionObserver(),this.setSpeed(i),this.parentElement.setAttribute(`data-paper-shader`,``),this.parentElement.paperShaderMount=this,this.ownerDocument.addEventListener(`visibilitychange`,this.handleDocumentVisibilityChange)}initProgram=()=>{let e=h(this.gl,d,this.fragmentShader);e&&(this.program=e,this.gl.useProgram(e))};setupPositionAttribute=()=>{let e=this.gl.getAttribLocation(this.program,`a_position`),t=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,t),this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(e),this.gl.vertexAttribPointer(e,2,this.gl.FLOAT,!1,0,0)};setupUniforms=()=>{let e={u_time:this.gl.getUniformLocation(this.program,`u_time`),u_pixelRatio:this.gl.getUniformLocation(this.program,`u_pixelRatio`),u_resolution:this.gl.getUniformLocation(this.program,`u_resolution`)};Object.entries(this.providedUniforms).forEach(([t,n])=>{if(e[t]=this.gl.getUniformLocation(this.program,t),n instanceof HTMLImageElement){let n=`${t}AspectRatio`;e[n]=this.gl.getUniformLocation(this.program,n)}}),this.uniformLocations=e};renderScale=1;parentWidth=0;parentHeight=0;parentDevicePixelWidth=0;parentDevicePixelHeight=0;devicePixelsSupported=!1;intersectionObserver=null;isInViewport=!0;resizeObserver=null;setupResizeObserver=()=>{this.resizeObserver=new ResizeObserver(([e])=>{if(e?.borderBoxSize[0]){let t=e.devicePixelContentBoxSize?.[0];t!==void 0&&(this.devicePixelsSupported=!0,this.parentDevicePixelWidth=t.inlineSize,this.parentDevicePixelHeight=t.blockSize),this.parentWidth=e.borderBoxSize[0].inlineSize,this.parentHeight=e.borderBoxSize[0].blockSize}this.handleResize()}),this.resizeObserver.observe(this.parentElement)};setupIntersectionObserver=()=>{let e=this.ownerDocument.defaultView;e?.IntersectionObserver&&(this.intersectionObserver=new e.IntersectionObserver(([e])=>{this.isInViewport=e?.isIntersecting??!0,this.updateCurrentSpeed()}),this.intersectionObserver.observe(this.parentElement))};handleVisualViewportChange=()=>{this.resizeObserver?.disconnect(),this.setupResizeObserver()};handleResize=()=>{let e=0,t=0,n=Math.max(1,window.devicePixelRatio),r=visualViewport?.scale??1;if(this.devicePixelsSupported){let i=Math.max(1,this.minPixelRatio/n);e=this.parentDevicePixelWidth*i*r,t=this.parentDevicePixelHeight*i*r}else{let i=Math.max(n,this.minPixelRatio)*r;if(this.isSafari){let e=v(this.ownerDocument);i*=Math.max(1,e)}e=Math.round(this.parentWidth)*i,t=Math.round(this.parentHeight)*i}let i=Math.sqrt(this.maxPixelCount)/Math.sqrt(e*t),a=Math.min(1,i),o=Math.round(e*a),s=Math.round(t*a),c=o/Math.round(this.parentWidth);(this.canvasElement.width!==o||this.canvasElement.height!==s||this.renderScale!==c)&&(this.renderScale=c,this.canvasElement.width=o,this.canvasElement.height=s,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))};render=e=>{if(this.hasBeenDisposed)return;if(this.program===null){console.warn(`Tried to render before program or gl was initialized`);return}let t=e-this.lastRenderTime;this.lastRenderTime=e,this.currentSpeed!==0&&(this.currentFrame+=t*this.currentSpeed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.uniform1f(this.uniformLocations.u_time,this.currentFrame*.001),this.resolutionChanged&&=(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,this.renderScale),!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.currentSpeed===0?this.rafId=null:this.requestRender()};requestRender=()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)};setTextureUniform=(e,t)=>{if(!t.complete||t.naturalWidth===0)throw Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);let n=this.textures.get(e);n&&this.gl.deleteTexture(n),this.textureUnitMap.has(e)||this.textureUnitMap.set(e,this.textureUnitMap.size);let r=this.textureUnitMap.get(e);this.gl.activeTexture(this.gl.TEXTURE0+r);let i=this.gl.createTexture();this.gl.bindTexture(this.gl.TEXTURE_2D,i),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_S,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_WRAP_T,this.gl.CLAMP_TO_EDGE),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MAG_FILTER,this.gl.LINEAR),this.gl.texImage2D(this.gl.TEXTURE_2D,0,this.gl.RGBA,this.gl.RGBA,this.gl.UNSIGNED_BYTE,t),this.mipmaps.includes(e)&&(this.gl.generateMipmap(this.gl.TEXTURE_2D),this.gl.texParameteri(this.gl.TEXTURE_2D,this.gl.TEXTURE_MIN_FILTER,this.gl.LINEAR_MIPMAP_LINEAR));let a=this.gl.getError();if(a!==this.gl.NO_ERROR||i===null){console.error(`Paper Shaders: WebGL error when uploading texture:`,a);return}this.textures.set(e,i);let o=this.uniformLocations[e];if(o){this.gl.uniform1i(o,r);let n=`${e}AspectRatio`,i=this.uniformLocations[n];if(i){let e=t.naturalWidth/t.naturalHeight;this.gl.uniform1f(i,e)}}};areUniformValuesEqual=(e,t)=>e===t?!0:Array.isArray(e)&&Array.isArray(t)&&e.length===t.length?e.every((e,n)=>this.areUniformValuesEqual(e,t[n])):!1;setUniformValues=e=>{Object.entries(e).forEach(([e,t])=>{let n=t;if(t instanceof HTMLImageElement&&(n=`${t.src.slice(0,200)}|${t.naturalWidth}x${t.naturalHeight}`),this.areUniformValuesEqual(this.uniformCache[e],n))return;this.uniformCache[e]=n;let r=this.uniformLocations[e];if(!r)console.warn(`Uniform location for ${e} not found`);else if(t instanceof HTMLImageElement)this.setTextureUniform(e,t);else if(Array.isArray(t)){let n=null,i=null;if(t[0]!==void 0&&Array.isArray(t[0])){let r=t[0].length;if(t.every(e=>e.length===r))n=t.flat(),i=r;else{console.warn(`All child arrays must be the same length for ${e}`);return}}else n=t,i=n.length;switch(i){case 2:this.gl.uniform2fv(r,n);break;case 3:this.gl.uniform3fv(r,n);break;case 4:this.gl.uniform4fv(r,n);break;case 9:this.gl.uniformMatrix3fv(r,!1,n);break;case 16:this.gl.uniformMatrix4fv(r,!1,n);break;default:console.warn(`Unsupported uniform array length: ${i}`)}}else typeof t==`number`?this.gl.uniform1f(r,t):typeof t==`boolean`?this.gl.uniform1i(r,+!!t):console.warn(`Unsupported uniform type for ${e}: ${typeof t}`)})};getCurrentFrame=()=>this.currentFrame;setFrame=e=>{this.currentFrame=e,this.lastRenderTime=performance.now(),this.renderUnlessAnimating()};setSpeed=(e=1)=>{this.speed=e,this.updateCurrentSpeed()};updateCurrentSpeed=()=>{this.setCurrentSpeed(this.ownerDocument.hidden||!this.isInViewport?0:this.speed)};setCurrentSpeed=e=>{this.currentSpeed=e,this.rafId===null&&e!==0&&(this.lastRenderTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&e===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)};setMaxPixelCount=(e=f)=>{this.maxPixelCount=e,this.handleResize()};setMinPixelRatio=(e=2)=>{this.minPixelRatio=e,this.handleResize()};setUniforms=e=>{this.setUniformValues(e),this.providedUniforms={...this.providedUniforms,...e},this.renderUnlessAnimating()};renderUnlessAnimating=()=>{this.rafId===null&&this.render(performance.now())};handleDocumentVisibilityChange=()=>{this.updateCurrentSpeed()};dispose=()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.textures.forEach(e=>{this.gl.deleteTexture(e)}),this.textures.clear(),this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.gl.getExtension(`WEBGL_lose_context`)?.loseContext(),this.resizeObserver&&=(this.resizeObserver.disconnect(),null),this.intersectionObserver&&=(this.intersectionObserver.disconnect(),null),visualViewport?.removeEventListener(`resize`,this.handleVisualViewportChange),this.ownerDocument.removeEventListener(`visibilitychange`,this.handleDocumentVisibilityChange),this.uniformLocations={},this.canvasElement.remove(),delete this.parentElement.paperShaderMount}};function m(e,t,n){let r=e.createShader(t);return r?(e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(`An error occurred compiling the shaders: `+e.getShaderInfoLog(r)),e.deleteShader(r),null)):null}function h(e,t,n){let r=e.getShaderPrecisionFormat(e.FRAGMENT_SHADER,e.MEDIUM_FLOAT),i=r?r.precision:null;i&&i<23&&(t=t.replace(/precision\s+(lowp|mediump)\s+float;/g,`precision highp float;`),n=n.replace(/precision\s+(lowp|mediump)\s+float/g,`precision highp float`).replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g,`$1 highp $3`));let a=m(e,e.VERTEX_SHADER,t),o=m(e,e.FRAGMENT_SHADER,n);if(!a||!o)return null;let s=e.createProgram();return s?(e.attachShader(s,a),e.attachShader(s,o),e.linkProgram(s),e.getProgramParameter(s,e.LINK_STATUS)?(e.detachShader(s,a),e.detachShader(s,o),e.deleteShader(a),e.deleteShader(o),s):(console.error(`Unable to initialize the shader program: `+e.getProgramInfoLog(s)),e.deleteProgram(s),e.deleteShader(a),e.deleteShader(o),null)):null}var g=`@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;function _(){let e=navigator.userAgent.toLowerCase();return e.includes(`safari`)&&!e.includes(`chrome`)&&!e.includes(`android`)}function v(e){let t=visualViewport?.scale??1,n=visualViewport?.width??window.innerWidth,r=window.innerWidth-e.documentElement.clientWidth,i=t*n+r,a=outerWidth/i,o=Math.round(100*a);return o%5==0?o/100:o===33?1/3:o===67?2/3:o===133?4/3:a}var y=`
#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846
`,b=`
vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}
`,x=`
  color += 1. / 256. * (fract(sin(dot(.014 * gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123) - .5);
`,S=`
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
    -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
    + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
      dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`,C={maxColorCount:10},w=`#version 300 es
precision highp float;

in mediump vec2 v_imageUV;
in mediump vec2 v_objectUV;
out vec4 fragColor;

uniform sampler2D u_image;
uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colors[${C.maxColorCount}];
uniform float u_colorsCount;

uniform float u_angle;
uniform float u_noise;
uniform float u_innerGlow;
uniform float u_outerGlow;
uniform float u_contour;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

float getImgFrame(vec2 uv, float th) {
  float frame = 1.;
  frame *= smoothstep(0., th, uv.y);
  frame *= 1. - smoothstep(1. - th, 1., uv.y);
  frame *= smoothstep(0., th, uv.x);
  frame *= 1. - smoothstep(1. - th, 1., uv.x);
  return frame;
}

float circle(vec2 uv, vec2 c, vec2 r) {
  return 1. - smoothstep(r[0], r[1], length(uv - c));
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

float sst(float edge0, float edge1, float x) {
  return smoothstep(edge0, edge1, x);
}

float shadowShape(vec2 uv, float t, float contour) {
  vec2 scaledUV = uv;

  // base shape tranjectory
  float posY = mix(-1., 2., t);

  // scaleX when it's moving down
  scaledUV.y -= .5;
  float mainCircleScale = sst(0., .8, posY) * lst(1.4, .9, posY);
  scaledUV *= vec2(1., 1. + 1.5 * mainCircleScale);
  scaledUV.y += .5;

  // base shape
  float innerR = .4;
  float outerR = 1. - .3 * (sst(.1, .2, t) * (1. - sst(.2, .5, t)));
  float s = circle(scaledUV, vec2(.5, posY - .2), vec2(innerR, outerR));
  float shapeSizing = sst(.2, .3, t) * sst(.6, .3, t);
  s = pow(s, 1.4);
  s *= 1.2;

  // flat gradient to take over the shadow shape
  float topFlattener = 0.;
  {
    float pos = posY - uv.y;
    float edge = 1.2;
    topFlattener = lst(-.4, 0., pos) * (1. - sst(.0, edge, pos));
    topFlattener = pow(topFlattener, 3.);
    float topFlattenerMixer = (1. - sst(.0, .3, pos));
    s = mix(topFlattener, s, topFlattenerMixer);
  }

  // apple right circle
  {
    float visibility = sst(.6, .7, t) * (1. - sst(.8, .9, t));
    float angle = -2. -t * TWO_PI;
    float rightCircle = circle(uv, vec2(.95 - .2 * cos(angle), .4 - .1 * sin(angle)), vec2(.15, .3));
    rightCircle *= visibility;
    s = mix(s, 0., rightCircle);
  }

  // apple top circle
  {
    float topCircle = circle(uv, vec2(.5, .19), vec2(.05, .25));
    topCircle += 2. * contour * circle(uv, vec2(.5, .19), vec2(.2, .5));
    float visibility = .55 * sst(.2, .3, t) * (1. - sst(.3, .45, t));
    topCircle *= visibility;
    s = mix(s, 0., topCircle);
  }

  float leafMask = circle(uv, vec2(.53, .13), vec2(.08, .19));
  leafMask = mix(leafMask, 0., 1. - sst(.4, .54, uv.x));
  leafMask = mix(0., leafMask, sst(.0, .2, uv.y));
  leafMask *= (sst(.5, 1.1, posY) * sst(1.5, 1.3, posY));
  s += leafMask;

  // apple bottom circle
  {
    float visibility = sst(.0, .4, t) * (1. - sst(.6, .8, t));
    s = mix(s, 0., visibility * circle(uv, vec2(.52, .92), vec2(.09, .25)));
  }

  // random balls that are invisible if apple logo is selected
  {
    float pos = sst(.0, .6, t) * (1. - sst(.6, 1., t));
    s = mix(s, .5, circle(uv, vec2(.0, 1.2 - .5 * pos), vec2(.1, .3)));
    s = mix(s, .0, circle(uv, vec2(1., .5 + .5 * pos), vec2(.1, .3)));

    s = mix(s, 1., circle(uv, vec2(.95, .2 + .2 * sst(.3, .4, t) * sst(.7, .5, t)), vec2(.07, .22)));
    s = mix(s, 1., circle(uv, vec2(.95, .2 + .2 * sst(.3, .4, t) * (1. - sst(.5, .7, t))), vec2(.07, .22)));
    s /= max(1e-4, sst(1., .85, uv.y));
  }

  s = clamp(0., 1., s);
  return s;
}

float blurEdge3x3(sampler2D tex, vec2 uv, vec2 dudx, vec2 dudy, float radius, float centerSample) {
  vec2 texel = 1.0 / vec2(textureSize(tex, 0));
  vec2 r = radius * texel;

  float w1 = 1.0, w2 = 2.0, w4 = 4.0;
  float norm = 16.0;
  float sum = w4 * centerSample;

  sum += w2 * textureGrad(tex, uv + vec2(0.0, -r.y), dudx, dudy).g;
  sum += w2 * textureGrad(tex, uv + vec2(0.0, r.y), dudx, dudy).g;
  sum += w2 * textureGrad(tex, uv + vec2(-r.x, 0.0), dudx, dudy).g;
  sum += w2 * textureGrad(tex, uv + vec2(r.x, 0.0), dudx, dudy).g;

  sum += w1 * textureGrad(tex, uv + vec2(-r.x, -r.y), dudx, dudy).g;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, -r.y), dudx, dudy).g;
  sum += w1 * textureGrad(tex, uv + vec2(-r.x, r.y), dudx, dudy).g;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, r.y), dudx, dudy).g;

  return sum / norm;
}

void main() {
  vec2 uv = v_objectUV + .5;
  uv.y = 1. - uv.y;

  vec2 imgUV = v_imageUV;
  imgUV -= .5;
  imgUV *= 0.5714285714285714;
  imgUV += .5;
  float imgSoftFrame = getImgFrame(imgUV, .03);

  vec4 img = texture(u_image, imgUV);
  vec2 dudx = dFdx(imgUV);
  vec2 dudy = dFdy(imgUV);

  if (img.a == 0.) {
    fragColor = u_colorBack;
    return;
  }

  float t = .1 * u_time;
  t -= .3;

  float tCopy = t + 1. / 3.;
  float tCopy2 = t + 2. / 3.;

  t = mod(t, 1.);
  tCopy = mod(tCopy, 1.);
  tCopy2 = mod(tCopy2, 1.);

  vec2 animationUV = imgUV - vec2(.5);
  float angle = -u_angle * PI / 180.;
  float cosA = cos(angle);
  float sinA = sin(angle);
  animationUV = vec2(
  animationUV.x * cosA - animationUV.y * sinA,
  animationUV.x * sinA + animationUV.y * cosA
  ) + vec2(.5);

  float shape = img[0];

  img[1] = blurEdge3x3(u_image, imgUV, dudx, dudy, 8., img[1]);

  float outerBlur = 1. - mix(1., img[1], shape);
  float innerBlur = mix(img[1], 0., shape);
  float contour = mix(img[2], 0., shape);

  outerBlur *= imgSoftFrame;

  float shadow = shadowShape(animationUV, t, innerBlur);
  float shadowCopy = shadowShape(animationUV, tCopy, innerBlur);
  float shadowCopy2 = shadowShape(animationUV, tCopy2, innerBlur);

  float inner = .8 + .8 * innerBlur;
  inner = mix(inner, 0., shadow);
  inner = mix(inner, 0., shadowCopy);
  inner = mix(inner, 0., shadowCopy2);

  inner *= mix(0., 2., u_innerGlow);

  inner += (u_contour * 2.) * contour;
  inner = min(1., inner);
  inner *= (1. - shape);

  float outer = 0.;
  {
    t *= 3.;
    t = mod(t - .1, 1.);

    outer = .9 * pow(outerBlur, .8);
    float y = mod(animationUV.y - t, 1.);
    float animatedMask = sst(.3, .65, y) * (1. - sst(.65, 1., y));
    animatedMask = .5 + animatedMask;
    outer *= animatedMask;
    outer *= mix(0., 5., pow(u_outerGlow, 2.));
    outer *= imgSoftFrame;
  }

  inner = pow(inner, 1.2);
  float heat = clamp(inner + outer, 0., 1.);

  heat += (.005 + .35 * u_noise) * (fract(sin(dot(uv, vec2(12.9898, 78.233))) * 43758.5453123) - .5);

  float mixer = heat * u_colorsCount;
  vec4 gradient = u_colors[0];
  gradient.rgb *= gradient.a;
  float outerShape = 0.;
  for (int i = 1; i < ${C.maxColorCount+1}; i++) {
    if (i > int(u_colorsCount)) break;
    float m = clamp(mixer - float(i - 1), 0., 1.);
    if (i == 1) {
      outerShape = m;
    }
    vec4 c = u_colors[i - 1];
    c.rgb *= c.a;
    gradient = mix(gradient, c, m);
  }

  vec3 color = gradient.rgb * outerShape;
  float opacity = gradient.a * outerShape;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1.0 - opacity);
  opacity = opacity + u_colorBack.a * (1.0 - opacity);

  color += .02 * (fract(sin(dot(uv + 1., vec2(12.9898, 78.233))) * 43758.5453123) - .5);

  fragColor = vec4(color, opacity);
}
`;function ee(e){let t=document.createElement(`canvas`),n=1e3;return new Promise((r,i)=>{let a=new Image;a.crossOrigin=`anonymous`,a.addEventListener(`load`,()=>{(typeof e==`string`?e.endsWith(`.svg`):e.type===`image/svg+xml`)&&(a.width=n,a.height=n);let o=a.naturalWidth/a.naturalHeight,s=n,c=n;o>1?c=Math.floor(n/o):s=Math.floor(n*o),t.width=s+750,t.height=c+750;let l=t.getContext(`2d`,{willReadFrequently:!0});if(!l)throw Error(`Failed to get canvas 2d context`);l.fillStyle=`white`,l.fillRect(0,0,t.width,t.height),l.drawImage(a,375,375,s,c);let{width:u,height:d}=t,f=l.getImageData(0,0,u,d).data,p=u*d,m=new Uint8ClampedArray(p);for(let e=0;e<p;e++){let t=e*4,n=f[t]??0,r=f[t+1]??0,i=f[t+2]??0;m[e]=.299*n+.587*r+.114*i|0}let h=T(m,u,d,150,3),g=T(m,u,d,18,3),_=T(m,u,d,5,1),v=l.createImageData(u,d),y=v.data;for(let e=0;e<p;e++){let t=e*4;y[t]=_[e]??0,y[t+1]=h[e]??0,y[t+2]=g[e]??0,y[t+3]=255}l.putImageData(v,0,0),t.toBlob(e=>{e?r({blob:e}):i(Error(`Failed to create PNG blob`))},`image/png`)}),a.addEventListener(`error`,()=>{i(Error(`Failed to load image`))}),a.src=typeof e==`string`?e:URL.createObjectURL(e)})}function te(e,t,n,r){if(r<=0)return e.slice();let i=new Uint8ClampedArray(t*n),a=new Uint32Array(t*n);for(let r=0;r<n;r++){let n=0;for(let i=0;i<t;i++){let o=r*t+i,s=e[o]??0;n+=s,a[o]=n+(r>0?a[o-t]??0:0)}}for(let e=0;e<n;e++){let o=Math.max(0,e-r),s=Math.min(n-1,e+r);for(let n=0;n<t;n++){let c=Math.max(0,n-r),l=Math.min(t-1,n+r),u=s*t+l,d=s*t+(c-1),f=(o-1)*t+l,p=(o-1)*t+(c-1),m=a[u]??0,h=c>0?a[d]??0:0,g=o>0?a[f]??0:0,_=c>0&&o>0?a[p]??0:0,v=m-h-g+_,y=(l-c+1)*(s-o+1);i[e*t+n]=Math.round(v/y)}}return i}function T(e,t,n,r,i){if(r<=0||i<=1)return te(e,t,n,r);let a=e,o=e;for(let e=0;e<i;e++)o=te(a,t,n,r),a=o;return o}var E=`#version 300 es
precision mediump float;

uniform sampler2D u_image;

uniform vec2 u_resolution;
uniform float u_time;

uniform vec4 u_colorBack;
uniform vec4 u_colorTint;

uniform float u_softness;
uniform float u_repetition;
uniform float u_shiftRed;
uniform float u_shiftBlue;
uniform float u_distortion;
uniform float u_contour;
uniform float u_angle;

uniform float u_shape;
uniform bool u_isImage;

in vec2 v_objectUV;
in vec2 v_responsiveUV;
in vec2 v_responsiveBoxGivenSize;
in vec2 v_imageUV;

out vec4 fragColor;

${y}
${b}
${S}

float getColorChanges(float c1, float c2, float stripe_p, vec3 w, float blur, float bump, float tint) {

  float ch = mix(c2, c1, smoothstep(.0, 2. * blur, stripe_p));

  float border = w[0];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  if (u_isImage == true) {
    bump = smoothstep(.2, .8, bump);
  }
  border = w[0] + .4 * (1. - bump) * w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + .5 * (1. - bump) * w[1];
  ch = mix(ch, c2, smoothstep(border, border + 2. * blur, stripe_p));

  border = w[0] + w[1];
  ch = mix(ch, c1, smoothstep(border, border + 2. * blur, stripe_p));

  float gradient_t = (stripe_p - w[0] - w[1]) / w[2];
  float gradient = mix(c1, c2, smoothstep(0., 1., gradient_t));
  ch = mix(ch, gradient, smoothstep(border, border + .5 * blur, stripe_p));

  // Tint color is applied with color burn blending
  ch = mix(ch, 1. - min(1., (1. - ch) / max(tint, 0.0001)), u_colorTint.a);
  return ch;
}

float getImgFrame(vec2 uv, float th) {
  float frame = 1.;
  frame *= smoothstep(0., th, uv.y);
  frame *= 1.0 - smoothstep(1. - th, 1., uv.y);
  frame *= smoothstep(0., th, uv.x);
  frame *= 1.0 - smoothstep(1. - th, 1., uv.x);
  return frame;
}

float blurEdge3x3(sampler2D tex, vec2 uv, vec2 dudx, vec2 dudy, float radius, float centerSample) {
  vec2 texel = 1.0 / vec2(textureSize(tex, 0));
  vec2 r = radius * texel;

  float w1 = 1.0, w2 = 2.0, w4 = 4.0;
  float norm = 16.0;
  float sum = w4 * centerSample;

  sum += w2 * textureGrad(tex, uv + vec2(0.0, -r.y), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(0.0, r.y), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(-r.x, 0.0), dudx, dudy).r;
  sum += w2 * textureGrad(tex, uv + vec2(r.x, 0.0), dudx, dudy).r;

  sum += w1 * textureGrad(tex, uv + vec2(-r.x, -r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, -r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(-r.x, r.y), dudx, dudy).r;
  sum += w1 * textureGrad(tex, uv + vec2(r.x, r.y), dudx, dudy).r;

  return sum / norm;
}

float lst(float edge0, float edge1, float x) {
  return clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
}

void main() {

  const float firstFrameOffset = 2.8;
  float t = .3 * (u_time + firstFrameOffset);

  vec2 uv = v_imageUV;
  vec2 dudx = dFdx(v_imageUV);
  vec2 dudy = dFdy(v_imageUV);
  vec4 img = textureGrad(u_image, uv, dudx, dudy);

  if (u_isImage == false) {
    uv = v_objectUV + .5;
    uv.y = 1. - uv.y;
  }

  float cycleWidth = u_repetition;
  float edge = 0.;
  float contOffset = 1.;

  vec2 rotatedUV = uv - vec2(.5);
  float angle = (-u_angle + 70.) * PI / 180.;
  float cosA = cos(angle);
  float sinA = sin(angle);
  rotatedUV = vec2(
  rotatedUV.x * cosA - rotatedUV.y * sinA,
  rotatedUV.x * sinA + rotatedUV.y * cosA
  ) + vec2(.5);

  // u_contour is applied in 2 separate ranges:
  // - 0 to .4 sets the edge hardness, saturated above .4 (both branches below)
  // - .5 to 1 warps the stripes direction along the edges, inactive below .5 (see u_contour range 2)
  if (u_isImage == true) {
    float edgeRaw = img.r;
    edge = blurEdge3x3(u_image, uv, dudx, dudy, 6., edgeRaw);
    edge = pow(edge, 1.6);
    edge *= mix(0.0, 1.0, smoothstep(0.0, 0.4, u_contour));
  } else {
    if (u_shape < 1.) {
      // full-fill on canvas
      vec2 borderUV = v_responsiveUV + .5;
      float ratio = v_responsiveBoxGivenSize.x / v_responsiveBoxGivenSize.y;
      vec2 mask = min(borderUV, 1. - borderUV);
      vec2 pixel_thickness = min(250. / v_responsiveBoxGivenSize, vec2(.5));
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);

      uv = v_responsiveUV;
      if (ratio > 1.) {
        uv.y /= ratio;
      } else {
        uv.x *= ratio;
      }
      uv += .5;
      uv.y = 1. - uv.y;

      cycleWidth *= 2.;
      contOffset = 1.5;

    } else if (u_shape < 2.) {
      // circle
      vec2 shapeUV = uv - .5;
      shapeUV *= .67;
      edge = pow(clamp(3. * length(shapeUV), 0., 1.), 18.);
    } else if (u_shape < 3.) {
      // daisy
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.68;

      float r = length(shapeUV) * 2.;
      float a = atan(shapeUV.y, shapeUV.x) + .2;
      r *= (1. + .05 * sin(3. * a + 2. * t));
      float f = abs(cos(a * 3.));
      edge = smoothstep(f, f + .7, r);
      edge *= edge;

      uv *= .8;
      cycleWidth *= 1.6;

    } else if (u_shape < 4.) {
      // diamond
      vec2 shapeUV = uv - .5;
      shapeUV = rotate(shapeUV, .25 * PI);
      shapeUV *= 1.42;
      shapeUV += .5;
      vec2 mask = min(shapeUV, 1. - shapeUV);
      vec2 pixel_thickness = vec2(.15);
      float maskX = smoothstep(0.0, pixel_thickness.x, mask.x);
      float maskY = smoothstep(0.0, pixel_thickness.y, mask.y);
      maskX = pow(maskX, .25);
      maskY = pow(maskY, .25);
      edge = clamp(1. - maskX * maskY, 0., 1.);
    } else if (u_shape < 5.) {
      // metaballs
      vec2 shapeUV = uv - .5;
      shapeUV *= 1.3;
      edge = 0.;
      for (int i = 0; i < 5; i++) {
        float fi = float(i);
        float speed = 1.5 + 2./3. * sin(fi * 12.345);
        float angle = -fi * 1.5;
        vec2 dir1 = vec2(cos(angle), sin(angle));
        vec2 dir2 = vec2(cos(angle + 1.57), sin(angle + 1.));
        vec2 traj = .4 * (dir1 * sin(t * speed + fi * 1.23) + dir2 * cos(t * (speed * 0.7) + fi * 2.17));
        float d = length(shapeUV + traj);
        edge += pow(1.0 - clamp(d, 0.0, 1.0), 4.0);
      }
      edge = 1. - smoothstep(.65, .9, edge);
      edge = pow(edge, 4.);
    }

    edge = mix(smoothstep(.9 - 2. * fwidth(edge), .9, edge), edge, smoothstep(0.0, 0.4, u_contour));

  }

  float opacity = 0.;
  if (u_isImage == true) {
    opacity = img.g;
    float frame = getImgFrame(v_imageUV, 0.);
    opacity *= frame;
  } else {
    opacity = 1. - smoothstep(.9 - 2. * fwidth(edge), .9, edge);
    if (u_shape < 2.) {
      edge = 1.2 * edge;
    } else if (u_shape < 5.) {
      edge = 1.8 * pow(edge, 1.5);
    }
  }

  float diagBLtoTR = rotatedUV.x - rotatedUV.y;
  float diagTLtoBR = rotatedUV.x + rotatedUV.y;

  vec3 color = vec3(0.);
  vec3 color1 = vec3(.98, 0.98, 1.);
  vec3 color2 = vec3(.1, .1, .1 + .1 * smoothstep(.7, 1.3, diagTLtoBR));

  vec2 grad_uv = uv - .5;

  float dist = length(grad_uv + vec2(0., .2 * diagBLtoTR));
  grad_uv = rotate(grad_uv, (.25 - .2 * diagBLtoTR) * PI);
  float direction = grad_uv.x;

  float bump = pow(1.8 * dist, 1.2);
  bump = 1. - bump;
  bump *= pow(uv.y, .3);


  float thin_strip_1_ratio = .12 / cycleWidth * (1. - .4 * bump);
  float thin_strip_2_ratio = .07 / cycleWidth * (1. + .4 * bump);
  float wide_strip_ratio = (1. - thin_strip_1_ratio - thin_strip_2_ratio);

  float thin_strip_1_width = cycleWidth * thin_strip_1_ratio;
  float thin_strip_2_width = cycleWidth * thin_strip_2_ratio;

  float noise = snoise(uv - t);

  edge += (1. - edge) * u_distortion * noise;

  direction += diagBLtoTR;
  float contour = 0.;
  direction -= 2. * noise * diagBLtoTR * (smoothstep(0., 1., edge) * (1.0 - smoothstep(0., 1., edge)));
  // u_contour range 2
  direction *= mix(1., 1. - edge, smoothstep(.5, 1., u_contour));
  direction -= 1.7 * edge * smoothstep(.5, 1., u_contour);
  direction += .2 * pow(u_contour, 4.) * (1.0 - smoothstep(0., 1., edge));

  bump *= clamp(pow(uv.y, .1), .3, 1.);
  direction *= (.1 + (1.1 - edge) * bump);

  direction *= (.4 + .6 * (1.0 - smoothstep(.5, 1., edge)));
  direction += .18 * (smoothstep(.1, .2, uv.y) * (1.0 - smoothstep(.2, .4, uv.y)));
  direction += .03 * (smoothstep(.1, .2, 1. - uv.y) * (1.0 - smoothstep(.2, .4, 1. - uv.y)));

  direction *= (.5 + .5 * pow(uv.y, 2.));
  direction *= cycleWidth;
  direction -= t;


  float colorDispersion = (1. - bump);
  colorDispersion = clamp(colorDispersion, 0., 1.);
  float dispersionRed = colorDispersion;
  dispersionRed += .03 * bump * noise;
  dispersionRed += 5. * (smoothstep(-.1, .2, uv.y) * (1.0 - smoothstep(.1, .5, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, 1., bump)));
  dispersionRed -= diagBLtoTR;

  float dispersionBlue = colorDispersion;
  dispersionBlue *= 1.3;
  dispersionBlue += (smoothstep(0., .4, uv.y) * (1.0 - smoothstep(.1, .8, uv.y))) * (smoothstep(.4, .6, bump) * (1.0 - smoothstep(.4, .8, bump)));
  dispersionBlue -= .2 * edge;

  dispersionRed *= (u_shiftRed / 20.);
  dispersionBlue *= (u_shiftBlue / 20.);

  float blur = 0.;
  float rExtraBlur = 0.;
  float gExtraBlur = 0.;
  if (u_isImage == true) {
    float softness = 0.05 * u_softness;
    blur = softness + .5 * smoothstep(1., 10., u_repetition) * smoothstep(.0, 1., edge);
    float smallCanvasT = 1.0 - smoothstep(100., 500., min(u_resolution.x, u_resolution.y));
    blur += smallCanvasT * smoothstep(.0, 1., edge);
    rExtraBlur = softness * (0.05 + .1 * (u_shiftRed / 20.) * bump);
    gExtraBlur = softness * 0.05 / max(0.001, abs(1. - diagBLtoTR));
  } else {
    blur = u_softness / 15. + .3 * contour;
  }

  vec3 w = vec3(thin_strip_1_width, thin_strip_2_width, wide_strip_ratio);
  w[1] -= .02 * smoothstep(.0, 1., edge + bump);
  float stripe_r = fract(direction + dispersionRed);
  float r = getColorChanges(color1.r, color2.r, stripe_r, w, blur + fwidth(stripe_r) + rExtraBlur, bump, u_colorTint.r);
  float stripe_g = fract(direction);
  float g = getColorChanges(color1.g, color2.g, stripe_g, w, blur + fwidth(stripe_g) + gExtraBlur, bump, u_colorTint.g);
  float stripe_b = fract(direction - dispersionBlue);
  float b = getColorChanges(color1.b, color2.b, stripe_b, w, blur + fwidth(stripe_b), bump, u_colorTint.b);

  color = vec3(r, g, b);
  color *= opacity;

  vec3 bgColor = u_colorBack.rgb * u_colorBack.a;
  color = color + bgColor * (1. - opacity);
  opacity = opacity + u_colorBack.a * (1. - opacity);

  ${x}

  fragColor = vec4(color, opacity);
}
`,D={measurePerformance:!1,workingSize:512,iterations:40};function O(e){let t=document.createElement(`canvas`),n=t.getContext(`2d`),r=typeof e==`string`&&e.startsWith(`blob:`);return new Promise((i,a)=>{if(!e||!n){a(Error(`Invalid file or canvas context`));return}let o=r&&fetch(e).then(e=>e.headers.get(`Content-Type`)),s=new Image;s.crossOrigin=`anonymous`;let c=performance.now();s.onload=async()=>{let r,l=await o;r=l?l===`image/svg+xml`:typeof e==`string`?e.endsWith(`.svg`)||e.startsWith(`data:image/svg+xml`):e.type===`image/svg+xml`;let u=s.width||s.naturalWidth,d=s.height||s.naturalHeight;if(r){let e=4096,t=u/d;u>d?(u=e,d=e/t):(d=e,u=e*t),s.width=u,s.height=d}let f=Math.min(u,d),p=D.workingSize/f,m=Math.round(u*p),h=Math.round(d*p);D.measurePerformance&&(console.log(`[Processing Mode]`),console.log(`  Original: ${u}\xD7${d}`),console.log(`  Working: ${m}\xD7${h} (${(p*100).toFixed(1)}% scale)`),p<1&&console.log(`  Speedup: ~${Math.round(1/(p*p))}\xD7`)),t.width=u,t.height=d;let g=document.createElement(`canvas`);g.width=m,g.height=h;let _=g.getContext(`2d`);_.drawImage(s,0,0,m,h);let v=performance.now(),y=_.getImageData(0,0,m,h).data,b=new Uint8Array(m*h),x=new Uint8Array(m*h),S=0;for(let e=0,t=0;e<y.length;e+=4,t++){let n=y[e+3]===0?0:1;b[t]=n,S+=n}let C=[],w=[];for(let e=0;e<h;e++)for(let t=0;t<m;t++){let n=e*m+t;if(!b[n])continue;let r=!1;r=t===0||t===m-1||e===0||e===h-1||!b[n-1]||!b[n+1]||!b[n-m]||!b[n+m]||!b[n-m-1]||!b[n-m+1]||!b[n+m-1]||!b[n+m+1],r?(x[n]=1,C.push(n)):w.push(n)}D.measurePerformance&&(console.log(`[Mask Building] Time: ${(performance.now()-v).toFixed(2)}ms`),console.log(`  Shape pixels: ${S} / ${m*h} (${(S/(m*h)*100).toFixed(1)}%)`),console.log(`  Interior pixels: ${w.length}`),console.log(`  Boundary pixels: ${C.length}`));let ee=ne(b,x,new Uint32Array(w),new Uint32Array(C),m,h),te=performance.now(),T=re(ee,b,x,m,h);D.measurePerformance&&console.log(`[Poisson Solve] Time: ${(performance.now()-te).toFixed(2)}ms`);let E=0,O;for(let e=0;e<w.length;e++){let t=w[e];T[t]>E&&(E=T[t])}let k=document.createElement(`canvas`);k.width=m,k.height=h;let ie=k.getContext(`2d`),A=ie.createImageData(m,h);for(let e=0;e<h;e++)for(let t=0;t<m;t++){let n=e*m+t,r=n*4;if(!b[n])A.data[r]=255,A.data[r+1]=255,A.data[r+2]=255,A.data[r+3]=0;else{let e=255*(1-T[n]/E);A.data[r]=e,A.data[r+1]=e,A.data[r+2]=e,A.data[r+3]=255}}ie.putImageData(A,0,0),n.imageSmoothingEnabled=!0,n.imageSmoothingQuality=`high`,n.drawImage(k,0,0,m,h,0,0,u,d);let j=n.getImageData(0,0,u,d),M=document.createElement(`canvas`);M.width=u,M.height=d;let N=M.getContext(`2d`);N.drawImage(s,0,0,u,d);let P=N.getImageData(0,0,u,d);for(let e=0;e<j.data.length;e+=4){let t=P.data[e+3],n=j.data[e+3];t===0?(j.data[e]=255,j.data[e+1]=0):(j.data[e]=n===0?0:j.data[e],j.data[e+1]=t),j.data[e+2]=255,j.data[e+3]=255}n.putImageData(j,0,0),O=j,t.toBlob(e=>{if(!e)a(Error(`Failed to create PNG blob`));else{if(D.measurePerformance){let e=performance.now()-c;if(console.log(`[Total Processing Time] ${e.toFixed(2)}ms`),p<1){let t=e*(u*d/(m*h))**1.5;console.log(`[Estimated time at full resolution] ~${t.toFixed(0)}ms`),console.log(`[Time saved] ~${(t-e).toFixed(0)}ms (${Math.round(t/e)}\xD7 faster)`)}}i({imageData:O,pngBlob:e})}},`image/png`)},s.onerror=()=>a(Error(`Failed to load image`)),s.src=typeof e==`string`?e:URL.createObjectURL(e)})}function ne(e,t,n,r,i,a){let o=n.length,s=new Int32Array(o*4);for(let t=0;t<o;t++){let r=n[t],o=r%i,c=Math.floor(r/i);s[t*4+0]=o<i-1&&e[r+1]?r+1:-1,s[t*4+1]=o>0&&e[r-1]?r-1:-1,s[t*4+2]=c>0&&e[r-i]?r-i:-1,s[t*4+3]=c<a-1&&e[r+i]?r+i:-1}return{interiorPixels:n,boundaryPixels:r,pixelCount:o,neighborIndices:s}}function re(e,t,n,r,i){let a=D.iterations,o=.01,s=new Float32Array(r*i),{interiorPixels:c,neighborIndices:l,pixelCount:u}=e,d=performance.now(),f=1.9,p=[],m=[];for(let e=0;e<u;e++){let t=c[e];(t%r+Math.floor(t/r))%2==0?p.push(e):m.push(e)}for(let e=0;e<a;e++){for(let e of p){let t=c[e],n=l[e*4+0],r=l[e*4+1],i=l[e*4+2],a=l[e*4+3],u=0;n>=0&&(u+=s[n]),r>=0&&(u+=s[r]),i>=0&&(u+=s[i]),a>=0&&(u+=s[a]),s[t]=f*((o+u)/4)+-.8999999999999999*s[t]}for(let e of m){let t=c[e],n=l[e*4+0],r=l[e*4+1],i=l[e*4+2],a=l[e*4+3],u=0;n>=0&&(u+=s[n]),r>=0&&(u+=s[r]),i>=0&&(u+=s[i]),a>=0&&(u+=s[a]),s[t]=f*((o+u)/4)+-.8999999999999999*s[t]}}if(D.measurePerformance){let e=performance.now()-d;console.log(`[Optimized Poisson Solver (SOR \u03C9=${f})]`),console.log(`  Working size: ${r}\xD7${i}`),console.log(`  Iterations: ${a}`),console.log(`  Time: ${e.toFixed(2)}ms`),console.log(`  Interior pixels processed: ${u}`),console.log(`  Speed: ${(a*u/(e*1e3)).toFixed(2)} Mpixels/sec`)}return s}function k(e){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:P;if(typeof e!=`string`)return P;let t,n,r,i=1;if(e.startsWith(`#`))[t,n,r,i]=ie(e);else if(e.startsWith(`rgb`)){let a=A(e);if(a===null)return P;[t,n,r,i]=a}else if(e.startsWith(`hsl`)){let a=j(e);if(a===null)return P;[t,n,r,i]=M(a)}else return console.error(`Unsupported color format`,e),P;return[N(t,0,1),N(n,0,1),N(r,0,1),N(i,0,1)]}function ie(e){return e=e.replace(/^#/,``),(e.length===3||e.length===4)&&(e=e.split(``).map(e=>e+e).join(``)),e.length===6&&(e+=`ff`),/^[0-9a-f]{8}$/i.test(e)?[parseInt(e.slice(0,2),16)/255,parseInt(e.slice(2,4),16)/255,parseInt(e.slice(4,6),16)/255,parseInt(e.slice(6,8),16)/255]:(console.warn(`Invalid hex color`),P)}function A(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`)/255,parseInt(t[2]??`0`)/255,parseInt(t[3]??`0`)/255,t[4]===void 0?1:parseFloat(t[4])]:null}function j(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??`0`),parseInt(t[2]??`0`),parseInt(t[3]??`0`),t[4]===void 0?1:parseFloat(t[4])]:null}function M(e){let[t,n,r,i]=e,a=t/360,o=n/100,s=r/100,c,l,u;if(n===0)c=l=u=s;else{let e=(e,t,n)=>(n<0&&(n+=1),n>1&&--n,n<1/6?e+(t-e)*6*n:n<1/2?t:n<2/3?e+(t-e)*(2/3-n)*6:e),t=s<.5?s*(1+o):s+o-s*o,n=2*s-t;c=e(n,t,a+1/3),l=e(n,t,a),u=e(n,t,a-1/3)}return[c,l,u,i]}var N=(e,t,n)=>Math.min(Math.max(e,t),n),P=[.5,.5,.5,1],ae=E.replace(/color \+= 1\. \/ 256\.[^;]+;/g,``).replace(`void main()`,`uniform bool u_customPalette; uniform vec4 u_palette0; uniform vec4 u_palette1; uniform vec4 u_palette2; uniform vec4 u_palette3; uniform vec4 u_palette4; void main()`).replace(`color = vec3(r, g, b);`,`color = vec3(r, g, b);
  if (u_customPalette) {
    // Color the reflected light, preserving the original luminance/contrast.
    float luminance=clamp(dot(color,vec3(.2126,.7152,.0722)),0.,1.);
    float tone=luminance*4.;
    vec3 pigment;
    if(tone<1.) pigment=mix(u_palette0.rgb,u_palette1.rgb,smoothstep(0.,1.,tone));
    else if(tone<2.) pigment=mix(u_palette1.rgb,u_palette2.rgb,smoothstep(0.,1.,tone-1.));
    else if(tone<3.) pigment=mix(u_palette2.rgb,u_palette3.rgb,smoothstep(0.,1.,tone-2.));
    else pigment=mix(u_palette3.rgb,u_palette4.rgb,smoothstep(0.,1.,tone-3.));
    vec3 tintedLight=clamp(pigment*luminance*1.35,0.,1.);
    color=mix(tintedLight,vec3(luminance),smoothstep(.72,.99,luminance)*.5);
    // Keep a small amount of the original spectral separation at reflections.
    color=clamp(color+(vec3(r,g,b)-vec3(luminance))*.18,0.,1.);
  }
`),oe=w.replace(`precision highp float;`,`precision highp float; uniform mediump vec2 u_resolution;`).replace(/color \+= \.02 \*[^;]+;/g,``).replace(/heat \+= [^;]+;/g,``).replace(`float heat = clamp(inner + outer, 0., 1.);`,`vec2 screenUV = gl_FragCoord.xy / u_resolution; float haloFade = smoothstep(0., .18, screenUV.x) * smoothstep(0., .18, 1. - screenUV.x) * smoothstep(0., .18, screenUV.y) * smoothstep(0., .18, 1. - screenUV.y); float heat = max(0., (clamp(inner + outer * haloFade, 0., 1.) - .025) / .975);`),se={metal:s(ae,`metal`),heat:s(oe,`heat`),glass:s(u,`glass`)},F=e=>document.getElementById(e),I=F(`shader`),L=`heat`,R,z,B={},V=!1,H=!1,U=!1,W=0,ce=0,G={lightSize:1,haze:.4,frost:.42,backlight:1.1,thickness:.5,speed:1.17,scale:.78,distortion:0,contour:1,repetition:4.35,softness:1,dispersion:.1,angle:315,innerGlow:.55,outerGlow:.3,noise:.015},K={metal:{...G},glass:{...G},heat:{...G,speed:1.5,scale:.65,innerGlow:.41,outerGlow:.49,contour:.46,angle:306}},le={metal:0,heat:0,glass:0};Object.assign(G,K[L]);var q=[[`#fff`,`#0a0a0a`,`#3448ff`,`#ee33a3`,`#ffaf4a`],[`#ffe9c4`,`#692326`,`#ed8139`,`#ffd275`,`#fff4d4`],[`#9145ff`,`#241069`,`#7735ff`,`#d44dff`,`#f1cbff`],[`#62f028`,`#063b28`,`#0dcf74`,`#99ff32`,`#e8ffc1`]],J={metal:null,heat:null,glass:null},ue=[[`#526068`,`#e4f5ff`,`#a7c6d1`],[`#62594c`,`#fff1d4`,`#dfccb2`],[`#575268`,`#eee5ff`,`#c9b9e7`],[`#4c625c`,`#e5fff3`,`#b0d9cb`]];function de(e=W){return L===`glass`?ue[e]:L===`metal`?[[`#0a0a0a`,`#3448ff`,`#ee33a3`,`#ffaf4a`,`#ffffff`],[`#391a0c`,`#995028`,`#e6a14b`,`#ffce7d`,`#fff2d7`],[`#241069`,`#7735ff`,`#9145ff`,`#d44dff`,`#f1cbff`],[`#031b14`,`#0d6041`,`#269f69`,`#8fdba0`,`#efffe8`]][e]:e===0?[`#171450`,`#3730cf`,`#9824e8`,`#ff3250`,`#ffac32`,`#fff3b0`]:q[e].slice(1)}function Y(){return J[L]??de()}function fe(){let e=Y(),t=L===`glass`?[`Glass`,`Backlight`,`Edge`]:L===`metal`?[`Deep shadow`,`Shadow`,`Midtone`,`Reflection`,`Highlight`]:e.map((e,t)=>`Color `+(t+1));F(`color-editor`).innerHTML=e.map((e,n)=>`<div class="editable-color"><input type="color" value="${e}" aria-label="${t[n]}" data-color="${n}"><label for="hex-${n}">${t[n]}</label><input id="hex-${n}" class="color-hex" aria-label="${t[n]} HEX" value="${e.toUpperCase()}" maxlength="7" spellcheck="false" data-hex="${n}"></div>`).join(``);let n=(e,t)=>{J[L]=[...Y()],J[L][e]=t,$(),Q()};document.querySelectorAll(`[data-color]`).forEach(e=>e.oninput=()=>{let t=+e.dataset.color;n(t,e.value),F(`hex-`+t).value=e.value.toUpperCase()}),document.querySelectorAll(`[data-hex]`).forEach(e=>e.onchange=()=>{let t=e.value.trim(),r=+e.dataset.hex;/^#[0-9a-f]{6}$/i.test(t)?(e.setCustomValidity(``),n(r,t),document.querySelector(`[data-color="`+r+`"]`).value=t):(e.setCustomValidity(`Use #RRGGBB`),e.reportValidity())})}F(`reset-colors`).onclick=()=>{J[L]=null,fe(),$(),Q()};function pe(){if(!R)return;let e=I.getBoundingClientRect(),t=+F(`quality`).value;R.setMaxPixelCount(t*t),R.setMinPixelRatio(t/Math.max(1,e.width,e.height))}F(`quality`).onchange=pe;var me={u_fit:1,u_scale:G.scale,u_rotation:0,u_originX:.5,u_originY:.5,u_offsetX:0,u_offsetY:0,u_worldWidth:0,u_worldHeight:0};function he(e=B[L]){let t=U?[0,0,0,0]:k(F(`background`).value);return q[W],{...me,u_loop:!1,u_loopPhase:0,u_loopCycles:1,u_loopStart:0,u_scale:G.scale,u_image:e,u_colorBack:t,u_angle:G.angle,u_contour:G.contour,...L===`glass`?{u_frost:G.frost,u_lightSize:G.lightSize,u_haze:G.haze,u_backlight:G.backlight,u_thickness:G.thickness,u_glass:k(Y()[0]),u_light:k(Y()[1]),u_rim:k(Y()[2])}:L===`metal`?{u_colorTint:k(`#ffffff`),u_customPalette:!0,...Object.fromEntries(Y().map((e,t)=>[`u_palette`+t,k(e)])),u_repetition:G.repetition,u_shiftRed:G.dispersion*(W===2?.5:.7),u_shiftBlue:G.dispersion*(W===2?1.5:1.3),u_softness:G.softness,u_distortion:G.distortion,u_shape:0,u_isImage:!0}:{u_colors:Y().map(k),u_colorsCount:Y().length,u_innerGlow:G.innerGlow,u_outerGlow:G.outerGlow}}}function ge(){return G.speed*(L===`glass`?3:1)}function X(){R?.setSpeed(V||H||document.hidden?0:ge()),F(`pause`).textContent=H?`▶`:`Ⅱ`,F(`pause`).ariaLabel=H?`Play animation`:`Pause animation`}function Z(e=``){F(`status`).textContent=e}async function _e(e){let t=URL.createObjectURL(e);try{let e=new Image;return e.src=t,await e.decode(),e}finally{URL.revokeObjectURL(t)}}async function ve(e){if(V)return;e!==L&&(K[L]={...G},le[L]=W,L=e,W=le[L],Object.assign(G,K[L]));let t=++ce;Z(`Preparing material…`);try{if(!B[L]){if(L===`glass`&&B.metal)B.glass=B.metal;else{let e=L===`heat`?await ee(z):await O(z),n=await _e(e.pngBlob||e.blob);if(t!==ce)return;B[L]=n}}R?.dispose(),R=new p(I,se[L],he(),{alpha:!0,antialias:!1,preserveDrawingBuffer:!0},H?0:ge(),0,Math.min(devicePixelRatio,1.75),24e5,[`u_image`]),X(),be(),fe(),$(),pe(),document.querySelectorAll(`[data-mode]`).forEach(e=>e.classList.toggle(`active`,e.dataset.mode===L)),F(`material-label`).textContent=L===`glass`?`Frosted glass`:L===`metal`?`Liquid metal`:`Heatmap`,Z()}catch(e){console.error(e),Z(`Could not prepare this logo. Try a transparent PNG.`)}}function Q(){R?.setUniforms(he()),X()}var ye={lightSize:[`Light size`,.25,2.5,.01],haze:[`Atmosphere`,0,1,.01],frost:[`Frost`,0,1,.01],backlight:[`Backlight`,0,2,.01],thickness:[`Thickness`,0,1,.01],speed:[`Motion`,0,1.5,.01],scale:[`Size`,.2,1.15,.01],distortion:[`Distortion`,0,1,.01],contour:[`Contour`,0,1,.01],repetition:[`Stripes`,1,8,.1],softness:[`Softness`,0,1,.01],dispersion:[`Iridescence`,0,1,.01],angle:[`Direction`,0,360,1],innerGlow:[`Inner glow`,0,1,.01],outerGlow:[`Outer glow`,0,1,.01],noise:[`Grain`,0,.3,.005]};function be(){let e=L===`glass`?[`speed`,`scale`,`frost`,`backlight`,`lightSize`,`haze`,`thickness`,`angle`]:L===`metal`?[`speed`,`scale`,`distortion`,`softness`,`contour`,`dispersion`]:[`speed`,`scale`,`innerGlow`,`outerGlow`,`contour`,`angle`];F(`controls`).innerHTML=e.map(e=>{let[t,n,r,i]=ye[e];return`<div class="control"><label for="${e}">${t}<output id="out-${e}">${G[e].toFixed(e===`angle`?0:2)}</output></label><input id="${e}" type="range" min="${n}" max="${r}" step="${i}" value="${G[e]}"></div>`}).join(``);for(let t of e)F(t).oninput=e=>{G[t]=+e.target.value,F(`out-`+t).value=G[t].toFixed(t===`angle`?0:2),Q()}}function $(){let e=L===`glass`?[`Clear frost`,`Warm frost`,`Violet frost`,`Mint frost`]:[`Spectrum`,`Amber`,`Violet`,`Green`];F(`swatches`).innerHTML=e.map((e,t)=>{let n=L===`glass`?ue[t]:q[t];return`<button aria-label="${e} preset" title="${e}" class="${t===W&&!J[L]?`active`:``}" style="background:linear-gradient(135deg,${n.join(`,`)})" data-palette="${t}"></button>`}).join(``),document.querySelectorAll(`[data-palette]`).forEach(e=>e.onclick=()=>{W=+e.dataset.palette,J[L]=null,fe(),L===`metal`&&(Object.assign(G,W===2?{angle:315,repetition:6.17,distortion:.69,contour:.48,softness:.8,dispersion:.08}:{angle:315,repetition:4.35,distortion:0,contour:1,softness:1,dispersion:.1}),be()),$(),Q()})}$(),F(`background`).value=`#141414`,F(`workspace`).style.background=`#141414`,F(`background`).oninput=()=>{F(`workspace`).style.background=F(`background`).value,Q()},F(`transparent`).onclick=()=>{U=!U,F(`transparent`).setAttribute(`aria-pressed`,U),F(`workspace`).classList.toggle(`checker`,U),Q()},F(`pause`).onclick=()=>{H=!H,X()},document.addEventListener(`visibilitychange`,X),document.querySelectorAll(`[data-mode]`).forEach(e=>e.onclick=()=>ve(e.dataset.mode)),F(`upload`).onclick=()=>F(`file`).click();async function xe(e){if(!V&&e){if(e.size>15728640)Z(`Use a logo smaller than 15 MB.`);else try{Z(`Reading logo…`);let t=URL.createObjectURL(e),n;try{n=new Image,n.src=t,await n.decode()}finally{URL.revokeObjectURL(t)}let r=document.createElement(`canvas`),i=e.type===`image/svg+xml`?1600/Math.max(n.naturalWidth,n.naturalHeight):Math.min(1,1600/Math.max(n.naturalWidth,n.naturalHeight));r.width=Math.max(1,Math.round(n.naturalWidth*i)),r.height=Math.max(1,Math.round(n.naturalHeight*i));let a=r.getContext(`2d`,{willReadFrequently:!0});a.drawImage(n,0,0,r.width,r.height);let o=a.getImageData(0,0,r.width,r.height),s=r.width,c=0,l=r.height,u=0,d=!1;for(let e=3;e<o.data.length;e+=4)if(o.data[e]<250){d=!0;break}if(!d){Z(`Use SVG or PNG with a transparent background.`);return}for(let e=0;e<r.height;e++)for(let t=0;t<r.width;t++)o.data[(e*r.width+t)*4+3]>20&&(s=Math.min(s,t),c=Math.max(c,t),l=Math.min(l,e),u=Math.max(u,e));if(c<s){Z(`This image is empty.`);return}let f=document.createElement(`canvas`),p=c-s+1,m=u-l+1,h=Math.ceil(Math.max(p,m)*.08);f.width=p+h*2,f.height=m+h*2;let g=f.getContext(`2d`);g.drawImage(r,s,l,p,m,h,h,p,m),g.globalCompositeOperation=`source-in`,g.fillStyle=`#000`,g.fillRect(0,0,f.width,f.height);let _=await new Promise(e=>f.toBlob(e));z=new File([_],`logo.png`,{type:`image/png`}),B={},F(`filename`).textContent=e.name,await ve(L)}catch(e){console.error(e),Z(`Could not read this image. Try another SVG or PNG.`)}}}F(`file`).onchange=e=>{xe(e.target.files[0]),e.target.value=``};var Se=0;window.addEventListener(`dragenter`,e=>{e.preventDefault(),Se++,document.body.classList.add(`drag`)}),window.addEventListener(`dragleave`,()=>{--Se||document.body.classList.remove(`drag`)}),window.addEventListener(`dragover`,e=>e.preventDefault()),window.addEventListener(`drop`,e=>{e.preventDefault(),Se=0,document.body.classList.remove(`drag`),xe(e.dataTransfer.files[0])});function Ce(e,t){if(!e)return;let n=URL.createObjectURL(e),r=document.createElement(`a`);r.href=n,r.download=t,r.click(),setTimeout(()=>URL.revokeObjectURL(n),3e3)}function we(){let e=F(`workspace`).getBoundingClientRect(),t=+F(`ratio`).value,n=Math.min(e.width-32,(e.height-96)*t);I.style.width=n+`px`,I.style.height=n/t+`px`,I.style.aspectRatio=t,pe()}new ResizeObserver(()=>requestAnimationFrame(we)).observe(F(`workspace`)),F(`ratio`).onchange=we;function Te(e){V=e,document.querySelectorAll(`aside button, aside input, aside select, #upload, #pause, #ratio`).forEach(t=>t.disabled=e)}F(`png`).onclick=()=>{if(!R||V)return;let e=R.getCurrentFrame();R.setFrame(e),I.querySelector(`canvas`).toBlob(e=>Ce(e,`logo-${L}.png`),`image/png`)},F(`video`).onclick=async()=>{if(R&&!V){Te(!0),Z(`Preparing seamless loop...`);try{Ce(await l({mount:R,canvas:I.querySelector(`canvas`),mode:L,speed:ge(),transparent:U,onProgress:e=>Z(`Rendering loop · ${e}%`)}),`logo-${L}-loop.webm`),Z(`Seamless loop saved`)}catch(e){console.error(e),Z(e.message||`Video export failed`)}finally{Te(!1),X()}}},z=new File([`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><path fill="black" d="M300 40 540 180v240L300 560 60 420V180zm0 78L128 218v164l172 100 172-100V218zm0 75 106 62v90l-106 62-106-62v-90z" fill-rule="evenodd"/></svg>`],`form.svg`,{type:`image/svg+xml`}),ve(L),window.__form={get state(){return{mode:L,paused:H,busy:V,transparent:U,parameters:{...G},pixels:I.querySelector(`canvas`)?.width*I.querySelector(`canvas`)?.height}},get mount(){return R}};