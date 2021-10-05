import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import * as dat from 'dat.gui'

const parameters = {
    color: 0xff0000,
    spin: () => 
    {
       gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/*
debug
 */
const gui = new dat.GUI({ closed: true })

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/** GUI DEBUG UI
 * the first parameter is an object and the second parameter is the 
 * property of that object you want to tweak.
 */

 //gui.add(mesh.position, 'y')
 
// Utilizing the parameters to specify for min, max, and precision values
//gui.add(mesh.position, 'y', -3, 3, 0.01)

// utilizing methods for specification
//gui.add(mesh.position, 'y').min(-3).max(3).step(.01)

//or you can add line breaks for the methods

gui
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation') // adding name to specify label in Debug UI

gui
    .add(mesh, 'visible')

gui
    .add(material, 'wireframe')

gui
    .add(parameters, 'spin')

/**
 * handling colors is a bit different because dat.GUI is not able to know if you 
 * want to tweak text, number, or color just by the type of the property.
 * 
 * first, use addColor() instead of just add, then create an intermediate object
 * with the color in its properties and use that property in your material. This
 * is due to Three.js material not having a clean and accessible value like #ff0000
 * 
 * first create parameter variable at the top of code after importing
 */

gui
    .addColor(parameters, 'color')
    .onChange(() =>
    {
        material.color.set(parameters.color)
    })

const amterial = new THREE.MeshBasicMaterial({ color: parameters.color})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()