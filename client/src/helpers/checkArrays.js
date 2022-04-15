export const correctNumberCorrectIdx = (arr1, arr2) => {
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] === arr2[i]) return arr1[i];
  }
  return false;
}

export const correctNumberGuess = (arr1, arr2) => {
  for (let num of arr1) {
    if (arr2.includes(num)) return num;
  }
  return false;
}