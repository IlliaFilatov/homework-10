//КОНСТРУКТОРЫ

var MilitaryResource = (function() {
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
  }
  MilitaryResource.prototype.isReadyToFight = function() {
    return this.health === this.maxHealth;
  }
  MilitaryResource.prototype.restore = function() {
    if (this.health < this.maxHealth) {
      this.health = this.maxHealth;
      this.distance = this.maxDistance;
    } else {
      // Эти строки возвращались просто из-за того, что раньше выводились сообщения о том, что было сделано. Можно не возвращать.
    }
  }
  MilitaryResource.prototype.clone = function() {
    jojoGang.push(new MilitaryResource(this.face, this.name, this.type, this.health, this.distance));
  } // Пропустил момент с запретом на подобное использование объектов. Сорян. 
  return MilitaryResource;
}());

var Squad = (function() {
  function Squad(defaultResources) {
    this.squad = [];
    if (defaultResources) this.combineResources(defaultResources);
    this.squad = defaultResources;
  }
  Squad.prototype.isReadyToMove = function() {
    var ableUnit;
    ableUnit = this.squad.every(function(element){
      return element.isReadyToMove();
    });
    return ableUnit;
  }
  Squad.prototype.isReadyToFight = function() {
    return this.squad.every(function(element){
      return element.isReadyToFight();
    });
  }
  Squad.prototype.restore = function() {
    this.squad.forEach(function(element){
      element.restore();
    });
    return this.squad;
  }
  Squad.prototype.getReadyToMoveResources = function() {
    return this.squad.filter(function(element){
      return element.isReadyToMove();
    })
  }
  Squad.prototype.combineResources = function(defaultResources){
    defaultResources.sort(function() { 
      return 0.5 - Math.random();
    });
  };
  Squad.prototype.cloneResources = function(){
    return this.squad.map(function(element){
      return element.clone();
    });
  }
  Squad.prototype.addCard = function() {
    document.getElementById('jojo').innerHTML += '<div class="jobro"></div>';
    document.getElementById('jojo').lastChild.innerHTML += '<div class="bg-pic"></div>';
    document.getElementsByClassName('bg-pic')[i].innerHTML += '<img src="' + this[i].face + '" alt=""></img>';
    document.getElementsByClassName('bg-pic')[i].innerHTML += '<div class="backdrop"></div>';
    document.getElementById('jojo').lastChild.innerHTML += '<div class="info"></div>';
    document.getElementsByClassName('info')[i].innerHTML += '<div class="name">'+ this[i].name +'</div>';
    document.getElementsByClassName('info')[i].innerHTML += '<div class="type">'+ this[i].type +'</div>';
    document.getElementsByClassName('info')[i].innerHTML += '<div class="health" onclick="updateValue(this), shake(this), dying(this)"></div>';
    document.getElementsByClassName('health')[i].innerHTML += '<div class="current-health">'+ this[i].health +'</div>';
    document.getElementsByClassName('health')[i].innerHTML += '<div class="split">/</div>';
    document.getElementsByClassName('health')[i].innerHTML += '<div class="max-health">'+ this[i].maxHealth +'</div>';
    document.getElementsByClassName('info')[i].innerHTML += '<div class="distance" onclick="updateValue(this), shake(this), fatigue(this)"></div>';
    document.getElementsByClassName('distance')[i].innerHTML += '<div class="current-distance">'+ this[i].distance +'</div>';
    document.getElementsByClassName('distance')[i].innerHTML += '<div class="split">/</div>';
    document.getElementsByClassName('distance')[i].innerHTML += '<div class="max-distance">'+ this[i].maxDistance +'</div>';
  }
  return Squad;
}());


//НЕКОНСТРУКТОРЫ


var jojoGang = [
  joseph = new MilitaryResource("img/JoestarJoseph.png", "joseph joestar", "close range", 120, 120),
  kakyoin = new MilitaryResource("img/NoriakiKakyoin.png", "kakyoin noriaki", "long range", 120, 120),
  rohan = new MilitaryResource("img/KishibeRohan.png", "rohan kishibe", "close range", 120, 120)
],
jjba = new Squad(jojoGang);

function updateValue(current) {
  var value,
  maxValue,
  parent = current.closest('.jobro'),
  currName = parent.querySelector('.name').innerHTML,
  target = jojoGang.filter(function(elem) {return elem.name == currName;});
  target = target[0];
  
  if (current.className == "health") {
    value = target.health;
    maxValue = target.maxHealth;
  } else {
    value = target.distance;
    maxValue = target.maxDistance;
  };

  value = Math.round(value - (maxValue/100 * 10));
  if (value < 0) value = 0;

  current.className == "health" ? target.health = value : target.distance = value;
  
  current.children[0].innerHTML = value;
};

function shake(current) {
  current.closest('.jobro').classList.remove("shake");
  void current.closest('.jobro').offsetWidth;
  current.closest('.jobro').className += " shake";
};

function dying(current) {
  if(+current.children[0].innerHTML == 0) {
    var element = current.closest('.jobro');
    element.innerHTML += "<div class='right-cross'></div>"; 
    element.innerHTML += "<div class='left-cross'></div>"; 
    element.innerHTML += '<img src="img/bloody.jpg"></img>';
  };
};

function fatigue(current) {
  if(+current.children[0].innerHTML == 0) {
    var element = current.closest('.jobro');
    element.innerHTML += '<div class="fuel">Out of fuel</div>';
  };
};

for(var i=0; i<jojoGang.length;i++) {
  jjba.addCard.call(jojoGang);
  console.log(this)
};
