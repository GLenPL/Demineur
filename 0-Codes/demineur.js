window.onload = function(){
	{//Récupération des éléments HTML
		var tGrille = document.getElementById('grille');
		var bGrille = document.getElementById('bGrille');
		
		var eHauteur = document.getElementById('nHauteur');
		var eLargeur = document.getElementById('nLargeur');
		var epBombes = document.getElementById('npBombes');
		var edBR = document.getElementById("dBR")
		var eBombesRestantes = document.getElementById('pBombesRestantes');
		var eTemps = document.getElementById('pTemps');
		
		var timeExe = document.getElementById('timeExe');
		
		var eTestText = document.getElementById('testText');
		var eTestInput = document.getElementById('testInput');
		var eTestDiv = document.getElementById('testDiv');
		var testTest = 0;
		
		
		var info = document.getElementById('info');
		var dChoix = document.getElementById('choix');
	}
		
		{//toutes les constantes et variables uilisées sur la grille
		var jeu = false;
		var compteur, hx, hy;
		var msgCount = 0;
		}
		
	bGrille.addEventListener('click',function(){creerGrille(parseFloat(epBombes.value));});
	
	var taille = 42;
	
	function creerGrille(pBombe){
		hx = parseInt(eHauteur.value);
		hy = parseInt(eLargeur.value);
		if (jeu){clearInterval(compteur);}
		var tOld = new Date();
		compteur = setInterval(function(){
			var tNew = new Date();
			var dt = tNew.getTime() - tOld.getTime();
			var sec = Math.floor(dt/1000);
			var minu = Math.floor(sec/60);
			sec = sec%60;
			if (sec<10){sec = "0" + sec;}
			if (minu < 10){minu = "0" + minu}
			eTemps.innerHTML = minu + ":" + sec;
			
		},1000);
		
		var width =0.54*( window.innerWidth
					|| document.documentElement.clientWidth
					|| document.body.clientWidth);
		
		taille = parseInt(Math.floor(width/hy)-1);
		console.log(taille);
		while ((grille.hasChildNodes())){
			grille.removeChild(grille.childNodes[0])
		}
		
		var nvCase = document.createElement('td')
		var nvLigne = document.createElement('tr')
		for (var i = 1; i<=hx; i++){
			var ligneTempo = nvLigne.cloneNode();
			ligneTempo.id = "ligne " + i;
			tGrille.appendChild(ligneTempo);
			for (var j = 1; j <= hy; j++){
				var caseTempo = nvCase.cloneNode();
				caseTempo.id = "case " + i + " " + j;
				caseTempo.width = taille;
				caseTempo.height = taille;
				if (Math.random() < pBombe){
					caseTempo.className = 9;
				}
				else{
				}
				document.getElementById("ligne " + i).appendChild(caseTempo);
			}
		}
		
		var nvImage = document.createElement("IMG");
		for (var i = 1; i <= hx; i++){
			for (var j = 1; j <= hy; j++){
				var cEC = document.getElementById('case ' + i + ' ' + j);
				if (cEC.className != "9"){	
					var voisins = 0
					for (k=-1; k<=1; k++){
						for (l = -1; l<=1; l++){
							if (i+k<=hx && i+k>0 && j+l<=hy && j+l>0){
								if (document.getElementById('case ' + (k+i) + ' ' + (j+l)).className == "9"){voisins++}
							}
						}
					}
					cEC.className = voisins;
				}
				var imageTempo = nvImage.cloneNode();
				imageTempo.src = "2-Contenus/" + cEC.className + ".png";
				imageTempo.id = "img " + i + " " + j;
				imageTempo.width = taille-2;
				imageTempo.height = taille-2;
				imageTempo.className = "cache";
				cEC.appendChild(imageTempo);
				cEC.onclick = function(){montrer(this);};
			}
		}
		
		edBR.className = "formPart";
		n = $(".cache").length - $(".9").length;
		eBombesRestantes.innerHTML = "Il reste " + n + " cases sans bombe.";
		jeu = true;
	}
	
	eTestInput.onclick = function(){
	}
	
	function montrer(el){
		if (jeu){
			el.firstChild.className = "montre";
			
			if (el.className == "0"){
				var maRegExp = /case\s(\d*)\s(\d*)/;
				var regExec = maRegExp.exec(el.id);
				const i = parseInt(regExec[1]);
				const j = parseInt(regExec[2]);
				var voisins = [];
				for (k=-1; k<=1; k++){
					for (l = -1; l<=1; l++){
						if(document.getElementById("case "+ (i+k) + " " + (j+l))){
							if (document.getElementById("case "+ (i+k) + " " + (j+l)).firstChild.className == "cache"){
								voisins.push(document.getElementById("case "+ (i+k) + " " + (j+l)));
							}
						}
					}
				}
				voisins.forEach(montrer);
			}
			n = $(".cache").length - $(".9").length;
			if (n>1){eBombesRestantes.innerHTML = "Il reste " + n + " cases sans bombe.";}
			else{eBombesRestantes.innerHTML = "Il reste une unique case sans bombe !"}
			if (el.className == "9"){defaite();}
			if (jeu && n==0){victoire();}
		}
	}
	
	function defaite(){
		clearInterval(compteur)
		eBombesRestantes.innerHTML = "Défaite !";
		jeu = false;
		
		infoMessage('Perdu !', 3000);
		function montrerSuivante(x,y){
			var cEC = document.getElementById('case ' + x + ' ' + y);
			y += 1;
			if (y>hy){
				y=1;
				x +=1;
			}
			if (x<=hx){
				if (cEC.className == '9'){
					cEC.firstChild.className = 'montre';
					montrerSuivante(x,y);
				}
				else{
					montrerSuivante(x,y);
				}
			}
		}
		montrerSuivante(1,1);
	}
	
	function victoire(){
		clearInterval(compteur)
		jeu = false;
		eBombesRestantes.innerHTML = "Bon travail !";
		infoMessage('Victoire !', 3000);
	}
	
	function infoMessage(message, temps){
		msgCount++;
		info.style.opacity = 0.75;
		info.style.bottom = "50%";
		info.style.zIndex = "2";
		pInfo.innerHTML = message;
		
		setTimeout(function(){
			if(msgCount == 1){
				info.style.opacity = 0;
				info.style.bottom = "100%";
				info.style.zIndex = "0";
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