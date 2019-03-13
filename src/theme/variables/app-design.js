import standard from './standard';
import platform from './platform';
import Scale from '../../utils/Scale';

export default {
  ...standard,
  LightButton: {
    // paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 40,
    marginBottom: 16,
    width: '80%',
    maxWidth: Scale.getSize(240),
  },
  LightButtonText: {
    textAlign: 'center',
    color: platform.primaryColor,
    fontWeight: 'bold',
    fontSize: Scale.getSize(18),
  },
  LightInput: {
    // color: '#fff',
    paddingVertical: Scale.getSize(5),
    flex: 1
  },

  Button: {
    ...standard.Button,
    backgroundColor: platform.navigationBg
  },
  Text: {
    color: '#fff'
  },
  Content: {
    foreground: '#ffffff',
    backgroundColor: '#eeeeee'
  }
};
