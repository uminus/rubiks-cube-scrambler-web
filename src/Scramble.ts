interface ScrambleType {
  letters: Array<string>;
  modifiers: Array<string>;
}

export const _333: ScrambleType = {
  letters: ["F", "B", "L", "R", "U", "D"],
  modifiers: ["", "'", "2"]
}

function random(l: number): () => number {
  return () => Math.floor(Math.random() * l);
}

export function scramble(type: ScrambleType, length: number = 20): string {
  const randL = random(type.letters.length);
  const randM = random(type.modifiers.length);

  let prev = Number.NaN;
  let result = [] as Array<string>;
  while (result.length < length) {
    const l = randL();
    if (prev === l) continue;
    prev = l;
    result.push(`${type.letters[l]}${type.modifiers[randM()]}`);
  }
  return result.join(" ");
}