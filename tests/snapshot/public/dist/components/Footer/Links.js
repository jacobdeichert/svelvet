import {
    SvelteComponent as e,
    detach as t,
    element as n,
    init as r,
    insert as s,
    noop as o,
    safe_not_equal as l,
} from '/dist/web_modules/svelte/internal.js';
function i(e) {
    let r;
    return {
        c() {
            (r = n('nav')), (r.innerHTML = '<a href="/">Home</a>');
        },
        m(e, t) {
            s(e, r, t);
        },
        p: o,
        i: o,
        o: o,
        d(e) {
            e && t(r);
        },
    };
}
export default class extends e {
    constructor(e) {
        super(), r(this, e, null, i, l, {});
    }
}
