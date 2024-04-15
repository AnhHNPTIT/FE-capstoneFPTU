import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CheckBox } from "react-native-web";

const App = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [selectedTab, setSelectedTab] = useState('email');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false); // State để lưu trạng thái của CheckBox

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleSubmit = () => {
        // Xử lý logic khi người dùng nhấn nút hoặc gửi form
        console.log('Password:', password);
    };
    const handleLogin = () => {
        if (selectedTab === 'email') {
            // Xử lý đăng nhập bằng email
            console.log('Email:', email);
        } else {
            // Xử lý đăng nhập bằng số điện thoại
            console.log('Phone:', phone);
        }
    };

    return (
        <View style={styles.container}>
            {/* Phần ảnh bên trái */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('./assets/bg_login1.png')}
                    style={styles.image}
                />
            </View>

            {/* Phần form đăng nhập bên phải */}
            <View style={styles.loginContainer}>

                <Text style={styles.title}>Sign In</Text>
                {/* Tab Bar */}
                <View style={styles.tabBar}>
                    <TouchableOpacity
                        style={[styles.tabItem, selectedTab === 'email' && styles.selectedTabItem]}
                        onPress={() => setSelectedTab('email')}
                    >
                        <Text style={styles.tabText}>Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.tabItem, selectedTab === 'phone' && styles.selectedTabItem]}
                        onPress={() => setSelectedTab('phone')}
                    >
                        <Text style={styles.tabText}>Số điện thoại</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.belowTabbar}>
                    <View style={[styles.tabchoice, selectedTab === 'email' && styles.tabnotchoice]}></View>
                    <View style={[styles.tabchoice, selectedTab === 'phone' && styles.tabnotchoice]}></View>
                </View>

                {/* Phần form đăng nhập */}
                <View style={styles.formContainer}>
                    {selectedTab === 'email' ? (
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            onChangeText={text => setEmail(text)}
                            value={email}
                        />
                    ) : (
                        <TextInput
                            style={styles.input}
                            placeholder="Số điện thoại"
                            onChangeText={text => setPhone(text)}
                            value={phone}
                        />
                    )}
                    <TextInput
                        style={styles.input}
                        placeholder="Mật khẩu"
                        secureTextEntry={true} // Ẩn văn bản nhập vào
                        value={password}
                        onChangeText={handlePasswordChange}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>ĐĂNG NHẬP</Text>
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        marginTop: 15,
                        width: '100%',
                        paddingHorizontal: 15,
                        justifyContent: 'space-between'
                    }}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <CheckBox
                                checked={checked}
                                onPress={() => setChecked(!checked)}
                                containerStyle={{backgroundColor: 'transparent', borderWidth: 0}}
                                checkedColor="#ccc" // Màu của CheckBox khi được chọn
                            />
                            <Text style={{marginStart: 15}}>Ghi nhớ mật khẩu</Text>
                        </View>
                        <Text style={{marginEnd: 20}}>Quên mật khẩu</Text>
                    </View>
                    <View style={styles.layoutOr}>
                        <View style={styles.line}></View>
                        <Text style={styles.text}>Hoặc</Text>
                        <View style={styles.line}></View>
                    </View>
                    <View style={styles.layoutOr}>
                        <Image
                            source={require('./assets/ic_gmail.svg')}
                            style={{width: 30, height: 30}}
                        />
                        <Text style={{marginStart: 10, fontSize: 13}}>Đăng nhập bằng Gmail</Text>
                    </View>
                    <View style={styles.layoutOr}>
                        <Text style={{fontSize: 16}}>Bạn chưa có tài khoản ? </Text>
                        <Text style={{fontSize: 16, color: "#8d3636", fontWeight: 'bold'}}>Đăng ký</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    loginContainer: {
        flex: 1.5,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
        marginHorizontal: 20,
    },
    tabItem: {
        flex: 1,
        fontWeight: 'bold',
        backgroundColor: '#fff',
    },
    selectedTabItem: {
        fontWeight: 'bold',
        backgroundColor: '#fff',
    },
    tabText: {
        marginHorizontal: 20,
        fontSize: 16,
        fontWeight: 'bold'
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        marginBottom: 60,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 30,
        marginBottom: 10,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    button: {
        borderRadius: 30,
        width: "100%",
        backgroundColor: 'rgba(117,80,57,1)',
        paddingVertical: 12,
        marginTop: 15
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    belowTabbar: {
        width: '100%',
        height: 8,
        borderRadius: 30,
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: 'd9d9d9',
        justifyContent: 'space-around',
        marginTop: 15,
    },
    tabchoice: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#d9d9d9'
    },
    tabnotchoice: {
        borderRadius: 30,
        backgroundColor: '#a8653b'
    },
    layoutOr: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    line: {
        width: 200,
        height: 0.1,
        backgroundColor: '#000000',
    },
    text: {
        marginHorizontal: 20,
        color: 'black',
        fontSize: 16
    },
});

export default App;
