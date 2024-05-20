const kelime = document.getElementById('word');
const popup = document.getElementById('popup-container');
const wrong_letters = document.getElementById('wrong-letters');
const popup_message = document.getElementById('success-message');
const sehpa = document.getElementById('sehpa');
const items = document.querySelectorAll('.item');
const message = document.getElementById('message');
const PlayAgainButton = document.getElementById('play-again');
const puan = document.getElementById('puan');

const dogru_harfler = [];
const yanlis_harfler = [];
let getWord = get_Word();


function get_Word() {
    const kelimeler = prompt("Oyuna Başlamak İçin Bir Kelime Giriniz...",'');
    return kelimeler;
}

function displayWord(){

    kelime.innerHTML = `
        ${getWord.split('').map(harf => `
            <div class="letter">
                ${dogru_harfler.includes(harf) ? harf:''}
            </div>
        `).join('')}
    
    `;

    const kelime_kontrol = kelime.innerText.replace(/\n/g,'');
    if (kelime_kontrol === getWord){
        const point = 100 - (yanlis_harfler.length*10);
        popup.style.display= 'flex'; 
        popup_message.innerText = "TEBRİKLER KAZANDINIZ";
        puan.innerText = ("PUANINIZ: " + point) ;
    }
}


function wrongLetter(){
    
    wrong_letters.innerHTML = `
        ${yanlis_harfler.length>0 ? '<h3>Hatalı Harfler<h3>':''}
        ${yanlis_harfler.map(harf => `<span> ${(harf)}</span>`)}
    `;

    
    items.forEach((item,index) => {
        const wrongCount = yanlis_harfler.length;
        
        if(index < wrongCount){
            item.style.display = 'block';
        }
        else{
            item.style.display= 'none';
        }
    })
    if(yanlis_harfler.length === items.length){
        popup.style.display = 'flex';
        popup_message.innerText = "KAYBETTİNİZ";
        puan.style.display = 'none';
        popup.style.bottom = '-150px';       
    }   

}

function displayMessage(){
    message.classList.add('show');
    
    setTimeout(function(){
        message.classList.remove('show');
    },1000);
}

PlayAgainButton.addEventListener('click', function(){
    dogru_harfler.splice(0);
    yanlis_harfler.splice(0);
    getWord = get_Word();
    displayWord();
    wrongLetter();
    popup.style.display = 'none';
});

window.addEventListener('keydown', function(e){
    if(e.keyCode >= 65 && e.keyCode <=90){
        const letter = e.key;

        if(getWord.includes(letter)){
            if(!dogru_harfler.includes(letter)){
                dogru_harfler.push(letter);
                displayWord();
            }
            else{
                displayMessage();
            }
        }
        else{
            if(!yanlis_harfler.includes(letter)){
                yanlis_harfler.push(letter);
                wrongLetter();
            }
            else{
                displayMessage();
            }
        }
    }
});
displayWord();