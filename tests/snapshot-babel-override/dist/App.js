import {
    SvelteComponent as e,
    create_component as t,
    destroy_component as n,
    init as o,
    mount_component as r,
    noop as s,
    safe_not_equal as m,
    transition_in as l,
    transition_out as u,
} from '/web_modules/svelte/internal.js';
import { onMount as c } from '/web_modules/svelte/internal.js';
import f from './components/Header.js';
function i(e) {
    let o;
    const m = new f({});
    return {
        c() {
            t(m.$$.fragment);
        },
        m(e, t) {
            r(m, e, t), (o = !0);
        },
        p: s,
        i(e) {
            o || (l(m.$$.fragment, e), (o = !0));
        },
        o(e) {
            u(m.$$.fragment, e), (o = !1);
        },
        d(e) {
            n(m, e);
        },
    };
}
function a(e) {
    return (
        c(() => {
            console.log('mounted');
        }),
        []
    );
}
export default class extends e {
    constructor(e) {
        super(), o(this, e, a, i, m, {});
    }
}
