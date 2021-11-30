import axios from 'axios';
import { BASE_URL } from '../services/BASE_URL';

function sendData(data: string): void {
  axios
    .post(`${BASE_URL}/trainers`, {
      title: 'Trener added',
      body: data,
    })
    .then(() => alert('Тренер добавлений'))
    .catch((error) => alert('Помилка, тренер не добавлений ') + error);
}
export default sendData;
