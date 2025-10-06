import { NotFoundError } from "./error";

const apiFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new NotFoundError(`Failed to fetch data from ${url}`); 
  }
  
  return response.json() as Promise<T>;
}

export default apiFetch;