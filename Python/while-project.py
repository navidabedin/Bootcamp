n=[20,15,5,0,2,-1]
count= 0
majmoo=0

while n!=-1:
    for i in n:
        majmoo = majmoo + i
        count = count +1
    
    print(majmoo/count)
    if i==-1:
        break

