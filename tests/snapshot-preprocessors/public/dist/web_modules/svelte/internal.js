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
function f(t, n, e) {
    t.insertBefore(n, e || null);
}
function i(t) {
    t.parentNode.removeChild(t);
}
function a(t) {
    return document.createElement(t);
}
function l(t) {
    return document.createTextNode(t);
}
function d() {
    return l(' ');
}
function s(t, n, e) {
    null == e
        ? t.removeAttribute(n)
        : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
function p(t, n) {
    (n = '' + n), t.data !== n && (t.data = n);
}
let h;
function $(t) {
    h = t;
}
function m(t) {
    (function () {
        if (!h)
            throw new Error('Function called outside component initialization');
        return h;
    })().$$.on_mount.push(t);
}
const g = [],
    y = [],
    _ = [],
    b = [],
    x = Promise.resolve();
let w = !1;
function E(t) {
    _.push(t);
}
let v = !1;
const A = new Set();
function k() {
    if (!v) {
        v = !0;
        do {
            for (let t = 0; t < g.length; t += 1) {
                const n = g[t];
                $(n), N(n.$$);
            }
            for (g.length = 0; y.length; ) y.pop()();
            for (let t = 0; t < _.length; t += 1) {
                const n = _[t];
                A.has(n) || (A.add(n), n());
            }
            _.length = 0;
        } while (g.length);
        for (; b.length; ) b.pop()();
        (w = !1), (v = !1), A.clear();
    }
}
function N(t) {
    if (null !== t.fragment) {
        t.update(), o(t.before_update);
        const n = t.dirty;
        (t.dirty = [-1]),
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach(E);
    }
}
const j = new Set();
function C(t, n) {
    t && t.i && (j.delete(t), t.i(n));
}
function O(t, n, e, o) {
    if (t && t.o) {
        if (j.has(t)) return;
        j.add(t),
            (void 0).c.push(() => {
                j.delete(t), o && (e && t.d(1), o());
            }),
            t.o(n);
    }
}
function S(t) {
    t && t.c();
}
function q(t, e, c) {
    const { fragment: u, on_mount: f, on_destroy: i, after_update: a } = t.$$;
    u && u.m(e, c),
        E(() => {
            const e = f.map(n).filter(r);
            i ? i.push(...e) : o(e), (t.$$.on_mount = []);
        }),
        a.forEach(E);
}
function z(t, n) {
    const e = t.$$;
    null !== e.fragment &&
        (o(e.on_destroy),
        e.fragment && e.fragment.d(n),
        (e.on_destroy = e.fragment = null),
        (e.ctx = []));
}
function B(t, n) {
    -1 === t.$$.dirty[0] &&
        (g.push(t), w || ((w = !0), x.then(k)), t.$$.dirty.fill(0)),
        (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function F(n, r, c, u, f, a, l = [-1]) {
    const d = h;
    $(n);
    const s = r.props || {},
        p = (n.$$ = {
            fragment: null,
            ctx: null,
            props: a,
            update: t,
            not_equal: f,
            bound: e(),
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(d ? d.$$.context : []),
            callbacks: e(),
            dirty: l,
        });
    let m = !1;
    if (
        ((p.ctx = c
            ? c(n, s, (t, e, ...o) => {
                  const r = o.length ? o[0] : e;
                  return (
                      p.ctx &&
                          f(p.ctx[t], (p.ctx[t] = r)) &&
                          (p.bound[t] && p.bound[t](r), m && B(n, t)),
                      e
                  );
              })
            : []),
        p.update(),
        (m = !0),
        o(p.before_update),
        (p.fragment = !!u && u(p.ctx)),
        r.target)
    ) {
        if (r.hydrate) {
            const t = (function (t) {
                return Array.from(t.childNodes);
            })(r.target);
            p.fragment && p.fragment.l(t), t.forEach(i);
        } else p.fragment && p.fragment.c();
        r.intro && C(n.$$.fragment), q(n, r.target, r.anchor), k();
    }
    $(d);
}
class M {
    $destroy() {
        z(this, 1), (this.$destroy = t);
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
    M as SvelteComponent,
    u as append,
    s as attr,
    S as create_component,
    z as destroy_component,
    i as detach,
    a as element,
    F as init,
    f as insert,
    q as mount_component,
    t as noop,
    m as onMount,
    c as safe_not_equal,
    p as set_data,
    d as space,
    l as text,
    C as transition_in,
    O as transition_out,
};
//# sourceMappingURL=internal.js.map
