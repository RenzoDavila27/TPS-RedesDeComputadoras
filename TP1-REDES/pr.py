
def checkSum(trama,longitud):

        verification = trama[6+longitud:len(trama)]
        verificationBin = hexToBin(verification)
        sum = 0
        for i in range(6,longitud+5,2):
            print(i)
            print(trama[i:i+2])
            print("")
            sum = sum + int(trama[i:i+2],16)
        sum = int(bin(sum)[2:],2)

        if bin(int("FF",16) - (sum & hexToBin("FF"))) == bin(verificationBin):
            return True
        else:
            return False

def hexToBin(hexa):
    dec = int(hexa,16)
    return dec



a = "7E0012920013A200403A3BF8000001010013000003F3"

b = 1110101110
c = 111111111

print(len("920013A200403A3BF80634410100000302090203"))


