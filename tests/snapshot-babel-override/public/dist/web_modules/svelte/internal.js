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
function l(t, n, e) {
    null == e
        ? t.removeAttribute(n)
        : t.getAttribute(n) !== e && t.setAttribute(n, e);
}
let s;
function d(t) {
    s = t;
}
function p(t) {
    (function () {
        if (!s)
            throw new Error('Function called outside component initialization');
        return s;
    })().$$.on_mount.push(t);
}
const h = [],
    $ = [],
    m = [],
    g = [],
    y = Promise.resolve();
let _ = !1;
function b(t) {
    m.push(t);
}
let x = !1;
const w = new Set();
function E() {
    if (!x) {
        x = !0;
        do {
            for (let t = 0; t < h.length; t += 1) {
                const n = h[t];
                d(n), v(n.$$);
            }
            for (h.length = 0; $.length; ) $.pop()();
            for (let t = 0; t < m.length; t += 1) {
                const n = m[t];
                w.has(n) || (w.add(n), n());
            }
            m.length = 0;
        } while (h.length);
        for (; g.length; ) g.pop()();
        (_ = !1), (x = !1), w.clear();
    }
}
function v(t) {
    if (null !== t.fragment) {
        t.update(), o(t.before_update);
        const n = t.dirty;
        (t.dirty = [-1]),
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach(b);
    }
}
const A = new Set();
function k(t, n) {
    t && t.i && (A.delete(t), t.i(n));
}
function j(t, n, e, o) {
    if (t && t.o) {
        if (A.has(t)) return;
        A.add(t),
            (void 0).c.push(() => {
                A.delete(t), o && (e && t.d(1), o());
            }),
            t.o(n);
    }
}
function C(t) {
    t && t.c();
}
function N(t, e, c) {
    const { fragment: u, on_mount: f, on_destroy: i, after_update: a } = t.$$;
    u && u.m(e, c),
        b(() => {
            const e = f.map(n).filter(r);
            i ? i.push(...e) : o(e), (t.$$.on_mount = []);
        }),
        a.forEach(b);
}
function O(t, n) {
    const e = t.$$;
    null !== e.fragment &&
        (o(e.on_destroy),
        e.fragment && e.fragment.d(n),
        (e.on_destroy = e.fragment = null),
        (e.ctx = []));
}
function S(t, n) {
    -1 === t.$$.dirty[0] &&
        (h.push(t), _ || ((_ = !0), y.then(E)), t.$$.dirty.fill(0)),
        (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function q(n, r, c, u, f, a, l = [-1]) {
    const p = s;
    d(n);
    const h = r.props || {},
        $ = (n.$$ = {
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
            context: new Map(p ? p.$$.context : []),
            callbacks: e(),
            dirty: l,
        });
    let m = !1;
    if (
        (($.ctx = c
            ? c(n, h, (t, e, ...o) => {
                  const r = o.length ? o[0] : e;
                  return (
                      $.ctx &&
                          f($.ctx[t], ($.ctx[t] = r)) &&
                          ($.bound[t] && $.bound[t](r), m && S(n, t)),
                      e
                  );
              })
            : []),
        $.update(),
        (m = !0),
        o($.before_update),
        ($.fragment = !!u && u($.ctx)),
        r.target)
    ) {
        if (r.hydrate) {
            const t = (function (t) {
                return Array.from(t.childNodes);
            })(r.target);
            $.fragment && $.fragment.l(t), t.forEach(i);
        } else $.fragment && $.fragment.c();
        r.intro && k(n.$$.fragment), N(n, r.target, r.anchor), E();
    }
    d(p);
}
class z {
    $destroy() {
        O(this, 1), (this.$destroy = t);
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
    z as SvelteComponent,
    u as append,
    l as attr,
    C as create_component,
    O as destroy_component,
    i as detach,
    a as element,
    q as init,
    f as insert,
    N as mount_component,
    t as noop,
    p as onMount,
    c as safe_not_equal,
    k as transition_in,
    j as transition_out,
};
//# sourceMappingURL=internal.js.map
