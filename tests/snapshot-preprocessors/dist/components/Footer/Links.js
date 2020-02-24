import {
    SvelteComponent as e,
    detach as t,
    element as n,
    init as r,
    insert as o,
    noop as s,
    safe_not_equal as l,
} from '/web_modules/svelte/internal.js';
function u(e) {
    let r;
    return {
        c() {
            (r = n('nav')), (r.innerHTML = '<a href="/">Home</a>');
        },
        m(e, t) {
            o(e, r, t);
        },
        p: s,
        i: s,
        o: s,
        d(e) {
            e && t(r);
        },
    };
}
export default class extends e {
    constructor(e) {
        super(), r(this, e, null, u, l, {});
    }
}
