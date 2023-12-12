export enum BodyTypes {
  JSON = "json",
}
interface ApiCallArg {
  url: string;
  method: string;
  body: any;
  bodyType: string;
  headers?: [string, string];
}

const ApiCall = async ({ url, method, body, bodyType }: ApiCallArg) => {
  const requestHeaders: HeadersInit = new Headers();
  if (bodyType === BodyTypes.JSON) {
    requestHeaders.set("Content-Type", "application/json");
    body = JSON.stringify(body);
  }
  return fetch(url, { method, body, headers: requestHeaders });
};

export default ApiCall;
