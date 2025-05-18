
import { ShieldCheck, Smartphone } from "lucide-react";

const NfcShowcase = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-amber-400 text-sm font-medium mb-3 block">NFC AUTHENTICATION TECHNOLOGY</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Secure, Instant Artwork Authentication
            </h2>
            <p className="text-gray-300 mb-8">
              Our proprietary NFC technology embeds a secure digital signature into each artwork, 
              creating an unforgeable link between the physical piece and its digital certificate 
              of authenticity. Simply scan with your smartphone to instantly verify.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mt-1 bg-amber-500/10 p-2 rounded-full">
                  <ShieldCheck className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold mb-2">Tamper-proof Verification</h3>
                  <p className="text-gray-400 text-sm">
                    Each NFC tag contains cryptographically secure data that cannot be copied or forged, 
                    ensuring absolute authenticity.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mt-1 bg-amber-500/10 p-2 rounded-full">
                  <Smartphone className="h-5 w-5 text-amber-500" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold mb-2">Instant Mobile Verification</h3>
                  <p className="text-gray-400 text-sm">
                    Any NFC-enabled smartphone can verify authenticity in seconds, with no special 
                    apps required. Just tap and confirm.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-amber-500 to-amber-700 rounded-full absolute -top-10 -right-10 w-40 h-40 blur-3xl opacity-20"></div>
            
            {/* Phone mockup with NFC scan animation */}
            <div className="relative z-10 mx-auto max-w-xs">
              <div className="border-8 border-gray-800 rounded-3xl overflow-hidden shadow-xl">
                <div className="aspect-[9/19] bg-gray-900 relative">
                  {/* App interface mockup */}
                  <div className="absolute inset-0 flex flex-col">
                    <div className="bg-black h-12 flex items-center justify-center">
                      <div className="w-20 h-6 bg-gray-900 rounded-full"></div>
                    </div>
                    
                    <div className="flex-1 bg-gradient-to-b from-gray-900 to-black p-4 flex flex-col items-center justify-center">
                      <div className="w-full max-w-[200px] mx-auto">
                        <div className="w-24 h-24 rounded-full bg-amber-500/20 mx-auto mb-6 flex items-center justify-center">
                          <ShieldCheck className="h-10 w-10 text-amber-500" />
                        </div>
                        
                        <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
                          <div className="h-3 w-4/5 bg-amber-500/30 rounded-full mb-3"></div>
                          <div className="h-3 w-full bg-amber-500/30 rounded-full mb-3"></div>
                          <div className="h-3 w-2/3 bg-amber-500/30 rounded-full"></div>
                        </div>
                        
                        <div className="mt-8 bg-amber-500 text-black font-medium text-sm py-2 px-4 rounded-md text-center">
                          Artwork Verified
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* NFC waves animation */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">NFC</span>
                  </div>
                  <div className="absolute inset-0 border-2 border-amber-500 rounded-full animate-ping" style={{ animationDuration: "1.5s" }}></div>
                  <div className="absolute inset-0 border-2 border-amber-500 rounded-full animate-ping" style={{ animationDuration: "2s", animationDelay: "0.5s" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NfcShowcase;
