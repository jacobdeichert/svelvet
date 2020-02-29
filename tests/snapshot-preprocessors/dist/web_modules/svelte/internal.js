function n(n) {
    (function() {
        throw new Error('Function called outside component initialization');
    })().$$.on_mount.push(n);
}
export { n as onMount };
//# sourceMappingURL=internal.js.map
