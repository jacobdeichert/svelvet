import {
    n as t,
    s as e,
    a as n,
    r as o,
    i as r,
    S as s,
    b as a,
    c,
    g as i,
    d as u,
    t as l,
    e as p,
    f,
    h as d,
    o as h,
    j as $,
    k as m,
    l as g,
    m as y,
    p as b,
    q as v,
    u as w,
    v as x,
    w as k,
    x as E,
    y as P,
    z as R,
    A as j,
    B as S,
    C,
    D as B,
    E as K,
    F as L,
} from './common/index-beace778.js';
const O = [];
function A(n, o = t) {
    let r;
    const s = [];
    function a(t) {
        if (e(n, t) && ((n = t), r)) {
            const t = !O.length;
            for (let t = 0; t < s.length; t += 1) {
                const e = s[t];
                e[1](), O.push(e, n);
            }
            if (t) {
                for (let t = 0; t < O.length; t += 2) O[t][0](O[t + 1]);
                O.length = 0;
            }
        }
    }
    return {
        set: a,
        update: function (t) {
            a(t(n));
        },
        subscribe: function (e, c = t) {
            const i = [e, c];
            return (
                s.push(i),
                1 === s.length && (r = o(a) || t),
                e(n),
                () => {
                    const t = s.indexOf(i);
                    -1 !== t && s.splice(t, 1),
                        0 === s.length && (r(), (r = null));
                }
            );
        },
    };
}
function D(e, s, a) {
    const c = !Array.isArray(e),
        i = c ? [e] : e,
        u = s.length < 2;
    return {
        subscribe: A(a, (e) => {
            let a = !1;
            const l = [];
            let p = 0,
                f = t;
            const d = () => {
                    if (p) return;
                    f();
                    const n = s(c ? l[0] : l, e);
                    u ? e(n) : (f = r(n) ? n : t);
                },
                h = i.map((t, e) =>
                    n(
                        t,
                        (t) => {
                            (l[e] = t), (p &= ~(1 << e)), a && d();
                        },
                        () => {
                            p |= 1 << e;
                        }
                    )
                );
            return (
                (a = !0),
                d(),
                function () {
                    o(h), f();
                }
            );
        }).subscribe,
    };
}
const N = {},
    U = {};
function I(t) {
    return {
        ...t.location,
        state: t.history.state,
        key: (t.history.state && t.history.state.key) || 'initial',
    };
}
const _ = (function (t, e) {
        const n = [];
        let o = I(t);
        return {
            get location() {
                return o;
            },
            listen(e) {
                n.push(e);
                const r = () => {
                    (o = I(t)), e({ location: o, action: 'POP' });
                };
                return (
                    t.addEventListener('popstate', r),
                    () => {
                        t.removeEventListener('popstate', r);
                        const o = n.indexOf(e);
                        n.splice(o, 1);
                    }
                );
            },
            navigate(e, { state: r, replace: s = !1 } = {}) {
                r = { ...r, key: Date.now() + '' };
                try {
                    s
                        ? t.history.replaceState(r, null, e)
                        : t.history.pushState(r, null, e);
                } catch (n) {
                    t.location[s ? 'replace' : 'assign'](e);
                }
                (o = I(t)),
                    n.forEach((t) => t({ location: o, action: 'PUSH' }));
            },
        };
    })(
        Boolean(
            'undefined' != typeof window &&
                window.document &&
                window.document.createElement
        )
            ? window
            : (function (t = '/') {
                  let e = 0;
                  const n = [{ pathname: t, search: '' }],
                      o = [];
                  return {
                      get location() {
                          return n[e];
                      },
                      addEventListener(t, e) {},
                      removeEventListener(t, e) {},
                      history: {
                          get entries() {
                              return n;
                          },
                          get index() {
                              return e;
                          },
                          get state() {
                              return o[e];
                          },
                          pushState(t, r, s) {
                              const [a, c = ''] = s.split('?');
                              e++,
                                  n.push({ pathname: a, search: c }),
                                  o.push(t);
                          },
                          replaceState(t, r, s) {
                              const [a, c = ''] = s.split('?');
                              (n[e] = { pathname: a, search: c }), (o[e] = t);
                          },
                      },
                  };
              })()
    ),
    { navigate: q } = _,
    z = /^:(.+)/;
function F(t, e) {
    return t.substr(0, e.length) === e;
}
function H(t) {
    return '*' === t[0];
}
function M(t) {
    return t.replace(/(^\/+|\/+$)/g, '').split('/');
}
function G(t) {
    return t.replace(/(^\/+|\/+$)/g, '');
}
function J(t, e) {
    return {
        route: t,
        score: t.default
            ? 0
            : M(t.path).reduce(
                  (t, e) => (
                      (t += 4),
                      !(function (t) {
                          return '' === t;
                      })(e)
                          ? !(function (t) {
                                return z.test(t);
                            })(e)
                              ? H(e)
                                  ? (t -= 5)
                                  : (t += 3)
                              : (t += 2)
                          : (t += 1),
                      t
                  ),
                  0
              ),
        index: e,
    };
}
function Q(t, e) {
    let n, o;
    const [r] = e.split('?'),
        s = M(r),
        a = '' === s[0],
        c = (function (t) {
            return t
                .map(J)
                .sort((t, e) =>
                    t.score < e.score
                        ? 1
                        : t.score > e.score
                        ? -1
                        : t.index - e.index
                );
        })(t);
    for (let t = 0, r = c.length; t < r; t++) {
        const r = c[t].route;
        let i = !1;
        if (r.default) {
            o = { route: r, params: {}, uri: e };
            continue;
        }
        const u = M(r.path),
            l = {},
            p = Math.max(s.length, u.length);
        let f = 0;
        for (; f < p; f++) {
            const t = u[f],
                e = s[f];
            if (void 0 !== t && H(t)) {
                l['*' === t ? '*' : t.slice(1)] = s
                    .slice(f)
                    .map(decodeURIComponent)
                    .join('/');
                break;
            }
            if (void 0 === e) {
                i = !0;
                break;
            }
            let n = z.exec(t);
            if (n && !a) {
                const t = decodeURIComponent(e);
                l[n[1]] = t;
            } else if (t !== e) {
                i = !0;
                break;
            }
        }
        if (!i) {
            n = { route: r, params: l, uri: '/' + s.slice(0, f).join('/') };
            break;
        }
    }
    return n || o || null;
}
function T(t, e) {
    return t + (e ? `?${e}` : '');
}
function V(t, e) {
    return `${G('/' === e ? t : `${G(t)}/${G(e)}`)}/`;
}
function W(t) {
    let e;
    const n = t[16].default,
        o = c(n, t, t[15], null);
    return {
        c() {
            o && o.c();
        },
        m(t, n) {
            o && o.m(t, n), (e = !0);
        },
        p(t, [e]) {
            o &&
                o.p &&
                32768 & e &&
                o.p(i(n, t, t[15], null), u(n, t[15], e, null));
        },
        i(t) {
            e || (l(o, t), (e = !0));
        },
        o(t) {
            p(o, t), (e = !1);
        },
        d(t) {
            o && o.d(t);
        },
    };
}
function X(t, e, n) {
    let o,
        r,
        s,
        { basepath: a = '/' } = e,
        { url: c = null } = e;
    const i = f(N),
        u = f(U),
        l = A([]);
    d(t, l, (t) => n(8, (s = t)));
    const p = A(null);
    let m = !1;
    const g = i || A(c ? { pathname: c } : _.location);
    d(t, g, (t) => n(7, (r = t)));
    const y = u ? u.routerBase : A({ path: a, uri: a });
    d(t, y, (t) => n(6, (o = t)));
    const b = D([y, p], ([t, e]) => {
        if (null === e) return t;
        const { path: n } = t,
            { route: o, uri: r } = e;
        return { path: o.default ? n : o.path.replace(/\*.*$/, ''), uri: r };
    });
    function v(t) {
        const { path: e } = o;
        let { path: n } = t;
        if (((t._path = n), (t.path = V(e, n)), 'undefined' == typeof window)) {
            if (m) return;
            const e = (function (t, e) {
                return Q([t], e);
            })(t, r.pathname);
            e && (p.set(e), (m = !0));
        } else l.update((e) => (e.push(t), e));
    }
    function w(t) {
        l.update((e) => {
            const n = e.indexOf(t);
            return e.splice(n, 1), e;
        });
    }
    i ||
        (h(() =>
            _.listen((t) => {
                g.set(t.location);
            })
        ),
        $(N, g)),
        $(U, {
            activeRoute: p,
            base: y,
            routerBase: b,
            registerRoute: v,
            unregisterRoute: w,
        });
    let { $$slots: x = {}, $$scope: k } = e;
    return (
        (t.$set = (t) => {
            'basepath' in t && n(3, (a = t.basepath)),
                'url' in t && n(4, (c = t.url)),
                '$$scope' in t && n(15, (k = t.$$scope));
        }),
        (t.$$.update = () => {
            if (64 & t.$$.dirty) {
                const { path: t } = o;
                l.update(
                    (e) => (e.forEach((e) => (e.path = V(t, e._path))), e)
                );
            }
            if (384 & t.$$.dirty) {
                const t = Q(s, r.pathname);
                p.set(t);
            }
        }),
        [l, g, y, a, c, m, o, r, s, i, u, p, b, v, w, k, x]
    );
}
class Y extends s {
    constructor(t) {
        super(), a(this, t, X, W, e, { basepath: 3, url: 4 });
    }
}
const Z = (t) => ({ params: 2 & t, location: 16 & t }),
    tt = (t) => ({ params: t[1], location: t[4] });
function et(t) {
    let e, n, o, r;
    const s = [ot, nt],
        a = [];
    function c(t, e) {
        return null !== t[0] ? 0 : 1;
    }
    return (
        (e = c(t)),
        (n = a[e] = s[e](t)),
        {
            c() {
                n.c(), (o = m());
            },
            m(t, n) {
                a[e].m(t, n), g(t, o, n), (r = !0);
            },
            p(t, r) {
                let i = e;
                (e = c(t)),
                    e === i
                        ? a[e].p(t, r)
                        : (y(),
                          p(a[i], 1, 1, () => {
                              a[i] = null;
                          }),
                          b(),
                          (n = a[e]),
                          n || ((n = a[e] = s[e](t)), n.c()),
                          l(n, 1),
                          n.m(o.parentNode, o));
            },
            i(t) {
                r || (l(n), (r = !0));
            },
            o(t) {
                p(n), (r = !1);
            },
            d(t) {
                a[e].d(t), t && v(o);
            },
        }
    );
}
function nt(t) {
    let e;
    const n = t[13].default,
        o = c(n, t, t[12], tt);
    return {
        c() {
            o && o.c();
        },
        m(t, n) {
            o && o.m(t, n), (e = !0);
        },
        p(t, e) {
            o && o.p && 4114 & e && o.p(i(n, t, t[12], tt), u(n, t[12], e, Z));
        },
        i(t) {
            e || (l(o, t), (e = !0));
        },
        o(t) {
            p(o, t), (e = !1);
        },
        d(t) {
            o && o.d(t);
        },
    };
}
function ot(t) {
    let e, n;
    const o = [{ location: t[4] }, t[1], t[2]];
    var r = t[0];
    function s(t) {
        let e = {};
        for (let t = 0; t < o.length; t += 1) e = x(e, o[t]);
        return { props: e };
    }
    if (r) var a = new r(s());
    return {
        c() {
            a && E(a.$$.fragment), (e = m());
        },
        m(t, o) {
            a && P(a, t, o), g(t, e, o), (n = !0);
        },
        p(t, n) {
            const c =
                22 & n
                    ? R(o, [
                          16 & n && { location: t[4] },
                          2 & n && j(t[1]),
                          4 & n && j(t[2]),
                      ])
                    : {};
            if (r !== (r = t[0])) {
                if (a) {
                    y();
                    const t = a;
                    p(t.$$.fragment, 1, 0, () => {
                        S(t, 1);
                    }),
                        b();
                }
                r
                    ? ((a = new r(s())),
                      E(a.$$.fragment),
                      l(a.$$.fragment, 1),
                      P(a, e.parentNode, e))
                    : (a = null);
            } else r && a.$set(c);
        },
        i(t) {
            n || (a && l(a.$$.fragment, t), (n = !0));
        },
        o(t) {
            a && p(a.$$.fragment, t), (n = !1);
        },
        d(t) {
            t && v(e), a && S(a, t);
        },
    };
}
function rt(t) {
    let e,
        n,
        o = null !== t[3] && t[3].route === t[7] && et(t);
    return {
        c() {
            o && o.c(), (e = m());
        },
        m(t, r) {
            o && o.m(t, r), g(t, e, r), (n = !0);
        },
        p(t, [n]) {
            null !== t[3] && t[3].route === t[7]
                ? o
                    ? (o.p(t, n), l(o, 1))
                    : ((o = et(t)), o.c(), l(o, 1), o.m(e.parentNode, e))
                : o &&
                  (y(),
                  p(o, 1, 1, () => {
                      o = null;
                  }),
                  b());
        },
        i(t) {
            n || (l(o), (n = !0));
        },
        o(t) {
            p(o), (n = !1);
        },
        d(t) {
            o && o.d(t), t && v(e);
        },
    };
}
function st(t, e, n) {
    let o,
        r,
        { path: s = '' } = e,
        { component: a = null } = e;
    const { registerRoute: c, unregisterRoute: i, activeRoute: u } = f(U);
    d(t, u, (t) => n(3, (o = t)));
    const l = f(N);
    d(t, l, (t) => n(4, (r = t)));
    const p = { path: s, default: '' === s };
    let h = {},
        $ = {};
    c(p),
        'undefined' != typeof window &&
            w(() => {
                i(p);
            });
    let { $$slots: m = {}, $$scope: g } = e;
    return (
        (t.$set = (t) => {
            n(11, (e = x(x({}, e), k(t)))),
                'path' in t && n(8, (s = t.path)),
                'component' in t && n(0, (a = t.component)),
                '$$scope' in t && n(12, (g = t.$$scope));
        }),
        (t.$$.update = () => {
            8 & t.$$.dirty && o && o.route === p && n(1, (h = o.params));
            {
                const { path: t, component: o, ...r } = e;
                n(2, ($ = r));
            }
        }),
        (e = k(e)),
        [a, h, $, o, r, u, l, p, s, c, i, e, g, m]
    );
}
class at extends s {
    constructor(t) {
        super(), a(this, t, st, rt, e, { path: 8, component: 0 });
    }
}
function ct(t) {
    let e, n, o;
    const r = t[16].default,
        s = c(r, t, t[15], null);
    let a = [{ href: t[0] }, { 'aria-current': t[2] }, t[1]],
        f = {};
    for (let t = 0; t < a.length; t += 1) f = x(f, a[t]);
    return {
        c() {
            (e = C('a')), s && s.c(), B(e, f);
        },
        m(r, a) {
            g(r, e, a), s && s.m(e, null), (n = !0), (o = K(e, 'click', t[5]));
        },
        p(t, [n]) {
            s &&
                s.p &&
                32768 & n &&
                s.p(i(r, t, t[15], null), u(r, t[15], n, null)),
                B(
                    e,
                    R(a, [
                        1 & n && { href: t[0] },
                        4 & n && { 'aria-current': t[2] },
                        2 & n && t[1],
                    ])
                );
        },
        i(t) {
            n || (l(s, t), (n = !0));
        },
        o(t) {
            p(s, t), (n = !1);
        },
        d(t) {
            t && v(e), s && s.d(t), o();
        },
    };
}
function it(t, e, n) {
    let o,
        r,
        { to: s = '#' } = e,
        { replace: a = !1 } = e,
        { state: c = {} } = e,
        { getProps: i = () => ({}) } = e;
    const { base: u } = f(U);
    d(t, u, (t) => n(12, (o = t)));
    const l = f(N);
    d(t, l, (t) => n(13, (r = t)));
    const p = L();
    let h, $, m, g;
    let y,
        { $$slots: b = {}, $$scope: v } = e;
    return (
        (t.$set = (t) => {
            'to' in t && n(6, (s = t.to)),
                'replace' in t && n(7, (a = t.replace)),
                'state' in t && n(8, (c = t.state)),
                'getProps' in t && n(9, (i = t.getProps)),
                '$$scope' in t && n(15, (v = t.$$scope));
        }),
        (t.$$.update = () => {
            4160 & t.$$.dirty &&
                n(
                    0,
                    (h =
                        '/' === s
                            ? o.uri
                            : (function (t, e) {
                                  if (F(t, '/')) return t;
                                  const [n, o] = t.split('?'),
                                      [r] = e.split('?'),
                                      s = M(n),
                                      a = M(r);
                                  if ('' === s[0]) return T(r, o);
                                  if (!F(s[0], '.')) {
                                      return T(
                                          ('/' === r ? '' : '/') +
                                              a.concat(s).join('/'),
                                          o
                                      );
                                  }
                                  const c = a.concat(s),
                                      i = [];
                                  return (
                                      c.forEach((t) => {
                                          '..' === t
                                              ? i.pop()
                                              : '.' !== t && i.push(t);
                                      }),
                                      T('/' + i.join('/'), o)
                                  );
                              })(s, o.uri))
                ),
                8193 & t.$$.dirty && n(10, ($ = F(r.pathname, h))),
                8193 & t.$$.dirty && n(11, (m = h === r.pathname)),
                2048 & t.$$.dirty && n(2, (y = m ? 'page' : void 0)),
                11777 & t.$$.dirty &&
                    n(
                        1,
                        (g = i({
                            location: r,
                            href: h,
                            isPartiallyCurrent: $,
                            isCurrent: m,
                        }))
                    );
        }),
        [
            h,
            g,
            y,
            u,
            l,
            function (t) {
                if (
                    (p('click', t),
                    (function (t) {
                        return (
                            !t.defaultPrevented &&
                            0 === t.button &&
                            !(t.metaKey || t.altKey || t.ctrlKey || t.shiftKey)
                        );
                    })(t))
                ) {
                    t.preventDefault();
                    const e = r.pathname === h || a;
                    q(h, { state: c, replace: e });
                }
            },
            s,
            a,
            c,
            i,
            $,
            m,
            o,
            r,
            p,
            v,
            b,
        ]
    );
}
class ut extends s {
    constructor(t) {
        super(),
            a(this, t, it, ct, e, { to: 6, replace: 7, state: 8, getProps: 9 });
    }
}
export { ut as Link, at as Route, Y as Router };
//# sourceMappingURL=svelte-routing.js.map
