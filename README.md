# Issue Tracker
위메이드의 기업 과제로 수행한 이슈 트래커 웹 애플리케이션입니다.
이슈를 생성, 수정, 삭제, 조회할 수 있습니다.

## 목차
- [요구 사항](#1)
- [구현 내용](#2)
- [회고](#3)
- [기술 스택](#4)
- [실행 방법](#5)

## 요구 사항
* 구현 사항 
    - 각 이슈는 CRUD(생성, 표출, 수정, 삭제)가 적용되어야 한다.
    - 이슈는 각각 **고유번호, 제목, 내용, 마감일, 상태, 담당자**가 존재한다.
    - 이슈의 상태는 **할 일, 진행 중, 완료**가 존재하며 칸반보드와 같이 상태별로 분류된다
    - 이슈의 작성 폼에서는 **제목, 내용, 마감일, 상태, 담당자**를 입력할 수 있다.
    - 각 이슈를 클릭 시 상세정보 창이 표시된다.
    - 상세정보 창에는 **저장**버튼이 존재한다.
    - 상세정보창에서는 이슈의 각 정보를 수정할 수 있으며, **저장**버튼을 클릭 시 수정한 내용이 반영된다.
    - 이슈 상태별 목록은 기본적으로 고유번호 순서대로 오름차순 정렬한다.
    - 이슈 목록에서 마우스의 Drag & Drop 이벤트를 활용해 이슈의 순서를 변경할 수 있다. 변경된 순서는 고유번호순 정렬보다 우선해서 적용된다.
    - 이슈 목록에서 마우스의 Drag & Drop 이벤트를 활용해 이슈의 상태를 변경할 수 있다.

* 구현 조건 
    - 데이터가 로딩중인 경우 사용자가 이를 인식할 수 있도록 UX를 고려해야 하며, 로딩 중에는 액션이 발생하는 것을 방지해야한다.
    - 각 기능들은 실수로 인한 중복 액션을 방지하기 위해 실행 후 0.5초의 딜레이를 적용한다.
    - 데이터는 새로고침해도 유지될 수 있도록 관리한다.
    - 에러 상황을 고려해서 처리할 시 가산점이 부여됩니다.
* 개발 조건 및 환경 

    - 언어 : JavaScript / TypeScript
    - 필수 기술: React
        - React 환경설정은 편한 툴체인 or 프레임워크를 사용하시면 됩니다.(CRA, Vite, Next 등)
    - 선택 기술:
        - 전역 상태 관리 라이브러리(Redux, Recoil, React-Query 등)
        - 스타일 관련 라이브러리(styled-components, emotion, ui kit 등)
        - HTTP Client(axios 등)
        - 위에 기재된 라이브러리 외 기능에 관련된 사용 불가



## 구현 내용  <a id="2"></a>

<details>
  <summary>이슈 생성</summary>
    <div markdown="1">
       <img src= "https://user-images.githubusercontent.com/104765779/211010695-f67fa9f4-2421-4662-aa48-54dab8bd7411.gif"/>
    </div>
</details>

<details>
  <summary>이슈 수정</summary>
    <div markdown="1">
       <img src= "https://user-images.githubusercontent.com/104765779/211010773-ef7ad14c-88ab-4614-9207-5d532469b4bf.gif"/>
    </div>
</details>

<details>
  <summary>이슈 삭제</summary>
    <div markdown="1">
      <img src= "https://user-images.githubusercontent.com/104765779/211010550-9b0f520d-ea55-4c6c-a95a-b74d764e2d71.gif"/>
    </div>
</details>


<details>
  <summary>입력 예외처리</summary>
    <div markdown="1">
       <img src= "https://user-images.githubusercontent.com/104765779/211010927-905d4bfc-5f48-42d6-88d5-b171ae17f3fa.gif"/>
    </div>
</details>

<details>
  <summary>드래그 앤 드랍</summary>
    <div markdown="1">
       <img src= "https://user-images.githubusercontent.com/104765779/211010842-75667d68-16fe-4c9f-ad31-fea22962b0ca.gif"/>
    </div>
</details>

<br/>

## 회고 <a id="3"></a>
### 1. 의도한 결과는 무엇이었는가? (초기 목표)
- 강의 세션에 배운 커스텀 훅을 사용해서 비즈니스 로직을 컴포넌트로부터 분리하는데 집중해서 구현했습니다. 기존의 container 컴포넌트에 이벤트 핸들러와 비즈니스 로직이 혼합되어 있어 복잡하고, 비즈니스 로직을 재사용할 수 없는 단점이 있었는데 커스텀 훅을 사용함으로 이 문제를 해결하고자 했습니다.

### 2. 실제 어떤 일들이 일어났는가? (현실)
- 이슈 데이터를 관리하는 로직(생성, 수정, 삭제)들은 커스텀 훅으로 빼서 분리하는 것이 명확하고 구현하는데 어려움이 없었습니다. 하지만 UI와 밀접한 상태, 예를 들어 모달의 상태 관리나 인터랙션과 관련된 상태들을 과연 커스텀 훅으로 분리하는 것이 맞을까? 컴포넌트에 두고 관리하는 것이 분리하는 것보다 효율적이지 않을까라는 생각이 들어 UI와 밀접한 상태를 관리하는 container 컴포넌트를 두어 구현했습니다.

### 3. 계획과 실제 결과의 차이는 왜 발생되었는가? (배운점들)
-  어떤 종류의 비즈니스 로직이 있고 어떻게 처리하면 좋을지에 대한 경험과 지식이 부족한 것 같습니다. 지식이 부족한 상태에서 프로젝트에 적용하려고 하다 보니 기존 방식이었던 container-presenter 패턴과 혼합된 형태로 구현되었습니다.
### 4. 지속, 개선 혹은 포기할 것들은 무엇인가? 배운 것들은 무엇인가? (목적)
- 다른 프론트 개발자 분들은 어떻게 관리하는지 정보가 필요하다고 생각되어 프론트엔드 개발자 디스코드에 질문을 올렸고 다음과 같은 답을 받을 수 있었습니다.

> 정리하자면 비지니스 데이터를 사용한다면 모달의 데이터 역시 전역상태를 사용하고 단순 UI나 데이터로 부터 파생해서 관리할 수 있는 뷰는 데이터를 바탕으로 만들어서 사용하고 있습니다.

이 답변을 통해서 커스텀 훅으로 분리해야 하는 상태와 컴포넌트에 남겨야 하는 상태를 구분하는 기준이 명확해진 것 같습니다. 이 내용과 과제 리뷰 시간을 통해서 배운 내용 바탕으로 리팩터링을 진행하고자 합니다.

<br/>

## 기술 스택 <a id="4"></a>


<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white" >
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white" >
<img src="https://img.shields.io/badge/styledcomponents-DB7093?style=for-the-badge&logo=styledcomponents&logoColor=white" >
<img src="https://img.shields.io/badge/Recoil-CA4245?style=for-the-badge&logo=Recoil&logoColor=white" >
<img src="https://img.shields.io/badge/Andt-61DAFB?style=for-the-badge&logo=Andt&logoColor=white" >

## 실행방법 <a id="5"></a>
1. 프로젝트를 클론합니다.
```
git clone https://github.com/hyejineee/pre-onboarding-8th-3.git
```
2. 클론한 프로젝트 내부로 이동합니다. 
```
cd pre-onboarding-8th-3
```
3. 의존 패키지를 설치합니다. 
```
yarn
```
4. 다음 명령어를 사용하여 서버를 실행합니다.
```
yarn dev 
```


