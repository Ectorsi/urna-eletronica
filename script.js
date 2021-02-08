let seuVotoPara = document.querySelector('.d-1-1 span')
let cargo = document.querySelector('.d-1-2 span')
let descricao = document.querySelector('.d-1-4')
let aviso = document.querySelector('.d-2')
let lateral = document.querySelector('.d-1-right')
let numeros = document.querySelector('.d-1-3')


let etapaAtual = 0
let numero = ''
let votoBranco = false

function comecarEtapa() {

    let etapa = etapas[etapaAtual]
    // console.log(etapa)

    let numerosHtml = ''
    numero = ''
    votoBranco = false
    for (let i = 0; i < etapa.numeros; i++) {
        if (i === 0) {
            numerosHtml += '<div class="numero pisca"></div>'
        } else {
            numerosHtml += '<div class="numero"></div>'
        }
    }

    seuVotoPara.style.display = 'none'
    cargo.innerHTML = etapa.titulo
    // console.log(cargo)
    descricao.innerHTML = ''
    aviso.style.display = 'none'
    lateral.innerHTML = ''
    numeros.innerHTML = numerosHtml
}


function atualizaInterface() {
    console.log('Atualizando Interface...')
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter(item => {
        if(item.numero === numero){
            return true
        }else{
            return false
        }
    })
    if(candidato.length > 0){
        candidato = candidato[0]
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`
        
        let fotosHtml = ''

        for(let i in candidato.fotos){
            fotosHtml += `<div class="d-1-image"><img src="./img/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
        }

        lateral.innerHTML = fotosHtml
    }else{
        seuVotoPara.style.display = 'block'
        aviso.style.display = 'block'
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
    }
    
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca')
    if (elNumero !== null) {
        elNumero.innerHTML = n
        numero = `${numero}${n}`

        elNumero.classList.remove('pisca')

        if (elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca')
        }else{
            atualizaInterface()
        }
    }
}

function branco() {
    // console.log(`Você clicou em BRANCO`)
    comecarEtapa()
    numero = ''
    numeros.innerHTML = ''
    votoBranco = true
    seuVotoPara.style.display = 'block'
    aviso.style.display = 'block'
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
}

function corrige() {
    // console.log(`Você clicou em CORRIGE`)
    comecarEtapa()
    
}

function confirma() {
    // console.log(`Você clicou em CONFIRMA`)
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false
    if(votoBranco === true){
        votoConfirmado = true
        console.log('Votando em Branco')
    }else if(numero.length === etapa.numeros){
        votoConfirmado = true
        console.log(`Confirmando como ${numero}`)
    }

    if(votoConfirmado){
        etapaAtual++
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
            document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>'
        }
    }

}

comecarEtapa()