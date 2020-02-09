import {
    SvelteComponent as t,
    append as e,
    create_component as n,
    destroy_component as s,
    detach as o,
    element as r,
    init as l,
    insert as c,
    mount_component as f,
    noop as i,
    safe_not_equal as m,
    space as a,
    transition_in as u,
    transition_out as p,
} from '/web_modules/svelte/internal.js?rev=e87f930cb7';
import $ from './Links.js';
function d(t) {
    let l, m, d, v;
    const w = new $({});
    return {
        c() {
            (l = r('footer')),
                (m = r('p')),
                (m.textContent = `${g}`),
                (d = a()),
                n(w.$$.fragment);
        },
        m(t, n) {
            c(t, l, n), e(l, m), e(l, d), f(w, l, null), (v = !0);
        },
        p: i,
        i(t) {
            v || (u(w.$$.fragment, t), (v = !0));
        },
        o(t) {
            p(w.$$.fragment, t), (v = !1);
        },
        d(t) {
            t && o(l), s(w);
        },
    };
}
const g = 'this is svelte and snowpack';
export default class extends t {
    constructor(t) {
        super(), l(this, t, null, d, m, {});
    }
}
