// useFonts.ts
import { useFonts } from 'expo-font';

const useCustomFonts = () => {
  const [fontsLoaded] = useFonts({
    'SOLARSPACEDEMO-Regular': require('../assets/fonts/SOLARSPACEDEMO-Regular.otf'),
    'SPACEMISSION': require('../assets/fonts/SPACEMISSION.otf'),
    'Rubik': require('../assets/fonts/RubikBubbles-Regular.ttf'),
    // Adicione outras fontes aqui
  });

  return fontsLoaded; // Retorna se as fontes estão carregadas
};

export default useCustomFonts;
