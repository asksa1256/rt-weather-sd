import { cn } from '@/shared/lib/utils/utils';
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
  open?: boolean;
  isSubmitting?: boolean;
  onConfirm: (newName: string) => void;
  onClose?: () => void;
}

const EditFavoriteNameDialog = ({
  initialName,
  open,
  isSubmitting,
  onConfirm,
  onClose,
}: EditFavoriteNameDialogProps) => {
  const [editValue, setEditValue] = useState(initialName);
  const [editError, setEditError] = useState<string | null>(null);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setEditError(null);
      onClose?.();
    }
  };

  const trimmed = editValue.trim();
  const isValid = trimmed.length >= 1 && trimmed.length <= 10;
  const isDirty = trimmed !== initialName;

  const handleUpdate = () => {
    if (!isValid) {
      setEditError('별칭은 1자 이상, 10자 이하로 입력해주세요.');
      return;
    }

    onConfirm(trimmed);
    setEditError(null);
  };

  const handleChange = (value: string) => {
    setEditValue(value);

    // 입력 중 실시간 검증
    if (value.trim().length >= 1) {
      setEditError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>장소 별칭 수정</DialogTitle>
        </DialogHeader>

        <div className='flex flex-col gap-2'>
          <input
            autoFocus
            value={editValue}
            className={cn(
              'w-full rounded-lg border-2 px-3 py-2 transition-colors outline-none',
              editError
                ? 'border-red-500/50 bg-red-50 focus:border-red-500'
                : 'border-gray-200 focus:border-blue-500 focus:bg-blue-50',
            )}
            onChange={e => handleChange(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') handleUpdate();
            }}
          />

          {editError && <p className='text-xs text-red-500'>{editError}</p>}
        </div>

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
            disabled={!isValid || !isDirty || isSubmitting}
            onClick={handleUpdate}
          >
            {isSubmitting ? '저장중...' : '저장'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditFavoriteNameDialog;
