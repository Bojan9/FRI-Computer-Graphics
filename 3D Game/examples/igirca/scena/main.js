// main.js

// Imports
import { mat4 } from '../../../lib/gl-matrix-module.js';
import { vec3 } from '../../../lib/gl-matrix-module.js';

import {
    Camera,
    Material,
    Model,
    Node,
    Primitive,
    Sampler,
    Texture,
    Transform,
} from '../../../common/engine/core.js';

import { ResizeSystem } from '../../../common/engine/systems/ResizeSystem.js';
import { UpdateSystem } from '../../../common/engine/systems/UpdateSystem.js';

import { GLTFLoader } from '../../../common/engine/loaders/GLTFLoader.js';
import { UnlitRenderer } from '../../../common/engine/renderers/UnlitRenderer.js';

import { FirstPersonController } from './FirstPersonController.js';

// Variables
const canvas = document.querySelector('canvas');
const renderer = new UnlitRenderer(canvas);
await renderer.initialize();

const loader = new GLTFLoader();

let isPaused = false;
let startTime;
let elapsedTime = 0;
let timerElement;
let playerName = '';

// Main function
function startGame() {
    // Display loading text instead of the loader circle
    document.querySelector('.loader-container').innerHTML = '<h1 class="loading-text">LOADING...</h1>';

    playerName = document.getElementById('nameInput').value || 'Player1';

    document.querySelector('.menu-container').style.display = 'none';
    document.querySelector('.loader-container').style.display = 'block';

    // Set the start time when the scene loads
    startTime = Date.now();

    // Create and append the timer element to the body
    timerElement = document.createElement('div');
    timerElement.id = 'timer';
    document.body.appendChild(timerElement);

    // Load the scene and start the game
    loader.load('../../../common/models/scena2/scena2.gltf').then(() => {
        const scene = loader.loadScene(loader.defaultScene);
        if (!scene) {
            throw new Error('A default scene is required to run this example');
        }

        const camera = scene.find(node => node.getComponentOfType(Camera));
        if (!camera) {
            throw new Error('A camera in the scene is required to run this example');
        }

        const controller = new FirstPersonController(camera, canvas);
        camera.addComponent(controller);
        camera.addComponent(new Transform({ translation: [-10, -3, 10] }));
        scene.addChild(camera);

        function update(time, dt) {
            if (!isPaused) {
                // Calculate elapsed time when the game is not paused
                elapsedTime = Date.now() - startTime;

                // Update the timer display
                updateTimerDisplay();

                scene.traverse(node => {
                    for (const component of node.components) {
                        component.update?.(time, dt);
                    }
                });
            }
        }

        function render() {
            renderer.render(scene, camera);
        }

        function resize({ displaySize: { width, height }}) {
            camera.getComponentOfType(Camera).aspect = width / height;
        }

        new ResizeSystem({ canvas, resize }).start();
        new UpdateSystem({ update, render }).start();

        document.querySelector('.loader-container').remove();

        // Add event listener for 'P' key press in the loaded scene
        document.addEventListener('keydown', handlePauseToggle);

        // Add event listener for pointer lock change
        document.addEventListener('pointerlockchange', () => {
            if (document.pointerLockElement !== canvas) {
                // Unlock camera movement when pointer is not locked
                controller.toggleCameraMove(false);
            }
        });
    });
}

function handlePauseToggle(event) {
    if (event.key === 'p' || event.key === 'P') {
        if (isPaused) {
            resumeGame();
        } else {
            pauseGame();
        }
    }
}

function pauseGame() {
    document.querySelector('.pause-menu').style.display = 'flex';
    isPaused = true;

    // Display the player name in the pause menu
    document.getElementById('playerNamePaused').innerText = `Player: ${playerName}`;
}

function resumeGame() {
    document.querySelector('.pause-menu').style.display = 'none';
    isPaused = false;

    // Update start time when resuming the game
    startTime = Date.now() - elapsedTime;

    // Unlock camera movement when resuming the game
    camera.getComponentOfType(FirstPersonController).toggleCameraMove(true);
}

function exitGame() {
    // Reset timer when exiting the game
    startTime = Date.now();
    elapsedTime = 0;

    // Implement any cleanup or exit logic here
    // For now, let's simply reload the page
    window.location.reload();
}

function updateTimerDisplay() {
    if (timerElement) {
        // Calculate minutes and seconds
        const minutes = Math.floor(elapsedTime / 60000); // 1 minute = 60000 milliseconds
        const seconds = Math.floor((elapsedTime % 60000) / 1000); // Convert remaining milliseconds to seconds

        // Add leading zeros for single-digit minutes and seconds
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        // Update the timer display with player name
        timerElement.innerHTML = `Player: ${playerName} <br> Time: ${formattedMinutes}:${formattedSeconds}`;
    }
}

// Add event listeners to the buttons
document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('exitButton').addEventListener('click', exitGame);

// Add event listeners to the resume and exit buttons
document.getElementById('resumeButton').addEventListener('click', resumeGame);
document.getElementById('exitPausedButton').addEventListener('click', exitGame);