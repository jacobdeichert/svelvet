import {
    SvelteComponent as e,
    create_component as n,
    destroy_component as t,
    init as o,
    mount_component as r,
    noop as s,
    safe_not_equal as m,
    transition_in as u,
    transition_out as d,
} from '/web_modules/svelte/internal.js?v=undefined';
import { onMount as f } from '/web_modules/svelte/internal.js?v=undefined';
import i from './components/Header.js';
function l(e) {
    let o;
    const m = new i({});
    return {
        c() {
            n(m.$$.fragment);
        },
        m(e, n) {
            r(m, e, n), (o = !0);
        },
        p: s,
        i(e) {
            o || (u(m.$$.fragment, e), (o = !0));
        },
        o(e) {
            d(m.$$.fragment, e), (o = !1);
        },
        d(e) {
            t(m, e);
        },
    };
}
function c(e) {
    return (
        f(() => {
            console.log('mounted');
        }),
        []
    );
}
export default class extends e {
    constructor(e) {
        super(), o(this, e, c, l, m, {});
    }
}
