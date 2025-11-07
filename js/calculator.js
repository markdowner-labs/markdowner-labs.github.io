/**
 * Investment Calculator
 * Core calculation logic
 */

const calculator = {
    // Calculate investment table
    calculateTable(X, I, lineBlocks) {
        const table = [];

        // First line
        const a1 = X;
        const b1 = I;
        const c1 = a1;
        const d1 = a1 / b1;
        const e1 = (b1 * d1) - c1;
        table.push([a1, b1, c1, d1, e1]);

        // Additional lines
        for (const [Y, J, quantity] of lineBlocks) {
            for (let i = 0; i < quantity; i++) {
                const prevLine = table[table.length - 1];
                const an = Y === null ? 0 : prevLine[0] + Y;
                const bn = prevLine[1] + J;
                const cn = prevLine[2] + an;
                const dn = bn !== 0 ? (an / bn) + prevLine[3] : prevLine[3];
                const en = (bn * dn) - cn;
                table.push([an, bn, cn, dn, en]);
            }
        }

        return table;
    },

    // Reconstruct state from table data
    reconstructStateFromTable(tableData) {
        const firstRow = tableData[0];
        const X = firstRow.aporte;
        const I = firstRow.preco;

        const lineBlocks = [];

        for (let i = 1; i < tableData.length; i++) {
            const current = tableData[i];
            const previous = tableData[i - 1];

            const Y = current.aporte - previous.aporte;
            const J = current.preco - previous.preco;

            if (lineBlocks.length > 0) {
                const lastBlock = lineBlocks[lineBlocks.length - 1];
                const lastY = lastBlock[0];
                const lastJ = lastBlock[1];

                if (Math.abs((lastY || 0) - Y) < 0.01 && Math.abs(lastJ - J) < 0.01) {
                    lastBlock[2]++;
                    continue;
                }
            }

            lineBlocks.push([Y === 0 ? null : Y, J, 1]);
        }

        return { X, I, lineBlocks };
    }
};
