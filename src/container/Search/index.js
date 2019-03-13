import React from 'react';
import faker from 'faker';
import { connect } from 'react-redux';
// import numeral from 'numeral';
import I18n from 'react-native-i18n';
import { View, Text } from 'react-native';
import SearchField from './SearchField';
import SafeArea from '../../components/SafeArea';
import images from '../../assets/images';
import { getCurrencyByLocale } from '../../assets/locales';

@connect(null)
export default class extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  constructor(props) {
    super(props);
    this.currencySymbol = `${getCurrencyByLocale(this.props.locale)}0,0.00`;
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: i,
        price: faker.commerce.price(),
        name: faker.commerce.productName()
      });
    }
    this.setState({ data });
  }

  render() {
    return (<View />);
    // return (
    //   <Container>
    //     <SafeArea>
    //       <SearchField />
    //       <Content>
    //         <List
    //           dataArray={this.state.data}
    //           renderRow={item => (
    //             <ListItem avatar>
    //               <Left>
    //                 <Thumbnail small defaultSource={images.defaultAvatar} />
    //               </Left>
    //               <Body>
    //                 <Text>{item.name}</Text>
    //                 <Text note>{I18n.t('product.price', { price: item.price })}</Text>
    //               </Body>
    //             </ListItem>
    //           )}
    //         />
    //       </Content>
    //     </SafeArea>
    //   </Container>
    // );
  }
}
