
# NFT Webdox

NFT Webdox es un sistema descentralizado de registro basado en tecnología blockchain y tokens no fungibles (NFTs). El proyecto tiene como objetivo demostrar la aplicación práctica de conceptos de sistemas distribuidos, tales como descentralización, consenso, inmutabilidad y comunicación entre nodos.

Este proyecto fue implementado como parte del curso de Sistemas Distribuidos, aplicando los conocimientos expuestos en clase sobre arquitecturas descentralizadas y tecnologías Web3.

## Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### npm start

Ejecuta la aplicación en modo desarrollo.
Abre http://localhost:3000
 para verla en el navegador.

La página se recarga automáticamente cuando realizas cambios.
También verás errores de lint en la consola si los hay.

### npm test

Ejecuta el entorno de pruebas en modo interactivo.
Ver la sección sobre ejecución de pruebas
 para más información.

### npm run build

Genera una versión optimizada para producción en la carpeta build.
Los archivos son minificados y los nombres incluyen hash para garantizar caché eficiente.

La aplicación queda lista para ser desplegada en un entorno de producción.
Para más información sobre despliegue, ver:
Deployment

### npm run eject

Advertencia: esta acción es irreversible.

Este comando expone toda la configuración interna de Create React App (Webpack, Babel, ESLint, etc.) para permitir personalizaciones avanzadas.
Solo debe usarse si realmente necesitas control total sobre la configuración.

## Arquitectura del Sistema

La arquitectura de NFT Webdox se basa en un modelo distribuido compuesto por:

1. Interfaz Web (React + Web3.js)

  Permite registrar, consultar y validar NFTs.

  Se comunica con Metamask para firmar transacciones.

  Interactúa con el contrato inteligente usando Web3.js o Ethers.js.

2. Smart Contract (Solidity)

  Funciones principales:

  Registrar un activo y generar un NFT asociado.

  Guardar metadatos del registro.

  Verificar la propiedad de un NFT.

  Consultar registros existentes.

  El contrato se despliega en una red Ethereum compatible (local o testnet).

3. Blockchain (Red EVM)

  Actúa como:

  Libro mayor distribuido.

  Mecanismo de consenso.

  Almacenamiento inmutable y transparente.

## Diagrama General de Arquitectura
                +---------------------------+
                |        Usuario            |
                +-------------+-------------+
                              |
                              v
                +---------------------------+
                |       Interfaz Web        |
                |         (React)           |
                +-------------+-------------+
                              |
                    Web3.js / Metamask
                              |
                              v
                +---------------------------+
                |   Smart Contract (Solidity)|
                +-------------+--------------+
                              |
                              v
                +---------------------------+
                |     Blockchain (EVM)      |
                |  Registro de NFTs / TXs   |
                +---------------------------+

## Objetivo Académico

NFT Webdox fue desarrollado para aplicar conceptos clave del curso de Sistemas Distribuidos, como:

  Descentralización computacional

  Comunicación entre nodos

  Consenso distribuido

  Inmutabilidad del estado

  Ausencia de servidor central

  Smart contracts como componentes determinísticos distribuidos

El proyecto funciona como una aplicación práctica de la teoría expuesta en el tema de tecnologías Web3 y sistemas distribuidos.

## Conclusiones

La integración entre React, Web3 y contratos inteligentes permite construir sistemas auténticamente descentralizados.

La blockchain proporciona un mecanismo robusto de almacenamiento inmutable ideal para registros digitales.

El uso de NFTs permite representar la propiedad de activos de manera verificable y transparente.

NFT Webdox demuestra que los sistemas distribuidos pueden aplicarse a casos reales como certificación, validación de documentos y trazabilidad.

La arquitectura distribuida mejora la seguridad evitando un punto único de fallo.

## Recomendaciones

Integrar almacenamiento descentralizado para metadatos (IPFS).

Implementar autenticación por roles dentro del contrato inteligente.

Añadir soporte para múltiples wallets (Coinbase Wallet, WalletConnect).

Incorporar pruebas automatizadas para mayor robustez.

Ampliar el proyecto hacia un caso real: certificados académicos, contratos, documentos notariales, etc.
