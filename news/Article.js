import React from 'react';
import { SafeAreaView, Text, Image } from 'react-native';
import Hyperlink from 'react-native-hyperlink';

const Article = ({ navigation }) => {
    const url = navigation.getParam('url');
    const titleAndCompany = navigation.getParam('title');
    const image = navigation.getParam('image');
    const author = navigation.getParam('author');
    const content = navigation.getParam('content');

    const trim = (original, trimmedChar, spaces) => {
        const splitted = original.split(spaces);
        const returnedArr = [];

        for (let i = 0; i < splitted.length; i++) {
            let current = splitted[i];
            if (current === trimmedChar) {
                break;
            }
            returnedArr.push(current);
        }
        return returnedArr.join(spaces);
    };
    const title = trim(titleAndCompany, '-', ' ');
    const trimmedContent = trim(content, '[', '');

    return (
        <SafeAreaView>
            <Image
                source={{
                    uri:
                        image ||
                        'https:www.salonlfc.com/wp-content/uploads/2018/01/image-not-found-scaled-1150x647.png',
                }}
                style={{
                    height: '50%',
                    width: '96%',
                    margin: '2%',
                    borderRadius: 10,
                }}
            />
            <Text
                style={{
                    fontWeight: 'bold',
                    fontSize: 30,
                    textDecorationLine: 'underline',
                    margin: 10,
                    alignSelf: 'center',
                }}
            >
                {title}
            </Text>
            {/* {author ? <Text style={{ alignSelf: 'center', color: '#00b515' }}> - {author}</Text> : null} */}
            <Text style={{ alignSelf: 'center', marginHorizontal: 30 }}>{trimmedContent}</Text>
            <Hyperlink linkDefault={true}>
                <Text style={{ fontSize: 15, margin: 10, color: '#00b515', alignSelf: 'center' }}>{url}</Text>
            </Hyperlink>
        </SafeAreaView>
    );
};

export default Article;
