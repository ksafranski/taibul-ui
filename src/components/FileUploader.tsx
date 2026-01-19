"use client";

import React, { useRef, useState } from 'react';
import { Upload, File, X, CloudUpload, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { Text } from './Typography';

interface FileUploaderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  variant?: 'button' | 'dropzone';
  multiple?: boolean;
  accept?: string;
  label?: string;
  description?: string;
  onChange?: (files: File[]) => void;
  maxSize?: number; // In bytes
  className?: string;
}

export const FileUploader = React.forwardRef<HTMLDivElement, FileUploaderProps>(({
  variant = 'dropzone',
  multiple = false,
  accept,
  label,
  description,
  onChange,
  maxSize,
  className = '',
  ...props
}, ref) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (newFiles: FileList | null) => {
    if (!newFiles) return;
    
    setError(null);
    const incomingFiles = Array.from(newFiles);
    
    // Validate size if maxSize is provided
    if (maxSize) {
      const oversized = incomingFiles.find(f => f.size > maxSize);
      if (oversized) {
        setError(`File ${oversized.name} is too large. Max size is ${(maxSize / 1024 / 1024).toFixed(1)}MB.`);
        return;
      }
    }

    const updatedFiles = multiple ? [...files, ...incomingFiles] : [incomingFiles[0]];
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    onChange?.(updatedFiles);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div ref={ref} className={`flex flex-col gap-4 w-full ${className}`} {...props}>
      {label && (
        <label className="text-sm font-medium leading-none pl-[3px]">
          {label}
        </label>
      )}
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFiles(e.target.files)}
        multiple={multiple}
        accept={accept}
        className="hidden"
      />

      {variant === 'button' ? (
        <div className="flex flex-col gap-2 items-start">
          <Button
            type="button"
            variant="outline"
            leftIcon={Upload}
            onClick={handleClick}
          >
            {files.length > 0 ? 'Upload More' : 'Choose File'}
          </Button>
          {description && <Text variant="small" className="text-muted-foreground">{description}</Text>}
        </div>
      ) : (
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={handleClick}
          className={`
            relative flex flex-col items-center justify-center w-full min-h-[200px] p-8
            border-2 border-dashed rounded-xl transition-all cursor-pointer group
            ${isDragging 
              ? 'border-primary bg-primary/5 scale-[0.99] shadow-inner' 
              : 'border-border hover:border-primary/50 hover:bg-accent/30'}
          `}
        >
          <div className={`
            p-4 rounded-full bg-accent/50 mb-4 transition-transform duration-300
            ${isDragging ? 'scale-110' : 'group-hover:scale-105'}
          `}>
            <CloudUpload 
              className={`w-8 h-8 transition-colors ${isDragging ? 'text-primary' : 'text-muted-foreground group-hover:text-primary/70'}`} 
            />
          </div>
          
          <div className="text-center">
            <Text className="font-semibold mb-1">
              Click to upload or drag and drop
            </Text>
            <Text variant="small" className="text-muted-foreground">
              {description || (accept ? `Accepted formats: ${accept}` : 'All file types supported')}
            </Text>
          </div>

          {isDragging && (
            <div className="absolute inset-0 bg-primary/5 rounded-xl pointer-events-none flex items-center justify-center">
              <div className="bg-background px-4 py-2 rounded-full shadow-lg border border-primary/20 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-primary">Drop to upload</span>
              </div>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-500 text-xs pl-[3px] transition-all duration-200">
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2 mt-2">
          {files.map((file, index) => (
            <div 
              key={`${file.name}-${index}`}
              className="group flex items-center gap-3 p-3 rounded-lg border border-border bg-card hover:bg-accent/20 transition-all duration-200"
            >
              <div className="p-2 rounded-md bg-accent/50 text-primary">
                <File size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">{formatSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
                className="p-1.5 rounded-md text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

FileUploader.displayName = "FileUploader";
