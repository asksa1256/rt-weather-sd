import LogoImg from '@/shared/assets/images/logo.png';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import FavoriteList from '@/widgets/favorites/ui/FavoriteList';
import { Menu, Star } from 'lucide-react';
import { useState } from 'react';
import { Button } from './button/button';

const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md'>
      <div className='mx-auto flex h-16 items-center justify-between px-4 md:max-w-[600px] md:px-0'>
        {/* 로고 */}
        <div className='flex items-center gap-2'>
          <img src={LogoImg} alt='로고 이미지' className='w-8' />
          <h1 className='text-xl font-bold tracking-tight text-gray-900'>
            RealCast
          </h1>
        </div>

        {/* 즐겨찾기 사이드바(Drawer) */}
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
                    <Button variant='ghost'>닫기</Button>
                  </DrawerClose>
                </div>
              </DrawerHeader>

              <div className='flex-1 overflow-y-auto p-6'>
                <FavoriteList onCloseDrawer={() => setIsDrawerOpen(false)} />
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </header>
  );
};

export default Header;
