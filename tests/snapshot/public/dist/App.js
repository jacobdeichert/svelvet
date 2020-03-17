import {
    SvelteComponent as e,
    append as t,
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
import j from './components/Footer/index.js';
import { getCurrentTime as v } from './utils/time.js';
function w(e) {
    let m, f, p, v, w, x;
    const b = new g({}),
        I = new j({});
    return {
        c() {
            r(b.$$.fragment),
                (m = u()),
                (f = s('div')),
                (p = $('Current time is ')),
                (v = $(e[0])),
                (w = u()),
                r(I.$$.fragment);
        },
        m(e, r) {
            a(b, e, r),
                i(e, m, r),
                i(e, f, r),
                t(f, p),
                t(f, v),
                i(e, w, r),
                a(I, e, r),
                (x = !0);
        },
        p(e, [t]) {
            (!x || 1 & t) && l(v, e[0]);
        },
        i(e) {
            x || (c(b.$$.fragment, e), c(I.$$.fragment, e), (x = !0));
        },
        o(e) {
            d(b.$$.fragment, e), d(I.$$.fragment, e), (x = !1);
        },
        d(e) {
            n(b, e), e && o(m), e && o(f), e && o(w), n(I, e);
        },
    };
}
function x(e, t, r) {
    let n;
    return (
        p(() => {
            const e = setInterval(() => {
                r(0, (n = v()));
            }, 1e3);
            return () => clearInterval(e);
        }),
        r(0, (n = v())),
        [n]
    );
}
export default class extends e {
    constructor(e) {
        super(), m(this, e, x, w, f, {});
    }
}
