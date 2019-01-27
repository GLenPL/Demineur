window.onload = function(){
		{//Récupération des éléments HTML
		var tGrille = document.getElementById('grille');
		var bGrille = document.getElementById('bGrille');
		
		var timeExe = document.getElementById('timeExe');
		
		var eTestText = document.getElementById('testText');
		var eTestInput = document.getElementById('testInput');
		var eTestDiv = document.getElementById('testDiv');
		var testTest = 0;
		
		
		var info = document.getElementById('info');
		var dChoix = document.getElementById('choix');
		var chargement = $('#chargement');
		}
		
		{//toutes les constantes et variables uilisées
		//constantes et variables du temps
		var timeNew = new Date();
		var timeOld = new Date();
		var temps;
		//sur la grille
		var tailleImage = 40;
		}
		
	bGrille.addEventListener('click',function(){creerGrille(10,10,0.1);});
	
	function creerGrille(hx,hy,pBombe){
		grille.innerHTML = ""
		innerHTMLtext = ""
		for (var i = 1; i<=hx; i++){
			innerHTMLtext += "<tr id=\"ligne "+ i + "\" height=\"" + (tailleImage+4) + "px\" >";
			for (var j = 1; j <= hx; j++){
				var id = 'img ' + i + ' ' + j;
				innerHTMLtext += '<td id=\"case ' + i + ' ' + j + '\" width=\"' + (tailleImage+2) + 'px\" ';
				if (Math.random() < pBombe){
					innerHTMLtext += '  class="-1" ';
				}
				innerHTMLtext += "></td>";
			}
			innerHTMLtext += "</tr>";
		}	
		grille.innerHTML = innerHTMLtext;
		
		for (var i = 1; i <= hx; i++){
			for (var j = 1; j <= hx; j++){
				var cEC = document.getElementById('case ' + i + ' ' + j);
				var fx = 'document.getElementById("img ' + i + ' ' + j + '").style = "";';
				cEC.setAttribute('onclick',fx);
				if (cEC.className == "-1"){
					cEC.innerHTML = '<img src="2-Contenus/favicon.ico" style="display: none;" id="img ' + i + ' ' + j + '" width="'+tailleImage+'" height="'+tailleImage+'"/>';
					cEC.addEventListener('click',function(){
						for (k=1; k<=hx; k++){
							for (l = 1; l<=hy; l++){
								document.getElementById('img ' + (k) + ' ' + (l)).style = "";
							}
						}
					});
				}
				else{
					var voisins = 0
					for (k=-1; k<=1; k++){
						for (l = -1; l<=1; l++){
							if (i+k<=hx && i+k>0 && j+l<=hy && j+l>0){
								if (document.getElementById('case ' + (k+i) + ' ' + (j+l)).className == "-1"){voisins++}
							}
						}
					}
					cEC.innerHTML = '<img src="2-Contenus/'+voisins+'.png" id="img ' + i + ' ' + j + '" style="display: none;"  />';
					if (voisins==0){
						fx += 'console.log("img ' + i + ' ' + j + '");';
						fx += 'alert('+i+' '+j+');';
					}
				}
				cEC.setAttribute('onclick',fx);
			}
		}
		
		
		
	}
	
	
	function infoMessage(message, temps, bChargement, value, max){
		
		msgCount++;
		info.style.opacity = 1;
		info.style.bottom = "10px";
		
		pInfo.innerHTML = message;
		chargement.css('height',(info.offsetHeight-2) + 'px');
		
		if(bChargement){
			chargement.css('width',(info.offsetWidth * value / max) + 'px');
		}
		else{
			chargement.css('width',(info.offsetWidth-2) + 'px');
		}
		setTimeout(function(){
			if(msgCount == 1){
				info.style.opacity = 0;
				info.style.bottom = "100px";
			}
			msgCount--}
		, temps);
	}
}

function nthSibling(elem,n){
	var ret;
	if(n==0){ret = elem;}
	else{ret = nthSibling(elem,n-1).nextElementSibling;}
	return ret;
}

