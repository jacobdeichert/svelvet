import {
    SvelteComponent as t,
    append as e,
    create_component as $,
    destroy_component as n,
    detach as o,
    element as r,
    init as s,
    insert as c,
    mount_component as m,
    safe_not_equal as f,
    space as u,
    text as a,
    transition_in as l,
    transition_out as p,
} from '/web_modules/svelte/internal.js';
import {
    Router as i,
    Link as g,
    Route as d,
} from '/web_modules/svelte-routing.js';
import x from './routes/Home.js';
import w from './routes/About.js';
function b(t) {
    let e;
    return {
        c() {
            e = a('Home');
        },
        m(t, $) {
            c(t, e, $);
        },
        d(t) {
            t && o(e);
        },
    };
}
function y(t) {
    let e;
    return {
        c() {
            e = a('About');
        },
        m(t, $) {
            c(t, e, $);
        },
        d(t) {
            t && o(e);
        },
    };
}
function j(t) {
    let e;
    const o = new w({});
    return {
        c() {
            $(o.$$.fragment);
        },
        m(t, $) {
            m(o, t, $), (e = !0);
        },
        i(t) {
            e || (l(o.$$.fragment, t), (e = !0));
        },
        o(t) {
            p(o.$$.fragment, t), (e = !1);
        },
        d(t) {
            n(o, t);
        },
    };
}
function v(t) {
    let e;
    const o = new x({});
    return {
        c() {
            $(o.$$.fragment);
        },
        m(t, $) {
            m(o, t, $), (e = !0);
        },
        i(t) {
            e || (l(o.$$.fragment, t), (e = !0));
        },
        o(t) {
            p(o.$$.fragment, t), (e = !1);
        },
        d(t) {
            n(o, t);
        },
    };
}
function h(t) {
    let s, f, a, i, x, w;
    const h = new g({
            props: { to: '/', $$slots: { default: [b] }, $$scope: { ctx: t } },
        }),
        A = new g({
            props: {
                to: '/about',
                $$slots: { default: [y] },
                $$scope: { ctx: t },
            },
        }),
        H = new d({
            props: {
                path: '/about',
                $$slots: { default: [j] },
                $$scope: { ctx: t },
            },
        }),
        _ = new d({
            props: {
                path: '/',
                $$slots: { default: [v] },
                $$scope: { ctx: t },
            },
        });
    return {
        c() {
            (s = r('nav')),
                $(h.$$.fragment),
                (f = u()),
                $(A.$$.fragment),
                (a = u()),
                (i = r('div')),
                $(H.$$.fragment),
                (x = u()),
                $(_.$$.fragment);
        },
        m(t, $) {
            c(t, s, $),
                m(h, s, null),
                e(s, f),
                m(A, s, null),
                c(t, a, $),
                c(t, i, $),
                m(H, i, null),
                e(i, x),
                m(_, i, null),
                (w = !0);
        },
        p(t, e) {
            const $ = {};
            1 & e && ($.$$scope = { dirty: e, ctx: t }), h.$set($);
            const n = {};
            1 & e && (n.$$scope = { dirty: e, ctx: t }), A.$set(n);
            const o = {};
            1 & e && (o.$$scope = { dirty: e, ctx: t }), H.$set(o);
            const r = {};
            1 & e && (r.$$scope = { dirty: e, ctx: t }), _.$set(r);
        },
        i(t) {
            w ||
                (l(h.$$.fragment, t),
                l(A.$$.fragment, t),
                l(H.$$.fragment, t),
                l(_.$$.fragment, t),
                (w = !0));
        },
        o(t) {
            p(h.$$.fragment, t),
                p(A.$$.fragment, t),
                p(H.$$.fragment, t),
                p(_.$$.fragment, t),
                (w = !1);
        },
        d(t) {
            t && o(s), n(h), n(A), t && o(a), t && o(i), n(H), n(_);
        },
    };
}
function A(t) {
    let e;
    const o = new i({
        props: { url: '', $$slots: { default: [h] }, $$scope: { ctx: t } },
    });
    return {
        c() {
            $(o.$$.fragment);
        },
        m(t, $) {
            m(o, t, $), (e = !0);
        },
        p(t, [e]) {
            const $ = {};
            1 & e && ($.$$scope = { dirty: e, ctx: t }), o.$set($);
        },
        i(t) {
            e || (l(o.$$.fragment, t), (e = !0));
        },
        o(t) {
            p(o.$$.fragment, t), (e = !1);
        },
        d(t) {
            n(o, t);
        },
    };
}
export default class extends t {
    constructor(t) {
        super(), s(this, t, null, A, f, {});
    }
}
