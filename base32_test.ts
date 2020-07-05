import {
  assertEquals,
  assertArrayContains,
} from "https://deno.land/std/testing/asserts.ts";

import { charToVal, toDecimal, fromDecimal } from "./base32.ts";

Deno.test("TestCharToVal", () => {
  const tests = [
    { input: "0", want: 0 },
    { input: "1", want: 1 },
    { input: "2", want: 2 },
    { input: "3", want: 3 },
    { input: "4", want: 4 },
    { input: "5", want: 5 },
    { input: "6", want: 6 },
    { input: "7", want: 7 },
    { input: "8", want: 8 },
    { input: "9", want: 9 },
    { input: "A", want: 10 },
    { input: "B", want: 11 },
    { input: "C", want: 12 },
    { input: "D", want: 13 },
    { input: "E", want: 14 },
    { input: "F", want: 15 },
    { input: "J", want: -1 },
  ];

  for (const test of tests) {
    assertEquals(charToVal(test.input), test.want);
  }
});

Deno.test("TestToDecimal", () => {
  const tests = [
    { input: "0", base: 2, want: 0 },
    { input: "1010", base: 2, want: 10 },
    { input: "A", base: 16, want: 10 },
    { input: "AA", base: 16, want: 170 },
  ];

  for (const test of tests) {
    assertEquals(toDecimal(test.input, test.base), test.want);
  }
});

Deno.test("TestFromDecimal", () => {
  const tests = [
    { input: 0, base: 2, want: "0" },
    { input: 10, base: 2, want: "1010" },
    { input: 10, base: 16, want: "A" },
    { input: 170, base: 16, want: "AA" },
  ];

  for (const test of tests) {
    assertEquals(fromDecimal(test.base, test.input), test.want);
  }
});
