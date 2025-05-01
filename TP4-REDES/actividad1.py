import socket
import threading

def server():
    global exit
    global socket_id
    print("Escuchando")
    while True:
        if exit == True:
            break

        mensaje = socket_id.recvfrom(100000)
        mensajeRecibido = (mensaje[0].decode()).split(":")
        direccion = mensaje[1][0]
        if mensajeRecibido[0] == "exit":
            print(f"El usuario {mensajeRecibido[0]} ({direccion}) ha abandonado la conversacion")
        elif mensajeRecibido[1] == "nuevo":
            print(f"El usuario {mensajeRecibido[0]} se ha unido a la conversación")
        else:
            print(f"{mensajeRecibido[0]} ({direccion}) dice: {mensajeRecibido[1]}")
        
def client(usuario):
    global socket_id
    global exit
    socket_id.sendto((f"{usuario}:nuevo").encode(),("192.168.1.255",60000))
    print("Ya puede escribir mensajes a la red")
    while exit == False:
        bufferSalida = input()
        if bufferSalida == "exit":
            socket_id.sendto((f"{usuario}:{bufferSalida}").encode(),("192.168.1.255",60000))
            exit = True

        socket_id.sendto((f"{usuario}:{bufferSalida}").encode(),("192.168.1.255",60000))


exit = False
socket_id = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
socket_id.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
socket_id.bind(("0.0.0.0", 60000))
print("Ingrese su nombre de usuario:")
usuario = input()

hilo1 = threading.Thread(target=server, daemon=True)
hilo2 = threading.Thread(target=client, args=(usuario,))
hilo1.start()
hilo2.start()
hilo1.join() 
hilo2.join()