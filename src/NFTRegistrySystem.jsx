import React, { useState } from 'react';
import { Upload, FileText, Shield, Database, Check, AlertCircle } from 'lucide-react';

// Simulación de Blockchain
class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const str = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, Date.now(), { info: "Genesis Block" }, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(data) {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      data,
      this.getLatestBlock().hash
    );
    this.chain.push(newBlock);
    return newBlock;
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }
    return true;
  }
}

const NFTRegistrySystem = () => {
  const [blockchain] = useState(() => new Blockchain());
  const [assets, setAssets] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    owner: '',
    documentType: 'image'
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [notification, setNotification] = useState(null);

  // Función para calcular hash del archivo
  const calculateFileHash = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        let hash = 0;
        for (let i = 0; i < content.length; i++) {
          const char = content.charCodeAt(i);
          hash = ((hash << 5) - hash) + char;
          hash = hash & hash;
        }
        resolve(Math.abs(hash).toString(16).padStart(16, '0'));
      };
      reader.readAsText(file);
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      showNotification('Por favor selecciona un archivo', 'error');
      return;
    }

    try {
      // Calcular hash del archivo
      const fileHash = await calculateFileHash(selectedFile);
      
      // Crear NFT
      const nftData = {
        id: `NFT-${Date.now()}`,
        name: formData.name,
        description: formData.description,
        owner: formData.owner,
        documentType: formData.documentType,
        fileName: selectedFile.name,
        fileHash: fileHash,
        timestamp: new Date().toISOString()
      };

      // Agregar a blockchain
      const block = blockchain.addBlock(nftData);
      
      // Guardar en estado
      setAssets([...assets, { ...nftData, blockHash: block.hash }]);

      // Limpiar formulario
      setFormData({
        name: '',
        description: '',
        owner: '',
        documentType: 'image'
      });
      setSelectedFile(null);
      document.getElementById('fileInput').value = '';

      showNotification('NFT registrado exitosamente en blockchain', 'success');
    } catch (error) {
      showNotification('Error al registrar NFT', 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const verifyAsset = (asset) => {
    const isValid = blockchain.isChainValid();
    showNotification(
      isValid ? 'Blockchain válida - Propiedad verificada ✓' : 'Blockchain inválida - Posible manipulación',
      isValid ? 'success' : 'error'
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Sistema de Registro NFT</h1>
          </div>
          <p className="text-gray-600">Blockchain privada para registrar activos digitales y verificar autenticidad</p>
        </div>

        {/* Notification */}
        {notification && (
          <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {notification.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span>{notification.message}</span>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          {/* Formulario de Registro */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5 text-indigo-600" />
              Registrar Nuevo Activo NFT
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Activo
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Ej: Certificado Digital"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descripción
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Describe el activo digital"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Propietario
                </label>
                <input
                  type="text"
                  name="owner"
                  value={formData.owner}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Nombre del propietario"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Documento
                </label>
                <select
                  name="documentType"
                  value={formData.documentType}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="image">Imagen</option>
                  <option value="document">Documento</option>
                  <option value="certificate">Certificado</option>
                  <option value="contract">Contrato</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Archivo Digital
                </label>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {selectedFile && (
                  <p className="text-sm text-gray-600 mt-1">
                    Archivo seleccionado: {selectedFile.name}
                  </p>
                )}
              </div>

              <button
                onClick={handleSubmit}
                type="button"
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Registrar en Blockchain
              </button>
            </div>
          </div>

          {/* Lista de Activos Registrados */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              Activos Registrados ({assets.length})
            </h2>
            
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {assets.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <FileText className="w-16 h-16 mx-auto mb-3 opacity-30" />
                  <p>No hay activos registrados</p>
                  <p className="text-sm">Registra tu primer NFT usando el formulario</p>
                </div>
              ) : (
                assets.map((asset, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{asset.name}</h3>
                      <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded">
                        {asset.documentType}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">{asset.description}</p>
                    
                    <div className="space-y-1 text-xs text-gray-500 mb-3">
                      <p><strong>ID:</strong> {asset.id}</p>
                      <p><strong>Propietario:</strong> {asset.owner}</p>
                      <p><strong>Archivo:</strong> {asset.fileName}</p>
                      <p><strong>Hash del Archivo:</strong> {asset.fileHash.substring(0, 16)}...</p>
                      <p><strong>Hash del Bloque:</strong> {asset.blockHash.substring(0, 16)}...</p>
                      <p><strong>Fecha:</strong> {new Date(asset.timestamp).toLocaleString()}</p>
                    </div>

                    <button
                      onClick={() => verifyAsset(asset)}
                      className="w-full bg-green-50 text-green-700 py-2 px-3 rounded hover:bg-green-100 transition-colors text-sm font-medium flex items-center justify-center gap-2"
                    >
                      <Shield className="w-4 h-4" />
                      Verificar Autenticidad
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Información de Blockchain */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Estado de la Blockchain</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Total de Bloques</p>
              <p className="text-2xl font-bold text-blue-600">{blockchain.chain.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Activos Registrados</p>
              <p className="text-2xl font-bold text-green-600">{assets.length}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Estado de la Cadena</p>
              <p className="text-2xl font-bold text-purple-600">
                {blockchain.isChainValid() ? 'Válida ✓' : 'Inválida'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTRegistrySystem;