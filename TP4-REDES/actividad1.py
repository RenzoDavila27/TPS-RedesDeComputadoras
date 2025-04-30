import socket
import threading

def server():
    socket_server = socket.socket(socket.AF_INET,socket.SOCK_DGRAM)
    socket_server.bind(("10.65.4.135", 60000))
    socket_server.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST,1)
    print("Escuchando")
    mensaje = socket_server.recvfrom(1000)
    print(mensaje)
    mensajeRecibido = (mensaje[0].decode()).split(":")
    direccion = mensaje[1][0]
    if mensajeRecibido[0] == "exit":
        print(f"El usuario {mensajeRecibido[0]} ({direccion}) ha abandonado la conversacion")
    elif mensajeRecibido[1] == "nuevo":
        print(f"El usuario {mensajeRecibido[0]} se ha unido a la conversación")
    else:
        print(f"{mensajeRecibido[0]} ({direccion}) dice: {mensajeRecibido[1]}")
    
def client():
    socket_id = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    socket_id.setsockopt(socket.SOL_SOCKET, socket.SO_BROADCAST, 1)
    print("Ingrese su nombre de usuario:")
    usuario = input()
    socket_id.sendto((f"{usuario}:nuevo").encode(),("10.65.4.255",60000))
    print("Mensaje a enviar: ")
    bufferSalida = input()
    if bufferSalida == "exit":
        socket_id.sendto((f"{usuario}:{bufferSalida}").encode(),("10.65.4.255",60000))
        exit = True
        stop_event.set()
        hilo1.join() 
        hilo2.join()

    socket_id.sendto((f"{usuario}:{bufferSalida}").encode(),("10.65.4.255",60000))


global exit
global hilo1
global hilo2
global stop_event
exit= False

stop_event = threading.Event()

while exit == False:
    hilo1 = threading.Thread(target=server)
    hilo2 = threading.Thread(target=client)
    hilo1.start()
    hilo2.start()
    stop_event.set()
    hilo1.join() 
    hilo2.join()