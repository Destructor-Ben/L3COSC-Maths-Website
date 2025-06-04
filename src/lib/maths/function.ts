// TODO: add suport for discontinuous functions
export type Function = 
{
  name: string;
  func: (x: number) => number; // This is assumed to be continuous
  color: string;
};
