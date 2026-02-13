import LogoImg from '@/shared/assets/images/logo.png';
import { Link } from 'react-router-dom';
import FavoriteDrawer from '@/entities/favorites/ui/FavoriteDrawer';

const Header = () => {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md'>
      <div className='mx-auto flex h-16 items-center justify-between px-4 md:max-w-[600px] md:px-0'>
        {/* 로고 */}
        <Link to='/' className='flex items-center gap-2' title='리얼캐스트 메인으로 이동'>
          <img src={LogoImg} alt='로고 이미지' className='w-8' />
          <h1 className='text-xl font-bold tracking-tight text-gray-900'>
            RealCast
          </h1>
        </Link>

        {/* 즐겨찾기 사이드바 */}
        <FavoriteDrawer />
      </div>
    </header>
  );
};

export default Header;
