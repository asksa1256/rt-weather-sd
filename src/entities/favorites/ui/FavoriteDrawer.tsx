import { Button } from '@/shared/ui/button/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import FavoriteList from '@/widgets/favorites/ui/FavoriteList';
import { Info, Menu, Star, X } from 'lucide-react';
import { useState } from 'react';

const FavoriteDrawer = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Drawer
      direction='right'
      open={isDrawerOpen}
      onOpenChange={setIsDrawerOpen}
    >
      <DrawerTrigger asChild>
        <Button variant='ghost' className='relative'>
          <Menu className='size-5' />
          <span>즐겨찾기</span>
        </Button>
      </DrawerTrigger>

      <DrawerContent className='top-0 right-0 left-auto mt-0 h-screen w-full rounded-none sm:w-[400px]'>
        <div className='mx-auto flex h-full w-full flex-col'>
          <DrawerHeader className='border-b px-6 py-4'>
            <div className='flex items-center justify-between'>
              <DrawerTitle className='flex items-center gap-2 text-2xl font-bold'>
                <Star className='size-5 fill-yellow-500 text-yellow-500' />
                즐겨찾기
              </DrawerTitle>
              <DrawerClose asChild>
                <Button variant='ghost' size='icon' title='즐겨찾기 닫기'>
                  <X className='size-5' />
                </Button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className='flex-1 overflow-y-auto p-4'>
            <p className='flex items-center gap-1 p-2 text-sm text-gray-500'>
              <Info className='size-3.5' /> 장소별 별칭을 수정할 수 있습니다.
            </p>
            <FavoriteList onCloseDrawer={() => setIsDrawerOpen(false)} />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FavoriteDrawer;
