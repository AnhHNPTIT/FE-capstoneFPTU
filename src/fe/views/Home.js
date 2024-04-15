import React, { useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Popover from 'react-native-popover-view';

const MyComponent = () => {
    const [isOptionVisible, setOptionVisible] = useState(false);
    const [data, setData] = useState([
        {id: '1', title: 'Mr.Duc-HaDong', image: 'https://via.placeholder.com/150'},
        {id: '2', title: 'Mr.Vinh-ThaiBinh', image: 'https://via.placeholder.com/150'},
        {id: '3', title: 'Mr.Thanh-MyDinh', image: 'https://via.placeholder.com/150'},
        {id: '4', title: 'Mr.Hai-ThachThat', image: 'https://via.placeholder.com/150'},
        {id: '5', title: 'Mr.HoangAnh-HoaiDuc', image: 'https://via.placeholder.com/150'},
        {id: '6', title: 'Mr.Khai-QuangNinh', image: 'https://via.placeholder.com/150'},
    ]);

    const options = [
        {label: 'Chung cư', onPress: () => console.log('Option 1 selected')},
        {label: 'Nhà Phố', onPress: () => console.log('Option 1 selected')},
        {label: 'Biệt thự', onPress: () => console.log('Option 1 selected')},
        {label: 'Văn Phòng, Spa, Shop', onPress: () => console.log('Option 1 selected')},
        {label: 'Coffee, Movie Box', onPress: () => console.log('Option 1 selected')},
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => console.log('Image button pressed')}>
                    <Image
                        source={require('./assets/ic_home.svg')}
                        style={{width: 30, height: 30}}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.textbutton}>Account</Text></TouchableOpacity>

                <TouchableOpacity style={styles.optionButton} onPress={() => setOptionVisible(true)}>
                    <Text style={styles.textbutton}>Project</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}><Text style={styles.textbutton}>Manager</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.textbutton}>Designer</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.textbutton}>Customer</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.textbutton}>Blogs</Text></TouchableOpacity>
                <TouchableOpacity style={styles.button}><Text style={styles.textbutton}>About</Text></TouchableOpacity>

                <Popover
                    isVisible={isOptionVisible}
                    onRequestClose={() => setOptionVisible(false)}
                >
                    {options.map((option, index) => (
                        <TouchableOpacity key={index} onPress={option.onPress}>
                            <Text style={styles.popupOption}>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </Popover>
            </View>
            <ScrollView>
                <Image
                    source={require('./assets/img_home.png')}
                    style={styles.image}
                />


                <FlatList
                    data={data}
                    renderItem={({item}) => (
                        <TouchableOpacity style={styles.item}>
                            <Image
                                source={require('./assets/img_home.png')}
                                style={{width: 100, height: 100}}
                            />
                            <Text>{item.title}</Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                />
            </ScrollView>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#000000',
    },
    optionButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
    },
    popupOption: {
        padding: 10,
        fontSize: 16,
        color: 'black',
    },
    image: {
        width: '100%',
        height: 500,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    item: {
        flex: 1,
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        margin: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    textbutton: {
        color:'#fff'
    }

});

export default MyComponent;
