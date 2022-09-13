# Repository finder

깃허브의 공개 repository를 검색하고 원하는 repository를 선택한 후 선택한 repository의 issue를 볼 수 있는 웹 어플리케이션입니다.

## 화면 정보

![Repository finder 기본 화면](/public/img/repository-finder.png)

  - 메인화면입니다. 가운데 input box에 검색하고자하는 public repository 명을 입력하면 검색결과가 노출됩니다.
  - 카트에 현재 저장되어있는 repository의 개수가 보여집니다.

![Repository finder 검색 결과 화면](/public/img/repository-finder-result.png)

  - 검색결과 화면입니다. 하단의 first, next, prev, last 버튼을 누르면 해당 화면으로 이동합니다.
  - 검색결과 화면에는 기본 10개의 결과가 나오며 10개 이상의 검색결과가 존재하지 않을 경우 하단 페이징 버튼이 나오지 않습니다.
  - 각 repository 좌측 끝에 있는 + 버튼을 누르면 해당 repository가 cart에 저장됩니다.
  - 기존에 등록되어있는 repository와 동일한 repository를 등록할 수 없습니다.
  - 등록 가능한 repository는 최대 4개 입니다.
  - 검색결과가 없을 경우 no result 메세지가 노출됩니다.

![Repository cart 화면](/public/img/repository-cart.png)

  - 메인 화면에서 cart 버튼을 누르면 나오는 페이지 입니다.
  - localstorage에 저장되어있는 repository 가 노출됩니다.
  - 각 repository 우측 끝 휴지통 버튼을 선택하면 repository가 삭제됩니다.
  - 각 repository의 이름을 선택하면 해당 repository의 열려있는 issue 목록으로 이동합니다.

![Repository issue 화면](/public/img/issue-list.png)
  - 클릭한 repository에 해당하는 issue 목록화면입니다.
  - issue를 제기한 사용자의 아바타, 아이디, 생성된 날짜, 제목이 표시됩니다.
  - issue카드를 클릭하면 해당 issue 화면으로 이동됩니다.
  - 메인화면과 마찬가지로 하단 first, next, prev, last 버튼으로 페이징이 가능합니다.

## Usage

- recoil
- react-router-dom
- styled-components
- fontawesome
- octokit

## 실행 방법

1. 소스를 다운 받은 후 npm package를 설치합니다. 

```
    npm install
```

2.  github api 를 사용하기 위해 github access token을 신청합니다.
    [github access token 관련 공식 문서](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

    - public repository에 접근하기 위한 범위를 선택하시면 됩니다.

3.  .env 파일을 생성하고 2번에서 생성한 API_KEY를  ACCESS_TOEKEN = '부여받은 API_KEY'로 입력하고 저장합니다.
    ![Access token 설정](/public/img/access-token-location.png)

4.  터미널에 npm start로 어플리케이션을 실행합니다.

```
    npm start
```
