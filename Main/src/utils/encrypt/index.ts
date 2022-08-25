import { Blob } from "buffer";
const { subtle, getRandomValues } = require("crypto").webcrypto;
import { createHash } from "crypto";
const fs = require("fs");
const fsPromises = fs.promises;
import * as bcrypt from "bcryptjs";

//解构语法要使用接口定义
interface cipherObject {
  ciphertext: any; //ArrayBuffer
  iv: Uint8Array;
}

interface cipher_object {
  ciphertext_base64: string;
  iv_base64: string;
}

function toArrayBuffer(buf: Buffer) {
  var ab = new ArrayBuffer(buf.length);
  var view = new Uint8Array(ab);
  for (var i = 0; i < buf.length; ++i) {
    view[i] = buf[i];
  }
  return ab;
}

export class EncryptService {
  //-----------------------–––-––-––––––-----------------------------------------------------
  //密钥加密相关基础算法
  async importAesKey(
    keyData: ArrayBuffer | Object,
    format = "raw",
    length = 256
  ): Promise<CryptoKey> {
    const key = await subtle.importKey(
      format,
      keyData,
      {
        name: "AES-CBC",
        length,
      },
      true,
      ["encrypt", "decrypt"]
    );

    return key;
  }

  async exportAesKey(format = "raw"): Promise<ArrayBuffer> {
    const key = await this.generateAesKey();

    return subtle.exportKey(format, key);
  }

  async generateAesKey(length = 256): Promise<CryptoKey> {
    const key = await subtle.generateKey(
      {
        name: "AES-CBC",
        length,
      },
      true,
      ["encrypt", "decrypt"]
    );

    return key;
  }

  async aesEncrypt(plaintext: string, key: CryptoKey): Promise<cipherObject> {
    const ec = new TextEncoder();
    const iv = getRandomValues(new Uint8Array(16));

    const ciphertext = await subtle.encrypt(
      {
        name: "AES-CBC",
        iv,
      },
      key,
      ec.encode(plaintext)
    );

    return {
      ciphertext,
      iv,
    };
  }

  async aesDecrypt(
    ciphertext: ArrayBuffer,
    key: CryptoKey,
    iv: Uint8Array
  ): Promise<string> {
    const dec = new TextDecoder();

    const plaintext = await subtle.decrypt(
      {
        name: "AES-CBC",
        iv,
      },
      key,
      ciphertext
    );

    return dec.decode(plaintext);
  }
  //-----------------------–––-––-––––––-----------------------------------------------------
  //-----------------------–––-––-––––––-----------------------------------------------------
  //密钥导入与导出
  //keyExportLocal应该只被调用一次
  async keyExportLocal(path: string): Promise<void> {
    const key_raw = await this.exportAesKey();
    await fs.writeFile(path, Buffer.from(key_raw), (res: any) => {});
  }

  async keyExportLocal_base64(path: string): Promise<void> {
    const key_raw = await this.exportAesKey();
    const key_base64 = Buffer.from(key_raw).toString("base64");
    await fs.writeFile(path, key_base64, (res: any) => {});
  }

  async keyImportLocal(path: string): Promise<CryptoKey> {
    var key_buffer = Buffer.alloc(16);
    var filehandler = await fsPromises.open(path);
    await filehandler.read(key_buffer, 0, key_buffer.length, 0).then();
    return await this.importAesKey(key_buffer.buffer, "raw", 256).then();
  }
  //-----------------------–––-––-––––––-----------------------------------------------------
  //password相关操作
  async pw2base64(password: string, keyPath: string): Promise<cipher_object> {
    const cryptoKey = await this.keyImportLocal(keyPath).then();
    const cipher_obj = await this.aesEncrypt(password, cryptoKey).then();

    // const cipher_obj_blob = new Blob([ciphertext, iv]);
    // const cipher_obj_buffer = Buffer.from(await cipher_obj_blob.arrayBuffer().then()).toString('base64');
    const { ciphertext, iv } = cipher_obj;
    const ciphertext_base64 = Buffer.from(ciphertext).toString("base64");
    const iv_base64 = Buffer.from(iv).toString("base64");

    return {
      ciphertext_base64,
      iv_base64,
    };
  }

  async base642pw(
    ciphertext_base64: string,
    iv_base64: string
  ): Promise<string> {
    const key = await this.keyImportLocal("key.txt").then();
    const ciphertext_buffer = Buffer.from(ciphertext_base64, "base64");
    const iv_buffer = Buffer.from(iv_base64, "base64");
    const ciphertext = toArrayBuffer(ciphertext_buffer);
    const iv = new Uint8Array(iv_buffer);
    const result = await this.aesDecrypt(ciphertext, key, iv).then();
    return result;
  }

  async pw2bcrypt(password: string): Promise<string> {
    const salt = await bcrypt.genSalt().then();
    const result_pw = await bcrypt.hash(password, salt).then();
    return result_pw;
  }

  //-----------------------–––-––-––––––-----------------------------------------------------
  //数据md5生成
  async md5_hex(blob: Blob): Promise<string> {
    return createHash("md5")
      .update(Buffer.from(await blob.arrayBuffer().then()))
      .digest("hex");
  }

  async md5_base64(blob: Blob): Promise<string> {
    return createHash("md5")
      .update(Buffer.from(await blob.arrayBuffer().then()))
      .digest("base64");
  }

  //-----------------------–––-––-––––––-----------------------------------------------------
  //RSA算法：签名与验证
  async getRsaKey(modulusLength = 2048, hash = "SHA-256") {
    const publicExponent = new Uint8Array([1, 0, 1]);
    const { publicKey, privateKey } = await subtle.generateKey(
      {
        name: "RSASSA-PKCS1-v1_5",
        modulusLength,
        publicExponent,
        hash,
      },
      true,
      ["sign", "verify"]
    );

    return { publicKey, privateKey };
  }

  async getRsaKey_OAEP(hash = "SHA-256", modulusLength = 2048) {
    const publicExponent = new Uint8Array([1, 0, 1]);
    const { publicKey, privateKey } = await subtle.generateKey(
      {
        name: "RSA-OAEP",
        hash,
        modulusLength,
        publicExponent,
      },
      true,
      ["encrypt", "decrypt"]
    );

    return { publicKey, privateKey };
  }

  //验证与签名
  async sign_RSA(key: any, data: any) {
    const ec = new TextEncoder();
    const signature = await subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      ec.encode(data)
    );
    return signature;
  }

  async verify_RSA(key: any, signature: any, data: any) {
    const ec = new TextEncoder();
    const verified = await subtle.verify(
      "RSASSA-PKCS1-v1_5",
      key,
      signature,
      ec.encode(data)
    );
    return verified;
  }

  async rsaEncrypt_OAEP(
    plaintext: string,
    key: CryptoKey
  ): Promise<ArrayBuffer> {
    const ec = new TextEncoder();
    const ciphertext = await subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      key,
      ec.encode(plaintext)
    );

    return ciphertext;
  }

  async rsaDecrypt_OAEP(
    ciphertext: ArrayBuffer,
    key: CryptoKey
  ): Promise<string> {
    const dec = new TextDecoder();

    const plaintext = await subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      key,
      ciphertext
    );

    return dec.decode(plaintext);
  }

  //-----------------------–––-––-––––––-----------------------------------------------------
}

const encryptService = new EncryptService();
async function main() {
  //1.生成服务，使用同一密钥：在test.ts文件中生成密钥至本地，从本地提取密钥
  // await encryptService.keyExportLocal('key.txt');
  //2.一端或两端通信加解密还原
  //3.AES，秘文与明文长度的一致性
  const text0 = "19240134";
  const key = await encryptService.keyImportLocal("../key.txt");

  //第一部分，base64与aes加密内容雪崩效应的无关性：
  /*     console.log('第一部分，base64与aes加密内容雪崩效应的无关性：');
        const cipher_obj = await encryptService.aesEncrypt(text0, key);
        const { ciphertext, iv } = cipher_obj;
        const ciphertext_base640 = Buffer.from(ciphertext).toString('base64');
        const ciphertext_base641 = Buffer.from(ciphertext).toString('base64');
        const ciphertext_base642 = Buffer.from(ciphertext).toString('base64');
        console.log(ciphertext_base640);
        console.log(ciphertext_base641);
        console.log(ciphertext_base642); */

  /*         console.log('第一组，aes加密雪崩效应：');
        console.log('aes密文元内容的雪崩效应（随机性）：');
        await encryptService.aesEncrypt(text0, key).then(console.log);
        await encryptService.aesEncrypt(text0, key).then(console.log);
        await encryptService.pw2base64(text0, 'key.txt').then(console.log);
        await encryptService.pw2base64(text0, 'key.txt').then(console.log);
        await encryptService.pw2base64(text0, 'key.txt').then(console.log);  */

  /*     console.log('第二组，对称加密（分组加密）密文长度与明文长度的线性关系');
        await encryptService.aesEncrypt(text3, key).then(console.log);
        await encryptService.aesEncrypt(text4, key).then(console.log);
        await encryptService.aesEncrypt(text5, key).then(console.log);
        await encryptService.pw2base64(text3, 'key.txt').then(console.log);
        await encryptService.pw2base64(text4, 'key.txt').then(console.log);
        await encryptService.pw2base64(text5, 'key.txt').then(console.log); */

  //4.第二部分，公开加密RSA，数字签名（私钥加密，公钥解密），验证签名
  // console.log('第二部分，公开加密RSA，数字签名（私钥加密，公钥解密），验证签名');
  /*         const { publicKey, privateKey } = await encryptService.getRsaKey();
        console.log(publicKey);
        console.log(privateKey);
        const signature = await encryptService.sign_RSA(privateKey, text0);
        await encryptService.verify_RSA(publicKey, signature, text0).then(console.log); */

  //RSA算法切换说明
  //第二组，RSA——OAEP算法加解密演示
  //RSA雪崩效应演示
  /*         const { publicKey, privateKey } = await encryptService.getRsaKey_OAEP();
        console.log(publicKey, privateKey);
        const cipher_obj0 = await encryptService.rsaEncrypt_OAEP(text0, publicKey)
        const cipher_obj1 = await encryptService.rsaEncrypt_OAEP(text1, publicKey)
        const cipher_obj2 = await encryptService.rsaEncrypt_OAEP(text2, publicKey)
        console.log(cipher_obj0);
        console.log(cipher_obj1);
        console.log(cipher_obj2);
        console.log(Buffer.from(cipher_obj0).toString('base64') + '\n\n');
        console.log(Buffer.from(cipher_obj1).toString('base64') + '\n\n');
        console.log(Buffer.from(cipher_obj2).toString('base64') + '\n\n');
        await encryptService.rsaDecrypt_OAEP(cipher_obj0, privateKey).then(console.log);
        await encryptService.rsaDecrypt_OAEP(cipher_obj1, privateKey).then(console.log);
        await encryptService.rsaDecrypt_OAEP(cipher_obj2, privateKey).then(console.log); */

  //5.第三部分，散列算法MD5
  // console.log('第三部分，散列算法MD5');
  /*    

        const text_blob6 = new Blob([text6]);
        const text_blob7 = new Blob([text7]);
        const text_blob8 = new Blob([text8]);
        console.log('md5雪崩效应:');
        await encryptService.md5_base64(text_blob6).then(console.log);
        await encryptService.md5_base64(text_blob7).then(console.log);
        await encryptService.md5_base64(text_blob8).then(console.log);

        console.log('md5密文定长:');
        const text_blob9 = new Blob(['']);
        const text_blob10 = new Blob(['']);
        const text_blob11 = 
        await encryptService.md5_base64(text_blob9).then(console.log);
        await encryptService.md5_base64(text_blob10).then(console.log);
        await encryptService.md5_base64(text_blob11).then(console.log);
        */
}
main();
