// Amenities API Service — mock implementation
// Replace with real API calls (axios/fetch) in production

const delay = (ms = 600) => new Promise(r => setTimeout(r, ms));

// Mock amenities data
let MOCK_AMENITIES = [
  { id: 1, name: 'WiFi', createdAt: '2024-01-15T10:30:00Z', updatedAt: '2024-01-15T10:30:00Z' },
  { id: 2, name: 'Swimming Pool', createdAt: '2024-01-16T14:20:00Z', updatedAt: '2024-01-16T14:20:00Z' },
  { id: 3, name: 'BBQ Area', createdAt: '2024-01-17T09:15:00Z', updatedAt: '2024-01-17T09:15:00Z' },
  { id: 4, name: 'Parking', createdAt: '2024-01-18T16:45:00Z', updatedAt: '2024-01-18T16:45:00Z' },
  { id: 5, name: 'Air Conditioning', createdAt: '2024-01-19T11:30:00Z', updatedAt: '2024-01-19T11:30:00Z' },
  { id: 6, name: 'Kitchen', createdAt: '2024-01-20T13:10:00Z', updatedAt: '2024-01-20T13:10:00Z' },
  { id: 7, name: 'Garden', createdAt: '2024-01-21T15:25:00Z', updatedAt: '2024-01-21T15:25:00Z' },
  { id: 8, name: 'Gym', createdAt: '2024-01-22T08:40:00Z', updatedAt: '2024-01-22T08:40:00Z' },
];

let nextId = 9;

export const amenitiesService = {
  // Get all amenities
  async getAmenities() {
    await delay(500);
    return [...MOCK_AMENITIES];
  },

  // Get amenity by ID
  async getAmenity(id) {
    await delay(300);
    const amenity = MOCK_AMENITIES.find(a => a.id === parseInt(id));
    if (!amenity) throw new Error('Amenity not found');
    return { ...amenity };
  },

  // Create new amenity
  async createAmenity({ name }) {
    await delay(700);
    
    // Validation
    if (!name?.trim()) throw new Error('Amenity name is required');
    if (name.trim().length < 2) throw new Error('Amenity name must be at least 2 characters');
    if (name.trim().length > 50) throw new Error('Amenity name must be less than 50 characters');
    
    // Check for duplicate
    const existing = MOCK_AMENITIES.find(a => 
      a.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (existing) throw new Error('An amenity with this name already exists');
    
    const newAmenity = {
      id: nextId++,
      name: name.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    MOCK_AMENITIES.push(newAmenity);
    return { ...newAmenity };
  },

  // Update amenity
  async updateAmenity(id, { name }) {
    await delay(700);
    
    const index = MOCK_AMENITIES.findIndex(a => a.id === parseInt(id));
    if (index === -1) throw new Error('Amenity not found');
    
    // Validation
    if (!name?.trim()) throw new Error('Amenity name is required');
    if (name.trim().length < 2) throw new Error('Amenity name must be at least 2 characters');
    if (name.trim().length > 50) throw new Error('Amenity name must be less than 50 characters');
    
    // Check for duplicate (excluding current)
    const existing = MOCK_AMENITIES.find(a => 
      a.id !== parseInt(id) && a.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (existing) throw new Error('An amenity with this name already exists');
    
    MOCK_AMENITIES[index] = {
      ...MOCK_AMENITIES[index],
      name: name.trim(),
      updatedAt: new Date().toISOString()
    };
    
    return { ...MOCK_AMENITIES[index] };
  },

  // Delete amenity
  async deleteAmenity(id) {
    await delay(500);
    
    const index = MOCK_AMENITIES.findIndex(a => a.id === parseInt(id));
    if (index === -1) throw new Error('Amenity not found');
    
    const deleted = MOCK_AMENITIES[index];
    MOCK_AMENITIES.splice(index, 1);
    
    return { ...deleted };
  },

  // Search amenities
  async searchAmenities(query) {
    await delay(300);
    
    if (!query?.trim()) return [...MOCK_AMENITIES];
    
    const searchTerm = query.trim().toLowerCase();
    return MOCK_AMENITIES.filter(amenity => 
      amenity.name.toLowerCase().includes(searchTerm)
    );
  }
};
