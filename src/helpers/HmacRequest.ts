import axios from "axios";

const createHmac = async <B>(secret: string, body: B): Promise<string> => {
  const enc = new TextEncoder();
  const algorithm = { name: "HMAC", hash: "SHA-256" };

  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    algorithm,
    false,
    ["sign", "verify"]
  );
  const signature = await crypto.subtle.sign(
    algorithm.name,
    key,
    enc.encode(typeof body === "string" ? body : JSON.stringify(body))
  );
  return [...new Uint8Array(signature)]
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
};

export const makeHmacPOSTRequest = async <R, B>(
  url: string,
  secret: string,
  body: B
): Promise<R> => {
  return (
    await axios.post<R>(url, body, {
      headers: {
        Authorization: await createHmac(secret, body),
      },
    })
  ).data;
};
export const makeHmacGETRequest = async <R>(
  url: string,
  secret: string
): Promise<R> => {
  return (
    await axios.get<R>(url, {
      headers: {
        Authorization: await createHmac(secret, "EMPTY"),
      },
    })
  ).data;
};
