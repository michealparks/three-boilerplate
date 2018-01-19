import {PerspectiveCamera} from 'three'

const Camera = new PerspectiveCamera(
  75,                                     // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  1,                                   // Near clipping plane
  100                                  // Far clipping plane
)

// Distance camera from the center of the scene.
Camera.position.z = 4

// Rotate
Camera.rotation.x = 0.9
Camera.rotation.y = 0.01

Camera.update = () => {

}

export default Camera
