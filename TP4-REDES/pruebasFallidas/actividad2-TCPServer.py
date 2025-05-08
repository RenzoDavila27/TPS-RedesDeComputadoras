import socket
import threading

#Se pueden realizar multiples conexiones a el servidor, aunque la actividad unicamente pedia una unica conexion

def recibirMensaje(socket,direccion):
    global buscando
    global conectados
    global socketServer
    while True:
        try:
            mensajeDecodificado = ((socket.recv(100000)).decode("utf-8")).split(":")
            if mensajeDecodificado[1] == "exit":
                    print(f"El usuario {mensajeDecodificado[0]} ({direccion}) ha abandonado la conversacion, precione enter para esperar una nueva conexion")
                    conectados.discard(socket)
                    break
            elif mensajeDecodificado[1] == "nuevo":
                print(f"\nEl usuario {mensajeDecodificado[0]} se ha unido a la conversación")
            else:
                print(f"{mensajeDecodificado[0]} ({direccion}) dice: {mensajeDecodificado[1]}")
        except:
            break
    socket.close()

def enviarMensaje(socketCliente):
    global conectados
    global buscando
    print("Se establecio la conexion, ya puede comunicarse")
    while True:
        bufferSalida = input()
        try:
            if bufferSalida == "exit":
                print("No es posible cerrar el proceso servidor si hay un cliente conectado")
            else:
                socketCliente.send((f"Servidor dice: {bufferSalida}").encode())
        except:
            break
    socketCliente.close()

def leerSinCliente(clienteEncontrado):
    global socketServer
    global buscando
    while True:
        leer = input()
        if clienteEncontrado.is_set():
            break
        if leer == "exit":
            print("Se apaga la conexion")
            buscando = False
            socketServer.close()
            break
        else:
            print("cri...cri...cri...")
        


def conexion():
    global conectados
    global socketServer
    socketServer.listen(1)
    clienteEncontrado=threading.Event()
    while True:
        print("Esperando conexion")
        leer = threading.Thread(target=leerSinCliente, args=(clienteEncontrado,))
        leer.start()
        try:
            socketCliente = socketServer.accept()
        except OSError:
            break
        conectados.add(socketCliente)
        clienteEncontrado.set()
        print("Se realizo una conexion, presione enter para acceder")
        hiloReceptor = threading.Thread(target=recibirMensaje, args=(socketCliente[0],socketCliente[1][0],))
        hiloEmisor = threading.Thread(target=enviarMensaje, args=(socketCliente[0],))
        hiloReceptor.start()
        hiloEmisor.start()
        hiloReceptor.join()
        
conectados = set()
buscando = True
socketServer = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socketServer.bind(("0.0.0.0", 60000))
conectados.add(socketServer)
while buscando == True:
    encender = threading.Thread(target=conexion)
    encender.start()
    encender.join()