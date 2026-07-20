#def salam(nam):
    #print ('hi',nam)


#for name in ['Navid','Amir','Parsa']:
    #salam(name)


def is_prime(n):
    avval = True
    for i in range(2,int(n**0.5)+1):
        if n % i == 0 :
            avval=False
    


for i in range (2,11):
    if is_prime(i):
        print (i)