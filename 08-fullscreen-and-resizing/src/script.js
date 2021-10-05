import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    //width: 800,
    //height: 600

    // updating sizes
    width: window.innerWidth,
    height: window.innerHeight
}

//Handiling resizing
window.addEventListener('resize', () =>
{
    //console.log('window has been resized')
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    
     //updating camera
     camera.aspect = sizes.width / sizes.height
     camera.updateProjectionMatrix()
     
     //updateing renderer
     renderer.setSize(sizes.width, sizes.height)
     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//fullscreen handling with double mouse click
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }



    // checking if double click works
    //console.log('double click')

    // *** does not work on safari ***
    /*if(!document.fullscreenElement)
    {
        //console.log('go fullscreen')
        canvas.requestFullscreen()
    }
    else 
    {
        //console.log('leave fullscreen')
        document.exitFullscreen()
    }*/
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