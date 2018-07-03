export const isPointInsideAABB = (point, box) => {
  return (point.x >= box.minX && point.x <= box.maxX) &&
         (point.y >= box.minY && point.y <= box.maxY) &&
         (point.z >= box.minZ && point.z <= box.maxZ)
}

export const intersectBoxes = (a, b) => {
  return (a.minX <= b.maxX && a.maxX >= b.minX) &&
         (a.minY <= b.maxY && a.maxY >= b.minY) &&
         (a.minZ <= b.maxZ && a.maxZ >= b.minZ)
}

export const isPointInsideSphere = (point, sphere) => {
  const distance = Math.sqrt((point.x - sphere.x) * (point.x - sphere.x) +
                           (point.y - sphere.y) * (point.y - sphere.y) +
                           (point.z - sphere.z) * (point.z - sphere.z))
  return distance < sphere.radius
}

export const intersectSphere = (sphere, other) => {
  const distance = Math.sqrt((sphere.x - other.x) * (sphere.x - other.x) +
                           (sphere.y - other.y) * (sphere.y - other.y) +
                           (sphere.z - other.z) * (sphere.z - other.z))
  return distance < (sphere.radius + other.radius)
}
