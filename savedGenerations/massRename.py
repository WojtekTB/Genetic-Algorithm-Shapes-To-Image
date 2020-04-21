import os
increment = 5000
start = 38918


fileNumber = start
for i in range(164):
    oldFileNumber = start + (i * increment)
    newFileNumber = oldFileNumber + 1400000
    os.rename("Generation_" + str(oldFileNumber) + ".png",  "Generation_" + str(newFileNumber) + ".png")
    print("Renamed '" + "Generation_" + str(oldFileNumber) + ".png" + "' to '" + "Generation_" + str(newFileNumber) + ".png'")