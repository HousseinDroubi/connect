import { getIdFromToken, isObjectIdValid } from "./general";

const getIdFromWebsocket = (request_url: string): string | null => {
  const _id = getIdFromToken(`Bearer ${request_url.split("=")[1]}`);
  if (!_id || !isObjectIdValid(_id)) return null;
  return _id;
};

export { getIdFromWebsocket };
