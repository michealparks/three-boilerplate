import {clamp} from './index.js'
import Matrix4 from './Matrix4.js'
import Quaternion from './Quaternion.js'

export default class Vector3 {
  constructor (x, y, z) {
    this.x = x || 0.0
    this.y = y || 0.0
    this.z = z || 0.0
  }

  set (x, y, z) {
    this.x = x
    this.y = y
    this.z = z
    return this
  }

  setScalar (s) {
    this.x = this.y = this.z = s
    return this
  }

  setX (x) {
    this.x = x
    return this
  }

  setY (y) {
    this.y = y
    return this
  }

  setZ (z) {
    this.z = z
    return this
  }

  setComponent (i, n) {
    if (i > 2) {
      throw new Error('index is out of range: ' + i)
    }

    switch (i) {
      case 0: this.x = n; break
      case 1: this.y = n; break
      case 2: this.z = n; break
    }

    return this
  }

  getComponent (i) {
    if (i > 2) {
      throw new Error('index is out of range: ' + i)
    }

    switch (i) {
      case 0: return this.x
      case 1: return this.y
      case 2: return this.z
    }
  }

  clone () {
    return new this.constructor(this.x, this.y, this.z)
  }

  copy (v) {
    this.x = v.x
    this.y = v.y
    this.z = v.z
    return this
  }

  add (v) {
    this.x += v.x
    this.y += v.y
    this.z += v.z
    return this
  }

  addScalar (s) {
    this.x += s
    this.y += s
    this.z += s
    return this
  }

  addVectors (a, b) {
    this.x = a.x + b.x
    this.y = a.y + b.y
    this.z = a.z + b.z
    return this
  }

  addScaledVector (v, s) {
    this.x += v.x * s
    this.y += v.y * s
    this.z += v.z * s
    return this
  }

  sub (v) {
    this.x -= v.x
    this.y -= v.y
    this.z -= v.z
    return this
  }

  subScalar (s) {
    this.x -= s
    this.y -= s
    this.z -= s
    return this
  }

  subVectors (a, b) {
    this.x = a.x - b.x
    this.y = a.y - b.y
    this.z = a.z - b.z
    return this
  }

  multiply (v) {
    this.x *= v.x
    this.y *= v.y
    this.z *= v.z
    return this
  }

  multiplyScalar (scalar) {
    this.x *= scalar
    this.y *= scalar
    this.z *= scalar
    return this
  }

  multiplyVectors (a, b) {
    this.x = a.x * b.x
    this.y = a.y * b.y
    this.z = a.z * b.z
    return this
  }

  applyEuler (euler) {
    return this.applyQuaternion(this.quaternion.setFromEuler(euler))
  }

  applyAxisAngle (axis, angle) {
    return this.applyQuaternion(this.quaternion.setFromAxisAngle(axis, angle))
  }

  applyMatrix3 (m) {
    const {x, y, z} = this
    const e = m.elements

    this.x = e[0] * x + e[3] * y + e[6] * z
    this.y = e[1] * x + e[4] * y + e[7] * z
    this.z = e[2] * x + e[5] * y + e[8] * z
    return this
  }

  applyMatrix4 (m) {
    const {x, y, z} = this
    const e = m.elements
    const w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15])

    this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w
    this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w
    this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w
    return this
  }

  applyQuaternion (q) {
    const {x, y, z} = this
    const qx = q.x
    const qy = q.y
    const qz = q.z
    const qw = q.w

    // calculate quat * vector
    const ix = qw * x + qy * z - qz * y
    const iy = qw * y + qz * x - qx * z
    const iz = qw * z + qx * y - qy * x
    const iw = -qx * x - qy * y - qz * z

    // calculate result * inverse quat
    this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy
    this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz
    this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx

    return this
  }

  project (camera) {
    this.matrix4.multiplyMatrices(
      camera.projectionMatrix,
      this.matrix4.getInverse(camera.matrixWorld))

    return this.applyMatrix4(this.matrix4)
  }

  unproject (camera) {
    this.matrix4.multiplyMatrices(
      camera.matrixWorld,
      this.matrix4.getInverse(camera.projectionMatrix))

    return this.applyMatrix4(this.matrix4)
  }

  transformDirection (m) {
    // input: THREE.Matrix4 affine matrix
    // vector interpreted as a direction
    const {x, y, z} = this
    const e = m.elements

    this.x = e[0] * x + e[4] * y + e[8] * z
    this.y = e[1] * x + e[5] * y + e[9] * z
    this.z = e[2] * x + e[6] * y + e[10] * z

    return this.normalize()
  }

  divide (v) {
    this.x /= v.x
    this.y /= v.y
    this.z /= v.z
    return this
  }

  divideScalar (scalar) {
    return this.multiplyScalar(1 / scalar)
  }

  min (v) {
    this.x = Math.min(this.x, v.x)
    this.y = Math.min(this.y, v.y)
    this.z = Math.min(this.z, v.z)
    return this
  }

  max (v) {
    this.x = Math.max(this.x, v.x)
    this.y = Math.max(this.y, v.y)
    this.z = Math.max(this.z, v.z)
    return this
  }

  clamp (min, max) {
    // assumes min < max, componentwise
    this.x = Math.max(min.x, Math.min(max.x, this.x))
    this.y = Math.max(min.y, Math.min(max.y, this.y))
    this.z = Math.max(min.z, Math.min(max.z, this.z))
    return this
  }

  clampScalar (minVal, maxVal) {
    this.minVector3.set(minVal, minVal, minVal)
    this.maxVector3.set(maxVal, maxVal, maxVal)

    return this.clamp(this.minVector3, this.maxVector3)
  }

  clampLength (min, max) {
    const length = this.length()
    return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)))
  }

  floor () {
    this.x = Math.floor(this.x)
    this.y = Math.floor(this.y)
    this.z = Math.floor(this.z)
    return this
  }

  ceil () {
    this.x = Math.ceil(this.x)
    this.y = Math.ceil(this.y)
    this.z = Math.ceil(this.z)
    return this
  }

  round () {
    this.x = Math.round(this.x)
    this.y = Math.round(this.y)
    this.z = Math.round(this.z)
    return this
  }

  roundToZero () {
    this.x = (this.x < 0) ? Math.ceil(this.x) : Math.floor(this.x)
    this.y = (this.y < 0) ? Math.ceil(this.y) : Math.floor(this.y)
    this.z = (this.z < 0) ? Math.ceil(this.z) : Math.floor(this.z)
    return this
  }

  negate () {
    this.x = -this.x
    this.y = -this.y
    this.z = -this.z
    return this
  }

  dot (v) {
    return this.x * v.x + this.y * v.y + this.z * v.z
  }

  // TODO lengthSquared?
  lengthSq () {
    return this.x * this.x + this.y * this.y + this.z * this.z
  }

  length () {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
  }

  manhattanLength () {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
  }

  normalize () {
    return this.divideScalar(this.length() || 1)
  }

  setLength (length) {
    return this.normalize().multiplyScalar(length)
  }

  lerp (v, alpha) {
    this.x += (v.x - this.x) * alpha
    this.y += (v.y - this.y) * alpha
    this.z += (v.z - this.z) * alpha
    return this
  }

  lerpVectors (v1, v2, alpha) {
    return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1)
  }

  cross (v) {
    return this.crossVectors(this, v)
  }

  crossVectors (a, b) {
    const ax = a.x
    const ay = a.y
    const az = a.z
    const bx = b.x
    const by = b.y
    const bz = b.z

    this.x = ay * bz - az * by
    this.y = az * bx - ax * bz
    this.z = ax * by - ay * bx

    return this
  }

  projectOnVector (vector) {
    const scalar = vector.dot(this) / vector.lengthSq()
    return this.copy(vector).multiplyScalar(scalar)
  }

  projectOnPlane (planeNormal) {
    this.vector3.copy(this).projectOnVector(planeNormal)
    return this.sub(this.vector3)
  }

  reflect (normal) {
    return this.sub(this.vector3.copy(normal).multiplyScalar(2 * this.dot(normal)))
  }

  angleTo (v) {
    const theta = this.dot(v) / (Math.sqrt(this.lengthSq() * v.lengthSq()))
    // clamp, to handle numerical problems
    return Math.acos(clamp(theta, -1, 1))
  }

  distanceTo (v) {
    return Math.sqrt(this.distanceToSquared(v))
  }

  distanceToSquared (v) {
    const dx = this.x - v.x
    const dy = this.y - v.y
    const dz = this.z - v.z
    return dx * dx + dy * dy + dz * dz
  }

  manhattanDistanceTo (v) {
    return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z)
  }

  setFromSpherical (s) {
    const sinPhiRadius = Math.sin(s.phi) * s.radius
    this.x = sinPhiRadius * Math.sin(s.theta)
    this.y = Math.cos(s.phi) * s.radius
    this.z = sinPhiRadius * Math.cos(s.theta)
    return this
  }

  setFromCylindrical (c) {
    this.x = c.radius * Math.sin(c.theta)
    this.y = c.y
    this.z = c.radius * Math.cos(c.theta)
    return this
  }

  setFromMatrixPosition (m) {
    const e = m.elements
    this.x = e[12]
    this.y = e[13]
    this.z = e[14]
    return this
  }

  setFromMatrixScale (m) {
    this.x = this.setFromMatrixColumn(m, 0).length()
    this.y = this.setFromMatrixColumn(m, 1).length()
    this.z = this.setFromMatrixColumn(m, 2).length()
    return this
  }

  setFromMatrixColumn (m, index) {
    return this.fromArray(m.elements, index * 4)
  }

  equals (v) {
    return ((v.x === this.x) && (v.y === this.y) && (v.z === this.z))
  }

  fromArray (array, o) {
    const offset = o || 0
    this.x = array[offset]
    this.y = array[offset + 1]
    this.z = array[offset + 2]
    return this
  }

  toArray (arr, o) {
    const array = arr || []
    const offset = o || 0
    array[offset] = this.x
    array[offset + 1] = this.y
    array[offset + 2] = this.z
    return array
  }

  fromBufferAttribute (attribute, index, offset) {
    this.x = attribute.getX(index)
    this.y = attribute.getY(index)
    this.z = attribute.getZ(index)
    return this
  }
}

Vector3.prototype.isVector3 = true
Vector3.prototype.quaternion = new Quaternion()
Vector3.prototype.matrix4 = new Matrix4()
Vector3.prototype.vector3 = new Vector3()
Vector3.prototype.minVector3 = new Vector3()
Vector3.prototype.maxVector3 = new Vector3()

export {Vector3}
