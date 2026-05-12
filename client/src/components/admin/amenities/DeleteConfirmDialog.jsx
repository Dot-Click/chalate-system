import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const DeleteConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  isLoading = false,
  amenity = null,
  isRTL = false 
}) => {
  const handleConfirm = () => {
    onConfirm(amenity);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#0a0a0a] border border-white/10 text-white max-w-md">
        <DialogHeader>
          <DialogTitle className={cn(
            "flex items-center gap-3 text-xl font-semibold text-red-400",
            isRTL && "flex-row-reverse"
          )}>
            <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
            Delete Amenity
          </DialogTitle>
          <DialogDescription className="text-slate-400 mt-2">
            Are you sure you want to delete this amenity? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {amenity && (
          <div className="bg-red-500/5 border border-red-500/10 rounded-lg p-4 my-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-4 h-4 text-red-400" />
              </div>
              <div>
                <p className="font-medium text-white">{amenity.name}</p>
                <p className="text-sm text-slate-400">ID: {amenity.id}</p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 mb-6">
          <p className="text-sm text-slate-300">
            <span className="font-medium text-red-400">Warning:</span> Deleting this amenity will remove it from all chalets that currently have this amenity assigned.
          </p>
        </div>

        <div className={cn(
          "flex gap-3",
          isRTL && "flex-row-reverse"
        )}>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1 border-white/10 text-slate-300 hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
            className={cn(
              "flex-1 bg-red-500 hover:bg-red-600 text-white font-medium",
              "disabled:opacity-50 disabled:cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Trash2 className="w-4 h-4" />
                Delete Amenity
              </span>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteConfirmDialog;
