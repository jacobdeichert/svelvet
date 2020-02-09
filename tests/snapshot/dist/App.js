import {
    SvelteComponent as e,
    append as t,
    create_component as r,
    destroy_component as n,
    detach as o,
    element as m,
    init as s,
    insert as i,
    mount_component as f,
    safe_not_equal as a,
    set_data as l,
    space as c,
    text as u,
    transition_in as $,
    transition_out as p,
} from '/web_modules/svelte/internal.js?rev=e87f930cb7';
import { onMount as d } from '/web_modules/svelte/internal.js?rev=e87f930cb7';
import v from './components/Header.js';
import g from './components/Footer/index.js';
import { getCurrentTime as j } from './utils/time.js';
function b(e) {
    let s, a, d, j, b, w;
    const x = new v({}),
        I = new g({});
    return {
        c() {
            r(x.$$.fragment),
                (s = c()),
                (a = m('div')),
                (d = u('Current time is ')),
                (j = u(e[0])),
                (b = c()),
                r(I.$$.fragment);
        },
        m(e, r) {
            f(x, e, r),
                i(e, s, r),
                i(e, a, r),
                t(a, d),
                t(a, j),
                i(e, b, r),
                f(I, e, r),
                (w = !0);
        },
        p(e, [t]) {
            (!w || 1 & t) && l(j, e[0]);
        },
        i(e) {
            w || ($(x.$$.fragment, e), $(I.$$.fragment, e), (w = !0));
        },
        o(e) {
            p(x.$$.fragment, e), p(I.$$.fragment, e), (w = !1);
        },
        d(e) {
            n(x, e), e && o(s), e && o(a), e && o(b), n(I, e);
        },
    };
}
function w(e, t, r) {
    let n;
    return (
        d(() => {
            const e = setInterval(() => {
                r(0, (n = j()));
            }, 1e3);
            return () => clearInterval(e);
        }),
        r(0, (n = j())),
        [n]
    );
}
export default class extends e {
    constructor(e) {
        super(), s(this, e, w, b, a, {});
    }
}
