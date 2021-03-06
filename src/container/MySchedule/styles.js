import { StyleSheet, Dimensions } from 'react-native';
import Scale from '../../utils/Scale';

const { width: WINDOW_WIDTH } = Dimensions.get('window');


export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(250,250,250)',
        paddingVertical: Scale.getSize(25),
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemScroll: {
        padding: 25,
        marginRight: 15,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    itemEmty: {
        paddingHorizontal: Scale.getSize(40),
        paddingVertical: Scale.getSize(110),
        marginHorizontal: 15,
        width: (WINDOW_WIDTH - 45) / 2,
    },
    contentTop: {
        marginHorizontal: 15,
        paddingVertical: Scale.getSize(20),
        flex: 1
    },
    contentMiddle: {
        justifyContent: 'flex-end',
        paddingBottom: Scale.getSize(10),
        paddingVertical: Scale.getSize(20),
        marginHorizontal: 15,
    },
    title: {
        fontWeight: 'bold',
        fontSize: Scale.getSize(17),
        color: 'rgb(82,82,82)'
    },
    contentBottom: {
        justifyContent: 'flex-end',
        marginHorizontal: 15
    },
    date: {
        color: '#FE712F',
        fontSize: Scale.getSize(11),
        fontWeight: 'bold',
        paddingBottom: 10
    },
    time: {
        fontWeight: 'bold',
        fontSize: Scale.getSize(18),
        paddingBottom: 10,
        color: 'rgb(82,82,82)'
    },
    image: {
        shadowOffset: { width: 0, height: 2 },
        shadowColor: 'rgba(0, 0, 0, 0.7)',
        shadowOpacity: 0.7,
        elevation: 1,
        borderColor: 'black',
        borderRadius: 4,
        backgroundColor: '#fff',
    },
    name: {
        fontWeight: 'bold',
        fontSize: Scale.getSize(18),
        paddingTop: 10,
        color: 'rgb(82,82,82)',
        width: (WINDOW_WIDTH - 45 - (25 * 4)) / 2,
        textAlign: 'center',
    },
    code: { fontSize: Scale.getSize(9) },
    dentist: {
        color: 'rgb(82,82,82)',
        fontWeight: 'bold',
        fontSize: Scale.getSize(11)
    },
    titleDentist: {
        fontWeight: 'bold',
        color: 'rgb(168,168,168)',
        fontSize: Scale.getSize(11),
        paddingTop: 10
    },
    scaleImage: {
        height: Scale.getSize(45),
        width: Scale.getSize(45)
    },
    wrapFlatlistScroll: {
        // flex: 1
        paddingVertical: Scale.getSize(8)
    },
    contentContainerStyle: {
        paddingVertical: Scale.getSize(10),
        paddingLeft: 15,
        width: WINDOW_WIDTH,
    }
});
