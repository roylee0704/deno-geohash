// convert any known base (binary, hexadecimal) to base 10
export function toDecimal(input: string, base: number) {
  let sum = 0;
  let power = 1;
  for (let i = input.length - 1; i >= 0; i--) {
    const val = charToVal(input[i]);
    if (val >= base) {
      throw new Error(`invalid input of base ${base}`);
    }

    sum += val * power;
    power *= base;
  }

  return sum;
}

export function fromDecimal(base: number, input: number) {
  let s = "";

  if (input === 0) {
    return "0";
  }

  while (input >= 1) {
    s += valToChar(input % base);
    input /= base;
  }

  return reverseStr(s);
}

export function reverseStr(input: string): string {
  let lo = 0;
  let hi = input.length - 1;
  const target = input.split("");
  while (lo < hi) {
    const temp = target[hi];
    target[hi] = target[lo];
    target[lo] = temp;
    lo++;
    hi--;
  }

  return target.join("");
}

export function charToVal(char: string): number {
  const c = char[0];

  // val = char  - 'initial'
  if (c >= "0" && c <= "9") {
    return c.charCodeAt(0) - "0".charCodeAt(0);
  }

  // val = char  - 'initial' + 10
  if (c >= "A" && c <= "F") {
    return c.charCodeAt(0) - "A".charCodeAt(0) + 10;
  }
  return -1;
}

export function valToChar(val: number): string {
  // char = val + 'initial'
  if (val >= 0 && val <= 9) {
    return String.fromCharCode(val + "0".charCodeAt(0));
  }

  // char = val + 'initial' - 10
  if (val >= 10 && val <= 15) {
    return String.fromCharCode(val + "A".charCodeAt(0) - 10);
  }

  return "";
}
