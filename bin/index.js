"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const immutable_1 = __importDefault(require("immutable"));
const Fun = (actual) => {
    const f = actual;
    f.then = function (other) {
        return Fun(input => other(this(input)));
    };
    return f;
};
const apply = () => Fun(([f, a]) => f(a));
const Updater = Fun;
const id = () => Fun(x => x);
const Person = {
    Updaters: {
        fullName: (fieldUpdater) => Updater(person => (Object.assign(Object.assign({}, person), { fullName: fieldUpdater(person.fullName) }))),
        age: (fieldUpdater) => Updater(person => (Object.assign(Object.assign({}, person), { age: fieldUpdater(person.age) }))),
    }
};
const Course = {
    Updaters: {
        teacher: (fieldUpdater) => Updater(course => (Object.assign(Object.assign({}, course), { teacher: fieldUpdater(course.teacher) }))),
        students: (fieldUpdater) => Updater(course => (Object.assign(Object.assign({}, course), { students: fieldUpdater(course.students) }))),
    }
};
const isStringEmpty = Updater((s) => s.length == 0);
const doctorify = Updater((s) => `Dr ${s}`);
const incr = Fun((x) => x + 1);
const decr = Fun((x) => x - 1);
const double = Fun((x) => x * 2);
const gtz = Fun((x) => x > 0);
const not = Fun((x) => !x);
const course = {
    teacher: { id: "gm", fullName: "Giuseppe Maggiore", age: 38 },
    students: immutable_1.default.Map()
};
const Countainer = (data) => (Object.assign(Object.assign({}, data), { map: function (f) { return map_Countainer(f)(this); } }));
const increment = (input) => (Object.assign(Object.assign({}, input), { counter: input.counter + 1 }));
const map_Countainer = (f) => Fun(input => Countainer(Object.assign(Object.assign({}, input), { content: f(input.content) })));
// operations on specific countainers
const tmp = map_Countainer(doctorify.then(isStringEmpty)).then(Fun(increment));
// values of actual countainers in memory...
const c_n = Countainer({ content: 0, counter: 0 });
const c_s = Countainer({ content: "Content", counter: 0 });
const map_Id = (f) => f;
const Option = {
    Default: {
        Empty: () => ({ kind: "empty", then: function (f) { return then_Option(this, f); } }),
        Full: (content) => ({ kind: "full", content: content, then: function (f) { return then_Option(this, f); } }),
    }
};
const map_Option = (f) => Fun(input => input.kind == "empty" ? Option.Default.Empty() : Option.Default.Full(f(input.content)));
const map_Array = (f) => Fun(input => input.map(f));
const map_List = (f) => Fun(input => input.map(f));
const Functor = (f) => f;
const Then = (f, g) => ({ Before: f, After: g });
const mappings = {
    Id: map_Id,
    Array: map_Array,
    Countainer: map_Countainer,
    Option: map_Option
};
const map = (F) => typeof (F) == "string" && F in mappings ? mappings[F]
    : "After" in F && "Before" ?
        (f) => map(F["Before"])(map(F["After"])(f))
        : null;
const m1 = map(Functor("Array"));
const m2 = map(Then("Countainer", Functor("Option")))(incr.then(gtz));
const AACO = Then("Array", Then("Array", Then("Countainer", Functor("Option"))));
const AAO = Then("Array", Then("Array", Functor("Option")));
const m3 = map(AACO)(incr.then(gtz));
const associate = () => Fun(([a, [b, c]]) => [[a, b], c]);
const map2_Pair = (l, r) => Fun(p => [l(p[0]), r(p[1])]);
const mkPair = (l, r) => Fun(c => [l(c), r(c)]);
const stringPlus = {
    join: Fun(([s1, s2]) => s1 + s2),
    getZero: Fun((_) => "")
};
const numberPlus = {
    join: Fun(([s1, s2]) => s1 + s2),
    getZero: Fun((_) => 0)
};
// const borkedMonoid : Monoid<number> = {
//   join:Fun(([s1,s2]:Pair<number,number>) => s1+s2),
//   getZero:Fun((_:Unit) => 1)
// }
const identityLaw = (m, samples) => {
    const pointlessPath1 = mkPair(m.getZero, id()).then(m.join);
    const pointlessPath2 = mkPair(id(), m.getZero).then(m.join);
    samples.forEach(s => {
        if (s != pointlessPath1(s))
            console.error("m is not a monoid!!!");
        if (s != pointlessPath2(s))
            console.error("m is not a monoid!!!");
    });
};
const OptionMonad = {
    unit: () => Fun((Option.Default.Full)),
    join: () => Fun(o2 => o2.kind == "empty" ? Option.Default.Empty() : o2.content.kind == "empty" ? Option.Default.Empty() : Option.Default.Full(o2.content.content))
};
const then_Option = (p, f) => map_Option(Fun(f)).then(OptionMonad.join())(p);
const maybeAdd = (x, y) => x.then(x_v => y.then(y_v => Option.Default.Full(x_v + y_v)));
const State = (actual) => {
    const tmp = actual;
    tmp.then_State = function (f) {
        return then_State(this, f);
    };
    return tmp;
};
let map_State = (f) => Fun(p0 => State(p0.then(map2_Pair(f, id()))));
const StateMonad = () => ({
    unit: () => Fun(a => State(Fun(s0 => [a, s0]))),
    join: () => Fun(p_p => State(p_p.then(apply()))),
    getState: () => State(Fun(s0 => [s0, s0])),
    setState: (newState) => State(Fun(_ => [{}, newState])),
    updateState: (stateUpdater) => State(Fun(s0 => [{}, stateUpdater(s0)])),
});
const then_State = (p, f) => map_State(Fun(f)).then(StateMonad().join())(p);
const Memory = {
    Default: ({ a: 0, b: 0, c: "c", d: "d" }),
    a: (_) => Fun(current => (Object.assign(Object.assign({}, current), { a: _(current.a) }))),
    b: (_) => Fun(current => (Object.assign(Object.assign({}, current), { b: _(current.b) }))),
    c: (_) => Fun(current => (Object.assign(Object.assign({}, current), { c: _(current.c) }))),
    d: (_) => Fun(current => (Object.assign(Object.assign({}, current), { d: _(current.d) }))),
};
const Ins = Object.assign(Object.assign({}, StateMonad()), { getVar: (k) => Ins.getState().then_State(current => Ins.unit()(current[k])), setVar: (k, v) => Ins.updateState(current => (Object.assign(Object.assign({}, current), { [k]: v }))) });
// Ins.updateState(currentState => ({...currentState, a:currentState.a+1})).then_State(() => 
//   Ins.updateState(currentState => ({...currentState, b:currentState.b+1}))
// )
const myProgram1 = Ins.getVar("a").then_State(a => Ins.setVar("a", a + 1).then_State(() => Ins.getVar("c").then_State(c => Ins.getVar("d").then_State(d => Ins.setVar("c", c + d)))));
const thenMaybe = (f, g) => f.kind == "full" && g.kind == "full" ? Option.Default.Full(f.content.then(g.content))
    : f.kind == "full" ? f : g;
const Coroutine = () => ({
    // constructors
    Default: (actual) => {
        const result = actual;
        result.then = function (k) { return Coroutine().then(this, Fun(k)); };
        return result;
    },
    Result: (value) => Coroutine().Default((_) => CoroutineStep().Result(value)),
    Suspend: () => Coroutine().Default((_) => CoroutineStep().Suspend(Coroutine().Result({}))),
    Wait: (msLeft) => Coroutine().Default((_) => CoroutineStep().Wait(msLeft, Coroutine().Result({}))),
    GetState: () => Coroutine().Default(([context, deltaT]) => CoroutineStep().Result(context)),
    SetState: (updateState) => Coroutine().Default(([context, deltaT]) => CoroutineStep().SetState(updateState)),
    // combinators
    Tick: (context, deltaT, p) => {
        const step = p([context, deltaT]);
        if (step.kind == "result") {
            return { kind: "done", result: step.value, updateState: step.updateState };
        }
        else if (step.kind == "suspend") {
            return { kind: "continuing", next: step.next, updateState: step.updateState };
        }
        else {
            if (step.msLeft <= deltaT)
                return { kind: "continuing", next: step.next, updateState: step.updateState };
            else
                return { kind: "continuing", next: Coroutine().Wait(step.msLeft - deltaT).then(() => step.next), updateState: step.updateState };
        }
    },
    Seq: (ps) => ps.length <= 0 ? Coroutine().Result({}) : ps[0].then(() => Coroutine().Seq(ps.slice(1))),
    Repeat: (p) => p().then(() => Coroutine().Repeat(p)),
    Any: (ps) => {
        return Coroutine().Default(([context, deltaT]) => {
            const ps1 = [];
            let nextState = Option.Default.Empty();
            for (const p of ps) {
                const step = Coroutine().Tick(context, deltaT, p);
                nextState = thenMaybe(nextState, step.updateState);
                if (step.kind == "done")
                    return { kind: "result", value: step.result, updateState: nextState };
                else {
                    ps1.push(step.next);
                }
            }
            return { kind: "suspend", next: Coroutine().Any(ps1), updateState: nextState };
        });
    },
    // functoriality and monadicity
    map: (f) => Fun(p => Coroutine().Default(Fun(p).then(CoroutineStep().map(f)))),
    join: (pp) => Coroutine().Default(([context, deltaT]) => {
        const step = pp([context, deltaT]);
        if (step.kind == "result") {
            const step1 = step.value([context, deltaT]);
            return Object.assign(Object.assign({}, step1), { updateState: thenMaybe(step.updateState, step1.updateState) });
        }
        else {
            const joinedNext = Coroutine().join(step.next);
            return Object.assign(Object.assign({}, step), { next: joinedNext });
        }
    }),
    then: (p, k) => Coroutine().join(Coroutine().map(k)(p)),
});
const CoroutineStep = () => ({
    SetState: (updateState) => ({ kind: "result", value: {}, updateState: Option.Default.Full(updateState) }),
    Result: (value) => ({ kind: "result", value: value, updateState: Option.Default.Empty() }),
    Suspend: (next) => ({ kind: "suspend", next: next, updateState: Option.Default.Empty() }),
    Wait: (msLeft, next) => ({ kind: "waiting", next: next, msLeft: msLeft, updateState: Option.Default.Empty() }),
    map: (f) => Fun(cs => cs.kind == "result" ? Object.assign(Object.assign({}, cs), { value: f(cs.value) }) : Object.assign(Object.assign({}, cs), { next: Coroutine().map(f)(cs.next) }))
});
const Co = Coroutine();
const p = Co.Seq([
    Co.SetState(Memory.a(incr)),
    Co.Wait(60),
    Co.SetState(Memory.b(incr)),
    Co.Wait(40),
    Co.Any([
        Co.Repeat(() => Co.Seq([
            Co.SetState(Memory.a(incr)),
            Co.Wait(20),
        ])),
        Co.Wait(200)
    ])
]);
const deltaT = 10;
const run = (currentState, p) => {
    const step = Co.Tick(currentState, deltaT, p);
    const nextState = (step.updateState.kind == "full" ? step.updateState.content : id())(currentState);
    console.log(`New state: ${JSON.stringify(nextState)}`);
    if (step.kind == "done")
        return;
    return run(nextState, step.next);
};
run(Memory.Default, p);
const t = map_Option(map_List(incr.then(double)));
