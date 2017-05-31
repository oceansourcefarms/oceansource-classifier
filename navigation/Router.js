import { createRouter } from '@expo/ex-navigation';

import BarCodeScannerScreen from '../screens/BarCodeScannerScreen';
import ExponentScreen from '../screens/ExponentScreen';
import SensorScreen from '../screens/SensorScreen';
import GLViewScreen from '../screens/GLViewScreen';
import FacebookAdsScreen from '../screens/FacebookAdsScreen';
import HomeScreen from '../screens/HomeScreen';
import ListScreen from '../screens/ListScreen';
import CameraScreen from '../screens/CameraScreen';
import SVGScreen from '../screens/SVGScreen';
import LottieScreen from '../screens/LottieScreen';
import MapsScreen from '../screens/MapsScreen';

export default createRouter(() => ({
  barCodeScanner: () => BarCodeScannerScreen,
  exponent: () => ExponentScreen,
  glView: () => GLViewScreen,
  facebookAds: () => FacebookAdsScreen,
  home: () => HomeScreen,
  list: () => ListScreen,
  camera: () => CameraScreen,
  sensor: () => SensorScreen,
  svg: () => SVGScreen,
  lottie: () => LottieScreen,
  maps: () => MapsScreen,
}));
