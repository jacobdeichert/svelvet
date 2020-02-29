function t() {}
function n(t, n) {
    for (const e in n) t[e] = n[e];
    return t;
}
function e(t) {
    return t();
}
function o() {
    return Object.create(null);
}
function r(t) {
    t.forEach(e);
}
function c(t) {
    return 'function' == typeof t;
}
function s(t, n) {
    return t != t
        ? n == n
        : t !== n || (t && 'object' == typeof t) || 'function' == typeof t;
}
function u(n, ...e) {
    if (null == n) return t;
    const o = n.subscribe(...e);
    return o.unsubscribe ? () => o.unsubscribe() : o;
}
function i(t, n, e) {
    t.$$.on_destroy.push(u(n, e));
}
function f(t, n, e, o) {
    if (t) {
        const r = a(t, n, e, o);
        return t[0](r);
    }
}
function a(t, e, o, r) {
    return t[1] && r ? n(o.ctx.slice(), t[1](r(e))) : o.ctx;
}
function l(t, n, e, o) {
    if (t[2] && o) {
        const r = t[2](o(e));
        if ('object' == typeof n.dirty) {
            const t = [],
                e = Math.max(n.dirty.length, r.length);
            for (let o = 0; o < e; o += 1) t[o] = n.dirty[o] | r[o];
            return t;
        }
        return n.dirty | r;
    }
    return n.dirty;
}
function d(t) {
    const n = {};
    for (const e in t) '$' !== e[0] && (n[e] = t[e]);
    return n;
}
function p(t, n, e) {
    t.insertBefore(n, e || null);
}
function $(t) {
    t.parentNode.removeChild(t);
}
function h(t) {
    return document.createElement(t);
}
function m() {
    return (t = ''), document.createTextNode(t);
    var t;
}
function g(t, n, e, o) {
    return t.addEventListener(n, e, o), () => t.removeEventListener(n, e, o);
}
function y(t, n, e) {
    null == e
        ? t.removeAttribute(n)
        : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function b(t, n) {
    const e = Object.getOwnPropertyDescriptors(t.__proto__);
    for (const o in n)
        null == n[o]
            ? t.removeAttribute(o)
            : 'style' === o
            ? (t.style.cssText = n[o])
            : e[o] && e[o].set
            ? (t[o] = n[o])
            : y(t, o, n[o]);
}
let _;
function x(t) {
    _ = t;
}
function v() {
    if (!_) throw new Error('Function called outside component initialization');
    return _;
}
function E(t) {
    v().$$.on_mount.push(t);
}
function w(t) {
    v().$$.on_destroy.push(t);
}
function j() {
    const t = v();
    return (n, e) => {
        const o = t.$$.callbacks[n];
        if (o) {
            const r = (function(t, n) {
                const e = document.createEvent('CustomEvent');
                return e.initCustomEvent(t, !1, !1, n), e;
            })(n, e);
            o.slice().forEach(n => {
                n.call(t, r);
            });
        }
    };
}
function A(t, n) {
    v().$$.context.set(t, n);
}
function k(t) {
    return v().$$.context.get(t);
}
const C = [],
    O = [],
    N = [],
    S = [],
    q = Promise.resolve();
let z = !1;
function B(t) {
    N.push(t);
}
const D = new Set();
function F() {
    do {
        for (; C.length; ) {
            const t = C.shift();
            x(t), L(t.$$);
        }
        for (; O.length; ) O.pop()();
        for (let t = 0; t < N.length; t += 1) {
            const n = N[t];
            D.has(n) || (D.add(n), n());
        }
        N.length = 0;
    } while (C.length);
    for (; S.length; ) S.pop()();
    (z = !1), D.clear();
}
function L(t) {
    if (null !== t.fragment) {
        t.update(), r(t.before_update);
        const n = t.dirty;
        (t.dirty = [-1]),
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach(B);
    }
}
const M = new Set();
let P;
function T() {
    P = { r: 0, c: [], p: P };
}
function G() {
    P.r || r(P.c), (P = P.p);
}
function H(t, n) {
    t && t.i && (M.delete(t), t.i(n));
}
function I(t, n, e, o) {
    if (t && t.o) {
        if (M.has(t)) return;
        M.add(t),
            P.c.push(() => {
                M.delete(t), o && (e && t.d(1), o());
            }),
            t.o(n);
    }
}
function J(t, n) {
    const e = {},
        o = {},
        r = { $$scope: 1 };
    let c = t.length;
    for (; c--; ) {
        const s = t[c],
            u = n[c];
        if (u) {
            for (const t in s) t in u || (o[t] = 1);
            for (const t in u) r[t] || ((e[t] = u[t]), (r[t] = 1));
            t[c] = u;
        } else for (const t in s) r[t] = 1;
    }
    for (const t in o) t in e || (e[t] = void 0);
    return e;
}
function K(t) {
    return 'object' == typeof t && null !== t ? t : {};
}
function Q(t) {
    t && t.c();
}
function R(t, n, o) {
    const { fragment: s, on_mount: u, on_destroy: i, after_update: f } = t.$$;
    s && s.m(n, o),
        B(() => {
            const n = u.map(e).filter(c);
            i ? i.push(...n) : r(n), (t.$$.on_mount = []);
        }),
        f.forEach(B);
}
function U(t, n) {
    const e = t.$$;
    null !== e.fragment &&
        (r(e.on_destroy),
        e.fragment && e.fragment.d(n),
        (e.on_destroy = e.fragment = null),
        (e.ctx = []));
}
function V(t, n) {
    -1 === t.$$.dirty[0] &&
        (C.push(t), z || ((z = !0), q.then(F)), t.$$.dirty.fill(0)),
        (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function W(n, e, c, s, u, i, f = [-1]) {
    const a = _;
    x(n);
    const l = e.props || {},
        d = (n.$$ = {
            fragment: null,
            ctx: null,
            props: i,
            update: t,
            not_equal: u,
            bound: o(),
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(a ? a.$$.context : []),
            callbacks: o(),
            dirty: f,
        });
    let p = !1;
    (d.ctx = c
        ? c(n, l, (t, e, ...o) => {
              const r = o.length ? o[0] : e;
              return (
                  d.ctx &&
                      u(d.ctx[t], (d.ctx[t] = r)) &&
                      (d.bound[t] && d.bound[t](r), p && V(n, t)),
                  e
              );
          })
        : []),
        d.update(),
        (p = !0),
        r(d.before_update),
        (d.fragment = !!s && s(d.ctx)),
        e.target &&
            (e.hydrate
                ? d.fragment &&
                  d.fragment.l(
                      (function(t) {
                          return Array.from(t.childNodes);
                      })(e.target)
                  )
                : d.fragment && d.fragment.c(),
            e.intro && H(n.$$.fragment),
            R(n, e.target, e.anchor),
            F()),
        x(a);
}
class X {
    $destroy() {
        U(this, 1), (this.$destroy = t);
    }
    $on(t, n) {
        const e = this.$$.callbacks[t] || (this.$$.callbacks[t] = []);
        return (
            e.push(n),
            () => {
                const t = e.indexOf(n);
                -1 !== t && e.splice(t, 1);
            }
        );
    }
    $set() {}
}
export {
    K as A,
    U as B,
    h as C,
    b as D,
    g as E,
    j as F,
    X as S,
    u as a,
    W as b,
    f as c,
    l as d,
    I as e,
    k as f,
    a as g,
    i as h,
    c as i,
    A as j,
    m as k,
    p as l,
    G as m,
    t as n,
    E as o,
    $ as p,
    w as q,
    r,
    s,
    H as t,
    n as u,
    d as v,
    T as w,
    Q as x,
    R as y,
    J as z,
};
//# sourceMappingURL=index-b6b589c3.js.map
