import socket

def recibir_archivo(socket_cliente):
    estado = socket_cliente.recv(1024).decode()
    if estado != "OK":
        print("Error en el servidor:", estado)
        return

    tamano = int(socket_cliente.recv(1024).decode())
    socket_cliente.send(b"ACK")  # Confirmar que se recibió el tamaño

    recibido = 0
    with open("archivo_recibido", "wb") as archivo:
        while recibido < tamano:
            datos = socket_cliente.recv(1024)
            if not datos:
                break
            archivo.write(datos)
            recibido += len(datos)

    print("Archivo recibido y guardado como 'archivo_recibido'.")

def main():
    ip_servidor = input("Ingrese la IP del servidor: ")
    cliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        cliente.connect((ip_servidor, 60000))
        print("Conectado al servidor.")
        recibir_archivo(cliente)
    except:
        print("No se pudo conectar al servidor.")
    cliente.close()

if __name__ == "__main__":
    main()
