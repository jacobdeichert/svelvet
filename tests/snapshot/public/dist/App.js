import {
    SvelteComponent as t,
    append as e,
    create_component as r,
    destroy_component as n,
    detach as o,
    element as s,
    init as m,
    insert as i,
    mount_component as a,
    safe_not_equal as f,
    set_data as l,
    space as u,
    text as $,
    transition_in as c,
    transition_out as d,
} from '/dist/web_modules/svelte/internal.js';
import { onMount as p } from '/dist/web_modules/svelte/internal.js';
import g from './components/Header.js';
import j from '/dist/components/Footer/index.js';
import { getCurrentTime as v } from './utils/time.js';
function w(t) {
    let m, f, p, v, w, x;
    const b = new g({}),
        I = new j({});
    return {
        c() {
            r(b.$$.fragment),
                (m = u()),
                (f = s('div')),
                (p = $('Current time is ')),
                (v = $(t[0])),
                (w = u()),
                r(I.$$.fragment);
        },
        m(t, r) {
            a(b, t, r),
                i(t, m, r),
                i(t, f, r),
                e(f, p),
                e(f, v),
                i(t, w, r),
                a(I, t, r),
                (x = !0);
        },
        p(t, [e]) {
            (!x || 1 & e) && l(v, t[0]);
        },
        i(t) {
            x || (c(b.$$.fragment, t), c(I.$$.fragment, t), (x = !0));
        },
        o(t) {
            d(b.$$.fragment, t), d(I.$$.fragment, t), (x = !1);
        },
        d(t) {
            n(b, t), t && o(m), t && o(f), t && o(w), n(I, t);
        },
    };
}
function x(t, e, r) {
    let n;
    return (
        p(() => {
            const t = setInterval(() => {
                r(0, (n = v()));
            }, 1e3);
            return () => clearInterval(t);
        }),
        r(0, (n = v())),
        [n]
    );
}
export default class extends t {
    constructor(t) {
        super(), m(this, t, x, w, f, {});
    }
}
