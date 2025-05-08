import socket
import threading

#Se pueden realizar multiples conexiones a el servidor, aunque la actividad unicamente pedia una unica conexion

def manejarClientes(socketCliente, direccion, ipServer):
    global conectados
    global usuario
    while True:
        mensajeDecodificado = ((socketCliente[0].recv(100000)).decode("utf-8")).split(":")
        direccion = socketCliente[1][0]
        if mensajeDecodificado[0] == "exit":
                conectados.remove(direccion)
                break
        elif mensajeDecodificado[1] == "nuevo":
            conectados.add(socketCliente)
            mensajesDelHost = threading.Thread(target=(enviarMensaje), args=(socketCliente, usuario, ipServer,))
            mensajesDelHost.start()
    mensajesDelHost.join()

def recibirMensaje(socket):
    global conectados
    global socketServer
    while True:
        mensajeDecodificado = ((socket[0].recv(100000)).decode("utf-8")).split(":")
        direccion = socket[1][0]
        if mensajeDecodificado[1] == "exit":
                print(f"El usuario {mensajeDecodificado[0]} ({direccion}) ha abandonado la conversacion")
        elif mensajeDecodificado[1] == "nuevo":
            print(f"El usuario {mensajeDecodificado[0]} se ha unido a la conversación")
        else:
            print(f"{mensajeDecodificado[0]} ({direccion}) dice: {mensajeDecodificado[1]}")
        for cliente in conectados:
            socketServer[0].send((f"{mensajeDecodificado[0]} ({cliente[1][0]}) dice: {mensajeDecodificado[1]}").encode())

def enviarMensaje(socketServer, usuario, direccion):
    global conectados
    print("Se establecio la conexion y ya puede comunicarse")
    while True:
        bufferSalida = input()
        if bufferSalida == "exit":
            if len(conectados) == 1 and conectados[0] == direccion:
                print("Se apaga la conexion")
                break
            else:
                print("No es posible cerrar el proceso servidor si hay un cliente conectado")
        else:
            socketServer[0].send((f"{usuario} ({direccion}) dice: {bufferSalida}").encode())
        

def server(ip, usuario):
    global conectados
    global socketServer
    socketServer.bind((ip, 60000))
    conectados.add(socketServer)
    socketServer.listen(10)
    while True:
        print("Esperando conexion")
        socketCliente = socketServer.accept()
        conectados.add(socketCliente)
        hiloCliente = threading.Thread(target=manejarClientes, args=(socketCliente, socketCliente[1][0], ip,))
        hiloReceptor = threading.Thread(target=recibirMensaje, args=(socketCliente,))
        hiloCliente.start()
        hiloReceptor.start()
        hiloCliente.join()
        hiloReceptor.join()
    
print("Ingrese el nombre de usuario que tendra el servidor")
usuario = input()
conectados = set()
socketServer = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
hilo1 = threading.Thread(target=server, args=("192.168.1.95", usuario,))
hilo1.start()
hilo1.join()