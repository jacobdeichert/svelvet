import {
    SvelteComponent as e,
    detach as r,
    element as t,
    init as n,
    insert as o,
    noop as s,
    safe_not_equal as l,
} from '/web_modules/svelte/internal.js?rev=e87f930cb7';
function u(e) {
    let n;
    return {
        c() {
            (n = t('nav')), (n.innerHTML = '<a href="/">Home</a>');
        },
        m(e, r) {
            o(e, n, r);
        },
        p: s,
        i: s,
        o: s,
        d(e) {
            e && r(n);
        },
    };
}
export default class extends e {
    constructor(e) {
        super(), n(this, e, null, u, l, {});
    }
}
