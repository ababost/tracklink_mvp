"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, File, X } from 'lucide-react';

interface UploadedFile {
  file: File;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

export function UploadZone() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const,
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress for each file
    newFiles.forEach(fileObj => {
      const interval = setInterval(() => {
        setFiles(prevFiles => {
          const fileIndex = prevFiles.findIndex(f => f.file === fileObj.file);
          if (fileIndex === -1) return prevFiles;

          const updatedFiles = [...prevFiles];
          const currentFile = updatedFiles[fileIndex];

          if (currentFile.progress >= 100) {
            clearInterval(interval);
            updatedFiles[fileIndex] = { ...currentFile, status: 'complete' };
          } else {
            updatedFiles[fileIndex] = {
              ...currentFile,
              progress: currentFile.progress + 10,
            };
          }

          return updatedFiles;
        });
      }, 500);
    });
  }, []);

  const removeFile = (fileToRemove: File) => {
    setFiles(files.filter(f => f.file !== fileToRemove));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg'],
      'audio/*': ['.mp3', '.wav'],
    },
  });

  return (
    <div className="space-y-4">
      <Card
        {...getRootProps()}
        className={`border-2 border-dashed cursor-pointer ${isDragActive ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
      >
        <CardContent className="py-10 text-center">
          <input {...getInputProps()} />
          <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
          <p className="text-sm text-gray-600">
            {isDragActive
              ? 'Drop the files here'
              : 'Drag & drop files here, or click to select files'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Supported formats: PDF, PNG, JPG, MP3, WAV
          </p>
        </CardContent>
      </Card>

      {/* File List */}
      <div className="space-y-2">
        {files.map(({ file, progress, status }) => (
          <Card key={file.name} className="relative">
            <CardContent className="py-3 pr-10">
              <div className="flex items-center gap-3">
                <File className="w-5 h-5 text-gray-400" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{file.name}</p>
                  <p className="text-xs text-gray-400">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {status === 'uploading' && (
                    <Progress value={progress} className="h-1 mt-2" />
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(file);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
