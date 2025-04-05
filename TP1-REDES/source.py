archivo=open("Tramas_802-15-4.log")

secuency = archivo.read()

def hexToBin(hex):
    dec = int(hex,16)
    return bin(dec)

def analizar(trama,datos):
    i = 0
    while i < len(trama):
        if trama[i:i+2] == "7D":


    suma = 0
    checkSum = trama[(len(trama)-2):]
    trama = trama[:(len(trama)-2)]
    for i in range(0,len(trama),2):
        suma = suma + int(trama[i:i+1],16)
    

    sumaBin = bin(suma)
    checkSumBin = hexToBin(checkSum)

    if sumaBin & hexToBin("FF") == checkSumBin:
        datos["longCorrecta"] += 1

    



#Si la secuencia empieza con 7E, pasar la longitud a decimal y seleccionar los proximos longitud+2 simbolos, para luego hacer el analisis

while secuency != "":
    
    datos = {
        "total": 0,
        "longIncorrecta": 0,
        "longCorrecta": 0,
        "longCorrectaCheckCorrecto": 0,
        "longCorrectaCheckInorrecto": 0,
        "SecEsc": 0
    }

    if secuency[:2] == "7E":

        secuency = secuency[2:]
        long = int(secuency[:4],16)
        datos["total"] += 1
        if secuency[long*2+2:long*2+4] == "7E":
            flag = True
            datos["longCorrecta"] += 1
        else:
            flag = False
            datos["longIncorrecta"] += 1
            aux = ""
            i = long*2+4
            while True:
                
                if secuency[i+1:i+3] == "7E": 
                    break
                elif secuency[i+1:i+3] == "7D":
                    j = 2
                    aux2 = ""
                    while True:
                        if secuency[i+1+j:i+2+j] == "7D":
                            aux2 += "7D"
                            j += 2
                        elif secuency[i+1+j:i+2+j] == "7E":
                            i = j+2
                            aux2+="7E"
                            break
                    aux += aux2
                else:
                    aux += secuency[i]
                i += 1
                    


            print(f"Linea {datos['total']} : {secuency}")

        secuency = secuency[4:]
        if flag:
            analizar(secuency[:((long*2)+2)],datos)

        secuency = secuency[:(long+1)]

    




