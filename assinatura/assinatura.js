import {generateKeyPairSync, createSign, createVerify} from 'crypto';

const {privateKey, publicKey} = generateKeyPairSync('rsa',  {
    modulusLength: 2048,

    publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
    },
});

let dados = "Essa string vai ser assinada!";

//assinatura

const assinador = createSign('rsa-sha256');

assinador.update(dados);

const assinatura = assinador.sign(privateKey, 'hex');

console.log(`Assinatura ${assinatura}`);

//intermediario

// dados +=' Arquivo alterado'

//envio desse documento p outra pessoa -------- documento e assinatura e a chave publica

const verificador = createVerify('rsa-sha256');
verificador.update(dados);
const isVerificado = verificador.verify(publicKey, assinatura, 'hex');

console.log(isVerificado);