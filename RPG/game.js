let stats = {
    "life": 69,
    "strength": 10,
    "endurance": 10,
    "deffense": 10,
    "experience": 0 
}
let lvlcap=10;
let available_points = 0;

let lvl = 0;

let lvl_description = [
    ["Paintes virgin 1 bit vagy, még nem is vagy jól megrajzolva", "profile_lvl0.jpg"],
    ["Egy jól croppolt 10-es vagy, binárisan","profile_lvl1.jpg"],
    ["A Mátrixot coppintod, de 10-en kívül a budgetből nem jutott másra csak üres bitekre","profile_lvl2.jpg"],
    ["Te vagy a Mátrix, még akkor is ha netről lopott kép vagy", "profile_lvl3.jpg"]
];

let profile_stats = {
    "pics": document.getElementById("profile_pics"),
    "description": document.getElementById("description"),
    "life": document.getElementById("profile_life"),
    "strength": document.getElementById("profile_strength"),
    "endurance": document.getElementById("profile_endurance"),
    "deffense": document.getElementById("profile_deffense"),
    "experience": document.getElementById("profile_experience"),
    "next_level": document.getElementById("next_lvl")
}
function refreshProfileStats(){
    profile_stats.pics.src = "pics/"+lvl_description[lvl][1]
    profile_stats.life.innerHTML = stats.life;
    profile_stats.strength.innerHTML = stats.strength;
    profile_stats.endurance.innerHTML = stats.endurance;
    profile_stats.deffense.innerHTML = stats.deffense;
    profile_stats.experience.innerHTML = stats.experience;
    profile_stats.description.innerHTML = lvl_description[lvl][0];
    profile_stats.next_level.innerHTML = lvlcap;
    display_addBtns();
}

refreshProfileStats();

function update_strength(){
    if(available_points > 0){
        available_points--;
        stats.strength += 5;
        refreshProfileStats();
    }
}
function update_endurance(){
    if(available_points > 0){
        available_points--;
        stats.endurance += 5;
        refreshProfileStats();
    }
}
function update_deffense(){
    if(available_points > 0){
        available_points--;
        stats.deffense += 5;
        refreshProfileStats();
    }
}

function display_addBtns(){
    let btns = document.getElementsByClassName("addButtons");
    if(available_points > 0){
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="inline";
        }
    } else{
        for (let i = 0; i < btns.length; i++) {
            const element = btns[i];
            element.style.display="none";
        }
    }
}

function lvl_up(){
	if(stats.experience>=lvlcap){
    if(lvl < lvl_description.length - 1){
        available_points += 6;
        lvl++;
		lvlcap+=10;
	refreshProfileStats();}
    }
	else{alert("Nem vagy elég nagy szintű");}
}

/* ADVENTURE */

let story =  document.getElementById("story");

function rnd_szazalek(){
    return Math.floor(Math.random()*100);
}

function favagas(){
    let szazalek = rnd_szazalek();
    if(szazalek <= 20 && szazalek>10){
        harc("Netes troll", 100, 8);

        refreshProfileStats();} 
	else if(szazalek<=10){harc1("Bináris bandita", 100, 12)}
	else{
        story.innerHTML += "Kiszámoltak veled valamit! Megérte? (+1 tapasztalat)<br>";
        stats.experience += 1;
    }
}
//Alternatív tér, nagyobb jutalom nagyobb ellenfél
function favagas1(){
    let szazalek = rnd_szazalek();
    if(szazalek <= 20){
        harc("Téged szidó blog", 200, 16);
        refreshProfileStats();
    } else{
        story.innerHTML += "Kicsit jobban érted az élet értelmét (+4 tapasztalat)<br>";
        stats.experience += 4;
        refreshProfileStats();
    }
}
//Healelésre
function favagas2(){
	let szazalek=rnd_szazalek();
	if(szazalek<=80){
		if(stats.life<=59){
			stats.life+=10; story.innerHTML +="Javítottak rajtad, köszönd a StackOverflow-nak!<br>";}
		else{story.innerHTML+="Javítani akartak, de hát nem lehet abból várat építeni <br>";}
		refreshProfileStats();}
	else{
		if(stats.life<=59){
			stats.life+=30;story.innerHTML+="Az indiai csávó tutorialja alapján akkorát javultál hogy az nem igaz!<br>";}
		else{story.innerHTML+="Javítani akartak, de hát nem lehet abból várat építeni<br>";}
		refreshProfileStats();
		}
}
//NEM KÉRDEZZÜK MEG de valamiért a popularity bugos és néha nem nő de ha healelünk meg igen, valahol kimaradhatott egy refreshProfileStats


function harc(e_name, e_life, e_damage){
    story.innerHTML = "Egy " + e_name + " fel akar téged törni!<br>";
    let counter = 0;
    let ellenfel_tamad = true;
    do {
        counter++;
        story.innerHTML += "<br>~~"+counter+". kör~~<br>";
        let szazalek = rnd_szazalek();
        if(ellenfel_tamad){

            let elkerules = 50 + stats.deffense;
            if(elkerules >= 100) elkerules = 95; 

            if(szazalek > elkerules){
                story.innerHTML +="A "+e_name+" még csshez is hülye, hát még hozzád!<br>";
            }else{
                story.innerHTML += "A " +e_name+" megtippelte az értékedet (-"+e_damage+" HP)<br>";
                stats.life -= e_damage;
            }
        }else{
            let elkerules = 50;
            if(szazalek > elkerules){
                story.innerHTML += "A "+e_name+" sem tudja, hogy egy bináris érték hogyan ütne vissza.<br>";
            }else{
                story.innerHTML += "Fejfájást okoztál a " +e_name+"nak! (-"+stats.strength+" ép elme)<br>";
                
                e_life -= stats.strength;

                story.innerHTML += e_name +"-nak/-nek "+e_life+" élete maradt!<br>";
            }

        }

        ellenfel_tamad = !ellenfel_tamad;

        
    } while (stats.life > 0 && e_life > 0 && counter <= 10);
	if(stats.life<0){alert("Ha ez egy jól kidolgozott RPG lenne meghaltál volna, de tessék bináris vagy szóval most megengedem hogy negatív HP-d legyen");}
}

function harc1(e_name, e_life, e_damage){
    story.innerHTML = "Egy " + e_name + " kihív téged egy számítási versenyre!<br>";
    let counter = 0;
    let ellenfel_tamad = true;
    do {
        counter++;
        story.innerHTML += "<br>~~"+counter+"-edik számítás~~<br>";
        let szazalek = rnd_szazalek();
        if(ellenfel_tamad){

            let elkerules = Math.random(10, 50) + stats.deffense;
            if(elkerules >= 100) elkerules = 95; 

            if(szazalek > elkerules){
                story.innerHTML +="A "+e_name+" nem tudott átváltani binárisból!<br>";
            }else{
                story.innerHTML += "A " +e_name+" hexadecimális értéket adott neked, nem értetted, fájt. (-"+e_damage+" HP)<br>";
                stats.life -= e_damage;
            }
        }
		else{
            let elkerules = Math.random(10, 50);
            if(szazalek > elkerules){
                story.innerHTML += "A "+e_name+"-nak nem okozott gondot a számolás.<br>";
            }else{
                story.innerHTML += "Fejfájást okoztál a " +e_name+"nak! (-"+stats.strength+" ép elme)<br>";
                
                e_life -= stats.strength;

                story.innerHTML += e_name +"-nak/-nek "+e_life+" életekedve maradt!<br>";
            }

        }

        ellenfel_tamad = !ellenfel_tamad;

        
    } while (stats.life > 0 && e_life > 0 && counter <= 10);
	if(stats.life<0){alert("Ha ez egy jól kidolgozott RPG lenne meghaltál volna, de tessék bináris vagy szóval most megengedem hogy negatív HP-d legyen");}
}