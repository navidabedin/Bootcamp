import random
hads = random.randint(1,100)
print (hads)

adad= 0

javab = input ('Is that correct?')

b= [adad>hads]
s= [adad<hads]
d= [javab==hads]

javab = [b,s,d]

while javab!=d:
    hads = random.randint(1,100)
    print (hads)
    javab = input ('Is that correct?')

print('I got it')    