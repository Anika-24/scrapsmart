// A realistic plywood cutting project used by the "Load Demo" button.
// Dimensions are in millimeters (internal unit).

export const DEFAULT_PROJECT = {
  name: 'Untitled Project',
  material: {
    type: 'plywood',
    sheetWidth: 2440,
    sheetHeight: 1220,
    thickness: 18,
    unit: 'mm',
    pricePerSheet: 38,
    sheetQuantity: 4,
    kerf: 3,
    rotationAllowed: true,
    edgeMargin: 10,
  },
  pieces: [],
};

export const DEMO_PROJECT = {
  name: 'Cabinet Run — Demo',
  material: {
    type: 'plywood',
    sheetWidth: 2440,
    sheetHeight: 1220,
    thickness: 18,
    unit: 'mm',
    pricePerSheet: 38,
    sheetQuantity: 5,
    kerf: 3,
    rotationAllowed: true,
    edgeMargin: 10,
  },
  pieces: [
    { id: 'P1', name: 'Side Panel', width: 720, height: 560, quantity: 7, rotationAllowed: true, color: '#2e7d7a' },
    { id: 'P2', name: 'Top Panel', width: 680, height: 420, quantity: 6, rotationAllowed: true, color: '#2e7d7a' },
    { id: 'P3', name: 'Bottom Shelf', width: 660, height: 380, quantity: 5, rotationAllowed: true, color: '#00555a' },
    { id: 'P4', name: 'Back Panel', width: 600, height: 300, quantity: 4, rotationAllowed: true, color: '#00555a' },
    { id: 'P5', name: 'Drawer Front', width: 280, height: 180, quantity: 10, rotationAllowed: true, color: '#2e7d7a' },
    { id: 'P6', name: 'Toe Kick', width: 1200, height: 100, quantity: 2, rotationAllowed: true, color: '#2e7d7a' },
    { id: 'P7', name: 'Corner Block', width: 140, height: 90, quantity: 14, rotationAllowed: true, color: '#00555a' },
  ],
};

export const EXAMPLE_PIECES = [
  { id: 'P1', name: 'Panel A', width: 600, height: 400, quantity: 2, rotationAllowed: true, color: '#2e7d7a' },
  { id: 'P2', name: 'Panel B', width: 450, height: 300, quantity: 3, rotationAllowed: true, color: '#2e7d7a' },
  { id: 'P3', name: 'Bracket', width: 200, height: 150, quantity: 6, rotationAllowed: true, color: '#00555a' },
];
