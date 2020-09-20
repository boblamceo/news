import NewsList from './NewsList';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Article from './Article';

const Stack = createStackNavigator({
    新闻: NewsList,
    文章: Article,
});

export default createAppContainer(Stack);
