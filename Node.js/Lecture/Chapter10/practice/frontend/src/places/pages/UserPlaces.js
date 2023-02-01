import React,{useEffect,useState} from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

const UserPlaces = () => {
  const [loadedPlaces,setLoadedPlaces]=useState()
  const {isLoading,error,sendRequest,clearError}=useHttpClient()
  const userId = useParams().userId;

  useEffect(()=>{
    const fetchPlaces=async()=>{
      try {
        const responseData=await sendRequest(`http://localhost:5001/api/places/user/${userId}`)
        console.log(responseData)
        setLoadedPlaces(responseData.places)
      } catch (error) {
        
      }
    }
    fetchPlaces()
  },[sendRequest,userId])
  const placeDeletedHandler=(deletedPlaceId)=>{
    setLoadedPlaces(prevPlace=>prevPlace.filter(place=>place.id!==deletedPlaceId))
  }
  return(
   <>
   <ErrorModal error={error} onClear={clearError}/>
   {isLoading && <div className="center"><LoadingSpinner/></div>}
   {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
   </>
  )
};

export default UserPlaces;
