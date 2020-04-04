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
        if (void 0 === n.dirty) return r;
        if ('object' == typeof r) {
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
function p(t, n) {
    t.appendChild(n);
}
function $(t, n, e) {
    t.insertBefore(n, e || null);
}
function h(t) {
    t.parentNode.removeChild(t);
}
function m(t) {
    return document.createElement(t);
}
function g(t) {
    return document.createTextNode(t);
}
function y() {
    return g(' ');
}
function b() {
    return g('');
}
function _(t, n, e, o) {
    return t.addEventListener(n, e, o), () => t.removeEventListener(n, e, o);
}
function x(t, n, e) {
    null == e
        ? t.removeAttribute(n)
        : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function v(t, n) {
    const e = Object.getOwnPropertyDescriptors(t.__proto__);
    for (const o in n)
        null == n[o]
            ? t.removeAttribute(o)
            : 'style' === o
            ? (t.style.cssText = n[o])
            : '__value' === o || (e[o] && e[o].set)
            ? (t[o] = n[o])
            : x(t, o, n[o]);
}
let E;
function w(t) {
    E = t;
}
function j() {
    if (!E) throw new Error('Function called outside component initialization');
    return E;
}
function A(t) {
    j().$$.on_mount.push(t);
}
function k(t) {
    j().$$.on_destroy.push(t);
}
function C() {
    const t = j();
    return (n, e) => {
        const o = t.$$.callbacks[n];
        if (o) {
            const r = (function (t, n) {
                const e = document.createEvent('CustomEvent');
                return e.initCustomEvent(t, !1, !1, n), e;
            })(n, e);
            o.slice().forEach((n) => {
                n.call(t, r);
            });
        }
    };
}
function O(t, n) {
    j().$$.context.set(t, n);
}
function N(t) {
    return j().$$.context.get(t);
}
const S = [],
    q = [],
    z = [],
    B = [],
    D = Promise.resolve();
let F = !1;
function L(t) {
    z.push(t);
}
let M = !1;
const P = new Set();
function T() {
    if (!M) {
        M = !0;
        do {
            for (let t = 0; t < S.length; t += 1) {
                const n = S[t];
                w(n), G(n.$$);
            }
            for (S.length = 0; q.length; ) q.pop()();
            for (let t = 0; t < z.length; t += 1) {
                const n = z[t];
                P.has(n) || (P.add(n), n());
            }
            z.length = 0;
        } while (S.length);
        for (; B.length; ) B.pop()();
        (F = !1), (M = !1), P.clear();
    }
}
function G(t) {
    if (null !== t.fragment) {
        t.update(), r(t.before_update);
        const n = t.dirty;
        (t.dirty = [-1]),
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach(L);
    }
}
const H = new Set();
let I;
function J() {
    I = { r: 0, c: [], p: I };
}
function K() {
    I.r || r(I.c), (I = I.p);
}
function Q(t, n) {
    t && t.i && (H.delete(t), t.i(n));
}
function R(t, n, e, o) {
    if (t && t.o) {
        if (H.has(t)) return;
        H.add(t),
            I.c.push(() => {
                H.delete(t), o && (e && t.d(1), o());
            }),
            t.o(n);
    }
}
function U(t, n) {
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
function V(t) {
    return 'object' == typeof t && null !== t ? t : {};
}
function W(t) {
    t && t.c();
}
function X(t, n, o) {
    const { fragment: s, on_mount: u, on_destroy: i, after_update: f } = t.$$;
    s && s.m(n, o),
        L(() => {
            const n = u.map(e).filter(c);
            i ? i.push(...n) : r(n), (t.$$.on_mount = []);
        }),
        f.forEach(L);
}
function Y(t, n) {
    const e = t.$$;
    null !== e.fragment &&
        (r(e.on_destroy),
        e.fragment && e.fragment.d(n),
        (e.on_destroy = e.fragment = null),
        (e.ctx = []));
}
function Z(t, n) {
    -1 === t.$$.dirty[0] &&
        (S.push(t), F || ((F = !0), D.then(T)), t.$$.dirty.fill(0)),
        (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function tt(n, e, c, s, u, i, f = [-1]) {
    const a = E;
    w(n);
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
    if (
        ((d.ctx = c
            ? c(n, l, (t, e, ...o) => {
                  const r = o.length ? o[0] : e;
                  return (
                      d.ctx &&
                          u(d.ctx[t], (d.ctx[t] = r)) &&
                          (d.bound[t] && d.bound[t](r), p && Z(n, t)),
                      e
                  );
              })
            : []),
        d.update(),
        (p = !0),
        r(d.before_update),
        (d.fragment = !!s && s(d.ctx)),
        e.target)
    ) {
        if (e.hydrate) {
            const t = (function (t) {
                return Array.from(t.childNodes);
            })(e.target);
            d.fragment && d.fragment.l(t), t.forEach(h);
        } else d.fragment && d.fragment.c();
        e.intro && Q(n.$$.fragment), X(n, e.target, e.anchor), T();
    }
    w(a);
}
class nt {
    $destroy() {
        Y(this, 1), (this.$destroy = t);
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
    V as A,
    Y as B,
    m as C,
    v as D,
    _ as E,
    C as F,
    p as G,
    y as H,
    g as I,
    nt as S,
    u as a,
    tt as b,
    f as c,
    l as d,
    R as e,
    N as f,
    a as g,
    i as h,
    c as i,
    O as j,
    b as k,
    $ as l,
    J as m,
    t as n,
    A as o,
    K as p,
    h as q,
    r,
    s,
    Q as t,
    k as u,
    n as v,
    d as w,
    W as x,
    X as y,
    U as z,
};
//# sourceMappingURL=index-a2201541.js.map
