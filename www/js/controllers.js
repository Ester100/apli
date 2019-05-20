angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('JuegoCtrl', function($scope) {$(document).ready(function(){
  
var checkArray = []; // para verificar si las dos cartas con click son el mismo personaje
var idArray = []; //array para guardar los ids de las cartas que tienen click 
var contador = 0;
var fin = 0; 
var fields = document.querySelectorAll(".atras");


var images = [
"https://www.animalgourmet.com/wp-content/uploads/2017/09/cel-lisboa-60315-e1504660981599.jpg",
"https://www.animalgourmet.com/wp-content/uploads/2017/09/cel-lisboa-60315-e1504660981599.jpg",
"https://www.billmo.com/wp-content/uploads/2017/09/27-1-1000x0-c-default.jpg",
"https://www.billmo.com/wp-content/uploads/2017/09/27-1-1000x0-c-default.jpg",
"https://www.ecestaticos.com/imagestatic/clipping/b32/8fb/b328fb53d7359b59d15e8c7f2a54f531/que-es-el-poke-la-comida-de-moda-y-como-prepararlo-correctamente.jpg",
"https://www.ecestaticos.com/imagestatic/clipping/b32/8fb/b328fb53d7359b59d15e8c7f2a54f531/que-es-el-poke-la-comida-de-moda-y-como-prepararlo-correctamente.jpg",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDpG6u6fEnvve1DFYC6raS75SRtZvjbKrG_jqAnccgP7Kc3RF2",
"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDpG6u6fEnvve1DFYC6raS75SRtZvjbKrG_jqAnccgP7Kc3RF2",
"https://www.viveusa.mx/sites/default/files/field/image/strawberries-3089148_960_720.jpg",
"https://www.viveusa.mx/sites/default/files/field/image/strawberries-3089148_960_720.jpg",
"https://www.neovitalhealth.com/site/wp-content/themes/neo/scripts/timthumb.php?src=https://www.neovitalhealth.com/site/wp-content/uploads/2014/07/pina.jpg",
"https://www.neovitalhealth.com/site/wp-content/themes/neo/scripts/timthumb.php?src=https://www.neovitalhealth.com/site/wp-content/uploads/2014/07/pina.jpg",
"https://i.blogs.es/f67ab6/1/450_1000.jpg",
"https://i.blogs.es/f67ab6/1/450_1000.jpg",
"https://s03.s3c.es/imag/_v0/770x420/6/8/4/ADN.jpg",
"https://s03.s3c.es/imag/_v0/770x420/6/8/4/ADN.jpg",
"https://img.europapress.es/fotoweb/fotonoticia_20180424075134_640.jpg",
"https://img.europapress.es/fotoweb/fotonoticia_20180424075134_640.jpg"
];
// verificacion de los clicks
function clicked() { 
  if ($(this).find(".inner-wrap").hasClass("flipped")) {
    return;
  }
  $(this).find(".inner-wrap").toggleClass("flipped");
  checkArray.push($(this).find("img").attr("src"));
  idArray.push($(this).attr("id"));
  check();
}

$(".carta").on("click", clicked);
  
//reiniciar el juego
function reiniciar() {
  $(".atras").find("img").remove(); //quitar todas las imagenes actuales
  $(".carta .inner-wrap").removeClass("flipped"); // quitar la classe flipped para volver a su estado inicial
  checkArray = []; 
  idArray = [];
  contador = 0; 
  fin = 0;
  iniciarJuego();
}
//para verificar el fin del juego
function verificarFin() {
  if (fin === 18) { //si todas las cartas estan volteadas
    alert("Juego finalizado, lo has logrado en " + contador + " intentos");
    reiniciar();
  }
}
//para random de las imagenes 
function shuffleArray(array) { 
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function iniciarJuego() {

  

  var arr = shuffleArray(images); //array con las imagenes de forma aleatoria
 // append de las imagenes a la clase para la parte de atras de las cartas
  for (var i = 0; i < fields.length; i++) {
    var img = document.createElement("img");
    img.src = arr[i];
    fields[i].appendChild(img);
  }


}

function check() {
  //si los fields se  han hecho dos clicks 
  if (checkArray.length === 2) {
    $(".carta").off("click", clicked); 
    setTimeout(function(){
      //si no hay match
      if (checkArray[0] !== checkArray[1]) { 
        //voltear las dos cartas seleccionadas
        $("#" + idArray[0]).find(".inner-wrap").removeClass("flipped"); 
        $("#" + idArray[1]).find(".inner-wrap").removeClass("flipped"); 
        contador++;
        //vaciar los arrays para la siguiente eleccion
        checkArray = []; 
        idArray = []; 
        //habilitar el click de nuevo
        $(".carta").on("click", clicked);
      } else {

        contador++;
        
        fin += 2; // contador para el final del juego, se agregan dos para el contador de fin
        //vaciar los dos arrays
        checkArray = []; 
        idArray = []; 
        verificarFin(); 
        $(".carta").on("click", clicked); 
      }
      document.querySelector(".counter").innerHTML = contador;
    }, 800);  
  }
}



iniciarJuego();

});})


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('JuegoDetailCtrl', function($scope, $stateParams, Juego) {
  $scope.juego = Juego.get($stateParams.juegoId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
