
# Playlist Manager &middot; [![Build Status](https://img.shields.io/travis/npm/npm/latest.svg?style=flat-square)]() [![node](https://img.shields.io/badge/node-6.10.x-brightgreen.svg?style=flat-square)]() [![npm](https://img.shields.io/badge/npm-3.10.x-brightgreen.svg?style=flat-square)]()

Mini sitio para manejar playlists

## Desarrollo

### Tecnologias utlilizadas :
* react
* react router 
* bootstrap
* node.js
* express 


### Pre-requisitos
Para levantar el proyecto es necesario tener instalado node.js (> 6.10) y npm (> 3.10).


### Configuracion ambiente de desarrollo

Para empezar a trabajar en el proyecto es necesario clonarlo desde el repo correspondiente. Luego dirigirse a la carpeta del proyecto e instalar todas las dependencias del servidor (node.js) y del cliente (react, etc):

```shell
git clone https://github.com/matiasdelagente/playlist-manager.git
cd playlist-manager
npm install
cd client
npm install
```

Para inicialiarlo solo hay que volver al directorio raiz y usar npm para levantar el servidor como el cliente

```shell
cd ..
npm start
```

Este script de npm levanta el servicio de node (reinicia el server ante cualquier cambio automaticamente) y el servicio del cliente (react-script).
Pueden verse con detalle el archivo package.json

### Building

Para hacer una build del proyecto, debemos se utliza un script de npm y luego por separado, el comando nodemon para levantar el server (para desarrollo solo se usa un solo comando para ambas cosas).

```shell
npm run build
nodemon server.js
```

### Produccion

Se accede al proyecto por el puerto 8888
138.197.187.143:88

Para desplegar cambios en produccion se debe ingresar al servidor (en ssh por el puerto 22100) y ejecutar las tareas de building en la raiz del proyecto que corresponden.

```shell
ssh root@138.197.187.143 -p 22100
cd /var/www/playlist-manager
```

Actualizar el directorio con los ultimos cambios del repo de forma manual, y hacer la build correspondiente.

```shell
git pull origin
npm run build
```

El sitio web se sirve con nginx, por lo que se debe reiniciar el proceso para tomar los nuevos cambios.

```shell
sudo service nginx restart
```

En el caso de tener cambios relacionados con la api (el servidor en node). Reiniciamos el servicio de node, pero esta vez con pm2 ( manejador de procesos de node para entornos productivos )

```shell
pm2 restart all
```