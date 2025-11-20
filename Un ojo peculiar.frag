// Author: José Manuel Díaz Hernández
// Title: Un ojo peculiar

#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float softCircle(vec2 st, vec2 c, float r, float edge){
    float d = length(st - c);
    return 1.0 - smoothstep(r - edge, r + edge, d);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;

    vec2 eyeCenter = vec2(0.5,0.5);
    
	// Aquí se puede cambiar para verlo menos difuminado lo blanco del ojo
    float eye = softCircle(st, eyeCenter, 0.300, 0.068);

    vec2 mouse = u_mouse / u_resolution;
    vec2 dir = mouse - eyeCenter;
    float maxOffset = 0.092;
    float lenDir = length(dir);
    if (lenDir > 0.0) {
        dir = dir / lenDir;
    }
    vec2 irisOffset = dir * min(lenDir, maxOffset);

    vec2 irisCenter = eyeCenter + irisOffset;

    // Aquí se puede cambiar para ver menos difuminado la pupila y el iris
    float iris  = softCircle(st, irisCenter, 0.12, 0.018);
    float pupil = softCircle(st, irisCenter, 0.05, 0.013);

    float t   = fract(u_time * 0.2);
    float blink = smoothstep(0.0, 0.2, t);
    blink = min(blink, smoothstep(1.0, 0.8, t));

    float distY = abs(st.y - eyeCenter.y);
    float openHeight = 0.3 * blink;
    float openMask = 1.0 - smoothstep(openHeight, openHeight + 0.01, distY);

    float lashAmount = 1.0 - blink;
    float topLash  = smoothstep(0.0, 0.04, st.y) * lashAmount;
    float botLash  = smoothstep(1.0, 0.96, st.y) * lashAmount;
    float lashes = max(topLash, botLash);

    vec3 color = vec3(0.05);

    color = mix(color, vec3(0.9), eye * openMask);
    
    // Aquí se puede cambiar el color del iris, yo lo he puesto en azul porque estaría guay tenerlos de ese color.
    vec3 irisCol = vec3(0.399,0.542,0.600);
    color = mix(color, irisCol, iris * openMask);

    color = mix(color, vec3(0.02), pupil * openMask);

    color = mix(color, vec3(0.0), lashes);

    gl_FragColor = vec4(color, 1.0);
}

