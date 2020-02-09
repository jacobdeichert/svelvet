import {
    SvelteComponent as e,
    create_component as t,
    destroy_component as r,
    init as n,
    mount_component as o,
    noop as s,
    safe_not_equal as m,
    transition_in as c,
    transition_out as f,
} from '/web_modules/svelte/internal.js?rev=e87f930cb7';
import { onMount as l } from '/web_modules/svelte/internal.js?rev=e87f930cb7';
import u from './components/Header.js';
function i(e) {
    let n;
    const m = new u({});
    return {
        c() {
            t(m.$$.fragment);
        },
        m(e, t) {
            o(m, e, t), (n = !0);
        },
        p: s,
        i(e) {
            n || (c(m.$$.fragment, e), (n = !0));
        },
        o(e) {
            f(m.$$.fragment, e), (n = !1);
        },
        d(e) {
            r(m, e);
        },
    };
}
function a(e) {
    return (
        l(() => {
            console.log('mounted');
        }),
        []
    );
}
export default class extends e {
    constructor(e) {
        super(), n(this, e, a, i, m, {});
    }
}
