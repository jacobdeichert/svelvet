// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString();
}
