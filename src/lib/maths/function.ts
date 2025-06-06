// Represents an interval, e.g. [1,2) or (0,pi])
export type Domain = 
{
  start: number;
  end: number;
  includeStart: boolean;
  includeEnd: boolean;
};

export type Function = 
{
  name: string;
  color: string;
  func: (x: number) => number;
  // Gets all of the valid domains for the function in [a,b]
  getDomain?: (a: number, b: number) => Domain[];
};
