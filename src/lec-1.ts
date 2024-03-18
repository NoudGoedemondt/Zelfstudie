// wrapper datatype for functions
type Fun<input, output> = {
  (input: input): output;
  // then operator for function composition,
  // takes as input the output of another function and returns a new/next ouput
  then: <nextOutput>(other: Fun<output, nextOutput>) => Fun<input, nextOutput>;
};

// lifting operator which takes as input a regular function and returns our
// enriched function definition
const Fun = <input, output>(
  actual: (_: input) => output
): Fun<input, output> => {
  const f = actual as Fun<input, output>;
  // define then method
  f.then = function <nextOutput>(
    this: Fun<input, output>,
    other: Fun<output, nextOutput>
  ): Fun<input, nextOutput> {
    return Fun((input) => other(this(input)));
    /* this(input) -> output
     * give output to other for nextOutput
     * other(this(input)) -> nextOutput
     */
  };
  return f;
};

// identity function
const id = <s>() => Fun<s, s>((x) => x);

const incr = Fun((x: number) => x + 1);
const decr = Fun((x: number) => x - 1);
const double = Fun((x: number) => x * 2);
const gtz = Fun((x: number) => x > 2);
const neg = Fun((x: boolean) => !x);
const isEven = Fun((x: number) => x % 2 == 0);

const sum = Fun((x: [number, number]) => x[0] + x[1]);
const and = Fun((x: [boolean, boolean]) => x[0] && x[1]);
