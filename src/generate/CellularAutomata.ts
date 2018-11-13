const generateMatrix = (code: number, n: number) => {
  const matrix = [generateInitialRow(n * 3)];

  for (let i = 1; i < n; i++) {
    matrix.push(reducer(code, matrix[i - 1]));
  }
  return matrix;
};

const generateInitialRow = (n: number) => {
  if (n % 2 === 0) {
    throw new Error("n has to be odd");
  }

  const initialRow: boolean[] = [];

  for (let i = 0; i < n; i++) {
    initialRow.push(i === (n - 1) / 2);
  }

  return initialRow;
};

const reducer = (code: number, row: boolean[]) => {
  return row.map((value, index) => {
    const q = index === 0 ? false : row[index - 1];
    const r = row[index];
    const l = index === row.length - 1 ? false : row[index + 1];

    return getNextCell(code, q, r, l);
  });
};

const getNextCell = (code: number, q: boolean, r: boolean, l: boolean) => {
  if (q && r && l) {
    return ((code >> 7) & 1) === 1;
  } else if (q && r && !l) {
    return ((code >> 6) & 1) === 1;
  } else if (q && !r && l) {
    return ((code >> 5) & 1) === 1;
  } else if (q && !r && !l) {
    return ((code >> 4) & 1) === 1;
  } else if (!q && r && l) {
    return ((code >> 3) & 1) === 1;
  } else if (!q && r && !l) {
    return ((code >> 2) & 1) === 1;
  } else if (!q && !r && l) {
    return ((code >> 1) & 1) === 1;
  } else {
    return ((code >> 0) & 1) === 1;
  }
};

export { generateMatrix };
