import React from 'react';
import PropTypes from 'prop-types';
import Image from 'react-native-fast-image';
import { View } from 'react-native';
// import { Container, Content, Text, Button, Card, Left, Icon, CardItem, View } from 'native-base';
import images from '../../../assets/images';
import platform from '../../../theme/variables/platform';

export default class ProductDetails extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true
  };

  static navigatorButtons = {
    rightButtons: [
      {
        id: 'add_to_cart',
        title: 'Cart'
      }
    ]
  };

  static propTypes = {
    item: PropTypes.object.isRequired
  };

  render() {
    const { item, navigator } = this.props;
    return <View />;
    // return (
    //   <Container>
    //     <Content>
    //       <Card full transparent>
    //         <CardItem cardBody>
    //           <Image
    //             source={images.food_01}
    //             style={{
    //               width: null,
    //               height: 200,
    //               flex: 1,
    //               backgroundColor: '#F6F7F*'
    //             }}
    //           />
    //         </CardItem>

    //         <CardItem cardFooter>
    //           <Left>
    //             <Text>${item.price}</Text>
    //           </Left>
    //           <Button small warning iconLeft>
    //             <Icon ios="ios-cart" android="md-cart" style={{ fontSize: 20 }} />
    //             <Text>Add to cart</Text>
    //           </Button>
    //         </CardItem>

    //         <CardItem content>
    //           <Text>{item.description}</Text>
    //         </CardItem>
    //         <View style={{ paddingHorizontal: platform.contentPadding }}>
    //           <Section title="Related food" navigator={navigator} numItems={4} />
    //         </View>
    //       </Card>
    //     </Content>
    //   </Container>
    // );
  }
}
