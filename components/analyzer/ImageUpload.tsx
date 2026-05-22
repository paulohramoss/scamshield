"use client";

import { useCallback, useState, useRef } from "react";
import { ImageIcon, X, Upload, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface ImageUploadProps {
  onImageChange: (base64: string, mimeType: string) => void;
  onImageClear: () => void;
  disabled?: boolean;
}

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE_MB = 5;

export function ImageUpload({ onImageChange, onImageClear, disabled }: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      if (!ALLOWED_TYPES.includes(file.type)) {
        toast.error("Formato não suportado. Use PNG, JPG ou WEBP.");
        return;
      }
      if (file.size > MAX_SIZE_MB * 1024 * 1024) {
        toast.error(`Imagem muito grande. Limite de ${MAX_SIZE_MB}MB.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const base64 = dataUrl.split(",")[1];
        setPreview(dataUrl);
        onImageChange(base64, file.type);
      };
      reader.readAsDataURL(file);
    },
    [onImageChange]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleClear = () => {
    setPreview(null);
    onImageClear();
    if (inputRef.current) inputRef.current.value = "";
  };

  if (preview) {
    return (
      <div className="relative rounded-xl border-2 border-blue-200 bg-blue-50 overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2 bg-blue-100 border-b border-blue-200">
          <div className="flex items-center gap-2 text-sm text-blue-700 font-medium">
            <Eye className="h-4 w-4" />
            Imagem carregada
          </div>
          <button
            type="button"
            onClick={handleClear}
            disabled={disabled}
            className="text-blue-500 hover:text-red-500 transition-colors"
            aria-label="Remover imagem"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="p-3 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Preview do print enviado"
            className="max-h-48 max-w-full rounded-lg object-contain shadow-sm"
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-xl border-2 border-dashed transition-colors cursor-pointer",
        isDragging
          ? "border-blue-400 bg-blue-50"
          : "border-gray-200 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/50",
        disabled && "opacity-50 pointer-events-none"
      )}
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        disabled={disabled}
        className="sr-only"
        aria-label="Upload de imagem"
      />
      <div className="flex flex-col items-center justify-center py-6 px-4 gap-3 text-center">
        <div className="rounded-full bg-gray-100 p-3">
          {isDragging ? (
            <Upload className="h-6 w-6 text-blue-500" />
          ) : (
            <ImageIcon className="h-6 w-6 text-gray-400" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">
            {isDragging ? "Solte aqui" : "Enviar print/imagem"}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            PNG, JPG ou WEBP até {MAX_SIZE_MB}MB — arraste ou clique
          </p>
        </div>
      </div>
    </div>
  );
}
