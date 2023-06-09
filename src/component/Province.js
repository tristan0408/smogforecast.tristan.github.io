
import axios from '../api/axios';
import React, { useCallback, useEffect, useState } from 'react';
import "./Province.css";
import "./Dropdown.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/pagination";

import sampledata from "./sampledata.json";
import favoriteStar from "../favorite_Star.png"
import favoriteStarFill from "../favorite_Star_Fill.png"
import myLoc from "../My_Loc.png"
import allLoc from "../All_Loc.png"

import Dropdown from './Dropdown';


const Province = ({fetchURL}) => {

  const sidos = ["서울", "부산", "대구", "인천", "광주", "대전", "울산", "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "세종"];

  const [smogData, setSmogData] = useState([])
  const [provinceList, setProvinceList] = useState([])

  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const [dropdownSelected, setDropdownSelected] = useState("서울");

  const [viewMode, setViewMode] = useState("viewAll");

  const [favorites, setFavorites] = useState([]);


  
  //const [modalOpen, setModalOpen] = useState(false);
  //const [movieSelected, setMovieSelection] = useState({})
  

  const getParameters = {
    serviceKey: 'IzyqD5Px0qVVIwyUVeYeQ8lYFJ7WYtR2C6XV4d0Lcc6r6QZpY5ZeC9ud0JEecqN4q23MAPTyAE351O7g8Lz%2BnQ%3D%3D',
    returnType:'json',
    numOfRows:'100',
    pageNo:'1',
    sidoName: viewMode === "viewMy" ? dropdownSelected : "전국",
    ver:'1.0',
  }



  const fetchSmogData = useCallback(async () => {
    console.log("fetchSmogData");
    var fetchURLss = `http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getCtprvnRltmMesureDnsty?serviceKey=${getParameters['serviceKey']}&returnType=${getParameters['returnType']}&numOfRows=${getParameters['numOfRows']}&pageNo=${getParameters['pageNo']}&sidoName=${getParameters['sidoName']}&ver=${getParameters['ver']}`
    const response = await axios.get(fetchURLss);
    console.log(response);
    var dataRev = response.data.response.body.items;
    setSmogData(dataRev);
    setProvinceList(dataRev);
    console.log(dropdownSelected);
    console.log(viewMode);
    console.log("abdj");
  })
 
/*
  const fetchSmogData = () => {
    setSmogData(sampledata);
    setProvinceList(sampledata.response.body.items);
    console.log(provinceList);
    console.log(dropdownSelected);
  } 
*/

useEffect(() => {
  console.log("useEffect1");
  fetchSmogData();    
}, [dropdownSelected])

useEffect(() => {
  console.log("useEffect2");
  fetchSmogData();    
}, [viewMode])

/*
  useEffect(() => {
    localStorage.removeItem('favorites')
  },[])
*/


  const setDropdownProperty = (visibility, sido) => {
    console.log("setDropdownProperty");
    setDropdownVisibility(visibility);
    setDropdownSelected(sido);
  }
  
  const changeViewMode = (viewMode) => {
    console.log("changeViewMode");
    if(viewMode === 'viewFav'){
      console.log(readFavorite());
    }
    setViewMode(viewMode);
  }

  const addOrRemoveFavorite = (stationName) => {
    var arr = favorites;

    if(arr.includes(stationName)){
      var filtered = arr.filter((el) => el !== stationName);
      localStorage.setItem('favorites', JSON.stringify(filtered));
      console.log("removed : " + stationName);
    }else{
      arr.push(stationName);
      localStorage.setItem('favorites', JSON.stringify(arr));
      console.log("added : " + stationName);
    }   
    readFavorite();
  }

  const readFavorite = () => {
    var data = localStorage.getItem('favorites');

    var arr = [];
    if(data == null){
      arr = [];
    }
    else{      
      arr = JSON.parse(data);
    }    

    console.log("Favorites : " + arr);
    setFavorites(arr);
    return favorites;
  }

  const calcSmogStatet = (pm10grade) => {
    switch (pm10grade) {
      case "5":
        return ("좋음");
        break;  
      case "4":
        return ("보통");
        break;
      case "3":
        return ("한때나쁨");
        break;
      case "2":
        return ("나쁨");
        break;
      case "1":
        return ("매우나쁨");
        break;    
      default:
        return ("정보없음");
        break;
    }
  }

  const calcSmogStatetColor = (pm10grade) => {
    switch (pm10grade) {
      case "5":
        return ("blue");
        break;  
      case "4":
        return ("green");
        break;
      case "3":
        return ("rgb(220,220,0)");
        break;
      case "2":
        return ("orange");
        break;
      case "1":
        return ("red");
        break;    
      default:
        return ("gray");
        break;
    }
  }

  const jubgeViewMode = (sidoName, stationName) => {
    if(viewMode === "viewAll"){
      return 'block';
    }
    else if(viewMode === "viewFav"){
      return favorites.includes(stationName) ? 'block' : 'none';
    }
    else if(sidoName === dropdownSelected){
      return 'block';
    }
    else{
      return 'none';
    }
  }

  return (
    <div className='container'>      
      <div className='dropDownSido'>
      <button className='dropDownSidoButton' onClick={e => setDropdownVisibility(!dropdownVisibility)}>
          {
              dropdownSelected
          }
      </button>
      <div className='dropdown'>
        <Dropdown visibility = {dropdownVisibility}>
            <ul>
              {sidos.map(sidoName => (
                <li>
                  <button className='dropDownButton' onClick={() => setDropdownProperty(false, sidoName)}>
                    {sidoName}
                  </button>
                </li>
              ))}
            </ul>
        </Dropdown>
        </div>
      </div>


      <div className='bottomTab'>
        <div className='bottomTabItem'
          onClick={()=>changeViewMode('viewMy')}
          style={{backgroundColor: viewMode ==='viewMy'?'rgb(150,150,150)':'rgb(210,210,210)'}}>
          <img className='bottomTabImage' src={myLoc} alt='My Location' />
          <span>View My City</span>
        </div>
        <div className='bottomTabItem'
          onClick={()=>changeViewMode('viewAll')}
          style={{backgroundColor: viewMode ==='viewAll'?'rgb(150,150,150)':'rgb(210,210,210)'}}>
          <img className='bottomTabImage' src={allLoc} alt='All Location'/>
          <span>View All City</span>
        </div>
        <div className='bottomTabItem'
          onClick={()=>changeViewMode('viewFav')}
          style={{backgroundColor: viewMode ==='viewFav'?'rgb(150,150,150)':'rgb(210,210,210)'}}>
          <img className='bottomTabImage' src={favoriteStar} alt='Favorites'/>
          <span>View Favorite</span>
        </div>
      </div>
      

      <div className='provinceList'>
        {provinceList.map(prov => (
            <ul 
              key={prov.stationName}
              id={prov.stationName}
              className='provinceUnit'
              style={{backgroundColor:calcSmogStatetColor(prov.pm10Grade), color:'white', display:jubgeViewMode(prov.sidoName, prov.stationName)}}
              >
                <div className='stateSidoName'>
                  {prov.stationName}--{prov.sidoName}
                </div>
                <div className='smogState'>
                  {calcSmogStatet(prov.pm10Grade)}
                </div>   
                <div className='smogValue'>
                  {"미세먼지 수치 : " + prov.pm10Value}
                </div>
                <div className='dateTime'>
                  {prov.dataTime + " 기준"}
                </div>
                <img 
                  className='provinceFavorite'
                  src={favorites.includes(prov.stationName)?favoriteStarFill:favoriteStar}
                  onClick={() => addOrRemoveFavorite(prov.stationName)} />                  
            </ul>
        ))}
      </div>
    </div>
  )
}

export default Province


