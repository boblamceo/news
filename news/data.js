import axios from 'axios';

const getData = (search) => {
    const date = new Date();
    const currentDate = `${date.getUTCFullYear()}-${date.getMonth() + 1}-${date.getUTCDate()}`;
    let result;
    try {
        axios
            .get(
                `http://newsapi.org/v2/top-headlines?q=${search}&from=${currentDate}&to=${currentDate}&sortBy=popularity&apiKey=889fa0ba853e4b8394713d2c0cf908cb`,
            )
            .then((res) => {
                console.log(res);
            });
    } catch (err) {
        alert('ERROR IN CONSOLE');
        console.log(err);
    }
    return result;
};
export default getData;
