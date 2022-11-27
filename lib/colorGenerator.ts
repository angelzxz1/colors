export default function addHexColor(c1: string, c2: string) {
  const octetsRegex = /^([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
  const m1 = c1.match(octetsRegex);
  const m2 = c2.match(octetsRegex);
  if (!m1 || !m2) {
    throw new Error(`invalid hex color triplet(s): ${c1} / ${c2}`);
  }
  return [1, 2, 3]
    .map((i) => {
      const sum = parseInt(m1[i], 16) + parseInt(m2[i], 16);
      if (sum > 0xff) {
        throw new Error(
          `octet ${i} overflow: ${m1[i]}+${m2[i]}=${sum.toString(16)}`
        );
      }
      return sum.toString(16).padStart(2, "0");
    })
    .join("");
}
