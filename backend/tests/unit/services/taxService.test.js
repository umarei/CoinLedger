const { calculateCapitalGains } = require('../../services/taxService');

describe('Tax Service - calculateCapitalGains', () => {
    it('should calculate capital gains using FIFO method', () => {
        const transactions = [
            { type: 'buy', amount: 2, price: 30000 },
            { type: 'buy', amount: 1, price: 35000 },
            { type: 'sell', amount: 2, price: 40000 },
        ];

        const gains = calculateCapitalGains(transactions);
        expect(gains).toBe(20000); // Expected gains: 2 * (40000 - 30000)
    });

    it('should handle zero gains if no sell transactions', () => {
        const transactions = [{ type: 'buy', amount: 2, price: 30000 }];
        const gains = calculateCapitalGains(transactions);
        expect(gains).toBe(0);
    });
});
