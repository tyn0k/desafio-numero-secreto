// El principal objetivo de este desafío es fortalecer tus habilidades en lógica de programación. Aquí deberás desarrollar la lógica para resolver el problema.
let listaAmigoSecreto = []

function limpiarCaja() {
    document.getElementById('amigo').value = '';
}

function agregarAmigo() {
    let nuevoAmigo = document.getElementById('amigo').value;
    console.log(typeof(nuevoAmigo));
    console.log(nuevoAmigo);
    listaAmigoSecreto.push(nuevoAmigo);
    console.log(listaAmigoSecreto);
    limpiarCaja();
}