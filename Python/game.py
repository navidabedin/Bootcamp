import random
javab = random.randint(1,50)

hads = input ('What do you guess?')
hads = int(hads)

while javab != hads:
    if javab>hads:
        print('bigger')
    else:
        print('smaller')
    hads = input ('What do you guess?')
    hads = int(hads)

print ('you got it')            