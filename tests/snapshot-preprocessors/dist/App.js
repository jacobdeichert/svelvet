import {
    SvelteComponent as t,
    append as e,
    attr as r,
    create_component as n,
    destroy_component as o,
    detach as s,
    element as m,
    init as i,
    insert as a,
    mount_component as f,
    safe_not_equal as l,
    set_data as c,
    space as $,
    text as u,
    transition_in as p,
    transition_out as d,
} from '/web_modules/svelte/internal.js';
import { onMount as g } from '/web_modules/svelte/internal.js';
import v from './components/Header.js';
import j from './components/Footer/index.js';
import { getCurrentTime as x } from './utils/time.js';
function w(t) {
    let i, l, g, x, w, C, b, I, _;
    const k = new v({}),
        F = new j({});
    return {
        c() {
            (i = m('div')),
                (i.textContent = 'Posts'),
                (l = m('a')),
                (l.textContent = `${h}`),
                (g = $()),
                n(k.$$.fragment),
                (x = $()),
                (w = m('div')),
                (C = u('Current time is ')),
                (b = u(t[0])),
                (I = $()),
                n(F.$$.fragment),
                r(l, 'href', '/#');
        },
        m(t, r) {
            a(t, i, r),
                a(t, l, r),
                a(t, g, r),
                f(k, t, r),
                a(t, x, r),
                a(t, w, r),
                e(w, C),
                e(w, b),
                a(t, I, r),
                f(F, t, r),
                (_ = !0);
        },
        p(t, [e]) {
            (!_ || 1 & e) && c(b, t[0]);
        },
        i(t) {
            _ || (p(k.$$.fragment, t), p(F.$$.fragment, t), (_ = !0));
        },
        o(t) {
            d(k.$$.fragment, t), d(F.$$.fragment, t), (_ = !1);
        },
        d(t) {
            t && s(i),
                t && s(l),
                t && s(g),
                o(k, t),
                t && s(x),
                t && s(w),
                t && s(I),
                o(F, t);
        },
    };
}
const h = 'click here';
function C(t, e, r) {
    let n;
    return (
        g(() => {
            const t = setInterval(() => {
                r(0, (n = x()));
            }, 1e3);
            return () => clearInterval(t);
        }),
        r(0, (n = x())),
        [n]
    );
}
export default class extends t {
    constructor(t) {
        super(), i(this, t, C, w, l, {});
    }
}
