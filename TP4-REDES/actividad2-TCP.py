import socket
import threading

def server(ip):
    socketServer = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    socketServer.bind((ip, 60000))
    print("Escuchando")
    conectados = set()
    while True:
        socketServer.listen(10)
        mensaje = socketServer.accept()
        mensajeDecodificado = ((mensaje[0].recv(100000)).decode("utf-8")).split(":")
        direccion = mensaje[1][0]
        if mensajeDecodificado[0] == "exit":
            if direccion == ip:
                if conectados.len== 1 and conectados[0] == ip:
                    break
                else:
                    "No es posible cerrar el proceso servidor si hay un cliente conectado"
            print(f"El usuario {mensajeDecodificado[0]} ({direccion}) ha abandonado la conversacion")
            conectados.remove(direccion)

        elif mensajeDecodificado[1] == "nuevo":
            print(f"El usuario {mensajeDecodificado[0]} se ha unido a la conversación")
            conectados.add(direccion)
        else:
            print(f"{mensajeDecodificado[0]} ({direccion}) dice: {mensajeDecodificado[1]}")

def cliente(ipServer, usuario):
    socketCliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    socketCliente.bind((ipServer, 60001))
    socketCliente.connect((ipServer,60000))
    socketCliente.send((f"{usuario}:nuevo").encode())
    print("Ya puede comenzar a mandar mensajes")
    while True:
        bufferSalida = input()
        if bufferSalida == "exit":
            socketCliente.send((f"{usuario}:{bufferSalida}").encode())
            break
        socketCliente.send((f"{usuario}:{bufferSalida}").encode())
    

print("Ingrese su nombre de usuario:")
usuario = input()  
hilo1 = threading.Thread(target=server, args=("0.0.0.0",))

hilo2 = threading.Thread(target=cliente, args=("0.0.0.0", usuario,))
hilo1.start()
hilo2.start()
hilo1.join() 
hilo2.join()