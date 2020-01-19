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
    (function() {
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
function v() {
    const t = new Set();
    do {
        for (; g.length; ) {
            const t = g.shift();
            $(t), A(t.$$);
        }
        for (; y.length; ) y.pop()();
        for (let n = 0; n < _.length; n += 1) {
            const e = _[n];
            t.has(e) || (e(), t.add(e));
        }
        _.length = 0;
    } while (g.length);
    for (; b.length; ) b.pop()();
    w = !1;
}
function A(t) {
    if (null !== t.fragment) {
        t.update(), o(t.before_update);
        const n = t.dirty;
        (t.dirty = [-1]),
            t.fragment && t.fragment.p(t.ctx, n),
            t.after_update.forEach(E);
    }
}
const k = new Set();
function N(t, n) {
    t && t.i && (k.delete(t), t.i(n));
}
function j(t, n, e, o) {
    if (t && t.o) {
        if (k.has(t)) return;
        k.add(t),
            (void 0).c.push(() => {
                k.delete(t), o && (e && t.d(1), o());
            }),
            t.o(n);
    }
}
function C(t) {
    t && t.c();
}
function O(t, e, c) {
    const { fragment: u, on_mount: f, on_destroy: i, after_update: a } = t.$$;
    u && u.m(e, c),
        E(() => {
            const e = f.map(n).filter(r);
            i ? i.push(...e) : o(e), (t.$$.on_mount = []);
        }),
        a.forEach(E);
}
function S(t, n) {
    const e = t.$$;
    null !== e.fragment &&
        (o(e.on_destroy),
        e.fragment && e.fragment.d(n),
        (e.on_destroy = e.fragment = null),
        (e.ctx = []));
}
function q(t, n) {
    -1 === t.$$.dirty[0] &&
        (g.push(t), w || ((w = !0), x.then(v)), t.$$.dirty.fill(0)),
        (t.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
}
function z(n, r, c, u, f, i, a = [-1]) {
    const l = h;
    $(n);
    const d = r.props || {},
        s = (n.$$ = {
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
    let p = !1;
    (s.ctx = c
        ? c(n, d, (t, e, ...o) => {
              const r = o.length ? o[0] : e;
              return (
                  s.ctx &&
                      f(s.ctx[t], (s.ctx[t] = r)) &&
                      (s.bound[t] && s.bound[t](r), p && q(n, t)),
                  e
              );
          })
        : []),
        s.update(),
        (p = !0),
        o(s.before_update),
        (s.fragment = !!u && u(s.ctx)),
        r.target &&
            (r.hydrate
                ? s.fragment &&
                  s.fragment.l(
                      (function(t) {
                          return Array.from(t.childNodes);
                      })(r.target)
                  )
                : s.fragment && s.fragment.c(),
            r.intro && N(n.$$.fragment),
            O(n, r.target, r.anchor),
            v()),
        $(l);
}
class B {
    $destroy() {
        S(this, 1), (this.$destroy = t);
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
    B as SvelteComponent,
    u as append,
    s as attr,
    C as create_component,
    S as destroy_component,
    i as detach,
    a as element,
    z as init,
    f as insert,
    O as mount_component,
    t as noop,
    m as onMount,
    c as safe_not_equal,
    p as set_data,
    d as space,
    l as text,
    N as transition_in,
    j as transition_out,
};
//# sourceMappingURL=internal.js.map
