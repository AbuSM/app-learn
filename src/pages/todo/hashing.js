export const hashing = (text) => {
    const MOD = 1e9 + 7,
        PRIME = 823547;
    let num = PRIME,
        ans = 0;

    for (let i = 0; i < text.length; i++) {
        const asciiCode = text[i].charCodeAt(0);
        ans = (ans + ((asciiCode * num) % MOD)) % MOD;

        num = (num * PRIME) % MOD;
    }
    return ans;
};
