const greeting = document.querySelector('.greeting');

window.onload = () => {
    if(!sessionStorage.name){
        location.href = '/hostel_finder.html';
    } else{
        greeting.innerHTML = `Hello ${sessionStorage.name}`;
    }
}

const logOut = document.querySelector('.logout');

logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
}


const box = document.querySelector('.box');
const add = document.querySelector('.add');
const cancel = document.querySelector('.cancel');

add.addEventListener('click',()=>{
    box.classList.add('active');
});

cancel.addEventListener('click',()=>{
    box.classList.remove('active');
});


const name = document.querySelector('.name');
const phone = document.querySelector('.phone');
const address = document.querySelector('.address');
const type = document.querySelector('.type');
const bedroom = document.querySelector('.bedroom');
const bathroom = document.querySelector('.bathroom');
const furnishing = document.querySelector('.furnishing');
const allow = document.querySelector('.allow');
const image = document.querySelector('.image');
// const secondimage = document.querySelector('.secondimage');
// const thirdimage = document.querySelector('.thirdimage');
const post = document.querySelector('.post');

post.addEventListener('click',()=>{
    fetch('/post',{
        method: 'post',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify({
            name: name.value,
            phone: phone.value,
            address: address.value,
            type: type.value,
            bedroom: bedroom.value,
            bathroom: bathroom.value,
            furnishing: furnishing.value,
            allow: allow.value,
            image: image.value
        })
    })
})