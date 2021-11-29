import axios from 'axios';
import BASE_URL from './BASE_URL';
// import KinsOfSports from '../types/kindsOfSports';

function sendData(data: string): void {
    axios.post(`${BASE_URL}/trainers`, {
        title: "Trener added",
        body: data
    })
        .then(() => alert('Тренер добавлений'))
        .catch(error =>  alert('Помилка, тренер добавлений ') + error);
}
export default sendData
