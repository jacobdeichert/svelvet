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
    (function() {
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
const x = new Set();
function w() {
    do {
        for (; h.length; ) {
            const t = h.shift();
            d(t), E(t.$$);
        }
        for (; $.length; ) $.pop()();
        for (let t = 0; t < m.length; t += 1) {
            const n = m[t];
            x.has(n) || (x.add(n), n());
        }
        m.length = 0;
    } while (h.length);
    for (; g.length; ) g.pop()();
    (_ = !1), x.clear();
}
function E(t) {
    if (null !== t.fragment) {
        t.update(), o(t.before_update);
        const n = t.dirty;
        (t.dirty = [-1]),
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach(b);
    }
}
const v = new Set();
function A(t, n) {
    t && t.i && (v.delete(t), t.i(n));
}
function k(t, n, e, o) {
    if (t && t.o) {
        if (v.has(t)) return;
        v.add(t),
            (void 0).c.push(() => {
                v.delete(t), o && (e && t.d(1), o());
            }),
            t.o(n);
    }
}
function j(t) {
    t && t.c();
}
function C(t, e, c) {
    const { fragment: u, on_mount: f, on_destroy: i, after_update: a } = t.$$;
    u && u.m(e, c),
        b(() => {
            const e = f.map(n).filter(r);
            i ? i.push(...e) : o(e), (t.$$.on_mount = []);
        }),
        a.forEach(b);
}
function N(t, n) {
    const e = t.$$;
    null !== e.fragment &&
        (o(e.on_destroy),
        e.fragment && e.fragment.d(n),
        (e.on_destroy = e.fragment = null),
        (e.ctx = []));
}
function O(t, n) {
    -1 === t.$$.dirty[0] &&
        (h.push(t), _ || ((_ = !0), y.then(w)), t.$$.dirty.fill(0)),
        (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function S(n, r, c, u, f, i, a = [-1]) {
    const l = s;
    d(n);
    const p = r.props || {},
        h = (n.$$ = {
            fragment: null,
            ctx: null,
            props: i,
            update: t,
            not_equal: f,
            bound: e(),
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(l ? l.$$.context : []),
            callbacks: e(),
            dirty: a,
        });
    let $ = !1;
    (h.ctx = c
        ? c(n, p, (t, e, ...o) => {
              const r = o.length ? o[0] : e;
              return (
                  h.ctx &&
                      f(h.ctx[t], (h.ctx[t] = r)) &&
                      (h.bound[t] && h.bound[t](r), $ && O(n, t)),
                  e
              );
          })
        : []),
        h.update(),
        ($ = !0),
        o(h.before_update),
        (h.fragment = !!u && u(h.ctx)),
        r.target &&
            (r.hydrate
                ? h.fragment &&
                  h.fragment.l(
                      (function(t) {
                          return Array.from(t.childNodes);
                      })(r.target)
                  )
                : h.fragment && h.fragment.c(),
            r.intro && A(n.$$.fragment),
            C(n, r.target, r.anchor),
            w()),
        d(l);
}
class q {
    $destroy() {
        N(this, 1), (this.$destroy = t);
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
    q as SvelteComponent,
    u as append,
    l as attr,
    j as create_component,
    N as destroy_component,
    i as detach,
    a as element,
    S as init,
    f as insert,
    C as mount_component,
    t as noop,
    p as onMount,
    c as safe_not_equal,
    A as transition_in,
    k as transition_out,
};
//# sourceMappingURL=internal.js.map
