export default class Matrix4 {
  constructor () {
    this.elements = new Float32Array(16)
    this.identity()
  }

  set (
    n11, n12, n13, n14,
    n21, n22, n23, n24,
    n31, n32, n33, n34,
    n41, n42, n43, n44
  ) {
    const te = this.elements

    te[0] = n11; te[1] = n21; te[2] = n31; te[3] = n41
    te[4] = n12; te[5] = n22; te[6] = n32; te[7] = n42
    te[8] = n13; te[9] = n23; te[10] = n33; te[11] = n43
    te[12] = n14; te[13] = n24; te[14] = n34; te[15] = n44

    return this
  }

  identity () {
    return this.set(
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1)
  }

  makeTranslation (x, y, z) {
    return this.set(
      1, 0, 0, x,
      0, 1, 0, y,
      0, 0, 1, z,
      0, 0, 0, 1)
  }

  makeRotationX (theta) {
    const c = Math.cos(theta)
    const s = Math.sin(theta)

    return this.set(
      1, 0, 0, 0,
      0, c, -s, 0,
      0, s, c, 0,
      0, 0, 0, 1)
  }

  makeRotationY (theta) {
    const c = Math.cos(theta)
    const s = Math.sin(theta)

    return this.set(
      c, 0, s, 0,
      0, 1, 0, 0,
      -s, 0, c, 0,
      0, 0, 0, 1)
  }

  makeRotationZ (theta) {
    const c = Math.cos(theta)
    const s = Math.sin(theta)

    return this.set(
      c, -s, 0, 0,
      s, c, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1)
  }

  makeRotationAxis (axis, angle) {
    // Based on http://www.gamedev.net/reference/articles/article1199.asp
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    const t = 1 - c
    const {x, y, z} = axis
    const tx = t * x
    const ty = t * y

    this.set(
      tx * x + c, tx * y - s * z, tx * z + s * y, 0,
      tx * y + s * z, ty * y + c, ty * z - s * x, 0,
      tx * z - s * y, ty * z + s * x, t * z * z + c, 0,
      0, 0, 0, 1
    )

    return this
  }

  makeScale (x, y, z) {
    return this.set(
      x, 0, 0, 0,
      0, y, 0, 0,
      0, 0, z, 0,
      0, 0, 0, 1)
  }

  makeShear (x, y, z) {
    return this.set(
      1, y, z, 0,
      x, 1, z, 0,
      x, y, 1, 0,
      0, 0, 0, 1)
  }

  multiply (m) {
    return this.multiplyMatrices(this, m)
  }

  multiplyMatrices (a, b) {
    const te = this.elements

    const [
      a11, a21, a31, a41,
      a12, a22, a32, a42,
      a13, a23, a33, a43,
      a14, a24, a34, a44
    ] = a.elements

    const [
      b11, b21, b31, b41,
      b12, b22, b32, b42,
      b13, b23, b33, b43,
      b14, b24, b34, b44
    ] = b.elements

    te[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41
    te[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42
    te[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43
    te[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44

    te[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41
    te[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42
    te[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43
    te[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44

    te[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41
    te[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42
    te[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43
    te[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44

    te[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41
    te[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42
    te[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43
    te[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44

    return this
  }
}

Matrix4.prototype.isMatrix4 = true
