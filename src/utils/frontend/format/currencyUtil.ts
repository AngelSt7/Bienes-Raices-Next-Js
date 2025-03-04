export function formatCurrency(quantity: number, mode: string) {
    if (mode === "PEN") {
        return `S/. ${quantity.toFixed(2)}`;
    } else if (mode === "USD") {
        return `USD ${quantity.toFixed(2)}`;
    }

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: mode
    }).format(quantity);
}
