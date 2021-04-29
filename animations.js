//Seta onde começa a animação;
var processamento = 0;

//pega altura da tela do usúario 
var _AlturaDocumento = $(window).height(); 



//atribui a largura da variável a todas as divs que possuem a classe com nome secao
function AlturaSecao() {
    $('.secao').height(_AlturaDocumento); 
   }



//Define o tamanho da segunda seção de scroll baseado no dispositivo do usuário
function setSpacePageTwo(){
    if(window.matchMedia("(max-width: 768px)").matches){
        $("#sectionOnePageTwo").width('100%');
        $("#sectionOnePageTwo").height(_AlturaDocumento);
        $("#sectionTwoPageTwo").width('100%');
        $("#sectionTwoPageTwo").height(_AlturaDocumento);
    }
    else if(window.matchMedia("(min-width: 769px)").matches){
        $("#sectionOnePageTwo").width('100%');
        $("#sectionOnePageTwo").height(_AlturaDocumento/2);
        $("#sectionTwoPageTwo").width('100%');
        $("#sectionTwoPageTwo").height(_AlturaDocumento/2);
    }
}



$(AlturaSecao);
$(setSpacePageTwo); 



//Animando os primeiros itens quando a página iniciar
window.onload = function (){
$('#responsive').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
}




//detecta a direção do scroll e retorna-a

function detectMouseWheelDirection( e )
{
  var delta = null,
      direction = false
  ;
  if ( !e ) { // if the event is not provided, we get it from the window object
      e = window.event;
  }


if(e.wheelDelta >= 120 || e.wheelDelta <= -120){
  if ( e.wheelDelta ) { // will work in most cases
      delta = e.wheelDelta / 60;
  } else if ( e.detail ) { // fallback for Firefox
      delta = -e.detail / 2;
  }
  if ( delta !== null) {
      direction = delta > 0 ? 'up' : 'down';
  } 
}else if(e.wheelDelta === (e.deltaY * -3)){
  if ( e.wheelDelta ) {
      delta = e.wheelDelta;
  } else if ( e.detail ) { 
      delta = -e.detail;
  }
  if ( delta !== null) {
      direction = delta > 0 ? 'up' : 'down';
  }
}
  return direction;
}

//processa as informações da direção do scroll para disparar animações
function OnScroll(direction,valueY) {
    if(direction == 'down' && valueY < _AlturaDocumento && processamento == 0){
     animationsPageTwoDown();
      processamento = animatePageOneDown();
    }
   else if(direction == 'down' && processamento == 1 &&  valueY >= _AlturaDocumento ){ 
     animationsPageTwoFadeOut();
     processamento = animatePageTwoDown();
    }
    else if(direction == 'down' && processamento == 2 &&  valueY >= (_AlturaDocumento * 2) ){ 
     processamento = animatePageThreeDown();
    }
    else if(direction == 'up' && processamento == 1){
     processamento = animatePageOneUp();
    }
   else if(direction == 'up' && processamento == 2){ 
     animationsPageTwoUp();
     processamento = animatePageTwoUp();
    }
    else if(direction == 'up' && processamento == 3 ){ 
     processamento = animatePageThreeUp();
    }
   };
     



 // dispara o comando de animações para cada vez que um scroll é efetuado
 document.onwheel = function(e){
  OnScroll(detectMouseWheelDirection(e), window.pageYOffset);
}





//COMANDOS VOLTADOS AO TOUCH NUMA TELA



//dispara um comando que lê as posições de X e Y na tela

document.addEventListener('touchstart', function handleTouchStart(e) {
startX = e.changedTouches[0].screenX;
startY = e.changedTouches[0].screenY;
}, false);



let startX = 0;
let startY = 0;



//função que calcula a diferença entre o ponto inicial e o ponto final de um toque, retornando assim a direção do toque
function handleTouchEnd(e) {


const diffX = e.changedTouches[0].screenX - startX;
const diffY = e.changedTouches[0].screenY - startY;
const ratioX = Math.abs(diffX / diffY);
const ratioY = Math.abs(diffY / diffX);
const absDiff = Math.abs(ratioX > ratioY ? diffX : diffY);

// Ignore small movements.
if (absDiff < 10) {
 return;
}else{
return diffY  > 0 ? 'up' : 'down';;
}
}




//dispara a animação na tela, baseado na direção final do toque
document.addEventListener('touchend', function(event){
    
var direction = handleTouchEnd(event);
valueY = window.pageYOffset;

if(direction == 'down' && valueY < _AlturaDocumento && processamento == 0){
   processamento = animatePageOneDown();
 }
else if(direction == 'down' && processamento == 1 &&  valueY >= _AlturaDocumento ){ 
  animationsPageTwoDown();
  processamento = animatePageTwoDown();
}
else if (direction == 'down' && processamento == 2 && valueY >= (_AlturaDocumento * 2)) { 
  animationsPageTwoFadeOut();
  processamento = animatePageThreeDown();
 }
 else if(direction == 'down' && processamento == 3 &&  valueY >= (_AlturaDocumento * 3) ){ 
  processamento = animatePageFourDown();
 }
 else if(direction == 'up' && processamento == 1){
  processamento = animatePageOneUp();
 }
else if(direction == 'up' && processamento == 2){ 
  processamento = animatePageTwoUp();
 }
 else if(direction == 'up' && processamento == 3 ){ 
  animationsPageTwoUp();
  processamento = animatePageThreeUp();
 }
 else if(direction == 'up' && processamento == 4 ){ 
  animationsPageTwoUp();
  processamento = animatePageFourUp();
 }  

}, false);








  

 //Animações da página ao descer

 function animatePageOneDown(){
  var body = $('html, body');
  body.animate({scrollTop:  _AlturaDocumento}, '500');
  $('#responsive').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.0}, 500);
  return processamento = 1;
 };
 function animatePageTwoDown(){
  var body = $('html, body');
  body.animate({scrollTop: _AlturaDocumento * 2}, '500');
  return processamento = 2;
 };
 function animatePageThreeDown(){
  var body = $('html, body');
  body.animate({scrollTop: _AlturaDocumento * 3}, '500');
  return processamento = 3;
 };
 function animatePageFourDown(){
  var body = $('html, body');
  body.animate({scrollTop: _AlturaDocumento * 4}, '500');
  return processamento = 4;
 };


function animationsPageTwoDown(){
  $('#firstAnimationPageTwo').css({opacity: 0.0, visibility: "visible",}).animate({opacity: 1.0}, 1000);
  $('#secondAnimationPageTwo').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 2000);
  $('#thirdAnimationPageTwo').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 3000);
}

function animationsPageTwoFadeOut(){
  $('#firstAnimationPageTwo').css({opacity: 1.0, visibility: "visible",}).animate({opacity: 0.0}, 200);
  $('#secondAnimationPageTwo').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.0}, 200);
  $('#thirdAnimationPageTwo').css({opacity: 1.0, visibility: "visible"}).animate({opacity: 0.0}, 200);
}

 function animationsPageTwoUp(){
  $('#firstAnimationPageTwo').css({opacity: 0.0, visibility: "visible",}).animate({opacity: 1.0}, 3000);
  $('#secondAnimationPageTwo').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 2000);
  $('#thirdAnimationPageTwo').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
} 




 //Animações da página ao subir

 function animatePageOneUp(){
  var body = $('html, body');
  body.animate({scrollTop:  0}, '500');
  $('#responsive').css({opacity: 0.0, visibility: "visible"}).animate({opacity: 1.0}, 1000);
  return processamento = 0;
 };

 function  animatePageTwoUp(){
  var body = $('html, body');
  body.animate({scrollTop: _AlturaDocumento}, '500');

  return processamento = 1;
 };

 function  animatePageThreeUp(){
  var body = $('html, body');
  body.animate({scrollTop: _AlturaDocumento * 2}, '500');
  return processamento = 2;
 };

 function  animatePageFourUp(){
  var body = $('html, body');
  body.animate({scrollTop: _AlturaDocumento * 3}, '500');
  return processamento = 3;
 };



