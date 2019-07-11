//Набор для тестирования на 88 строке

function MilitaryResource(face, name, type, health, distance) {
  this.face = face;
  this.name = name;
  this.type = type;
  this.health = health;
  this.maxHealth = 120;
  this.distance = distance;
  this.maxDistance = 120;
}

MilitaryResource.prototype.isReadyToMove = function() {
  return this.distance !== 0;
};

MilitaryResource.prototype.isReadyToFight = function() {
  return this.health === this.maxHealth;
};

MilitaryResource.prototype.restore = function() {
  if (this.health < this.maxHealth) {
    this.health = this.maxHealth;
    this.distance = this.maxDistance;
    return "Unit has been restored!";
  } else {
    return "Unit is already full of health&energy, sir!";
  }
};

MilitaryResource.prototype.clone = function(arr) {
  arr.push(new MilitaryResource(this.face, this.name, this.type, this.health, this.distance));
};


function Squad(defaultResources) {
  this.squad = [];
  if (defaultResources) this.combineResources(defaultResources);
  this.squad = defaultResources;
}

Squad.prototype.isReadyToMove = function() {
  return this.squad.every(function(element){
    return element.isReadyToMove();
  });
};

Squad.prototype.isReadyToFight = function() {
  return this.squad.every(function(element){
    return element.isReadyToFight();
  });
};

Squad.prototype.restore = function() {
  this.squad.forEach(function(element){
    element.restore();
  });
  return this.squad;
};

// Squad.prototype.getReadyToMoveResources = function() {
//   var resourcesDistance = [];
//   this.squad.forEach(function(element){
//     if (element.distance != 0) resourcesDistance.push(element);
//   });
//   return resourcesDistance;
// };

Squad.prototype.getReadyToMoveResources = function() {
  return this.squad.filter(function(element){
    return element.isReadyToMove();
  })
};

Squad.prototype.combineResources = function(defaultResources){
  return defaultResources.sort(function() {
    return 0.5 - Math.random();
  });
};

// Squad.prototype.cloneResource = function(){
//   var clonedSquad = [];
//   this.squad.forEach(function(element){
//     clonedSquad.push(element.clone());
//   });
//   return clonedSquad;
// };

Squad.prototype.cloneResource = function(){
  return this.squad.map(function(element){
     return element.clone();
   });
};

//ТЕСТИРОВАНИЕ 

var jojoGang = [
  joseph = new MilitaryResource("img/JoestarJoseph.png", "joseph joestar", "close range", 120, 120),
  kakyoin = new MilitaryResource("img/NoriakiKakyoin.png", "kakyoin noriaki", "long range", 120, 120),
  rohan = new MilitaryResource("img/KishibeRohan.png", "rohan kishibe", "close range", 120, 120)
]

// jojoGang[0].clone(jojoGang);

function addCards() {
  for(i=0;i<this.length;i++) {
    document.getElementById('jojo').innerHTML += '<div class="jobro"></div>';
    document.getElementById('jojo').lastChild.innerHTML += '<div class="bg-pic"></div>';
    document.getElementsByClassName('bg-pic')[i].innerHTML += '<img src="' + this[i].face + '" alt=""></img>';
    document.getElementsByClassName('bg-pic')[i].innerHTML += '<div class="backdrop"></div>';
    document.getElementById('jojo').lastChild.innerHTML += '<div class="info"></div>';
    document.getElementsByClassName('info')[i].innerHTML += '<div class="name">'+ this[i].name +'</div>';
    document.getElementsByClassName('info')[i].innerHTML += '<div class="type">'+ this[i].type +'</div>';
    document.getElementsByClassName('info')[i].innerHTML += '<div class="health" onclick="shake(this), dying(this)"></div>';
    document.getElementsByClassName('health')[i].innerHTML += '<div class="current-health">'+ this[i].health +'</div>';
    document.getElementsByClassName('health')[i].innerHTML += '<div class="split">/</div>';
    document.getElementsByClassName('health')[i].innerHTML += '<div class="max-health">'+ this[i].maxHealth +'</div>';
    document.getElementsByClassName('info')[i].innerHTML += '<div class="distance" onclick="shake(this), fatigue(this)"></div>';
    document.getElementsByClassName('distance')[i].innerHTML += '<div class="current-distance">'+ this[i].distance +'</div>';
    document.getElementsByClassName('distance')[i].innerHTML += '<div class="split">/</div>';
    document.getElementsByClassName('distance')[i].innerHTML += '<div class="max-distance">'+ this[i].maxDistance +'</div>';
  }
}
addCards.call(jojoGang);

var list = [];
list = document.getElementsByClassName('health');

function shake(current) {
  current.closest('.jobro').classList.remove("shake");
  void current.closest('.jobro').offsetWidth;
  current.closest('.jobro').className += " shake";
  
  var value = +current.children[0].innerHTML;
  var maxValue = +current.children[2].innerHTML;
  value = Math.round(value - (maxValue/100 * 10));
  if (value < 0) value = 0;
  current.children[0].innerHTML = value;
}

function dying(current) {
  if(+current.children[0].innerHTML == 0) {
    var element = current.closest('.jobro');
    element.innerHTML += "<div class='right-cross'></div>"; 
    element.innerHTML += "<div class='left-cross'></div>"; 
    element.innerHTML += '<img src="img/bloody.jpg"></img>';
    //  += "<div class='left-cross'></div>";
  };
}

function fatigue(current) {
  if(+current.children[0].innerHTML == 0) {
    var element = current.closest('.jobro');
    element.innerHTML += '<div class="fuel">Out of fuel</div>';
  }
}
// var dovahkiin = new MilitaryResource("dragonborn", 120, 120);
// var naruto = new MilitaryResource("ninja", 1, 90);
// var t34 = new MilitaryResource("tank", 100, 0);
// var t34Clone = t34.clone();

//Пак для отдельного юнита
// console.log("is ready to fight: ", t34.isReadyToFight());
// console.log("is ready to move: ", t34.isReadyToMove());
// console.log("cloned unit: ", t34.clone());
// console.log(t34.restore());
// console.log("is ready to fight: ", t34.isReadyToFight());
// console.log("is ready to move: ", t34.isReadyToMove());
// console.log("cloned unit: ", t34Clone);

// var warriorsSet = [];
// warriorsSet.push(naruto, dovahkiin, t34);
// var suicideSquad = new Squad(warriorsSet);

// //Пак для отряда
// console.log("is ready to move: ", suicideSquad.isReadyToMove());
// console.log("is ready to fight: ", suicideSquad.isReadyToFight());
// console.log("resources, ready to move: ", suicideSquad.getReadyToMoveResources());
// console.log("cloned squad: ", suicideSquad.cloneResource());
// suicideSquad.restore();
// console.log("Восстановлены все юниты.");
// console.log("is ready to move: ", suicideSquad.isReadyToMove());
// console.log("is ready to fight: ", suicideSquad.isReadyToFight());
// console.log("resources, ready to move: ", suicideSquad.getReadyToMoveResources());
// console.log("cloned squad: ", suicideSquad.cloneResource());