import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Lock, Loader2, X } from "lucide-react";
import { templates } from "@/data/products";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import AuthModal from "./AuthModal";
import { jsPDF } from "jspdf";

const FormatSelectionModal = ({ isOpen, onClose, onSelect, templateName, isDownloading }) => {
  if (!isOpen) return null;

  const formats = [
    { value: 'png', label: 'PNG', description: 'High quality with transparency support', recommended: true },
    { value: 'jpg', label: 'JPG', description: 'Smaller file size, good for photos' },
    { value: 'pdf', label: 'PDF', description: 'Document format, good for printing' }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          disabled={isDownloading}
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="text-lg font-semibold text-gray-900 mb-2">Choose Download Format</h3>
        <p className="text-sm text-gray-600 mb-6">Select the format for "{templateName}"</p>

        <div className="space-y-3">
          {formats.map((format) => (
            <button
              key={format.value}
              onClick={() => onSelect(format.value)}
              disabled={isDownloading}
              className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900">{format.label}</span>
                    {format.recommended && (
                      <Badge className="bg-black text-white text-xs">Recommended</Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{format.description}</p>
                </div>
                {isDownloading && (
                  <Loader2 className="h-4 w-4 animate-spin text-black" />
                )}
              </div>
            </button>
          ))}
        </div>

        {isDownloading && (
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Converting and downloading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

const ImageSection = () => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [formatModalOpen, setFormatModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [downloadingIds, setDownloadingIds] = useState(new Set());
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const convertImageToFormat = async (imageUrl, format) => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.crossOrigin = 'anonymous';

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;

        if (format === 'jpg') {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);

        const mimeType = format === 'png' || format === 'pdf' ? 'image/png' : 'image/jpeg';
        const quality = format === 'jpg' ? 0.9 : 1.0;

        canvas.toBlob((blob) => resolve(blob), mimeType, quality);
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageUrl;
    });
  };

  const createPDF = async (imageBlob, templateName) => {
    const pdf = new jsPDF();
    const imageDataUrl = await blobToDataURL(imageBlob);
    const imgProps = pdf.getImageProperties(imageDataUrl);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imageDataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
    return pdf.output('blob');
  };

  const blobToDataURL = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const downloadBlob = (blob, filename) => {
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  };

  const handleFormatSelect = async (format) => {
    if (!selectedTemplate) return;

    setDownloadingIds((prev) => new Set([...prev, selectedTemplate.id]));

    try {
      const downloads = JSON.parse(sessionStorage.getItem('eduprint_downloads') || '[]');
      downloads.push({
        templateId: selectedTemplate.id,
        templateName: selectedTemplate.name,
        format: format.toUpperCase(),
        downloadDate: new Date().toISOString()
      });
      sessionStorage.setItem('eduprint_downloads', JSON.stringify(downloads));

      const filename = `${selectedTemplate.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${format}`;
      let blob;

      if (format === 'pdf') {
        const pngBlob = await convertImageToFormat(selectedTemplate.image, 'png');
        blob = await createPDF(pngBlob, selectedTemplate.name);
      } else {
        blob = await convertImageToFormat(selectedTemplate.image, format);
      }

      downloadBlob(blob, filename);

      toast({
        title: "Download completed",
        description: `${selectedTemplate.name} downloaded as ${format.toUpperCase()}.`,
      });

    } catch (error) {
      console.error('Download error:', error);

      try {
        const response = await fetch(selectedTemplate.image);
        const blob = await response.blob();
        const fallbackExt = selectedTemplate.image.split('.').pop() || 'jpg';
        const fallbackName = `${selectedTemplate.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.${fallbackExt}`;
        downloadBlob(blob, fallbackName);

        toast({
          title: "Download completed",
          description: `Downloaded in original format due to conversion issue.`,
        });
      } catch (fallbackError) {
        toast({
          title: "Download failed",
          description: "There was an error downloading the file. Please try again.",
          variant: "destructive"
        });
      }
    } finally {
      setDownloadingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(selectedTemplate.id);
        return newSet;
      });
      setFormatModalOpen(false);
      setSelectedTemplate(null);
    }
  };

  const handleDownload = (template) => {
    if (!isAuthenticated) {
      setIsAuthOpen(true);
      return;
    }

    setSelectedTemplate(template);
    setFormatModalOpen(true);
  };
  

  return (
    <>
      <section id="free-templates" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-12">
            <h2 className="text-4xl font-normal text-black mb-8">Free Templates & Resources</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Download professional templates and promotional materials for your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {templates.map((template) => {
              const isDownloading = downloadingIds.has(template.id);

              return (
                <Card
                  key={template.id}
                  className="group border-0 shadow-none hover:shadow-lg transition-all duration-300 overflow-hidden bg-white"
                >
                  <div className="relative bg-gray-50 aspect-square">
                    <img
                      src={template.image}
                      alt={template.name}
                      className="w-full h-full object-contain group-hover:scale-95 transition-transform duration-300"
                      crossOrigin="anonymous"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-black text-white text-xs px-2 py-1 font-normal">
                        Free
                      </Badge>
                    </div>
                    {!isAuthenticated && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Lock className="h-8 w-8 text-white" />
                      </div>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-medium text-black text-base mb-1">{template.name}</h3>
                        <p className="text-sm text-gray-600">{template.description}</p>
                      </div>

                      <Button
                        className={`w-full ${isAuthenticated ? 'bg-black text-white hover:bg-gray-800' : 'bg-white text-black border border-gray-300 hover:bg-gray-50'}`}
                        onClick={() => handleDownload(template)}
                        disabled={isDownloading}
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Downloading...
                          </>
                        ) : isAuthenticated ? (
                          <>
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </>
                        ) : (
                          <>
                            <Lock className="h-4 w-4 mr-2" />
                            Login to Download
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      <FormatSelectionModal
        isOpen={formatModalOpen}
        onClose={() => {
          if (!downloadingIds.has(selectedTemplate?.id)) {
            setFormatModalOpen(false);
            setSelectedTemplate(null);
          }
        }}
        onSelect={handleFormatSelect}
        templateName={selectedTemplate?.name}
        isDownloading={selectedTemplate && downloadingIds.has(selectedTemplate.id)}
      />
    </>
  );
};

export default ImageSection;