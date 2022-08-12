# Repository finder

깃허브의 공개 repository를 검색하고 원하는 repository를 선택한 후 선택한 repository의 issue를 볼 수 있는 웹 어플리케이션입니다.

## 사용한 hook

- recoil
- react-router-dom
- styled-components
- fontawesome
- octokit

## 실행 방법

1. 소스를 다운 받은 후 npm package를 설치합니다. 터미널에 npm install + enter를 누릅니다.

```
    npm install
```

2.  github api 를 사용하기 위해 github access token을 신청합니다.
    [github access token 관련 공식 문서](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token)

    - public repository에 접근하기 위한 범위를 선택하시면 됩니다.

3.  .env 파일을 생성하고 파일에 ACCESS_TOEKEN = '부여받은 access token' 을 입력하고 저장합니다.
    ![Access token 설정](/public/img/access-token-location.png.png)

4.  터미널에 npm start를 입력하고 어플리케이션을 실행합니다.

```
    npm start
```
