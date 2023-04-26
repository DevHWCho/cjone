window.addEventListener('load',function(){
  // main.js

// 고객센터
// toggle()
// title="고객센터 열기" -> title="고객센터 닫기" - 속성값 가져오는 것은 setAttribute("속성","변경값")
const csBtn = document.querySelector(".topMenu>dd:nth-of-type(5)");
csBtn.addEventListener("click",e=>{
  e.currentTarget.classList.toggle("on");
  if(e.currentTarget.classList.contains("on")){
    e.currentTarget.children[0].setAttribute("title","고객센터 닫기");
  }else{
    e.currentTarget.children[0].setAttribute("title","고객센터 열기");
  }
})

// 주메뉴
// .header_wrap.on
// nav.gnb>ul>li>ul.on
const headerWrap = document.querySelector(".header_wrap");
const mainMenu = document.querySelectorAll(".gnb>ul>li")
const subMenu = document.querySelectorAll("nav.gnb>ul>li>ul");
console.log(subMenu)

for (var i = 0; i<mainMenu.length; i++){
  mainMenu[i].addEventListener('mouseover',()=>{

    // 고객센터에 on 붙어있으면 고객센터의 on을 지운다 // 검색박스에 on 붙어있으면 검색박스의 on을 지운다.
    if(csBtn.classList.contains('on') || formSrch.classList.contains('on') && srchOpen.classList.contains('on')){
      csBtn.classList.remove('on')
      formSrch.classList.remove('on')
      srchOpen.classList.remove('on')
    }
  })
}

mainMenu.forEach((main)=>{
  main.addEventListener("mouseenter",e=>{
    headerWrap.classList.add("on");
    subMenu.forEach((sub)=>{
      sub.classList.add("on");
    })
  })//mouseenter

  main.addEventListener("mouseleave",e=>{
    headerWrap.classList.remove("on");
    subMenu.forEach((sub)=>{
      sub.classList.remove("on");
    })
  })//mouseleave
  main.addEventListener("focus",e=>{
    headerWrap.classList.add("on");
    subMenu.forEach((sub)=>{
      sub.classList.add("on");
    })
  })//focus

  main.addEventListener("blur",e=>{
    headerWrap.classList.remove("on");
    subMenu.forEach((sub)=>{
      sub.classList.remove("on");
    })
  })//blur
})

// 검색열기닫기
const srchOpen = document.querySelector(".srch_open");
const formSrch = document.querySelector("form.srch");

srchOpen.addEventListener("click",e=>{
  e.preventDefault();
  e.currentTarget.classList.toggle("on");
  formSrch.classList.toggle("on")
  if(formSrch.classList.contains("on")){
    srchOpen.children[0].setAttribute("title", "검색입력서식 닫기");
  }else{
    srchOpen.children[0].setAttribute("title", "검색입력서식 열기");
  }
})

const appear = document.querySelector(".appear");
const loop = document.querySelector(".loop")
console.log(loop)

//로그인 이미지
//a.appear 안에 img 00000~00056.png
//a.loop 안에 img 00000~00081.png
var imgs = ``;
for(let k=0; k<57; k++){
  imgs += `<img src="images/appear/appear_${String(k).padStart(5,"0")}.png" alt="${k}">`;
}
appear.innerHTML=imgs;

var imgs = ``;
for(let i=0; i<82; i++){
  imgs += `<img src="images/loop/loop_${String(i).padStart(5,"0")}.png" alt="${i}">`;
}
loop.innerHTML=imgs;


// 로그인 애니메이션
// appear 0~56 이미지 각각에 animation 속성 적용
// animation: ani 2.85s linear 0s 1;
// animation: ani 2.85s linear 0.05s 1;
// animation: ani 2.85s linear 0.10s 1;
//.
//.
// animation: ani 2.85s linear 2.80s 1;

const delay = 0.05;
for(let j=0; j<57; j++){
  appear.children[j].style.animation =`ani 2.85s linear ${delay*j}s 1`;
}

// loop 0~81 이미지 각각에 animation 속성 적용
// animation: ani 4.1s linear 2.85s infinite;
// animation: ani 4.1s linear 2.90s infinite;
// animation: ani 4.1s linear 2.95s infinite;

for(let l=0; l<82; l++){
  loop.children[l].style.animation = `ani 4.1s linear ${2.85+(delay*l)}s infinite`;
}

const content1Li = document.querySelectorAll(".content1 ul li");
const quickSpan = document.querySelectorAll(".content1>ul>li>a>span");
for(let j=0; j<quickSpan.length; j++){ // span 4개 0,1,2,3
  let images='';
  for(let i=0; i<20; i++){ // 각 span 안에 img 20개 생성
    images += `<img src="images/quick0${j+1}/quick0${j+1}_${String(i).padStart(5,"0")}.png" alt='${i}'>`;
  }
  quickSpan[j].innerHTML = images;
}

// content1 각 이미지에 애니메이션 넣기
for(k=0; k<content1Li.length; k++){
  content1Li[k].addEventListener("mouseover",e=>{
    for(let i=0; i<20; i++){
      e.currentTarget.children[0].children[0].children[i].style.animation = `quick 1.0s linear ${delay*i}s 1`;
    }
  })
  content1Li[k].addEventListener("mouseout",e=>{
    for(let i=0; i<20; i++){
      e.currentTarget.children[0].children[0].children[i].style.animation = `none`;
    }
  })
}

const bannerFrame = document.querySelector(".banner_frame");
const bannerSection = document.querySelectorAll(".banner_frame>section");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const playBtn = document.querySelector(".play")
const rollBtn = document.querySelectorAll(".banner_roll>li>a");

// 배너

// next 버튼을 눌렀을 때
// 배너번호 1증가
// 배너번호가 마지막 배너번호보다 크면 배너번호가 다시 0으로
// 배너프레임의 left값 변경해서 배너 움직이게
// 0->1->2->3->0->1
let firstNum = 0;
let lastNum = bannerSection.length-1;
let bnnW = document.querySelector('body>section section').offsetWidth;
window.addEventListener('resize',()=>{
  bnnW = document.querySelector('body>section section').offsetWidth;
})
// let bnnW = window.innerWidth;
// window.onresize = function(event){
//   bnnW = window.innerWidth;
// }

nextBtn.addEventListener("click",e=>{
  e.preventDefault();
  firstNum++;
  if(firstNum>lastNum) firstNum = 0;
    bannerFrame.style.left = `${firstNum * -bnnW}px`;
    secWhite(firstNum);
})

// prev버튼 눌렀을 때 배너번호 1씩 감소
// 3->2->1->0->3->2
prevBtn.addEventListener("click",e=>{
  e.preventDefault();
  firstNum--;
  if(firstNum < 0) firstNum = lastNum;
    bannerFrame.style.left = `${firstNum * -bnnW}px`;
    secWhite(firstNum);
})


// 오토배너 작동 - setTimeout 사용, 재귀함수 사용, 5초마다
let autoBanner = () => {
  firstNum++;
  if(firstNum>lastNum) firstNum = 0;
  bannerFrame.style.left = `${firstNum*-bnnW}px`;
  secWhite(firstNum);
  autoBnn = setTimeout(autoBanner, 5000); // 재귀함수
}
let autoBnn = setTimeout(autoBanner, 5000); //최초 함수 호출

// 재생/멈춤 버튼
let flag = true;
playBtn.addEventListener("click", e=>{
  e.preventDefault();
  if(flag){//멈춤
    clearTimeout(autoBnn);
    playBtn.classList.add('pause');
    flag=false;
  }else {//재생
    autoBnn = setTimeout(autoBanner, 5000);
    playBtn.classList.remove('pause');
    flag=true;
  }
})


// 롤링 클릭
rollBtn.forEach((roll, i)=>{
  roll.addEventListener("click",e=>{
    e.preventDefault();
    clearTimeout(autoBnn);
    bannerFrame.style.left = `${i * -bnnW}px`;
    activation(rollBtn, i);
  })
})

function activation(list, i){
  for(let el of list){
    el.classList.remove("on");
  }
  list[i].classList.add("on");
}

// section에 .white가 있으면 각 요소에 .white 붙이기
const arrowA = document.querySelectorAll('.arrow>a');
const rollingA = document.querySelectorAll('.rolling a');

let secWhite = (bannerNumber)=>{
  if(bannerSection[bannerNumber].classList.contains("white")){
    arrowA.forEach((item)=>{
      item.classList.add('white');
    })
    rollingA.forEach((item)=>{
      item.classList.add('white');
    })
  }else{
    arrowA.forEach(item =>{
      item.classList.remove('white');
    })
    rollingA.forEach(item=>{
      item.classList.remove('white');
    })
  }
  rollBtn.forEach((roll)=>{
    roll.classList.remove("on")
  })
  rollBtn[bannerNumber].classList.add("on");
}

// 스크롤 이벤트
window.addEventListener('scroll',()=>{
  let scroll = document.querySelector('html').scrollTop;

  // 도넛
  const doughnut_Left_L = document.querySelector(".doughnut_Left_L");
  const doughnut_Left_s = document.querySelector(".doughnut_Left_s");
  const combine_Left = document.querySelector(".combine_Left");
  const doughnut_Center_M = document.querySelector(".doughnut_Center_M");
  const doughnut_Center_S = document.querySelector(".doughnut_Center_S");
  const doughnut_right_M = document.querySelector(".doughnut_right_M");
  const doughnut_right_S = document.querySelector(".doughnut_right_S");
  const combine_right = document.querySelector(".combine_right");


  combine_Left.style.top = `${scroll*1.05}px`;
  doughnut_Left_s.style.top = `${1500+scroll*0.2}px`;
  doughnut_Left_L.style.top = `${2800-scroll*0.8}px`;

  doughnut_Center_M.style.top = `${2800-scroll*0.9}px`;

  combine_right.style.top = `${600+scroll*1}px`;
  console.log(scrollY)
  
  if(1500>=scrollY && scrollY>1100){
    combine_right.style.top = `1822px`
  }else if(scrollY>1400){
    combine_right.style.top = `${scroll*1.2}px`;
  }
  if(1500>=scrollY && scrollY>1100){
    doughnut_right_M.style.top = `1822px`
  }else if(scrollY>1400){
    doughnut_right_M.style.top = `${scroll*1.2}px`;
  }
})

// content3
// li 하나 하나에 마우스 오버하면 li에 on이 붙음. 마우스 아웃하면 on이 사라짐.
const all = document.querySelectorAll('.content3_inner>div>ul>li'); // 26개 li 배열

all.forEach((item, i)=>{
  item.addEventListener("mouseover",e=>{
    e.currentTarget.classList.add("on");
  })
  item.addEventListener("mouseout",e=>{
    e.currentTarget.classList.remove("on");
  })
})

// 대분류
// 각 클래스 이름에 해당되는 li만 따로 모아서 저장해놓고
const content3Li = document.querySelectorAll('.content3_inner>ul>li>a'); // a 5개
const ent = document.querySelectorAll('.ent');
const shop = document.querySelectorAll('.shop');
const dinner = document.querySelectorAll('.dinner');
const box = document.querySelectorAll('.box');

// 대분류 li a 하나하나를 클릭했을 때
content3Li.forEach(item=>{
  item.addEventListener("click",e=>{
    e.preventDefault();
    content3Li.forEach(item =>{
      item.classList.remove("on");
    })
    e.currentTarget.classList.add('on');

    all.forEach(item =>{
      item.style.display = `none`;
    })
    let classValue = e.currentTarget.parentElement.getAttribute("class"); // a의 부모인 li의 class
    console.log(classValue)
    switch (classValue) {
      case 'ent':
        show(ent);
        break;
      case 'shop':
        show(shop);
        break;
      case 'dinner':
        show(dinner);
        break;
      case 'box':
        show(box);
        break;
      default:
        show(all);
        break;
    }
    function show(classValue){
      classValue.forEach(item=>{
        item.style.display = `block`;
      })
    }
  })
})

// 모든 li 화면에 안 보이게 하고
// class 속성값을 가져와서 변수에 저장
// 변수값이랑 정확하게 일치하는 케이스 찾아서
// 해당 클래스 이름에 해당되는 li들만 보이게 설정한다.


// 패밀리 사이트
const familyBtn = document.querySelector('.family_site');
familyBtn.addEventListener('click',e=>{
  e.preventDefault();
  familyBtn.classList.toggle("on");
})

// 탑 버튼
const topBtn = document.querySelector('.top');
topBtn.addEventListener("click",e=>{
  e.preventDefault();
  window.scroll({
    top: 0,
    left: 0,
    behavior: 'smooth'
  })
})
console.log(scrollY)
window.addEventListener('scroll',e=>{
  if(scrollY<2400){
    topBtn.classList.add("on")
    topBtn.classList.remove("ab")
  }else if(scrollY>=2400){
    topBtn.classList.add("ab")
    topBtn.classList.remove("on")
  }if(scrollY<=200){
    topBtn.classList.remove("on")
  }
})

// 햄버거 버튼 클릭
// 1. div.mob.on
// 2. div.mobBtn_close.on
// 3. body.on, div.bg.on
const mob = document.querySelector('.mob')
const mobBtn = document.querySelector('.mobBtn');
const mobBtn_close = document.querySelector('.mobBtn_close');
const body = document.querySelector('body');
const bg = document.querySelector('.bg');
mobBtn.addEventListener('click',e=>{
  e.preventDefault();
  mob.classList.add('on');
  mobBtn_close.classList.add('on');
  body.classList.add('on');
  bg.classList.add('on');
})

// 모바일 닫기 클릭
mobBtn_close.addEventListener('click',e=>{
  e.preventDefault();
  mob.classList.remove('on');
  mobBtn_close.classList.remove('on');
  body.classList.remove('on');
  bg.classList.remove('on');
})

const moTopList = document.querySelectorAll('.mob_topMenu>dd');
const moGnbList = document.querySelectorAll('.mob_gnb>ul>li');
// 메뉴 전체보기
// 고객센터 클릭
moTopList.forEach(list => {
  list.addEventListener('click',e=>{
    e.preventDefault();
    list.classList.toggle('on');
  })
})

// 포인트/카드, 이벤트/쿠폰, 나의 ONE 클릭
moGnbList.forEach(list => {
  list.addEventListener('click',e=>{
    e.preventDefault();
    list.classList.toggle('on')
  })
})
})