import {
    SvelteComponent as t,
    detach as e,
    element as n,
    init as s,
    insert as o,
    noop as r,
    safe_not_equal as l,
} from '/dist/web_modules/svelte/internal.js';
function i(t) {
    let s;
    return {
        c() {
            (s = n('div')), (s.textContent = 'HOME PAGE');
        },
        m(t, e) {
            o(t, s, e);
        },
        p: r,
        i: r,
        o: r,
        d(t) {
            t && e(s);
        },
    };
}
export default class extends t {
    constructor(t) {
        super(), s(this, t, null, i, l, {});
    }
}
