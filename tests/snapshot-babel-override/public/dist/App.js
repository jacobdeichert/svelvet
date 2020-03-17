import {
    SvelteComponent as e,
    create_component as t,
    destroy_component as n,
    init as o,
    mount_component as r,
    noop as s,
    safe_not_equal as m,
    transition_in as i,
    transition_out as l,
} from '/dist/web_modules/svelte/internal.js';
import { onMount as u } from '/dist/web_modules/svelte/internal.js';
import c from './components/Header.js';
function d(e) {
    let o;
    const m = new c({});
    return {
        c() {
            t(m.$$.fragment);
        },
        m(e, t) {
            r(m, e, t), (o = !0);
        },
        p: s,
        i(e) {
            o || (i(m.$$.fragment, e), (o = !0));
        },
        o(e) {
            l(m.$$.fragment, e), (o = !1);
        },
        d(e) {
            n(m, e);
        },
    };
}
function f(e) {
    return (
        u(() => {
            console.log('mounted');
        }),
        []
    );
}
export default class extends e {
    constructor(e) {
        super(), o(this, e, f, d, m, {});
    }
}
