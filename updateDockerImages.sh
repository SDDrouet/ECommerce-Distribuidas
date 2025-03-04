#!/bin/bash

# Iniciar sesión en Docker Hub
docker login

# Función para construir y subir imágenes en paralelo
build_and_push() {
    local service_name=$1
    local path=$2

    docker build -t "davidrouet/${service_name}:latest" "$path" &&
    docker push "davidrouet/${service_name}:latest"
}

# Ejecutar cada construcción y subida en un subproceso
build_and_push "eccomerce.gateway" "./gateway" &
build_and_push "eccomerce.product" "./micro-inventario" &
build_and_push "eccomerce.order" "./micro-pedidos" &
build_and_push "eccomerce.user" "./micro-usuarios" &

# Esperar a que todos los procesos terminen
wait

echo "Todas las imágenes han sido construidas y subidas exitosamente."
