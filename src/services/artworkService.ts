
// This file contains mock services that would connect to real APIs in production

// Mock database schema types
export interface Artwork {
  id: string;
  title: string;
  artist_id: string;
  artist_name: string;
  year: number;
  medium: string;
  dimensions: string;
  edition: string;
  price: number;
  currency: string;
  image_url: string;
  description: string;
  nfc_id: string;
  created_at: string;
  updated_at: string;
}

export interface ArtworkTransaction {
  id: string;
  artwork_id: string;
  buyer_id: string;
  seller_id: string;
  transaction_date: string;
  price: number;
  currency: string;
  status: 'pending' | 'completed' | 'cancelled';
  nfc_verified: boolean;
  nfc_verification_date?: string;
}

export interface NfcVerification {
  id: string;
  nfc_id: string;
  artwork_id: string;
  verified_by: string;
  verification_date: string;
  is_valid: boolean;
}

// Mock API service functions
export const artworkService = {
  // Fetch artwork details
  getArtwork: async (artworkId: string): Promise<Artwork> => {
    // In a real implementation, this would make an API request
    console.log(`Fetching artwork with ID: ${artworkId}`);
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data
    return {
      id: artworkId,
      title: "Convergence of Time",
      artist_id: "artist-456",
      artist_name: "Elena Rodriguez",
      year: 2024,
      medium: "Digital Print on Canvas",
      dimensions: "60 × 90 cm",
      edition: "2/15",
      price: 1200,
      currency: "USD",
      image_url: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654",
      description: "A contemplative exploration of time and space through generative algorithm techniques and traditional painting methods.",
      nfc_id: "nfc-7d8e9f-art123",
      created_at: "2024-01-15T10:30:00Z",
      updated_at: "2024-05-10T14:22:00Z"
    };
  },
  
  // Verify NFC tag
  verifyNfcTag: async (nfcId: string, artworkId: string): Promise<NfcVerification> => {
    console.log(`Verifying NFC tag ${nfcId} for artwork ${artworkId}`);
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock verification result
    const isValid = nfcId.includes(artworkId.split('-')[1]);
    
    return {
      id: `verify-${Date.now()}`,
      nfc_id: nfcId,
      artwork_id: artworkId,
      verified_by: "user-123",
      verification_date: new Date().toISOString(),
      is_valid: isValid
    };
  },
  
  // Process transaction
  createTransaction: async (
    artworkId: string, 
    buyerId: string, 
    price: number
  ): Promise<ArtworkTransaction> => {
    console.log(`Creating transaction for artwork ${artworkId}`);
    
    // Mock response delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      id: `tx-${Date.now()}`,
      artwork_id: artworkId,
      buyer_id: buyerId,
      seller_id: "seller-789",
      transaction_date: new Date().toISOString(),
      price: price,
      currency: "USD",
      status: 'completed',
      nfc_verified: true,
      nfc_verification_date: new Date().toISOString()
    };
  }
};

// In a real implementation, we would define the database schema like this:
/*
-- Artwork Table
CREATE TABLE artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  artist_id UUID NOT NULL REFERENCES artists(id),
  year INT,
  medium VARCHAR(255),
  dimensions VARCHAR(100),
  edition VARCHAR(50),
  price DECIMAL(12,2),
  currency VARCHAR(3) DEFAULT 'USD',
  image_url TEXT,
  description TEXT,
  nfc_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NFC Verification Table
CREATE TABLE nfc_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nfc_id VARCHAR(255) NOT NULL,
  artwork_id UUID NOT NULL REFERENCES artworks(id),
  verified_by UUID NOT NULL REFERENCES users(id),
  verification_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_valid BOOLEAN NOT NULL,
  metadata JSONB
);

-- Transaction Table
CREATE TABLE artwork_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artwork_id UUID NOT NULL REFERENCES artworks(id),
  buyer_id UUID NOT NULL REFERENCES users(id),
  seller_id UUID NOT NULL REFERENCES users(id),
  transaction_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  price DECIMAL(12,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'USD',
  status VARCHAR(20) CHECK (status IN ('pending', 'completed', 'cancelled')),
  nfc_verified BOOLEAN DEFAULT FALSE,
  nfc_verification_date TIMESTAMP WITH TIME ZONE,
  payment_id VARCHAR(255),
  metadata JSONB
);
*/
