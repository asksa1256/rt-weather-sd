import { Button } from '@/shared/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog';
import { useState } from 'react';

interface EditFavoriteNameDialogProps {
  initialName: string;
  open: boolean;
  onConfirm: (newName: string) => void;
  onClose: () => void;
}

const EditFavoriteNameDialog = ({
  initialName,
  open,
  onConfirm,
  onClose,
}: EditFavoriteNameDialogProps) => {
  const [editValue, setEditValue] = useState(initialName);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  const handleUpdate = () => {
    const trimmed = editValue.trim();
    if (!trimmed) return;

    onConfirm(trimmed);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>장소 별칭 수정</DialogTitle>
        </DialogHeader>

        <input
          autoFocus
          value={editValue}
          className='w-full rounded-lg border-2 px-3 py-2 transition-colors outline-none focus-within:border-blue-500/50 focus-within:bg-blue-50/50'
          onChange={e => setEditValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') handleUpdate();
          }}
        />

        <DialogFooter className='mt-4'>
          <Button
            type='button'
            variant='outline'
            className='px-3 py-1 text-sm text-gray-500'
            onClick={() => handleOpenChange(false)}
          >
            취소
          </Button>

          <Button
            className='bg-primary hover:bg-primary-hover'
            onClick={handleUpdate}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFavoriteNameDialog;
