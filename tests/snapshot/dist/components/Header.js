import {
    SvelteComponent as e,
    append as t,
    attr as s,
    detach as n,
    element as l,
    init as r,
    insert as a,
    noop as o,
    safe_not_equal as b,
} from '/web_modules/svelte/internal.js?rev=e87f930cb7';
function d(e) {
    let r, b;
    return {
        c() {
            (r = l('div')),
                (b = l('h1')),
                (b.textContent = `${c}`),
                s(b, 'class', 'svelte-nwbabr'),
                s(r, 'class', 'header svelte-nwbabr');
        },
        m(e, s) {
            a(e, r, s), t(r, b);
        },
        p: o,
        i: o,
        o: o,
        d(e) {
            e && n(r);
        },
    };
}
const c = 'svelvetttttttt';
export default class extends e {
    constructor(e) {
        var s;
        super(),
            document.getElementById('svelte-nwbabr-style') ||
                (((s = l('style')).id = 'svelte-nwbabr-style'),
                (s.textContent =
                    'h1.svelte-nwbabr{color:#000;font-size:70px}.header.svelte-nwbabr{max-width:800px}'),
                t(document.head, s)),
            r(this, e, null, d, b, {});
    }
}
