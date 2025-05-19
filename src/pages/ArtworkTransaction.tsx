
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { CreditCard, Loader, Check, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import NfcVerifier from "@/components/artwork/NfcVerifier";
import ArtworkDetails from "@/components/artwork/ArtworkDetails";

// Mock data - this would come from API in a real implementation
const mockArtwork = {
  id: "artwork-123",
  title: "Convergence of Time",
  artist: "Elena Rodriguez",
  artistId: "artist-456",
  year: 2024,
  medium: "Digital Print on Canvas",
  dimensions: "60 × 90 cm",
  edition: "2/15",
  price: 1200,
  currency: "USD",
  image: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?q=80&w=1280&auto=format&fit=crop",
  description: "A contemplative exploration of time and space through generative algorithm techniques and traditional painting methods.",
  nfcId: "nfc-7d8e9f-art123",
  provenance: [
    {
      date: "2024-01-15",
      owner: "Gallery Modern",
      location: "New York, NY",
      verified: true
    },
    {
      date: "2024-05-10",
      owner: "Private Collection",
      location: "San Francisco, CA",
      verified: true
    }
  ]
};

// Transaction status types
type TransactionStatus = "idle" | "verifying" | "verified" | "processing" | "completed" | "failed";

const ArtworkTransactionPage = () => {
  const { artworkId } = useParams();
  const [artwork] = useState(mockArtwork); // In real implementation, fetch by artworkId
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>("idle");
  const [nfcVerified, setNfcVerified] = useState(false);
  const [showNfcDialog, setShowNfcDialog] = useState(false);
  
  // Handle NFC verification success
  const handleNfcSuccess = () => {
    setNfcVerified(true);
    setShowNfcDialog(false);
  };
  
  // Process payment (mock)
  const handlePurchase = () => {
    if (!nfcVerified) {
      setShowNfcDialog(true);
      return;
    }
    
    setTransactionStatus("processing");
    
    // Simulate API call for payment processing
    setTimeout(() => {
      setTransactionStatus("completed");
    }, 2000);
  };

  return (
    <MainLayout>
      <Helmet>
        <title>Purchase Artwork | Artify</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Purchase Artwork</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Complete your transaction securely with NFC verification
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Artwork Details Column */}
          <div className="lg:col-span-2">
            <ArtworkDetails artwork={artwork} />
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Provenance History</CardTitle>
                <CardDescription>Verified ownership trail</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {artwork.provenance.map((record, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-amber-100 dark:bg-amber-900 p-2 rounded-full mr-3">
                        <Check className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="font-medium">{record.owner}</p>
                          <Badge variant="outline" className="ml-2">
                            {record.date}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {record.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Transaction Column */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Complete Purchase</CardTitle>
                <CardDescription>Secure transaction with NFC verification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Price:</span>
                    <span className="font-bold">{artwork.currency} {artwork.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Authentication Fee:</span>
                    <span>{artwork.currency} {(artwork.price * 0.02).toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>{artwork.currency} {(artwork.price * 1.02).toLocaleString()}</span>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg mt-4">
                    <div className="flex items-center mb-2">
                      <CreditCard className="h-5 w-5 mr-2 text-amber-500" />
                      <h3 className="font-semibold">Verification Status</h3>
                    </div>
                    
                    {nfcVerified ? (
                      <div className="flex items-center text-green-600">
                        <Check className="h-5 w-5 mr-2" />
                        <span>Artwork NFC verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-amber-600">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <span>Artwork NFC verification required</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-black font-medium"
                  onClick={handlePurchase}
                  disabled={transactionStatus === "processing" || transactionStatus === "completed"}
                >
                  {transactionStatus === "processing" && (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {transactionStatus === "completed" ? "Purchase Complete" : "Complete Purchase"}
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About NFC Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Each artwork includes an embedded NFC chip with a unique digital signature. 
                    Scan with your phone to verify authenticity and record your ownership in 
                    the provenance chain.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        
        {/* NFC Verification Dialog */}
        <Dialog open={showNfcDialog} onOpenChange={setShowNfcDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Verify Artwork Authenticity</DialogTitle>
              <DialogDescription>
                Scan the NFC tag on the artwork to verify its authenticity before purchase.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-center py-6">
              <NfcVerifier 
                artworkId={artwork.id} 
                nfcId={artwork.nfcId}
                onVerificationSuccess={handleNfcSuccess}
              />
            </div>
            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setShowNfcDialog(false)}
              >
                Cancel
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default ArtworkTransactionPage;
