export const limitString = (str: string, quantity: number, newStr?: string) => {
  if (str.length > 0) {
    return str.substr(0, quantity) + (str.length > quantity ? '...' : String.fromCharCode(32));
  }

  return newStr || '';
};

export const resouceAvailaible = (obj: any, resource: string) => obj[resource];
