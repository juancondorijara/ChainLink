## Ejemplos de Smart Contracts para el servicio Kaleido Chainlink

El servicio Chainlink de Kaleido es compatible con la popular tecnología Oracle descentralizada Chainlink . El servicio hace que sea trivial crear una red Chainlink autorizada adjunta a un entorno de cadena de bloques de Kaleido.

El proyecto demuestra el código de contrato inteligente que un cliente debe escribir para utilizar el servicio de Oracle después de que Chainlink se haya aprovisionado en Kaleido.

Se proporciona código de muestra para Solidity v0.4 y v0.5.

## Requisitos Previos

Antes de ejecutar los ejemplos, asegúrese de que las siguientes herramientas estén instaladas:

- __[node.js](https://nodejs.org/en/download/package-manager/)__
- __[truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation)__

## Prueba de los ejemplos

#### Aquí hay una descripción general de los pasos.

1. Cree un nodo Ethereum y un nodo Chainlink en su entorno Kaleido.
2. Cree un trabajo en el nodo Chainlink.
3. Establezca 4 `env` envvariables para conectar sus entornos:

```
JOB_ID
ETH_URL
LINK_ADDRESS
ORACLE_ADDRESS
```

4. Ejecute `npm i` y luego `truffle test`

Vamos a desglosarlo.

### Crear un Trabajo en el Nodo ChainLink

Después de agregar un servicio de Chainlink a un entorno de Kaleido, haga clic en el servicio para abrir el panel. Tome nota de la información esencial que se muestra para ejecutar los ejemplos:

- LINK CONTRACT ADDRESS: la dirección de contrato para el token de enlace. Esto es necesario para implementar el contrato de cliente de Chainlink, pero no es necesario pagar LINK para usar el servicio de Oracle en un entorno de Kaleido.
- ORACLE CONTRACT ADDRESS: la dirección del contrato de Oracle. Este es el componente central que hace que Chainlink funcione. Se debe informar al contrato de cliente de Chainlink en la muestra dónde se encuentra el contrato de Oracle para solicitar una ejecución de trabajo y se le debe devolver la llamada una vez que se completa la ejecución de trabajo.

Haga clic en el botón **OPEN CHAINLINK WEB UI** para abrir la IU del operador de Chainlink. Utilice el nombre de usuario y la contraseña que se muestran en el panel de servicio para iniciar sesión.

Después de iniciar sesión, haga clic en el botón "New Job", pegue el contenido JSON del archivo `chainlink-sample/jobs/eth-price.json`, y haga clic en **Create Job**.

Copie el valor de la identificación del trabajo que generó Chainlink y configure una variable de entorno en la línea de comando `JOB_ID` con este valor.

### Configuración de la URL del nodo Ethereum de Kaleido

La ejemplos de truffles de muestra implementará el contrato inteligente del cliente en el entorno de Kaleido de destino. Truffle necesita que le digan dónde está el nodo.

Todos los nodos de la cadena de bloques de Kaleido están protegidos por sólidas credenciales de autenticación. En la interfaz de usuario de la consola de Kaleido, busque un nodo de su propiedad, busque el menú ... en el lado derecho y haga clic en **Connect**. Luego seleccione el botón en el lado izquierdo para **Native JSON/RPC**. Se le pedirá que genere un par de credenciales sólidas. Una vez generada, se muestra una página de tablero para diferentes formas de conectarse al nodo de Kaleido. Busque la URL completa en la parte inferior de la página bajo la etiqueta **CONNECTION URL**. Haga clic en **Copy**.

Establezca la variable `ETH_URL` de entorno en el valor que acaba de copiar arriba. Esto será utilizado por `truffle-config.js` para apuntar las pruebas de trufas al nodo de Kaleido.

### Establecer Direcciones de Contrato de LinkToken y Oracle

El contrato inteligente del cliente Chainlink requiere que las direcciones de los contratos LinkToken y Oracle funcionen. Estos valores se muestran en el panel de control del servicio Chainlink en la interfaz de usuario de la consola de Kaleido, como se explicó anteriormente.

Copie esos valores y configúrelos en variables de entorno `LINK_ADDRESS` Y `ORACLE_ADDRESS` respectivamente.

### Ejecute los Trabajos de Chainlink

El trabajo de Chainlink puede ser activado por el contrato inteligente del cliente a través del contrato de Oracle. Los detalles de cómo funciona el mecanismo se pueden encontrar en [esta publicación web](http://kaleido.io/blog).

El Smart Contracts del cliente se puede escribir en Solidity v0.4 o v0.5. Se han proporcionado ejemplos para ambas versiones, en los directorios `v0.4` and `v0.5` respectivamente.

Vaya al directorio de la versión de Solidity que le gustaría usar e instale primero las dependencias:

```
npm i
```

Luego puede ejecutar el ejemplo iniciando truffle test:

```
$ truffle test
Using network 'development'.


Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
✔ Downloading compiler. Attempt #1.
> Compiling ./contracts/EthPrice.sol
> Compiling ./contracts/Migrations.sol
> Compiling chainlink/contracts/Chainlink.sol
> Compiling chainlink/contracts/ChainlinkClient.sol
> Compiling chainlink/contracts/interfaces/ChainlinkRequestInterface.sol
> Compiling chainlink/contracts/interfaces/ENSInterface.sol
> Compiling chainlink/contracts/interfaces/LinkTokenInterface.sol
> Compiling chainlink/contracts/interfaces/PointerInterface.sol
> Compiling chainlink/contracts/vendor/Buffer.sol
> Compiling chainlink/contracts/vendor/CBOR.sol
> Compiling chainlink/contracts/vendor/ENSResolver.sol
> Compiling chainlink/contracts/vendor/Ownable.sol
> Compiling chainlink/contracts/vendor/SafeMath.sol


  Contract: EthPrice
    Solidity 0.4 based EthPrice contract
      ✓ deploys the EthPrice contract (167ms)
      ✓ Calling requestEthereumPrice() with job ID 4149eac8974b4daabadc11ce4eb3da03 (9380ms)


  2 passing (10s)


```

Para verificar que el trabajo se haya activado y ejecutado correctamente, vaya a la interfaz de usuario del operador de Chainlink y verifique las entradas de Ejecuciones del trabajo. Una ejecución exitosa debe tener un estado de `Complete`.

¡Felicidades! ¡Ha ejecutado con éxito la aplicación de ejemplo de Chainlink! Para obtener más detalles sobre la integración de Chainlink en su aplicación, visite el repositorio de la [Kaleido Samples Gallery](https://github.com/kaleido-io/kaleido-samples-gallery).

¿Tiene algún comentario sobre cómo se puede mejorar aún más el servicio Chainlink en Kaleido? O si su proyecto necesita hablar con el mundo exterior a partir de sus contratos inteligentes y desea comprender mejor cómo Chainlink puede ayudarlo, no dude en contactar a support@kaleido.io.
