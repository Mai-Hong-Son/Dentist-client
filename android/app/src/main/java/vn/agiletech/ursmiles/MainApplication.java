package vn.agiletech.ursmiles;

import android.content.Intent;

import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.facebook.CallbackManager;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.github.yamill.orientation.OrientationPackage;
import com.airbnb.android.react.lottie.LottiePackage;
import com.facebook.react.ReactPackage;
import com.crashlytics.android.Crashlytics;

import io.fabric.sdk.android.Fabric;

import com.reactnativenavigation.controllers.ActivityCallbacks;
import com.smixx.fabric.FabricPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.facebook.common.logging.FLog;
import com.reactnativenavigation.NavigationApplication;

import com.wix.interactable.Interactable;
import com.geektime.rnonesignalandroid.ReactNativeOneSignalPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;

import vn.agiletech.rnutils.RNUtilitiesPackage;
import vn.agiletech.fabricutil.ReactNativeFabricLogger;

import com.facebook.FacebookSdk;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import co.apptailor.googlesignin.RNGoogleSigninPackage;

import org.reactnative.camera.RNCameraPackage;

import java.util.Arrays;
import java.util.List;
import com.horcrux.svg.SvgPackage;

public class MainApplication extends NavigationApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }


    @Override
    public boolean isDebug() {
        // Make sure you are using BuildConfig from your own application
        return BuildConfig.DEBUG;
    }

    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
                new FabricPackage(),
                new VectorIconsPackage(),
                new ImagePickerPackage(),
                new RNI18nPackage(),
                new OrientationPackage(),
                new LottiePackage(),
                new RNUtilitiesPackage(),
                new LinearGradientPackage(),
                new FBSDKPackage(getCallbackManager()),
                new RNFetchBlobPackage(),
                new RNCameraPackage(),
                new SvgPackage(),
                new FastImageViewPackage(),
                new RNGoogleSigninPackage(),
                new Interactable(),
                new MainReactPackage(),
                new ReactNativeOneSignalPackage(),
                new PickerPackage()
                );
    }

    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return getPackages();
    }

    @Override
    public String getJSMainModuleName() {
        return "index";
    }

    @Override
    public void onCreate() {
        super.onCreate();
        FLog.setLoggingDelegate(ReactNativeFabricLogger.getInstance());
        Fabric.with(this, new Crashlytics());

        setActivityCallbacks(new ActivityCallbacks() {
            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
                getCallbackManager().onActivityResult(requestCode, resultCode, data);
            }
        });

        AppEventsLogger.activateApp(this);
    }
}
