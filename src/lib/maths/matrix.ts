import Matrix from "ml-matrix";

// Utils to create various transformation matrices (for 2D only)
// Matrices are 3x3 (homogenous coordinates for 2D)
// ml-matrix is row major, so this means:
// - Vectors should be row vectors
// - Because of the above, multiplication order is v * T1 * T2 (where T1 is applied before T2)

export function scaleMatrix(scaleX: number, scaleY: number): Matrix {
  const matrix = Matrix.identity(3);
  matrix.set(0, 0, scaleX);
  matrix.set(1, 1, scaleY);
  return matrix;
}

export function translateMatrix(translateX: number, translateY: number): Matrix {
  const matrix = Matrix.identity(3);
  matrix.set(2, 0, translateX);
  matrix.set(2, 1, translateY);
  return matrix;
}
