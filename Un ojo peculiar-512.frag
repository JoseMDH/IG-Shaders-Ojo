#ifdef GL_ES
precision mediump float;
#endif
uniform vec2 u_resolution;uniform float u_time;float c(vec2 s,vec2 p,float r,float e){return 1.-smoothstep(r-e,r+e,length(s-p));}void main(){vec2 n=gl_FragCoord.xy/u_resolution,e=vec2(.5);float a=c(n,e,.3,.06),i=c(n,e,.18,.02),p=c(n,e,.06,.015);float k=.5+.5*sin(u_time*2.);vec3 o=vec3(.9)*a+mix(vec3(0,0,.3),vec3(1,1,.7),k)*i+vec3(.02)*p;o+=c(n,e+.04,.03,.01)*.6;o=mix(o,vec3(0.),(c(n,e,.19,.005)-c(n,e,.17,.005))*.4);gl_FragColor=vec4(o,1.);}