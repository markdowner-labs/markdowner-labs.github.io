/**
 * Formatter Utilities
 * Currency and number formatting functions
 */

// Format number to Brazilian currency
function formatCurrency(value) {
    const absValue = Math.abs(value);
    const formatted = absValue.toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });

    if (value < 0) {
        return `R$ -${formatted}`;
    } else {
        return `R$ ${formatted}`;
    }
}

// Format number to Brazilian decimal (for units/cotas)
function formatDecimal(value, decimals = 6) {
    return value.toLocaleString('pt-BR', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}

// Parse Brazilian currency format to number
function parseCurrency(str) {
    const cleanStr = str.replace(/R\$\s?/g, '').replace(/\./g, '').replace(/,/g, '.');
    return parseFloat(cleanStr);
}

// Parse Brazilian decimal format to number
function parseDecimal(str) {
    return parseFloat(str.replace(/\./g, '').replace(/,/g, '.'));
}
