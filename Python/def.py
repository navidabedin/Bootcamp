def hoghoogh(hour,per_hour):
    if hour>8:
        return 'Too much work'
    else:
        kol=hour*per_hour
        return kol

print(hoghoogh(7,20))
