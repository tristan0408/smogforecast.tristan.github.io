import axios from "axios";

const instance = axios.create({
    baseURL:"http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty",
    params:{
        api_key:"IzyqD5Px0qVVIwyUVeYeQ8lYFJ7WYtR2C6XV4d0Lcc6r6QZpY5ZeC9ud0JEecqN4q23MAPTyAE351O7g8Lz%2BnQ%3D%3D",
    },
});

export default instance;