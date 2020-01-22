import {
    SvelteComponent as t,
    append as e,
    create_component as n,
    destroy_component as s,
    detach as o,
    element as r,
    init as l,
    insert as i,
    mount_component as m,
    noop as a,
    safe_not_equal as c,
    space as f,
    transition_in as u,
    transition_out as p,
} from '/web_modules/svelte/internal.js';
import $ from './Links.js';
function d(t) {
    let l, c, d, w;
    const x = new $({});
    return {
        c() {
            (l = r('footer')),
                (c = r('p')),
                (c.textContent = `${g}`),
                (d = f()),
                n(x.$$.fragment);
        },
        m(t, n) {
            i(t, l, n), e(l, c), e(l, d), m(x, l, null), (w = !0);
        },
        p: a,
        i(t) {
            w || (u(x.$$.fragment, t), (w = !0));
        },
        o(t) {
            p(x.$$.fragment, t), (w = !1);
        },
        d(t) {
            t && o(l), s(x);
        },
    };
}
const g = 'this is svelte and snowpack';
export default class extends t {
    constructor(t) {
        super(), l(this, t, null, d, c, {});
    }
}
