const data = require('./graveyard.json');


describe('graveyard', () => {
  it('graveyard', () => {
    data.forEach((product) => {
      // All data is present for each product
      expect(product.dateClose).not.toBeNull();
      expect(product.dateOpen).not.toBeNull();
      expect(product.description).not.toBeNull();
      expect(product.link).not.toBeNull();
      expect(product.name).not.toBeNull();

      // Check `dateClose` format
      // Format: YYYY-MM-DD
      expect(product.dateClose.split('-')).toHaveLength(3);
      // Format Year: YYYY
      expect(product.dateClose.split('-')[0]).toHaveLength(4);
      // Format Month: MM
      expect(product.dateClose.split('-')[1]).toHaveLength(2);
      // Format Day: DD
      expect(product.dateClose.split('-')[2]).toHaveLength(2);

      // Check `dateOpen` format
      // Format: YYYY-MM-DD
      expect(product.dateOpen.split('-')).toHaveLength(3);
      // Format Year: YYYY
      expect(product.dateOpen.split('-')[0]).toHaveLength(4);
      // Format Month: MM
      expect(product.dateOpen.split('-')[1]).toHaveLength(2);
      // Format Day: DD
      expect(product.dateOpen.split('-')[2]).toHaveLength(2);

      // Dates are Chronologically Correct
      const dateClose = new Date(product.dateClose).getTime();
      const dateOpen = new Date(product.dateOpen).getTime();
      expect(dateOpen).toBeLessThanOrEqual(dateClose);
    });
  });
});
