import { BannerAd, BannerAdSize, TestIds } from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.BANNER : 'YOUR_REAL_AD_UNIT_ID_HERE';

export default function AppBannerAd() {
  return (
    <BannerAd
      unitId={adUnitId}
      size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
    />
  );
}