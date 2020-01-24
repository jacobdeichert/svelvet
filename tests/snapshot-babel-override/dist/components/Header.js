import {
    SvelteComponent as e,
    append as t,
    attr as n,
    detach as s,
    element as l,
    init as r,
    insert as a,
    noop as o,
    safe_not_equal as d,
} from '/web_modules/svelte/internal.js?v=undefined';
function b(e) {
    let r, d;
    return {
        c() {
            (r = l('div')),
                (d = l('h1')),
                (d.textContent = `${v}`),
                n(d, 'class', 'svelte-nwbabr'),
                n(r, 'class', 'header svelte-nwbabr');
        },
        m(e, n) {
            a(e, r, n), t(r, d);
        },
        p: o,
        i: o,
        o: o,
        d(e) {
            e && s(r);
        },
    };
}
const v = 'svelvetttttttt';
export default class extends e {
    constructor(e) {
        var n;
        super(),
            document.getElementById('svelte-nwbabr-style') ||
                (((n = l('style')).id = 'svelte-nwbabr-style'),
                (n.textContent =
                    'h1.svelte-nwbabr{color:#000;font-size:70px}.header.svelte-nwbabr{max-width:800px}'),
                t(document.head, n)),
            r(this, e, null, b, d, {});
    }
}
