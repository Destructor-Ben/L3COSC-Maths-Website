// Represents an interval, e.g. [1,2) or (0,pi])
export type Domain = 
{
  start: number;
  end: number;
  includeStart: boolean;
  includeEnd: boolean;
};

// TODO: rename the 2 below:
// - Func -> Function
// - Function -> DisplayFunction

// Mathematical function
export type Func = (x: number) => number;

// Display function
export type Function = 
{
  name: string;
  color: string;
  func: Func;
  // Gets all of the valid domains for the function in [a,b]
  getDomain?: (a: number, b: number) => Domain[];
};
