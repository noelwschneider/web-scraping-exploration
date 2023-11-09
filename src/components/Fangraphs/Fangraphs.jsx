import axios from 'axios';

export default function Fangraphs() {
    
    let testGet = () => {
        

        axios.get('/fangraphs')
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }
    console.log(testGet());
}