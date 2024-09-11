import { bodoniFont } from '@/lib/fonts';
import { cn } from '@/lib/utils';

const Information = () => {
  return (
    <div className="text-center">
      <h1
        className={cn(
          'pt-3 text-[30px] font-bold text-black md:text-[36px] xl:pt-5 xl:text-[44px] 2xl:pt-8 2xl:text-[60px]',
          bodoniFont.className
        )}
      >
        ¿QUERÉS DESFILAR?
      </h1>
      <p className="text-balance pt-2 text-base md:text-lg xl:pt-3 2xl:pt-5">
        En Expo Desfiles tenemos la oportunidad que estabas esperando.
        {/* Vas a recibir entrenamientos y vas a poder desfilar <strong>¡GRATIS!</strong> */}
      </p>
      <h3
        className={cn(
          'pb-3 pt-2 text-[25px] font-bold md:text-[28px] lg:pb-5 xl:pt-3 xl:text-[30px] 2xl:pt-5 2xl:text-[40px]',
          bodoniFont.className
        )}
      >
        ¿Te interesa?
      </h3>
    </div>
  );
};

export default Information;
