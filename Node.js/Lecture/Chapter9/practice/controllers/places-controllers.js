const uuid = require('uuid/v4');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');
const User=require('../models/user')
const Place=require('../models/places');
const { default: mongoose } = require('mongoose');

const getPlaceById = async (req, res, next) => {
  const placeId = req.params.pid; // { pid: 'p1' }
  let place;
  try {
    place = await Place.findById(placeId)
  } catch (err) {
    const error=new HttpError('Something went wrong, could not find a place', 500);
    return next(error)
  }
  
  if (!place) {
    const error= new HttpError('Could not find a place for the provided id.', 404);
    return next(error);
  }
  res.json({ place:place.toObject({getters:true}) });

};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  let places;
  try {
    // 배열반환
    places = await Place.find({creator:userId})
  } catch (err) {
    const error=new HttpError(
      'Fetching places failed,please try again later',
      500
    )
    return next(error)
  }

  if (!places || places.length === 0) {
    return next(
      new HttpError('Could not find places for the provided user id.', 404)
    );
  }

  res.json({ places :places.map(place=>place.toObject({getters:true}))});
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError('Invalid inputs passed, please check your data.', 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  coordinates = getCoordsForAddress();
  const createdPlace = new Place({
    title,
    description,
    address,
    location:coordinates,
    image:'https://play-lh.googleusercontent.com/ZyWNGIfzUyoajtFcD7NhMksHEZh37f-MkHVGr5Yfefa-IX7yj9SMfI82Z7a2wpdKCA=w240-h480-rw',
    creator
  });

  let user;
  try {
    user=await User.findById(creator)
  } catch (err) {
    const error=new HttpError(
      'Creating place failed , please try again',500
    )
    return next(error)
  }

  // 생성한 사용자만 새로운 장소를 생성할수있다.
  if(!user){
    const error=new HttpError('Could not find user for provided id',404)
    return next(error)
  }

  // 여러 연산중 하나가 실패하면 장소생성이 실패하거나 , 사용자 문서에 장소 ID를 저장하는게 실패해서
  // 다른연산과는 무관하게 개별적 연산 실패가 발생하면 나머지 연산도 모두 실패하게 만들어야한다 .
  // 트랜젝션과 세션을 사용해야한다 !
  // 트랜젝션을 사용하면 여러개의 연산을 개별적으로 수행하거나 연산을 취소 할수있다 
  // 트랜젝션은 세션이라고 불리는것 위에 만들어진다. 
  // 세션 다음에 트랜젝션을 시작한다 트랙젝션 완료후 세션은 종료후 커밋을 한다


  try {
    const sess=await mongoose.startSession()
    sess.startTransaction()
    await createdPlace.save({session:sess})
    user.places.push(createdPlace)
    await user.save({session:sess})
    await sess.commitTransaction()
    //  이과정에서 문제가 발생될시 MongoDb가 모든 수정사항을 자동으로 롤백하게 된다
    
  } catch (err) {
    const error=new HttpError(
      'Creating place failed, please try again.',500
    )
    // 코드 실행 중단시 꼭 넣어줘야한다 .안그러면 계속 실행된다
    return next(error)
  }
  res.status(201).json({ place: createdPlace });
  // 트랜젝션의 경우에는 컬렉션이 존재하지 않는 상황에서는 컬렉션도 생성해야한다.
  // 
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs passed, please check your data.', 422));
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  let place;
  try {
    place=await Place.findById(placeId)
  } catch (err) {
    const error=new HttpError(
      'Something went wrong, could not update place',500
    )
    return next(error)
  }
  place.title=title
  place.description=description

  try {
    await place.save()
  } catch (err) {
      const error=new HttpError(
        'Something went wrong, could not update place',500
      )
      return next(error)
  }
  res.status(200).json({ place: place.toObject({
    getters:true
  })});
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.pid;
  let place;
  try {
    place=await Place.findById(placeId)
  } catch (err) {
    const error=new HttpError(
      'Something went wrong, could not delete places.',500
    )
    return next(error)
  }
  try {
    await place.remove()
  } catch (err) {
    const error=new HttpError(
      'Something went wrong, could not delete places.',500
    )
    return next(error)
  }
  
  res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
