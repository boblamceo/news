import React from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, SafeAreaView, Button } from 'react-native';
import axios from 'axios';
import { Card } from 'react-native-elements';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';

export default function NewsList({ navigation }) {
    const [ news, setNews ] = React.useState([]);
    const [ searchQuery, setSearchQuery ] = React.useState('');
    const date = new Date();
    const currentDate = `${date.getUTCFullYear()}-${date.getMonth() + 1}-${date.getUTCDate()}`;
    React.useEffect(() => {
        setSearchQuery('');
    }, []);
    const find = (search) => {
        axios
            .get(
                `http://newsapi.org/v2/top-headlines?country=cn&q=${search}&from=${currentDate}&to=${currentDate}&sortBy=popularity&apiKey=889fa0ba853e4b8394713d2c0cf908cb`,
            )
            .then((res) => {
                setNews(res.data.articles);
            });
    };
    React.useEffect(() => {
        find('');
    }, []);
    const filterResults = (value) => {
        setSearchQuery(value);
        find(value);
    };
    let [ fontsLoaded ] = useFonts({
        Inter_900Black,
    });
    console.log(news);
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textInput}>
                <TextInput style={styles.input} onChangeText={filterResults} value={searchQuery} />
            </View>
            {!news || news.length === 0 ? (
                <Text style={{ alignSelf: 'center', fontSize: 100 }}>Not found</Text>
            ) : (
                <FlatList
                    data={news}
                    renderItem={({ item }) => (
                        <Card>
                            <Card.Title>{item.title}</Card.Title>
                            <Card.Divider />
                            <Card.Image
                                source={{
                                    uri:
                                        item.urlToImage ||
                                        'https://www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png',
                                }}
                                style={{ borderRadius: 10 }}
                            />
                            <Text style={{ margin: 10, fontFamily: 'Inter_900Black' }}>{item.description}</Text>
                            <Button
                                title="查看"
                                onPress={() => {
                                    navigation.navigate('文章', {
                                        title: item.title,
                                        image: item.urlToImage,
                                        author: item.source.name,
                                        content: item.description,
                                        url: item.url,
                                    });
                                }}
                            />
                        </Card>
                    )}
                    keyExtractor={(item, index) => `${index}`}
                    style={{ flex: 1, margin: 10 }}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    input: {
        width: '90%',
        height: '100%',
        fontSize: 16,
        marginLeft: 2,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        width: '81%',
        height: '6%',
        flexWrap: 'wrap',
        paddingLeft: 3,
        justifyContent: 'center',
        fontSize: 15,
        marginTop: 20,
    },
});
