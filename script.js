const password=document.getElementById("password")
const bars=document.querySelectorAll(".bar")

password.addEventListener("input",checkPassword)

document.getElementById("toggleEye").onclick=()=>{
password.type=password.type==="password"?"text":"password"
}

document.getElementById("darkToggle").onclick=()=>{
document.body.classList.toggle("dark")
}

document.getElementById("generateBtn").onclick=generatePassword

function checkPassword(){

let pass=password.value
let score=0

let length=pass.length>=8
let upper=/[A-Z]/.test(pass)
let lower=/[a-z]/.test(pass)
let number=/[0-9]/.test(pass)
let symbol=/[!@#$%^&*]/.test(pass)

updateReq("len",length)
updateReq("upper",upper)
updateReq("lower",lower)
updateReq("num",number)
updateReq("sym",symbol)

if(length)score++
if(upper)score++
if(lower)score++
if(number)score++
if(symbol)score++

updateStrength(score)
entropy(pass)
crack(pass)

}

function updateReq(id,valid){

let el=document.getElementById(id)

if(valid){
el.classList.add("valid")
}else{
el.classList.remove("valid")
}

}

function updateStrength(score){

bars.forEach(bar=>bar.style.background="#334155")

let text=document.getElementById("strengthText")

if(score<=1){

bars[0].style.background="#ef4444"
text.innerText="Weak"

}

else if(score==2){

bars[0].style.background="#f59e0b"
bars[1].style.background="#f59e0b"
text.innerText="Medium"

}

else if(score<=4){

bars[0].style.background="#22c55e"
bars[1].style.background="#22c55e"
bars[2].style.background="#22c55e"
text.innerText="Strong"

}

else{

bars.forEach(bar=>bar.style.background="#16a34a")
text.innerText="Very Strong"

}

}

function entropy(pass){

let charset=0

if(/[a-z]/.test(pass))charset+=26
if(/[A-Z]/.test(pass))charset+=26
if(/[0-9]/.test(pass))charset+=10
if(/[!@#$%^&*]/.test(pass))charset+=32

let ent=pass.length*Math.log2(charset||1)

document.getElementById("entropy").innerText=ent.toFixed(1)+" bits"

}

function crack(pass){

let guesses=Math.pow(94,pass.length)

let seconds=guesses/1000000000

let time="Instantly"

if(seconds>60)time="Minutes"
if(seconds>3600)time="Hours"
if(seconds>86400)time="Days"
if(seconds>31536000)time="Years"

document.getElementById("crack").innerText=time

}

function generatePassword(){

let chars="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*"

let pass=""

for(let i=0;i<16;i++){
pass+=chars[Math.floor(Math.random()*chars.length)]
}

password.value=pass

checkPassword()

}