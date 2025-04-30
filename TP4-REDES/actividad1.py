import socket
import threading

def server():
    socket_server = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
    socket_server.bind(("10.65.4.135", 60000))
    socket_server.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST,1)
    print("Escuchando")
    mensaje = socket_server.recvfrom(1000)
    mensajeRecibido = mensaje[0].split(":")
    direccion = mensaje[1][0]
    if mensajeRecibido[0] == "exit":
        print(f"El usuario {mensajeRecibido[0]} ({direccionMensaje}) ha abandonado la conversacion")
    elif mensajeRecibido[1] == "nuevo":
        print(f"El usuario {mensajeRecibido[0]} se ha unido a la conversación")
    else:
        print(f"{mensajeRecibido[0]} ({direccionMensaje}) dice: {mensajeRecibido[1]}")
    
def client():
    socket_id = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    print("Ingrese su nombre de usuario:")
    usuario = input()
    socket_id.send((f"{usuario}:nuevo").encode())
    print("Mensaje a enviar: ")
    bufferSalida = input()
    if bufferSalida == "exit":
        exit = True

    socket_id.send((f"{usuario}:{bufferSalida}").encode())


global exit
exit= False

while exit ==False:
    hilo1 = threading.Thread(target=server)
    hilo2 = threading.Thread(target=client)
    hilo1.start()
    hilo2.start()
    hilo1.join()
    hilo2.join()