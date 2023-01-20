# 어플리케이션 전반적인 계획
1. CRUD 를 다룬다 (Create , Read ,Update ,Delete)
2. 이미지 업로드 , 다수의 데이터모델 , input validation


## 데이터모델 앱 구상
- User
  - Name
  - Email
  - Password
  - Image

- Places
  - Title
  - Description
  - Address
  - Location (latitude , longitude) 
  - Image


## 백앤드 API EndPoints
- /api/users
  - GET
    - 사용자 목록 반환

-/api/users/signup
  - Post
    - 신규 사용자 생성에 필요한 데이터를 받고 로그인가지 자동으로 완료

- /api/users/login
  - Post
    - 로그인

- /api/places
  - 사용자가 특정장소를 생성한다 (Post)

- /api/places/user/uid
  - 사용자가 생성한 특정 장소를 가져온다. (GET)

- /api/places/user/uid
  - 사용자가 생성한 장소를 변경시킨다 (Patch) 

- /api/places/user/uid
  - 사용자가 생성한 장소를 제거한다

## 프론트앤드 Pages
/ : Users들의 목록
/:uid/plcaes : 선택된 사용자가 고른 장소 정보
/authenticate : SignUp + LoginForms 