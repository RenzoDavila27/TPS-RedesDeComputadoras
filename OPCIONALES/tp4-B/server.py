import socket
import os

def enviar_archivo(nombre_archivo, socket_cliente):
    if not os.path.exists(nombre_archivo):
        print("El archivo no existe.")
        socket_cliente.send(b"ERROR: El archivo no existe.")
        return

    socket_cliente.send(b"OK")  # Avisar que todo está bien

    # Obtener el tamaño del archivo
    tamano = os.path.getsize(nombre_archivo)
    socket_cliente.send(str(tamano).encode())  # Enviar tamaño del archivo
    ack = socket_cliente.recv(1024)  # Esperar ACK

    with open(nombre_archivo, "rb") as archivo:
        while True:
            datos = archivo.read(1024)
            if not datos:
                break
            socket_cliente.sendall(datos)
    print("Archivo enviado correctamente.")
    socket_cliente.close()

def main():
    servidor = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    servidor.bind(("0.0.0.0", 60000))
    servidor.listen(1)
    print("Servidor esperando conexión...")

    cliente, direccion = servidor.accept()
    print(f"Conectado con {direccion}")

    nombre_archivo = input("Ingrese el nombre del archivo a enviar: ")
    enviar_archivo(nombre_archivo, cliente)

if __name__ == "__main__":
    main()
