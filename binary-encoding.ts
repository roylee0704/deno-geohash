const INVALID = 0xff;
export class BinaryEncoding {
  private decoder: Uint8Array; //enc[...decimals]
  private encoder: string;

  private totalBitsRequiredToStoreEncodingChars: number;

  constructor(encoder: string) {
    this.encoder = encoder;
    this.decoder = new Uint8Array(256).fill(INVALID);

    // 2^(exp) = radix
    const radix = encoder.length;
    if (!Number.isInteger(Math.log2(radix))) {
      throw new Error("Only radix with powers of 2 is allowable");
    }

    this.totalBitsRequiredToStoreEncodingChars = Math.log2(radix);
    for (const [i, enc] of encoder.split("").entries()) {
      this.decoder[enc.charCodeAt(0)] = i; // exp-1bits number
    }
  }

  public getDecode(): Uint8Array {
    // 0123456789
    return this.decoder;
  }

  // from uint64 to max 12-char length
  public encode(num: number): string {
    let x = num;
    let chars = [];
    for (let i = 0; i < 12; i++) {
      chars[11 - i] = this
        .encoder[
        x & (Math.pow(2, this.totalBitsRequiredToStoreEncodingChars) - 1)
      ];

      x = x >> this.totalBitsRequiredToStoreEncodingChars;
    }

    return chars.join("");
  }

  // to uint64 bit
  public decode(str: string): number {
    let val = 0;
    for (const c of str) {
      val = val << this.totalBitsRequiredToStoreEncodingChars |
        this.decoder[c.charCodeAt(0)];
    }
    return val;
  }
}
