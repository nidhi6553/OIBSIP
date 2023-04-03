function disp(val)
{
document.getElementById("math").value+=val
 }
function solve()
{
let x = document.getElementById("math").value
let y = eval(x)
document.getElementById("math").value = y}

function clr()
{
document.getElementById("math").value = ""
}