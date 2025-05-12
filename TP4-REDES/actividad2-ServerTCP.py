import socket
import threading

def inicio():
    global encendido
    print("Si desea esperar una conexion, presione enter. Si quiere cerrar el servidor escriba exit")

    opt = input()
    match opt.lower():
        case "":
            conexion()
        case "exit":
            print("Cerrando servidor...")
            encendido = False
        case _:
            print("Opcion invalida")

def conexion():
    global sockServer
    sockServer.listen(1)
    print("Esperando conexion")
    socketCliente = sockServer.accept()
    hiloReceptor = threading.Thread(target=recibirMensaje, args=(socketCliente[0],socketCliente[1][0],))
    hiloEmisor = threading.Thread(target=enviarMensaje, args=(socketCliente[0],))
    hiloReceptor.start()
    hiloEmisor.start()
    hiloReceptor.join()
    hiloEmisor.join()


def recibirMensaje(socket,direccion):
    global sockServer
    global abandonar
    while True:
        try:
            mensajeDecodificado = ((socket.recv(100000)).decode("utf-8")).split(":")
            if mensajeDecodificado[1] == "exit":
                    print(f"El usuario {mensajeDecodificado[0]} ({direccion}) ha abandonado la conversacion, presione enter para continuar")
                    abandonar = True
                    break
            elif mensajeDecodificado[1] == "nuevo":
                print(f"\nEl usuario {mensajeDecodificado[0]} se ha unido a la conversación")
            else:
                print(f"{mensajeDecodificado[0]} ({direccion}) dice: {mensajeDecodificado[1]}")
        except:
            break
    socket.close()

def enviarMensaje(socketCliente):
    global abandonar
    print("Se establecio la conexion, ya puede comunicarse")
    while True:
        bufferSalida = input()
        try:
            if bufferSalida == "exit":
                if abandonar == True:
                    return
                print("No es posible cerrar el proceso servidor si hay un cliente conectado")
            else:
                socketCliente.send((f"Servidor dice: {bufferSalida}").encode())
        except:
            break
    socketCliente.close()

sockServer = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sockServer.bind(("0.0.0.0",60000))
encendido = True
abandonar = False
while encendido:
    inicio()
