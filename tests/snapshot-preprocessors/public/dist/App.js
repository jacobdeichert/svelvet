function t() {}
function n(t) {
    return t();
}
function e() {
    return Object.create(null);
}
function o(t) {
    t.forEach(n);
}
function r(t) {
    return 'function' == typeof t;
}
function c(t, n) {
    return t != t
        ? n == n
        : t !== n || (t && 'object' == typeof t) || 'function' == typeof t;
}
function u(t, n) {
    t.appendChild(n);
}
function a(t, n, e) {
    t.insertBefore(n, e || null);
}
function s(t) {
    t.parentNode.removeChild(t);
}
function i(t) {
    return document.createElement(t);
}
function f(t) {
    return document.createTextNode(t);
}
function l() {
    return f(' ');
}
function d(t, n, e) {
    null == e
        ? t.removeAttribute(n)
        : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
let m;
function $(t) {
    m = t;
}
function p(t) {
    (function () {
        if (!m)
            throw new Error('Function called outside component initialization');
        return m;
    })().$$.on_mount.push(t);
}
const h = [],
    g = [],
    b = [],
    x = [],
    y = Promise.resolve();
let v = !1;
function w(t) {
    b.push(t);
}
let _ = !1;
const C = new Set();
function E() {
    if (!_) {
        _ = !0;
        do {
            for (let t = 0; t < h.length; t += 1) {
                const n = h[t];
                $(n), k(n.$$);
            }
            for (h.length = 0; g.length; ) g.pop()();
            for (let t = 0; t < b.length; t += 1) {
                const n = b[t];
                C.has(n) || (C.add(n), n());
            }
            b.length = 0;
        } while (h.length);
        for (; x.length; ) x.pop()();
        (v = !1), (_ = !1), C.clear();
    }
}
function k(t) {
    if (null !== t.fragment) {
        t.update(), o(t.before_update);
        const n = t.dirty;
        (t.dirty = [-1]),
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach(w);
    }
}
const A = new Set();
function I(t, n) {
    t && t.i && (A.delete(t), t.i(n));
}
function N(t, n, e, o) {
    if (t && t.o) {
        if (A.has(t)) return;
        A.add(t),
            (void 0).c.push(() => {
                A.delete(t), o && (e && t.d(1), o());
            }),
            t.o(n);
    }
}
function S(t) {
    t && t.c();
}
function T(t, e, c) {
    const { fragment: u, on_mount: a, on_destroy: s, after_update: i } = t.$$;
    u && u.m(e, c),
        w(() => {
            const e = a.map(n).filter(r);
            s ? s.push(...e) : o(e), (t.$$.on_mount = []);
        }),
        i.forEach(w);
}
function j(t, n) {
    const e = t.$$;
    null !== e.fragment &&
        (o(e.on_destroy),
        e.fragment && e.fragment.d(n),
        (e.on_destroy = e.fragment = null),
        (e.ctx = []));
}
function z(t, n) {
    -1 === t.$$.dirty[0] &&
        (h.push(t), v || ((v = !0), y.then(E)), t.$$.dirty.fill(0)),
        (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function B(n, r, c, u, a, i, f = [-1]) {
    const l = m;
    $(n);
    const d = r.props || {},
        p = (n.$$ = {
            fragment: null,
            ctx: null,
            props: i,
            update: t,
            not_equal: a,
            bound: e(),
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(l ? l.$$.context : []),
            callbacks: e(),
            dirty: f,
        });
    let h = !1;
    if (
        ((p.ctx = c
            ? c(n, d, (t, e, ...o) => {
                  const r = o.length ? o[0] : e;
                  return (
                      p.ctx &&
                          a(p.ctx[t], (p.ctx[t] = r)) &&
                          (p.bound[t] && p.bound[t](r), h && z(n, t)),
                      e
                  );
              })
            : []),
        p.update(),
        (h = !0),
        o(p.before_update),
        (p.fragment = !!u && u(p.ctx)),
        r.target)
    ) {
        if (r.hydrate) {
            const t = (function (t) {
                return Array.from(t.childNodes);
            })(r.target);
            p.fragment && p.fragment.l(t), t.forEach(s);
        } else p.fragment && p.fragment.c();
        r.intro && I(n.$$.fragment), T(n, r.target, r.anchor), E();
    }
    $(l);
}
class H {
    $destroy() {
        j(this, 1), (this.$destroy = t);
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
function L(n) {
    let e, o;
    return {
        c() {
            (e = i('div')),
                (o = i('h1')),
                (o.textContent = '' + M),
                d(o, 'class', 'svelte-nwbabr'),
                d(e, 'class', 'header svelte-nwbabr');
        },
        m(t, n) {
            a(t, e, n), u(e, o);
        },
        p: t,
        i: t,
        o: t,
        d(t) {
            t && s(e);
        },
    };
}
const M = 'svelvetttttttt';
class O extends H {
    constructor(t) {
        var n;
        super(),
            document.getElementById('svelte-nwbabr-style') ||
                (((n = i('style')).id = 'svelte-nwbabr-style'),
                (n.textContent =
                    'h1.svelte-nwbabr{color:#000;font-size:70px}.header.svelte-nwbabr{max-width:800px}'),
                u(document.head, n)),
            B(this, t, null, L, c, {});
    }
}
function P(n) {
    let e;
    return {
        c() {
            (e = i('nav')), (e.innerHTML = '<a href="/">Home</a>');
        },
        m(t, n) {
            a(t, e, n);
        },
        p: t,
        i: t,
        o: t,
        d(t) {
            t && s(e);
        },
    };
}
class q extends H {
    constructor(t) {
        super(), B(this, t, null, P, c, {});
    }
}
function D(n) {
    let e, o, r, c;
    const f = new q({});
    return {
        c() {
            (e = i('footer')),
                (o = i('p')),
                (o.textContent = '' + F),
                (r = l()),
                S(f.$$.fragment);
        },
        m(t, n) {
            a(t, e, n), u(e, o), u(e, r), T(f, e, null), (c = !0);
        },
        p: t,
        i(t) {
            c || (I(f.$$.fragment, t), (c = !0));
        },
        o(t) {
            N(f.$$.fragment, t), (c = !1);
        },
        d(t) {
            t && s(e), j(f);
        },
    };
}
const F = 'this is svelte and snowpack';
class G extends H {
    constructor(t) {
        super(), B(this, t, null, D, c, {});
    }
}
function J() {
    return new Date().toLocaleTimeString();
}
function K(t) {
    let n, e, o, r, c, m, $, p, h;
    const g = new O({}),
        b = new G({});
    return {
        c() {
            (n = i('div')),
                (n.textContent = 'Posts'),
                (e = i('a')),
                (e.textContent = '' + Q),
                (o = l()),
                S(g.$$.fragment),
                (r = l()),
                (c = i('div')),
                (m = f('Current time is ')),
                ($ = f(t[0])),
                (p = l()),
                S(b.$$.fragment),
                d(e, 'href', '/#');
        },
        m(t, s) {
            a(t, n, s),
                a(t, e, s),
                a(t, o, s),
                T(g, t, s),
                a(t, r, s),
                a(t, c, s),
                u(c, m),
                u(c, $),
                a(t, p, s),
                T(b, t, s),
                (h = !0);
        },
        p(t, [n]) {
            (!h || 1 & n) &&
                (function (t, n) {
                    (n = '' + n), t.data !== n && (t.data = n);
                })($, t[0]);
        },
        i(t) {
            h || (I(g.$$.fragment, t), I(b.$$.fragment, t), (h = !0));
        },
        o(t) {
            N(g.$$.fragment, t), N(b.$$.fragment, t), (h = !1);
        },
        d(t) {
            t && s(n),
                t && s(e),
                t && s(o),
                j(g, t),
                t && s(r),
                t && s(c),
                t && s(p),
                j(b, t);
        },
    };
}
const Q = 'click here';
function R(t, n, e) {
    let o;
    return (
        p(() => {
            const t = setInterval(() => {
                e(0, (o = J()));
            }, 1e3);
            return () => clearInterval(t);
        }),
        e(0, (o = J())),
        [o]
    );
}
export default class extends H {
    constructor(t) {
        super(), B(this, t, R, K, c, {});
    }
}
