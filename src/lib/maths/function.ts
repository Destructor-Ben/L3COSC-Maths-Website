// Represents an interval, e.g. [1,2) or (0,pi])
export type Domain = 
{
  start: number;
  end: number;
  includeStart: boolean;
  includeEnd: boolean;
};

// Mathematical function
export type Function = (x: number) => number;

// Display function
export type DisplayFunction = 
{
  name: string;
  color: () => string;
  func: Function;
  // Gets all of the valid domains for the function in [a,b]
  getDomains?: (a: number, b: number) => Domain[];
};
