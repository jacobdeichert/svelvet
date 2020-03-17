import {
    SvelteComponent as t,
    detach as e,
    element as n,
    init as o,
    insert as r,
    noop as s,
    safe_not_equal as l,
} from '/web_modules/svelte/internal.js';
function u(t) {
    let o;
    return {
        c() {
            (o = n('div')), (o.textContent = 'ABOUT PAGE');
        },
        m(t, e) {
            r(t, o, e);
        },
        p: s,
        i: s,
        o: s,
        d(t) {
            t && e(o);
        },
    };
}
export default class extends t {
    constructor(t) {
        super(), o(this, t, null, u, l, {});
    }
}
