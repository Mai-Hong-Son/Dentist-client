import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
// import { Container, Content, Text, Button, View, Body } from 'react-native';
import SafeArea from '../../components/SafeArea';
import Button2 from '../../theme/components/Button';
import * as commonActions from '../../store/actions/common';
import { ThemeContext } from '../../theme/theme-context';

@connect(null, { ...commonActions })
export default class Setting extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  render() {
    return <View />;
    // return (
    //   <SafeArea>
    //     <Container>
    //       <Content padder>
    //         <Body>
    //           <Text>Change language</Text>
    //         </Body>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             marginTop: 20
    //           }}
    //         >
    //           <Button
    //             testID="thailand"
    //             small
    //             success
    //             onPress={() => this.props.changeLanguage('th')}
    //           >
    //             <Text>Thailand</Text>
    //           </Button>
    //           <Button
    //             testID="english"
    //             small
    //             warning
    //             onPress={() => this.props.changeLanguage('en')}
    //           >
    //             <Text>English</Text>
    //           </Button>
    //           <Button
    //             testID="vietnamese"
    //             small
    //             error
    //             onPress={() => this.props.changeLanguage('vi')}
    //           >
    //             <Text>Vietnamese</Text>
    //           </Button>
    //         </View>
    //       </Content>
    //     </Container>
    //   </SafeArea>
    // );

    // return (
    //   <SafeArea>
    //     <Container>
    //       <Content padder>
    //         <Body>
    //           <Text>Change language</Text>
    //         </Body>
    //         <View
    //           style={{
    //             flexDirection: 'row',
    //             justifyContent: 'space-between',
    //             alignItems: 'center',
    //             marginTop: 20
    //           }}
    //         >
    //           <Button
    //             testID="thailand"
    //             small
    //             success
    //             onPress={() => this.props.changeLanguage('th')}
    //           >
    //             <Text>Thailand</Text>
    //           </Button>
    //           <Button
    //             testID="english"
    //             small
    //             warning
    //             onPress={() => this.props.changeLanguage('en')}
    //           >
    //             <Text>English</Text>
    //           </Button>
    //           <Button
    //             testID="vietnamese"
    //             small
    //             error
    //             onPress={() => this.props.changeLanguage('vi')}
    //           >
    //             <Text>Vietnamese</Text>
    //           </Button>
    //         </View>
    //         <Body>
    //           <Text>Change Theme</Text>
    //         </Body>
    //         <View>
    //           <ThemeContext.Consumer>
    //             {({ toggleTheme }) => (
    //               <Button2 testID="changeTheme" onPress={toggleTheme}>
    //                 <Text>Thailand</Text>
    //               </Button2>
    //             )}
    //           </ThemeContext.Consumer>
    //         </View>
    //       </Content>
    //     </Container>
    //   </SafeArea>
    // );
  }
}
