
export function formatCurrency(quantity: number, mode : string) {

    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: mode
    }).format(quantity)
}
