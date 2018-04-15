# servo control based on https://learn.adafruit.com/adafruits-raspberry-pi-lesson-8-using-a-servo-motor/software

# Servo Control
import time
import wiringpi

# use 'GPIO naming'
wiringpi.wiringPiSetupGpio()

# set #18 to be a PWM output
wiringpi.pinMode(18, wiringpi.GPIO.PWM_OUTPUT)

# set the PWM mode to milliseconds stype
wiringpi.pwmSetMode(wiringpi.GPIO.PWM_MODE_MS)

# divide down clock
wiringpi.pwmSetClock(192)
wiringpi.pwmSetRange(2000)

delay_period = 0.01
souls_old = 0;
souls = 0;

while True:
        with open('data.db') as f:
            souls = f.readlines(0)
            try:
                souls = float(souls[0].replace('"',""))
            except (IndexError):
                var_exists = False
            print("souls: %s" % (souls))
            if souls_old < souls:
                for pulse in range(50, 250, 1):
                    wiringpi.pwmWrite(18, pulse)
                    time.sleep(delay_period)
                    #time.sleep(2)
                for pulse in range(250, 50, -1):
                    wiringpi.pwmWrite(18, pulse)
                    time.sleep(delay_period)
            souls_old = souls
            f.close
        time.sleep(2)
