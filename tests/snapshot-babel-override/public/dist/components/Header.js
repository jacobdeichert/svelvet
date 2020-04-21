import {
    SvelteComponent as t,
    append as e,
    attr as s,
    detach as n,
    element as l,
    init as r,
    insert as a,
    noop as o,
    safe_not_equal as d,
} from '/dist/web_modules/svelte/internal.js';
function b(t) {
    let r, d;
    return {
        c() {
            (r = l('div')),
                (d = l('h1')),
                (d.textContent = '' + c),
                s(d, 'class', 'svelte-nwbabr'),
                s(r, 'class', 'header svelte-nwbabr');
        },
        m(t, s) {
            a(t, r, s), e(r, d);
        },
        p: o,
        i: o,
        o: o,
        d(t) {
            t && n(r);
        },
    };
}
const c = 'svelvetttttttt';
export default class extends t {
    constructor(t) {
        var s;
        super(),
            document.getElementById('svelte-nwbabr-style') ||
                (((s = l('style')).id = 'svelte-nwbabr-style'),
                (s.textContent =
                    'h1.svelte-nwbabr{color:#000;font-size:70px}.header.svelte-nwbabr{max-width:800px}'),
                e(document.head, s)),
            r(this, t, null, b, d, {});
    }
}
