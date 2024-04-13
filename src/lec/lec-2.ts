/*
type Fun<input, output> = {
  (input: input): output;
  then: <nextOutput>(other: Fun<output, nextOutput>) => Fun<input, nextOutput>;
};

const Fun = <input, output>(
  actual: (_: input) => output
): Fun<input, output> => {
  const f = actual as Fun<input, output>;

  f.then = function <nextOutput>(
    this: Fun<input, output>,
    other: Fun<output, nextOutput>
  ): Fun<input, nextOutput> {
    return Fun((input) => other(this(input)));
  };
  return f;
};

const id = <a>() => Fun<a, a>((x) => x);

const incr = Fun((x: number) => x + 1);
const decr = Fun((x: number) => x - 1);
const double = Fun((x: number) => x * 2);

type Countainer<a> = { content: a; counter: number };

const c_n: Countainer<number> = { content: 10, counter: 0 };
*/