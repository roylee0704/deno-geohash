import {
  assertEquals,
} from "https://deno.land/std/testing/asserts.ts";

import { BinaryEncoding } from "./binary-encoding.ts";

Deno.test("TestBinaryEncodingInit", () => {
  const tests = [
    { encoder: "012D", input: "0", want: 0 },
    { encoder: "012E", input: "2", want: 2 },
    { encoder: "AB", input: "A", want: 0 },
    { encoder: "0123BD12", input: "B", want: 4 },
  ];

  for (const [i, test] of tests.entries()) {
    const enc = new BinaryEncoding(test.encoder);
    const got = enc.getDecode()[test.input.charCodeAt(0)];
    assertEquals(
      got,
      test.want,
      `test-case#${i +
        1}: ${test.encoder}, ${test.input}. want: ${test.want}, got: ${got}`,
    );
  }
});

Deno.test("TestBinaryDecode", () => {
  const tests = [
    { encoder: "0123456789ABCDEF", input: "00FF", want: 255 }, // base-16
    { encoder: "0123", input: "200", want: 32 }, // base-4
    { encoder: "01", input: "1010", want: 10 }, // base-2
    { encoder: "012B", input: "B", want: 3 },
  ];

  for (const [i, test] of tests.entries()) {
    const enc = new BinaryEncoding(test.encoder);
    const got = enc.decode(test.input);
    assertEquals(
      got,
      test.want,
      `test-case#${i +
        1}: ${test.encoder}, ${test.input}. want: ${test.want}, got: ${got}`,
    );
  }
});

Deno.test("TestBinaryEncode", () => {
  const tests = [
    { encoder: "0123456789ABCDEF", input: 255, want: "0000000000FF" }, // base-16
    { encoder: "0123", want: "000000000200", input: 32 }, // base-4
    { encoder: "01", want: "000000001010", input: 10 }, // base-2
    { encoder: "012B", want: "00000000000B", input: 3 },
  ];

  for (const [i, test] of tests.entries()) {
    const enc = new BinaryEncoding(test.encoder);
    const got = enc.encode(test.input);
    assertEquals(
      got,
      test.want,
      `test-case#${i +
        1}: ${test.encoder}, ${test.input}. want: ${test.want}, got: ${got}`,
    );
  }
});
