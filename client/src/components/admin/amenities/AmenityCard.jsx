import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Building2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const AmenityCard = ({ 
  amenity, 
  onEdit, 
  onDelete, 
  isLoading = false,
  isRTL = false 
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className={cn(
        "group relative overflow-hidden border border-white/5 bg-[#0a0a0a]/60 backdrop-blur-xl hover:border-gold-500/20 transition-all duration-300",
        "hover:shadow-lg hover:shadow-gold-500/5",
        isRTL && "text-right"
      )}>
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-gold-500/10 via-transparent to-gold-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <CardContent className="p-6 relative pb-20">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 flex items-center justify-center group-hover:bg-gold-500/20 transition-colors duration-300">
                <Building2 className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-gold-400 transition-colors duration-300">
                  {amenity.name}
                </h3>
                <Badge variant="outline" className="text-xs border-white/10 text-slate-400">
                  ID: {amenity.id}
                </Badge>
              </div>
            </div>

            {/* Actions Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-white/5"
                  disabled={isLoading}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align={isRTL ? "start" : "end"} 
                className="bg-[#0a0a0a] border-white/10"
              >
                <DropdownMenuItem 
                  onClick={() => onEdit(amenity)}
                  className="text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer"
                >
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => onDelete(amenity)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Description/Metadata */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <span>Created</span>
              <span className="text-white">•</span>
              <span>{formatDate(amenity.createdAt)}</span>
            </div>
            
            {amenity.updatedAt !== amenity.createdAt && (
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <span>Updated</span>
                <span className="text-white">•</span>
                <span>{formatDate(amenity.updatedAt)}</span>
              </div>
            )}
          </div>

          {/* Hover Action Buttons */}
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(amenity)}
                disabled={isLoading}
                className="h-8 px-3 border-white/10 text-slate-300 hover:text-gold-400 hover:border-gold-500/20 bg-[#0a0a0a]/90 backdrop-blur-sm"
              >
                <Edit2 className="h-3 w-3 mr-1" />
                Edit
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(amenity)}
                disabled={isLoading}
                className="h-8 px-3 border-red-500/20 text-red-400 hover:text-red-300 hover:border-red-500/40 bg-[#0a0a0a]/90 backdrop-blur-sm"
              >
                <Trash2 className="h-3 w-3 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AmenityCard;
