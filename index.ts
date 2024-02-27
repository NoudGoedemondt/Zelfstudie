// Recursive type ex.
type EmptyListNum = {kind: 'empty'};
type FullListNum = {kind: 'full', head: number, tail: ListNum};
type ListNum = EmptyListNum | FullListNum;

const empty = (): EmptyListNum => ({kind: 'empty'});
const full = (head: number, tail: ListNum): FullListNum => ({kind: 'full', head: head, tail: tail});

console.log(full(1, full(2, full(3, empty()))));