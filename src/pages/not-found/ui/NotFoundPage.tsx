import MainButton from '@/shared/ui/button/MainButton';

const NotFoundPage = () => {
  return (
    <div className='bg-background flex min-h-[300px] flex-col items-center justify-center gap-4 px-4 text-center'>
      <div className='relative flex items-center justify-center'>
        <h2 className='text-primary relative text-8xl font-black drop-shadow-sm select-none'>
          404
        </h2>
      </div>

      <h2 className='mb-2 text-2xl font-bold tracking-tight text-gray-700 sm:text-3xl'>
        페이지를 찾을 수 없습니다.
      </h2>

      <div className='flex flex-col gap-3 sm:flex-row'>
        <MainButton />
      </div>
    </div>
  );
};

export default NotFoundPage;
