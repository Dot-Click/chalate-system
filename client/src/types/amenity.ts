export interface Amenity {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAmenityRequest {
  name: string;
}

export interface UpdateAmenityRequest {
  name: string;
}

export interface AmenityFormData {
  name: string;
}

export interface AmenitiesService {
  getAmenities(): Promise<Amenity[]>;
  getAmenity(id: number): Promise<Amenity>;
  createAmenity(data: CreateAmenityRequest): Promise<Amenity>;
  updateAmenity(id: number, data: UpdateAmenityRequest): Promise<Amenity>;
  deleteAmenity(id: number): Promise<Amenity>;
  searchAmenities(query: string): Promise<Amenity[]>;
}
