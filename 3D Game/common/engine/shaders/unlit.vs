#version 300 es

layout (location = 0) in vec4 aPosition;
layout (location = 1) in vec2 aTexCoord;
layout (location = 2) in vec3 aNormal; // Add normal attribute

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

out vec2 vTexCoord;
out vec3 vNormal; // Pass normal to fragment shader

void main() {
    vTexCoord = aTexCoord;
    vNormal = mat3(uModelMatrix) * aNormal; // Transform normal to world space
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * aPosition;
}
