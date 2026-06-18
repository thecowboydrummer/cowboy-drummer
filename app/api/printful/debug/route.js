export async function GET() {
  const key = process.env.PRINTFUL_API_KEY || "";
  const storeId = process.env.PRINTFUL_STORE_ID || "";
  return Response.json({
    keyLength: key.length,
    keyPrefix: key.slice(0, 4),
    keySuffix: key.slice(-4),
    keyHasWhitespace: key !== key.trim(),
    keyHasQuotes: key.includes('"') || key.includes("'"),
    storeId,
    storeIdLength: storeId.length,
  });
}
