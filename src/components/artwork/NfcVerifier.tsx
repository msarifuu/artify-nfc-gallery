
import { useState, useEffect } from "react";
import { Loader, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NfcVerifierProps {
  artworkId: string;
  nfcId: string;
  onVerificationSuccess: () => void;
}

type VerificationState = "idle" | "scanning" | "success" | "error";

const NfcVerifier = ({ artworkId, nfcId, onVerificationSuccess }: NfcVerifierProps) => {
  const [verificationState, setVerificationState] = useState<VerificationState>("idle");
  const [isNfcSupported, setIsNfcSupported] = useState<boolean | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  
  // Check for NFC support when component mounts
  useEffect(() => {
    // In a real implementation, we would check if the browser supports NFC
    const checkNfcSupport = () => {
      if ("NDEFReader" in window) {
        setIsNfcSupported(true);
      } else {
        setIsNfcSupported(false);
        setErrorMessage("Your device doesn't support NFC. Please use a compatible device.");
      }
    };
    
    checkNfcSupport();
  }, []);
  
  const startNfcScan = () => {
    setVerificationState("scanning");
    
    // Simulate NFC scan (in production, use actual Web NFC API)
    setTimeout(() => {
      // Simulate successful scan
      const success = Math.random() > 0.2; // 80% success rate for demo
      
      if (success) {
        setVerificationState("success");
        // Wait a moment before calling the success callback
        setTimeout(() => {
          onVerificationSuccess();
        }, 1000);
      } else {
        setVerificationState("error");
        setErrorMessage("NFC tag doesn't match the expected ID. Please try again or contact support.");
      }
    }, 2000);
  };
  
  return (
    <div className="w-full max-w-sm mx-auto text-center">
      {isNfcSupported === false && (
        <div className="mb-4 p-4 bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg">
          <div className="flex items-center justify-center mb-2">
            <AlertCircle className="h-5 w-5 mr-2" />
            <p className="font-semibold">NFC Not Supported</p>
          </div>
          <p className="text-sm">{errorMessage}</p>
        </div>
      )}
      
      <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-4">
        {verificationState === "idle" && (
          <div className="py-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
              <img src="/placeholder.svg" alt="NFC Icon" className="w-16 h-16 opacity-50" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Place your phone near the NFC tag on the artwork to verify authenticity
            </p>
          </div>
        )}
        
        {verificationState === "scanning" && (
          <div className="py-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-amber-500 flex items-center justify-center animate-pulse">
              <Loader className="w-16 h-16 text-amber-500 animate-spin" />
            </div>
            <p className="text-amber-600 dark:text-amber-400 font-medium">
              Scanning NFC tag...
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Hold your device still near the NFC tag
            </p>
          </div>
        )}
        
        {verificationState === "success" && (
          <div className="py-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-green-500 bg-green-50 dark:bg-green-900/30 flex items-center justify-center">
              <Check className="w-16 h-16 text-green-500" />
            </div>
            <p className="text-green-600 dark:text-green-400 font-medium">
              Artwork Verified!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              NFC ID: {nfcId}
            </p>
          </div>
        )}
        
        {verificationState === "error" && (
          <div className="py-6">
            <div className="w-32 h-32 mx-auto mb-4 rounded-full border-2 border-red-500 bg-red-50 dark:bg-red-900/30 flex items-center justify-center">
              <AlertCircle className="w-16 h-16 text-red-500" />
            </div>
            <p className="text-red-600 dark:text-red-400 font-medium">
              Verification Failed
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              {errorMessage}
            </p>
          </div>
        )}
      </div>
      
      {(verificationState === "idle" || verificationState === "error") && isNfcSupported !== false && (
        <Button 
          variant="default" 
          size="lg"
          className="bg-amber-500 hover:bg-amber-600 text-black font-medium"
          onClick={startNfcScan}
        >
          {verificationState === "error" ? "Try Again" : "Start NFC Scan"}
        </Button>
      )}
    </div>
  );
};

export default NfcVerifier;
