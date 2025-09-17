// Represents an interval, e.g. [1,2) or (0,pi]
// Used in case functions are not continuous
// Currently, the only functions used are continuous but in the future,
// functions such as tan may be used
export type Domain = 
{
  start: number;
  end: number;
  includeStart: boolean;
  includeEnd: boolean;
};

// Mathematical function
export type Function = (x: number) => number;

// Function displayed in a graph
export type DisplayFunction = 
{
  name: string;
  color: () => string;
  func: Function;
  // Gets all of the valid domains for the function in [a,b]
  // a and b are usually the left and right of the camera in function coordinate space
  // This is for rendering only the necessary domains for a function
  getDomains?: (a: number, b: number) => Domain[];
};
