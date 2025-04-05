
#Funcion principal, la cual recibiria el documento con todas las posibles tramas
def AnalizadorDeTramas(doc):

    #Funcion para separar las tramas a partir de los valores 7E sin secuencia de escape
    def separador(doc):

        flag = False
        tramas = []
        aux = ""
        i=0
        #Recorre toda la secuencia
        while i < len(doc):
            #Si encuentra un 7E, y no es el inicio de la cadena, agrega la trama recopilada hasta el momento.
            if doc[i:i+2] == "7E" and i != 0:
                tramas.append(aux)
                if flag:
                    tramasSecEscape[len(tramas)] = aux
                    flag = False
                aux = "7E"
                i += 2
            #Si encuentra un 7D, empieza a avanzar con el fin de buscar si forma parte de una secuencia de
            #escape. Si es asi entonces no corta con el 7E que pueda estar adelante.
            elif doc[i:i+2] == "7D":
                aux += "7D"
                for j in range(i+2,len(doc),2):
                    if doc[j:j+2] == "7D":
                        aux += "7D"
                    elif doc[j:j+2] == "7E":
                        datos["SecEsc"] += 1
                        flag =  True
                        aux += "7E"
                        i=j+2
                        break
                    else:
                        i = j
                        break
            #Es un byte normal
            else:
                aux += doc[i]
                i +=1

        tramas.append(aux)
        if flag:
            tramasSecEscape[len[tramas]] = aux
            flag = False
        return tramas

    #Funcion para calcular la longitud que hay que avanzar para validar la longitud.
    def long(trama):
        if len(trama) <= 6:
            return 0
        else:
            leng = (int(trama[2:6],16) * 2)
        return leng+2*trama.count("7D7E")
    
    #Funcion para validar la correcta longitud
    def checkLength(length, trama):

        #Validamos simplemente verificando si luego de la bandera, longitud, tipo, 
        #identificador y carga, unicamente resta 1 byte de checkSum
        if len(trama[6+length:len(trama)]) == 2:
            return True
        else:
            return False
        
    #Se suman los valores seguidos de la longitud, para verificar el byte de checkSum
    def checkSum(trama,longitud):

        verification = trama[6+longitud:len(trama)]
        verificationDec = int(verification,16)
        sum = 0
        for i in range(6,longitud+5,2):
            if trama[i:i+4] == "7D7E":
                continue
            sum = sum + int(trama[i:i+2],16)
        sum = int(bin(sum)[2:],2)

        if bin(int("FF",16) - (sum & int("FF",16))) == bin(verificationDec):
            return True
        else:
            return False
    
    #Diccionario con los datos a mostrar
    datos = {
        "total": 0,
        "longIncorrecta": 0,
        "longCorrecta": 0,
        "longCorrectaCheckCorrecto": 0,
        "longCorrectaCheckIncorrecto": 0,
        "SecEsc": 0
    }

    tramasLongIncorrectas = dict()
    tramasLongCorrectasCheckIncorrecto = dict()
    tramasSecEscape = dict()
    #Se separan las tramas
    tramas = separador(doc)

    for trama in tramas:

        datos["total"] += 1
        longitud = long(trama)

        #Entra en este caso si la trama no posee longitud, o esta no tiene carga
        if longitud == 0:
            datos["longIncorrecta"] += 1
            tramasLongIncorrectas[datos["total"]] = trama
        else:

            #Verifica si la longitud es correcta, si lo es pasa a verificar el valor de checkSum
            if checkLength(longitud, trama):
                
                datos["longCorrecta"] += 1

                if checkSum(trama, longitud):
                    datos["longCorrectaCheckCorrecto"] += 1
                else:
                    datos["longCorrectaCheckIncorrecto"] += 1
                    tramasLongCorrectasCheckIncorrecto[datos["total"]] = trama
            else:
                datos["longIncorrecta"] += 1
                tramasLongIncorrectas[datos["total"]] = trama
               
    print(f"Numero de tramas totales: {datos['total']}")
    print(f"Numero de tramas con longitud correcta: {datos['longCorrecta']}")
    print(f"Numero de tramas con longitud incorrecta: {datos['longIncorrecta']}")
    print(f"Numero de tramas con longitud correcta y checkSum correcto: {datos['longCorrectaCheckCorrecto']}")
    print(f"Numero de tramas con longitud correcta y checkSum incorrecto : {datos['longCorrectaCheckIncorrecto']}")
    print(f"Numero de tramas que utilizan una secuencia de escape: {datos['SecEsc']}")
    print("")

    print("Tramas que usan una secuencia de escape:")
    for key in tramasSecEscape.keys():
        print(f"Line {key}:") 
        print(f"Sin modificacion: {tramasSecEscape[key]}")
        print(f"Eliminando secuencias de escape: {tramasSecEscape[key].replace("7D7E","7E")}")
    print("")

    print("Tramas con longitud incorrecta:")
    for key in tramasLongIncorrectas.keys():
        print(f"Line {key}: {tramasLongIncorrectas[key]}")
    print("")

    print("Tramas con longitud correcta pero checkSum incorrecto:")
    for key in tramasLongCorrectasCheckIncorrecto.keys():
        print(f"Line {key}: {tramasLongCorrectasCheckIncorrecto[key]}")

    

archivo=open("Tramas_802-15-4.log")

secuency = archivo.read()

AnalizadorDeTramas(secuency)


        
        
            

        
