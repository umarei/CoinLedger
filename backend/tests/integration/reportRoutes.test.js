const request = require('supertest');
const app = require('../../server'); // Import the Express app
const TaxReport = require('../../models/TaxReport');

jest.mock('../../models/TaxReport');

describe('Report Routes', () => {
    describe('POST /api/reports', () => {
        it('should generate a new tax report', async () => {
            TaxReport.prototype.save = jest.fn().mockResolvedValue({
                reportDetails: {
                    income: 2000,
                    gains: 10000,
                    taxLiabilities: 1800,
                },
            });

            const response = await request(app)
                .post('/api/reports')
                .set('Authorization', 'Bearer valid_token')
                .send();

            expect(response.status).toBe(201);
            expect(response.body.message).toBe('Tax report generated successfully');
        });
    });

    describe('GET /api/reports', () => {
        it('should fetch all reports', async () => {
            TaxReport.find.mockResolvedValue([
                { reportDetails: { income: 2000, gains: 10000, taxLiabilities: 1800 } },
            ]);

            const response = await request(app)
                .get('/api/reports')
                .set('Authorization', 'Bearer valid_token');

            expect(response.status).toBe(200);
            expect(response.body.reports.length).toBeGreaterThan(0);
        });
    });
});
