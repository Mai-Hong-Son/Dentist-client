import { Navigation } from 'react-native-navigation';
// import RNUtils from 'react-native-agiletech';
import { HOC } from './utils/common';
import { NavigatorProvider } from './utils/withNavigator';

// TAB_BEGIN
import Home from './container/Home';
import MySchedule from './container/MySchedule';
// TAB_END

import SideBar from './container/SideBar';
import Profile from './container/Profile';
import Social from './container/Social';
import Search from './container/Search';
import Setting from './container/Setting';
import Notifications from './container/Notifications';

// AUTH
import Login from './container/Login';
import Register from './container/Register';
import ForgotPassword from './container/ForgotPassword';

// PRODUCT
import ProductList from './container/Product/ProductList';
import ProductDetails from './container/Product/ProductDetails';
import Booking from './container/Booking';
import ChooseDentist from './container/ChooseDentist';
import BookingInfo from './container/BookingInfo';
import Payment from './container/Payment';
import XRayLocation from './container/XRayLocation';
import Promotions from './container/Promotions';
import PromotionDetail from './container/Promotions/PromotionDetail';
import PromotionAlert from './container/Promotions/PromotionAlert';

//CONSULTING
import Consulting from './container/Consulting';
import ConsultingHistory from './container/Consulting/ConsultingHistory';
import Ask from './container/Consulting/Ask';
import SupportCenter from './container/Consulting/SupportCenter';
import SendPhotos from './container/Consulting/SendPhotos';
import TakePhotos from './container/Consulting/SendPhotos/TakePhotos';
import PhotoViewer from './container/Consulting/SendPhotos/TakePhotos/PhotoViewer';
import QuestionDetail from './container/Consulting/QuestionDetail';
import ImageViewer from './container/Consulting/SupportCenter/ImageViewer';

//COMMON SCREENS
// import Notification from './components/Notification';
import ModalConfirm from './components/ModalConfirm';
import Browser from './components/Browser';
import BrowserDialog from './components/Browser/Dialog';
import Header from './components/Header';
import ModalSuccess from './components/ModalSuccess';
import Tutorial from './container/Consulting/SendPhotos/Tutorial';
import ConfirmDialog from './container/Consulting/Common/Components/ConfirmDialog';
import AlertDialog from './container/Consulting/Common/Components/AlertDialog';
import FormModal from './container/Consulting/Common/Components/FormModal';
import SelectImageSource from './container/Consulting/Common/Components/SelectImageSource';
import NavBarCustom from './container/Consulting/Common/Elements/NavBarCustom';
import TakePhotoRegister from './container/Register/TakePhotoRegister';
import NotificationBell from './components/NotificationBell';
import PutPhoneNumber from './components/PutPhoneNumber';

import DeleteAllAlert from './container/Notifications/DeleteAllAlert';
import LoadingOverlay from './container/LoadingOverlay';
import EnhancedAlert from './components/EnhancedAlert';
import { ModalProvider } from './utils/withModal';

// all screen must listed here
const screens = [
  {
    id: 'forgot_password',
    screen: ForgotPassword,
    public: true
  },

  {
    id: 'home',
    screen: Home
  },
  {
    id: 'sidebar',
    screen: SideBar
  },
  {
    id: 'profile',
    screen: Profile
  },
  {
    id: 'social',
    screen: Social
  },
  {
    id: 'search',
    screen: Search
  },
  {
    id: 'setting',
    screen: Setting
  },
  {
    id: 'notifications',
    screen: Notifications
  },
  {
    id: 'login',
    screen: Login
  },
  {
    id: 'register',
    screen: Register
  },

  //Consulting
  {
    id: 'consulting',
    screen: Consulting
  },
  {
    id: 'consulting_history',
    screen: ConsultingHistory
  },
  {
    id: 'ask',
    screen: Ask
  },
  {
    id: 'support_center',
    screen: SupportCenter
  },
  {
    id: 'send_photos',
    screen: SendPhotos
  },
  {
    id: 'tutorial',
    screen: Tutorial
  },
  {
    id: 'take_photos',
    screen: TakePhotos
  },
  {
    id: 'photo_viewer',
    screen: PhotoViewer
  },
  {
    id: 'select_image_source',
    screen: SelectImageSource
  },
  {
    id: 'image_viewer',
    screen: ImageViewer
  },
  //Commons
  {
    id: 'modal_confirm',
    screen: ModalConfirm
  },
  {
    id: 'modal_success',
    screen: ModalSuccess
  },

  {
    id: 'notification',
    screen: Notifications
  },
  {
    id: 'browser',
    screen: Browser
  },
  {
    id: 'browser_dialog',
    screen: BrowserDialog
  },
  //Product
  {
    id: 'product_list',
    screen: ProductList
  },
  {
    id: 'product_details',
    screen: ProductDetails
  },
  {
    id: 'header',
    screen: Header
  },
  {
    id: 'booking',
    screen: Booking
  },
  {
    id: 'my_schedule',
    screen: MySchedule
  },
  {
    id: 'choose_dentist',
    screen: ChooseDentist
  },
  {
    id: 'booking_info',
    screen: BookingInfo
  },
  {
    id: 'payment',
    screen: Payment
  },
  {
    id: 'confirm_dialog',
    screen: ConfirmDialog
  },
  {
    id: 'alert_dialog',
    screen: AlertDialog
  },
  {
    id: 'form_modal',
    screen: FormModal
  },
  {
    id: 'xray_location',
    screen: XRayLocation
  },
  {
    id: 'question_detail',
    screen: QuestionDetail
  },
  {
    id: 'delete_all_alert',
    screen: DeleteAllAlert
  },
  {
    id: 'loading',
    screen: LoadingOverlay
  },
  {
    id: 'nav_bar',
    screen: NavBarCustom
  },
  {
    id: 'take_photo_register',
    screen: TakePhotoRegister
  },
  {
    id: 'promotions',
    screen: Promotions
  },
  {
    id: 'promotion_detail',
    screen: PromotionDetail
  },
  {
    id: 'promotion_alert',
    screen: PromotionAlert
  },
  {
    id: 'notification_bell',
    screen: NotificationBell
  },
  {
    id: 'put_phonenumber',
    screen: PutPhoneNumber
  },
  {
    id: 'enhanced_alert',
    screen: EnhancedAlert
  }
];

/**
 * Finding screen by id
 * If many duplicated screen id, just take the first one
 */
export const findScreenById = (id = null) => {
  if (!id || id.length === 0) {
    throw Error('Screen id is required.');
  }
  const result = screens.filter(screen => screen.id === id);
  if (!result || result.length === 0) {
    throw Error(`Screen id ${id} not found`);
  }
  const path = result[0].id;
  return path;
};

/**
 * Register all screen
 */
export const registerScreens = (store, Provider) =>
  screens.forEach(({ id, screen }) =>
    Navigation.registerComponent(
      id,
      () => ModalProvider(NavigatorProvider(HOC(screen))),
      store,
      Provider
    )
  );
