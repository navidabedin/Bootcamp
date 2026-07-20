import random

computer_guess = random.randint(1, 100)
print("I'm trying to guess the number you're thinking of. Help me!")

while True:
    print(f"My guess: {computer_guess}")
    
    user_hint = input("Is my guess higher (b), lower (s), or correct (d)? ").lower()

    if user_hint == 'd':
        print(f"Yay! The number was {computer_guess}. I guessed it!")
        break
    elif user_hint == 'b':
        # If my guess was too low, the number must be higher than my current guess.
        # So, I'll pick a new random number between my current guess + 1 and 100.
        # This is a simplified approach. A more efficient method would be binary search.
        new_guess = random.randint(computer_guess + 1, 100)
        if new_guess == computer_guess: # Avoid getting stuck if range is only 1 number
            computer_guess += 1
        else:
            computer_guess = new_guess
            
    elif user_hint == 's':
        # If my guess was too high, the number must be lower than my current guess.
        # So, I'll pick a new random number between 1 and my current guess - 1.
        new_guess = random.randint(1, computer_guess - 1)
        if new_guess == computer_guess: # Avoid getting stuck if range is only 1 number
            computer_guess -= 1
        else:
            computer_guess = new_guess
    else:
        print("Invalid input. Please enter 'b' for higher, 's' for lower, or 'd' for correct.")

    # Check if the computer's guess has gone out of bounds
    if computer_guess > 100 or computer_guess < 1:
        print("It seems you might be playing unfairly! Please choose a number between 1 and 100.")
        break
