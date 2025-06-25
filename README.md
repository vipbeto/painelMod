<h1 align="center">
  <img src="https://i.ibb.co/7SMc2NX/logo.jpg" alt="DTunnel" style="width: 80px; height: 80px; border-radius: 50%;">
</h1>

<h4>Painel Exclusivo Para Dtmod</h4>
• 📌 Funciona a partir do ubuntu 20 e Debian

<br> <p align="center">
 <img src="https://img.shields.io/static/v1?label=DTunnel&message=Mod&color=E51C44&labelColor=0A1033" />
  <img src="https://img.shields.io/static/v1?label=Open&message=Source&color=E51C44&labelColor=0A1033" />
  <img src="https://i.ibb.co/0yPYBjy/preview.png" />
</p>

<h3>• Instalação Automática</h3> <br>

```sh
sudo apt install wget -y; wget https://raw.githubusercontent.com/vipbeto/painelMod/main/i.sh; chmod 777 i.sh; ./i.sh
```
✅ Adicionado um menu simples <br>
• para acessar digite ```menuop``` <br>
• Comando pra ativar/reiniciar ```pon``` <br>
• Comando para desativar ```poff``` <br>


<br> ###########################

<h3>• Instalação Manual</h3>
Primeiramente clone o projeto

```sh
git clone https://github.com/vipbeto/painelMod.git
```
Agora acesse a pasta ```cd painelMod``` e crie o arquivo ```.env```

```cl
PORT=                // 3000
NODE_ENV=            // "production"
DATABASE_URL=        // "file:./database.db"
CSRF_SECRET=         //
JWT_SECRET_KEY=      //
JWT_SECRET_REFRESH=  //
```
```CSRF_SECRET```, ```JWT_SECRET_KEY```, ```JWT_SECRET_REFRESH``` são chaves secretas sensíveis, ninguém além de você deve ter acesso a elas, para garantir a segurança do painel recomendo que utilizem este comando para gerar chaves privadas:
```js
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
```

### 1. Instale as dependências:

```bash
npm install
```

### 2. Gerar artefactos do prisma

```bash
npx prisma generate
```

### 3. Crie as migrations do banco de dados

```bash
npx prisma migrate deploy
```

### 4. Rodando o projeto

```bash
npm run dev
```
