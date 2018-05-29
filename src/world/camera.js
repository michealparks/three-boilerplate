import {PerspectiveCamera} from 'three'

const Camera = new PerspectiveCamera(
  // Field of view
  75,
  // Aspect ratio
  window.innerWidth / window.innerHeight,
  // Near clipping plane
  1,
  // Far clipping plane
  100
)

// Distance camera from the center of the scene.
Camera.position.z = 4

// Rotate
Camera.rotation.x = 0.9
Camera.rotation.y = 0.01

Camera.update = () => {

}

export default Camera
