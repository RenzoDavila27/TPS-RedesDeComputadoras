import socket
import threading

def recibirMensajes(socket):
    global escuchar
    while True:
        if escuchar == False:
            break
        mensajeDecodificado = ((socket.recv(100000)).decode("utf-8")).split(":")
        print(f"{mensajeDecodificado[0]}: {mensajeDecodificado[1]}")
        


def mandarMensaje(socketCliente,usuario):
    global escuchar
    print("Se establecio la conexion, ya puede mandar mensajes a el servidor")
    while True:
        bufferSalida = input()
        socketCliente.send((f"{usuario}:{bufferSalida}").encode())
        if bufferSalida == "exit":
            escuchar = False
            break
        
def inicio():
    global socketCliente
    print("Ingrese su nombre de usuario:")
    usuario = input()
    while True:
        print("Ingrese la ip a conectar o exit para salir")
        ip = input()
        if ip.lower() == "exit":
            return
        try:
            print("Conectando...")
            socketCliente.connect((ip,60000))
        except:
            print("Error al conectar a la ip")
            continue
        break
        
    
    socketCliente.send((f"{usuario}:nuevo").encode())
    receptor = threading.Thread(target=recibirMensajes, args=(socketCliente,),daemon=True)
    emisor = threading.Thread(target=mandarMensaje, args=(socketCliente,usuario,))
    emisor.start()
    receptor.start()
    emisor.join()
    
escuchar = True
socketCliente = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
inicio()