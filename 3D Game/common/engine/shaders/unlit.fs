#version 300 es
precision mediump float;
precision mediump sampler2D;

uniform sampler2D uBaseTexture;
uniform vec4 uBaseFactor;

in vec2 vTexCoord;
in vec3 vNormal;

uniform vec3 uLightDirection;
uniform vec3 uAmbientLightColor;

out vec4 oColor;

void main() {
    vec4 baseColor = texture(uBaseTexture, vTexCoord);

    vec3 ambientLight = uAmbientLightColor * 0.2; // Adjust ambient light intensity

    vec3 normal = normalize(vNormal);
    float diffuse = max(dot(normal, uLightDirection), 0.0);

    // Adjust the diffuse factor to control darkness
    diffuse = mix(diffuse, 0.2, 0.1); // You can experiment with the second parameter (0.5) to control darkness

    vec3 lighting = (ambientLight + uBaseFactor.rgb * diffuse);

    vec3 gammaCorrectedColor = pow(lighting, vec3(1.0 / 2.2)); // Adjust gamma correction exponent as needed

    oColor = vec4(gammaCorrectedColor * baseColor.rgb, baseColor.a);
}
