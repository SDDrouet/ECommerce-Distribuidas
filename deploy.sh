#!/bin/bash

# Configuración
SERVER_USER="sddrouet"
SERVER_IP="4.157.246.186"
REMOTE_PATH="/home/sddrouet/ecommerce"

# Subir archivos al servidor
echo "📤 Subiendo archivos a Azure..."
scp docker-compose.azure.yml .env $SERVER_USER@$SERVER_IP:$REMOTE_PATH

# Conectarse al servidor y desplegar
echo "🚀 Desplegando en Azure..."
ssh $SERVER_USER@$SERVER_IP << EOF
    cd $REMOTE_PATH
    echo "📉 Deteniendo contenedores..."
    sudo docker-compose -f docker-compose.azure.yml down
    echo "🔨 Construyendo y levantando servicios..."
    sudo docker-compose -f docker-compose.azure.yml up --build -d
    echo "✅ Despliegue completado."
EOF
